# Billable Meetings OS — contract + evidence → billability

**Sarmad Tawfeek · AI systems · technical implementation · automation**  
**Status:** Building  
**Public product:** https://billablemeetings.com  
**Portfolio:** https://sarmadtawfeek.se/

## My role in this build

I researched the product problem, chose the direction, defined the blueprint and quality expectations, and used specialist AI personas/agents to drive implementation and iteration.

The implementation is heavily AI-assisted. I do **not** claim that I personally hand-wrote every line of code or independently selected every low-level technical mechanism. My direct ownership is the product problem, system requirements, expert/persona orchestration, acceptance criteria and quality gates.

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

Current private-source evidence includes:

- a Node.js 24 / pnpm project with a dedicated meeting-billing test suite;
- deterministic billing evaluation plus replay tooling;
- tests for core billing behavior, invalid duration, browser E2E fixtures and browser reload behavior;
- Supabase baseline / authority checks;
- edge-function packaging and verification tooling;
- browser release preflight / E2E checks;
- authentication-policy and review-UI checks;
- release and production-authorization guards;
- secret-hygiene, namespace and site verification checks.

The public repo does not expose the private rule engine or schemas.

**Start with the evidence layer:** [PROOF.md](PROOF.md)

## Why a third state matters

`REVIEW` protects the commercial decision from evidence that cannot support a binary answer.

Example:

```text
booking exists
attendance evidence missing
objective billing rule requires attendance

→ REVIEW
```

The implementation should not upgrade a related CRM/calendar event into proof of attendance merely because a cleaner answer is commercially convenient.

## A tested failure boundary

The private test suite contains a dedicated invalid-duration case. Malformed timing data should not silently become a valid billability input.

This is implementation behavior evidenced in the private source, not a claim that I personally authored the underlying test or low-level validation mechanism.

## How AI fits

AI agents/models are used heavily for implementation, integration work, test generation, review and iteration.

My role is to define the commercial problem, blueprint the required system behavior, structure the expert/persona workflow, set the quality bar and require the implementation to survive acceptance and evidence gates before I treat it as done.

More detail: [docs/HOW_I_BUILD_WITH_AI.md](docs/HOW_I_BUILD_WITH_AI.md)

## Technical context

`Node.js 24` · `pnpm` · `Supabase` · `deterministic rule evaluation` · `automated tests` · `browser E2E` · `release / auth verification`

Technology is implementation context, not a claim that I personally selected or hand-authored every component.

## Inspect the case study

- [Observable proof](PROOF.md)
- [Sanitized decision examples](examples/sanitized-billing-decisions.json)
- [System view](docs/SYSTEM_VIEW.md)
- [System requirements & trade-offs](docs/DECISIONS.md)
- [Verification approach](docs/VERIFICATION.md)
- [Public / private boundary](PUBLIC_BOUNDARY.md)

## Not claimed

- customer adoption metrics;
- billing accuracy percentages;
- autonomous invoice authority;
- that subjective commercial qualification can always be made deterministic;
- product-market fit;
- personal authorship of every implementation detail.

The employer signal I want this repo to show is how I turn an operational problem into a blueprint, direct AI-assisted implementation and insist on quality/evidence boundaries before accepting the result.

## Related engineering case studies

- [ReleaseProof](https://github.com/SamCT86/releaseproof-case-study) — exact-build verification and reproducible release evidence.
- [PriceBriefs](https://github.com/SamCT86/pricebriefs-case-study) — deterministic decision support with explicit refusal states.
- [MachineOutcome](https://github.com/SamCT86/machineoutcome-case-study) — evidence-backed verification of AI-agent outcomes.
