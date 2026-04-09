import { contextComboLabel, type SituationalContextKey } from '../../../Quiz/ChangeResults/contextComboLabels'

/** Canonical singles and doubles (triple fixed). Order matches combination logic used in quiz tables. */
export const CANONICAL_HHG_KEYS = [
  'Head',
  'Heart',
  'Gut',
  'Head+Gut',
  'Head+Heart',
  'Heart+Gut',
  'Head+Heart+Gut',
] as const

export type CanonicalHhgKey = (typeof CANONICAL_HHG_KEYS)[number]

const CENTRE_ORDER = ['Head', 'Heart', 'Gut'] as const

function sortCentres (parts: string[]): string[] {
  return [...parts].sort(
    (a, b) => CENTRE_ORDER.indexOf(a as (typeof CENTRE_ORDER)[number]) - CENTRE_ORDER.indexOf(b as (typeof CENTRE_ORDER)[number])
  )
}

/**
 * Maps any `getBrainCombinationKey` output to a canonical key so pairs line up with our table.
 */
export function normalizeHhgKey (key: string): CanonicalHhgKey {
  if (key === 'Head+Heart+Gut') return 'Head+Heart+Gut'
  const parts = key.split('+').filter(Boolean)
  if (parts.length === 1) {
    const p = parts[0] ?? 'Head'
    if (p === 'Head' || p === 'Heart' || p === 'Gut') return p
    return 'Head'
  }
  if (parts.length === 2) {
    const [x, y] = sortCentres(parts)
    const s = `${x}+${y}`
    if (s === 'Head+Gut' || s === 'Head+Heart' || s === 'Heart+Gut') return s
  }
  if (parts.length === 3) return 'Head+Heart+Gut'
  return 'Head'
}

/**
 * Sorted centre-set key for a `getBrainCombination().label` (e.g. `Head + Heart` and `Heart + Head` → `Head+Heart`).
 */
export function centreSetFromComboLabel (label: string): string {
  if (label === 'Head + Heart + Gut') return 'Head+Heart+Gut'
  if (label.endsWith(' Strong')) {
    const centre = label.replace(' Strong', '')
    if (centre === 'Head' || centre === 'Heart' || centre === 'Gut') return centre
  }
  const parts = label.split(' + ').map((p) => p.trim()).filter(Boolean)
  if (parts.length === 2) {
    return sortCentres(parts).join('+')
  }
  return 'Head'
}

function isDoubleCentreSet (set: string): boolean {
  return set === 'Head+Gut' || set === 'Head+Heart' || set === 'Heart+Gut'
}

function pairLookupKey (keyA: string, keyB: string): string {
  const a = normalizeHhgKey(keyA)
  const b = normalizeHhgKey(keyB)
  const ia = CANONICAL_HHG_KEYS.indexOf(a)
  const ib = CANONICAL_HHG_KEYS.indexOf(b)
  const i = Math.min(ia, ib)
  const j = Math.max(ia, ib)
  return `${CANONICAL_HHG_KEYS[i]}|${CANONICAL_HHG_KEYS[j]}`
}

function fillPlaceholders (template: string, la: string, lb: string): string {
  return template.replace(/\{a\}/g, la).replace(/\{b\}/g, lb)
}

/**
 * Pair insight copy mixes **what this tends to look like** (recognition) with **what often helps** (optional moves).
 * It is not meant to read as a checklist of orders: lead sentences describe the dynamic; later lines stay suggestive.
 */

/**
 * When both people share the exact same combination (Twin Copy).
 */
