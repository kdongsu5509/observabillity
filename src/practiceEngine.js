// Deterministic telemetry for the browser-only lab. No network requests are made.
const STEP = 15_000;
const POINTS = 1_440; // Six hours at a 15 second scrape interval.
const END = Date.UTC(2026, 9, 10, 6, 0, 0);
const START = END - (POINTS - 1) * STEP;
const STATUSES = ["200", "500", "502"];
const ENVS = ["production", "staging"];
const BUCKETS = [0.1, 0.3, 0.5, 1, 2, Infinity];

let telemetry;
function seeded(seed) {
  let value = seed >>> 0;
  return () => (value = (value * 1664525 + 1013904223) >>> 0) / 4294967296;
}

function buildTelemetry() {
  const random = seeded(1042);
  const series = [];
  const logs = [];
  const traces = [];
  for (const env of ENVS) {
    for (const status of STATUSES) {
      let count = 0;
      const points = [];
      for (let i = 0; i < POINTS; i++) {
        const incident = env === "production" && i >= 1320 && i < 1390;
        const perSecond =
          status === "200"
            ? 21 + 7 * Math.sin(i / 42) + random() * 3
            : incident
              ? (status === "502" ? 2.2 : 0.6) + random()
              : 0.015 + random() * 0.03;
        count += perSecond * 15;
        points.push([START + i * STEP, Math.round(count)]);
      }
      series.push({
        name: "http_server_requests_seconds_count",
        labels: {
          service_name: "bibbidi-backend",
          deployment_environment_name: env,
          status,
        },
        points,
      });
    }
    for (const le of BUCKETS) {
      let count = 0;
      const points = [];
      for (let i = 0; i < POINTS; i++) {
        const incident = env === "production" && i >= 1320 && i < 1390;
        const fraction =
          le === Infinity
            ? 1
            : Math.min(0.99, 1 - Math.exp(-le / (incident ? 0.7 : 0.14)));
        count += Math.max(0, (21 + 7 * Math.sin(i / 42)) * 15 * fraction);
        points.push([START + i * STEP, Math.round(count)]);
      }
      series.push({
        name: "http_server_requests_seconds_bucket",
        labels: {
          service_name: "bibbidi-backend",
          deployment_environment_name: env,
          le: String(le === Infinity ? "+Inf" : le),
        },
        points,
      });
    }
    series.push({
      name: "up",
      labels: { job: "bibbidi-backend", deployment_environment_name: env },
      points: Array.from({ length: POINTS }, (_, i) => [
        START + i * STEP,
        env === "production" ? 1 : i >= POINTS - 18 || i % 240 < 18 ? 0 : 1,
      ]),
    });
  }
  for (let i = 0; i < 24_000; i++) {
    const time = START + Math.floor(random() * POINTS) * STEP;
    const incident = time >= START + 1320 * STEP && time < START + 1390 * STEP;
    const error = (incident && random() < 0.38) || random() < 0.015;
    const traceId = (0x7d9c2f + i * 7919).toString(16);
    const env = random() < 0.82 ? "production" : "staging";
    const message = error
      ? "상담 저장 실패 partner calendar timeout status=502"
      : random() < 0.4
        ? "결혼 정보 저장 완료"
        : "상담 저장 완료";
    logs.push({
      time,
      labels: {
        service_name: "bibbidi-backend",
        deployment_environment_name: env,
        severity_text: error ? "ERROR" : "INFO",
        trace_id: traceId,
      },
      message,
    });
    const duration = error
      ? 2700 + Math.round(random() * 700)
      : 70 + Math.round(random() * 350);
    traces.push({
      time,
      traceId,
      service: "bibbidi-backend",
      status: error ? 502 : 200,
      duration,
      spans: [
        { name: "POST /api/wedding-profiles", duration },
        { name: "validateWeddingProfile", duration: 12 + Math.round(random() * 15) },
        {
          name: "partnerCalendar",
          duration: error ? duration - 160 : Math.round(duration * 0.55),
        },
        { name: "saveWeddingProfile", duration: 30 + Math.round(random() * 45) },
      ],
    });
  }
  logs.sort((a, b) => b.time - a.time);
  traces.sort((a, b) => b.time - a.time);
  return {
    series,
    logs,
    traces,
    counts: {
      samples: series.length * POINTS,
      logs: logs.length,
      traces: traces.length,
    },
  };
}

export function getTelemetry() {
  return telemetry || (telemetry = buildTelemetry());
}

export function formatTime(ms) {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(ms);
}

function parseMatchers(text) {
  if (!text?.trim()) return [];
  const parts = text.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
  return parts.map((part) => {
    const match = part.trim().match(/^([\w.]+)\s*(=~|!~|!=|=)\s*"([^"]*)"$/);
    if (!match) throw new Error(`라벨 조건을 읽을 수 없습니다: ${part.trim()}`);
    return { key: match[1], op: match[2], value: match[3] };
  });
}

