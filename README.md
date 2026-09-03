# Billable Meetings OS — Public Engineering Case Study

**Status:** Building  
**Focus:** Deterministic verification of whether delivered meetings satisfy an agency-client billing agreement  
**Public product:** https://billablemeetings.com  
**Portfolio:** https://sarmadtawfeek.se/

> This repository is a public case study of the problem, system boundary and engineering decisions. The implementation source remains private by design.

## The problem

For appointment-setting and meeting-delivery businesses, **“a meeting happened”** and **“this meeting is billable under the agreement”** are not necessarily the same fact.

Billing can depend on objective agreement terms, attendance evidence, missing data and exceptions. Reviewing those decisions inconsistently creates friction between agency and client.

Billable Meetings OS explores a narrower question:

**Given a frozen billing agreement and the available evidence for a delivered meeting, what billing state can the evidence support?**

## Public decision model

```text
Billing agreement
       +
Meeting evidence
       ↓
Deterministic rule evaluation
       ↓
BILLABLE / NON-BILLABLE / REVIEW
       ↓
Evidence-backed decision record
       ↓
Client review / dispute path
```

The important boundary is that missing or contradictory evidence is not guessed into a clean answer.

## What I want a technical reviewer to inspect

- **Contract before classification.** The billing rules should be frozen before the meeting is evaluated.
- **Evidence before billing.** A calendar booking is not automatically attendance or billability.
- **Deterministic where the agreement allows it.** Objective clauses should remain inspectable rather than hidden inside probabilistic judgment.
- **`REVIEW` is a real state.** Missing, contradictory or subjective evidence should route to review instead of being forced into a binary answer.
- **Decision and settlement are separate.** A verification result can support a commercial workflow without pretending the system owns the final business relationship.

## AI-native build approach

AI helps me accelerate exploration, implementation candidates, integration work, test generation and review. In a billing system, however, the model should not silently invent contract meaning or missing evidence.

```text
Commercial agreement
        ↓
Explicit objective rules
        ↓
AI-assisted implementation
        ↓
Deterministic evaluation
        ↓
Evidence trace
        ↓
BILLABLE / NON-BILLABLE / REVIEW
        ↓
Human/client review when needed
```

More detail: [docs/HOW_I_BUILD_WITH_AI.md](docs/HOW_I_BUILD_WITH_AI.md)

## Technical context

Current project evidence supports work with:

`Node.js` · `pnpm` · `Supabase` · `deterministic rule evaluation` · `automated tests` · `browser / end-to-end verification`

These are implementation contexts, not self-rated proficiency badges.

## Verification mindset

The deterministic lane has an explicit truth contract: mandatory failures can make a meeting non-billable, all required objective conditions can make it billable, and unresolved evidence belongs in review. The system should never infer attendance or qualification merely because a related event exists.

See [docs/VERIFICATION.md](docs/VERIFICATION.md).

## Current truth boundary

This repository does **not** claim:

- customer adoption metrics;
- billing accuracy percentages;
- fully autonomous invoice authority;
- that subjective commercial qualification can always be reduced to deterministic rules;
- product-market fit.

## Public / private boundary

Private source code, exact schemas, internal rule implementation, customer-like evidence, opaque review tokens, infrastructure configuration and implementation details that would materially reproduce the system remain private.

See [PUBLIC_BOUNDARY.md](PUBLIC_BOUNDARY.md).