const SAME_EXACT_COMBO: Record<string, Record<SituationalContextKey, string>> = {
  'Head Strong': {
    underPressure:
      'You both bring a massive amount of mental clarity and objectivity to a crisis. Under pressure, you both move into {a}, reaching for logic or distance to keep things steady. Because you speak the same language, you can stabilize each other quickly; just keep an eye on whether you are both retreating into analysis while the room is actually waiting for a human signal.',
    doingWork:
      'When making choices together, you are a powerhouse of logic and evidence as {a}. You both value being right the first time, which makes your shared decisions very solid. The only trap is over-thinking or moving slowly when things are unclear. Naming a "good enough for now" limit helps ensure your shared love for detail does not stop you from moving forward.',
    withPeople:
      'With people, you both read as {a}, which creates a bond that is exceptionally steady and calm. Between you, there is a deep respect for space and sense-making. If things feel a bit cool or distant, it usually just means you have both defaulted to your "thinking" mode. A simple, warm gesture from either of you is often all it takes to break the spell.',
    gettingBetter:
      'When learning together, you are both naturally gifted at diagnosis and frameworks as {a}. Growth stays rewarding when you push beyond the mental map. Try adding short time limits to your analysis and ending every session with one small, messy experiment to test your theories in the real world.',
  },
  'Heart Strong': {
    underPressure:
      'You have an incredible shared capacity to sense the mood and look after people when things get loud. As {a}, you both attune to the room deeply. The gift is your combined emotional intelligence. The risk is that you both feel the weight so much that no one is left to steer the ship. Agreeing on one clear "next step" helps you move through the feeling into action.',
    doingWork:
      'In your shared decisions, you double the {a} energy of care and meaning. You make sure your choices matter and that everyone involved feels seen. To keep things moving, it helps to pair that warmth with a clear list of what comes first. Having one person focus on the final call for the day allows the other to stay in the flow without the pair losing sight of the goal.',
    withPeople:
      'Together you radiate a warmth and resonance as {a} that makes people feel truly understood. The connection between you is often very intuitive. If you find yourselves avoiding the "hard truth" to keep the peace, remember that a firm boundary is sometimes the kindest thing you can offer the relationship.',
    gettingBetter:
      'In learning, you both lead with {a}, so reflection and empathy come easily. To stay grounded, try adding one measurable outcome to your emotional insights. Trading long debriefs for one shared commitment helps you turn your deep understanding into a habit that people can see.',
  },
  'Gut Strong': {
    underPressure:
      'You are a high-momentum pair with a shared gift for clearing the fog. As {a}, you both have a low tolerance for being stuck. You can move a team forward faster than anyone else, but you might also amplify each other\'s impatience. Taking one collective breath to check for second-order effects ensures your speed stays a strategy rather than just a reflex.',
    doingWork:
      'When it is time to act, you bring a double dose of {a} energy: a drive to decide and a "test it now" mindset. This makes you incredibly productive. To avoid having to change course later, try adding one quick check on how your move affects others before you lock it in. It ensures your fast pace does not accidentally leave people behind.',
    withPeople:
      'Socially, you both bring the candid, direct energy of {a}. The vibe between you is honest and forward-leaning. Because you both move with such intensity, a small phrase like "I\'m just focused on the problem" can go a long way. It reminds you both that the heat is about the task, not the bond.',
    gettingBetter:
      'Learning for you both is about doing, which means you gain skills very quickly as {a}. To make sure the lessons stick, try inserting micro-pauses after a project to capture what you actually learned. It prevents the next big sprint from erasing the nuance of the last one.',
  },
  'Head + Heart': {
    underPressure:
      'You are a pair that others look to for thoughtful, humane stability. Under pressure, you both show up as {a}, weighing the logic and the people with equal care. This is a rare strength. You just have to watch for the "perfect move" trap. Setting a time limit on your deliberations ensures your kindness results in a timely decision.',
    doingWork:
      'In your shared choices, you are both considerate and smart, always looking for a way for everyone to win. To keep this balance working, be clear about who decides when a choice is final and who shapes how to explain it to others. This prevents things from drifting and ensures your shared empathy supports progress instead of slowing it down.',
    withPeople:
      'With people, you both read as {a}, creating a bond that is deeply trustworthy and nuanced. You have a way of being smart without being cold. If you feel like you are circling the same awkward topic, it\'s usually because you are both being too polite. Naming the "hard thing" directly is the fastest way to get your shared warmth back on track.',
    gettingBetter:
      'Learning together, you both enjoy deep reflection and sense-making as {a}. To keep your growth moving, try to cap the analysis phase and commit to one observable behavior each week. It turns your rich insights into practical habits that you can celebrate together.',
  },
  'Heart + Head': {
    underPressure:
      'You bring a wonderful composure and a focus on people when things get heated. As {a}, you have the ability to calm a hot room just by being in it. The only risk is extending a deadline too many times out of care for others. Adding a "decide by" moment helps you protect the team without losing your shared sense of humanity.',
    doingWork:
      'When deciding how to move forward, you organize around people and results with great skill as {a}. You are naturally helpful and orderly. To avoid just spinning your wheels to be nice, try to name who is owning the finality of the plan versus who is checking on what the group can handle. This keeps your shared care focused on real progress.',
    withPeople:
      'In social settings, you land as {a}: polished, humane, and steady. You are very good at smoothing out the edges of a conversation. If you find yourselves wondering what was actually decided, it\'s probably because you were both being very gentle. A single line of intent before a big talk helps keep your clarity as high as your kindness.',
    gettingBetter:
      'As a learning pair, you both lead with guidance and structure as {a}. Your feedback is naturally supportive. To add a bit of growth-edge, try capping the reassurance part of your talks and picking one "stretch goal" each. Revisiting those goals together keeps your progress as visible as your support.',
  },
  'Head + Gut': {
    underPressure:
      'You are an exceptionally decisive and clever pair. Under fire, you both blend {a}, using your thinking and your thrust to find the quickest exit from a problem. You can outrun almost any stuck team. To avoid colliding on who has the final word, just agree on a single lead for the crisis so your shared power stays focused on the goal.',
    doingWork:
      'Making decisions as a pair means you shorten the gap between a good idea and a finished result. You are both built for speed as {a}. To keep your efforts aligned, try using a shared list of what is "settled" versus what is still "up for debate." This stops you from going in different directions and ensures your combined speed remains your greatest asset.',
    withPeople:
      'With others, you both land as {a}: competent, intense, and fast-moving. You don\'t wait around, which is a strength people admire. If the energy feels a bit sharp, it\'s usually just your shared focus on delivery. A quick "this is about the work" helps keep the personal bond feeling as secure as the professional one.',
    gettingBetter:
      'When growing together, you both iterate hard and build skills at high speed as {a}. To make sure you aren\'t just getting faster, try to capture one "human impact" lesson for every "technical" lesson. It ensures your growth is as well-rounded as it is rapid.',
  },
  'Gut + Head': {
    underPressure:
      'You bring a high degree of decisive control to high-pressure moments. As {a}, you cut through noise with ease while keeping your thinking online. You are a natural "strike team." Just be sure to pre-agree on who owns the last word during a sprint, so your shared drive for the best result doesn\'t lead to a deadlock between two strong minds.',
    doingWork:
      'When you decide to act, you have a rare combination of pace and order as {a}. You move fast, but you keep a strong backbone in your choices. To keep this working, use clear hand-offs so you do not accidentally step on each other\'s toes. If you disagree on when to stop, a quick time-box for one final review usually gives you both the quality and the closure you need.',
    withPeople:
      'With people, you both land as {a}: commanding, clear, and direct. You provide great direction for those around you. The only thing to watch for is others feeling "overruled" by your combined certainty. A small pause after you make a point gives others the room to join in, which actually makes your clarity more effective.',
    gettingBetter:
      'Learning for you happens best in motion as {a}. You suit "reps and shipping" perfectly. To ensure your speed doesn\'t erase the nuance, try rotating who writes down the lessons after a project. Adding one "process" note to every "outcome" note ensures you are getting better at how you work, not just what you do.',
  },
  'Heart + Gut': {
    underPressure:
      'You are a passionate and highly mobilized pair. Under pressure, you both run {a}, combining deep feeling with forward motion. You can rally a team faster than anyone. Because you both spike quickly when values are poked, it helps to have a "repair move" ready. Knowing how to come back together after a heated moment keeps your shared energy a force for good.',
    doingWork:
      'When it is time to choose a path, you are all about conviction as {a}. You fight for people and for progress with everything you have. To stay effective, try adding a "cooling step" before you make big promises that affect others. It ensures your shared passion feels like a helpful contribution rather than a disruption for those who move at a different pace.',
    withPeople:
      'With people, you both bring a loyal and vivid energy as {a}. Your bond is likely very alive and fiercely defended. If things get sharp, remember that repair matters more than being right. Naming what happened without losing your loyalty to each other is what keeps your high-color connection healthy.',
    gettingBetter:
      'For growth, you both learn through action as {a}. Your lessons often arrive right in the middle of the work. To capture them, try debriefing the "impact" as much as the "outcome" after a big push. Ending with one thing to adjust and one thing to celebrate keeps your growth as balanced as your drive.',
  },
  'Gut + Heart': {
    underPressure:
      'You both bring a tremendous amount of drive and heart to everything you do. When things spike, you both move into {a}, ready to mobilize and protect what matters. You are a powerful duo in a crisis. Just naming your "trigger words" beforehand can help you stay in sync so your shared intensity stays focused on the problem, not each other.',
    doingWork:
      'In your shared actions, you are a pair known for conviction and care as {a}. You bring visible energy into every choice. To keep things turning smoothly, try to think of the people who are not in the room when you are making fast calls. It helps ensure your shared momentum does not accidentally create a cost for someone else later on.',
    withPeople:
      'With others, you both show up as {a}: expressive, charismatic, and big-hearted. You have a way of lifting each other up. If one of you goes quiet, it might just be that the "volume" of the moment got a bit high. Noticing those shifts early keeps your shared energy feeling like a shared win.',
    gettingBetter:
      'You both grow through bold experiments and high-conviction action as {a}. This builds sharp edges and great skills. After a cycle, asking "who might have felt rushed by us?" is a great way to ensure your growth includes your impact on others. It keeps your spine strong and your heart open.',
  },
  'Head + Heart + Gut': {
    underPressure:
      'You are both highly integrated and bring every part of yourselves to a challenge. As {a}, you have all your "brains" online when the stakes are high. This can sometimes lead to a bit of overload since you see so much. Handing off specific "channels", like one of you watching the logic while the other watches the people, can help you manage the complexity together.',
    doingWork:
      'When making big decisions, you can see every angle as {a}, which is a massive help for complex situations. To avoid getting stuck trying to cover everything at once, try to pick your top three goals. Settling the first one before worrying about the rest ensures that your shared desire to be thorough does not block your progress.',
    withPeople:
      'With people, you are both deeply attuned to the subtext and the "full map" of a relationship as {a}. You see the undertones that others miss. To keep the bond feeling light, try to use plain language and clear asks. It prevents your shared depth from making the relationship feel like a puzzle that needs to be solved.',
    gettingBetter:
      'When growing together, you both have a tendency to "over-learn" because every angle feels vital as {a}. To keep your growth sustainable, try picking just one dimension to focus on each month. Celebrating the small wins aloud helps ensure your shared ambition feels like a gift rather than a burden.',
  },
}

