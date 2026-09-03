# Selected engineering decisions

## 1. Freeze objective billing rules before evaluation

The agreement should define the rules before a delivered meeting is classified.

**Trade-off:** less flexibility after the fact, more protection against outcome-driven reinterpretation.

## 2. Separate booking, attendance and billability

A calendar booking is evidence of a booking. It is not automatically evidence that the person attended or that the meeting satisfies the billing agreement.

**Trade-off:** more evidence handling, fewer false shortcuts.

## 3. Keep the objective lane deterministic

Where the agreement contains objective conditions, the evaluation should remain inspectable and reproducible.

**Trade-off:** not every commercially meaningful clause fits this lane.

## 4. Route unresolved cases to `REVIEW`

Missing, contradictory or subjective evidence should not be forced into `BILLABLE` or `NON-BILLABLE`.

**Trade-off:** some human review remains, but the system avoids pretending uncertainty disappeared.

## 5. Preserve reason and evidence traces

A client or operator should be able to understand why a meeting reached its state without reading source code.

**Trade-off:** richer records, lower dispute ambiguity.

## 6. Keep verification separate from commercial acceptance

The system can produce an evidence-backed verification result while still allowing a client review or dispute path.

**Trade-off:** the product does not pretend software can eliminate every relationship-level disagreement.

## Interview questions this should create

- How do you translate a commercial agreement into objective rules?
- What evidence is authoritative for attendance?
- When does a rule become too subjective for deterministic handling?
- Why have a third `REVIEW` state?
- How would you keep a settlement record reproducible after evidence changes?
