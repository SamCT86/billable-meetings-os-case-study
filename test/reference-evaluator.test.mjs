import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateMeetingBilling } from '../src/reference-evaluator.mjs';

const meetingId = 'meeting:target';
const agreementId = 'agreement:target';

const rules = [
  { id: 'booked', agreementId, evidenceKey: 'BOOKED', op: 'eq', expected: true, mandatory: true },
  { id: 'attended', agreementId, evidenceKey: 'ATTENDED', op: 'eq', expected: true, mandatory: true },
  { id: 'duration', agreementId, evidenceKey: 'DURATION_MINUTES', op: 'min', minimum: 20, mandatory: true },
];

function evidence(overrides = {}) {
  const base = {
    BOOKED: [{ value: true, source: 'calendar:1', meetingId }],
    ATTENDED: [{ value: true, source: 'meeting:1', meetingId }],
    DURATION_MINUTES: [{ value: 31, source: 'meeting:1', meetingId }],
  };
  return { ...base, ...overrides };
}

test('all mandatory objective rules passing is BILLABLE', () => {
  const result = evaluateMeetingBilling({ agreementId, meetingId, rules, evidence: evidence() });
  assert.equal(result.status, 'BILLABLE');
});

test('a mandatory objective failure is NON_BILLABLE', () => {
  const result = evaluateMeetingBilling({ agreementId, meetingId, rules, evidence: evidence({ ATTENDED: [{ value: false, source: 'meeting:1', meetingId }] }) });
  assert.equal(result.status, 'NON_BILLABLE');
  assert.equal(result.ruleResults.find(r => r.ruleId === 'attended').state, 'FAIL');
});

test('missing authoritative evidence preserves REVIEW', () => {
  const result = evaluateMeetingBilling({ agreementId, meetingId, rules, evidence: evidence({ ATTENDED: [] }) });
  assert.equal(result.status, 'REVIEW');
  assert.equal(result.ruleResults.find(r => r.ruleId === 'attended').reason, 'EVIDENCE_MISSING');
});

test('conflicting authoritative evidence preserves REVIEW', () => {
  const result = evaluateMeetingBilling({ agreementId, meetingId, rules, evidence: evidence({ ATTENDED: [
    { value: true, source: 'meeting:1', meetingId },
    { value: false, source: 'crm:7', meetingId },
  ] }) });
  assert.equal(result.status, 'REVIEW');
  assert.equal(result.ruleResults.find(r => r.ruleId === 'attended').reason, 'EVIDENCE_CONFLICT');
});

test('subjective rules are never silently converted to objective truth', () => {
  const result = evaluateMeetingBilling({
    agreementId,
    meetingId,
    rules: [...rules, { id: 'good-fit', agreementId, kind: 'subjective', mandatory: true }],
    evidence: evidence(),
  });
  assert.equal(result.status, 'REVIEW');
  assert.equal(result.ruleResults.at(-1).reason, 'SUBJECTIVE_RULE_UNSUPPORTED');
});

test('evidence ordering does not change the decision', () => {
  const first = evaluateMeetingBilling({ agreementId, meetingId, rules, evidence: evidence({ ATTENDED: [
    { value: true, source: 'z:2', meetingId },
    { value: true, source: 'a:1', meetingId },
  ] }) });
  const second = evaluateMeetingBilling({ agreementId, meetingId, rules, evidence: evidence({ ATTENDED: [
    { value: true, source: 'a:1', meetingId },
    { value: true, source: 'z:2', meetingId },
  ] }) });
  assert.deepEqual(first, second);
});

test('evidence from another meeting cannot make the target meeting BILLABLE', () => {
  const wrongMeetingEvidence = Object.fromEntries(
    Object.entries(evidence()).map(([key, rows]) => [
      key,
      rows.map((row) => ({ ...row, meetingId: 'meeting:other' })),
    ]),
  );
  const result = evaluateMeetingBilling({
    agreementId,
    meetingId: 'meeting:target',
    rules,
    evidence: wrongMeetingEvidence,
  });
  assert.equal(result.status, 'REVIEW');
  assert.equal(result.ruleResults[0].reason, 'EVIDENCE_MEETING_MISMATCH');
});

test('missing target meeting identity cannot become BILLABLE', () => {
  const result = evaluateMeetingBilling({ agreementId, rules, evidence: evidence() });
  assert.equal(result.status, 'REVIEW');
  assert.equal(result.reason, 'INVALID_DECISION_CONTEXT');
});

test('rules from another agreement cannot make the target agreement BILLABLE', () => {
  const result = evaluateMeetingBilling({
    agreementId: 'agreement:target',
    meetingId,
    rules: rules.map((rule) => ({ ...rule, agreementId: 'agreement:other' })),
    evidence: evidence(),
  });
  assert.equal(result.status, 'REVIEW');
  assert.equal(result.reason, 'AGREEMENT_RULESET_MISMATCH');
});

test('missing agreement identity cannot become BILLABLE', () => {
  const result = evaluateMeetingBilling({ meetingId, rules, evidence: evidence() });
  assert.equal(result.status, 'REVIEW');
  assert.equal(result.reason, 'INVALID_DECISION_CONTEXT');
});

test('evidence without source identity cannot make a meeting BILLABLE', () => {
  const result = evaluateMeetingBilling({
    agreementId,
    meetingId,
    rules,
    evidence: evidence({ BOOKED: [{ value: true, meetingId }] }),
  });
  assert.equal(result.status, 'REVIEW');
  assert.equal(result.ruleResults.find(r => r.ruleId === 'booked').reason, 'EVIDENCE_SOURCE_MISSING');
});

test('empty rule set cannot become BILLABLE by vacuous truth', () => {
  const result = evaluateMeetingBilling({ agreementId, meetingId, rules: [], evidence: {} });
  assert.equal(result.status, 'REVIEW');
  assert.equal(result.reason, 'INVALID_RULESET');
});

test('malformed mandatory flag cannot silently remove required contract rules', () => {
  const malformed = rules.map(({ mandatory, ...rule }) => rule);
  const result = evaluateMeetingBilling({ agreementId, meetingId, rules: malformed, evidence: evidence() });
  assert.equal(result.status, 'REVIEW');
  assert.equal(result.reason, 'INVALID_RULESET');
});

test('malformed eq rule and missing evidence value cannot compare undefined into BILLABLE', () => {
  const malformedRules = rules.map((rule) =>
    rule.id === 'booked'
      ? { id: rule.id, agreementId, evidenceKey: rule.evidenceKey, op: 'eq', mandatory: true }
      : rule,
  );
  const result = evaluateMeetingBilling({
    agreementId,
    meetingId,
    rules: malformedRules,
    evidence: evidence({ BOOKED: [{ value: undefined, source: 'calendar:1', meetingId }] }),
  });
  assert.equal(result.status, 'REVIEW');
  assert.equal(result.reason, 'INVALID_RULESET');
});