/**
 * Same two centres, different combo order (Head + Heart vs Heart + Head, etc.).
 */
const SAME_BLEND_DIFFERENT_ORDER: Record<string, Record<SituationalContextKey, string>> = {
  'Head+Heart': {
    underPressure:
      'You are both wired to be helpful and thoughtful, which is a great asset when things get messy. Because your badges are ordered differently, one of you leads as {a} and the other as {b}. Under pressure, one provides the logic while the other senses the mood. You can be a great anchor for each other because you speak the same language, though the clash is often just about which signal, the thought or the feeling, lands first.',
    doingWork:
      'You have the combined ability to cover the whole map, from clear criteria to human impact. In your work, one of you aligns with {a} and the other with {b}. To keep this balance working for you, name who is watching the timeline and who is watching the team energy. That way, your shared care for the work ensures you are supporting each other rather than doing the same invisible job twice.',
    withPeople:
      'You have a natural gift for being both fair and warm in your relationships. With others, one of you reads as {a} and the other as {b}. The strength here is your ability to see the boundaries and the connection at once. If you feel like you are talking past each other, it is usually just your different styles of fairness at play. Being plain about what you see helps keep you both on the same page.',
    gettingBetter:
      'You offer each other the best of both worlds: a sharp read and a steady heart. When you grow together, one of you reaches for {a} and the other for {b}. Before you swap feedback, decide if you want the analytical insight or the relational check-in first. Ending with one clear step and one word on how it feels ensures that both your plans and your people are well looked after.',
  },
  'Head+Gut': {
    underPressure:
      'You are a powerful pair because you both want to manage risk and keep things moving. You use Head and Gut to navigate, but the order means one of you shows as {a} and the other as {b}. One of you thinks to find the path while the other moves to test the ground. Any tension you feel is usually just a sign of your shared drive to get things right, only at different speeds.',
    doingWork:
      'You are both high-capability drivers who value getting results. At work, one of you maps to {a} and the other to {b} depending on whether instinct or intellect takes the lead. To keep that energy aligned, agree on what "good enough" looks like for the task at hand. By splitting the need to be sure from the need to be fast, you can use your precision and your momentum as a single force.',
    withPeople:
      'Together you carry a natural confidence that people rely on for direction. With others, one of you leans toward {a} and the other toward {b}. The magic happens when you use that collective strength to create space for others too. Adding a brief pause after a firm decision allows your combined sureness to feel like a welcoming invitation rather than a final word.',
    gettingBetter:
      'You are built for progress and have a real talent for spotting what needs to change. Side by side, one of you learns through {a} and the other through {b}. To make the most of this, rotate who captures the takeaways so you see the patterns from both angles. Asking what you would keep and what you would adjust helps you respect each other’s timing and ensures you move at a pace that lasts.',
  },
  'Heart+Gut': {
    underPressure:
      'You are both deeply invested in your work, which makes you a very sincere and dedicated team. Under pressure, one of you leads with care as {a} while the other leads with action as {b}. You are almost always standing up for the very same values. The friction you might feel is simply a byproduct of how much you both want to make a real impact, just using different first moves.',
    doingWork:
      'You are a high-stakes duo because you both care enough to be bold. On tasks, one of you shows as {a} and the other as {b}. If you find yourselves at odds, try naming the principle you are defending before you talk about the plan. Once you see you are on the same side, it becomes much easier to decide whether the moment needs a gentle touch or a firm push.',
    withPeople:
      'You bring a vibrant, loyal energy to any group that is hard to ignore. With people, one of you reads as {a} and the other as {b}. Because you both care so much, making time for a quick check-in after a busy stretch keeps your bond strong. It ensures that your shared heat stays focused on the goal and that everyone feels heard in the rush of the moment.',
    gettingBetter:
      'You have the rare ability to move outcomes and look after people at the same time. For growth, one of you leans toward {a} and the other toward {b}. In your debriefs, celebrate both the results you achieved and how you handled the human side of things. Closing with a simple check on how you moved together keeps your shared momentum healthy and sustainable.',
  },
}

