import { useState } from "react";
import { alternatives, sources } from "./content";
import { ToolLearningPaths } from "./ToolLessonPage";

const layers = [
  {
    name: "수집과 전달",
    current: "Alloy",
    ref: "alloy",
    alternatives: [
      ["OpenTelemetry Collector", "collector"],
      ["Fluent Bit", "fluentbit"],
    ],
    options: [
      {
        name: "Alloy",
        bestFor: "메트릭·로그·트레이스를 Grafana 저장소로 한 번에 보낼 때",
        strengths: "컴포넌트 그래프로 수집·처리·전달을 한 설정에서 연결합니다.",
        limits: "새로운 컴포넌트와 운영 방식 학습이 필요합니다.",
        ref: "alloy",
      },
      {
        name: "OpenTelemetry Collector",
        bestFor: "OTLP 기반 트레이스와 여러 벤더로 내보내야 할 때",
        strengths: "벤더 중립적인 receiver·processor·exporter 생태계가 넓습니다.",
        limits: "Grafana 신호별 파이프라인은 직접 설계하고 운영해야 합니다.",
        ref: "collector",
      },
      {
        name: "Fluent Bit",
        bestFor: "가벼운 로그 수집과 변환만 필요할 때",
        strengths: "작은 에이전트로 로그 입력과 출력에 집중할 수 있습니다.",
        limits: "메트릭·트레이스를 함께 다루는 구성은 별도 도구가 필요합니다.",
        ref: "fluentbit",
      },
    ],
    why: "앱에서 나온 로그·메트릭·트레이스가 저장소에 닿기 전에 경로를 한곳에서 확인하려고 씁니다.",
    choose:
      "Grafana 저장소와 OTLP를 함께 연결하고, 파이프라인을 컴포넌트로 관리할 때",
    reconsider:
      "이미 OpenTelemetry Collector 설정과 운영 경험이 있거나, 로그 수집에만 집중한 가벼운 구성이 필요할 때",
    check: "수집 대상 발견 → 수신 → 처리 → 쓰기 단계를 각각 확인하세요.",
    refs: ["alloy", "alloypipe", "collector", "fluentbit"],
  },
  {
    name: "메트릭 저장",
    current: "Prometheus",
    ref: "prom",
    alternatives: [
      ["Grafana Mimir", "mimir"],
      ["Datadog Metrics", "datadogmetrics"],
    ],
    options: [
      {
        name: "Prometheus",
        bestFor: "작은 규모에서 직접 운영하고 PromQL을 사용할 때",
        strengths: "구조가 단순하고 remote_write·WAL·TSDB·PromQL 흐름을 직접 확인할 수 있습니다.",
        limits: "장기 보관과 수평 확장은 별도 설계가 필요합니다.",
        ref: "prom",
      },
      {
        name: "Grafana Mimir",
        bestFor: "여러 팀의 대량 시계열과 긴 보관 기간이 필요할 때",
        strengths: "Prometheus 호환 API를 유지하며 수평 확장과 장기 보관을 지원합니다.",
        limits: "분산 구성 요소와 운영 비용이 늘어납니다.",
        ref: "mimir",
      },
      {
        name: "Datadog Metrics",
        bestFor: "저장소 운영보다 관리형 모니터링을 우선할 때",
        strengths: "수집·저장·조회 인프라를 직접 유지하지 않아도 됩니다.",
        limits: "사용량과 기능에 따른 비용, 제품 종속성을 함께 계산해야 합니다.",
        ref: "datadogmetrics",
      },
    ],
    why: "시간에 따라 달라지는 수치를 저장하고 PromQL로 오류율·지연·포화를 물으려고 씁니다.",
    choose:
      "직접 운영할 수 있고, 한 인스턴스에서 필요한 보관 기간과 조회 부하를 감당할 때",
    reconsider:
      "긴 보관 기간, 여러 팀의 대량 시계열, 수평 확장이나 관리형 운영이 중요해질 때",
    check: "데이터량뿐 아니라 라벨의 종류와 보관 기간을 함께 추정하세요.",
    refs: ["prom", "promql", "cardinality", "mimir", "datadogmetrics"],
  },
  {
    name: "로그 저장",
    current: "Loki",
    ref: "loki",
    alternatives: [
      ["Elasticsearch", "elastic"],
      ["Datadog Logs", "datadoglogs"],
    ],
    options: [
      {
        name: "Loki",
        bestFor: "서비스·환경 라벨로 좁힌 뒤 Grafana에서 사건을 조사할 때",
        strengths: "라벨 인덱스와 압축 청크로 로그 저장 구조를 단순하게 유지합니다.",
        limits: "본문 전체의 복잡한 전문 검색은 검색 엔진보다 불리할 수 있습니다.",
        ref: "loki",
      },
      {
        name: "Elasticsearch",
        bestFor: "로그 필드 전체를 색인하고 전문 검색·집계를 많이 할 때",
        strengths: "문서 필드와 검색 분석기를 활용한 폭넓은 검색이 가능합니다.",
        limits: "색인·샤드·클러스터 용량을 직접 설계하고 운영해야 합니다.",
        ref: "elastic",
      },
      {
        name: "Datadog Logs",
        bestFor: "로그 수집과 검색 인프라를 관리형으로 운영할 때",
        strengths: "수집부터 검색·보존·연계까지 한 서비스에서 제공합니다.",
        limits: "로그 양과 보존 기간에 따른 비용을 예측해야 합니다.",
        ref: "datadoglogs",
      },
    ],
    why: "서비스·환경 라벨로 로그를 좁히고 본문이나 구조화 메타데이터에서 사건을 찾으려고 씁니다.",
    choose:
      "라벨 중심의 탐색과 Grafana 안에서 다른 신호로 이동하는 흐름이 중요할 때",
    reconsider: "여러 필드의 전문 검색과 복잡한 문서 검색이 핵심 요구일 때",
    check:
      "결혼 정보 ID와 trace_id처럼 값이 계속 늘어나는 필드를 인덱스 라벨로 쓰지 마세요.",
    refs: ["loki", "lokilabel", "logql", "elastic", "datadoglogs"],
  },
  {
    name: "트레이스 저장",
    current: "Tempo",
    ref: "tempo",
    alternatives: [
      ["Jaeger", "jaeger"],
      ["Datadog APM", "datadog"],
    ],
    options: [
      {
        name: "Tempo",
        bestFor: "OpenTelemetry 트레이스를 Grafana에서 로그·메트릭과 연결할 때",
        strengths: "trace ID와 TraceQL 중심으로 저비용 트레이스 저장을 구성합니다.",
        limits: "계측과 수집 파이프라인은 애플리케이션과 Alloy가 별도로 맡아야 합니다.",
        ref: "tempo",
      },
      {
        name: "Jaeger",
        bestFor: "오픈소스 분산 추적 시스템을 직접 운영할 때",
        strengths: "분산 추적의 구성 요소와 UI를 독립적으로 운영할 수 있습니다.",
        limits: "로그·메트릭과의 상관관계는 별도 통합 작업이 필요합니다.",
        ref: "jaeger",
      },
      {
        name: "Datadog APM",
        bestFor: "계측·트레이스·서비스 맵을 관리형으로 묶을 때",
        strengths: "APM 탐색과 서비스 관계를 빠르게 사용할 수 있습니다.",
        limits: "에이전트와 사용량 기반 비용, 제품 내 계측 방식을 검토해야 합니다.",
        ref: "datadog",
      },
    ],
    why: "한 요청의 span을 보관하고 느린 구간을 찾아 로그의 trace_id와 이어 보려고 씁니다.",
    choose:
      "OpenTelemetry 전송을 사용하고 Grafana에서 로그·메트릭과 연결하려 할 때",
    reconsider: "이미 다른 APM의 계측·검색·운영 체계가 자리 잡았을 때",
    check:
      "샘플링 비율과 보관 기간을 먼저 정하고, 로그와 같은 trace_id로 연결되는지 확인하세요.",
    refs: ["tempo", "otel", "jaeger", "datadog", "context"],
  },
  {
    name: "조회와 알림",
    current: "Grafana",
    ref: "grafana",
    alternatives: [
      ["Kibana", "kibana"],
      ["New Relic", "newrelic"],
    ],
    options: [
      {
        name: "Grafana",
        bestFor: "Prometheus·Loki·Tempo를 한 화면에서 함께 조사할 때",
        strengths: "데이터소스별 쿼리와 대시보드·알림·상관관계를 한곳에서 구성합니다.",
        limits: "데이터를 저장하지 않으므로 각 백엔드의 운영 상태에 의존합니다.",
        ref: "grafana",
      },
      {
        name: "Kibana",
        bestFor: "Elasticsearch 문서와 집계를 중심으로 탐색할 때",
        strengths: "Elasticsearch 필드와 Discover·시각화를 자연스럽게 연결합니다.",
        limits: "Loki·Tempo 등 다른 백엔드와 한 흐름으로 묶으려면 추가 설정이 필요합니다.",
        ref: "kibana",
      },
      {
        name: "New Relic",
        bestFor: "관리형 관측 제품 안에서 수집부터 분석까지 운영할 때",
        strengths: "APM·로그·메트릭·알림을 관리형 경험으로 묶습니다.",
        limits: "요금 모델과 제품별 계측 방식을 기존 스택과 비교해야 합니다.",
        ref: "newrelic",
      },
    ],
    why: "저장소를 데이터 소스로 연결해 같은 시간대의 숫자·로그·트레이스를 조사하려고 씁니다.",
    choose: "여러 데이터 소스를 한 화면에서 조회하고 대시보드와 알림을 만들 때",
    reconsider:
      "단일 제품에 데이터 수집부터 조회까지 묶거나 다른 제품의 기존 운영 화면을 유지할 때",
    check:
      "대시보드 화면과 별도로 알림 규칙의 평가 조건과 연락처를 점검하세요.",
    refs: ["grafana", "explore", "alert", "kibana", "newrelic"],
  },
];

