import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateMeetingBilling } from '../src/reference-evaluator.mjs';

const rules = [
  { id: 'booked', evidenceKey: 'BOOKED', op: 'eq', expected: true, mandatory: true },
  { id: 'attended', evidenceKey: 'ATTENDED', op: 'eq', expected: true, mandatory: true },
  { id: 'duration', evidenceKey: 'DURATION_MINUTES', op: 'min', minimum: 20, mandatory: true },
];

function evidence(overrides = {}) {
  const base = {
    BOOKED: [{ value: true, source: 'calendar:1' }],
    ATTENDED: [{ value: true, source: 'meeting:1' }],
    DURATION_MINUTES: [{ value: 31, source: 'meeting:1' }],
  };
  return { ...base, ...overrides };
}

test('all mandatory objective rules passing is BILLABLE', () => {
  const result = evaluateMeetingBilling({ rules, evidence: evidence() });
  assert.equal(result.status, 'BILLABLE');
});

test('a mandatory objective failure is NON_BILLABLE', () => {
  const result = evaluateMeetingBilling({ rules, evidence: evidence({ ATTENDED: [{ value: false, source: 'meeting:1' }] }) });
  assert.equal(result.status, 'NON_BILLABLE');
  assert.equal(result.ruleResults.find(r => r.ruleId === 'attended').state, 'FAIL');
});

test('missing authoritative evidence preserves REVIEW', () => {
  const result = evaluateMeetingBilling({ rules, evidence: evidence({ ATTENDED: [] }) });
  assert.equal(result.status, 'REVIEW');
  assert.equal(result.ruleResults.find(r => r.ruleId === 'attended').reason, 'EVIDENCE_MISSING');
});

test('conflicting authoritative evidence preserves REVIEW', () => {
  const result = evaluateMeetingBilling({ rules, evidence: evidence({ ATTENDED: [
    { value: true, source: 'meeting:1' },
    { value: false, source: 'crm:7' },
  ] }) });
  assert.equal(result.status, 'REVIEW');
  assert.equal(result.ruleResults.find(r => r.ruleId === 'attended').reason, 'EVIDENCE_CONFLICT');
});

test('subjective rules are never silently converted to objective truth', () => {
  const result = evaluateMeetingBilling({
    rules: [...rules, { id: 'good-fit', kind: 'subjective', mandatory: true }],
    evidence: evidence(),
  });
  assert.equal(result.status, 'REVIEW');
  assert.equal(result.ruleResults.at(-1).reason, 'SUBJECTIVE_RULE_UNSUPPORTED');
});

test('evidence ordering does not change the decision', () => {
  const first = evaluateMeetingBilling({ rules, evidence: evidence({ ATTENDED: [
    { value: true, source: 'z:2' },
    { value: true, source: 'a:1' },
  ] }) });
  const second = evaluateMeetingBilling({ rules, evidence: evidence({ ATTENDED: [
    { value: true, source: 'a:1' },
    { value: true, source: 'z:2' },
  ] }) });
  assert.deepEqual(first, second);
});
