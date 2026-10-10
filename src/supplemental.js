// Details from the manuscripts that do not fit in the short opening sections.
export const supplementalSections = {
  alerting: [
    {
      title: "알림이 오는 두 경로",
      text: "앱 문제는 Grafana가 Prometheus·Loki의 값을 평가해 Discord로 보내고, Critical이면 Cloud IRM이 당번에게 전화합니다. 모니터링 서버 자체의 장애는 외부 CloudWatch → SNS → Lambda → Discord 경로로 알립니다. Grafana가 멈추면 Grafana 알림도 멈추기 때문입니다.",
      refs: ["alert", "irm", "cloudwatch"],
    },
    {
      title: "Discord 채널과 심각도",
      text: "Warning은 #그라파나-경고-알림에서 업무 시간에 확인하고, Critical은 #그라파나-장애-알림과 IRM 전화로 전달합니다. 메시지에는 규칙 이름, 환경, 영향, 대시보드 링크와 첫 행동을 적습니다.",
      refs: ["contact", "irm"],
    },
    {
      title: "규칙 평가의 순서",
      text: "쿼리 결과를 조건과 비교하고 평가 주기와 pending 시간을 거쳐 Normal → Pending → Alerting으로 이동합니다. 잠깐 튄 값을 걸러낼 수 있지만, pending 동안 사라진 문제는 알리지 않습니다.",
      refs: ["alert"],
    },
    {
      title: "No Data와 Error는 별도 상태",
      text: "숫자가 없는 것과 쿼리가 실패한 것은 정상 값 0과 다릅니다. No Data, Error 처리 방침을 규칙마다 확인하고 수집 중단이나 데이터소스 장애도 놓치지 않도록 합니다.",
      refs: ["alert"],
    },
    {
      title: "연락처·정책·반복 간격",
      text: "연락처(contact point)는 보낼 곳, 알림 정책(notification policy)은 어떤 라벨의 알림을 어디로 보낼지 정합니다. 그룹화와 repeat interval은 같은 사건의 메시지가 과도하게 반복되지 않도록 합니다.",
      refs: ["contact"],
    },
    {
      title: "IRM에서 확인 응답하기",
      text: "Critical 전화를 받으면 Acknowledge를 눌러 담당을 잡습니다. 응답이 없으면 에스컬레이션 체인의 다음 당번으로 넘어갑니다. 당번 일정과 체인 인원을 바꾸면 비용과 라우팅도 함께 확인합니다.",
      refs: ["irm", "oncall"],
    },
    {
      title: "모니터링 서버의 바깥 감시",
      text: "CloudWatch가 EC2 상태와 자원을 감시하고 SNS가 이벤트를 배달하며 Lambda가 Discord 메시지로 바꿉니다. SNS는 최소 한 번 전달이므로 같은 메시지가 중복될 수 있습니다. 외부 경로의 실패도 정기적으로 시험해야 합니다.",
      refs: ["cloudwatch"],
    },
    {
      title: "알림을 받은 뒤의 행동",
      text: "전화는 확인하고, 위험 대시보드에서 오류·지연·트래픽과 영향 범위를 파악합니다. 장애 등급을 정해 전파한 뒤 완화, 복구 검증, 회고 순서로 진행합니다. 운영 환경만 감시하므로 개발 환경 문제는 대시보드에서 직접 확인합니다.",
      refs: ["sre", "postmortem"],
    },
  ],
  performance: [
    {
      title: "지연·대역폭·처리량·응답 시간",
      text: "지연은 이동에 걸린 시간, 대역폭은 가능한 최대 전송량, 처리량은 실제 완료량(RPS·TPS), 응답 시간은 요청부터 응답까지의 전체 시간입니다. 대역폭을 늘려도 DB 같은 병목에서 기다리면 응답은 느립니다.",
      refs: ["k6result", "sre"],
    },
    {
      title: "응답 시간은 합, 처리량은 병목",
      text: "nginx 50ms, Tomcat 500ms, MySQL 200ms라면 직렬 요청의 처리 시간은 약 750ms입니다(대기 시간 제외). 각 구간 최대 처리량이 500·200·100 RPS라면 전체 한계는 가장 작은 100 RPS입니다. 병목을 개선하면 다음 구간으로 병목이 옮겨갈 수 있습니다.",
      refs: ["sre"],
    },
    {
      title: "동시 사용자와 Little’s Law",
      text: "안정 상태에서 동시 요청 수 ≈ 처리량 × 응답 시간입니다. 사용자 사이의 생각 시간까지 포함하면 동시 사용자 수 ≈ TPS × (응답 시간 + Think Time)으로 추정할 수 있습니다. 예를 들어 100 TPS, 0.2초 응답, 1초 Think Time이면 약 120명입니다.",
      refs: ["sre"],
    },
    {
      title: "테스트 여섯 종류",
      text: "Smoke는 스크립트 확인, Average-load는 평소 부하, Stress는 평소보다 높은 부하와 회복, Soak은 장시간 누수, Spike는 급증, Breakpoint는 무너지는 지점을 봅니다. Smoke → Average-load 뒤에 필요한 시험을 고르고 부하를 천천히 올리고 유지한 뒤 내립니다.",
      refs: ["k6"],
    },
    {
      title: "테스트 전에 정할 다섯 가지",
      text: "목표 p95 응답 시간, 최대 동시 사용자, API와 Think Time을 포함한 시나리오, 부하를 올리고 유지할 시간, 시험 환경을 적습니다. 비비디는 개발 서버에서 k6 CLI로 시험하며 운영 서버에는 부하를 걸지 않습니다.",
      refs: ["k6", "k6thresholds"],
    },
    {
      title: "그래프에서 임계점 읽기",
      text: "부하를 올려도 처리량이 평평해지면 임계점입니다. 이때 p95·p99와 5xx 비율이 오르는지 함께 봅니다. 요청이 멈추면 언제 회복하는지와 안전하게 종료되는지를 기록합니다. 짧은 시험에서는 겹친 병목이나 메모리 누수를 놓칠 수 있습니다.",
      refs: ["k6result", "sre"],
    },
    {
      title: "부하 중에 함께 볼 숫자",
      text: "Grafana 앱 서버 대시보드의 env를 development로 두고 RPS, p50·p95·p99, 5xx, hikaricp_connections_pending, 힙·GC, process_cpu_usage를 봅니다. Tempo에서 느린 요청의 구간을 열어 DB·외부 API·애플리케이션 중 어디서 기다렸는지 확인합니다.",
      refs: ["promql", "tempo", "k6result"],
    },
    {
      title: "수집 비용도 시험 결과에 포함",
      text: "비비디는 트레이스를 100% 저장하므로 부하 테스트의 모든 요청도 Tempo로 갑니다. 모니터링 서버 메모리와 Loki 수집 한도까지 함께 지켜봅니다. k6 결과를 Prometheus remote write로 보내면 테스트 부하와 앱 반응을 같은 시간축에서 볼 수 있습니다.",
      refs: ["k6result", "remotewrite"],
    },
  ],
  incident: [
    {
      title: "운영 구성을 먼저 기억하기",
      text: "운영·개발 앱 서버마다 Alloy가 있고, 모니터링 서버에 Prometheus·Loki·Tempo·Grafana가 있습니다. 앱 메트릭은 Alloy의 remote write, 로그는 Loki, 트레이스는 Tempo로 흐릅니다. 같은 증상이어도 어느 신호가 끊겼는지 먼저 구분합니다.",
      refs: ["alloy", "prom", "loki", "tempo"],
    },
    {
      title: "에러 한 건을 끝까지 추적하기",
      text: "위험 대시보드에서 5xx가 시작된 시각과 영향을 찾고 해당 시각의 backend ERROR 또는 nginx 5xx 로그를 엽니다. 로그의 trace_id로 Tempo 트레이스에 이동해 실패한 span과 긴 구간을 확인합니다. 다시 Logs for this span으로 돌아와 직전 사건을 읽습니다.",
      refs: ["grafana", "logql", "tracetologs"],
    },
    {
      title: "숫자가 없을 때의 조사 순서",
      text: "Prometheus의 up과 Actuator 노출, Alloy scrape·remote write를 차례로 봅니다. 로그만 없으면 Docker 발견·라벨·Loki 전송을, 트레이스만 없으면 Spring OTLP 주소·Alloy receiver·Tempo 수신을 확인합니다. 수집 중단을 실제 무장애로 해석하지 않습니다.",
      refs: ["alloyscrape", "alloyremotewrite", "otlpreceiver"],
    },
    {
      title: "장애 등급과 대응 목표",
      text: "서비스 전체 중단·로그인 불가·상담 불가처럼 고객 영향이 큰 사고는 높은 등급으로 빠르게 전파합니다. 영향 범위와 지속 시간에 따라 등급을 조정하고, 최초 인지·전파·완화·복구 시각을 남겨 팀의 목표 대응 시간과 비교합니다.",
      refs: ["sre", "oncall"],
    },
    {
      title: "Runbook의 다섯 단계",
      text: "인지: 알림을 확인하고 영향·시작 시각을 기록합니다. 전파: 담당과 관련 팀에 현재 사실을 공유합니다. 완화: 되돌리기나 우회 등으로 고객 영향을 줄입니다. 복구: 오류율·지연·요청량의 회복을 확인합니다. 회고: 타임라인과 재발 방지 행동을 남깁니다.",
      refs: ["sre", "postmortem"],
    },
    {
      title: "알림이 울리지 않는 장애",
      text: "Grafana와 같은 서버가 죽으면 그 안의 규칙은 평가되지 않습니다. CloudWatch 경보가 SNS와 Lambda를 거쳐 Discord로 가는 독립 경로를 사용합니다. Discord 메시지가 중복될 수 있으므로 사건 시각과 대상 인스턴스로 묶어 봅니다.",
      refs: ["cloudwatch", "alert"],
    },
  ],
};
