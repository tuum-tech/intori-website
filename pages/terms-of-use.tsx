import type { NextPage } from "next";
import Link from 'next/link'
import { LegalLayout } from '../layouts/Legal'
import { SeoHead } from '@/lib/seo'

const Terms: NextPage = () => {
  return (
    <>
      <SeoHead
        title="Terms of Use - intori"
        description="Terms for using intori."
        canonicalPath="/terms-of-use"
        ogImageAlt="intori terms of use preview"
      />

      <LegalLayout>
        <h1>intori Terms of Use</h1>
        <p><strong>Last Updated: August 11, 2026</strong></p>

      <p>
        These terms cover the intori website and the intori mobile app. There is one set of terms for both.
      </p>

      <h2>What changed in this update</h2>
      <p>
        This update covers the intori mobile app for iPhone. It adds a dietary, allergen, and safety section that explains what intori does and does not promise about food. It adds subscription and auto-renewal terms, including price, billing period, and how to cancel. It retires credit packs as something you can buy and explains what happens to any balance you still hold. It notes that Apple&apos;s standard app license also applies if you got the app from the App Store. The AI processors and data providers we use are named in our <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <p>
        These Terms of Use (&quot;Terms&quot;) are an agreement between you and Tuum Technologies, Inc. (&quot;Tuum&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) and govern your access to and use of intori, including the intori website, the intori mobile app, mini app experiences, your household preference and context profile, helper results, subscriptions, connected app flows, APIs, and related services (together, the &quot;Services&quot;).
      </p>
      <p>
        By using the Services, you agree to these Terms. If you do not agree, do not use the Services.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 13 years old to use the Services. If the law where you live requires a higher age to consent to online services or personal data processing, you must be old enough to provide that consent or use the Services only with valid permission from a parent or legal guardian.
      </p>
      <p>
        If you use the Services on behalf of another person or organization, you represent that you have authority to accept these Terms on their behalf. If you declare a constraint that applies to someone else in your household, you represent that you are allowed to do so.
      </p>

      <h2>2. What intori does</h2>
      <p>
        intori is a household personalization service. You declare preferences and constraints for your household. intori uses those declared signals to produce daily suggestions with sources attached: what to cook or eat, what to watch, live music and events, and sports. The features that produce those suggestions are called helpers.
      </p>
      <p>How your declarations are used:</p>
      <ul>
        <li>What you declare can bind a hard filter. A declared constraint can remove results.</li>
        <li>What intori infers from your activity can only change the order of results. It cannot remove a result or add one back.</li>
        <li>Safety-class items fail closed. If the information available to intori does not show that an item meets a declared safety constraint, intori leaves it out rather than guess.</li>
        <li>intori shows you which declared constraints it applied to a result, so you can correct anything that is wrong.</li>
      </ul>
      <p>
        intori applies what you declared to what its sources say. It is not a verification or certification service, and it does not independently confirm that a source is correct. Section 9 explains what this means for allergies and medical dietary needs.
      </p>
      <p>
        intori is designed around user-owned data and user-controlled consent. You decide what to provide and, where controls are available, what to share, pause, revoke, or delete.
      </p>

      <h2>3. Accounts, wallets, and platform access</h2>
      <p>
        You may access the Services on the web at app.intori.co, in the intori mobile app, or through supported platforms and wallets. Supported sign-in methods include email sign-in (a one-time magic link), Sign in with Apple, World App or World ID, and other supported methods. Where you sign in through more than one method, intori may link those identities to a single intori account so your data stays unified.
      </p>
      <p>
        You are responsible for maintaining control of your device, platform account, wallet, authentication method, and private keys. We will never ask for your private keys or recovery phrase. Transactions or actions authorized through your wallet or platform account may be irreversible.
      </p>
      <p>
        You are responsible for all activity that occurs through your account or authenticated session, except to the extent caused by our breach of these Terms or applicable law.
      </p>
      <p>
        <strong>Apple App Store.</strong> If you got the intori app from the Apple App Store, your use of the app is also governed by Apple&apos;s standard Licensed Application End User License Agreement, which you can read at <a href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/" target="_blank" rel="noreferrer">apple.com/legal/internet-services/itunes/dev/stdeula</a>. Where that agreement covers a matter and conflicts with these Terms, that agreement controls for the app.
      </p>

      <h2>4. Your data and content</h2>
      <p>
        As between you and Tuum, you retain ownership of the answers, preferences, declared constraints, local context, feedback, and other content you submit to intori (&quot;Your Content&quot;).
      </p>
      <p>
        You grant us a limited, worldwide, non-exclusive, royalty-free license to host, store, copy, process, display, transmit, create operational or derived signals from, and otherwise use Your Content only as needed to provide, secure, personalize, support, and improve the Services; comply with your sharing and consent settings; provide connected app access you approve; and comply with law.
      </p>
      <p>
        You represent that you have the rights needed to provide Your Content and that Your Content does not violate law, these Terms, or anyone else&apos;s rights.
      </p>

      <h2>5. Consent and connected apps</h2>
      <p>
        Some Services depend on your consent. You may be asked to grant consent for topics, groups, local context, helper access, sharing context with an AI processor, connected app sharing, or other scopes. You may also revoke consent through intori controls.
      </p>
      <p>
        If you approve a connected app, intori may share a scoped context bundle with that app. Connected apps are independent services, and their own terms and privacy policies may apply after they receive information. We are not responsible for a connected app&apos;s use of information after you authorize sharing, except to the extent required by law or a written agreement with that app.
      </p>
      <p>
        You agree not to misuse connected app flows, authorization codes, grant credentials, API keys, or context bundles.
      </p>

      <h2>6. Privacy</h2>
      <p>
        Our <Link href="/privacy-policy">Privacy Policy</Link> explains how we collect, use, share, and protect information, and it names the AI processors and data providers that receive context from intori. By using the Services, you acknowledge the Privacy Policy.
      </p>

      <h2>7. Acceptable use</h2>
      <p>You may not use the Services to:</p>
      <ul>
        <li>Violate law or anyone else&apos;s rights.</li>
        <li>Harass, threaten, abuse, defame, or discriminate against others.</li>
        <li>Submit content that is unlawful, harmful, deceptive, obscene, or infringing.</li>
        <li>Interfere with or disrupt the Services.</li>
        <li>Attempt to gain unauthorized access to accounts, systems, data, wallets, grants, API keys, or networks.</li>
        <li>Scrape, harvest, or bulk collect information except as expressly allowed by us.</li>
        <li>Circumvent rate limits, access controls, consent gates, payment gates, or security measures.</li>
        <li>Reverse engineer the Services except where law prohibits this restriction.</li>
        <li>Use bots, scripts, or automated access in a way that harms the Services or violates posted rules.</li>
        <li>Abuse AI, matching, sharing, notification, payment, subscription, or connected app features.</li>
        <li>Impersonate another person or misrepresent your affiliation with any person or entity.</li>
      </ul>
      <p>
        We may suspend or restrict access if we believe you violated these Terms, created risk for others, or used the Services in an abusive or fraudulent way.
      </p>

      <h2>8. AI-assisted features</h2>
      <p>
        Some intori features use AI to summarize context, search sources, generate helper results, or create suggestions. AI outputs may be incomplete, inaccurate, outdated, or unsuitable for your circumstances. You should review and verify AI outputs before relying on them.
      </p>
      <p>
        AI outputs are not legal, medical, financial, tax, investment, or other professional advice. intori does not purchase tickets, contact venues, complete transactions, or make commitments on your behalf unless a feature clearly says it does and you authorize that action.
      </p>

      <h2>9. Dietary constraints, allergens, and safety</h2>
      <p>
        Read this section carefully if you or anyone in your household has a food allergy, celiac disease, or another medical dietary condition.
      </p>
      <p>
        When you declare a dietary constraint, intori applies it as a filter against the information available from its sources. Those sources include recipe databases, venue and menu listings, event listings, and web search. intori reports what those sources say. It does not verify what they say.
      </p>
      <p>
        intori is not a food safety service. We do not inspect kitchens, test food, audit suppliers, or observe how a dish is prepared. We cannot detect cross-contact, shared fryers, shared equipment, ingredient substitutions, recipe changes, or mislabeled products. A menu that says a dish is gluten free may be wrong. Independent testing has repeatedly found gluten in restaurant food sold as gluten free, and the same risk applies to any allergen.
      </p>
      <p>
        We do not guarantee, certify, or ensure that any recipe, product, dish, restaurant, or venue is safe for a person with an allergy or a medical dietary condition. A suggestion from intori is a starting point, not a clearance.
      </p>
      <p>
        If you or someone in your household has a food allergy or a medical dietary need, you must confirm directly with the restaurant, the manufacturer, or your clinician before eating anything intori suggests. Read the label. Ask the kitchen. intori does not replace either.
      </p>
      <p>
        intori shows you which declared constraints it applied to a result. That display describes what intori did with your declarations and the information it had. It is not a statement that the item is safe.
      </p>
      <p>
        Nothing in the Services is medical advice, nutritional advice, or a diagnosis, and nothing in the Services should be used to treat or manage a medical condition. Talk to a qualified professional about your health. In an emergency, call your local emergency number.
      </p>

      <h2>10. Subscriptions, purchases, and payments</h2>
      <p>
        intori is sold as a subscription. One subscription covers your whole household.
      </p>
      <p>
        <strong>Free trial.</strong> New accounts get a 14 day free trial with full access to intori. The trial is the same on the web and in the iOS app, and you provide a payment method when you start it. You are not charged during the trial. If you do not cancel before the trial ends, your subscription starts and the first charge is made then.
      </p>
      <p>
        <strong>Founding year offer.</strong> We may offer a one-time founding year for $79. It covers 12 months and it has no free trial. It costs the same as a year of the annual plan, but it is not the annual plan. It is a single charge. It does not renew, it does not turn into a subscription, and we will not start billing you on a recurring basis when it ends. When the 12 months are up, your access drops to the limited free state described below. To keep paid access after that, you have to buy again yourself. Anything specific to that offer is shown to you before you buy.
      </p>
      <p>
        <strong>Price and billing period.</strong> After the trial, intori costs $79 per year or $8.99 per month, depending on the plan you choose. Prices are in US dollars and do not include taxes, which may be added where required. The price, the billing period, and these terms are shown to you before you buy, and you must agree to them to subscribe.
      </p>
      <p>
        <strong>Automatic renewal.</strong> Subscriptions renew automatically until you cancel. An annual plan renews every year. A monthly plan renews every month. At the start of each new period we charge the then-current price for your plan to the payment method on file. If we change the price, we will tell you before the change takes effect, and you will have a chance to cancel first.
      </p>
      <p>
        <strong>When you are charged.</strong> If you subscribe during the free trial, the first charge is made when the trial ends. If you subscribe without a trial, the first charge is made when you buy. Renewal charges are made at the start of each new billing period. For App Store purchases, Apple charges within 24 hours before the end of the current period.
      </p>
      <p>
        <strong>How to cancel.</strong> You can cancel at any time. If you subscribed in the iOS app, cancel in your Apple account subscription settings on your device. If you subscribed on the web, cancel in your intori account settings or by emailing <a href="mailto:contact@tuum.tech">contact@tuum.tech</a>. To avoid the next charge, cancel at least 24 hours before the current period ends.
      </p>
      <p>
        <strong>What cancellation does.</strong> Cancelling stops the next renewal. It does not end the period you already paid for. You keep paid access until the end of that period, and you are not charged again after that.
      </p>
      <p>
        <strong>Cancelling during the free trial.</strong> If you cancel during the 14 day trial, you are not charged, and you keep trial access until the trial ends. To avoid being charged, cancel at least 24 hours before the trial ends.
      </p>
      <p>
        <strong>What happens when paid access ends.</strong> When your trial or your subscription ends, your account moves to a limited free state. We do not delete your account, your declared preferences, or your declared constraints.
      </p>
      <p>
        <strong>What the free state includes.</strong> Free keeps today&apos;s decision, recomputed each day, at one run per day, and one location. All of your declared constraints keep filtering on the free tier, including dietary and allergen constraints. Safety is never gated behind payment. Free does not keep your history and corrections, named people, travel locations, or the shareable card. A paid subscription remembers all of that and gives you three runs per day. The short version is that free forgets and paid remembers.
      </p>
      <p>
        <strong>App Store purchases.</strong> If you subscribe in the intori iOS app, Apple bills you, and the purchase is governed by Apple&apos;s terms, including the Apple Media Services Terms and Conditions. You manage and cancel that subscription in your Apple account subscription settings. We cannot cancel or refund an App Store subscription for you. Send refund requests for App Store purchases to Apple.
      </p>
      <p>
        <strong>Web purchases.</strong> If you subscribe on the intori website, Stripe processes the payment and we manage the subscription. Cancel in your intori account settings or by emailing <a href="mailto:contact@tuum.tech">contact@tuum.tech</a>. Send refund requests for web purchases to us at the same address.
      </p>
      <p>
        <strong>Refunds.</strong> Apple handles refunds for App Store purchases under its own policies. For web purchases, and except where the law gives you a refund right, fees already charged are not refundable, and cancelling stops future charges rather than refunding past ones. We may give a refund at our discretion.
      </p>
      <p>
        <strong>Credits you paid for.</strong> intori used to sell credit packs. Credit packs are no longer sold, and a subscription is now the only way to buy access to intori. Credits you paid for do not expire. We will honor an unused purchased balance for as long as intori runs, and we will not revoke it on notice. We do not convert credit balances into subscription time. Purchased credits are for use within intori, have no cash value, and may not be transferred, resold, or redeemed for money unless we expressly allow it in writing.
      </p>
      <p>
        <strong>Promotional and granted credits.</strong> Credits we gave you rather than sold you, including promotional, referral, and goodwill credits, are different. They may expire or end after we give you reasonable notice. They have no cash value and are not refundable.
      </p>
      <p>
        <strong>Wallet and blockchain payments.</strong> On the World App and Farcaster surfaces, intori supports payment through a wallet or a blockchain network. Those transactions may be public, irreversible, delayed, failed, or subject to network fees, and we are not responsible for third-party wallet, network, platform, or payment provider failures. These payment methods are not available in the iOS app.
      </p>
      <p>
        <strong>Taxes.</strong> You are responsible for any taxes, fees, or reporting obligations that apply to your purchases.
      </p>

      <h2>11. Recommended matches and friends</h2>
      <p>
        intori may show recommended matches. If you are not approved friends, the other person may see only limited profile information, such as avatar, username, vibe, and mutual friends. If both people approve the connection, approved friends may also see a chemistry summary and groups in common. Your declared dietary constraints are not shown to other users.
      </p>
      <p>
        You should not share information that you do not want others to see. People who can see information through intori may save or reshare it outside intori.
      </p>

      <h2>12. Third-party services</h2>
      <p>
        The Services may interact with or depend on third-party services, including Apple, Stripe, OpenAI, Perplexity, Spoonacular, Google Places, Ticketmaster, Farcaster, World App, Worldcoin services, wallets, blockchain networks, RPC providers, notification providers, hosting providers, and connected apps.
      </p>
      <p>
        We do not control third-party services and are not responsible for their content, policies, availability, security, or actions. Information from a third-party source may be wrong, incomplete, or out of date. Your use of third-party services may be governed by their own terms and privacy policies.
      </p>

      <h2>13. intori intellectual property</h2>
      <p>
        The Services, including software, interfaces, design, logos, trademarks, documentation, and other materials we provide, are owned by Tuum or our licensors. Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to use the Services for their intended purpose.
      </p>
      <p>
        You may not copy, modify, distribute, sell, lease, or create derivative works from the Services except as allowed by these Terms, open-source licenses, or applicable law.
      </p>

      <h2>14. Feedback</h2>
      <p>
        If you provide feedback or suggestions, you grant us permission to use them without restriction or compensation. We will not treat feedback as confidential unless we separately agree in writing.
      </p>

      <h2>15. Service changes and availability</h2>
      <p>
        We may add, change, suspend, or discontinue features. We may also impose limits on use, storage, access, helper runs, grants, or APIs. We will try to provide reasonable notice for material changes that negatively affect paid features or privacy-related controls, where practical.
      </p>
      <p>
        The Services may be unavailable, delayed, or interrupted from time to time.
      </p>

      <h2>16. Security</h2>
      <p>
        We use reasonable safeguards designed to protect the Services, but no online service is perfectly secure. You are responsible for securing your devices, wallets, platform accounts, and authentication methods.
      </p>
      <p>
        You must promptly notify us at <a href="mailto:contact@tuum.tech">contact@tuum.tech</a> if you believe your account, wallet, session, grant credential, API key, or access has been compromised.
      </p>

      <h2>17. Disclaimers</h2>
      <p>
        The Services are provided &quot;as is&quot; and &quot;as available&quot;. To the fullest extent permitted by law, we disclaim all warranties, whether express, implied, statutory, or otherwise, including warranties of merchantability, fitness for a particular purpose, title, non-infringement, accuracy, availability, and security.
      </p>
      <p>
        We do not guarantee that the Services will be uninterrupted, error-free, secure, accurate, or free from harmful components. We do not warrant that any suggestion, recipe, product, dish, restaurant, or venue is safe, suitable, or accurate for you. Section 9 applies to dietary constraints and allergens.
      </p>

      <h2>18. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Tuum and its affiliates, officers, directors, employees, agents, and licensors will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for lost profits, lost data, lost goodwill, or service interruption.
      </p>
      <p>
        To the fullest extent permitted by law, our total liability for all claims related to the Services or these Terms will not exceed the greater of $100 or the amount you paid to Tuum for the Services in the six months before the event giving rise to the claim.
      </p>
      <p>
        Nothing in these Terms limits liability that cannot be limited under applicable law, including liability for death or personal injury caused by negligence, fraud, or fraudulent misrepresentation, where the law does not allow that limitation. Some jurisdictions do not allow certain limitations of liability, so some limitations may not apply to you.
      </p>

      <h2>19. Indemnity</h2>
      <p>
        To the fullest extent permitted by law, you agree to defend, indemnify, and hold harmless Tuum and its affiliates, officers, directors, employees, agents, and licensors from claims, damages, liabilities, losses, costs, and expenses, including reasonable attorneys&apos; fees, arising from or related to your misuse of the Services, Your Content, your violation of these Terms, or your violation of law or third-party rights.
      </p>

      <h2>20. Termination</h2>
      <p>
        You may stop using the Services at any time. You can delete your account from inside the intori mobile app, on the You tab, or by contacting <a href="mailto:contact@tuum.tech">contact@tuum.tech</a>, subject to retention needed for legal, security, fraud-prevention, accounting, or operational reasons. Deleting your account does not cancel an App Store subscription. Cancel that separately in your Apple account subscription settings.
      </p>
      <p>
        We may suspend or terminate your access if we believe you violated these Terms, created risk, or used the Services unlawfully or abusively.
      </p>
      <p>
        Sections that by their nature should survive termination will survive, including sections on your content license for retained data, privacy, dietary and safety disclaimers, payments, third-party services, intellectual property, disclaimers, limitation of liability, indemnity, dispute resolution, and general terms.
      </p>

      <h2>21. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. If changes are material, we will provide reasonable notice, such as by updating the date above, posting notice in intori, or using another appropriate method. Your continued use of the Services after changes become effective means you accept the updated Terms.
      </p>

      <h2>22. Governing law and dispute resolution</h2>
      <p>
        These Terms are governed by the laws of the State of North Carolina, without regard to conflict-of-law rules, except where applicable law requires otherwise.
      </p>
      <p>
        Before filing a claim, you and Tuum agree to try to resolve the dispute informally by contacting the other party. Contact us at <a href="mailto:contact@tuum.tech">contact@tuum.tech</a>.
      </p>

      <h2>23. General terms</h2>
      <p>
        You may not assign these Terms without our consent. We may assign these Terms as part of a merger, acquisition, financing, reorganization, sale of assets, or by operation of law.
      </p>
      <p>
        If any provision is found unenforceable, the remaining provisions will remain in effect. Our failure to enforce a provision is not a waiver. These Terms, together with any terms shown at purchase or feature activation and our Privacy Policy, are the entire agreement between you and Tuum for the Services.
      </p>

      <h2>Contact us</h2>
      <p>
        Tuum Technologies, Inc.<br />
        4030 Wake Forest Road, STE 349<br />
        Raleigh, NC 27609<br />
        <a href="mailto:contact@tuum.tech">contact@tuum.tech</a>
      </p>
      </LegalLayout>
    </>
  )
}

export default Terms
