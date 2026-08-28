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
      "intori brings your household things worth doing, before anyone has to go looking for them.",
      "Answer a few quick questions about what your family likes, and intori starts bringing you specific, dated picks: the game tonight, a show nearby this weekend, something worth watching, and what's for dinner. Keep the ones you want and they land on the calendar you already use."
    ]
  },
  {
    question: "Do I have to go looking for any of this?",
    answer: [
      "No. That is the whole point.",
      "Finding the good stuff means knowing what to look for, tracking down the date, and remembering before it passes. That is the work almost nobody has time for, which is why the open half of the week stays open. intori does that part and brings you what it finds."
    ]
  },
  {
    question: "How does intori work?",
    answer: [
      "You tell intori a little about what your household likes, and it starts bringing you picks shaped by those answers.",
      "There is no blank box and nothing to write. When a pick is worth holding onto, one tap puts it on the calendar your family already looks at."
    ]
  },
  {
    question: "Will this mess up my family calendar?",
    answer: [
      "No. intori adds only what you choose to keep, and nothing lands on the calendar by itself.",
      "Kept picks go to the calendar your household already looks at, including Skylight, Google Calendar, and Apple Calendar. intori writes to it and never reads it back, so it works alongside whatever you already use instead of replacing it.",
      "On the calendar it is an option, not an obligation. Nothing here has to happen."
    ]
  },
  {
    question: "What can I start with?",
    answer: [
      "Four areas are live: Game Day, Music Events, Watch Radar, and Today's Food.",
      "Each one learns what you like, what you avoid, and what actually fits your week."
    ]
  },
  {
    question: "Is this a chatbot?",
    answer: [
      "No. There is nothing to write and no blank box to fill in.",
      "intori asks short questions, you tap your answers, and it brings you picks. If you want more on something you can ask, but you never have to."
    ]
  },
  {
    question: "What can intori do right now?",
    answer: [
      "Four areas are live: Game Day, Music Events, Watch Radar, and Today's Food.",
      "We are working on one more, for the timely, nearby things a family would be glad to know about before they pass. That one is not live yet, and the site will say so until it is."
    ]
  },
  {
    question: "What makes intori different?",
    answer: [
      "Shared calendars and family displays are good at keeping track of what is already planned. None of them tell you what is worth doing in the first place.",
      "intori works on the other half, the nights and weekends that are still open. It brings you something specific and dated, shaped by what your household actually likes, early enough to say yes."
    ]
  },
  {
    question: "Will I have to keep answering the same questions?",
    answer: [
      "No. That is one of the main problems intori is built to solve.",
      "Repeating your preferences over and over is tiring. intori carries what you have already shared from one answer to the next, so your answers keep making the next pick better instead of starting over."
    ]
  },
  {
    question: "What happens if intori does not know enough yet?",
    answer: [
      "If a pick would be too generic, intori asks one focused follow-up instead of pretending.",
      "A few more answers can make the next one much better."
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
      "Not today. We are focused on households first.",
      "The groundwork is there, so that someone could one day authorize an app to use their intori context instead of answering the same setup questions all over again. It is not open yet, and we would rather say so than collect sign-ups for something we are not ready to support."
    ]
  }
]
