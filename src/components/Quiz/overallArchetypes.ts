export type ArchetypeKey = string

export const OVERALL_ARCHETYPES: Record<
  ArchetypeKey,
  { archetype: string; description: string; quote: string }
> = {
  'Head Strong': {
    archetype: 'Thinker',
    description:
      "You live in models. You don't react, you analyze. Feelings are data. People are systems. You'd rather be right than liked. Silence is where you sharpen your edge.",
    quote: 'If I understand it, I can control it.',
  },
  'Head + Gut': {
    archetype: 'Tactician',
    description:
      "You don't just think, you calculate impact. Every move has timing. Every word has weight. You hate chaos, but you love winning. You trust your instincts after you audit them.",
    quote: 'Precision beats passion.',
  },
  'Head + Heart': {
    archetype: 'Diplomat',
    description:
      'You read rooms like spreadsheets. You understand people without losing logic. You want harmony, but not at the cost of truth. You are the bridge nobody notices holding the war apart.',
    quote: 'Peace, but intelligent.',
  },
  'Heart Strong': {
    archetype: 'Empath',
    description:
      "You feel everything, even what isn't yours. People open up to you without knowing why. You lead with care, but you get hurt easily. Connection is oxygen.",
    quote: 'If you feel it, it matters.',
  },
  'Heart + Gut': {
    archetype: 'Shepherd',
    description:
      "You protect your people fiercely. Your loyalty runs deeper than logic. You don't care who's right, you care who's safe. Cross someone you love and you will see your fire.",
    quote: 'My people first.',
  },
  'Heart + Head': {
    archetype: 'Advisor',
    description:
      "You give counsel like it is second nature. People trust you because you understand both truth and emotion. You don't dominate, you guide. You are often the wisdom behind someone else's success.",
    quote: 'Let me help you see clearly.',
  },
  'Gut Strong': {
    archetype: 'Doer',
    description:
      'You move. While others think, you act. You hate overcomplication. Results matter more than theories. Stillness feels like death.',
    quote: 'Enough talk.',
  },
  'Gut + Head': {
    archetype: 'Engineer',
    description:
      "You build systems that work. You don't guess, you optimize. Efficiency is your love language. If it is broken, you redesign it.",
    quote: 'Make it better.',
  },
  'Gut + Heart': {
    archetype: 'Hero',
    description:
      'You step in when others hesitate. You act from conviction, not calculation. You feel deeply, but you fight anyway. You would rather bleed than watch someone else suffer.',
    quote: 'Someone has to.',
  },
  'Head + Heart + Gut': {
    archetype: 'Sovereign',
    description:
      "You integrate mind, emotion, and instinct. You don't react, you decide. People feel steadier around you. You see the whole board and the human cost.",
    quote: 'I choose.',
  },
}
