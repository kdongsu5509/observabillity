import { supplementalSections } from "./supplemental.js";

export const sources = {
  logging: ["SLF4J 사용자 안내", "https://www.slf4j.org/manual.html"],
  loggingsecurity: [
    "OWASP 로깅 지침",
    "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html",
  ],
  logback: ["Logback 매뉴얼", "https://logback.qos.ch/manual/"],
  springlog: [
    "Spring Boot 로깅",
    "https://docs.spring.io/spring-boot/reference/features/logging.html",
  ],
  actuator: [
    "Spring Boot Actuator",
    "https://docs.spring.io/spring-boot/reference/actuator/index.html",
  ],
  metrics: [
    "Spring Boot 메트릭",
    "https://docs.spring.io/spring-boot/reference/actuator/metrics.html",
  ],
  micrometer: [
    "Micrometer 개념",
    "https://docs.micrometer.io/micrometer/reference/concepts.html",
  ],
  cardinality: [
    "Micrometer 고유값이 많은 태그",
    "https://docs.micrometer.io/micrometer/reference/concepts/high-cardinality-tags-detector.html",
  ],
  mdc: ["SLF4J MDC", "https://www.slf4j.org/api/org/slf4j/MDC.html"],
  tracing: [
    "Spring Boot 트레이싱",
    "https://docs.spring.io/spring-boot/reference/actuator/tracing.html",
  ],
  context: ["W3C Trace Context", "https://www.w3.org/TR/trace-context/"],
  otel: [
    "OpenTelemetry 개요",
    "https://opentelemetry.io/docs/what-is-opentelemetry/",
  ],
  otlp: ["OTLP 명세", "https://opentelemetry.io/docs/specs/otlp/"],
  alloy: [
    "Grafana Alloy 소개",
    "https://grafana.com/docs/alloy/latest/introduction/",
  ],
  alloypipe: [
    "Alloy 파이프라인",
    "https://grafana.com/docs/alloy/latest/get-started/components/build-pipelines/",
  ],
  prom: [
    "Prometheus 개요",
    "https://prometheus.io/docs/introduction/overview/",
  ],
  promql: [
    "PromQL 기초",
    "https://prometheus.io/docs/prometheus/latest/querying/basics/",
  ],
  histogram: [
    "Prometheus 히스토그램",
    "https://prometheus.io/docs/practices/histograms/",
  ],
  loki: [
    "Loki 개요",
    "https://grafana.com/docs/loki/latest/get-started/overview/",
  ],
  lokilabel: [
    "Loki 라벨 권고",
    "https://grafana.com/docs/loki/latest/get-started/labels/bp-labels/",
  ],
  lokimetadata: [
    "Loki 구조화 메타데이터",
    "https://grafana.com/docs/loki/latest/get-started/labels/structured-metadata/",
  ],
  logql: ["LogQL", "https://grafana.com/docs/loki/latest/query/"],
  tempo: ["Tempo 개요", "https://grafana.com/docs/tempo/latest/introduction/"],
  grafana: [
    "Grafana 데이터 소스",
    "https://grafana.com/docs/grafana/latest/datasources/",
  ],
  explore: [
    "Grafana Explore",
    "https://grafana.com/docs/grafana/latest/explore/",
  ],
  alert: [
    "Grafana Alerting",
    "https://grafana.com/docs/grafana/latest/alerting/fundamentals/",
  ],
  contact: [
    "Grafana 연락처",
    "https://grafana.com/docs/grafana/latest/alerting/fundamentals/notifications/contact-points/",
  ],
  irm: [
    "Grafana IRM 에스컬레이션",
    "https://grafana.com/docs/grafana-cloud/observe-and-act/respond-to-incidents/escalation-and-routing/",
  ],
  cloudwatch: [
    "CloudWatch 경보",
    "https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/AlarmThatSendsEmail.html",
  ],
  k6: [
    "k6 테스트 종류",
    "https://grafana.com/docs/k6/latest/testing-guides/test-types/",
  ],
  k6result: [
    "k6 결과 읽기",
    "https://grafana.com/docs/k6/latest/using-k6/metrics/",
  ],
  sre: [
    "Google SRE: 모니터링",
    "https://sre.google/sre-book/monitoring-distributed-systems/",
  ],
  elastic: [
    "Elasticsearch 전체 텍스트 검색",
    "https://www.elastic.co/docs/solutions/search/full-text",
  ],
  jaeger: [
    "Jaeger 아키텍처",
    "https://www.jaegertracing.io/docs/latest/architecture/",
  ],
  collector: [
    "OpenTelemetry Collector",
    "https://opentelemetry.io/docs/collector/",
  ],
  alloywhy: [
    "Alloy를 쓰는 이유",
    "https://grafana.com/docs/alloy/latest/introduction/why-alloy/",
  ],
  alloytelemetry: [
    "Alloy 데이터 흐름",
    "https://grafana.com/docs/alloy/latest/introduction/telemetry/",
  ],
  promarch: [
    "Prometheus 아키텍처",
    "https://prometheus.io/docs/introduction/overview/",
  ],
  lokiarch: [
    "Loki 아키텍처",
    "https://grafana.com/docs/loki/latest/get-started/architecture/",
  ],
  tempoarch: [
    "Tempo 아키텍처",
    "https://grafana.com/docs/tempo/latest/introduction/architecture/",
  ],
  fluentbit: ["Fluent Bit 매뉴얼", "https://docs.fluentbit.io/manual"],
  datadog: ["Datadog APM", "https://docs.datadoghq.com/tracing/"],
  datadogmetrics: ["Datadog Metrics", "https://docs.datadoghq.com/metrics/"],
  datadoglogs: ["Datadog Logs", "https://docs.datadoghq.com/logs/"],
  newrelic: ["New Relic APM", "https://docs.newrelic.com/docs/apm/"],
  kibana: [
    "Kibana Discover",
    "https://www.elastic.co/docs/explore-analyze/discover/",
  ],
  mimir: ["Grafana Mimir 개요", "https://grafana.com/docs/mimir/latest/"],
  cloudmetrics: [
    "Grafana Cloud Metrics",
    "https://grafana.com/docs/grafana-cloud/send-data/metrics/",
  ],
  rfc5424: [
    "RFC 5424 Syslog 프로토콜",
    "https://www.rfc-editor.org/rfc/rfc5424",
  ],
  log4j: ["Apache Log4j", "https://logging.apache.org/log4j/2.x/"],
  twelvefactor: ["The Twelve-Factor App: 로그", "https://12factor.net/logs"],
  dockerlogs: [
    "Docker 컨테이너 로그",
    "https://docs.docker.com/engine/logging/",
  ],
  rrdtool: ["RRDtool", "https://oss.oetiker.ch/rrdtool/"],
  graphite: [
    "Graphite 개요",
    "https://graphite.readthedocs.io/en/latest/overview.html",
  ],
  statsd: ["StatsD", "https://github.com/statsd/statsd"],
  dapper: [
    "Google Dapper 논문",
    "https://research.google/pubs/dapper-a-large-scale-distributed-systems-tracing-infrastructure/",
  ],
  zipkin: ["Zipkin", "https://zipkin.io/"],
  b3: ["B3 전파 헤더", "https://github.com/openzipkin/b3-propagation"],
  sleuth: [
    "Spring Cloud Sleuth",
    "https://github.com/spring-cloud/spring-cloud-sleuth",
  ],
  agent: ["Grafana Agent", "https://grafana.com/docs/agent/latest/"],
  alertmanager: [
    "Prometheus Alertmanager",
    "https://prometheus.io/docs/alerting/latest/alertmanager/",
  ],
  oncall: ["Google SRE: 온콜", "https://sre.google/sre-book/being-on-call/"],
  postmortem: [
    "Google SRE: 회고 문화",
    "https://sre.google/sre-book/postmortem-culture/",
  ],
  ab: ["Apache ab", "https://httpd.apache.org/docs/2.4/programs/ab.html"],
  jmeter: ["Apache JMeter", "https://jmeter.apache.org/"],
  springstructured: [
    "Spring Boot 3.4 구조화 로그",
    "https://spring.io/blog/2024/08/23/structured-logging-in-spring-boot-3-4",
  ],
  ecs: ["Elastic Common Schema", "https://www.elastic.co/docs/reference/ecs"],
  gelf: [
    "Graylog GELF",
    "https://go2docs.graylog.org/current/getting_in_log_data/gelf.html",
  ],
  k6thresholds: [
    "k6 Thresholds",
    "https://grafana.com/docs/k6/latest/using-k6/thresholds/",
  ],

  springloghowto: [
    "Spring Boot How-to: 로깅",
    "https://docs.spring.io/spring-boot/how-to/logging.html",
  ],
  logbackarch: [
    "Logback 구조",
    "https://logback.qos.ch/manual/architecture.html",
  ],

  meters: [
    "Micrometer Meters",
    "https://docs.micrometer.io/micrometer/reference/concepts/meters.html",
  ],
  micronaming: [
    "Micrometer 이름 규칙",
    "https://docs.micrometer.io/micrometer/reference/concepts/naming.html",
  ],
  endpoints: [
    "Actuator 엔드포인트",
    "https://docs.spring.io/spring-boot/reference/actuator/endpoints.html",
  ],
  actuatorprom: [
    "Actuator Prometheus 엔드포인트",
    "https://docs.spring.io/spring-boot/api/rest/actuator/prometheus.html",
  ],

  observability: [
    "Spring Boot Observability",
    "https://docs.spring.io/spring-boot/reference/actuator/observability.html",
  ],

  semconv: [
    "OpenTelemetry 시맨틱 컨벤션",
    "https://opentelemetry.io/docs/specs/semconv/",
  ],
  otlpreceiver: [
    "Alloy otelcol.receiver.otlp",
    "https://grafana.com/docs/alloy/latest/reference/components/otelcol/otelcol.receiver.otlp/",
  ],
  alloylgtm: [
    "Alloy: OTLP → LGTM",
    "https://grafana.com/docs/alloy/latest/collect/opentelemetry-to-lgtm-stack/",
  ],

  alloyhow: [
    "How Alloy works",
    "https://grafana.com/docs/alloy/latest/introduction/how-alloy-works/",
  ],
  alloycomponents: [
    "Alloy 컴포넌트 목록",
    "https://grafana.com/docs/alloy/latest/reference/components/",
  ],
  alloycontroller: [
    "Alloy 컴포넌트 컨트롤러",
    "https://grafana.com/docs/alloy/latest/get-started/components/component-controller/",
  ],
  alloysyntax: [
    "Alloy 문법",
    "https://grafana.com/docs/alloy/latest/get-started/syntax/",
  ],
  alloystdlib: [
    "Alloy 표준 라이브러리",
    "https://grafana.com/docs/alloy/latest/reference/stdlib/",
  ],
  alloydebug: [
    "Alloy 디버깅",
    "https://grafana.com/docs/alloy/latest/troubleshoot/debug/",
  ],
  alloycli: [
    "Alloy CLI",
    "https://grafana.com/docs/alloy/latest/reference/cli/",
  ],
  alloyotel: [
    "OpenTelemetry in Alloy",
    "https://grafana.com/docs/alloy/latest/introduction/otel_alloy/",
  ],
  alloyresource: [
    "Alloy 리소스 추정",
    "https://grafana.com/docs/alloy/latest/set-up/estimate-resource-usage/",
  ],
  promtailmigrate: [
    "Promtail에서 옮기기",
    "https://grafana.com/docs/alloy/latest/set-up/migrate/from-promtail/",
  ],
  alloyscrape: [
    "Alloy prometheus.scrape",
    "https://grafana.com/docs/alloy/latest/reference/components/prometheus/prometheus.scrape/",
  ],
  alloyremotewrite: [
    "Alloy prometheus.remote_write",
    "https://grafana.com/docs/alloy/latest/reference/components/prometheus/prometheus.remote_write/",
  ],
  alloylokiprocess: [
    "Alloy loki.process",
    "https://grafana.com/docs/alloy/latest/reference/components/loki/loki.process/",
  ],
  alloylokiwrite: [
    "Alloy loki.write",
    "https://grafana.com/docs/alloy/latest/reference/components/loki/loki.write/",
  ],
  alloybatch: [
    "Alloy otelcol.processor.batch",
    "https://grafana.com/docs/alloy/latest/reference/components/otelcol/otelcol.processor.batch/",
  ],

  promfaq: ["Prometheus FAQ", "https://prometheus.io/docs/introduction/faq/"],
  promdatamodel: [
    "Prometheus 데이터 모델",
    "https://prometheus.io/docs/concepts/data_model/",
  ],
  promtypes: [
    "Prometheus 메트릭 타입",
    "https://prometheus.io/docs/concepts/metric_types/",
  ],
  promjobs: [
    "Prometheus job과 instance",
    "https://prometheus.io/docs/concepts/jobs_instances/",
  ],
  promconfig: [
    "Prometheus 설정",
    "https://prometheus.io/docs/prometheus/latest/configuration/configuration/",
  ],
  promcli: [
    "Prometheus 명령줄 플래그",
    "https://prometheus.io/docs/prometheus/latest/command-line/prometheus/",
  ],
  promflags: [
    "Prometheus 기능 플래그",
    "https://prometheus.io/docs/prometheus/latest/feature_flags/",
  ],
  promstorage: [
    "Prometheus 저장소",
    "https://prometheus.io/docs/prometheus/latest/storage/",
  ],
  prommigration: [
    "Prometheus 3.x 이전 안내",
    "https://prometheus.io/docs/prometheus/latest/migration/",
  ],
  promoperators: [
    "PromQL 연산자",
    "https://prometheus.io/docs/prometheus/latest/querying/operators/",
  ],
  promfunctions: [
    "PromQL 함수",
    "https://prometheus.io/docs/prometheus/latest/querying/functions/",
  ],
  remotewrite: [
    "Remote write 명세",
    "https://prometheus.io/docs/specs/remote_write_spec/",
  ],

  lokicomponents: [
    "Loki 구성요소",
    "https://grafana.com/docs/loki/latest/get-started/components/",
  ],
  lokimodes: [
    "Loki 배포 모드",
    "https://grafana.com/docs/loki/latest/get-started/deployment-modes/",
  ],
  lokicardinality: [
    "Loki 카디널리티",
    "https://grafana.com/docs/loki/latest/get-started/labels/cardinality/",
  ],
  lokistorage: [
    "Loki 저장소",
    "https://grafana.com/docs/loki/latest/configure/storage/",
  ],
  lokischema: [
    "Loki 스키마",
    "https://grafana.com/docs/loki/latest/operations/storage/schema/",
  ],
  lokifs: [
    "Loki filesystem 저장",
    "https://grafana.com/docs/loki/latest/operations/storage/filesystem/",
  ],
  lokiwal: [
    "Loki WAL",
    "https://grafana.com/docs/loki/latest/operations/storage/wal/",
  ],
  lokiretention: [
    "Loki 보존",
    "https://grafana.com/docs/loki/latest/operations/storage/retention/",
  ],
  lokilimits: [
    "Loki 요청 검증과 속도 제한",
    "https://grafana.com/docs/loki/latest/operations/request-validation-rate-limits/",
  ],
  lokilogq: [
    "LogQL 로그 쿼리",
    "https://grafana.com/docs/loki/latest/query/log_queries/",
  ],
  lokimetricq: [
    "LogQL 메트릭 쿼리",
    "https://grafana.com/docs/loki/latest/query/metric_queries/",
  ],
  lokicaching: [
    "Loki 캐시",
    "https://grafana.com/docs/loki/latest/operations/caching/",
  ],
  lokimeta: [
    "Loki 메타 모니터링",
    "https://grafana.com/docs/loki/latest/operations/meta-monitoring/",
  ],
  lokiotel: [
    "Loki OpenTelemetry 수집",
    "https://grafana.com/docs/loki/latest/send-data/otel/",
  ],
  lokisend: [
    "Loki로 데이터 보내기",
    "https://grafana.com/docs/loki/latest/send-data/",
  ],
  loki37: [
    "Loki 3.7 릴리스 노트",
    "https://grafana.com/docs/loki/latest/release-notes/v3-7/",
  ],

  tempostructure: [
    "Tempo 트레이스 구조",
    "https://grafana.com/docs/tempo/latest/introduction/trace-structure/",
  ],
  tempomodes: [
    "Tempo 배포 모드",
    "https://grafana.com/docs/tempo/latest/reference-tempo-architecture/deployment-modes/",
  ],
  tempocomponents: [
    "Tempo 구성요소",
    "https://grafana.com/docs/tempo/latest/reference-tempo-architecture/components/",
  ],
  tempolivestore: [
    "Tempo Live-store",
    "https://grafana.com/docs/tempo/latest/reference-tempo-architecture/components/live-store/",
  ],
  tempoblock: [
    "Tempo 블록 형식",
    "https://grafana.com/docs/tempo/latest/reference-tempo-architecture/block-format/",
  ],
  tempoobject: [
    "Tempo 오브젝트 스토리지",
    "https://grafana.com/docs/tempo/latest/reference-tempo-architecture/object-storage/",
  ],
  tempoconfig: [
    "Tempo 설정",
    "https://grafana.com/docs/tempo/latest/configuration/",
  ],
  tempomigrate: [
    "Tempo 3.0으로 이전",
    "https://grafana.com/docs/tempo/latest/set-up-for-tracing/setup-tempo/migrate-to-3/",
  ],
  traceql: ["TraceQL", "https://grafana.com/docs/tempo/latest/traceql/"],
  traceqlconstruct: [
    "TraceQL 쿼리 만들기",
    "https://grafana.com/docs/tempo/latest/traceql/construct-traceql-queries/",
  ],
  tempogenerator: [
    "Tempo metrics-generator",
    "https://grafana.com/docs/tempo/latest/metrics-from-traces/metrics-generator/",
  ],
  spanmetrics: [
    "Tempo span metrics",
    "https://grafana.com/docs/tempo/latest/metrics-from-traces/span-metrics/span-metrics-metrics-generator/",
  ],
  servicegraphs: [
    "Tempo service graphs",
    "https://grafana.com/docs/tempo/latest/metrics-from-traces/service_graphs/",
  ],
  tempocardinality: [
    "Tempo 메트릭 카디널리티",
    "https://grafana.com/docs/tempo/latest/metrics-from-traces/metrics-generator/cardinality/",
  ],
  tempo31: [
    "Tempo 3.1 릴리스 노트",
    "https://grafana.com/docs/tempo/latest/release-notes/v3-1/",
  ],

  grafanaintro: [
    "Grafana 소개",
    "https://grafana.com/docs/grafana/latest/introduction/",
  ],
  grafanaprov: [
    "Grafana provisioning",
    "https://grafana.com/docs/grafana/latest/administration/provisioning/",
  ],
  grafanadash: [
    "Grafana 대시보드",
    "https://grafana.com/docs/grafana/latest/dashboards/",
  ],
  grafanavars: [
    "Grafana 변수",
    "https://grafana.com/docs/grafana/latest/dashboards/variables/",
  ],
  grafanaglobals: [
    "Grafana 전역 변수",
    "https://grafana.com/docs/grafana/latest/visualizations/dashboards/variables/global-variables/",
  ],
  drilldown: [
    "Grafana Drilldown",
    "https://grafana.com/docs/grafana/latest/visualizations/simplified-exploration/",
  ],
  correlations: [
    "Grafana Correlations",
    "https://grafana.com/docs/grafana/latest/administration/correlations/",
  ],
  grafanaexemplars: [
    "Grafana exemplar",
    "https://grafana.com/docs/grafana/latest/fundamentals/exemplars/",
  ],
  tracetologs: [
    "Grafana trace to logs",
    "https://grafana.com/docs/grafana/latest/datasources/tempo/configure-tempo-data-source/configure-trace-to-logs/",
  ],
  tracetometrics: [
    "Grafana trace to metrics",
    "https://grafana.com/docs/grafana/latest/datasources/tempo/configure-tempo-data-source/configure-trace-to-metrics/",
  ],
  grafanalokids: [
    "Grafana Loki 데이터소스 설정",
    "https://grafana.com/docs/grafana/latest/datasources/loki/configure-loki-data-source/",
  ],
  grafanaconfig: [
    "Grafana 설정",
    "https://grafana.com/docs/grafana/latest/setup-grafana/configure-grafana/",
  ],
  grafanaroles: [
    "Grafana 역할과 권한",
    "https://grafana.com/docs/grafana/latest/administration/roles-and-permissions/",
  ],
  grafanagithub: [
    "Grafana GitHub OAuth",
    "https://grafana.com/docs/grafana/latest/setup-grafana/configure-access/configure-authentication/github/",
  ],
  grafanabackup: [
    "Grafana 백업",
    "https://grafana.com/docs/grafana/latest/administration/back-up-grafana/",
  ],
  grafana13: [
    "Grafana 13.0 새 기능",
    "https://grafana.com/docs/grafana/latest/whatsnew/whats-new-in-v13-0/",
  ],
};

// 00번 글의 시대표. chapter는 그 시대의 이야기를 이어서 다루는 글이다.
export const timeline = [
  {
    era: "1980년대~",
    title: "서버 한 대와 로그 파일",
    items: "syslog · tail · grep",
    question: "무슨 일이 있었나?",
    chapter: "logging",
  },
  {
    era: "1990년대",
    title: "서버 여러 대와 상태 점검",
    items: "상태 점검 스크립트 · RRDtool 그래프",
    question: "전부 살아 있나?",
    chapter: "metrics",
  },
  {
    era: "1990년대 후반~2000년대",
    title: "앱 안의 로깅 라이브러리",
    items: "Log4j · java.util.logging · SLF4J · Logback · MDC",
    question: "어느 코드에서 무슨 일이?",
    chapter: "logging",
  },
  {
    era: "2010년 전후",
    title: "웹 규모와 중앙 수집",
    items: "Elasticsearch · StatsD · Graphite · Dapper 논문",
    question: "흩어진 기록을 한곳에서 볼 수 있나?",
    chapter: "stack",
  },
  {
    era: "2012~2016",
    title: "컨테이너와 마이크로서비스",
    items: "Prometheus · Zipkin · Jaeger · Grafana",
    question: "이 요청은 어디서 느려졌나?",
    chapter: "trace",
  },
  {
    era: "2016~2020",
    title: "표준을 만들기",
    items:
      "OpenTracing · OpenCensus → OpenTelemetry · W3C Trace Context · Micrometer · Loki",
    question: "도구를 바꿔도 계측은 그대로일 수 있나?",
    chapter: "transport",
  },
  {
    era: "2020년대",
    title: "비비디가 쓰는 조합",
    items: "Tempo · Grafana Alerting · Alloy",
    question: "세 신호를 잇고 알림까지 받을 수 있나?",
    chapter: "stack",
  },
];

