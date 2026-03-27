/**
 * Archetype labels match individual quiz combos. Copy describes this team’s own cognition,
 * energy, and inner patterns — not how they relate to anyone outside the team.
 */
export const TEAM_ARCHETYPES: Record<
  string,
  { archetype: string; headline: string; description: string }
> = {
  'Head Strong': {
    archetype: 'Thinker',
    headline: 'An analysis driven team that seeks clarity and precision',
    description:
      "Focuses on data, systems, and optimization over expression. Makes decisions based on evidence. Breaks things into variables that can be tested and improved. Thrives in environments where precision, structure, and results matter most. Can sometimes miss human input and instinctual insights that guide judgment.",
  },
  'Head + Gut': {
    archetype: 'Tactician',
    headline: 'A decisive team that turns insight into action',
    description:
      "Driven by clear thinking and decisive action. Moves quickly from insight to execution without overanalyzing. Cuts through noise, prioritizes impact, and iterates fast. Thrives in high-pressure environments where speed and results matter. Can sometimes overlook relationships.",
  },
  'Head + Heart': {
    archetype: 'Diplomat',
    headline: 'A thoughtful team that balances logic with empathy',
    description:
      "This team balances thought and feeling, weighing options, costs, and consequences before acting. They value clarity and predictability, moving when both head and heart are aligned. The trade-off is sometimes lingering in analysis, delaying action even when the path is clear.",
  },
  'Heart Strong': {
    archetype: 'Empath',
    headline: 'A relationship driven team that leads with care',
    description:
      "Guided by care for people. Runs on emotional energy and genuine passion. Invests deeply, not casually. Prioritizes relationships over speed or metrics. Works best where people feel seen, felt, and valued. The cost may be slower decisions or extra effort to keep everyone aligned and supported.",
  },
  'Heart + Gut': {
    archetype: 'Shepherd',
    headline: 'An energetic team that acts with passion and conviction',
    description:
      "Fueled by emotional conviction and instinctive action. Creates with passion, not just strategy. Moves quickly on what feels meaningful and timely. Channels energy into stories, trends, and expression that people feel immediately. Thrives when there is freedom to act, express, and connect without overthinking.",
  },
  'Heart + Head': {
    archetype: 'Advisor',
    headline: 'A people conscious team that blends care with clarity',
    description:
      "Uses logic, but always considers people. Makes decisions that are both correct and considerate. Balances clear thinking with awareness of impact. Explains things in a way people actually understand and accept. Strong at aligning what makes sense with what feels right.",
  },
  'Gut Strong': {
    archetype: 'Doer',
    headline: 'An action oriented team that values momentum and directness',
    description:
      "This team's average skews toward action and momentum. The group tends to move first and refine later. Simple beats clever; stillness feels wrong in the body. The trade-off is that some details or subtleties may be missed in the rush, even as progress builds quickly.",
  },
  'Gut + Head': {
    archetype: 'Engineer',
    headline: 'A structured team that moves with speed and purpose',
    description:
      "This team's average skews toward systems that feel solid inside. The group tends to fix, tune, and close what feels off. The gut aims; the head builds the frame. The cost can be overlooking the human side, focusing on what works rather than how it feels.",
  },
  'Gut + Heart': {
    archetype: 'Hero',
    headline: 'A responsive team that combines urgency with care',
    description:
      "This team's average skews toward spikes in energy when stakes feel real inside. The group tends to surge when the work feels worth the burn. Effort and urgency rise together; slow feels wrong in the body. The cost can be overload when inner bandwidth runs out.",
  },
  'Head + Heart + Gut': {
    archetype: 'Sovereign',
    headline: 'A balanced team that integrates thinking, feeling, and action',
    description:
      "This team notices the full picture, using head, heart, and gut together. They work best with clear focus; otherwise, their many perspectives can pull them in different directions. Their strength is turning wide awareness into thoughtful, decisive action.",
  },
}
