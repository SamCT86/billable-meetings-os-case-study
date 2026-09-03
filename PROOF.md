# Observable proof

This file is the employer-facing proof layer for Billable Meetings OS.

It is derived from a fresh read of the private implementation repository. The private rule engine, schemas, customer-like evidence, review tokens, endpoints and production configuration are not copied here.

**Ownership note:** the implementation evidence below is not a claim that I personally hand-authored or independently selected every low-level mechanism. My direct role is product research/direction, system blueprint and requirements, expert/persona orchestration, acceptance criteria and quality gates; AI is used heavily in implementation.

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

The implemented behavior keeps booking, attendance and billability separate and preserves `REVIEW` when evidence cannot support a binary result.

## Concrete failure examples

### 1. Booking without attendance proof

```text
calendar_booking = true
attendance_evidence = missing
agreement_requires_attendance = true

result = REVIEW
```

### 2. Invalid duration

The private test suite contains a dedicated invalid-duration case. Malformed timing data should not silently become a valid billability input.

## Engineering-check surface

The project build/check path also verifies areas such as source assembly, Supabase baseline/authority, provider/edge behavior, browser preflight and E2E behavior, auth policy, review UI and workflow/release guards.

This repo exposes the **existence and purpose** of those checks, not the private scripts or provider configuration.

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

## What I personally own and can explain

- why I pursued the billability problem and what operational/commercial friction I wanted to reduce;
- the high-level blueprint: agreement + evidence → bounded billability result + review path;
- how I structured expert/persona workflows to research, build, critique and revise the system;
- the quality gates I required around evidence gaps, malformed inputs and review states;
- what the current implementation evidence supports and what it does not support;
- how I direct further iteration when AI-generated work fails the system or quality requirements.

For a specific library, implementation technique or code path, I distinguish between **implementation evidence** and **a decision I personally made**.