export const chapters = [
  {
    id: "history",
    number: "00",
    title: "결혼 정보 저장 실패 한 건, 시대마다 어떻게 알았나",
    lead: "오늘의 관측 도구는 한 번에 나오지 않았다. 시스템이 커질 때마다 생긴 질문에 하나씩 답하며 쌓였다.",
    tags: ["역사", "로그", "메트릭", "트레이스"],
    flow: [
      "서버 한 대",
      "서버 여러 대",
      "앱 안의 로거",
      "중앙 수집",
      "마이크로서비스",
      "표준화",
      "비비디 스택",
    ],
    sections: [
      {
        title: "시대마다 바뀐 질문",
        text: "서버가 한 대일 때는 “무슨 일이 있었나”를 파일에서 읽으면 됐다. 서버가 늘자 “전부 살아 있나”와 “얼마나 바쁜가”가 중요해졌다. 서비스가 잘게 나뉘자 “이 요청은 어디서 느려졌나”를 물어야 했다. 로그·메트릭·트레이스는 이 세 질문에 각각 답하며 자랐다.",
        refs: ["sre", "otel"],
      },
      {
        title: "새 도구는 앞 도구 위에 쌓였다",
        text: "syslog는 흩어진 메시지를 한 형식으로 모았다. RRDtool·Graphite·Prometheus는 숫자를 시간축에 쌓았다. Dapper 이후의 분산 추적은 서비스 경계를 넘는 요청을 이었다. OpenTelemetry는 제각각이던 계측 방식을 하나의 규약으로 묶었다. 새 단계는 앞 단계를 버리지 않고 그 위에 쌓였다.",
        refs: ["rfc5424", "prom", "dapper", "otel"],
      },
      {
        title: "이 사이트를 읽는 순서",
        text: "01~04은 앱 안에서 로그·메트릭·트레이스를 만드는 이야기다. 05~06는 만든 데이터를 표준 규약으로 내보내고 저장소에 나누어 담는 이야기다. 07~09은 쌓인 데이터로 알림을 받고, 부하를 시험하고, 장애를 조사하는 이야기다. 글마다 오래된 방법에서 지금의 방법까지 같은 순서로 따라간다.",
        refs: ["otel", "grafana"],
      },
      {
        title: "docker logs만으로는 답할 수 없는 질문",
        text: "운영 앱은 Docker 컨테이너 안에서 돌고, log.info()로 찍은 로그는 컨테이너의 표준 출력(stdout)으로 나간다. Docker가 이것을 서버 디스크의 파일에 모아 두므로 운영 로그를 보려면 서버에 접속해 docker logs를 읽어야 한다. “로그인이 안 돼요”라는 제보가 오면 이 방식으로는 아래 질문에 답하기 어렵다. 그래서 서버 안에 흩어진 정보를 한곳에 모아 브라우저로 검색하고, 이상하면 알려 주는 모니터링 시스템을 만든다.",
        code: `ssh bibbidi-prod
docker logs bibbidi-backend | grep ERROR`,
        table: {
          head: ["하고 싶은 것", "docker logs로는"],
          rows: [
            [
              "에러 로그 찾기",
              "서버마다 SSH로 들어가서 grep. 운영·개발 서버를 따로 봐야 한다",
            ],
            [
              "어제 로그 보기",
              "컨테이너를 새로 띄우면(배포하면) 이전 로그가 사라진다",
            ],
            ["지금 1초에 요청이 몇 개 들어오지?", "로그를 직접 세야 한다"],
            ["메모리가 얼마나 찼지?", "로그에 찍혀 있지 않다"],
            [
              "로그인 API가 3초 걸렸는데 어디서 오래 걸렸지?",
              "시작 로그와 끝 로그만 있어서 중간을 모른다",
            ],
            ["에러가 나면 바로 알려 줘", "누군가 계속 보고 있어야 한다"],
          ],
        },
        refs: ["dockerlogs"],
      },
      {
        title: "세 신호를 같이 쓰는 이유",
        text: "로그는 “무슨 일이 있었나”를 문장으로 남긴다. 자세하지만 양이 많아 “몇 번” 같은 질문에는 약하다. 메트릭은 일정 간격(비비디는 15초)마다 숫자를 적어 둔 것이고, Spring Boot Actuator가 알아서 센다. 트레이스는 요청 하나가 거쳐 간 구간과 걸린 시간을 기록한 영수증이며, Spring이 요청마다 자동으로 만든다. “로그인이 느려요”라면 메트릭으로 알아채고(응답 시간 그래프가 3초로 튐), 트레이스로 범위를 좁히고(카카오 토큰 요청이 2.8초), 로그로 이유를 본다(그 시각의 “카카오 응답 지연, 재시도 1회”).",
        code: `GET /api/auth/kakao/callback                           총 3,020ms
 ├─ 카카오 토큰 요청 (외부 HTTP)                          2,800ms  ← 여기가 범인
 └─ 회원 조회 (DB)                                          150ms`,
        refs: ["sre", "actuator", "tracing"],
      },
      {
        title: "세 신호를 잇는 열쇠: trace_id",
        text: "요청이 들어오면 Spring이 그 요청에 고유 번호 trace_id(예: 4bf92f3577b34da6a3ce929d0e0e4736)를 붙인다. 그 요청을 처리하는 동안 찍는 모든 로그에 이 번호가 자동으로 붙는다. log.info()에 따로 넣지 않아도 되는 이유는 SLF4J의 MDC에 Spring이 넣어 주기 때문이다. 트레이스도 같은 번호를 가지므로 에러 로그 한 줄 → 같은 번호의 트레이스 → 같은 번호의 다른 로그로 오갈 수 있다. 비비디 운영 로그 한 줄은 기계가 레벨·로거·trace_id를 정확히 뽑도록 JSON 한 줄로 찍는다.",
        code: `{"@timestamp":"2026-10-10T01:23:45.678Z","log":{"level":"ERROR","logger":"kr.bibbidi.auth.OidcClient"},"message":"token request failed","traceId":"4bf92f3577b34da6a3ce929d0e0e4736","spanId":"00f067aa0ba902b7"}`,
        refs: ["mdc", "tracing"],
      },
      {
        title: "도구 다섯 개는 각자 무엇을 하나",
        text: "택배에 비유하면 앱 서버에 사는 Alloy가 로그·숫자·트레이스를 모아 모니터링 서버(monitoring.bibbidi.kr)로 보낸다. 전송은 인터넷을 거치며 비밀 토큰이 필요하다. 모니터링 서버의 세 창고가 저장하고, Grafana가 보여 주며, 이상하면 Discord와 전화로 알린다. 개발자는 Grafana 화면만 열면 되고 다른 도구 화면은 직접 볼 일이 거의 없다.",
        table: {
          head: ["도구", "비유", "하는 일"],
          rows: [
            [
              "Alloy",
              "택배 기사",
              "앱 서버에 살면서 로그·숫자·트레이스를 모아 모니터링 서버로 보냄",
            ],
            ["Prometheus", "숫자 창고", "메트릭(숫자)을 시간순으로 보관"],
            ["Loki", "로그 창고", "로그를 보관하고 검색하게 해 줌"],
            ["Tempo", "영수증 창고", "트레이스를 보관하고 검색하게 해 줌"],
            [
              "Grafana",
              "창고 열람실 + 경보기",
              "세 창고를 한 화면에서 검색·그래프로 보고, 이상하면 알림을 보냄",
            ],
          ],
        },
        refs: ["alloy", "prom", "loki", "tempo", "grafana"],
      },
    ],
    takeaway:
      "지금의 도구가 낯설다면, 그 도구가 없던 시절에 무엇이 불편했는지부터 떠올려 보자.",
    lab: "logging",
  },
  {
    id: "logging",
    number: "01",
    title: "좋은 로깅이 무엇인가",
    lead: "장애가 난 뒤에도 무슨 일이 있었는지 읽을 수 있어야 한다.",
    tags: ["로그", "SLF4J", "Logback", "ECS"],
    flow: ["결혼 정보 요청", "의미 있는 사건", "표준 형식 구조화 로그", "검색"],
    sections: [
      {
        title: "한 줄에 담을 것",
        text: "“실패”만 남기면 다시 코드를 읽어야 한다. 결혼 정보 저장이라면 무슨 작업이 어느 단계에서 끝났는지, 결과가 무엇인지 남긴다. 개인 정보나 비밀 값은 넣지 않는다. 로그 수준은 상황에 맞게 고르고, 반복되는 정상 요청을 전부 ERROR로 찍지 않는다.",
        refs: ["springlog", "logging", "loggingsecurity"],
      },
      {
        title: "SLF4J와 Logback의 역할",
        text: "애플리케이션은 SLF4J API로 로그를 호출하고, Logback 같은 구현체가 형식과 출력 대상을 맡는다. 매개변수 자리에는 {}를 써서 값을 전달한다. 예외를 기록할 때는 메시지뿐 아니라 예외 객체도 함께 넘겨 스택 정보를 보존한다.",
        code: 'log.warn("wedding profile save failed weddingId={}", weddingId, exception);',
        refs: ["logging", "logback"],
      },
      {
        title: "찾을 수 있는 로그",
        text: "시간, 서비스, 수준, 사건 이름, trace_id처럼 뜻이 고정된 필드를 일관되게 쓴다. 필드 이름은 팀이 새로 짓기보다 ECS 같은 표준 형식을 따른다. Spring Boot에서는 logging.structured.format.console 설정으로 ecs, logstash, gelf 중 하나를 고른다. 결혼 정보 ID는 조사에 유용하지만 값이 계속 늘어나는 ID를 Loki 인덱스 라벨로 삼지 않는다. 로그 본문 필드로 두고 검색한다.",
        refs: ["springlog", "ecs", "lokilabel"],
      },
      {
        title: "로그는 왜 남기나",
        text: "로그는 프로그램이 돌면서 일어난 일을 기록한 것이다. 모든 일을 남길 수는 없으니 최소한 서비스가 잘 돌고 있다는 흔적(앱 시작, 외부 API 호출, 중요한 요청 처리)과 장애(예외, 외부 시스템 실패)를 남긴다. 기준은 “나중에 운영에서 문제를 찾을 때 이 기록이 필요할까?”다. 로컬에서는 디버깅을 쓰지만, 운영에서는 로그가 거의 유일한 단서다.",
        table: {
          head: ["", "디버깅", "로깅"],
          rows: [
            [
              "방법",
              "브레이크포인트를 걸고 변수·메모리를 직접 봄",
              "코드에 기록을 남겨 두고 나중에 읽음",
            ],
            ["장점", "가장 정확함", "운영 서버에서도 쓸 수 있음"],
            [
              "한계",
              "운영 중인 서버를 멈출 수 없음",
              "미리 남겨 둔 것만 볼 수 있음",
            ],
          ],
        },
        refs: ["springlog"],
      },
      {
        title: "System.out.println으로 안 되나",
        text: "println은 레벨도 형식도 출력 위치도 고를 수 없다. 로깅 프레임워크는 이 셋을 설정으로 바꾸고, 찍지 않을 로그는 문자열도 만들지 않는다.",
        table: {
          head: ["", "System.out", "SLF4J + Logback"],
          rows: [
            [
              "레벨",
              "없음(무조건 찍힘)",
              "레벨별로 켜고 끔(운영에서는 DEBUG 끄기)",
            ],
            [
              "모양",
              "직접 문자열을 만듦",
              "시각·스레드·클래스 이름 등을 자동으로 붙임, JSON도 가능",
            ],
            ["출력 위치", "콘솔뿐", "콘솔·파일·외부 시스템, 설정만 바꿔서"],
            [
              "성능",
              "항상 문자열을 만듦",
              "안 찍을 로그는 문자열도 안 만듦({})",
            ],
          ],
        },
        refs: ["logging"],
      },
      {
        title: "log.info()를 부르면 일어나는 일",
        text: "@Slf4j는 Lombok이 private static final Logger log = LoggerFactory.getLogger(클래스.class)를 만들어 주는 애너테이션이다. 우리 코드는 SLF4J만 알기 때문에 구현체를 Logback에서 Log4j2로 바꿔도 코드를 고치지 않는다(JDBC 인터페이스와 MySQL 드라이버의 관계). SLF4J는 API(org.slf4j.Logger), 바인딩, 브리지로 이뤄진다. 바인딩은 API를 실제 구현체에 연결하며 반드시 하나만 있어야 한다. 없으면 아무것도 안 찍히고, 여러 개면 어느 것이 쓰일지 모른다. 브리지는 Commons Logging·Log4j 같은 다른 API로 찍은 로그를 SLF4J로 모은다. Spring Boot는 이 조합을 spring-boot-starter-logging으로 맞춰 준다.",
        code: `@Slf4j
@Service
class WeddingService {
    void find(Long id) {
        log.info("결혼 정보 조회 id={}", id);
    }
}`,
        refs: ["logging", "springlog"],
      },
      {
        title: "Logback의 세 부품",
        text: "Logback은 SLF4J를 직접 구현한 라이브러리이며 Spring Boot 기본값이다. 모듈은 logback-core(기반), logback-classic(SLF4J 구현), logback-access(웹 서버 접근 로그)다. Logger는 점(.)으로 나뉜 계층이어서 kr.bibbidi에 레벨을 정하면 kr.bibbidi.auth.OidcClient도 물려받고, 맨 위는 root Logger다.",
        table: {
          head: ["부품", "하는 일", "예"],
          rows: [
            [
              "Logger",
              "로그 요청을 받아 이 레벨이면 찍을지 판단. 보통 클래스 이름이 Logger 이름",
              "kr.bibbidi.auth.OidcClient",
            ],
            [
              "Appender",
              "어디에 찍을지. 하나의 Logger에 여러 개 붙일 수 있음",
              "ConsoleAppender, FileAppender, RollingFileAppender",
            ],
            [
              "Encoder(예전엔 Layout)",
              "어떤 모양으로 찍을지",
              "패턴 한 줄, JSON",
            ],
          ],
        },
        refs: ["logback", "logbackarch"],
      },
      {
        title: "패턴 읽는 법",
        text: "Spring Boot 기본 로그 한 줄은 Logback 패턴 기호로 만들어진다. %d는 시각, %thread는 스레드 이름, %level(%-5level은 5칸 맞춤)은 레벨, %logger{36}은 36자로 줄인 Logger 이름, %msg는 메시지, %n은 줄바꿈이다.",
        code: `2026-10-10T10:47:09.613Z  INFO 10840 --- [nio-8080-exec-1] k.b.wedding.WeddingService : 결혼 정보 조회 id=42`,
        refs: ["logback", "springlog"],
      },
      {
        title: "로그 레벨과 고르는 기준",
        text: "레벨은 TRACE < DEBUG < INFO < WARN < ERROR 순이며, 정한 레벨 이상만 찍힌다. FATAL은 Logback에 없고 ERROR로 취급된다. 헷갈리면 “개발자가 예상한 일인가?”를 묻는다. 중복 이메일·잘못된 입력·권한 없음처럼 예상한 예외는 정상 흐름의 일부라 INFO나 WARN, NPE·외부 시스템 다운·DB 연결 실패처럼 예상 못 한 예외는 ERROR다. 사용자의 실수(4xx)를 ERROR로 찍으면 ERROR 알림(W4)이 계속 울린다.",
        table: {
          head: ["레벨", "언제 쓰나", "예"],
          rows: [
            [
              "ERROR",
              "개발자가 예상하지 못한 실패. 사람이 봐야 함",
              "외부 API 호출 실패로 로그인 불가, 잡지 못한 예외",
            ],
            [
              "WARN",
              "지금은 괜찮지만 에러가 될 수 있는 일",
              "재시도 후 성공, 공개 키 갱신 실패(이전 키로 동작 중)",
            ],
            [
              "INFO",
              "시스템이 요구대로 잘 돌고 있다는 기록, 개발자가 예상한 예외",
              "회원 가입, 스케줄러 시작, “이미 가입된 이메일” 예외",
            ],
            [
              "DEBUG",
              "개발·테스트 중 보는 자세한 값",
              "쿼리 파라미터, 중간 계산값",
            ],
            ["TRACE", "DEBUG보다 더 자세함", "거의 안 씀"],
          ],
        },
        refs: ["springlog", "logback"],
      },
      {
        title: "어떤 레벨까지 찍히나",
        text: "Logback 혼자 쓰면 root 기본 레벨은 DEBUG지만, Spring Boot는 ERROR·WARN·INFO만 콘솔에 찍는다. 패키지별로 바꿀 수 있다. 비비디에서는 운영에서 DEBUG를 켜도 Alloy가 DEBUG·TRACE를 버려서 모니터링 서버에는 가지 않는다.",
        code: `logging:
  level:
    root: info
    org.springframework.web: debug
    org.hibernate: error`,
        refs: ["springlog", "alloypipe"],
      },
      {
        title: "{}를 써야 하는 이유",
        text: "문자열 더하기는 로그가 안 찍혀도 문자열을 만드는 비용이 든다. {}를 쓰면 레벨을 먼저 보고 찍을 때만 문자열을 만든다. Logback 문서는 안 찍히는 로그에서 최소 30배 빠르다고 설명한다. 예외는 마지막 인자로 넘기면 {}에 들어가지 않고 스택 트레이스로 찍힌다.",
        code: `log.debug("결혼 정보 " + weddingProfile + " 처리");          // X : 레벨이 INFO 여도 문자열을 먼저 만듦
log.debug("결혼 정보 {} 처리", weddingProfile);               // O : 실제로 찍을 때만 문자열을 만듦
log.error("카카오 토큰 요청 실패 code={}", code, e);   // e 는 스택 트레이스로 찍힘`,
        refs: ["logback", "logging"],
      },
      {
        title: "설정 파일 logback-spring.xml의 구조",
        text: "application.yaml의 logging.*으로 부족하면 XML로 세밀하게 정한다. 비비디는 쓰지 않지만 많은 프로젝트가 쓰는 방식이다. appender는 어디에·어떤 모양으로, rollingPolicy는 파일이 커지거나 날이 바뀌면 새 파일로 바꾸고 오래된 파일을 지우는 규칙, filter는 이 Appender에 들어올 레벨, springProfile은 프로파일별 설정(Spring 확장이라 파일 이름이 logback-spring.xml이어야 함), root·logger는 레벨과 연결할 Appender다.",
        code: `<configuration>
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d %-5level [%thread] %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/app.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>logs/app.%d{yyyy-MM-dd}.%i.log</fileNamePattern>
            <maxFileSize>10MB</maxFileSize>
            <maxHistory>30</maxHistory>
            <totalSizeCap>3GB</totalSizeCap>
        </rollingPolicy>
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <level>INFO</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
        <encoder>
            <pattern>%d %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    <springProfile name="local">
        <root level="DEBUG"><appender-ref ref="CONSOLE"/></root>
    </springProfile>
    <springProfile name="prod">
        <root level="INFO"><appender-ref ref="FILE"/></root>
    </springProfile>
</configuration>`,
        refs: ["springloghowto", "logback"],
      },
      {
        title: "사람용 로그와 기계용 로그",
        text: "사람용 한 줄은 기계가 레벨·로거를 알려면 문자열을 잘라야 한다. 비비디는 ECS JSON으로 찍어 수집기(Alloy)가 레벨·로거·trace_id를 정확히 꺼내게 한다. Spring Boot 3.4부터 XML 없이 logging.structured.format.console 설정 한 줄로 바뀌고(ecs, logstash, gelf 중 선택), MDC 값도 JSON에 자동으로 들어간다.",
        code: `{"@timestamp":"2026-10-10T10:47:09.613Z","log":{"level":"INFO","logger":"kr.bibbidi.wedding.WeddingService"},"process":{"thread":{"name":"nio-8080-exec-1"}},"message":"결혼 정보 조회 id=42","traceId":"4bf9...","spanId":"00f0..."}`,
        refs: ["springlog", "springstructured", "ecs"],
      },
      {
        title: "비비디가 파일로 안 남기는 이유",
        text: "Spring Boot 기본은 콘솔에만 찍는다(logging.file.name을 줘야 파일에도 쓰며 10MB마다 새 파일). 비비디는 콘솔(stdout)에만 찍고, Docker가 모은 것을 Alloy가 읽어 간다. Docker는 컨테이너마다 10MB × 5개로 관리한다. 컨테이너 안에 파일을 쌓으면 디스크·롤링 관리를 따로 해야 하고, 컨테이너를 새로 만들면 사라진다.",
        refs: ["springlog", "dockerlogs"],
      },
      {
        title: "좋은 로그를 남기는 법",
        text: "나중에 Loki에서 검색할 사람을 생각하고 찍는다. Alloy가 password=, Bearer ... 같은 일부 패턴은 가려 주지만 규칙에 없는 이름은 그대로 나간다. 반복문 안에서 너무 많이 보내면 Loki가 받기를 거절한다(알림 W7).",
        table: {
          head: ["원칙", "나쁜 예", "좋은 예"],
          rows: [
            [
              "무엇이·왜 실패했는지",
              'log.error("에러")',
              'log.error("카카오 토큰 요청 실패 status={}", status, e)',
            ],
            [
              "찾을 수 있는 값 넣기",
              'log.info("저장 완료")',
              'log.info("체크리스트 저장 weddingId={} itemCount={}", id, n)',
            ],
            [
              "같은 에러를 여러 번 찍지 않기",
              "서비스·컨트롤러·핸들러에서 각각 error",
              "한곳(예: @RestControllerAdvice)에서 한 번",
            ],
            [
              "비밀 값 안 찍기",
              'log.info("token={}", accessToken)',
              "토큰·비밀번호·개인정보는 빼기",
            ],
            [
              "반복문 안에서 찍지 않기",
              "for (...) log.info(...)",
              "끝나고 개수만 한 번",
            ],
            ["레벨 맞추기", "예상한 예외를 ERROR로", "예상한 예외는 INFO·WARN"],
          ],
        },
        refs: ["loggingsecurity", "lokilabel"],
      },
    ],
    takeaway:
      "로그를 남기기 전 “이 한 줄로 다음 행동을 정할 수 있나?”를 물어보자.",
    lab: "logging",
  },
  {
    id: "mdc-ecs",
    number: "02",
    title: "MDC 값이 ECS JSON 필드가 되는 과정",
    lead: "요청 안의 MDC 값이 로그 이벤트를 거쳐 ECS JSON 필드가 되고, 수집기와 Loki에서 검색되는 경로를 한 편으로 정리합니다.",
    tags: ["MDC", "ECS", "구조화 로그"],
    flow: ["요청 시작", "MDC 컨텍스트", "SLF4J 이벤트", "ECS JSON", "Alloy·Loki 검색"],
    sections: [
      {
        title: "MDC는 요청의 메모장입니다",
        text: "MDC(Mapped Diagnostic Context)는 현재 스레드에서 처리 중인 요청의 key-value 값을 로깅 이벤트에 붙이는 공간입니다. Spring Boot 트레이싱이 만든 traceId·spanId나 애플리케이션이 넣은 weddingId를 log.info() 호출마다 인자로 반복하지 않아도 로그에 함께 남길 수 있습니다.",
        refs: ["mdc", "tracing"],
      },
      {
        title: "ECS는 JSON 필드 이름의 약속입니다",
        text: "ECS(Elastic Common Schema)는 로그를 JSON으로 저장할 때 레벨, 로거, 시간처럼 자주 쓰는 정보를 어떤 필드 이름에 담을지 정한 스키마입니다. MDC와 ECS는 같은 기능이 아닙니다. MDC는 값을 잠시 보관하는 컨텍스트이고, ECS는 출력된 이벤트의 필드 모양입니다.",
        refs: ["ecs"],
      },
      {
        title: "둘이 연결되는 지점",
        text: "애플리케이션이 log.info()를 호출하면 SLF4J 창구를 통해 Logback 같은 구현으로 이벤트가 전달됩니다. Spring Boot의 구조화 로그 설정을 ecs로 선택하면 Logback이 이벤트와 MDC 값을 JSON 필드로 인코딩합니다. 그래서 MDC에 있던 traceId가 JSON의 traceId로 나타나는지, 프로젝트가 쓰는 필드 이름과 수집기 규칙이 같은지 확인해야 합니다.",
        code: `logging:
  structured:
    format:
      console: ecs`,
        refs: ["springstructured", "springlog", "ecs"],
      },
      {
        title: "수집기는 필드 이름을 바꾸지 않아야 합니다",
        text: "Alloy는 애플리케이션의 stdout에서 JSON 한 줄을 읽어 Loki로 보냅니다. 이때 trace_id를 새 이름으로 바꾸거나 모든 JSON 필드를 라벨로 만들면 Grafana에서 로그와 트레이스를 잇지 못하거나 카디널리티가 커질 수 있습니다. 검색에 필요한 값과 로그 본문에 둘 값을 구분하고, 실제 Loki 라벨·structured metadata 규칙을 함께 확인합니다.",
        refs: ["alloypipe", "lokilabel", "ecs"],
      },
      {
        title: "한 줄을 끝까지 따라가기",
        text: "운영에서 확인할 순서는 간단합니다. 먼저 애플리케이션 콘솔에 traceId·spanId가 JSON으로 찍히는지 봅니다. 다음으로 Alloy가 같은 JSON을 읽는지 확인합니다. 마지막으로 Loki에서 서비스와 시간으로 로그를 찾은 뒤 trace_id 링크로 Tempo를 열어 같은 요청인지 확인합니다.",
        refs: ["mdc", "springstructured", "alloypipe", "lokilabel"],
      },
    ],
    takeaway: "MDC는 요청의 값을 보관하고, ECS는 로그 이벤트의 필드 모양을 정하며, 구조화 로거가 둘을 한 줄의 JSON으로 연결합니다.",
    lab: "logging",
  },
  {
    id: "metrics",
    number: "03",
    title: "숫자로 이상을 알아채기",
    lead: "로그를 읽기 전에, 얼마나 자주 얼마나 느리게 실패하는지 본다.",
    tags: ["Actuator", "Micrometer", "Prometheus"],
    flow: ["Spring 앱", "Micrometer 계측", "Actuator 노출", "Prometheus 수집"],
    sections: [
      {
        title: "측정값을 밖으로 꺼내기",
        text: "Spring Boot Actuator는 상태와 메트릭 엔드포인트를 제공한다. Micrometer는 카운터·게이지·타이머 같은 계측 API를 제공하고 레지스트리를 통해 모니터링 시스템으로 내보낸다. Prometheus 형식으로 노출하려면 해당 레지스트리와 엔드포인트 설정이 필요하다.",
        refs: ["actuator", "metrics", "micrometer"],
      },
      {
        title: "어떤 숫자를 볼까",
        text: "요청량과 오류 비율, 응답 시간의 분포, 포화 상태를 함께 본다. 카운터는 누적값이므로 일정 구간의 변화율을 계산하고, 지연은 평균만 보지 말고 분포나 분위수도 살핀다.",
        refs: ["sre", "promql", "histogram"],
      },
      {
        title: "라벨은 신중하게",
        text: "경로·상태 코드처럼 값의 종류가 제한된 차원은 비교에 도움이 된다. 결혼 정보 ID처럼 요청마다 달라지는 값을 메트릭 라벨에 넣으면 시계열이 급격히 늘어난다.",
        refs: ["prom", "cardinality"],
      },
      {
        title: "메트릭이 뭔가",
        text: "메트릭은 일정 간격으로 잰 숫자이고, 시간 순서로 이으면 그래프가 된다. 로그가 “무슨 일이 있었나”라면 메트릭은 “얼마나”다. 로그로 “1분에 요청 몇 개?”를 알려면 줄을 세야 하지만, 메트릭은 처음부터 세어 둔 숫자라서 싸고 빠르다.",
        refs: ["metrics", "sre"],
      },
      {
        title: "무엇을 재야 하나: 4가지 황금 신호",
        text: "Google SRE 책은 사용자에게 영향을 주는 서비스라면 최소한 이 네 가지를 재라고 정리했다. 비비디 알림 규칙 15개도 대부분 이 넷 중 하나다.",
        table: {
          head: ["신호", "뜻", "비비디에서 보는 숫자"],
          rows: [
            [
              "Latency(지연)",
              "요청 하나가 얼마나 걸리나",
              "API 응답 시간 p95 (traces_spanmetrics_latency_bucket)",
            ],
            [
              "Traffic(트래픽)",
              "요청이 얼마나 들어오나",
              "초당 요청 수 (http_server_requests_seconds_count)",
            ],
            [
              "Errors(에러)",
              "요청이 얼마나 실패하나",
              '5xx 비율 (status=~"5..")',
            ],
            [
              "Saturation(포화)",
              "자원이 얼마나 찼나",
              "힙 사용률, DB 커넥션 대기, 디스크 사용률",
            ],
          ],
        },
        refs: ["sre"],
      },
      {
        title: "누가 무엇을 하나",
        text: "HTTP 요청·JVM·DB 커넥션 풀은 Spring이 알아서 재서 Micrometer에 넣고, Actuator가 /actuator/prometheus로 보여 준다. 비비디에서는 Alloy가 15초마다 이 주소를 읽어 Prometheus로 보낸다. 코드 없이 의존성과 설정만 넣으면 된다.",
        code: `implementation 'org.springframework.boot:spring-boot-starter-actuator'   // Actuator + Micrometer
runtimeOnly    'io.micrometer:micrometer-registry-prometheus'             // Prometheus 형식`,
        table: {
          head: ["이름", "하는 일", "비유"],
          rows: [
            [
              "Micrometer",
              "숫자를 세고 보관하는 라이브러리. “메트릭계의 SLF4J”라서 Prometheus·Datadog 등 어디로 보낼지 바꿔도 코드는 그대로",
              "계산기",
            ],
            [
              "MeterRegistry",
              "Micrometer의 중심. 모든 측정기(Meter)를 모아 둠",
              "계산기 본체",
            ],
            [
              "micrometer-registry-prometheus",
              "숫자를 Prometheus 형식으로 바꿔 줌",
              "번역기",
            ],
            [
              "Actuator",
              "앱 상태를 HTTP 주소로 보여 주는 Spring Boot 기능",
              "창구",
            ],
          ],
        },
        refs: ["micrometer", "actuator", "metrics"],
      },
      {
        title: "Actuator 엔드포인트와 노출",
        text: '/actuator/health는 살아 있는지({"status":"UP"}), /actuator/info는 앱 정보, /actuator/prometheus는 Prometheus 형식 메트릭, /actuator/metrics는 사람이 보는 JSON 메트릭, /actuator/loggers는 로그 레벨 보기·바꾸기다. 기본적으로 웹에 다 열려 있지 않아 열 것을 골라야 한다.',
        code: `management:
  endpoints:
    web:
      exposure:
        include: health,info,prometheus   # 비비디는 이 세 개만 엶`,
        refs: ["endpoints", "actuator"],
      },
      {
        title: "관리 포트 분리: 왜 8081인가",
        text: "메트릭에는 메모리, DB 풀 크기, API 주소 목록 같은 내부 정보가 들어 있어 외부에 보이면 안 된다. 포트를 나누면 사용자용 포트(8080)에는 /actuator가 아예 없다. 비비디는 8081을 서버 밖으로 열지 않고, 같은 Docker 네트워크의 Alloy만 backend:8081로 읽는다.",
        code: `management:
  server:
    port: 8081      # Actuator 는 8081, 사용자 요청은 8080`,
        refs: ["actuator"],
      },
      {
        title: "/actuator/prometheus를 열어 보면",
        text: "# HELP는 설명, # TYPE은 종류이고, 그 아래가 이름{태그} 값이다. 이 페이지는 지금 이 순간 값만 보여 주고, 과거 값은 15초마다 읽어서 Prometheus에 쌓아 둔다.",
        code: `# HELP http_server_requests_seconds Duration of HTTP server request handling
# TYPE http_server_requests_seconds summary
http_server_requests_seconds_count{method="GET",outcome="SUCCESS",status="200",uri="/api/weddings/{id}"} 1523
http_server_requests_seconds_sum{method="GET",outcome="SUCCESS",status="200",uri="/api/weddings/{id}"} 45.2

# HELP jvm_memory_used_bytes The amount of used memory
# TYPE jvm_memory_used_bytes gauge
jvm_memory_used_bytes{area="heap",id="G1 Eden Space"} 6291456.0

# HELP hikaricp_connections_active Active connections
# TYPE hikaricp_connections_active gauge
hikaricp_connections_active{pool="HikariPool-1"} 3.0`,
        refs: ["actuatorprom"],
      },
      {
        title: "Spring이 알아서 재는 것",
        text: "uri 태그에는 실제 주소(/api/weddings/42)가 아니라 주소 틀(/api/weddings/{id})이 들어간다. 그래야 줄 수가 폭발하지 않는다.",
        table: {
          head: ["분류", "이름(앞부분)", "예"],
          rows: [
            [
              "HTTP 요청",
              "http.server.requests",
              "요청 수, 걸린 시간. 태그 method, uri, status, outcome, exception",
            ],
            ["JVM", "jvm.", "힙 메모리, GC 횟수·시간, 스레드 수"],
            [
              "시스템",
              "system., process., disk.",
              "CPU 사용률, 업타임, 디스크 남은 양",
            ],
            ["DB 커넥션 풀", "hikaricp.", "사용 중·쉬는 중·대기 중 커넥션"],
            [
              "Tomcat",
              "tomcat.",
              "스레드 수(server.tomcat.mbeanregistry.enabled=true일 때만)",
            ],
          ],
        },
        refs: ["metrics"],
      },
      {
        title: "측정기 종류(Meter)",
        text: "숫자를 어떻게 읽는지(rate, increase, p95)는 06번 글의 Prometheus에서 다룬다.",
        table: {
          head: ["종류", "뜻", "예", "Prometheus에서"],
          rows: [
            ["Counter", "늘어나기만 하는 수", "로그인 성공 횟수", "이름_total"],
            [
              "Gauge",
              "오르내리는 현재값",
              "큐에 쌓인 작업 수, 커넥션 수",
              "그대로",
            ],
            [
              "Timer",
              "횟수 + 걸린 시간",
              "API 응답 시간",
              "_count, _sum, _max(+ 설정하면 _bucket)",
            ],
            [
              "DistributionSummary",
              "횟수 + 크기(시간이 아닌 값)",
              "업로드 파일 크기",
              "_count, _sum, _max",
            ],
            [
              "LongTaskTimer",
              "지금 진행 중인 긴 작업",
              "배치 작업 진행 시간",
              "진행 중 개수·시간",
            ],
          ],
        },
        refs: ["meters"],
      },
      {
        title: "이름 규칙: 점 → 밑줄",
        text: "Micrometer 이름은 소문자 + 점으로 짓는다(bibbidi.login.success). Prometheus로 나갈 때 밑줄로 바뀌고 단위·종류 꼬리가 붙는다. http.server.requests(Timer)는 http_server_requests_seconds_count·_sum·_max가 되고, bibbidi.login.success(Counter)는 bibbidi_login_success_total이 된다. 태그의 점도 밑줄로 바뀌어 deployment.environment.name은 deployment_environment_name이 된다.",
        refs: ["micronaming"],
      },
      {
        title: "내가 직접 재기(선택)",
        text: "Spring이 재 주지 않는 비즈니스 숫자가 필요할 때만 쓴다. 비비디는 아직 직접 만든 측정기가 없다. register는 같은 이름 + 태그면 기존 것을 돌려준다. Gauge는 현재값을 읽는 방법을 등록해 두면 읽을 때마다 함수를 불러 값을 가져간다.",
        code: `@Component
@RequiredArgsConstructor
class LoginMetrics {
    private final MeterRegistry registry;

    // Counter : 로그인 성공 횟수 (제공자별)
    void loginSucceeded(String provider) {
        Counter.builder("bibbidi.login.success")
                .tag("provider", provider)          // kakao, google
                .register(registry)
                .increment();
    }

    // Timer : 외부 API 호출 시간
    <T> T timeKakaoCall(Supplier<T> call) {
        return Timer.builder("bibbidi.oauth.call")
                .tag("provider", "kakao")
                .register(registry)
                .record(call);
    }
}

// Gauge
Gauge.builder("bibbidi.pending.jobs", jobQueue, Queue::size).register(registry);`,
        refs: ["meters"],
      },
      {
        title: "태그를 고를 때 주의",
        text: "태그 값 종류가 적어야 한다. 값 하나마다 줄(시계열)이 하나씩 생긴다. provider=kakao|google, status=200|400|500은 좋고, userId, email, 실제 URL 경로(/api/weddings/42)는 피한다. Micrometer 문서는 URI 태그에 ID를 그대로 넣으면 없는 리소스마다 새 줄이 생기므로 404는 NOT_FOUND 같은 고정 값으로 묶으라고 한다.",
        refs: ["cardinality", "micronaming"],
      },
      {
        title: "공통 태그와 비비디 설정",
        text: "모든 메트릭에 서비스 이름·환경을 붙여 운영·개발을 나눠 본다. 정확한 현재 값은 저장소의 application.yaml을 확인한다.",
        code: `management:
  server:
    port: 8081                                  # 관리 포트 분리
  endpoints:
    web:
      exposure:
        include: health,info,prometheus         # 열 엔드포인트
  metrics:
    tags:                                       # 공통 태그
      service.name: bibbidi-backend
      deployment.environment.name: \${DEPLOYMENT_ENVIRONMENT_NAME:production}`,
        refs: ["metrics"],
      },
    ],
    takeaway:
      "“느리다”를 하나의 평균이 아니라 시간대와 구간별 수치로 바꿔 보자.",
    lab: "metrics",
  },
  {
    id: "trace",
    number: "04",
    title: "MDC와 trace_id로 요청 잇기",
    lead: "여러 로그가 같은 결혼 정보 요청에서 나왔는지 확인한다.",
    tags: ["MDC", "trace_id", "Trace Context"],
    flow: ["HTTP 요청", "traceparent", "현재 span", "MDC 로그"],
    sections: [
      {
        title: "요청 하나의 실마리",
        text: "trace_id는 하나의 분산 트레이스를 식별하고, span_id는 그 안의 작업 구간을 식별한다. W3C traceparent 헤더는 서비스 경계에서 이 문맥을 전달한다. 로그에 같은 trace_id가 있으면 관련 사건을 따라가기 쉬워진다.",
        refs: ["context", "tracing"],
      },
      {
        title: "MDC에 담기는 값",
        text: "MDC는 로깅 문맥의 키와 값을 보관하는 API다. Spring Boot의 추적 연동은 현재 trace ID와 span ID를 로그에 연결할 수 있다. 비동기 작업에서는 문맥 전파가 자동인지 확인해야 한다.",
        refs: ["mdc", "tracing"],
      },
      {
        title: "메트릭과의 관계",
        text: "메트릭은 전체 추세를 보여주고 trace_id는 특정 요청을 가리킨다. 메트릭 라벨에 trace_id를 넣는 방식은 피하고, 이상 시간대를 찾은 뒤 로그와 트레이스를 이어서 본다.",
        refs: ["cardinality", "context", "explore"],
      },
      {
        title: "MDC가 뭔가",
        text: "MDC(Mapped Diagnostic Context)는 로그에 자동으로 붙일 key-value 메모장이다. SLF4J가 제공하고 Logback이 실제로 구현한다. 내부적으로 ThreadLocal이라 스레드마다 따로 있고, Spring MVC는 요청 하나를 스레드 하나가 처리하므로 “스레드의 메모장”이 곧 “요청의 메모장”이 된다. 사람용 로그 패턴에서는 %X{userId}로 꺼내 찍고, 구조화 로그(ECS JSON)는 MDC의 모든 값을 JSON 필드로 자동으로 넣는다. 그래서 비비디는 따로 설정할 것이 없다.",
        code: `MDC.put("userId", "42");          // 넣기
log.info("결혼 정보 저장");             // → 로그에 userId=42 가 자동으로 붙음
MDC.get("userId");                // 꺼내기
MDC.remove("userId");             // 지우기
MDC.clear();                      // 전부 지우기`,
        refs: ["mdc"],
      },
      {
        title: "traceId는 누가 넣나",
        text: "Spring이 자동으로 넣으므로 우리가 MDC.put을 부를 일이 없다. 요청이 도착하면 Micrometer Tracing이 trace_id·span_id를 만들거나 받은 헤더에서 이어받고, MDC에 traceId·spanId를 넣는다. 그래서 요청 안에서 찍은 비비디 로그에는 이 두 값이 항상 있다. Alloy가 이 값을 뽑아 Loki의 메모(structured metadata) trace_id, span_id로 저장하고, Grafana에서 로그를 펼치면 그 옆에 Tempo 버튼이 생긴다.",
        code: `{"log":{"level":"ERROR","logger":"kr.bibbidi.auth.OidcClient"},"message":"token request failed","traceId":"4bf92f3577b34da6a3ce929d0e0e4736","spanId":"00f067aa0ba902b7"}`,
        refs: ["tracing", "lokimetadata"],
      },
      {
        title: "trace_id와 span_id",
        text: "같은 요청에서 찍은 로그는 trace_id가 같고, 어느 구간(예: 카카오 호출 중)에서 찍었느냐에 따라 span_id가 다르다.",
        table: {
          head: ["이름", "뜻", "예"],
          rows: [
            [
              "trace_id",
              "요청 하나 전체의 번호(32자리 16진수)",
              "4bf92f3577b34da6a3ce929d0e0e4736",
            ],
            [
              "span_id",
              "그 요청 안 구간 하나의 번호(16자리)",
              "00f067aa0ba902b7",
            ],
          ],
        },
        refs: ["context"],
      },
      {
        title: "서버를 넘어갈 때: traceparent 헤더",
        text: "우리 서버가 다른 서버를 부를 때 trace_id를 W3C Trace Context 표준 헤더 traceparent에 실어 보낸다. 받는 쪽도 트레이싱을 쓰면 같은 trace_id를 이어서 써서 한 요청으로 묶인다. 주의할 점은 Spring이 만들어 주는 RestClient.Builder, RestTemplateBuilder, WebClient.Builder로 만든 클라이언트만 자동으로 헤더를 붙인다는 것이다. new RestTemplate()처럼 직접 만들면 붙지 않는다.",
        refs: ["context", "tracing"],
      },
      {
        title: "직접 MDC에 값 넣기(선택)",
        text: 'traceId 말고 로그마다 붙이고 싶은 값(예: 로그인한 회원 ID)이 있으면 직접 넣는다. 스레드는 스레드 풀에서 재사용되므로 finally에서 꼭 지운다. 안 지우면 다음 요청(다른 사용자)의 로그에 이전 사용자 ID가 붙는다. 짧은 구간이면 try-with-resources(MDC.putCloseable)로도 쓴다. 넣은 값은 구조화 로그 JSON에 필드로 들어가지만, Loki에서 검색 조건으로 쓰려면 Alloy가 그 필드를 뽑아야 한다(지금은 레벨·로거·trace_id·span_id만 뽑음). 그 전에는 | json | member_id="42"처럼 본문을 풀어서 찾는다. 이메일·이름 같은 개인정보는 넣지 않는다.',
        code: `@Component
class MemberMdcFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        try {
            Long memberId = 현재_로그인한_회원_ID(request);   // 예시
            if (memberId != null) {
                MDC.put("member_id", String.valueOf(memberId));
            }
            chain.doFilter(request, response);
        } finally {
            MDC.remove("member_id");   // 꼭 지우기
        }
    }
}

try (var ignored = MDC.putCloseable("wedding_id", weddingId)) {
    log.info("결혼 정보 처리");     // wedding_id 가 붙음
}                              // 블록이 끝나면 자동으로 지워짐`,
        refs: ["mdc", "logql"],
      },
      {
        title: "MDC가 사라지는 경우: 다른 스레드",
        text: "MDC는 스레드마다 따로라서 일을 다른 스레드에 넘기면 따라가지 않는다. “로그에 Tempo 버튼이 없다”는 대부분 이 경우다. 넘기기 전에 MDC.getCopyOfContextMap()으로 복사해 새 스레드에서 MDC.setContextMap(...)으로 넣고 끝나면 지운다. Spring의 TaskDecorator를 쓰면 한곳에서 처리할 수 있다. 트레이스 자체를 이어 가려면 Micrometer의 컨텍스트 전파 기능을 써야 한다.",
        table: {
          head: ["상황", "결과"],
          rows: [
            ["@Async 메서드", "새 스레드 → traceId가 없을 수 있음"],
            [
              "CompletableFuture.supplyAsync(...), 직접 만든 ExecutorService",
              "새 스레드 → 없음",
            ],
            ["@Scheduled 스케줄러", "요청이 아님 → 처음부터 없음"],
            ["앱 시작·종료 로그", "요청이 아님 → 없음"],
          ],
        },
        refs: ["mdc", "observability"],
      },
    ],
    takeaway:
      "한 요청의 흔적은 trace_id로 모으고, 전체 추세는 메트릭으로 본다.",
    lab: "trace",
  },
  {
    id: "transport",
    number: "05",
    title: "OpenTelemetry와 OTLP",
    lead: "계측 데이터가 어떤 길로 이동하는지 그려 본다.",
    tags: ["OpenTelemetry", "OTLP", "Collector"],
    flow: ["계측", "OTLP", "Alloy", "저장소"],
    sections: [
      {
        title: "표준의 역할",
        text: "OpenTelemetry는 트레이스·메트릭·로그의 계측과 전송에 쓰는 API, SDK, 도구를 제공한다. OTLP는 그 데이터를 옮기는 프로토콜이다. 계측 도구와 저장소는 별도로 고른다.",
        refs: ["otel", "otlp"],
      },
      {
        title: "비비디의 예시 경로",
        text: "실습 결혼 서비스는 트레이스를 OTLP로 수집기에 보낸다고 가정한다. 수집기는 데이터를 받아 처리한 뒤 Tempo로 넘긴다. 메트릭은 Actuator 엔드포인트를 스크레이프하고 로그는 컨테이너 출력에서 수집하는 별도 경로로 그린다.",
        refs: ["otlp", "alloy", "metrics"],
      },
      {
        title: "전송이 끊기면",
        text: "계측이 됐다는 사실만으로 저장됐다고 단정할 수 없다. 앱의 내보내기 주소, 수집기의 수신기와 다음 단계, 저장소의 수신 상태를 차례로 확인한다.",
        refs: ["collector", "alloypipe"],
      },
      {
        title: "없으면 뭐가 불편한가",
        text: "트레이싱 도구는 Jaeger, Zipkin, Datadog, New Relic처럼 많고, 예전에는 도구마다 앱에 넣는 라이브러리·데이터 형식·보내는 방법이 달랐다. 저장소를 Zipkin에서 Tempo로 바꾸면 앱 코드와 의존성을 바꿔야 했다. 같은 “HTTP 메서드”를 도구마다 http.method, httpMethod, method로 달리 불러 대시보드·쿼리를 다시 만들어야 했다. JDBC 표준 덕분에 DB를 MySQL에서 PostgreSQL로 바꿔도 코드가 거의 그대로인 것처럼, OTel로 만들어 OTLP로 보내면 받는 쪽이 바뀌어도 앱은 그대로다.",
        refs: ["otel"],
      },
      {
        title: "OpenTelemetry를 이루는 것",
        text: "OTel은 저장소·화면이 아니다. 저장은 Tempo·Prometheus·Loki, 화면은 Grafana가 한다. 다루는 신호는 Traces, Metrics, Logs(+ Baggage, Profiles)다.",
        table: {
          head: ["구성", "뜻", "비비디에서"],
          rows: [
            [
              "API·SDK",
              "언어별 라이브러리. 트레이스·메트릭·로그를 만듦",
              "Spring이 Micrometer를 통해 OTel SDK를 씀",
            ],
            [
              "시맨틱 컨벤션",
              "속성 이름 규칙(http.request.method, http.response.status_code, service.name 등)",
              "트레이스 속성, nginx 접근 로그 필드 이름",
            ],
            ["OTLP", "데이터를 보내는 규약", "Spring → Alloy → Tempo"],
            [
              "Collector",
              "받아서 가공·전달하는 중간 프로그램",
              "Alloy(OTel Collector 배포판)",
            ],
          ],
        },
        refs: ["otel", "semconv", "collector"],
      },
      {
        title: "리소스 속성: 이 데이터는 누가 만들었나",
        text: "모든 데이터에 붙는 출처 정보다. 비비디는 환경 변수 하나로 준다. 이 이름들이 시맨틱 컨벤션이라 Tempo·Grafana가 서비스 이름이 어디 있는지 알아서 찾는다. TraceQL의 resource.service.name, resource.deployment.environment.name이 바로 이 값이다.",
        code: `# BE/compose.prod.yml (backend 일부)
environment:
  OTEL_RESOURCE_ATTRIBUTES: service.name=bibbidi-backend,service.version=1.0.0,service.instance.id=bibbidi-backend-prod,deployment.environment.name=production`,
        table: {
          head: ["속성", "뜻"],
          rows: [
            ["service.name", "서비스 이름"],
            ["service.version", "버전"],
            ["service.instance.id", "인스턴스(서버·컨테이너 구분)"],
            ["deployment.environment.name", "환경(production / development)"],
          ],
        },
        refs: ["semconv"],
      },
      {
        title: "OTLP의 두 방식",
        text: "내용물은 Protocol Buffers(바이너리) 형식이고, 압축은 gzip 또는 없음이다. 비비디는 nginx 뒤에서 일반 HTTPS로 다루기 쉬워 HTTP(4318)만 쓴다. 경로는 Spring이 http://alloy:4318/v1/traces로 보내면 Alloy(otelcol.receiver.otlp :4318)가 받아 Bearer 토큰과 함께 https://monitoring.bibbidi.kr/tempo/v1/traces로 보내고, 모니터링 서버 nginx를 거쳐 Tempo :4318에 닿는다.",
        table: {
          head: ["방식", "기본 포트", "특징"],
          rows: [
            ["OTLP/gRPC", "4317", "gRPC(HTTP/2)"],
            [
              "OTLP/HTTP",
              "4318",
              "일반 HTTP POST. 경로 /v1/traces, /v1/metrics, /v1/logs",
            ],
          ],
        },
        refs: ["otlp", "otlpreceiver"],
      },
      {
        title: "Spring에서는 어떻게 쓰나",
        text: "Spring은 트레이싱도 Micrometer로 감싼다(Micrometer Tracing = 트레이싱계의 SLF4J). 실제 일은 OpenTelemetry가 하고 micrometer-tracing-bridge-otel이 둘을 잇는다. Spring Boot 4에서는 스타터 하나로 된다. 그러면 Spring이 요청마다 자동으로 트레이스·스팬을 만들고(컨트롤러 요청, Spring 빌더로 만든 HTTP 클라이언트 호출 등), traceId·spanId를 MDC에 넣고, OTLP로 보낸다.",
        code: `implementation 'org.springframework.boot:spring-boot-starter-opentelemetry'`,
        refs: ["tracing"],
      },
      {
        title: "샘플링과 보낼 곳",
        text: "샘플링은 요청 중 몇 %를 트레이스로 남길지다. Spring Boot 기본은 10%라서 그대로 두면 요청 10개 중 1개만 남는다. 비비디는 트래픽이 적고 Tempo가 트레이스로 응답 시간 숫자를 만들기 때문에 100%(1.0)다. endpoint는 같은 Docker 네트워크의 Alloy다. 설정 키 이름은 Spring Boot 버전마다 다를 수 있으니 저장소의 application.yaml을 확인한다.",
        code: `management:
  tracing:
    sampling:
      probability: 1.0        # 기본값은 0.1 (10%)! 비비디는 100% 저장
  opentelemetry:
    tracing:
      export:
        otlp:
          endpoint: \${OTEL_EXPORTER_OTLP_ENDPOINT:http://alloy:4318}/v1/traces`,
        refs: ["tracing"],
      },
      {
        title: "내가 직접 구간 만들기(선택)",
        text: "Spring이 자동으로 잡지 않는 내부 작업을 트레이스에 구간으로 보이고 싶을 때 쓴다. Observation 하나로 스팬과 메트릭(Timer)이 함께 만들어진다. 키 값에는 종류가 적은 것만 넣는다.",
        code: `@Component
class ChecklistGenerator {
    private final ObservationRegistry registry;

    ChecklistGenerator(ObservationRegistry registry) { this.registry = registry; }

    void generate(Long weddingId) {
        Observation.createNotStarted("checklist.generate", registry)
                .lowCardinalityKeyValue("type", "default")   // 값 종류가 적은 것만
                .observe(() -> {
                    // 실제 작업
                });
    }
}`,
        refs: ["observability"],
      },
      {
        title: "보내는 방식 비교: pull과 push",
        text: "비비디는 세 데이터를 서로 다른 방식으로 모은다. 앱 서버 안에서는 섞어 쓰고, 앱 서버 → 모니터링 서버 구간은 Alloy가 전부 push한다. 그래서 모니터링 서버가 앱 서버로 접속할 필요가 없다. pull은 앱이 보낼 곳을 몰라도 되고 못 가져가면 죽었다는 것을 바로 알지만(up=0) 가져가는 쪽이 앱 주소를 알아야 한다. push는 짧게 끝나는 작업도 보낼 수 있고 앱이 방화벽 안에 있어도 되지만 보낼 곳 주소·인증을 앱이 알아야 한다.",
        table: {
          head: ["데이터", "방식", "누가 움직이나", "형식"],
          rows: [
            [
              "메트릭",
              "pull(가져가기)",
              "Alloy가 15초마다 /actuator/prometheus를 읽어 감",
              "Prometheus 형식",
            ],
            [
              "트레이스",
              "push(보내기)",
              "Spring이 요청마다 Alloy로 보냄",
              "OTLP",
            ],
            [
              "로그",
              "읽어 가기",
              "Alloy가 Docker 콘솔 출력을 읽어 감",
              "ECS JSON",
            ],
          ],
        },
        refs: ["prom", "otlp", "alloy"],
      },
    ],
    takeaway:
      "데이터 생성, 전송, 저장을 나누어 확인하면 빈 화면의 원인을 좁힐 수 있다.",
    lab: "transport",
  },
  {
    id: "stack",
    number: "06",
    title: "모으고, 나눠 담고, 한 화면에서 보기",
    lead: "Alloy가 모으고, Prometheus·Loki·Tempo가 나눠 담고, Grafana에서 함께 살펴본다.",
    tags: ["Alloy", "Prometheus", "Loki", "Tempo", "Grafana"],
    flow: ["결혼 서비스", "Alloy", "Prometheus · Loki · Tempo", "Grafana"],
    sections: [
      {
        group: "Alloy: 수집과 전달",
        title: "Alloy: 수집과 전달",
        text: "Alloy는 컴포넌트를 이어 파이프라인을 만든다. 메트릭을 스크레이프하고, 로그를 읽고, OTLP 트레이스를 받을 수 있다. 수집기를 한곳에 둘지 서비스 가까이에 둘지는 네트워크와 운영 방식에 따라 정한다.",
        refs: ["alloy", "alloypipe"],
      },
      {
        group: "Alloy: 수집과 전달",
        title: "Alloy 깊이 읽기: 끊긴 단계 찾기",
        text: "각 컴포넌트의 출력이 다음 컴포넌트의 입력으로 이어진다. 데이터가 없다면 발견한 대상, 수집 결과, 처리 단계, 최종 쓰기 단계를 순서대로 확인한다. 파이프라인을 여러 갈래로 만들 수 있으므로 한 신호가 성공했다고 다른 신호까지 성공했다고 볼 수는 없다.",
        refs: ["alloypipe", "alloy"],
      },
      {
        group: "Alloy: 수집과 전달",
        title: "Alloy가 없으면",
        text: "Spring이 Loki·Prometheus·Tempo로 직접 보낼 수도 있다. 그러면 앱이 모니터링 서버 주소와 비밀 토큰을 알아야 해서 주소가 바뀌면 앱을 다시 배포해야 한다. 비밀번호 가리기, DEBUG 로그 버리기 같은 처리도 앱 코드에서 해야 한다. 무엇보다 nginx 로그는 Spring이 보낼 수 없다. Alloy를 앱 옆에 두면 이 일을 한곳에서 처리하고, 앱은 로그를 콘솔에 찍고, 숫자 판을 열어 두고, 트레이스를 옆 Alloy에게 넘기기만 하면 된다.",
        table: {
          head: ["", "어디서", "어떻게 받나", "어디로"],
          rows: [
            ["① 로그", "Spring·nginx의 콘솔 출력", "Alloy가 읽어 감", "Loki"],
            [
              "② 숫자",
              "Spring의 /actuator/prometheus",
              "Alloy가 15초마다 가져감",
              "Prometheus",
            ],
            ["③ 트레이스", "Spring", "Spring이 보내 줌", "Tempo"],
          ],
        },
        refs: ["alloy", "alloywhy"],
      },
      {
        group: "Alloy: 수집과 전달",
        title: "모니터링 서버로 보내는 길",
        text: "셋 다 https://monitoring.bibbidi.kr로 보내고 같은 비밀 토큰을 붙인다. 토큰을 확인하는 것은 모니터링 서버 앞의 nginx(리버스 프록시)이고, 토큰이 틀리면 거절한다. 비비디는 앱 서버마다 Alloy를 띄우는 edge 방식이다. 데이터 원천 가까이 두는 edge, 중앙에서 모아 받는 gateway, edge에서 거르고 gateway로 모으는 hybrid 배포가 있다.",
        refs: ["alloyhow"],
      },
      {
        group: "Alloy: 수집과 전달",
        title: "로그 한 줄이 Alloy를 지나가는 길",
        text: 'OidcClient에서 log.error("token request failed, Authorization={}", "Bearer eyJhbGciOi...")를 찍었다고 하자. 가리는 값은 access_token, refresh_token, authorization, cookie, password, passwd, Bearer ..., Basic ...이다. 가려 준다고 비밀번호를 찍어도 되는 것은 아니며, 규칙에 없는 이름(예: secret=...)은 그대로 나간다.',
        table: {
          head: ["단계", "무슨 일이 일어나나", "결과"],
          rows: [
            [
              "0",
              "Spring이 JSON 한 줄로 콘솔에 찍음",
              '{"log":{"level":"ERROR",...},"message":"token request failed, Authorization=Bearer eyJ...","traceId":"4bf9..."}',
            ],
            ["1", "Docker가 이 줄을 파일에 모아 둠", ""],
            [
              "2",
              "Alloy가 Docker에게 새 로그를 받아 읽어 감",
              '이름표가 붙음: service_name="bibbidi-backend", deployment_environment_name="production"',
            ],
            [
              "3",
              "JSON을 풀어 레벨·로거 이름·trace_id를 뽑음",
              "레벨 ERROR, 로거 ...OidcClient, trace_id 4bf9...",
            ],
            ["4", "레벨이 TRACE·DEBUG면 여기서 버림", "이 줄은 ERROR라 통과"],
            [
              "5",
              "비밀 값을 가림",
              "Authorization=Bearer eyJ... → Authorization=[REDACTED]",
            ],
            ["6", "모니터링 서버로 보냄", "Loki에 저장"],
          ],
        },
        refs: ["alloylokiprocess"],
      },
      {
        group: "Alloy: 수집과 전달",
        title: "설정 파일 읽는 법",
        text: '설정 파일은 Infra/monitoring/grafana/alloy/config.alloy다. 규칙은 두 개다. 블록 하나가 일 하나이고(prometheus.scrape는 일의 종류, "bibbidi_backend"는 우리가 붙인 이름, 중괄호 안은 설정), forward_to로 다음 일에 넘겨 컨베이어 벨트처럼 잇는다. 로그 쪽은 discovery.docker → loki.source.docker → loki.process → loki.write로 이어진다. 이름 앞부분 loki.은 로그, prometheus.는 숫자, otelcol.은 트레이스다. sys.env("이름")은 환경 변수 읽기로, Spring의 \${...}와 같은 역할이다.',
        code: `prometheus.scrape "bibbidi_backend" {     // 일의 종류 "내가 붙인 이름"
  targets         = [{ __address__ = "backend:8081" }]   // 어디서
  metrics_path    = "/actuator/prometheus"               // 어느 주소를
  scrape_interval = "15s"                                // 얼마마다
  forward_to      = [prometheus.remote_write.monitoring.receiver]  // 가져온 걸 누구에게 넘길지
}`,
        table: {
          head: ["이름", "하는 일"],
          rows: [
            ["discovery.docker", "서버에 떠 있는 컨테이너 목록 찾기"],
            [
              "discovery.relabel",
              "이름표 고쳐 쓰기(예: /bibbidi-backend → bibbidi-backend)",
            ],
            ["loki.source.docker", "컨테이너 로그 읽기"],
            ["loki.process", "로그 가공(JSON 풀기, 버리기, 가리기)"],
            ["loki.write", "로그 보내기"],
            ["prometheus.scrape", "숫자 가져오기"],
            ["prometheus.remote_write", "숫자 보내기"],
            [
              "otelcol.receiver.otlp",
              "트레이스 받기(Spring이 alloy:4318로 보냄)",
            ],
            ["otelcol.processor.batch", "트레이스를 모아서 한 번에 보내기"],
            ["otelcol.exporter.otlphttp", "트레이스 보내기"],
          ],
        },
        refs: ["alloypipe", "alloysyntax"],
      },
      {
        group: "Alloy: 수집과 전달",
        title: "꼭 알아야 할 네 가지",
        text: '첫째, Alloy가 TRACE·DEBUG를 버리므로 log.debug()로 찍은 것은 Grafana에 없다. 운영에서 볼 것은 info 이상으로 찍는다. 둘째, Grafana 검색에 쓰는 service_name, deployment_environment_name 같은 이름표와 운영·개발 구분(production / development)은 Alloy 설정에서 붙는다. 그래서 이름표를 바꾸면 기존 검색·대시보드·알림 쿼리가 결과 없음이 될 수 있다. 셋째, 숫자는 Alloy가 15초마다 관리용 포트(8081)로 가지러 가고, 못 읽으면 up이 0이 되어 알림 C2 “backend 수집 실패”가 울린다. 넷째, 환경 변수가 없으면 Alloy는 에러 없이 빈 값을 쓴다(예: deployment_environment_name=""). 설정을 바꾼 뒤에는 Grafana에서 데이터가 실제로 들어오는지 꼭 확인한다.',
        refs: ["alloypipe", "alloystdlib"],
      },
      {
        group: "Alloy: 수집과 전달",
        title: "깊이 읽기: 왜 수집기 하나인가",
        text: "공식 문서는 Alloy를 OTel Collector 배포판이라고 부른다. Prometheus 파이프라인을 내장하고 Loki·Pyroscope를 네이티브로 지원한다. 수집(scrape, OTLP 수신, 로그 tail, 서비스 디스커버리), 처리(필터링, 마스킹, 라벨 추가, 샘플링, 형식 변환, 라우팅), 전달(여러 곳 동시 가능)을 한다. 문서가 말하는 문제는 collector sprawl이다. 신호마다 수집기가 따로면 설정 문법·배포 방식·장애 양상이 다르고 CPU·메모리도 더 쓴다. 문서가 밝히는 한계도 있다. 메트릭 scrape만 필요하면 Prometheus Agent가 더 단순할 수 있다.",
        table: {
          head: ["이전 도구", "상태"],
          rows: [
            [
              "Grafana Agent",
              "2025-11-01 지원 종료(EOL). 보안·버그 수정도 없음. Alloy로 이전 안내",
            ],
            [
              "Promtail",
              "2026-03-02 지원 종료(EOL). Alloy로 이전 안내(alloy convert --source-format=promtail)",
            ],
            [
              "Grafana Agent Flow",
              "Alloy와 같은 설정 문법. 일부 기능 제거, 메트릭 접두사 agent_ → alloy_",
            ],
          ],
        },
        refs: ["alloywhy", "agent", "promtailmigrate"],
      },
      {
        group: "Alloy: 수집과 전달",
        title: "깊이 읽기: 컴포넌트와 컨트롤러",
        text: "컴포넌트는 한 가지 일만 하는 블록이고, 이름 + 라벨 조합은 설정 전체에서 유일해야 한다. Arguments는 블록에 적는 입력, Exports는 실행 중에 내놓는 출력이다. 한 컴포넌트의 argument가 다른 컴포넌트의 export를 참조하면 연결되며(값 참조 password = local.file.api_key.content, 흐름 연결 forward_to), 참조 관계는 DAG를 이룬다. 자기·순환 참조는 오류다. 컨트롤러는 의존 대상을 먼저 평가하고, export가 바뀌면 참조하는 컴포넌트만 연쇄적으로 재평가한다. health는 Unknown, Healthy, Unhealthy, Exited 4종이다. 평가에 실패하면 unhealthy로 표시하고 마지막 정상 설정으로 계속 돈다. /-/reload나 SIGHUP으로 리로드하며, 처음 시작할 때 설정 오류면 바로 종료하지만 리로드 실패 시에는 이전 설정으로 계속 실행해 실패가 눈에 잘 띄지 않는다.",
        refs: ["alloycontroller"],
      },
      {
        group: "Alloy: 수집과 전달",
        title: "깊이 읽기: 설정 문법과 타입",
        text: '선언형이라 블록 순서는 상관없다. Attribute는 이름 = 값, Block은 이름 { } 또는 이름 "라벨" { }(라벨은 반드시 큰따옴표)이다. 식별자는 문자·숫자·_만 쓰고 숫자로 시작할 수 없어 my-component, my.component는 안 된다. 참조 형식은 <컴포넌트이름>.<라벨>.<export이름>이다. 타입은 number, string, raw string(백틱), bool, array, object, null, duration("100ms", "1h30m"), secret(UI에 가려지고 secret → string은 convert.nonsensitive로만), capsule(같은 capsule끼리만 연결)이다. 그래서 prometheus.remote_write의 receiver를 로그 컴포넌트에 연결하면 설정 오류가 난다. 없는 키를 [ ]로 읽으면 null, .으로 읽으면 오류다. sys.env("NAME")은 없으면 빈 문자열을 돌려주므로 coalesce(sys.env("DOES_NOT_EXIST"), "c") → "c" 같은 기본값 패턴을 쓴다.',
        refs: ["alloysyntax", "alloystdlib"],
      },
      {
        group: "Alloy: 수집과 전달",
        title: "깊이 읽기: 계열마다 다른 연결 방향",
        text: "otelcol은 방향이 반대라서 output 블록에 연결하지 않은 신호는 조용히 버려진다(by default telemetry is dropped). 형식이 다르면 변환 컴포넌트를 거친다. otelcol.exporter.prometheus(v1.19)는 OTel 메트릭을 Prometheus 샘플로 바꾸며 service.name → job, service.instance.id → instance, 리소스 속성 → target_info 메트릭이 되고, delta 메트릭은 버려진다(필요하면 otelcol.processor.deltatocumulative 먼저). otelcol.exporter.loki(v1.19)는 OTel 로그를 Loki 엔트리로 바꾸며 속성은 힌트로 지정해야 라벨이 된다.",
        table: {
          head: ["계열", "다루는 것", "연결 방법"],
          rows: [
            [
              "discovery.*",
              "수집 대상 목록(targets)",
              "소비자의 targets 인자에 export를 넣음",
            ],
            [
              "prometheus.*",
              "Prometheus 샘플",
              "보내는 쪽 forward_to = [받는쪽.receiver]",
            ],
            [
              "loki.*",
              "Loki 로그 엔트리",
              "보내는 쪽 forward_to = [받는쪽.receiver]",
            ],
            [
              "otelcol.*",
              "OTel 데이터",
              "보내는 쪽 output { traces = [받는쪽.input] }",
            ],
          ],
        },
        refs: ["alloyotel", "alloylgtm"],
      },
      {
        group: "Alloy: 수집과 전달",
        title: "깊이 읽기: 자주 쓰는 컴포넌트의 기본값",
        text: '설정에서 값을 생략하면 아래 기본값이 쓰인다. prometheus.scrape는 scrape 후 job, instance 라벨과 대상마다 up(성공 1, 실패 0)을 만든다. prometheus.remote_write는 샘플을 WAL(로컬 디스크 기록, 기본 storage path data-alloy/, 세그먼트 128MB, truncate_frequency "2h")에 먼저 쌓는다. 전송이 오래 막혀 체크포인트된 데이터는 유실되고, wal 디렉터리를 지우면 못 보낸 데이터가 사라진다. loki.source.docker는 positions(어디까지 읽었는지)를 storage path에 저장해 재시작 후 이어서 읽는다. loki.process는 stage를 적힌 순서대로 실행하며, stage.drop 조건은 AND라 OR이 필요하면 블록을 나눈다. stage.timestamp가 없으면 받은 시각을 쓰고, 버려진 줄 수는 loki_process_dropped_lines_total이다. loki.write는 4xx 중 429만 재시도하고 __로 시작하는 라벨을 지운다. otelcol.processor.batch의 send_batch_size는 보내기 시작하는 기준이며, 문서는 모든 Alloy에 batch를 두되 샘플링·memory_limiter 뒤에 두라고 권한다.',
        table: {
          head: ["컴포넌트", "기본값"],
          rows: [
            [
              "prometheus.scrape",
              'scrape_interval "60s", scrape_timeout "10s", metrics_path "/metrics", honor_labels false, honor_timestamps true, job_name = 컴포넌트 이름',
            ],
            [
              "prometheus.remote_write",
              'remote_timeout "30s", enable_http2 false, capacity 10000, max_samples_per_send 2000, batch_send_deadline "5s", min_shards 1, max_shards 50, min_backoff "30ms", max_backoff "5s", retry_on_http_429 true',
            ],
            ["discovery.docker", 'refresh_interval "1m"'],
            [
              "discovery.relabel",
              'action "replace", regex "(.*)", replacement "$1", separator ";"',
            ],
            ["loki.source.docker", 'refresh_interval "60s"'],
            [
              "loki.write",
              'batch_size "1MiB", batch_wait "1s", remote_timeout "10s", min_backoff_period "500ms", max_backoff_period "5m", max_backoff_retries 10, WAL은 experimental·기본 꺼짐',
            ],
            [
              "otelcol.receiver.otlp",
              "gRPC 0.0.0.0:4317, HTTP 0.0.0.0:4318, 요청 본문 최대 20MiB, output 블록 필수",
            ],
            [
              "otelcol.processor.batch",
              'timeout "200ms", send_batch_size 2000, send_batch_max_size 3000',
            ],
            [
              "otelcol.exporter.otlphttp (v1.19)",
              'compression "gzip", timeout "30s", sending_queue queue_size 1000·num_consumers 10, retry initial "5s"·max "30s"·max_elapsed "5m"',
            ],
            [
              "otelcol.auth.bearer (v1.19)",
              'scheme "Bearer", header "Authorization", token(secret) 필수',
            ],
          ],
        },
        refs: [
          "alloyscrape",
          "alloyremotewrite",
          "alloylokiprocess",
          "alloylokiwrite",
          "alloybatch",
        ],
      },
      {
        group: "Alloy: 수집과 전달",
        title: "깊이 읽기: relabel과 __ 라벨",
        text: "__로 시작하는 라벨은 내부용이라 수집 전에 지워질 수 있다. prometheus.scrape는 __address__·__scheme__·__metrics_path__로 요청을 만든 뒤 지우고, loki.write는 보내기 전에 지운다. __meta_docker_container_name 같은 값을 남기려면 relabel로 일반 라벨에 옮기고, 임시값은 __tmp 접두사를 쓴다. 확인 필요: relabel 정규식이 전체 일치(앵커)인지는 Alloy 문서에 적혀 있지 않다.",
        code: `discovery.relabel "containers" {
  targets = []
  rule {
    source_labels = ["__meta_docker_container_name"]
    regex         = "/(.*)"
    target_label  = "service_name"
  }
}`,
        refs: ["alloypipe"],
      },
      {
        group: "Alloy: 수집과 전달",
        title: "깊이 읽기: 디버깅과 운영",
        text: "내장 UI 기본 주소는 http://localhost:12345인데, --server.http.listen-addr 기본값이 127.0.0.1:12345라서 컨테이너에서는 0.0.0.0:12345를 줘야 밖에서 열린다. Live debugging은 기본 꺼짐이며 livedebugging { enabled = true }로 켜고, 켜 두는 동안은 TLS를 권한다. HTTP 엔드포인트는 /metrics(자체 메트릭), /-/ready(준비 전 503), /-/healthy(unhealthy 컴포넌트가 있으면 500, Kubernetes liveness probe로 쓰지 말라는 경고), /-/reload(실패 시 400)다. 문서의 리소스 추정 시작점은 메트릭 활성 시리즈 100만 개당 CPU 약 0.4코어·메모리 약 11GiB, 로그 1MiB/s당 CPU 약 1코어·메모리 약 120MiB이며 트레이스는 수치가 없다.",
        code: `alloy fmt [-w] [-t] <파일>   # 형식 정리. -t 는 고칠 게 있으면 0 이 아닌 값으로 종료
alloy validate <경로>       # 문법·없는 컴포넌트·이름 충돌·필수 속성 누락 검사 (limited in scope)
alloy run                   # --storage.path 기본 data-alloy/, 디렉터리면 *.alloy 를 합침
alloy convert               # Promtail·Prometheus·Static 설정을 Alloy 문법으로 (best-effort)`,
        refs: ["alloydebug", "alloycli", "alloyresource"],
      },
      {
        group: "Alloy: 수집과 전달",
        title: "깊이 읽기: 비비디 설정과 비교해 확인할 것",
        text: 'prometheus.scrape 기본 주기는 60초인데 비비디는 15s로 명시한다. otelcol.processor.batch 기본은 200ms·2000개이고 비비디 문서에는 “5초 또는 512개”로 적혀 있다. DEPLOYMENT_ENVIRONMENT_NAME이 비면 deployment_environment_name=""으로 조용히 들어가므로 coalesce 기본값을 검토한다. Alloy 컨테이너의 storage path(WAL·positions) 볼륨 마운트 여부와 내장 UI(12345) 노출 여부도 확인한다. WAL과 positions를 컨테이너 재생성 후에도 유지하려면 그 경로를 볼륨으로 둬야 할 것으로 보인다(문서 명시 X, 추론). 하위 호환은 GA 기능만 보장되며, 예를 들어 v1.11에서 Prometheus 3.x 반영으로 enable_http2 기본값이 false가 되고 le 라벨 값이 정규화됐다(le="1" → le="1.0").',
        refs: ["alloyscrape", "alloybatch"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "Prometheus: 메트릭",
        text: "Prometheus는 라벨이 붙은 시계열을 저장하고 PromQL로 조회한다. rate는 누적 카운터의 변화율을 볼 때 쓰고, histogram_quantile은 히스토그램 버킷에서 분위수를 추정한다.",
        refs: ["prom", "promql", "histogram"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "Prometheus 깊이 읽기: 그래프가 비었을 때",
        text: "PromQL에서 결과가 없다는 것은 관측값이 없다는 뜻이지 0이라는 뜻이 아니다. 대상이 실제로 수집됐는지, 쿼리의 메트릭 이름과 라벨이 맞는지, 시간 범위가 너무 좁지 않은지 확인한다. 카운터의 순간값보다 rate나 increase로 구간 변화를 읽는다.",
        refs: ["promql", "prom"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "숫자 전용 창고가 필요한 이유",
        text: "“지금 1초에 요청이 몇 개 들어와?”를 로그로 답하려면 매번 줄을 세야 하고, 어제 같은 시간과 비교하기는 거의 불가능하다. 메모리 사용량처럼 로그로 찍지 않는 값은 아예 알 수 없고, 그렇다고 힙 사용량을 15초마다 로그로 찍는 것은 낭비다. Spring은 /actuator/prometheus에 지금 이 순간의 값만 걸어 두므로, Alloy가 15초마다 읽고 Prometheus가 시간별로 적어 둬야 그래프가 된다. 비비디 Prometheus는 30일 보관한다.",
        code: 'docker logs bibbidi-backend --since 1m | grep "요청 처리" | wc -l',
        refs: ["prom"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "숫자 한 줄 읽는 법",
        text: '이름은 무엇을 셌나, 이름표(라벨)는 어떤 것을 셌나, 값은 지금까지 몇 개다. 이름 + 이름표 조합이 다르면 다른 줄이며, 이렇게 따로 세는 줄 하나를 시계열이라 부른다. Alloy가 보낼 때 deployment_environment_name="production" 같은 이름표를 더 붙인다.',
        code: `http_server_requests_seconds_count{method="GET", status="500", uri="/api/weddings/{id}"}  12
└──────────── 이름 ─────────────┘└─────────────── 이름표(라벨) ─────────────────────┘ 값`,
        refs: ["promdatamodel"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "숫자는 세 종류",
        text: "Counter는 늘어나기만 하고 앱이 재시작하면 0부터 다시 센다. 그대로 그리면 계속 올라가는 선이라 increase나 rate로 바꿔 본다. Gauge는 오르내리는 현재값이라 그대로 그린다. Histogram은 응답 시간을 0.1초 이하·0.5초 이하처럼 칸별로 세며, 이것으로 p95(요청 100개를 빠른 순으로 세웠을 때 95번째 시간)를 계산한다. 평균은 아주 느린 요청이 묻혀 보이지 않아 p95를 쓴다. 비비디의 API p95는 Spring이 아니라 Tempo가 트레이스를 세서 만든 traces_spanmetrics_latency_bucket으로 계산한다.",
        code: `increase(http_server_requests_seconds_count{status="500"}[5m])   # 최근 5분 동안 생긴 500 응답 수
rate(http_server_requests_seconds_count[5m])                      # 최근 5분 평균, 1초에 몇 개`,
        refs: ["promtypes", "histogram"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "비비디가 자주 보는 숫자",
        text: "",
        table: {
          head: ["숫자 이름", "뜻", "종류"],
          rows: [
            [
              "up",
              "Alloy가 Spring 숫자 페이지를 읽을 수 있나(1 = 됨, 0 = 안 됨)",
              "-",
            ],
            [
              "http_server_requests_seconds_count",
              "API 요청 수(status, uri 이름표)",
              "늘어나기만",
            ],
            [
              "hikaricp_connections_active / _idle / _pending / _max",
              "DB 커넥션: 사용 중 / 쉬는 중 / 기다리는 요청 / 최대",
              "오르내림",
            ],
            [
              "jvm_memory_used_bytes / jvm_memory_max_bytes",
              "힙 사용량 / 최대",
              "오르내림",
            ],
            [
              "jvm_gc_live_data_size_bytes",
              "GC 후에도 남아 있는 데이터 크기(계속 오르면 메모리 누수 의심)",
              "오르내림",
            ],
            ["jvm_gc_pause_seconds_*", "GC 때문에 앱이 멈춘 시간", "Histogram"],
            [
              "disk_free_bytes / disk_total_bytes",
              "앱 서버 디스크 남은 양 / 전체",
              "오르내림",
            ],
            [
              "traces_spanmetrics_latency_bucket",
              "API 응답 시간(Tempo가 만듦)",
              "Histogram",
            ],
          ],
        },
        refs: ["metrics"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "PromQL 기초: 다섯 단계",
        text: "PromQL은 Prometheus에서 숫자를 꺼내는 검색어로, SQL의 SELECT처럼 생각하면 된다. 이름으로 고르고, 이름표로 좁히고(= 같다, != 다르다, =~ 정규식에 맞다, !~ 정규식에 안 맞다), 늘어나기만 하는 숫자는 increase·rate로 바꾸고([5m] = 최근 5분 치), sum·sum by (uri)·topk(10, ...)로 합친다(SQL의 SUM + GROUP BY). p95는 칸별 숫자를 rate로 바꾸고 → 칸(le)별로 더하고 → 95% 지점을 계산한다. 처음에는 그대로 복사해 이름표만 바꿔 쓰면 된다. 쿼리 입력칸 옆 Builder를 누르면 메뉴에서 골라 만들 수도 있다.",
        code: `up
http_server_requests_seconds_count{deployment_environment_name="production", status=~"5.."}
increase(http_server_requests_seconds_count{status=~"5.."}[5m])
sum by (uri) (rate(http_server_requests_seconds_count{deployment_environment_name="production"}[5m]))
histogram_quantile(0.95, sum by (le) (rate(traces_spanmetrics_latency_bucket{deployment_environment_name="production", span_kind="SPAN_KIND_SERVER"}[5m])))`,
        refs: ["promql"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "꼭 알아야 할 세 가지",
        text: "첫째, 결과 없음은 0이 아니다. 5분 동안 500 에러가 없으면 그 줄 자체가 없어 빈 결과가 나오고, 그래프가 비거나 알림이 “데이터 없음”으로 빠진다. 그래서 뒤에 or vector(0)을 붙인다. 둘째, 이름표에 값이 끝없이 늘어나는 것을 넣으면 안 된다. userId를 넣으면 사용자 수만큼 줄이 생겨 모니터링 서버(메모리 2GB)가 버티지 못한다. 그래서 Alloy는 한 번에 5,000줄이 넘으면 수집을 포기하도록 막아 뒀다(sample_limit = 5000). 셋째, 숫자는 30일만 보관하며 30일이 지나거나 8GB를 넘으면 오래된 것부터 지운다. 정확한 과금·통계용이 아니라 “지금 괜찮은가”를 보는 용도다.",
        code: 'sum(increase(http_server_requests_seconds_count{status=~"5.."}[5m])) or vector(0)',
        refs: ["promql", "cardinality", "promstorage"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "깊이 읽기: Prometheus의 생태계",
        text: "2012년 SoundCloud에서 시작해 2016년 Kubernetes 다음으로 CNCF에 합류한 모니터링·알림 툴킷이다. 메트릭 이름 + 라벨로 시계열을 구분하고, 분산 저장소 없이 서버 하나가 독립적으로 동작하며, 기본 수집은 HTTP pull이다. 서버(scrape·저장), 클라이언트 라이브러리(Spring은 Micrometer), exporter(HAProxy·MySQL처럼 직접 계측할 수 없는 시스템), Pushgateway(금방 끝나는 배치), Alertmanager(비비디는 Grafana Alerting을 써서 사용하지 않음)로 이뤄진다. FAQ는 pull이 모니터링 서버를 더 띄우기 쉽고, 대상이 죽었는지 더 확실히 알며(up 0), /metrics를 브라우저로 직접 열 수 있어 낫다고 하면서도 “약간 더 나을 뿐 큰 요점은 아니다”라고 말한다. 순수한 숫자 시계열에는 잘 맞지만, 요청 단위 과금처럼 100% 정확도가 필요한 곳에는 맞지 않는다.",
        refs: ["promarch", "promfaq"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "깊이 읽기: 데이터 모델과 이름 규칙",
        text: "메트릭 이름 + 라벨 집합이 시계열 하나를 식별하고, 라벨 값이 하나라도 다르면 다른 시계열이다. 메트릭 이름은 내부적으로 __name__ 라벨이다. 샘플은 값(float64 또는 native histogram) 하나와 밀리초 타임스탬프 하나다. 3.x는 메트릭 이름에 UTF-8을 모두 허용하지만 호환을 위해 [a-zA-Z_:][a-zA-Z0-9_:]*를 권장하고, 벗어나면 PromQL에서 따옴표가 필요하다. 콜론은 recording rule용으로 예약돼 있다. 라벨 이름의 __ 접두사는 내부용이며, 빈 값 라벨은 라벨이 없는 것과 같다. 3.x 기본 이름 검증은 utf8이고, 2.x 방식은 metric_name_validation_scheme: legacy다.",
        code: `http_server_requests_seconds_count{method="GET", status="200", uri="/api/weddings"}  1523  @1760000000000
└──────────── 메트릭 이름 ─────────┘└──────────────── 라벨 ─────────────────────────┘   값     타임스탬프(ms)`,
        refs: ["promdatamodel"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "깊이 읽기: 메트릭 타입의 실제 모양",
        text: '서버는 타입을 구분해 저장하지 않고 native histogram을 빼면 모두 타입 없는 숫자 시계열로 평탄화한다. 타입은 어떻게 읽을지에 대한 약속이다. 문서는 줄어들 수 있는 값을 counter로 노출하지 말라고 경고한다. classic histogram의 버킷은 누적이라 각 버킷은 자기 상한(le) 이하의 관측을 모두 포함한다. 3.0부터 le·quantile 값이 정규화되어 le="1"은 le="1.0"이 되므로 정수로 적은 쿼리·알림은 고쳐야 한다. native histogram은 count·sum·버킷을 복합 샘플 하나로 저장해 경계를 미리 정할 필요가 없고, 지원 라이브러리(현재 Go, Java)가 있으면 권장된다. 3.x에서는 scrape_native_histograms(기본 false)로 켜며 feature flag native-histograms는 v3.9부터 아무 동작도 하지 않는다. Summary는 앱에서 미리 계산한 분위수를 노출하므로 여러 인스턴스 값을 합쳐 다시 분위수를 구할 수 없다(확인 필요).',
        code: `http_request_duration_seconds_bucket{le="0.1"}   240   ← 0.1초 이하 요청 수 (누적)
http_request_duration_seconds_bucket{le="0.5"}   290   ← 0.5초 이하 요청 수 (0.1초 이하 포함)
http_request_duration_seconds_bucket{le="+Inf"}  300   ← 전체 요청 수
http_request_duration_seconds_sum                  42.7  ← 관측값 합계
http_request_duration_seconds_count               300   ← 관측 횟수 (= le="+Inf")`,
        refs: ["promtypes"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "깊이 읽기: scrape와 staleness",
        text: "instance는 scrape할 엔드포인트 하나, job은 같은 목적의 instance 묶음이다. scrape하면 job과 instance(<host>:<port>) 라벨이 붙고, 같은 이름 라벨이 이미 있으면 honor_labels(기본 false)에 따라 대상 쪽 라벨이 exported_job처럼 바뀐다. scrape마다 up, scrape_duration_seconds, scrape_samples_scraped, scrape_samples_post_metric_relabeling, scrape_series_added가 자동으로 생긴다. 기본값은 scrape_interval 1m, scrape_timeout 10s(간격보다 클 수 없음), evaluation_interval 1m, metrics_path /metrics, scheme http다. sample_limit을 넘으면 그 scrape 전체가 실패한다. 3.x에서는 Content-Type 헤더가 없거나 이상하면 scrape가 실패하고(fallback_scrape_protocol), scheme에 따라 :80/:443을 자동으로 붙이지 않는다. 쿼리는 lookback(기본 5분) 안의 최근 샘플을 쓰며, 시계열이나 대상이 사라지면 stale 표시가 들어가 이후 시점에는 값이 나오지 않는다. relabel_configs는 scrape 전, metric_relabel_configs는 scrape 후에 적용된다(action 목록과 기본값은 확인 필요).",
        refs: ["promjobs", "promconfig"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "깊이 읽기: remote write와 OTLP 수신",
        text: "pull이 기본이지만 push 길도 있다. Alloy의 prometheus.remote_write와 Tempo metrics-generator는 /api/v1/write로 밀어 넣고(snappy + protobuf), --web.enable-remote-write-receiver(기본 false)로 켠다. 이 플래그는 2.x feature flag remote-write-receiver를 대체한 정식 플래그다. 프로토콜은 1.0(안정)이 기본이고 2.0(실험)은 --web.remote-write-receiver.accepted-protobuf-messages로 허용한다. OTLP 수신은 --web.enable-otlp-receiver(기본 false)다. push를 쓰면 모니터링 서버가 앱 서버로 접속할 필요가 없어 방화벽·네트워크 구성이 단순해지며, 비비디가 이 방식이다.",
        refs: ["remotewrite", "promcli"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "깊이 읽기: TSDB 저장 구조와 보존",
        text: "Head block은 지금 들어오는 최근 약 2시간 데이터로 메모리에 있다. WAL은 head 내용을 디스크에 먼저 남긴 기록으로, wal/에 128MB 세그먼트로 쌓이며 재시작하면 다시 읽어 head를 복원한다. 2시간마다 블록(chunks/, index, meta.json, tombstones)으로 잘라 저장하고, compaction이 보존 기간의 10%와 31일 중 작은 값까지 합친다. 합치는 동안 디스크를 잠시 더 쓴다. 보존은 시간·크기 기준이 둘 다 없으면 15일이고, 둘 다 있으면 먼저 닿는 쪽이 적용된다. 삭제는 블록 통째로만 일어나고 최대 2시간 걸릴 수 있다. 크기 기준에는 WAL과 m-mapped chunk도 포함되며, 한도는 할당한 디스크의 80~85% 이하로 잡으라고 권한다. 3.15 명령줄 문서는 --storage.tsdb.retention.time·.size를 Deprecated로 표시한다(설정 파일 필드 이름은 확인 필요). 디스크를 줄이려면 scrape 간격을 늘리기보다 시계열 수를 줄이는 쪽이 효과적이다. 로컬 저장소는 클러스터링·복제가 없어 단일 노드 DB처럼 다루고, NFS(AWS EFS 포함)는 지원하지 않으며, 스냅샷 없이 파일을 복사하면 마지막 블록 이후(보통 2시간) 데이터를 잃을 수 있다.",
        code: "필요한 디스크 = 보존 시간(초) × 초당 들어오는 샘플 수 × 샘플당 바이트(약 1~2B)",
        refs: ["promstorage"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "깊이 읽기: exemplar",
        text: "메트릭 값에 그 순간의 대표 요청 참조(주로 trace_id)를 붙인 것이다. 예를 들어 p95가 2초로 튄 점에서 그때 느렸던 요청의 trace_id로 이동한다. 모든 시계열이 함께 쓰는 고정 크기 순환 버퍼(메모리)에 저장되어 오래된 것부터 밀려나고, trace_id만 담으면 하나에 약 100바이트이며, WAL에도 기록된다. 3.x에서도 --enable-feature=exemplar-storage feature flag다. 버퍼 크기는 설정 파일 storage.exemplars 블록이다(필드 이름 확인 필요). remote write로 받은 exemplar의 저장 조건은 확인 필요다.",
        refs: ["promflags", "promstorage"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "깊이 읽기: PromQL 세부",
        text: '결과 타입은 instant vector(시계열마다 한 시점 값), range vector(구간 안 여러 값), scalar다. 그래프의 최종 결과는 instant vector나 scalar여야 하므로 range vector는 rate() 같은 함수로 바꾼다. 정규식 매처는 전체 일치(env=~"prod"는 ^prod$)이고, 빈 값과 일치하는 매처는 라벨이 없는 시계열도 고른다. 셀렉터에는 빈 문자열과 일치하지 않는 매처가 하나 이상 있어야 한다({job=~".*"} 불가, {job=~".+"} 가능). 3.x에서는 정규식 .이 줄바꿈도 일치하고 range 구간은 왼쪽 열림·오른쪽 닫힘이다. offset 1h는 1시간 전, @ <unix시간>은 특정 시점이다. 기본 한도는 --query.timeout 2m, --query.max-samples 5천만이다. rate를 먼저, 합치기는 나중에 한다(sum(rate(x[5m]))는 O, rate(sum(x)[5m])는 리셋을 감지 못해 X). increase는 외삽 때문에 정수 counter에서도 소수가 나올 수 있다. histogram_quantile은 버킷 안에서 균등 분포를 가정해 선형 보간하므로 버킷이 넓으면 오차가 크고, 가장 높은 버킷이 +Inf가 아니거나 버킷이 2개 미만·관측 0이면 NaN이다. 벡터끼리 산술할 때 라벨 짝이 없는 시계열은 결과에서 빠진다. or vector(0) 설명은 문서의 or 동작에서 끌어낸 추론이다.',
        table: {
          head: ["함수", "의미", "쓰는 곳"],
          rows: [
            [
              "rate(x[5m])",
              "구간의 초당 평균 증가율. 리셋 자동 보정, 구간 끝까지 외삽",
              "알림, 일반 그래프",
            ],
            [
              "irate(x[5m])",
              "마지막 두 점만으로 계산한 순간 증가율",
              "빠르게 변하는 그래프(알림에는 X)",
            ],
            [
              "increase(x[5m])",
              "구간 동안의 증가량(= rate × 구간 초)",
              "“5분 동안 몇 건”",
            ],
          ],
        },
        refs: ["promql", "promoperators", "promfunctions"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "깊이 읽기: 카디널리티와 운영",
        text: "카디널리티는 시계열 개수, 즉 라벨 값 조합의 수다(uri 50개 × status 5개 × method 4개 = 최대 1,000개). head block이 메모리에 있으므로 시계열이 늘면 메모리·디스크·쿼리 비용이 함께 는다. 결과를 수백 개 이하로 유지하고 필요하면 recording rule로 미리 계산하라고 한다. 방어 장치는 sample_limit, label_limit이다. 명령줄 플래그는 실행 중 바꿀 수 없는 시스템 값(저장 경로, 보존, 기능 플래그, 수신기)이고, prometheus.yml은 scrape job·대상·규칙 파일이다. 리로드는 SIGHUP 또는 POST /-/reload(--web.enable-lifecycle 필요)이며 새 설정이 틀리면 적용되지 않는다. --storage.tsdb.path 기본 data/, --web.enable-admin-api 기본 false, --auto-gomemlimit 기본 켜짐(cgroup 메모리 한도의 90%)이다. 자체 지표로 prometheus_tsdb_head_series, prometheus_http_requests_total 등을 노출한다(목록 문서는 확인 필요).",
        refs: ["cardinality", "promcli", "promconfig"],
      },
      {
        group: "Prometheus: 메트릭",
        title: "깊이 읽기: 3.x에서 바뀐 것과 비비디 확인 사항",
        text: "3.x는 웹 UI를 새로 만들었고(--enable-feature=old-ui), 이름 검증 기본이 UTF-8이며, le·quantile 값을 정규화하고, 정규식 .이 줄바꿈과 일치하고 range 셀렉터가 왼쪽 열림이다. remote-write-receiver → --web.enable-remote-write-receiver, agent → --agent로 정식 플래그가 됐고, remote write 송신 HTTP/2는 기본 꺼짐이다. TSDB 형식이 v2.55에서 바뀌어 3.x 데이터는 v2.55 이상에서만 읽힌다. 비비디는 보존을 --storage.tsdb.retention.time=30d, --storage.tsdb.retention.size=8GB 플래그로 설정 중인데 3.15에서 deprecated라 설정 파일 필드로 옮길 계획이 필요하다. 8GB에는 WAL도 포함되고 compaction 중 일시 초과할 수 있으니 디스크(gp3 30GB, Loki·Tempo 공유) 여유를 확인한다. --enable-feature=exemplar-storage는 3.x에서도 필요하고, --web.enable-remote-write-receiver는 그대로 맞다. Tempo send_exemplars: true로 받은 exemplar가 저장되는지는 Grafana 그래프의 exemplar 점으로 실제 확인이 필요하다.",
        refs: ["prommigration", "promcli"],
      },
      {
        group: "Loki: 로그",
        title: "Loki: 로그",
        text: "Loki는 라벨로 로그 스트림을 구분하고 LogQL로 조회한다. 서비스·환경처럼 값 종류가 적은 라벨을 쓰고, 개별 결혼 정보 ID는 로그 내용에서 찾는 편이 맞다.",
        refs: ["loki", "lokilabel", "logql"],
      },
      {
        group: "Loki: 로그",
        title: "Loki 깊이 읽기: 검색의 두 단계",
        text: "먼저 서비스와 환경 라벨로 스트림을 좁힌 뒤 LogQL의 텍스트·파서 필터로 사건이나 결혼 정보 ID를 찾는다. 요청마다 달라지는 값을 라벨로 만들면 스트림이 지나치게 많아질 수 있다.",
        refs: ["logql", "lokilabel"],
      },
      {
        group: "Loki: 로그",
        title: "Loki가 없으면",
        text: "운영 에러를 보려면 서버에 접속해 docker logs를 grep해야 한다. 개발 서버는 한 번 더 접속해야 하고, 배포하면 컨테이너가 새로 생겨 이전 로그가 사라진다. nginx 로그와 Spring 로그를 같이 보려면 터미널을 두 개 띄워야 하고, “어제 오후 3시쯤” 같은 시간 범위로 보기 어렵다. Loki를 쓰면 Grafana에서 한 줄로 끝난다.",
        code: `ssh bibbidi-prod
docker logs bibbidi-backend --since 1h | grep ERROR

{service_name="bibbidi-backend", deployment_environment_name="production"} |= "ERROR"`,
        refs: ["loki"],
      },
      {
        group: "Loki: 로그",
        title: "이름표 붙은 상자",
        text: "로그가 들어오면 이름표(라벨)를 보고 맞는 상자에 시간순으로 넣는다. 상자 안 한 줄은 시각 + 본문이다. 검색할 때는 먼저 이름표로 상자를 고르고(빠름), 그 상자 안을 한 줄씩 읽으며 글자를 찾는다(느림). 그래서 상자를 좁게 고를수록 빠르다. 많은 로그 시스템은 본문 전체에 색인을 만들지만, Loki는 이름표에만 색인을 만들고 본문은 압축해 쌓는다. 공식 문서 표현으로 “작은 색인과 압축된 청크”라 운영이 단순하고 비용이 낮다. 비비디처럼 서버가 작고 로그 양이 많지 않으면 이 방식이 잘 맞는다.",
        refs: ["loki", "lokiarch"],
      },
      {
        group: "Loki: 로그",
        title: "로그 한 줄이 Loki에 들어간 모습",
        text: "비밀 값은 Alloy가 보내기 전에 [REDACTED]로 가렸고, log.debug() 로그는 Alloy가 버려 Loki에 없다. 로그 레벨과 trace_id가 이름표가 아니라 메모인 이유는 이름표 조합마다 상자가 하나씩 생기기 때문이다. trace_id는 요청마다 달라서 이름표로 쓰면 요청 수만큼 상자가 생기고, 몇 줄짜리 작은 상자 수만 개 때문에 검색이 크게 느려진다. 메모는 검색 조건으로 쓸 수 있지만 상자를 늘리지 않는다. 공식 문서는 trace ID나 결혼 정보 ID 같은 값을 이름표로 만들지 말고, 이름표는 10~15개 이하로 적을수록 좋다고 권한다.",
        table: {
          head: ["부분", "내용", "검색할 때"],
          rows: [
            [
              "이름표(상자)",
              'service_name="bibbidi-backend", deployment_environment_name="production", service_instance_id="bibbidi-backend-prod"',
              "{...} 안에 씀",
            ],
            [
              "메모(structured metadata)",
              'severity_text="ERROR"(로그 레벨), scope_name="kr.bibbidi.auth.OidcClient"(로거 이름), trace_id="4bf9...", span_id="00f0..."',
              '| severity_text="ERROR"처럼 씀',
            ],
            [
              "본문",
              '{"log":{"level":"ERROR",...},"message":"token request failed, Authorization=[REDACTED]",...}',
              '|= "글자"로 찾음',
            ],
          ],
        },
        refs: ["lokilabel", "lokimetadata"],
      },
      {
        group: "Loki: 로그",
        title: "LogQL 기초: 다섯 단계",
        text: 'LogQL은 grep을 이어 붙이는 것과 거의 같다. {상자 고르기}는 필수이고, 그 뒤에 |로 거르기를 잇는다. 글자 거르기는 |= 들어간 줄(grep abc), != 안 들어간 줄(grep -v abc), |~ 정규식에 맞는 줄(grep -E), !~ 정규식에 안 맞는 줄(grep -vE)이며 대소문자를 구분하므로 무시하려면 |~ "(?i)error"를 쓴다. 메모로는 레벨·로거·trace_id를 바로 거른다. nginx 로그는 JSON이라 | json으로 풀면 필드로 조건을 걸 수 있고, 점은 밑줄로 바뀐다(http.response.status_code → http_response_status_code). count_over_time(... [5m])는 5분 동안 줄 수이며 알림 W4가 이 방식이다.',
        code: `{service_name="bibbidi-backend", deployment_environment_name="production"}
{service_name="bibbidi-backend", deployment_environment_name="production"} |= "token" != "refresh"
{service_name="bibbidi-backend", deployment_environment_name="production"} | severity_text=~"(?i)error"
{service_name="bibbidi-backend", deployment_environment_name="production"} | trace_id="4bf92f3577b34da6a3ce929d0e0e4736"
{service_name="nginx", deployment_environment_name="production"} | json | http_response_status_code >= 500
sum(count_over_time({service_name="bibbidi-backend", deployment_environment_name="production"} | severity_text=~"(?i)error" [5m]))`,
        refs: ["logql"],
      },
      {
        group: "Loki: 로그",
        title: "꼭 알아야 할 네 가지",
        text: '첫째, 이름표로 서비스와 환경을 꼭 지정하고 시간 범위도 좁게 잡는다. {deployment_environment_name="production"}만 쓰면 backend·nginx·alloy 상자를 전부 읽는다. 둘째, 로그는 14일 보관하고 자동으로 지워지므로 장애 회고에 필요한 로그는 그 전에 따로 남긴다. 셋째, Loki는 1초에 이만큼 이상, 한 줄이 이보다 길면, 너무 오래된 로그면 받지 않으며 거절된 로그는 저장되지 않는다. 알림 W7 “Loki 수집 거부”가 이를 감시하고, 반복문 안의 log.info()가 대표 원인이다. 넷째, 로그 레벨 표기가 backend는 ERROR(대문자), nginx는 error(소문자)라 severity_text=~"(?i)error"처럼 대소문자를 무시한다.',
        refs: ["lokilabel", "lokiretention", "lokilimits"],
      },
      {
        group: "Loki: 로그",
        title: "깊이 읽기: 스트림과 라벨 권고",
        text: 'Loki는 Prometheus에서 영감을 받은 로그 저장·조회 시스템이지만 push로 받는다. 스트림은 같은 라벨 집합을 가진 로그 묶음으로 tenant ID + 라벨 집합으로 식별되며 라벨이 최소 하나 있어야 한다. 엔트리는 나노초 타임스탬프 + 본문(+ structured metadata)이다. 라벨 이름 규칙은 Prometheus와 같고 안 되는 문자는 _로 바뀐다(app.kubernetes.io/name → app_kubernetes_io_name). 카디널리티는 스트림 수다(status_code 3종 × action 5종 = 15, endpoint 3종을 더하면 45). 높으면 색인이 커지고 아주 작은 청크 수천 개가 flush되어 성능이 크게 떨어진다. 문서가 드는 고카디널리티 예는 타임스탬프, IP, Pod 이름, User ID, Customer ID, Trace ID다. 기본 색인 라벨 한도는 15개다. 라벨로 좋은 것은 region, cluster, application, namespace, environment이고, {app="loki", level="error"}보다 {app="loki"} |= "level=error"를 권한다. 확인 명령은 logcli series {} --since=1h --analyze-labels다.',
        refs: ["lokilabel", "lokicardinality"],
      },
      {
        group: "Loki: 로그",
        title: "깊이 읽기: structured metadata와 자동 라벨",
        text: "structured metadata는 색인하지 않고 본문에도 넣지 않는 부가 정보다. schema v13 이상 + TSDB 색인이 필요하고(아니면 Loki가 시작하지 않음), 엔트리당 64KB·128개를 넘으면 HTTP 400으로 거부된다. 스트림에 service_name이 없으면 service, app, application, app_name, name, app_kubernetes_io_name, container, container_name, ... job 순서로 처음 값이 있는 라벨을 쓰고, 하나도 없으면 unknown_service다. Logs Drilldown이 이 라벨을 쓴다. OTLP로 받으면 정해진 리소스 속성 17개만 라벨이 되고(점 → _) 나머지는 structured metadata가 된다. 문서는 그중 k8s.pod.name과 service.instance.id를 카디널리티 때문에 더는 권장하지 않는 기본 라벨이라고 한다.",
        table: {
          head: ["구분", "라벨", "structured metadata", "본문"],
          rows: [
            ["색인", "O", "X", "X"],
            ["값 종류", "적어야 함", "많아도 됨", "-"],
            [
              "조회",
              '{라벨="값"}로 스트림 선택',
              '| 키="값"으로 필터',
              '|= "문자열", 파서',
            ],
            [
              "예",
              "service_name, 환경",
              "trace_id, 로그 레벨",
              "원래 로그 한 줄",
            ],
          ],
        },
        refs: ["lokimetadata", "lokiotel"],
      },
      {
        group: "Loki: 로그",
        title: "깊이 읽기: 구성요소와 쓰기 경로",
        text: "Loki는 여러 구성요소로 나뉜 하나의 바이너리이며, monolithic으로 띄우면 한 프로세스 안에서 모두 돈다. 쓰기는 Alloy가 POST /loki/api/v1/push → Distributor 검증·속도 제한·해시 → Ingester가 WAL에 기록하고 메모리 청크에 추가한 뒤 ACK하는 순서다. 청크가 차거나(chunk_target_size 1.5MB), 오래되거나(max_chunk_age 2h), 한동안 안 쓰이면(chunk_idle_period 30m) 압축해 flush한다. replication_factor를 쓰면 여러 ingester의 과반 ACK를 기다린다(일반적으로 3). WAL은 기본 켜짐이고 “won't lose data once a write has been acknowledged”라고 설명하며, 디스크 사용률 90%를 넘으면 새 쓰기를 거부한다. 디스크 검사가 파일시스템 전체 기준이라 WAL 디스크를 다른 데이터와 공유하지 말라고 권한다. 읽기는 Query frontend가 sub-query로 나누고 Querier가 Ingester 메모리(최근)와 색인(TSDB) → 청크(과거)를 읽어 중복을 제거한다.",
        table: {
          head: ["구성요소", "역할"],
          rows: [
            [
              "Distributor",
              "쓰기 요청 입구. 라벨·타임스탬프·줄 길이 검증, 라벨 정렬, 속도 제한, 해시로 담당 ingester 결정",
            ],
            [
              "Ingester",
              "최근 로그를 메모리에 청크로 모았다가 flush. 메모리 데이터로 조회에도 응답",
            ],
            [
              "Query frontend",
              "큰 쿼리를 sub-query로 쪼개 병렬 실행, 결과 합치기, 캐시",
            ],
            ["Query scheduler", "테넌트별 큐(선택)"],
            [
              "Querier",
              "실제 조회. ingester(최근) + 저장소(과거)를 함께 읽고 중복 제거",
            ],
            ["Index gateway", "색인(TSDB) 메타데이터 조회"],
            ["Compactor", "색인 파일 병합, 보존 기간 삭제"],
            ["Ruler", "recording·alerting 규칙 평가"],
          ],
        },
        refs: ["lokiarch", "lokicomponents", "lokiwal"],
      },
      {
        group: "Loki: 로그",
        title: "깊이 읽기: 배포 모드와 저장",
        text: "Monolithic(-target=all)은 한 프로세스로 하루 약 20GB까지의 실험·소규모용이다. Simple Scalable(SSD)은 write/read/backend 세 그룹으로 하루 1TB 가까이까지이며 Loki 4.0에서 제거 예정이다. Microservices는 구성요소마다 별도 프로세스로 Kubernetes 전제다. 색인은 라벨 집합 → 청크 위치를 담은 목차이고 청크는 압축된 로그 묶음이며, Loki 2.0부터 둘을 같은 저장소에 둔다. TSDB 색인은 2.8부터 권장되며 쿼리할 때 데이터량을 보고 샤드를 나눈다(샤드당 약 300~600MB). v13이 필요한 이유는 기본으로 켜진 structured metadata와 OTLP 수집이 tsdb + v13 이상을 요구하기 때문이다. schema를 바꿀 때는 미래 날짜의 from으로 새 항목을 추가한다. 문서는 “Grafana Labs does not support the filesystem object store for production environments”라고 밝힌다. 복제가 없어 디스크가 망가지면 데이터를 잃고, 파일이 너무 많으면 문제가 생길 수 있으며(약 550만 청크에서 오류 사례), 디스크가 차는 것을 보고 지우지 않는다. 단일 테넌트면 청크가 fake 폴더에 저장된다.",
        code: `schema_config:
  configs:
    - from: 2026-10-06        # 이 날짜부터 적용
      store: tsdb             # 유일한 권장
      object_store: filesystem
      schema: v13             # 최신 · 권장
      index:
        prefix: index_
        period: 24h           # 반드시 24h`,
        refs: ["lokimodes", "lokistorage", "lokischema", "lokifs"],
      },
      {
        group: "Loki: 로그",
        title: "깊이 읽기: 보존과 삭제",
        text: "보존을 켜지 않으면 로그는 영원히 남는다(retention_period 기본 0s = 무기한). compactor가 10분마다(compaction_interval 10m) 일별 색인을 병합하고, 기간이 지난 청크를 색인에서 빼 삭제 목록에 기록한 뒤, retention_delete_delay(기본 2h)를 기다려 sweeper가 청크 파일을 지운다. 지연은 다른 구성요소가 새 색인을 받아갈 시간과 설정 실수를 되돌릴 시간이다. 보존을 켜면 delete_request_store가 필수다(filesystem이면 filesystem). limits_config.retention_stream으로 스트림별 보존(최소 24h)을 줄 수 있다. 기간을 바꿔도 이미 들어온 로그에 소급되지 않고, 삭제 API /loki/api/v1/delete는 보존이 켜져 있을 때만 생긴다.",
        refs: ["lokiretention"],
      },
      {
        group: "Loki: 로그",
        title: "깊이 읽기: 제한과 거부 사유",
        text: "거부된 로그는 저장되지 않는다. 순서가 뒤바뀐 로그도 기본으로 받지만, 스트림의 가장 최근 로그보다 max_chunk_age의 절반(기본 1시간) 넘게 오래된 로그는 too_far_behind로 거부한다. 거부 사유는 loki_discarded_samples_total{reason=...}으로 본다. 429는 rate_limited, per_stream_rate_limit, stream_limit, 400은 line_too_long, invalid_labels, too_far_behind, greater_than_max_sample_age, too_far_in_future, max_label_names_per_series, structured_metadata_too_large 등, 413은 request_body_too_large다.",
        table: {
          head: ["한도", "기본값"],
          rows: [
            [
              "ingestion_rate_mb / ingestion_burst_size_mb",
              "4MB/s / 6MB(테넌트 전체)",
            ],
            ["per_stream_rate_limit / burst", "3MB/s / 15MB(스트림 하나)"],
            ["max_global_streams_per_user", "5000(활성 스트림 수)"],
            ["max_line_size", "256KB"],
            [
              "reject_old_samples / max_age",
              "true / 168h(7일보다 오래된 로그 거부)",
            ],
            ["creation_grace_period", "10m(10분 넘게 미래인 로그 거부)"],
            ["max_label_names_per_series", "15"],
          ],
        },
        refs: ["lokilimits"],
      },
      {
        group: "Loki: 로그",
        title: "깊이 읽기: LogQL 세부",
        text: '쿼리는 로그 줄을 돌려주는 로그 쿼리와 숫자를 돌려주는 메트릭 쿼리 두 종류다. 스트림 셀렉터 정규식은 전체 일치지만 line filter 정규식은 부분 일치(RE2)다. line filter를 앞에 두면 파서보다 먼저 줄을 걸러 빠르다. 파서는 | json(중첩 키를 _로 이음), | logfmt, | pattern(regex보다 빠름), | regexp이며, 파싱에 실패해도 줄은 남고 __error__ 라벨이 붙는다. label filter는 문자열·숫자·duration(300ms)·bytes(20MB)를 and/or로 비교하고, line_format, label_format, keep, drop으로 가공한다. 3.7부터 파서로 뽑은 라벨이 structured metadata를 덮어쓰지 않는다. 메트릭 쿼리는 count_over_time, rate, bytes_over_time, bytes_rate, absent_over_time으로 줄을 세고, | unwrap 필드 뒤에 sum_over_time, avg_over_time, max_over_time, quantile_over_time 등으로 값을 계산한다. count_over_time에 unwrap을 쓰거나 sum_over_time에 unwrap이 없으면 오류다. 조회 한도는 max_entries_limit_per_query 5000, query_timeout 1m, max_query_length 721h, max_query_series 500(확인 필요: 다른 문서는 50000을 예로 듦)이며, {app=~".*"}처럼 빈 값과 일치하는 매처만 있는 쿼리는 거부된다.',
        code: `{service_name="nginx"} |= "POST" != "/healthz" | json | http_response_status_code >= 500
sum by (service_name) (count_over_time({deployment_environment_name="production"} |= "ERROR" [5m]))
avg_over_time({service_name="nginx"} | json | unwrap http_request_duration [5m])`,
        refs: ["lokilogq", "lokimetricq"],
      },
      {
        group: "Loki: 로그",
        title: "깊이 읽기: 캐시와 운영",
        text: "캐시는 results cache, chunks cache 등이 있고 백엔드는 Memcached(운영 권장), Redis, embedded(프로세스 메모리)다. Memcached·Redis가 없으면 embedded cache가 자동으로 켜지며, TSDB는 색인 캐시를 쓰지 않는다. 자체 메트릭(:3100/metrics)은 loki_distributor_bytes_received_total, loki_distributor_lines_received_total, loki_discarded_samples_total{reason}, loki_ingester_memory_streams, loki_ingester_memory_chunks, loki_ingester_chunks_flushed_total, loki_compactor_apply_retention_last_successful_run_timestamp_seconds, loki_panic_total(0이어야 정상)이고, 쿼리마다 metrics.go 로그가 남는다. 흔한 수집 오류는 429, entry too far behind, timestamp too old, 503(ingester 준비 안 됨), context deadline exceeded(Alloy 기본 timeout 10s)다. 설정 오류로는 “schema v13 is required to store Structured Metadata”, “retention period must be >= 24h”, compactor.working_directory 없음, “no org id”(401 → auth_enabled: false)가 있고, 시작 전에 -verify-config로 검사한다. Promtail은 2026-03-02 EOL로 3.7.3에서 제거됐고, 수집 경로는 OTLP POST /otlp/v1/logs와 기존 POST /loki/api/v1/push(snappy 압축 protobuf 기본, JSON 가능)다.",
        refs: ["lokicaching", "lokimeta", "lokisend"],
      },
      {
        group: "Loki: 로그",
        title: "깊이 읽기: 최근 버전 변화와 비비디 확인 사항",
        text: "3.0은 기본 schema v13, structured metadata 기본 켜짐, OTLP 네이티브 지원, 패턴 매치 필터를 들였다. 3.5는 삭제 요청 저장소로 SQLite를 쓰고 Promtail을 deprecated했다. 3.6은 수평 확장 compactor, SSD 모드 deprecated 예고, Docker 이미지 셸 제거(컨테이너 exec 불가)다. 3.7은 파서 라벨이 structured metadata를 덮어쓰지 않게 했고(breaking), loki health 명령을 추가했다. 3.7.8(2026-08-27)은 보안 업데이트다. 비비디는 service_instance_id 라벨이 “더는 권장하지 않음” 항목이지만 값이 몇 개뿐이라 당장 문제는 아니다. filesystem 저장은 운영 비지원이라 디스크 장애가 곧 로그 유실이고, 디스크가 차도 Loki는 지우지 않는데 모니터링 서버 디스크 사용률 알림이 Prometheus에 없다. severity_text를 structured metadata로 두고 | json을 함께 쓰는 쿼리가 있다면 3.7 변경 이후 결과를 확인한다. 실제 삭제는 14일 + 최대 2시간 지연 후이며, W7 알림을 위 거부 사유 표와 Runbook에 연결한다.",
        refs: ["loki37", "lokifs"],
      },
      {
        group: "Tempo: 트레이스",
        title: "Tempo: 트레이스",
        text: "Tempo는 트레이스를 저장해 요청의 span과 소요 시간을 따라볼 수 있게 한다. trace_id가 있어야 특정 요청으로 바로 이동할 수 있다.",
        refs: ["tempo", "context"],
      },
      {
        group: "Tempo: 트레이스",
        title: "Tempo 깊이 읽기: 느린 구간 찾기",
        text: "trace_id로 요청을 연 뒤 부모·자식 span의 시작 시점과 길이를 비교한다. 오래 걸린 span 하나를 발견해도 원인을 바로 확정하지 말고 해당 서비스의 오류 로그와 포화 메트릭을 함께 본다.",
        refs: ["tempo", "explore"],
      },
      {
        group: "Tempo: 트레이스",
        title: "트레이스가 없으면",
        text: "“카카오 로그인이 3초 걸려요”라는 제보에 로그를 보면 시작과 완료만 있어 어디서 걸렸는지 모른다. 카카오 서버인지, 우리 DB인지, 우리 코드인지 알려면 구간마다 시간을 찍는 코드를 넣고 다시 배포해야 한다. 트레이스를 쓰면 코드를 고치지 않아도 요청마다 구간별 기록이 자동으로 남는다.",
        code: `01:23:45.000 INFO  카카오 로그인 콜백 시작
01:23:48.020 INFO  카카오 로그인 콜백 완료

long start = System.currentTimeMillis();
var token = kakaoClient.requestToken(code);
log.info("카카오 토큰 요청 {}ms", System.currentTimeMillis() - start);   // 이걸 모든 곳에?

GET /api/auth/kakao/callback                          총 3,020ms
 ├─ POST https://kauth.kakao.com/oauth/token  (외부 호출)   2,800ms  ← 여기
 └─ SELECT member ...                         (DB)           150ms`,
        refs: ["tempo"],
      },
      {
        group: "Tempo: 트레이스",
        title: "트레이스와 스팬",
        text: "트레이스는 요청 하나의 전체 기록이고 고유 번호 trace_id를 가진다. 스팬은 그 안의 구간 하나로 시작 시각, 걸린 시간, 이름, 성공·실패(status), 부모 스팬을 가지며 맨 위 스팬이 요청 전체다. 스팬 종류(kind)는 server(우리가 받은 요청), client(우리가 보낸 요청: 외부 API, DB), internal(내부 작업)이다. 스팬에는 만든 쪽(service.name, deployment.environment.name)과 작업(http.request.method, http.response.status_code) 속성이 붙는다. 스팬은 Spring이 요청마다 자동으로 만들고(spring-boot-starter-opentelemetry), Alloy(http://alloy:4318)를 거쳐 Tempo로 가며, 같은 trace_id가 로그에도 찍힌다.",
        refs: ["tempostructure"],
      },
      {
        group: "Tempo: 트레이스",
        title: "비비디에서 일어나는 일",
        text: "모든 요청(100%)을 5일 동안 보관하므로 정상 요청의 트레이스도 찾을 수 있다. Tempo는 들어온 트레이스를 세어 API별 요청 수, 에러 수, 응답 시간을 Prometheus로 보낸다. 비비디의 API p95 그래프와 알림(W2, W3)이 이 숫자로 만들어지며, Spring 코드를 고치지 않고 응답 시간을 볼 수 있는 이유다. 그래서 나중에 일부 요청만 저장하도록 바꾸면 이 숫자도 줄어 알림 기준도 다시 봐야 한다.",
        refs: ["tempogenerator", "spanmetrics"],
      },
      {
        group: "Tempo: 트레이스",
        title: "TraceQL 기초",
        text: 'TraceQL은 “이런 스팬이 들어 있는 요청을 찾아 줘”라고 쓰는 검색어다. 중괄호 안 조건에 맞는 스팬이 있는 트레이스를 찾는다. resource.이름은 스팬을 만든 쪽 정보, span.이름은 그 작업 정보, 접두사 없는 name·status·kind·duration은 항상 있는 기본 정보다. &&는 그리고, ||는 또는, 시간은 500ms·1s·2m처럼 쓴다. 정규식 =~는 전체가 맞아야 해서 “callback으로 끝나는”은 name =~ ".*/callback"이다. trace_id를 그대로 붙여 넣으면 그 트레이스가 열리고, 보통은 Loki 로그의 Tempo에서 보기 버튼으로 연다.',
        code: `{ resource.deployment.environment.name = "production" && kind = server && status = error }   # 운영 에러 요청
{ resource.deployment.environment.name = "production" && kind = server && duration > 1s }   # 1초 넘은 요청
{ name = "GET /api/weddings/{id}" }                                                       # 특정 API
{ trace:duration > 5s }                                                                   # 요청 전체가 5초 넘음`,
        refs: ["traceql", "traceqlconstruct"],
      },
      {
        group: "Tempo: 트레이스",
        title: "트레이스 화면 읽는 법",
        text: "트레이스를 열면 막대그래프(워터폴)가 나온다. 긴 막대가 오래 걸린 구간이고, 빨간 표시가 에러(status=error)가 난 곳이다. 스팬을 클릭하면 HTTP 상태 코드·주소 같은 속성이 보이고, Logs for this span 버튼으로 같은 trace_id의 로그로 간다.",
        code: `bibbidi-backend  GET /api/auth/kakao/callback       ████████████████████████████████  3.02s
bibbidi-backend    POST kauth.kakao.com/oauth/token  ▕██████████████████████████████    2.80s
bibbidi-backend    SELECT member                                                   ██   150ms`,
        refs: ["explore"],
      },
      {
        group: "Tempo: 트레이스",
        title: "꼭 알아야 할 세 가지",
        text: "첫째, 트레이스는 5일만 보관해 로그(14일)보다 짧다. 둘째, trace_id가 로그·트레이스·숫자를 잇는 열쇠다. 로그 → 트레이스는 로그의 trace_id, 그래프 → 트레이스는 그래프 점(exemplar)의 trace_id, 트레이스 → 로그는 같은 trace_id 검색이다. 셋째, 스팬 이름에는 실제 값(GET /api/weddings/123)이 아니라 주소 틀(GET /api/weddings/{id})이 들어가 API별로 묶어 숫자를 만들 수 있다.",
        refs: ["tempo", "context"],
      },
      {
        group: "Tempo: 트레이스",
        title: "깊이 읽기: 데이터 모델",
        text: "Tempo는 스팬을 Apache Parquet 블록으로 저장하고 trace ID나 TraceQL로 꺼내는 분산 트레이스 저장소다. 싼 오브젝트 스토리지 저장, 쓰기·읽기 경로 분리 확장, 컬럼 저장을 이용한 속성 검색을 목표로 한다. 문서는 “Metrics indicate that something is happening”, “Logs let you know what's happening”, “Traces provide a map of where something is going wrong”이라고 세 신호를 나눈다. 스팬은 루트를 빼면 부모를 가리키고, 속성·이벤트·링크를 가질 수 있다. 트레이스에는 끝이 없어 늦게 도착하는 스팬 때문에 계속 커질 수 있다. 항상 있는 필드는 name, duration, status(ok, error, unset), kind(server, client, producer, consumer, internal, unspecified)다. Resource 속성은 만든 주체, Span 속성은 작업 정보이며 Event·Link 속성도 있다. Spanset은 TraceQL이 트레이스마다 돌려주는 스팬 묶음이다.",
        code: `trace_id = 4bf92f3577b34da6a3ce929d0e0e4736
│
└─ [server] GET /api/weddings/{id}                       0ms ───────────────── 820ms
     ├─ [internal] WeddingService.find                    5ms ──────── 300ms
     │    └─ [client] SELECT wedding ...  (DB)            10ms ─── 290ms
     └─ [client] GET https://oauth.example.com/userinfo   310ms ──────────── 810ms   status=error`,
        refs: ["tempostructure", "semconv"],
      },
      {
        group: "Tempo: 트레이스",
        title: "깊이 읽기: 3.x 아키텍처",
        text: "3.x에서 아키텍처가 크게 바뀌어 2.x 기준 자료(ingester, compactor 설명)는 그대로 맞지 않는다. compactor는 backend scheduler·worker로 바뀌었고 ingester는 3.0에서 제거돼 최근 데이터는 live-store가 맡는다. 분산 모드는 Distributor → Kafka → Live-store·Block-builder·Metrics-generator로 흐르며, Kafka가 내구성을 맡아 쓰기 복제 계수를 1(RF1)로 운영한다(2.x의 RF3은 데이터를 2~2.5배 중복 저장). 비비디의 단일 바이너리(-target=all 기본값)는 “No Kafka is required.”이고, Distributor가 프로세스 내부에서 live-store와 metrics-generator로 직접 보내며 live-store가 저장소로 직접 flush한다. ACK는 live-store가 데이터를 받은 뒤 나간다. monolithic은 자원을 나눠 쓰고 따로 확장할 수 없으며, 조회가 몰리면 쓰기 처리량이 떨어지고 반대도 마찬가지이며, 처리량이 크면 OOM이 날 수 있다. Live-store는 trace ID별로 메모리에서 조립하고 max_trace_idle(기본 5s) 동안 새 스팬이 없으면 로컬 WAL(Parquet)로 내리며, WAL 데이터도 TraceQL로 검색된다. 기본값은 max_trace_live 30s, max_block_bytes 50MiB, max_block_duration 30s, complete_block_timeout 20m, wal.path /var/tempo/live-store/traces다.",
        table: {
          head: ["구성요소", "역할", "monolithic에서"],
          rows: [
            ["Distributor", "스팬 수신·검증, 쓰기 경로로 전달", "O"],
            ["Kafka 호환 큐", "distributor와 소비자 사이의 내구성 WAL", "X"],
            ["Block-builder", "Kafka를 읽어 Parquet 블록을 만들어 저장", "X"],
            [
              "Live-store",
              "최근 데이터를 메모리·로컬 WAL에 들고 조회에 응답",
              "O",
            ],
            ["Query frontend", "쿼리를 작은 job으로 나눠 병렬 실행", "O"],
            [
              "Querier",
              "live-store(최근) + 저장소 블록(과거)에서 job 실행",
              "O",
            ],
            [
              "Backend scheduler / worker",
              "compaction, retention, 블록 목록 관리",
              "O",
            ],
            [
              "Metrics-generator",
              "트레이스에서 메트릭(RED, 서비스 그래프) 생성",
              "O(선택)",
            ],
          ],
        },
        refs: ["tempoarch", "tempomodes", "tempocomponents", "tempolivestore"],
      },
      {
        group: "Tempo: 트레이스",
        title: "깊이 읽기: 2.x → 3.x 이전",
        text: "설정을 고친 뒤 바이너리를 업그레이드한다. 직접 고친다면 ingester:, ingester_client:, compactor:, metrics_generator_client: 블록과 local_blocks processor를 지운다. 3.x → 2.x 제자리 다운그레이드는 지원하지 않는다. 3.x는 2.x 블록(RF3)도 읽지만 TraceQL metrics는 3.x 블록(RF1)만 읽는다. 평평한(legacy) overrides 형식이면 시작하지 않으므로 overrides.defaults 아래 ingestion, global 같은 scope로 옮긴다(ingestion_rate_limit_bytes → ingestion.rate_limit_bytes, max_bytes_per_trace → global.max_bytes_per_trace). OpenCensus 수신과 SSB 모드는 제거됐다.",
        code: "tempo-cli migrate config --mode=monolithic old-config.yaml > new-config.yaml",
        refs: ["tempomigrate"],
      },
      {
        group: "Tempo: 트레이스",
        title: "깊이 읽기: 저장과 보존",
        text: "Parquet 컬럼 형식이라 { span.http.status_code = 500 } 같은 검색은 그 컬럼만 읽는다. 한 행이 트레이스 하나이고 trace ID 순으로 정렬된다. intrinsic과 일부 속성은 전용 컬럼, 나머지는 범용 Attrs 컬럼이며, 자주 검색하는 속성은 dedicated columns(storage.trace.block.parquet_dedicated_columns)로 올린다. 블록 형식은 vParquet3(3.1에서 쓰기 거부), vParquet4(지원), vParquet5(3.1 기본)이고 옛 블록도 읽힌다. 블록 디렉터리 <tenant-id>/<block-id>/에는 meta.json(이 파일이 생겨야 조회에 보임), data.parquet, bloom-0...(trace ID 존재를 빠르게 거르는 확률 필터), index가 있다. 저장소는 s3, gcs, azure, local이며 local은 “development and testing” 용도로 SSD만 검증했다. 용량은 하루 수집 바이트 × 보존 일수로 추정한다. compaction과 retention은 backend scheduler가 job을 만들고 worker가 실행하며(scheduler는 동시에 하나), block_retention 기본 336h(14일), 확인 주기 1h다. 관련 메트릭은 tempodb_compaction_outstanding_blocks, tempodb_retention_deleted_total, tempodb_blocklist_length다. 확인 필요: 3.x에서 block_retention을 넣는 정확한 YAML 경로.",
        refs: ["tempoblock", "tempoobject", "tempoconfig"],
      },
      {
        group: "Tempo: 트레이스",
        title: "깊이 읽기: 수집",
        text: "받는 프로토콜은 OTLP gRPC/HTTP(권장), Jaeger, Zipkin, Kafka다. OTLP 수신 기본 주소가 localhost(gRPC localhost:4317, HTTP localhost:4318)라서 다른 호스트·컨테이너에서 받으려면 주소를 명시해야 한다. 테넌트별 수집 속도 제한을 넘으면 RATE_LIMITED 오류가 난다. 샘플링은 Tempo가 아니라 보내는 쪽(SDK·수집기)에서 정한다(추론: 문서는 줄어든 메트릭을 보정하는 span_multiplier_key 같은 기능만 설명).",
        refs: ["tempoconfig", "spanmetrics"],
      },
      {
        group: "Tempo: 트레이스",
        title: "깊이 읽기: TraceQL 전체 문법",
        text: '{ }는 조건에 맞는 spanset을 고르고(빈 {}는 모든 스팬), |로 단계를 잇는다. 접두사는 span., resource., event./link./instrumentation., intrinsic용 콜론(span:, trace:, event:, link:)이며 scope를 적으면 필요한 데이터만 읽어 빠르다. duration은 span:duration과 같고, trace:duration은 트레이스 전체 시간이며, trace: intrinsic은 스팬 단위보다 빨라 가능하면 우선 쓴다. 스팬 intrinsic은 span:name, span:duration, span:status, span:statusMessage, span:kind, span:id, span:parentID, span:childCount, 트레이스 intrinsic은 trace:duration, trace:rootName, trace:rootService, trace:id다. 정규식은 전체 일치라 부분 일치는 ".*bar.*"이고, 리터럴에 nil(속성 없음)이 있다. 중괄호 안의 &&·||는 같은 스팬이, 중괄호 사이는 다른 스팬이 각각 만족해도 된다. 구조 연산자 >>(후손), >(직접 자식), <<(조상), <(직접 부모), ~(형제)는 오른쪽 스팬을 돌려주며 !>> 같은 부정은 실험 기능이다. count(), avg(), max(), min(), sum(), by(필드), select(필드, ...)로 집계한다. TraceQL metrics는 3.0에서 GA됐고 3.1부터 집계끼리 산술이 가능하다(함수 전체 목록은 확인 필요).',
        code: `{ resource.service.name = "bibbidi-backend" && kind = server } >> { status = error }
{ status = error } | by(resource.service.name) | count() > 1
{} | rate() by (resource.service.name)
{ span:duration < 5ms } | count_over_time() by(resource.service.name) | topk(10)
({status=error} | rate()) / ({} | rate())`,
        refs: ["traceql", "traceqlconstruct"],
      },
      {
        group: "Tempo: 트레이스",
        title: "깊이 읽기: metrics-generator",
        text: "트레이스를 세어 Prometheus 메트릭을 만들고 remote write로 보내며, 내부적으로 Prometheus Agent가 돈다. processor는 기본 꺼짐이라 overrides.defaults.metrics_generator.processors: [span-metrics, service-graphs]로 켠다. 3.0부터 사용자 overrides에 processors가 있으면 런타임 설정과 합치지 않고 덮어쓴다. metrics_generator.storage.path가 필수이고, remote_write에 Prometheus 주소와 send_exemplars를 둔다. collection_interval 15s, stale_duration 15m이다. span-metrics는 traces_spanmetrics_calls_total(요청률·에러율), traces_spanmetrics_latency(_bucket, _sum, _count), traces_spanmetrics_size_total을 만들고, 기본 라벨은 service, span_name(카디널리티 최대 요인), span_kind(SPAN_KIND_SERVER 등), status_code(STATUS_CODE_UNSET/OK/ERROR), 기본 버킷은 0.002, 0.004, ... 16.384초다. custom dimensions로 속성을 라벨로 추가하면 점이 _로 바뀌고, 스팬에 속성이 없으면 라벨이 조용히 생기지 않는다. Service graph view 문서는 히스토그램을 traces_spanmetrics_duration_seconds_bucket으로 적어 이름이 다르니 실제 Prometheus에서 확인이 필요하다. service-graphs는 client·server 스팬을 메모리에서 짝지어(최대 대기 wait 10s) traces_service_graph_request_total, _request_failed_total, _request_server_seconds, _request_client_seconds, _unpaired_spans_total, _dropped_spans_total을 client, server, connection_type 라벨로 만든다. 그래서 한 트레이스의 스팬이 같은 인스턴스로 와야 한다. 라벨 값이 늘면 시계열이 곱으로 늘어(고객 100명을 라벨로 넣으면 2.5만 → 250만) max_active_series, max_cardinality_per_label, span_name_sanitization으로 막고 tempo_metrics_generator_registry_active_series로 관찰한다.",
        refs: [
          "tempogenerator",
          "spanmetrics",
          "servicegraphs",
          "tempocardinality",
        ],
      },
      {
        group: "Tempo: 트레이스",
        title: "깊이 읽기: Grafana 연결과 운영",
        text: "Trace → Logs는 Tempo 데이터소스의 trace to logs 설정으로 스팬 속성을 Loki 라벨로 매핑해 같은 trace ID 로그를 연다. Trace → Metrics는 요청률·에러율·p95 쿼리로 이동한다. Service graph에는 서비스 그래프 메트릭 생성, 그 메트릭을 받는 Prometheus 데이터소스, Tempo 데이터소스의 Service graph 항목 연결 세 가지가 필요하다. 자체 메트릭(:3200/metrics)은 tempo_distributor_spans_received_total, tempo_distributor_bytes_received_total, tempo_discarded_spans_total{reason}, tempo_live_store_ready(1이면 정상), tempo_live_store_traces_created_total, tempo_query_frontend_queries_total, tempo_query_frontend_queue_length, prometheus_remote_storage_samples_failed_total이다. memory.automemlimit_enabled(기본 false)를 켜면 메모리 한도의 80%를 Go 메모리 한도로 쓴다. 상태 확인은 GET /status/backendscheduler다. 3.0은 Kafka 기반 구조를 유일한 경로로 만들고 TraceQL metrics를 GA했으며, 3.1은 vParquet5 기본, TraceQL metrics 산술, traces_service_graph_connection_info를 추가했다.",
        refs: ["servicegraphs", "tempo31"],
      },
      {
        group: "Tempo: 트레이스",
        title: "깊이 읽기: 비비디 설정과 비교해 확인할 것",
        text: "local 저장은 개발·테스트 용도라 5일 보존 트레이스의 유실 허용 여부와 함께 판단한다. block_retention: 120h가 3.x 설정 구조에서 실제로 적용되는 위치인지 블록 수·가장 오래된 블록 날짜로 확인한다. WAL 경로가 storage.trace.wal.path(기본 /var/tempo/wal)와 live_store.wal.path(기본 /var/tempo/live-store/traces)로 따로 있으니 실제로 쓰이는 경로를 확인한다. local_blocks processor가 남아 있으면 3.x에서 지운다. p95 쿼리의 traces_spanmetrics_latency_bucket 이름이 실제 Prometheus에 있는지, deployment.environment.name dimension이 deployment_environment_name 라벨이 되는지(점 → _ 규칙으로 추론) 확인한다. monolithic이라 무거운 TraceQL 조회가 수집에 영향을 주므로 2GB 서버에서 Tempo 메모리(384M 상한)를 관찰한다.",
        refs: ["tempoconfig", "spanmetrics"],
      },
      {
        group: "Grafana: 한 화면에서 조사",
        title: "Grafana: 한 화면에서 조사",
        text: "Grafana에서 메트릭·로그·트레이스 저장소를 데이터 소스로 연결한다. Explore에서 시간 범위를 맞춰 보고, 대시보드는 자주 확인할 질문을 담는다.",
        refs: ["grafana", "explore"],
      },
      {
        group: "Grafana: 한 화면에서 조사",
        title: "Grafana 깊이 읽기: 질문을 고정하기",
        text: "Explore는 새로운 가설을 시험할 때 쓰고, 반복해서 볼 오류율·지연·트래픽은 대시보드에 정리한다. 알림 규칙은 표시용 패널과 별개로 평가 조건과 연락 경로를 확인해야 한다.",
        refs: ["explore", "alert"],
      },
      {
        group: "Grafana: 한 화면에서 조사",
        title: "Grafana가 없으면",
        text: "Prometheus·Loki·Tempo는 각자 API만 있는 창고라 사람이 보기 좋은 화면이 없다. 셋을 따로 열면 그래프가 튄 시각의 로그를 찾으려고 시간을 복사해 옮겨야 한다. Grafana는 데이터를 저장하지 않고 창고에 물어봐서 보여 줄 뿐이라, Grafana를 지워도 숫자·로그·트레이스는 그대로다. 대신 대시보드·알림 규칙·사용자 같은 Grafana 설정은 grafana.db 파일 하나에 저장된다. 비비디 Grafana는 CloudWatch(EC2 상태)도 AWS API로 조회하고, 알림을 Discord와 IRM 전화로 보낸다.",
        refs: ["grafanaintro", "grafana"],
      },
      {
        group: "Grafana: 한 화면에서 조사",
        title: "들어가기와 네 가지 화면",
        text: "주소는 https://monitoring.bibbidi.kr이고 GitHub 로그인을 누르면 된다. 등록된 팀원만 들어갈 수 있고 권한은 Editor(대시보드 보기·고치기, Explore 가능, 데이터소스·사용자 관리 불가)다. 팀원 추가는 서버 설정 파일에 GitHub 아이디를 넣어야 한다.",
        table: {
          head: ["화면", "언제 쓰나", "왼쪽 메뉴"],
          rows: [
            ["대시보드", "평소 상태 확인, 알림 받았을 때", "Dashboards"],
            ["Explore", "직접 검색(로그 찾기, 트레이스 찾기)", "Explore"],
            [
              "알림 규칙",
              "어떤 알림이 있고 지금 울리는지",
              "Alerting (Alerts & IRM)",
            ],
            [
              "데이터소스",
              "창고 연결 설정(보기만)",
              "Connections > Data sources",
            ],
          ],
        },
        refs: ["grafanaroles"],
      },
      {
        group: "Grafana: 한 화면에서 조사",
        title: "비비디의 대시보드 세 개",
        text: "대시보드 위쪽 env 드롭다운으로 운영(production)·개발(development)을 바꾸고, 오른쪽 위 시간 범위를 바꾸면 모든 그래프가 같이 바뀐다. 대시보드 안의 네모 하나가 패널이며 패널 = 쿼리 + 그림 종류다. 패널 제목에 마우스를 올려 Edit을 누르면 어떤 쿼리로 그렸는지 볼 수 있어 쿼리를 배우기 가장 좋다. Explore에서는 데이터소스를 고르고 PromQL·LogQL·TraceQL을 넣으며, 몰라도 Builder 모드로 메뉴에서 고르고, Split 버튼으로 로그와 트레이스를 나란히 볼 수 있다.",
        table: {
          head: ["대시보드", "언제", "무엇을 보나"],
          rows: [
            [
              "위험(bibbidi-alerts)",
              "알림 받았을 때",
              "알림 조건 숫자, 에러 로그, 느린 요청",
            ],
            [
              "앱 서버(bibbidi-app)",
              "평소",
              "요청 수, 에러 비율, 응답 시간, DB 커넥션, 힙",
            ],
            [
              "인프라(bibbidi-infra)",
              "서버 점검",
              "디스크, CPU, 모니터링 서버 메모리, EC2 상태",
            ],
          ],
        },
        refs: ["grafanadash", "explore"],
      },
      {
        group: "Grafana: 한 화면에서 조사",
        title: "클릭으로 오가기",
        text: "세 창고가 trace_id로 이어져 있어 복사·붙여넣기 없이 클릭으로 오간다. 이 연결은 데이터소스 설정 파일(Infra/monitoring/grafana/datasources.yaml)에 정의돼 있다.",
        table: {
          head: ["출발", "누르는 곳", "도착"],
          rows: [
            [
              "로그 한 줄",
              "로그를 펼치고 trace_id 옆 Tempo 버튼",
              "그 요청의 트레이스",
            ],
            ["트레이스의 스팬", "Logs for this span", "같은 trace_id의 로그"],
            [
              "트레이스의 스팬",
              "Related metrics",
              "그 API의 요청 수·에러율·응답 시간",
            ],
            [
              "응답 시간 그래프",
              "그래프 위의 작은 점(exemplar)",
              "그 시각에 실제로 느렸던 요청의 트레이스",
            ],
          ],
        },
        refs: ["grafanaexemplars", "tracetologs", "tracetometrics"],
      },
      {
        group: "Grafana: 한 화면에서 조사",
        title: "꼭 알아야 할 네 가지",
        text: "첫째, 대시보드와 알림 규칙은 저장소에 없고 모니터링 서버의 /var/lib/grafana/grafana.db에만 있다. 화면에서 지우면 되돌리기 어렵고(13.x의 Recently deleted로 대시보드는 복원 가능), 크게 고치기 전에는 JSON 내보내기로 백업한다. 둘째, 데이터소스는 화면에서 새로 만들지 않는다. 패널과 알림 규칙이 고유 ID(uid)로 데이터소스를 찾는데, 비비디는 설정 파일로 uid를 prometheus, loki, tempo, cloudwatch로 고정해 뒀다. 화면에서 새로 만들면 uid가 달라져 패널이 깨진다. 셋째, 그래프가 비면 시간 범위, env 드롭다운, 이름표 오타를 먼저 본다. 넷째, 인프라 대시보드의 EC2 패널은 CloudWatch에서 가져와 조회할 때마다 요금이 생기므로 자동 새로고침을 5분으로 길게 잡아 뒀다. 알림은 Grafana가 규칙 쿼리를 10초 또는 1분마다 실행해 기준을 넘으면 보낸다.",
        refs: ["grafanabackup", "grafanaprov"],
      },
      {
        group: "Grafana: 한 화면에서 조사",
        title: "깊이 읽기: 판본과 데이터소스",
        text: "Grafana는 메트릭·로그·트레이스를 “query, visualize, alert on, and explore”하는 오픈소스다. 판본은 OSS(무료, 직접 운영, 비비디), Enterprise(직접 운영 + 상용 기능·공식 지원), Cloud(Grafana Labs 호스팅, 백엔드까지 묶음)다. 데이터소스는 백엔드에 대한 연결 설정(주소, 인증, 옵션)이고 종류마다 쿼리 에디터가 다르며, 없는 것은 플러그인으로 추가한다. 조직 관리자만 추가·삭제할 수 있고 OSS에서는 조직의 모든 사용자가 모든 데이터소스를 조회할 수 있다. Default 데이터소스는 새 패널·Explore·알림 규칙에서 미리 선택된다. 특수 데이터소스로 Mixed(쿼리마다 다른 데이터소스, 하나가 실패해도 나머지 표시), Dashboard(다른 패널 결과 재사용), Grafana(테스트용 Random walk, 주석)가 있다. provisioning에서 uid를 적지 않으면 자동 생성되므로 고정하려면 직접 적는다. 13.0부터 ID 기반 데이터소스 API가 기본 비활성이라 uid 기반 API를 써야 한다.",
        refs: ["grafanaintro", "grafana"],
      },
      {
        group: "Grafana: 한 화면에서 조사",
        title: "깊이 읽기: provisioning",
        text: "화면에서 클릭하는 대신 YAML 파일로 데이터소스·대시보드·알림 리소스를 만드는 방식이다. 버전 관리가 되고 서버를 다시 만들어도 같은 상태가 된다. provisioning 디렉터리 아래 datasources/, dashboards/, plugins/, alerting/에 두고 Grafana가 시작할 때 읽는다. 환경 변수 치환($VAR, \${VAR})은 값에만 쓰고, version은 여러 인스턴스가 같은 DB를 쓸 때 낮은 버전이 높은 버전을 덮지 않게 한다. 대시보드 JSON에 uid가 있으면 그 대시보드를 갱신해 URL이 유지된다. allowUiUpdates: true여도 화면에서 고친 내용은 파일로 되돌아가지 않고, 파일이 바뀌면 DB 내용을 덮어쓴다. 대시보드 v2를 파일로 넣으려면 Kubernetes 리소스 형식이어야 한다. updateIntervalSeconds가 10초 초과면 폴링, 이하면 파일 감시 이벤트다.",
        code: `apiVersion: 1
deleteDatasources:            # 먼저 지울 것
  - name: Old Loki
prune: true                   # 파일에서 빠진 프로비저닝 데이터소스 삭제
datasources:
  - name: Prometheus
    type: prometheus          # 필수
    uid: prometheus           # 생략하면 자동 생성 → 고정하려면 적기
    url: http://127.0.0.1:9090
    access: proxy             # 서버(Grafana)가 대신 요청
    isDefault: true           # 조직당 하나
    editable: false           # true 면 화면에서 수정 가능
    jsonData:                 # 데이터소스별 옵션 (평문 저장)
      timeInterval: 15s
      httpHeaderName1: X-Example-Header
    secureJsonData:           # 비밀 값 (secret_key 로 암호화 저장)
      httpHeaderValue1: \${EXAMPLE_TOKEN}

apiVersion: 1
providers:
  - name: bibbidi
    folder: ''                # 비우면 루트
    type: file
    disableDeletion: false    # true 면 파일을 지워도 대시보드 유지
    updateIntervalSeconds: 10
    allowUiUpdates: false     # false 면 화면에서 저장 불가
    options:
      path: /var/lib/grafana/dashboards`,
        refs: ["grafanaprov"],
      },
      {
        group: "Grafana: 한 화면에서 조사",
        title: "깊이 읽기: 대시보드·패널·변수",
        text: "대시보드는 변수, 시간 범위·자동 새로고침, 행/탭, 패널(쿼리 최대 26개 + 표현식 + 변환 + 시각화·옵션), 대시보드 링크로 이뤄진다. 시각화는 Time series, Stat, Gauge, Bar gauge, Bar chart, Table, Logs, Traces, Node graph, Heatmap, Histogram, State timeline, Status history, Pie chart, Text, Alert list, Annotations list, Dashboard list, Canvas, Geomap, Flame graph, Candlestick, Trend, XY chart, News 25종이다. Max data points 기본값이 그래프 픽셀 너비라 패널 크기를 바꾸면 결과 점 수가 바뀌므로 일정한 결과가 필요하면 고정값을 준다. 변수 종류는 Query, Custom, Text box, Constant, Data source, Interval, Filters(예전 Ad hoc filters), Switch이고, URL에 var-env=production 형태로 담겨 공유된다. Prometheus Query 변수의 예전 문법 label_values(metric, label)은 Classic query로 deprecated다. $__rate_interval의 scrape_interval은 쿼리의 Min step, 없으면 데이터소스의 Scrape interval 설정(기본 15s)이며 최소 4개 샘플을 보장한다($__auto는 전역 변수 문서에 없어 확인 필요). 13.0에서 동적 대시보드가 GA되어 기존 대시보드는 열 때 자동 마이그레이션되고, Git Sync가 GA됐다(13.0.0 마이그레이션 버그로 Git Sync를 쓰던 경우 대시보드가 유실될 수 있었음).",
        table: {
          head: ["전역 변수", "의미"],
          rows: [
            [
              "$__interval",
              "(to − from) / 그래프 픽셀 폭 근사. 1시간 범위 전체 화면이면 약 2m",
            ],
            [
              "$__rate_interval",
              "rate()·increase()용. max($__interval + scrape_interval, 4 × scrape_interval)",
            ],
            ["$__range", "대시보드 시간 범위 길이(Prometheus·Loki만)"],
            ["$__from, $__to", "범위 시작·끝(Unix ms)"],
            ["$__dashboard, $__org, $__user", "대시보드 이름, 조직, 사용자"],
          ],
        },
        refs: ["grafanadash", "grafanavars", "grafanaglobals", "grafana13"],
      },
      {
        group: "Grafana: 한 화면에서 조사",
        title: "깊이 읽기: Explore, Drilldown, 신호 사이 이동 설정",
        text: "Explore는 대시보드 없이 바로 쿼리하는 “starting point for querying, analyzing, and aggregating data”다. Drilldown은 쿼리 없이 클릭으로 탐색하는 앱으로 Metrics·Logs·Traces·Profiles Drilldown이 있다(예전 이름 Explore Logs 등). exemplar는 Prometheus 데이터소스만 지원하며 Exemplars 설정에서 Internal link를 켜 Tempo를 고르고 trace ID가 든 Label name을 적는다. derived fields(Loki → Tempo)는 Regex형(캡처 그룹 하나)이나 Label형(라벨·파싱된 라벨·structured metadata)으로 값을 뽑아 \${__value.raw}로 넣으며, Loki 데이터소스 Maximum lines 기본은 1000이다. trace to logs의 Tags는 스팬 속성을 Loki 라벨로 매핑하며 기본은 cluster, hostname, namespace, pod, service.name(→ service_name), service.namespace다. Loki 라벨 이름과 정확히 같아야 하고, 다르면 오류 없이 결과가 비어 있다. trace to metrics의 시간 범위 확장 기본은 -2m/2m이고 $__tags로 스팬 속성을 라벨 조건으로 넣는다(requests_total{$__tags}). service graph 노드 색은 초록 성공, 빨강 fault, 노랑 오류, 보라 스로틀링이다. Correlations는 Explore에서 다른 데이터소스를 조회하는 링크를 정의하며 Logs 패널과 Table에서 동작한다.",
        refs: [
          "explore",
          "drilldown",
          "grafanaexemplars",
          "grafanalokids",
          "tracetologs",
          "tracetometrics",
          "correlations",
        ],
      },
      {
        group: "Grafana: 한 화면에서 조사",
        title: "깊이 읽기: 설정·백업·권한",
        text: "Debian·RPM 패키지의 설정 파일은 /etc/grafana/grafana.ini이고, 다른 설치는 defaults.ini를 두고 custom.ini에 쓴다. 줄 앞 ;은 주석이다. 환경 변수 GF_<섹션>_<키>로 기존 값을 덮어쓴다(예: GF_SECURITY_ADMIN_USER). 값 확장은 $__env{VAR}, $__file{경로}다. 기본값은 http_port 3000, serve_from_sub_path false, admin_user admin, database type sqlite3(문서는 운영에 MySQL·PostgreSQL 권장), unified_alerting evaluation_timeout 30s·max_attempts 3·min_interval 10s, 13.0부터 enable_gzip 켜짐이다. 백업 대상은 grafana.ini, /var/lib/grafana/plugins, /var/lib/grafana/grafana.db이며 SQLite는 Grafana를 멈추고 복사하고, 업그레이드 전에 백업한다(DB에 저장되는 항목의 공식 목록은 확인 필요). 범위는 server admin, 조직, 팀이다. 역할은 Admin(조직의 모든 것), Editor(대시보드·폴더·플레이리스트 편집, Explore, 주석), Viewer(보기, 데이터소스 쿼리), No basic role이다. Editor는 데이터소스·사용자·팀·조직 설정을 못 바꾸며, 폴더·대시보드 단위 권한이 조직 역할보다 우선한다(Editor의 알림 규칙 편집 범위는 확인 필요). GitHub OAuth의 role_attribute_path는 JMESPath 식이고, 역할을 못 정하면 auto_assign_org_role을 주며 role_attribute_strict = true면 거부한다. 비밀은 GF_AUTH_GITHUB_CLIENT_SECRET로 넣을 수 있다.",
        code: `[auth.github]
enabled = true
client_id = ...
client_secret = ...
scopes = user:email,read:org            ; 기본값
allowed_organizations = my-org          ; 이 조직 구성원만
allow_sign_up = true                    ; 기본 true
role_attribute_path = [login=='octocat'][0] && 'Editor' || 'Viewer'
role_attribute_strict = false           ; true 면 역할을 못 정할 때 로그인 거부`,
        refs: [
          "grafanaconfig",
          "grafanabackup",
          "grafanaroles",
          "grafanagithub",
        ],
      },
      {
        group: "Grafana: 한 화면에서 조사",
        title: "깊이 읽기: 운영과 13.0 변경",
        text: "자체 메트릭은 /metrics([metrics] enabled, 필요하면 basic_auth)이고 native·classic histogram 버킷을 모두 노출한다. 13.0에서 grafana-cli, grafana-server 명령이 제거되어 grafana cli, grafana server를 쓴다. Image Renderer 플러그인 지원이 제거되어 알림 이미지·예약 보고서 스크린샷이 불가하다. /api 경로는 /apis로 deprecated, DB 메트릭 grafana_database_conn_*는 go_sql_*로 deprecated다. 비비디는 DB가 SQLite라 알림 규칙·대시보드 원본이 grafana.db 하나뿐이어서 백업이 더 중요하다(백업 시 서비스 정지 필요). 데이터소스를 provisioning으로 만들고 uid를 고정한 것은 13.0 방향과 맞다. trace to logs Tags 매핑이 Loki 라벨(service_name)과 같은지, Prometheus 데이터소스 Scrape interval이 실제 수집 주기(15s)와 같은지 확인한다. Runbook·README의 명령이 systemctl ... grafana-server(서비스 이름)인지 바이너리 명령인지 구분하고, Image Renderer 제거로 알림에 그래프 이미지가 붙지 않는다는 점도 기억한다.",
        refs: ["grafana13", "grafanaconfig"],
      },
    ],
    takeaway:
      "각 도구의 역할을 알고 나면 “어디서 막혔나”를 순서대로 확인할 수 있다.",
    lab: "stack",
  },
  {
    id: "alerting",
    number: "07",
    title: "알림과 온콜",
    lead: "문제가 생긴 사실이 담당자에게 닿고, 답을 받은 뒤에도 이어져야 한다.",
    tags: ["Grafana Alerting", "온콜", "CloudWatch"],
    flow: ["규칙 평가", "연락처", "당번 확인", "조치"],
    sections: [
      {
        title: "알림 규칙은 질문이어야 한다",
        text: "오류 비율이나 지연이 얼마 동안 어느 수준을 넘으면 실제 조치가 필요한지 정한다. Grafana Alerting은 쿼리 평가, 알림 상태, 연락처, 라우팅을 다룬다. 데이터가 없거나 쿼리가 실패한 경우도 따로 정해야 한다.",
        refs: ["alert", "contact"],
      },
      {
        title: "온콜의 다음 단계",
        text: "당번이 알림을 받으면 확인하고, 필요한 사람에게 에스컬레이션한다. 알림 메시지에는 영향 범위와 조사 화면으로 가는 링크가 있어야 시간을 아낀다.",
        refs: ["irm", "alert"],
      },
      {
        title: "감시 자체도 감시하기",
        text: "모니터링 서버가 멈추면 그 서버가 보내는 알림도 놓칠 수 있다. 독립된 경로의 CloudWatch 경보 같은 외부 감시를 별도로 둔다.",
        refs: ["cloudwatch", "sre"],
      },
    ],
    takeaway: "좋은 알림은 사람을 깨우는 이유와 첫 조사 위치를 함께 준다.",
    lab: "alerting",
  },
  {
    id: "performance",
    number: "08",
    title: "성능 테스트와 지연",
    lead: "더 많은 요청을 받는 동안 응답 시간이 어떻게 바뀌는지 읽는다.",
    tags: ["k6", "p95", "처리량"],
    flow: ["부하 증가", "처리량 변화", "p95 상승", "병목 조사"],
    sections: [
      {
        title: "서로 다른 숫자",
        text: "처리량은 일정 시간에 처리한 요청 수이고 응답 시간은 요청 하나가 끝나는 데 걸린 시간이다. p95는 느린 쪽 5%가 시작되는 경계다. 평균만 보면 일부 사용자가 겪는 긴 대기를 놓칠 수 있다.",
        refs: ["k6result", "histogram"],
      },
      {
        title: "테스트 종류",
        text: "기대 부하를 견디는지 보는 부하 테스트와 한계를 찾아보는 스트레스 테스트는 질문이 다르다. 목표 요청률, 시험 시간, 성공 기준을 먼저 적고 점진적으로 부하를 올린다.",
        refs: ["k6"],
      },
      {
        title: "결과를 읽는 순서",
        text: "요청 수와 오류, p95를 같은 시간축에 놓고 본다. 처리량이 더는 늘지 않는데 지연과 오류가 증가하면 DB 연결, 스레드, CPU 같은 포화 지표와 트레이스를 확인한다.",
        refs: ["k6result", "sre", "tempo"],
      },
    ],
    takeaway:
      "“몇 명까지 되나”보다 어떤 부하에서 어떤 품질을 지킬 수 있는지 기록하자.",
    lab: "performance",
  },
  {
    id: "incident",
    number: "09",
    title: "비비디의 장애 조사",
    lead: "알림 한 건에서 시작해 메트릭, 로그, 트레이스를 차례로 잇는다.",
    tags: ["장애 대응", "조사 순서", "복구"],
    flow: ["알림", "영향 확인", "원인 좁히기", "복구 검증"],
    sections: [
      {
        title: "처음 5분",
        text: "알림을 확인하고 고객 영향과 시작 시점을 파악한다. 대시보드에서 오류율·지연·트래픽을 함께 보고, 배포나 설정 변경이 있었는지 기록한다.",
        refs: ["alert", "sre", "explore"],
      },
      {
        title: "한 요청을 따라가기",
        text: "오류가 난 시간대의 로그에서 사건과 trace_id를 찾는다. 같은 ID의 트레이스로 느리거나 실패한 span을 확인한다. 전체가 느린지 일부 결혼 정보만 실패하는지는 메트릭으로 다시 비교한다.",
        refs: ["logql", "tempo", "promql"],
      },
      {
        title: "복구 뒤",
        text: "완화 조치 이후 같은 지표가 회복됐는지 확인한다. 타임라인, 영향, 탐지와 복구에 걸린 시간, 다음에 고칠 한 가지를 남긴다.",
        refs: ["sre", "alert"],
      },
    ],
    takeaway:
      "원인 후보는 로그 한 줄이 아니라 여러 신호가 함께 가리킬 때 좁혀진다.",
    lab: "incident",
  },
];

for (const chapter of chapters) {
  if (supplementalSections[chapter.id])
    chapter.sections.push(...supplementalSections[chapter.id]);
}

export const alternatives = [
  {
    task: "수집기",
    current: "Alloy",
    others: ["OpenTelemetry Collector", "Fluent Bit"],
    choice: "Grafana 저장소와 OTLP를 한 파이프라인에서 다룰 때",
    trade: "기존 OTel 설정과 운영 경험이 많다면 Collector가 간결할 수 있다.",
    refs: ["alloy", "collector", "fluentbit"],
  },
  {
    task: "메트릭 저장",
    current: "Prometheus",
    others: ["Grafana Mimir", "Datadog Metrics"],
    choice: "작은 규모에서 직접 운영하고 PromQL을 쓰려 할 때",
    trade: "장기 보관과 수평 확장이 중요해지면 Mimir 같은 저장소를 검토한다.",
    refs: ["prom", "mimir", "datadogmetrics"],
  },
  {
    task: "로그 저장",
    current: "Loki",
    others: ["Elasticsearch", "Datadog Logs"],
    choice: "라벨 중심으로 로그를 묶고 Grafana에서 함께 조사할 때",
    trade:
      "로그 필드 전체에 대한 복잡한 검색이 핵심이면 다른 검색 엔진도 시험한다.",
    refs: ["loki", "elastic", "datadoglogs"],
  },
  {
    task: "트레이스 저장",
    current: "Tempo",
    others: ["Jaeger", "Datadog APM"],
    choice: "Grafana에서 로그·메트릭과 트레이스를 잇고 싶을 때",
    trade: "이미 다른 APM의 계측과 운영 체계가 있다면 통합 비용을 따져야 한다.",
    refs: ["tempo", "jaeger", "datadog"],
  },
  {
    task: "조사 화면",
    current: "Grafana",
    others: ["Kibana", "New Relic"],
    choice: "여러 데이터 소스를 한 화면에서 조회할 때",
    trade: "단일 제품의 통합 운영 기능이 필요하면 관리형 제품도 비교한다.",
    refs: ["grafana", "kibana", "newrelic"],
  },
];

export const videos = [
  ["로그와 문맥", "밍구의 SLF4J와 Logback", "7l7gFDhm4Nw"],
  ["로그와 문맥", "레오의 MDC", "lkuAxAVgAX0"],
  ["로그와 문맥", "아마란스의 로깅", "X_iE36En9F4"],
  ["로그와 문맥", "이스트의 로깅", "1IMJCg68-lU"],
  ["로그와 문맥", "검프의 Logging #2", "JqZzy7RyudI"],
  ["로그와 문맥", "검프의 Logging #1", "1MD5xbwznlI"],
  ["로그와 문맥", "무늬의 로깅", "MxxeKXydn4A"],
  ["메트릭과 성능", "몽이의 Metric", "mAbG2bY2yiA"],
  ["메트릭과 성능", "베베, 허브의 성능 테스트", "3cTn53dtzJI"],
  ["메트릭과 성능", "이프의 성능 테스트", "IcSdPhxCn9Y"],
  ["메트릭과 성능", "효오의 Latency & Bandwidth", "mFBIwEhvZUY"],
  ["오류와 자원", "아인, 노아의 에러 핸들링", "89WK1xJ7CMU"],
  ["오류와 자원", "폰드의 커넥션 풀", "kNAIvfFolAs"],
  ["오류와 자원", "쿠기의 Connection Pool & Keep-Alive", "MBgEhSUOlXo"],
  ["오류와 자원", "푸우의 Tomcat Thread Pool", "prniILbdOYA"],
  ["오류와 자원", "가이온의 Garbage Collection", "wWu1lNvctic"],
  ["오류와 자원", "어썸오의 JVM Memory Layout", "GU254H0N93Y"],
  ["오류와 자원", "무민의 JVM Stack & Heap", "UzaGOXKVhwU"],
  ["운영과 인프라", "다로의 Elasticsearch", "0r0-R8NhINs"],
];
