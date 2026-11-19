import { APP_STORE_BADGE, APP_STORE_BADGE_ALT, IOS_CHANNEL, PRODUCT_DEFINITION, appStoreUrl } from './appLinks'

export type FaqItem = {
  question: string
  answer: string[]
  bullets?: string[]
  // An optional button under the answer, for the one answer that has somewhere
  // to send people (the App Store listing). With `badge`, the button is that
  // image and `label` is its alt text; without it, `label` is the button text.
  link?: { href: string; label: string; badge?: string }
}

// The iPhone answers read the same switch as the homepage CTAs, so the FAQ
// cannot claim iOS is available before it is, or keep saying "coming soon"
// after it ships. IOS_CHANNEL in lib/appLinks.ts updates both surfaces at
// once, with no copy change.
const WHERE_TO_USE_ANSWER =
  IOS_CHANNEL === 'appstore'
    ? [
        "intori is on the App Store for iPhone, and that is the best way to use it: Sign in with Apple, picks that go on your calendar, and reminders on your lock screen.",
        "It also works in any browser at app.intori.co, including on Android. Sign in with the same account to keep your picks and interests together.",
      ]
    : [
        "intori works in any browser at app.intori.co, including on Android. An iPhone app is coming soon.",
        "Sign in with the same account and intori already knows you, whichever one you open.",
      ]

const IPHONE_ANSWER =
  IOS_CHANNEL === 'appstore'
    ? [
        "Yes. intori is on the App Store for iPhone.",
        "intori also works on the web at app.intori.co, with no install needed.",
      ]
    : [
        "Not yet. An iPhone app is coming soon, and the homepage will say so the moment it is live.",
        "intori works on the web today at app.intori.co, with no install needed.",
      ]

// The App Store badge under that answer. Its own campaign token, so App
// Analytics can count installs that started on the FAQ.
const IPHONE_LINK =
  IOS_CHANNEL === 'appstore'
    ? { href: appStoreUrl('faq'), label: APP_STORE_BADGE_ALT, badge: APP_STORE_BADGE }
    : undefined

export const FAQ: FaqItem[] = [
  {
    question: "What is intori?",
    answer: [
      PRODUCT_DEFINITION,
      "Tell intori what you enjoy. It brings you up to five picks a day, with the reason each one fits. It watches for local outings, time outdoors, sports, shows, live music, and places to eat."
    ]
  },
  {
    question: "Who is intori for?",
    answer: ["Use intori to make plans for yourself, for two, or for your family. Pick Just me, Two of us, or Family in setup, then choose the interests you want intori to look for."]
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
      "From then on, intori brings you up to five picks a day on Home, each with the reason it is there. Open a dated pick and choose Add to calendar to put it on your iPhone calendar. A flexible day, like good hours at the park, has Hold the day, which keeps it in intori until you choose a time. Now and then, after you add something, intori asks one quick question so the next picks fit a little better."
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
    question: "How do I add a plan? What calendar access does intori use?",
    answer: [
      "On iPhone, open a dated pick and choose Add to calendar. The first time, iPhone may ask you to allow intori to add events. Your chosen plan appears on your calendar and in intori’s Week.",
      "intori uses add-only calendar permission on iPhone. Your existing events stay private. For a flexible plan, choose Hold the day and pick a time later."
    ]
  },
  {
    question: "Does intori work with Skylight, Google Calendar, or other family screens?",
    answer: [
      "Yes. Open Week, then Calendars and displays, and copy your private intori link. Add it as a subscribed calendar in Skylight, Google Calendar, Apple Calendar, or another calendar that supports subscriptions by link.",
      "New plans appear after that calendar or screen refreshes."
    ],
    link: { href: '/family-screen', label: 'See setup steps for your calendar' }
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
    question: "How is intori different from a shared calendar?",
    answer: [
      "intori keeps looking for upcoming plans based on what you enjoy and brings you a short list. It works alongside the calendar or family screen you already use, so an outing you choose can show up beside the rest of your week."
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
    answer: IPHONE_ANSWER,
    link: IPHONE_LINK
  },
  {
    question: "Is there an Android app?",
    answer: [
      "Not yet. On an Android phone, intori works in the browser at app.intori.co, with nothing to install.",
      "Sign in with the same account on any device and everything you follow is already there."
    ]
  },
  {
    question: "Does intori find things to do where I live?",
    answer: [
      "intori finds local outings in Raleigh–Durham, Wilmington, and other supported areas. The number and types of local picks vary by area. Our local guides show current public listings.",
      "You can follow teams, shows, and touring artists across the U.S."
    ],
    link: { href: '/things-to-do-with-kids', label: 'Browse the local guides' }
  },
  {
    question: "Can I use intori when I’m away from home?",
    answer: ["Yes. Tap your area beside Today to open Home or Away, then choose Away. Use your current location or enter a ZIP code or a city and state, like Wilmington, NC. Choose Home when you’re back. Local outing coverage depends on your destination."]
  },
  {
    question: "How do I send an outing or invite someone to join me?",
    answer: [
      "Open an eligible outing or outdoor event and choose Send this one. After you add an eligible plan to your calendar, choose Bring someone along on the confirmation to invite them.",
      "The person who gets the link can open the plan in a browser and add it to their calendar."
    ]
  },
  {
    question: "Where do the events and illustrations come from?",
    answer: [
      "intori finds events in public listings from libraries, towns, parks, museums, and other organizers. Each listing names the organizer and links to their page for current details, registration, or tickets.",
      "Some picks use AI-generated illustrations. The event details come from the organizer’s listing."
    ],
    link: { href: '/sources', label: 'See how intori sources events' }
  },
  {
    question: "Can my partner or family share it?",
    answer: [
      "Yes, through your calendar. Everything you add in intori can show up where your family already looks: open Calendars and displays from intori's Week to connect your family screen, or copy a calendar link your partner can add to their own calendar app.",
      "A subscription covers one intori account, with its own picks."
    ]
  },
  {
    question: "What does intori cost? Do I need a card for the trial?",
    answer: [
      "intori is $8.99 a month, or $59.99 a year.",
      "You get 21 days free, starting when you finish setup. You can start without entering a payment method. You choose whether to subscribe.",
      "On the web, choose a plan with at least 48 hours left and your first charge waits until your free days end. Cancel before then and you will not be charged. With less time left, web billing starts immediately. On iPhone, Apple bills when you confirm your purchase."
    ]
  },
  {
    question: "What do I get for my subscription?",
    answer: [
      "intori watching what you follow, all year: every game, every new season, every tour date near you.",
      "Up to five fresh picks a day, the ones you want on your calendar, reminders when you want them, and alerts when something you follow gets a new date. No ads, ever. You are the customer, so intori is built to be useful, not to keep you scrolling."
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
    question: "Can developers build with intori?",
    answer: [
      "Not today. We are focused on families first.",
      "The groundwork is there, so that someone could one day authorize an app to use their intori context instead of answering the same setup questions all over again. It is not open yet, and we would rather say so than collect sign-ups for something we are not ready to support."
    ]
  }
]