function matches(labels, conditions) {
  return conditions.every(({ key, op, value }) => {
    const actual = String(labels[key] === undefined ? "" : labels[key]);
    if (op === "=") return actual === value;
    if (op === "!=") return actual !== value;
    let re;
    try {
      re = new RegExp(`^(?:${value.replace(/^\(\?i\)/, "")})$`, value.startsWith("(?i)") ? "i" : "");
    } catch {
      throw new Error(`잘못된 정규식: ${value}`);
    }
    return op === "=~" ? re.test(actual) : !re.test(actual);
  });
}

function parseSelector(text) {
  const match = text
    .trim()
    .match(/^([a-zA-Z_:][\w:]*)\s*(?:\{([^{}]*)\})?\s*(?:\[(\d+)([smh])\])?$/);
  if (!match)
    throw new Error(
      '메트릭 선택자 문법을 확인하세요. 예: up{job="bibbidi-backend"}',
    );
  const duration = match[3]
    ? Number(match[3]) * { s: 1000, m: 60000, h: 3600000 }[match[4]]
    : null;
  return { name: match[1], matchers: parseMatchers(match[2]), duration };
}

function unwrapCall(text, name) {
  const prefix = `${name}(`;
  if (!text.startsWith(prefix) || !text.endsWith(")")) return null;
  let depth = 0;
  for (let i = name.length; i < text.length; i++) {
    if (text[i] === "(") depth++;
    if (text[i] === ")") depth--;
    if (depth === 0 && i !== text.length - 1) return null;
    if (depth < 0) return null;
  }
  return depth === 0 ? text.slice(prefix.length, -1).trim() : null;
}

function ratePoints(points, duration, asIncrease) {
  if (!duration)
    throw new Error("rate()와 increase()에는 [5m] 같은 범위가 필요합니다.");
  const span = Math.max(1, Math.round(duration / STEP));
  return points.map(([time, value], i) => {
    const past = points[Math.max(0, i - span)];
    const delta = Math.max(0, value - past[1]);
    const seconds = Math.max(STEP, time - past[0]) / 1000;
    return [
      time,
      asIncrease ? (delta * duration) / (seconds * 1000) : delta / seconds,
    ];
  });
}

function sumSeries(rows, groupBy) {
  const groups = new Map();
  for (const row of rows) {
    const labels = groupBy
      ? Object.fromEntries(groupBy.map((key) => [key, row.labels[key] === undefined ? "" : row.labels[key]]))
      : {};
    const key = JSON.stringify(labels);
    if (!groups.has(key))
      groups.set(key, {
        name: row.name,
        labels,
        points: row.points.map(([t]) => [t, 0]),
      });
    const out = groups.get(key);
    row.points.forEach(([, value], i) => {
      out.points[i][1] += value;
    });
  }
  return [...groups.values()];
}

function evaluateProm(expression, allSeries) {
  const text = expression.trim().replace(/\s+or\s+vector\(0\)\s*$/, "");
  const quantile = text.match(
    /^histogram_quantile\(\s*(0(?:\.\d+)?|1(?:\.0+)?)\s*,\s*(.*)\)$/s,
  );
  if (quantile) {
    const bucketRows = evaluateProm(quantile[2], allSeries);
    if (!bucketRows.length || !bucketRows.every((row) => row.labels.le != null))
      throw new Error("histogram_quantile에는 le별 버킷 시계열이 필요합니다.");
    const values = bucketRows
      .filter((row) => row.labels.le !== "+Inf")
      .sort((a, b) => Number(a.labels.le) - Number(b.labels.le));
    const total = bucketRows.find((row) => row.labels.le === "+Inf");
    if (!total) throw new Error("+Inf 버킷이 필요합니다.");
    return [
      {
        name: `p${Number(quantile[1]) * 100}`,
        labels: {},
        points: total.points.map(([t, n], i) => {
          const target = n * Number(quantile[1]);
          const found = values.find((row) => row.points[i][1] >= target);
          return [
            t,
            found
              ? Number(found.labels.le)
              : Number(values.at(-1)?.labels.le || 0),
          ];
        }),
      },
    ];
  }
  const sumBy = text.match(/^sum\s+by\s*\(([^)]*)\)\s*\((.*)\)$/s);
  if (sumBy)
    return sumSeries(
      evaluateProm(sumBy[2], allSeries),
      sumBy[1].split(",").map((x) => x.trim()),
    );
  const sum = unwrapCall(text, "sum");
  if (sum !== null) return sumSeries(evaluateProm(sum, allSeries));
  const rate = unwrapCall(text, "rate");
  const increase = unwrapCall(text, "increase");
  if (rate !== null || increase !== null) {
    const selector = parseSelector(rate !== null ? rate : increase);
    const selected = allSeries.filter(
      (row) =>
        row.name === selector.name && matches(row.labels, selector.matchers),
    );
    if (
      !selected.length &&
      !allSeries.some((row) => row.name === selector.name)
    )
      throw new Error(`없는 메트릭입니다: ${selector.name}`);
    return selected.map((row) => ({
      ...row,
      points: ratePoints(row.points, selector.duration, increase !== null),
    }));
  }
  const selector = parseSelector(text);
  if (selector.duration)
    throw new Error("범위 선택자는 rate() 또는 increase() 안에서 사용하세요.");
  if (!allSeries.some((row) => row.name === selector.name))
    throw new Error(`없는 메트릭입니다: ${selector.name}`);
  return allSeries.filter(
    (row) =>
      row.name === selector.name && matches(row.labels, selector.matchers),
  );
}

