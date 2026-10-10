const dashboardUrl =
  import.meta.env.VITE_GRAFANA_URL ||
  '/grafana/d/observability-lab/observability-lab?orgId=1';

export default function GrafanaPractice() {
  return (
    <main className="grafana-host" aria-label="Grafana OSS 실습 화면">
      <iframe
        className="grafana-host-frame"
        title="Grafana OSS 관측 실습 대시보드"
        src={dashboardUrl}
      />
    </main>
  );
}
