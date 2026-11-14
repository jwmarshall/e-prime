# E-Prime: research, limits, and agent adaptation

Research date: 2026-11-13. This synthesis distinguishes historical claims, authors' arguments, empirical evidence, and our proposed software-agent practices. Publication dates below refer to the works, not later website updates.

## 1. Attribution and chronology

**E-Prime does not originate with Alfred North Whitehead.** D. David Bourland Jr. formulated and advocated the named restriction within **Alfred Korzybski's general-semantics tradition**. Whitehead supplies a genuine philosophical connection, including a work Bourland cited, but not the grammatical method's authorship.

| Date | Source-supported event | Qualification |
| --- | --- | --- |
| 1922 | Whitehead's *The Principle of Relativity*, chapter II, criticizes allowing subject–predicate syntax to obscure relations. | Philosophical antecedent; not a proposal to remove every form of *to be*. [S1] |
| 1925 | Whitehead's *Science and the Modern World* names the “Fallacy of Misplaced Concreteness.” | A warning about mistaking abstractions for concrete reality, not a grammatical ban. [S2] |
| 1933 | Korzybski publishes *Science and Sanity*. | Bourland later quotes its distinction between identity uses and auxiliary uses of *be*. Do not attribute Bourland's blanket ban to Korzybski. [S3, S4] |
| 1949 | Bourland reports experimenting with complete avoidance after an unidentified correspondent suggested it to the Institute of General Semantics. | Retrospective account, not independently established sole invention. The experimental paper appeared in 1952. [S4, S5] |
| 1965 / 1965–1966 | “A Linguistic Note: Writing in E-Prime,” *General Semantics Bulletin* 32–33, pp. 111–114. | Commonly cited as 1965; the combined issue carries 1965–1966. Research used the complete 1991 reprint, pp. 59–66, and the institute's issue catalog. [S4] |
| 1989 | Bourland's “To Be or Not To Be: E-Prime as a Tool for Critical Thinking.” | Retrospective account, rationale, examples, and Whitehead citation. [S5] |
| 1990–1991 | Kellogg and Bourland publish “Working with E-Prime: Some Practical Notes.” | *ETC* 47(4), Winter 1990–91; copyright 1990. Includes important concessions. [S6] |
| 1992 | French and Kenyon publish critiques in *ETC* 49(2). | Arguments and counterexamples, not controlled experimental disproof. [S7, S8] |

The 1991 anthology, *To Be or Not*, also contains Bourland's 1968 follow-up, “The Semantics of a Non-Aristotelian Language.” Later anthologies appeared in 1994 and 1997; their dates should not replace the dates of reprinted essays.

## 2. What historical E-Prime requires

Bourland describes **E′ = E − e**: English minus the verb *to be* and its inflected forms. The restriction covers auxiliary and copular uses, not only assertions of identity. Thus “is running,” “was rejected,” “there is,” “might be,” and “has been checked” all violate strict authored-prose E-Prime. [S4–S6]

A careful language check must distinguish:

- **Forms and contractions:** *be, am, is, are, was, were, been, being*; contractions containing them; relevant archaic or dialect variants.
- **Ambiguous apostrophes:** *it's* can expand to *it is* or *it has*; possession does not contain *be*.
- **Other linking verbs:** *seem, become,* and *remain* do not violate the lexical rule, although their use can preserve the same unsupported judgment.
- **Passive constructions:** a get-passive can avoid *be*. E-Prime does not categorically eliminate passive voice.
- **Progressive aspect:** eliminating an auxiliary does not authorize changing an ongoing action into a habit.
- **Ordinary grammar:** E-Prime sentences still contain grammatical subjects and predicates. Bourland's philosophical criticism of “subject-predicate” formulations does not eliminate that grammatical structure.
- **Quotations:** Bourland's original essay excludes quotations when counting surviving forms of *be*. Protecting code, APIs, commands, diagnostics, schemas, and exact mathematical notation extends that principle to agents; those software-specific exemptions come from this adaptation. [S4]

The current default applies the E-Prime grammatical constraint to original English communication, with protected literals and meaning-first exceptions. It replaces the earlier values-first default and separate opt-in strict mode. An exception preserves meaning but does not support a claim of strict compliance.

## 3. Values worth transferring

### Descriptions do not exhaust their objects

Korzybski's map–territory distinction and “consciousness of abstracting” remind readers that a description selects aspects of experience. His 1949 “General Semantics” essay supplies a primary account. [S3]

