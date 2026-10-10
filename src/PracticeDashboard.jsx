import { useEffect, useMemo, useRef, useState } from 'react';
import { FieldType, dateTime } from '@grafana/data';
import { Badge, BigValue, BigValueColorMode, BigValueGraphMode, Button, Gauge, InteractiveTable, PanelChrome, Select, Sparkline, Tab, TabsBar, TimeSeries, useTheme2 } from '@grafana/ui';
import dashboardManifest from './bibbidiDashboardManifest.json';
import { formatTime, getTelemetry, runPracticeQuery } from './practiceEngine';

const dashboardIds = ['bibbidi-alerts', 'bibbidi-app', 'bibbidi-infra'];
const dashboardNames = { 'bibbidi-alerts': '위험', 'bibbidi-app': '앱 서버', 'bibbidi-infra': '인프라' };
const envOptions = [{ label: 'production', value: 'production' }, { label: 'development', value: 'development' }];
const rangeOptions = [{ label: 'Last 30 minutes', value: 30 }, { label: 'Last 1 hour', value: 60 }, { label: 'Last 3 hours', value: 180 }, { label: 'Last 6 hours', value: 360 }];
const palette = { green: '#73bf69', orange: '#ff9830', red: '#f2495c', blue: '#5794f2' };

function useWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(360);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(190, Math.floor(entry.contentRect.width))));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, width];
}

function getDashboardData(env, minutes) {
  const selector = '{deployment_environment_name="' + env + '"}';
  const query = {
    request: 'sum(rate(http_server_requests_seconds_count' + selector + '[5m]))',
    errors: 'sum(rate(http_server_requests_seconds_count{deployment_environment_name="' + env + '", status=~"5.."}[5m]))',
    p95: 'histogram_quantile(0.95, sum by (le) (rate(http_server_requests_seconds_bucket' + selector + '[5m])))',
    up: 'up' + selector,
    logs: '{service_name="bibbidi-backend", deployment_environment_name="' + env + '"} | severity_text="ERROR"',
    traces: '{ resource.service.name = "bibbidi-backend" && resource.deployment.environment.name = "' + env + '" && span.http.response.status_code >= 500 }',
  };
  const until = getTelemetry().series[0].points.at(-1)[0];
  const from = until - minutes * 60_000;
  const series = expression => runPracticeQuery('Prometheus', expression).rows[0]?.points.filter(point => point[0] >= from) || [];
  return {
    query,
    request: series(query.request),
    errors: series(query.errors),
    p95: series(query.p95),
    up: series(query.up),
    logs: runPracticeQuery('Loki', query.logs).rows.filter(row => row.time >= from),
    traces: runPracticeQuery('Tempo', query.traces).rows.filter(row => row.time >= from),
  };
}

function last(points) { return points.at(-1)?.[1] || 0; }
function traceRows(traces) { return traces.slice(0, 20).map(row => ({ Time: formatTime(row.time), 'Trace ID': row.traceId, Service: row.service, Duration: row.duration + ' ms', Status: row.status })); }
function logRows(logs) { return logs.slice(0, 20).map(row => ({ Time: formatTime(row.time), Level: row.labels.severity_text, Line: row.message, trace_id: row.labels.trace_id })); }

