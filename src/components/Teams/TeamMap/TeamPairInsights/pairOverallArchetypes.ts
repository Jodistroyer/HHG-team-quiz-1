import type { ArchetypeParts } from '../../../Quiz/overallArchetypes'

/**
 * Pair-voiced natural-default parts for the overall radar section in pair insights.
 * Keys match `getBrainCombination` combo labels (same as OVERALL_ARCHETYPES).
 * Voice: "this pair / they / their / between them" — not "you / your".
 */
export const PAIR_OVERALL_PARTS: Record<string, ArchetypeParts> = {
  'Head Strong': {
    vibe: {
      headline: 'Clear, Analytical & Aligned',
      body:
        'This pair leads with thinking. Their first move in any situation is to understand it together: gather information, weigh options, and build a shared picture before committing.\n\nThat shared analytical instinct creates real alignment. Others trust their reasoning and come to them when something needs to be thought through with care.',
    },
    challenge: {
      headline: 'When thinking becomes a place this pair stays',
      body:
        "Without strong access to Gut or Heart in the pair, they may stall on incomplete information, miss the emotional temperature in the room, or delay the call until the case feels watertight. The tension between them is often about which angle to analyse next, not whether to act.",
    },
    question: {
      headline:
        "Are they letting their thinking serve them, or using it together to avoid the discomfort of moving?",
      body: '',
    },
  },
  'Head + Gut': {
    vibe: {
      headline: 'Fast, Decisive & Effective Together',
      body:
        'This pair thinks clearly and acts boldly. They can assess a situation with rigour, then move on it with confidence, often before others have finished deliberating. That combination makes them highly effective across a wide range of demands.',
    },
    challenge: {
      headline: 'Remembering the human layer',
      body:
        "Both tend to trust analysis and instinct. When the pair doesn't attend to feeling, their best decisions can still land badly on the people involved. Speed and rigour are genuine strengths here; the gap is relational, not intellectual.",
    },
    question: {
      headline:
        'Are they building in a brief shared moment to ask what the human experience of a decision will be before they move?',
      body: '',
    },
  },
  'Head + Heart': {
    vibe: {
      headline: 'Thoughtful, Caring & Trusted',
      body:
        "This pair thinks carefully and cares deeply. They bring both analytical rigour and genuine attentiveness to people. Together, they're likely to be thorough, considerate, and widely trusted.",
    },
    challenge: {
      headline: 'The shared preparation loop',
      body:
        'They analyse, check in on how people are doing, and without something to break the cycle, can stay in preparation longer than the situation needs. Bold, instinctive action may be harder to access between them, especially when a decision is unpopular or time is short.',
    },
    question: {
      headline:
        "Are they using their care and rigour to move well, or using them together to avoid moving at all?",
      body: '',
    },
  },
  'Heart Strong': {
    vibe: {
      headline: 'Warm, Attentive & Relationally Led',
      body:
        'This pair leads with feeling. Their first response to any situation is relational: they notice how people are, what they need, and how things are landing emotionally.\n\nThat shared attentiveness is a real gift to the people around them.',
    },
    challenge: {
      headline: 'When care makes the hard call harder',
      body:
        'What can be harder is holding a firm analytical position under pressure, or making a decisive call when the data is ambiguous. Together, they may also find they accommodate each other past the point that serves either of them, because discomfort in the relationship can feel more urgent than the thing that caused it.',
    },
    question: {
      headline:
        'Can they recognise that clarity and care are not in conflict, and say the direct thing when it matters most?',
      body: '',
    },
  },
  'Heart + Gut': {
    vibe: {
      headline: 'Warm, Direct & Fully Present',
      body:
        "This pair feels deeply and moves quickly. They're responsive, energising, and genuinely motivated by the people they work with, and they back that care with a shared willingness to act.\n\nOthers often experience them as warm, direct, and fully present.",
    },
    challenge: {
      headline: 'Balancing shared speed with structure',
      body:
        'Feeling and instinct together can move faster than thinking. They may commit before fully assessing, or act on what feels right without asking whether it has been thought through. Analytical rigour may also come slower here, not because they are incapable of it, but because it can feel slower or colder than how they naturally operate together.',
    },
    question: {
      headline:
        'Are they bringing enough structure to match their shared energy, so that what they are trying to do for people actually lands the way they intend?',
      body: '',
    },
  },
  'Heart + Head': {
    vibe: {
      headline: 'Caring First, Clear Second',
      body:
        "This pair leads with care and backs it with thinking. People come first for them, and once the relational ground feels solid, they bring genuine analytical depth to whatever they're working on.\n\nTogether, they tend to be trusted both as people and as thinkers.",
    },
    challenge: {
      headline: 'When safety and certainty both say wait',
      body:
        'Heart first and Head second can mean a significant amount of shared energy goes toward making sure everyone is okay before they feel free to move. Their need for relational safety and analytical certainty can reinforce each other, giving both reasons to wait when the situation is calling for action.',
    },
    question: {
      headline:
        "Are they giving themselves permission to trust both their care and their thinking enough to move?",
      body: '',
    },
  },
  'Gut Strong': {
    vibe: {
      headline: 'Instinctive, Confident & Compelling',
      body:
        "This pair leads with instinct. They read situations quickly, back their own judgment, and move with a shared confidence that others often find compelling. Between them, they don't need complete information to act.",
    },
    challenge: {
      headline: 'When shared instinct outruns wisdom',
      body:
        "They may act before fully understanding a situation, or make calls that are directionally right but land harder than needed because neither attended to the human dimension. When their instinct is challenged, the pair's first response may be confidence rather than curiosity, and that dynamic can reinforce itself.",
    },
    question: {
      headline:
        'Are they trusting themselves, or closing themselves off when someone pushes back?',
      body: '',
    },
  },
  'Gut + Head': {
    vibe: {
      headline: 'Bold, Rigorous & Credible',
      body:
        "This pair acts boldly and thinks rigorously. Together, they're both decisive and credible. They make the call and can back it up, which means others tend to follow their direction and trust the ground they've covered.",
    },
    challenge: {
      headline: 'Effective without always feeling warm',
      body:
        "Over time, the gap tends to show up in how people experience working with or around them, even when the outcomes are strong. The pair's shared instinct and analysis can land on people rather than with them.",
    },
    question: {
      headline:
        'Are they building in the relational awareness that makes their speed and rigour feel collaborative rather than directive?',
      body: '',
    },
  },
  'Gut + Heart': {
    vibe: {
      headline: 'Fast, Caring & Fully Present',
      body:
        "This pair moves fast and cares genuinely. Together, they're energising, loyal, and highly responsive to the people around them.\n\nThey bring real presence to whatever they're doing, and others tend to feel it.",
    },
    challenge: {
      headline: 'When energy bypasses thinking',
      body:
        "Instinct and feeling together can bypass thinking. They may commit quickly, underestimate complexity, or find themselves in situations that energy and care alone can't resolve. They're also more likely to over-extend, saying yes to too much because both the instinct to act and the desire to help are strong between them.",
    },
    question: {
      headline:
        'Are they bringing enough structure and analytical grounding to convert their shared energy into sustainable results, not just good intentions and momentum?',
      body: '',
    },
  },
  'Head + Heart + Gut': {
    vibe: {
      headline: 'Range Across Thinking, Feeling & Action',
      body:
        'This pair has access to all three centres: analytical depth, relational warmth, and instinctive confidence. That range is a genuine strength. Together, they can think, feel, and act, and have the capacity to navigate almost any kind of situation.',
    },
    challenge: {
      headline: 'When three centres pull in different directions',
      body:
        'Different centres may pull in different directions, and under pressure the pair may default strongly to one and lose access to the others. Others can also find them harder to read, because there is no single dominant mode to anchor on.',
    },
    question: {
      headline:
        'Are they using what they have with intention, choosing which centre to lead from together rather than being pulled between them?',
      body: '',
    },
  },
}
