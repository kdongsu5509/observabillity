import { useState } from "react";

function DiagramSteps({ steps }) {
  return <ol className="tool-diagram-flow">{steps.map(([name, detail], index) => <li key={`${index}-${name}`}><em>{index + 1}</em><b>{name}</b><small>{detail}</small></li>)}</ol>;
}

function TraceTimeline({ media }) {
  return (
    <div className="tool-trace-timeline">
      <div className="tool-trace-summary"><span>요청 1건 <code>카카오 로그인 콜백</code></span><strong>전체 응답 { (media.durationMs / 1000).toFixed(2) }초</strong></div>
      <p className="tool-trace-context"><b>무슨 요청인가요?</b> 사용자가 카카오 로그인을 마치면 우리 API가 콜백을 받고, 카카오에서 토큰을 받은 뒤 회원 정보를 조회합니다. 아래 막대는 그 한 요청 안의 작업 시간과 부모·자식 관계입니다.</p>
      <div className="tool-trace-axis"><span>작업 · 서비스</span><div><i>0초</i><i>1초</i><i>2초</i><i>3초</i></div><span>소요 시간</span></div>
      {media.spans.map((span) => (
        <div className={`tool-trace-row${span.slow ? " is-slow" : ""}`} key={span.name}>
          <div className="tool-trace-label" style={{ "--span-level": span.level }}>
            <b>{span.name}</b><small>{span.service} · {span.kind}</small>
            {span.endpoint && <code>{span.endpoint}</code>}
            {span.level > 0 && <small>부모 작업: {span.parent}</small>}
          </div>
          <div className="tool-trace-track" aria-label={`${span.name}: ${(span.durationMs / 1000).toFixed(2)}초`}>
            <i className="tool-trace-bar" style={{ "--span-start": `${span.startMs / media.durationMs * 100}%`, "--span-duration": `${span.durationMs / media.durationMs * 100}%` }} />
          </div>
          <strong className="tool-trace-duration">{(span.durationMs / 1000).toFixed(2)}초</strong>
        </div>
      ))}
      <p className="tool-trace-takeaway">먼저 확인할 곳: 카카오 토큰 요청이 전체 응답 시간의 대부분(2.80초)을 차지합니다. 이는 지연 위치를 보여 주며, 원인은 해당 요청의 로그와 외부 API 상태로 더 확인해야 합니다.</p>
    </div>
  );
}

export function SourceImage({ media, title, id }) {
  const [failed, setFailed] = useState(false);
  if (!media) return null;

  return (
    <figure className="source-image" id={id}>
      <div className="source-image-heading">
        <span>{media.layout === "trace-timeline" ? "Grafana trace 상세 화면을 본뜬 예시 시각화" : media.kind === "diagram" ? "글의 흐름을 그린 개념도" : "출처가 있는 실제 이미지"}</span>
        <h2>{media.kind === "diagram" ? media.title : title}</h2>
      </div>
      {media.kind === "diagram" ? (
        <div className={`tool-concept-diagram is-${media.layout}`} role="group" aria-label={media.title}>
          {media.layout === "panels" ? media.panels.map((panel) => (
            <section className="tool-diagram-panel" key={panel.title}>
              <h3>{panel.title}</h3>
              <DiagramSteps steps={panel.steps} />
            </section>
          )) : media.layout === "trace-timeline" ? (
            <TraceTimeline media={media} />
          ) : media.layout === "two-lanes" ? (
            <>
              <div className="tool-diagram-lane"><strong>쓰기</strong><DiagramSteps steps={media.steps.slice(0, 4)} /></div>
              <div className="tool-diagram-lane"><strong>읽기</strong><DiagramSteps steps={media.steps.slice(4)} /></div>
            </>
          ) : media.layout === "branches" ? (
            <>
              <div className="tool-diagram-origin"><b>{media.steps[0][0]}</b><small>{media.steps[0][1]}</small></div>
              <div className="tool-diagram-branches"><DiagramSteps steps={media.steps.slice(1)} /></div>
            </>
          ) : (
            <DiagramSteps steps={media.steps} />
          )}
        </div>
      ) : failed ? (
        <div className="source-image-fallback" role="status">
          이미지를 불러오지 못했습니다. 원문에서 그림을 확인할 수 있습니다.
        </div>
      ) : (
        <a href={media.src} target="_blank" rel="noopener noreferrer" aria-label={`${media.alt} 원본 이미지 열기`}>
          <img src={media.src} alt={media.alt} loading="lazy" onError={() => setFailed(true)} />
        </a>
      )}
      <figcaption>
        <span>{media.caption}</span>
        <a href={media.source} target="_blank" rel="noopener noreferrer">
          {media.kind === "diagram" ? "관련 공식 문서 ↗" : `${media.publisher} 원문 보기 ↗`}
        </a>
      </figcaption>
    </figure>
  );
}