/**
 * Every unordered pair of distinct brain combinations across four situations.
 */
const PAIR_CONTEXT_INSIGHTS: Record<string, Record<SituationalContextKey, string>> = {
  'Head|Heart': {
    underPressure:
      'You are both deeply committed to creating safety when things get loud, which makes you a very grounding pair. Under pressure, one of you leads with {a} to find clarity while the other leads with {b} to find connection. Any tension is usually just a choice between wanting facts now or wanting feelings first. Because you both want the same security, you can bridge that gap by simply acknowledging the different doors you use to get there.',
    doingWork:
      'You have a massive shared asset for making choices together: the ability to cover both the logic and the morale of a situation. One of you provides the structure of {a} while the other looks after the meaning of {b}. To keep this balance healthy, decide early who is making the final call and who is checking on how everyone is doing. Swapping these roles occasionally ensures you both stay fresh and prevents anyone from always having to be the one delivering hard news.',
    withPeople:
      'You bring a beautiful combination of precision and care to your relationships. Between you, {a} and {b} create a bond that is both smart and warm. The only snag is when logic is read as coldness or care is read as vagueness. Seeing this as a pattern of two different ways of trying to feel safe is usually enough. Agreeing on one shared approach before a sensitive talk helps your two styles land as a single, supportive voice.',
    gettingBetter:
      'Together you offer the best of both worlds: frameworks for growth and the emotional safety to pursue them. One of you reaches for {a} and the other for {b}. You can maximize this by trading short, structured debriefs for a few minutes of naming the human impact of the work. Ending with one concrete step ensures that your shared reflection always turns into real-world movement.',
  },
  'Head|Gut': {
    underPressure:
      'You are a high-capability pair that wants to end the strain of a crisis as quickly as possible. Under pressure, {a} looks for a defensible path while {b} looks for tangible motion. It is a powerful mix of thinking and doing. While it can look like hesitation meeting haste, it is really just two different ways of managing risk. Naming this out loud helps you find a middle speed that respects both your need for a plan and your need for action.',
    doingWork:
      'You have a "think and act" dynamic that ensures choices actually turn into results. In the middle of deciding, {a} manages the risk while {b} learns by trying things out. You get the best results when you put a time limit on your experiments. Agreeing on how much information you need before you try something prevents you from pulling in different directions and keeps your shared momentum high.',
    withPeople:
      'Between you, you provide both the sense-making and the forward motion that people rely on. One of you holds the criteria of {a} while the other sets the pace of {b}. Under stress, this can flip into caution meeting impatience. When you pair a small move with a clear explanation of why you are doing it, your speed feels like progress rather than panic to the other person.',
    gettingBetter:
      'Learning together is a powerful cycle of refining and acting where {a} diagnoses and {b} tests. To keep both these instincts in play, pair every review with a new experiment. The gut move teaches what the head could not have known in advance, and the head keeps the next experiment honest. Rotating who designs the test keeps the risk and the design shared.',
  },
  'Head|Head+Gut': {
    underPressure:
      'You are both high-intelligence movers who value getting the right result. Under stress, {a} leads with analysis while {b} leads with a push for execution. You are both trying to find the best path forward. The only clash is usually about timing, as one of you builds the map while the other is ready to drive. Separating the decision moment from the action moment usually turns that friction into a synchronized strike.',
    doingWork:
      'You have a great balance between the plan and the delivery, allowing you to be both careful and fast. {a} holds the standards while {b} looks for the best path forward. This is very effective if you define who gets to make the final choice before the situation gets personal. Knowing who calls "good enough" for a specific task prevents your shared drive for excellence from becoming an endless cycle of changes.',
    withPeople:
      'You provide both standards and thrust to any group, which makes you a very reliable pair. One of you reads as measured while the other reads as driven. If the vibe feels too sharp, it is usually just your shared rigour showing up as an edge. Offering a moment of warmth after a firm decision helps keep your momentum from feeling like a judgment on those around you.',
    gettingBetter:
      'Growing as a pair, you have the ability to both refine ideas and test them in the wild. One of you specializes in {a} and the other in {b}. To keep things balanced, try alternating who picks the next experiment and who writes the hypothesis for it. When you review progress, look at failures as design problems one day and execution problems the next so you both stay on the same side.',
  },
  'Head|Head+Heart': {
    underPressure:
      'You are both deeply protective of the work and the team, which makes you a very safe pair to be around. Under load, {a} looks after the logic while {b} looks after the people. You might debate whether to protect the composure of the project or the health of the relationships, but recognizing that both are vital helps you stop choosing between them and start doing both.',
    doingWork:
      'When tackling tasks, you bring a high level of accuracy and logic to the table. {a} tries to find the right move while {b} tries to find the fair move. This split works beautifully when you name which risk you are most worried about. Are you most afraid of being wrong or being unkind? Letting that choice drive how you act for the week prevents you from getting stuck in an endless middle ground.',
    withPeople:
      'You provide both a logical anchor and a humane tone to your interactions. One of you leads with {a} and the other with {b}. Sometimes "just the facts" can talk past the "human cost." The sequence usually matters more than the words. Deciding whether the feeling or the next step comes first when emotions spike is what helps you both feel heard.',
    gettingBetter:
      'For improvement, you offer each other sharp thinking and values-safe progress. You can help each other by separating the critique of the idea from the care for the person. Ending each session with one behavior for each of you to try keeps your feedback from dissolving into simple reassurance and ensures you are both actually growing.',
  },
  'Head|Heart+Gut': {
    underPressure:
      'You are both naturally protective of what matters, which makes you a very loyal and formidable team. Under pressure, {a} reaches for structure to understand the situation while {b} reaches for action to shield the group. It can look like coldness meeting heat, but it is really just two different ways of being a guardian. Acknowledging both needs, to know and to act, helps you stay in sync.',
    doingWork:
      'When making decisions, you have the combined talent of being both specific and driven by your beliefs. {a} organizes the path while {b} provides the reason why and the push. To keep things moving, agree on your non-negotiables before you start. It ensures that moving fast does not feel like a betrayal of the plan and being careful does not feel like a roadblock to the goal.',
    withPeople:
      'With people, you bring both a clear map and a strong backbone to the bond. The strength of this partnership is its integrity. The only strain is usually just timing: when to press and when to breathe. After a bruising day, make sure both the analysis and the protective move get some airtime. Even if you would have ordered them differently, they are both essential to your recovery.',
    gettingBetter:
      'You grow best as a pair when you bridge the gap between a great plan and a bold move. Real progress happens when one of you helps slow things down to find the logic, while the other keeps the energy moving toward a real-world result. By honoring both the "think" and the "do," you ensure your shared lessons aren\'t just ideas but become part of how you actually live and act together.',
  },
  'Head|Head+Heart+Gut': {
    underPressure:
      'You are a pair that values clarity and wholeness, which helps you stay steady when stakes are high. Under pressure, {a} simplifies the world toward logic while {b} is juggling every signal at once. The risk is that one feels overloaded while the other feels things are getting "too simple." To lower the temperature, name which channels you are allowed to drop for an hour so you can both focus on the same lane.',
    doingWork:
      'When working through a situation, you bring both a clean focus and a big-picture view. {a} wants a clear owner for each choice while {b} wants everything to stay aligned. You can help each other by narrowing your focus for a short time. Picking three clear outcomes and one top priority ensures that your desire to see every angle helps your progress instead of stalling it.',
    withPeople:
      'With people, you provide both a clear structure and a deep read on the undertones. One of you holds the agreed line while the other sees what the line might be missing. When a hidden risk is flagged, try to see it as helpful information for the pair rather than a critique of your pace. It is just another layer of data to keep you safe.',
    gettingBetter:
      'Growing together, you offer both depth and range. {a} deepens one skill with focus while {b} grows in every direction. Picking one shared focus for the month prevents "wholeness" from becoming "exhaustion." Celebrating when your depth and your range show up in the same win helps you appreciate the different ways you both move the needle.',
  },
  'Heart|Gut': {
    underPressure:
      'You are a pair that wants to end the pain of a crisis and move back to a good place. Under strain, {a} seeks connection while {b} seeks agency. It can feel like "talk" versus "do," but it is really just two different types of adrenaline at work. Recognizing these as equally valid bids for relief helps you respect each other\'s first moves and find a way forward together.',
    doingWork:
      'You pair a wonderful talent for harmony and care with a real drive for speed. One of you leads with {a} and the other with {b}. It helps to alternate who is protecting the group and who is driving the next decision. Talking after a fast-moving stretch ensures that your shared pace never feels like a dismissal and that everyone feels seen in the rush.',
    withPeople:
      'With people, you bring both warmth and direction to the bond. One of you leads with {a} and the other with {b}, providing both nurture and edge. The fatigue comes when you both feel solely responsible for holding it all together. Returning to the same side of the table before you pull in different ways is what keeps your care and your momentum from feeling like rivals.',
    gettingBetter:
      'For growth, you combine deep reflection with a "learn by doing" attitude. One of you processes the meaning while the other tests the action. Short reflections after a big move keep both of you honest. Ask what you felt, what you tried, and what you will adjust. Scheduling these prevents them from being skipped when the gut is ready for the next thing.',
  },
  'Heart|Head+Gut': {
    underPressure:
      'You are both trying very hard to navigate a crisis with both a plan and a heart. Under pressure, one of you goes relational first while the other goes plan-and-push. While others might see a collision of speed and care, you are actually aiming for the same outcome. Narrating your joint intent out loud by saying "we want to be both fast and fair" helps everyone see your shared goal.',
    doingWork:
      'Choosing a path together involves a mix of deep empathy and strong follow-through. You are a pair that looks after both the people and the final result. To stay effective, decide clearly when the heart leads and when the action leads for a specific choice. Revisit this split as things change so you are not stuck in roles that no longer fit the moment.',
    withPeople:
      'With people, you provide both the empathy of {a} and the direction of {b}. This can look like opposition when you are actually trying to land the same thing. Framing your styles as different tools in a single kit, rather than a split in the partnership, is usually what lowers the heat and lets you work as a team.',
    gettingBetter:
      'Learning together, you offer each other both safety and traction. Try "sandwiching" your feedback: start with the human impact, then the adjustment, then the next try. Agreeing on one metric for "healthy speed" for the month keeps your growth grounded, kind, and clearly moving forward.',
  },
  'Heart|Head+Heart': {
    underPressure:
      'You are both trying to be exceptionally kind and fair, which makes you a very humane pair. Under load, {a} leads with the emotional truth while {b} balances that with logic and framing. Any friction usually sounds like "too soft" meeting "too measured," but you are both aiming for the same compassionate outcome. Trusting that intent helps you bridge the gap between feeling and logic.',
    doingWork:
      'Your collaboration blends heart-led instinct with a head for fairness and order. This is a powerful combination for anyone you deal with. To avoid getting stuck when your values pull you in two directions, try putting a time limit on the emotional phase of a choice. Giving yourselves a set window to feel it out before you decide which way to go helps you stay in motion without losing your soul.',
    withPeople:
      'With people, you provide both the warmth of {a} and the language of {b}. You are a very supportive duo. Just watch for "care loops" where support circles without a clear ask. Making one clean request and setting a limit on what you each carry turns your shared care into forward motion without anyone feeling like they are on their own.',
    gettingBetter:
      'Growth for you is about finding the story and the standard. Try to use one narrative of "what happened to us" alongside one rule for "what good looks like next." This ensures your reflection leads to movement, and your movement doesn\'t skip over the meaning of what you have learned together.',
  },
  'Heart|Heart+Gut': {
    underPressure:
      'You are a pair that protects what matters with incredible intensity and sincerity. Under pressure, {a} absorbs the emotional signal while {b} defends and acts. It can look like overwhelm meeting sharpness, but it is really just two different speeds for "safe enough to move." Acknowledging that one needs to process while the other needs to shield helps you find a rhythm that protects you both.',
    doingWork:
      'Acting together joins your awareness of feelings with a strong sense of belief and push. To keep this energy productive, agree on your non-negotiable values before your speed starts to feel like a betrayal of the group. Writing these values down in one line ensures your debates stay about the method rather than about your loyalty to each other.',
    withPeople:
      'With people, you bring both a deep listen and a strong guard. Your loyalty to each other is a major strength. When you are both activated, the intensity can stack up fast. Pausing to ask if the bond needs protection or just some air prevents you from turning up the volume on each other. Repair often matters more than being right.',
    gettingBetter:
      'Learning for you involves both emotional integration and bold action. Try to debrief what happened for the people and for the outcomes in the same conversation. Ending with a shared commitment on how to pace the next push ensures that your growth includes relationship repair as a healthy, recurring habit.',
  },
  'Heart|Head+Heart+Gut': {
    underPressure:
      'You are a pair that values both deep feeling and total integration, which makes you very thorough. Under pressure, {a} stays in the feeling field while {b} manages every brain at once. This is often just a bandwidth mismatch. Naming your limits and your temporary roles early on prevents either of you from feeling flooded or solely responsible for the whole system.',
    doingWork:
      'Making progress together pairs your focus on people with a drive for completeness. To keep the pace up, try to break your goals into smaller pieces so that wanting everything to be perfect does not stop you. Putting a definition of "good enough for now" in writing gives both your care and your planning the boundaries they need to be effective.',
    withPeople:
      'With people, you provide both a signal of care and a read on the whole map. When one of you is at capacity, a quiet signal helps the other calibrate. It is much better to give a real sign than to let the other person guess how much "heart" is left in the room, keeping the bond clear and sustainable.',
    gettingBetter:
      'In growth, you offer both a deep connection and a chase for mastery. Picking one shared habit to simplify your learning load for the month helps a lot. You can add complexity later, but starting with a single focus ensures that your integration goals don\'t create an invisible workload for either of you to carry.',
  },
  'Gut|Head+Gut': {
    underPressure:
      'You are an exceptionally high-momentum pair with a shared gift for clearing the fog. Under pressure, {a} wants raw motion while {b} wants a plan inside that push. You can execute faster than almost anyone if you agree on one metric for "done enough" in this moment. Your shared speed is a superpower as long as you agree on where you are running.',
    doingWork:
      'Decision-making for you stacks raw speed with strategic speed, making you very good at moving fast. To keep it safe, you just need a shared definition of risk and mistakes. Agreeing on who can call a pause when the cost of moving fast gets too high ensures that your speed remains a strategy and not just a reflex.',
    withPeople:
      'With people, the texture of this bond is raw clarity meeting structured clarity. You are both direct and honest. The only misread to watch for is "contempt", which neither of you intended. The order of your pacing often matters as much as the words you use. Deciding who goes first and who holds the reaction helps you land your clarity without a bruise.',
    gettingBetter:
      'Growth for you is about action and structured iteration. End your retrospectives with one question: "What would we do differently with slightly more heart?" Adding a second question about who might have felt rushed by your joint pace helps you keep your momentum while staying connected to the people around you.',
  },
  'Gut|Head+Heart': {
    underPressure:
      'You are both aiming for a good outcome and a clean conscience, which makes you a very principled pair. Under pressure, {a} drives the motion while {b} tempers it with care. It is a "now" versus "not like this" dynamic. Acknowledging that the "how" is just as important as the "when" helps you turn this friction into a very balanced and effective response.',
    doingWork:
      'When you collaborate, you mix the drive to act with the need to keep everyone aligned. You are great at making choices that affect many people because you cover both the action and the impact. Try alternating who leads the charge and who leads the communication. This prevents either of you from being stuck in a single role and keeps your partnership flexible.',
    withPeople:
      'With people, you bring both edge and diplomacy to the bond. You provide both pace and nuance. Under heat, it is easy to see each other as just a "driver" or just a "diplomat." Naming your shared intent out loud, reminding yourselves you want the same thing, is usually enough to keep the partnership from feeling split.',
    gettingBetter:
      'Learning for you is a mix of fast iteration and wide reflection. Tie each project to one "people-impact note" so your lessons stay whole. Rotating who writes that note helps both of you practice naming the human side of the work, ensuring your shared speed stays healthy and respected over time.',
  },
  'Gut|Heart+Gut': {
    underPressure:
      'You are a pair of high-conviction movers who are not afraid of a challenge. Under pressure, heat meets heat. {a} pushes through while {b} pushes with values forward. Naming the problem as the "shared enemy" instead of each other helps you stay aligned. Agreeing on what "respect" looks like for the next ten minutes keeps your shared heat productive.',
    doingWork:
      'Acting together joins your speed with a deep sense of purpose. You are a natural team for difficult situations. To keep your energy sustainable, make sure to talk about the personal cost of your loyalty after a major push. It is important not to treat extreme stress as just the normal way of doing things so your commitment does not lead to burnout.',
    withPeople:
      'Together you bring courage and conviction into the same space. Your bond is likely very honest and intense. The volume can sometimes get loud enough to shut one of you down. Having a phrase like "we are overheating" is a great way to protect the bond. It is not about control; it is about recognizing when the spike is too high.',
    gettingBetter:
      'Growth for you is about courage and moral energy. Before your next big push, ask "who is affected?" to keep your instincts connected to the consequences. After the work is done, naming one boundary you will hold next time ensures that your passion doesn\'t lead to permanent overload for either of you.',
  },
  'Gut|Head+Heart+Gut': {
    underPressure:
      'You are a pair that values both action and total system awareness, which makes you very thorough under fire. Under pressure, {a} simplifies the situation to a single action while {b} holds the whole picture. Trading off who holds the vision and who drives the next step in hourly slices gives you both some relief and keeps the project moving.',
    doingWork:
      'When deciding how to act, {a} pulls you forward while {b} fits the details together. To keep moving, try to put a time limit on your alignment talks. Spending thirty minutes on getting on the same page and then acting until the next check-in ensures that your desire for a complete view supports your speed instead of blocking it.',
    withPeople:
      'With people, you bring both motion and a deep read on subtext. One carries the drive, and the other carries the signal. When a risk is named, try to see it as helpful data about how the pair is doing together. It is usually not an attempt to slow things down, but a way to keep the bond secure and the path clear.',
    gettingBetter:
      'Learning for you is a mix of reps and synthesis. Picking one shared theme per month prevents your breadth from becoming noise. At the end of the month, ask if that theme actually improved how you show up together. If it just became a box-ticking exercise, feel free to retire it and try something that feels more vital.',
  },
  'Head+Gut|Head+Heart': {
    underPressure:
      'You are both looking for control and a good outcome, which makes you a very reliable and stable pair. Under stress, {a} optimizes for leverage while {b} optimizes for fair and considered moves. Recognizing that you both want a stable result helps you see your different moves, execution and care, as a single, balanced strategy.',
    doingWork:
      'Collaborating as a pair means you mix a drive to finish with planning that considers everyone involved. This makes you very effective at making changes that last. To stay in sync, split your talks: talk about what you are deciding first, and how you will share that decision second. Reviewing both ensures that neither the goal nor the people are forgotten.',
    withPeople:
      'With people, you bring both efficiency and mediation to the bond. Under stress, it can feel like "edge" meeting "diplomacy." Underneath that, you are both aiming for something sustainable. Seeing how your moves actually connect and support each other dissolves that false opposition and lets you work as a team.',
    gettingBetter:
      'In growth, you offer each other testing and context. Try pairing every experiment with one sentence on its relational impact. This keeps your learning connected to how it actually felt to be on the receiving end. Reviewing whether you are both seeing the same level of trust helps you stay aligned and grow together.',
  },
  'Head+Gut|Heart+Gut': {
    underPressure:
      'You are both built for speed and are deeply committed to the team. Under pressure, {a} pushes with logic while {b} pushes with loyalty. Acknowledging that you are both pushing for the group, just in different ways, keeps the pressure from becoming personal. Separating what you "fear" from what you "owe the moment" helps you find a unified path.',
    doingWork:
      'Choices for you are a powerful mix of logic and values. You are both built to move. Agreeing on the specific value you are defending before you argue about how to do it ensures that your debates stay about the method and not about who cares more. You both care deeply; you just lead with different parts of the brain.',
    withPeople:
      'With people, you provide both force and glue to the bond. One signals competence and the other signals loyalty. Any bruise usually comes when loyalty is heard as pressure or logic is heard as coldness. These are usually just issues of language and timing, not a lack of commitment to each other or the relationship.',
    gettingBetter:
      'Learning for you is about finding both the outcome and the meaning. Having one shared scoreboard and one shared story for each cycle keeps you both honest. After each project, ask if your speed cost someone trust or if your care cost someone clarity. It is a great way to keep your growth as balanced as your drive.',
  },
  'Head+Gut|Head+Heart+Gut': {
    underPressure:
      'You are both highly capable and value both drive and wholeness. Under pressure, {a} is lean and driven while {b} is full-spectrum. Naming one specific channel for each of you to own for the next hour helps you manage the complexity without losing your momentum. It prevents either of you from feeling reduced or drowned by the situation.',
    doingWork:
      'When tackling a situation together, you bring both a strong backbone and a need for everyone to be on the same page. Try writing down your combined plan once, and then act based on that document. This gives your discussion a clear endpoint and allows you to move into action with a shared map that everyone trusts.',
    withPeople:
      'With people, you provide both clarity and attunement. One of you moves to close while the other stays with what is underneath. What the "full-spectrum" partner sees is usually just extra information for the pair. It is a tool to keep the bond healthy, not a verdict on performance, and helps you both navigate the relationship better.',
    gettingBetter:
      'Growth for you involves a mix of specializing and generalizing. Choosing one skill each to stretch prevents you from duplicating each other\'s workload and keeps things fresh. Celebrate your depth where it matters. Revisit the split each season to make sure no one is absorbing all the "integration" work by default.',
  },
  'Head+Heart|Heart+Gut': {
    underPressure:
      'You are both deeply protective of the team and care about keeping harm off the table. Under pressure, one of you reaches for {a} to find fairness, while the other reaches for {b} to find action. It can look like "stalling" meeting "reactivity," but you are both standing up for the group. Recognizing this shared protectiveness helps you find a unified path forward.',
    doingWork:
      'You are a pair that looks after both the people and the final result. When making choices, {a} weighs the options while {b} keeps the energy moving. For each task, agree who leads the "get it right" side and who leads the "get it moving" side. Checking in on both the next move and the human impact ensures that your shared care results in real progress.',
    withPeople:
      'With people, you bring both moderation and energy to the bond. You provide both fairness and loyalty. Seeing your two moves as a single story, one that is both fair and loyal, is what dissolves the false choice between the two. It turns potential conflict into a very strong, integrated partnership.',
    gettingBetter:
      'When improving, you offer each other reflection and conviction. It helps to separate "what needs to change" from "what this means about me." This allows your feedback to update your skills without wounding your identity. Comparing notes after a stressful stretch helps you turn your needs into explicit agreements for next time.',
  },
  'Head+Heart|Head+Heart+Gut': {
    underPressure:
      'You are both highly thorough and value both care and total system awareness. Under pressure, {a} holds care-with-clarity while {b} manages every mode at once. Slicing your roles by deciding who holds the story and who holds the timeline helps you manage the weight together. It prevents either of you from feeling overwhelmed or alone in the process.',
    doingWork:
      'Collaborating on choices brings together human awareness and a big-picture view. To keep moving, try to narrow your goals for the week. Writing down your top three desired outcomes where you can both see them ensures that your desire to be thorough helps you act rather than slowing you down. It turns completeness into progress.',
    withPeople:
      'With people, you provide both a steady tone and a deep read on every signal. You are a very attuned pair. The only trap is hypervigilance, where you feed each other too much complexity. Simplifying your focus when one of you feels flooded is the best way to get that attunement without the exhaustion.',
    gettingBetter:
      'Growth for you is about deepening insight and chasing mastery. Picking one theme per quarter keeps the pair from over-complicating your development. Check in occasionally to see if your integration goals are creating an invisible workload, or if your focus is leaving relational debt for the other person to handle alone.',
  },
  'Heart+Gut|Head+Heart+Gut': {
    underPressure:
      'You are both high-conviction and high-awareness, which makes you a very formidable team. Under pressure, {a} leads with a high-intensity fire while {b} holds the whole picture. Naming this tempo clash out loud and agreeing on what can wait until after the crisis helps you stay aligned. It allows your shared energy to stay focused on the solution.',
    doingWork:
      'When deciding how to move, you bring both meaning and a balanced drive to the situation. Putting your basic plan on a single page before you act helps a lot. It ensures that your deep view supports your speed, allowing you to move decisively without having to argue about every single detail as you go.',
    withPeople:
      'With people, you provide both protection and orchestration. Your combined wattage is high and fills the whole space. Sometimes, a bit of silence after a question is the best opening you can give each other. What is left after a strong joint stance is usually the real read on how you are doing together, independent of the task.',
    gettingBetter:
      'In growth, you offer each other courage and integration. Rotating who picks the "growth edge" each month keeps your development fresh. When courage is the focus, the other stays patient with the ambiguity; when integration is the focus, the other says no to scope creep. This keeps your growth as balanced as your partnership.',
  },
}

