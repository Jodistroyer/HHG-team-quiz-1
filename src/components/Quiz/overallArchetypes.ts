export type ArchetypeKey = string

export const OVERALL_ARCHETYPES: Record<
  ArchetypeKey,
  { archetype: string; headline: string; description: string; quote: string }
> = {
  'Head Strong': {
    archetype: 'Thinker',
    headline: 'An analysis driven person who seeks clarity and precision',
    description:
      "You lead with thinking. Your first move in any situation is to understand it: to gather information, analyse the options, and build a clear picture before acting. This gives you real depth and consistency. People trust your reasoning and come to you when something needs to be thought through carefully. The challenge is that thinking can become a place to stay rather than a place to pass through. Without strong access to Gut or Heart, you may find it harder to act on incomplete information, to read the emotional temperature of a room, or to make the call when the data isn't yet clear. The question for you isn't whether your thinking is good; it usually is. It's whether you're letting it serve you, or hiding behind it.",
    quote: 'If I understand it, I can control it.',
  },
  'Head + Gut': {
    archetype: 'Tactician',
    headline: 'A decisive person who turns insight into action',
    description:
      "You think clearly and act boldly, a combination that makes you highly effective across a wide range of situations. You can assess a situation with rigour and then move on it with confidence, often before others have finished deliberating. That speed and decisiveness is a genuine asset. What you may underweight is the relational and emotional dimension of what you're doing. You tend to trust your analysis and your instinct, but other people process the world through feeling, and if you're not attending to that, your best decisions can still land badly. The work for you isn't to think less or slow down. It's to build in a moment (however brief) where you ask what the human experience of this decision will be.",
    quote: 'Precision beats passion.',
  },
  'Head + Heart': {
    archetype: 'Diplomat',
    headline: 'A thoughtful person who balances logic with empathy',
    description:
      "You think carefully and care deeply. You bring both analytical rigour and genuine attentiveness to people, which makes you someone others trust not just for the quality of your thinking but for the quality of your presence. You're likely to be considered, empathetic, and thorough. The challenge is that Head and Heart together can create a loop: you analyse, you check in on how people are feeling, and without something to break the cycle, you can stay in preparation longer than the situation needs. You may also find bold, instinctive action harder to access, particularly when a decision is unpopular or uncertain. The question for you is whether you're using your care and rigour to move well, or using them to avoid moving at all.",
    quote: 'Peace, but intelligent.',
  },
  'Heart Strong': {
    archetype: 'Empath',
    headline: 'A relationship driven person who leads with care',
    description:
      "You lead with feeling. Your first response to any situation is relational: you notice how people are, what they need, and how things are landing emotionally. That attentiveness is a real gift. You build trust naturally, create safety for others, and tend to bring warmth and care into everything you do. The challenge is that leading with Heart alone can make it harder to think analytically under pressure, to act decisively when the situation demands it, or to hold firm when someone pushes back emotionally. You may find yourself accommodating others past the point that serves you or them, because discomfort in a relationship can feel more urgent than the thing that caused it. The work for you is learning that directness and care aren't opposites, and that sometimes the most loving thing you can do is say the clear thing.",
    quote: 'If you feel it, it matters.',
  },
  'Heart + Gut': {
    archetype: 'Shepherd',
    headline: 'An energetic person who acts with passion and conviction',
    description:
      "You feel deeply and move quickly. You're responsive, energising, and genuinely motivated by the people around you, and you back that care with a willingness to act. Others often experience you as warm, direct, and fully present. The challenge is that feeling and instinct together can move faster than thinking. You may commit before you've fully assessed, or act on what feels right without asking whether it's been thought through. You're also more likely to avoid analytical rigour, not because you're incapable of it, but because it can feel slow or cold compared to how naturally you operate. The question for you is whether you're bringing enough structure to match your energy, so that what you're trying to do for people actually lands the way you intend.",
    quote: 'My people first.',
  },
  'Heart + Head': {
    archetype: 'Advisor',
    headline: 'A people conscious person who blends care with clarity',
    description:
      "You lead with care and back it with thinking. People come first for you, and once you're satisfied that the relational ground is solid, you bring real analytical depth to whatever you're working on. You tend to be trusted both as a person and as a thinker, which is a rare combination. The challenge is that Heart first and Head second can mean you spend significant energy making sure everyone is okay before you're able to move. You may also find that your need for relational safety and your need for analytical certainty reinforce each other, both giving you reasons to wait when the situation is calling for action. The question for you isn't whether you care or think well. It's whether you're giving yourself permission to trust both enough to move.",
    quote: 'Let me help you see clearly.',
  },
  'Gut Strong': {
    archetype: 'Doer',
    headline: 'An action oriented person who values momentum and directness',
    description:
      "You lead with instinct. You read situations quickly, back your own judgment, and move with a confidence that others often find compelling. You don't need complete information to act; you trust what you sense, and you're usually right often enough to justify that trust. The challenge is that instinct without the grounding of Head or the attentiveness of Heart can move faster than wisdom. You may act before you've fully understood a situation, or make calls that are directionally right but land harder than they needed to because you didn't attend to the human dimension. You may also find that when your instinct is challenged, your first response is confidence rather than curiosity. The work for you is learning to distinguish between trusting yourself and closing yourself, because one is a strength and the other is a risk.",
    quote: 'Enough talk.',
  },
  'Gut + Head': {
    archetype: 'Engineer',
    headline: 'A structured person who moves with speed and purpose',
    description:
      "You act boldly and think rigorously, a powerful combination that makes you both decisive and credible. You're willing to make the call and able to back it up, which means people tend to follow you and trust the direction you set. What you may underweight is the relational texture of how you operate. You can be highly effective without being particularly warm, and over time, that gap tends to show up in how people experience working with or for you, even when the outcomes are strong. The work for you isn't to become someone different. It's to build in the relational awareness that makes your instinct and analysis land with people, not just on them.",
    quote: 'Make it better.',
  },
  'Gut + Heart': {
    archetype: 'Hero',
    headline: 'A responsive person who combines urgency with care',
    description:
      "You move fast and care genuinely, a combination that makes you energising, loyal, and highly responsive to the people around you. You bring real presence to whatever you're doing, and others tend to feel it. The challenge is that instinct and feeling together can bypass thinking. You may commit quickly, underestimate complexity, or find yourself in situations that your energy and care alone can't resolve. You're also more likely to over-extend, saying yes to too much because the instinct to act and the desire to help are both strong. The question for you is whether you're bringing enough structure and analytical grounding to convert your energy into sustainable results, not just good intentions and momentum.",
    quote: 'Someone has to.',
  },
  'Head + Heart + Gut': {
    archetype: 'Sovereign',
    headline: 'A balanced person who integrates thinking, feeling, and action',
    description:
      "You have access to all three centres: analytical depth, relational warmth, and instinctive confidence. That range is a genuine strength. You can think, feel, and act, and you have the capacity to navigate almost any kind of situation. The challenge is integration. Having access to all three doesn't mean they work together naturally: you may find that different centres pull in different directions, or that under pressure you default strongly to one and lose access to the others. You may also find it harder to be read by others, because you don't have a single dominant mode. The question for you isn't what you're missing. It's whether you're using what you have with intention, choosing which centre to lead from rather than being pulled between them.",
    quote: 'I choose.',
  },
}