function panelContent(uid, panel, data) {
  const id = panel.id;
  const request = last(data.request);
  const errors = last(data.errors);
  const p95 = last(data.p95);
  const up = last(data.up);
  if (uid === 'bibbidi-alerts') {
    const stats = {
      11: [up ? '1' : '0', data.up, up ? 'green' : 'red', 'up'],
      12: [String(Math.round(errors * 300)), data.errors, errors * 300 > 10 ? 'red' : 'orange', 'errors'],
      13: [String(Math.round(errors * 120)), data.errors, 'orange'],
      14: ['0 / 40%', data.request, 'green'],
      15: ['62%', data.request, 'green'],
      16: ['38%', data.p95, 'green'],
      21: [Math.round(p95 * 1000) + ' ms', data.p95, p95 > 1 ? 'orange' : 'green', 'p95'],
      22: [Math.round(p95 * 1900) + ' ms', data.p95, 'green', 'p95'],
      23: [String(data.logs.length), null, data.logs.length > 15 ? 'orange' : 'green', 'logs'],
      24: ['0', null, 'green'],
      25: ['54%', data.request, 'green'],
      26: ['0', null, 'green'],
    };
    if (stats[id]) { const [value, points, tone, queryKey] = stats[id]; return { value, points, tone, queryKey }; }
    if (id === 1) return { rows: [{ Rule: 'C2 backend 수집', State: up ? 'Normal' : 'Firing' }, { Rule: 'W1·C1 5xx', State: errors * 300 > 10 ? 'Firing' : 'Normal' }, { Rule: 'W4 ERROR 로그', State: data.logs.length > 15 ? 'Firing' : 'Normal' }] };
    if (id === 31) return { rows: traceRows(data.traces), queryKey: 'traces' };
    if (id === 32) return { rows: traceRows(data.traces.filter(row => row.duration > 1000)), queryKey: 'traces' };
    if (id === 41) return { rows: logRows(data.logs), queryKey: 'logs' };
    if (id === 42) return { rows: logRows(data.logs.slice(0, 4)), queryKey: 'logs' };
    if (id === 43) return { rows: [], queryKey: 'logs' };
  }
  if (uid === 'bibbidi-app') {
    const stats = {
      2: [up ? '1' : '0', null, up ? 'green' : 'red', 'up'],
      3: [request.toFixed(1) + ' req/s', null, 'blue', 'request'],
      4: [(request ? errors / request * 100 : 0).toFixed(2) + '%', null, 'green', 'errors'],
      5: [Math.round(p95 * 1000) + ' ms', null, 'orange', 'p95'],
      6: ['54%', null, 'green'],
      7: ['14 d', null, 'green'],
    };
    if (stats[id]) { const [value, points, tone, queryKey] = stats[id]; return { value, points, tone, queryKey }; }
    if (id === 11) return { points: data.request, queryKey: 'request' };
    if (id === 12) return { points: data.p95, queryKey: 'p95' };
    if ([13, 14, 15].includes(id)) {
      const rows = [
        { API: 'POST /api/wedding-profiles', Value: id === 15 ? Math.round(errors * 300) : id === 14 ? Math.round(p95 * 1000) + ' ms' : Math.round(request * 0.42) + ' req/s' },
        { API: 'GET /api/wedding-profiles', Value: id === 15 ? 0 : id === 14 ? Math.round(p95 * 780) + ' ms' : Math.round(request * 0.32) + ' req/s' },
        { API: 'GET /api/members/me', Value: id === 15 ? 0 : id === 14 ? Math.round(p95 * 500) + ' ms' : Math.round(request * 0.18) + ' req/s' },
      ];
      return { rows };
    }
    if (id === 21) return { points: data.request, legend: 'active · idle · pending · max' };
    if (id === 22) return { points: data.request, legend: 'used · max · live' };
    if (id === 23) return { points: data.p95, legend: 'CPU · GC pause' };
  }
  if (uid === 'bibbidi-infra') {
    if (id === 2) return { value: '62%', gauge: true, tone: 'green' };
    if (id === 11) return { value: '4 / 4', tone: 'green' };
    if (id === 14) return { value: '0', tone: 'green' };
    if (id === 15) return { value: '12.4 K', tone: 'blue' };
    if (id === 4) return { points: data.errors };
    if (id === 5) return { points: data.request };
    return { points: id === 26 ? data.up : data.request };
  }
  return { value: 'No data', tone: 'blue' };
}

