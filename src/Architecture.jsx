import { useEffect, useState } from "react";
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
      note: "메트릭 remote_write, 로그 읽기, OTLP 트레이스 수신은 별도 경로입니다. 한 경로가 정상이라고 나머지도 정상인 것은 아닙니다.",
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
      id: "remote-write",
      title: "Remote write 수신",
      subtitle: "Alloy에서 샘플 받기",
      intro:
        "비비디 구성에서는 Alloy가 애플리케이션 메트릭을 받아 Prometheus의 remote write 엔드포인트로 보냅니다.",
      note: "Prometheus가 앱 서버로 직접 접속하지 않으므로 수신 엔드포인트와 Alloy 전송 큐를 먼저 확인합니다.",
      refs: ["promarch", "promcli"],
    },
    {
      id: "wal",
      title: "WAL",
      subtitle: "최근 샘플을 먼저 기록",
      intro:
        "remote write로 들어온 샘플은 최근 데이터 복구를 위해 WAL에 먼저 기록됩니다.",
      note: "WAL 디스크가 차거나 재시작 복구가 길어지면 수신 지연과 저장 지연을 나눠서 봅니다.",
      refs: ["promstorage", "promcli"],
    },
    {
      id: "tsdb",
      title: "로컬 TSDB",
      subtitle: "라벨과 샘플 보관",
      intro:
        "remote write 샘플은 시간과 라벨을 가진 시계열로 로컬 저장소에 보관됩니다. 라벨 조합이 늘면 시계열 수도 늘어납니다.",
      note: "weddingId처럼 계속 달라지는 값을 메트릭 라벨에 넣을지 먼저 검토해야 합니다.",
      refs: ["promarch", "cardinality"],
    },
    {
      id: "query",
      title: "PromQL · 규칙",
      subtitle: "조회와 평가",
      intro:
        "PromQL로 시계열을 조회하고 기록 규칙이나 경보 규칙을 평가할 수 있습니다. Grafana 같은 클라이언트가 Prometheus API로 결과를 시각화합니다.",
      note: "패널이 비었다면 조회식만 고치기 전에 remote write 수신과 WAL 기록이 있었는지 확인합니다.",
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
            Alloy는 실행 중인 컴포넌트의 출력과 입력을 연결합니다. 메트릭 입력을 받고
            로그를 읽거나 OTLP를 수신할 수 있습니다. 그다음 처리
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
      { label: "입력", detail: "OTLP 수신 · 메트릭 입력 · 컨테이너 로그" },
      { label: "발견·수신", detail: "대상 주소를 찾고 신호를 각 파이프라인에 넣습니다." },
      { label: "처리", detail: "batch, 필터, 라벨 정리, 민감정보 가리기를 적용합니다." },
      { label: "전달", detail: "remote_write · loki.write · OTLP exporter로 보냅니다." },
    ],
    operator: {
      components: [
        { name: "discovery", role: "수집 대상 주소와 메타데이터를 발견", watch: "대상 수, discovery 오류, 권한" },
        { name: "receiver", role: "OTLP·파일·컨테이너 입력을 수신", watch: "수신량, 거부율, 포트" },
        { name: "processor", role: "batch·필터·라벨 변환을 실행", watch: "처리 지연, drop 수, 메모리" },
        { name: "exporter", role: "Prometheus·Loki·Tempo로 전달", watch: "재시도, 큐 길이, 전송 오류" },
      ],
      modelTitle: "Alloy 라벨과 메타데이터",
      modelRows: [
        ["service.name", "앱의 논리적 서비스 이름", "대시보드·로그 스트림의 기본 축으로 고정"],
        ["deployment.environment.name", "production·staging 같은 환경", "환경별 파이프라인과 알림을 분리"],
        ["trace_id / wedding_id", "요청·결혼 정보 단위의 고유값", "라벨로 만들지 말고 로그·트레이스 본문에 보관"],
      ],
      checks: ["파이프라인마다 입력·출력 컴포넌트가 연결됐는가", "민감정보 drop이 저장소로 보내기 전에 실행되는가", "전송 실패가 무한 재시도로 메모리를 잠식하지 않는가"],
    },
  },
  {
    id: "prometheus",
    name: "Prometheus",
    role: "메트릭 수집 · 시계열 저장",
    summary:
      "비비디에서는 Alloy가 remote_write로 보낸 샘플을 Prometheus가 저장하고 PromQL과 HTTP API로 조회하게 합니다.",
    refs: ["prom", "promarch", "promstorage", "promql"],
    nodes: [
      { label: "Remote write", detail: "Alloy가 /api/v1/write로 보낸 샘플을 받습니다." },
      { label: "WAL", detail: "최근 샘플을 먼저 기록해 프로세스 재시작에 대비합니다." },
      { label: "TSDB 블록", detail: "시간 구간별 압축 블록과 인덱스로 보관합니다." },
      { label: "Rule evaluator", detail: "기록 규칙과 경보 규칙을 평가합니다." },
      { label: "PromQL/API", detail: "Grafana가 오류율·지연·포화 같은 질문을 보냅니다." },
    ],
    operator: {
      components: [
        { name: "remote write receiver", role: "Alloy 샘플을 /api/v1/write로 수신", watch: "receiver error, 수신량, 전송 재시도" },
        { name: "WAL", role: "최근 샘플을 순서대로 디스크에 기록", watch: "WAL replay 시간, 디스크, corruption" },
        { name: "TSDB", role: "샘플을 블록과 인덱스로 보관", watch: "compaction, head series, 디스크" },
        { name: "rule evaluator", role: "recording·alerting rule 평가", watch: "rule evaluation 지연, 실패" },
        { name: "HTTP API", role: "PromQL 결과와 상태를 Grafana에 반환", watch: "쿼리 지연, 동시성, 수신 상태" },
      ],
      modelTitle: "Prometheus 시계열과 라벨",
      modelRows: [
        ["__name__", "메트릭 이름(http_server_requests_seconds_count)", "이름만으로도 의미가 드러나고 타입을 혼합하지 않기"],
        ["job / instance", "수집 작업과 대상 주소", "자동 라벨이므로 대시보드의 기본 필터로 사용"],
        ["method·status·uri", "값 종류가 제한된 요청 차원", "uri는 /api/weddings/{id}처럼 템플릿으로 유지"],
        ["userId·weddingId", "요청마다 달라지는 고유값", "메트릭 라벨로 금지; 로그·트레이스로 이동"],
      ],
      checks: ["Alloy remote_write가 Prometheus 수신 엔드포인트까지 도달하는가", "라벨 조합 수와 보관 기간으로 시계열 수를 추정했는가", "고비용 PromQL이 대시보드 자동 새로고침마다 실행되지 않는가"],
    },
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
    operator: {
      components: [
        { name: "distributor", role: "테넌트·라벨 검증과 해시 링 분배", watch: "4xx·5xx, rate limit, ring 상태" },
        { name: "ingester", role: "스트림별 메모리 청크와 WAL 기록", watch: "flush 지연, WAL 디스크, 청크 크기" },
        { name: "index gateway", role: "라벨 인덱스와 청크 위치를 조회", watch: "인덱스 캐시, object store latency" },
        { name: "querier", role: "Ingester·저장소를 읽고 중복 제거", watch: "쿼리 범위, 동시성, cache hit" },
        { name: "compactor", role: "인덱스 병합과 retention 삭제 실행", watch: "삭제 지연, 보존 기간, 삭제 목록" },
      ],
      modelTitle: "Loki 스트림·라벨·로그 본문",
      modelRows: [
        ["service_name", "로그를 만든 서비스", "낮은 카디널리티 라벨. 서비스별 스트림을 좁히는 첫 조건"],
        ["deployment_environment_name", "production·staging 환경", "환경을 반드시 좁힌 뒤 시간 범위를 제한"],
        ["severity_text", "INFO·WARN·ERROR 수준", "종류가 제한된 필터 차원으로 사용"],
        ["trace_id·wedding_id", "한 요청·결혼 정보의 고유값", "인덱스 라벨이 아니라 본문 또는 structured metadata로 검색"],
      ],
      checks: ["스트림 라벨 조합이 요청마다 늘어나지 않는가", "write ACK 뒤 WAL·청크·오브젝트 저장소가 모두 보호되는가", "LogQL에 라벨 선택과 좁은 시간 범위가 먼저 오는가"],
    },
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
    operator: {
      components: [
        { name: "receiver", role: "OTLP·Jaeger·Zipkin span을 수신", watch: "수신량, 거부율, protocol mismatch" },
        { name: "distributor", role: "span을 저장 경로로 분배", watch: "ring·replication·queue" },
        { name: "live-store", role: "trace_id별 최근 span을 조립", watch: "max_trace_idle, live bytes, WAL" },
        { name: "block builder", role: "완성 trace를 Parquet 블록으로 생성", watch: "block size, flush 지연, compaction" },
        { name: "querier", role: "TraceQL로 최근·과거 블록을 검색", watch: "query duration, cache, object store" },
      ],
      modelTitle: "Tempo Resource·Span 속성",
      modelRows: [
        ["trace_id / span_id", "트레이스와 구간을 이어 주는 ID", "로그에 trace_id를 넣고 span_id는 구간 조사에 사용"],
        ["service.name", "span을 만든 서비스(Resource)", "서비스 그래프·서비스 선택의 기준으로 고정"],
        ["http.request.method·status", "해당 span의 작업 속성", "TraceQL 조건과 장애 원인 확인에 사용"],
        ["wedding_id", "고객 도메인의 고유 ID", "모든 span 속성으로 넣기 전에 개인정보·카디널리티 검토"],
      ],
      checks: ["샘플링이 너무 일찍 적용되어 오류 trace가 사라지지 않는가", "로그와 트레이스의 trace_id 전파 형식이 같은가", "최근 데이터와 object storage의 보존·조회 경로가 모두 열려 있는가"],
    },
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
    operator: {
      components: [
        { name: "data source", role: "URL·인증·UID로 백엔드 연결", watch: "health check, timeout, UID 변경" },
        { name: "query runner", role: "PromQL·LogQL·TraceQL 실행", watch: "시간 범위, refresh, query error" },
        { name: "transform", role: "결과 필드 조인·필터·변환", watch: "행 수, null, 계산 오류" },
        { name: "panel/dashboard", role: "시각화·변수·시간 범위 구성", watch: "패널 지연, max data points" },
        { name: "alert rule", role: "쿼리 평가와 contact point 전송", watch: "pending·firing, notification error" },
      ],
      modelTitle: "Grafana 조사 단위",
      modelRows: [
        ["datasource uid", "쿼리를 보낼 Prometheus·Loki·Tempo 식별자", "이름이 아니라 고정 UID를 대시보드와 규칙에 사용"],
        ["variables", "env·service·interval 같은 URL 변수", "변수 범위를 제한하고 고카디널리티 목록을 자동 조회하지 않기"],
        ["query + time range", "패널이 백엔드에 던지는 질문", "같은 시간축으로 메트릭→로그→트레이스를 연결"],
        ["alert rule labels", "severity·service·team 라우팅 정보", "알림 내용보다 라우팅에 필요한 낮은 카디널리티만 유지"],
      ],
      checks: ["대시보드 패널의 데이터소스 UID가 운영 환경과 일치하는가", "알림 규칙이 패널 시각화와 독립적으로 평가되는가", "Explore에서 같은 시간·서비스·trace_id로 세 신호를 교차 확인할 수 있는가"],
    },
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

function OperatorDetails({ operator }) {
  if (!operator) return null;
  return (
    <div className="tool-architecture-ops">
      <div className="tool-architecture-ops-heading">
        <div>
          <span>OPERATOR VIEW</span>
          <h4>운영자가 확인할 내부 경계</h4>
        </div>
        <p>구성 요소가 무엇을 책임지고 어떤 상태를 관찰해야 하는지 정리했습니다.</p>
      </div>
      <div className="tool-architecture-components">
        {operator.components.map((component, index) => (
          <article key={component.name}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h5>{component.name}</h5>
            <p>{component.role}</p>
            <small>관찰할 것 · {component.watch}</small>
          </article>
        ))}
      </div>
      <div className="tool-architecture-model">
        <div>
          <span>DATA MODEL</span>
          <h4>{operator.modelTitle}</h4>
        </div>
        <div className="tool-architecture-model-scroll">
          <table>
            <thead>
              <tr>
                <th>필드·구성</th>
                <th>의미</th>
                <th>운영 기준</th>
              </tr>
            </thead>
            <tbody>
              {operator.modelRows.map(([field, meaning, rule]) => (
                <tr key={field}>
                  <th scope="row"><code>{field}</code></th>
                  <td>{meaning}</td>
                  <td>{rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="tool-architecture-checks">
        <h4>운영 전·후 점검</h4>
        <ul>
          {operator.checks.map((check) => <li key={check}>{check}</li>)}
        </ul>
      </div>
    </div>
  );
}

const architectureLayouts = {
  alloy: {
    height: 340,
    zones: [
      { label: "RECEIVERS", x: 18, y: 44, w: 260, h: 230 },
      { label: "PIPELINE", x: 296, y: 44, w: 360, h: 230 },
      { label: "EXPORTERS", x: 674, y: 44, w: 348, h: 230 },
    ],
    nodes: [{ x: 44, y: 104 }, { x: 316, y: 104 }, { x: 500, y: 104 }, { x: 700, y: 104 }],
    edges: [{ from: 0, to: 1, label: "OTLP / 4317" }, { from: 1, to: 2, label: "discovery" }, { from: 2, to: 3, label: "pipeline" }],
    outputs: [{ x: 708, y: 230, text: "Prometheus · Loki · Tempo" }],
    failure: { from: 2, to: 3, label: "export retry / backoff" },
  },
  prometheus: {
    height: 340,
    zones: [
      { label: "REMOTE WRITE", x: 18, y: 44, w: 250, h: 230 },
      { label: "INGEST", x: 286, y: 44, w: 340, h: 230 },
      { label: "TSDB / QUERY", x: 644, y: 44, w: 378, h: 230 },
    ],
    nodes: [{ x: 42, y: 104 }, { x: 298, y: 104 }, { x: 470, y: 104 }, { x: 660, y: 104 }, { x: 660, y: 208 }],
    edges: [{ from: 0, to: 1, label: "POST /api/v1/write" }, { from: 1, to: 2, label: "remote_write" }, { from: 2, to: 3, label: "WAL → blocks" }, { from: 3, to: 4, label: "PromQL / HTTP" }],
    outputs: [{ x: 840, y: 230, text: "Grafana / Alerting" }],
    failure: { from: 0, to: 1, label: "receiver unavailable / retry" },
  },
  loki: {
    height: 360,
    zones: [
      { label: "WRITE PATH", x: 18, y: 44, w: 650, h: 142 },
      { label: "READ PATH", x: 18, y: 202, w: 1004, h: 120 },
      { label: "OBJECT STORAGE", x: 684, y: 44, w: 338, h: 142 },
    ],
    nodes: [{ x: 42, y: 86 }, { x: 230, y: 86 }, { x: 420, y: 86 }, { x: 700, y: 86 }, { x: 420, y: 238 }],
    edges: [{ from: 0, to: 1, label: "POST /push" }, { from: 1, to: 2, label: "ring" }, { from: 2, to: 3, label: "chunks + index" }, { from: 4, to: 2, label: "ingester" }, { from: 4, to: 3, label: "object store" }],
    outputs: [{ x: 700, y: 238, text: "LogQL query" }],
    failure: { from: 0, to: 1, label: "429 / retry" },
  },
  tempo: {
    height: 360,
    zones: [
      { label: "WRITE PATH", x: 18, y: 44, w: 650, h: 142 },
      { label: "READ PATH", x: 18, y: 202, w: 1004, h: 120 },
      { label: "OBJECT STORAGE", x: 684, y: 44, w: 338, h: 142 },
    ],
    nodes: [{ x: 42, y: 86 }, { x: 230, y: 86 }, { x: 420, y: 86 }, { x: 700, y: 86 }, { x: 420, y: 238 }],
    edges: [{ from: 0, to: 1, label: "OTLP / 4317" }, { from: 1, to: 2, label: "ring" }, { from: 2, to: 3, label: "blocks" }, { from: 4, to: 2, label: "live-store" }, { from: 4, to: 3, label: "object store" }],
    outputs: [{ x: 700, y: 238, text: "TraceQL query" }],
    failure: { from: 1, to: 2, label: "queue full" },
  },
  grafana: {
    height: 340,
    zones: [
      { label: "EXPLORATION", x: 18, y: 44, w: 450, h: 230 },
      { label: "VISUALIZATION", x: 486, y: 44, w: 260, h: 230 },
      { label: "ALERTING", x: 764, y: 44, w: 258, h: 230 },
    ],
    nodes: [{ x: 42, y: 104 }, { x: 214, y: 104 }, { x: 386, y: 104 }, { x: 510, y: 104 }, { x: 790, y: 104 }],
    edges: [{ from: 0, to: 1, label: "datasource" }, { from: 1, to: 2, label: "PromQL · LogQL · TraceQL" }, { from: 2, to: 3, label: "transform" }, { from: 3, to: 4, label: "alert rule" }],
    outputs: [{ x: 790, y: 230, text: "contact point" }],
    failure: { from: 1, to: 2, label: "query error" },
  },
};

function ArchitectureSvg({ tool, active, setActive, instance = "inline" }) {
  const width = 1040;
  const layout = architectureLayouts[tool.id];
  const height = layout.height;
  const nodeWidth = 156;
  const nodeHeight = 90;
  const protocolMap = {
    alloy: ["OTLP / 4317", "discovery", "pipeline", "remote_write"],
    prometheus: ["Alloy", "remote_write", "WAL", "rules", "PromQL / HTTP"],
    loki: ["POST /push", "ring", "chunks + index", "LogQL / HTTP"],
    tempo: ["OTLP / 4317", "ring", "blocks", "TraceQL / HTTP"],
    grafana: ["HTTP / HTTPS", "query", "transform", "alert"],
  };
  const brandMap = { alloy: "A", prometheus: "P", loki: "L", tempo: "T", grafana: "G" };
  const uid = `${tool.id}-${instance}`;
  const protocols = protocolMap[tool.id] || [];
  const position = (index) => ({ ...layout.nodes[index], w: nodeWidth, h: nodeHeight });
  const center = (index) => {
    const node = position(index);
    return { x: node.x + node.w / 2, y: node.y + node.h / 2 };
  };
  const edgePath = (edge) => {
    const from = position(edge.from);
    const to = position(edge.to);
    const start = { x: from.x + from.w, y: from.y + from.h / 2 };
    const end = { x: to.x, y: to.y + to.h / 2 };
    if (to.x > from.x) return `M ${start.x} ${start.y} C ${start.x + 28} ${start.y}, ${end.x - 28} ${end.y}, ${end.x} ${end.y}`;
    return `M ${center(edge.from).x} ${from.y + from.h} C ${center(edge.from).x} ${from.y + from.h + 42}, ${center(edge.to).x} ${to.y - 42}, ${center(edge.to).x} ${to.y}`;
  };
  const edgeLabel = (edge) => {
    const from = center(edge.from);
    const to = center(edge.to);
    return { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 - 10 };
  };
  return (
    <svg
      className="tool-architecture-svg"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`${tool.name} 내부 구성 파이프라인`}
    >
      <defs>
        <pattern id={`grid-${uid}`} width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#e7edf4" strokeWidth="1" />
        </pattern>
        <marker id={`arrow-${uid}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#60758b" />
        </marker>
        <marker id={`failure-arrow-${uid}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 z" fill="#c44545" />
        </marker>
        {layout.edges.map((edge, i) => <path key={`path-def-${i}`} id={`flow-${uid}-${i}`} d={edgePath(edge)} />)}
      </defs>

      <rect className="tool-svg-grid" style={{ fill: `url(#grid-${uid})` }} x="0" y="0" width={width} height={height} rx="12" />
      <text className="tool-svg-brand" x="24" y="28">{brandMap[tool.id]}</text>
      {layout.zones.map((item, index) => (
        <g key={`${item.label}-${index}`} className={`tool-svg-zone tool-svg-zone-${index}`}>
          <rect x={item.x} y={item.y} width={item.w} height={item.h} rx="10" />
          <text x={item.x + 12} y={item.y + 24}>{item.label}</text>
        </g>
      ))}
      {layout.edges.map((edge, i) => {
        const label = edgeLabel(edge);
        return (
          <g key={`edge-${i}`}>
            <path
              d={edgePath(edge)}
              className={`tool-svg-flow ${active === edge.from || active === edge.to ? "is-highlighted" : ""}`}
              markerEnd={`url(#arrow-${uid})`}
            />
            <text className="tool-svg-edge-label" x={label.x} y={label.y}>{edge.label}</text>
          </g>
        );
      })}
      {layout.edges.map((_, i) => (
        <circle key={`packet-${i}`} className="tool-svg-packet" r="4">
          <animateMotion dur="2.8s" repeatCount="indefinite" begin={`${i * 0.32}s`}>
            <mpath href={`#flow-${uid}-${i}`} />
          </animateMotion>
        </circle>
      ))}
      {layout.failure && (
        <>
          <path
            className="tool-svg-failure"
            d={edgePath(layout.failure)}
            markerEnd={`url(#failure-arrow-${uid})`}
          />
          <text className="tool-svg-failure-label" x={edgeLabel(layout.failure).x} y={edgeLabel(layout.failure).y + 18}>{layout.failure.label}</text>
        </>
      )}
      {layout.outputs.map((output) => <text key={output.text} className="tool-svg-output" x={output.x} y={output.y}>{output.text}</text>)}
      {tool.nodes.map((node, i) => {
        const { x, y } = position(i);
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
            <rect x={x} y={y} width={nodeWidth} height={nodeHeight} rx="8" />
            <circle cx={x + 22} cy={y + 23} r="12" className="tool-svg-node-icon" />
            <text x={x + 22} y={y + 27} textAnchor="middle" className="tool-svg-node-icon-text">{String(i + 1)}</text>
            <text x={x + 42} y={y + 27} className="tool-architecture-svg-index">
              {String(i + 1).padStart(2, "0")}
            </text>
            <text x={x + 14} y={y + 53} className="tool-architecture-svg-label">
              {node.label}
            </text>
            <text x={x + 14} y={y + 73} className="tool-architecture-svg-hint">
              {protocols[i] || (selected ? "selected" : "hover to inspect")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ToolArchitectureGallery({ focusTool } = {}) {
  const [selectedTool, setSelectedTool] = useState(0);
  const [activeNode, setActiveNode] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleTools = focusTool
    ? toolArchitectures.filter((item) => item.id === focusTool)
    : toolArchitectures;
  const tool = visibleTools[selectedTool] || visibleTools[0];
  useEffect(() => {
    if (!isExpanded) return undefined;
    const closeWithEscape = (event) => {
      if (event.key === "Escape") setIsExpanded(false);
    };
    document.addEventListener("keydown", closeWithEscape);
    document.body.classList.add("architecture-modal-open");
    return () => {
      document.removeEventListener("keydown", closeWithEscape);
      document.body.classList.remove("architecture-modal-open");
    };
  }, [isExpanded]);
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
        <span className="tool-architecture-count">{visibleTools.length}개 도구 · {tool.nodes.length}개 구성</span>
      </div>
      {!focusTool && <div className="tool-architecture-tabs" role="tablist" aria-label="도구별 내부 구성">
        {visibleTools.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={selectedTool === index}
            className={selectedTool === index ? "is-active" : ""}
            onClick={() => selectTool(index)}
          >
            <span className={`tool-brand-mark brand-${item.id}`} aria-hidden="true">{{ alloy: "A", prometheus: "P", loki: "L", tempo: "T", grafana: "G" }[item.id]}</span>
            <span className="tool-tab-index">{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.name}</strong>
            <small>{item.role}</small>
          </button>
        ))}
      </div>}
      <div className="tool-architecture-card">
        <div className="tool-architecture-card-head">
          <div>
            <span>{tool.role}</span>
            <h3>{tool.name}</h3>
          </div>
          <p>{tool.summary}</p>
        </div>
        <div className="tool-architecture-main">
          <div className="tool-architecture-diagram-wrap">
            <div className="tool-architecture-diagram-toolbar">
              <span>Architecture map</span>
              <button type="button" onClick={() => setIsExpanded(true)} aria-label={`${tool.name} 다이어그램 크게 보기`}>
                <span aria-hidden="true">↗</span> 크게 보기
              </button>
            </div>
            <ArchitectureSvg tool={tool} active={activeNode} setActive={setActiveNode} instance="inline" />
          </div>
          <div className="tool-architecture-detail" aria-live="polite">
            <span>구성 {String(activeNode + 1).padStart(2, "0")}</span>
            <div>
              <h4>{node.label}</h4>
              <p>{node.detail}</p>
            </div>
            <div className="tool-architecture-detail-meta">
              <b>연결 방식</b>
              <code>{({ alloy: "OTLP / 4317", prometheus: "HTTP / 9090", loki: "HTTP / push", tempo: "OTLP / 4317", grafana: "HTTP / HTTPS" })[tool.id]}</code>
            </div>
          </div>
        </div>
        {tool.id === "loki" && (
          <figure className="tool-architecture-figure">
            <img src="/diagrams/loki-architecture.svg" alt="Loki의 로그 쓰기 경로, 저장 형식, 읽기 경로" />
            <figcaption>
              Loki의 쓰기·저장·읽기 경로를 한 장으로 정리한 그림입니다. 실제 배포 모드와
              설정에 따라 구성 요소 수와 경로가 달라질 수 있습니다.
            </figcaption>
          </figure>
        )}
        <OperatorDetails operator={tool.operator} />
        <ArchitectureLinks ids={tool.refs} />
      </div>
      {isExpanded && (
        <div
          className="tool-architecture-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="architecture-lightbox-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsExpanded(false);
          }}
        >
          <div className="tool-architecture-lightbox-dialog">
            <div className="tool-architecture-lightbox-head">
              <div>
                <span>ARCHITECTURE MAP</span>
                <h3 id="architecture-lightbox-title">{tool.name} 내부 구성</h3>
              </div>
              <button type="button" onClick={() => setIsExpanded(false)} aria-label="다이어그램 닫기">닫기 <span aria-hidden="true">×</span></button>
            </div>
            <div className="tool-architecture-lightbox-body">
              <div className="tool-architecture-lightbox-diagram">
                <ArchitectureSvg tool={tool} active={activeNode} setActive={setActiveNode} instance="expanded" />
              </div>
              <div className="tool-architecture-lightbox-detail" aria-live="polite">
                <span>구성 {String(activeNode + 1).padStart(2, "0")}</span>
                <h4>{node.label}</h4>
                <p>{node.detail}</p>
                <div><b>운영자가 볼 것</b><p>{tool.operator.components[activeNode % tool.operator.components.length].watch}</p></div>
              </div>
            </div>
            <p className="tool-architecture-lightbox-hint">구성 요소를 선택하면 경로와 설명이 함께 바뀝니다. <kbd>Esc</kbd>로 닫을 수 있습니다.</p>
          </div>
        </div>
      )}
    </section>
  );
}
