// Fixed, fictional telemetry keeps every exercise usable on a static host.
export const practiceScenarios = [
  {
    id: "history",
    title: "관측의 출발점",
    source: "Loki",
    language: "LogQL",
    intro:
      "결혼 정보 저장 실패를 알리는 로그를 찾아 보세요. 한 줄의 기록에서 조사를 시작합니다.",
    query: '{service_name="bibbidi-backend"} |= "상담 저장 실패"',
    checks: ["service_name", "상담 저장 실패"],
    result: [
      "14:02:11  ERROR  상담 저장 실패 wedding_id=W-1042 trace_id=7d9c2f",
      "14:02:13  ERROR  상담 저장 실패 wedding_id=W-1043 trace_id=8a1e40",
    ],
    question: "이 기록만으로 바로 알기 어려운 것은?",
    choices: ["실패한 결혼 정보 ID", "전체 요청 중 실패 비율", "실패가 기록된 시각"],
    answer: 1,
    explanation:
      "로그는 개별 사건을 자세히 보여 줍니다. 실패 비율은 전체 요청 수와 실패 수를 메트릭으로 비교해야 합니다.",
  },
  {
    id: "logging",
    title: "로그에서 오류 찾기",
    source: "Loki",
    language: "LogQL",
    intro:
      "운영 서비스의 오류 로그만 좁혀 보고, 같은 요청의 trace ID를 찾습니다.",
    query:
      '{service_name="bibbidi-backend", deployment_environment_name="production"} | severity_text="ERROR"',
    checks: ["service_name", "production", "ERROR"],
    result: [
      "14:02:11  ERROR  상담 승인 요청 실패  status=502  trace_id=7d9c2f",
      "14:02:13  ERROR  상담 승인 요청 실패  status=502  trace_id=8a1e40",
    ],
    question: "두 로그를 같은 요청의 기록으로 묶을 때 가장 유용한 값은?",
    choices: ["service_name", "trace_id", "severity_text"],
    answer: 1,
    explanation:
      "trace_id는 요청 하나를 따라가는 식별자입니다. 서비스 이름과 로그 수준은 여러 요청에서 같을 수 있습니다.",
  },
  {
    id: "metrics",
    title: "요청률과 오류율",
    source: "Prometheus",
    language: "PromQL",
    intro:
      "최근 5분의 서버 오류 요청률을 조회해 이상이 시작된 시간을 확인합니다.",
    query: 'sum(rate(http_server_requests_seconds_count{status=~"5.."}[5m]))',
    checks: ["rate(", "http_server_requests_seconds_count", "5..", "[5m]"],
    result: [
      "14:00  0.1 req/s",
      "14:02  2.4 req/s",
      "14:04  3.1 req/s",
      "14:06  0.2 req/s",
    ],
    question: "오류 요청률이 가장 높은 시각은?",
    choices: ["14:00", "14:04", "14:06"],
    answer: 1,
    explanation:
      "14:04에 초당 3.1건으로 최고치입니다. 이 시간대를 로그와 트레이스에서 이어서 조사할 수 있습니다.",
  },
  {
    id: "trace",
    title: "느린 구간 따라가기",
    source: "Tempo",
    language: "TraceQL",
    intro:
      "상담 요청의 트레이스를 찾아 어느 구간에서 시간이 늘었는지 확인합니다.",
    query:
      '{ resource.service.name = "bibbidi-backend" && span.http.response.status_code >= 500 }',
    checks: ["resource.service.name", "bibbidi-backend", "500"],
    result: [
      "POST /api/wedding-profiles       3,020 ms",
      "  ├─ validateWeddingProfile       18 ms",
      "  ├─ partnerCalendar    2,801 ms  ERROR",
      "  └─ saveWeddingProfile            64 ms",
    ],
    question: "가장 먼저 조사할 구간은?",
    choices: ["validateWeddingProfile", "partnerCalendar", "saveWeddingProfile"],
    answer: 1,
    explanation:
      "partnerCalendar가 요청 시간의 대부분을 차지하고 오류도 표시됩니다. 해당 구간의 로그를 확인해 이유를 좁힙니다.",
  },
  {
    id: "transport",
    title: "수집 경로 점검",
    source: "Prometheus",
    language: "PromQL",
    intro:
      "대상이 정상적으로 스크레이프되는지 확인합니다. 값 1은 성공, 0은 실패입니다.",
    query: 'up{job="bibbidi-backend"}',
    checks: ["up{", "bibbidi-backend"],
    result: [
      "bibbidi-backend / production    up = 1",
      "bibbidi-backend / staging       up = 0",
    ],
    question: "staging 메트릭이 비었다면 먼저 확인할 것은?",
    choices: [
      "스크레이프 대상과 연결 상태",
      "Grafana 패널 색상",
      "로그 보관 기간",
    ],
    answer: 0,
    explanation:
      "up=0이면 수집 대상에 접근하지 못했습니다. 쿼리나 패널보다 대상 주소와 네트워크 연결을 먼저 확인합니다.",
  },
  {
    id: "stack",
    title: "세 신호 함께 보기",
    source: "Loki",
    language: "LogQL",
    intro: "메트릭에서 찾은 오류 시간대의 로그를 열고 trace ID를 찾아 보세요.",
    query: '{service_name="bibbidi-backend"} | severity_text="ERROR"',
    checks: ["service_name", "ERROR"],
    result: [
      "14:02:11  ERROR  partner calendar timeout  trace_id=7d9c2f",
      "14:02:13  ERROR  partner calendar timeout  trace_id=8a1e40",
    ],
    question: "이제 요청 내부의 지연 구간을 볼 도구는?",
    choices: ["Tempo", "Prometheus", "Alloy"],
    answer: 0,
    explanation:
      "Tempo에서 trace_id로 요청 하나의 span을 볼 수 있습니다. Prometheus는 전체 추세, Loki는 사건 로그를 보여 줍니다.",
  },
  {
    id: "alerting",
    title: "오류 알림 판단",
    source: "Prometheus",
    language: "PromQL",
    intro:
      "5분 동안 서버 오류가 2건 이상이면 담당자에게 알리는 규칙을 검토합니다.",
    query:
      'sum(increase(http_server_requests_seconds_count{status=~"5.."}[5m])) or vector(0)',
    checks: ["increase(", "http_server_requests_seconds_count", "5..", "[5m]"],
    result: [
      "14:00  0건  Normal",
      "14:02  3건  Pending",
      "14:04  5건  Alerting",
    ],
    question: "14:04에 알림 상태는?",
    choices: ["Normal", "Pending", "Alerting"],
    answer: 2,
    explanation:
      "예제에서는 기준을 넘긴 상태가 이어져 14:04에 Alerting으로 바뀝니다. 실제 규칙은 대기 시간과 No Data 처리도 정해야 합니다.",
  },
  {
    id: "performance",
    title: "부하와 지연 비교",
    source: "Prometheus",
    language: "PromQL",
    intro: "부하가 커질 때 p95 응답 시간이 어떻게 변했는지 확인합니다.",
    query:
      "histogram_quantile(0.95, sum by (le) (rate(http_server_requests_seconds_bucket[5m])))",
    checks: ["histogram_quantile(", "0.95", "_bucket", "rate("],
    result: [
      "50 req/s   p95 180 ms   errors 0%",
      "100 req/s  p95 320 ms   errors 0.2%",
      "200 req/s  p95 910 ms   errors 4.8%",
    ],
    question: "목표 p95가 500ms라면 어느 부하부터 기준을 넘습니까?",
    choices: ["50 req/s", "100 req/s", "200 req/s"],
    answer: 2,
    explanation:
      "200 req/s에서 p95가 910ms입니다. 오류도 함께 증가하므로 포화 지표와 느린 트레이스를 조사합니다.",
  },
  {
    id: "incident",
    title: "장애 원인 좁히기",
    source: "Loki",
    language: "LogQL",
    intro:
      "상담 저장 오류가 증가한 시간의 로그를 조회하고 다음 조사 위치를 정합니다.",
    query:
      '{service_name="bibbidi-backend", deployment_environment_name="production"} | severity_text=~"(?i)error"',
    checks: ["service_name", "production", "error"],
    result: [
      "14:02:11  ERROR  partner calendar timeout  trace_id=7d9c2f",
      "14:02:13  ERROR  partner calendar timeout  trace_id=8a1e40",
      "14:03:05  INFO   retry succeeded          trace_id=7d9c2f",
    ],
    question: "원인 후보를 더 좁힐 다음 행동은?",
    choices: [
      "trace_id=7d9c2f의 트레이스를 열어 지연 구간 확인",
      "로그 색상을 바꾸기",
      "오류율 패널 삭제",
    ],
    answer: 0,
    explanation:
      "같은 trace ID의 트레이스로 상담 제공자 호출 시간과 실패 상태를 확인하고, 복구 뒤 메트릭이 회복됐는지 검증합니다.",
  },
];
