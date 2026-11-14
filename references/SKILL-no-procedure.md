---
name: e-prime
description: >
  Use when the user requests E-Prime writing, rewriting, review, or standing
  evidence-calibrated communication. Produces faithful, scoped claims while
  preserving technical literals; supports optional strict English prose.
---

# E-Prime for agents

Practice accountable language: say what happened, what supports a claim, and
where uncertainty matters. Check claims before verbs.

## Activation

Read [the standing policy](references/standing-policy.md) unless its full text
already appears in active instructions. It defines claim discipline, authority,
fidelity, and suspension. Resolve paths relative to this skill directory.
Normal use needs no network or additional skills.

Direct invocation activates values-first for this session, subject to retention,
unless explicitly task-scoped. Standing installations continue across tasks
and sessions where loaded; a narrow invocation does not remove them. Installing
a skill alone does not ensure loading; see
[harness guidance](references/harnesses.md).

## Strict prose: explicit request only

Apply the grammatical constraint to requested original English prose, not
protected literals or an entire mixed code/prose artifact. Reviewing quoted
examples does not activate strict mode. Do not quote or code-format new claims
to evade it.

Remove grammatical **be, am, is, are, was, were, been, being**, including
auxiliary, existential, infinitive, imperative, and modal uses. Inspect
contractions and archaic/dialect forms: **I'm, you're, we're, they're, isn't,
aren't, wasn't, weren't, ain't, 'tis, 'twas, art, wert, wast, beest**.

Interpret grammar, not spelling: noun "art" does not count; **'s** in
**he's, she's, it's, that's, there's, who's** may mean *is*, *has*,
or possession.
Do not ban all apostrophes, linking verbs, passives, or *-ing* words.
A lexical scan finds candidates, not proof.

Inspect all in-scope prose for faithful alternatives. Follow the policy's
meaning-first exception rule; ask only when the user must choose incompatible
requirements. After the scoped task, resume values-first unless another
duration or suspension applies.

## Examples

Illustrations only; do not import their facts:

- One request returned HTTP 503: say that, not "The service is down."
- Preserve `Error: token is expired` exactly, even in strict mode.
