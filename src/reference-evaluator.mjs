function stableSources(rows) {
  return rows.map(row => row?.source).filter(source => typeof source === 'string' && source.trim() !== '').sort();
}

function resolveEvidence(rows = [], meetingId) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return { state: 'UNKNOWN', reason: 'EVIDENCE_MISSING', sources: [] };
  }
  if (rows.some((row) => typeof row?.source !== 'string' || row.source.trim() === '')) {
    return { state: 'UNKNOWN', reason: 'EVIDENCE_SOURCE_MISSING', sources: stableSources(rows) };
  }
  if (meetingId && rows.some((row) => row?.meetingId !== meetingId)) {
    return { state: 'UNKNOWN', reason: 'EVIDENCE_MEETING_MISMATCH', sources: stableSources(rows) };
  }
  const values = rows.map(row => JSON.stringify(row.value));
  if (new Set(values).size !== 1) {
    return { state: 'UNKNOWN', reason: 'EVIDENCE_CONFLICT', sources: stableSources(rows) };
  }
  return { state: 'RESOLVED', value: rows[0].value, sources: stableSources(rows) };
}

function validRuleDefinition(rule) {
  if (!rule || typeof rule !== 'object') return false;
  if (typeof rule.id !== 'string' || rule.id.trim() === '') return false;
  if (typeof rule.mandatory !== 'boolean') return false;
  if (rule.kind === 'subjective') return true;
  if (typeof rule.evidenceKey !== 'string' || rule.evidenceKey.trim() === '') return false;
  if (rule.op === 'eq') return Object.prototype.hasOwnProperty.call(rule, 'expected') && rule.expected !== undefined;
  if (rule.op === 'min') return typeof rule.minimum === 'number' && Number.isFinite(rule.minimum);
  return false;
}

function evaluateRule(rule, evidence, meetingId) {
  if (rule.kind === 'subjective') {
    return { ruleId: rule.id, state: 'UNKNOWN', reason: 'SUBJECTIVE_RULE_UNSUPPORTED', sources: [] };
  }

  const resolved = resolveEvidence(evidence[rule.evidenceKey], meetingId);
  if (resolved.state === 'UNKNOWN') {
    return { ruleId: rule.id, state: 'UNKNOWN', reason: resolved.reason, sources: resolved.sources };
  }

  let passed = false;
  if (rule.op === 'eq') passed = Object.is(resolved.value, rule.expected);
  else if (rule.op === 'min') passed = typeof resolved.value === 'number' && resolved.value >= rule.minimum;
  else throw new Error(`unsupported rule op: ${rule.op}`);

  return {
    ruleId: rule.id,
    state: passed ? 'PASS' : 'FAIL',
    reason: passed ? 'RULE_PASS' : 'RULE_FAIL',
    sources: resolved.sources,
  };
}

export function evaluateMeetingBilling({ agreementId, meetingId, rules, evidence }) {
  if (
    typeof agreementId !== 'string' || agreementId.trim() === '' ||
    typeof meetingId !== 'string' || meetingId.trim() === ''
  ) {
    return { status: 'REVIEW', reason: 'INVALID_DECISION_CONTEXT', ruleResults: [] };
  }
  if (!Array.isArray(rules) || !evidence || typeof evidence !== 'object') {
    throw new TypeError('rules and evidence are required');
  }
  if (rules.length === 0 || rules.some((rule) => typeof rule?.mandatory !== 'boolean')) {
    return { status: 'REVIEW', reason: 'INVALID_RULESET', ruleResults: [] };
  }
  if (rules.some((rule) => rule?.agreementId !== agreementId)) {
    return { status: 'REVIEW', reason: 'AGREEMENT_RULESET_MISMATCH', ruleResults: [] };
  }
  if (rules.some((rule) => !validRuleDefinition(rule))) {
    return { status: 'REVIEW', reason: 'INVALID_RULESET', ruleResults: [] };
  }

  const ruleResults = rules.map(rule => evaluateRule(rule, evidence, meetingId));
  const mandatory = rules.map((rule, index) => ({ rule, result: ruleResults[index] })).filter(x => x.rule.mandatory);

  let status = 'BILLABLE';
  if (mandatory.some(x => x.result.state === 'FAIL')) status = 'NON_BILLABLE';
  else if (mandatory.some(x => x.result.state === 'UNKNOWN')) status = 'REVIEW';

  return { status, ruleResults };
}