function Docs({ ids }) {
  return (
    <div className="guide-docs">
      {[...new Set(ids)].map((id) => (
        <a key={id} href={sources[id][1]} target="_blank" rel="noreferrer">
          {sources[id][0]} ↗
        </a>
      ))}
    </div>
  );
}

function ScenarioProfile({ form }) {
  const profile = {
    scene:
      form.teams === "many"
        ? "여러 팀이 결혼 상담·일정·파트너 연동을 나눠 운영합니다. 공통 대시보드와 권한 경계가 필요합니다."
        : "한 팀이 회원 매칭·상담 일정·알림 흐름을 함께 운영합니다. 먼저 조사 경로를 짧게 만들 수 있습니다.",
    incident:
      form.search === "full"
        ? "상담 메모나 파트너 응답 같은 여러 필드에서 사건을 찾아야 합니다."
        : "특정 시간대의 API 오류율과 trace_id로 한 상담 요청을 따라가면 됩니다.",
    scale:
      form.volume === "high"
        ? "유입량이 높은 상황을 가정합니다. 보관 기간과 저장소 확장 비용을 먼저 계산합니다."
        : "유입량이 낮은 상황을 가정합니다. 관리할 구성 요소를 줄이고 조사 시간을 측정합니다.",
    ownership:
      form.ops === "few"
        ? "관측 전담 인력이 적습니다. 직접 운영하는 구성 요소 수와 장애 대응 부담을 제한해야 합니다."
        : "관측 전담 인력이 있습니다. 수평 확장과 세밀한 보존·검색 정책을 운영할 여지가 있습니다.",
  };
  return (
    <div className="scenario-profile">
      <div className="scenario-profile-lead">
        <span>가상 운영 장면</span>
        <strong>{profile.scene}</strong>
      </div>
      <div>
        <b>이번에 답할 질문</b>
        <p>{profile.incident}</p>
      </div>
      <div>
        <b>규모 가정</b>
        <p>{profile.scale}</p>
      </div>
      <div>
        <b>운영 조건</b>
        <p>{profile.ownership}</p>
      </div>
    </div>
  );
}

