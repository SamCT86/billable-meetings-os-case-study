# Billable Meetings — deterministic billing truth, runnable reference

[![verify-reference](https://github.com/SamCT86/billable-meetings-os-case-study/actions/workflows/verify-reference.yml/badge.svg)](https://github.com/SamCT86/billable-meetings-os-case-study/actions/workflows/verify-reference.yml)

A public, executable engineering reference derived from the **truth contract** behind Billable Meetings. The production product and production codebase remain private.

**Live product:** https://billablemeetings.com

## Five-minute technical evaluation

```bash
git clone https://github.com/SamCT86/billable-meetings-os-case-study.git
cd billable-meetings-os-case-study
npm test
```

Then inspect:

- `src/reference-evaluator.mjs` — deliberately small reference evaluator;
- `test/reference-evaluator.test.mjs` — adversarial truth-boundary tests;
- `fixtures/billable.json` — synthetic, non-customer evidence;
- `PROOF.md` — broader observable product evidence;
- `PUBLIC_BOUNDARY.md` — what intentionally stays private.

## What this proves

The runnable reference preserves the core public decision doctrine:

```text
objective billing rules
+ authoritative evidence
→ BILLABLE | NON_BILLABLE | REVIEW
```

It demonstrates that:

- every mandatory objective rule must pass before `BILLABLE`;
- a mandatory objective failure yields `NON_BILLABLE`;
- missing authoritative evidence yields `REVIEW`;
- contradictory authoritative evidence yields `REVIEW`;
- subjective rules are not silently converted into objective truth;
- evidence ordering does not change the result.

The tests are intentionally more important than the prose. Change the fixture or assertions and run them.

## Production system

The private production implementation is materially broader: normalization, chronology, duplicate handling, settlement records, review/dispute behavior, persistence, infrastructure and product surfaces. None of that private source is published here.

This repository is a **reference edition**, not a source release of the commercial system.

## How I build

I use AI agents heavily for implementation, investigation, test generation and critique. My ownership is the product problem, system requirements, truth contracts, architecture constraints, acceptance criteria, adversarial review and the decision to accept or reject the resulting system.

I do not claim to have hand-written every line. The intended signal is that I can direct an AI-native engineering workflow toward deterministic, testable, fail-closed behavior rather than accepting plausible-looking output.

## Public/private boundary

Public here:

- a bounded reference implementation;
- synthetic fixtures;
- executable tests;
- CI;
- system/evidence documentation.

Private:

- production engine and schemas;
- customer data and customer-like private evidence;
- infrastructure and credentials;
- private review tokens and internal runtime details;
- proprietary product workflows and unreleased commercial logic.

## Related runnable references

- [MachineOutcome](https://github.com/SamCT86/machineoutcome-case-study) — reconcile observed state before trusting or retrying agent mutations.
- [ReleaseProof](https://github.com/SamCT86/releaseproof-case-study) — exact-artifact evidence and explicit `INCONCLUSIVE` states.
- [PriceBriefs](https://github.com/SamCT86/pricebriefs-case-study) — evidence-gated commercial decisions and refusal states.

## Not claimed

This repository does not claim product-market fit, customer outcome metrics, autonomous invoice authority, or that the reference implementation is the production runtime.
