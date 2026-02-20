export type FaqItem = {
    question: string
    answer: string[]
    bullets?: string[]
  }
  
  export const FAQ: FaqItem[] = [
    {
      question: "What are Circles and Stamps?",
      answer: [
        "Circles are shared identity spaces. Stamps show your participation.",
        "Circles group people around shared energy, interests, and values. When you answer questions and participate, you earn Stamps that represent your presence and involvement within those Circles. Stamps shape your profile and your future connections."
      ]
    },
    {
      question: "What are Daily Themes and how do they change questions?",
      answer: [
        "Each day on intori has a theme. No more endless, random questions.",
        "Instead of answering questions forever, each day centers on one meaningful theme like creativity, connection, or personal growth.",
        "It’s less about volume and more about meaning."
      ],
      bullets: [
        "Build depth in a single theme",
        "Move closer to unlocking new Circles",
        "Earn relevant Stamps"
      ]
    },
    {
      question: "What are Chemistry and Vibes?",
      answer: [
        "Chemistry shows alignment. Vibes show energy.",
        "Chemistry is a percentage that reflects how aligned you are with someone based on shared Circles, Stamps, insights, and connections. Vibes capture the feel of a person’s presence and interactions.",
        "Together, they help you understand not just who matches, but why."
      ]
    },
    {
      question: "How is intori different from a dating app or social network?",
      answer: [
        "intori isn’t about swiping or posting. It’s about discovering who people really are.",
        "Instead of building a feed or chasing likes, intori helps you build an identity through Stamps and Circles, then meet people through what you actually share in common."
      ]
    },
    {
      question: "What happens when I collect Stamps?",
      answer: [
        "Stamps represent your participation across different Circles.",
        "As you collect Stamps, you unlock deeper identity, more Circles, and more meaningful matches. Your profile becomes a living map of who you are and what you care about."
      ]
    },
    {
      question: "Who can see my answers?",
      answer: [
        "Your answers are used to generate Stamps, Circles, Chemistry, and Vibes.",
        "You stay in control of what is visible. Some insights are private, some help shape your matches, and some are shared only when you connect with someone."
      ]
    },
    {
      question: "Where can I use intori?",
      answer: [
        "intori is live on World App, and also available on Base App and Farcaster.",
        "Your identity, Circles, and Stamps travel with you across all platforms — so your profile is always yours, wherever you open it."
      ]
    }
  ]
  