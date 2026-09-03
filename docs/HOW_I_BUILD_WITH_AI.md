# How I direct the AI-assisted Billable Meetings build

Billable Meetings is built with heavy use of AI agents/models. My role is not to claim authorship of every line of code; it is to direct the build toward a product, system boundary and quality bar I define.

## What I own

- researching the operational/commercial problem and deciding what product to pursue;
- defining the high-level blueprint and required decision behavior;
- creating specialist personas/experts and assigning them responsibilities;
- setting constraints, acceptance criteria and quality gates;
- demanding tests, evidence handling and repeated review;
- sending work back for revision when the result does not meet the required quality.

## What AI handles heavily

- implementation and code generation/revision;
- exploration of technical approaches;
- integration investigation;
- test scaffolding and edge-case generation;
- technical review and documentation.

I do **not** claim that I independently selected or hand-authored every library, rule-engine mechanism, data structure or code path.

## Working loop

```text
research billing problem
        ↓
define product + blueprint + quality bar
        ↓
assign specialist AI personas / agents
        ↓
AI-assisted implementation and iteration
        ↓
tests / evidence / quality gates
        ↓
accept, reject or send back for revision
```

The blueprint requires the system to keep booking, attendance and billability distinct and to preserve a review path when evidence is insufficient. The low-level mechanism used to satisfy those requirements may come from the AI-assisted implementation process unless I explicitly state otherwise.

## Interview boundary

I can explain the product problem, why the system exists, the blueprint I required, how I structured the AI workflow, the quality gates I demanded and what the current evidence supports.

For a low-level implementation choice, I will distinguish between **a requirement I set** and **a technical choice made inside the AI-assisted implementation process**.

For concrete implementation evidence, see [../PROOF.md](../PROOF.md).
