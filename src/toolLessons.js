// 도구별 학습 순서. 각 글은 한 가지 개념을 본문에서 직접 설명한다.
export const toolCurriculum = [
  {
    id: "otel",
    name: "OpenTelemetry",
    role: "계측과 전송의 표준",
    summary: "애플리케이션이 관측 데이터를 만드는 공통 언어부터 이해합니다.",
    chapters: [
      { slug: "why", title: "계측 표준이 필요한 이유", lead: "공통 계측 API가 저장소 교체와 서비스 간 문맥 전달에 주는 이점을 설명합니다.", refs: ["otel", "context"], blocks: [{ title: "계측 코드와 저장소의 분리", text: "로그·메트릭·트레이스를 만드는 코드가 제품마다 다르면 저장소를 바꿀 때 애플리케이션도 함께 고쳐야 합니다. OpenTelemetry API와 SDK로 신호를 만들고 OTLP로 수집기에 보내면, 목적지는 수집기 설정에서 바꿀 수 있습니다.", points: ["애플리케이션은 신호를 만들고 수집기는 목적지별 전송을 맡아 저장소 변경이 계측 코드에 번지지 않습니다.", "요청 문맥을 서비스 경계로 전파하면 각 서비스의 span이 같은 trace에 속해 하나의 호출 경로로 이어집니다."] }] },
      { slug: "signals", title: "신호와 Context", lead: "메트릭은 추세, 로그는 사건, 트레이스는 요청 경로를 보여 줍니다.", refs: ["otel", "context"], blocks: [{ title: "세 신호와 연결 식별자", text: "메트릭은 일정 시간의 요청량·오류율처럼 전체 추세를, 로그는 개별 사건의 시각과 본문을, 트레이스는 요청 하나가 서비스와 작업을 거친 경로를 기록합니다. Context는 이 요청의 식별 정보를 다음 서비스로 전달합니다.", points: ["trace_id는 요청 전체를 식별하고 span_id는 그 요청 안의 한 작업을 식별합니다. 같은 trace_id가 있는 로그와 span을 함께 보면 사건과 호출 경로를 연결할 수 있습니다.", "W3C Trace Context의 traceparent 헤더는 trace ID, 부모 span ID, 추적 플래그를 서비스 경계로 전달합니다. 수신 서비스는 이를 부모 문맥으로 사용해 자식 span을 만듭니다."] }] },
      { slug: "otlp", title: "OTLP로 보내기", lead: "계측 코드에서 수집기로 데이터를 넘기는 경계를 확인합니다.", refs: ["otlp", "otel"], blocks: [{ title: "전송 경계", text: "애플리케이션은 데이터를 만들고 OTLP는 그 데이터를 수집기나 백엔드로 보내는 전송 규약입니다. 저장소 선택은 그 다음 문제입니다.", points: ["gRPC와 HTTP 전송 경계 구분", "전송 실패와 재시도 지점 기록"] }] },
      { slug: "collector", title: "Collector와 Alloy의 자리", lead: "OpenTelemetry 표준과 실제 수집 파이프라인의 역할을 구분합니다.", refs: ["collector", "alloywhy", "alloypipe"], blocks: [{ title: "표준과 수집기의 역할", text: "OpenTelemetry는 계측 API·데이터 모델·전송 규약을 정의합니다. Collector와 Alloy는 이 데이터를 실제로 수신하고 필터링·배치한 뒤 목적지로 전송하는 실행 제품입니다. 둘을 분리하면 앱의 계측 방식은 유지하면서 수집 경로를 조정할 수 있습니다.", points: ["계측 표준은 데이터의 공통 형식을 정하고, Collector·Alloy는 그 형식을 처리하는 파이프라인을 실행합니다.", "수집기에서는 필터로 버린 데이터, 배치 대기량, 목적지별 전송 오류와 재시도를 각각 관찰해 누락 구간을 찾습니다."] }] },
      { slug: "operations", title: "계측 운영 체크", lead: "데이터가 만들어졌다는 사실과 실제로 도착했다는 사실을 나눠 확인합니다.", refs: ["otel", "otlp", "collector"], blocks: [{ title: "장애 때 확인할 순서", text: "먼저 애플리케이션에 span과 metric이 만들어졌는지 확인하고, 다음으로 수집기 수신·처리·전송을 나눠 봅니다.", points: ["누락된 신호의 시작 지점 찾기", "민감한 속성과 과도한 고유값을 계측 단계에서 줄이기"] }] },
    ],
  },
  {
    id: "alloy",
    name: "Grafana Alloy",
    role: "수집·처리·전송 파이프라인",
    summary: "여러 입력을 받아 필요한 처리만 거친 뒤 신호별 저장소로 보냅니다.",
    chapters: [
      { slug: "why", title: "Alloy가 필요한 이유", lead: "Alloy가 없는 구성과 비교해 수집기를 한곳에 두는 이유를 설명합니다.", refs: ["alloy", "alloywhy", "collector", "fluentbit"], blocks: [{ title: "Alloy가 맡는 일", text: "Alloy는 메트릭·로그·트레이스의 수집, 필터링, 배치, 전송을 하나의 구성에서 관리합니다. 애플리케이션은 신호를 만들고 Alloy는 각 저장소로 보내므로 서비스마다 목적지와 전송 정책을 반복해 설정할 필요가 줄어듭니다.", points: ["입력 컴포넌트는 대상 발견·파일 읽기·OTLP 수신 등을 맡고 출력 컴포넌트는 신호별 저장소로 전송합니다.", "저장소별 전송 오류와 재시도를 별도로 볼 수 있어 장애가 난 경로를 좁힐 수 있습니다."] }, { title: "Alloy가 없는 구성", text: "Alloy 없이도 관측 시스템을 만들 수 있습니다. 애플리케이션의 SDK·exporter가 지원 프로토콜로 각 백엔드에 직접 보내거나, OpenTelemetry Collector를 공통 수집기로 두거나, 신호마다 전용 수집기를 둘 수 있습니다. Grafana는 어느 구성이든 저장소를 데이터 소스로 연결해 조회합니다.", points: ["직접 전송: 앱마다 목적지 주소·인증·재시도를 관리합니다. 파일 로그처럼 앱이 직접 보내지 않는 신호는 별도 수집 경로가 필요합니다.", "OpenTelemetry Collector: 앱 → Collector → 저장소로 이어지며 OTLP 수신·처리·전송을 공통으로 관리합니다. 필요한 수집·exporter 기능이 배포판에 있는지 확인합니다.", "전용 수집기 조합: Prometheus가 메트릭을 수집하고 Fluent Bit 같은 로그 수집기가 Loki로 보내며 Collector가 트레이스를 Tempo로 보낼 수 있습니다. 각 수집기의 설정·배포·모니터링을 따로 맡습니다."] }, { title: "Alloy를 선택하는 기준", text: "이미 한 가지 신호만 간단히 수집하거나 기존 Collector가 필요한 경로를 안정적으로 처리한다면 Alloy가 필수는 아닙니다. 여러 신호와 Prometheus·OpenTelemetry 경로를 함께 운영하면서 수집기 수와 설정 방식이 늘어나는 경우에는 Alloy로 묶을 이점이 커집니다.", points: ["비교할 비용은 제품 수뿐 아니라 설정 변경, 인증 관리, 업그레이드, 전송 장애 조사까지 포함합니다.", "수집기를 하나로 합쳐도 목적지 저장소의 장애와 보관 책임은 각각 남습니다."] }] },
      { slug: "components", title: "Component와 Pipeline", lead: "Receiver, Processor, Exporter가 어떻게 연결되는지 읽습니다.", refs: ["alloypipe", "alloytelemetry"], blocks: [{ title: "연결을 읽는 법", text: "입력 컴포넌트의 출력이 다음 컴포넌트의 입력이 됩니다. 필터와 배치를 어디에 두었는지가 실제 운영 결과를 바꿉니다.", points: ["입력·처리·출력의 책임 나누기", "참조 이름과 연결 방향 확인"] }] },
      { slug: "architecture", title: "내부 Architecture", lead: "Alloy의 컴포넌트 그래프에서 수신, 처리, 전송과 의존 관계를 읽습니다.", refs: ["alloy", "alloypipe", "alloytelemetry"], architectureTool: "alloy", blocks: [{ title: "컴포넌트 그래프", text: "Alloy는 설정에 정의한 컴포넌트의 참조를 연결해 실행 그래프를 만듭니다. 그림의 otelcol.receiver.otlp는 데이터를 받고 otelcol.processor.batch는 묶어서 전송 횟수를 줄이며 otelcol.exporter.otlp는 목적지로 보냅니다. 인증 정보도 전송기가 참조하는 별도 컴포넌트입니다.", points: ["수신기 → 배치 처리기 → 전송기의 연결이 실제 데이터 경로입니다.", "인증 정보 → 전송기의 연결은 데이터 전송이 아니라 설정 값의 의존 관계입니다.", "그림은 트레이스 예시입니다. 메트릭의 scrape·remote_write와 로그의 source·process·write는 각각 다른 컴포넌트로 만듭니다."] }, { title: "실행과 장애 범위", text: "컴포넌트 컨트롤러는 설정을 검증하고 참조 관계에 따라 컴포넌트를 실행하며 상태를 보고합니다. 입력이 정상이어도 처리 단계에서 데이터가 빠지거나 전송 단계에서 재시도가 누적될 수 있으므로 각 컴포넌트의 상태를 따로 봅니다.", points: ["수신량이 0이면 입력과 대상 발견을 확인합니다.", "출력만 지연되면 목적지 연결, 큐, 재시도를 확인합니다."] }] },
      { slug: "operations", title: "Retry와 Backpressure", lead: "목적지가 느려졌을 때 큐가 차고 데이터가 누락되는 과정을 추적합니다.", refs: ["alloyremotewrite", "alloylokiwrite", "alloyotlphttpexporter", "alloycomponentmetrics"], blocks: [
        { title: "입력보다 출력이 느리면", text: "초당 1,000건이 들어오는데 저장소가 300건만 받으면 나머지 700건은 대기열에 쌓입니다. 재시도는 일시적 장애를 버티게 하지만 대기열이 계속 커지면 메모리·디스크 한도에 닿습니다. 한도를 넘은 뒤에는 입력 측에 오류가 돌아가거나 데이터가 버려질 수 있습니다.", points: ["목적지의 429·5xx·연결 실패가 시작된 시각과 큐가 증가한 시각을 비교합니다.", "입력량이 출력량보다 크면 큐는 비워지지 않습니다. 전송량을 늘리거나 입력량을 줄여야 합니다."] },
        { title: "신호마다 버티는 방식", text: "prometheus.remote_write는 샘플을 로컬 WAL에 기록하고 큐에서 전송합니다. 장애가 길어져 WAL 보관 범위를 넘으면 미전송 샘플도 사라질 수 있습니다. loki.write는 로그 배치를 재시도하지만 모든 4xx가 재시도 대상은 아닙니다. otelcol.exporter.otlphttp는 전송 큐와 재시도 시간을 설정할 수 있고, 재시도 기한이 끝나면 배치를 버릴 수 있습니다.", points: ["메트릭: prometheus_remote_storage_samples_pending·samples_retries_total·samples_failed_total을 봅니다.", "로그: loki_write_batch_retries_total·loki_write_dropped_entries_total을 봅니다.", "트레이스: exporter의 큐·전송 실패·드롭을 보고, 장시간 장애를 견뎌야 하면 영속 큐를 검토합니다."] },
        { title: "막힌 지점 찾기", text: "Alloy 컴포넌트 그래프에서 입력 → 처리 → 전송을 따라가고 /metrics에서 전송기별 지표를 확인합니다. 컴포넌트가 정상 상태여도 저장소 도착을 뜻하지는 않습니다. 복구 뒤에는 대기열이 줄고 장애 시간대의 데이터가 실제 조회되는지 확인합니다.", points: ["입력은 있는데 재시도만 늘면 목적지 수신 한도·네트워크·인증을 확인합니다.", "큐와 재시도 시간을 무한정 늘리기 전에 허용 가능한 지연과 유실 범위를 정합니다."] },
      ] },
      { slug: "practice", title: "세 저장소로 보내기", lead: "Alloy 설정에서 세 입력을 각 저장소에 연결하고 쿼리로 도착을 확인합니다.", refs: ["alloyscrape", "alloyremotewrite", "alloysourcefile", "alloylokiwrite", "otlpreceiver", "alloybatch", "alloyotlphttpexporter"], practice: "transport", blocks: [
        { title: "1. 메트릭: scrape → remote_write → Prometheus", text: "앱의 메트릭 주소를 targets와 metrics_path에 적고 forward_to를 remote_write의 receiver에 연결합니다. Prometheus에는 --web.enable-remote-write-receiver를 켭니다. 아래 호스트 이름은 같은 컨테이너 네트워크의 예시입니다.", code: 'prometheus.scrape "app" {\n  targets      = [{"__address__" = "backend:8081"}]\n  metrics_path = "/actuator/prometheus"\n  forward_to   = [prometheus.remote_write.prom.receiver]\n}\nprometheus.remote_write "prom" {\n  endpoint { url = "http://prometheus:9090/api/v1/write" }\n}', points: ["Alloy에서 scrape 대상이 UP인지 확인하고 Prometheus에서 up 또는 앱 메트릭을 조회합니다.", "scrape는 성공하지만 쿼리가 비면 remote_write 오류와 Prometheus 수신 옵션을 확인합니다."] },
        { title: "2. 로그: 파일 읽기 → loki.write → Loki", text: "Alloy가 읽을 수 있는 로그 파일의 절대 경로를 targets에 적고 source의 forward_to를 loki.write에 연결합니다. 여러 파일을 glob으로 찾으려면 file_match를 추가합니다. 컨테이너 표준 출력 로그라면 loki.source.docker를 사용합니다.", code: 'loki.source.file "app" {\n  targets    = [{"__path__" = "/var/log/app/app.log", "job" = "app"}]\n  forward_to = [loki.write.store.receiver]\n}\nloki.write "store" {\n  endpoint { url = "http://loki:3100/loki/api/v1/push" }\n}', points: ["새 로그를 남기고 Grafana Explore의 Loki에서 {job=\"app\"}로 검색합니다.", "파일은 읽히는데 결과가 없으면 loki.write 오류·Loki 응답·조회 시간 범위를 확인합니다."] },
        { title: "3. 트레이스: OTLP 수신 → 배치 → Tempo", text: "앱은 Alloy의 OTLP HTTP 주소(:4318/v1/traces)로 span을 보냅니다. receiver의 traces 출력을 batch 입력에, batch 출력을 Tempo 전송기에 연결합니다. Tempo에는 OTLP HTTP 수신기가 켜져 있어야 합니다.", code: 'otelcol.receiver.otlp "app" {\n  http {}\n  output { traces = [otelcol.processor.batch.traces.input] }\n}\notelcol.processor.batch "traces" {\n  output { traces = [otelcol.exporter.otlphttp.tempo.input] }\n}\notelcol.exporter.otlphttp "tempo" {\n  client { endpoint = "http://tempo:4318" }\n}', points: ["요청 한 건을 발생시키고 앱 로그의 trace_id로 Grafana Explore의 Tempo에서 같은 trace를 찾습니다.", "수신기에 span이 없으면 앱의 OTLP 주소를, 수신은 됐는데 조회가 안 되면 batch·exporter·Tempo 수신을 확인합니다."] },
        { title: "세 경로를 따로 검증", text: "Prometheus의 메트릭, Loki의 새 로그, Tempo의 새 trace를 각각 조회해야 설정이 끝납니다. Alloy UI의 컴포넌트 그래프와 /metrics를 열어 데이터가 사라진 첫 연결을 찾습니다.", points: ["각 신호에서 새 데이터를 만들고 저장소에 나타난 시각과 Alloy 전송 오류를 기록합니다.", "한 출력 주소를 일부러 잘못 바꿔 해당 신호의 실패 지표와 나머지 두 경로를 비교합니다."] },
      ] },
    ],
  },
  {
    id: "prometheus",
    name: "Prometheus",
    role: "메트릭 수집·시계열 저장·PromQL",
    summary: "숫자의 추세와 비율로 장애가 시작된 시각을 좁힙니다.",
    chapters: [
      { slug: "why", title: "메트릭이 필요한 상황", lead: "시간에 따른 요청량과 오류율의 변화를 파악합니다.", refs: ["prom", "sre"], blocks: [{ title: "추세와 비율을 보는 신호", text: "몇 건이 실패했는지보다 전체 요청 중 어느 비율이 실패했는지, 언제부터 변했는지가 필요할 때 메트릭을 사용합니다.", points: ["Counter는 누적 횟수이며 rate는 일정 시간의 초당 변화율을 보여 줍니다.", "관측 시간 범위가 짧으면 순간 변화가 잘 보이고 길면 전체 추세가 안정적으로 보입니다."] }] },
      { slug: "model", title: "Metric과 Label", lead: "이름·값·라벨 조합이 하나의 시계열이 되는 과정을 이해합니다.", refs: ["prom", "cardinality"], blocks: [{ title: "라벨 설계", text: "라벨은 조회할 차원을 만듭니다. 요청마다 달라지는 값을 무심코 넣으면 시계열 수가 커져 저장과 쿼리 비용이 함께 늘어납니다.", points: ["서비스·환경·상태처럼 운영 질문에 필요한 차원 선택", "userId와 weddingId 같은 요청별 값을 메트릭 라벨로 만들지 않기"] }] },
      { slug: "cardinality", title: "카디널리티를 관리하기", lead: "라벨 조합이 늘어날 때 시계열 수와 운영 비용이 어떻게 변하는지 설명합니다.", refs: ["cardinality", "promstorage"], blocks: [{ title: "라벨 조합이 시계열이 되는 방식", text: "카디널리티는 서로 다른 라벨 조합으로 만들어지는 시계열 수입니다. 예를 들어 service 3종, environment 2종, status 2종이 모두 조합되면 한 메트릭에 최대 12개 시계열이 생깁니다. 여기에 요청마다 달라지는 request_id를 라벨로 넣으면 새 요청마다 별도 시계열이 만들어집니다.", points: ["실제 시계열 수는 존재하는 조합에 따라 달라지며, 라벨 하나의 값 개수만으로 결정되지 않습니다.", "service·environment·status처럼 값이 제한되고 집계에 필요한 차원만 라벨로 둡니다."] }, { title: "시계열이 많아지면 생기는 비용", text: "Prometheus는 시계열마다 최근 샘플과 라벨 정보를 관리합니다. 같은 요청량을 기록하더라도 요청 ID별로 시계열을 쪼개면 시계열별 메모리와 인덱스·WAL·저장 공간 부담이 늘고, 집계 쿼리가 더 많은 시계열을 읽어 CPU와 응답 시간을 사용합니다. 수집·전송에서도 더 많은 라벨 조합을 처리해야 합니다.", points: ["고유값이 많은 라벨은 메모리·디스크·네트워크·쿼리 비용을 동시에 키울 수 있습니다.", "시계열이 계속 새로 생기면 이전 시계열이 비활성화돼도 그 기간의 저장 데이터와 인덱스는 보관 기간 동안 남습니다."] }, { title: "요청 ID의 적절한 위치", text: "request_id·user_id·trace_id처럼 요청마다 바뀌는 식별자는 메트릭 라벨 대신 로그 본문·메타데이터 또는 트레이스에 둡니다. 메트릭은 서비스별 오류율 같은 집계에 쓰고, 개별 요청은 ID로 로그와 트레이스를 연결해 조사합니다.", points: ["새 라벨을 추가하기 전에 예상 고유값 수와 다른 라벨과의 조합을 계산합니다.", "개별 요청을 찾는 용도로는 로그와 트레이스가 더 적합합니다."] }] },
      { slug: "architecture", title: "내부 Architecture", lead: "Alloy remote_write, 수신기, WAL, TSDB, PromQL의 연결을 한 화면에서 봅니다.", refs: ["promarch", "promstorage", "promcli"], architectureTool: "prometheus", blocks: [{ title: "쓰기와 읽기", text: "비비디에서는 Alloy가 보낸 remote_write 샘플을 Prometheus 수신기가 받고, WAL과 TSDB 블록으로 보관합니다. PromQL은 저장된 시계열을 읽는 경로입니다.", points: ["remote_write 수신 오류와 Alloy 재시도 분리", "WAL 기록과 블록 압축을 서로 다른 운영 문제로 보기"] }] },
      { slug: "query", title: "PromQL로 오류율과 지연 읽기", lead: "rate·increase·histogram으로 운영 지표를 집계합니다.", refs: ["promql", "histogram"], blocks: [{ title: "운영 지표로 집계", text: "오류율, 요청량, p95 지연처럼 운영자가 판단할 수 있는 형태로 집계합니다. 쿼리 범위와 라벨 필터가 결과의 의미를 결정합니다.", points: ["rate는 지정한 구간의 초당 증가율을, increase는 구간 전체의 증가량을 계산합니다.", "Histogram bucket은 지연 분포의 누적 구간이며 histogram_quantile로 추정 분위수를 구합니다."] }] },
      { slug: "operations", title: "Remote write와 Cardinality 운영", lead: "값이 0인 이유가 애플리케이션 장애인지 전송·저장 문제인지 구분합니다.", refs: ["promarch", "cardinality", "promstorage", "promcli"], practice: "metrics", blocks: [{ title: "운영 체크", text: "Alloy 전송 큐, Prometheus remote_write 수신, WAL 기록, TSDB 저장 공간을 나눠 봅니다. 쿼리 결과가 비었다고 애플리케이션이 반드시 정상인 것은 아닙니다.", points: ["remote_write 수신량과 오류 확인", "고유값이 많은 라벨을 먼저 줄이기"] }] },
    ],
  },
  {
    id: "loki",
    name: "Loki",
    role: "로그 수집·라벨 인덱스·LogQL",
    summary: "라벨로 범위를 좁힌 뒤 필요한 로그 본문을 읽습니다.",
    chapters: [
      { slug: "why", title: "Loki의 로그 저장과 검색", lead: "로그 한 줄의 본문과 라벨 인덱스를 분리하는 이유를 설명합니다.", refs: ["loki", "lokilabel"], blocks: [{ title: "로그 한 줄과 스트림", text: "로그는 사건이 발생한 시각, 사건을 설명하는 본문, 그리고 서비스·환경 같은 출처 정보로 구성됩니다. Loki는 본문 전체를 색인하지 않고, 같은 라벨 조합을 가진 로그를 하나의 stream으로 묶습니다. 검색할 때 먼저 시간과 라벨로 stream을 고른 뒤 그 안의 본문을 읽습니다.", points: ["service_name=bibbidi-api와 environment=prod는 로그가 어디서 왔는지를 좁히는 라벨입니다.", "결혼 API 요청 실패 같은 사건 내용과 trace_id는 본문 또는 structured metadata에 남겨 선택된 stream 안에서 찾습니다."] }, { title: "장애 조사에서의 순서", text: "예를 들어 요청 정보를 DB에 기록하는 중 오류가 발생하면 오류 시각을 10분으로 좁히고 비비디 API stream을 선택한 뒤 본문에서 오류 문구를 필터링합니다. 찾은 로그의 trace_id로 Tempo의 호출 경로를 열면 어느 서비스와 작업에서 실패했는지 이어 볼 수 있습니다.", points: ["시간·출처를 먼저 좁히면 읽어야 할 청크가 줄어듭니다.", "로그 본문은 사건의 맥락을, trace는 서비스 간 호출 순서를 설명합니다."] }] },
      { slug: "labels", title: "Stream·Label·카디널리티", lead: "카디널리티의 뜻과 고유값이 많은 라벨이 로그 저장에 미치는 영향을 설명합니다.", refs: ["lokilabel", "lokimetadata"], blocks: [{ title: "카디널리티는 라벨 조합의 수", text: "라벨 하나의 카디널리티는 그 라벨에 등장하는 서로 다른 값의 수입니다. Loki에서 운영에 더 직접적인 값은 모든 라벨을 합친 서로 다른 조합, 즉 stream 수입니다. 같은 라벨 조합의 로그는 한 stream에 쌓입니다. service_name 3종과 environment 2종이 모두 조합되면 최대 6개 stream이며, 실제 수는 등장한 조합만큼입니다.", points: ["요청마다 다른 request_id를 라벨로 추가하면 ID가 바뀔 때마다 새 라벨 조합과 stream이 생깁니다.", "라벨 값이 각각 적더라도 여러 라벨을 결합하면 stream 수가 커질 수 있습니다."] }, { title: "stream이 너무 많으면 생기는 문제", text: "Loki는 stream마다 인덱스와 청크를 관리합니다. 로그가 많은 stream으로 분산되면 Ingester가 더 많은 활성 stream을 유지하고, 각 stream에 로그가 조금씩만 쌓여 작은 청크가 자주 저장됩니다. 같은 로그량이라도 인덱스와 청크 관리 비용이 커지고 조회할 때 열어야 할 청크도 늘 수 있습니다.", points: ["고유값이 많은 라벨은 메모리·인덱스·저장 비용과 쿼리 지연을 함께 키울 수 있습니다.", "인덱스 라벨은 로그의 안정적인 출처를 고르는 데 사용하고 요청별 ID 검색에 사용하지 않습니다."] }, { title: "ID를 저장할 위치", text: "service_name이나 안정적인 환경 값처럼 반복해서 쓰는 출처 정보는 라벨에 적합합니다. trace_id·request_id·user_id처럼 요청마다 바뀌는 값은 structured metadata 또는 로그 본문에 저장합니다. structured metadata는 각 로그에 붙지만 stream을 나누는 인덱스 라벨은 아닙니다.", points: ["trace_id를 찾을 때는 먼저 서비스와 시간으로 stream을 좁힌 뒤 해당 ID를 필터링합니다.", "라벨 후보를 정할 때 값의 종류뿐 아니라 다른 라벨과 결합한 stream 수를 함께 계산합니다."] }] },
      { slug: "architecture", title: "내부 Architecture", lead: "로그 수신·조회 경로와 인덱스·청크를 보관할 저장소를 함께 설명합니다.", refs: ["lokiarch", "lokilabel", "lokistorage"], architectureTool: "loki", blocks: [{ title: "쓰기 경로", text: "Distributor가 들어온 로그를 받아 라벨과 제한을 검사하고 적절한 Ingester로 전달합니다. Ingester는 라벨 조합별 stream에 로그를 쌓아 청크를 만들고, 청크와 이를 찾을 인덱스를 저장소에 기록합니다.", points: ["Distributor에서 429가 발생하면 수신 제한과 전송 측 재시도를 확인합니다.", "Ingester의 flush 지연은 최근 로그가 저장 청크로 넘어가는 속도에 영향을 줍니다."] }, { title: "읽기 경로", text: "Query frontend가 LogQL 조회를 나누고 Querier가 인덱스로 관련 청크를 찾습니다. 최근 데이터는 Ingester에서도 읽을 수 있습니다. 선택된 청크 안에서 본문 필터를 적용하므로 시간·라벨 범위를 좁히는 것이 중요합니다.", points: ["인덱스는 라벨로 청크를 찾고, 본문 필터는 청크를 읽은 뒤 적용됩니다.", "검색 지연은 넓은 시간 범위, 많은 stream, 저장소 응답 지연을 나눠 살펴봅니다."] }, { title: "인덱스와 로그 청크의 저장소", text: "현재 권장되는 TSDB 방식에서는 라벨 인덱스와 압축된 로그 청크를 객체 저장소에 보관합니다. TSDB는 인덱스 방식의 이름이지 S3 같은 저장 서비스의 이름이 아닙니다. AWS S3, Google Cloud Storage, Azure Blob Storage를 사용할 수 있고, 환경에 따라 IBM Cloud Object Storage·Baidu Object Storage·Alibaba OSS나 S3 호환 저장소도 선택할 수 있습니다.", points: ["로컬 파일시스템은 단일 노드 실습·개발에는 간단하지만 운영용 공유 저장소로 권장되지 않습니다.", "저장소 선택에는 보관 기간, 읽기·쓰기 성능, 접근 권한, 백업·복구와 장애 시 가용성을 함께 고려합니다."] }] },
      { slug: "query", title: "LogQL과 검색 비용", lead: "실제 LogQL 예시로 stream 선택과 본문 필터의 차이를 설명합니다.", refs: ["logql", "lokilabel"], blocks: [{ title: "먼저 stream을 선택", text: "LogQL의 중괄호는 인덱스 라벨로 stream을 고릅니다. 예를 들어 {service_name=\"bibbidi-api\", environment=\"prod\"}는 운영 환경의 API 로그만 선택합니다. 시간 범위도 함께 좁혀야 읽는 청크가 줄어듭니다.", points: ["라벨 선택자가 너무 넓으면 본문 조건이 정확해도 많은 청크를 읽어야 합니다.", "메트릭의 라벨과 로그의 라벨은 비슷해 보여도 Loki에서는 stream 분할 기준입니다."] }, { title: "그다음 본문을 필터링", text: "{service_name=\"bibbidi-api\", environment=\"prod\"} |= \"저장 실패\"는 선택된 로그 중 해당 문구가 들어간 줄만 남깁니다. trace_id가 structured metadata라면 이어서 | trace_id=\"원하는-ID\"를 적용할 수 있습니다.", points: ["단순 문자열 조건은 정규식보다 앞에 두면 뒤 단계로 넘어갈 로그가 줄어듭니다.", "로그 검색 결과의 한 줄을 열어 시각, 본문, 라벨, structured metadata를 함께 확인합니다."] }] },
      { slug: "operations", title: "429·Flush·Retention", lead: "로그가 늦게 보이거나 검색이 느릴 때 확인할 내부 상태를 정리합니다.", refs: ["lokiarch", "lokimetadata"], practice: "logging", blocks: [{ title: "운영 체크", text: "Distributor의 거부와 Ingester flush 지연을 분리해서 봅니다. 보관 정책은 저장소와 쿼리 범위에 함께 영향을 줍니다.", points: ["write ACK 이후 저장 경로 확인", "보관 기간과 비용을 함께 결정"] }] },
    ],
  },
  {
    id: "tempo",
    name: "Tempo",
    role: "트레이스 수집·블록 저장·TraceQL",
    summary: "trace_id 하나로 요청의 서비스 경계와 느린 span을 따라갑니다.",
    chapters: [
      { slug: "why", title: "트레이스가 필요한 상황", lead: "느린 요청의 시간을 어디에서 썼는지, 오류가 어느 서비스에서 시작됐는지 찾습니다.", refs: ["tempo", "otel"], blocks: [{ title: "메트릭과 로그로 위치를 알기 어려울 때", text: "API의 p95 응답 시간이 늘었다는 메트릭은 문제가 시작된 시각과 규모를 알려 주지만, 그중 한 요청이 애플리케이션 코드·DB·외부 서비스 중 어디에서 기다렸는지는 알려 주지 않습니다. 로그는 실패 메시지를 남겨도 호출 단계마다 경과 시간과 부모·자식 관계를 기록하지 않았다면 전체 지연 경로를 복원하기 어렵습니다. 이때 트레이스로 느리거나 실패한 요청 한 건의 실행 경로를 봅니다.", points: ["응답 시간은 느린데 오류 로그가 없을 때는 기다린 작업과 외부 호출을 찾는 데 유용합니다.", "여러 서비스에 오류 로그가 함께 남을 때는 처음 실패한 작업과 뒤따라 실패한 작업을 구분할 수 있습니다."] }, { title: "한 요청의 시간표로 원인 좁히기", text: "예를 들어 API 응답이 2초였던 요청의 트레이스에서 인증 40ms, DB 조회 1.6초, 외부 호출 200ms가 보인다면 DB 조회부터 조사합니다. 각 span은 작업의 시작·종료 시각과 부모 관계를 담으므로 서비스 경계를 넘어 시간을 비교할 수 있습니다. 중첩되거나 병렬로 실행된 span의 시간을 단순히 모두 더해 전체 응답 시간으로 계산하지는 않습니다.", points: ["메트릭으로 느린 시간대와 서비스를 찾고, 해당 조건의 트레이스에서 긴 span 또는 오류 span을 확인합니다.", "오류 내용이 더 필요하면 같은 trace_id가 기록된 로그를 열어 해당 작업의 메시지와 연결합니다."] }] },
      { slug: "model", title: "카카오 로그인 Trace 읽기", lead: "로그인 요청 한 건에서 외부 API와 DB가 각각 얼마나 걸렸는지 시간선으로 봅니다.", refs: ["tempo", "tempostructure", "context"], blocks: [{ title: "로그인 요청의 작업 시간표", text: "예시 요청은 `GET /api/auth/kakao/callback`이며 전체 응답 시간은 3.02초입니다. 그 안에서 `POST kauth.kakao.com/oauth/token` 외부 호출이 2.8초, 회원 정보를 조회하는 SQL이 0.15초 걸립니다. 로그인 시작·완료 로그만 볼 때는 어디서 기다렸는지 알기 어렵지만, trace의 span을 시간선으로 비교하면 먼저 조사할 구간이 보입니다.", points: ["trace_id는 이 로그인 요청 전체를 묶고, 각 span의 span_id와 부모 span 정보가 호출 관계를 나타냅니다.", "2.8초가 걸린 카카오 토큰 호출은 지연이 관찰된 위치입니다. 원인을 확정하려면 해당 요청의 로그와 외부 API 상태도 확인합니다."] }] },
      { slug: "architecture", title: "내부 Architecture", lead: "Tempo가 트레이스를 받아 최근 데이터와 저장 블록으로 나누어 보관하고 조회하는 경로를 살펴봅니다.", refs: ["tempoarch", "tempostructure", "tempostorage"], architectureTool: "tempo", blocks: [{ title: "비비디의 쓰기 경로", text: "비비디 구성은 Tempo 단일 프로세스 모드입니다. Distributor가 들어온 span을 검사해 같은 프로세스 안의 live-store로 전달하고, live-store는 최근 trace를 메모리와 로컬 WAL에 두었다가 완성된 블록을 저장소로 보냅니다. 이 모드에는 Kafka와 별도 block-builder가 없습니다. 분산 모드에서는 Kafka가 중간의 내구성 있는 전달 경로가 되고 block-builder가 블록을 만들어 객체 저장소에 씁니다.", points: ["최근 trace가 보이지 않으면 Alloy 전송, Tempo Distributor, live-store 순으로 수신을 확인합니다.", "분산 모드 설명의 Kafka·block-builder를 단일 프로세스 구성과 섞어 읽지 않습니다."] }, { title: "읽기 경로: 최근 trace와 저장 블록", text: "Grafana의 조회 요청은 query frontend로 들어갑니다. query frontend는 작업을 나누고 querier에 전달하며, querier는 최근 데이터를 live-store에서, 과거 데이터를 저장된 블록에서 찾습니다. query frontend가 결과를 모아 Grafana로 돌려줍니다. 그래서 방금 들어온 trace가 보이는 것과 어제의 trace 블록을 조회할 수 있는 것은 별도로 점검합니다.", points: ["최근 trace만 없으면 live-store 경로를 확인합니다.", "과거 trace만 없으면 블록 생성, 저장소 접근, 보관 기간을 확인합니다."] }, { title: "trace 블록의 저장소", text: "Tempo는 완성된 trace 블록을 객체 저장소에 보관할 수 있습니다. 비비디에서는 현재 설정된 백엔드와 보관 기간을 기준으로 확인합니다. 저장소 종류를 바꾸면 접근 권한, 읽기 지연, 복구 방식을 함께 점검합니다.", points: ["객체 저장소는 여러 Tempo 구성 요소가 블록을 읽고 장기간 보관하는 데 쓰입니다.", "설정 파일의 백엔드와 실제 저장 위치가 일치하는지 확인합니다."] }] },
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
      { slug: "why", title: "Grafana의 조회와 시각화 역할", lead: "저장소의 데이터를 조회해 조사와 운영 화면으로 만듭니다.", refs: ["grafana", "explore"], blocks: [{ title: "저장소와 화면의 역할", text: "Prometheus·Loki·Tempo가 데이터를 보관하고 Grafana는 각 저장소의 쿼리 언어로 결과를 읽어 보여 줍니다.", points: ["Data source는 저장소 연결을 정의하고 Panel은 조회 결과를 그래프·표·로그 목록으로 표시합니다.", "Explore에서는 시간·서비스 조건을 맞춰 메트릭, 로그, 트레이스를 오가며 원인 후보를 좁힙니다."] }] },
      { slug: "explore", title: "Explore에서 세 신호 잇기", lead: "메트릭 시각을 로그와 trace_id 조사로 이어 갑니다.", refs: ["explore", "promql", "logql", "traceql"], blocks: [{ title: "조사 순서", text: "메트릭에서 이상 시각을 찾고, 같은 시간대의 로그에서 trace_id를 찾은 뒤 Tempo에서 요청 경로를 확인합니다.", points: ["시간 범위를 맞추기", "쿼리 언어가 바뀌는 경계 기록"] }] },
      { slug: "architecture", title: "Grafana 내부 조회 흐름", lead: "데이터 소스에서 패널까지의 구성 요소와 별도 알림 평가 경로를 설명합니다.", refs: ["grafana", "explore"], architectureTool: "grafana", blocks: [{ title: "데이터 소스와 플러그인", text: "Data source는 Prometheus·Loki·Tempo 같은 저장소의 연결 설정입니다. 각 데이터 소스 플러그인은 해당 저장소의 쿼리 방식과 응답을 Grafana가 사용할 수 있게 연결합니다. Grafana가 로그나 메트릭의 원본 저장소가 되는 것은 아닙니다.", points: ["Prometheus는 PromQL, Loki는 LogQL, Tempo는 TraceQL 또는 trace 검색으로 각각 조회합니다.", "연결 상태가 실패하면 주소·인증·네트워크를, 쿼리만 실패하면 쿼리 문법과 권한을 확인합니다."] }, { title: "쿼리·변환·패널", text: "패널의 쿼리가 데이터 소스에 요청을 보내 결과를 받습니다. Transform은 받은 결과의 필드 결합, 계산, 정렬 등 화면에 필요한 형태를 만듭니다. Panel은 그 결과를 그래프·표·로그 목록 등으로 표시하고 대시보드는 여러 패널의 시간 범위와 변수를 함께 관리합니다.", points: ["Transform은 화면 표시를 위한 결과 가공 단계이며 원본 저장소의 데이터를 바꾸지 않습니다.", "패널 값이 이상하면 시간 범위 → 원본 쿼리 결과 → 변환 → 시각화 설정 순서로 확인합니다."] }, { title: "알림 규칙의 별도 경로", text: "Alert rule은 정해진 주기로 데이터 소스를 조회하고 조건을 평가합니다. 평가 결과가 경고 상태가 되면 Notification policy가 Contact point로 전달합니다. 패널을 보고 있는 사용자가 없어도 평가와 통지는 계속됩니다.", points: ["패널의 시간 범위와 알림 규칙의 평가 범위는 별도로 설정됩니다.", "알림 전달 문제는 규칙 평가 결과, 라우팅 정책, 연락처 순서로 나눠 확인합니다."] }] },
      { slug: "dashboards", title: "패널과 대시보드", lead: "운영자가 다시 사용할 질문을 패널로 고정하는 법을 정리합니다.", refs: ["grafana", "explore"], blocks: [{ title: "좋은 화면의 조건", text: "패널에는 질문, 시간 범위, 필터, 단위를 함께 적습니다. 결과만 크게 보여 주면 다음 행동을 고르기 어렵습니다.", points: ["서비스·환경 변수의 범위 제한", "로그·메트릭·트레이스 링크를 함께 제공"] }] },
      { slug: "alerting", title: "Alerting과 연락처", lead: "화면을 보는 것과 당번에게 알리는 규칙을 분리합니다.", refs: ["alert", "contact"], practice: "alerting", blocks: [{ title: "알림 운영", text: "조건·대기 시간·No data 처리·연락처·에스컬레이션을 함께 정해야 알림이 실제 대응으로 이어집니다.", points: ["Pending과 Alerting 구분", "알림 내용에 서비스·환경·Runbook 링크 포함"] }] },
      { slug: "oauth", title: "OAuth로 Grafana 로그인 연결", lead: "Google·GitHub·회사 계정 제공자로 로그인시키고 Grafana 권한을 정합니다.", refs: ["grafanaoauth", "grafanaroles"], blocks: [
        { title: "로그인을 맡기는 흐름", text: "Grafana는 자체 계정 외에도 OAuth 제공자나 OpenID Connect 제공자와 로그인 연동을 지원합니다. 사용자는 Grafana에서 로그인 버튼을 누르고 제공자에서 인증한 뒤 Grafana로 돌아옵니다. 제공자는 사용자를 확인하고, Grafana는 전달받은 사용자 정보와 설정을 바탕으로 Grafana 계정과 권한을 연결합니다. OAuth는 권한 위임 프로토콜이고, 사용자 신원 정보까지 표준화하는 OpenID Connect가 로그인에 함께 쓰이는 경우가 많습니다.", points: ["OAuth 제공자는 로그인한 사용자 정보를 Grafana에 전달합니다.", "OAuth 로그인은 Grafana 데이터 소스 권한을 자동으로 정하지 않습니다. Grafana의 조직·역할 권한은 별도로 구성합니다."] },
        { title: "연동할 때 맞춰야 할 설정", text: "외부 제공자에 Grafana 주소와 콜백 URL을 등록하고, Grafana에는 제공자가 발급한 client ID와 client secret, 인증·토큰·사용자 정보 주소를 설정합니다. Generic OAuth의 콜백 경로는 보통 `/login/generic_oauth`이며, 브라우저가 접속하는 공개 주소와 일치해야 합니다. 프록시 뒤에서 운영하면 Grafana의 외부 주소 설정도 확인합니다.", points: ["client secret은 브라우저 코드나 저장소에 올리지 말고 서버 환경 변수나 비밀 저장소로 관리합니다.", "로그인 이후 조직 역할을 자동으로 정하려면 제공자의 그룹·역할 정보를 Grafana 역할로 매핑합니다.", "접근 허용 그룹, 계정 자동 생성, 기존 비밀번호 로그인 유지 여부를 팀 정책에 맞게 정합니다."] },
        { title: "로그인 장애를 나눠 찾기", text: "로그인이 되지 않으면 Grafana 주소와 콜백 URL, client ID·secret, 제공자 쪽 허용 사용자·redirect 설정, Grafana가 받은 사용자 정보와 역할 매핑을 차례로 확인합니다. 로그인은 되지만 권한이 없으면 인증은 통과한 것이므로 조직 역할과 폴더·대시보드 권한을 확인합니다.", points: ["콜백 URL 불일치는 제공자가 Grafana로 돌아오는 단계에서 실패합니다.", "사용자 역할 매핑 누락은 로그인 성공 뒤 접근 권한 문제로 나타날 수 있습니다."] },
      ] },
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

export function findToolSeries(id, chapterSlug) {
  const series = toolCurriculum.find((item) => item.id === id);
  if (!series) return null;
  const index = series.chapters.findIndex((item) => item.slug === chapterSlug);
  if (index < 0) return null;
  return { series, chapter: series.chapters[index], index };
}
