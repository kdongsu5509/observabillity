import { useState } from "react";
import { sources } from "./content";

const maps = {
  transport: [
    {
      id: "otel",
      title: "OpenTelemetry",
      subtitle: "앱에서 데이터를 만들기",
      intro:
        "OpenTelemetry는 관측 데이터를 만들고 전달하기 위한 API, SDK, 도구와 규약의 모음입니다. 저장소나 단일 서버 프로그램의 이름은 아닙니다.",
      note: "결혼 정보 요청에 span을 만들고 서비스 이름 같은 속성을 붙입니다. OTLP는 수집기로 데이터를 보낼 때 쓰는 프로토콜입니다.",
      refs: ["otel", "otlp"],
    },
    {
      id: "alloy-receive",
      title: "Alloy · 수신",
      subtitle: "OTLP를 받는 입구",
      intro:
        "Alloy는 실제로 배포해 실행하는 수집기입니다. OTLP 수신 컴포넌트가 앱에서 보낸 트레이스를 받습니다.",
      note: "앱이 span을 만들었다는 사실과 Alloy가 받았다는 사실은 다릅니다. 주소와 수신 컴포넌트를 각각 확인해야 합니다.",
      refs: ["alloy", "alloytelemetry", "otlp"],
    },
    {
      id: "alloy-process",
      title: "Alloy · 처리",
      subtitle: "컴포넌트로 경로 잇기",
      intro:
        "Alloy 설정은 컴포넌트의 출력과 다음 컴포넌트의 입력을 연결합니다. 수집한 신호를 처리하고 목적지별로 보낼 수 있습니다.",
      note: "메트릭 스크레이프, 로그 읽기, OTLP 트레이스 수신은 별도 경로입니다. 한 경로가 정상이라고 나머지도 정상인 것은 아닙니다.",
      refs: ["alloypipe", "alloytelemetry"],
    },
    {
      id: "tempo",
      title: "Tempo",
      subtitle: "트레이스 보관과 조회",
      intro:
        "Tempo는 Alloy에서 전달된 트레이스를 저장하고 trace ID나 TraceQL로 조회할 수 있게 합니다.",
      note: "Grafana에 트레이스가 없다면 앱 내보내기 → Alloy 수신·처리·전송 → Tempo 수신 순서로 확인합니다.",
      refs: ["tempo", "tempoarch"],
    },
  ],
  prometheus: [
    {
      id: "target",
      title: "대상 발견",
      subtitle: "무엇을 읽을까",
      intro:
        "Prometheus는 설정이나 서비스 발견으로 스크레이프할 대상의 주소를 정합니다.",
      note: "대상을 발견하지 못하면 메트릭이 0인 것이 아니라 시계열 자체가 들어오지 않을 수 있습니다.",
      refs: ["promarch"],
    },
    {
      id: "scrape",
      title: "스크레이프",
      subtitle: "HTTP로 메트릭 가져오기",
      intro:
        "Prometheus는 계측된 대상의 메트릭 엔드포인트를 주기적으로 읽습니다. 비비디 예시의 Spring Boot Actuator가 한 대상입니다.",
      note: "Alloy가 중간에서 스크레이프해 원격 쓰기로 전달하는 구성도 가능합니다. 이 그림은 Prometheus가 직접 읽는 기본 경로입니다.",
      refs: ["promarch", "metrics", "alloytelemetry"],
    },
    {
      id: "tsdb",
      title: "로컬 TSDB",
      subtitle: "라벨과 샘플 보관",
      intro:
        "스크레이프한 샘플은 시간과 라벨을 가진 시계열로 로컬 저장소에 보관됩니다. 라벨 조합이 늘면 시계열 수도 늘어납니다.",
      note: "weddingId처럼 계속 달라지는 값을 메트릭 라벨에 넣을지 먼저 검토해야 합니다.",
      refs: ["promarch", "cardinality"],
    },
    {
      id: "query",
      title: "PromQL · 규칙",
      subtitle: "조회와 평가",
      intro:
        "PromQL로 시계열을 조회하고 기록 규칙이나 경보 규칙을 평가할 수 있습니다. Grafana 같은 클라이언트가 Prometheus API로 결과를 시각화합니다.",
      note: "패널이 비었다면 조회식만 고치기 전에 대상 상태와 스크레이프 성공부터 확인합니다.",
      refs: ["promarch", "promql"],
    },
  ],
  loki: [
    {
      id: "distributor",
      title: "Distributor",
      subtitle: "로그 쓰기 입구",
      intro:
        "들어온 로그 스트림을 받아 라벨 집합을 기준으로 적절한 Ingester에 보냅니다.",
      note: "쓰기 요청은 복제 설정에 따라 여러 Ingester에 전달됩니다.",
      refs: ["lokiarch"],
    },
    {
      id: "ingester",
      title: "Ingester",
      subtitle: "스트림을 청크로 묶기",
      intro:
        "로그 줄을 스트림별 청크에 쌓습니다. 청크는 같은 테넌트와 라벨 집합의 로그를 묶는 단위입니다.",
      note: "로그 본문 전체를 라벨 인덱스로 만드는 방식이 아닙니다. 검색을 좁힐 라벨을 먼저 고릅니다.",
      refs: ["lokiarch", "lokilabel"],
    },
    {
      id: "store",
      title: "인덱스 · 청크 저장소",
      subtitle: "찾을 곳과 본문 분리",
      intro:
        "인덱스는 라벨로 스트림을 찾는 데 쓰고, 실제 로그 줄은 청크에 저장합니다.",
      note: "결혼 정보 ID처럼 고유한 값은 로그 본문이나 구조화 메타데이터에서 찾습니다. 구조화 메타데이터는 지원하는 인덱스와 청크 스키마가 필요합니다. 고유값이 많은 인덱스 라벨은 피합니다.",
      refs: ["lokiarch", "lokilabel", "lokimetadata"],
    },
    {
      id: "querier",
      title: "Query frontend · Querier",
      subtitle: "LogQL 읽기 경로",
      intro:
        "Query frontend가 LogQL 요청을 나누고, Querier가 최근 Ingester 데이터와 저장된 청크에서 결과를 가져옵니다.",
      note: "느린 검색은 라벨 선택, 조회 시간 범위, 본문 필터를 차례로 점검합니다.",
      refs: ["lokiarch", "logql"],
    },
  ],
  tempo: [
    {
      id: "distributor",
      title: "Distributor",
      subtitle: "span 수신·검증",
      intro:
        "Alloy나 OpenTelemetry Collector에서 보낸 span을 받습니다. 배포 방식에 따라 이후 경로가 달라집니다.",
      note: "아래 경로는 최신 Tempo 문서의 마이크로서비스 모드입니다. 단일 프로세스 모드에서는 Kafka를 거치지 않습니다.",
      refs: ["tempoarch"],
    },
    {
      id: "queue",
      title: "Kafka 호환 큐",
      subtitle: "마이크로서비스 모드",
      intro:
        "Distributor가 수신한 데이터를 Kafka 호환 큐에 기록합니다. Live-store와 Block-builder가 이 데이터를 각각 읽습니다.",
      note: "단일 프로세스 모드는 이 큐 없이 Distributor가 Live-store로 직접 전달합니다.",
      refs: ["tempoarch"],
    },
    {
      id: "live",
      title: "Live-store",
      subtitle: "최근 트레이스 조회",
      intro:
        "최근 트레이스를 보관하고 조회 요청에 응답합니다. 오래 보관할 블록은 별도 경로에서 만들어집니다.",
      note: "최근 요청만 보이고 과거 요청이 없다면 장기 저장 경로를 살펴봅니다.",
      refs: ["tempoarch"],
    },
    {
      id: "block",
      title: "Block-builder",
      subtitle: "블록 만들기",
      intro:
        "Block-builder는 Live-store와 별도로 Kafka의 데이터를 읽고 블록을 만듭니다. 단일 프로세스 모드에서는 Live-store가 블록을 직접 기록합니다.",
      note: "Live-store를 거쳐서 Block-builder로 가는 순서가 아닙니다.",
      refs: ["tempoarch"],
    },
    {
      id: "object",
      title: "객체 저장소",
      subtitle: "과거 트레이스 보관",
      intro:
        "만들어진 블록을 장기 보관합니다. Querier는 이전 트레이스를 여기에서 읽습니다.",
      note: "오래된 데이터가 조회되지 않으면 이 경로를 살펴봅니다.",
      refs: ["tempoarch"],
    },
    {
      id: "query",
      title: "Query frontend",
      subtitle: "읽기 요청 분할",
      intro:
        "TraceQL 검색이나 trace ID 조회를 받아 작업으로 나누고 결과를 합칩니다.",
      note: "최근 데이터와 과거 데이터를 한 요청에서 함께 읽을 수 있습니다.",
      refs: ["tempoarch"],
    },
    {
      id: "querier",
      title: "Querier",
      subtitle: "최근·과거 읽기",
      intro:
        "Query frontend가 나눈 일을 받아 Live-store의 최근 데이터와 객체 저장소의 과거 블록을 각각 조회합니다.",
      note: "읽기 경로는 쓰기 경로와 별개입니다.",
      refs: ["tempoarch"],
    },
  ],
};

