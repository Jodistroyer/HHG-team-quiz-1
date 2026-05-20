import type { ArchetypeParts } from '../../../Quiz/overallArchetypes'

/**
 * Team-voiced natural-default parts for the overall radar section in group insights.
 * Keys match `getBrainCombination` combo labels (same as TEAM_ARCHETYPES).
 * Voice: "this team / the team / they / their" — not "you / your".
 */
export const GROUP_OVERALL_PARTS: Record<string, ArchetypeParts> = {
  'Head Strong': {
    vibe: {
      headline: 'Rigorous, Evidence-Led & Consistent',
      body:
        'This team thinks rigorously and values evidence above all else. It produces thorough, well-reasoned output and tends to be consistent and reliable in its approach.\n\nOthers trust its reasoning and come to it when something needs to be thought through with care.',
    },
    challenge: {
      headline: 'When thinking becomes a place the team stays',
      body:
        'With less access to Heart and Gut, the team may underweight the human and instinctive dimensions of situations. Decisions can be technically sound but miss what people need, or take longer than the moment allows. The risk is not bad thinking; it is thinking past the point where thinking is still useful.',
    },
    question: {
      headline:
        'Is the team letting its thinking serve it, or using it to avoid the discomfort of moving?',
      body: '',
    },
  },
  'Head + Gut': {
    vibe: {
      headline: 'Decisive, Capable & Hard to Rattle',
      body:
        'This team knows how to think and how to move. Head provides structure and rigour; Gut provides the confidence to act on incomplete information. Together they produce a team that is capable, efficient, and hard to rattle.',
    },
    challenge: {
      headline: 'Effective without always bringing people with them',
      body:
        'With less Heart, the team may underweight the relational and emotional dimensions of its work. Decisions can be well-reasoned and boldly executed but still land badly on the people affected. The risk is not incompetence; it is working efficiently without always bringing people with them.',
    },
    question: {
      headline:
        'Are they building in a brief shared moment to ask what the human experience of a decision will be before they move?',
      body: '',
    },
  },
  'Head + Heart': {
    vibe: {
      headline: 'Thoughtful, Caring & Widely Trusted',
      body:
        'This team thinks carefully and cares deeply. It tends to produce well-considered decisions that take people into account, and is likely to be trusted by those around it.',
    },
    challenge: {
      headline: 'The shared preparation loop',
      body:
        'The missing Gut centre means boldness can be harder to access, particularly when speed matters or when a decision is unpopular. Head and Heart together can create a loop: the team analyses, checks how everyone is feeling, and without something to break the cycle, can stay in preparation longer than it needs to.',
    },
    question: {
      headline:
        'Are they using their care and rigour to move well, or using them to avoid moving at all?',
      body: '',
    },
  },
  'Heart Strong': {
    vibe: {
      headline: 'Relational, Attentive & Trust-Building',
      body:
        'This team is genuinely relational and attuned to how people feel. It is skilled at building trust and committed to creating an environment where others feel safe and valued.\n\nThat shared attentiveness is a real gift to the people around them.',
    },
    challenge: {
      headline: 'When care becomes the primary lens',
      body:
        'With less Head and Gut, structured analysis and bold decisiveness can be harder to access. Caring can become the primary lens through which all decisions are made, making it harder to be rigorous, direct, or fast when the situation calls for it.',
    },
    question: {
      headline:
        'Can they recognise that clarity and care are not in conflict, and say the direct thing when it matters most?',
      body: '',
    },
  },
  'Heart + Gut': {
    vibe: {
      headline: 'Energetic, Loyal & Bias to Action',
      body:
        "This team moves with heart and speed. It's energising to be around, builds loyalty quickly, and tends to get things done without needing much external push.\n\nOthers often experience them as warm, direct, and fully present.",
    },
    challenge: {
      headline: 'When effort moves faster than thinking',
      body:
        'With less Head, the team may underinvest in analytical rigour, structured planning, and objective evaluation of options. Effort and intent can move faster than thinking, and the team may find itself in situations it has not fully prepared for.',
    },
    question: {
      headline:
        'Are they bringing enough structure to match their shared energy, so that what they are trying to do for people actually lands the way they intend?',
      body: '',
    },
  },
  'Heart + Head': {
    vibe: {
      headline: 'People Conscious, Clear & Trusted',
      body:
        "This team puts people first and thinks things through well. It tends to be trusted both for its analytical competence and for its genuine attentiveness to the humans involved.",
    },
    challenge: {
      headline: 'When safety and certainty both say wait',
      body:
        'With less Gut, bold, instinctive action can be harder to access, particularly when speed matters, when decisions are unpopular, or when the right call is uncomfortable to make. Heart first and Head second can mean significant energy goes toward making sure everyone is okay before the team feels free to move.',
    },
    question: {
      headline:
        'Are they giving themselves permission to trust both their care and their thinking enough to move?',
      body: '',
    },
  },
  'Gut Strong': {
    vibe: {
      headline: 'Instinctive, Confident & Momentum-Led',
      body:
        "This team doesn't wait. It reads situations quickly, backs its own judgment, and gets things moving. That confidence is a genuine asset, particularly in fast-moving or high-uncertainty environments.",
    },
    challenge: {
      headline: 'When conviction moves ahead of understanding',
      body:
        'With less Head and Heart, the team may underinvest in analytical rigour and relational attentiveness. Conviction can move ahead of understanding, and the impact on people may go unregistered until it becomes a problem.',
    },
    question: {
      headline:
        'Are they trusting themselves, or closing themselves off when someone pushes back?',
      body: '',
    },
  },
  'Gut + Head': {
    vibe: {
      headline: 'Bold, Rigorous & Highly Effective',
      body:
        'This team has both the capacity to think well and the willingness to act boldly. Gut provides speed and conviction; Head provides structure and rigour. Together they produce a team that is highly effective across complex, fast-moving environments.',
    },
    challenge: {
      headline: 'Strong outcomes without always feeling collaborative',
      body:
        'With less Heart, the team may underweight the relational and emotional dimensions of its work. Decisions can be excellent in quality and execution but still land badly because the people dimension was not sufficiently attended to.',
    },
    question: {
      headline:
        'Are they building in the relational awareness that makes their speed and rigour feel collaborative rather than directive?',
      body: '',
    },
  },
  'Gut + Heart': {
    vibe: {
      headline: 'Responsive, Warm & Bias to Action',
      body:
        'This team brings energy, warmth, and a bias toward action. It builds loyalty quickly, responds fast to what is in front of it, and genuinely cares about the people around it.',
    },
    challenge: {
      headline: 'When energy bypasses thinking',
      body:
        'With less Head, the team may underinvest in analytical rigour, structured planning, and objective evaluation of options. Effort, intent, and relationship can move faster than thinking, and the team may find itself in situations it has not fully prepared for, despite genuinely trying.',
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
        'This team has access to everything: analytical depth, relational warmth, and instinctive confidence. That range is a genuine strength. The team can think, connect, and act, and has the capacity to navigate almost any kind of challenge.',
    },
    challenge: {
      headline: 'When three centres pull in different directions',
      body:
        'The risk is not absence but friction. Each centre brings a different default lens, and without shared language and intentional coordination, this diversity can generate as much tension as insight.',
    },
    question: {
      headline:
        'Are they using what they have with intention, choosing which centre to lead from rather than being pulled between them?',
      body: '',
    },
  },
}
