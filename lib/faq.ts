import { IOS_CHANNEL } from './appLinks'

export type FaqItem = {
  question: string
  answer: string[]
  bullets?: string[]
}

// The iPhone answers read the same config as the homepage CTAs, so the FAQ
// cannot claim iOS is available before it is, or keep saying "coming soon"
// after it ships. Setting NEXT_PUBLIC_IOS_APP_STORE_URL (or the older
// NEXT_PUBLIC_IOS_BETA_URL) updates both surfaces at once, with no copy change.
const WHERE_TO_USE_ANSWER =
  IOS_CHANNEL === 'appstore'
    ? [
        "intori is on the App Store for iPhone, and that is the best way to use it: Sign in with Apple, one tap to your calendar, and reminders on your lock screen.",
        "It also works in any browser at app.intori.co, and in the World App. Sign in with the same account and intori already knows you, whichever one you open.",
      ]
    : IOS_CHANNEL === 'beta'
      ? [
          "The iPhone beta is open, and it is the best way to use intori: Sign in with Apple, one tap to your calendar, and reminders on your lock screen.",
          "intori also works in any browser at app.intori.co, and in the World App. Sign in with the same account and intori already knows you, whichever one you open.",
        ]
      : [
          "intori works in any browser at app.intori.co, and in the World App. An iPhone app is coming soon.",
          "Sign in with the same account and intori already knows you, whichever one you open.",
        ]

const IPHONE_ANSWER =
  IOS_CHANNEL === 'appstore'
    ? [
        "Yes. intori is on the App Store, and you can download it from the homepage.",
        "intori also works on the web at app.intori.co, with no install needed.",
      ]
    : IOS_CHANNEL === 'beta'
      ? [
          "The iPhone beta is open, and you can join it from the homepage.",
          "intori also works on the web at app.intori.co, with no install needed.",
        ]
      : [
          "Not yet. An iPhone app is coming soon, and the homepage will say so the moment it is live.",
          "intori works on the web today at app.intori.co, with no install needed.",
        ]

