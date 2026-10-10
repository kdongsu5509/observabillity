const dashboardUrl = import.meta.env.VITE_GRAFANA_URL;

export default function GrafanaPractice() {
  if (!dashboardUrl) {
    return (
      <main className="grafana-host" aria-label="실습 서버 안내">
        <p>실습 서버 주소가 설정되지 않았습니다. VITE_GRAFANA_URL을 설정한 뒤 다시 시작하세요.</p>
      </main>
    );
  }
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
