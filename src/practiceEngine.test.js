import test from 'node:test';
import assert from 'node:assert/strict';
import { getTelemetry, runPracticeQuery } from './practiceEngine.js';
import { practiceScenarios } from './practiceScenarios.js';

test('static telemetry contains enough signals for every practice mission', () => {
  const counts = getTelemetry().counts;
  assert.ok(counts.samples > 20_000);
  assert.ok(counts.logs >= 20_000);
  assert.equal(counts.traces, counts.logs);
  for (const scenario of practiceScenarios) {
    const result = runPracticeQuery(scenario.source, scenario.query);
    assert.ok(result.count > 0, `${scenario.id} returned no data`);
  }
});

test('queries filter real local records instead of accepting a fixed answer', () => {
  const all = runPracticeQuery('Loki', '{service_name="bibbidi-backend"}');
  const errors = runPracticeQuery('Loki', '{service_name="bibbidi-backend"} | severity_text="ERROR"');
  assert.ok(all.count > errors.count);
  const prod = runPracticeQuery('Prometheus', 'up{deployment_environment_name="production"}');
  const staging = runPracticeQuery('Prometheus', 'up{deployment_environment_name="staging"}');
  assert.equal(prod.rows[0].points.at(-1)[1], 1);
  assert.equal(staging.rows[0].points.at(-1)[1], 0);
  const failed = runPracticeQuery('Tempo', '{ span.http.response.status_code >= 500 }');
  const successful = runPracticeQuery('Tempo', '{ span.http.response.status_code = 200 }');
  assert.ok(successful.count > failed.count);
  const traceId = errors.rows[0].labels.trace_id;
  const linked = runPracticeQuery('Tempo', `{ trace:id = "${traceId}" }`);
  assert.equal(linked.count, 1);
});

test('bad expressions report a query error', () => {
  for (const [source, query] of [
    ['Prometheus', 'gibberish('],
    ['Prometheus', 'rate(up)'],
    ['Loki', 'nothing'],
    ['Loki', '{service_name="bibbidi-backend"} | nonsense'],
    ['Tempo', 'garbage'],
    ['Tempo', '{ wildly.invalid = "x" }'],
  ]) assert.throws(() => runPracticeQuery(source, query), Error);
});
