export type FaqItem = {
  question: string
  answer: string[]
  bullets?: string[]
}

export const FAQ: FaqItem[] = [
  {
    question: "What is intori?",
    answer: [
      "intori helps you get useful personalized recommendations, plans, and drafts without starting from scratch every time.",
      "Choose where to start, answer a few quick questions, and intori uses what it learns to shape food picks, game-day options, live-music ideas, style finds, and more around you."
    ]
  },
  {
    question: "Why would I use intori instead of just asking AI myself?",
    answer: [
      "Because repeating yourself gets old.",
      "Your taste, preferences, pace, budget, interests, and boundaries should not have to be explained again every time you use a new AI tool. intori helps you build that once, then use it wherever you want a more personal starting point."
    ]
  },
  {
    question: "How does intori work?",
    answer: [
      "You choose an area you care about, answer quick questions, and intori uses those answers to make recommendations feel more like you.",
      "When it knows enough, it runs the first request for you. No blank prompt box needed."
    ]
  },
  {
    question: "What can I start with?",
    answer: [
      "intori starts with daily helpers like Today's Food, Game Day, live music, and Style Finds.",
      "Each one helps intori understand what you like, what you avoid, and what actually fits your life."
    ]
  },
  {
    question: "Do I need to write prompts?",
    answer: [
      "No. intori is built for people who want useful AI-assisted output without having to figure out what to ask.",
      "You answer quick questions, and intori turns that into a useful starting point."
    ]
  },
  {
    question: "What can intori do right now?",
    answer: [
      "Four daily helpers are live: Today's Food, Game Day, live-music ideas, and Style Finds.",
      "Each gives you a useful first pass that fits your taste, timing, and constraints — and you can go deeper in a quick chat when you want more."
    ]
  },
  {
    question: "How is intori different from ChatGPT, Claude, or Gemini?",
    answer: [
      "ChatGPT, Claude, and Gemini are great places to keep working.",
      "intori helps with the part before that: remembering what matters to you and getting the first personalized request started. After that, you can continue in the AI tool you already use."
    ]
  },
  {
    question: "Will I have to keep answering the same questions?",
    answer: [
      "No, that is one of the main problems intori is trying to solve.",
      "Like filling out the same form over and over, repeating your preferences to every AI tool is annoying. intori helps you carry what you have already shared into future recommendations, plans, and drafts."
    ]
  },
  {
    question: "What happens if intori does not know enough yet?",
    answer: [
      "If an answer would be too generic, intori asks one focused follow-up instead of pretending.",
      "A few more answers can make the next recommendation much better."
    ]
  },
  {
    question: "Where can I use intori?",
    answer: [
      "intori is on the web at app.intori.co — just sign in to get started.",
      "It is also in the World App, where it is already used by thousands of verified humans."
    ]
  },
  {
    question: "Why does intori mention verified humans?",
    answer: [
      "World ID gives intori a verified-human trust layer and lets your personalization carry across the web and the World App.",
      "It helps keep access fair and reduce abuse, but it is not a gate — anyone can use intori on the web."
    ]
  },
  {
    question: "What are Credits?",
    answer: [
      "Credits let you run helpers and go deeper on a result.",
      "New users get a few starter credits free, and you can buy more whenever you want."
    ]
  },
  {
    question: "Can developers build with intori?",
    answer: [
      "Developer access is coming soon.",
      "The idea is simple: when a user connects intori, an app can start with user-approved personalization instead of asking the same setup questions all over again."
    ]
  }
]
