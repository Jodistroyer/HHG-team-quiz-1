export type ArchetypeKey = string

export type ArchetypePart = {
  headline: string
  body: string
}

export type ArchetypeParts = {
  vibe: ArchetypePart
  challenge: ArchetypePart
  question: ArchetypePart
}

export type OverallArchetype = {
  archetype: string
  headline: string
  /** Legacy markdown block (PDF / exports). */
  description: string
  parts: ArchetypeParts
  quote: string
}

export const OVERALL_ARCHETYPES: Record<ArchetypeKey, OverallArchetype> = {
  'Head Strong': {
    archetype: 'Thinker',
    headline: 'An analysis driven person who seeks clarity and precision',
    description:
      "You lead with thinking. Your first move in any situation is to understand it: to gather information, analyse the options, and build a clear picture before acting.\n\nThis gives you real depth and consistency. People trust your reasoning and come to you when something needs to be thought through carefully.\n\n**Thinking can become a place to stay rather than a place to pass through.**\n\nWithout strong access to Gut or Heart, you may find it harder to act on incomplete information, to read the emotional temperature of a room, or to make the call when the data isn't yet clear.\n\nThe question for you isn't whether your thinking is good; it usually is. It's whether you're letting it serve you, or hiding behind it.",
    parts: {
      vibe: {
        headline: 'Clear, Analytical & Trusted',
        body:
          'You lead with thinking. Your first move in any situation is to understand it: to gather information, analyse the options, and build a clear picture before acting.\n\nThis gives you real depth and consistency. People trust your reasoning and come to you when something needs to be thought through carefully.',
      },
      challenge: {
        headline: 'When thinking becomes a hiding place',
        body:
          "Without strong access to Gut or Heart, you may find it harder to act on incomplete information, to read the emotional temperature of a room, or to make the call when the data isn't yet clear.",
      },
      question: {
        headline:
          "Is your thinking serving you, or are you hiding behind it?",
        body: '',
      },
    },
    quote: 'If I understand it, I can control it.',
  },
  'Head + Gut': {
    archetype: 'Tactician',
    headline: 'A decisive person who turns insight into action',
    description:
      "You think clearly and act boldly, a combination that makes you highly effective across a wide range of situations. You can assess a situation with rigour and then move on it with confidence, often before others have finished deliberating. That speed and decisiveness is a genuine asset.\n\n**Other people process the world through feeling.**\n\nYou tend to trust your analysis and your instinct, but if you're not attending to that emotional dimension, your best decisions can still land badly.\n\nThe work for you isn't to think less or slow down. It's to build in a moment (however brief) where you ask what the human experience of this decision will be.",
    parts: {
      vibe: {
        headline: 'Fast, Decisive & Effective',
        body:
          'You think clearly and act boldly, a combination that makes you highly effective. You can assess a situation with rigour and then move on it with confidence, often before others have finished deliberating. That speed and decisiveness is a genuine asset.',
      },
      challenge: {
        headline: 'Remembering the human dimension',
        body:
          "Other people process the world through feeling. You tend to trust your analysis and your instinct, but if you're not attending to that emotional dimension, your best decisions can still land badly.",
      },
      question: {
        headline:
          'Are you building in a moment to ask how this decision will feel for the people involved?',
        body: '',
      },
    },
    quote: 'Precision beats passion.',
  },
  'Head + Heart': {
    archetype: 'Diplomat',
    headline: 'A thoughtful person who balances logic with empathy',
    description:
      "You think carefully and care deeply. You bring both analytical rigour and genuine attentiveness to people. You're likely to be considerate, empathetic, and thorough.\n\n**Others trust you for your thinking and your presence.**\n\nThe challenge is that Head and Heart together can create a loop: you analyse, you check in on how people are feeling, and without something to break the cycle, you can stay in preparation longer than the situation needs. You may also find bold, instinctive action harder to access, particularly when a decision is unpopular or uncertain.\n\nThe question for you is whether you're using your care and rigour to move well, or using them to avoid moving at all.",
    parts: {
      vibe: {
        headline: 'Thoughtful, Caring & Thorough',
        body:
          "You think carefully and care deeply. You bring both analytical rigour and genuine attentiveness to people. You're likely to be considerate, empathetic, and thorough.\n\nOthers trust you for your thinking and your presence.",
      },
      challenge: {
        headline: 'The preparation loop',
        body:
          'Head and Heart together can create a loop: you analyse, you check in on how people are feeling, and without something to break the cycle, you can stay in preparation longer than the situation needs. Bold, instinctive action can be harder to access when a decision is unpopular or uncertain.',
      },
      question: {
        headline:
          "Are you using your care and rigour to move well, or to avoid moving at all?",
        body: '',
      },
    },
    quote: 'Peace, but intelligent.',
  },
  'Heart Strong': {
    archetype: 'Empath',
    headline: 'A relationship driven person who leads with care',
    description:
      "You lead with feeling. Your first response to any situation is relational: you notice how people are, what they need, and how things are landing emotionally.\n\n**That attentiveness is a real gift.**\n\nYou build trust naturally, create safety for others, and tend to bring warmth and care into everything you do.\n\nThe challenge is that leading with Heart alone can make it harder to think analytically under pressure, to act decisively when the situation demands it, or to hold firm when someone pushes back emotionally. You may find yourself accommodating others past the point that serves you or them, because discomfort in a relationship can feel more urgent than the thing that caused it.\n\nThe work for you is learning that directness and care aren't opposites, and that sometimes the most loving thing you can do is say the clear thing.",
    parts: {
      vibe: {
        headline: 'Warm, Attentive & Trust-Building',
        body:
          'You lead with feeling. Your first response to any situation is relational: you notice how people are, what they need, and how things are landing emotionally.\n\nThat attentiveness is a real gift. You build trust naturally, create safety for others, and bring warmth and care into what you do.',
      },
      challenge: {
        headline: 'When care makes the hard call harder',
        body:
          'Leading with Heart alone can make it harder to think analytically under pressure, to act decisively when the situation demands it, or to hold firm when someone pushes back emotionally. You may accommodate others past the point that serves you or them, because relationship discomfort can feel more urgent than the issue itself.',
      },
      question: {
        headline:
          'Can you be direct and caring at the same time, and say the clear thing when it matters most?',
        body: '',
      },
    },
    quote: 'If you feel it, it matters.',
  },
  'Heart + Gut': {
    archetype: 'Defender',
    headline: 'An energetic person who acts with passion and conviction',
    description:
      "You feel deeply and move quickly. You're responsive, energising, and genuinely motivated by the people around you, and you back that care with a willingness to act.\n\n**Others often experience you as warm, direct, and fully present.**\n\nThe challenge is that feeling and instinct together can move faster than thinking. You may commit before you've fully assessed, or act on what feels right without asking whether it's been thought through. You're also more likely to avoid analytical rigour, not because you're incapable of it, but because it can feel slow or cold compared to how naturally you operate.\n\nThe question for you is whether you're bringing enough structure to match your energy, so that what you're trying to do for people actually lands the way you intend.",
    parts: {
      vibe: {
        headline: 'Warm, Direct & Present',
        body:
          "You feel deeply and move quickly. You're responsive, energising, and genuinely motivated by the people around you, and you back that care with a willingness to act.\n\nOthers often experience you as warm, direct, and fully present.",
      },
      challenge: {
        headline: 'Balancing speed with structure',
        body:
          "Feeling and instinct together can move faster than thinking. You may commit before you've fully assessed, or act on what feels right without asking whether it's been thought through. Analytical rigour can feel slow or cold compared to how naturally you operate, even though you're capable of it.",
      },
      question: {
        headline:
          'Are you bringing enough structure to match your energy, so that your care for others lands exactly how you intend?',
        body: '',
      },
    },
    quote: 'My people first.',
  },
  'Heart + Head': {
    archetype: 'Advisor',
    headline: 'A people conscious person who blends care with clarity',
    description:
      "You lead with care and back it with thinking. People come first for you, and once you're satisfied that the relational ground is solid, you bring real analytical depth to whatever you're working on.\n\n**You tend to be trusted both as a person and as a thinker.**\n\nThat's a rare combination. The challenge is that Heart first and Head second can mean you spend significant energy making sure everyone is okay before you're able to move. You may also find that your need for relational safety and your need for analytical certainty reinforce each other, both giving you reasons to wait when the situation is calling for action.\n\nThe question for you isn't whether you care or think well. It's whether you're giving yourself permission to trust both enough to move.",
    parts: {
      vibe: {
        headline: 'Caring First, Clear Second',
        body:
          "You lead with care and back it with thinking. People come first for you, and once the relational ground feels solid, you bring real analytical depth to whatever you're working on.\n\nYou're trusted both as a person and as a thinker, a rare combination.",
      },
      challenge: {
        headline: 'When safety and certainty both say wait',
        body:
          'Heart first and Head second can mean significant energy goes into making sure everyone is okay before you move. Your need for relational safety and analytical certainty can reinforce each other, both giving you reasons to wait when the situation is calling for action.',
      },
      question: {
        headline:
          "Are you giving yourself permission to trust both your care and your thinking enough to move?",
        body: '',
      },
    },
    quote: 'Let me help you see clearly.',
  },
  'Gut Strong': {
    archetype: 'Doer',
    headline: 'An action oriented person who values momentum and directness',
    description:
      "You lead with instinct. You read situations quickly, back your own judgment, and move with a confidence that others often find compelling. You don't need complete information to act; you trust what you sense, and you're usually right often enough to justify that trust.\n\n**Instinct without Head or Heart can move faster than wisdom.**\n\nYou may act before you've fully understood a situation, or make calls that are directionally right but land harder than they needed to because you didn't attend to the human dimension. You may also find that when your instinct is challenged, your first response is confidence rather than curiosity.\n\nThe work for you is learning to distinguish between trusting yourself and closing yourself, because one is a strength and the other is a risk.",
    parts: {
      vibe: {
        headline: 'Instinctive, Confident & Compelling',
        body:
          "You lead with instinct. You read situations quickly, back your own judgment, and move with a confidence others often find compelling. You don't need complete information to act: you trust what you sense, and you're usually right often enough to justify that trust.",
      },
      challenge: {
        headline: 'When instinct outruns wisdom',
        body:
          "Instinct without Head or Heart can move faster than wisdom. You may act before you've fully understood a situation, or make calls that land harder than they needed to because you didn't attend to the human dimension. When your instinct is challenged, confidence can show up before curiosity.",
      },
      question: {
        headline:
          'Are you trusting yourself, or closing yourself off when someone pushes back?',
        body: '',
      },
    },
    quote: 'Enough talk.',
  },
  'Gut + Head': {
    archetype: 'Engineer',
    headline: 'A structured person who moves with speed and purpose',
    description:
      "You act boldly and think rigorously, a powerful combination that makes you both decisive and credible. You're willing to make the call and able to back it up, which means people tend to follow you and trust the direction you set.\n\n**You can be highly effective without being particularly warm.**\n\nOver time, that gap tends to show up in how people experience working with or for you, even when the outcomes are strong.\n\nThe work for you isn't to become someone different. It's to build in the relational awareness that makes your instinct and analysis land with people, not just on them.",
    parts: {
      vibe: {
        headline: 'Bold, Rigorous & Credible',
        body:
          "You act boldly and think rigorously, a combination that makes you both decisive and credible. You're willing to make the call and able to back it up, so people tend to follow you and trust the direction you set.",
      },
      challenge: {
        headline: 'Effective without always feeling warm',
        body:
          'You can be highly effective without being particularly warm. Over time, that gap tends to show up in how people experience working with or for you, even when the outcomes are strong.',
      },
      question: {
        headline:
          'Are your instinct and analysis landing with people, not just on them?',
        body: '',
      },
    },
    quote: 'Make it better.',
  },
  'Gut + Heart': {
    archetype: 'Hero',
    headline: 'A responsive person who combines urgency with care',
    description:
      "You move fast and care genuinely, a combination that makes you energising, loyal, and highly responsive to the people around you.\n\n**You bring real presence to whatever you're doing.**\n\nOthers tend to feel it. The challenge is that instinct and feeling together can bypass thinking. You may commit quickly, underestimate complexity, or find yourself in situations that your energy and care alone can't resolve. You're also more likely to over-extend, saying yes to too much because the instinct to act and the desire to help are both strong.\n\nThe question for you is whether you're bringing enough structure and analytical grounding to convert your energy into sustainable results, not just good intentions and momentum.",
    parts: {
      vibe: {
        headline: 'Fast, Caring & Fully Present',
        body:
          "You move fast and care genuinely, a combination that makes you energising, loyal, and highly responsive to the people around you.\n\nYou bring real presence to whatever you're doing. Others tend to feel it.",
      },
      challenge: {
        headline: 'When energy bypasses thinking',
        body:
          "Instinct and feeling together can bypass thinking. You may commit quickly, underestimate complexity, or find yourself in situations your energy and care alone can't resolve. You're also more likely to over-extend, saying yes because the instinct to act and the desire to help are both strong.",
      },
      question: {
        headline:
          'Are you converting your energy into sustainable results, not just good intentions and momentum?',
        body: '',
      },
    },
    quote: 'Someone has to.',
  },
  'Head + Heart + Gut': {
    archetype: 'Sovereign',
    headline: 'A balanced person who integrates thinking, feeling, and action',
    description:
      "You have access to all three centres: analytical depth, relational warmth, and instinctive confidence. That range is a genuine strength. You can think, feel, and act, and you have the capacity to navigate almost any kind of situation.\n\n**Having access to all three doesn't mean they work together naturally.**\n\nYou may find that different centres pull in different directions, or that under pressure you default strongly to one and lose access to the others. You may also find it harder to be read by others, because you don't have a single dominant mode.\n\nThe question for you isn't what you're missing. It's whether you're using what you have with intention, choosing which centre to lead from rather than being pulled between them.",
    parts: {
      vibe: {
        headline: 'Range Across Thinking, Feeling & Action',
        body:
          'You have access to all three centres: analytical depth, relational warmth, and instinctive confidence. You can think, feel, and act, and you have the capacity to navigate almost any kind of situation.',
      },
      challenge: {
        headline: 'When three centres pull in different directions',
        body:
          "Having access to all three doesn't mean they work together naturally. Different centres can pull in different directions, or under pressure you may default strongly to one and lose access to the others. Others may find you harder to read because you don't have a single dominant mode.",
      },
      question: {
        headline:
          'Are you choosing which centre to lead from, with intention, rather than being pulled between them?',
        body: '',
      },
    },
    quote: 'I choose.',
  },
}
