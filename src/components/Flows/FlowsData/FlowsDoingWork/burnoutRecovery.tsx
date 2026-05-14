import type { FlowSituation } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const BURNOUT_RECOVERY_SITUATION_ID = 'burnout-recovery' as const

export const burnoutRecoveryFlowSituation: FlowSituation = {
  id: BURNOUT_RECOVERY_SITUATION_ID,
  title: 'Burnout recovery',
  cardTitle: 'Burnout recovery',
  cardDescription: 'How to recover the best way possible.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Compassion → Perspective → Boundaries',
      whyThisOrder:
        'Softens the Critic: You try to "think" your way out of burnout. Leading with the Heart stops the self-judgment so you can logically reassess your load.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Practice radical self compassion',
          body:
            'Stop the internal lecture. Acknowledge that being tired is a human reality, not a failure of character. By softening your inner critic, you prevent the mental exhaustion from turning into a spiral of shame.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Audit your mental load',
          body:
            'Now that the judgment is gone, look at your to-do list objectively. Categorize tasks into "essential" and "delegatable." Use your logic to see that your current output is mathematically unsustainable.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Set physical boundaries',
          body:
            'Turn off your notifications and close your laptop. Use your body to signal that the workday is over. Physically removing yourself from your workspace anchors the decision to stop.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Self-Care → Capacity → Planning',
      whyThisOrder:
        'Restores the Battery: You usually just push harder. You must feel the exhaustion (Heart) and physically stop (Gut) before your brain is allowed to strategize.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Honor the exhaustion',
          body:
            'Sit with the feeling of being tired without trying to solve it. Admitting you are depleted allows the nervous system to shift from "fight" mode to "recovery" mode.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Enforce a hard stop',
          body:
            'Physically stop moving. Whether it is a nap or a silent walk, your body needs to experience a total lack of "doing" before your brain can think clearly again.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Redesign the schedule',
          body:
            'With a rested body, plan a more sustainable pace for the next week. Use your strategic mind to build in "white space" that protects you from hitting zero again.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Gut → Heart → Head',
      coreFunctions: 'Solitude → Reflection → Clarity',
      whyThisOrder:
        'Stops the Leak: You are over-extended. You need physical distance (Gut) to feel your own emotions again without the "Head" over-analyzing the fatigue.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Seek total solitude',
          body:
            'Physically remove yourself from other people\'s energy. Go to a room alone or take a solo drive. You need a physical "container" where no one is asking anything of you.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Feel the fatigue',
          body:
            'In the quiet, let your emotions surface. Are you sad, frustrated, or just empty? Identifying the specific "flavor" of your burnout helps you understand what you truly need.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Define the path to clarity',
          body:
            'Ask yourself what one change would provide the most relief. Focus on a singular, logical adjustment rather than trying to fix your entire life at once.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Objectivity → Validation → Release',
      whyThisOrder:
        'Creates Stability: You feel the weight of everyone\'s needs. Logic (Head) helps you see that you are not responsible for everything, allowing your Heart to rest.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Apply objective facts',
          body:
            'Remind yourself of the data: you have 24 hours in a day and limited energy. Realizing you literally cannot do everything helps detach your self-worth from your productivity.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Validate your limits',
          body:
            'Tell yourself it is okay to let people down to save yourself. You are not a bottomless well of support. Validating your right to say "no" provides instant emotional relief.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Release the weight',
          body:
            'Physically drop your shoulders and exhale. Let go of the tasks that are not yours to carry. Use your Gut to say "no" to new requests without offering a long explanation.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Logic → Rest → Nurture',
      whyThisOrder:
        'Interrupts the Hustle: You react to stress by doing and feeling. Using the Head to "schedule" rest as a non-negotiable fact protects your physical energy.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Schedule your rest',
          body:
            'Treat recovery like a mandatory meeting. Put "do nothing" on your calendar. When it is a "fact" on paper, your Head will stop trying to find more work for your Gut to do.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Prioritize physical rest',
          body:
            'Go to bed early or sit in a dark room. Your body needs a "sensory blackout" to recover from the hustle. Focus on the physical sensation of gravity holding you down.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Engage in low-stakes nurture',
          body:
            'Do something purely for the joy of it, like reading or a hobby. Shift from "producing" to "receiving." This refills the Heart after the long period of giving.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Space → Priorities → Joy',
      whyThisOrder:
        'Grounds the Spiral: You feel and think in circles. You need to physically remove yourself from the environment (Gut) to sort out what actually matters.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Create physical space',
          body:
            'Leave the environment that is stressing you out. A change of scenery breaks the mental loop and gives your nervous system a fresh start.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Rank your priorities',
          body:
            'Write down everything on your mind and pick the top three. Ignore the rest. Using your Head to simplify your focus prevents the "everything is urgent" panic.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Reconnect with joy',
          body:
            'Find one small thing that makes you feel like "you" again. Whether it is music or a favorite meal, use your Heart to remind yourself that life is more than just a list of problems to solve.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Kindness → Audit → Renewal',
      whyThisOrder:
        'Relaxes the Guard: You are used to carrying the world. Leading with Heart allows you to admit you are tired so you can logically cut the "dead weight" tasks.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Acknowledge the fatigue',
          body:
            'Admit "I am tired" out loud. For a Gut Strong person, admitting vulnerability is the first step to lowering the defensive shield that is keeping you in burnout.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Audit for "dead weight"',
          body:
            'Identify the habits or tasks that are draining you without providing any return. Use your mind to ruthlessly cut away anything that is not absolutely necessary for survival right now.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Renew your energy',
          body:
            'Find a physical activity that restores you rather than drains you. This might be yoga, gardening, or stretching. Move your body in a way that feels like a gift, not a chore.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Empathy → Efficiency → Pacing',
      whyThisOrder:
        'Lowers the Stakes: You treat life like a mission. Connecting with yourself first prevents you from turning your "recovery" into just another high-pressure project.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Practice self-empathy',
          body:
            'Treat yourself with the same kindness you would show a tired friend. Lowering your internal expectations prevents you from turning your "self-care" into a competitive sport.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Analyze your efficiency',
          body:
            'Look for where you are "over-working" tasks. Are you spending two hours on something that takes thirty minutes? Streamlining your efforts saves energy for actual rest.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Set a sustainable pace',
          body:
            'Deliberately move slower. Walk slower, talk slower, and eat slower. Forcing your Gut to downshift prevents you from accidentally slipping back into "mission mode."',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Structure → Comfort → Stamina',
      whyThisOrder:
        'Provides a Container: You feel the burnout physically and emotionally. You need a logical plan (Head) to feel safe enough to actually relax and recharge.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Build a recovery structure',
          body:
            'Create a simple plan for your evening or weekend. Knowing there is a "plan" to relax makes the Head feel safe enough to let the Gut and Heart actually let go.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Seek sensory comfort',
          body:
            'Focus on soft textures, warm drinks, or comforting scents. Using your Heart to seek "coziness" helps soothe the physical and emotional irritation of burnout.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Build lasting stamina',
          body:
            'Once you feel a bit of energy return, do not spend it all at once. Use your Gut to hold back and "bank" your energy, building a reserve for the future instead of immediately burning it.',
        },
      ],
    },
    balanced: {
      archetype: 'Sovereign',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Withdrawal → Simplification → Ease',
      whyThisOrder:
        'Protects the Core: You try to stay balanced for everyone. You must pull back physically (Gut) to simplify your life and find your internal peace again.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Physical withdrawal',
          body:
            'Step away from the demands of the world. Silence your phone and create a "no-go" zone for work or chores. Your recovery starts with a physical boundary.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Simplify the landscape',
          body:
            'Mentally strip your life down to the basics for 24 hours. Focus only on eating, sleeping, and breathing. This simplification clears the mental clutter that feeds burnout.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Find your ease',
          body:
            'Let yourself exist without a goal. Experience the "ease" of being alive without having to be useful. This restores the balance between your internal self and the external world.',
        },
      ],
    },
  },
}