export const FAQ: FaqItem[] = [
  {
    question: "What is intori?",
    answer: [
      "Your calendar tells you what you have to do. intori gives you something to look forward to.",
      "Tell it what your family loves: outings near you, time outside, your teams, your shows, the artists you would go see, the food you like. intori watches local events, the forecast, schedules, premieres, and tour dates for you, brings you up to five picks a day, and adds the ones you want to your calendar in one tap."
    ]
  },
  {
    question: "Do I have to go looking for any of this?",
    answer: [
      "No. That is the whole point.",
      "Finding the good stuff means knowing what to look for, tracking down the date, and remembering before it passes. That is the work almost nobody has time for. intori does that part and brings you what it finds."
    ]
  },
  {
    question: "How does intori work?",
    answer: [
      "Sign in with Apple or your email, and pick what you love. It takes a few taps for each, and you can add the rest anytime.",
      "From then on, intori brings you up to five picks a day on Home, each with the reason it is there. A game, a show or a dated outing has Add to calendar: tap it and the date is on your iPhone's calendar. A flexible day, like good hours at the park, has Hold the day, which keeps it in intori until you choose a time. Now and then, after you add something, intori asks one quick question so the next picks fit a little better."
    ]
  },
  {
    question: "What does intori watch for?",
    answer: [
      "Six things are live today, and you can turn any of them on during setup or later in Interests."
    ],
    bullets: [
      "Outings: library programs, museum days, fun runs and family shows near you. What intori finds depends on your area; the Sources page lists who it reads.",
      "Outdoors: parks, playgrounds, trails and beaches close to home, with the hours the forecast looks good.",
      "Sports: your teams' games, the big ones worth watching, and where to watch them. Scores stay hidden until you are ready.",
      "Shows: new seasons and premieres for the shows you follow, and where they are streaming.",
      "Music: artists you love playing near you, and when tickets go on sale.",
      "Food: places to eat near a game or show you have added, and a few good spots close to home."
    ]
  },
  {
    question: "Will this mess up my family calendar?",
    answer: [
      "No. intori only adds what you tap to add. Nothing lands on your calendar by itself, and a day you hold stays in intori until you choose a time.",
      "On iPhone, intori asks for permission to add events, and that is all it can do. It cannot read, change, or delete anything else on your calendar.",
      "Everything you add also shows up in intori's Week, so what you are looking forward to is in one place."
    ]
  },
  {
    question: "Does intori work with my wall calendar?",
    answer: [
      "Yes, if it can add a calendar by link, as Skylight and most wall calendars can. In intori, open Week, then Calendars and displays, and copy your private link. Add it to your screen as a subscribed calendar, and the plans you choose show up beside the rest of your week.",
      "The same link works in Google Calendar and Apple Calendar. Step-by-step help for each one is at intori.com/family-screen."
    ]
  },
  {
    question: "Will I get a lot of notifications?",
    answer: [
      "No. intori only sends notifications about things you care about: a reminder before something you added, when you ask for one; a note the evening before a day you held; a change to something on your calendar, like a game moving to a new time; and a new date from a team, show, or artist you follow.",
      "Most weeks that is a handful or none. They never arrive overnight, they never nudge you to come back, and you can turn each kind on or off in Notifications."
    ]
  },
  {
    question: "Is this a chatbot?",
    answer: [
      "No. There is nothing to type and no blank box to fill in.",
      "intori shows you picks, you tap to add the ones you want, and now and then it asks a quick question with answers to tap."
    ]
  },
  {
    question: "What makes intori different?",
    answer: [
      "Shared calendars and family displays are good at keeping track of what is already planned. None of them tell you what is worth looking forward to.",
      "intori works on that half. It brings you something specific and dated, shaped by what your family likes, early enough to say yes. And because it remembers what you have added, it helps with those plans too, like finding dinner near the venue before a show.",
      "The assistant on your phone can add a game to your calendar when you ask. intori does the noticing, so you never have to think to ask."
    ]
  },
  {
    question: "Will I have to keep answering the same questions?",
    answer: [
      "No. Repeating your preferences over and over is tiring.",
      "intori remembers what you have told it, so every answer makes the next pick better instead of starting over."
    ]
  },
  {
    question: "What happens if intori does not know enough yet?",
    answer: [
      "You still get picks. Until intori knows what you like, it shows what is popular this week and labels it that way, never as picked for you.",
      "Follow a team or add a show, and the picks become yours. A quick question here and there makes them better still."
    ]
  },
  {
    question: "Where can I use intori?",
    answer: WHERE_TO_USE_ANSWER
  },
  {
    question: "Is there an iPhone app?",
    answer: IPHONE_ANSWER
  },
  {
    question: "Is there an Android app?",
    answer: [
      "Not yet. On an Android phone, intori works in the browser at app.intori.co, with nothing to install.",
      "Sign in with the same account on any device and everything you follow is already there."
    ]
  },
  {
    question: "Does intori work where I live?",
    answer: [
      "Your teams, your shows and artists on tour work anywhere in the US.",
      "For outings and time outside, intori prepares these areas ahead of time: Raleigh-Durham, Charlotte, the Greensboro area, Wilmington, Fayetteville, Atlanta, Orlando, Tampa Bay, Jacksonville, Charleston, Richmond, the Nashville suburbs, the northern Dallas-Fort Worth suburbs, and Minneapolis-St. Paul.",
      "Anywhere else, intori starts with the parks, playgrounds and good outdoor hours near you."
    ]
  },
  {
    question: "Can my partner or family share it?",
    answer: [
      "Yes, through your calendar. Everything you add in intori can show up where your family already looks: open Calendars and displays from intori's Week to connect a Skylight display, or copy a calendar link your partner can add to their own calendar app.",
      "A subscription covers one intori account, with its own picks."
    ]
  },
  {
    question: "What does intori cost?",
    answer: [
      "intori is $8.99 a month, or $59.99 a year.",
      "Before that, you get 21 days free. The trial starts when you finish setup, not when you sign up. It is a real date, and the app shows it to you, so you always know how long you have left.",
      "On the web, choose a plan with at least 48 hours left and your first charge waits until your free days end. Cancel before then and you will not be charged. With less time left, web billing starts immediately. On iPhone, Apple bills when you confirm your purchase."
    ]
  },
  {
    question: "What do I get for my subscription?",
    answer: [
      "intori watching what you follow, all year: every game, every new season, every tour date near you.",
      "Up to five fresh picks a day, one-tap adds to your calendar, reminders when you want them, and alerts when something you follow gets a new date. No ads, ever. You are the customer, so intori is built to be useful, not to keep you scrolling."
    ]
  },
  {
    question: "What happens if I stop paying?",
    answer: [
      "Everything you already added stays visible in intori and on your calendar. Followed-season dates keep their last saved details.",
      "New picks, calendar adds, Holds, date updates and reminders pause until you subscribe again. Your answers and everything you follow stay in your account."
    ]
  },
  {
    question: "Do I need a credit card to start?",
    answer: [
      "No. You can start the trial without entering a payment method, and it does not turn into a paid subscription on its own.",
      "When the trial ends you choose a plan, or you do not. Nothing is charged unless you decide to subscribe."
    ]
  },
  {
    question: "Can developers build with intori?",
    answer: [
      "Not today. We are focused on families first.",
      "The groundwork is there, so that someone could one day authorize an app to use their intori context instead of answering the same setup questions all over again. It is not open yet, and we would rather say so than collect sign-ups for something we are not ready to support."
    ]
  }
]
