# Billable Meetings — turn billing agreements into deterministic decisions

[![verify-reference](https://github.com/SamCT86/billable-meetings-os-case-study/actions/workflows/verify-reference.yml/badge.svg)](https://github.com/SamCT86/billable-meetings-os-case-study/actions/workflows/verify-reference.yml)

**Engineering signal:** translate messy commercial rules into deterministic software with explicit evidence and review states.

**Live product:** https://billablemeetings.com  
**Portfolio:** https://sarmadtawfeek.se

Agencies can agree to pay per qualified meeting and still disagree later about what actually counts. Role fit, duplicates, cancellations, attendance, duration and missing records turn a seemingly simple billing rule into an evidence problem.

This public repository exposes the core decision boundary in runnable form:

```text
billing agreement
+ authoritative meeting evidence
→ BILLABLE | NON_BILLABLE | REVIEW
```

`REVIEW` is not an error state. It is how the system refuses to turn missing, contradictory or subjective evidence into invoice certainty.

## Run the decision engine

```bash
git clone https://github.com/SamCT86/billable-meetings-os-case-study.git
cd billable-meetings-os-case-study
npm test
```

Primary surfaces:

- `src/reference-evaluator.mjs` — bounded evidence-to-billability engine
- `test/reference-evaluator.test.mjs` — adversarial truth-boundary cases
- `fixtures/billable.json` — synthetic meeting/evidence input
- `PROOF.md` — broader implementation evidence
- `PUBLIC_BOUNDARY.md` — public/private boundary

## Decision invariants

The executable reference demonstrates that:

1. every mandatory objective rule must pass before `BILLABLE`;
2. a mandatory objective failure yields `NON_BILLABLE`;
3. missing or contradictory authoritative evidence yields `REVIEW`;
4. subjective criteria are not silently converted into objective truth;
5. evidence ordering does not change the outcome.

This is the part I care about most in commercial automation: **the code must preserve the boundary between a business rule, the evidence available to evaluate it, and the decision the system is actually authorized to make.**

## From business ambiguity to software

The broader private implementation expands that bounded engine into a product system with normalization, chronology, duplicate handling, settlement records, review/dispute behavior, persistence, Supabase infrastructure, browser E2E and customer-facing product surfaces.

That makes Billable Meetings a useful example of my product-engineering approach:

```text
commercial ambiguity
→ explicit contract
→ deterministic engine
→ evidence trail
→ exception / review path
→ usable product surface
```

## Public / private boundary

Published here:

- bounded decision logic;
- synthetic fixtures;
- executable tests and CI;
- non-customer system/evidence documentation.

Kept private:

- production engine and schemas;
- customer data and customer-like private evidence;
- infrastructure credentials and review tokens;
- proprietary workflows and unreleased commercial logic.

## Engineering accountability

AI tools are part of my implementation workflow. I remain accountable for problem framing, system boundaries, architecture constraints, debugging, acceptance criteria, tests and release decisions.

## Related engineering proof

- [Agent Forecast Foundry](https://github.com/SamCT86/agent-cashflow-os-case-study) — bounded post-model verification and AI evaluation mechanics.
- [MachineOutcome](https://github.com/SamCT86/machineoutcome-case-study) — reconcile observed state before trusting or retrying agent mutations.
- [ReleaseProof](https://github.com/SamCT86/releaseproof-case-study) — exact-artifact evidence and explicit `INCONCLUSIVE` states.
- [PriceBriefs](https://github.com/SamCT86/pricebriefs-case-study) — evidence-gated market decisions and refusal states.

## Scope

This repository does not claim product-market fit, customer outcome metrics, autonomous invoice authority, or that this bounded reference is the production runtime.
