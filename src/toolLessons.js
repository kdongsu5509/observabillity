// 도구별 학습 순서. 각 글은 한 번에 한 질문만 해결하고 다음 글로 넘긴다.
export const toolCurriculum = [
  {
    id: "otel",
    name: "OpenTelemetry",
    role: "계측과 전송의 표준",
    summary: "애플리케이션이 관측 데이터를 만드는 공통 언어부터 이해합니다.",
    chapters: [
      { slug: "why", title: "왜 표준이 필요한가", lead: "도구마다 다른 계측 방식이 서비스 사이의 연결을 끊는 과정을 먼저 봅니다.", refs: ["otel", "context"], blocks: [{ title: "답해야 할 질문", text: "로그·메트릭·트레이스를 만드는 코드가 제품마다 다르면 도구를 바꿀 때 애플리케이션도 함께 고쳐야 합니다.", points: ["계측 API와 저장소를 분리하기", "서비스 사이의 요청 문맥을 이어 가기"] }] },
      { slug: "signals", title: "신호와 Context", lead: "Trace, Metric, Log가 어떤 질문에 답하는지 구분합니다.", refs: ["otel", "context"], blocks: [{ title: "세 신호의 역할", text: "메트릭은 전체 추세, 로그는 사건의 본문, 트레이스는 요청 하나의 경로를 보여 줍니다. Context는 그 요청을 서비스 사이에서 이어 주는 문맥입니다.", points: ["trace_id와 span_id의 역할 확인", "W3C Trace Context 헤더 확인"] }] },
      { slug: "otlp", title: "OTLP로 보내기", lead: "계측 코드에서 수집기로 데이터를 넘기는 경계를 확인합니다.", refs: ["otlp", "otel"], blocks: [{ title: "전송 경계", text: "애플리케이션은 데이터를 만들고 OTLP는 그 데이터를 수집기나 백엔드로 보내는 전송 규약입니다. 저장소 선택은 그 다음 문제입니다.", points: ["gRPC와 HTTP 전송 경계 구분", "전송 실패와 재시도 지점 기록"] }] },
      { slug: "collector", title: "Collector와 Alloy의 자리", lead: "표준을 구현하는 수집기와 제품별 파이프라인을 분리해 봅니다.", refs: ["collector", "alloywhy", "alloypipe"], blocks: [{ title: "역할을 나누는 이유", text: "OpenTelemetry는 계측·데이터 모델·전송 규약을 정의합니다. Collector와 Alloy는 받은 데이터를 발견하고, 처리하고, 목적지로 보내는 실행 계층입니다.", points: ["계측 표준과 실행 제품을 혼동하지 않기", "수집기에서 필터·배치·라우팅을 관찰하기"] }] },
      { slug: "operations", title: "계측 운영 체크", lead: "데이터가 만들어졌다는 사실과 실제로 도착했다는 사실을 나눠 확인합니다.", refs: ["otel", "otlp", "collector"], blocks: [{ title: "장애 때 확인할 순서", text: "먼저 애플리케이션에 span과 metric이 만들어졌는지 확인하고, 다음으로 수집기 수신·처리·전송을 나눠 봅니다.", points: ["누락된 신호의 시작 지점 찾기", "민감한 속성과 과도한 고유값을 계측 단계에서 줄이기"] }] },
    ],
  },
  {
    id: "alloy",
    name: "Grafana Alloy",
    role: "수집·처리·전송 파이프라인",
    summary: "여러 입력을 받아 필요한 처리만 거친 뒤 신호별 저장소로 보냅니다.",
    chapters: [
      { slug: "why", title: "Alloy가 필요한 이유", lead: "애플리케이션과 저장소 사이에 수집기를 두는 이유를 확인합니다.", refs: ["alloy", "alloywhy"], blocks: [{ title: "한곳에서 맡기는 일", text: "서비스마다 목적지 설정을 반복하지 않고 수집·필터·배치·전송을 한 파이프라인에서 관리합니다.", points: ["수집 대상 발견과 수신 분리", "저장소별 전송 실패를 따로 확인"] }] },
      { slug: "components", title: "Component와 Pipeline", lead: "Receiver, Processor, Exporter가 어떻게 연결되는지 읽습니다.", refs: ["alloypipe", "alloytelemetry"], blocks: [{ title: "연결을 읽는 법", text: "입력 컴포넌트의 출력이 다음 컴포넌트의 입력이 됩니다. 필터와 배치를 어디에 두었는지가 실제 운영 결과를 바꿉니다.", points: ["입력·처리·출력의 책임 나누기", "참조 이름과 연결 방향 확인"] }] },
      { slug: "architecture", title: "내부 Architecture", lead: "수신·처리·전송 영역을 실제 흐름과 함께 살펴봅니다.", refs: ["alloy", "alloypipe", "alloytelemetry"], architectureTool: "alloy", blocks: [{ title: "그림 읽기", text: "OTLP 수신, 대상 발견, 파이프라인 처리, Prometheus·Loki·Tempo 전송이 서로 다른 영역으로 나뉩니다.", points: ["정상 흐름과 export retry 경로 비교", "구성 요소를 선택해 운영 지표 확인"] }] },
      { slug: "operations", title: "Retry와 Backpressure", lead: "전송 지연이 수집기 메모리와 데이터 손실로 이어지는 경로를 봅니다.", refs: ["alloytelemetry", "alloypipe"], blocks: [{ title: "운영자가 볼 신호", text: "입력은 정상인데 목적지 전송만 밀릴 수 있습니다. 입력량, 처리 지연, 전송 재시도를 각각 확인해야 합니다.", points: ["무한 재시도로 메모리를 고갈시키지 않기", "민감한 로그를 보내기 전에 필터링하기"] }] },
      { slug: "practice", title: "세 저장소로 보내기", lead: "하나의 결혼 서비스에서 나온 세 신호가 각각 어디로 가는지 확인합니다.", refs: ["alloy", "prom", "loki", "tempo"], practice: "transport", blocks: [{ title: "직접 확인할 것", text: "수집 경로 실습에서 대상과 전송 경로를 바꾸며 어느 지점에서 데이터가 끊기는지 확인합니다.", points: ["메트릭 scrape 경로 확인", "로그와 trace_id의 연결 확인"] }] },
    ],
  },
  {
    id: "prometheus",
    name: "Prometheus",
    role: "메트릭 수집·시계열 저장·PromQL",
    summary: "숫자의 추세와 비율로 장애가 시작된 시각을 좁힙니다.",
    chapters: [
      { slug: "why", title: "메트릭은 언제 필요한가", lead: "로그를 세는 대신 시간에 따른 추세를 저장해야 하는 순간을 봅니다.", refs: ["prom", "sre"], blocks: [{ title: "메트릭의 질문", text: "몇 건이 실패했는지보다 전체 요청 중 어느 비율이 실패했는지, 언제부터 변했는지가 먼저 필요할 때 메트릭을 사용합니다.", points: ["카운터와 비율 구분", "관측 시간 범위 정하기"] }] },
      { slug: "model", title: "Metric과 Label", lead: "이름·값·라벨 조합이 하나의 시계열이 되는 과정을 이해합니다.", refs: ["prom", "cardinality"], blocks: [{ title: "라벨 설계", text: "라벨은 조회할 차원을 만듭니다. 요청마다 달라지는 값을 무심코 넣으면 시계열 수가 커져 저장과 쿼리 비용이 함께 늘어납니다.", points: ["서비스·환경·상태처럼 운영 질문에 필요한 차원 선택", "userId와 weddingId 같은 요청별 값을 메트릭 라벨로 만들지 않기"] }] },
      { slug: "cardinality", title: "카디널리티를 관리하기", lead: "라벨 조합이 늘어날 때 시계열 수와 운영 비용이 어떻게 변하는지 계산합니다.", refs: ["cardinality", "promstorage"], blocks: [{ title: "카디널리티란 무엇인가", text: "카디널리티는 라벨 조합으로 만들어지는 서로 다른 시계열의 수를 뜻합니다. service·environment·status처럼 값의 종류가 제한된 라벨은 질문을 나누는 데 쓸 수 있지만, 요청마다 달라지는 ID를 넣으면 조합 수가 빠르게 커질 수 있습니다.", points: ["라벨 하나가 아니라 라벨 조합의 수를 보기", "새 라벨을 추가하기 전에 실제 조회 질문과 값의 종류 적기"] }, { title: "운영 전에 확인할 것", text: "카디널리티가 커지면 수집 샘플 수와 저장 공간, 쿼리 범위를 함께 점검해야 합니다. 문제를 발견한 뒤 라벨을 지우기보다 계측 단계에서 필요한 차원만 남기는 편이 안전합니다.", points: ["고유값이 많은 라벨 후보를 배포 전에 검토", "요청 ID는 로그·트레이스의 연결 키로 남기고 메트릭 라벨과 분리"] }] },
      { slug: "architecture", title: "내부 Architecture", lead: "Target discovery, scrape, WAL, TSDB, PromQL의 연결을 한 화면에서 봅니다.", refs: ["promarch", "promstorage"], architectureTool: "prometheus", blocks: [{ title: "쓰기와 읽기", text: "Prometheus는 대상을 찾아 주기적으로 읽고, 최근 샘플을 WAL에 기록한 뒤 TSDB 블록으로 보관합니다. PromQL은 저장된 시계열을 읽는 경로입니다.", points: ["scrape timeout과 target health 분리", "WAL과 블록 저장을 서로 다른 운영 문제로 보기"] }] },
      { slug: "query", title: "PromQL로 질문 만들기", lead: "원시 값보다 rate·increase·histogram을 이용해 운영 질문을 만듭니다.", refs: ["promql", "histogram"], blocks: [{ title: "질문을 쿼리로 바꾸기", text: "오류율, 요청량, p95 지연처럼 운영자가 판단할 수 있는 형태로 집계합니다. 쿼리 범위와 라벨 필터가 결과의 의미를 결정합니다.", points: ["rate와 increase의 시간 범위 확인", "히스토그램 bucket과 분위수의 관계 확인"] }] },
      { slug: "operations", title: "Scrape와 Cardinality 운영", lead: "값이 0인 이유가 실제 장애인지 수집 실패인지 구분합니다.", refs: ["promarch", "cardinality", "promstorage"], practice: "metrics", blocks: [{ title: "운영 체크", text: "target health, scrape duration, sample 수, 저장 공간을 함께 봅니다. 쿼리 결과가 비었다고 애플리케이션이 반드시 정상인 것은 아닙니다.", points: ["up 값과 target 상태 확인", "고유값이 많은 라벨을 먼저 줄이기"] }] },
    ],
  },
  {
    id: "loki",
    name: "Loki",
    role: "로그 수집·라벨 인덱스·LogQL",
    summary: "라벨로 범위를 좁힌 뒤 필요한 로그 본문을 읽습니다.",
    chapters: [
      { slug: "why", title: "Loki는 어떤 검색을 맡나", lead: "모든 로그 본문을 무겁게 색인하는 방식과 다른 출발점을 봅니다.", refs: ["loki", "lokilabel"], blocks: [{ title: "검색의 순서", text: "먼저 서비스·환경·시간 같은 라벨로 읽을 로그의 범위를 줄이고, 그 안에서 본문을 필터링합니다.", points: ["라벨과 본문 검색의 책임 구분", "장애 때 반복할 검색 조건을 미리 정하기"] }] },
      { slug: "labels", title: "Stream·Label·카디널리티", lead: "라벨 조합이 로그 stream 수와 저장·검색 비용에 미치는 영향을 이해합니다.", refs: ["lokilabel", "lokimetadata"], blocks: [{ title: "로그의 카디널리티", text: "Loki에서 라벨 조합은 로그 stream을 나눕니다. 라벨 값의 조합이 지나치게 많아지면 stream 관리와 검색 범위가 복잡해질 수 있으므로, 장애 때 자주 좁혀 볼 값만 라벨로 둡니다.", points: ["service·environment·severity부터 검토", "고유값이 큰 ID는 structured metadata나 본문에 둘지 공식 권고 확인", "라벨 조합 수와 실제 LogQL 질문을 함께 검토"] }] },
      { slug: "architecture", title: "내부 Architecture", lead: "Distributor, Ingester, chunks, index, Querier의 쓰기·읽기 경로를 나눠 봅니다.", refs: ["lokiarch", "lokilabel"], architectureTool: "loki", blocks: [{ title: "두 경로로 읽기", text: "쓰기 경로는 로그를 받아 Ingester와 저장소로 보내고, 읽기 경로는 LogQL을 나눠 최근 데이터와 저장된 데이터를 함께 조회합니다.", points: ["429와 retry를 쓰기 문제로 보기", "쿼리 범위와 저장소 지연을 읽기 문제로 보기"] }] },
      { slug: "query", title: "LogQL과 검색 비용", lead: "라벨 선택과 본문 필터를 어떤 순서로 적용할지 익힙니다.", refs: ["logql", "lokilabel"], blocks: [{ title: "쿼리 작성 순서", text: "넓은 시간 범위와 많은 stream을 한 번에 검색하면 비용이 커집니다. 먼저 라벨 선택을 좁히고 필요한 본문 조건을 뒤에 둡니다.", points: ["서비스·환경·시간 범위 제한", "ERROR와 trace_id를 단계적으로 적용"] }] },
      { slug: "operations", title: "429·Flush·Retention", lead: "로그가 늦게 보이거나 검색이 느릴 때 확인할 내부 상태를 정리합니다.", refs: ["lokiarch", "lokimetadata"], practice: "logging", blocks: [{ title: "운영 체크", text: "Distributor의 거부와 Ingester flush 지연을 분리해서 봅니다. 보관 정책은 저장소와 쿼리 범위에 함께 영향을 줍니다.", points: ["write ACK 이후 저장 경로 확인", "보관 기간과 비용을 함께 결정"] }] },
    ],
  },
  {
    id: "tempo",
    name: "Tempo",
    role: "트레이스 수집·블록 저장·TraceQL",
    summary: "trace_id 하나로 요청의 서비스 경계와 느린 span을 따라갑니다.",
    chapters: [
      { slug: "why", title: "트레이스는 언제 필요한가", lead: "오류율과 로그만으로 알 수 없는 요청 내부의 지연을 찾습니다.", refs: ["tempo", "otel"], blocks: [{ title: "트레이스의 질문", text: "요청 하나가 여러 서비스를 거칠 때 어느 span이 시간을 사용했는지, 어디서 상태가 바뀌었는지 확인합니다.", points: ["trace와 span의 관계", "로그·메트릭에서 trace_id로 이동"] }] },
      { slug: "model", title: "Trace·Span·Resource", lead: "트레이스의 식별자와 span 속성이 검색 기준이 되는 과정을 봅니다.", refs: ["tempo", "tempostructure", "context"], blocks: [{ title: "연결에 필요한 값", text: "trace_id는 요청 전체를, span_id는 요청 안의 한 구간을 가리킵니다. service.name과 HTTP 속성은 어느 서비스와 작업인지 설명합니다.", points: ["부모·자식 span 관계 확인", "로그의 trace_id 형식과 맞추기"] }] },
      { slug: "architecture", title: "내부 Architecture", lead: "Distributor, Live-store, Block-builder, Object storage, Querier를 나눠 봅니다.", refs: ["tempoarch", "tempostructure"], architectureTool: "tempo", blocks: [{ title: "최근 데이터와 과거 데이터", text: "최근 trace는 live-store에서 빠르게 읽고, 완성된 block은 object storage에 보관합니다. 조회 계층은 두 경로를 함께 확인합니다.", points: ["queue full과 object storage 지연 구분", "최근 조회와 과거 조회 결과 비교"] }] },
      { slug: "query", title: "TraceQL로 원인 좁히기", lead: "서비스·상태·속성으로 느린 trace를 찾습니다.", refs: ["traceql", "traceqlconstruct"], blocks: [{ title: "검색의 기준", text: "먼저 서비스와 상태로 후보를 줄이고, span 속성과 시간 범위를 추가해 원인 구간을 좁힙니다.", points: ["500 상태 trace부터 찾기", "느린 span과 관련 로그 연결"] }] },
      { slug: "operations", title: "Sampling과 저장 운영", lead: "모든 trace를 보관할 수 없을 때 무엇을 남길지 결정합니다.", refs: ["tempoarch", "tempostructure"], practice: "trace", blocks: [{ title: "운영 체크", text: "수집량과 보관 비용을 함께 보고 샘플링 기준을 정합니다. 샘플링으로 빠진 trace가 장애 조사에 필요한 신호인지 확인합니다.", points: ["ingest와 query 지연 분리", "trace_id 연결이 끊긴 구간 확인"] }] },
    ],
  },
  {
    id: "grafana",
    name: "Grafana",
    role: "조회·시각화·알림",
    summary: "서로 다른 저장소의 질문과 결과를 한 화면에서 이어 봅니다.",
    chapters: [
      { slug: "why", title: "Grafana는 무엇을 맡나", lead: "Grafana가 저장소가 아니라 조회와 판단의 화면인 이유를 확인합니다.", refs: ["grafana", "explore"], blocks: [{ title: "역할 분리", text: "Prometheus·Loki·Tempo가 데이터를 보관하고 Grafana는 각 저장소의 언어로 질문해 결과를 보여 줍니다.", points: ["데이터 소스와 패널 분리", "Explore에서 원인 후보를 먼저 확인"] }] },
      { slug: "explore", title: "Explore에서 세 신호 잇기", lead: "메트릭 시각을 로그와 trace_id 조사로 이어 갑니다.", refs: ["explore", "promql", "logql", "traceql"], blocks: [{ title: "조사 순서", text: "메트릭에서 이상 시각을 찾고, 같은 시간대의 로그에서 trace_id를 찾은 뒤 Tempo에서 요청 경로를 확인합니다.", points: ["시간 범위를 맞추기", "쿼리 언어가 바뀌는 경계 기록"] }] },
      { slug: "architecture", title: "내부 Architecture", lead: "Data source, Query runner, Transform, Panel, Alert rule의 흐름을 봅니다.", refs: ["grafana", "explore"], architectureTool: "grafana", blocks: [{ title: "조회에서 알림까지", text: "데이터 소스 연결과 쿼리 실행은 패널 시각화와 별도 단계입니다. 알림 규칙은 패널 화면과 독립적으로 평가할 수 있습니다.", points: ["데이터 소스 health와 query error 분리", "패널 범위와 알림 평가 범위 확인"] }] },
      { slug: "dashboards", title: "패널과 대시보드", lead: "운영자가 다시 사용할 질문을 패널로 고정하는 법을 정리합니다.", refs: ["grafana", "explore"], blocks: [{ title: "좋은 화면의 조건", text: "패널에는 질문, 시간 범위, 필터, 단위를 함께 적습니다. 결과만 크게 보여 주면 다음 행동을 고르기 어렵습니다.", points: ["서비스·환경 변수의 범위 제한", "로그·메트릭·트레이스 링크를 함께 제공"] }] },
      { slug: "alerting", title: "Alerting과 연락처", lead: "화면을 보는 것과 당번에게 알리는 규칙을 분리합니다.", refs: ["alert", "contact"], practice: "alerting", blocks: [{ title: "알림 운영", text: "조건·대기 시간·No data 처리·연락처·에스컬레이션을 함께 정해야 알림이 실제 대응으로 이어집니다.", points: ["Pending과 Alerting 구분", "알림 내용에 서비스·환경·Runbook 링크 포함"] }] },
    ],
  },
];

export function findToolSeries(id, chapterSlug) {
  const series = toolCurriculum.find((item) => item.id === id);
  if (!series) return null;
  const index = series.chapters.findIndex((item) => item.slug === chapterSlug);
  if (index < 0) return null;
  return { series, chapter: series.chapters[index], index };
}
