export type FaqItem = {
  question: string
  answer: string[]
  bullets?: string[]
}

export const FAQ: FaqItem[] = [
  {
    question: "What is intori?",
    answer: [
      "intori gives you personalized recommendations and plans without starting from scratch every time.",
      "Choose where to start, answer a few quick questions, and intori uses what it learns to shape your food picks, game-day plans, live-music ideas, and style finds around you."
    ]
  },
  {
    question: "Why would I use intori instead of just asking AI myself?",
    answer: [
      "Because repeating yourself gets old.",
      "Your taste, budget, pace, and boundaries should not have to be explained from scratch every time you want a recommendation. intori learns them once and uses them across every helper, so each result already starts closer to you."
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
      "Each gives you a useful first pass that fits your taste, timing, and constraints, and you can go deeper in a quick chat inside intori whenever you want more."
    ]
  },
  {
    question: "How is intori different from ChatGPT, Claude, or Gemini?",
    answer: [
      "General AI tools start you at a blank box and wait for you to explain what you want.",
      "intori already remembers what matters to you and does the first pass for you, so you get useful food picks, game-day plans, live-music ideas, and style finds without setting the scene every time. When you want more, you go deeper in a quick chat right inside intori."
    ]
  },
  {
    question: "Will I have to keep answering the same questions?",
    answer: [
      "No. That is one of the main problems intori is built to solve.",
      "Repeating your preferences over and over is tiring. intori carries what you have already shared into every helper, so your answers keep making future recommendations and plans better instead of starting over."
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
      "intori is on the web at app.intori.co. Just sign in to get started.",
      "It is also in the World App, where it is already used by more than 6,655 verified humans."
    ]
  },
  {
    question: "Why does intori mention verified humans?",
    answer: [
      "World ID gives intori a verified-human trust layer and lets your personalization carry across the web and the World App.",
      "It helps keep access fair and reduce abuse, but it is not a gate. Anyone can use intori on the web."
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
