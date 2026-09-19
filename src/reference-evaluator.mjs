function stableSources(rows) {
  return rows.map(row => row.source).filter(Boolean).sort();
}

function resolveEvidence(rows = []) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return { state: 'UNKNOWN', reason: 'EVIDENCE_MISSING', sources: [] };
  }
  const values = rows.map(row => JSON.stringify(row.value));
  if (new Set(values).size !== 1) {
    return { state: 'UNKNOWN', reason: 'EVIDENCE_CONFLICT', sources: stableSources(rows) };
  }
  return { state: 'RESOLVED', value: rows[0].value, sources: stableSources(rows) };
}

function evaluateRule(rule, evidence) {
  if (rule.kind === 'subjective') {
    return { ruleId: rule.id, state: 'UNKNOWN', reason: 'SUBJECTIVE_RULE_UNSUPPORTED', sources: [] };
  }

  const resolved = resolveEvidence(evidence[rule.evidenceKey]);
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

export function evaluateMeetingBilling({ rules, evidence }) {
  if (!Array.isArray(rules) || !evidence || typeof evidence !== 'object') {
    throw new TypeError('rules and evidence are required');
  }

  const ruleResults = rules.map(rule => evaluateRule(rule, evidence));
  const mandatory = rules.map((rule, index) => ({ rule, result: ruleResults[index] })).filter(x => x.rule.mandatory);

  let status = 'BILLABLE';
  if (mandatory.some(x => x.result.state === 'FAIL')) status = 'NON_BILLABLE';
  else if (mandatory.some(x => x.result.state === 'UNKNOWN')) status = 'REVIEW';

  return { status, ruleResults };
}
