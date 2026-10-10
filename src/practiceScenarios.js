const rows = [
  ["c1","C1 · 500 반복","Prometheus",'sum(increase(http_server_requests_seconds_count{deployment_environment_name="production", status=~"5.."}[5m]))',"5분 안에 5xx가 2건 이상이면 어떤 등급인가요?",["Critical","Warning","정상"],"C1은 5분 동안 5xx가 2건 이상 반복될 때 Critical입니다.","반복되는 5xx를 Critical로 판정합니다.","5분 increase가 2건 이상인지 확인하세요."],
  ["c2","C2 · backend 수집 실패","Prometheus",'up{job="bibbidi-backend", deployment_environment_name="production"}',"값이 0이면 가장 먼저 확인할 것은?",["backend 프로세스와 Alloy 스크레이프 경로","패널 색상","로그 보관 기간"],"C2는 backend 또는 수집 경로 장애입니다.","backend 수집 상태를 확인합니다.","Prometheus의 up 값이 0인지 확인하세요."],
  ["c3","C3 · nginx 게이트웨이 오류","Loki",'{service_name="nginx", deployment_environment_name="production"} |= "502"',"nginx 502 다음으로 확인할 것은?",["backend health와 upstream 연결","Grafana 로그인","Tempo 보관 기간"],"C3는 backend 앞단의 게이트웨이 오류입니다.","nginx 게이트웨이 오류를 찾습니다.","Loki에서 nginx와 502를 좁혀 보세요."],
  ["c4","C4 · 디스크 90%","Prometheus",'disk_usage_ratio{deployment_environment_name="production"}',"디스크 90%의 위험은?",["로그와 DB 쓰기 실패","trace_id 중복","탭 전환 실패"],"C4는 디스크 고갈 직전 상태입니다.","호스트 디스크 고갈을 판단합니다.","disk 사용률을 90%와 비교하세요."],
  ["c5","C5 · Hikari 포화","Prometheus",'hikaricp_connections_pending{deployment_environment_name="production"}',"대기 커넥션 3개 이상이면?",["DB 커넥션 풀 포화","Loki 라벨 오타","EC2 DNS 캐시"],"C5는 Hikari 커넥션 풀 포화입니다.","DB 커넥션 풀 포화를 판단합니다.","pending과 active/max를 비교하세요."],
  ["c6","C6 · 힙 고갈 직전","Prometheus",'jvm_gc_live_data_ratio{deployment_environment_name="production"}',"GC 직후 80% 초과라면?",["OOM과 긴 GC","수집 주기 증가","nginx 재시작"],"C6는 GC 이후 live data가 max의 80%를 넘는 상태입니다.","JVM 고갈 위험을 판단합니다.","live data와 max data의 비율을 보세요."],
  ["w1","W1 · 500 발생","Prometheus",'sum(increase(http_server_requests_seconds_count{deployment_environment_name="production", status=~"5.."}[5m]))',"5분 안에 5xx 1건 이상이면?",["Warning","Critical","정상"],"W1은 단일 500 발생입니다.","단일 500을 감지합니다.","increase가 0보다 큰지 확인하세요."],
  ["w2","W2 · API p95 지연","Prometheus",'histogram_quantile(0.95, sum by (le) (rate(http_server_requests_seconds_bucket{deployment_environment_name="production"}[5m])))',"API p95 1초 초과 다음 조사는?",["느린 서버 span과 DB·외부 호출","로그 색상","EC2 이름"],"W2는 일반 API p95 지연입니다.","일반 API 지연을 확인합니다.","p95에서 1초 초과 시각을 찾으세요."],
  ["w3","W3 · 소셜 로그인 p95","Tempo",'{ resource.service.name = "bibbidi-backend" && resource.deployment.environment.name = "production" && span.http.response.status_code >= 500 }',"소셜 로그인 지연에서 볼 외부 구간은?",["Kakao·Google OAuth callback","Prometheus scrape","Loki retention"],"W3는 소셜 로그인 callback 지연입니다.","OAuth callback 지연을 추적합니다.","callback과 OAuth span을 확인하세요."],
  ["w4","W4 · ERROR 로그","Loki",'{service_name="bibbidi-backend", deployment_environment_name="production"} | severity_text="ERROR"',"ERROR 로그에서 연결할 식별자는?",["trace_id","패널 ID","데이터소스 UID"],"W4는 ERROR 로그를 trace_id로 연결합니다.","backend ERROR에서 요청을 찾습니다.","로그의 trace_id를 클릭하세요."],
  ["w5","W5 · OIDC 공개 키 갱신","Loki",'{service_name="bibbidi-backend", deployment_environment_name="production"} |= "OIDC public key refresh failed"',"영향받을 기능은?",["소셜 로그인","정적 CSS","메트릭 scrape"],"OIDC 공개 키 갱신 실패는 로그인 검증에 영향을 줍니다.","OIDC 갱신 실패를 확인합니다.","scope_name과 provider 로그를 찾으세요."],
  ["w6","W6 · 디스크 80%","Prometheus",'disk_usage_ratio{deployment_environment_name="production"}',"디스크 80%는?",["C4 전조","즉시 정상","Tempo 장애"],"W6는 디스크 고갈 전조입니다.","디스크 고갈 전조를 확인합니다.","현재 사용률과 90%를 비교하세요."],
  ["w7","W7 · Loki 수집 거부","Prometheus",'loki_discarded_samples_total{deployment_environment_name="production"}',"무엇이 누락될 수 있나요?",["로그 일부","Prometheus 전체","Tempo 전체"],"W7은 Loki가 버린 로그를 감지합니다.","로그 수집 손실을 확인합니다.","discarded samples 증가를 보세요."],
  ["w8","W8 · Hikari 대기","Prometheus",'hikaricp_connections_pending{deployment_environment_name="production"}',"대기 1개 이상이면?",["DB 상태와 느린 쿼리","nginx TLS만","Grafana 테마"],"W8은 Hikari 대기 전조입니다.","DB 커넥션 대기를 확인합니다.","pending이 1 이상인지 확인하세요."],
  ["w9","W9 · 힙 사용률","Prometheus",'jvm_memory_used_ratio{deployment_environment_name="production"}',"힙 75% 초과에서 추적할 것은?",["GC 일시정지와 최근 배포","nginx access log","대시보드 링크"],"W9는 heap 사용률 75% 초과입니다.","JVM 힙 증가를 확인합니다.","heap 기준과 GC pause를 함께 보세요."],
];
const sourceName = source => source === "Prometheus" ? "PromQL" : source === "Loki" ? "LogQL" : "TraceQL";
export const practiceScenarios = rows.map(([id,title,source,query,question,choices,explanation,goal,hint]) => ({
  id,title,source,language:sourceName(source),query,question,choices,answer:0,explanation,
  goal: (id.startsWith("c") ? "Critical: " : "Warning: ") + goal,
  hint,
  intro: (id.startsWith("c") ? "Critical 미션: " : "Warning 미션: ") + title + " 상태를 확인합니다.",
}));
