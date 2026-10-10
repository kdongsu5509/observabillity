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
      { slug: "practice", title: "세 저장소로 보내기", lead: "하나의 결혼 서비스에서 나온 세 신호가 각각 어디로 가는지 확인합니다.", refs: ["alloy", "prom", "loki", "tempo"], practice: "transport", blocks: [{ title: "직접 확인할 것", text: "수집 경로 실습에서 remote_write·로그 전송·OTLP 전송을 각각 바꾸며 어느 지점에서 데이터가 끊기는지 확인합니다.", points: ["Alloy remote_write가 Prometheus 수신기에 도착하는지 확인", "로그와 trace_id의 연결 확인"] }] },
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
      { slug: "architecture", title: "내부 Architecture", lead: "Alloy remote_write, 수신기, WAL, TSDB, PromQL의 연결을 한 화면에서 봅니다.", refs: ["promarch", "promstorage", "promcli"], architectureTool: "prometheus", blocks: [{ title: "쓰기와 읽기", text: "비비디에서는 Alloy가 보낸 remote_write 샘플을 Prometheus 수신기가 받고, WAL과 TSDB 블록으로 보관합니다. PromQL은 저장된 시계열을 읽는 경로입니다.", points: ["remote_write 수신 오류와 Alloy 재시도 분리", "WAL 기록과 블록 압축을 서로 다른 운영 문제로 보기"] }] },
      { slug: "query", title: "PromQL로 질문 만들기", lead: "원시 값보다 rate·increase·histogram을 이용해 운영 질문을 만듭니다.", refs: ["promql", "histogram"], blocks: [{ title: "질문을 쿼리로 바꾸기", text: "오류율, 요청량, p95 지연처럼 운영자가 판단할 수 있는 형태로 집계합니다. 쿼리 범위와 라벨 필터가 결과의 의미를 결정합니다.", points: ["rate와 increase의 시간 범위 확인", "히스토그램 bucket과 분위수의 관계 확인"] }] },
      { slug: "operations", title: "Remote write와 Cardinality 운영", lead: "값이 0인 이유가 애플리케이션 장애인지 전송·저장 문제인지 구분합니다.", refs: ["promarch", "cardinality", "promstorage", "promcli"], practice: "metrics", blocks: [{ title: "운영 체크", text: "Alloy 전송 큐, Prometheus remote_write 수신, WAL 기록, TSDB 저장 공간을 나눠 봅니다. 쿼리 결과가 비었다고 애플리케이션이 반드시 정상인 것은 아닙니다.", points: ["remote_write 수신량과 오류 확인", "고유값이 많은 라벨을 먼저 줄이기"] }] },
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

