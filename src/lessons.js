// 글 화면에서만 쓰는 강의 구성. 사실과 링크의 기준은 content.js의 공식 문서다.
// evolution의 각 단계: era(시기) → example(지금 방식) → body(앞 문제를 어떻게 풀었나) → question/answer(이 방식의 문제) → next(다음 단계로 넘기는 예고).
// 한 글 안에서는 예시 하나(결혼 상담 저장 실패)와 비유 하나만 끝까지 쓴다.
export const lessons = {
  history: {
    category: "History",
    readTime: "10분",
    summary:
      "관측 도구의 역사는 시스템이 커질 때마다 새로 생긴 질문의 역사입니다. 같은 “결혼 상담 저장 실패” 한 건을 시대마다 어떻게 알아챘는지 따라가 보죠.",
    bridge: {
      prev: "이 사이트의 첫 글입니다. SLF4J로 log.info()를 찍어 본 경험만 있으면 충분합니다.",
      now: "결혼 상담 저장 한 건이 실패했습니다. 이 사실을 1980년대에는 어떻게 알았고, 지금은 어떻게 알까요? 오늘의 다섯 도구가 왜 이런 모양이 됐는지 시간 순서로 먼저 훑어봅니다.",
    },
    preRead: ["sre", "otel"],
    questions: [
      "서버가 한 대에서 수십 대로 늘면 로그를 보는 방법은 어떻게 바뀌어야 할까요?",
      "요청 하나가 서비스 다섯 개를 거친다면 어디서 느려졌는지 무엇으로 알 수 있을까요?",
    ],
    evolution: [
      {
        era: "1980년대~",
        name: "서버 한 대, 로그 파일 하나",
        example:
          '$ tail -f /var/log/messages\n$ grep "wedding profile save failed" /var/log/app.log',
        body: "출발점은 텍스트 파일입니다. 프로그램은 사건을 파일에 한 줄씩 남겼고, 유닉스의 syslog는 여러 프로그램의 메시지를 같은 형식과 심각도로 모았습니다. 서버가 한 대라면 접속해서 tail로 지켜보고 grep으로 “wedding profile save failed”를 찾으면 상담 저장 실패를 알 수 있었습니다.",
        question: "결혼 서비스 서버가 열 대로 늘면 어떻게 될까요?",
        answer:
          "열 대에 각각 접속해 같은 grep을 반복해야 합니다. 어느 서버가 죽었는지조차 접속해 봐야 압니다.",
        next: "사람이 일일이 접속하는 대신 기계에게 점검을 맡길 차례입니다.",
        solved: "사건을 파일에 남기고 찾기",
        refs: ["rfc5424"],
      },
      {
        era: "1990년대",
        name: "기계가 대신 점검하고 숫자를 그래프로",
        example:
          "check_http wedding-server → OK\ncheck_disk wedding-server → WARNING 91%\n5분마다 트래픽 값 기록 → 그래프",
        body: "스크립트가 주기적으로 서버를 점검하기 시작했습니다. 결과는 정상·경고·위험 같은 상태로 나왔습니다. 트래픽 같은 숫자는 일정 간격으로 기록해 그래프로 그렸습니다. RRDtool은 크기가 정해진 파일에 이 숫자를 돌려 쓰며 보관했습니다.",
        question: "서버가 “정상”이면 상담 저장 실패도 없는 걸까요?",
        answer:
          "아닙니다. 서버는 살아 있어도 상담 API만 실패할 수 있습니다. 서버 바깥에서 본 숫자로는 앱 안의 사건이 보이지 않습니다.",
        next: "앱 안의 사건은 앱이 직접 기록해야 합니다.",
        solved: "서버 생존과 자원 숫자 보기",
        refs: ["rrdtool", "sre"],
      },
      {
        era: "1990년대 후반~2000년대",
        name: "앱 안에서 로그를 다루는 라이브러리",
        example:
          "Log4j (1990년대 후반)\njava.util.logging (JDK 1.4, 2002)\nSLF4J (2005) + Logback (2006)",
        body: "앱 안에 로깅 라이브러리가 들어왔습니다. 자바에서는 Log4j가 클래스마다 로거를 두고 수준으로 걸러 내는 구조를 퍼뜨렸습니다. 이후 SLF4J가 “호출하는 창구”와 “실제 구현”을 나눴고, 요청별 값을 로그에 붙이는 MDC도 이 무렵 쓰였습니다. 상담 저장 실패가 어느 클래스에서 어떤 수준으로 났는지 읽을 수 있게 됐습니다.",
        question:
          "로그가 잘 정리됐다면 서버 열 대의 로그도 쉽게 볼 수 있을까요?",
        answer:
          "아닙니다. 형식은 좋아졌지만 로그는 여전히 각 서버의 파일에 흩어져 있습니다.",
        next: "다음 과제는 흩어진 로그와 숫자를 서버 밖 한곳에 모으는 일입니다.",
        solved: "앱 안의 사건을 수준과 문맥으로 남기기",
        refs: ["log4j", "logging", "logback"],
      },
      {
        era: "2010년 전후",
        name: "웹 규모: 한곳에 모으기",
        example:
          "서버 수십 대의 로그 → Elasticsearch → 검색 화면\n앱 → StatsD → Graphite (상담 저장 실패 횟수)",
        body: "로그와 숫자를 중앙 한곳으로 모으기 시작했습니다. 로그는 Elasticsearch 같은 검색 엔진에 모아 한 번에 찾았습니다. 숫자는 앱이 StatsD로 보내고 Graphite에 쌓아 “상담 저장 실패 횟수” 그래프를 그렸습니다. 같은 시기 Google은 서비스 사이를 오가는 요청을 추적하는 Dapper를 논문으로 공개했습니다.",
        question:
          "결혼 정보 요청이 상담·일정·알림 서비스를 차례로 거친다면, 실패한 그 요청의 경로가 보일까요?",
        answer:
          "보이지 않습니다. 서비스마다 로그가 따로 쌓이고, 같은 요청이라는 연결 고리가 없습니다.",
        next: "그런데 이번엔 서비스가 잘게 나뉘고 서버가 수시로 생겼다 사라지면서, 이 연결 고리가 더 절실해집니다.",
        solved: "흩어진 로그와 숫자를 한곳에서 보기",
        refs: ["elastic", "graphite", "statsd", "dapper"],
      },
      {
        era: "2012~2016",
        name: "컨테이너와 마이크로서비스",
        example:
          "Prometheus: 대상을 찾아 메트릭을 주기적으로 읽기\nZipkin·Jaeger: trace_id로 서비스 사이의 구간 잇기\nGrafana: 여러 저장소를 한 화면에",
        body: "새 도구가 나왔습니다. 2012년 SoundCloud에서 시작한 Prometheus는 고정된 서버 목록 대신 대상을 찾아 메트릭을 읽어 갔습니다. Dapper의 아이디어는 Zipkin과 Jaeger 같은 오픈소스 추적 도구로 이어져, 상담 저장 실패 요청이 어느 서비스에서 멈췄는지 볼 수 있게 됐습니다.",
        question:
          "추적 도구마다 앱에 붙이는 라이브러리와 서비스 사이 헤더가 다르면 어떻게 될까요?",
        answer:
          "도구를 바꿀 때 앱 코드도 바꿔야 합니다. 서로 다른 도구를 쓰는 서비스 사이에서는 추적이 끊깁니다.",
        next: "이 불편이 계측 표준을 불러옵니다.",
        solved: "서비스를 건너는 요청 잇기",
        refs: ["prom", "zipkin", "jaeger", "grafana"],
      },
      {
        era: "2016~2020",
        name: "표준을 만들기",
        example:
          "OpenTracing (2016) + OpenCensus (2018)\n→ OpenTelemetry (2019)\nW3C Trace Context: traceparent 헤더",
        body: "표준이 생겼습니다. 처음에는 OpenTracing과 OpenCensus 둘로 나뉘었다가 OpenTelemetry로 합쳐졌습니다. 서비스 사이에서 요청 문맥을 옮기는 헤더는 W3C Trace Context로 정해졌습니다. 자바에서는 Micrometer가 메트릭 계측의 공통 창구가 됐고, 로그 쪽에서는 라벨만 색인하는 Loki가 나왔습니다.",
        question: "표준으로 데이터를 만들면 저장과 조회는 저절로 해결될까요?",
        answer:
          "아닙니다. 데이터를 받아 나눠 보내는 수집기, 신호별 저장소, 조회 화면은 따로 골라야 합니다.",
        next: "마지막으로 이 조각들을 실제로 이어 붙인 조합을 봅니다.",
        solved: "계측과 전송 방식을 하나로 맞추기",
        refs: ["otel", "context", "micrometer", "loki"],
      },
      {
        era: "2020년대",
        name: "비비디가 쓰는 조합",
        example:
          "Spring Boot → Alloy → Prometheus · Loki · Tempo → Grafana\n알림: Grafana Alerting → 연락처 → 당번",
        body: "그 위에 트레이스 저장소 Tempo, Grafana Alerting, 그리고 Grafana Agent의 뒤를 잇는 수집기 Alloy가 차례로 나왔습니다. 비비디는 이 조합으로 상담 저장 실패 한 건을 로그·메트릭·트레이스로 남기고 한 화면에서 잇습니다. 이어지는 글들은 이 구성의 각 칸을 같은 방식으로, 오래된 방법부터 따라갑니다.",
        question: "이제 어디서부터 읽으면 될까요?",
        answer:
          "가장 오래된 신호인 로그부터 시작합니다. 01번 글에서 println 한 줄이 구조화 로그가 되기까지 따라가 보세요.",
        solved: "세 신호를 모으고 잇고 알리기",
        refs: ["tempo", "alert", "alloy", "agent"],
      },
    ],
    essentials: [
      "시대마다 바뀐 질문",
      "새 도구는 앞 도구 위에 쌓였다",
      "이 사이트를 읽는 순서",
    ],
    practice: {
      lead: "앞에서 따라온 “결혼 상담 저장 실패”를 여러분의 서비스에 대입해 보세요. 아래 질문에 답하다 보면 어느 시대의 방법에 머물러 있는지 보입니다.",
      code: "1. 운영 로그를 보려면 어디에 접속하나요?\n2. 지금 초당 상담 저장 실패 수를 어디서 확인하나요?\n3. 실패한 요청 하나가 어느 구간에서 멈췄는지 알 수 있나요?\n4. 실패가 늘면 누가, 어떻게 알게 되나요?",
      language: "text",
      refs: ["sre"],
    },
    notDoing: [
      {
        text: "옛 방법을 틀린 방법으로 보지 않습니다. 서버 한 대라면 tail과 grep으로도 충분할 수 있습니다.",
        refs: ["sre"],
      },
      {
        text: "도구가 나온 연도를 외우지 않습니다. 어떤 불편이 다음 도구를 불렀는지에 집중합니다.",
        refs: ["otel"],
      },
    ],
    mistakes: [
      {
        symptom: "도구 이름은 아는데 왜 필요한지 설명하지 못한다",
        cause:
          "그 도구가 없을 때 결혼 상담 저장 실패에 대해 어떤 질문에 답할 수 없었는지 먼저 적어 봅니다.",
        refs: ["sre"],
      },
      {
        symptom: "로그만 있으면 다 된다고 생각한다",
        cause:
          "“얼마나 자주”와 “어디서 멈췄나”는 메트릭과 트레이스의 질문입니다.",
        refs: ["sre", "otel"],
      },
    ],
    related: ["logging", "metrics"],
  },
  logging: {
    category: "Logging",
    readTime: "15분",
    summary:
      "로그는 장애가 지나간 자리에 남기는 사건 기록입니다. 나중에 읽는 사람이 다음 행동을 고를 수 있어야 하죠.",
    bridge: {
      prev: "00번 글에서 관측 도구가 서버 한 대의 로그 파일에서 출발했다는 것을 봤습니다.",
      now: "그 출발점인 로그가 println 한 줄에서 표준 형식의 구조화 로그가 되기까지를, 결혼 정보 저장 실패 한 건으로 따라갑니다.",
    },
    preRead: ["logging", "springlog"],
    questions: [
      "로깅 API와 실제 출력 도구는 왜 나눠 둘까요?",
      "결혼 정보 저장 실패 한 줄을 보고 원인을 좁히려면 어떤 정보가 필요할까요?",
    ],
    evolution: [
      {
        era: "출발점",
        name: "콘솔에 한 줄 찍기",
        example: 'System.out.println("wedding profile save failed");',
        body: "처음에는 이 한 줄도 유용합니다. 내 컴퓨터에서는 실행 순서를 바로 볼 수 있으니까요.",
        question:
          "운영 서버에서 이 줄만 보고 오류인지 단순한 안내인지 구분할 수 있을까요?",
        answer:
          "구분할 수 없습니다. 모든 줄이 같은 무게로 찍혀서 “오류만 보기”가 불가능합니다.",
        next: "메시지에 심각도를 붙이면 이 문제가 풀립니다.",
        solved: "실행 흔적 남기기",
        refs: ["springlog"],
      },
      {
        era: "1980년대~",
        name: "syslog: 심각도 붙이기",
        example: "<11>Oct 10 14:32:08 wedding-server wedding-app: wedding profile save failed",
        body: "유닉스의 syslog는 메시지 앞에 시설(facility)과 심각도(severity)를 숫자로 붙였습니다. 위 예시의 <11>은 “사용자 프로그램(1) × 8 + 오류(3)”입니다. 심각도가 생기자 오류만 골라 보거나 다른 서버로 보내 모을 수 있게 됐죠. 이 형식은 나중에 RFC 문서로 정리됐습니다.",
        question:
          "그런데 앱 코드 안에서 “이 클래스는 DEBUG까지, 나머지는 WARN만” 같은 조절이 될까요?",
        answer:
          "어렵습니다. 무엇을 얼마나 남길지와 어디로 보낼지가 코드 곳곳에 박혀 있어서, 바꾸려면 코드를 고쳐야 합니다.",
        next: "이 조절을 맡을 로깅 라이브러리가 앱 안으로 들어옵니다.",
        solved: "오류만 골라 보기",
        refs: ["rfc5424"],
      },
      {
        era: "1990년대 후반~2002",
        name: "Log4j: 로거·수준·출력 대상",
        example:
          'Logger log = Logger.getLogger(WeddingService.class);\nlog.warn("wedding profile save failed weddingId=" + weddingId);',
        body: "Log4j는 클래스마다 로거를 두고, 수준(Level)으로 거르고, 출력 대상(Appender)을 설정 파일에서 바꾸게 했습니다. 달라진 점은 하나입니다. 무엇을 어디로 남길지 이제 코드가 아니라 설정이 정합니다. 2002년 JDK 1.4에도 비슷한 구조의 java.util.logging이 들어왔습니다.",
        question:
          "결혼 서비스 앱이 쓰는 라이브러리 A는 Log4j, 라이브러리 B는 java.util.logging을 쓴다면요?",
        answer:
          "한 앱 안에 로깅 설정이 둘이 됩니다. 수준을 바꾸려면 두 곳을 따로 고쳐야 하죠.",
        next: "“로그를 남겨 달라”는 창구를 하나로 모을 차례입니다.",
        solved: "설정으로 수준과 출력 위치 바꾸기",
        refs: ["log4j"],
      },
      {
        era: "2005~2006",
        name: "SLF4J와 Logback: 창구와 구현 나누기",
        example:
          'log.warn("wedding profile save failed weddingId={}", weddingId, exception);',
        body: "SLF4J는 앱과 라이브러리가 함께 부르는 창구가 됐고, 실제 수준 판단과 출력은 Logback 같은 구현체가 맡았습니다. 앞 단계 코드와 비교하면 문자열을 + 로 잇던 자리가 {}로 바뀌었습니다. 값은 따로 넘기고, 마지막 인자로 예외 객체를 넘겨 스택 정보도 보존합니다. Spring Boot는 기본으로 이 조합을 씁니다.",
        question: "이 한 줄에서 기계가 weddingId 값만 정확히 뽑아낼 수 있을까요?",
        answer:
          "문장 안에 섞인 값을 일관되게 분리하기는 어렵습니다. 서비스마다 문장 모양이 다르면 검색할 때마다 다시 해석해야 합니다.",
        next: "문장 대신 필드로 남기면 됩니다.",
        solved: "하나의 창구, {} 자리 값, 예외 보존",
        refs: ["logging", "logback", "springlog"],
      },
      {
        era: "2010년대~",
        name: "표준 출력과 구조화 로그",
        example:
          '{"time":"2026-10-10T14:32:08Z","level":"WARN","event":"wedding.profile.save.failed","weddingId":"W-42"}',
        body: "같은 실패를 JSON 같은 구조로 남깁니다. 사건 이름과 결혼 정보 ID가 각각 필드가 되어 “weddingId가 W-42인 줄”처럼 정확히 찾을 수 있습니다. 컨테이너 시대에는 앱이 파일을 직접 관리하지 않고 이 줄을 표준 출력으로 내보냅니다. 실행 환경이 그 출력을 받아 수집기로 넘기죠.",
        question:
          "결혼 서비스는 level, 상담 서비스는 severity, 또 다른 팀은 log.level이라고 쓴다면요?",
        answer:
          "같은 뜻의 필드가 이름만 다릅니다. 수집기와 검색 화면이 서비스마다 필드를 따로 해석해야 하고, “WARN 이상만 보기” 같은 질문도 서비스마다 다시 써야 합니다.",
        next: "필드 이름까지 미리 정해 둔 표준 형식을 쓸 차례입니다.",
        solved: "필드로 검색할 수 있는 로그",
        refs: ["twelvefactor", "springlog"],
      },
      {
        era: "2024~",
        name: "필드 이름 표준: ECS·Logstash·GELF",
        example: `logging:
  structured:
    format:
      console: ecs     # ecs, logstash, gelf 중 선택

{"@timestamp":"2026-10-10T14:32:08.613Z","log":{"level":"WARN","logger":"kr.bibbidi.wedding.WeddingService"},"message":"wedding profile save failed weddingId=W-42","traceId":"4bf9...","spanId":"00f0..."}`,
        body: "로그 필드 이름에도 표준이 있습니다. ECS(Elastic Common Schema)는 Elastic이 정한 필드 이름 규칙으로, 수준은 log.level, 로거는 log.logger에 담습니다. Logstash 형식과 Graylog의 GELF도 널리 쓰입니다. Spring Boot 3.4부터는 XML 없이 설정 한 줄로 이 중 하나를 고를 수 있고, MDC에 있는 traceId·spanId도 JSON에 함께 들어갑니다. 비비디는 ECS를 씁니다.",
        question:
          "표준 형식까지 갖췄으니 로그를 더 많이 남기면 늘 좋은 걸까요?",
        answer:
          "아닙니다. 민감 정보는 빼고, 정상 흐름을 모두 ERROR로 만들지 않아야 합니다. 조사에 필요한 사건만 고릅니다.",
        solved: "어느 서비스든 같은 필드 이름",
        refs: [
          "springlog",
          "springstructured",
          "ecs",
          "gelf",
          "loggingsecurity",
        ],
      },
    ],
    essentials: [
      "한 줄에 담을 것",
      "SLF4J와 Logback의 역할",
      "찾을 수 있는 로그",
    ],
    practice: {
      more: [
        {
          lead: "로컬에서 앱을 띄우고 아무 API를 호출해 콘솔 한 줄이 JSON인지 확인합니다. 그다음 application.yaml에 아래 설정을 넣고 다시 띄워 DEBUG가 보이는지 확인하세요.",
          code: "logging.level.kr.bibbidi: debug",
          refs: ["springlog"],
        },
        {
          lead: "운영 로그는 Grafana → Explore → Loki에서 봅니다. 한 줄을 펼쳐 trace_id가 붙어 있는지도 확인하세요. 요청 안에서 찍힌 로그에만 붙습니다.",
          code: '{service_name="bibbidi-backend", deployment_environment_name="production"} | severity_text=~"(?i)warn|error"',
          refs: ["logql", "explore"],
        },
      ],
      lead: "앞에서 다듬어 온 결혼 정보 저장 실패 로그입니다. weddingId를 가상의 결혼 정보 번호로 바꿔 읽어 보세요. 이 한 줄에서 사건·대상·예외를 각각 찾을 수 있는지 확인합니다.",
      code: 'log.warn("wedding profile save failed weddingId={}", weddingId, exception);',
      language: "java",
      refs: ["logging", "logback"],
    },
    notDoing: [
      {
        text: "결혼 정보 ID를 Loki 라벨로 만들지 않습니다. 로그 본문에서 검색합니다.",
        refs: ["lokilabel"],
      },
      {
        text: "카드 번호나 비밀번호를 로그로 보내지 않습니다.",
        refs: ["loggingsecurity"],
      },
      {
        text: "파일로도 남기거나 롤링하지 않습니다(logging.file.name, RollingFileAppender). 콘솔에만 찍고 Docker가 보관합니다.",
        refs: ["springlog"],
      },
      {
        text: "logback-spring.xml로 Appender 여러 개·레벨 필터·프로파일별 설정을 하지 않습니다. application.yaml만 씁니다.",
        refs: ["springloghowto"],
      },
      {
        text: "Logstash·GELF 형식 대신 ECS 형식을 씁니다.",
        refs: ["springlog"],
      },
      {
        text: "JSON 필드 이름을 바꾸거나 빼거나 더하지 않습니다(logging.structured.json.*). 기본 필드를 씁니다.",
        refs: ["springlog"],
      },
      {
        text: "구현체를 Log4j2로 바꾸지 않습니다. 기본값 Logback을 씁니다.",
        refs: ["springloghowto"],
      },
      {
        text: "앱에서 로그를 OTLP로 직접 보내지 않습니다. 콘솔에 찍고 Alloy가 읽어 갑니다.",
        refs: ["otlp", "alloy"],
      },
    ],
    mistakes: [
      {
        symptom: "에러가 너무 많이 울린다",
        cause: "예상한 사용자 입력 실패까지 ERROR로 남겼는지 확인합니다.",
        refs: ["springlog"],
      },
      {
        symptom: "로그는 있지만 원인을 좁힐 수 없다",
        cause: "사건 이름, 결혼 정보 ID, 예외 객체가 빠졌는지 봅니다.",
        refs: ["logging", "logback"],
      },
      {
        symptom: "Grafana에서 내 debug 로그가 없다",
        cause: "Alloy가 DEBUG를 버립니다.",
        refs: ["alloypipe"],
      },
      {
        symptom: "스택 트레이스가 안 찍힌다",
        cause:
          "예외를 {}에 넣거나 e.getMessage()만 찍었는지 봅니다. 마지막 인자로 e를 넘깁니다.",
        refs: ["logging"],
      },
      {
        symptom: "Spring 없는 프로젝트에서 로그가 하나도 안 찍힌다",
        cause: "SLF4J 바인딩(구현체)이 없습니다.",
        refs: ["logging"],
      },
      {
        symptom: "로그에 trace_id가 없다",
        cause:
          "요청 밖(스케줄러, 앱 시작, 직접 만든 스레드)에서 찍었는지 봅니다.",
        refs: ["tracing", "mdc"],
      },
      {
        symptom: "같은 에러가 세 번씩 찍힌다",
        cause: "여러 계층에서 각각 error를 찍었습니다.",
        refs: ["springlog"],
      },
    ],
    related: ["metrics", "trace"],
  },
  "mdc-ecs": {
    category: "Logging · Trace",
    readTime: "10분",
    summary: "MDC에 담긴 요청 컨텍스트가 구조화 로그 인코더를 거쳐 ECS JSON 필드가 되고, Alloy와 Loki에서 검색되는 경로를 연결합니다.",
    bridge: {
      prev: "앞 글에서 SLF4J와 Logback으로 로그 이벤트를 만드는 흐름을 살펴봤습니다.",
      now: "이번 글에서는 그 이벤트 안에 MDC 값이 어떻게 들어가고, ECS 필드 이름으로 어떻게 읽히는지 따라갑니다.",
    },
    preRead: ["mdc", "ecs", "springstructured"],
    questions: [
      "MDC에 넣은 값과 JSON 필드 이름은 같은 개념일까요?",
      "콘솔 JSON에 traceId가 보인 뒤 Loki 검색까지 어떤 단계가 더 필요할까요?",
    ],
    evolution: [
      {
        era: "01 · 값이 없던 로그",
        name: "메시지에 값을 직접 이어 붙이기",
        example: 'log.info("wedding profile save failed traceId=" + traceId);',
        body: "값을 메시지 문자열에 직접 붙이면 한 줄은 만들 수 있습니다. 하지만 모든 호출부가 같은 이름과 형식을 반복해야 하고, 검색기는 메시지를 다시 파싱해야 합니다.",
        question: "요청 안의 모든 로그 호출에 traceId를 직접 넣으면 빠뜨리지 않을 수 있을까요?",
        answer: "호출부가 많아질수록 빠뜨릴 가능성이 커집니다. 값의 생명주기를 로그 호출과 분리할 필요가 있습니다.",
        next: "요청 컨텍스트를 한곳에 보관하는 MDC를 사용합니다.",
        solved: "반복 인자 제거",
        refs: ["mdc"],
      },
      {
        era: "02 · 요청 컨텍스트",
        name: "MDC에 traceId와 업무 값을 담기",
        example: 'MDC.put("weddingId", weddingId);\nlog.info("profile save started");',
        body: "MDC는 현재 처리 흐름에 붙어 있는 key-value 메모장입니다. 로거 구현이 이벤트를 만들 때 이 값을 함께 읽을 수 있어 호출부는 메시지와 컨텍스트를 분리합니다.",
        question: "MDC에 값이 들어갔다면 출력 결과의 필드 이름과 자료 구조도 자동으로 표준화될까요?",
        answer: "아닙니다. MDC는 값을 보관할 뿐입니다. 어떤 출력 형식으로 인코딩할지는 로깅 구현과 설정이 결정합니다.",
        next: "구조화 로그 출력 형식과 필드 이름 규칙을 선택합니다.",
        solved: "요청별 값 보관",
        refs: ["mdc", "springlog"],
      },
      {
        era: "03 · 구조화 출력",
        name: "Spring Boot ECS JSON으로 인코딩하기",
        example: `logging:\n  structured:\n    format:\n      console: ecs`,
        body: "Spring Boot의 구조화 로그 설정은 Logback 이벤트를 사람이 읽는 문장이 아니라 JSON 객체로 출력하게 합니다. ECS를 선택하면 로그 레벨과 로거 같은 공통 필드가 정해진 이름으로 나타나고 MDC 값도 이벤트에 포함됩니다.",
        question: "JSON이 됐으면 수집기에서 모든 필드를 라벨로 만들면 검색이 더 쉬워질까요?",
        answer: "그렇지 않습니다. 값이 자주 바뀌는 필드를 라벨로 만들면 스트림 수와 저장 비용이 커집니다. 검색 방식에 맞춰 라벨과 본문 필드를 나눠야 합니다.",
        next: "Alloy의 파싱·전달 규칙과 Loki의 라벨 규칙을 맞춥니다.",
        solved: "기계가 읽는 이벤트",
        refs: ["springstructured", "ecs", "alloypipe"],
      },
    ],
    essentials: ["MDC와 ECS의 역할", "JSON 출력 확인", "수집기와 Loki의 필드 경계"],
    practice: {
      lead: "먼저 애플리케이션 콘솔에서 MDC 값이 JSON 필드로 나오는지 확인한 뒤, Alloy와 Loki에서 같은 요청을 찾아보세요.",
      code: `# 애플리케이션 로그에서 확인할 필드\njq '{timestamp: .["@timestamp"], level: .log.level, traceId, spanId, weddingId}' app.log\n\n# Loki에서는 서비스와 시간 범위를 먼저 좁힌 뒤 trace_id를 확인합니다\n{service_name="bibbidi-backend"} | json | trace_id != ""`,
      refs: ["springstructured", "ecs", "lokilabel"],
    },
    notDoing: [
      { text: "MDC 키를 모두 Loki 라벨로 승격하지 않습니다. 값이 자주 바뀌는 식별자는 구조화 메타데이터나 로그 본문으로 남깁니다.", refs: ["lokilabel"] },
      { text: "ECS 필드 이름을 애플리케이션마다 임의로 바꾸지 않습니다. 수집기와 Grafana의 연결 규칙까지 함께 바뀌기 때문입니다.", refs: ["ecs", "springstructured"] },
    ],
    mistakes: [
      { symptom: "콘솔에는 traceId가 보이는데 Loki에서 찾지 못한다", cause: "JSON 파싱 규칙이나 Loki의 필드·라벨 매핑이 실제 출력 키와 다릅니다.", refs: ["alloypipe", "lokilabel"] },
      { symptom: "로그 스트림 수가 예상보다 빠르게 늘어난다", cause: "weddingId나 traceId처럼 값이 계속 바뀌는 필드를 라벨로 만들었을 가능성이 큽니다.", refs: ["lokilabel"] },
    ],
    related: ["logging", "trace"],
    takeaway: "MDC는 값을 운반하고 ECS는 필드 계약을 제공하며, 구조화 로거와 수집기 설정이 두 세계를 실제 검색 데이터로 연결합니다.",
  },
  "ecs-to-signals": {
    category: "Logs · Metrics · Traces",
    readTime: "10분",
    summary: "ECS JSON이 그대로 세 데이터베이스 형식으로 바뀌는 것이 아니라, 한 요청에서 각 신호가 별도로 생성되고 연결되는 경로를 보여 줍니다.",
    bridge: {
      prev: "앞 글에서 MDC 값이 ECS JSON 필드로 출력되고 Loki에서 검색되는 흐름을 봤습니다.",
      now: "그 JSON 한 줄이 Prometheus 메트릭과 Tempo span으로도 바뀔까요? 같은 요청을 기록하는 세 신호가 어떻게 만들어지고 이어지는지 확인합니다.",
    },
    preRead: ["ecs", "otel", "prom", "loki", "tempo"],
    questions: [
      "JSON 로그와 Prometheus 메트릭은 누가 각각 만드는가?",
      "요청마다 달라지는 trace_id를 Prometheus 라벨에 넣으면 어떤 일이 생길까?",
      "Loki 로그에서 Tempo trace로 넘어갈 때 공통으로 필요한 값은 무엇일까?",
    ],
    evolution: [
      {
        era: "01 · 한 요청을 세 가지 질문으로 기록",
        name: "애플리케이션에서 신호별 계측",
        example: `// 로그: 사람이 읽을 사건과 문맥\nlog.error("wedding profile save failed");\n\n// 메트릭: 요청 수와 응답 시간\nrequests.increment();\n\n// 트레이스: 이 요청과 내부 작업의 시간 구간\nspan.setStatus(ERROR);`,
        body: "한 번의 HTTP 요청을 처리하면서 로거는 사건을 기록하고, Micrometer는 카운터·타이머를 갱신하며, tracing 라이브러리는 서버 span과 자식 span을 만듭니다. 같은 원인을 세 번 복제하는 것이 아니라 서로 다른 질문에 답하는 데이터를 따로 만드는 것입니다.",
        question: "로그 JSON 한 줄만 있으면 요청률 그래프와 span 시간선도 만들어질까요?",
        answer: "아니요. 로그 본문을 별도 파이프라인으로 집계하는 구성을 만들 수는 있지만 자동으로 같은 메트릭·trace가 되지는 않습니다. 메트릭 계측과 tracing 계측이 따로 필요합니다.",
        next: "각 신호는 목적지에 맞는 형식과 경로로 수집기에 전달됩니다.",
        solved: "요청별 사건·집계·실행 구간 기록",
        refs: ["metrics", "tracing", "otel"],
      },
      {
        era: "02 · 수집기에서 저장소별 전달",
        name: "Alloy가 입력 경로를 나눠 전달",
        example: `stdout JSON 로그 → Alloy → Loki\n/actuator/prometheus ← Prometheus scrape\n앱 OTLP traces → Alloy → Tempo`,
        body: "Alloy는 신호를 읽고 전달하는 수집기입니다. JSON 로그는 로그 경로로, OTLP trace는 trace 경로로 처리합니다. Prometheus 메트릭은 앱이 Prometheus 형식 엔드포인트를 노출하고 Prometheus가 scrape하는 구성이 흔합니다. 어떤 경로를 쓰는지는 설정에 달렸으며, 한 경로의 수신 성공이 나머지 경로 성공까지 뜻하지 않습니다.",
        question: "Alloy가 로그에서 traceId를 발견하면 자동으로 span을 만들까요?",
        answer: "아닙니다. trace/span 데이터는 tracing 계측이 만들고 OTLP 등의 trace 수신 경로로 보내야 합니다. 로그의 traceId는 그 span을 찾아갈 연결 값입니다.",
        next: "Grafana에서 요청 문맥을 사용해 저장소 사이를 이동합니다.",
        solved: "신호별 전달과 독립 점검",
        refs: ["alloy", "alloypipe", "prom", "tempo"],
      },
      {
        era: "03 · 요청 번호로 다시 연결",
        name: "Grafana에서 로그·trace·메트릭을 교차 조사",
        example: `Prometheus: 실패율이 오른 시각 확인\n  ↓ 시간·서비스로 후보 좁히기\nLoki: 오류 JSON에서 trace_id 복사\n  ↓ 같은 trace 열기\nTempo: 실패 span과 호출 시간 확인`,
        body: "Prometheus는 전체 추세를, Loki는 사건 한 줄을, Tempo는 요청의 작업 경로를 저장합니다. Grafana에서 시간·서비스·상태를 맞추고 로그의 trace_id를 trace 조회 링크에 연결하면 하나의 조사 흐름이 됩니다. 공통 ID가 로그와 span에 기록되어야 하며, 대시보드·데이터 소스의 상관관계 설정도 필요합니다.",
        question: "trace_id를 메트릭에도 붙여야 세 신호가 연결될까요?",
        answer: "아닙니다. 메트릭 라벨은 값 종류가 제한된 차원으로 유지합니다. trace_id는 로그와 trace를 잇는 용도로 사용하고, 메트릭에서는 시각·서비스·상태 같은 낮은 카디널리티 값으로 비교합니다.",
        solved: "각 저장소의 역할을 유지하며 상관관계 구성",
        refs: ["tracetologs", "tracetometrics", "cardinality"],
      },
    ],
    essentials: ["세 신호는 별도 생성", "저장소별 포맷과 라벨", "trace_id로 교차 조사"],
    practice: {
      lead: "같은 시간대에 실패 요청을 한 번 발생시키고, 세 저장소에서 각각 어떤 형태로 나타나는지 확인합니다. 아래는 확인용 질문과 쿼리 예시입니다. 실제 필드명·라벨은 배포 설정을 먼저 확인하세요.",
      code: `# 1) Prometheus: 실패 요청 시계열이 있는지 확인\nrate(http_server_requests_seconds_count{status="500"}[5m])\n\n# 2) Loki: 서비스와 시간으로 찾은 뒤 traceId 확인\n{service_name="bibbidi-api"} | json | log_level="ERROR"\n\n# 3) Tempo: 로그에서 찾은 trace_id로 trace 열기\n# 세 저장소에 나타나는지와 시간·서비스가 같은 요청인지 대조`,
      language: "text",
      refs: ["promql", "logql", "traceql", "tracetologs"],
    },
    notDoing: [
      { text: "ECS JSON 한 줄이 메트릭이나 span으로 자동 변환된다고 가정하지 않습니다. 각 신호의 계측·수집 경로를 따로 확인합니다.", refs: ["ecs", "otel"] },
      { text: "trace_id, span_id, userId, 개별 URL을 Prometheus 라벨이나 Loki 인덱스 라벨로 만들지 않습니다.", refs: ["cardinality", "lokilabel"] },
      { text: "세 저장소 모두에 같은 원문 JSON을 복사해 저장하지 않습니다. 필요한 필드와 각 저장소의 역할에 맞춰 보냅니다.", refs: ["loki", "prom", "tempo"] },
    ],
    mistakes: [
      { symptom: "Loki 로그는 있는데 Tempo에서 trace를 찾지 못한다", cause: "traceId 필드 이름·형식 매핑, tracing 계측, 샘플링, OTLP 전송과 Grafana trace link 설정을 확인합니다.", refs: ["tracing", "alloypipe", "tracetologs"] },
      { symptom: "오류 메트릭은 있는데 해당 요청 ID로 필터링할 수 없다", cause: "정상적인 설계일 수 있습니다. 메트릭은 집계 데이터이므로 로그의 ID로 개별 요청을 찾고 같은 시각의 메트릭을 비교합니다.", refs: ["cardinality", "promql"] },
      { symptom: "ECS 필드가 Loki에서 라벨처럼 검색되지 않는다", cause: "JSON 파싱 결과가 본문 필드인지, label 또는 structured metadata로 승격됐는지 Alloy와 Loki 설정을 확인합니다.", refs: ["alloypipe", "lokilabel", "lokimetadata"] },
    ],
    related: ["mdc-ecs", "metrics", "trace", "transport"],
    takeaway: "ECS는 로그 형식이고, Micrometer는 메트릭을, tracing 계측은 span을 만듭니다. Alloy가 각 신호를 전달하며, trace_id와 Grafana 상관관계 설정이 요청 단위 조사를 이어 줍니다.",
  },
  metrics: {
    category: "Metrics",
    readTime: "12분",
    summary:
      "메트릭은 서비스의 체온계입니다. 한 요청의 이야기는 로그가 들려주지만, 지금 얼마나 아픈지는 체온의 흐름이 먼저 알려 줍니다.",
    bridge: {
      prev: "02번 글에서 상담 저장 실패를 구조화 로그로 남겨 한 건씩 찾을 수 있게 됐습니다.",
      now: "그런데 “지금 상담 저장 실패가 늘고 있나?”는 로그를 한 줄씩 세서 답하기엔 느립니다. 숫자를 따로 재게 된 과정을 따라갑니다.",
    },
    preRead: ["metrics", "micrometer"],
    questions: [
      "로그를 수천 줄 읽지 않고 상담 저장 실패 증가를 어떻게 알아챌까요?",
      "누적 요청 수와 최근 5분 요청 수는 왜 다를까요?",
    ],
    evolution: [
      {
        era: "출발점",
        name: "로그를 하나씩 세기",
        example: "wedding.profile.save.failed\nwedding.profile.save.failed\nwedding.profile.saved",
        body: "상담 저장 실패 로그를 세면 숫자가 됩니다. 서버가 한 대이고 로그가 적을 때는 이것으로 충분하죠.",
        question: "이 방법으로 “지금” 실패가 늘었는지 바로 알 수 있을까요?",
        answer:
          "어렵습니다. 매번 로그를 다시 세야 하고, 전체 요청 수라는 분모도 따로 구해야 실패 비율이 나옵니다.",
        next: "숫자를 미리 재서 시간순으로 적어 두면 어떨까요?",
        solved: "실패 횟수 세기",
        refs: ["sre", "prom"],
      },
      {
        era: "1990년대",
        name: "서버 체온을 주기적으로 재기",
        example:
          "5분마다: 트래픽 · CPU · 디스크 값 기록\nRRD 파일: 크기 고정, 오래된 값은 평균으로 압축",
        body: "일정 간격으로 숫자를 재서 그래프로 그리기 시작했습니다. RRDtool 같은 도구는 정해진 크기의 파일에 값을 돌려 쓰고, 오래된 값은 평균으로 합쳐 공간을 아꼈습니다. 서버의 체온을 5분마다 재는 셈입니다.",
        question: "CPU 체온 그래프로 “상담 저장 실패가 늘었다”를 알 수 있을까요?",
        answer:
          "알 수 없습니다. 서버 바깥에서 재기 때문에 앱 안의 사건은 보이지 않습니다.",
        next: "이제 앱이 자기 체온을 직접 재야 합니다.",
        solved: "숫자를 시간순으로 쌓기",
        refs: ["rrdtool", "sre"],
      },
      {
        era: "2008~2011",
        name: "앱이 직접 재서 보내기: StatsD와 Graphite",
        example:
          "wedding.consultation.save.failed:1|c                 (앱 → StatsD)\nservers.web01.wedding.consultation.save.failed       (Graphite의 이름)",
        body: "앱이 상담가 실패할 때마다 StatsD에 “1 증가”를 보내고, StatsD가 일정 간격으로 모아 Graphite에 저장하게 됐습니다. 앞 단계와 다른 점은 하나, 재는 위치가 앱 안으로 들어왔다는 것입니다. Graphite는 점으로 구분한 이름으로 시계열을 구분합니다.",
        question:
          "“web01 서버”나 “카드 상담” 같은 구분을 추가하려면 어떻게 해야 할까요?",
        answer:
          "이름 안에 끼워 넣어야 합니다. 구분이 하나 늘 때마다 이름 체계를 다시 짜고, 합계를 낼 때는 와일드카드로 묶어야 하죠.",
        next: "이름과 구분을 떼어 내면 이 문제가 풀립니다.",
        solved: "앱 안의 사건을 숫자로",
        refs: ["statsd", "graphite"],
      },
      {
        era: "2012~2016",
        name: "라벨로 구분하고 읽어 가기: Prometheus",
        example:
          'http_server_requests_seconds_count{uri="/wedding-profiles", status="500"} 42',
        body: "Prometheus는 이름을 그대로 두고 구분을 라벨로 붙였습니다. uri나 status를 바꿔 가며 PromQL로 합치거나 비교합니다. 또 앱이 보내는 대신 Prometheus가 대상을 찾아 주기적으로 읽어 갑니다. 2012년 SoundCloud에서 시작해 2016년 CNCF에 합류했습니다.",
        question: "요청마다 다른 weddingId를 라벨로 붙여도 될까요?",
        answer:
          "안 됩니다. 값의 종류가 계속 늘어나는 라벨은 시계열을 급격히 늘립니다. 결혼 정보 ID는 로그와 트레이스에서 찾습니다.",
        next: "그런데 이번엔 모니터링 시스템마다 계측 라이브러리가 달라서 저장소를 바꾸면 코드도 고쳐야 합니다.",
        solved: "라벨로 나눠 비교하기",
        refs: ["prom", "promql", "cardinality"],
      },
      {
        era: "2018~",
        name: "계측 창구 통일: Micrometer와 Actuator",
        example: "Spring 앱 → Micrometer 계측 → /actuator/prometheus → 수집",
        body: "Micrometer는 카운터·게이지·타이머를 하나의 API로 다루고, 레지스트리만 바꿔 여러 시스템으로 내보내게 했습니다. 01번 글의 SLF4J가 로그에서 한 일을 메트릭에서 하는 셈이죠. Spring Boot Actuator는 이렇게 잰 체온을 HTTP 엔드포인트로 보여 줍니다.",
        question:
          "체온으로 “14시부터 상담가 느려졌다”는 알았습니다. 그중 어느 요청이 어디서 느렸는지도 알 수 있을까요?",
        answer:
          "아닙니다. 메트릭은 여러 요청을 합친 값입니다. 특정 요청을 따라가려면 요청마다 붙는 번호가 필요하고, 그게 다음 글의 주제입니다.",
        solved: "저장소와 계측 코드 분리",
        refs: ["micrometer", "actuator", "metrics"],
      },
    ],
    essentials: [
      "측정값을 밖으로 꺼내기",
      "어떤 숫자를 볼까",
      "라벨은 신중하게",
    ],
    practice: {
      more: [
        {
          lead: "로컬에서 앱을 띄운 뒤 아래를 차례로 실행합니다. API를 몇 번 호출한 뒤 다시 보면 http_server_requests_seconds_count 숫자가 늘어 있습니다. 로컬 관리 포트가 8081이 아니면 management.server.port 설정을 확인하세요.",
          code: `curl http://localhost:8081/actuator/health
curl http://localhost:8081/actuator/prometheus | grep http_server_requests
curl "http://localhost:8081/actuator/prometheus?includedNames=jvm_memory_used_bytes"   # 원하는 이름만`,
          refs: ["actuatorprom"],
        },
      ],
      lead: "이번에는 결혼 서비스의 체온을 직접 재 봅니다. 가상 결혼 서비스의 관리 포트 예시입니다. 주소가 열리지 않으면 의존성, 노출 설정, 접근 경로 순서로 살펴보세요.",
      code: "curl http://localhost:8081/actuator/prometheus",
      language: "bash",
      refs: ["metrics", "actuator"],
    },
    notDoing: [
      {
        text: "trace_id나 weddingId를 메트릭 라벨로 만들지 않습니다.",
        refs: ["cardinality"],
      },
      {
        text: "평균 응답 시간 하나로 사용자 경험을 단정하지 않습니다.",
        refs: ["histogram", "sre"],
      },
      {
        text: "응답 시간 칸(histogram)을 켜지 않습니다(management.metrics.distribution.percentiles-histogram). API 응답 시간은 Tempo가 트레이스로 만든 숫자를 씁니다.",
        refs: ["metrics", "tempo"],
      },
      {
        text: "직접 만든 측정기(Counter·Timer·Gauge)가 아직 없습니다.",
        refs: ["meters"],
      },
      {
        text: "Tomcat 스레드 메트릭을 켜지 않습니다(server.tomcat.mbeanregistry.enabled).",
        refs: ["metrics"],
      },
      {
        text: "Prometheus 대신 Datadog·OTLP 등 다른 곳으로 보내지 않습니다.",
        refs: ["metrics"],
      },
      {
        text: "Pushgateway로 밀어 넣지 않습니다. 짧게 끝나는 배치가 없습니다.",
        refs: ["metrics"],
      },
      {
        text: "loggers, env, threaddump 같은 다른 엔드포인트를 열지 않습니다. health, info, prometheus만 엽니다.",
        refs: ["endpoints"],
      },
    ],
    mistakes: [
      {
        symptom: "그래프에 결과가 없다",
        cause: "0으로 단정하기 전에 엔드포인트 노출과 수집 여부를 확인합니다.",
        refs: ["metrics", "prom"],
      },
      {
        symptom: "메트릭 저장 비용이 갑자기 늘었다",
        cause: "요청마다 달라지는 값이 라벨에 들어갔는지 확인합니다.",
        refs: ["cardinality"],
      },
      {
        symptom: "/actuator/prometheus가 404",
        cause:
          "exposure.include에 prometheus가 없거나, 관리 포트(8081)가 아닌 8080으로 요청했습니다.",
        refs: ["endpoints"],
      },
      {
        symptom: "/actuator/prometheus가 비어 있거나 없다",
        cause: "micrometer-registry-prometheus 의존성이 빠졌습니다.",
        refs: ["metrics"],
      },
      {
        symptom: "만든 Counter가 Prometheus에서 이름이 다르다",
        cause: "점이 밑줄로 바뀌고 _total 꼬리가 붙습니다.",
        refs: ["micronaming"],
      },
      {
        symptom: "운영·개발 숫자가 섞인다",
        cause: "공통 태그(환경)가 빠졌습니다.",
        refs: ["metrics"],
      },
    ],
    related: ["trace", "performance"],
  },
  trace: {
    category: "Tracing",
    readTime: "12분",
    summary:
      "trace_id는 한 요청의 번호표입니다. 섞인 로그 더미에서 같은 손님이 남긴 발자국을 찾게 해 주죠.",
    bridge: {
      prev: "03번 글에서 메트릭으로 “14시부터 상담가 느려졌다”는 것까지 알았습니다.",
      now: "이제 그 시간대의 결혼 정보 요청 하나를 골라, 그 손님이 남긴 로그와 구간을 번호표로 이어 봅니다. 서버 한 대 안에서 시작해 서비스 경계를 넘기까지 순서대로 갑니다.",
    },
    preRead: ["mdc", "tracing"],
    questions: [
      "두 결혼 정보 요청의 로그가 같은 시간에 찍히면 어떻게 구분할까요?",
      "상담 서비스로 넘어간 뒤에도 같은 요청이라는 사실은 무엇으로 전달할까요?",
    ],
    evolution: [
      {
        era: "출발점",
        name: "시간만 보고 묶기",
        example:
          "14:00:00.001 INFO  결혼 정보 저장 시작\n14:00:00.002 INFO  결혼 정보 저장 시작\n14:00:00.010 ERROR 상담 저장 실패",
        body: "로그를 시간순으로 읽어 같은 요청을 짐작합니다. 요청이 드물 때는 이 정도로도 충분합니다.",
        question: "위 실패는 두 손님 중 누구의 것일까요?",
        answer:
          "알 수 없습니다. 시각은 힌트일 뿐 같은 요청이라는 증거가 아닙니다.",
        next: "손님마다 번호표를 붙여 보죠.",
        solved: "시간순으로 읽기",
        refs: ["mdc", "tracing"],
      },
      {
        era: "서버 한 대",
        name: "번호표를 직접 넘기기",
        example: 'log.info("[{}] 결혼 정보 저장 시작", requestId);',
        body: "요청이 들어올 때 번호표(requestId)를 만들고, 로그마다 앞에 찍습니다. 이제 실패 로그의 번호표로 같은 손님의 다른 로그를 찾을 수 있죠.",
        question:
          "결혼 정보 → 상담 → 일정 메서드로 깊어질 때 이 번호표는 어떻게 따라갈까요?",
        answer:
          "모든 메서드에 인자로 넘겨야 합니다. 하나라도 빠뜨리면 그 아래 로그에는 번호표가 없습니다.",
        next: "인자로 넘기지 않아도 번호표가 따라다니면 좋겠습니다.",
        solved: "요청마다 번호표 붙이기",
        refs: ["mdc"],
      },
      {
        era: "1990년대 후반~2000년대",
        name: "MDC: 스레드에 번호표 걸어 두기",
        example:
          'MDC.put("requestId", requestId);\nlog.info("결혼 정보 저장 시작");\n// 로그 패턴: %X{requestId}',
        body: "여기서 MDC가 등장합니다. MDC는 지금 실행 중인 스레드에 키와 값을 걸어 두는 메모장입니다. 앞 단계와 달라진 곳은 한 군데입니다. 요청이 들어올 때 MDC.put으로 한 번 걸어 두면, 로그 패턴의 %X{requestId}가 모든 줄에 번호표를 찍어 줍니다.",
        question:
          "결혼 서비스가 상담 서비스를 HTTP로 호출하면, MDC의 번호표도 따라갈까요?",
        answer:
          "따라가지 않습니다. MDC는 한 프로세스, 한 스레드 안의 메모장입니다. 다른 서버에는 직접 전달해야 합니다.",
        next: "이제 번호표를 서비스 사이로 옮길 방법이 필요합니다.",
        solved: "인자 없이 번호표 유지하기",
        refs: ["mdc"],
      },
      {
        era: "2010~2015",
        name: "Dapper와 Zipkin: 서비스를 건너는 번호표",
        example:
          "X-B3-TraceId: 4bf92f3577b34da6a3ce929d0e0e4736\nX-B3-SpanId: 00f067aa0ba902b7",
        body: "Google의 Dapper 논문은 요청 전체를 trace, 그 안의 작업 구간을 span으로 부르고, 그 ID를 호출과 함께 넘기는 방법을 소개했습니다. Twitter가 공개한 Zipkin은 이를 B3라는 HTTP 헤더로 구현했습니다. 상담 서비스는 헤더를 읽어 같은 번호표를 이어 씁니다.",
        question:
          "결혼 서비스는 Zipkin, 상담 서비스는 다른 추적 도구를 쓰고 있다면요?",
        answer:
          "도구마다 헤더 이름과 모양이 달라 번호표가 서비스 경계에서 끊깁니다.",
        next: "헤더 양식 자체를 표준으로 정하면 됩니다.",
        solved: "서비스 사이로 번호표 넘기기",
        refs: ["dapper", "zipkin", "b3"],
      },
      {
        era: "2020~",
        name: "W3C traceparent: 번호표 양식 통일",
        example:
          "traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01\n             버전-trace_id-부모 span_id-플래그",
        body: "W3C Trace Context는 traceparent 헤더 하나로 양식을 정했습니다. 32자리 trace_id, 16자리 부모 span_id, 샘플링 여부 플래그가 한 줄에 담깁니다. 도구가 달라도 같은 헤더를 읽으면 번호표가 이어집니다.",
        question: "헤더로 번호표가 도착했다면, 로그에도 저절로 찍힐까요?",
        answer:
          "아닙니다. 헤더의 값을 꺼내 MDC에 걸어 주는 연동이 따로 있어야 합니다.",
        next: "마지막 단계는 헤더와 MDC를 잇는 일입니다.",
        solved: "번호표 양식 통일",
        refs: ["context"],
      },
      {
        era: "2022~",
        name: "Spring Boot 3: 헤더와 MDC 잇기",
        example:
          "traceparent → Micrometer Tracing → traceId / spanId → MDC → 로그",
        body: "Spring Boot 3에서는 Spring Cloud Sleuth의 핵심을 옮겨 온 Micrometer Tracing이 이 일을 맡습니다. 추적 연동을 켜면 들어온 traceparent를 읽거나 새로 만들고, traceId와 spanId를 로그 문맥에 넣을 수 있습니다. 이제 상담 저장 실패 로그 한 줄의 trace_id로 같은 손님의 모든 발자국을 찾습니다.",
        question: "비동기 작업에서도 아무 설정 없이 이어질까요?",
        answer:
          "그렇게 단정하면 안 됩니다. 실행 문맥이 달라질 때 전파 설정을 확인해야 합니다.",
        solved: "헤더와 로그 문맥 자동 연결",
        refs: ["sleuth", "tracing", "mdc"],
      },
    ],
    essentials: ["요청 하나의 실마리", "MDC에 담기는 값", "메트릭과의 관계"],
    practice: {
      more: [
        {
          lead: "로컬에서 API를 하나 호출하고 콘솔 JSON에 traceId가 있는지, 같은 요청에서 찍힌 여러 줄의 traceId가 모두 같은지 봅니다. 운영에서는 Grafana → Explore → Loki에서 아래처럼 조회하면 그 요청에서 찍힌 로그가 시간순으로 전부 나옵니다.",
          code: '{service_name="bibbidi-backend", deployment_environment_name="production"} | trace_id="여기에 trace_id"',
          refs: ["logql", "explore"],
        },
      ],
      lead: "번호표를 직접 넘기던 두 번째 단계의 코드입니다. 아래 로그 호출이 어느 요청의 기록인지 알려면 무엇을 더 봐야 할까요? 실습 화면에서 trace_id를 선택해 이어지는 기록을 확인해 보세요.",
      code: 'log.info("[{}] 결혼 정보 저장 시작", requestId);',
      language: "java",
      refs: ["mdc", "context"],
    },
    notDoing: [
      {
        text: "trace_id를 메트릭 라벨로 붙이지 않습니다.",
        refs: ["cardinality"],
      },
      {
        text: "같은 시각에 찍혔다는 이유만으로 로그를 같은 요청으로 묶지 않습니다.",
        refs: ["context"],
      },
      {
        text: "회원 ID 등을 직접 MDC에 넣지 않습니다. traceId·spanId만 Spring이 자동으로 넣습니다.",
        refs: ["mdc"],
      },
      {
        text: "사람용 로그 패턴의 traceId 모양(logging.pattern.correlation)을 바꾸지 않습니다. 구조화 로그(JSON)라 해당이 없습니다.",
        refs: ["tracing"],
      },
      {
        text: "baggage(trace_id처럼 서버를 넘어 전달되는 사용자 정의 값)를 쓰지 않습니다.",
        refs: ["tracing"],
      },
      {
        text: "비동기 스레드로 MDC·트레이스를 넘기는 설정을 하지 않습니다. 비동기 처리가 거의 없습니다.",
        refs: ["observability"],
      },
    ],
    mistakes: [
      {
        symptom: "로그와 트레이스의 ID가 다르다",
        cause: "서비스를 넘는 호출에서 traceparent가 전달되는지 확인합니다.",
        refs: ["context", "tracing"],
      },
      {
        symptom: "비동기 작업의 MDC가 비어 있다",
        cause: "실행 문맥 전파를 확인합니다.",
        refs: ["tracing"],
      },
      {
        symptom: "다른 사용자의 ID가 로그에 찍힌다",
        cause: "MDC.remove를 finally에서 하지 않았습니다(스레드 재사용).",
        refs: ["mdc"],
      },
      {
        symptom: "로그에 traceId가 없다",
        cause:
          "요청 밖(스케줄러, 앱 시작)이거나 다른 스레드(@Async, 직접 만든 스레드)에서 찍었습니다.",
        refs: ["tracing", "observability"],
      },
      {
        symptom: "외부 서버까지 trace가 이어지지 않는다",
        cause: "HTTP 클라이언트를 Spring 빌더가 아니라 new로 만들었습니다.",
        refs: ["tracing"],
      },
      {
        symptom: "MDC에 넣은 값이 Loki에서 검색되지 않는다",
        cause: "Alloy가 뽑는 필드가 아닙니다. | json으로 풀어서 찾습니다.",
        refs: ["logql"],
      },
    ],
    related: ["logging", "transport"],
  },
  transport: {
    category: "OpenTelemetry",
    readTime: "14분",
    summary:
      "계측 데이터는 택배와 같습니다. 포장 방식(API·SDK)과 송장 양식(OTLP)이 통일돼야 어느 창고로든 보낼 수 있죠.",
    bridge: {
      prev: "04번 글에서 trace_id로 상담 저장 실패 요청의 로그와 구간을 잇는 방법을 봤습니다.",
      now: "그렇게 만든 트레이스·메트릭·로그는 앱 밖으로 배송돼야 저장됩니다. 제품마다 달랐던 포장과 송장이 하나의 표준으로 모이기까지를 따라갑니다.",
    },
    preRead: ["otel", "otlp"],
    questions: [
      "저장소마다 전용 SDK를 붙이면 목적지를 바꿀 때 무엇을 함께 바꿔야 할까요?",
      "표준 API와 전송 프로토콜은 서로 어떤 문제를 해결할까요?",
      "데이터를 만든 뒤에는 어디에서 배송 성공을 확인해야 할까요?",
    ],
    evolution: [
      {
        era: "2010년대 초중반",
        name: "창고마다 다른 포장과 송장",
        example:
          "결혼 서비스 앱 → 저장소 A 전용 SDK\n상담 앱 → 저장소 B 전용 에이전트",
        body: "04번 글의 Zipkin·Jaeger 시절에는 창고(저장소)가 저마다의 방식으로 택배를 받았습니다. 앱마다 특정 제품의 SDK나 에이전트를 붙이고, 그 제품이 기대하는 필드와 전송 방식에 맞췄습니다. 로그·메트릭·트레이스의 포장 방식도, 요청을 잇는 문맥을 전달하는 방법도 제품마다 달랐습니다.",
        question:
          "상담 저장 실패 트레이스를 보낼 창고를 바꾸면, 앱에서 무엇이 같이 바뀔까요?",
        answer:
          "계측 코드, 내보내기 모듈, 속성 이름, 운영 설정이 함께 바뀔 수 있습니다. 앱이 창고에 묶여 있는 거죠.",
        next: "앱 코드를 창고에서 떼어 내려는 표준이 이 무렵 나옵니다.",
        solved: "일단 보내고 저장하기",
        refs: ["otel", "jaeger", "context"],
      },
      {
        era: "2016~2018",
        name: "표준이 둘: OpenTracing과 OpenCensus",
        example:
          "OpenTracing: 트레이싱 API만 정의, 구현은 각 도구가\nOpenCensus: 트레이스·메트릭 API와 라이브러리를 함께 제공",
        body: "포장 방식을 공통으로 정하려는 표준이 나왔습니다. 그런데 하나가 아니라 둘이었습니다. OpenTracing은 트레이싱 API를 정하고 구현은 각 추적 도구에 맡겼습니다. Google에서 시작한 OpenCensus는 트레이스와 메트릭을 모으는 라이브러리까지 제공했습니다.",
        question:
          "표준이 둘이면 결혼 서비스 앱이 쓰는 HTTP 라이브러리 작성자는 어떻게 해야 할까요?",
        answer:
          "둘 다 지원하거나 하나를 골라야 합니다. 생태계가 다시 둘로 나뉩니다.",
        next: "결국 두 표준은 하나로 합쳐집니다.",
        solved: "앱 코드를 제품에서 떼어 내기 시작",
        refs: ["otel"],
      },
      {
        era: "2019~",
        name: "OpenTelemetry와 OTLP: 포장과 송장 통일",
        example: "앱의 계측 → OpenTelemetry SDK → OTLP",
        body: "2019년 두 프로젝트가 OpenTelemetry로 합쳐졌습니다. OpenTelemetry는 계측 API와 SDK, 공통 속성 이름을 제공해 포장 방식을 통일합니다. OTLP는 트레이스·메트릭·로그를 옮기는 송장 양식, 즉 인코딩과 전송 규약입니다. OTLP/HTTP의 기본 포트는 4318, OTLP/gRPC는 4317입니다.",
        question: "앱에서 OTLP로 보냈다면 창고에 바로 도착했을까요?",
        answer:
          "아닙니다. 택배는 여러 구간을 지납니다. 앱의 발송, 중간 집하장의 수신, 창고의 입고를 따로 확인해야 합니다.",
        next: "마지막으로 중간 집하장인 수집기를 봅니다.",
        solved: "포장과 송장을 하나로",
        refs: ["otel", "otlp"],
      },
      {
        era: "지금",
        name: "수집기에서 경로 나누기",
        example:
          "트레이스: 앱 → OTLP → Alloy → Tempo\n메트릭: Actuator → Alloy → Prometheus\n로그: 콘솔 출력 → Alloy → Loki",
        body: "여기서 수집기가 필요합니다. 수집기는 택배를 받아 분류한 뒤 창고별로 보내는 집하장입니다. 표준을 쓴다고 창고가 자동으로 연결되지는 않죠. 세 신호가 서로 다른 길로 들어올 수 있고, 한 경로가 성공해도 다른 경로까지 성공한 것은 아닙니다.",
        question: "상담 저장 실패 트레이스가 Tempo에 안 보이면 어디부터 확인할까요?",
        answer:
          "앱의 OTLP 목적지와 Alloy 수신기입니다. 그다음 Alloy에서 Tempo로 이어지는 출력을 봅니다.",
        solved: "신호별로 받아 나눠 보내기",
        refs: ["alloy", "alloypipe", "metrics", "otlp"],
      },
    ],
    essentials: ["표준의 역할", "비비디의 예시 경로", "전송이 끊기면"],
    practice: {
      more: [
        {
          lead: "트레이스 하나를 열어 Resource 속성에 service.name, service.version, service.instance.id, deployment.environment.name 네 값이 있는지 확인합니다.",
          code: '{ resource.service.name = "bibbidi-backend" && resource.deployment.environment.name = "production" }',
          refs: ["semconv", "tempo"],
        },
      ],
      lead: "보낸 택배가 창고에 잘 들어왔는지 확인합니다. 가상 결혼 서비스의 TraceQL 예시입니다. Tempo에 트레이스가 없다면 쿼리를 바꾸기 전에 앱과 수집기의 연결부터 확인해 보세요.",
      code: '{ resource.service.name = "bibbidi-backend" && resource.deployment.environment.name = "production" }',
      language: "traceql",
      refs: ["tempo", "otlp", "alloypipe"],
    },
    notDoing: [
      {
        text: "세 신호를 모두 OTLP로 보내야 한다고 가정하지 않습니다. 비비디 예시는 메트릭 pull, 로그 읽기, 트레이스 push를 섞습니다.",
        refs: ["metrics", "alloy", "otlp"],
      },
      {
        text: "OTel을 저장소나 조회 화면으로 부르지 않습니다.",
        refs: ["otel"],
      },
      {
        text: "OTLP/gRPC(4317)를 쓰지 않습니다. HTTP(4318)만 씁니다.",
        refs: ["otlp"],
      },
      {
        text: "OTel Java Agent(코드·의존성 없이 JVM 옵션으로 자동 계측)를 쓰지 않습니다. Spring 스타터를 씁니다.",
        refs: ["otel"],
      },
      {
        text: "샘플링으로 일부만 저장하지 않습니다. 100% 저장합니다.",
        refs: ["tracing"],
      },
      {
        text: "Zipkin·Brave로 보내지 않습니다. OTLP로 보냅니다.",
        refs: ["tracing"],
      },
      {
        text: "앱에서 Tempo로 바로 보내지 않습니다. 토큰·주소를 앱이 몰라도 되게 Alloy를 거칩니다.",
        refs: ["alloy"],
      },
      {
        text: "메트릭·로그까지 OTLP로 통일하지 않습니다. 세 데이터를 한 방식으로 보내는 구성도 가능합니다.",
        refs: ["alloylgtm"],
      },
    ],
    mistakes: [
      {
        symptom: "앱에서는 span을 만들었는데 Tempo가 비었다",
        cause:
          "내보내기 주소, Alloy 수신기, Tempo 쓰기 경로를 순서대로 봅니다.",
        refs: ["otlp", "alloypipe", "tempo"],
      },
      {
        symptom: "로그는 오는데 트레이스는 없다",
        cause: "신호별 파이프라인이 별개인지 확인합니다.",
        refs: ["alloypipe"],
      },
      {
        symptom: "트레이스가 10개 중 1개만 보인다",
        cause: "샘플링 기본값 10%를 그대로 두었습니다.",
        refs: ["tracing"],
      },
      {
        symptom: "트레이스가 하나도 오지 않는다",
        cause:
          "endpoint 주소·경로(/v1/traces) 오류이거나, Alloy가 4318을 열지 않았습니다.",
        refs: ["otlp", "otlpreceiver"],
      },
      {
        symptom: "Tempo에서 환경으로 검색이 안 된다",
        cause:
          "OTEL_RESOURCE_ATTRIBUTES에 deployment.environment.name이 빠졌습니다.",
        refs: ["semconv"],
      },
      {
        symptom: "외부 서버 호출이 트레이스에 안 보인다",
        cause: "HTTP 클라이언트를 Spring 빌더 없이 new로 만들었습니다.",
        refs: ["tracing"],
      },
      {
        symptom: "로컬에서 OTLP로 보내기 실패 경고가 보인다",
        cause:
          "보낼 곳(alloy:4318)이 없어서입니다. 로컬 프로파일에서는 무시해도 됩니다.",
        refs: ["otlp"],
      },
    ],
    related: ["trace", "stack"],
  },
  stack: {
    category: "Tool map",
    readTime: "16분",
    summary:
      "Alloy는 택배 기사, 세 저장소는 물건 종류별 창고, Grafana는 창고를 함께 살피는 관제실입니다.",
    bridge: {
      prev: "05번 글에서 OpenTelemetry와 OTLP로 데이터를 앱 밖으로 배송하는 길을 봤습니다.",
      now: "이번에는 받는 쪽입니다. 상담 저장 실패 기록을 서버에 직접 들어가 보던 시절부터, 택배 기사·창고·관제실로 역할을 나눈 비비디의 구성까지 순서대로 갑니다.",
    },
    preRead: ["alloy", "grafana"],
    questions: [
      "수집기와 저장소를 같은 도구로 생각하면 어떤 문제가 생길까요?",
      "로그와 트레이스를 같은 검색창에서만 찾으려 하면 무엇을 놓칠까요?",
    ],
    evolution: [
      {
        era: "서버 한 대",
        name: "서버에 접속해 직접 보기",
        example: "ssh bibbidi-prod\ndocker logs bibbidi-backend | grep ERROR",
        body: "처음에는 창고 없이 물건이 각 서버에 쌓여 있습니다. 서버에 접속해 docker logs로 상담 저장 실패를 찾는 식입니다. 서버가 하나일 때는 이 방법도 통합니다.",
        question: "서버가 여러 대이거나 컨테이너를 새로 띄우면 어떻게 될까요?",
        answer:
          "서버마다 접속해야 하고, 컨테이너를 지우면 그 안에 쌓인 로그도 함께 사라질 수 있습니다.",
        next: "물건을 서버 밖 창고 한곳에 모을 차례입니다.",
        solved: "서버 안에서 찾기",
        refs: ["dockerlogs"],
      },
      {
        era: "2010년 전후",
        name: "한 창고에 모아 전문 검색",
        example: "각 서버 로그 → Elasticsearch(본문 색인) → 검색 화면",
        body: "로그를 중앙 검색 엔진에 모았습니다. Elasticsearch는 로그 본문의 단어를 색인해 어떤 단어로도 빠르게 찾게 해 줍니다. 이제 서버에 접속하지 않고 상담 저장 실패를 검색할 수 있죠.",
        question:
          "로그 창고는 생겼는데, 상담 저장 실패율 그래프와 트레이스는 어디서 볼까요?",
        answer:
          "신호마다 다른 도구와 화면을 따로 열어야 했습니다. 같은 시간대를 맞춰 보는 일도 사람 몫이었죠.",
        next: "창고는 그대로 두고 여러 창고를 함께 보는 관제실을 만들면 어떨까요?",
        solved: "로그를 한 창고에서 검색",
        refs: ["elastic", "kibana"],
      },
      {
        era: "2014~",
        name: "관제실 하나: Grafana",
        example:
          "데이터 소스: Prometheus · Elasticsearch · …\n→ 같은 대시보드, 같은 시간 범위",
        body: "Grafana는 물건을 직접 보관하지 않고, 여러 창고를 데이터 소스로 연결해 쿼리 결과를 보여 줍니다. 상담 저장 실패율 그래프와 로그를 같은 시간 범위로 나란히 놓을 수 있게 됐죠.",
        question:
          "관제실은 하나가 됐는데, 로그 본문을 전부 색인하는 창고의 비용은요?",
        answer:
          "그대로 큽니다. 들어오는 모든 로그를 색인하면 저장 공간과 처리 비용이 함께 늘어납니다.",
        next: "물건 종류마다 맞는 창고를 따로 둘 때가 됐습니다.",
        solved: "여러 창고를 한 화면에서",
        refs: ["grafana"],
      },
      {
        era: "2016~2020",
        name: "물건 종류별 창고: Prometheus·Loki·Tempo",
        example:
          "Prometheus = 메트릭\nLoki = 로그 (라벨만 색인)\nTempo = 트레이스 (trace_id로 찾기)",
        body: "신호마다 창고를 나눕니다. Prometheus는 라벨 붙은 시계열을 저장합니다. Loki는 로그 본문을 색인하지 않고 Prometheus처럼 라벨만 색인해 비용을 줄였습니다. Tempo는 trace_id로 트레이스를 찾고 객체 저장소에 보관합니다. 물건마다 구조와 찾는 질문이 다르기 때문입니다.",
        question: "창고가 셋이면 결혼 서비스 앱이 세 곳으로 각각 배송해야 할까요?",
        answer:
          "그러면 앱이 창고 주소를 모두 알아야 합니다. 창고를 바꿀 때마다 앱도 바뀌죠.",
        next: "앱과 창고 사이에 택배 기사를 두면 됩니다.",
        solved: "신호마다 맞는 창고",
        refs: ["prom", "loki", "tempo", "lokilabel"],
      },
      {
        era: "2020~2024",
        name: "택배 기사 하나: Grafana Agent에서 Alloy로",
        example:
          "Grafana Agent (2020) → Grafana Alloy (2024)\n입력 컴포넌트 → 처리 컴포넌트 → 출력 컴포넌트",
        body: "Grafana는 메트릭·로그·트레이스를 함께 모으는 Grafana Agent를 만들었고, 2024년 그 뒤를 잇는 Alloy를 내놓았습니다. Alloy는 Prometheus 파이프라인을 내장한 OpenTelemetry Collector 배포판입니다. 입력·처리·출력을 컴포넌트로 이어 메트릭 수집, 로그 읽기, OTLP 수신을 한 설정에서 다룹니다.",
        question: "Alloy만 두면 지난주 상담 저장 실패 로그를 찾을 수 있을까요?",
        answer:
          "아닙니다. 택배 기사는 창고를 대신하지 않습니다. 각 신호를 보관하고 조회할 창고가 필요합니다.",
        next: "마지막으로 택배 기사·창고·관제실을 한 흐름으로 이어 씁니다.",
        solved: "앱과 창고 사이의 배송 담당",
        refs: ["alloy", "alloywhy", "agent", "alloypipe"],
      },
      {
        era: "지금",
        name: "관제실에서 이어 조사하기",
        example: "상담 저장 실패율 그래프 → 에러 로그 → trace_id → 느린 span",
        body: "지금은 관제실 Grafana에서 세 창고를 오가며 조사합니다. Explore에서 가설을 시험하고, 자주 볼 질문은 대시보드에 둡니다. 알림은 평가 조건과 연락 경로를 따로 설정합니다.",
        question: "그래프가 비었을 때 Grafana 화면부터 바꾸면 될까요?",
        answer:
          "먼저 해당 창고에 물건이 들어왔는지 확인합니다. 배송 경로와 쿼리 조건도 함께 봐야 합니다.",
        solved: "세 창고를 오가며 조사",
        refs: ["grafana", "explore", "alert"],
      },
    ],
    essentials: [
      "Alloy: 수집과 전달",
      "Prometheus: 메트릭",
      "Loki: 로그",
      "Tempo: 트레이스",
      "Grafana: 한 화면에서 조사",
    ],
    practice: {
      more: [
        {
          lead: "Alloy가 잘 보내고 있는지 앱 서버에서 봅니다. 아무것도 안 나오면 정상이고, 401이 보이면 MONITORING_INGEST_TOKEN이 모니터링 서버와 다른 것입니다.",
          code: "docker logs alloy --since 10m 2>&1 | grep -iE '401|error'",
          refs: ["alloy"],
        },
        {
          lead: "숫자를 가져오고 있는지 Grafana → Explore → Prometheus에서 봅니다. 운영·개발 각각 1이면 정상, 0이거나 아무것도 없으면 수집이 끊긴 것입니다.",
          code: 'up{job="prometheus.scrape.bibbidi_backend"}',
          refs: ["alloyscrape"],
        },
        {
          lead: "Grafana → Explore → Prometheus에서 아래 쿼리를 차례로 실행합니다. 각각 backend 생존(1이면 정상), 최근 5분 500 에러 수(0이면 정상), 힙 사용률(0.75를 넘으면 경고 알림 기준), DB 커넥션을 기다리는 요청(0이 정상, 1 이상이면 경고 알림 기준)입니다.",
          code: `up{job="prometheus.scrape.bibbidi_backend"}
sum(increase(http_server_requests_seconds_count{deployment_environment_name="production", status=~"5.."}[5m])) or vector(0)
sum(jvm_memory_used_bytes{area="heap", deployment_environment_name="production"}) / sum(jvm_memory_max_bytes{area="heap", deployment_environment_name="production"})
hikaricp_connections_pending{deployment_environment_name="production"}`,
          refs: ["promql"],
        },
        {
          lead: "Grafana → Explore → Loki에서 운영 backend 에러, nginx 5xx, 1초 넘게 걸린 요청(nginx), 특정 요청의 모든 로그를 차례로 찾아 봅니다. 로그 한 줄을 펼치면 레벨·로거·trace_id 메모와 Tempo에서 보기 버튼이 보입니다.",
          code: `{service_name="bibbidi-backend", deployment_environment_name="production"} | severity_text=~"(?i)error|fatal"
{service_name="nginx", deployment_environment_name="production"} | json | http_response_status_code >= 500
{service_name="nginx", deployment_environment_name="production"} | json | http_request_duration > 1
{service_name="bibbidi-backend", deployment_environment_name="production"} | trace_id="여기에 trace_id"`,
          refs: ["logql", "explore"],
        },
        {
          lead: "Grafana → Explore → Tempo에서 쿼리 종류를 Search(메뉴) 또는 TraceQL(직접 쓰기)로 두고 최근 운영 에러 요청과 1초 넘은 요청을 찾습니다. 쿼리 종류를 Service Graph로 바꾸면 서비스 사이 호출이 그림으로 나옵니다.",
          code: `{ resource.deployment.environment.name = "production" && kind = server && status = error }
{ resource.deployment.environment.name = "production" && kind = server && duration > 1s }`,
          refs: ["traceql", "servicegraphs"],
        },
        {
          lead: "에러 하나를 끝까지 따라가 봅니다. 위험 대시보드에서 env를 production으로 바꿔 5xx 패널에서 언제 몇 건인지 보고, backend ERROR 로그 패널(또는 아래 쿼리)에서 그 시각 로그를 찾습니다. 로그를 펼쳐 Tempo 버튼 → 빨간 스팬이나 긴 막대 → Logs for this span 순서로 에러 직전에 무슨 일이 있었는지 봅니다.",
          code: '{service_name="bibbidi-backend", deployment_environment_name="production"} | severity_text=~"(?i)error"',
          refs: ["explore", "tracetologs"],
        },
      ],
      lead: "세 창고에 같은 질문을 각자의 언어로 던집니다. 아래 세 쿼리를 각각 알맞은 데이터 소스에서 실행해 보세요.",
      code: 'Prometheus  up\nLoki        {service_name="bibbidi-backend", deployment_environment_name="production"}\nTempo       { resource.service.name = "bibbidi-backend" }',
      language: "text",
      refs: ["promql", "logql", "tempo", "explore"],
    },
    notDoing: [
      {
        text: "택배 기사·창고·관제실 중 하나가 모든 일을 맡는다고 가정하지 않습니다.",
        refs: ["alloy", "grafana"],
      },
      {
        text: "trace_id나 결혼 정보 ID를 Loki의 인덱스 라벨로 만들지 않습니다.",
        refs: ["lokilabel"],
      },
      {
        text: "Alloy를 중앙에 두는 Gateway 방식을 쓰지 않습니다. 서버가 2대라 서버마다 하나씩(edge) 둡니다.",
        refs: ["alloyhow"],
      },
      {
        text: "Alloy 클러스터링으로 수집 대상을 나누지 않습니다. 수집 대상이 적습니다.",
        refs: ["alloyscrape"],
      },
      {
        text: "서버의 로그 파일을 직접 읽지 않습니다. 로그를 콘솔로만 찍습니다.",
        refs: ["alloycomponents"],
      },
      {
        text: "Kubernetes·AWS 서비스 자동 발견을 쓰지 않습니다. Docker Compose라 Docker 발견만 씁니다.",
        refs: ["alloycomponents"],
      },
      {
        text: "서버 자체 지표(CPU·디스크·메모리)를 리눅스에서 직접 모으지 않습니다. 앱 서버는 Spring이 주는 값으로 보고, 모니터링·DB 서버는 수집하지 않습니다.",
        refs: ["alloycomponents"],
      },
      {
        text: "프로파일·프론트엔드·eBPF(Pyroscope, Faro, Beyla)를 수집하지 않습니다.",
        refs: ["alloycomponents"],
      },
      {
        text: "OTel Collector 설정을 그대로 실행하는 OTel Engine(실험 기능)을 쓰지 않습니다. Alloy 문법으로 씁니다.",
        refs: ["alloyotel"],
      },
      {
        text: "로그 전송 WAL(실험 기능)과 Live debugging을 켜지 않습니다.",
        refs: ["alloylokiwrite", "alloydebug"],
      },
      {
        text: "Promtail·Grafana Agent에서 옮겨 오지 않았습니다. 처음부터 Alloy를 썼습니다(두 도구는 지원 종료).",
        refs: ["promtailmigrate"],
      },
      {
        text: "Prometheus가 앱을 직접 읽지 않습니다. Alloy가 대신 읽어서 보내 주므로 모니터링 서버가 앱 서버로 접속할 필요가 없습니다.",
        refs: ["prom"],
      },
      {
        text: "Alertmanager로 알림을 보내지 않습니다. Grafana에서 알립니다.",
        refs: ["alertmanager"],
      },
      {
        text: "exporter로 MySQL·서버 CPU·디스크 숫자를 모으지 않습니다. Spring 숫자만 수집하고 DB 서버·모니터링 서버는 AWS CloudWatch로 일부만 봅니다.",
        refs: ["prom", "cloudwatch"],
      },
      {
        text: "Mimir, Thanos 같은 원격 저장소로 장기 보관하거나 여러 대로 늘리지 않습니다. 서버 한 대, 30일 보관입니다.",
        refs: ["promstorage", "mimir"],
      },
      {
        text: "recording rule을 쓰지 않습니다. 쿼리가 가볍습니다.",
        refs: ["promconfig"],
      },
      {
        text: "native histogram을 쓰지 않습니다. 기존 방식을 씁니다.",
        refs: ["promtypes"],
      },
      {
        text: "Prometheus가 OTLP로 직접 받지 않습니다. Alloy가 remote write로 보냅니다.",
        refs: ["promcli"],
      },
      {
        text: "Agent 모드(저장 없이 모아서 넘기기)를 쓰지 않습니다. 저장소로 씁니다.",
        refs: ["promflags"],
      },
      {
        text: "S3·GCS·Azure 같은 클라우드 저장소에 저장하지 않습니다. 모니터링 서버 디스크에 저장합니다(공식 문서는 운영에 클라우드 저장소를 권장).",
        refs: ["lokistorage"],
      },
      {
        text: "Loki 구성요소를 나눠 여러 대로 운영하지 않습니다. 하루 20GB 이하 규모용인 한 프로세스로 전부 실행합니다.",
        refs: ["lokimodes"],
      },
      {
        text: "멀티 테넌시를 켜지 않습니다(auth_enabled: false).",
        refs: ["lokiarch"],
      },
      {
        text: "로그 종류별로 보관 기간을 다르게 두지 않습니다. 전부 14일입니다.",
        refs: ["lokiretention"],
      },
      {
        text: "Loki 자체 알림 규칙(ruler)을 쓰지 않습니다. Grafana에서 알립니다.",
        refs: ["lokicomponents"],
      },
      {
        text: "Memcached·Redis 캐시를 쓰지 않습니다. 프로세스 메모리 캐시만 씁니다.",
        refs: ["lokicaching"],
      },
      {
        text: "로그 패턴 자동 찾기와 블룸 필터 가속을 쓰지 않습니다.",
        refs: ["lokicomponents"],
      },
      {
        text: "Loki가 OTLP로 직접 받지 않습니다. Alloy가 Loki 방식으로 보냅니다.",
        refs: ["lokiotel"],
      },
      {
        text: "Promtail·Fluent Bit 같은 다른 수집기를 쓰지 않습니다. Alloy를 씁니다(Promtail은 지원 종료).",
        refs: ["lokisend"],
      },
      {
        text: "트레이스를 S3·GCS·Azure 같은 클라우드 저장소에 두지 않습니다. 모니터링 서버 디스크에 저장합니다(공식 문서는 디스크 저장을 개발·테스트용으로 안내).",
        refs: ["tempoobject"],
      },
      {
        text: "Tempo 구성요소를 나눠 사이에 Kafka를 두는 구성으로 운영하지 않습니다. 한 프로세스로 전부 실행합니다.",
        refs: ["tempomodes"],
      },
      {
        text: "샘플링으로 일부 요청만 저장하지 않습니다. 100% 저장합니다(예전에 쓰던 샘플링은 제거).",
        refs: ["spanmetrics"],
      },
      {
        text: "TraceQL metrics로 바로 그래프를 만들지 않습니다. 그래프는 Prometheus 숫자로 그립니다.",
        refs: ["traceql"],
      },
      {
        text: "dedicated columns로 자주 찾는 속성 검색을 빠르게 하지 않습니다. 기본 설정입니다.",
        refs: ["tempoblock"],
      },
      {
        text: "Jaeger·Zipkin 형식으로 받지 않습니다. OTLP 형식만 받습니다.",
        refs: ["tempocomponents"],
      },
      {
        text: "Tempo 멀티 테넌시를 쓰지 않습니다. 한 팀입니다.",
        refs: ["tempoconfig"],
      },
      {
        text: "Grafana 설정을 MySQL·PostgreSQL에 저장하지 않습니다. 기본값 SQLite 파일(grafana.db) 하나를 씁니다(공식 문서는 운영에 MySQL·PostgreSQL 권장).",
        refs: ["grafanaconfig"],
      },
      {
        text: "Grafana를 여러 대로 운영(고가용성)하지 않습니다. 한 대입니다.",
        refs: ["grafanaconfig"],
      },
      {
        text: "대시보드를 파일·Git으로 관리(provisioning, Git Sync)하지 않습니다. 화면에서만 관리합니다(저장소 보관은 예정).",
        refs: ["grafanaprov", "grafana13"],
      },
      {
        text: "알림 규칙을 파일로 관리하지 않습니다. 화면에서만 관리합니다.",
        refs: ["grafanaprov"],
      },
      {
        text: "Metrics·Logs·Traces Drilldown은 쓸 수 있지만 안내하지 않습니다.",
        refs: ["drilldown"],
      },
      {
        text: "Correlations로 사용자 정의 링크를 만들지 않습니다. 기본 연결만 씁니다.",
        refs: ["correlations"],
      },
      {
        text: "팀·폴더별 권한을 나누지 않습니다. 팀원 전원이 Editor입니다.",
        refs: ["grafanaroles"],
      },
      {
        text: "Enterprise·Cloud 판을 쓰지 않습니다. 무료 OSS를 직접 설치합니다(온콜 IRM만 Cloud 사용).",
        refs: ["grafanaintro"],
      },
    ],
    mistakes: [
      {
        symptom: "Prometheus 그래프만 빈다",
        cause: "Actuator 노출과 Alloy의 메트릭 수집 경로를 확인합니다.",
        refs: ["metrics", "alloypipe"],
      },
      {
        symptom: "Loki 검색이 지나치게 느리다",
        cause: "값의 종류가 많은 라벨을 썼는지 살펴봅니다.",
        refs: ["lokilabel"],
      },
      {
        symptom: "Tempo의 요청을 로그와 연결할 수 없다",
        cause: "두 신호에 같은 trace_id가 있는지 확인합니다.",
        refs: ["tempo", "context"],
      },
      {
        symptom: "log.debug() 로그가 안 보인다",
        cause: "Alloy가 DEBUG를 버리는 정상 동작입니다.",
        refs: ["alloylokiprocess"],
      },
      {
        symptom: "데이터가 전부 안 들어온다",
        cause: "토큰 불일치입니다. Alloy 로그에 401이 보입니다.",
        refs: ["alloy"],
      },
      {
        symptom: "새로 띄운 컨테이너 로그가 안 보인다",
        cause: "수집 대상은 bibbidi-backend, nginx, alloy뿐입니다.",
        refs: ["alloy"],
      },
      {
        symptom: "개발 서버 데이터가 운영에 섞이거나 환경 값이 비어 있다",
        cause: "환경 이름 환경 변수가 빠졌습니다.",
        refs: ["alloystdlib"],
      },
      {
        symptom: "트레이스가 들어오지 않는다",
        cause:
          "Spring의 보내는 주소(OTEL_EXPORTER_OTLP_ENDPOINT)가 http://alloy:4318이 아닙니다.",
        refs: ["otlpreceiver"],
      },
      {
        symptom: "otelcol 경로의 데이터가 사라진다",
        cause: "output 블록을 비우면 조용히 버려집니다.",
        refs: ["alloyotel"],
      },
      {
        symptom: "설정을 고쳤는데 반영되지 않는다",
        cause:
          "리로드 실패는 프로세스를 죽이지 않습니다. UI나 /-/healthy로 확인합니다.",
        refs: ["alloycontroller", "alloydebug"],
      },
      {
        symptom: "그래프가 계속 올라가기만 한다",
        cause: "늘어나기만 하는 숫자를 increase / rate 없이 그렸습니다.",
        refs: ["promql"],
      },
      {
        symptom: "운영·개발 숫자가 합쳐져 보인다",
        cause: "deployment_environment_name 조건을 빼먹었습니다.",
        refs: ["promql"],
      },
      {
        symptom: "increase 결과가 2.0000001처럼 소수다",
        cause:
          "구간 양끝을 추정해서 계산하는 정상 동작입니다. 필요하면 round()를 씁니다.",
        refs: ["promfunctions"],
      },
      {
        symptom: "쿼리가 에러다",
        cause: "정규식이 =~가 아니라 =로 되어 있거나 괄호 짝이 안 맞습니다.",
        refs: ["promql"],
      },
      {
        symptom: "Loki 검색 결과가 하나도 없다",
        cause:
          '이름표 이름 오타이거나 예전 이름(job="bibbidi", compose_service)을 썼습니다.',
        refs: ["lokilabel"],
      },
      {
        symptom: "{}만 쓰면 에러가 난다",
        cause: "이름표 조건이 최소 하나 필요합니다.",
        refs: ["logql"],
      },
      {
        symptom: "대소문자 때문에 로그를 못 찾는다",
        cause: '|~ "(?i)..."를 씁니다.',
        refs: ["logql"],
      },
      {
        symptom: "2주 전 로그가 없다",
        cause: "14일 보관입니다.",
        refs: ["lokiretention"],
      },
      {
        symptom: '{trace_id="..."}로 찾았는데 안 나온다',
        cause:
          'trace_id는 이름표가 아니라 메모입니다. {...} | trace_id="..."로 씁니다.',
        refs: ["lokimetadata"],
      },
      {
        symptom: "일주일 전 요청의 트레이스가 안 나온다",
        cause: "트레이스는 5일 보관입니다.",
        refs: ["tempo"],
      },
      {
        symptom: "TraceQL에 환경 조건을 썼는데 결과가 없다",
        cause: "deployment.environment.name 앞에 resource.를 빼먹었습니다.",
        refs: ["traceql"],
      },
      {
        symptom: 'name =~ "callback"이 맞지 않는다',
        cause: '정규식은 전체 일치입니다. ".*callback"으로 씁니다.',
        refs: ["traceql"],
      },
      {
        symptom: "로그에서 Tempo 버튼이 안 보인다",
        cause:
          "그 로그에 trace_id가 없습니다(스케줄러·앱 시작처럼 요청 밖에서 찍힌 로그).",
        refs: ["tracing"],
      },
      {
        symptom: "패널이 Data source not found",
        cause: "데이터소스를 화면에서 새로 만들어 uid가 바뀌었습니다.",
        refs: ["grafanaprov"],
      },
      {
        symptom: "고친 대시보드가 사라졌다",
        cause: "저장(Save)을 누르지 않고 나갔습니다.",
        refs: ["grafanadash"],
      },
      {
        symptom: "Grafana 로그인이 안 된다",
        cause: "GitHub 아이디가 서버 설정에 등록되지 않았습니다.",
        refs: ["grafanagithub"],
      },
      {
        symptom: "Logs for this span 결과가 비어 있다",
        cause:
          "trace to logs Tags 매핑이 Loki 라벨 이름과 다릅니다. 오류 없이 비어 보입니다.",
        refs: ["tracetologs"],
      },
    ],
    related: ["transport", "alerting"],
  },
  alerting: {
    category: "Alerting",
    readTime: "12분",
    summary:
      "알림은 문 앞의 초인종입니다. 울리는 기준뿐 아니라 누가 듣고 누가 문을 열지도 정해야 합니다.",
    bridge: {
      prev: "06번 글까지 상담 저장 실패 기록을 모으고, 저장하고, Grafana에서 조회하는 길을 완성했습니다.",
      now: "하지만 화면은 누군가 열어 봐야 의미가 있습니다. 새벽 3시에 상담 저장 실패가 늘면 누가 어떻게 알까요? 초인종이 생기고 다듬어진 과정을 따라갑니다.",
    },
    preRead: ["alert", "contact"],
    questions: [
      "그래프를 계속 보고 있지 않아도 상담 저장 실패 증가를 어떻게 알 수 있을까요?",
      "모니터링 서버가 꺼졌을 때 그 서버의 알림을 믿을 수 있을까요?",
    ],
    evolution: [
      {
        era: "출발점",
        name: "사람이 그래프 지켜보기",
        example: "상담 저장 실패율 확인 → 담당자에게 수동 전달",
        body: "처음에는 대시보드를 열어 두고 사람이 지켜봅니다. 초인종 없이 문 앞을 계속 내다보는 셈이죠.",
        question: "새벽 3시의 상담 저장 실패는 누가 볼까요?",
        answer:
          "아무도 못 봅니다. 사람이 자리를 비운 시간의 장애는 놓치기 쉽습니다.",
        next: "기계가 대신 지켜보다가 초인종을 누르게 해 봅시다.",
        solved: "눈으로 이상 보기",
        refs: ["sre", "alert"],
      },
      {
        era: "1990년대~2000년대",
        name: "점검 결과로 메일·호출기 울리기",
        example: "check_http wedding-server → CRITICAL\n→ 메일 · 호출기 발송",
        body: "상태 점검 도구는 결과가 위험으로 바뀌면 메일이나 호출기로 알렸습니다. 처음으로 초인종이 생긴 거죠. 다만 점검 대상은 주로 “서버가 살아 있나”였습니다.",
        question: "서버는 살아 있는데 상담만 실패하면 초인종이 울릴까요?",
        answer:
          "울리지 않습니다. 반대로 값이 기준 근처를 오가면 초인종이 쉴 새 없이 울리기도 했죠.",
        next: "앱의 숫자로 규칙을 쓰고 비슷한 알림은 묶어야 합니다.",
        solved: "자리를 비워도 알기",
        refs: ["sre"],
      },
      {
        era: "2015~",
        name: "메트릭 규칙과 Alertmanager",
        example:
          "규칙: 5분간 5xx 비율 > 기준, 5분 이상 지속\nAlertmanager: 묶기 · 중복 제거 · 일시 중지 · 라우팅",
        body: "Prometheus에서는 PromQL 식으로 상담 저장 실패율 규칙을 쓰고, 조건이 일정 시간 이어져야 초인종이 울리게 했습니다. Alertmanager는 비슷한 알림을 묶고 중복을 없애며, 라벨에 따라 받을 곳을 정했습니다.",
        question: "CPU 사용률과 상담 저장 실패율, 어느 쪽으로 사람을 깨워야 할까요?",
        answer:
          "사용자가 느끼는 증상인 상담 저장 실패율 쪽입니다. CPU 같은 원인 지표는 조사할 때 봅니다.",
        next: "이 물음에 답하려면 “무엇으로 깨울지”와 “누가 받을지”를 정한 원칙이 필요합니다.",
        solved: "앱 숫자로 규칙 쓰기",
        refs: ["alertmanager", "promql"],
      },
      {
        era: "2016~",
        name: "증상 중심 알림과 온콜",
        example:
          "증상: 상담 저장 실패율 ↑, p95 ↑ → 당번 호출\n원인: CPU ↑ → 대시보드에서 확인",
        body: "Google SRE 책은 사람을 부르는 초인종을 증상에 달고, 원인 지표는 조사용으로 쓰라고 권합니다. 또 당번이 감당할 수 있는 알림 양과 대응 절차를 정하는 온콜 운영도 정리했습니다.",
        question:
          "원칙은 섰습니다. 이 원칙을 지금 쓰는 도구에서는 어떻게 설정할까요?",
        answer:
          "규칙의 상태, 연락처, 알림 정책을 도구 안에서 따로 정해야 합니다.",
        next: "비비디가 쓰는 Grafana Alerting으로 넘어갑니다.",
        solved: "깨울 기준과 당번 정하기",
        refs: ["sre", "oncall"],
      },
      {
        era: "2021~",
        name: "Grafana Alerting: 상태와 라우팅",
        example: "Normal → Pending → Alerting",
        body: "Grafana Alerting은 쿼리 결과를 규칙으로 평가합니다. Pending은 기준을 넘은 상태가 이어지는지 기다리는 구간입니다. No Data와 쿼리 Error도 어떻게 처리할지 정해야 합니다.",
        question: "규칙이 Alerting이 되면 당번이 꼭 듣게 될까요?",
        answer:
          "아닙니다. 연락처와 라우팅이 맞아야 초인종 소리가 사람에게 닿습니다.",
        next: "마지막으로 초인종에서 사람까지 이어지는 길을 봅니다.",
        solved: "규칙 상태 관리",
        refs: ["alert", "contact"],
      },
      {
        era: "지금",
        name: "당번과 다음 사람, 그리고 초인종의 초인종",
        example:
          "알림 규칙 → 연락처 → 당번 → 에스컬레이션\n별도 경로: CloudWatch 경보",
        body: "온콜은 지금 문을 열 당번을 정하고, 응답이 없으면 다음 사람에게 넘깁니다. 메시지에는 영향과 조사 링크를 넣어 첫 행동을 돕습니다.",
        question: "초인종을 누르는 모니터링 서버 자체가 멈추면요?",
        answer: "독립된 CloudWatch 같은 외부 감시 경로를 별도로 둡니다.",
        solved: "사람에게 닿고 이어지기",
        refs: ["irm", "contact", "cloudwatch"],
      },
    ],
    essentials: [
      "알림 규칙은 질문이어야 한다",
      "온콜의 다음 단계",
      "감시 자체도 감시하기",
    ],
    practice: {
      lead: "상담 저장 실패를 초인종 규칙으로 바꿔 봅니다. 가상 결혼 서비스의 500 오류 예시 쿼리입니다. 최근 5분 값이 2 이상일 때 알리는 규칙을 가정합니다. 실제 운영 기준은 서비스 목표에 맞춰 정해야 합니다.",
      code: 'sum(increase(http_server_requests_seconds_count{deployment_environment_name="production", status=~"5.."}[5m])) or vector(0)',
      language: "promql",
      refs: ["promql", "alert"],
    },
    notDoing: [
      {
        text: "새 규칙의 연락처 선택을 기본값에 맡기지 않습니다.",
        refs: ["contact"],
      },
      {
        text: "모니터링 서버의 생존을 그 서버 내부 규칙만으로 감시하지 않습니다.",
        refs: ["cloudwatch"],
      },
    ],
    mistakes: [
      {
        symptom: "규칙은 울렸는데 담당자가 못 받았다",
        cause: "연락처와 라우팅, 당번의 에스컬레이션을 확인합니다.",
        refs: ["contact", "irm"],
      },
      {
        symptom: "데이터가 없는데 정상으로 보인다",
        cause: "No Data 처리와 별도의 수집 실패 알림을 점검합니다.",
        refs: ["alert"],
      },
    ],
    related: ["performance", "incident"],
  },
  performance: {
    category: "Performance",
    readTime: "12분",
    summary:
      "성능 테스트는 고속도로의 차를 늘려 보는 일입니다. 차 한 대가 얼마나 걸리는지와 시간당 몇 대가 지나가는지는 다른 숫자죠.",
    bridge: {
      prev: "07번 글에서 상담 저장 실패가 늘면 당번에게 알리는 길을 만들었습니다.",
      now: "이번에는 장애가 나기 전에 결혼 정보 API에 일부러 차를 늘려 한계를 확인합니다. 한 번 눌러 보는 것에서 코드로 쓰는 부하 시나리오까지 따라갑니다.",
    },
    preRead: ["k6", "k6result"],
    questions: [
      "응답 시간 평균이 괜찮으면 느린 사용자도 없을까요?",
      "처리량이 멈췄는데 부하만 더 올리면 무엇이 바뀔까요?",
    ],
    evolution: [
      {
        era: "출발점",
        name: "한 번 요청해 보기",
        example: "요청 1건 → 응답 시간 1개",
        body: "내 컴퓨터에서 결혼 정보 API를 한 번 호출해 봅니다. 기능이 동작하는지는 알 수 있죠. 텅 빈 고속도로에 차 한 대를 보낸 셈입니다.",
        question: "점심시간처럼 차가 몰릴 때도 같은 시간이 걸릴까요?",
        answer:
          "알 수 없습니다. 동시에 몰릴 때 DB 연결이나 스레드가 기다리는지는 한 대로는 보이지 않습니다.",
        next: "같은 요청을 한꺼번에 많이 보내 봐야 합니다.",
        solved: "기능 동작 확인",
        refs: ["k6result", "sre"],
      },
      {
        era: "1990년대 후반~",
        name: "같은 요청을 많이: ab와 JMeter",
        example: "ab -n 1000 -c 50 http://localhost:8080/api/wedding-profiles",
        body: "Apache HTTP 서버에 딸린 ab로 같은 URL에 요청 1000건을 동시에 50건씩 보냅니다. 처리량과 응답 시간이 나옵니다. JMeter는 화면에서 여러 단계의 시나리오를 꾸밀 수 있게 했습니다. 처음으로 “차 50대가 동시에 달리면?”을 실험할 수 있게 됐습니다.",
        question: "다음 배포 때 같은 조건으로 다시 비교할 수 있을까요?",
        answer:
          "명령과 설정이 사람 손에만 남아 있으면 조건이 조금씩 달라집니다. 합격 기준도 따로 적지 않으면 매번 해석이 달라지죠.",
        next: "시나리오와 합격 기준을 코드로 남길 차례입니다.",
        solved: "동시 요청 실험",
        refs: ["ab", "jmeter"],
      },
      {
        era: "2010년대~",
        name: "코드로 쓰는 시나리오와 합격 기준",
        example:
          'export const options = {\n  thresholds: { http_req_duration: ["p(95)<500"] },\n};',
        body: "k6 같은 도구는 부하 시나리오를 코드로 씁니다. 코드는 저장소에 남아 리뷰하고 반복 실행할 수 있죠. 앞 단계와 달리 합격 기준이 스크립트 안에 들어갑니다. 위 threshold는 “p95가 500ms 미만”을 넘으면 테스트를 실패로 만듭니다.",
        question: "시나리오가 준비됐으니 바로 최대 부하부터 걸어 볼까요?",
        answer:
          "아닙니다. 평소 교통량에서 목표를 먼저 확인해야 한계 테스트의 결과도 해석할 수 있습니다.",
        next: "테스트는 목적에 따라 나누고 부하는 차례로 올립니다.",
        solved: "반복 가능한 시나리오와 기준",
        refs: ["k6thresholds", "k6"],
      },
      {
        era: "지금",
        name: "부하를 조금씩 늘리기",
        example: "Smoke → Average-load → 필요한 Stress·Spike·Soak",
        body: "k6 문서는 목표에 따라 테스트 종류를 나눕니다. 평소 부하에서 목표를 확인한 뒤, 필요하면 한계와 회복을 봅니다. 먼저 목표 요청량과 성공 기준을 적어야 결과를 해석할 수 있죠.",
        question: "처리량은 그대로인데 p95가 계속 오르면 무엇을 의심할까요?",
        answer:
          "어딘가에서 차가 막혀 기다리고 있을 수 있습니다. 포화 지표와 느린 span을 확인합니다.",
        next: "마지막으로 부하 결과를 관측 데이터와 같은 시간축에 놓고 읽습니다.",
        solved: "목적별 테스트 순서",
        refs: ["k6", "k6result", "sre"],
      },
      {
        era: "지금",
        name: "세 숫자를 같은 시간축에서 보기",
        example: "부하 ↔ 처리량 ↔ p95·오류",
        body: "처리량, 응답 시간, 오류를 나란히 봅니다. 처리량은 시간당 지나간 차의 수이고, 응답 시간은 차 한 대가 걸린 시간입니다. p95는 느린 쪽 5%가 시작되는 경계입니다. 여기에 03번 글의 포화 지표와 04번 글의 트레이스를 겹쳐 읽습니다.",
        question: "그다음에는 무조건 서버를 늘릴까요?",
        answer:
          "원인을 먼저 좁혀야 합니다. DB 연결, 스레드, CPU와 트레이스를 함께 보면 어느 구간이 막혔는지 판단할 수 있습니다.",
        solved: "병목 위치 좁히기",
        refs: ["k6result", "histogram", "tempo", "sre"],
      },
    ],
    essentials: ["서로 다른 숫자", "테스트 종류", "결과를 읽는 순서"],
    practice: {
      lead: "고속도로의 가장 작은 구간인 네트워크 왕복을 재 봅니다. Linux나 macOS 터미널에서 왕복 지연을 여러 번 재 보세요. 이 값은 애플리케이션 응답 시간 전체가 아니라 네트워크 왕복의 한 부분입니다.",
      code: "ping -c 5 google.com",
      language: "bash",
      refs: ["k6result", "sre"],
    },
    notDoing: [
      {
        text: "평균만 보고 합격을 판정하지 않습니다.",
        refs: ["k6result", "histogram"],
      },
      {
        text: "평소 부하도 모른 채 Stress 테스트부터 시작하지 않습니다.",
        refs: ["k6"],
      },
    ],
    mistakes: [
      {
        symptom: "처리량은 안 늘고 p95만 오른다",
        cause: "포화 지표와 가장 오래 걸리는 span을 확인합니다.",
        refs: ["sre", "tempo"],
      },
      {
        symptom: "테스트마다 결과가 크게 다르다",
        cause: "부하 모양, 시험 시간, 데이터 상태가 같은지 확인합니다.",
        refs: ["k6"],
      },
    ],
    related: ["metrics", "incident"],
  },
  incident: {
    category: "Incident",
    readTime: "12분",
    summary:
      "장애 조사는 탐정 일과 닮았습니다. 첫 알림이 사건 범위를 알려 주고, 숫자·로그·트레이스라는 증거가 같은 이야기를 하는지 확인합니다.",
    bridge: {
      prev: "01~08번 글에서 로그·메트릭·트레이스를 만들고, 모으고, 알림과 성능 테스트까지 다뤘습니다.",
      now: "이제 “상담 저장 실패율 상승” 알림 한 건을 받았다고 가정합니다. 지금까지 만든 도구를 사건이 흘러가는 시간 순서대로 꺼내 씁니다.",
    },
    preRead: ["sre", "explore"],
    questions: [
      "알림 하나만 보고 원인을 확정하면 무엇을 놓칠까요?",
      "복구 조치 뒤에는 어떤 증거를 다시 봐야 할까요?",
    ],
    evolution: [
      {
        era: "알림 직후",
        name: "에러 로그 한 줄로 추측하기",
        example: "ERROR wedding.profile.save.failed",
        body: "알림을 받은 탐정이 가장 먼저 떠올리는 증거는 에러 문구입니다. 사건의 시작점이 되죠.",
        question:
          "이 한 줄로 몇 명이 피해를 봤는지, 언제부터인지 알 수 있을까요?",
        answer:
          "알 수 없습니다. 전체 요청이 느린지, 일부 상담만 실패하는지도 모릅니다.",
        next: "먼저 사건 범위부터 숫자로 확인합니다.",
        solved: "사건의 시작점 찾기",
        refs: ["sre", "promql"],
      },
      {
        era: "처음 5분",
        name: "메트릭으로 범위 좁히기",
        example: "상담 저장 실패율 · p95 · 트래픽 → 같은 시간축",
        body: "요청량이 늘어 실패 건수만 늘었는지, 실제 실패 비율이 올랐는지 구분합니다. 배포나 설정 변경 시점도 나란히 놓습니다. 이제 사건이 언제, 얼마나 컸는지 압니다.",
        question: "그래프만으로 어느 작업 구간에서 실패했는지 알 수 있을까요?",
        answer:
          "알 수 없습니다. 메트릭은 여러 요청을 합친 값이라 특정 요청의 구간은 보이지 않습니다.",
        next: "이제 실패한 요청 하나를 골라 따라갑니다.",
        solved: "영향 범위와 시작 시점",
        refs: ["sre", "explore", "promql"],
      },
      {
        era: "5~30분",
        name: "로그와 트레이스로 한 요청 따라가기",
        example: "오류 로그 → trace_id → Tempo span → 관련 메트릭",
        body: "그 시간대의 로그에서 사건과 trace_id를 찾고, 같은 ID의 트레이스로 들어갑니다. 길거나 실패한 span을 확인한 뒤 다시 전체 메트릭과 대조합니다. 증거 한 건을 사건 전체로 일반화하지 않기 위해서입니다.",
        question: "조치를 했다면 조사는 끝났을까요?",
        answer: "아닙니다. 같은 지표가 회복됐는지 확인해야 합니다.",
        next: "마지막 일은 사건 기록을 남기는 것입니다.",
        solved: "원인 구간 특정",
        refs: ["logql", "tempo", "context", "sre"],
      },
      {
        era: "복구 뒤",
        name: "비난 없는 회고 남기기",
        example:
          "타임라인 · 영향 · 탐지까지 걸린 시간 · 복구까지 걸린 시간 · 다음에 고칠 한 가지",
        body: "탐정은 사건 보고서를 씁니다. Google SRE 책은 사람을 탓하지 않고 시스템과 절차의 빈틈을 찾는 회고를 권합니다. 무엇이 일어났고, 왜 늦게 알았고, 무엇을 바꿀지를 기록해 같은 사건을 다시 조사하지 않게 합니다.",
        question: "회고를 쓰고 나면 무엇을 다시 볼까요?",
        answer:
          "회고에서 나온 개선이 로그·메트릭·알림 규칙에 실제로 반영됐는지 확인합니다.",
        solved: "같은 사건 반복 막기",
        refs: ["postmortem", "sre"],
      },
    ],
    essentials: ["처음 5분", "한 요청을 따라가기", "복구 뒤"],
    practice: {
      lead: "사건의 5~30분 단계를 직접 해 봅니다. Grafana Explore의 Loki에서 가상 결혼 서비스 로그를 조회합니다. 오류 시간대의 로그를 찾은 뒤 trace_id가 있는지 확인하세요.",
      code: '{service_name="bibbidi-backend", deployment_environment_name="production"} | severity_text=~"(?i)error"',
      language: "logql",
      refs: ["logql", "explore", "tempo"],
    },
    notDoing: [
      {
        text: "로그 한 줄로 원인을 확정하지 않습니다.",
        refs: ["sre", "tempo"],
      },
      {
        text: "복구 조치가 끝났다는 이유로 고객 영향 확인을 생략하지 않습니다.",
        refs: ["sre"],
      },
    ],
    mistakes: [
      {
        symptom: "알림은 해결됐지만 사용자는 여전히 느리다",
        cause: "오류뿐 아니라 지연과 처리량이 회복됐는지 확인합니다.",
        refs: ["sre", "promql"],
      },
      {
        symptom: "같은 장애를 다시 조사한다",
        cause: "시작 시점, 영향, 조치, 검증 결과를 남겼는지 봅니다.",
        refs: ["sre"],
      },
    ],
    related: ["alerting", "history"],
  },
};
