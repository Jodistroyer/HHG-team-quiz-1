import type { FlowSituation } from '../flowTypes'
import { makeSequence, PLACEHOLDER_WHY } from '../situationHelpers'

export const THRIVE_ZONE_SITUATION_ID = 'thrive-zone' as const

export const thriveZoneFlowSituation: FlowSituation = {
  id: THRIVE_ZONE_SITUATION_ID,
  title: 'Thrive zone',
  cardTitle: 'Thrive zone',
  cardDescription: 'Find the work environment where head, heart, and gut all stay fed.',
  readMinutes: 2,
  sequence: makeSequence(),
  whyText: PLACEHOLDER_WHY,
  variants: {
    'head-strong': {
      archetype: 'Thinker',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Complexity → Meaning → Output',
      whyThisOrder:
        'Prioritize the Mental Playground: Thrives in R&D, strategy, or coding. Needs an environment where logic is king, followed by a sense of purpose and a clear final product.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Analyze the complexity',
          body:
            'Engage with a difficult problem that requires deep focus. Your satisfaction begins when your mind is challenged by variables, data, or intricate systems. This mental stimulation provides the "fuel" for your entire workday.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Connect to the meaning',
          body:
            'Identify who benefits from your mental labor. Whether it is a client or a future user, attaching a "why" to your logic prevents the work from feeling like a cold, academic exercise. It gives your thoughts a heartbeat.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Produce the final output',
          body:
            'Move the solution from your mind to the real world. Commit to a finished piece of code, a strategic deck, or a research paper. This tangible result satisfies your need to see your logic become a physical reality.',
        },
      ],
    },
    'head-gut': {
      archetype: 'Tactician',
      negotiationOrder: 'Head → Gut → Heart',
      coreFunctions: 'Architecture → Mastery → Culture',
      whyThisOrder:
        'Reward High-Stakes Competence: Needs high-stakes problem solving (Head) and the power to execute (Gut). Enjoys environments that prize results over "office politics."',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Architect the solution',
          body:
            'Map out the most efficient way to achieve the goal. You need to see the "path to victory" clearly. Once the logic of the win is established, your energy shifts from observation to execution.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Demonstrate mastery through action',
          body:
            'Take ownership of the high-stakes tasks. Execute with speed and precision. You feel most alive when you are "in the arena" proving your competence through direct, measurable results.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Evaluate the culture',
          body:
            'Check in on the professional relationships. Once the work is done and the win is secured, ensure the environment still feels like a place where you want to stay. For you, respect for your competence is the highest form of connection.',
        },
      ],
    },
    'head-heart': {
      archetype: 'Diplomat',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'System → Service → Result',
      whyThisOrder:
        'Optimize Systems for People: Thrives in non-profits or UX design. Needs to see the logic behind the system and how that system helps people.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Understand the system',
          body:
            'Deconstruct how the organization or project functions. You need to know that the underlying logic is sound. A broken or nonsensical system will drain your energy before you even start.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Assess the service impact',
          body:
            'Look at the people at the other end of the system. How does this work improve their lives? When you see the intersection of "smart logic" and "human help," your motivation reaches its peak.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Deliver the result',
          body:
            'Follow through on the implementation. Use your hands to refine the user experience or the service delivery. This final step ensures that your idealism and logic result in a practical improvement for someone else.',
        },
      ],
    },
    'heart-strong': {
      archetype: 'Empath',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Community → Growth → Action',
      whyThisOrder:
        'Value the Cultural Tribe: Thrives in HR, coaching, or team-centric roles. Needs shared values and connection (Heart) before the technical tasks feel worth doing.',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Establish the connection',
          body:
            'Start your day with a check-in or a collaborative moment. You need to feel that you are part of a "tribe" with shared values. Without this relational foundation, the technical work feels empty and purposeless.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Contribute to growth',
          body:
            'Use your mind to figure out how to help the team or the individual grow. Developing a curriculum, a coaching plan, or a cultural initiative satisfies your need to be a "Head" based resource for your "Heart" based tribe.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Take collective action',
          body:
            'Execute the tasks that move the team forward. Whether it is leading a meeting or finalizing an HR policy, your "doing" is fueled by the knowledge that you are acting on behalf of the people you care about.',
        },
      ],
    },
    'heart-gut': {
      archetype: 'Defender',
      negotiationOrder: 'Heart → Gut → Head',
      coreFunctions: 'Mission → Momentum → Logic',
      whyThisOrder:
        'Fuse Belief with Pace: Needs to believe in the brand (Heart) and have a fast-paced "do-er" culture (Gut). Logic and structure are secondary to the "vibe."',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Align with the mission',
          body:
            'Confirm that you believe in what the company stands for. If you do not "vibe" with the brand or the goal, your energy will stall. You need a cause that you can get behind with total emotional honesty.',
        },
        {
          brain: 'Gut',
          label: 'Step 2',
          title: 'Build the momentum',
          body:
            'Jump into the fast-paced work. You thrive in environments where things are moving quickly and there is a "bias for action." Physical movement and quick wins keep your "Gut" center satisfied.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Refine the logic',
          body:
            'Once the momentum is established, use your mind to clean up the details. Add a bit of structure to the chaos. This ensures that your high-speed "doing" is also sustainable and logically sound over the long term.',
        },
      ],
    },
    'heart-head': {
      archetype: 'Advisor',
      negotiationOrder: 'Heart → Head → Gut',
      coreFunctions: 'Belonging → Innovation → Creation',
      whyThisOrder:
        'Cultivate Safe Innovation: Needs to feel psychologically safe (Heart) to share big, innovative ideas (Head) that eventually turn into a tangible portfolio (Gut).',
      steps: [
        {
          brain: 'Heart',
          label: 'Step 1',
          title: 'Verify psychological safety',
          body:
            'Ensure you are in an environment where you are respected and safe to fail. For you, the "Heart" must feel secure before the "Head" is willing to take the creative risks necessary for innovation.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Iterate on innovative ideas',
          body:
            'Once you feel safe, let your mind run wild. Solve problems in ways no one else has thought of. This "mental playground" is where your best work happens, as you synthesize old data into new concepts.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Create the portfolio',
          body:
            'Turn your ideas into a visible, tangible portfolio. Whether it is a design, a prototype, or a presentation, you need to see your "innovative heart" reflected in a physical object that you can show to the world.',
        },
      ],
    },
    'gut-strong': {
      archetype: 'Doer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Autonomy → Problem-Solving → Loyalty',
      whyThisOrder:
        'Require Spatial Autonomy: Thrives in trades, sales, or solo-ventures. Needs to "own" their space (Gut) and solve puzzles (Head) before worrying about the team.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Secure your autonomy',
          body:
            'Establish your physical space and your "ownership" of the task. You need to know that you have the freedom to move and decide without someone hovering over your shoulder. Autonomy is your primary requirement for fulfillment.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Solve the immediate puzzle',
          body:
            'Engage with the technical problem in front of you. Use your logic to fix the machine, close the sale, or build the structure. You enjoy the direct relationship between "thinking" and "fixing."',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Build long-term loyalty',
          body:
            'Once you have proven you can "own" the work, connect with your clients or colleagues. Your loyalty is built on a foundation of mutual respect for boundaries and competence, creating a stable "Heart" center over time.',
        },
      ],
    },
    'gut-head': {
      archetype: 'Engineer',
      negotiationOrder: 'Gut → Head → Heart',
      coreFunctions: 'Efficiency → Precision → Connection',
      whyThisOrder:
        'Measure Objective Results: Needs an environment where performance is measured by results (Gut) and technical accuracy (Head). Likes clear hierarchies.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Execute for efficiency',
          body:
            'Start by knocking out the most high-impact, physical, or direct tasks. You thrive in environments that value "getting it done" without excessive talking. Seeing the physical evidence of your work provides instant satisfaction.',
        },
        {
          brain: 'Head',
          label: 'Step 2',
          title: 'Apply technical precision',
          body:
            'Double check the details. Ensure the work meets the highest technical standards. Your "Head" enjoys the process of refining the "Gut" output until it is a masterpiece of precision and logic.',
        },
        {
          brain: 'Heart',
          label: 'Step 3',
          title: 'Connect via the hierarchy',
          body:
            'Identify your place in the team and support the collective goal. You find "Heart" fulfillment in being a reliable, high-performing part of a clear structure where everyone knows their role.',
        },
      ],
    },
    'gut-heart': {
      archetype: 'Hero',
      negotiationOrder: 'Gut → Heart → Head',
      coreFunctions: 'Movement → Advocacy → Systems',
      whyThisOrder:
        'Link Action to Connection: Thrives in emergency services or hospitality. Needs physical activity (Gut) and immediate human connection (Heart) to feel satisfied.',
      steps: [
        {
          brain: 'Gut',
          label: 'Step 1',
          title: 'Engage in movement',
          body:
            'Start your work with physical activity. Whether you are on your feet in a hospital or moving through a busy kitchen, your "Gut" needs to be physically engaged to wake up your other centers.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Advocate for the person',
          body:
            'Use your physical presence to help someone in real-time. The immediate human connection—saving a life, serving a meal, or solving a crisis—provides the emotional reward that makes the hard work worth it.',
        },
        {
          brain: 'Head',
          label: 'Step 3',
          title: 'Navigate the systems',
          body:
            'Use your mind to understand the protocols and systems that keep the work organized. This "Head" center ensures that your rapid-fire action and connection do not lead to burnout or systemic chaos.',
        },
      ],
    },
    balanced: {
      archetype: 'Sovereign',
      negotiationOrder: 'Head → Heart → Gut',
      coreFunctions: 'Synthesize → Align → Produce',
      whyThisOrder:
        'Engage Holistic Complexity: Thrives in Project Management. Needs a job that engages the brain, the heart, and the hands in equal measure to avoid boredom.',
      steps: [
        {
          brain: 'Head',
          label: 'Step 1',
          title: 'Synthesize the dynamics',
          body:
            'Look at the project from all angles. Understand the data, the timeline, and the people involved. You need this "bird\'s eye view" to feel that you have a handle on the complexity of the job.',
        },
        {
          brain: 'Heart',
          label: 'Step 2',
          title: 'Align the stakeholders',
          body:
            'Check in with the people. Ensure that everyone\'s goals and feelings are in harmony with the project logic. This "Heart" work prevents the project from becoming a cold, mechanical process that ignores the human element.',
        },
        {
          brain: 'Gut',
          label: 'Step 3',
          title: 'Produce the unified result',
          body:
            'Lead the final push to completion. Because you have balanced the logic and the people, your "Gut" can act with total confidence, delivering a product that is smart, kind, and physically complete.',
        },
      ],
    },
  },
}