**Agent adaptation:** a test result, static-analysis warning, type declaration, benchmark, or model response supplies a representation with a scope. State what it supports without treating it as the entire system. A single passing test establishes that observed result, not the absence of all defects.

This does not require expanding every sentence into an exhaustive disclaimer. State decision-relevant limits, not every logically possible limitation.

### Judgments require accountable speakers and criteria

Bourland's original essay discusses abbreviated judgments and the “Return of the Role-Players”: formulations can hide the observer, evaluator, or actor. Kenyon condenses his preferred discipline to “say who says so.” [S4, S8]

**Agent adaptation:** distinguish a user report from a tool observation; a hypothesis from a verified mechanism; a preference from a requirement. Support consequential evaluations with criteria. Do not transform “The implementation is unsafe” into “The unsafe implementation…” and pretend that removing the verb supplied justification.

Attribution should not become ritual first-person phrasing. “The compiler reported…” often identifies the source more accurately than “I feel…” or “I think…”.

### Context, time, and individual differences matter

Bourland connects the constraint with general-semantics devices such as dates and indexes, which remind readers of change, difference, and incomplete descriptions. [S4]

**Agent adaptation:** supply the version, input, time, environment, or path when it changes the conclusion and the evidence actually supplies it. Do not invent measurements or conditions to make a sentence sound concrete. Avoid timeless character labels when specific conduct provides the relevant evidence.

### Questions should support investigation

Bourland's “vanishing questions” argument favors reformulating broad essence questions into more tractable inquiries. [S4, S5]

**Agent adaptation:** turn “Is this architecture good?” into criteria concerning expected load, change frequency, failure handling, and operational constraints. Do not evade the user's substantive question or claim that every question using *is* lacks meaning.

## 4. Whitehead: a real connection with clear limits

Bourland's 1989 bibliography explicitly cites Whitehead's **1922 *The Principle of Relativity with Applications to Physical Science***. In chapter II, “The Relatedness of Nature,” pp. 13–14, Whitehead criticizes treating fundamental facts as subjects qualified by predicates while overlooking relations. He calls the assumption “a trap set for philosophers by the syntax of language.” [S1, S5]

This establishes a cited philosophical antecedent. It does **not** establish that Whitehead invented E-Prime, advocated its total prohibition, or demonstrated benefits from it. His own discussion uses forms of *be*.

In **1925**, Whitehead names the error of mistaking the abstract for the concrete. The surrounding argument concerns scientific abstractions, particularly “simple location,” rather than English usage as such. Chapters III–IV, especially pp. 72 and 82–83, also acknowledge abstraction's productive role: well-founded abstractions support important truths, while exclusive attention to them can omit relevant experience. [S2]

**Our synthesis:** do not mistake a green test indicator for whole-system correctness, a “safe” label for a demonstrated threat model, or a benchmark aggregate for every workload. Retain useful abstractions and explain their boundaries when consequential. This analogy applies Whitehead's warning to agent work; it does not claim historical authors anticipated coding agents or empirically validated the analogy.

## 5. Criticism and failure modes

### The grammatical rule does not guarantee the epistemic result

Bourland's original essay explicitly states that E-Prime alone does not preclude identification or other undesirable linguistic reactions. The practical essay also acknowledges that hidden assumptions, dishonesty, and bigotry can survive. [S4, S6]

An agent can write **“This patch eliminates every possible vulnerability”** without any form of *be*. The sentence can still exceed the evidence. Conversely, **“The checksum is invalid according to the verifier”** can state a well-attributed observation despite using *is*.

Therefore the skill checks **claim quality** and **grammatical compliance** independently.

### French: legitimate language and concealed assumptions

James D. French's “The Top Ten Arguments Against E-Prime” challenges the correspondence between the syntactic restriction and its claimed benefits. His arguments include: [S7]

- Context can already limit an identity or occupational statement; it need not imply an eternal, exhaustive essence.
- Auxiliary, location, negation, mathematical, and relational uses can perform legitimate work.
- Reducing expressive choices does not inherently improve prose.
- Psychological identification does not simply equal a grammatical construction.
- A rewrite can conceal a judgment in an adjective or presupposition rather than justify it.
- Higher abstraction can help reasoning; moving from individual trees to a forest need not constitute error.
- Claims that a complete ban outperforms selective discrimination need evidence.

These arguments justify caution; they do not experimentally establish that every E-Prime exercise fails.

### Kenyon: letter versus spirit

