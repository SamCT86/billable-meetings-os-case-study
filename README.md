# Billable Meetings - turn meeting evidence into clear billing decisions

[![verify-reference](https://github.com/SamCT86/billable-meetings-os-case-study/actions/workflows/verify-reference.yml/badge.svg)](https://github.com/SamCT86/billable-meetings-os-case-study/actions/workflows/verify-reference.yml)

**Live product:** https://billablemeetings.com  
**Portfolio:** https://sarmadtawfeek.se

Pay-per-meeting agreements sound simple until two sides disagree about what actually counts. Was the attendee from the right company? Was the meeting duplicated, cancelled, too short, or missing evidence?

I built this reference because those disagreements are really evidence problems. The software should be able to say what passed, what failed, and when the available evidence is not good enough to make a clean billing decision.

```text
agreement identity + frozen rule set
+ target meeting identity
+ source-identified meeting evidence
-> BILLABLE | NON_BILLABLE | REVIEW
```

`REVIEW` is intentional. It means the system does not have enough trustworthy evidence to make a clean billing decision.

## Try it

```bash
git clone https://github.com/SamCT86/billable-meetings-os-case-study.git
cd billable-meetings-os-case-study
npm test
```

## What the decision engine checks

The reference demonstrates that:

1. every rule must belong to the agreement being evaluated;
2. evidence from another meeting cannot make the target meeting `BILLABLE`;
3. evidence needs a non-empty source identity before it can support a deterministic result;
4. every mandatory objective rule must pass before a meeting becomes `BILLABLE`;
5. a mandatory objective failure becomes `NON_BILLABLE`;
6. missing or contradictory evidence becomes `REVIEW`;
7. malformed/empty rule contracts remain `REVIEW` rather than becoming billable by default;
8. subjective criteria are not silently converted into objective truth;
9. evidence ordering does not change the result.

The important separation is between **the governing agreement, the delivered meeting, the evidence used to evaluate it, and the decision the software is actually allowed to make**. The public reference requires source identity for traceability; it does not claim to authenticate or rank real production sources.

## What to inspect

- `src/reference-evaluator.mjs` - the evidence-to-billability engine.
- `test/reference-evaluator.test.mjs` - adversarial and edge-case tests.
- `fixtures/billable.json` - synthetic meeting and evidence input.
- `PROOF.md` - broader implementation evidence.
- `PUBLIC_BOUNDARY.md` - what is public and what stays private.

## From a business rule to working software

The private product expands the same idea into a broader system with normalization, chronology, duplicate handling, settlement records, review/dispute behavior, persistence, Supabase infrastructure, browser E2E tests, and customer-facing product surfaces.

A simplified version of the design is:

```text
messy commercial agreement
-> explicit rules
-> deterministic evaluator
-> evidence trail
-> review path for uncertainty
-> usable product surface
```

## Public and private boundary

Published here:

- bounded decision logic;
- synthetic fixtures;
- executable tests and CI;
- non-customer system and evidence documentation.

Kept private:

- production engine and schemas;
- customer data and private evidence;
- infrastructure credentials and review tokens;
- proprietary workflows and unreleased commercial logic.

## What I am trying to prove with this repo

Not that every meeting can be judged automatically. The useful claim is smaller: objective commercial rules can be encoded so that missing or contradictory evidence remains visible instead of being quietly turned into a billable result.

I do **not** claim product-market fit, customer outcome metrics, autonomous invoice authority, or that this public reference is the production runtime.

I use AI tools during implementation, but I own the rule model, decision boundaries, debugging, tests, and the final call on what is safe to ship.

For my main Applied AI runtime work, see [Agent Forecast Foundry](https://github.com/SamCT86/agent-forecast-foundry-case-study).
