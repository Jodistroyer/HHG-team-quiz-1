/**
 * Archetype labels match individual quiz combos. Copy describes this team’s own cognition,
 * energy, and inner patterns. It is not about how they relate to anyone outside the team.
 */
export const TEAM_ARCHETYPES: Record<
  string,
  { archetype: string; headline: string; description: string }
> = {
  'Head Strong': {
    archetype: 'Thinker',
    headline: 'An analysis driven team that seeks clarity and precision',
    description:
      "This team thinks rigorously and values evidence above all else. It produces thorough, well-reasoned output and tends to be consistent and reliable in its approach. With less access to Heart and Gut, the team may underweight the human and instinctive dimensions of situations meaning decisions can be technically sound but miss what people need, or take longer than the moment allows. The risk isn't that the team thinks badly; it's that it may think past the point where thinking is still useful.",
  },
  'Head + Gut': {
    archetype: 'Tactician',
    headline: 'A decisive team that turns insight into action',
    description:
      "This team knows how to think and knows how to move. Head provides structure and rigour; Gut provides the confidence to act on incomplete information. Together they produce a team that is capable, efficient, and hard to rattle. With less Heart, the team may underweight the relational and emotional dimensions of its work, meaning decisions can be well-reasoned and boldly executed but still land badly on the people affected. The risk isn't incompetence; it's a team that works efficiently but doesn't always bring people with it.",
  },
  'Head + Heart': {
    archetype: 'Diplomat',
    headline: 'A thoughtful team that balances logic with empathy',
    description:
      "This team thinks carefully and cares deeply. It tends to produce well-considered decisions that take people into account, and it's likely to be trusted by those around it. The missing Gut centre means the team may find boldness harder to access, particularly when speed matters or when a decision is unpopular. The two types Head + Heart can create a loop: Head analyses, Heart checks how everyone is feeling. Without something to break the cycle, the team can stay in preparation longer than it needs to.",
  },
  'Heart Strong': {
    archetype: 'Empath',
    headline: 'A relationship driven team that leads with care',
    description:
      "This team is genuinely relational and attuned to how people feel, skilled at building trust, and committed to creating an environment where others feel safe and valued. With less Head and Gut, it may find structured analysis and bold decisiveness harder to access. The risk isn't that the team doesn't care;it clearly does, but that caring can become the primary lens through which all decisions are made, making it harder to be rigorous, direct, or fast when the situation calls for it.",
  },
  'Heart + Gut': {
    archetype: 'Defender',
    headline: 'An energetic team that acts with passion and conviction',
    description:
      "This team moves with heart and speed. It's energising to be around, builds loyalty quickly, and tends to get things done without needing much external push. With less Head, it may underinvest in analytical rigour, structured planning, and objective evaluation of options. The risk isn't that the team doesn't try hard or care;it clearly does both, but that effort and intent can move faster than thinking, and the team may find itself in situations it hasn't fully prepared for."
  },
  'Heart + Head': {
    archetype: 'Advisor',
    headline: 'A people conscious team that blends care with clarity',
    description:
      "This team puts people first and thinks things through well. It tends to be trusted both for its analytical competence and for its genuine attentiveness to the humans involved. With less Gut, the team may find bold, instinctive action harder to access particularly when speed matters, when decisions are unpopular, or when the right call is uncomfortable to make. The combination of Heart first and Head second can mean the team spends significant energy ensuring everyone is okay before it's able to move."
  },
  'Gut Strong': {
    archetype: 'Doer',
    headline: 'An action oriented team that values momentum and directness',
    description:
      "This team doesn't wait. It reads situations quickly, backs its own judgment, and gets things moving. That confidence is a genuine asset particularly in fast-moving or high-uncertainty environments. With less Head and Heart, the team may underinvest in analytical rigour and relational attentiveness. The risk isn't that the team lacks conviction. It has plenty, but that conviction can move ahead of understanding, and the impact on people may go unregistered until it becomes a problem."
  },
  'Gut + Head': {
    archetype: 'Engineer',
    headline: 'A structured team that moves with speed and purpose',
    description:
      "This team has both the capacity to think well and the willingness to act boldly. Gut provides speed and conviction; Head provides structure and rigour. Together they produce a team that is highly effective across complex, fast-moving environments. With less Heart, the team may underweight the relational and emotional dimensions of its work. Decisions can be excellent in quality and execution but still land badly because the people dimension wasn't sufficiently attended to."
  },
  'Gut + Heart': {
    archetype: 'Hero',
    headline: 'A responsive team that combines urgency with care',
    description:
      "This team brings energy, warmth, and a bias toward action. It builds loyalty quickly, responds fast to what's in front of it, and genuinely cares about the people around it. With less Head, it may underinvest in analytical rigour, structured planning, and objective evaluation of options. The risk is that effort, intent, and relationship, all of which this team has in abundance, can move faster than thinking, and the team may find itself in situations it hasn't fully prepared for, despite genuinely trying."
  },
  'Head + Heart + Gut': {
    archetype: 'Sovereign',
    headline: 'A balanced team that integrates thinking, feeling, and action',
    description:
      "This team has access to everything: analytical depth, relational warmth, and instinctive confidence. That range is a genuine strength. The team can think, connect, and act, and has the capacity to navigate almost any kind of challenge. The risk is not absence but friction. Each centre brings a different default lens, and without shared language and intentional coordination, this diversity can generate as much tension as insight. The question for a Head + Heart + Gut team is less about what it's missing and more about how well it uses what it has."
  },
}