function GrafanaPanel({ uid, panel, rowBaseY, data, onOpenQuery, onTraceSelect }) {
  const theme = useTheme2();
  const [ref, width] = useWidth();
  const content = panelContent(uid, panel, data);
  const pointValues = content.points?.map(point => point[1]) || [];
  const originalQueries = panel.queries.map(item => item.expr).filter(Boolean);
  const queryKey = content.queryKey;
  const action = queryKey && <Button variant="secondary" fill="text" size="sm" onClick={() => onOpenQuery(queryKey === 'logs' ? 'Loki' : queryKey === 'traces' ? 'Tempo' : 'Prometheus', data.query[queryKey])}>Explore</Button>;
  const columns = content.rows?.length ? Object.keys(content.rows[0]).map(name => name === 'trace_id'
    ? { id: name, header: name, cell: ({ value }) => <Button variant="secondary" fill="text" size="sm" onClick={() => onTraceSelect(value)}>{value} ↗</Button> }
    : { id: name, header: name }) : [];
  const sparkline = pointValues.length ? {
    x: { name: 'Time', type: FieldType.time, values: content.points.map(point => point[0]), config: {} },
    y: { name: panel.title, type: FieldType.number, values: pointValues, state: { range: { min: Math.min(...pointValues), max: Math.max(...pointValues) } }, config: { color: { mode: 'fixed', fixedColor: palette[content.tone || 'blue'] } } },
  } : null;
  const timeRange = content.points?.length ? { from: dateTime(content.points[0][0]), to: dateTime(content.points.at(-1)[0]), raw: { from: 'now-30m', to: 'now' } } : null;
  return <div className="gp-dashboard-panel" ref={ref} style={{ gridColumn: (panel.x + 1) + ' / span ' + panel.w, gridRow: (panel.y - rowBaseY + 1) + ' / span ' + panel.h }}>
    <PanelChrome title={panel.title} description={originalQueries.join('\n')} actions={action} padding="md">
      {content.value != null && (content.gauge
        ? <Gauge theme={theme} width={Math.max(150, width - 32)} height={Math.max(100, panel.h * 25 - 35)} field={{ min: 0, max: 100, thresholds: { mode: 'absolute', steps: [{ color: 'green', value: 0 }, { color: 'orange', value: 80 }] } }} showThresholdMarkers={false} showThresholdLabels={false} value={{ text: content.value, numeric: Number.parseFloat(content.value), color: palette[content.tone || 'blue'] }} />
        : <BigValue theme={theme} width={Math.max(150, width - 32)} height={Math.max(55, panel.h * 25 - 35)} value={{ text: content.value, numeric: Number.parseFloat(content.value) || 0, color: palette[content.tone || 'blue'] }} colorMode={BigValueColorMode.Value} graphMode={BigValueGraphMode.None} />)}
      {content.points?.length > 0 && panel.type === 'timeseries' && <TimeSeries width={Math.max(150, width - 32)} height={Math.max(120, panel.h * 25 - 48)} frames={[{ name: panel.title, length: content.points.length, fields: [sparkline.x, sparkline.y] }]} timeZone="browser" timeRange={timeRange} legend={{ showLegend: false, displayMode: 'list', placement: 'bottom' }} />}
      {content.points?.length > 0 && panel.type !== 'timeseries' && content.value == null && <Sparkline sparkline={sparkline} theme={theme} width={Math.max(150, width - 32)} height={Math.max(100, panel.h * 25 - 50)} />}
      {content.rows && (content.rows.length ? <InteractiveTable columns={columns} data={content.rows} pageSize={8} /> : <div className="gp-dashboard-no-data">No data</div>)}
      {content.legend && <Badge color="blue" text={content.legend} />}
    </PanelChrome>
  </div>;
}

export default function PracticeDashboard({ environment, onEnvironmentChange, rangeMinutes, onRangeChange, onContextChange, onOpenQuery, onTraceSelect }) {
  const [uid, setUid] = useState('bibbidi-alerts');
  const [refresh, setRefresh] = useState(0);
  const model = dashboardManifest[uid];
  const data = useMemo(() => getDashboardData(environment, rangeMinutes), [environment, rangeMinutes, refresh]);
  function changeDashboard(nextUid) {
    setUid(nextUid);
    onContextChange(nextUid === 'bibbidi-alerts' ? 'production' : 'development', nextUid === 'bibbidi-alerts' ? 60 : nextUid === 'bibbidi-app' ? 180 : 360);
  }
  return <div className="gp-dashboard" aria-label="Bibbidi Grafana dashboard">
    <div className="gp-dashboard-toolbar">
      <div><strong>{model.title}</strong><span>{model.uid} · Grafana 원본 패널 배치 · {model.refresh || '수동'} 새로고침</span></div>
      <div className="gp-dashboard-filters"><label>env <Select aria-label="환경" menuShouldPortal={false} options={envOptions} value={environment} onChange={option => onEnvironmentChange(option?.value || environment)} /></label><Select aria-label="시간 범위" menuShouldPortal={false} options={rangeOptions} value={rangeMinutes} onChange={option => onRangeChange(option?.value || rangeMinutes)} /><Button variant="secondary" icon="sync" onClick={() => setRefresh(value => value + 1)}>Refresh</Button></div>
    </div>
    <TabsBar>{dashboardIds.map(item => <Tab key={item} label={dashboardNames[item]} active={item === uid} onChangeTab={() => changeDashboard(item)} />)}</TabsBar>
    {model.rows.map((row, index) => <section className="gp-dashboard-row" key={index}>
      {row.title && <h3>{row.title.replace('$env', environment).replace('${instance:text}', '전체 EC2')}</h3>}
      <div className="gp-dashboard-grid">{row.panels.map(panel => <GrafanaPanel key={panel.id} uid={uid} panel={panel} rowBaseY={Math.min(...row.panels.map(item => item.y))} data={data} onOpenQuery={onOpenQuery} onTraceSelect={onTraceSelect} />)}</div>
    </section>)}
  </div>;
}
