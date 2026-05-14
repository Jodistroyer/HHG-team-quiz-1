import type { FlowSituation } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const STAY_OR_GO_SITUATION_ID = 'stay-or-go' as const

export const stayOrGoFlowSituation: FlowSituation = {
  id: STAY_OR_GO_SITUATION_ID,
  title: 'Stay or Go',
  cardTitle: 'Stay or Go',
  cardDescription: 'Decide whether to commit or leave.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Audit → Value → Cut/Commit',
      whyThisOrder:
        'Stops Over-Optimizing: You will try to fix a broken system forever. You must run the numbers (Head) and check your passion (Heart) before your Gut is allowed to pull the plug.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Perform a system audit',
          body:
            'Run the numbers and look at the objective data. Is the relationship, job, or project meeting the predetermined KPIs? By starting with a cold analysis of the facts, you remove the "sunk cost" fallacy that usually keeps you stuck in a loop of trying to optimize a failing situation.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Check for core resonance',
          body:
            'Ask yourself: Do I still care about the "Why"? Even if the logic is shaky, a strong heart connection can justify staying. However, if the logic is broken and your heart feels empty, you have the data you need to move to the next phase without guilt.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Pull the plug or commit',
          body:
            'Once the audit and the value check are complete, make a physical move. Either double down with a new boundary or walk away entirely. The Gut must act decisively to prevent the Head from reopening the case for the hundredth time.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Logic → Decide → Closure',
      whyThisOrder:
        'Clinical Exit: You need a "fail-safe" metric. Once the data hits a certain point (Head), you act immediately (Gut), then process the emotional fallout later.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Identify the fail-safe metric',
          body:
            'Define a clear "if this, then that" boundary. For example, "If I am still working 80 hours a week by next month, I leave." Having a clinical, non-negotiable metric prevents your brain from making excuses when things get difficult.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Trigger the immediate exit',
          body:
            'The moment the metric is hit, act. Do not wait for a better time or a "sign." Use your natural decisiveness to execute the exit plan. Your body needs to move before the Head has a chance to rationalize a delay.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Process the emotional fallout',
          body:
            'Only after you are physically out of the situation should you sit with the feelings. Acknowledge the loss and the change in identity. By delaying the "Heart" phase, you ensure that your emotions do not interfere with a necessary strategic departure.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Fact-check → Alignment → Release',
      whyThisOrder:
        'Prevents Lingering: You overthink the "what ifs" and feel for the people involved. Logic must lead to prove the situation is unsalvageable so you can finally let go.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Fact check the "What Ifs"',
          body:
            'List all the reasons you think you should stay and hold them up to the light of reality. Most of your reasons for lingering are likely based on "Head" projections that are not actually true. Debunking these myths allows the exit process to begin.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Check for emotional alignment',
          body:
            'Ask: Does staying here make me the person I want to be? If the situation is forcing you to compromise your integrity or your joy, the Heart must agree that the cost of staying is too high. This alignment provides the emotional "permission" to leave.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Release the attachment',
          body:
            'Physically remove your energy from the space. Return the keys, send the email, or have the conversation. Taking a final, physical action stops the mental spiraling and anchors you in your new reality.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Integrity → Realism → Departure',
      whyThisOrder:
        'Protects the Soul: You stay because you care. Leading with Heart ensures the exit is aligned with your values, while the Head provides the "permission" to leave.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Check for integrity',
          body:
            'Ask if staying in this situation is still "true" for you. You often stay because you feel responsible for others. Leading with your own internal truth helps you realize that leaving might actually be the most honest thing you can do for everyone involved.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Apply a dose of realism',
          body:
            'Look at the facts without the "Heart" filter. Is the other person actually changing? Is the company actually improving? Using logic to see the stagnation helps bridge the gap between your hope for the future and the reality of the present.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Make a graceful departure',
          body:
            'Once your heart and head are aligned, walk away. Use your Gut to hold the boundary of your departure firmly but kindly. You do not need to burn bridges, but you do need to be physically gone.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Feeling → Instinct → Analysis',
      whyThisOrder:
        'Trusts the "I am done" signal: You feel the burnout in your bones. Trust that "done" feeling (Heart) and act on it (Gut) before your Head tries to talk you back into the fire.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Trust the internal "Done"',
          body:
            'Listen to the feeling of burnout in your bones. You often know it is over long before you can explain why. Validate this feeling as a legitimate piece of information that is more accurate than any spreadsheet.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Act on the instinct',
          body:
            'Move as soon as the "done" feeling crystallizes. Do not wait for a logical breakdown. Trusting your Gut to pull you out of the fire prevents you from staying until you are completely depleted or bitter.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Analyze the lessons',
          body:
            'Once you are safe and away from the situation, use your Head to look back. What did you learn? How can you prevent this from happening again? This analysis provides the closure your mind needs to finally stop thinking about the exit.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Grief → Reasoning → Execution',
      whyThisOrder:
        'Stops the Resentment: You must acknowledge the emotional loss first. Once the "Heart" is heard, the "Head" can justify the exit plan, leading to a clean break.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Acknowledge the grief',
          body:
            'Before you do anything, admit that this hurts. You need to process the emotional loss of the "dream" or the connection. Trying to skip this step leads to resentment that will follow you into your next chapter.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Reason through the exit plan',
          body:
            'Work out the logistics. How do you leave in a way that is smart and sustainable? Building a logical "bridge" out of the situation makes the Heart feel safe enough to follow through on the final break.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Execute the break',
          body:
            'Carry out the plan with total finality. Do not leave a "crack in the door." By using your Gut to execute a clean break, you ensure that the "Heart" does not get sucked back into a cycle of longing or regret.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Intuition → Evidence → Repair',
      whyThisOrder:
        'Primal Pivot: Your body knows it is over before your brain does. Trust the physical tension (Gut), verify with facts (Head), then leave with grace (Heart).',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Acknowledge the physical tension',
          body:
            'Pay attention to how your body reacts when you enter the room or start the work. If your body is constantly in a state of "bracing," your Gut is telling you it is over. Trust this physical intuition as your first signal.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Verify with evidence',
          body:
            'Back up your "Gut" feeling with three hard facts. This prevents you from making a purely reactive move and gives you the objective evidence you need to explain your departure to yourself and others.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Perform the repair',
          body:
            'Leave in a way that maintains your personal honor. If your Gut move caused a bruise, offer a moment of Heart connection or a sincere thank you before you go. This ensures you leave with your reputation and peace intact.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'ROI → Sever → Peace',
      whyThisOrder:
        'Clean Cut: Do not act on a whim. Use a cost-benefit analysis (Head) to trigger the "Gut" action. This ensures the exit is strategic, not just reactive.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Calculate the ROI of staying',
          body:
            'Perform a cost-benefit analysis. What are you gaining by staying versus what are you losing in terms of time, energy, and health? When the "Head" sees that the investment is a net loss, the exit becomes a strategic necessity.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Sever the connection',
          body:
            'Once the math does not work, cut the tie immediately. Use your Gut to make the move quick and clinical. You are "doing" the exit like a professional task, which prevents unnecessary emotional dragging.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Find your internal peace',
          body:
            'After the cut is made, check in with your Heart. Notice the relief and the return of your energy. This final step allows you to enjoy the freedom that your strategic "Gut" move created.',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Gut → Heart → Head',
      coreFunctions: 'Impulse → Compassion → Logic',
      whyThisOrder:
        'Balanced Exit: You want to bolt when things get hard. Use your "Gut" to pause, your "Heart" to check for regrets, and your "Head" to decide if staying is actually rational.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Pause the impulse',
          body:
            'When things get hard, your first instinct is to bolt. Stop. Use your Gut to hold yourself still for a moment so you do not make a reactive exit that you might regret tomorrow.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Check for lingering regrets',
          body:
            'Ask: If I left right now, would I feel like I left things unsaid or undone? Use your Heart to ensure that you are leaving for the right reasons, not just to escape a temporary discomfort.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Decide on the rational path',
          body:
            'Look at the big picture. Is staying actually the most rational choice for your long term goals? If the answer is no, then use your Head to authorize the exit that your Gut wanted to make in the first place.',
        },
      ],
    },
    balanced: {
      archetype: 'Sovereign',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Synthesis → Peace → Finality',
      whyThisOrder:
        'Unified Exit: You need all three centers to say "Yes." Once the logic, emotion, and instinct align, you walk away without ever looking back.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Synthesize all dynamics',
          body:
            'Look at the logic of the situation, the emotional cost, and the physical reality all at once. When all three centers point to the exit, you know with absolute certainty that it is time to go.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Find internal peace with the choice',
          body:
            'Ensure there is no "civil war" inside you. Your logic and your feelings must be in harmony. When you feel a sense of calm about the departure, you are ready to move.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Walk away with finality',
          body:
            'Step out of the situation and do not look back. Because you have used all three centers to make the choice, there is no need for second-guessing. You move into your next phase with total, unified presence.',
        },
      ],
    },
  },
}
