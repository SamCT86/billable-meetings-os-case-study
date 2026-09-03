# AI in the Billable Meetings workflow

AI is implementation leverage. The billing agreement is the authority.

## Where AI helps

- exploring implementation approaches;
- drafting and revising code candidates;
- generating rule-interaction and edge-case ideas;
- investigating integrations;
- reviewing tests and documentation.

## What stays explicit

- which agreement version governs the decision;
- which clauses are objective enough for deterministic evaluation;
- what evidence is authoritative;
- the difference between booking, attendance and billability;
- when contradictory/missing evidence must route to `REVIEW`;
- which commercial questions still require human judgment.

## Working loop

```text
agreement
   ↓
objective rule boundary
   ↓
AI-assisted implementation
   ↓
tests + evidence checks
   ↓
BILLABLE / NON-BILLABLE / REVIEW
   ↓
human review where needed
```

The quality test is whether the decision can be explained from the agreement and evidence without trusting a model—or the implementation—blindly.

For concrete implementation evidence, see [../PROOF.md](../PROOF.md).
