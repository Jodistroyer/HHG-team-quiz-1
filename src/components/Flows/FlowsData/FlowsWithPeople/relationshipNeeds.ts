import type { FlowSituation } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const RELATIONSHIP_NEEDS_SITUATION_ID = 'relationship-needs' as const

export const relationshipNeedsFlowSituation: FlowSituation = {
  id: RELATIONSHIP_NEEDS_SITUATION_ID,
  title: 'Relationship needs',
  cardTitle: 'Relationship needs',
  cardDescription: 'Express what you need in a way your partner can hear.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Logic → Vulnerability → Request',
      whyThisOrder:
        'Humanizes the Data: You know what is missing logically, but your partner needs to hear the feeling behind the fact before they can commit to a change.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Lead with the logical gap',
          body:
            'State the fact of the situation without blame. Identify what is missing in the routine or the dynamic. Starting with logic helps you feel grounded and clear before the conversation gets personal.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Reveal the personal impact',
          body:
            'Explain why this logical gap matters to you emotionally. Use "I feel" statements to show that this is not just a project to manage but a need for connection. This invites your partner to care rather than just comply.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Make a clear request',
          body:
            'End with a specific call to action. Instead of leaving the need open for interpretation, tell your partner exactly what "good" looks like. This gives your body and theirs a definitive direction to move in.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Strategy → Action → Intimacy',
      whyThisOrder:
        'Leads with Purpose: You lead with the "why" and a clear plan of action, then circle back to ensure the connection remains warm and prioritized.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Explain the strategy',
          body:
            'Briefly outline the big picture of why this change is good for the relationship. When you provide a "why" that serves the team, it prevents your partner from feeling like they are being criticized.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Propose the immediate shift',
          body:
            'Suggest one physical change that can happen right now. Taking immediate action satisfies your need for progress and proves that the conversation is actually leading somewhere tangible.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Affirm the bond',
          body:
            'Finish by emphasizing your commitment. Remind your partner that this request comes from a place of wanting to be closer to them. This ensures the "Gut" action does not feel cold or mechanical.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Observation → Feeling → Ask',
      whyThisOrder:
        'Translates Thought to Motion: You are great at identifying the need and feeling it, but you must bridge into a specific, tangible "ask" to get results.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Share your observation',
          body:
            'State what you have noticed lately. By starting with a calm observation, you bypass the "defensive" response and establish a shared reality with your partner.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Voice the underlying feeling',
          body:
            'Connect that observation to your heart. Tell them how the current situation affects your sense of security or joy. This provides the emotional weight needed to make the request significant.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'State the tangible ask',
          body:
            'Translate the feeling into a physical task. Give your partner a "win" by telling them exactly what they can do to meet the need. This moves the conversation out of the clouds and into reality.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Emotion → Context → Direction',
      whyThisOrder:
        'Provides a Map for the Heart: You know you are unhappy; adding the "Head" (context and facts) helps your partner understand how to actually help you.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Share the emotion first',
          body:
            'Open with your current emotional state. Being honest about your feelings right away prevents them from building up and coming out as frustration or passive aggression later in the talk.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Provide the "Map"',
          body:
            'Give your partner the context. Explain the sequence of events that led to the feeling. This helps their "Head" understand the "Heart" without getting lost in the intensity of the emotion.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Give a simple direction',
          body:
            'End with a straightforward "I need" statement. Keep it simple and direct so your partner does not have to guess how to soothe the emotion you just shared.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Feeling → Impact → Structure',
      whyThisOrder:
        'Channels Passion into Progress: You lead with the raw need, move into the desired change, and finish with a logical "how this works for us."',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Express the raw need',
          body:
            'Start with the core of the matter. Speak from your gut level feelings about what you need to feel loved or safe. Your passion is your strength here; use it to show that this matters.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Describe the impact of change',
          body:
            'Tell them how your behavior or the relationship energy will improve once this need is met. Focusing on the "impact" keeps the conversation moving forward toward a better future.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Suggest a logical structure',
          body:
            'Finish by outlining how this fits into your daily life. "Maybe we try this on Tuesdays" or "Let us check in after a week." Adding structure prevents the "Heart" from feeling overwhelmed by the "Gut" move.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Expression → Reasoning → Resolution',
      whyThisOrder:
        'Clears the Fog: Expressing the feeling first prevents the logic from becoming a defense mechanism. It allows the need to be heard clearly.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Lead with authenticity',
          body:
            'Tell your partner: "I want to share something that has been on my heart." Starting here ensures that you do not accidentally lead with a "Head" lecture that creates distance.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Explain your reasoning',
          body:
            'Share the "why" behind the need. Walk them through your thought process so they can see that your need is valid and well considered, not just a passing mood.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Ask for a resolution',
          body:
            'Request a firm "yes" or "no" or a counter proposal. Pushing for a resolution ensures that your feelings are not just heard, but are actually integrated into the relationship\'s future.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Gut → Head → Heart → Gut',
      coreFunctions: 'Presence → Evidence → Connection → Outcome',
      whyThisOrder:
        'Softens the Command: You naturally want to just "fix it." Leading with calm presence and facts makes your need feel like a partnership, not an order.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Ground your presence',
          body:
            'Sit with your partner and stay physically present. Your silent, grounded energy is powerful. Use it to signal that this is an important, safe conversation, not a confrontation.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Present the evidence',
          body:
            'List the specific instances where the need was not met. Using clear "evidence" prevents the conversation from becoming an emotional "he said, she said" and keeps it focused on facts.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Bridge the connection',
          body:
            'Softly explain that you are bringing this up because you value the relationship. A small "Heart" gesture like taking their hand softens the weight of your "Gut" presence.',
        },
        {
          brain: 'Gut',
          label: 'Step 4',
          title: 'Define the outcome',
          body:
            'State exactly what you want to happen next. Your natural ability to lead is a gift here; use it to provide a clear path forward for both of you.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Clarity → Movement → Bonding',
      whyThisOrder:
        'Architects the Change: By starting with the "Head" (Clarity), you ensure your "Gut" (Movement) is pointed in a direction that actually serves the relationship.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Define the goal clearly',
          body:
            'Start by telling them exactly what you want to discuss. Providing a "headline" for the conversation allows your partner\'s brain to prepare so they do not feel blindsided.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Model the movement',
          body:
            'Show them what you are willing to do on your end. Leading with your own "Gut" action encourages them to follow suit and makes the request feel like a mutual evolution.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Celebrate the bond',
          body:
            'Finish by expressing gratitude for their willingness to listen. Ending on a "Heart" note ensures that your "Head" and "Gut" strategy leaves the relationship feeling closer, not just more efficient.',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Regulate → Motivate → Organize',
      whyThisOrder:
        'Soothes Before Moving: Starting with the "Heart" ensures you are not making demands out of frustration, allowing for a structured, peaceful request.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Regulate the atmosphere',
          body:
            'Start with a check in on how you both are feeling. Ensuring the "Heart" is settled first prevents your "Gut" from making demands that sound like ultimatums.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Motivate the change',
          body:
            'Use your natural energy to inspire a better way of doing things. Talk about the "win" for both of you. Your enthusiasm can be the fuel that makes your partner want to meet your need.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Organize the request',
          body:
            'Finish by putting the request into a clear, understandable format. "So, the plan is X." This ensures that the high energy of the "Gut" does not lead to confusion about what was actually agreed upon.',
        },
      ],
    },
    balanced: {
      archetype: 'Sovereign',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Analysis → Affection → Action',
      whyThisOrder:
        'Finalizes the Intent: You see all angles; this sequence ensures you do not get lost in "considering" and actually deliver your request.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Acknowledge the situation',
          body:
            'Gently describe what has been happening in the relationship. Keep it fair and grounded, showing you understand both sides and are not blaming.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Express care and meaning',
          body:
            'Share how you feel and why the relationship matters to you. Connect your need to your care for them and the bond you are building together.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'State your need clearly',
          body:
            'Ask for one specific change or action that would help you feel better. Keep it simple and direct, so your partner knows exactly how to show up for you.',
        },
      ],
    },
  },
}
