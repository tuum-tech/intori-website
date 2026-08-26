import { IOS_BETA_URL } from './appLinks'

export type FaqItem = {
  question: string
  answer: string[]
  bullets?: string[]
}

// The iPhone answers read the same config as the homepage CTAs, so the FAQ
// cannot claim the beta is open before it is, or keep saying "coming soon"
// after it opens. Setting NEXT_PUBLIC_IOS_BETA_URL updates both surfaces at
// once, with no copy change.
const IOS_BETA_IS_OPEN = IOS_BETA_URL !== ''

const WHERE_TO_USE_IPHONE_LINE = IOS_BETA_IS_OPEN
  ? "It is also in the World App, and the iPhone beta is open."
  : "It is also in the World App. An iPhone beta is coming soon."

const IPHONE_ANSWER = IOS_BETA_IS_OPEN
  ? [
      "Yes. The iPhone beta is open, and you can join it from the homepage.",
      "intori also works on the web at app.intori.co, with no install needed.",
    ]
  : [
      "Not yet. An iPhone beta is coming soon, and the homepage will say so the moment it opens.",
      "intori works on the web today at app.intori.co, with no install needed.",
    ]

export const FAQ: FaqItem[] = [
  {
    question: "What is intori?",
    answer: [
      "intori gives you personalized recommendations and plans without starting from scratch every time.",
      "Choose where to start, answer a few quick questions, and intori uses what it learns to shape game-day plans, live shows, what to watch, and food picks around you."
    ]
  },
  {
    question: "Why not just search for this stuff myself?",
    answer: [
      "Because repeating yourself gets old.",
      "Your taste, budget, pace, and boundaries should not have to be explained from scratch every time you want a recommendation. intori learns them once and uses them every time you ask, so each result already starts closer to you."
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
      "intori answers four questions every day: Game Day, Music Events, Watch Radar, and Today's Food.",
      "Each one helps intori understand what you like, what you avoid, and what actually fits your life."
    ]
  },
  {
    question: "Do I need to write prompts?",
    answer: [
      "No. intori is built for people who want useful answers without having to figure out what to ask.",
      "You answer quick questions, and intori turns that into a useful starting point."
    ]
  },
  {
    question: "What can intori do right now?",
    answer: [
      "Four are live now: Game Day, Music Events, Watch Radar, and Today's Food.",
      "Each gives you a useful first pass that fits your taste, timing, and constraints, and you can go deeper in a quick chat inside intori whenever you want more."
    ]
  },
  {
    question: "What makes intori different?",
    answer: [
      "Most tools start you at a blank box and wait for you to explain what you want.",
      "intori already remembers what matters to you and does the first pass for you, so you get game-day plans, live shows, watch-night ideas, and dinner picks without setting the scene every time. When you want more, you go deeper in a quick chat right inside intori."
    ]
  },
  {
    question: "Will I have to keep answering the same questions?",
    answer: [
      "No. That is one of the main problems intori is built to solve.",
      "Repeating your preferences over and over is tiring. intori carries what you have already shared from one answer to the next, so your answers keep making future recommendations and plans better instead of starting over."
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
      WHERE_TO_USE_IPHONE_LINE,
      "Your answers carry over, so whichever one you open, intori already knows you."
    ]
  },
  {
    question: "Is there an iPhone app?",
    answer: IPHONE_ANSWER
  },
  {
    question: "What are Credits?",
    answer: [
      "Credits let you get picks and go deeper on a result.",
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
