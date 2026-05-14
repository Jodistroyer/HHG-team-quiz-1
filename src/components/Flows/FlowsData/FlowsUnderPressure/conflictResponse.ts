import type { FlowSituation } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const CONFLICT_RESPONSE_SITUATION_ID = 'conflict-response' as const

export const conflictResponseFlowSituation: FlowSituation = {
  id: CONFLICT_RESPONSE_SITUATION_ID,
  title: 'Conflict response',
  cardTitle: 'Conflict response',
  cardDescription: 'Respond without escalating the situation.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Verify → Connect → Commit',
      whyThisOrder:
        'Stops the "Lecture": You treat the argument like a debate. You must move from "being right" to "feeling seen" before the fight can actually end.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Verify the objective truth',
          body:
            'Acknowledge where the facts actually land. Admit if you were factually wrong or if the other person has a logical point. This kills the urge to "win" the debate and moves you toward a solution.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Connect with the impact',
          body:
            'Shift from the "what" to the "how." Ask: How did my logic make them feel? Acknowledge their emotional experience without trying to "correct" it with data.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Commit to the change',
          body:
            'Stop the analysis. Give a firm "yes" to the resolution and stop bringing up new points. Use your physical presence to show you are done fighting and ready to move on.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Gut → Head → Heart → Gut',
      coreFunctions: 'Brake → Audit → Relate → Re-engage',
      whyThisOrder:
        'Prevents Steamrolling: You have already "won" the argument in your head. You must stop talking, check your facts, and acknowledge the other person before moving forward.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Apply the emergency brake',
          body:
            'Stop talking immediately. Your impulse is to keep proving your point until the other person yields. Physically close your mouth and take a step back to break the momentum.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Audit your own argument',
          body:
            'Scan for "logic holes" or moments where you were being unfair just to win. Being honest about your own tactical errors helps you drop the defensive posture.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Relate to their perspective',
          body:
            'Find one thing they said that you can genuinely empathize with. Verbalize that connection so they feel you are on their team again, not their opponent.',
        },
        {
          brain: 'Gut',
          label: 'Step 4',
          title: 'Re-engage with softness',
          body:
            'Step back into the conversation with a lower volume and relaxed posture. Use your body to signal that the "battle" is over and the partnership is back.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Clarify → Validate → Resolve',
      whyThisOrder:
        'Ends the Circularity: You understand the logic and the pain, but you will not end the fight. This forces you to state a final, actionable resolution.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Clarify the core issue',
          body:
            'Strip away the fluff. State exactly what the argument is about in one sentence. This prevents the conversation from spiraling into a history lesson of past mistakes.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Validate the pain',
          body:
            'Tell the other person: "I see why that hurt you." Even if you do not agree with the logic, validating the emotion stops the circular "you do not understand" loop.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Resolve with an action',
          body:
            'Do not just say "I am sorry." State a concrete thing you will do differently next time. This puts a physical period at the end of the sentence and ends the fight.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Soothe → Ground → Direct',
      whyThisOrder:
        'Lowers the Volume: You feel attacked or hurt. You need to settle your nervous system and look at the facts before you can make a clear request.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Soothe your own system',
          body:
            'Acknowledge that you feel overwhelmed or hurt. Take a moment to self-validate so you are not looking to your "opponent" to fix your feelings mid-fight.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Ground the situation in logic',
          body:
            'Separate the "story" you are telling yourself from what actually happened. Focus on the words used rather than the tone you perceived. This brings the volume down in your own mind.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Direct the next step',
          body:
            'Instead of waiting for the other person to lead, make a clear request. Say: "I need us to talk about [X] specifically." This moves you from a reactive state to a constructive one.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Gut → Heart → Head → Gut',
      coreFunctions: 'Halt → Release → Fact-check → Restart',
      whyThisOrder:
        'Stops the Outburst: You react with heat and emotion. You must physically pause and vent the "charge" before you can see the logic of the situation.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Halt the escalation',
          body:
            'Recognize the "heat" in your chest and stop. Physically leave the room if you have to. You cannot resolve anything while your Gut is in fight-or-flight mode.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Release the emotional charge',
          body:
            'Vent the feeling safely. Write it down or take a fast walk. Get the "scream" out of your system so it does not come out at the person you love.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Fact-check the triggers',
          body:
            'Ask: Is this about right now, or is this about something else? Distinguishing current reality from past baggage allows you to come back with a clear head.',
        },
        {
          brain: 'Gut',
          label: 'Step 4',
          title: 'Restart with intention',
          body:
            'Return to the person and state your desire to fix things. Use your physical presence to show warmth rather than the "burn" of the previous outburst.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Express → Process → Decide',
      whyThisOrder:
        'Stops the Resentment: You feel hurt and then overthink it. You need to say how you feel, make sense of the "why," and then reach a firm decision.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Express the raw feeling',
          body:
            'Say exactly how you feel without the "Head" trying to make it sound professional or logical. "I feel ignored" is more effective than a three-page explanation of why you are right.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Process the "Why"',
          body:
            'Once the feeling is out, analyze why it hit so hard. Understanding the mechanics of your own hurt helps you explain it to the other person without sounding accusatory.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Decide and close',
          body:
            'Make a firm choice to either let it go or set a boundary. Avoid the "Head" trap of overthinking the decision later. Once it is decided, your body should act like it is over.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Gut → Head → Heart → Gut',
      coreFunctions: 'Silence → Verify → Repair → Move On',
      whyThisOrder:
        'Prevents Wreckage: You react with raw power. You must go silent, get the objective truth, fix the relationship you just bruised, and then move forward.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Choose silence',
          body:
            'Recognize your power. When you are angry, you can be intimidating. Use your Gut to hold your tongue so you do not say something that causes permanent damage.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Verify the objective truth',
          body:
            'Look at the situation as a third party would. Where did the breakdown actually happen? Getting the facts straight prevents you from staying in a "blame" mindset.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Perform the repair',
          body:
            'Offer a sincere apology for your intensity or your words. Soften your eyes and your voice to show that the person is more important to you than the power struggle.',
        },
        {
          brain: 'Gut',
          label: 'Step 4',
          title: 'Move on completely',
          body:
            'Once the repair is made, do not linger in the guilt. Physically move into a new activity to signal to yourself and the other person that the conflict is resolved.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Gut → Head → Gut → Heart',
      coreFunctions: 'Pause → Correct → Adjust → Restore',
      whyThisOrder:
        'Fixes the Approach: You push too hard and then justify it. You must stop, change your tone or behavior, and only then try to reconnect emotionally.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Pause the push',
          body:
            'You tend to bulldoze when you think you are right. Physically sit down or lean back to signal that you are stopping the "advance."',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Correct the narrative',
          body:
            'Tell the other person: "I realized I was being too harsh" or "I was focusing on the wrong thing." Self-correcting out loud shows that your Head is back in control.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Adjust your tone',
          body:
            'Consciously lower your voice and relax your jaw. Your Gut needs to lead the way in showing "peace" before the other person will feel safe enough to reconnect.',
        },
        {
          brain: 'Heart',
          label: 'Step 4',
          title: 'Restore the connection',
          body:
            'End with a "Heart" moment. Ask how they are doing or offer a gesture of affection. This proves that your goal was resolution, not just winning.',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Gut → Heart → Head → Gut',
      coreFunctions: 'Breathe → Calm → Analyze → Proceed',
      whyThisOrder:
        'Regulates the Surge: You are reactive and sensitive. You need to lower your heart rate and settle your emotions before the "truth" of the argument matters.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Breathe through the surge',
          body:
            'Your heart rate spikes fast. Use box breathing to manually override your nervous system. Your Gut needs to feel safe before your Heart can be kind.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Calm the emotional reaction',
          body:
            'Label the feeling as "temporary." Remind your Heart that the person you are arguing with is someone you care about, which helps lower the defensive stakes.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Analyze the root cause',
          body:
            'Now that the "fire" is out, look for the logic. What was the actual misunderstanding? This prevents the argument from turning into a purely emotional feedback loop.',
        },
        {
          brain: 'Gut',
          label: 'Step 4',
          title: 'Proceed with stability',
          body:
            'Re-enter the discussion with a steady, grounded energy. You are no longer "reacting"; you are now "responding" from a place of physical and emotional balance.',
        },
      ],
    },
    balanced: {
      archetype: 'Sovereign',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Sync → Align → Close',
      whyThisOrder:
        'Prevents Stalling: You see all sides and feel for everyone. You must unify your thoughts and feelings to give a clear, final answer to the conflict.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Sync the perspectives',
          body:
            'Mentally lay out your view and their view side-by-side. Look for the common ground where both logical sets of facts meet.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Align the intentions',
          body:
            'Make sure your "Heart" is actually aiming for peace. If you find a hidden desire to punish or be right, swap it for the desire to be in harmony.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Close the loop',
          body:
            'Give a clear, definitive summary of the resolution. "We agree on X, and we will do Y." Use your Gut to anchor this decision so the argument does not reopen later.',
        },
      ],
    },
  },
}
