// Keep publisher URLs and source pages together for every external image.
const otelCollector = {
  src: "https://opentelemetry.io/docs/collector/img/otel-collector.svg",
  source: "https://opentelemetry.io/docs/collector/",
  publisher: "OpenTelemetry",
  alt: "OpenTelemetry Collector의 수신, 처리, 전송 구성도",
  caption: "Collector는 계측된 신호와 저장소 사이에서 수신·처리·전송을 맡습니다.",
};

const alloyPipeline = {
  src: "https://grafana.github.io/alloy-workshop/assets/images/traces_graph-d2e73b7a0125163d2d3d9450ab4a1b8f.png",
  source: "https://grafana.github.io/alloy-workshop/lab1/push_based_telemetry/",
  publisher: "Grafana Labs",
  alt: "Grafana Alloy 컴포넌트 그래프: OTLP 수신기, 배치 처리기, 전송기와 인증 정보의 연결",
  caption: "Grafana Labs 실습의 실제 Alloy 그래프입니다. 이 예시는 트레이스 경로이며 메트릭·로그 경로는 별도로 구성합니다.",
};

const prometheusArchitecture = {
  src: "https://prometheus.io/assets/docs/architecture.svg",
  source: "https://prometheus.io/docs/introduction/overview/",
  publisher: "Prometheus",
  alt: "Prometheus 서버, exporter, Alertmanager, 시각화 도구의 공식 구성도",
  caption: "Prometheus 공식 개요의 일반적인 수집 구조입니다. 비비디의 Alloy remote_write 입력 경로는 그림의 scrape 방식과 다릅니다.",
};

const lokiArchitecture = {
  src: "https://grafana.com/docs/loki/latest/get-started/loki_architecture_components.svg",
  source: "https://grafana.com/docs/loki/latest/get-started/architecture/",
  publisher: "Grafana Labs",
  alt: "Loki의 쓰기 경로와 읽기 경로를 나눈 공식 구성 요소 그림",
  caption: "로그 수신·저장 경로와 LogQL 조회 경로를 분리해서 보여 줍니다.",
};

const lokiChunks = {
  src: "https://grafana.com/docs/loki/latest/get-started/chunks_diagram.png",
  source: "https://grafana.com/docs/loki/latest/get-started/architecture/",
  publisher: "Grafana Labs",
  alt: "Loki의 라벨 인덱스가 로그 청크를 가리키는 방식을 보여 주는 공식 그림",
  caption: "라벨 인덱스는 로그 본문 전체 대신 관련 청크를 찾는 데 사용됩니다.",
};

const tempoArchitecture = {
  src: "https://grafana.com/media/docs/tempo/tempo_arch_3.0.png",
  source: "https://grafana.com/docs/tempo/latest/introduction/architecture/",
  publisher: "Grafana Labs",
  alt: "Tempo 3의 trace 수신, 저장, 조회 경로를 보여 주는 공식 구성도",
  caption: "Tempo 3의 분산 배치 예시입니다. 단일 프로세스 배치에는 해당하지 않을 수 있습니다.",
};

const tempoSearch = {
  src: "https://grafana.com/static/img/docs/grafana-cloud/trace_search.png",
  source: "https://grafana.com/docs/tempo/latest/visualize-traces/",
  publisher: "Grafana Labs",
  alt: "Grafana에서 Tempo trace를 조건으로 검색하는 실제 화면",
  caption: "Trace 검색에서 시간 범위와 서비스 조건으로 조사 대상을 좁힙니다.",
};

const tempoQueryTypes = {
  src: "https://grafana.com/media/docs/grafana/data-sources/tempo/query-editor/tempo-ds-query-types.png",
  source: "https://grafana.com/docs/tempo/latest/traceql/query-editor/",
  publisher: "Grafana Labs",
  alt: "Grafana Tempo 데이터 소스의 검색과 TraceQL 쿼리 유형 화면",
  caption: "Search와 TraceQL은 trace를 서로 다른 방식으로 찾는 입력 화면입니다.",
};

const grafanaDashboard = {
  src: "https://grafana.com/media/docs/grafana/dashboards/screenshot-dashboard-image-map-v13.1.png",
  source: "https://grafana.com/docs/grafana/latest/visualizations/dashboards/use-dashboards/",
  publisher: "Grafana Labs",
  alt: "Grafana 대시보드의 패널, 변수, 시간 범위를 표시한 공식 제품 화면",
  caption: "Grafana 공식 문서의 대시보드 화면입니다. 설치된 버전에 따라 메뉴 위치는 다를 수 있습니다.",
};

const grafanaDataFlow = {
  src: "https://a-us.storyblok.com/f/1022730/4746094e20/multiple-data-sources_grafana-data-flow-diagram.png/m/filters:format(webp):quality(90)/",
  source: "https://grafana.com/blog/how-to-work-with-multiple-data-sources-in-grafana-dashboards-best-practices-to-get-started/",
  publisher: "Grafana Labs",
  alt: "Grafana 데이터 흐름: 데이터 소스, 플러그인, 쿼리, 변환, 패널로 이어지는 구성도",
  caption: "Grafana Labs의 조회 흐름 그림입니다. 데이터 소스의 결과가 쿼리와 변환을 거쳐 패널에 표시됩니다. 알림 규칙은 별도 평가 경로를 사용합니다.",
};

const grafanaNotificationRouting = {
  src: "https://a-us.storyblok.com/f/1022730/1999x884/da190df110/notification-configuration-menu.png/m/filters:format(webp):quality(90)/",
  source: "https://grafana.com/blog/grafana-alerting-scale-alert-routing-without-scaling-complexity-using-multiple-notification-policies/",
  publisher: "Grafana Labs",
  alt: "Grafana Alerting의 Contact points와 Notification policies 탭 및 연락처 전달 정책 목록",
  caption: "실제 알림 설정 화면입니다. Contact points가 수신 대상을 정하고 Notification policies가 경고를 해당 연락처로 전달합니다.",
};

export const toolGuideMedia = alloyPipeline;

export const toolChapterMedia = {
  otel: { collector: otelCollector, signals: otelCollector },
  alloy: { components: alloyPipeline, architecture: alloyPipeline, practice: alloyPipeline },
  prometheus: { why: prometheusArchitecture, architecture: prometheusArchitecture },
  loki: { labels: lokiChunks, architecture: lokiArchitecture },
  tempo: { architecture: tempoArchitecture, query: tempoQueryTypes, operations: tempoSearch },
  grafana: {
    why: grafanaDashboard,
    explore: tempoSearch,
    architecture: grafanaDataFlow,
    dashboards: grafanaDashboard,
    alerting: grafanaNotificationRouting,
  },
};

export function mediaForChapter(toolId, chapterSlug) {
  return toolChapterMedia[toolId]?.[chapterSlug] || null;
}