Kenyon argues that writers can obey the ban while retaining dogmatism, or use forms of *be* while avoiding it. He criticizes empty substitutes such as “exists as” and “qualifies as,” and favors responsibility for judgments. [S8]

**Agent consequence:** no blanket substitution dictionary. Ask what the sentence claims and what warrants it. “Seems” cannot replace evidence, and “constitutes” cannot turn an unsupported classification into a justified one.

### Meaning can drift during apparently helpful revision

The practical essay acknowledges that recasting can change meaning, that some uses of *be* cause little semantic harm, and that progressive aspect can create difficulties. Its authors reject universal substitution with “seems” or “appears” and allow beginners occasional ordinary constructions when alternatives sound excessively awkward. [S6]

High-risk distinctions for agents:

| Original distinction | Risky rewrite | Safeguard |
| --- | --- | --- |
| State versus transition | “The connection is open” → “The connection opens” | Preserve current state rather than inventing an event. |
| Current activity versus habit | “The worker is running” → “The worker runs” | Preserve temporal/aspectual meaning. |
| Unknown actor | “The file is missing” → “The user deleted the file” | Do not invent an actor or deletion. |
| Absence of evidence | “No evidence was found” → “Evidence proves it never happened” | Preserve the direction and strength of the inference. |
| Obligation | “The key must be rotated” → “Consider rotating the key” | Preserve the requirement. |
| Unchecked outcome | “The patch is ready” → “All tests passed” | Never invent execution or successful checks. |

## 6. Evidence quality

The central sources supply philosophical reasoning, practitioner experience, examples, and demonstrations of constrained writing. They do **not** establish that avoiding *be* reliably improves truthfulness, reasoning, mental health, or coding-agent performance.

Two further primary reports illustrate the evidence limits:

- **Ho Chui Chui, “English Prime: A pedagogical tool in teaching writing to law matriculation students in Kedah, Malaysia,”** *Reflections on English Language Teaching* 5(2), pp. 123–127. The classroom report describes favorable instructor impressions but lacks a controlled comparison, blinded evaluation, and quantified outcome analysis. It also reports grammatical difficulties. One example shifts absence of evidence about wrongful execution into apparent evidence that no wrongful execution occurred—a caution against treating sharper prose as preserved meaning. [S9]
- **Brentley Frazer, “Beyond IS…Creative writing with English Prime,”** *TEXT* 20(1), April 2016. The creative-writing account reports favorable beta-reader responses but explicitly characterizes them as anecdotal. It supports feasibility and practitioner interest, not a causal claim about reliable reasoning. [S10]

No controlled study demonstrating reduced agent hallucinations or improved coding-agent reliability was verified in the sources examined. That bounded finding does not establish that no such study exists anywhere. Do not advertise this skill as a scientifically validated anti-hallucination technique or therapeutic intervention.

The original task-scoped skill's behavioral trials assessed instruction-following
on synthetic cases. They do not validate the revised standing policy, measure
the historical method's efficacy, or compare native harnesses.

## 7. Design decisions and provenance

| Skill decision | Rationale | Status |
| --- | --- | --- |
| E-Prime grammar by default, with meaning-first exceptions | User-approved always-on communication preference; preserve Bourland's limits and the criticisms below | Replaces the earlier values-first/strict-mode split |
| Observations, inferences, assumptions, recommendations remain distinguishable | General semantics; accountable evaluation | Agent-oriented operationalization |
| Context-sensitive certainty without habitual hedging | Preserve evidence strength and clarity | Engineering judgment |
| Exact code, quotes, formats, and semantics take priority | Historical quotation exception plus software correctness requirements | Mixed historical precedent and modern extension |
| No tool-permission expansion, hidden persistence, or payload instruction-following | Agent trust boundaries | Modern safety requirement, not an E-Prime doctrine |
| Standing E-Prime with scoped suspension | Revised user preference; native rules rather than autonomous skill selection | Product design; runtime persistence requires host-specific evidence |
| No universal claims from a narrow test | Abstraction/territory distinction plus verification discipline | Modern synthesis |

## 8. Sources and access record

