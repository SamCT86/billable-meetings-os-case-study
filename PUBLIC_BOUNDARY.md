# Public disclosure boundary

This repository contains a **bounded public reference implementation** for technical evaluation. It is not a mirror or source release of the private Billable Meetings production codebase.

## Intentionally public

- the agency/client billing problem and public truth contract;
- a small independently bounded reference evaluator;
- synthetic fixtures, adversarial tests and public CI;
- the `BILLABLE | NON_BILLABLE | REVIEW` decision boundary;
- selected engineering trade-offs and verification philosophy;
- the AI-assisted build workflow at a non-sensitive level;
- explicit non-claims and the public product URL.

## Intentionally private

- production application source code and production schemas;
- the full production rule engine, reason-code internals and settlement mechanics;
- customer data or customer-like private evidence;
- review tokens, private endpoints and provider configuration;
- credentials, secrets and infrastructure configuration;
- internal prompts/agent instructions and private repository/document state;
- private commercial experiments, roadmap sequencing and unreleased workflows;
- implementation details that would materially reproduce the commercial system.

## Release rule

Public proof is selected by default-deny:

`PRIVATE SOURCE → MINIMUM PROOF → SYNTHETIC DATA → IP/SECRET REVIEW → TEST → PUBLIC`

If a useful technical point can be demonstrated without exposing production implementation, the reference version is preferred.

No license to the private implementation is granted or implied by this public reference edition.