function Decision({ form }) {
  const managed =
    form.ops === "few" && (form.volume === "high" || form.teams === "many");
  const full = form.search === "full";
  const collector = form.otel === "existing";
  return (
    <div className="decision-result" aria-live="polite">
      <div className="decision-result-head">
        <span>현재 조건으로 살펴볼 구성</span>
        <strong>
          {managed
            ? "운영 부담을 낮추는 구성을 함께 비교하세요"
            : "작게 시작하며 병목을 측정하세요"}
        </strong>
        <p>
          {managed
            ? "데이터나 조직이 커졌는데 운영 인력이 적습니다. 직접 운영 비용과 관리형 제품의 비용을 함께 계산해야 합니다."
            : "필요한 신호부터 수집하고 보관 기간·조회 부하를 측정하면 다음 선택의 근거가 생깁니다."}
        </p>
      </div>
      <ScenarioProfile form={form} />
      <div className="decision-path">
        <div>
          <span>수집기</span>
          <strong>
            {collector ? "OpenTelemetry Collector 또는 Alloy" : "Alloy"}
          </strong>
          <p>
            {collector
              ? "기존 OTel 설정을 재사용할 수 있는지 확인하세요."
              : "로그·메트릭·트레이스 파이프라인을 한곳에서 점검하세요."}
          </p>
          <Docs
            ids={collector ? ["collector", "alloy"] : ["alloy", "alloypipe"]}
          />
        </div>
        <div>
          <span>메트릭</span>
          <strong>
            {managed
              ? "Grafana Cloud Metrics 또는 자체 운영 Mimir"
              : "Prometheus"}
          </strong>
          <p>
            {managed
              ? "수평 확장과 관리형 운영의 비용을 비교하세요."
              : "라벨 수와 보관 기간을 먼저 정하세요."}
          </p>
          <Docs
            ids={managed ? ["cloudmetrics", "mimir"] : ["prom", "cardinality"]}
          />
        </div>
        <div>
          <span>로그</span>
          <strong>{full ? "Elasticsearch와 Loki를 시험 비교" : "Loki"}</strong>
          <p>
            {full
              ? "실제 검색어를 가져와 필드 검색의 필요를 확인하세요."
              : "서비스·환경 라벨로 좁힌 뒤 본문을 찾는 흐름을 시험하세요."}
          </p>
          <Docs ids={full ? ["elastic", "loki"] : ["loki", "lokilabel"]} />
        </div>
        <div>
          <span>트레이스·조회</span>
          <strong>Tempo + Grafana</strong>
          <p>기존 APM이 있다면 계측을 옮기는 비용까지 비교하세요.</p>
          <Docs ids={["tempo", "grafana", "jaeger", "datadog"]} />
        </div>
      </div>
      <p className="decision-caveat">
        이 결과는 제품 도입 확정이 아닙니다. 실제 요청량, 보관 기간, 검색 쿼리,
        운영 인력과 비용을 측정해 다시 고르세요.
      </p>
    </div>
  );
}