function evaluateLogs(expression, allLogs) {
  const selector = expression.trim().match(/^\{([^{}]+)\}(.*)$/s);
  if (!selector)
    throw new Error(
      'LogQL은 {service_name="bibbidi-backend"} 같은 스트림 선택자로 시작합니다.',
    );
  let rows = allLogs.filter((log) =>
    matches(log.labels, parseMatchers(selector[1])),
  );
  let rest = selector[2].trim();
  while (rest) {
    const line = rest.match(/^(\|=|!=|\|~|!~)\s*"([^"]*)"(.*)$/s);
    const label = rest.match(/^\|\s*([\w.]+)\s*(=~|!~|!=|=)\s*"([^"]*)"(.*)$/s);
    const json = rest.match(/^\|\s*json(?:\s+|$)(.*)$/s);
    if (line) {
      const [, op, value, remaining] = line;
      let re;
      if (op.endsWith("~")) {
        try {
          re = new RegExp(value.replace(/^\(\?i\)/, ""), value.startsWith("(?i)") ? "i" : "");
        } catch {
          throw new Error(`잘못된 정규식: ${value}`);
        }
      }
      rows = rows.filter((log) =>
        op === "|="
          ? log.message.includes(value)
          : op === "!="
            ? !log.message.includes(value)
            : op === "|~"
              ? re.test(log.message)
              : !re.test(log.message),
      );
      rest = remaining.trim();
    } else if (label) {
      const [, key, op, value, remaining] = label;
      rows = rows.filter((log) => matches(log.labels, [{ key, op, value }]));
      rest = remaining.trim();
    } else if (json) {
      rest = json[1].trim();
    } else
      throw new Error(
        `지원하지 않거나 잘못된 LogQL 구문: ${rest.slice(0, 70)}`,
      );
  }
  return rows;
}

function evaluateTraces(expression, allTraces) {
  const match = expression.trim().match(/^\{\s*(.*?)\s*\}$/s);
  if (!match)
    throw new Error('TraceQL은 { resource.service.name = "..." } 형식입니다.');
  const conditions = match[1].split(/\s*&&\s*/).map((x) => x.trim());
  if (!conditions.length || !conditions[0])
    throw new Error("TraceQL 조건을 입력하세요.");
  return allTraces.filter((trace) =>
    conditions.every((condition) => {
      const item = condition.match(
        /^(resource\.service\.name|resource\.deployment\.environment\.name|span\.http\.response\.status_code|trace:id|trace\.id)\s*(=|>=|<=|>|<)\s*(?:"([^"]+)"|(\d+))$/,
      );
      if (!item)
        throw new Error(`지원하지 않거나 잘못된 TraceQL 조건: ${condition}`);
      const [, key, op, quoted, number] = item;
      const actual =
        key === "resource.service.name"
          ? trace.service
          : key === "resource.deployment.environment.name"
            ? "production"
            : key.includes("status_code")
              ? trace.status
              : trace.traceId;
      const target = quoted !== undefined ? quoted : Number(number);
      return op === "="
        ? actual === target
        : op === ">="
          ? actual >= target
          : op === "<="
            ? actual <= target
            : op === ">"
              ? actual > target
              : actual < target;
    }),
  );
}

export function runPracticeQuery(source, expression) {
  if (!expression.trim()) throw new Error("쿼리를 입력하세요.");
  const data = getTelemetry();
  if (source === "Prometheus") {
    const rows = evaluateProm(expression, data.series);
    return {
      kind: "series",
      count: rows.length,
      rows: rows
        .slice(0, 30)
        .map((row) => ({ ...row, points: row.points.slice(-120) })),
    };
  }
  if (source === "Loki") {
    const rows = evaluateLogs(expression, data.logs);
    return { kind: "logs", count: rows.length, rows: rows.slice(0, 120) };
  }
  if (source === "Tempo") {
    const rows = evaluateTraces(expression, data.traces);
    return { kind: "traces", count: rows.length, rows: rows.slice(0, 80) };
  }
  throw new Error(`지원하지 않는 데이터 소스: ${source}`);
}