function Links({ refs }) {
  return (
    <div className="arch-links">
      {refs.map((id) => (
        <a key={id} href={sources[id][1]} target="_blank" rel="noreferrer">
          {sources[id][0]} ↗
        </a>
      ))}
    </div>
  );
}

export function ArchitectureMap({ kind }) {
  const nodes = maps[kind];
  const [active, setActive] = useState(0);
  if (!nodes) return null;
  const item = nodes[active];
  const nodeButton = (i) => (
    <button
      type="button"
      key={nodes[i].id}
      className={`arch-node ${active === i ? "is-active" : ""}`}
      onMouseEnter={() => setActive(i)}
      onFocus={() => setActive(i)}
      onClick={() => setActive(i)}
      aria-pressed={active === i}
      aria-controls={`arch-detail-${kind}`}
    >
      <span>{String(i + 1).padStart(2, "0")}</span>
      <strong>{nodes[i].title}</strong>
      <small>{nodes[i].subtitle}</small>
    </button>
  );
  return (
    <div className="architecture-map">
      <p className="arch-instruction">
        구성 요소에 마우스를 올리거나, 키보드 초점을 옮기거나, 터치해 보세요.
      </p>
      {kind === "tempo" ? (
        <div
          className="arch-tempo"
          role="group"
          aria-label="Tempo 쓰기와 읽기 경로"
        >
          <div className="arch-tempo-row">
            <span>쓰기</span>
            {nodeButton(0)}
            <i>→</i>
            {nodeButton(1)}
            <i>
              ↗<br />↘
            </i>
            <div className="arch-tempo-branch">
              <div>
                {nodeButton(2)}
                <small>최근 조회</small>
              </div>
              <div>
                {nodeButton(3)}
                <i>→</i>
                {nodeButton(4)}
              </div>
            </div>
          </div>
          <div className="arch-tempo-row">
            <span>읽기</span>
            {nodeButton(5)}
            <i>→</i>
            {nodeButton(6)}
            <i>
              ↗<br />↘
            </i>
            <div className="arch-tempo-branch arch-tempo-dest">
              <span>최근: Live-store</span>
              <span>과거: 객체 저장소</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="arch-nodes" role="group" aria-label="내부 구성 요소">
          {nodes.map((node, i) => (
            <div className="arch-node-wrap" key={node.id}>
              {nodeButton(i)}
              {i < nodes.length - 1 && (
                <span className="arch-arrow" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      <div
        className="arch-detail"
        id={`arch-detail-${kind}`}
        aria-live="polite"
      >
        <div>
          <span>
            구성 {String(active + 1).padStart(2, "0")} /{" "}
            {String(nodes.length).padStart(2, "0")}
          </span>
          <h3>{item.title}</h3>
        </div>
        <p>{item.intro}</p>
        <p className="arch-note">확인할 점 · {item.note}</p>
        <Links refs={item.refs} />
      </div>
    </div>
  );
}

export function TransportDeepDive() {
  return (
    <div className="architecture-deep">
      <h3>OpenTelemetry와 Alloy, 어디가 다를까요?</h3>
      <p>
        OpenTelemetry는 관측 데이터를 만드는 API·SDK와 OTLP 같은 전송 규약,
        그리고 Collector 프로젝트까지 아우릅니다. Alloy는 Grafana가 제공하는
        구체적인 수집기입니다. 앱에 OpenTelemetry를 적용하고, Alloy를 수집기로
        운영하는 조합이 가능합니다.
      </p>
      <Links refs={["otel", "collector", "alloywhy"]} />
      <div className="architecture-compare">
        <div>
          <b>구분</b>
          <b>OpenTelemetry</b>
          <b>Grafana Alloy</b>
        </div>
        <div>
          <span>주요 역할</span>
          <span>앱 계측 API·SDK, 신호와 전송 규약, Collector 프로젝트</span>
          <span>실행 중인 수집 파이프라인: 발견·수신·처리·전송</span>
        </div>
        <div>
          <span>앱에 적용할 것</span>
          <span>필요한 언어의 계측과 SDK 설정</span>
          <span>일반적으로 앱 바깥에 배포할 수집기 설정</span>
        </div>
        <div>
          <span>저장·조회</span>
          <span>자체 저장소나 대시보드를 뜻하지 않음</span>
          <span>저장소·조회 화면이 아니며 목적지로 전달</span>
        </div>
      </div>
      <div className="arch-explain-grid">
        <div>
          <h4>OpenTelemetry 안의 역할</h4>
          <p>
            API는 계측 코드가 호출할 창구입니다. SDK는 수집과 내보내기 동작을
            맡습니다. trace와 span은 요청이 지나간 구간을 표현하고, 문맥 전파는
            서비스 경계 너머의 작업을 같은 trace로 연결합니다. OTLP는 만들어진
            데이터를 수집기로 옮길 때 쓰는 규약입니다.
          </p>
          <Links refs={["otel", "otlp", "context"]} />
        </div>
        <div>
          <h4>Alloy 안의 역할</h4>
          <p>
            Alloy는 실행 중인 컴포넌트의 출력과 입력을 연결합니다. 발견한 대상을
            스크레이프하거나 로그를 읽고, OTLP를 수신할 수 있습니다. 그다음 처리
            컴포넌트를 거쳐 신호별 저장소로 전송합니다. 앱 계측과 달리 배포
            위치, 접근 권한, 전송 실패를 운영자가 점검해야 합니다.
          </p>
          <Links refs={["alloywhy", "alloytelemetry", "alloypipe"]} />
        </div>
      </div>
      <p>
        따라서 선택 질문도 다릅니다. “앱에서 어떤 표준으로 데이터를 만들까?”에는
        OpenTelemetry가 답합니다. “운영 중인 데이터를 어디서 받고 어떻게
        보낼까?”에는 Alloy 또는 다른 Collector 구성을 비교합니다.
      </p>
      <Links refs={["otel", "collector", "alloytelemetry", "alloypipe"]} />
      <ArchitectureMap kind="transport" />
    </div>
  );
}

export function StorageDeepDive() {
  return (
    <div className="architecture-deep">
      <h3>저장소 안에서는 무슨 일이 일어날까요?</h3>
      <p>
        아래 그림은 각 제품의 주요 쓰기·읽기 경로를 학습용으로 줄인 것입니다.
        실제 배포 모드와 설정에 따라 경로가 달라집니다. 구성 요소를 가리켜
        역할을 확인해 보세요.
      </p>
      <h4>Prometheus · 메트릭</h4>
      <ArchitectureMap kind="prometheus" />
      <h4>Loki · 로그</h4>
      <ArchitectureMap kind="loki" />
      <h4>Tempo · 트레이스</h4>
      <ArchitectureMap kind="tempo" />
    </div>
  );
}

const toolArchitectures = [
  {
    id: "alloy",
    name: "Grafana Alloy",
    role: "수집 · 처리 · 전달",
    summary:
      "Alloy는 데이터를 저장하지 않습니다. 여러 입력을 받아 필요한 처리만 거친 뒤 메트릭·로그·트레이스 저장소로 전달합니다.",
    refs: ["alloy", "alloypipe", "alloytelemetry"],
    nodes: [
      { label: "입력", detail: "OTLP 수신 · Prometheus scrape · 컨테이너 로그" },
      { label: "발견·수신", detail: "대상 주소를 찾고 신호를 각 파이프라인에 넣습니다." },
      { label: "처리", detail: "batch, 필터, 라벨 정리, 민감정보 가리기를 적용합니다." },
      { label: "전달", detail: "remote_write · loki.write · OTLP exporter로 보냅니다." },
    ],
  },
  {
    id: "prometheus",
    name: "Prometheus",
    role: "메트릭 수집 · 시계열 저장",
    summary:
      "Prometheus는 주기적으로 대상을 읽어 시계열로 저장하고 PromQL과 HTTP API로 조회하게 합니다.",
    refs: ["prom", "promarch", "promstorage", "promql"],
    nodes: [
      { label: "대상", detail: "Spring Boot Actuator 같은 /metrics 엔드포인트입니다." },
      { label: "Scrape manager", detail: "설정된 주기마다 대상에서 메트릭을 pull 합니다." },
      { label: "WAL", detail: "최근 샘플을 먼저 기록해 프로세스 재시작에 대비합니다." },
      { label: "TSDB 블록", detail: "시간 구간별 압축 블록과 인덱스로 보관합니다." },
      { label: "PromQL/API", detail: "Grafana가 오류율·지연·포화 같은 질문을 보냅니다." },
    ],
  },
  {
    id: "loki",
    name: "Loki",
    role: "로그 수집 · 라벨 인덱스 · LogQL",
    summary:
      "Loki는 라벨로 로그 스트림을 찾고 본문은 압축 청크로 읽습니다. 모든 본문을 거대한 인덱스로 만들지 않는 설계입니다.",
    refs: ["loki", "lokiarch", "lokilabel", "logql"],
    nodes: [
      { label: "Push", detail: "Alloy가 로그 줄과 라벨을 Loki API로 보냅니다." },
      { label: "Distributor", detail: "테넌트와 라벨을 검증하고 Ingester로 분배합니다." },
      { label: "Ingester/WAL", detail: "메모리 청크와 WAL에 기록한 뒤 쓰기 응답을 돌려줍니다." },
      { label: "Index + chunks", detail: "라벨 인덱스와 압축 로그 청크를 저장합니다." },
      { label: "Query frontend", detail: "LogQL을 나누고 Querier가 최근·과거 청크를 읽습니다." },
    ],
  },
  {
    id: "tempo",
    name: "Tempo",
    role: "트레이스 수신 · 블록 저장 · TraceQL",
    summary:
      "Tempo는 span을 trace_id로 묶어 최근 데이터와 완성된 블록으로 관리하고 TraceQL로 조회합니다.",
    refs: ["tempo", "tempoarch", "tempostructure", "traceql"],
    nodes: [
      { label: "OTLP", detail: "앱 또는 Alloy가 span을 전달하는 입구입니다." },
      { label: "Distributor", detail: "수신한 span을 저장 경로로 분배합니다." },
      { label: "Live-store/WAL", detail: "최근 trace를 메모리에서 조립하고 WAL에 보호합니다." },
      { label: "Block + object storage", detail: "완성된 trace 블록을 오브젝트 저장소에 보관합니다." },
      { label: "Query frontend", detail: "TraceQL을 나누고 최근·과거 데이터를 합쳐 응답합니다." },
    ],
  },
  {
    id: "grafana",
    name: "Grafana",
    role: "조회 · 시각화 · 알림",
    summary:
      "Grafana는 메트릭·로그·트레이스 저장소가 아닙니다. 데이터소스에 질문하고 패널과 알림으로 결과를 보여 줍니다.",
    refs: ["grafanaintro", "grafana", "explore", "alert"],
    nodes: [
      { label: "Data source", detail: "Prometheus, Loki, Tempo의 주소와 인증을 등록합니다." },
      { label: "Query editor", detail: "PromQL · LogQL · TraceQL을 각각 작성합니다." },
      { label: "Transform", detail: "여러 결과를 조인하거나 표시용 필드를 정리합니다." },
      { label: "Panel/Dashboard", detail: "Time series, Logs, Traces 등으로 결과를 시각화합니다." },
      { label: "Alerting", detail: "쿼리 결과를 조건과 연락 지점으로 연결합니다." },
    ],
  },
];

function ArchitectureLinks({ ids }) {
  return (
    <div className="tool-architecture-links">
      {ids.map((id) => (
        <a key={id} href={sources[id][1]} target="_blank" rel="noreferrer">
          {sources[id][0]} ↗
        </a>
      ))}
    </div>
  );
}

function ArchitectureSvg({ tool, active, setActive }) {
  const width = 960;
  const height = 170;
  const gap = 18;
  const nodeWidth = Math.min(168, (width - gap * (tool.nodes.length - 1)) / tool.nodes.length);
  return (
    <svg
      className="tool-architecture-svg"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`${tool.name} 내부 구성 파이프라인`}
    >
      <defs>
        <marker id={`arrow-${tool.id}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#8fe6c2" />
        </marker>
      </defs>
      {tool.nodes.slice(0, -1).map((_, i) => {
        const x = 34 + (i + 1) * nodeWidth + i * gap;
        return (
          <line
            key={`line-${i}`}
            x1={x}
            y1="85"
            x2={x + gap - 6}
            y2="85"
            stroke="#8fe6c2"
            strokeWidth="2"
            markerEnd={`url(#arrow-${tool.id})`}
          />
        );
      })}
      {tool.nodes.map((node, i) => {
        const x = 34 + i * (nodeWidth + gap);
        const selected = active === i;
        return (
          <g
            key={node.label}
            tabIndex="0"
            role="button"
            aria-label={`${node.label}: ${node.detail}`}
            aria-pressed={selected}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            onClick={() => setActive(i)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActive(i);
              }
            }}
            className={`tool-architecture-svg-node ${selected ? "is-active" : ""}`}
          >
            <rect x={x} y="38" width={nodeWidth} height="94" rx="10" />
            <text x={x + 14} y="62" className="tool-architecture-svg-index">
              {String(i + 1).padStart(2, "0")}
            </text>
            <text x={x + 14} y="88" className="tool-architecture-svg-label">
              {node.label}
            </text>
            <text x={x + 14} y="111" className="tool-architecture-svg-hint">
              {selected ? "선택됨 · 아래 설명" : "호버하여 보기"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ToolArchitectureGallery() {
  const [selectedTool, setSelectedTool] = useState(0);
  const [activeNode, setActiveNode] = useState(0);
  const tool = toolArchitectures[selectedTool];
  const selectTool = (index) => {
    setSelectedTool(index);
    setActiveNode(0);
  };
  const node = tool.nodes[activeNode];
  return (
    <section className="tool-architecture" aria-labelledby="tool-architecture-title">
      <div className="tool-architecture-heading">
        <div>
          <span className="story-section-label">INSIDE THE TOOLS</span>
          <h2 id="tool-architecture-title">도구 안에서는 데이터가 어떻게 흐를까요?</h2>
          <p>
            이름만 나열하면 파이프라인이 보이지 않습니다. 도구를 선택하고 구성 요소에
            마우스를 올려 보세요. 선택한 요소의 역할과 다음 단계가 바로 아래에 바뀝니다.
          </p>
        </div>
        <span className="tool-architecture-count">{toolArchitectures.length}개 도구 · {tool.nodes.length}개 구성</span>
      </div>
      <div className="tool-architecture-tabs" role="tablist" aria-label="도구별 내부 구성">
        {toolArchitectures.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selectedTool === index}
            className={selectedTool === index ? "is-active" : ""}
            onClick={() => selectTool(index)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.name}</strong>
            <small>{item.role}</small>
          </button>
        ))}
      </div>
      <div className="tool-architecture-card">
        <div className="tool-architecture-card-head">
          <div>
            <span>{tool.role}</span>
            <h3>{tool.name}</h3>
          </div>
          <p>{tool.summary}</p>
        </div>
        <ArchitectureSvg tool={tool} active={activeNode} setActive={setActiveNode} />
        <div className="tool-architecture-detail" aria-live="polite">
          <span>구성 {String(activeNode + 1).padStart(2, "0")}</span>
          <div>
            <h4>{node.label}</h4>
            <p>{node.detail}</p>
          </div>
        </div>
        <ArchitectureLinks ids={tool.refs} />
      </div>
    </section>
  );
}