export default function ToolGuide() {
  const [form, setForm] = useState({
    teams: "one",
    ops: "few",
    volume: "low",
    search: "labels",
    otel: "new",
  });
  const [openLayer, setOpenLayer] = useState(null);
  const set = (name, value) => setForm((v) => ({ ...v, [name]: value }));
  return (
    <div className="tool-guide">
      <header className="guide-hero">
        <span className="guide-overline">TOOL DECISION GUIDE</span>
        <h1>도구</h1>
        <p>
          유명한 도구를 고르는 것보다 먼저, 우리 팀이 어떤 질문에 답해야 하는지
          적어 봅시다. 수집·저장·조회는 다른 일입니다.
        </p>
        <div className="guide-hero-notes">
          <span>01 질문을 적기</span>
          <span>02 신호의 길 정하기</span>
          <span>03 운영 비용 비교하기</span>
        </div>
      </header>
      <div className="guide-body">
        <section className="guide-intro">
          <span className="story-section-label">BEFORE CHOOSING</span>
          <h2>도구 이름보다 먼저 정할 네 가지</h2>
          <div className="guide-criteria">
            <article>
              <b>01</b>
              <h3>무엇을 찾을까?</h3>
              <p>
                장애 시각의 오류 비율이 필요한가요, 특정 결혼 정보의 로그 본문이
                필요한가요? 질문에 따라 메트릭·로그·트레이스의 비중이
                달라집니다.
              </p>
              <Docs ids={["sre", "prom", "loki", "tempo"]} />
            </article>
            <article>
              <b>02</b>
              <h3>얼마나 오래 보관할까?</h3>
              <p>
                데이터량은 초당 유입량과 보관 기간을 함께 봐야 합니다. 메트릭
                라벨과 로그 인덱스의 값 종류도 비용에 영향을 줍니다.
              </p>
              <Docs ids={["prom", "mimir", "lokilabel", "cardinality"]} />
            </article>
            <article>
              <b>03</b>
              <h3>누가 운영할까?</h3>
              <p>
                직접 운영하면 설정과 장애 대응을 팀이 맡습니다. 관리형 서비스는
                운영 부담을 줄일 수 있지만 비용과 데이터 이동을 따져야 합니다.
              </p>
              <Docs ids={["cloudmetrics", "mimir", "prom"]} />
            </article>
            <article>
              <b>04</b>
              <h3>이미 가진 것이 뭘까?</h3>
              <p>
                기존 OpenTelemetry Collector나 APM이 있다면 교체 비용도
                계산합니다. 새 도구의 장점만 보고 이미 작동하는 경로를 버릴
                이유는 없습니다.
              </p>
              <Docs ids={["collector", "jaeger", "datadog"]} />
            </article>
          </div>
        </section>
        <ToolLearningPaths />
        <section className="guide-stack">
          <span className="story-section-label">THE CURRENT STACK</span>
          <h2>비비디는</h2>
          <p className="guide-section-lead">
            수집기가 데이터를 모으고, 신호마다 다른 저장소가 보관합니다.
            Grafana는 그 결과를 조회합니다. 어느 한 층이 비어도 조사가 끊깁니다.
          </p>
          <div
            className="guide-pipeline"
            role="img"
            aria-label="결혼 서비스에서 Alloy로, Prometheus Loki Tempo를 거쳐 Grafana로 조회"
          >
            <span>결혼 서비스</span>
            <i>→</i>
            <span>Alloy</span>
            <i>→</i>
            <span>Prometheus · Loki · Tempo</span>
            <i>→</i>
            <span>Grafana</span>
          </div>
          <Docs ids={["alloy", "prom", "loki", "tempo", "grafana"]} />
          <div className="layer-list">
            {layers.map((layer, i) => (
              <article className="layer-card" key={layer.name}>
                <div className="layer-side">
                  <span>
                    {String(i + 1).padStart(2, "0")} / {layer.name}
                  </span>
                  <h3>{layer.current}</h3>
                  <p>{layer.why}</p>
                </div>
                <div className="layer-detail">
                  <div>
                    <b>이럴 때 먼저 선택</b>
                    <p>{layer.choose}</p>
                  </div>
                  <div>
                    <b>다른 도구를 볼 때</b>
                    <p>{layer.reconsider}</p>
                  </div>
                  <div>
                    <b>도입 전 확인</b>
                    <p>{layer.check}</p>
                  </div>
                  <div className="layer-alternatives">
                    <b>대표 대안</b>
                    <p>
                      {layer.alternatives.map(([name]) => name).join(" · ")}
                    </p>
                  </div>
                  <Docs ids={layer.refs} />
                </div>
                <div className="layer-options">
                  <button
                    type="button"
                    className="layer-options-toggle"
                    aria-expanded={openLayer === i}
                    aria-controls={`layer-options-${i}`}
                    onClick={() => setOpenLayer(openLayer === i ? null : i)}
                  >
                    <span>
                      <b>대표 도구를 같은 기준으로 비교</b>
                      <small>무엇을 잘하고, 어디서 비용이 생기는지 확인하세요.</small>
                    </span>
                    <strong aria-hidden="true">{openLayer === i ? "−" : "+"}</strong>
                  </button>
                  {openLayer === i && (
                    <div className="layer-options-body" id={`layer-options-${i}`}>
                      <div className="layer-options-grid">
                        {layer.options.map((option) => (
                          <article key={option.name} className="layer-option">
                            <div className="layer-option-title">
                              <h4>{option.name}</h4>
                              <a href={sources[option.ref][1]} target="_blank" rel="noreferrer">
                                공식 문서 ↗
                              </a>
                            </div>
                            <dl>
                              <div>
                                <dt>잘 맞는 상황</dt>
                                <dd>{option.bestFor}</dd>
                              </div>
                              <div>
                                <dt>장점</dt>
                                <dd>{option.strengths}</dd>
                              </div>
                              <div>
                                <dt>주의할 점</dt>
                                <dd>{option.limits}</dd>
                              </div>
                            </dl>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="guide-simulator">
          <span className="story-section-label">TRY A SCENARIO</span>
          <h2>상황을 바꾸며 선택해 보기</h2>
          <p className="guide-section-lead">
            결혼 서비스에서 실제로 조사할 장면을 먼저 가정해 봅니다. 팀 규모만
            바꾸는 것이 아니라 운영 인력, 유입량, 검색 질문, 기존 계측까지 바꿔야
            선택 결과가 달라집니다. 선택할 때마다 아래의 운영 장면과 근거를
            확인하세요.
          </p>
          <div className="guide-fields">
            <label>
              팀 구성
              <select
                value={form.teams}
                onChange={(e) => set("teams", e.target.value)}
              >
                <option value="one">한 팀</option>
                <option value="many">3개 이상 팀</option>
              </select>
              <small>결혼 상담·일정·파트너 연동 담당의 수</small>
            </label>
            <label>
              운영 인력
              <select
                value={form.ops}
                onChange={(e) => set("ops", e.target.value)}
              >
                <option value="few">전담자 없음·겸임</option>
                <option value="enough">전담 SRE·플랫폼 팀</option>
              </select>
              <small>장애 대응과 저장소 운영을 맡을 사람</small>
            </label>
            <label>
              데이터량
              <select
                value={form.volume}
                onChange={(e) => set("volume", e.target.value)}
              >
                <option value="low">작은 유입량 (가정)</option>
                <option value="high">높은 유입량 (가정)</option>
              </select>
              <small>로그·메트릭·트레이스가 들어오는 속도</small>
            </label>
            <label>
              로그 검색
              <select
                value={form.search}
                onChange={(e) => set("search", e.target.value)}
              >
                <option value="labels">서비스·시간 중심</option>
                <option value="full">상담 메모·필드 전문 검색</option>
              </select>
              <small>장애 때 실제로 입력할 검색 질문</small>
            </label>
            <label>
              기존 계측
              <select
                value={form.otel}
                onChange={(e) => set("otel", e.target.value)}
              >
                <option value="new">새로 시작</option>
                <option value="existing">OTel Collector 운영 중</option>
              </select>
              <small>이미 배포한 수집기와 설정을 재사용할지</small>
            </label>
          </div>
          <Decision form={form} />
        </section>
        <section className="guide-comparison">
          <span className="story-section-label">COMPARE THE OPTIONS</span>
          <h2>짧게 비교하기</h2>
          <div
            className="comparison-table"
            role="table"
            aria-label="관측 도구 비교"
          >
            <div role="row">
              <b role="columnheader">역할</b>
              <b role="columnheader">현재 선택</b>
              <b role="columnheader">대표 대안</b>
              <b role="columnheader">선택 기준</b>
            </div>
            {alternatives.map((row) => (
              <div role="row" key={row.task}>
                <span role="cell">{row.task}</span>
                <strong role="cell">{row.current}</strong>
                <span role="cell">{row.others.join(" · ")}</span>
                <span role="cell">
                  {row.choice}
                  <small>{row.trade}</small>
                  <Docs ids={row.refs} />
                </span>
              </div>
            ))}
          </div>
          <p className="guide-case-note">
            회사 규모별 실제 사용 사례는 공식 제품 문서로 해당 회사의 사용을
            직접 확인한 경우에만 추가합니다. 근거가 없는 칸은 추정으로 채우지
            않았습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
