import { contextComboLabel, type SituationalContextKey } from '../../../Quiz/ChangeResults/contextComboLabels'

/** All 10 combo keys. Order defines how pair lookup keys are joined (e.g. "Head|Gut+Head"). */
export const ALL_COMBO_KEYS = [
  'Head',
  'Heart',
  'Gut',
  'Head+Gut',
  'Gut+Head',
  'Head+Heart',
  'Heart+Head',
  'Heart+Gut',
  'Gut+Heart',
  'Head+Heart+Gut',
] as const

export type ComboKey = (typeof ALL_COMBO_KEYS)[number]

/**
 * Maps any `getBrainCombinationKey` output to a strict ComboKey.
 */
export function normalizeComboKey (key: string): ComboKey {
  if (ALL_COMBO_KEYS.includes(key as ComboKey)) return key as ComboKey
  // Attempt to build a matching key from parts if it's malformed, but fallback to Head
  const parts = key.split('+').filter(Boolean)
  if (parts.length === 1) {
    const p = parts[0] ?? 'Head'
    if (p === 'Head' || p === 'Heart' || p === 'Gut') return p as ComboKey
  }
  if (parts.length === 2) {
    const s = `${parts[0]}+${parts[1]}` as ComboKey
    if (ALL_COMBO_KEYS.includes(s)) return s
  }
  if (parts.length === 3) return 'Head+Heart+Gut'
  return 'Head'
}

function pairLookupKey (keyA: string, keyB: string): string {
  const a = normalizeComboKey(keyA)
  const b = normalizeComboKey(keyB)
  const ia = ALL_COMBO_KEYS.indexOf(a)
  const ib = ALL_COMBO_KEYS.indexOf(b)
  const i = Math.min(ia, ib)
  const j = Math.max(ia, ib)
  return `${ALL_COMBO_KEYS[i]}|${ALL_COMBO_KEYS[j]}`
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
      'You have an incredible shared capacity to sense the mood and look after people when things get loud. As {a}, you both attune to the room deeply. The gift is your combined emotional intelligence, but the risk is that you both feel the weight so much that no one is left to steer the ship. Agreeing on one clear "next step" helps you move through the feeling into action.',
    doingWork:
      'In your shared decisions, you double the {a} energy of care and meaning. You make sure your choices matter and that everyone involved feels seen. To keep things moving, try pairing that warmth with a clear list of what comes first. Having one person focus on the final call for the day allows the other to stay in the flow without losing sight of the goal.',
    withPeople:
      'Together you radiate a warmth and resonance as {a} that makes people feel truly understood. The connection between you is often very intuitive. If you find yourselves avoiding the "hard truth" to keep the peace, remember that a firm boundary is sometimes the kindest thing you can offer the relationship.',
    gettingBetter:
      'In learning, you both lead with {a}, so reflection and empathy come easily. To stay grounded, try adding one measurable outcome to your emotional insights. Trading long debriefs for one shared commitment helps you turn your deep understanding into a habit that people can see.',
  },
  'Gut Strong': {
    underPressure:
      'You are a high-momentum pair with a shared gift for clearing the fog. As {a}, you both have a low tolerance for being stuck. You move faster than anyone else, but you might also amplify each other\'s impatience. Taking one collective breath to check for second-order effects ensures your speed stays a strategy rather than just a reflex.',
    doingWork:
      'When it is time to act, you bring a double dose of {a} energy: a drive to decide and a "test it now" mindset. This makes you incredibly productive. To avoid having to change course later, try adding one quick check on how your move affects others before you lock it in. It ensures your fast pace does not accidentally leave people behind.',
    withPeople:
      'Socially, you both bring the candid, direct energy of {a}. The vibe between you is honest and forward-leaning. Because you both move with such intensity, a small phrase like "I\'m just focused on the problem" can go a long way. It reminds you both that the heat is about the task, not the bond.',
    gettingBetter:
      'Learning for you both is about doing, which means you gain skills very quickly as {a}. To make sure the lessons stick, try inserting micro-pauses after a project to capture what you actually learned. It prevents the next big sprint from erasing the nuance of the last one.',
  },
  'Head + Heart': {
    underPressure:
      'You are a pair that others look to for thoughtful, humane stability. Under pressure, you both show up as {a}, weighing logic and people with equal care. This is a rare strength, but you have to watch for the "perfect move" trap. Setting a time limit on your deliberations ensures your kindness results in a timely decision.',
    doingWork:
      'In your shared choices, you are both considerate and smart as {a}, always looking for a way for everyone to win. To keep this balance working, be clear about who decides when a choice is final. This prevents things from drifting and ensures your shared empathy supports progress instead of slowing it down.',
    withPeople:
      'With people, you both read as {a}, creating a bond that is deeply trustworthy and nuanced. You have a way of being smart without being cold. If you feel like you are circling the same awkward topic, naming the "hard thing" directly is the fastest way to get your shared warmth back on track.',
    gettingBetter:
      'Learning together, you both enjoy deep reflection and sense-making as {a}. To keep your growth moving, try to cap the analysis phase and commit to one observable behavior each week. It turns your rich insights into practical habits that you can celebrate together.',
  },
  'Heart + Head': {
    underPressure:
      'You bring a wonderful composure and a focus on people when things get heated. As {a}, you have the ability to calm a hot room just by being in it. The only risk is extending a deadline too many times out of care for others. Adding a "decide by" moment helps you protect the team without losing your shared sense of humanity.',
    doingWork:
      'When deciding how to move forward, you organize around people and results with great skill as {a}. You are naturally helpful and orderly. To avoid spinning your wheels just to be nice, try to name who is owning the finality of the plan versus who is checking on the group. This keeps your shared care focused on real progress.',
    withPeople:
      'In social settings, you land as {a}: polished, humane, and steady. You are very good at smoothing out the edges of a conversation. If you find yourselves wondering what was actually decided, a single line of intent before a big talk helps keep your clarity as high as your kindness.',
    gettingBetter:
      'As a learning pair, you both lead with guidance and structure as {a}. Your feedback is naturally supportive. To add a bit of growth-edge, try picking one "stretch goal" each and revisiting them weekly. It keeps your progress as visible as your support.',
  },
  'Head + Gut': {
    underPressure:
      'You are an exceptionally decisive and clever pair. Under fire, you both blend {a}, using your thinking and your thrust to find the quickest exit from a problem. You can outrun almost any stuck team. Just agree on a single lead for the crisis so your shared power stays focused on the goal rather than competing for the wheel.',
    doingWork:
      'Making decisions as a pair means you shorten the gap between a good idea and a finished result. You are both built for speed as {a}. To keep your efforts aligned, try using a shared list of what is "settled" versus what is "up for debate." This stops you from going in different directions and ensures your combined speed remains an asset.',
    withPeople:
      'With others, you both land as {a}: competent, intense, and fast-moving. You don\'t wait around, which is a strength people admire. If the energy feels a bit sharp, a quick "this is about the work" helps keep the personal bond feeling as secure as the professional one.',
    gettingBetter:
      'When growing together, you both iterate hard and build skills at high speed as {a}. To make sure you aren\'t just getting faster, try to capture one "human impact" lesson for every "technical" lesson. It ensures your growth is as well-rounded as it is rapid.',
  },
  'Gut + Head': {
    underPressure:
      'You bring a high degree of decisive control to high-pressure moments. As {a}, you cut through noise with ease while keeping your thinking online. You are a natural "strike team." Just be sure to pre-agree on who owns the last word so your shared drive for the best result doesn\'t lead to a deadlock between two strong minds.',
    doingWork:
      'When you decide to act, you have a rare combination of pace and order as {a}. You move fast, but you keep a strong backbone in your choices. To keep this working, use clear hand-offs so you do not accidentally step on each other\'s toes. A quick time-box for review gives you both the quality and the closure you need.',
    withPeople:
      'With people, you both land as {a}: commanding, clear, and direct. You provide great direction for those around you. The only thing to watch for is others feeling "overruled" by your combined certainty. A small pause after you make a point gives others the room to join in, making your clarity more effective.',
    gettingBetter:
      'Learning for you happens best in motion as {a}. You suit "reps and shipping" perfectly. To ensure your speed doesn\'t erase the nuance, try adding one "process" note to every "outcome" note. This ensures you are getting better at how you work, not just what you do.',
  },
  'Heart + Gut': {
    underPressure:
      'You are a vibrant and highly mobilized pair who can rally a team faster than anyone. Under pressure, you both move into {a}, combining deep feeling with a shared drive for action. Because you both care so much, just having a "repair move" ready keeps your energy steady. Knowing how to reset together ensures your shared passion remains your greatest strength.',
    doingWork:
      'When it is time to choose a path, you are a powerhouse of conviction and progress as {a}. You move with heart and speed. To make your efforts even more effective, try adding a quick check-in before locking in big promises. It ensures your shared enthusiasm stays focused and manageable for everyone involved.',
    withPeople:
      'With people, you both bring a loyal and vivid energy as {a} that makes your bond feel exceptionally alive. You naturally defend and support one another. If things feel intense, remembering that your connection is the priority keeps the vibe healthy. A little bit of lightness helps your high-color connection shine.',
    gettingBetter:
      'Growth for you is an exciting, active process as {a}. You learn best when you are right in the middle of the work. To capture your best lessons, try celebrating the "human impact" alongside the results. Ending each sprint with one thing to cheer for keeps your growth as rewarding as your drive.',
  },
  'Gut + Heart': {
    underPressure:
      'You both bring a tremendous amount of drive and heart to everything you do. When things get heated, you move into {a} as a powerful duo ready to protect what matters. To stay perfectly in sync, just naming your shared goals beforehand helps. It ensures your combined intensity stays focused on the solution and keeps you both moving in the same direction.',
    doingWork:
      'In your shared work, you are a pair known for incredible conviction and care as {a}. You bring visible energy to every choice you make. To keep your momentum smooth, try to take one quick moment to consider the broader plan. It helps ensure your fast, heart-led calls create a win for the whole team.',
    withPeople:
      'With others, you both show up as {a}: expressive, charismatic, and big-hearted. You have a natural gift for lifting each other up. If the energy gets high, checking in with a simple "how are we doing" keeps the bond secure. Noticing those small shifts early ensures your shared energy always feels like a shared victory.',
    gettingBetter:
      'You both grow through bold experiments and high-conviction action as {a}, which builds great skills very quickly. To round out your progress, try asking how your speed is landing with others. It keeps your backbone strong and your heart open, ensuring your growth is as impactful as it is fast.',
  },
  'Head + Heart + Gut': {
    underPressure:
      'You are both highly integrated and bring your full selves to every challenge. As {a}, you have an amazing ability to keep every "brain" online when the stakes are high. This is a massive advantage. To stay clear, try dividing the focus. One of you watching the logic while the other watches the people helps you manage complexity with total confidence.',
    doingWork:
      'When making big decisions, you see every angle as {a}, which makes you incredible at solving complex puzzles. To keep your progress fast and steady, try picking your top few priorities first. Settling the most important goal before moving to the next ensures your shared desire for excellence always leads to a finished result.',
    withPeople:
      'With people, you are both deeply attuned to the full map of a relationship as {a}. You see the nuance that others often miss. To keep the connection feeling bright and easy, try using clear, direct requests. It prevents your shared depth from feeling heavy and allows your combined wisdom to be a source of constant support.',
    gettingBetter:
      'When growing together, you both have a wonderful appetite for learning as {a}. Every angle feels vital and interesting. To keep your growth sustainable, try focusing on just one specific skill at a time. Celebrating those focused wins together ensures your shared ambition always feels like a gift.',
  },
}

