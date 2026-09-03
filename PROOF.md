# Observable proof

This file is the employer-facing proof layer for Billable Meetings OS.

It is derived from a fresh read of the private implementation repository. The private rule engine, schemas, customer-like evidence, review tokens, endpoints and production configuration are not copied here.

## What is implemented

The current private project is a Node.js 24 / pnpm codebase with a dedicated meeting-billing test surface and a broader release/check pipeline.

Publicly safe implementation evidence includes:

- deterministic meeting-billing evaluation;
- meeting-billing replay tooling;
- automated tests for the core billing contract;
- an explicit invalid-duration test;
- browser E2E fixture coverage;
- browser reload/recovery coverage;
- Supabase baseline / authority verification;
- edge-function packaging and live-verification tooling;
- authentication-policy checks;
- review-UI checks;
- release authorization / workflow guards;
- secret-hygiene and namespace checks.

## Public truth contract

The objective lane resolves to:

```text
BILLABLE | NON-BILLABLE | REVIEW
```

The key rules are:

- a mandatory objective failure may make the meeting `NON-BILLABLE`;
- all required objective conditions passing may make it `BILLABLE`;
- missing, contradictory or unsupported evidence routes to `REVIEW`;
- booking is not treated as attendance;
- subjective qualification is not forced into the deterministic lane.

## Concrete failure examples

### 1. Booking without attendance proof

```text
calendar_booking = true
attendance_evidence = missing
agreement_requires_attendance = true

result = REVIEW
```

The implementation should not infer a commercially important fact from a merely related event.

### 2. Invalid duration

The private test suite contains a dedicated invalid-duration case. This is important because malformed timing data should not silently become a valid billability input.

## Engineering-check surface

The project build/check path does more than run a single unit-test command. It also verifies areas such as:

- source assembly;
- Supabase baseline and authority;
- provider / edge behavior;
- browser preflight and end-to-end behavior;
- auth policy;
- review UI;
- workflow / release guards;
- site behavior.

I am exposing the **existence and purpose** of these checks, not the private scripts or provider configuration.

## Sanitized output examples

See [examples/sanitized-billing-decisions.json](examples/sanitized-billing-decisions.json).

They are synthetic/redacted representations of the implemented decision states, not customer records.

## Implemented now vs not claimed

| Area | Public evidence state |
|---|---|
| Deterministic billability states | Implemented |
| Core billing automated tests | Implemented |
| Invalid-duration handling | Explicitly tested |
| Browser E2E / reload checks | Present in private test suite |
| Supabase / auth / release checks | Present in private build pipeline |
| Customer adoption metrics | Not claimed |
| Autonomous invoice authority | Not claimed |
| Product-market fit | Not claimed |

## What I can defend in an interview

- how I separate booking, attendance and billability;
- how a commercial agreement becomes a deterministic rule boundary;
- when a clause is too subjective for deterministic treatment;
- why `REVIEW` is safer than forcing a binary answer;
- how malformed or contradictory evidence should affect the result;
- why verification and final commercial settlement are separate layers;
- where AI accelerates implementation without becoming the authority for the contract.
