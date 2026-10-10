// Simplified teaching diagrams for /tools. They describe the data path used in
// the lesson; official links support the concepts but are not image credits.
const diagram = (title, caption, source, steps, layout = "flow") => ({
  kind: "diagram", title, caption, source, publisher: "관련 공식 문서", steps, layout,
});

const otelSource = "https://opentelemetry.io/docs/what-is-opentelemetry/";
const collectorSource = "https://opentelemetry.io/docs/collector/";
const alloySource = "https://grafana.com/docs/alloy/latest/";
const prometheusSource = "https://prometheus.io/docs/introduction/overview/";
const lokiSource = "https://grafana.com/docs/loki/latest/get-started/architecture/";
const tempoSource = "https://grafana.com/docs/tempo/latest/introduction/architecture/";
const grafanaSource = "https://grafana.com/docs/grafana/latest/";

export const toolChapterDiagrams = {
  otel: {
    signals: diagram("한 요청에서 세 신호가 생기는 자리", "세 신호는 서로 다른 질문에 답하며, 같은 요청의 trace_id로 로그와 트레이스를 연결할 수 있습니다.", otelSource, [
      ["상담 신청 요청", "앱에서 한 요청을 처리합니다."],
      ["메트릭", "요청 수와 실패율의 추세"],
      ["로그", "오류 시각과 원인 메시지"],
      ["트레이스", "요청 안의 작업 순서와 시간"],
    ], "branches"),
    collector: diagram("계측에서 저장소까지", "앱이 만든 데이터는 수집기를 거쳐 저장소로 갑니다. Collector는 가운데의 실행 프로그램입니다.", collectorSource, [
      ["애플리케이션", "OpenTelemetry로 신호 생성"],
      ["OTLP", "신호를 전달하는 규약"],
      ["Collector", "수신 → 처리 → 전송"],
      ["저장소", "나중에 조회할 데이터 보관"],
    ]),
  },
  alloy: {
    components: diagram("Alloy 컴포넌트의 데이터 경로", "화살표는 설정에 연결된 데이터의 이동 방향입니다. 인증 정보 같은 설정 참조는 별도 의존 관계입니다.", alloySource, [
      ["Receiver", "앱의 OTLP 데이터를 받음"],
      ["Processor", "필터링하거나 배치로 묶음"],
      ["Exporter", "목적지로 전송"],
      ["Tempo", "트레이스 저장"],
    ]),
    architecture: {
      ...diagram("설정 코드로 읽는 Alloy 트레이스 경로", "공식 Alloy 예제에서 가져온 컴포넌트 형식으로, 각 output 참조가 다음 컴포넌트의 input을 가리킵니다.", "https://grafana.com/docs/alloy/latest/reference/components/otelcol/otelcol.receiver.otlp/", [
        ["앱", "OTLP로 span 전송"], ["receiver.otlp · app", "traces 입력"], ["processor.batch · traces", "span을 묶음"], ["exporter.otlp · tempo", "tempo:4317로 전송"],
      ], "config-flow"),
      code: `otelcol.receiver.otlp "app" {
  grpc {}
  output {
    traces = [otelcol.processor.batch.traces.input]
  }
}

otelcol.processor.batch "traces" {
  output {
    traces = [otelcol.exporter.otlp.tempo.input]
  }
}

otelcol.exporter.otlp "tempo" {
  client {
    endpoint = "tempo:4317"
  }
}`,
    },
    practice: {
      ...diagram("설정으로 연결하는 세 경로", "각 경로의 화살표는 Alloy 설정의 forward_to 또는 output 참조로 연결합니다. 저장소에서 새 데이터가 조회되어야 전송 완료입니다.", "https://grafana.com/docs/alloy/latest/tutorials/send-metrics-to-prometheus/", [], "panels"),
      panels: [
        { title: "메트릭", steps: [["prometheus.scrape", "앱 /actuator/prometheus 읽기"], ["prometheus.remote_write", "Prometheus /api/v1/write로 전송"], ["Prometheus 쿼리", "up 또는 앱 메트릭 확인"]] },
        { title: "로그", steps: [["loki.source.file", "앱 로그 파일 읽기"], ["loki.write", "Loki /loki/api/v1/push로 전송"], ["Loki 쿼리", "{job=\"app\"}에서 새 로그 확인"]] },
        { title: "트레이스", steps: [["otelcol.receiver.otlp", "앱의 OTLP span 수신"], ["otelcol.processor.batch", "span을 묶어서 전달"], ["otelcol.exporter.otlphttp", "Tempo /v1/traces로 전송"], ["Tempo 조회", "trace_id로 요청 찾기"]] },
      ],
    },
  },
  prometheus: {
    why: diagram("실패 건수를 실패율로 바꾸기", "실패 8건은 전체 요청이 100건인지 10만 건인지에 따라 의미가 달라집니다.", prometheusSource, [
      ["전체 요청", "10분 동안 100건"], ["실패 요청", "같은 10분 동안 8건"], ["실패율", "8 ÷ 100 = 8%"], ["시간 비교", "이전 구간과 비교"],
    ]),
    architecture: diagram("비비디의 메트릭 쓰기와 읽기", "비비디에서는 Alloy가 remote_write로 보냅니다. 일반적인 Prometheus scrape 구성과 입력 방향이 다릅니다.", prometheusSource, [
      ["앱 · Alloy", "메트릭을 모아 전송"], ["Remote write 수신", "Prometheus 입력"], ["WAL · TSDB", "최근 기록과 시계열 저장"], ["PromQL · Grafana", "저장된 값 조회"],
    ]),
  },
  loki: {
    labels: diagram("라벨로 스트림을 고르고 본문을 읽기", "trace_id를 라벨에 넣으면 요청마다 스트림이 늘어납니다. 요청별 ID는 본문이나 구조화 메타데이터에서 찾습니다.", lokiSource, [
      ["서비스 · 환경", "값이 안정적인 라벨"], ["스트림", "같은 라벨 조합의 로그"], ["청크", "로그 본문을 묶어 저장"], ["본문 검색", "오류 문구와 trace_id 확인"],
    ]),
    architecture: diagram("Loki의 쓰기 경로와 읽기 경로", "위는 로그를 넣는 순서, 아래는 LogQL로 찾는 순서입니다. 조회 때 시간과 라벨을 먼저 좁힙니다.", lokiSource, [
      ["쓰기: Alloy", "로그 전송"], ["Distributor", "수신·제한 검사"], ["Ingester", "스트림별 청크 생성"], ["저장소", "인덱스와 청크 보관"],
      ["읽기: Grafana", "LogQL 요청"], ["Query frontend", "조회 요청 분할"], ["Querier", "관련 청크 조회"], ["결과", "본문 필터 적용"],
    ], "two-lanes"),
  },
  tempo: {
    architecture: {
      kind: "diagram", title: "Tempo 내부 구조: 쓰기·저장·조회", source: tempoSource,
      publisher: "관련 공식 문서", layout: "panels",
      caption: "비비디 문서의 Tempo 단일 프로세스 구성을 기준으로 그렸습니다. 분산 모드는 Kafka와 Block-builder를 추가해 쓰기 경로를 나눕니다.",
      panels: [
        { title: "쓰기와 장기 보관 · 비비디 단일 프로세스", steps: [
          ["Alloy", "OTLP로 span 전송"], ["Distributor", "수신·검사 후 내부 전달"], ["Live-store", "최근 trace를 메모리와 로컬 WAL에 보관"], ["객체 저장소", "완성된 블록을 장기 보관"],
        ] },
        { title: "조회 · 최근 데이터와 과거 블록을 함께 확인", steps: [
          ["Grafana", "trace ID 또는 TraceQL로 조회"], ["Query frontend", "요청을 나누고 결과를 모음"], ["Querier", "조회 작업 실행"], ["Live-store + 객체 저장소", "최근 trace와 과거 블록 검색"],
        ] },
      ],
    },
    model: {
      kind: "diagram", title: "카카오 로그인 콜백 Trace 예시", source: "https://grafana.com/docs/tempo/latest/visualize-traces/",
      publisher: "관련 공식 문서", layout: "trace-timeline",
      caption: "로그의 ‘카카오 로그인이 3초 걸려요’ 사례를 Grafana trace 상세 화면과 비슷한 형태로 재구성했습니다. 콜백 요청 안에서 카카오 토큰 API가 2.8초 기다리므로, 이 외부 호출부터 로그와 카카오 응답을 확인합니다. 화면은 실제 운영 캡처가 아니라 설명용 예시입니다.",
      traceId: "같은 로그인 요청", durationMs: 3020,
      spans: [
        { name: "GET /api/auth/kakao/callback", service: "bibbidi-api", kind: "server", parent: "요청 전체", startMs: 0, durationMs: 3020, level: 0 },
        { name: "카카오에 로그인 토큰 요청", endpoint: "POST kauth.kakao.com/oauth/token", service: "bibbidi-api → 카카오", kind: "외부 HTTP 호출", parent: "GET /api/auth/kakao/callback", startMs: 0, durationMs: 2800, level: 1, slow: true },
        { name: "회원 정보 조회", endpoint: "SELECT member …", service: "bibbidi-api → 데이터베이스", kind: "SQL 호출", parent: "GET /api/auth/kakao/callback", startMs: 2850, durationMs: 150, level: 1 },
      ],
    },
    query: diagram("TraceQL 조사 순서", "검색 화면의 버튼 위치보다 조건의 의미를 먼저 봅니다. 서비스와 시간으로 좁힌 뒤 span을 엽니다.", "https://grafana.com/docs/grafana/latest/datasources/tempo/query-editor/traceql-search/", [
      ["시간 범위", "오류가 난 구간"], ["서비스 · 상태", "후보 trace 좁히기"], ["trace 열기", "포함된 span 확인"], ["느린 작업", "duration과 로그 연결"],
    ]),
    operations: diagram("trace_id가 있는데 trace가 없을 때", "로그의 ID가 남아도 샘플링되거나 전송에 실패한 트레이스는 조회할 수 없습니다.", tempoSource, [
      ["앱", "span 생성·샘플링"], ["Alloy", "수신·전송 오류"], ["Tempo", "수신·보관 기간"], ["Grafana", "시간 범위·ID 확인"],
    ]),
  },
  grafana: {
    why: diagram("Grafana가 데이터를 보여 주는 방법", "Grafana는 원본 데이터를 보관하는 저장소가 아니라 데이터 소스를 조회하는 화면입니다.", grafanaSource, [
      ["저장소", "Prometheus · Loki · Tempo"], ["데이터 소스", "연결 주소와 인증"], ["쿼리", "각 저장소의 언어로 조회"], ["패널", "그래프 · 로그 · trace 표시"],
    ]),
    explore: diagram("한 장애를 세 신호로 조사", "같은 시간·서비스·환경을 유지하면서 데이터 소스를 바꿉니다.", "https://grafana.com/docs/grafana/latest/explore/", [
      ["Prometheus", "실패율이 오른 시각"], ["Loki", "오류 로그와 trace_id"], ["Tempo", "해당 요청의 느린 span"],
    ]),
    architecture: diagram("Grafana의 조회와 알림은 다른 경로", "패널은 사용자가 조회할 때 보이고, 알림 규칙은 정해진 주기로 별도 평가됩니다.", grafanaSource, [
      ["데이터 소스", "저장소 연결"], ["대시보드 패널", "조회 → 변환 → 표시"], ["알림 규칙", "별도 주기·조건 평가"],
    ], "branches"),
    dashboards: diagram("좋은 패널에 필요한 네 가지", "숫자 하나만으로는 장애를 판단하기 어렵습니다. 패널이 답할 질문을 먼저 정합니다.", "https://grafana.com/docs/grafana/latest/visualizations/dashboards/", [
      ["질문", "무엇이 이상한가?"], ["시간 · 필터", "언제, 어느 서비스인가?"], ["값 · 단위", "건수인가, 비율인가?"], ["다음 조사", "로그 · trace 링크"],
    ]),
    alerting: diagram("알림이 담당자에게 도착하는 경로", "규칙 평가, 전달 경로, 연락처를 각각 확인해야 합니다. 규칙에서 연락처를 직접 지정할 수도 있습니다.", "https://grafana.com/docs/grafana/latest/alerting/fundamentals/notifications/", [
      ["알림 규칙", "주기적으로 조건 평가"], ["Pending · Alerting", "대기 시간과 경고 상태"], ["전달 정책", "정책을 쓸 때 경고 분류"], ["연락처", "Discord 등으로 알림"],
    ]),
    oauth: diagram("OAuth 제공자로 Grafana 로그인", "제공자는 사용자를 인증하고, Grafana는 받은 정보를 계정과 Grafana 역할에 연결합니다.", "https://grafana.com/docs/grafana/latest/setup-grafana/configure-access/configure-authentication/generic-oauth/", [
      ["사용자", "Grafana에서 로그인 시작"], ["OAuth 제공자", "계정 확인·인증"], ["Grafana 콜백", "사용자 정보 전달"], ["Grafana 권한", "조직 역할과 접근 범위 적용"],
    ]),
  },
};

export function diagramForChapter(toolId, chapterSlug) {
  return toolChapterDiagrams[toolId]?.[chapterSlug] || null;
}
