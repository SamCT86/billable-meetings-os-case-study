# Billable Meetings OS — contract + evidence → billability

**Sarmad Tawfeek · AI systems · technical implementation · automation**  
**Status:** Building  
**Public product:** https://billablemeetings.com  
**Portfolio:** https://sarmadtawfeek.se/

A calendar event can prove that something was booked. It does not automatically prove attendance, qualification or billability.

Billable Meetings OS turns that distinction into an explicit decision system:

```text
Frozen billing agreement
        +
Meeting evidence
        ↓
Objective rule evaluation
        ↓
BILLABLE / NON-BILLABLE / REVIEW
        ↓
Evidence-backed record
```

## What exists today

The private implementation contains substantially more engineering than the public case study previously showed.

Current source evidence includes:

- a Node.js 24 / pnpm project with a dedicated meeting-billing test suite;
- deterministic billing evaluation plus replay tooling;
- tests for core billing behavior, invalid duration, browser E2E fixtures and browser reload behavior;
- Supabase baseline / authority checks;
- edge-function packaging and verification tooling;
- browser release preflight / E2E checks;
- authentication-policy and review-UI checks;
- release and production-authorization guards;
- secret-hygiene, namespace and site verification checks.

The public repo still does not expose the private rule engine or schemas.

**Start with the evidence layer:** [PROOF.md](PROOF.md)

## Why a third state matters

`REVIEW` is not a fallback label. It protects the commercial decision from evidence that cannot support a binary answer.

Example:

```text
booking exists
attendance evidence missing
objective billing rule requires attendance

→ REVIEW
```

The system should not upgrade a related CRM/calendar event into proof of attendance merely because a cleaner answer is commercially convenient.

## One failure case I test explicitly

Invalid or unsupported meeting duration is not allowed to flow through as if it were a normal qualified meeting. The private test suite contains a dedicated invalid-duration case alongside the core billing tests.

That kind of edge case matters because deterministic automation becomes dangerous when malformed inputs are silently normalized into valid business facts.

## Where AI fits

AI accelerates implementation candidates, test ideas, integration work and review. It does not get to invent agreement meaning or missing evidence.

I keep the agreement version, objective rule boundary, evidence authority and `REVIEW` conditions explicit so the generated implementation can be checked against the commercial contract.

More detail: [docs/HOW_I_BUILD_WITH_AI.md](docs/HOW_I_BUILD_WITH_AI.md)

## Technical context

`Node.js 24` · `pnpm` · `Supabase` · `deterministic rule evaluation` · `automated tests` · `browser E2E` · `release / auth verification`

## Inspect the proof

- [Observable proof](PROOF.md)
- [Sanitized decision examples](examples/sanitized-billing-decisions.json)
- [System view](docs/SYSTEM_VIEW.md)
- [Engineering decisions](docs/DECISIONS.md)
- [Verification approach](docs/VERIFICATION.md)
- [Public / private boundary](PUBLIC_BOUNDARY.md)

## Not claimed

- customer adoption metrics;
- billing accuracy percentages;
- autonomous invoice authority;
- that subjective commercial qualification can always be made deterministic;
- product-market fit.

The useful employer signal is the implementation judgment: translate the agreement into explicit rules, preserve evidence gaps, and keep the result inspectable enough for a human dispute/review path.
