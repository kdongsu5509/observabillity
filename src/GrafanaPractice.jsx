import { useEffect, useMemo, useRef, useState } from 'react';
import { FieldType, ThemeContext, createTheme } from '@grafana/data';
import { Alert, Badge, Button, Icon, InteractiveTable, Select, Sparkline, Tab, TabsBar, TextArea } from '@grafana/ui';
import { practiceScenarios } from './practiceScenarios';
import { formatTime, getTelemetry, runPracticeQuery } from './practiceEngine';
import PracticeDashboard from './PracticeDashboard';

const theme = createTheme({ colors: { mode: 'dark' } });
const sourceOptions = ['Prometheus', 'Loki', 'Tempo'].map(value => ({ label: value, value }));
const environmentOptions = ['production', 'development'].map(value => ({ label: value, value }));
const rangeOptions = [{ label: 'Last 30 minutes', value: 30 }, { label: 'Last 1 hour', value: 60 }, { label: 'Last 3 hours', value: 180 }, { label: 'Last 6 hours', value: 360 }];
const language = { Prometheus: 'PromQL', Loki: 'LogQL', Tempo: 'TraceQL' };
const scenarioById = Object.fromEntries(practiceScenarios.map(item => [item.id, item]));

function currentId() { return scenarioById[location.hash.slice(1)] ? location.hash.slice(1) : practiceScenarios[0].id; }
function readProgress() { try { return JSON.parse(localStorage.getItem('observabillity-practice-v1') || '{}'); } catch { return {}; } }

function useWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(800);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(320, Math.floor(entry.contentRect.width))));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
}

function frame(columns, rows) {
  return { name: 'Practice results', length: rows.length, fields: columns.map((name, i) => ({ name, type: FieldType.string, values: rows.map(row => String(row[i])), config: {} })) };
}

function QueryResult({ result, onTraceSelect }) {
  const [ref, width] = useWidth();
  const [traceId, setTraceId] = useState(null);
  useEffect(() => setTraceId(null), [result]);
  const data = useMemo(() => {
    if (!result) return null;
    if (result.kind === 'logs') return frame(['Time', 'Level', 'Line', 'trace_id'], result.rows.map(row => [formatTime(row.time), row.labels.severity_text, row.message, row.labels.trace_id]));
    if (result.kind === 'traces') return frame(['Time', 'Trace ID', 'Service', 'Duration', 'Status'], result.rows.map(row => [formatTime(row.time), row.traceId, row.service, `${row.duration} ms`, row.status]));
    return frame(['Metric', 'Labels', 'Last value'], result.rows.map(row => [row.name, JSON.stringify(row.labels), Number(row.points.at(-1)?.[1] || 0).toFixed(3)]));
  }, [result]);
  const table = useMemo(() => data ? {
    columns: data.fields.map(field => ({ id: field.name, header: field.name, ...(field.name === 'trace_id' ? { cell: ({ value }) => <Button variant="secondary" fill="text" size="sm" onClick={() => onTraceSelect(value)}>{value} ↗</Button> } : {}) })),
    rows: Array.from({ length: data.length }, (_, index) => Object.fromEntries(data.fields.map(field => [field.name, field.values[index]]))),
  } : null, [data, onTraceSelect]);
  const first = result?.kind === 'series' ? result.rows[0] : null;
  const plot = useMemo(() => first ? {
    x: { name: 'Time', type: FieldType.time, values: first.points.map(point => point[0]), config: {} },
    y: { name: first.name, type: FieldType.number, values: first.points.map(point => point[1]), state: { range: { min: Math.min(...first.points.map(point => point[1])), max: Math.max(...first.points.map(point => point[1])) } }, config: { color: { mode: 'fixed', fixedColor: '#73a9ff' } } },
  } : null, [first]);
  const selected = result?.kind === 'traces' ? result.rows.find(row => row.traceId === (traceId || result.rows[0]?.traceId)) : null;
  return <section className="gp-panel gp-results" ref={ref} aria-label="쿼리 결과">
    <div className="gp-panel-heading"><h2>Query results</h2>{result && <Badge color="blue" text={`${result.count.toLocaleString()} results`} />}</div>
    {!result && <div className="gp-empty"><Icon name="search" size="xl" /><p>쿼리를 실행하면 결과가 여기에 표시됩니다.</p></div>}
    {result?.count === 0 && <Alert title="No data" severity="info">일치하는 데이터가 없습니다. 라벨과 쿼리 조건을 확인하세요.</Alert>}
    {plot && <div className="gp-chart"><Sparkline sparkline={plot} theme={theme} width={Math.max(300, width - 36)} height={168} /><span>최근 30분 · {first.name}</span></div>}
    {table?.rows.length > 0 && <InteractiveTable columns={table.columns} data={table.rows} pageSize={20} />}
    {selected && <div className="gp-trace-picker"><Select aria-label="트레이스 선택" menuShouldPortal={false} options={result.rows.map(row => ({ label: `${row.traceId} · ${row.duration} ms`, value: row.traceId }))} value={traceId || selected.traceId} onChange={option => setTraceId(option?.value)} /><div className="gp-spans">{selected.spans.map((span, i) => <div key={`${span.name}-${i}`}><span>{span.name}</span><strong>{span.duration} ms</strong><i style={{ width: `${Math.max(2, Math.min(100, span.duration / selected.duration * 100))}%` }} /></div>)}</div></div>}
    {result?.kind === 'logs' && result.count > 0 && <p className="gp-result-note">trace_id를 누르면 같은 요청의 Tempo 트레이스를 엽니다.</p>}
  </section>;
}

