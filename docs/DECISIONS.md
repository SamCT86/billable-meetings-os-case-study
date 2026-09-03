# System requirements and trade-offs

These are requirements and trade-offs represented by the current Billable Meetings system. They explain the product/system boundary without claiming that I personally originated every low-level engineering choice used to implement it.

My direct ownership is the product direction, high-level blueprint, expert/persona orchestration, constraints, acceptance criteria and quality gates. The implementation process is heavily AI-assisted.

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

## Questions this case study is intended to create

- What commercial problem is the product trying to remove?
- Which parts of an agreement are suitable for objective automation?
- Why preserve a third `REVIEW` state?
- What should count as sufficient evidence for billability?
- Which parts of the blueprint were requirements I set, and which low-level choices came from the AI-assisted implementation process?
