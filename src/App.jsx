import { Suspense, lazy, useEffect, useState } from "react";
import { videos } from "./content";
import { ReadingArticle, ReadingHome } from "./Reading";
import ToolGuide from "./ToolGuide";
import { ToolLessonPage } from "./ToolLessonPage";
const Practice = lazy(() => import("./GrafanaPractice"));

function Logo() {
  return (
    <a className="logo" href="/">
      <span className="eyes" aria-hidden="true">
        <i />
        <i />
      </span>
      <b>비비디의 Observabillity</b>
    </a>
  );
}

function Header({ page }) {
  const [info, setInfo] = useState(false);
  return (
    <header className="header">
      <div className="header-inner">
        <Logo />
        <nav aria-label="주 메뉴">
          <a className={page === "read" ? "active" : ""} href="/">
            글 읽기
          </a>
          <a className={page === "tools" ? "active" : ""} href="/tools">
            도구
          </a>
          <a href="/practice">실습</a>
          <span
            className="thanks-nav"
            onMouseEnter={() => setInfo(true)}
            onMouseLeave={() => setInfo(false)}
            onFocus={() => setInfo(true)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setInfo(false);
            }}
          >
            <a className={page === "thanks" ? "active" : ""} href="/thanks-to">
              테코톡으로 보기
            </a>
            <button
              className="info"
              type="button"
              aria-label="테코톡으로 보기 설명"
              aria-expanded={info}
              onClick={() => setInfo((v) => !v)}
            >
              i
            </button>
            {info && (
              <span className="tooltip" role="tooltip">
                참고한 테코톡 영상 속 주인공들
              </span>
            )}
          </span>
        </nav>
      </div>
    </header>
  );
}

function Thanks() {
  const groups = [...new Set(videos.map((v) => v[0]))];
  return (
    <div className="thanks-page">
      <div className="page-hero compact">
        <span className="section-kicker">테코톡으로 보기</span>
        <h1>참고한 테코톡 영상 속 주인공들</h1>
        <p>
          주제별로 모았습니다. 카드를 누르면 원본 YouTube 영상으로 이동합니다.
        </p>
        <div className="thanks-count">{videos.length}개의 테코톡</div>
      </div>
      {groups.map((group) => (
        <section className="video-section" key={group}>
          <h2>{group}</h2>
          <div className="video-grid">
            {videos
              .filter((v) => v[0] === group)
              .reverse()
              .map(([, title, id]) => (
                <a
                  href={`https://www.youtube.com/watch?v=${id}`}
                  target="_blank"
                  rel="noreferrer"
                  key={id}
                >
                  <span className="video-thumb">
                    <img
                      src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                      alt=""
                      loading="lazy"
                    />
                    <span className="play-icon" aria-hidden="true">
                      ▶
                    </span>
                  </span>
                  <strong>{title}</strong>
                  <small>YouTube 원본 영상 ↗</small>
                </a>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default function App() {
  const path = decodeURI(location.pathname);
  const toolPath = path.match(/^\/tools\/([^/]+)\/([^/]+)$/);
  const page =
    path === "/practice"
      ? "practice"
      : path === "/tools" || toolPath
        ? "tools"
        : path === "/thanks-to"
          ? "thanks"
          : "read";
  useEffect(() => {
    document.title = "비비디의 Observabillity";
  }, []);
  if (page === "practice") return <Suspense fallback={<main className="grafana-host">실습 화면을 불러오는 중입니다…</main>}><Practice /></Suspense>;
  let content;
  if (toolPath) content = <ToolLessonPage toolId={toolPath[1]} chapterSlug={toolPath[2]} />;
  else if (page === "tools") content = <ToolGuide />;
  else if (page === "thanks") content = <Thanks />;
  else if (path.startsWith("/read/"))
    content = <ReadingArticle id={path.split("/")[2]} />;
  else content = <ReadingHome />;
  return (
    <div className="site">
      <Header page={page} />
      <main className={page === "thanks" ? "container" : "full-content"}>
        {content}
      </main>
      <footer className="footer">
        <Logo />
        <span>로그 한 줄에서 장애 대응까지.</span>
        <a href="/thanks-to">테코톡으로 보기 ↗</a>
      </footer>
    </div>
  );
}