/**
 * Every unordered pair of distinct brain combinations across four situations.
 */
const PAIR_CONTEXT_INSIGHTS: Record<string, Record<SituationalContextKey, string>> = {
'Head|Heart': {
    underPressure:
      'You are both deeply committed to creating safety when things get loud, which makes you a very grounding pair. Under pressure, one of you leads with {a} to find clarity while the other leads with {b} to find connection. You both desire the same feeling of security, and can bridge any gap by simply acknowledging the different doors you use to get there. It turns a potential tension into a shared safety net.',
    doingWork:
      'You have a massive shared asset for making choices: the ability to cover both the logic and the morale of a situation. One of you provides the structure of {a} while the other looks after the meaning of {b}. To keep this balance healthy, try deciding early who is making the final call and who is checking on the team. This ensures your shared choices are as humane as they are smart.',
    withPeople:
      'You bring a beautiful combination of precision and care to your relationships, making your bond both smart and warm. Between you, {a} and {b} create an exceptionally steady presence. If a moment feels confusing, seeing it as two different ways of trying to feel safe is usually enough. Agreeing on one shared approach before a big talk helps your two styles land as a single, supportive voice.',
    gettingBetter:
      'Together you offer the best of both worlds: frameworks for growth and the emotional safety to pursue them. You maximize this by trading short, structured debriefs for a few minutes of naming the human impact of the work. Ending with one concrete step ensures that your shared reflection always turns into real-world movement that you can both celebrate.',
  },
  'Head|Gut': {
    underPressure:
      'You are a high-capability pair that wants to end the strain of a crisis as quickly as possible. Under pressure, {a} looks for a defensible path while {b} looks for tangible motion. It is a powerful mix of thinking and doing. Naming your needs out loud helps you find a middle speed that respects both the plan and the action, turning potential haste into a perfectly timed strike.',
    doingWork:
      'You have a "think and act" dynamic that ensures your choices always turn into results. In the middle of deciding, {a} manages the risk while {b} learns by trying things out. You get the best results when you put a simple time limit on your analysis. Agreeing on how much info you need before you move prevents you from pulling in different directions and keeps your shared momentum high.',
    withPeople:
      'Between you, you provide both the sense-making and the forward motion that people rely on. One of you holds the criteria of {a} while the other sets the pace of {b}. When you pair a small move with a clear explanation of why you are doing it, your speed feels like progress rather than pressure. It keeps the relationship feeling as secure as it is productive.',
    gettingBetter:
      'Learning together is a powerful cycle of refining and acting where {a} diagnoses and {b} tests. To keep both these instincts in play, try pairing every review with a new experiment. The gut move teaches what the head could not have known in advance, and the head keeps the next move honest. This keeps your growth as well-rounded as it is rapid.',
  },
  'Head|Head+Gut': {
    underPressure:
      'You are both high-intelligence movers who bring a massive amount of capability to any challenge. Under stress, {a} leads with brilliant analysis while {b} leads with a powerful push for execution. You are both aiming for the absolute best path forward. Separating the decision moment from the action moment turns your combined energy into a synchronized strike, allowing you to clear the fog faster than almost any other pair.',
    doingWork:
      'You have a magnificent balance between strategic planning and high-speed delivery, making you both careful and impressively fast. {a} holds the high standards while {b} finds the most effective path forward. This makes you a powerhouse team for shipping great work. Defining who calls "good enough" for specific tasks ensures your shared drive for excellence always leads to a triumphant finish.',
    withPeople:
      'You provide both clear standards and incredible thrust to any group, which makes you a deeply reliable and respected duo. One of you brings a measured, calm presence while the other brings a driven, motivating energy. Offering a small moment of warmth after a firm decision ensures your clarity is seen as the supportive gift it is, keeping your relationships as strong as your results.',
    gettingBetter:
      'Growing as a pair, you have the rare ability to both refine complex ideas and test them boldly in the wild. One of you specializes in {a} and the other in {b}, creating a perfect cycle of learning. By alternating who designs the experiment and who sets the hypothesis, you stay perfectly on the same side, turning every challenge into a design win and growing much faster together.',
  },
  'Head|Head+Heart': {
    underPressure:
      'You are both deeply protective of the work and the team, which makes you an incredibly safe, steady, and reliable pair to be around. Under load, {a} looks after the logic while {b} looks after the people, ensuring no one is left behind. This shared focus is a massive strength; by honoring both the plan and the person, you ensure that even in the toughest moments, everyone feels both brilliantly guided and truly seen.',
    doingWork:
      'When tackling tasks, you bring a high level of accuracy and humane logic to the table, making you a powerhouse of thoughtful productivity. {a} finds the right move while {b} ensures it is the fair move. This balance is a rare gift that ensures your shared results are as solid as they are kind. Naming your priorities early allows your empathy to fuel real progress, helping you move forward with total confidence.',
    withPeople:
      'You provide both a logical anchor and a beautifully humane tone to your interactions, making you a deeply trustworthy and respected pair. Between you, {a} and {b} create a bond where clarity and warmth go hand in hand. By simply deciding whether the feeling or the next step comes first during high-energy moments, you keep your connection vibrant and ensure your shared wisdom is always felt as a supportive force.',
    gettingBetter:
      'For growth, you offer each other the perfect blend of sharp thinking and values-based progress. You are naturally gifted at helping one another refine ideas while maintaining deep care for the person. Ending your sessions with one small, actionable behavior to try ensures your insights turn into lasting habits, allowing you to celebrate how far you have truly come together.',
  },
  'Head|Heart+Gut': {
    underPressure:
      'You are both naturally protective of what matters, which makes you an exceptionally loyal and formidable team. Under pressure, {a} brings the structure to understand the situation while {b} brings the decisive action to shield the group. You are both guardians at heart. By acknowledging both needs—to know and to act—you stay perfectly in sync and use your combined strengths to stabilize any room with total confidence.',
    doingWork:
      'When making decisions together, you have the magnificent talent of being both highly specific and deeply driven by your shared values. {a} organizes the path forward while {b} provides the inspiring purpose and the push. This makes you a powerhouse team. Agreeing on your non-negotiables early on ensures that your shared speed feels like progress and your careful planning feels like a solid bridge to your goals.',
    withPeople:
      'With people, you bring both a clear map and a strong backbone to the bond, creating a partnership of high integrity and respect. Between you, there is a deep sense of reliability. Making sure both the thoughtful analysis and the protective drive get airtime after a busy day keeps your connection vibrant. Honoring these two styles is what keeps your bond feeling exceptionally secure and alive.',
    gettingBetter:
      'You grow best as a pair when you bridge the gap between a brilliant plan and a bold move. You have a rare ability to turn deep logic into real-world results. By honoring both the "think" and the "do" in your shared learning, you ensure your lessons are not just ideas but become powerful habits. This keeps your progress visible and gives you both plenty of reasons to celebrate your growth together.',
  },
  'Head|Head+Heart+Gut': {
    underPressure:
      'You are an incredibly resilient pair whose value for clarity and wholeness helps you stay remarkably steady when the stakes are high. Under pressure, {a} provides the logic to simplify the world while {b} masterfully manages every signal at once, giving you a massive advantage in complex crises. By naming which channels to focus on, you ensure your shared desire for clarity remains a powerful tool for progress and keeps your energy calm and focused.',
    doingWork:
      'You bring both a brilliant focus and a masterful big-picture view to every task, making you an unstoppable team for solving complex puzzles. {a} ensures there is a clear owner for each choice while {b} keeps everything perfectly aligned. Picking three clear outcomes and one top priority ensures that your ability to see every angle fuels your momentum, turning your wide-lens vision into a series of successful finishes.',
    withPeople:
      'You provide a wonderful balance of clear structure and a deep, intuitive read on the nuances of any relationship. One of you holds the steady line while the other sees the rich details that others might miss, making your bond exceptionally smart and supportive. Seeing any flagged risk as helpful data for the team ensures your combined wisdom stays a constant source of strength and connection.',
    gettingBetter:
      'Growing together is a rewarding experience because you offer both incredible depth and impressive range. You have an appetite for learning that is truly inspiring. By picking one shared focus for the month, you turn your natural ambition into sustainable progress. Celebrating when your depth and your range show up in the same win helps you appreciate the unique and powerful way you both move the needle.',
  },
  'Heart|Gut': {
    underPressure:
      'You are a high-impact team that can navigate any storm with both deep care and incredible speed. Under strain, {a} brings a wonderful gift for resonance while {b} provides the agency to move things forward. Recognizing that these are both powerful ways to restore safety helps you bridge the gap between "talk" and "do." This shared focus turns your different first moves into a synchronized and unstoppable response.',
    doingWork:
      'You are a remarkably effective duo because you pair a talent for harmony with a real drive for results. One of you leads with the warmth of {a} while the other provides the momentum of {b}, making you a powerhouse for getting things done while keeping morale high. Brief check-ins after a fast-moving stretch ensure that your shared pace feels like a collective win where you both feel fully seen.',
    withPeople:
      'You bring both vibrant warmth and clear direction to your bond, providing a beautiful balance of nurture and edge. Together you offer a presence that is both supportive and motivating to everyone around you. Returning to the same side of the table when things get busy keeps your care and your momentum working as perfect partners, ensuring your connection stays as strong as your output.',
    gettingBetter:
      'Growing together is an exciting journey because you combine deep, meaningful reflection with a bold "learn by doing" attitude. One of you processes the heart of the lesson while the other tests it in the real world, making your progress as meaningful as it is visible. Short reflections after a big move keep you both energized and ensure that every step forward is a shared victory.',
  },
  'Heart|Head+Gut': {
    underPressure:
      'You are a remarkably compassionate and effective team that navigates a crisis with both a plan and a heart. Under pressure, you combine a beautiful relational focus with a powerful push for the finish line. Narrating your joint intent by saying "we want to be both fast and fair" turns your different first moves into a synchronized strength, ensuring you stay perfectly in sync while reaching your shared goals.',
    doingWork:
      'Choosing a path together is a powerhouse collaboration that blends deep empathy with incredible follow-through. You have a rare talent for looking after both the people and the final result with equal care, making your work both meaningful and successful. Deciding clearly when the heart leads and when the action leads ensures your partnership stays fresh and your shared progress feels like a win for everyone.',
    withPeople:
      'You provide a wonderful balance of empathy and direction that others truly admire and rely on for stability. Between you, {a} and {b} create a bond that is as productive as it is kind. Framing your different styles as two essential tools in a single kit allows you to work as a unified team, ensuring your connection always feels balanced, supportive, and full of integrity.',
    gettingBetter:
      'Learning together is an inspiring journey because you offer each other both total emotional safety and incredible traction. You have the gift of turning feedback into fuel for growth while keeping your bond strong. By "sandwiching" your adjustments between the human impact and the next bold try, you ensure your growth is grounded, kind, and always moving toward your shared dreams.',
  },
  'Heart|Head+Heart': {
    underPressure:
      'You are an exceptionally humane and grounding pair with an incredible gift for staying both kind and fair when things get loud. Under load, {a} brings the vital emotional truth while {b} provides the logic and framing to keep you both steady. You are both aiming for the same compassionate outcome, which is a massive shared strength. Trusting this joint intent helps you bridge any gap between feeling and logic, ensuring you both feel heard, safe, and totally unified as a team.',
    doingWork:
      'Your collaboration is a brilliant powerhouse of heart-led instinct and orderly fairness, making your shared choices as solid as they are kind. You have a magnificent talent for honoring both the people and the process in every decision you make. To keep your momentum high and joyful, try setting a quick window to process the "feeling" phase together before locking in the path. This keeps you in a flow state without losing the shared soul that makes your partnership so special.',
    withPeople:
      'You bring a beautifully supportive and trustworthy presence to any group, blending the warmth of {a} with the clear, thoughtful language of {b}. Between you, there is a natural grace and empathy that makes your partnership truly admirable to those around you. If you ever find your shared care circling, making one clean, kind request of each other is all it takes to turn that wonderful energy into synchronized forward motion.',
    gettingBetter:
      'Growing together is an inspiring journey because you are both naturally gifted at seeing the deep human meaning behind every bit of progress. You are a powerhouse team for finding both the "story" and the "standard" in your work. To keep your growth rewarding, try pairing one narrative of what you learned as a pair with one clear "team rule" for next time. It ensures your rich reflections turn into the powerful, shared habits that make your professional bond even stronger.',
  },
  'Heart|Heart+Gut': {
    underPressure:
      'You are a formidable pair that protects what matters with incredible intensity and sincerity. Under pressure, {a} absorbs the emotional signal while {b} moves to defend and act. You have a shared gift for loyalty. Acknowledging that one needs to process while the other needs to shield helps you find a synchronized rhythm that protects your bond as much as the project.',
    doingWork:
      'Acting together joins your deep awareness of feelings with a high-momentum drive for results. You make choices with real conviction and heart. To keep this energy productive, try naming your non-negotiable values before you sprint. Writing these down in one line ensures your shared speed stays a strategy for success rather than a source of friction.',
    withPeople:
      'With people, you bring both a deep listen and a strong guard, making your connection feel exceptionally secure and alive. Your loyalty to one another is a major asset. If things get intense, a simple pause to check in on the bond prevents the volume from getting too high. Remembering that your relationship is the priority keeps your high-color connection healthy and bright.',
    gettingBetter:
      'Growing together is an active and rewarding journey because you combine emotional depth with a bold "learn by doing" attitude. You are a powerhouse team for turning shared experiences into deep wisdom. To make those lessons stick, try debriefing both the "human impact" and the "outcomes" in the same conversation. This ensures your growth as a pair is as balanced as your drive, turning every shared lesson into a stronger bond.',  
    },
  'Heart|Head+Heart+Gut': {
    underPressure:
      'You are a pair that values deep feeling and total integration, which helps you stay remarkably thorough when the stakes are high. Under pressure, {a} stays in the feeling field while {b} manages the full map of the situation. This is a massive advantage for complex crises. Naming your specific roles early on prevents either of you from feeling flooded and ensures your shared desire for wholeness remains a tool for stability.',
    doingWork:
      'Making progress together pairs a focus on people with a masterful drive for completeness. You are a powerhouse of consideration and detail. To keep your pace up, try breaking your goals into smaller pieces so your desire for perfection supports your progress rather than stalling it. Setting a "good enough for now" limit gives your care and your planning the boundaries they need to be truly effective.',
    withPeople:
      'With people, you provide both a signal of deep care and an incredible read on the whole map of a relationship. You see the undertones that others often miss. To keep the bond feeling light and sustainable, try using clear, direct requests with each other. It prevents your shared depth from feeling like a puzzle and allows your combined wisdom to be a source of constant support.',
    gettingBetter:
      'In growth, you offer both a deep connection and a persistent chase for mastery. You have an appetite for learning that is truly impressive. To keep your growth sustainable, try focusing on just one shared habit for the month. Celebrating that focused win together ensures your ambitious integration goals feel like a gift rather than a burden.',
  },
  'Gut|Head+Gut': {
    underPressure:
      'You are an exceptionally high-momentum pair with a shared gift for clearing the fog and finding the fastest way forward. Under pressure, {a} brings raw motion while {b} provides the strategic plan within that push. You can execute faster than almost anyone, which is a massive superpower in a crisis. Agreeing on one simple metric for "done" helps you stay perfectly in sync and ensures your shared speed always hits the target.',
    doingWork:
      'Decision-making for you is a powerhouse of raw speed and calculated strategy. You are naturally gifted at turning choices into results almost instantly. To keep your momentum safe and sustainable, try defining your "risk limits" together before you start. This ensures your speed remains a deliberate strategy, allowing you to move fast with the total confidence that you have each other’s backs.',
    withPeople:
      'With people, you bring a refreshing combination of raw clarity and structured honesty to the bond. You are both direct and sincere, which builds deep trust. If the energy feels a bit sharp, it is usually just your shared focus on the task. A quick "I’m on your team" helps land your clarity with warmth, ensuring your directness is always felt as a supportive asset.',
    gettingBetter:
      'Growth for you is an exciting cycle of bold action and structured iteration. You learn best by doing and then refining. To keep your progress well-rounded, try asking "what would we do differently with a little more heart?" after a big win. This simple check ensures your momentum stays connected to the people around you, making your shared growth as respected as it is rapid.',
  },
  'Gut|Head+Heart': {
    underPressure:
      'You are both aiming for an excellent outcome and a clean conscience, which makes you an incredibly principled and effective pair. Under pressure, {a} drives the motion while {b} balances it with care and framing. This is a rare strength; you move things forward without leaving people behind. Acknowledging that the "how" is just as vital as the "when" helps you turn any friction into a perfectly balanced response.',
    doingWork:
      'When you collaborate, you are a master team at mixing the drive to act with the need to keep everyone aligned. You make choices that matter because you cover both the action and the human impact. To keep your partnership flexible, try alternating who leads the charge and who leads the communication. It keeps you both fresh and ensures your shared decisions are as humane as they are decisive.',
    withPeople:
      'With people, you provide a beautiful balance of edge and diplomacy, bringing both pace and nuance to your relationships. You are a very reliable and well-rounded duo. If the pressure spikes, simply naming your shared intent out loud—reminding yourselves you want the same great result—is usually all it takes to keep your partnership feeling like a single, unified force.',
    gettingBetter:
      'Learning for you is a rewarding mix of fast iteration and wide reflection. You have the ability to gain skills quickly while keeping your values intact. Try tying each project to one "people-impact note" so your lessons stay whole. Celebrating these human wins alongside your technical progress ensures your shared speed stays healthy and inspiring for everyone involved.',
  },
  'Gut|Heart+Gut': {
    underPressure:
      'You are a pair of high-conviction movers who are not afraid of any challenge, which makes you a very brave and formidable team. Under pressure, you both bring incredible heat and dedication to the problem. By naming the crisis as the "shared enemy," you stay perfectly aligned. Agreeing on what respect looks like in the high-heat moments ensures your shared intensity remains your greatest competitive advantage.',
    doingWork:
      'Acting together joins your incredible speed with a deep, visible sense of purpose. You are a natural "strike team" for difficult situations because you lead with your hearts and your hands. To keep your energy sustainable, make sure to celebrate your loyalty to each other after a major push. Recognizing your shared commitment as a gift helps you maintain your high-performance pace without the burnout.',
    withPeople:
      'Together you bring immense courage and conviction to any space, and your bond is likely very honest and deeply alive. You are fiercely loyal to one another. If the volume gets high, a simple phrase like "let’s take a breath" acts as a powerful protector for the relationship. It’s a great way to ensure your shared passion stays focused on supporting each other and winning together.',
    gettingBetter:
      'Growth for you is fueled by courage and moral energy, which is a truly inspiring combination. Before your next big push, a quick check on who is affected helps keep your instincts connected to your wider impact. After the work is done, naming one thing you’ll do to protect your energy next time ensures your passion leads to lasting growth and a spine that stays strong for the long haul.',
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
      'You are a remarkably reliable and stable pair because you both share a deep commitment to achieving a great outcome. Even when stress leads {a} to look for leverage and {b} to look for fairness, you are actually working toward the same stable result from two vital angles. When you view your different approaches—execution and care—as a single, balanced strategy, you become an unstoppable team.',
    doingWork:
      'You have the unique ability to make changes that truly last by mixing a powerful drive to finish with thoughtful, inclusive planning. You are most effective when you split your process: align on the decision first, then decide how to share it together. This simple rhythm ensures that both your big goals and your people are fully supported and celebrated.',
    withPeople:
      'The bond you share is a beautiful blend of efficiency and mediation, bringing both strength and heart to those around you. While it may occasionally feel like "edge" meeting "diplomacy," remember that you are both building toward something sustainable and meaningful. By seeing how your different moves actually protect and support one another, you transform any tension into a unified front.',
    gettingBetter:
      'You offer each other an incredible gift of both testing and context, allowing you to grow with more depth than most. To keep your momentum high, try pairing every new experiment with a quick chat about its relational impact. Checking in on your shared level of trust ensures you are not just growing, but growing closer every single day.',
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
  'Head|Heart+Head': {
    underPressure:
      'You are both highly principled and protective of the work, but you start from different places. Under pressure, {a} looks for logic to find clarity, while {b} uses emotional intelligence to bring everyone along before moving to logic. Because {b} brings both feeling and framing, you can stabilize the room together. Acknowledging that the feeling must be processed before the logic lands ensures you stay perfectly in sync.',
    doingWork:
      'You have a strong dynamic for making choices because both of you value a thoughtful, clear path. {a} maps out the criteria, and {b} ensures the team’s morale is aligned with that logic. To avoid second-guessing the process, agree early on how much emotional context needs to be addressed before a decision is final.',
    withPeople:
      'You are a deeply steady and clear-headed pair. You bring both a calm anchor and a beautifully humane touch. Sometimes the difference is simply that {b} wants to connect first, while {a} wants to understand first. When you see this as two sides of the same coin, your combined presence becomes a powerful source of stability for the team.',
    gettingBetter:
      'You offer each other a wonderful blend of sharp thinking and relational care. {a} provides the frameworks for growth, while {b} creates the emotional safety to actually learn. Try naming one human impact for every logical step you take. This guarantees your shared insights turn into real, lasting habits that feel good to everyone.',
  },
  'Head|Gut+Head': {
    underPressure:
      'You are a highly capable duo that wants to get things right and move quickly. Under pressure, {a} looks for a defensible, logical path, while {b} wants to move fast and uses logic to justify the push. This is a brilliant mix of thinking and acting. Splitting the decision moment from the action moment keeps {b}’s momentum focused and {a}’s plan relevant.',
    doingWork:
      'You have a very productive dynamic that pairs careful planning with decisive follow-through. {a} manages the risk and standard, while {b} pushes the pace with a clear rationale. You get the best results when you agree on a timeline for analysis. Giving {b} the green light to test things early while {a} refines the plan ensures your shared momentum stays high.',
    withPeople:
      'Between you, you offer clear standards and incredible thrust. You are a deeply reliable and respected pair. Because {b} moves with such commanding force, {a}’s measured calm can act as a perfect counterbalance. A small pause from {b} and a direct endorsement from {a} makes your combined clarity feel like an invitation rather than a directive.',
    gettingBetter:
      'Learning together is an incredibly effective cycle of refinement and testing. {a} diagnoses the core issue, and {b} immediately ships a solution to see if it works. To keep this cycle healthy, ensure that {b}’s quick actions are brought back to {a} for review. This keeps your growth as fast as it is thorough.',
  },
  'Head|Gut+Heart': {
    underPressure:
      'You are a formidable pair that balances logic with passionate conviction. Under pressure, {a} brings structure to understand the situation, while {b} brings decisive, heart-led action to protect the group. Because {b} moves with such bold intensity, {a}’s calm analysis can either feel like a roadblock or a lifesaver. Agreeing that the plan and the passion serve the same goal keeps you aligned.',
    doingWork:
      'When making decisions, you bring an incredible mix of clarity and high-color energy. {a} organizes the logic of the path forward, while {b} provides the inspiring purpose and the thrust to act. This makes you a truly powerhouse team. Setting clear expectations for what "done" looks like ensures {b}’s fast, heart-led calls always land exactly where {a} aimed them.',
    withPeople:
      'You provide both a clear map and a vibrant, loyal backbone to the bond. Your partnership is full of integrity and life. {a} keeps things grounded and fair, while {b} brings the warmth and the heat. Honoring both the thoughtful analysis and the protective drive ensures your connection stays bright, steady, and secure.',
    gettingBetter:
      'You grow best when you bridge the gap between a brilliant plan and a courageous move. You have a rare ability to turn deep logic into bold, real-world impact. To maximize this, pair every strategic lesson from {a} with one human-focused experiment from {b}. This keeps your shared progress both visible and deeply meaningful.',
  },
  'Heart|Heart+Head': {
    underPressure:
      'You are an exceptionally caring and steady pair with a profound gift for keeping people safe when things get loud. Under load, {a} brings the vital emotional truth, while {b} also feels the room but quickly adds the logic to keep everyone grounded. You both aim for a compassionate outcome. Leaning on {b}’s framing helps {a} process the feeling without losing the path forward.',
    doingWork:
      'Your collaboration is a brilliant blend of pure empathy and orderly fairness. You make choices that are both deeply kind and highly structured. Because {a} leads with heart and {b} brings heart plus process, you naturally look after both the people and the plan. Setting a window to process the "feeling" phase ensures your shared warmth results in timely, solid progress.',
    withPeople:
      'You bring a beautifully supportive and trustworthy presence to any group. {a}’s pure resonance combined with {b}’s humane logic creates a bond that is deeply admired. If you ever find your shared care spinning in circles, making one clean, direct request of each other is all it takes to turn that wonderful energy into forward motion.',
    gettingBetter:
      'Growing together is a deeply rewarding journey because you both see the human meaning behind every bit of progress. You are a powerhouse for finding both the "story" and the "standard" in your work. Pairing {a}’s narrative of how the team feels with {b}’s team rules for next time ensures your reflections turn into powerful, shared habits.',
  },
  'Heart|Gut+Head': {
    underPressure:
      'You are a high-impact team that can navigate any storm with both deep care and commanding speed. Under strain, {a} brings a wonderful gift for resonance and feeling, while {b} brings decisive control and a logical push for the exit. Recognizing that checking in and taking charge are both ways of restoring safety helps bridge the gap. This shared focus turns your different instincts into a synchronized response.',
    doingWork:
      'You are a remarkably effective duo because you pair pure harmony with a structured drive for results. {a} looks after the people and the morale, while {b} sets the pace and the plan. Brief check-ins after a fast-moving stretch ensure that {b}’s momentum never accidentally runs over {a}’s need for consensus, keeping the whole team healthy and on track.',
    withPeople:
      'You bring both vibrant warmth and clear, commanding direction to your bond, providing a beautiful balance of nurture and edge. {b} provides the momentum, while {a} provides the glue. Returning to the same side of the table when things get busy keeps your care and your clarity working as perfect partners, ensuring your connection stays strong.',
    gettingBetter:
      'Growing together is an exciting journey because you combine deep, meaningful reflection with a bold "learn by doing" attitude. {a} processes the heart of the lesson, while {b} tests it in the real world with a clear strategy. Short reflections after a big move keep you both energized and ensure every step forward is a shared victory.',
  },
  'Heart|Gut+Heart': {
    underPressure:
      'You are a formidable pair that protects what matters with incredible intensity and sincerity. Under pressure, {a} absorbs the emotional signal, while {b} feels the heat and immediately moves to defend and act. You have a massive shared gift for loyalty. Acknowledging that {a} needs a moment to process while {b} needs to shield helps you find a rhythm that protects both the project and your bond.',
    doingWork:
      'Acting together joins your deep awareness of feelings with a high-momentum drive for results. You make choices with real conviction because {b} brings the speed and {a} brings the soul. To keep this energy productive, try naming your non-negotiable values before you sprint. This ensures your shared passion stays focused and never turns into friction.',
    withPeople:
      'With people, you bring both a deep listen and a strong, courageous guard, making your connection feel exceptionally secure and alive. Your loyalty to one another is a huge asset. If the energy gets too intense, a simple pause to check in on the bond prevents the volume from getting too high. Remembering that the relationship comes first keeps your connection vibrant.',
    gettingBetter:
      'Growing together is an active and rewarding journey because you combine profound emotional depth with bold, heart-led action. You are a powerhouse team for turning shared experiences into deep wisdom. To make those lessons stick, debrief both the "human impact" and the "outcomes" together. This ensures your growth is as balanced as your powerful drive.',
  },
  'Gut|Heart+Head': {
    underPressure:
      'You are both aiming for an excellent outcome and a clean conscience, making you an incredibly principled pair. Under pressure, {a} drives the motion and wants action, while {b} brings composure and focuses on people and process. Acknowledging that the "how" and "who" are just as vital as the "when" helps you turn any friction into a beautifully balanced, humane response.',
    doingWork:
      'When you collaborate, you are a master team at mixing the drive to act with the need to keep everyone aligned and organized. {a} pushes for the finish line, while {b} ensures the choices are thoughtful and fair. To keep your partnership flexible, alternate who leads the charge and who leads the communication. It ensures your decisions are as humane as they are decisive.',
    withPeople:
      'With people, you provide a beautiful balance of raw edge and polished diplomacy. You bring both pace and nuance to your relationships. If the pressure spikes and {a}’s directness clashes with {b}’s care, simply naming your shared intent out loud is usually all it takes to keep your partnership feeling like a single, unified force.',
    gettingBetter:
      'Learning for you is a rewarding mix of fast iteration and wide, values-based reflection. You gain skills quickly while keeping your standards intact. Try tying {a}’s quick project wins to {b}’s notes on "people impact." Celebrating these human wins alongside your technical progress ensures your shared speed stays healthy and inspiring for everyone.',
  },
  'Gut|Gut+Head': {
    underPressure:
      'You are an exceptionally high-momentum pair with a shared gift for clearing the fog and finding the fastest way forward. Under pressure, {a} brings raw, instinctive motion, while {b} brings that same motion but quickly backs it up with a strategic plan. You can execute faster than almost anyone. Agreeing on one simple metric for "done" ensures your shared speed always hits the target without unnecessary debate.',
    doingWork:
      'Decision-making for you is a powerhouse of raw speed and calculated strategy. You are naturally gifted at turning choices into results almost instantly. {a} provides the thrust, and {b} provides the tracks. To keep your momentum safe, define your "risk limits" together before you start. This ensures your speed remains a deliberate strategy.',
    withPeople:
      'With people, you bring a refreshing combination of raw clarity and structured, commanding honesty to the bond. You are both direct and move with absolute certainty. If the energy feels a bit sharp, it is usually just your shared focus on the task. A quick "I’m on your team" helps land your clarity with warmth, ensuring your directness is a supportive asset.',
    gettingBetter:
      'Growth for you is an exciting cycle of bold action and structured iteration. You learn best by doing and then refining. {a} acts on instinct, and {b} analyzes the result. To keep your progress well-rounded, try asking "what would we do differently with a little more heart?" after a big win. This simple check ensures your momentum stays connected to the people around you.',
  },
  'Gut|Gut+Heart': {
    underPressure:
      'You are a pair of high-conviction movers who are not afraid of any challenge, making you a brave and formidable team. Under pressure, {a} brings raw heat and dedication, while {b} brings that same heat but immediately connects it to a deep loyalty for the group. By naming the crisis as the "shared enemy," you stay perfectly aligned. Agreeing on what respect looks like in the high-heat moments ensures your shared intensity is an advantage.',
    doingWork:
      'Acting together joins your incredible speed with a deep, visible sense of heart and purpose. You are a natural "strike team" because {a} provides the raw drive and {b} provides the passionate soul. To keep your energy sustainable, make sure to celebrate your loyalty to each other after a major push. Recognizing your shared commitment prevents burnout.',
    withPeople:
      'Together you bring immense courage and conviction to any space, and your bond is honest and deeply alive. You are fiercely loyal to one another. Because you both move with such fire, a simple phrase like "let’s take a breath" acts as a powerful protector for the relationship. It ensures your shared passion stays focused on winning together.',
    gettingBetter:
      'Growth for you is fueled by courage and moral energy, which is a truly inspiring combination. Before your next big push, {b}’s quick check on who is affected helps keep {a}’s instincts connected to your wider impact. Naming one thing you’ll do to protect your energy next time ensures your passion leads to lasting growth and a spine that stays strong.',
  },
  'Heart+Head|Head+Heart+Gut': {
    underPressure:
      'You are an incredibly resilient pair whose value for humane care and wholeness helps you stay remarkably steady when the stakes are high. Under pressure, {a} provides the composure and people-first framing, while {b} masterfully manages every signal at once. By naming which channels to focus on for an hour, you ensure your shared desire for compassion remains a powerful tool for progress.',
    doingWork:
      'You bring both a brilliant focus on morale and a masterful big-picture view to every task, making you an unstoppable team for solving complex puzzles. {a} ensures there is a fair and orderly owner for each choice, while {b} keeps everything perfectly aligned. Picking three clear outcomes and one top priority ensures your wide-lens vision fuels your momentum.',
    withPeople:
      'You provide a wonderful balance of polished structure and a deep, intuitive read on the nuances of any relationship. {a} holds the steady, humane line, while {b} sees the rich details that others might miss, making your bond exceptionally smart and supportive. Seeing any flagged risk as helpful data ensures your combined wisdom stays a constant source of strength.',
    gettingBetter:
      'Growing together is a rewarding experience because you offer both incredible relational depth and impressive intellectual range. You have an appetite for learning that is truly inspiring. By picking one shared focus for the month, you turn your natural ambition into sustainable progress. Celebrating when {a}’s care and {b}’s range show up in the same win helps you appreciate your unique impact.',
  },
  'Gut+Head|Head+Heart+Gut': {
    underPressure:
      'You are a pair that values both decisive control and total system awareness, which makes you very thorough under fire. Under pressure, {a} cuts through the noise with immediate, logical action, while {b} holds the whole picture. Trading off who holds the vision and who drives the next step in hourly slices gives you both some relief and keeps the project moving incredibly fast.',
    doingWork:
      'When deciding how to act, {a} pulls you forward with a clear backbone, while {b} fits the details together. To keep moving without stalling, try to put a time limit on your alignment talks. Spending thirty minutes on getting on the same page and then letting {a} push the action until the next check-in ensures your desire for a complete view supports your incredible speed.',
    withPeople:
      'With people, you bring both commanding motion and a deep read on subtext. {a} carries the drive and directness, and {b} carries the complex signal. When a risk is named by {b}, {a} should see it as helpful data about how the pair is doing together. It is not an attempt to slow things down, but a way to keep the bond secure and the path clear.',
    gettingBetter:
      'Learning for you is a perfect mix of reps, shipping, and deep synthesis. Picking one shared theme per month prevents {b}’s breadth from becoming noise against {a}’s speed. At the end of the month, ask if that theme actually improved how you show up together. If it just became a box-ticking exercise, feel free to retire it and try something more vital.',
  },
  'Gut+Heart|Head+Heart+Gut': {
    underPressure:
      'You are both high-conviction and high-awareness, which makes you a deeply formidable team. Under pressure, {a} leads with high-intensity fire and loyalty, while {b} holds the whole picture. Naming this tempo clash out loud—where {a} sprints to protect and {b} maps out all fronts—helps you stay aligned. Agreeing on what can wait until after the crisis allows your shared energy to focus on the solution.',
    doingWork:
      'When deciding how to move, you bring both immense passion and a balanced drive to the situation. Putting your basic plan on a single page before you act helps a lot. It ensures that {b}’s deep view supports {a}’s speed and heart, allowing you to move decisively together without having to argue about every single detail as you go.',
    withPeople:
      'With people, you provide both vibrant protection and full-system orchestration. Your combined wattage is high and fills the whole space. Sometimes, a bit of silence after a big question is the best opening you can give each other. What is left after a strong joint stance is usually the real read on how you are doing together.',
    gettingBetter:
      'In growth, you offer each other incredible courage and total integration. Rotating who picks the "growth edge" each month keeps your development fresh. When courage is the focus, {b} stays patient with the ambiguity; when integration is the focus, {a} says no to impulsive scope creep. This keeps your growth as balanced as your powerful partnership.',
  },
  'Head+Heart|Gut+Head': {
    underPressure:
      'You are both deeply committed to the team and to a good outcome. Under pressure, {a} optimizes for thoughtful fairness, while {b} pushes forward with direct, calculated moves. Acknowledging that you are both standing up for the group, just from different angles, keeps the pressure from becoming personal. Trusting this joint intent helps you bridge the gap between "stalling" and "reactivity".',
    doingWork:
      'Choices for you are a powerful mix of careful logic and forceful action. {b} is built to move fast and clear, while {a} weighs the options and human impact. For each task, agree who leads the "get it right" side and who leads the "get it moving" side. Reviewing both the next move and the people impact ensures your shared choices matter.',
    withPeople:
      'With people, you provide a beautiful balance of raw edge and polished diplomacy. {b} brings pace and commanding direction, while {a} brings moderation and a steady ear. Seeing your two moves as a single story—one that is both fair and deeply loyal to progress—dissolves the false choice between the two.',
    gettingBetter:
      'Learning for you is about finding both the outcome and the meaning. Having one shared scoreboard and one shared story for each cycle keeps you both honest. After each project, try asking if {b}’s speed cost someone trust or if {a}’s care cost someone clarity. It is a great way to keep your growth balanced.',
  },
  'Heart+Head|Head+Gut': {
    underPressure:
      'You are both aiming for control and an excellent outcome. Under stress, {a} brings composure and focuses on people and process, while {b} optimizes for leverage and quick execution. Recognizing that {a}’s care and {b}’s speed serve a single, balanced strategy helps you turn friction into a brilliantly coordinated response.',
    doingWork:
      'Collaborating as a pair means you mix a drive to finish with an organized plan that considers everyone involved. {b} wants to solve it instantly, and {a} wants to solve it humanely. To stay in sync, split your talks: discuss what you are deciding first, and how you will share that decision second. This ensures neither the goal nor the people are forgotten.',
    withPeople:
      'With people, you bring both efficiency and mediation to the bond. Under stress, it can feel like "edge" meeting "diplomacy." {b} signals competence, and {a} signals thoughtful warmth. Seeing how your moves actually connect and support each other dissolves that false opposition and lets you work as an incredible unified team.',
    gettingBetter:
      'In growth, you offer each other real-world testing and profound context. Try pairing every experiment from {b} with one sentence on its relational impact from {a}. This keeps your learning connected to how it actually felt to be on the receiving end, ensuring you grow both your technical skills and your emotional intelligence together.',
  },
  'Heart+Head|Gut+Head': {
    underPressure:
      'You are an incredibly principled pair because you both want a good outcome but lead with entirely different instincts. Under pressure, {a} looks after the mood and then the logic, while {b} drives the motion and then the logic. The logic is where you eventually meet. Acknowledging that {b} needs action and {a} needs a moment to assess the room helps you find a perfectly unified path forward.',
    doingWork:
      'When you collaborate, you mix a powerful drive to act with a deep need to keep everyone aligned and organized. {b} pushes the pace with clear commands, while {a} smooths out the edges with polished care. Alternating who leads the charge and who leads the communication ensures your shared decisions are both incredibly humane and highly decisive.',
    withPeople:
      'With people, you bring a brilliant balance of edge and grace. {b} provides the direction, and {a} provides the warmth. Any friction usually comes when {b}’s directness is heard as pressure or {a}’s deliberation is heard as stalling. Naming your shared intent out loud—reminding yourselves you both want the best result—keeps the partnership strong.',
    gettingBetter:
      'Learning for you is a rewarding mix of fast iteration and values-based reflection. You gain skills quickly while keeping your standards perfectly intact. Tying {b}’s quick project wins to {a}’s notes on "people impact" ensures your lessons stay whole. Celebrating human wins alongside technical progress keeps your shared speed inspiring and healthy.',
  },
  'Head+Heart|Gut+Heart': {
    underPressure:
      'You are both deeply protective of the team, but {a} uses logic and structure while {b} uses instinct and profound passion. Under pressure, {a} holds care-with-clarity, and {b} brings high-intensity fire and loyalty. Acknowledging that you are both standing up for the group, just in completely different ways, keeps the pressure from feeling personal.',
    doingWork:
      'You are a high-stakes duo because you look after both the people and the bold final result. {a} weighs the options to find fairness, while {b} keeps the energy incredibly high. For each task, agree who leads the "get it right" side and who leads the "make it matter" side. Checking in on both the next move and the human impact ensures real progress.',
    withPeople:
      'With people, you bring both steady moderation and a highly vivid, loyal energy to the bond. {a} provides the fairness, and {b} provides the protective heat. Seeing your two moves as a single story—one that is both beautifully fair and fiercely loyal—is what turns potential conflict into a very strong, integrated partnership.',
    gettingBetter:
      'When improving, you offer each other thoughtful reflection and brilliant conviction. It helps to separate "what needs to change" from "what this means about me." This allows your feedback to update your skills without wounding {b}’s passionate identity or {a}’s sense of care. Comparing notes after a stressful stretch turns your needs into explicit agreements.',
  },
  'Heart+Head|Heart+Gut': {
    underPressure:
      'You are an exceptionally humane and protective pair with a profound gift for staying deeply connected to the team. Under load, {a} brings composed emotional truth and orderly logic, while {b} brings a powerful push for action rooted in that same emotional truth. Because you share that heart-first language, trusting your joint intent helps you bridge the gap between "plan" and "strike".',
    doingWork:
      'Your collaboration is a brilliant powerhouse of heart-led instinct meeting either orderly fairness or high-speed motion. You have a magnificent talent for honoring the people in every decision you make. To keep your momentum high and joyful, try setting a quick window to process the "feeling" phase together before letting {b} lock in the fast path.',
    withPeople:
      'You bring a beautifully supportive and deeply loyal presence to any group, blending the warmth and process of {a} with the vibrant, shielding drive of {b}. Between you, there is a natural grace and immense courage. If you ever find your shared care circling or escalating, making one clean, kind request of each other turns that energy into synchronized forward motion.',
    gettingBetter:
      'Growing together is an inspiring journey because you both see the deep human meaning behind every bit of progress. You are a powerhouse team for finding the "story", the "standard", and the "action". Pairing one narrative of what you learned as a pair with one clear "team rule" for next time ensures your rich reflections turn into powerful habits.',
  },
  'Heart+Head|Gut+Heart': {
    underPressure:
      'You are both aiming for an excellent outcome and a deeply loyal conscience, making you an incredibly principled and vivid pair. Under pressure, {b} drives the motion with immense passion, while {a} brings composure and focuses on people and orderly process. Acknowledging that the "how" is just as vital as the "when" helps you turn any friction into a beautifully balanced response.',
    doingWork:
      'When you collaborate, you are a master team at mixing the drive to act with the need to keep everyone aligned and cared for. You make choices that truly matter. To keep your partnership flexible, alternate who leads the passionate charge and who leads the polished communication. It ensures your shared decisions are as humane as they are decisive.',
    withPeople:
      'With people, you provide a beautiful balance of raw courage and polished diplomacy, bringing both pace and profound nuance to your relationships. You are fiercely loyal to each other. If the pressure spikes, simply naming your shared intent out loud—reminding yourselves you both want the best for the team—keeps your partnership feeling like a unified force.',
    gettingBetter:
      'Learning for you is a rewarding mix of fast, heart-led iteration and wide reflection. You gain skills quickly while keeping your values intact. Try tying {b}’s bold project wins to {a}’s structured "people-impact notes" so your lessons stay whole. Celebrating these human wins alongside your progress ensures your shared speed stays deeply inspiring.',
  },
  'Head+Gut|Gut+Heart': {
    underPressure:
      'You are both built for raw speed and are deeply committed to the team’s success. Under pressure, {a} pushes with logic and an eye for leverage, while {b} pushes with profound loyalty and heat. Acknowledging that you are both pushing for the group, just in totally different languages, keeps the pressure from becoming personal. Separate the logic from the loyalty to find a unified path.',
    doingWork:
      'Choices for you are a powerful mix of precise logic and passionate values. You are both built to move incredibly fast. Agreeing on the specific value you are defending before you argue about how to execute it ensures your debates stay about the method and not about who cares more. You both care deeply; you just lead with different parts of the brain.',
    withPeople:
      'With people, you provide both immense force and vibrant glue to the bond. {a} signals high competence, and {b} signals absolute loyalty. Any bruise usually comes when {b}’s loyalty is heard as pressure or {a}’s logic is heard as coldness. These are issues of language and timing, not a lack of profound commitment to each other.',
    gettingBetter:
      'Learning for you is about finding both the outcome and the emotional meaning. Having one shared scoreboard for {a} and one shared story for {b} keeps you both honest. After each project, ask if your speed cost someone trust or if your care cost someone clarity. It is a brilliant way to keep your growth as balanced as your drive.',
  },
  'Gut+Head|Heart+Gut': {
    underPressure:
      'You are both high-conviction movers who are not afraid of any challenge, making you a very brave and capable team. Under pressure, {b} brings deep feeling and a drive for action, while {a} brings commanding clarity and that same drive for action. You move faster than almost anyone. Naming the crisis as the "shared enemy" keeps you perfectly aligned.',
    doingWork:
      'Acting together joins your incredible speed with a deep, visible sense of purpose and structure. You are a natural "strike team" for difficult situations. {b} leads with heart and hands, and {a} leads with hands and head. To keep your energy sustainable, celebrate your loyalty to each other after a major push. Recognizing your shared commitment prevents burnout.',
    withPeople:
      'Together you bring immense courage and commanding conviction to any space, and your bond is honest and deeply alive. You are fiercely loyal to one another. If the volume gets high, a simple phrase like "let’s take a breath" acts as a powerful protector for the relationship, ensuring your shared passion stays focused on supporting each other.',
    gettingBetter:
      'Growth for you is fueled by courage, moral energy, and structured shipping, which is a truly inspiring combination. Before your next big push, a quick check on who is affected helps keep your powerful instincts connected to your wider impact. After the work is done, naming one thing you’ll do to protect your energy next time ensures a spine that stays strong for the long haul.',
  },
  'Gut+Head|Gut+Heart': {
    underPressure:
      'You are both remarkably high-momentum drivers who want to get things done instantly. Under pressure, {a} pushes with logic and command, while {b} pushes with massive heat and loyalty. Acknowledging that you are both pushing hard for the group, just in different ways, keeps the incredible pressure from becoming personal. Separate the plan from the passion to find a unified path.',
    doingWork:
      'Choices for you are an unstoppable mix of calculated logic and vibrant values. You are both built to move fast. Agreeing on the specific value you are defending before you argue about how to do it ensures your debates stay about the method and not about who cares more. You both care intensely; you just back up your drive with different secondary instincts.',
    withPeople:
      'With people, you provide both commanding force and vibrant, protective glue. {a} signals unshakeable competence, and {b} signals unshakeable loyalty. Any bruise usually comes when {b}’s heat is heard as chaos or {a}’s directness is heard as coldness. Recognizing that these are just two different ways of being fiercely dedicated solves the friction.',
    gettingBetter:
      'Learning for you is a blistering cycle of shipping and reflecting. Having one shared scoreboard for {a} and one shared story for {b} keeps you both honest and grounded. After each rapid project, ask if your speed cost someone trust or if your heat cost someone clarity. It is the best way to keep your growth as balanced as your unstoppable drive.',
  },
  'Head+Gut|Gut+Head': {
    underPressure:
      'You are a powerful pair because you both want to manage risk and keep things moving. You use Head and Gut to navigate, but the order means one of you shows as {a} and the other as {b}. One of you thinks to find the path while the other moves to test the ground. Any tension you feel is usually just a sign of your shared drive to get things right, only at different speeds.',
    doingWork:
      'You are both high-capability drivers who value getting results. At work, one of you maps to {a} and the other to {b} depending on whether instinct or intellect takes the lead. To keep that energy aligned, agree on what "good enough" looks like for the task at hand. By splitting the need to be sure from the need to be fast, you can use your precision and your momentum as a single force.',
    withPeople:
      'Together you carry a natural confidence that people rely on for direction. With others, one of you leans toward {a} and the other toward {b}. The magic happens when you use that collective strength to create space for others too. Adding a brief pause after a firm decision allows your combined sureness to feel like a welcoming invitation rather than a final word.',
    gettingBetter:
      'You are built for progress and have a real talent for spotting what needs to change. Side by side, one of you learns through {a} and the other through {b}. To make the most of this, rotate who captures the takeaways so you see the patterns from both angles. Asking what you would keep and what you would adjust helps you respect each other’s timing and ensures you move at a pace that lasts.',
  },
  'Head+Gut|Heart+Head': {
    underPressure:
      'You both deeply value control and getting an excellent outcome. Under stress, {a} leans on logic and speed, while {b} leans on people and process. Acknowledging that {a} wants to solve the problem and {b} wants to look after the team helps you turn any friction into a wonderfully coordinated response. By leaning on each other, you protect both the plan and the people.',
    doingWork:
      'Collaborating as a pair means you mix a drive to finish with an organized plan that considers everyone involved. {a} wants to solve it instantly, while {b} wants to solve it humanely and fairly. To stay in sync, talk about what you are deciding first, and how you will share that decision second. This ensures neither the goal nor the people are forgotten.',
    withPeople:
      'With people, you bring both efficiency and thoughtful mediation to the bond. Under stress, it can feel like "edge" meeting "diplomacy." {a} signals competence and thrust, and {b} signals thoughtful warmth. Seeing how your moves actually connect and support each other dissolves that false opposition and lets you work as an incredible, unified team.',
    gettingBetter:
      'In growth, you offer each other real-world testing and profound context. Try pairing every experiment from {a} with one sentence on its relational impact from {b}. This keeps your learning connected to how it actually felt to be on the receiving end, ensuring you grow both your technical skills and your emotional intelligence together.',
  },
  'Gut+Head|Head+Heart': {
    underPressure:
      'You both deeply value a good outcome and keeping harm off the table. Under pressure, {a} optimizes for speed and leverage, while {b} optimizes for fairness and thoughtful care. It can look like "reactivity" meeting "stalling," but you are both standing up for the group. Recognizing this shared protectiveness helps you find a wonderfully unified path forward.',
    doingWork:
      'You are a pair that looks after both the final result and the people. When making choices, {a} keeps the energy moving and pushes for action, while {b} weighs the options to find fairness. For each task, agree who leads the "get it moving" side and who leads the "get it right" side. Checking in on both the next move and the human impact ensures that your shared care results in real progress.',
    withPeople:
      'With people, you bring both powerful energy and moderation to the bond. You provide both loyal direction and fairness. Seeing your two moves as a single story—one that is both deeply loyal to progress and totally fair—is what dissolves the false choice between the two. It turns potential conflict into a very strong, integrated partnership.',
    gettingBetter:
      'When improving, you offer each other incredible conviction and thoughtful reflection. It helps to separate "what needs to change" from "what this means about me." This allows your feedback to update your skills without wounding your identity. Comparing notes after a stressful stretch helps you turn your needs into explicit agreements for next time.',
  },
  'Gut+Head|Heart+Head': {
    underPressure:
      'You are an incredibly principled pair because you both want a good outcome but lead with entirely different instincts. Under pressure, {a} drives the motion and then looks for logic, while {b} looks after the mood and then looks for logic. The logic is where you eventually meet. Acknowledging that {a} needs action and {b} needs a moment to assess the room helps you find a perfectly unified path forward.',
    doingWork:
      'When you collaborate, you mix a powerful drive to act with a deep need to keep everyone aligned and organized. {a} pushes the pace with clear commands, while {b} smooths out the edges with polished care. Alternating who leads the charge and who leads the communication ensures your shared decisions are both incredibly humane and highly decisive.',
    withPeople:
      'With people, you bring a brilliant balance of edge and grace. {a} provides the direction, and {b} provides the warmth. Any friction usually comes when {a}’s directness is heard as pressure or {b}’s deliberation is heard as stalling. Naming your shared intent out loud—reminding yourselves you both want the best result—keeps the partnership strong.',
    gettingBetter:
      'Learning for you is a rewarding mix of fast iteration and values-based reflection. You gain skills quickly while keeping your standards perfectly intact. Tying {a}’s quick project wins to {b}’s notes on "people impact" ensures your lessons stay whole. Celebrating human wins alongside technical progress keeps your shared speed inspiring and healthy.',
  },
  'Head+Heart|Heart+Head': {
    underPressure:
      'You are both wired to be helpful and thoughtful, which is a great asset when things get messy. Because your badges are ordered differently, one of you leads as {a} and the other as {b}. Under pressure, one provides the logic while the other senses the mood. You can be a great anchor for each other because you speak the same language, though the clash is often just about which signal, the thought or the feeling, lands first.',
    doingWork:
      'You have the combined ability to cover the whole map, from clear criteria to human impact. In your work, one of you aligns with {a} and the other with {b}. To keep this balance working for you, name who is watching the timeline and who is watching the team energy. That way, your shared care for the work ensures you are supporting each other rather than doing the same invisible job twice.',
    withPeople:
      'You have a natural gift for being both fair and warm in your relationships. With others, one of you reads as {a} and the other as {b}. The strength here is your ability to see the boundaries and the connection at once. If you feel like you are talking past each other, it is usually just your different styles of fairness at play. Being plain about what you see helps keep you both on the same page.',
    gettingBetter:
      'You offer each other the best of both worlds: a sharp read and a steady heart. When you grow together, one of you reaches for {a} and the other for {b}. Before you swap feedback, decide if you want the analytical insight or the relational check-in first. Ending with one clear step and one word on how it feels ensures that both your plans and your people are well looked after.',
  },
  'Heart+Gut|Gut+Heart': {
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

  const a = normalizeComboKey(keyA)
  const b = normalizeComboKey(keyB)
  const ia = ALL_COMBO_KEYS.indexOf(a)
  const ib = ALL_COMBO_KEYS.indexOf(b)
  
  // Align {a} and {b} with the ordered keys in the pairLookupKey string
  const isSwapped = ib < ia;
  const laOrdered = isSwapped ? lb : la;
  const lbOrdered = isSwapped ? la : lb;

  const pk = pairLookupKey(keyA, keyB)
  const template = PAIR_CONTEXT_INSIGHTS[pk]?.[context]
  if (template) return fillPlaceholders(template, laOrdered, lbOrdered)

  if (a === b) {
    return `In this context you both show up as ${la}. That is a rhythm you reinforce in each other, which builds speed and trust. The shadow side is a shared blind spot: what feels obvious to both of you may never get spelled out for anyone outside the pair. Some pairs add a single outside check after big calls, or a phrase they use to surface unstated assumptions before they lock in.`
  }
  return `In this context one of you skews toward ${laOrdered} and the other toward ${lbOrdered}. The friction is rarely bad intent; it is usually two different defaults for pace, care, and what "right" looks like in this slice of life. When those defaults stay unnamed, small moments stack. Making them explicit once, in language you can reuse under stress, often changes more than another argument about the same surface topic.`
}
