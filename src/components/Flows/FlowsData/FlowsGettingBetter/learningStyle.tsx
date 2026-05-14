import type { FlowSituation } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const LEARNING_STYLE_SITUATION_ID = 'learning-style' as const

export const learningStyleFlowSituation: FlowSituation = {
  id: LEARNING_STYLE_SITUATION_ID,
  title: 'Learning style',
  cardTitle: 'Learning style',
  cardDescription: 'Turn what you study into skill you can use.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Logic → Meaning → Application',
      whyThisOrder:
        'Prevents Information Hoarding: You collect facts but struggle to use them. Connecting the data to a "why" (Heart) makes the "how" (Gut) stick.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Deconstruct the logic',
          body:
            'Start by breaking the subject down into its component parts. Map out the "how" and the "what" until you understand the underlying mechanics. This creates a mental scaffolding that makes the rest of the process feel safe.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Find the personal meaning',
          body:
            'Ask yourself: why does this matter to the world or to me? By attaching a value or an emotional weight to the facts, you transform dry information into a lived philosophy that you actually want to remember.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Execute a small project',
          body:
            'Stop reading and start doing. Take one piece of what you learned and apply it to a real world task. Forcing your hands to move bridges the gap between theoretical knowledge and true capability.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Architecture → Trial → Reflection',
      whyThisOrder:
        'Efficient Builder: You need the blueprint first. Once you see the structure, you must build it immediately, then circle back to see how it fits the "big picture."',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Study the architecture',
          body:
            'Look for the blueprint or the system flow. You need to see the start point, the end point, and the rules of engagement. Once you have the mental map, your "Gut" feels authorized to take over.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Run a trial iteration',
          body:
            'Jump into a "rough draft" or a prototype immediately. Do not worry about perfection. The goal is to get the "feel" of the knowledge in your body so you can find the friction points that the books did not mention.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Reflect on the outcome',
          body:
            'Look back at what you built and assess how it aligns with your original intent. This final check-in ensures that your efficiency has not come at the cost of the "big picture" or the human element.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Theories → Values → Output',
      whyThisOrder:
        'Purposeful Academic: You learn best when you see the logic and the human impact. Mastery occurs when you stop researching and start producing.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Explore the theories',
          body:
            'Dive into the "why" and the research. Compare different schools of thought until you have a comprehensive understanding of the landscape. Your mind needs this wide lens to feel satisfied.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Align with your values',
          body:
            'Filter the information through your personal ethics and goals. If the knowledge does not resonate with who you are, you will likely drop it. Find the "soul" in the data to keep yourself engaged.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Produce a final output',
          body:
            'Commit to a tangible result. Whether it is writing a summary or building a tool, you must ship something. This prevents you from staying in the "eternal student" phase and locks in your mastery.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Narrative → Structure → Practice',
      whyThisOrder:
        'Relational Learner: You need a story or a "who" to care about first. Once you are emotionally invested, the logic becomes easy to memorize and execute.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Identify the narrative',
          body:
            'Find the story behind the subject. Whether it is the history of the creator or the people the knowledge helps, you need a human hook. This emotional investment acts as the "glue" for the facts.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Build the logical structure',
          body:
            'Now that you care, organize the details. Create a clear hierarchy for the information so it does not just feel like a collection of stories. Logic provides the "bones" for the emotional "skin" you have already built.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Move into practice',
          body:
            'Put the knowledge to work in a social or physical context. Helping someone else or practicing in a group setting reinforces the learning because it keeps the "Heart" center active during the "Gut" work.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Passion → Experience → Systematize',
      whyThisOrder:
        'Hands-On Advocate: You learn through the "feeling" of the task. You must do it (Gut) and feel its importance (Heart) before you can organize the rules (Head).',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Ignite the passion',
          body:
            'Start with what excites you about the topic. If you do not feel a spark, you will not have the fuel to sustain the learning. Focus on the transformation or the thrill of the end result.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Gain the experience',
          body:
            'Get your hands dirty. Try, fail, and try again. You learn through the physical feedback of the task. For you, "knowing" is a physical sensation that only comes from repeated, high-energy exposure.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Systematize the process',
          body:
            'Only after you can do the task should you try to explain it. Use your mind to write down the steps or create a checklist. This systematization allows you to repeat your success without relying solely on raw energy.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Resonance → Categorization → Delivery',
      whyThisOrder:
        'Inspired Expert: You need to feel a connection to the subject, then mentally categorize it, and finally teach it or apply it to lock it in.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Seek resonance',
          body:
            'Find a teacher or a resource that speaks your language. You need to feel a connection to the source of the knowledge. When you respect and "vibe" with the source, your brain opens up to receive.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Categorize the insights',
          body:
            'Take the "inspired" information and sort it into mental files. Define the "dos" and "do nots." This mental organization prevents the learning from becoming a vague emotional cloud and turns it into a sharp tool.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Deliver the knowledge',
          body:
            'Teach the subject to someone else or present it. The act of "delivering" the information forces your body to commit to it, ensuring that the synthesis of thought and feeling becomes permanent.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Immersion → Analysis → Mentorship',
      whyThisOrder:
        'Tactile Learner: You learn by breaking things. You need to touch the work first (Gut), then ask how it works (Head), then share the wisdom (Heart).',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Total immersion',
          body:
            'Throw yourself into the deep end. Touch the tools, walk the floor, or break the code. You need to experience the weight and the texture of the work before your "Head" is even interested in the "how."',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Analyze the mechanics',
          body:
            'Once you have felt the work, ask: "Why did it do that?" Now that you have a physical reference point, the technical explanations will finally make sense and stick to your memory.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Step into mentorship',
          body:
            'Share what you have learned through your experience. By helping a beginner navigate the physical hurdles, you find the "meaning" in your mastery, which prevents the work from feeling like a repetitive chore.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Utility → Refinement → Connection',
      whyThisOrder:
        'Pragmatist: You learn by solving a problem. Once the problem is solved, you refine the technique and then see how it helps the team.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Test the utility',
          body:
            'Ask: "What can I do with this right now?" Solve a real problem immediately. If the knowledge is not useful, you will not bother learning it. Your "Gut" needs to see the immediate ROI of the effort.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Refine the technique',
          body:
            'Now that the problem is solved, look for the most efficient way to do it. Use your logic to cut out unnecessary steps. This refinement turns a "rough" skill into a polished, professional capability.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Connect to the team',
          body:
            'Evaluate how your new skill helps the people around you. Seeing the positive impact on your group or community provides the emotional satisfaction that turns a "task" into a "calling."',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Gut → Heart → Head',
      coreFunctions: 'Action → Feedback → Logic',
      whyThisOrder:
        'Intuitive Learner: You need to move. You act, feel the result of the action, and then finally build the mental framework to explain what happened.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Take physical action',
          body:
            'Do not think, just move. Start the activity and let your body react to the environment. You need the kinesthetic input to begin the learning process; stillness is your enemy when trying to master something new.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Listen to the feedback',
          body:
            'How did that action feel? Did it create flow or friction? Use your emotional and physical intuition to adjust your approach. This feedback loop is where your most profound learning occurs.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Formulate the logic',
          body:
            'Finalize the experience by building a mental framework. Explain "what happened" to yourself or someone else. This creates a "Head" based record that allows you to store the experience for future use.',
        },
      ],
    },
    balanced: {
      archetype: 'Sovereign',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Synthesis → Alignment → Production',
      whyThisOrder:
        'Holistic Learner: You need to see how the facts, the people, and the tools all work together before you feel confident enough to ship the final product.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Synthesize the data',
          body:
            'Gather all the facts, rules, and variables. Look at the entire system from a distance to ensure you understand how all the moving parts interact with each other.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Align with the goal',
          body:
            'Ensure the project or knowledge matches your internal "North Star." When your logic and your heart are pointed in the same direction, your "Gut" can act without any internal hesitation.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Production and shipping',
          body:
            'Move into the final phase of creation. Because you have aligned your thoughts and feelings, your physical output is total and decisive. You ship the final product with complete confidence in its quality.',
        },
      ],
    },
  },
}
