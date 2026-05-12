/**
 * Flows: types and placeholder content.
 *
 * Real copy/sequences will be authored later. The shapes below are designed to
 * mirror the existing quiz structure (4 contexts, brain types Head/Heart/Gut)
 * so flows can later be derived from a user's quiz result.
 */

export type FlowContextId = 1 | 2 | 3 | 4

export type BrainType = 'Head' | 'Heart' | 'Gut'

export type BrainTypeVariantId =
  | 'head-strong'
  | 'head-gut'
  | 'head-heart'
  | 'heart-strong'
  | 'heart-gut'
  | 'heart-head'
  | 'gut-strong'
  | 'gut-head'
  | 'gut-heart'
  | 'balanced'

/** A single step in a 3-step flow sequence (one Head, one Heart, one Gut). */
export interface FlowSequenceStep {
  brain: BrainType
  /** Short label under the number circle (e.g. "Intention"). */
  label: string
  /** Step heading (e.g. "Clarify your intention before you walk in"). */
  title: string
  /** One-paragraph description of how to do this step. */
  body: string
}

export interface FlowVariant {
  /** Archetype name for this brain combo (e.g. "Thinker"). */
  archetype: string
  negotiationOrder: string
  coreFunctions: string
  whyThisOrder: string
  steps: FlowSequenceStep[]
}

/** A specific situation within a context (e.g. "Managing social energy"). */
export interface FlowSituation {
  id: string
  /** Tab label in the detail view. */
  title: string
  /** Card title in the browse grid (usually a longer "How to..." sentence). */
  cardTitle: string
  /** Optional one-line description shown under the card title. */
  cardDescription?: string
  /** Used for "X min read" meta line on cards. */
  readMinutes: number
  /** Always 3 steps in Head/Heart/Gut order (re-orderable later per brain type). */
  sequence: FlowSequenceStep[]
  /** "Why this order works for you" callout text. */
  whyText: string
  /** Optional per-brain-combo variants (order, why, and steps). */
  variants?: Partial<Record<BrainTypeVariantId, FlowVariant>>
}

/** A high-level context: matches the 4 quiz contexts. */
export interface FlowContext {
  id: FlowContextId
  /** Short label (e.g. "Under Pressure"). Matches QUIZ_SECTIONS title. */
  title: string
  /** Page title shown above the situation tabs (e.g. "High-stress situations"). */
  pageTitle: string
  /** One-line context description (matches SECTION_CONTEXT_BY_ID). */
  contextLine: string
  situations: FlowSituation[]
}

const PLACEHOLDER_BODY =
  'Placeholder copy. Replace with real guidance for this step.'

const PLACEHOLDER_WHY =
  'Placeholder explanation of why this order works best for your brain type.'

function makeSequence (
  labels: [string, string, string] = ['Step label', 'Step label', 'Step label']
): FlowSequenceStep[] {
  return [
    { brain: 'Head', label: labels[0], title: 'Step title goes here', body: PLACEHOLDER_BODY },
    { brain: 'Heart', label: labels[1], title: 'Step title goes here', body: PLACEHOLDER_BODY },
    { brain: 'Gut', label: labels[2], title: 'Step title goes here', body: PLACEHOLDER_BODY },
  ]
}

function makeSituation (id: string, title: string, cardDescription?: string): FlowSituation {
  return {
    id,
    title,
    /* Placeholder: in real content this is a longer "How to ..." sentence. */
    cardTitle: title,
    cardDescription,
    readMinutes: 1,
    sequence: makeSequence(),
    whyText: PLACEHOLDER_WHY,
  }
}

