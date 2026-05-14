import type { FlowSituation } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const DEALING_WITH_GRIEF_SITUATION_ID = 'dealing-with-grief' as const

export const dealingWithGriefFlowSituation: FlowSituation = {
  id: DEALING_WITH_GRIEF_SITUATION_ID,
  title: 'Dealing with grief',
  cardTitle: 'Dealing with grief',
  cardDescription: 'Move through loss at your own pace, with head, heart, and body.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Permission → Meaning → Endurance',
      whyThisOrder:
        'Stops Intellectualizing: You try to "explain" the loss to avoid feeling it. Leading with Heart gives you permission to hurt so the Head can eventually find a way to live with the "why."',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Give yourself permission to hurt',
          body:
            'Stop the search for a logical explanation. Acknowledge the raw pain without trying to fix it or justify it. By leading with the heart, you lower the mental barrier that treats vulnerability as a problem to be solved.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Construct the "Why"',
          body:
            'Once you have sat with the feeling, use your mind to find a meaningful narrative. How does this loss change your perspective? Building a mental framework for the loss helps you integrate the experience into your life story.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Commit to endurance',
          body:
            'Focus on the long game. Use your gut to settle into the reality that healing takes time. This is not a project to complete, but a path to walk. Your physical presence in the "now" becomes your greatest strength.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Surrender → Maintenance → Legacy',
      whyThisOrder:
        'Prevents "Busy-ness": You want to work through the pain. You must lead with the feeling (Heart) and physical rest (Gut) before the Head is allowed to plan your "new normal."',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Surrender to the exhaustion',
          body:
            'Admit that you cannot work your way out of this. Let the grief hit you without reaching for a task. Surrendering to the feeling prevents you from using "doing" as a shield against the pain.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Prioritize maintenance',
          body:
            'Focus exclusively on basic physical needs. Sleep when you are tired and eat when you are hungry. By securing your physical foundation first, you prevent a total burnout during the most intense phases of grieving.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Define your legacy',
          body:
            'Think about how you want to honor what was lost in your daily life. Use your strategic mind to build a "new normal" that incorporates the lessons of the past into a sustainable future.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Gut → Heart → Head',
      coreFunctions: 'Stability → Expression → Context',
      whyThisOrder:
        'Grounds the Sorrow: You are lost in thought and feeling. Leading with the physical (Gut): eating, sleeping, walking, creates a safe container to feel the depth of the grief.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Create physical stability',
          body:
            'Focus on the weight of your body. Eat regular meals and maintain a simple physical routine. This creates a "safe container" that prevents your thoughts and feelings from floating away into an ungrounded spiral.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Express the sorrow',
          body:
            'Find a way to let the feelings out. Talk, cry, or create. Because your body is grounded, you can afford to go deep into the emotional expression without losing your sense of reality.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Apply context to the loss',
          body:
            'Zoom out. Look at the loss as a part of the larger cycle of life. Understanding the universal nature of grief helps your mind stop personalizing the pain as a unique failure or a permanent dead end.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Perspective → Validation → Pacing',
      whyThisOrder:
        'Provides a Railing: You are drowning in the emotion. The Head acts as a handrail, providing logic and "grief facts" to remind you that what you feel is a normal part of the human experience.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Acknowledge grief facts',
          body:
            'Read or learn about how grief works. Understanding that your brain is physically rewiring itself provides a "handrail" of logic to hold onto when the emotional waves feel like they are dragging you under.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Validate the specific pain',
          body:
            'Tell yourself that your feelings make sense. You are not "too sensitive"; you are responding to a real loss. Self-validation prevents the secondary pain of judging yourself for how you feel.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Pace your physical energy',
          body:
            'Do not try to go back to 100% capacity immediately. Use your gut to monitor your energy levels and take frequent breaks. Slowing down physically reminds your heart that there is no rush to "get over it."',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Structure → Routine → Release',
      whyThisOrder:
        'Contains the Surge: You feel the grief in waves and bursts of energy. A logical schedule (Head) and physical movement (Gut) provide a bank for the emotional river to flow through.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Create a logical schedule',
          body:
            'Set a simple daily structure for yourself. When the "when" and "where" of your day are decided by your head, it provides a stable bank for the unpredictable river of your emotions to flow through.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Move the energy',
          body:
            'Engage in physical movement to process the adrenaline of grief. Walk, stretch, or lift. Physical activity prevents the emotional surge from becoming stagnant in your body and turning into physical tension.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Allow the release',
          body:
            'When the waves of feeling come, let them happen. Because you have a schedule and a physical outlet, you can trust that you will not be "lost" in the emotion forever. You have a way back to the shore.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Grounding → Observation → Connection',
      whyThisOrder:
        'Stops the Spiral: You feel deeply and then analyze the pain. Physically grounding yourself (Gut), for example stand up, slow breath, calm smell, touch something solid, stops the mental loop, allowing you to eventually reconnect with the memory of the loss safely.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Engage the senses',
          body:
            'Touch something solid, smell something calming, or listen to a steady rhythm. Grounding your senses breaks the circuit of the mental spiral and brings you back into the safety of the present moment.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Observe the patterns',
          body:
            'Look at your thoughts as if you were an outsider. "I am having a thought about the past." This detachment allows you to observe the pain without becoming consumed by it, giving you space to breathe.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Reconnect with the memory',
          body:
            'Once you are calm and grounded, choose to remember the loss with love rather than fear. This controlled reconnection allows you to build a bridge back to the memory that feels safe and healing.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Softening → Audit → Integration',
      whyThisOrder:
        'Breaks the Stoicism: You want to "stay strong." Leading with Heart allows the shield to drop so you can logically assess your life and slowly begin to move again.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Soften the shield',
          body:
            'Deliberately choose to be "weak" for a moment. Admit to a trusted friend or yourself that you are hurting. Softening your heart allows the tension of "staying strong" to dissipate, which is the first step toward real healing.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Audit the life load',
          body:
            'Look at your responsibilities and cut what is non-essential. You cannot carry the world and your grief at the same time. Use your head to logically reduce the weight you are currently trying to lift.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Integrate the change',
          body:
            'Slowly begin to move again, but with a different posture. Allow the loss to change how you show up in the world. Integration means moving forward as a changed person, rather than trying to be your "old self."',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Empathy → Clarity → Sustainability',
      whyThisOrder:
        'Prevents Hardening: You might treat grief as a task to complete. Connecting with the loss (Heart) ensures you do not just "move on," but move forward with the person\'s memory.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Connect with the empathy',
          body:
            'Allow yourself to feel the person\'s absence as a relationship, not just a fact. This ensures you do not treat your own healing like a project or a task to be checked off a list.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Seek mental clarity',
          body:
            'Think about what the loss actually means for your daily life. What are the practical changes? Clarity about the "new reality" stops the gut from reacting to every small change as if it were a new crisis.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Develop a sustainable pace',
          body:
            'Commit to a speed of life that you can actually maintain. Do not "sprint" through your grief. Pacing yourself ensures that you carry the person\'s memory with you over the long haul.',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Fact-Check → Compassion → Stability',
      whyThisOrder:
        'Regulates the Panic: Grief feels like a physical threat. Using the Head to understand the "Stages of Grief" provides safety, allowing the Heart to process and the Gut to settle.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Fact-check the panic',
          body:
            'When the physical "doom" feeling of grief hits, use your head to remind yourself: "I am safe, I am breathing, this is grief." Using logic to label the panic prevents it from turning into a physical emergency.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Offer yourself compassion',
          body:
            'Treat your heart with the tenderness of a caregiver. If your body is shaking or your chest is tight, respond with kindness. This emotional self-soothing allows the "Heart" to settle the "Gut."',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Settle into the stillness',
          body:
            'Once the panic subsides, sit in the quiet. Let your body feel the stillness without needing to fill it with noise or activity. This physical peace is where the deep, quiet work of healing happens.',
        },
      ],
    },
    balanced: {
      archetype: 'Sovereign',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Witnessing → Surviving → Reframing',
      whyThisOrder:
        'Honors the Whole: You feel the need to be okay for everyone. This order prioritizes your own feeling and physical survival before you try to make sense of it for others.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Witness the feeling',
          body:
            'Simply notice the depth of your sorrow without judgment. By witnessing your own pain first, you fulfill your primary emotional need before you try to support or explain it to others.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Focus on survival',
          body:
            'Keep the body going. Breath by breath, step by step. When all three centers are balanced, you realize that simply surviving the day is a profound act of honoring what was lost.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Reframe the future',
          body:
            'Use your head to look at the landscape ahead. How does this loss reshape your path? Reframing allows you to find a way to live in a world that is permanently different, but still beautiful.',
        },
      ],
    },
  },
}
