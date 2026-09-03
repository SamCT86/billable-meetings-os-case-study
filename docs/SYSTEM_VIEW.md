# System view

This is a deliberately public abstraction. It explains the commercial decision flow without publishing the private runtime architecture.

```text
┌───────────────────┐
│ Billing agreement │
└─────────┬─────────┘
          +
┌───────────────────┐
│ Meeting evidence  │
└─────────┬─────────┘
          ↓
┌────────────────────────┐
│ Deterministic objective│
│ rule evaluation        │
└───────────┬────────────┘
            ↓
┌────────────────────────┐
│ BILLABLE               │
│ NON-BILLABLE           │
│ REVIEW                 │
└───────────┬────────────┘
            ↓
┌────────────────────────┐
│ Evidence-backed record │
└───────────┬────────────┘
            ↓
┌────────────────────────┐
│ Client review / dispute│
└────────────────────────┘
```

## Boundary 1 — agreement authority

The billing agreement defines the objective decision boundary. The system should not invent rules after seeing the meeting.

## Boundary 2 — evidence

A related calendar or CRM event does not automatically prove attendance or billability.

## Boundary 3 — deterministic lane

Objective clauses can be evaluated deterministically. Subjective qualification should not be disguised as deterministic certainty.

## Boundary 4 — review

Missing or contradictory authoritative evidence belongs in `REVIEW` rather than being guessed into a binary result.

## Boundary 5 — commercial workflow

The verification layer supports a settlement/review process. It does not claim authority over every commercial dispute.

## Why this is public

A technical reviewer can inspect the contract/evidence model without receiving the private rule engine, schemas, database model, review-token mechanics or production configuration.
