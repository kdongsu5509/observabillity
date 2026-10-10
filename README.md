# 비비디의 Observabillity

관측 가능성(observability)을 학습하는 React 사이트입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

개발 서버: `http://localhost:5173/`

## 정적 실습 화면

`/practice`는 별도 Grafana 서버나 API 없이 동작합니다. 브라우저에서 6시간 분량의 예제 메트릭, 로그, 트레이스를 생성하고 Grafana UI 컴포넌트로 결과를 표시합니다. 각 글의 실습 링크는 해당 미션으로 이동합니다. 완료 상태는 브라우저의 `localStorage`에 저장됩니다.

쿼리 입력은 학습에 필요한 일부 구문을 지원합니다. PromQL은 메트릭 선택자, `rate`, `increase`, `sum`, `sum by`, `histogram_quantile`을 지원합니다. LogQL은 스트림 라벨과 문자열·정규식 필터를 지원합니다. TraceQL은 서비스, 환경, 상태 코드, trace ID 조건을 지원합니다. 전체 언어 구현이 아니며 지원하지 않는 구문은 오류로 표시합니다.

```bash
npm run build
node --test src/practiceEngine.test.js
```

`dist/`를 정적 호스트에 배포할 때 `/practice` 및 `/read/...` 요청이 `index.html`로 돌아오도록 SPA 경로 재작성을 설정하세요.

The /practice route opens a Grafana UI dashboard by default. Use Dashboard and Explore tabs to switch views. Dashboard panels open their underlying PromQL, LogQL, or TraceQL queries in Explore; log trace IDs open the matching Tempo trace.
