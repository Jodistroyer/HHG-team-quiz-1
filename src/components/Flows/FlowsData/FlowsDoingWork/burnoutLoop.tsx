import type { FlowSituation } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const BURNOUT_LOOP_SITUATION_ID = 'burnout-loop' as const

export const burnoutLoopFlowSituation: FlowSituation = {
  id: BURNOUT_LOOP_SITUATION_ID,
  title: 'Burnout loop',
  cardTitle: 'Burnout loop',
  cardDescription: 'See how you can spiral into exhaustion at work.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Head → Gut → Head',
      coreFunctions: 'Over-Analysis → Force → Rumination',
      whyThisOrder:
        'Mental Treadmill: You try to "solve" exhaustion with more thinking. When that fails, you force your body to keep up, leading to a permanent state of overthinking.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'The Solve Phase',
          body:
            'You notice the initial fatigue and immediately treat it like a logic puzzle. You spend hours researching productivity hacks or "optimizing" your calendar to find more time, which only adds to your mental load.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'The Force Phase',
          body:
            'When the new schedule fails to make you feel better, you override your body\'s signals. You drink more caffeine and force yourself to stay in the chair, using sheer willpower to compensate for a lack of genuine energy.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'The Rumination Phase',
          body:
            'The body eventually wins and you stall out. Your mind then enters a loop of "Why didn\'t that work?" and "What is wrong with my brain?" You are now too exhausted to act but too overstimulated to sleep.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Gut → Head → Gut',
      coreFunctions: 'Compulsion → Justification → Pushing',
      whyThisOrder:
        'Engine Fire: You feel the crash coming and respond by speeding up. You use logic to "prove" why you cannot stop, eventually blowing the engine entirely.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'The Compulsion Phase',
          body:
            'You feel the physical signs of the "crash" and your immediate instinct is to accelerate. You move faster and take on more tasks to outrun the feeling of being finished.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'The Justification Phase',
          body:
            'You create a list of reasons why stopping is impossible. You tell yourself that the world will fall apart if you take an hour off, using logical fallacies to support your refusal to rest.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'The Pushing Phase',
          body:
            'With your logic providing "cover," you push your physical limits until something breaks. You ignore pain or illness until your body effectively stages a coup and shuts down your ability to function.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Head → Heart → Head',
      coreFunctions: 'Criticism → Guilt → Doubt',
      whyThisOrder:
        'Internal War: You think about what you should do, feel guilty for being tired, and then analyze why you are so "weak." You never actually move or rest.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'The Criticism Phase',
          body:
            'You look at your declining productivity and start a mental lecture. You compare your current output to your peak performance and find yourself lacking, creating a "Head" based standard you cannot meet.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'The Guilt Phase',
          body:
            'The criticism turns into a heavy emotional weight. You feel like you are failing your team or your family by being tired. This guilt consumes the very energy you need to actually do the work.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'The Doubt Phase',
          body:
            'You zoom back into analysis to figure out why you are so "weak." You oscillate between thinking and feeling until you are paralyzed, stuck in a loop of self-observation that leads to zero recovery.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Heart → Head → Heart',
      coreFunctions: 'Comparison → Worry → Isolation',
      whyThisOrder:
        'Emotional Sinkhole: You feel overwhelmed and then look at everyone else\'s "success" (Head). This makes you feel even more inadequate, trapping you in a feeling of despair.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'The Comparison Phase',
          body:
            'You start by feeling "behind." You look at the polished lives of others and feel a deep sense of emotional inadequacy, convincing yourself that everyone else is handling life better than you.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'The Worry Phase',
          body:
            'You use your mind to build "worst case" scenarios. You imagine losing your job or losing respect because you are struggling, which turns a simple need for rest into a full blown identity crisis.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'The Isolation Phase',
          body:
            'To protect yourself from the perceived judgment of others, you withdraw. You hide your struggle, which prevents you from getting the support you need and traps you in a lonely sinkhole of exhaustion.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Gut → Heart → Gut',
      coreFunctions: 'Impulse → Drama → Over-extension',
      whyThisOrder:
        'Explosion: You react to burnout with frantic "doing." You get emotional about the stress and then try to work your way out of the feelings, causing a physical collapse.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'The Impulse Phase',
          body:
            'Burnout hits and you react with a "fight" response. You start new projects or say "yes" to five more things in a frantic attempt to prove to yourself that you still have the "drive."',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'The Drama Phase',
          body:
            'The over-extension leads to an emotional outburst. You feel victimized by your schedule or angry at the world for being so demanding, adding an unnecessary layer of emotional "heat" to your fatigue.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'The Over-extension Phase',
          body:
            'You try to "work through" the emotions. You use the adrenaline from your frustration to fuel one last massive push, which inevitably ends in a total physical collapse that takes weeks to recover from.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Heart → Head → Heart',
      coreFunctions: 'Absorption → Over-intellectualizing → Shame',
      whyThisOrder:
        'Emotional Spiral: You absorb everyone else\'s stress, try to figure out "why" it hurts so much, and end up in a loop of feeling too much to ever take a break.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'The Absorption Phase',
          body:
            'You do not just feel your own burnout; you feel the stress of everyone around you. You take on the emotional baggage of the room, which doubles your internal weight before you have even started your own day.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'The Over-intellectualizing Phase',
          body:
            'You try to perform a psychological autopsy on your feelings. You spend all your energy trying to understand the "root cause" of your sadness instead of simply letting yourself take a nap.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'The Shame Phase',
          body:
            'When your analysis does not fix your feelings, you feel ashamed of your "sensitivity." You judge yourself for being too porous, which creates a new layer of emotional exhaustion that blocks actual rest.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Gut → Gut → Gut',
      coreFunctions: 'Resistance → Stubbornness → Collapse',
      whyThisOrder:
        'Stone Wall: You refuse to acknowledge the "Head" or "Heart." You simply try to "out-tough" burnout until your body physically gives out and forces a shutdown.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'The Resistance Phase',
          body:
            'You feel the burnout as a physical wall and you decide to push back. You tighten your jaw and harden your stance, refusing to change your routine or acknowledge that your capacity has diminished.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'The Stubbornness Phase',
          body:
            'You double down on the "grind." You ignore the Head\'s warnings and the Heart\'s cries for connection, viewing any need for rest as a personal betrayal of your own strength.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'The Collapse Phase',
          body:
            'Because there is no "give" in your system, you do not bend; you break. You hit a point of total physical shutdown where you literally cannot get out of bed, forced into a recovery you did not choose.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Gut → Head → Gut',
      coreFunctions: 'Aggression → Rationalization → Hardening',
      whyThisOrder:
        'Bulldozer: You treat your own fatigue as an enemy to be defeated. You rationalize why you do not need sleep and push until you lose all connection to your needs.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'The Aggression Phase',
          body:
            'You treat your fatigue like an intruder. You get "angry" at being tired and use that anger to fuel your activities, essentially using your own adrenaline as a toxic substitute for energy.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'The Rationalization Phase',
          body:
            'You tell yourself that sleep is for the "unproductive." You use high level concepts of "discipline" and "legacy" to justify why you are ignoring the basic biological needs of your body.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'The Hardening Phase',
          body:
            'You lose touch with your empathy for yourself and others. You become a "bulldozer" that moves through the day without feeling, reaching a state of hollow burnout where you are "doing" everything but feeling nothing.',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Gut → Heart → Gut',
      coreFunctions: 'Panic → Insecurity → Over-activity',
      whyThisOrder:
        'Frenzy: You feel the physical crash and it scares you. You react with frantic activity to prove you are "fine," burning through your last reserves of adrenaline.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'The Panic Phase',
          body:
            'You feel the first sign of a physical crash and it triggers an "alarm" state. Your body senses the loss of control and enters a state of high alert, making it impossible to relax.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'The Insecurity Phase',
          body:
            'The physical panic turns into a fear that you are losing your "edge." You worry that if you stop moving, you will never be able to start again, making rest feel like a dangerous risk.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'The Over-activity Phase',
          body:
            'You enter a "frenzy" of meaningless tasks. You clean the house, answer every email, and run errands at 9:00 PM just to prove you are not "crashing," which burns through your final reserves.',
        },
      ],
    },
    balanced: {
      archetype: 'Sovereign',
      negotiationOrder: 'Head + Heart + Gut (loop)',
      coreFunctions: 'Hesitation → Self-Judgment → Stalling',
      whyThisOrder:
        'Gridlock: You see all the ways you are failing, feel the weight of it, and try to do a little of everything. You end up doing nothing well and staying stuck in a "Grey Zone."',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'The Hesitation Phase',
          body:
            'You see the burnout coming from all angles. You analyze the logic, the emotion, and the physical cost simultaneously, which causes you to freeze instead of taking a single effective action.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'The Self-Judgment Phase',
          body:
            'You feel bad for being stuck. You look at how "balanced" you are supposed to be and judge yourself for failing to maintain that equilibrium, adding emotional pressure to your existing mental gridlock.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'The Stalling Phase',
          body:
            'You try to do "a little bit of everything" to keep the balance. You work a little, rest a little, and think a little, but because none of it is a "full" choice, you stay in a "Grey Zone" of semi-exhaustion.',
        },
      ],
    },
  },
}
