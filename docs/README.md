# 비비디 모니터링 발표 자료

비비디가 직접 구축한 모니터링 시스템(Spring Boot → Alloy → Prometheus · Loki · Tempo → Grafana, 알림은 Discord · Grafana Cloud IRM)을 팀원과 다른 팀 개발자가 이해하고 고칠 수 있도록 정리한 문서 모음입니다.

**SLF4J 로 `log.info()` 를 찍어 본 적만 있으면 읽을 수 있게** 썼습니다.

## 문서 구성

```
docs/
├── README.md                              지금 이 문서
├── 00-발표-목차와-문서-매핑.md             발표 장 번호, 장별 공식 문서 범위, 참고 영상(10분 테코톡) 전체 목록
├── 01-비비디-관측-알림-장애대응.md         비비디 실제 구성 · 설정값 · 대시보드 · 알림 규칙 15개 · 장애 등급 · 대응 절차
└── concepts/
    ├── 00-먼저-읽기.md                    log.info() 한 줄에서 시작 : 로그 · 메트릭 · 트레이스, 도구 다섯 개의 역할
    ├── 01-로그-SLF4J-Logback.md            로깅 목적 · 레벨 · SLF4J · Logback · 구조화 로그 · 좋은 로그
    ├── 02-메트릭-Actuator-Micrometer.md    4가지 황금 신호 · Actuator · Micrometer · Counter/Gauge/Timer
    ├── 03-MDC와-trace_id.md                MDC · traceId/spanId · traceparent · 스레드 주의
    ├── 04-OpenTelemetry와-OTLP.md          OTel · 시맨틱 컨벤션 · OTLP · 샘플링 · pull vs push
    ├── 06-alloy.md                        앱 서버에 사는 택배 기사 (수집 · 가공 · 전송)
    ├── 06-alloy-상세.md                    부록 : 기본값 · 문법 · 내부 동작
    ├── 07-prometheus.md                   숫자를 15초마다 적어 두는 가계부 (메트릭)
    ├── 07-prometheus-상세.md               부록 : 저장 구조 · PromQL 세부 · 3.x 변경
    ├── 08-loki.md                         여러 서버의 로그를 한곳에서 검색 (로그)
    ├── 08-loki-상세.md                     부록 : 내부 구조 · 제한 값 · LogQL 세부
    ├── 09-tempo.md                        요청 하나의 영수증 (트레이스)
    ├── 09-tempo-상세.md                    부록 : 3.x 내부 구조 · 저장 형식 · TraceQL 전체
    ├── 10-grafana.md                      세 창고를 한 화면에서 보기
    ├── 10-grafana-상세.md                  부록 : 설정 형식 · 알림 상태 · 정책 세부
    ├── 14-알림과-온콜.md                   Discord · Grafana 알림 · IRM 전화 · CloudWatch → SNS → Lambda, 대안
    └── 19-성능-테스트와-지연.md             지연 · 대역폭 · 처리량 · 병목 · Little's Law · 테스트 종류 · 도구
```

- `-상세` 문서(부록)는 처음에는 읽지 않아도 됩니다

## 읽는 순서

1. [먼저 읽기](concepts/00-먼저-읽기.md)
2. 앱 안에서 만들기 : [로그](concepts/01-로그-SLF4J-Logback.md) → [메트릭](concepts/02-메트릭-Actuator-Micrometer.md) → [MDC](concepts/03-MDC와-trace_id.md) → [OTel · OTLP](concepts/04-OpenTelemetry와-OTLP.md)
3. 모으고 저장하고 보기 : [Alloy](concepts/06-alloy.md) → [Prometheus](concepts/07-prometheus.md) → [Loki](concepts/08-loki.md) → [Tempo](concepts/09-tempo.md) → [Grafana](concepts/10-grafana.md)
4. [알림과 온콜](concepts/14-알림과-온콜.md) · [성능 테스트와 지연](concepts/19-성능-테스트와-지연.md)
5. 비비디 실제 설정이 궁금하면 [01 비비디 관측·알림·장애 대응](01-비비디-관측-알림-장애대응.md)
6. 더 깊이 알고 싶으면 부록 : [Alloy 상세](concepts/06-alloy-상세.md) · [Prometheus 상세](concepts/07-prometheus-상세.md) · [Loki 상세](concepts/08-loki-상세.md) · [Tempo 상세](concepts/09-tempo-상세.md) · [Grafana 상세](concepts/10-grafana-상세.md)

## 개념 문서의 공통 구조

1. 한 줄 요약 (비유)
2. 없으면 뭐가 불편한가
3. 그림
4. 비비디에서 실제로 일어나는 일
5. 꼭 알아야 할 것
6. 직접 해 보기 (Grafana 에서 바로 쳐 볼 쿼리)
7. **할 수 있지만 비비디는 안 하는 것** (S3 저장, 구성요소 분리 운영, 다른 알림 도구 등 — 설명 없이 공식 문서 링크만)
8. 자주 하는 실수
9. 더 알고 싶다면 (부록 · 공식 문서 · 참고 영상)

## 작성 원칙

- 공식 문서(`grafana.com/docs`, `prometheus.io/docs`, `docs.spring.io`, `docs.micrometer.io`, `opentelemetry.io`, `docs.aws.amazon.com`)를 근거로 씁니다
- 10분 테코톡 영상은 **주제가 나오는 자리에 "참고 영상" 링크로만** 붙입니다. 영상 내용을 근거로 쓰지 않습니다
- 공식 문서가 아닌 자료(대안 도구의 가격 · 종료 일정 등)는 출처를 밝히고 "공식 페이지 확인 필요" 를 붙입니다
- 기준 버전 (조사일 2026-10-10) : Prometheus 3.15.0 · Loki 3.7.8 · Tempo 3.1.0 · Grafana 13.2.3 · Alloy 문서 v1.20
