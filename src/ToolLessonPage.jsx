import { useState, Fragment } from "react";
import { sources } from "./content";
import { findToolSeries, toolCurriculum } from "./toolLessons";
import { diagramForChapter } from "./toolDiagrams";
import { SourceImage } from "./SourceImage";

const toolLogoPaths = {
  otel: "/logos/opentelemetry.svg",
  alloy: "/logos/alloy.svg",
  prometheus: "/logos/prometheus.svg",
  loki: "/logos/loki.svg",
  tempo: "/logos/tempo.svg",
  grafana: "/logos/grafana.svg",
};

function SourceLinks({ ids = [] }) {
  return (
    <div className="tool-lesson-sources">
      {[...new Set(ids)].map((id) => (
        <a key={id} href={sources[id][1]} target="_blank" rel="noreferrer">
          {sources[id][0]} ↗
        </a>
      ))}
    </div>
  );
}

function ToolSeriesNav({ series, current }) {
  return (
    <nav className="tool-series-nav" aria-label={`${series.name} 학습 순서`}>
      <div className="tool-series-nav-heading">
        <span>{series.name}</span>
        <small>학습 순서</small>
      </div>
      {series.chapters.map((item, index) => (
        <a
          key={item.slug}
          href={`/tools/${series.id}/${item.slug}`}
          className={item.slug === current ? "is-active" : ""}
        >
          <b>{String(index + 1).padStart(2, "0")}</b>
          <span>{item.title}</span>
        </a>
      ))}
    </nav>
  );
}

function AlternativeTable({ rows }) {
  return (
    <section className="tool-lesson-comparison" id="lesson-comparison" aria-labelledby="tool-lesson-comparison-title">
      <div className="tool-lesson-comparison-heading">
        <span>DECISION TABLE</span>
        <h2 id="tool-lesson-comparison-title">같은 기준으로 비교하기</h2>
        <p>대표 대안의 장점만 보지 말고, 우리 팀이 감당할 운영 조건까지 함께 적습니다.</p>
      </div>
      <div className="tool-lesson-comparison-scroll">
        <table>
          <thead>
            <tr><th>도구</th><th>잘 맞는 상황</th><th>장점</th><th>운영 시 주의</th></tr>
          </thead>
          <tbody>
            {rows.map(([name, fit, strengths, limits]) => (
              <tr key={name}><th scope="row">{name}</th><td>{fit}</td><td>{strengths}</td><td>{limits}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function ToolLearningPaths() {
  const [openSeries, setOpenSeries] = useState(null);
  return (
    <section className="tool-learning-paths" id="learning-paths" aria-labelledby="tool-learning-title">
      <div className="tool-learning-heading">
        <span className="story-section-label">LEARNING PATHS</span>
        <h2 id="tool-learning-title">도구별로 쪼개 읽기</h2>
        <p>먼저 도구의 역할을 고르세요. 필요한 도구를 펼치면 글의 순서와 주제를 볼 수 있습니다.</p>
      </div>
      <div className="tool-learning-grid">
        {toolCurriculum.map((series) => (
          <article className="tool-learning-card" key={series.id}>
            <div
              className="tool-learning-mark"
              role="img"
              aria-label={`${series.name} logo`}
              style={{ backgroundImage: `url(${toolLogoPaths[series.id] || toolLogoPaths.alloy})` }}
            />
            <div className="tool-learning-card-copy">
              <span>{series.role}</span>
              <h3>{series.name}</h3>
              <p>{series.summary}</p>
              <div className="tool-learning-card-meta">
                <span>{series.chapters.length}개 챕터</span>
              </div>
              <button
                className="tool-learning-toggle"
                type="button"
                aria-expanded={openSeries === series.id}
                aria-controls={`tool-chapters-${series.id}`}
                onClick={() => setOpenSeries(openSeries === series.id ? null : series.id)}
              >
                {openSeries === series.id ? "글 목록 접기" : "글 목록 보기"}
                <span aria-hidden="true">{openSeries === series.id ? "−" : "+"}</span>
              </button>
              {openSeries === series.id && (
                <ol id={`tool-chapters-${series.id}`}>
                  {series.chapters.map((chapter, index) => (
                    <li key={chapter.slug}>
                      <a href={`/tools/${series.id}/${chapter.slug}`}>
                        <span className="tool-learning-chapter-title">
                          <b>{String(index + 1).padStart(2, "0")}</b> {chapter.title}
                        </span>
                        <small>{chapter.lead}</small>
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ToolLessonPage({ toolId, chapterSlug }) {
  const result = findToolSeries(toolId, chapterSlug);
  if (!result) {
    return (
      <main className="tool-lesson-missing">
        <h1>글을 찾지 못했습니다</h1>
        <a href="/tools">도구 목록으로 돌아가기</a>
      </main>
    );
  }
  const { series, chapter, index } = result;
  const previous = series.chapters[index - 1];
  const next = series.chapters[index + 1];
  const media = diagramForChapter(series.id, chapter.slug);
  return (
    <div className="tool-lesson-page">
      <div className="tool-lesson-layout">
        <ToolSeriesNav series={series} current={chapter.slug} />
        <main className="tool-lesson-main">
          <a className="tool-lesson-back" href="/tools">← 도구로 돌아가기</a>
          <header className="tool-lesson-header">
            <span>{series.name} · {String(index + 1).padStart(2, "0")} / {series.chapters.length}</span>
            <h1>{chapter.title}</h1>
            <p>{chapter.lead}</p>
          </header>
          {chapter.blocks.map((block, blockIndex) => (
            <Fragment key={`${block.title}-${blockIndex}`}>
            <section className="tool-lesson-block" id={`lesson-block-${blockIndex + 1}`}>
              <h2>{block.title}</h2>
              <p>{block.text}</p>
              {block.code && <pre className="tool-lesson-code"><code>{block.code}</code></pre>}
              <ul>
                {block.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </section>
            {blockIndex === 0 && media && <SourceImage media={media} title="그림으로 보는 흐름" id="lesson-image" />}
            </Fragment>
          ))}
          {chapter.comparison && <AlternativeTable rows={chapter.comparison} />}
          {chapter.practice && (
            <section className="tool-lesson-practice" id="lesson-practice">
              <span>직접 해 보기</span>
              <h2>이 흐름을 실습에서 확인해 보세요</h2>
              <p>예제 데이터로 쿼리를 실행하고, 결과에서 다음 조사 위치를 선택합니다.</p>
              <a href={`/practice#${chapter.practice}`}>관련 실습 열기 ↗</a>
            </section>
          )}
          <SourceLinks ids={chapter.refs} />
          <nav className="tool-lesson-pager" aria-label="도구 글 순서">
            {previous ? (
              <a href={`/tools/${series.id}/${previous.slug}`}>
                <span>← 이전 글</span><strong>{previous.title}</strong>
              </a>
            ) : <span />}
            {next ? (
              <a className="is-next" href={`/tools/${series.id}/${next.slug}`}>
                <span>다음 글 →</span><strong>{next.title}</strong>
              </a>
            ) : (
              <a className="is-next" href="/tools"><span>학습 완료</span><strong>도구 선택 화면으로</strong></a>
            )}
          </nav>
        </main>
      </div>
    </div>
  );
}
