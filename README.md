# 비비디의 Observabillity

관측 가능성(observability)을 학습하는 React 사이트와 Grafana OSS 실습 환경입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

Grafana 실습까지 실행하려면 Docker가 실행 중인 상태에서 다음을 실행합니다.

```bash
GRAFANA_ADMIN_PASSWORD='replace-with-a-long-password' docker compose up -d --build
```

- 사이트: `http://localhost/`
- Grafana 실습: `http://localhost/practice`
- 개발 서버: `http://localhost:5173/`

개발 서버의 `/grafana` 요청은 Docker의 Grafana `localhost:3000`으로 프록시됩니다.
EC2와 CloudFormation 배포 방법은 [`infra/README.md`](infra/README.md)에 있습니다.