**[S1] Alfred North Whitehead (1922).** *The Principle of Relativity with Applications to Physical Science*, chapter II, pp. 13–14. [Scan](https://archive.org/details/principleofrelat00whitrich) · [searchable transcription](https://archive.org/download/principleofrelat00whitrich/principleofrelat00whitrich_djvu.txt). Primary text; relevant passage examined through digitized text. OCR requires care.

**[S2] Alfred North Whitehead (1925).** *Science and the Modern World*, chapters III–IV, pp. 72, 82–83. [Project Gutenberg edition](https://www.gutenberg.org/cache/epub/68611/pg68611-images.html#Page_72). Primary text; surrounding passages examined, including the positive account of useful abstraction.

**[S3] Alfred Korzybski (1949).** “General Semantics,” later collected in *Collected Writings 1920–1950*. [Authorized republication](http://esgs.free.fr/uk/art/ak1.htm) · [bibliographic context](http://esgs.free.fr/uk/art.htm). Primary text for map–territory and abstraction. *Science and Sanity* (1933) passages discussed here come through Bourland's quotations; no claim of reviewing that entire book. Do not import dated psychological or neurological assertions as modern evidence.

**[S4] D. David Bourland Jr. (1965; issue 1965/1966).** “A Linguistic Note: Writing in E-Prime,” *General Semantics Bulletin* 32–33, pp. 111–114. [Institute issue catalog](https://shop.generalsemantics.org/products/pdf-version-general-semantics-bulletin-nos-32-33-1965-1966) · [1991 anthology scan](https://archive.org/details/to_be_or_not) · [anthology transcription](https://archive.org/download/to_be_or_not/to_be_or_not_djvu.txt). Complete essay examined in *To Be or Not: An E-Prime Anthology* (Bourland and Paul Dennithorne Johnston, editors), pp. 59–66. Original issue metadata verified; the purchased original issue was not inspected. Reprint p. 64 contains the disclaimer about identification.

**[S5] D. David Bourland Jr. (1989).** “To Be or Not To Be: E-Prime as a Tool for Critical Thinking,” *ETC* 46(3), pp. 203–211. [Authored-text republication](http://esgs.free.fr/uk/art/epr1.htm) · [institute PDF](https://generalsemantics.org/resources/documents/46-3-bourland.pdf). Primary account of origins, definition, rationale, and Whitehead citation. The HTML page's later update date does not date the original essay.

**[S6] E. W. Kellogg III and D. David Bourland Jr. (1990).** “Working with E-Prime: Some Practical Notes,” *ETC* 47(4), Winter 1990–91, pp. 376–392. [Institute PDF](https://generalsemantics.org/resources/documents/47-4-kellogg-bourland.pdf). Original opening pages and relevant full sections of the 1991 anthology reprint, pp. 37–56, examined. Concessions and examples support a balanced reading; advocacy does not itself demonstrate efficacy.

**[S7] James D. French (1992).** “The Top Ten Arguments Against E-Prime,” *ETC* 49(2), pp. 175–179. [Institute PDF](https://generalsemantics.org/resources/documents/49-2-french.pdf). Complete five-page scan examined. Argumentative criticism, not an experimental trial. Institute PDF redirects may need browser access.

**[S8] Ralph E. Kenyon Jr. (1992).** “E-Prime: The Spirit and the Letter,” *ETC* 49(2), pp. 185–188. [Author-hosted text](https://www.xenodochy.org/gs/e-prime.html). Written March 31, 1992; reprinted with corrections in the 1994 anthology. Website update dates do not replace publication history.

**[S9] Ho Chui Chui.** “English Prime: A pedagogical tool in teaching writing to law matriculation students in Kedah, Malaysia,” *Reflections on English Language Teaching* 5(2), pp. 123–127. [University-hosted PDF](https://www.nus.edu.sg/celc/wp-content/uploads/2022/11/123-127ho.pdf). Classroom report; the upload path does not establish the article's original publication year.

**[S10] Brentley Frazer (2016).** “Beyond IS…Creative writing with English Prime,” *TEXT* 20(1). [Journal PDF](https://textjournal.scholasticahq.com/api/v1/articles/25313-beyond-is-creative-writing-with-english-prime.pdf). Primary practice-based account; anecdotal reader responses.

Secondary overviews helped locate sources but do not ground the central historical or efficacy claims. No broad philosophical system, psychological treatment, or theory of mathematical identity becomes a requirement of the skill.

## 9. Ponytail and Caveman: useful adaptations

The user requested an always-on style comparable to these projects and approved
a compact standing policy plus native installation guidance. A later revision
made E-Prime grammar the default, replacing the values-first/strict-mode split
while retaining authority and fidelity boundaries. Direct skill invocation
requests session scope unless narrowed; native standing installation supplies
the complete policy across sessions where loaded.

### Sources and inspection boundary

Reviewed the canonical repositories, not similarly named forks:

- [DietrichGebert/ponytail][ponytail], especially its
  [skill][ponytail-skill], [installation guide][ponytail-install],
  [Claude/Codex hook manifest][ponytail-hooks], shared instruction builder,
  and [Pi/omp extension][ponytail-pi].
- [JuliusBrussee/caveman][caveman], especially its
  [voice skill][caveman-skill], [Claude plugin manifest][caveman-plugin],
  and relevant [activation-hook code][caveman-hook].

These links track moving upstream branches, not pinned release contracts.
The review inspected source and documentation; it executed no upstream
installer, hook, proxy, extension, or benchmark. Repository popularity does
not establish effectiveness. No upstream code was copied into this package.

### Preserve the invariants, not the persona

Ponytail prioritizes the smallest complete solution and explicitly protects
correctness. For E-Prime, adapt this to the shortest faithful claim: preserve
qualifications, agency, causal strength, and meaning before optimizing wording.
Do not import architectural preferences or a "lazy senior" persona.

Caveman prioritizes payload preservation, negation, clarity, and exceptions
when compression would confuse. Its "never perform caveman" rule discourages
theatrical prefixes and duplicate answers. Apply that lesson to E-Prime:
no mode banners, ritual hedging, mandatory compliance footers, or conspicuous
substitutes such as "exists as." Use ordinary language when clearer.

Do not copy Caveman's blanket rejection of hedging: warranted uncertainty
belongs in accountable claims. Do not copy Ponytail's required closing risk
lines: include consequential limits when relevant, not as repeated ceremony.
Neither shortest output nor absence of *be* measures epistemic quality.

Caveman exempts persisted artifacts from its compressed voice. E-Prime instead
applies claim discipline to newly authored, authorized prose, including docs.
Existing unrelated text, code semantics, and exact strings remain protected.
Standing policy does not authorize a style-cleanup pass across a repository.

### Persistence requires delivery and state

Both projects separate their behavioral rules from executable host adapters.
Ponytail's manifest registers startup, subagent, and prompt-submit hooks; its
Pi extension injects instructions before agent execution and restores mode
from session entries. It also removes stale structured prompt content when off.

Caveman's activation code separately injects subagent context and handles
continuation versus new-session mode selection. Its comments and state paths
address a real design risk: treating "off" as missing state can reactivate a
style after compaction. A status request must not itself activate the skill.
These observations describe implementation intent and inspected code, not
verified behavior in this environment.

For E-Prime, native standing rules avoid executable lifecycle machinery.
Conversational suspension remains a model instruction, not durable storage.
The guide names this limitation rather than promising universal mode toggles.
Subagent propagation, concurrent sessions, forks, compaction, and cloud
deployments need separate native checks before claiming support.

Keep one canonical policy and explicit host delivery instructions. Do not
assume a Markdown link forces inclusion. Host-native imports can reduce drift
where documented; manual copies need explicit update/removal instructions.
Avoid injecting both a full skill and duplicate policy through multiple loaders.

### Excluded product scope and evaluation

The current upstream projects include machinery beyond their original style
prompts. E-Prime does not adopt telemetry, proxying, model routing, cost displays,
or automatic configuration mutation. Those features add permissions and
maintenance without serving this communication policy.

Do not transfer upstream token-saving or quality claims to E-Prime. A useful
future comparison would test no added policy, a simple "be clear and precise"
instruction, and this standing policy on the same tasks. Evaluate faithful
meaning, calibrated claims, exact payload preservation, readability, and
context cost separately. No such comparative experiment ran in this revision.

[ponytail]: https://github.com/DietrichGebert/ponytail
[ponytail-skill]: https://github.com/DietrichGebert/ponytail/blob/main/skills/ponytail/SKILL.md
[ponytail-install]: https://github.com/DietrichGebert/ponytail/blob/main/INSTALL.md
[ponytail-hooks]: https://github.com/DietrichGebert/ponytail/blob/main/hooks/claude-codex-hooks.json
[ponytail-pi]: https://github.com/DietrichGebert/ponytail/blob/main/pi-extension/index.js
[caveman]: https://github.com/JuliusBrussee/caveman
[caveman-skill]: https://github.com/JuliusBrussee/caveman/blob/main/skills/caveman/SKILL.md
[caveman-plugin]: https://github.com/JuliusBrussee/caveman/blob/main/.claude-plugin/plugin.json
[caveman-hook]: https://github.com/JuliusBrussee/caveman/blob/main/src/hooks/caveman-activate.js
