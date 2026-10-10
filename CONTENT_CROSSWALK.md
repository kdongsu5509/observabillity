# 내부 원고 대조표

이 파일은 제작용 점검표다. 사이트 번들에는 포함되지 않으며 방문자에게 원고 파일이나 경로를 참고 자료로 제공하지 않는다. 글은 `src/content.js`에서 새로 썼다.

| 내부 원고 | 도식 수 | 사이트 반영 위치 |
| --- | ---: | --- |
| `docs/README.md` | 0 | 학습 순서, 원고 비공개 원칙 |
| `docs/00-발표-목차와-문서-매핑.md` | 0 | 전체 글 순서, 원고의 영상 27편 검토 후 Thanks to에 19편 선별 |
| `docs/01-비비디-관측-알림-장애대응.md` | 13 | 도구 지도, 알림, 장애 조사, 성능 실습 |
| `docs/concepts/00-먼저-읽기.md` | 1 | 첫 글 안내, 메트릭·트레이스 개념 |
| `docs/concepts/01-로그-SLF4J-Logback.md` | 1 | 좋은 로깅이 무엇인가, 로그 실습 |
| `docs/concepts/02-메트릭-Actuator-Micrometer.md` | 1 | 숫자로 이상을 알아채기, 메트릭 실습 |
| `docs/concepts/03-MDC와-trace_id.md` | 2 | MDC와 trace_id로 요청 잇기 |
| `docs/concepts/04-OpenTelemetry와-OTLP.md` | 2 | OpenTelemetry와 OTLP, 전송 경로 실습 |
| `docs/concepts/06-alloy.md` | 2 | 모으고, 나눠 담고, 한 화면에서 보기 · 도구 지도 |
| `docs/concepts/06-alloy-상세.md` | 3 | Alloy 깊이 읽기, 전송 경로 실습 |
| `docs/concepts/07-prometheus.md` | 1 | 메트릭·도구 글, 성능 실습 |
| `docs/concepts/07-prometheus-상세.md` | 3 | Prometheus 깊이 읽기 |
| `docs/concepts/08-loki.md` | 1 | 로그·도구 글, 로그 실습 |
| `docs/concepts/08-loki-상세.md` | 4 | Loki 깊이 읽기, 도구 비교 |
| `docs/concepts/09-tempo.md` | 2 | 트레이스·도구 글, 장애 실습 |
| `docs/concepts/09-tempo-상세.md` | 3 | Tempo 깊이 읽기 |
| `docs/concepts/10-grafana.md` | 2 | 도구 글, 알림 글 |
| `docs/concepts/10-grafana-상세.md` | 4 | Grafana 깊이 읽기, 조사 실습 |
| `docs/concepts/14-알림과-온콜.md` | 4 | 알림과 온콜, 알림 실습 |
| `docs/concepts/19-성능-테스트와-지연.md` | 1 | 성능 테스트와 지연, 성능 실습 |
| **합계** | **50** | **20개 파일 확인** |

## 도식 검토 및 재구성

원고의 Mermaid 코드 블록 50개를 파일별로 세고 주제별로 대조했다. 원문 도식을 그대로 게시하지 않았다.

| 반복되는 도식 주제 | 새 화면 |
| --- | --- |
| 요청에서 로그·메트릭·트레이스가 생기는 경로 | 글별 `Flow`, 첫 화면 `ToolMap` |
| 수집기와 저장소 사이의 전송 단계 | `ToolMap`, OTLP 전송 글과 실습 |
| 로그·메트릭·트레이스에서 장애 원인을 좁히는 순서 | 장애 조사 글의 `Flow`, 종합 미션 |
| 알림 평가부터 연락·대응까지 | 알림 글의 `Flow`, 알림 미션 |
| 부하와 응답 시간의 관계 | 성능 글의 `Flow`, 실습의 반응형 SVG 그래프 |
| 도구별 대안과 조건 | 비교 카드, 상황별 선택 시뮬레이터 |

시각화는 React와 SVG로 작성했다. 사이트 코드에는 Mermaid 런타임이 없다. 기술 설명과 실습의 근거는 각 화면에 연결한 공식 문서로 확인한다.