const alternativeChapters = {
  otel: {
    refs: ["otel", "collector", "jaeger", "zipkin", "datadog", "newrelic"],
    lead: "OpenTelemetry를 기본값으로 두되, 계측 표준·수집기·상용 APM을 같은 역할로 비교하지 않습니다.",
    blocks: [{ title: "먼저 역할을 맞추기", text: "OpenTelemetry는 표준과 계측 생태계이고, OpenTelemetry Collector·Alloy는 수집 실행 계층입니다. Datadog APM과 New Relic APM은 계측부터 저장·조회까지 묶은 상용 제품이며, Jaeger와 Zipkin은 추적 중심의 오픈소스 구성입니다.", points: ["표준을 바꿀지 백엔드를 바꿀지 먼저 결정", "벤더 에이전트의 편의성과 이식성 사이의 비용 기록", "기존 trace 형식과 운영 화면을 교체할 범위 계산"] }],
    comparison: [
      ["OpenTelemetry", "여러 백엔드와 계측을 분리하고 싶을 때", "표준 API·SDK와 넓은 생태계", "수집기·저장소·조회 화면을 별도로 설계"],
      ["Datadog APM", "관리형 APM과 한 화면의 빠른 도입", "계측부터 분석까지 제품 경험이 연결됨", "사용량 비용과 제품 종속성 검토"],
      ["Jaeger / Zipkin", "추적만 작게 시작하거나 기존 시스템과 연결", "추적 개념과 호환 도구가 명확함", "로그·메트릭까지 같은 표준으로 묶는 설계는 별도 필요"],
    ],
  },
  alloy: {
    refs: ["alloy", "alloypipe", "collector", "fluentbit"],
    lead: "수집기 선택은 기능 목록보다 입력 신호, 라우팅 복잡도, 운영 인력으로 결정합니다.",
    blocks: [{ title: "대안을 고르는 질문", text: "세 신호를 한 파이프라인에서 다룰지, 로그 에이전트와 추적 수집기를 나눌지부터 정합니다. 현재 비비디의 메트릭은 Alloy remote_write로 전달하므로 scrape가 필요한지부터 다시 확인합니다.", points: ["OTLP receiver와 remote_write exporter가 모두 필요한가", "로그만 빠르게 전달하면 Fluent Bit로 충분한가", "벤더 중립 Collector 설정을 유지할 필요가 있는가"] }],
    comparison: [
      ["Grafana Alloy", "Prometheus·Loki·Tempo를 Grafana 스택으로 연결", "신호별 컴포넌트와 파이프라인을 한곳에서 운영", "컴포넌트 그래프와 목적지별 장애 대응 학습 필요"],
      ["OpenTelemetry Collector", "벤더 중립 OTLP 파이프라인과 다양한 exporter", "receiver·processor·exporter 생태계와 이식성", "Grafana 저장소별 운영 화면과 연결을 직접 설계"],
      ["Fluent Bit", "가벼운 로그 수집과 변환", "작은 에이전트로 로그 입력·출력에 집중", "메트릭·트레이스 파이프라인은 별도 구성"],
    ],
  },
  prometheus: {
    refs: ["prom", "promarch", "promstorage", "mimir", "datadogmetrics"],
    lead: "직접 운영하는 단일 Prometheus와 장기 보관·수평 확장 대안을 운영 조건으로 비교합니다.",
    blocks: [{ title: "규모보다 운영 조건", text: "현재 샘플 수만 보지 말고 보관 기간, 장애 때 복구할 팀, 여러 클러스터의 데이터를 합칠 필요를 함께 적습니다. Prometheus 호환 API가 필요해도 저장소 운영 방식은 달라질 수 있습니다.", points: ["단일 서버의 장애 허용 범위 확인", "장기 보관과 여러 팀의 격리 요구 확인", "관리형 비용과 직접 운영 인건비를 같은 표에 기록"] }],
    comparison: [
      ["Prometheus", "작은 규모에서 remote_write·PromQL을 직접 운영", "구조가 단순하고 WAL·TSDB·쿼리 흐름을 직접 확인", "장기 보관·수평 확장은 별도 설계"],
      ["Grafana Mimir", "여러 팀·클러스터의 장기 시계열 보관", "Prometheus 호환 API와 수평 확장", "분산 구성 요소와 운영 비용 증가"],
      ["Datadog Metrics", "저장소 운영보다 관리형 모니터링 우선", "수집·저장·조회 인프라를 직접 유지하지 않음", "사용량 비용과 제품 종속성 계산"],
    ],
  },
  loki: {
    refs: ["loki", "lokiarch", "lokilabel", "elastic", "datadoglogs"],
    lead: "라벨 중심 로그와 필드 전문 검색의 차이를 검색 질문과 비용으로 판단합니다.",
    blocks: [{ title: "검색 질문을 먼저 적기", text: "서비스·환경·시간으로 범위를 좁힌 뒤 본문을 찾는다면 Loki의 모델과 맞습니다. 상담 메모처럼 임의 필드 전문 검색과 집계가 주 질문이면 검색 엔진 대안을 함께 검토합니다.", points: ["장애 때 첫 필터가 무엇인지 기록", "라벨 카디널리티와 본문 검색 비용 비교", "보관 기간·삭제 정책·객체 저장소 운영 주체 확인"] }],
    comparison: [
      ["Loki", "라벨과 시간으로 로그 범위를 좁히는 운영", "본문 전체를 색인하지 않고 비용 구조가 단순", "라벨 설계와 stream 카디널리티가 성능을 좌우"],
      ["Elasticsearch", "필드·본문 전문 검색과 복합 집계", "검색 표현력과 분석 기능이 넓음", "색인·샤드·보관 저장소 운영 부담"],
      ["Datadog Logs", "관리형 로그 검색과 다른 신호의 빠른 연결", "수집·검색·보관 운영을 직접 맡지 않음", "로그량과 기능에 따른 비용·제품 종속성"],
    ],
  },
  tempo: {
    refs: ["tempo", "tempoarch", "traceql", "jaeger", "zipkin", "datadog"],
    lead: "트레이스 저장소는 계측 표준, 검색 깊이, 운영 방식과 함께 비교해야 합니다.",
    blocks: [{ title: "트레이스 대안의 차이", text: "Tempo는 Grafana 신호와 object storage를 조합하는 선택입니다. Jaeger와 Zipkin은 추적 중심의 오픈소스 선택이고, Datadog APM은 수집·분석·화면을 관리형으로 묶습니다.", points: ["TraceQL과 기존 검색 언어의 전환 비용 확인", "샘플링으로 남길 trace와 버릴 trace의 기준 작성", "object storage 운영과 관리형 비용 비교"] }],
    comparison: [
      ["Tempo", "Grafana에서 로그·메트릭과 trace_id를 이어 보기", "object storage 중심 보관과 TraceQL", "수집기·샘플링·저장소를 직접 운영"],
      ["Jaeger / Zipkin", "추적만 작게 시작하거나 기존 추적 시스템 유지", "추적 파이프라인과 개념이 명확", "세 신호를 함께 운영하는 연결은 별도 설계"],
      ["Datadog APM", "관리형 APM과 빠른 서비스 맵", "계측·저장·검색 화면을 한 제품에서 제공", "사용량 비용과 제품 종속성 검토"],
    ],
  },
  grafana: {
    refs: ["grafana", "explore", "kibana", "datadog"],
    lead: "조회 화면의 선택은 저장소를 무엇으로 쓰는지와 함께 결정합니다.",
    blocks: [{ title: "화면보다 조사 흐름", text: "Prometheus·Loki·Tempo를 함께 조회하고 싶다면 Grafana의 데이터 소스와 Explore 연결이 중요합니다. Elasticsearch 중심 조직은 Kibana, 관리형 관측 스택은 Datadog의 화면과 비교합니다.", points: ["현재 저장소의 쿼리 언어와 링크 지원 확인", "대시보드보다 장애 때의 조사 순서 먼저 정의", "알림 규칙과 시각화의 소유 팀 분리"] }],
    comparison: [
      ["Grafana", "Prometheus·Loki·Tempo를 한 조사 흐름에 연결", "데이터 소스별 쿼리와 대시보드·알림을 조합", "각 저장소의 권한·쿼리·운영을 별도로 관리"],
      ["Kibana", "Elasticsearch 중심의 로그 검색과 분석", "필드 탐색과 검색·집계 경험이 연결", "Prometheus·Tempo까지 같은 방식으로 묶으려면 추가 구성"],
      ["Datadog", "관리형 메트릭·로그·트레이스 화면", "신호 간 연결과 알림을 빠르게 구성", "데이터량 기반 비용과 제품 종속성 검토"],
    ],
  },
};