export function getPairContextInsight (
  context: SituationalContextKey,
  keyA: string,
  keyB: string,
  labelA: string,
  labelB: string
): string {
  const la = contextComboLabel(context, labelA)
  const lb = contextComboLabel(context, labelB)

  if (labelA === labelB) {
    const exact = SAME_EXACT_COMBO[labelA]?.[context]
    if (exact) return fillPlaceholders(exact, la, lb)
  }

  const setA = centreSetFromComboLabel(labelA)
  const setB = centreSetFromComboLabel(labelB)
  if (labelA !== labelB && setA === setB && isDoubleCentreSet(setA)) {
    const blend = SAME_BLEND_DIFFERENT_ORDER[setA]?.[context]
    if (blend) return fillPlaceholders(blend, la, lb)
  }

  const pk = pairLookupKey(keyA, keyB)
  const template = PAIR_CONTEXT_INSIGHTS[pk]?.[context]
  if (template) return fillPlaceholders(template, la, lb)

  if (normalizeHhgKey(keyA) === normalizeHhgKey(keyB)) {
    return `In this context you both show up as ${la}. That is a rhythm you reinforce in each other, which builds speed and trust. The shadow side is a shared blind spot: what feels obvious to both of you may never get spelled out for anyone outside the pair. Some pairs add a single outside check after big calls, or a phrase they use to surface unstated assumptions before they lock in.`
  }
  return `In this context one of you skews toward ${la} and the other toward ${lb}. The friction is rarely bad intent; it is usually two different defaults for pace, care, and what "right" looks like in this slice of life. When those defaults stay unnamed, small moments stack. Making them explicit once, in language you can reuse under stress, often changes more than another argument about the same surface topic.`
}