export const FLOW_CONTEXTS: FlowContext[] = [
  {
    id: 1,
    title: 'Under Pressure',
    pageTitle: 'High-stress situations',
    contextLine: 'Time is tight, stakes are high, and consequences are immediate.',
    situations: [
      {
        id: 'speaking-to-authority',
        title: 'Speaking to authority',
        cardTitle: 'Speaking to authority',
        cardDescription: 'Stay clear and steady under scrutiny.',
        readMinutes: 1,
        sequence: makeSequence(),
        whyText: PLACEHOLDER_WHY,
        variants: {
          'head-strong': {
            archetype: 'Thinker',
            negotiationOrder: 'Head → Heart → Gut',
            coreFunctions: 'Logic → Diplomacy → Stance',
            whyThisOrder:
              'Validates the Logic: You rely on data. Leading with logic ensures you’re right, but adding Heart makes you likable to the authority, making your final ask (Gut) harder to refuse.',
            steps: [
              {
                brain: 'Head',
                label: 'Step 1',
                title: 'Audit your logic',
                body:
                  'Double check your data and your “proof.” Authority figures respect competence above all else. When you lead with a bulletproof logical case, you establish yourself as a peer in intellect, which builds immediate professional respect.',
              },
              {
                brain: 'Heart',
                label: 'Step 2',
                title: 'Apply diplomatic warmth',
                body:
                  'Once you have proven you are right, soften the delivery. Acknowledge the other person’s challenges or goals. This prevents you from appearing like a cold machine and makes the authority figure want to support you because they like the “human” behind the data.',
              },
              {
                brain: 'Gut',
                label: 'Step 3',
                title: 'Take a firm stance',
                body:
                  'Now that you are respected and liked, state your final position. Don’t backtrack or over-explain. Use a steady voice and calm body language to show that while you are collaborative, you are also firm in your requirements.',
              },
            ],
          },
          'head-gut': {
            archetype: 'Tactician',
            negotiationOrder: 'Head → Gut → Heart',
            coreFunctions: 'Objectives → Boundary → Rapport',
            whyThisOrder:
              'Defines the Outcome: You need a goal. Define the outcome first (Head), set your non-negotiables (Gut), and only then soften the blow with a relational connection (Heart).',
            steps: [
              {
                brain: 'Head',
                label: 'Step 1',
                title: 'Define the objective',
                body:
                  'Enter the room with a clear number or outcome in mind. If you don’t have a specific goal, the authority figure’s leverage will pull you off course. Clarity is your best defense against being steamrolled.',
              },
              {
                brain: 'Gut',
                label: 'Step 2',
                title: 'Set your physical boundary',
                body:
                  'Decide on your “walk away” point before you start. Maintain a strong, upright posture. By holding your ground physically, you signal that you are not a subordinate to be managed, but a partner to be negotiated with.',
              },
              {
                brain: 'Heart',
                label: 'Step 3',
                title: 'Build bridge rapport',
                body:
                  'After the terms are discussed, end on a relational note. Mention a shared interest or express gratitude for their time. This leaves the authority figure with a positive “feeling” about you, even if the negotiation was intense.',
              },
            ],
          },
          'head-heart': {
            archetype: 'Diplomat',
            negotiationOrder: 'Head → Heart → Gut',
            coreFunctions: 'Clarity → Empathy → Ask',
            whyThisOrder:
              'Establishes Expert Value: You see the “how” and the “who.” Use clarity to prove your value, empathy to lower their guard, and then firmly state your position.',
            steps: [
              {
                brain: 'Head',
                label: 'Step 1',
                title: 'Lead with clarity',
                body:
                  'State your value proposition clearly and concisely. Avoid jargon or rambling. When you provide high-level clarity, you prove that you respect the authority figure’s time, which is a major component of likability in high-stakes settings.',
              },
              {
                brain: 'Heart',
                label: 'Step 2',
                title: 'Display tactical empathy',
                body:
                  'Listen more than you speak. Validate their concerns by saying “It sounds like you are worried about X.” Lowering their defensive guard through empathy makes you an ally rather than a threat to their leverage.',
              },
              {
                brain: 'Gut',
                label: 'Step 3',
                title: 'Make the direct ask',
                body:
                  'End with a specific request. Use the “Gut” to stop the talking and let the ask hang in the air. Your confidence in the silence demonstrates that you believe you are worthy of the outcome you’ve requested.',
              },
            ],
          },
          'heart-strong': {
            archetype: 'Empath',
            negotiationOrder: 'Head → Heart → Gut',
            coreFunctions: 'Facts → Authenticity → Weight',
            whyThisOrder:
              'Protects the Core: Under pressure from power, you may get too emotional. Leading with cold facts (Head) protects your Heart and gives your presence more gravitas.',
            steps: [
              {
                brain: 'Head',
                label: 'Step 1',
                title: 'Lead with cold facts',
                body:
                  'Open the conversation with the most objective, unarguable data point you have. This creates a “logic shield” for your heart. It prevents you from leading with a “please like me” energy that authority figures often read as a weakness.',
              },
              {
                brain: 'Heart',
                label: 'Step 2',
                title: 'Show authentic conviction',
                body:
                  'Once the facts are on the table, let your genuine passion show. Explain why this matters to you on a personal level. Authority figures are often moved by people who are both factually correct and authentically invested.',
              },
              {
                brain: 'Gut',
                label: 'Step 3',
                title: 'Add physical weight',
                body:
                  'Slow down your movements and deepen your voice. If the conversation gets emotional, use your body to stay grounded. This “weight” ensures that your likability doesn’t come at the cost of your professional authority.',
              },
            ],
          },
          'heart-gut': {
            archetype: 'Defender',
            negotiationOrder: 'Head → Gut → Heart',
            coreFunctions: 'Strategy → Posture → Connection',
            whyThisOrder:
              'Cools the Reaction: You are passionate and reactive. Leading with a logical plan cools the reaction so you can stand your ground (Gut) without burning the bridge (Heart).',
            steps: [
              {
                brain: 'Head',
                label: 'Step 1',
                title: 'Script your strategy',
                body:
                  'Write out your opening and closing lines. Having a logical “script” prevents your passion from turning into a reactive outburst. It keeps the conversation on the rails when the power dynamic feels lopsided.',
              },
              {
                brain: 'Gut',
                label: 'Step 2',
                title: 'Maintain a neutral posture',
                body:
                  'Keep your hands visible and your shoulders relaxed. Resist the urge to fidget or lean in too aggressively. A neutral, powerful physical presence prevents you from appearing “desperate,” which significantly boosts your likability.',
              },
              {
                brain: 'Heart',
                label: 'Step 3',
                title: 'Connect the dots',
                body:
                  'Frame your needs as a benefit to the authority figure. “When I have X, I can help you achieve Y.” Linking your personal success to theirs is the ultimate way to stay likable while getting exactly what you want.',
              },
            ],
          },
          'heart-head': {
            archetype: 'Advisor',
            negotiationOrder: 'Head → Heart → Gut',
            coreFunctions: 'Context → Alignment → Commitment',
            whyThisOrder:
              'Neutralizes the Motives: You overthink the person’s motives. Focusing on the business context (Head) first keeps you from getting manipulated by the emotional temperature of the room.',
            steps: [
              {
                brain: 'Head',
                label: 'Step 1',
                title: 'Establish business context',
                body:
                  'Start by discussing the broader goals of the company or the project. This shows you have “executive presence” and that you aren’t just focused on your own needs. It signals that you are a high-level thinker.',
              },
              {
                brain: 'Heart',
                label: 'Step 2',
                title: 'Align your interests',
                body:
                  'Express how your request aligns with the authority figure’s vision. When you show that you are “on their side” emotionally and strategically, they stop viewing the negotiation as a zero-sum game.',
              },
              {
                brain: 'Gut',
                label: 'Step 3',
                title: 'Secure the commitment',
                body:
                  'Ask for a definitive timeline or a follow-up date. Don’t let the conversation end in “we’ll see.” Use your gut to pin down the details, ensuring that your diplomatic approach leads to a real-world result.',
              },
            ],
          },
          'gut-strong': {
            archetype: 'Doer',
            negotiationOrder: 'Gut → Head → Heart',
            coreFunctions: 'Poise → Evidence → Respect',
            whyThisOrder:
              'Demonstrates Poised Power: You naturally resist authority. Leading with physical poise/silence (Gut) demonstrates power, which you then back up with logic and professional respect.',
            steps: [
              {
                brain: 'Gut',
                label: 'Step 1',
                title: 'Command through poise',
                body:
                  'Walk into the room and take a breath before you speak. Your silence and physical stillness demonstrate a high level of self-assurance. Authority figures are naturally drawn to people who can occupy space without being frantic.',
              },
              {
                brain: 'Head',
                label: 'Step 2',
                title: 'Present the evidence',
                body:
                  'Back up your presence with hard evidence. You don’t need a thousand words; you need three strong points. Delivering logic with brevity shows that you are a person of action, which authority figures tend to respect and like.',
              },
              {
                brain: 'Heart',
                label: 'Step 3',
                title: 'Signal professional respect',
                body:
                  'End the meeting by acknowledging the other person’s expertise or leadership. A small, genuine gesture of respect prevents your “Gut” power from feeling like a challenge to their authority, maintaining a positive relational balance.',
              },
            ],
          },
          'gut-head': {
            archetype: 'Engineer',
            negotiationOrder: 'Gut → Head → Heart',
            coreFunctions: 'Control → Precision → Courtesy',
            whyThisOrder:
              'Maintains Precise Control: You want to fight or fix. Maintaining physical self-control (Gut) first allows you to deliver precise logic (Head) with professional courtesy.',
            steps: [
              {
                brain: 'Gut',
                label: 'Step 1',
                title: 'Maintain physical control',
                body:
                  'Keep your heart rate low and your eyes steady. If the authority figure tries to intimidate you, stay physically unbothered. This self-control is magnetic and creates an aura of “unshakable professional,” which is highly likable.',
              },
              {
                brain: 'Head',
                label: 'Step 2',
                title: 'Deliver precise logic',
                body:
                  'Use your mind to answer questions with precision. Avoid filler words. When you speak with accuracy, you make it easy for the authority figure to trust your judgment, which is the fastest path to likability in a high-stakes environment.',
              },
              {
                brain: 'Heart',
                label: 'Step 3',
                title: 'Employ professional courtesy',
                body:
                  'Use “please” and “thank you” intentionally. These small social lubricants prevent your precision from feeling like an attack. Courtesy bridges the gap between your “Gut” power and the “Heart” connection required for a long-term win.',
              },
            ],
          },
          'gut-heart': {
            archetype: 'Hero',
            negotiationOrder: 'Head → Gut → Heart',
            coreFunctions: 'Rules → Stability → Softness',
            whyThisOrder:
              'Shields through Structure: Authority makes you nervous or reactive. Using the rules of the game (Head) provides a shield so you can stand firm and then reconnect.',
            steps: [
              {
                brain: 'Head',
                label: 'Step 1',
                title: 'Follow the “Rules of the Game”',
                body:
                  'Acknowledge the formal process or the standard way things are done. Using the “Head” to respect the established hierarchy makes the authority figure feel safe, which lowers their defenses and makes you appear more cooperative.',
              },
              {
                brain: 'Gut',
                label: 'Step 2',
                title: 'Stand in your stability',
                body:
                  'Once the rules are acknowledged, don’t shrink. Maintain your physical height and steady breathing. Your stability proves that you are a reliable person who can handle the pressure of high-level responsibilities.',
              },
              {
                brain: 'Heart',
                label: 'Step 3',
                title: 'Add a touch of softness',
                body:
                  'Smile or share a brief, lighthearted comment. After a serious negotiation, softening the energy shows that you are comfortable with the tension and that you don’t hold a grudge, making you an ideal person to work with.',
              },
            ],
          },
          balanced: {
            archetype: 'Sovereign',
            negotiationOrder: 'Head → Heart → Gut',
            coreFunctions: 'Synthesis → Calibration → Delivery',
            whyThisOrder:
              'Matches the Room: You mirror the authority’s energy. Aligning your strategy and your feel for the room allows you to deliver your needs with zero hesitation.',
            steps: [
              {
                brain: 'Head',
                label: 'Step 1',
                title: 'Synthesize the landscape',
                body:
                  'Briefly summarize where things stand. By providing the big picture view, you show that you understand the authority figure’s world just as well as they do. This builds immediate credibility.',
              },
              {
                brain: 'Heart',
                label: 'Step 2',
                title: 'Calibrate the energy',
                body:
                  'Read the room. If they are stressed, be the calm center. If they are excited, mirror that energy. This calibration makes you feel like a perfect fit for whatever the authority figure needs in that moment.',
              },
              {
                brain: 'Gut',
                label: 'Step 3',
                title: 'Deliver with zero hesitation',
                body:
                  'State your needs as a foregone conclusion. Because you have aligned the logic and the feeling, your physical delivery should be seamless. You are simply asking for what makes sense for everyone, making it easy for them to say yes.',
              },
            ],
          },
        },
      },
      makeSituation('managing-overwhelm', 'Managing overwhelm', 'Downshift fast when everything spikes.'),
      makeSituation('decision-making', 'Decision making', 'Choose a next step when time is tight.'),
      makeSituation('conflict-response', 'Conflict response', 'Respond without escalating the situation.'),
    ],
  },
  {
    id: 2,
    title: 'Doing Work',
    pageTitle: 'Work situations',
    contextLine: 'Normal execution mode. Just getting things done.',
    situations: [
      makeSituation('deep-focus', 'Deep focus', 'Get into flow and protect your attention.'),
      makeSituation('handling-feedback', 'Handling feedback', 'Take notes, stay open, act on what matters.'),
      makeSituation('collaboration-blocks', 'Collaboration blocks', 'Unstick the work without blame or drift.'),
      makeSituation('perfectionism-loops', 'Perfectionism loops', 'Ship progress without getting trapped.'),
    ],
  },
  {
    id: 3,
    title: 'With People',
    pageTitle: 'Social situations',
    contextLine: 'Relationships and social dynamics.',
    situations: [
      makeSituation('managing-social-energy', 'Managing social energy', 'Stay present without burning out.'),
      makeSituation('difficult-conversations', 'Difficult conversations', 'Say the hard thing with care and clarity.'),
      makeSituation('group-dynamics', 'Group dynamics', 'Read the room and choose your role.'),
      makeSituation('setting-limits', 'Setting limits', 'Hold boundaries without guilt or shutdown.'),
    ],
  },
  {
    id: 4,
    title: 'Getting Better',
    pageTitle: 'Growth situations',
    contextLine: 'Reflection, growth, and self-improvement over time.',
    situations: [
      makeSituation('building-habits', 'Building habits', 'Make it easy to start and repeat.'),
      makeSituation('after-setbacks', 'After setbacks', 'Reset quickly and keep momentum.'),
      makeSituation('self-regulation', 'Self-regulation', 'Stabilize your state before you act.'),
      makeSituation('long-term-change', 'Long-term change', 'Stay consistent when motivation fades.'),
    ],
  },
]

export function getContextById (id: FlowContextId): FlowContext | undefined {
  return FLOW_CONTEXTS.find((c) => c.id === id)
}

export function getSituation (
  contextId: FlowContextId,
  situationId: string
): FlowSituation | undefined {
  return getContextById(contextId)?.situations.find((s) => s.id === situationId)
}