function PracticeApp() {
  const [id, setId] = useState(currentId);
  const [view, setView] = useState(() => location.hash ? 'explore' : 'dashboard');
  const [environment, setEnvironment] = useState('production');
  const [rangeMinutes, setRangeMinutes] = useState(60);
  const scenario = scenarioById[id] || practiceScenarios[0];
  const [source, setSource] = useState(scenario.source);
  const [query, setQuery] = useState(scenario.query);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [choice, setChoice] = useState(null);
  const [progress, setProgress] = useState(readProgress);
  const counts = useMemo(() => getTelemetry().counts, []);
  useEffect(() => { const onHash = () => { setId(currentId()); setView('explore'); }; window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash); }, []);
  useEffect(() => { setSource(scenario.source); setQuery(scenario.query); setResult(null); setError(''); setChoice(null); }, [scenario]);
  function navigate(nextId) { location.hash = nextId; setId(nextId); setView('explore'); }
  function execute() { try { setResult(runPracticeQuery(source, query, { environment, rangeMinutes })); setError(''); } catch (cause) { setResult(null); setError(cause.message); } setChoice(null); }
  function changeContext(nextEnvironment, nextRangeMinutes) {
    setEnvironment(nextEnvironment);
    setRangeMinutes(nextRangeMinutes);
    if (result) {
      try { setResult(runPracticeQuery(source, query, { environment: nextEnvironment, rangeMinutes: nextRangeMinutes })); setError(''); }
      catch (cause) { setResult(null); setError(cause.message); }
    }
    setChoice(null);
  }
  function openTrace(traceId) {
    const nextQuery = `{ trace:id = "${traceId}" }`;
    setSource('Tempo');
    setQuery(nextQuery);
    setResult(runPracticeQuery('Tempo', nextQuery, { environment, rangeMinutes }));
    setError('');
    setChoice(null);
    setView('explore');
  }
  function openQuery(nextSource, nextQuery) {
    const variableQuery = nextQuery.replace(/"(?:production|development)"/g, '"$env"');
    setSource(nextSource);
    setQuery(variableQuery);
    setResult(runPracticeQuery(nextSource, variableQuery, { environment, rangeMinutes }));
    setError('');
    setChoice(null);
    setView('explore');
  }
  function answer(index) {
    setChoice(index);
    if (index === scenario.answer && result?.count > 0) {
      const next = { ...progress, [id]: true };
      setProgress(next);
      localStorage.setItem('observabillity-practice-v1', JSON.stringify(next));
    }
  }
  const completed = practiceScenarios.filter(item => progress[item.id]).length;
  return <main className="grafana-host" aria-label="Grafana 컴포넌트 실습">
    <header className="gp-topbar"><div className="gp-brand"><Icon name="gf-logs" size="lg" /><strong>Observability Lab</strong><span>Grafana UI</span></div><a href="/" className="gp-back"><Icon name="arrow-left" /> 글 목록</a></header>
    <div className="gp-layout">
      <aside className="gp-sidebar" aria-label="실습 목록"><p className="gp-side-title">OBSERVE</p><Button variant={view === 'dashboard' ? 'primary' : 'secondary'} fill={view === 'dashboard' ? 'solid' : 'text'} className="gp-side-button" onClick={() => setView('dashboard')} icon="dashboard">대시보드</Button><p className="gp-side-title">MISSIONS · {completed}/{practiceScenarios.length}</p><p className="gp-side-title gp-severity-critical">CRITICAL · C1-C6</p>{practiceScenarios.filter(item => item.id.startsWith('c')).map((item, i) => <Button key={item.id} variant={view === 'explore' && item.id === id ? 'primary' : 'secondary'} fill={view === 'explore' && item.id === id ? 'solid' : 'text'} className="gp-side-button" onClick={() => navigate(item.id)} icon={progress[item.id] ? 'check-circle' : 'circle'}>{'C' + (i + 1)} · {item.title}</Button>)}<p className="gp-side-title gp-severity-warning">WARNING · W1-W9</p>{practiceScenarios.filter(item => item.id.startsWith('w')).map((item, i) => <Button key={item.id} variant={view === 'explore' && item.id === id ? 'primary' : 'secondary'} fill={view === 'explore' && item.id === id ? 'solid' : 'text'} className="gp-side-button" onClick={() => navigate(item.id)} icon={progress[item.id] ? 'check-circle' : 'circle'}>{'W' + (i + 1)} · {item.title}</Button>)}<p className="gp-sidebar-note">브라우저 안의 예제 데이터로 실행됩니다.</p></aside>
      <div className="gp-content"><div className="gp-heading"><div><div className="gp-breadcrumb">Home / Practice / {view === 'dashboard' ? 'Dashboard' : scenario.title}</div><h1>{view === 'dashboard' ? 'Observability Dashboard' : scenario.title}</h1>{view === 'dashboard' ? <p>서비스의 메트릭, 로그, 트레이스를 한눈에 살펴보세요.</p> : <div className={'gp-mission-callout ' + (scenario.id.startsWith('c') ? 'gp-mission-callout-critical' : 'gp-mission-callout-warning')}><Icon name={scenario.id.startsWith('c') ? 'fire' : 'bell'} size="lg" /><div><strong>{scenario.intro}</strong><span>{scenario.goal}</span></div></div>}</div><Badge color="blue" text="예제 데이터" /></div>
        <div className="gp-stats"><span><Icon name="database" /> {counts.samples.toLocaleString()} metric samples</span><span><Icon name="gf-logs" /> {counts.logs.toLocaleString()} log lines</span><span><Icon name="gf-traces" /> {counts.traces.toLocaleString()} traces</span></div>
        <TabsBar><Tab label="Dashboard" active={view === 'dashboard'} onChangeTab={() => setView('dashboard')} /><Tab label="Explore" active={view === 'explore'} onChangeTab={() => setView('explore')} /></TabsBar>
        {view === 'dashboard' ? <PracticeDashboard environment={environment} onEnvironmentChange={next => changeContext(next, rangeMinutes)} rangeMinutes={rangeMinutes} onRangeChange={next => changeContext(environment, next)} onContextChange={changeContext} onOpenQuery={openQuery} onTraceSelect={openTrace} /> : <>
        <TabsBar>{practiceScenarios.map(item => <Tab key={item.id} label={item.title} active={item.id === id} onChangeTab={() => navigate(item.id)} />)}</TabsBar>
        <section className="gp-panel gp-query"><div className="gp-panel-heading"><h2>Explore</h2><Badge color="green" text="Local dataset" /></div><div className="gp-query-tools"><span>Data source</span><div className="gp-source-select"><Select aria-label="데이터 소스" menuShouldPortal={false} options={sourceOptions} value={source} onChange={option => { setSource(option?.value || source); setResult(null); setError(''); }} /></div><span className="gp-language">{language[source]}</span><span>env</span><div className="gp-context-select"><Select aria-label="환경" menuShouldPortal={false} options={environmentOptions} value={environment} onChange={option => changeContext(option?.value || environment, rangeMinutes)} /></div><div className="gp-range-select"><Select aria-label="시간 범위" menuShouldPortal={false} options={rangeOptions} value={rangeMinutes} onChange={option => changeContext(environment, option?.value || rangeMinutes)} /></div></div><label htmlFor="gp-query">Query</label><TextArea id="gp-query" rows={3} value={query} onChange={event => setQuery(event.target.value)} invalid={Boolean(error)} spellCheck={false} /><div className="gp-query-actions"><Button variant="secondary" onClick={() => { setSource(scenario.source); setQuery(scenario.query); setResult(null); setError(''); }}>예시 쿼리 복원</Button><Button icon="play" onClick={execute}>Run query</Button></div>{error && <Alert title="Query error" severity="error">{error}</Alert>}<p className="gp-query-help">지원 구문: PromQL 선택자·rate·increase·sum·histogram_quantile, LogQL 라벨·문자열·정규식 필터, TraceQL 서비스·상태·trace ID 조건. $env는 선택한 환경으로 치환됩니다.</p></section>
        <QueryResult result={result} onTraceSelect={openTrace} />
        <section className="gp-panel gp-mission"><div className="gp-panel-heading"><h2>Mission check</h2>{progress[id] && <Badge color="green" text="Completed" />}</div><div className="gp-mission-guidance"><Alert title="실습 목표" severity={scenario.id.startsWith('c') ? 'error' : 'warning'}>{scenario.goal}</Alert><Alert title="힌트" severity="info">{scenario.hint}</Alert></div><p>{scenario.question}</p><div className="gp-choices">{scenario.choices.map((label, index) => <Button key={label} variant={choice === index ? 'primary' : 'secondary'} fill={choice === index ? 'solid' : 'outline'} onClick={() => answer(index)} disabled={!result?.count}>{label}</Button>)}</div>{choice !== null && <Alert title={choice === scenario.answer ? '정답입니다' : '다시 살펴보세요'} severity={choice === scenario.answer ? 'success' : 'warning'}>{scenario.explanation}</Alert>}{!result && <p className="gp-query-help">먼저 쿼리를 실행해 결과를 확인하세요.</p>}</section>
        </>}
        <div className="gp-footer-actions"><span>{completed} / {practiceScenarios.length}개 완료</span><Button variant="secondary" onClick={() => navigate(practiceScenarios[(practiceScenarios.findIndex(item => item.id === id) + 1) % practiceScenarios.length].id)}>다음 실습 <Icon name="arrow-right" /></Button></div>
      </div>
    </div>
  </main>;
}

export default function GrafanaPractice() { return <ThemeContext.Provider value={theme}><PracticeApp /></ThemeContext.Provider>; }
