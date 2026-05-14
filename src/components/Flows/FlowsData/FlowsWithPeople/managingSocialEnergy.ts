import type { FlowSituation } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const MANAGING_SOCIAL_ENERGY_SITUATION_ID = 'managing-social-energy' as const

export const managingSocialEnergyFlowSituation: FlowSituation = {
  id: MANAGING_SOCIAL_ENERGY_SITUATION_ID,
  title: 'Managing social energy',
  cardTitle: 'Managing social energy',
  cardDescription: 'Stay present without burning out.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Assessment → Connection → Presence',
      whyThisOrder:
        'Validates the Environment: You analyze the room first. By checking the logic and safety (Head) and finding a "Why" (Heart), you can commit to being physically present without overthinking.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Analyze the logic of the room',
          body:
            'Take 30 seconds to observe the layout and the vibe. Understanding the "rules" of the space lowers your cortisol and allows your brain to stop scanning for threats.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Define your "Why"',
          body:
            'Find a reason to care about being there. Whether it is supporting a friend or learning one new thing, giving the event a purpose shifts you from a critic to a participant.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Drop into the physical space',
          body:
            'Once the logic and purpose are settled, take a deep breath and uncross your arms. Trust that your preparation is enough and let your physical presence take over.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Strategy → Boundary → Empathy',
      whyThisOrder:
        'Establishes the Container: You need a plan. Setting a time limit (Head) and a hard exit (Gut) allows you to relax enough to actually be empathetic to others.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Set a clear time container',
          body:
            'Decide exactly how long you will stay. Having a defined "end point" in your mind prevents the feeling of being trapped and keeps your strategic mind at ease.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Identify your exit strategy',
          body:
            'Locate the door and know your "hard out." Once your physical safety and autonomy are secured by your Gut, the pressure to perform vanishes.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Offer genuine empathy',
          body:
            'Now that you know you can leave whenever you want, you have the surplus energy to actually listen. Use this freedom to be fully available to the person in front of you.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Intention → Relatability → Engagement',
      whyThisOrder:
        'Prioritizes Depth over Surface: You thrive on deep talks. Clarifying your intent helps you avoid small talk and jump into real connection and active participation.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Clarify your intention before you walk in',
          body:
            'Ask yourself: what do I actually want from this? Not what you should want. What you genuinely need. One sentence is enough.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Find one real point of connection',
          body:
            'You do not need to connect with everyone. Find one person whose energy feels real and anchor yourself there. Let the rest come naturally.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Commit to being physically present',
          body:
            'Stop thinking about the exit. Put your phone away. Let your body signal "I am here." The conversation will follow.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Affinity → Logic → Boundary',
      whyThisOrder:
        'Protects Personal Energy: You feel everyone\'s energy. Leading with Heart builds warmth, but you must use the Head to remind yourself that you are not responsible for everyone\'s "vibe."',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Lead with warmth',
          body:
            'Start with a genuine compliment or a kind observation. Opening with your natural warmth sets a positive tone for the interaction before you even say a word.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Apply logical detachment',
          body:
            'Remind yourself that you are not a sponge. Use your Head to realize that someone else\'s bad mood or awkward energy is their responsibility, not yours to "fix."',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Set an energetic boundary',
          body:
            'Check in with your body. If you feel drained, take a step back or grab a drink. Use your physical position to protect your internal peace.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Vulnerability → Action → Perspective',
      whyThisOrder:
        'Mobilizes the Emotion: You lead with feeling. Moving into the "doing" (Gut) helps you channel that energy, while the Head keeps you from getting too swept up in the moment.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Acknowledge the feeling',
          body:
            'Identify the dominant emotion you are bringing into the space. Naming it allows you to lead with authenticity rather than performing a role.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Channel the energy into action',
          body:
            'Do not just stand there with your feelings. Move. Help with the food, start a game, or walk over to someone. Physical movement prevents emotional stagnation.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Gain external perspective',
          body:
            'Zoom out. Use your mind to look at the "big picture" of the event. This prevents you from getting lost in a single emotional moment or interaction.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Authenticity → Structure → Delivery',
      whyThisOrder:
        'Synthesizes Thought and Feeling: You connect through shared experience. Organizing your thoughts (Head) helps you express your heart clearly without getting overwhelmed.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Check for authenticity',
          body:
            'Before speaking, ensure your words match your internal state. If you are tired, do not pretend to be high energy. People connect with the truth, not the mask.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Structure your expression',
          body:
            'Take the big "feeling" you have and give it a beginning, middle, and end. Organizing your thoughts makes your deep insights more accessible to others.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Deliver with confidence',
          body:
            'Speak from your center. Once your heart and head are aligned, trust your body to carry the message. Stand tall and let your voice be heard.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Grounding → Observation → Warmth',
      whyThisOrder:
        'Grounds the Observation: You feel the physical weight of a room. Grounding yourself first (Gut) allows you to observe the facts so you can choose to be warm on your own terms.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Ground your feet',
          body:
            'Feel the floor beneath you. By rooting yourself physically, you stop the Gut\'s instinct to react or "charge" into the room, creating a sense of internal stability.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Observe the facts',
          body:
            'Move from "feeling" the room to "seeing" the room. Count the people, look at the colors, and note the facts. This moves you from reactive instinct to calm observation.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Choose to be warm',
          body:
            'Now that you are grounded and clear, move into Heart. Offer a smile or a handshake on your own terms, rather than as a knee-jerk social reaction.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Position → Clarity → Softness',
      whyThisOrder:
        'Secures the Perimeter: You show up to "do" a role. Establishing your physical space and clear goals allows you to eventually "lower the guard" for emotional connection.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Claim your space',
          body:
            'Find a physical spot where you feel secure. Whether it is a corner or a seat at the table, establishing your "perimeter" allows your nervous system to settle.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Clarify your role',
          body:
            'Define what you are there to "do." Having a specific task or objective gives your Head a track to run on, which prevents social anxiety from creeping in.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Lower the guard',
          body:
            'Once your space and role are secure, allow yourself a moment of vulnerability. Ask a personal question or share a small story to bridge the gap to others.',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Gut → Heart → Head',
      coreFunctions: 'Pacing → Regulation → Strategy',
      whyThisOrder:
        'Regulates the Tempo: You react fast. Pacing your physical energy (Gut) and checking your emotions (Heart) prevents you from crashing mid-event.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Pace your breathing',
          body:
            'Slow down. Your instinct is to move at 100mph. By forcing your body to slow down, you prevent the "Gut burnout" that happens 20 minutes into an event.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Monitor your emotional "temp"',
          body:
            'Check in: are you excited or just overstimulated? Distinguishing between the two helps you stay regulated and prevents you from overwhelming others.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Apply a social strategy',
          body:
            'Use your mind to decide who to talk to next. Instead of just reacting to whoever is closest, use a bit of logic to guide your high energy toward meaningful targets.',
        },
      ],
    },
    balanced: {
      archetype: 'Sovereign',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Synthesis → Harmony → Participation',
      whyThisOrder:
        'Integrates the Perspective: You see all the dynamics. Aligning your thoughts and feelings allows you to move into the social space with total, unhesitating presence.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Read the room',
          body:
            'Pick up three quick cues: who is leading the interaction, the overall energy level, and how people are taking turns speaking. Focus only on these signals to get a clear read of the situation.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Match the energy',
          body:
            'Adjust one or two things to align with the group such as your volume, pace, or expression. Mirror the general tone so you feel in sync without forcing it.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Step in and engage',
          body:
            'Enter with a simple action within a few seconds. Add a short comment, respond to what was just said, or physically move closer into the circle. Keep it direct so you shift from observing to participating.',
        },
      ],
    },
  },
}
