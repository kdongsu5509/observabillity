import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Keep the teaching articles concise while making every source manuscript available in full.
const manuscripts = {
  ...import.meta.glob("../docs/*.md", { query: "?raw", import: "default" }),
  ...import.meta.glob("../docs/concepts/*.md", {
    query: "?raw",
    import: "default",
  }),
};

const concept = (name) => `../docs/concepts/${name}.md`;
const manuscriptPaths = {
  history: [
    "../docs/README.md",
    "../docs/00-발표-목차와-문서-매핑.md",
    concept("00-먼저-읽기"),
  ],
  logging: [concept("01-로그-SLF4J-Logback")],
  metrics: [concept("02-메트릭-Actuator-Micrometer")],
  trace: [concept("03-MDC와-trace_id")],
  transport: [concept("04-OpenTelemetry와-OTLP")],
  stack: [
    "06-alloy",
    "06-alloy-상세",
    "07-prometheus",
    "07-prometheus-상세",
    "08-loki",
    "08-loki-상세",
    "09-tempo",
    "09-tempo-상세",
    "10-grafana",
    "10-grafana-상세",
  ].map(concept),
  alerting: [concept("14-알림과-온콜")],
  performance: [concept("19-성능-테스트와-지연")],
  incident: ["../docs/01-비비디-관측-알림-장애대응.md"],
};

const chapterByFile = Object.fromEntries(
  Object.entries(manuscriptPaths).flatMap(([chapter, paths]) =>
    paths.map((path) => [path, chapter]),
  ),
);

function Manuscript({ path }) {
  const [content, setContent] = useState(null);
  const [error, setError] = useState(false);
  const title = path.split("/").at(-1).replace(/\.md$/, "");
  const open = () => {
    if (content !== null || error) return;
    const loader = manuscripts[path];
    if (!loader) {
      setError(true);
      return;
    }
    loader()
      .then(setContent)
      .catch(() => setError(true));
  };
  const link = ({ href = "", children }) => {
    if (!href || href.startsWith("#") || /^https?:/i.test(href))
      return <a href={href}>{children}</a>;
    const target = new URL(
      href,
      new URL(path.replace("../", "/"), window.location.origin),
    );
    const relativePath = `..${decodeURI(target.pathname)}`;
    const chapter = chapterByFile[relativePath];
    return <a href={chapter ? `/read/${chapter}` : target.href}>{children}</a>;
  };
  return (
    <details
      className="source-manuscript"
      onToggle={(event) => {
        if (event.currentTarget.open) open();
      }}
    >
      <summary>{title}</summary>
      {error && <p>원고를 불러오지 못했습니다.</p>}
      {content === null && !error && <p>원고를 여는 중입니다…</p>}
      {content !== null && (
        <div className="source-manuscript-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: link }}>
            {content}
          </ReactMarkdown>
        </div>
      )}
    </details>
  );
}

export function SourceManuscripts({ id }) {
  const paths = manuscriptPaths[id] || [];
  return (
    <section id="manuscripts" className="source-manuscripts">
      <span className="story-section-label">08 / ORIGINAL NOTES</span>
      <h2>원고 전문</h2>
      <p>설정값, 쿼리, 운영 절차와 부록을 원고 그대로 확인할 수 있습니다.</p>
      {paths.map((path) => (
        <Manuscript key={path} path={path} />
      ))}
    </section>
  );
}