for (const series of toolCurriculum) {
  const alternative = alternativeChapters[series.id];
  if (alternative) {
    series.chapters.push({
      slug: "alternatives",
      title: "대표 대안과 비교",
      lead: alternative.lead,
      refs: alternative.refs,
      blocks: alternative.blocks,
      comparison: alternative.comparison,
    });
  }
}

const depthBySlug = {
  why: { title: "선택 전에 적어 볼 운영 질문", text: "도구 이름부터 고르면 도입 뒤에 같은 질문을 여러 화면에서 다시 만들게 됩니다. 결혼 상담 저장 실패를 발견했을 때 어떤 신호를 먼저 보고, 어느 시간 범위를 비교하고, 누가 복구를 시작할지 한 문장으로 적어 보세요.", points: ["가장 먼저 필요한 신호와 늦어도 되는 신호 구분", "저장소보다 먼저 운영 질문과 담당자 정하기"] },
  signals: { title: "신호가 끊길 때", text: "한 신호가 보인다고 요청 전체가 정상인 것은 아닙니다. 메트릭·로그·트레이스의 공통 키와 시간 범위를 맞춰야 같은 사건을 이어 볼 수 있습니다.", points: ["생성·전송·저장·조회 중 어느 경계에서 끊겼는지 기록", "trace_id·service.name·환경 값을 함께 확인"] },
  otlp: { title: "전송 실패를 분리하기", text: "OTLP 클라이언트 오류, 수집기 수신 오류, 백엔드 거부는 서로 다른 복구 방법을 가집니다. 애플리케이션 로그만 보고 전송이 성공했다고 판단하지 않습니다.", points: ["송신 큐와 수신 응답을 별도로 관찰", "재시도가 중복 데이터와 지연을 만들지 확인"] },
  collector: { title: "경계를 문서로 남기기", text: "수집기 설정은 컴포넌트가 많아질수록 연결 자체가 운영 지식이 됩니다. 입력 하나가 어느 processor와 exporter를 거치는지 장애 대응 문서에 고정합니다.", points: ["컴포넌트 이름·입력·출력·목적지 기록", "필터가 데이터를 버리는 지점과 근거 기록"] },
  components: { title: "구성 변경의 영향", text: "컴포넌트 하나를 바꾸면 뒤의 출력 형식과 큐 동작도 바뀔 수 있습니다. 설정을 추가할 때는 성공 경로뿐 아니라 잘못된 입력과 목적지 장애를 함께 시험합니다.", points: ["변경 전후 처리량과 지연 비교", "실패한 신호가 조용히 버려지지 않는지 확인"] },
  architecture: { title: "그림에서 지켜볼 지점", text: "Architecture 그림은 이름을 외우는 자료가 아니라 장애 범위를 줄이는 지도입니다. 정상 흐름과 실패 선을 따라가며 어느 컴포넌트의 지표를 먼저 볼지 정합니다.", points: ["입구·버퍼·저장·조회 경계를 각각 확인", "프로토콜과 재시도 주체를 정확히 적기"] },
  operations: { title: "복구 순서", text: "운영 중에는 모든 설정을 한꺼번에 바꾸지 않습니다. 데이터가 만들어지는지, 전송되는지, 저장되는지, 조회되는지 순서대로 한 경계씩 확인해야 원인 범위를 보존할 수 있습니다.", points: ["최근 정상 시각과 처음 실패한 시각 비교", "임시 완화와 근본 수정의 담당자·기한 기록"] },
  practice: { title: "실습 뒤 남길 기록", text: "실습은 정답을 고르는 데서 끝나지 않습니다. 어떤 신호를 보고 다음 도구로 이동했는지와 실제 운영에서 확인할 지표를 짧게 적어 보세요.", points: ["질문·쿼리·결과·다음 행동을 한 줄씩 기록", "실패한 쿼리도 왜 실패했는지 남기기"] },
  model: { title: "필드를 추가하기 전", text: "데이터 모델에 필드를 하나 추가하면 저장량과 검색 축이 늘어납니다. 값의 수명과 고유값, 실제 운영 질문을 먼저 확인한 뒤 신호를 선택합니다.", points: ["필드의 값 종류와 변경 빈도 확인", "로그·메트릭·트레이스 중 가장 싼 위치 선택"] },
  cardinality: { title: "카디널리티를 계속 관찰하기", text: "카디널리티는 한 번 설계하고 끝나는 값이 아닙니다. 새 서비스·환경·경로가 추가될 때 조합 수와 쿼리 결과 수가 함께 변하는지 확인합니다.", points: ["배포 전 예상 조합 수를 계산", "고유값 증가를 감지할 운영 지표와 기준 정하기"] },
  query: { title: "쿼리 결과 검증", text: "쿼리가 실행됐다는 사실과 결과가 질문에 맞는다는 사실은 다릅니다. 시간 범위와 필터를 바꿔도 결론이 유지되는지, 원본 로그나 trace와 맞는지 확인합니다.", points: ["넓은 범위에서 후보를 찾고 좁은 범위에서 재확인", "쿼리 비용과 새로고침 주기를 함께 결정"] },
  explore: { title: "세 신호를 잇는 기준", text: "Explore에서 화면을 옮길 때 시간 범위·서비스·환경을 잃으면 다른 사건을 비교하게 됩니다. 이동할 때 유지해야 할 필터를 먼저 정합니다.", points: ["같은 시각과 서비스 조건으로 이동", "trace_id가 실제 같은 요청인지 로그와 대조"] },
  labels: { title: "라벨 변경의 영향", text: "라벨 이름과 값은 저장 구조와 쿼리 습관을 함께 바꿉니다. 새 라벨을 추가하기 전에 기존 대시보드와 알림의 필터를 찾아야 합니다.", points: ["라벨 조합 증가와 검색 범위 측정", "고유값은 메타데이터·본문·트레이스로 분리"] },
  dashboards: { title: "화면을 운영 규칙으로 만들기", text: "패널은 예쁜 그래프가 아니라 다음 행동을 고르는 운영 문서입니다. 값의 의미, 단위, 기준선, 연결된 로그·트레이스를 한 화면에 남깁니다.", points: ["패널 제목을 질문형으로 작성", "No data와 지연된 데이터 상태를 구분"] },
  alerting: { title: "알림 뒤의 행동", text: "알림 조건만 만들면 대응이 끝나지 않습니다. 누가 어떤 화면에서 무엇을 확인하고 언제 정상으로 판단할지까지 규칙에 포함해야 합니다.", points: ["Pending·Firing·복구 조건을 명시", "중복 알림을 묶고 Runbook 링크를 연결"] },
};

for (const series of toolCurriculum) {
  for (const chapter of series.chapters) {
    const depth = depthBySlug[chapter.slug];
    if (depth && !chapter.comparison && chapter.blocks.length < 2) {
      chapter.blocks.push({
        title: depth.title,
        text: depth.text,
        points: depth.points,
      });
    }
  }
}

export function findToolSeries(id, chapterSlug) {
  const series = toolCurriculum.find((item) => item.id === id);
  if (!series) return null;
  const index = series.chapters.findIndex((item) => item.slug === chapterSlug);
  if (index < 0) return null;
  return { series, chapter: series.chapters[index], index };
}
