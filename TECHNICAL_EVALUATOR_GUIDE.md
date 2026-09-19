# Technical evaluator guide

This repository is a public engineering case study for the private Billable Meetings implementation. It is intentionally optimized for fast technical review without publishing the production rule engine, schemas, credentials, or customer data.

## Five-minute path

1. Open the live product: https://billablemeetings.com/
2. Open the public sample settlement: https://billablemeetings.com/sample-settlement/
3. Inspect [`examples/sanitized-billing-decisions.json`](examples/sanitized-billing-decisions.json) for the public three-state decision boundary.
4. Read [`PROOF.md`](PROOF.md) for what the current implementation evidence does and does not establish.
5. Read [`docs/SYSTEM_VIEW.md`](docs/SYSTEM_VIEW.md) and [`docs/VERIFICATION.md`](docs/VERIFICATION.md) for the system boundary and verification model.

## What to test conceptually

The public contract is intentionally narrow:

```text
frozen objective billing rules
+ normalized authoritative meeting evidence
→ BILLABLE | NON-BILLABLE | REVIEW
→ evidence-backed settlement record
```

A useful evaluator should be able to answer these questions from the public material:

- Does a booking alone count as proof of attendance? **No.**
- Can missing authoritative evidence be silently upgraded into a clean binary answer? **No; `REVIEW` is valid.**
- Can a mandatory objective rule fail and still produce `BILLABLE`? **No.**
- Are synthetic examples presented as customer evidence? **No.**
- Does this case study claim autonomous invoice authority or product-market fit? **No.**

## What is deliberately not published

The production rule-engine implementation, exact schemas, private reason-code internals, review tokens, customer-like evidence, credentials, and infrastructure configuration remain private. See [`PUBLIC_BOUNDARY.md`](PUBLIC_BOUNDARY.md).

The intended signal here is the ability to turn a commercial agreement into explicit deterministic truth states, preserve uncertainty instead of guessing, and require evidence before billing conclusions are accepted.
