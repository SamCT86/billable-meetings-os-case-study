# Verification approach

Billable Meetings OS treats billability as a contract-and-evidence question rather than an inference from the existence of a meeting event.

## Deterministic truth contract

At the public level, the objective lane follows three states:

```text
BILLABLE | NON-BILLABLE | REVIEW
```

The important rules are:

- a mandatory objective failure can make the meeting non-billable;
- all required objective conditions passing can make it billable;
- missing, contradictory or unsupported evidence routes to review;
- booking is not treated as attendance;
- subjective qualification is not forced into the deterministic lane.

## Verification layers

### 1. Agreement version
The system must know which agreement/rule set governs the decision.

### 2. Meeting evidence
Relevant evidence is normalized before rule evaluation.

### 3. Objective rule evaluation
Rules that can be evaluated deterministically should produce stable, inspectable results.

### 4. Evidence trace
The result should remain explainable through the rules and evidence that produced it.

### 5. Review boundary
Cases outside the deterministic evidence envelope belong in review rather than in fabricated certainty.

## What AI-assisted implementation must survive

- Are the agreement rules frozen and explicit?
- Is the evidence attached to the correct delivered meeting?
- Does the evidence actually establish attendance or another required fact?
- Are any authoritative facts missing or contradictory?
- Is a subjective clause being incorrectly treated as deterministic?
- Can the resulting state be explained without trusting the implementation blindly?

## Public limit

The private implementation contains the exact schemas, rule engine, evidence model, reason-code structure, settlement mechanics and production runtime. Those details are intentionally not published here.
