# Billable Meetings — evidence-bound billing decisions

[![verify-reference](https://github.com/SamCT86/billable-meetings-os-case-study/actions/workflows/verify-reference.yml/badge.svg)](https://github.com/SamCT86/billable-meetings-os-case-study/actions/workflows/verify-reference.yml)

A small executable reference for the decision boundary behind Billable Meetings: objective billing rules plus authoritative evidence produce `BILLABLE`, `NON_BILLABLE`, or `REVIEW`. The commercial production system remains private.

**Live product:** https://billablemeetings.com  
**Portfolio:** https://sarmadtawfeek.se

## Run locally

```bash
git clone https://github.com/SamCT86/billable-meetings-os-case-study.git
cd billable-meetings-os-case-study
npm test
```

Key files:

- `src/reference-evaluator.mjs` — bounded decision engine;
- `test/reference-evaluator.test.mjs` — adversarial truth-boundary tests;
- `fixtures/billable.json` — synthetic evidence;
- `PROOF.md` — broader implementation evidence;
- `PUBLIC_BOUNDARY.md` — public/private boundary.

## Decision contract

```text
objective billing rules
+ authoritative evidence
→ BILLABLE | NON_BILLABLE | REVIEW
```

The reference demonstrates that:

- every mandatory objective rule must pass before `BILLABLE`;
- a mandatory objective failure yields `NON_BILLABLE`;
- missing or contradictory authoritative evidence yields `REVIEW`;
- subjective rules are not silently converted into objective truth;
- evidence ordering does not change the result.

The tests are the primary executable specification. Change the fixture or assertions and rerun them.

## Production boundary

The private production implementation is materially broader: normalization, chronology, duplicate handling, settlement records, review/dispute behavior, persistence, infrastructure and product surfaces. None of that source is published here.

Public here:

- bounded reference logic;
- synthetic fixtures;
- executable tests and CI;
- non-customer system/evidence documentation.

Private:

- production engine and schemas;
- customer data and customer-like private evidence;
- infrastructure, credentials and review tokens;
- proprietary workflows and unreleased commercial logic.

## Engineering process

AI tools are part of the implementation workflow. I remain accountable for system boundaries, architecture constraints, code review, debugging, acceptance criteria, tests and release decisions.

## Related references

- [MachineOutcome](https://github.com/SamCT86/machineoutcome-case-study) — reconcile observed state before trusting or retrying agent mutations.
- [ReleaseProof](https://github.com/SamCT86/releaseproof-case-study) — exact-artifact evidence and explicit `INCONCLUSIVE` states.
- [PriceBriefs](https://github.com/SamCT86/pricebriefs-case-study) — evidence-gated commercial decisions and refusal states.

## Scope

This repository does not claim product-market fit, customer outcome metrics, autonomous invoice authority, or that this bounded reference is the production runtime.
