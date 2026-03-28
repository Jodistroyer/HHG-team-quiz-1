/** Shared quiz structure for Quiz.tsx and Teams export builders. */

export type QuizAnswerType = 'Head' | 'Heart' | 'Gut'

export interface QuizQuestion {
  id: string
  text: string
  options: { label: string; type: QuizAnswerType }[]
}

export interface QuizSection {
  id: number
  title: string
  questions: QuizQuestion[]
}

export type QuizAnswer = {
  firstChoice: QuizAnswerType | null
  secondChoice: QuizAnswerType | null
}

export const QUIZ_SECTIONS: QuizSection[] = [
  {
    id: 1,
    title: 'Under Pressure',
    questions: [
      {
        id: '1-1',
        text: 'Something went wrong. First step?',
        options: [
          { label: 'Analyze • Diagnose • Think', type: 'Head' },
          { label: 'Check people • Feel • Sense impact', type: 'Heart' },
          { label: 'Act • Trust gut • Try', type: 'Gut' },
        ],
      },
      {
        id: '1-2',
        text: "You're unsure about the right move. What do you lean on?",
        options: [
          { label: 'Logic • Frameworks • Proven thinking', type: 'Head' },
          { label: 'Values • Feeling • Relationships', type: 'Heart' },
          { label: 'Instinct • Commitment • Forward motion', type: 'Gut' },
        ],
      },
      {
        id: '1-3',
        text: 'Someone criticizes your idea. First reaction?',
        options: [
          { label: 'Evidence • Reason • Clarity', type: 'Head' },
          { label: 'Hurt • Feel • Connect', type: 'Heart' },
          { label: 'React • Defend • Act', type: 'Gut' },
        ],
      },
      {
        id: '1-4',
        text: 'Under Pressure You:',
        options: [
          { label: 'Clarify • Structure • Control', type: 'Head' },
          { label: 'Notice • Sense • Connect', type: 'Heart' },
          { label: 'Push • Assert • Take charge', type: 'Gut' },
        ],
      },
      {
        id: '1-5',
        text: 'Decide with incomplete info. Your response?',
        options: [
          { label: 'Analyze • Gather • Plan', type: 'Head' },
          { label: 'Notice • Sense • Connect', type: 'Heart' },
          { label: 'Act • Adjust later • Move ahead', type: 'Gut' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Doing Work',
    questions: [
      {
        id: '2-1',
        text: 'Starting a big project, your first focus?',
        options: [
          { label: 'Planning • Steps • Clear Metrics', type: 'Head' },
          { label: 'Alignment • Shared Vision • Buy-in', type: 'Heart' },
          { label: 'Get Started • Momentum • Learn By Doing', type: 'Gut' },
        ],
      },
      {
        id: '2-2',
        text: 'Choosing between two options, what matters most?',
        options: [
          { label: 'Accuracy • Reliability • Being correct', type: 'Head' },
          { label: 'Collaboration • Shared purpose • People', type: 'Heart' },
          { label: 'Momentum • Opportunity • Progress', type: 'Gut' },
        ],
      },
      {
        id: '2-3',
        text: 'Deciding What To Work On Next. How Do You Choose?',
        options: [
          { label: 'Impact • Plan • Priority', type: 'Head' },
          { label: 'People • Care • Values', type: 'Heart' },
          { label: 'Action • Speed • Flow', type: 'Gut' },
        ],
      },
      {
        id: '2-4',
        text: 'A deadline is coming up. What gives you confidence?',
        options: [
          { label: 'Prepared • Organized • Clear', type: 'Head' },
          { label: 'Supported • Connected • Committed', type: 'Heart' },
          { label: 'Drive • Momentum • Grit', type: 'Gut' },
        ],
      },
      {
        id: '2-5',
        text: "You're preparing for something important. What feels most critical?",
        options: [
          { label: 'Backup plans • Risk coverage', type: 'Head' },
          { label: 'Atmosphere • Energy • How people feel', type: 'Heart' },
          { label: 'Resources • Readiness • Handling issues', type: 'Gut' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'With People',
    questions: [
      {
        id: '3-1',
        text: 'People are arguing. What stands out most?',
        options: [
          { label: 'Logic • Flaws • Mistakes', type: 'Head' },
          { label: 'Hurt • Connection • Feelings', type: 'Heart' },
          { label: 'Chaos • Tension • Control', type: 'Gut' },
        ],
      },
      {
        id: '3-2',
        text: 'Someone has a very different opinion. What hits you first?',
        options: [
          { label: 'Analyze assumptions • Check reasoning', type: 'Head' },
          { label: 'Try to understand perspective', type: 'Heart' },
          { label: 'Immediate yes/no feeling', type: 'Gut' },
        ],
      },
      {
        id: '3-3',
        text: 'In group settings, what do you naturally contribute?',
        options: [
          { label: 'Clarifying ideas • Structuring discussion', type: 'Head' },
          { label: 'Supporting others • Smoothing tension', type: 'Heart' },
          { label: 'Leading action • Making decisions', type: 'Gut' },
        ],
      },
      {
        id: '3-4',
        text: 'You made a mistake. How does your mind respond first?',
        options: [
          { label: 'Figure out what went wrong and fix it', type: 'Head' },
          { label: 'Think about who was affected', type: 'Heart' },
          { label: 'Move on quickly and refocus', type: 'Gut' },
        ],
      },
      {
        id: '3-5',
        text: 'When you think about past experiences, what do you dwell on most?',
        options: [
          { label: 'What would have been the smarter choice', type: 'Head' },
          { label: 'How it felt and what it meant', type: 'Heart' },
          { label: "What I'd do differently next time", type: 'Gut' },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Getting Better',
    questions: [
      {
        id: '4-1',
        text: 'In conversations, what do you pay attention to most?',
        options: [
          { label: 'Accuracy • Details • How things work', type: 'Head' },
          { label: 'Stories • Motivations • Feelings', type: 'Heart' },
          { label: "Outcomes • Actions • What's next", type: 'Gut' },
        ],
      },
      {
        id: '4-2',
        text: 'When learning something new, what helps you most?',
        options: [
          { label: 'Clear models • Systems • Principles', type: 'Head' },
          { label: 'Real stories • Human examples', type: 'Heart' },
          { label: 'Trying it myself • Hands-on', type: 'Gut' },
        ],
      },
      {
        id: '4-3',
        text: 'What does "success" mean most to you?',
        options: [
          { label: 'Mastery • Competence • Expertise', type: 'Head' },
          { label: 'Strong relationships • Belonging', type: 'Heart' },
          { label: 'Progress • Independence • Results', type: 'Gut' },
        ],
      },
      {
        id: '4-4',
        text: 'After finishing a big project, what do you judge it by first?',
        options: [
          { label: 'Whether it met the original standards', type: 'Head' },
          { label: 'How people felt during the process', type: 'Heart' },
          { label: 'How decisively it was executed', type: 'Gut' },
        ],
      },
      {
        id: '4-5',
        text: "When you're given a lot of new information, what do you do first?",
        options: [
          { label: 'Organize and make sense of it', type: 'Head' },
          { label: 'Look for meaning or relevance', type: 'Heart' },
          { label: 'Pull out what I can use right away', type: 'Gut' },
        ],
      },
    ],
  },
]
