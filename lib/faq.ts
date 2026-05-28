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
      "Choose where to start, answer a few quick questions, and intori uses what it learns to shape music ideas, game-day options, time plans, drafts, and more around you."
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
      "intori starts with focused areas like better music ideas, game-day options, and planning your time.",
      "Each area helps intori understand what you like, what you avoid, and what actually fits your life."
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
      "Music is the first area available.",
      "It can help you find music ideas and live-show options that fit your taste, timing, venue comfort, and energy. Game Day and planning your time are next."
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
      "intori is currently available through World, where it is already used by thousands of verified humans.",
      "Broader web access is planned."
    ]
  },
  {
    question: "Why does intori mention verified humans?",
    answer: [
      "World gives intori its first verified-human community.",
      "That helps keep access fair, reduce abuse, and support trust. It is not meant to be the only way people use intori forever."
    ]
  },
  {
    question: "What are Credits?",
    answer: [
      "Credits are a simple way to unlock extra intori moments, like answering more questions or running more personalized recommendations.",
      "The goal is to keep the experience easy: earn or use Credits when you want more."
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
