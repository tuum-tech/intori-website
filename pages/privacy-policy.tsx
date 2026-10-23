import type { NextPage } from "next";
import Link from 'next/link'
import { LegalLayout } from '../layouts/Legal'
import { SeoHead } from '@/lib/seo'

const Privacy: NextPage = () => {
  return (
    <>
      <SeoHead
        title="Privacy Policy - intori"
        description="How intori collects, uses, and protects information."
        canonicalPath="/privacy-policy"
        ogImageAlt="intori privacy policy preview"
      />

      <LegalLayout>
        <h1>intori Privacy Policy</h1>
        <p><strong>Last Updated: October 23, 2026</strong></p>

      <p>
        This policy covers the intori website and the intori mobile app. There is one policy for both.
      </p>

      <h2>What changed in this update</h2>
      <p>
        This update adds a Meta ads section: what we send Meta when someone who arrived from a Facebook or Instagram ad signs up on the web, starts a trial, or subscribes, what we never send, that none of it runs inside the iPhone app, and how to turn it off. Our Apple Ads and campaign-link attribution practices are unchanged.
      </p>

      <h2>Who we are</h2>
      <p>
        The intori service is owned by Tuum Technologies, Inc. (&quot;Tuum&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
      </p>
      <p>You can contact us by email at <a href="mailto:contact@intori.com">contact@intori.com</a>.</p>
      <p>In writing to:</p>
      <address>
        Tuum Technologies, Inc.<br />
        4030 Wake Forest Road, STE 349<br />
        Raleigh, NC 27609
      </address>

      <h2>What intori is</h2>
      <p>
        intori is a household personalization service. You declare preferences and constraints for your household, and intori uses those declared signals to produce daily suggestions with sources attached: local outings and events, outdoor places and good times to go, sports, what to watch, live music and events, and what to cook or eat. The features that produce those suggestions are organized into lanes: Outings, Outdoors, Sports, Shows, Music, and Food.
      </p>
      <p>How your declarations are used:</p>
      <ul>
        <li>What you declare can bind a hard filter. A declared constraint can remove results.</li>
        <li>What intori infers from your activity can only change the order of results. It cannot remove a result or add one back.</li>
        <li>Safety-class items fail closed. If the information available to intori does not show that an item meets a declared safety constraint, intori leaves it out rather than guess.</li>
        <li>intori shows you which declared constraints it applied to a result, so you can correct anything that looks wrong.</li>
      </ul>
      <p>
        intori applies what you declared to what its sources say. It is not a verification or certification service, and it does not independently confirm that a source is correct. Please read the dietary, allergen, and safety section of our <Link href="/terms-of-use">Terms of Use</Link> before relying on a suggestion for a food allergy or a medical dietary need.
      </p>
      <p>
        intori is built around user-owned data and user-controlled consent. Your answers, preferences, declared constraints, local context, and personal signals are yours. We use them to provide the services you ask for, personalize your experience, and help you control where your context is used.
      </p>

      <h2>Eligibility</h2>
      <p>
        intori is not directed to children under 13. You must be at least 13 years old to use intori. If the law where you live requires a higher age to consent to the processing of your personal data, you must be old enough to provide that consent or use intori only with valid permission from a parent or legal guardian. If we learn that we collected personal information from a child under 13, we will take steps to delete it.
      </p>
      <p>
        In states whose laws require app age checks, the intori iOS app asks Apple for an age range when you sign in, using Apple&apos;s Declared Age Range feature. intori receives only a range, such as 13 to 17 or 18 and older. It never receives your birth date or exact age. We use the range only to decide whether an account can be created, and we do not sell it.
      </p>
      <p>
        Children in your household are treated differently from children who use intori. A parent or guardian may share household size, broad children&apos;s age bands, and a dietary constraint that applies to someone in the household, for example a nut allergy. We use these details to suggest suitable plans. We do not ask for a child&apos;s name, exact age, birthdate, photo, or other direct identifier, and we do not create an account for that child. Dietary constraints are stored without naming the household member. See &quot;Dietary constraints and health-adjacent information&quot; below.
      </p>

      <h2>Information we collect</h2>
      <p>
        We collect information from you, from the platforms you use to sign in, from your use of intori, and from service providers that help us operate intori.
      </p>

      <h3>Account and sign-in information</h3>
      <p>
        Depending on how you access intori, we may collect or process:
      </p>
      <ul>
        <li>Your email address, when you sign in in the app or on the web using a one-time email code or sign-in link.</li>
        <li>Sign in with Apple identifiers, including the user identifier Apple gives us and the email address Apple passes along, which may be a private relay address if you chose to hide your email.</li>
        <li>World App, World Mini App, World ID, or wallet-based identifiers, such as wallet address, username, profile image, authentication messages, signatures, nonce records, and verification results.</li>
        <li>Farcaster account identifiers, such as FID, username, display name, profile image, bio, and related public profile data.</li>
        <li>Account-linking records that connect the sign-in methods you use into a single intori account, so your subscription, runs, and personalization stay unified across the web, the app, and supported platforms.</li>
        <li>Session tokens and cookies used to keep you signed in.</li>
        <li>Information about the client app or platform through which you accessed intori.</li>
      </ul>

      <h3>Campaign links</h3>
      <p>
        If you arrive at intori on the web from a link that carries a campaign tag, such as a utm_source or utm_campaign value, or a referral code, and you create an account soon after, we keep that tag or code with your new account. Until then, your browser remembers the tag on your device for up to 30 days, so it can be matched when you sign up. We use it only to learn which campaigns and partners bring new accounts. We do not keep the page you came from or your browsing history, we do not share the tag, and it follows the same deletion rules as Apple Ads attribution below: it is deleted with your account, and after 13 months only totals that are not tied to anyone remain.
      </p>

      <h3>Meta ads</h3>
      <p>
        intori advertises on Facebook and Instagram, which Meta runs. When you arrive at intori on the web from one of those ads, the link carries a Meta click id, and Meta&apos;s pixel on our web pages sets a browser id in a cookie. On the web pages where the pixel runs, Meta learns that a page was viewed, with its address, your IP address, and your browser type, the way any Meta pixel does. If you create an account soon after arriving, we keep the click id and the browser id with your new account, in the same place as a campaign tag. If you then start a free trial or buy a subscription, we tell Meta that a sign-up, a trial start, or a purchase happened, with the click id, the browser id, the IP address and browser type of the request that made it, and for a purchase the amount paid. That is all we send. We do not send your name, email address, or phone number, in plain or hashed form, and we do not send what you do inside intori.
      </p>
      <p>
        Meta uses this to tell which of its ads bring families who sign up, so that we can stop paying for ads that do not. The pixel never runs inside the iPhone app, which loads the same web pages, and never on our internal pages. If your browser sends the Global Privacy Control signal, the pixel does not load and we keep nothing and send nothing to Meta about you. We keep the ids only for accounts that arrived from a Meta link; every other account has none, and nothing about those accounts goes to Meta.
      </p>
      <p>
        The ids follow the same deletion rules as Apple Ads attribution and campaign tags: they are deleted with your account, and 13 months after we record them we delete them from your account and keep only totals that are not tied to anyone. To have them removed sooner, email <a href="mailto:contact@intori.com">contact@intori.com</a> from the address on your account, and we will delete them and send nothing further about your account to Meta. Meta&apos;s handling of what it receives is governed by the <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer">Meta Privacy Policy</a>.
      </p>

      <h3>Answers, preferences, and context</h3>
      <p>
        When you answer questions, complete onboarding, declare constraints, rate results, or interact with result surfaces, we collect the information you choose to provide. This may include:
      </p>
      <ul>
        <li>Answers to questions about preferences, tastes, interests, values, activities, identity, and context.</li>
        <li>Declared household constraints, including the dietary constraints described below.</li>
        <li>Topics, groups, streaks, and other progress within intori.</li>
        <li>Feedback, ratings, likes, skips, and other interaction signals.</li>
        <li>Helper share links and preview images that you choose to create or distribute.</li>
      </ul>

      <h3>Dietary constraints and health-adjacent information</h3>
      <p>
        You can declare dietary constraints for your household. You type or select these yourself. We do not buy them, infer them from medical records, or read them from Apple Health or any other health app. Declared dietary constraints may include:
      </p>
      <ul>
        <li>Allergies and intolerances, such as peanuts, shellfish, or lactose.</li>
        <li>Medical dietary needs, such as celiac disease, diabetes, or a low-sodium diet.</li>
        <li>Faith-based dietary practice, such as halal, kosher, or a fasting period.</li>
        <li>Dietary choices, such as vegetarian, vegan, or pescatarian.</li>
        <li>Dislikes and ingredients you would rather avoid for reasons that are not health related.</li>
      </ul>
      <p>
        Some of this is health information. Apple&apos;s App Privacy framework treats user-provided health or medical data as Health data, and we treat declared dietary constraints that way too.
      </p>
      <p>
        We use declared dietary constraints to filter and rank what intori suggests, to explain why a suggestion was included or left out, and to decide what to ask you next. We do not use them for advertising. We do not sell them. We do not show them to other intori users.
      </p>
      <p>
        We store the constraint and whether it applies to you or to someone else in your household. A constraint is recorded as something like &quot;severe peanut allergy, applies to a household member&quot;, not with that person&apos;s name. Separately, we may store household size and broad children&apos;s age bands you choose to provide. We do not ask for individual household members&apos; names, exact ages, birthdates, or photos.
      </p>
      <p>
        You can view, correct, and delete your declared dietary constraints at any time in intori. Deleting a constraint stops intori from applying it to future suggestions.
      </p>

      <h3>Local context</h3>
      <p>
        If you choose to add local context, we may store information such as city, region, country, place label, place source, and radius. Local context can be paused, updated, or deleted. Saved local context is approximate. If you choose Use my location for Food and allow location access, intori and Google Maps may process a precise point to find nearby places for that request. We do not save those precise coordinates in your profile, result records, or a location history, and we do not infer your home or work address.
      </p>

      <h3>Derived and inferred data</h3>
      <p>
        intori may create derived data from your activity, such as topic signals, sensitivity tiers, visibility states, your vibe, result context summaries, and personalization profiles. These derived records help intori decide what questions to ask, what context to include, what to exclude, and what may be relevant to you. Inferred data can change the order of your results. It cannot bind a hard filter, and it cannot override something you declared.
      </p>

      <h3>Consent and connected app records</h3>
      <p>
        When you grant, deny, or revoke consent, we may store consent records, scope, sensitivity level, metadata, timestamps, connected app identifiers, authorization codes, grant status, expiration, revocation status, and receipts showing when a connected app accessed a context bundle.
      </p>

      <h3>AI result data</h3>
      <p>
        When you use AI-assisted features, we may process selected intori context, local context when active, source-search results, your displayed request, generated output, result receipts, feedback, model name, prompt version or hash, token estimates, cost estimates, duration, errors, and related metadata.
      </p>
      <p>
        AI outputs may be incomplete, outdated, or inaccurate, and should be checked before you rely on them.
      </p>

      <h3>Payments and subscriptions</h3>
      <p>
        If you subscribe to intori, we store subscription records such as plan, status, trial status, start date, renewal date, cancellation date, purchase reference, provider, transaction identifier, and receipt validation results. If you subscribe in the iOS app, Apple processes the payment and gives us a receipt and a subscription status. We do not receive your payment card number from Apple. If you subscribe on the web, Stripe processes the payment. Stripe handles your card details, and we store a customer reference, the card brand and last four digits where Stripe provides them, and the status of the payment. We do not store full payment card numbers.
      </p>
      <p>
        If you previously bought credits, we may keep the related purchase records, including provider, amount, transaction identifier, status, failure codes, confirmation time, and verification metadata, for accounting, fraud prevention, and dispute purposes. Credit purchases made through a wallet or a blockchain network on the World App and Farcaster surfaces may include a transaction hash and may be public on that network. Those payment methods are not part of the iOS app. We do not collect your private keys.
      </p>

      <h3>Notifications</h3>
      <p>
        If you enable notifications, we may store notification tokens, notification URLs, opt-in status, notification campaign information, send logs, and delivery or failure metadata. You can opt out through the applicable platform or intori notification controls. See the mobile app section below for how this works on iOS.
      </p>

      <h3>Usage, safety, and support information</h3>
      <p>
        We may collect technical and usage information such as device or browser information, request metadata, logs, approximate location derived from context or platform data, abuse and fraud signals, rate-limit data, red flags, quality scores, and error reports. If you contact us, we may collect your message, contact details, and any information you choose to provide.
      </p>

      <h2>Information we do not collect</h2>
      <p>
        We try to avoid collecting personal information that intori does not need. Unless you choose to provide it to us in a support request or another free-form message, we do not ask for or intentionally collect:
      </p>
      <ul>
        <li>Your legal name.</li>
        <li>Your mobile or other phone number.</li>
        <li>The names, exact ages, birthdates, or direct identifiers of children in your household. Broad age bands and household size are described above.</li>
        <li>Medical records, clinical diagnoses, prescriptions, or data from Apple Health or any other health app.</li>
        <li>Government ID numbers, KYC documents, or biometric identifiers.</li>
        <li>Private keys, recovery phrases, or wallet seed phrases.</li>
        <li>Payment card numbers or bank account numbers.</li>
        <li>Background location history or an inferred home or work address. Optional location processing for Food is described above.</li>
        <li>Your device address book, phone contacts, photos, calendar, or microphone.</li>
      </ul>
      <p>
        Third-party platforms you use with intori, such as Apple, Farcaster, World App, wallets, payment providers, or blockchain networks, may collect information under their own policies.
      </p>

      <h2>The intori mobile app</h2>
      <p>
        The intori app for iPhone works the same way as the website, and this policy applies to both. A few things are specific to the app.
      </p>

      <h3>Push notifications</h3>
      <p>
        If you allow notifications, we store a device push token so we can send the reminders and daily suggestions you asked for, along with your opt-in status, send logs, and delivery or failure information. Notifications are delivered through Apple Push Notification service. You can turn notifications off at any time in the iOS Settings app, under Notifications, and in intori wherever the app offers a notification control. Turning them off in iOS stops delivery.
      </p>

      <h3>Optional current location</h3>
      <p>
        The app asks for location only when you choose Use my location. For Food, it can request a more accurate point to find nearby restaurants. Device coordinates are rounded to four decimal places before being sent to intori; that is still precise location, not an anonymous or approximate area. Other location setup uses a point rounded to two decimal places. Your device may provide a less accurate location if you turn Precise Location off. We do not track you in the background or infer your home or work address. You can deny location access and type a city or ZIP code instead, or change permission later in iOS Settings.
      </p>
      <p>
        The request can leave a coarse search-area record and a one-way run signature used to avoid reusing the wrong results. We do not save the request&apos;s precise latitude and longitude in those records. Google&apos;s processing is governed by its own policy, linked below. The App Store privacy label includes Precise Location for this optional Food feature; it is used for app functionality, not advertising or tracking.
      </p>

      <h3>Device and diagnostic information</h3>
      <p>
        The app collects device model, operating system version, app version, language and region, and performance and error diagnostics, such as how long a screen took to load or a request that did not go through. We use this to keep the app working and to fix problems, and it may be linked to your account for support and abuse prevention.
      </p>
      <p>
        intori collects all of this itself and writes it to our own records. The app contains no third-party analytics, crash reporting, attribution, or advertising software development kits. Apple Ads attribution, described below, uses Apple&apos;s own AdServices framework and no third-party software. Nothing about your use of the app is sent to an analytics company. The app does not use the device advertising identifier and does not track you across other companies&apos; apps or websites. If we ever add a third-party diagnostics tool, we will update this policy and the App Store privacy label before it ships.
      </p>

      <h3>Apple Ads attribution</h3>
      <p>
        intori advertises in the App Store with Apple Ads. After you sign in to the iPhone app, the app asks Apple&apos;s AdServices framework for an attribution token and sends it to intori, and we send it to Apple. Apple tells us whether an Apple Ads campaign led to this download and, if one did, which campaign, ad group, and search keyword. This does not use the device advertising identifier, does not ask for App Tracking Transparency permission, and Apple&apos;s answer contains no personal information.
      </p>
      <p>
        We keep only the campaign, ad group, and keyword numbers, whether you tapped the ad or only saw it, or a note that no ad was involved. We do not keep the token, the date you saw the ad, or which ad you saw. We check only for accounts created in the last 30 days, so opening intori on a new iPhone never relabels an older account.
      </p>
      <p>
        We use this only to learn which ads bring families who find intori useful, so we can stop paying for ads that do not. We do not share it with anyone, and we do not use it to target ads to you or anyone else. It is deleted when you delete your account. Thirteen months after we record it, we delete it from your account and keep only totals that are not tied to anyone.
      </p>

      <h3>Deleting your account in the app</h3>
      <p>
        You can delete your intori account from inside the app. See &quot;Your controls and choices&quot; below.
      </p>

      <h2>How we use information</h2>
      <p>We use information to:</p>
      <ul>
        <li>Provide, maintain, personalize, and improve intori.</li>
        <li>Authenticate users and maintain sessions.</li>
        <li>Build and update your preferences, declared constraints, groups, answers, local context, and personalization state.</li>
        <li>Apply your declared constraints as filters, use inferred signals only to change ranking, and show you which constraints were applied to a result.</li>
        <li>Generate suggestions, results, and context summaries.</li>
        <li>Decide what to ask you next.</li>
        <li>Let you control topic, group, local context, notification, AI sharing, and connected app consent.</li>
        <li>Process subscriptions, verify purchases, and manage trials, renewals, and cancellations.</li>
        <li>Send notifications you request or allow.</li>
        <li>Detect, prevent, and respond to spam, abuse, fraud, security incidents, and violations of our terms.</li>
        <li>Provide customer support and communicate with you.</li>
        <li>Measure performance, reliability, and product usage.</li>
        <li>Learn which of our ads and campaign links bring new accounts, as described under Apple Ads attribution, Campaign links, and Meta ads.</li>
        <li>Comply with law and enforce our rights.</li>
      </ul>
      <p>
        We do not use your information for purposes that are materially different from those described in this policy without providing appropriate notice or obtaining consent where required.
      </p>

      <h2>How information is shared</h2>
      <p>We share information only as described below.</p>

      <h3>With AI processors</h3>
      <p>
        Two of the companies we work with are AI processors. To produce a result, intori sends them a limited amount of context. We send what the request needs and no more. We do not send your email address, sign-in identifiers, or payment information to them.
      </p>
      <ul>
        <li><strong>OpenAI.</strong> Used to interpret your request, summarize sources, and write the result. May receive your request text, the declared preferences and dietary constraints relevant to that request, coarse local context, and source material retrieved for the request.</li>
        <li><strong>Perplexity.</strong> Used for search and retrieval when a result needs current information. May receive a search query built from your request and the relevant declared preferences, which can include dietary constraints.</li>
      </ul>
      <p>
        These processors receive context in order to answer a request. They do not receive your intori account. We reach both companies through their developer APIs, not through their consumer products. We send them context to answer your request. We do not send it for model training, and we do not ask them to train on it. What each company does with data it receives through its API is governed by that company&apos;s own terms. If our use changes, we will update this policy first.
      </p>

      <h3>With data providers</h3>
      <p>
        The following are data APIs, not AI services. intori queries them for facts and listings. They do not generate results, and they do not receive your intori account.
      </p>
      <ul>
        <li><strong>Spoonacular.</strong> Used for recipe and ingredient data. May receive recipe search terms, including dietary constraints and excluded ingredients such as allergens.</li>
        <li><strong>Google Maps Platform and Google Places.</strong> Used to find and describe local venues such as restaurants and to display Google Maps place details. May receive a city or approximate area, a search radius, and venue search terms. When you choose Use my location for Food, it may also receive the precise point described above, through intori, to answer that request. Google&apos;s handling of this information is governed by the <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a>, and use of Google Maps features is subject to the <a href="https://maps.google.com/help/terms_maps/" target="_blank" rel="noreferrer">Google Maps/Google Earth Additional Terms of Service</a>.</li>
        <li><strong>Ticketmaster.</strong> Used for live event and ticket listings. May receive coarse local context, date ranges, and event search terms such as a genre or an artist.</li>
      </ul>
      <p>
        intori includes Google Maps features and content. Your use of those features is subject to the <a href="https://maps.google.com/help/terms_maps/" target="_blank" rel="noreferrer">Google Maps Terms of Service</a>. When Google place details load, your device connects directly to Google, which receives your IP address and request information. Google&apos;s widget may also request fonts from Google Fonts servers. intori&apos;s own application font is served locally. Google processes information under the <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google Privacy Policy</a>.
      </p>

      <h3>How you control what goes to an AI processor</h3>
      <p>
        Context goes to OpenAI or Perplexity only when you run a feature that needs one of them. Running that feature is what sends it. Nothing goes to either company when you are not using an AI-assisted feature, and the rest of intori works without them.
      </p>
      <p>
        You can allow or turn off AI sharing in You, then What intori knows, under Permissions. Turning it off stops new personal context from reaching OpenAI or Perplexity; it does not erase results already created. Features that need this permission explain the sharing before asking you to allow it. Event and place data services are separate from AI processing and follow the provider disclosures above.
      </p>
      <p>
        If you have a question or a request about your context, email <a href="mailto:contact@intori.com">contact@intori.com</a>.
      </p>

      <h3>With other intori users</h3>
      <p>
        We do not share your information with other intori users. There is no matching, no friends, no chemistry summaries, no shared vibes, and no mutual friends. intori has no social graph. Your answers, your declared preferences, and your declared dietary constraints are not visible to anyone else using intori.
      </p>
      <p>
        You can create a share link or a preview image for a Helper and send it to whoever you like. Those show information about the Helper. They do not carry your answers, your declared constraints, or anything else personal to you.
      </p>

      <h3>With connected apps you approve</h3>
      <p>
        If you approve a connected app, intori may share a scoped context bundle with that app. For example, a music scene scope may include music preference summaries, independent-artist openness or support style, coarse active local context, and missing areas that help the app ask useful follow-up questions.
      </p>
      <p>
        The current connected app design excludes raw answers, raw questions, declared dietary and health-adjacent constraints, exact location, GPS coordinates, inferred home or work location, payment data, wallet claims, KYC claims, biometric claims, and identity claims unless a future feature clearly asks for additional consent. You can disconnect a connected app whenever you want. Open Connected apps under Your data and choose Disconnect. That stops future access.
      </p>
      <p>
        Once a connected app receives information, that app&apos;s own terms and privacy policy may apply to its handling of the information.
      </p>

      <h3>With service providers</h3>
      <p>
        We use service providers to host and operate intori, store data, process payments, deliver notifications, provide AI processing and source data, secure intori, and provide customer support. These providers may process information only as needed to perform services for us, subject to appropriate contractual and security obligations.
      </p>
      <p>
        Service providers include cloud hosting and database providers, Apple for app distribution, sign-in, push notifications, and App Store billing, Stripe for web payments, OpenAI and Perplexity for AI processing, Spoonacular, Google Places, and Ticketmaster for recipe, venue, and event data, Farcaster and Farcaster data providers, World App and Worldcoin services, wallet or blockchain infrastructure providers, and support tools.
      </p>

      <h3>With third-party platforms</h3>
      <p>
        When you use intori through Apple, Farcaster, World App, wallets, blockchain networks, or other third-party platforms, those platforms may process information under their own terms and privacy policies. Blockchain transactions may be public and difficult or impossible to delete.
      </p>

      <h3>For legal, safety, and business reasons</h3>
      <p>
        We may disclose information if we believe disclosure is reasonably necessary to comply with law, respond to legal process, protect rights or safety, investigate abuse or fraud, enforce our terms, or complete a merger, acquisition, financing, reorganization, or similar transaction.
      </p>

      <h2>Selling or sharing for advertising</h2>
      <p>
        We do not sell or rent your personal information. Apart from the Meta ads measurement described above, we do not share personal information for cross-context behavioral advertising. Depending on the law where you live, telling Meta about a sign-up, trial start, or purchase may count as sharing for advertising; you can turn it off for your browser with Global Privacy Control, which we honor, or ask us to remove the ids at any time. We do not sell, rent, or share your declared dietary and health-adjacent information for any advertising purpose, and we do not use it to target ads to you. If any of this changes, we will update this policy and provide any required choices.
      </p>

      <h2>Your controls and choices</h2>
      <p>
        intori is designed to give you control over your data and your consent. Depending on the feature, you can:
      </p>
      <ul>
        <li>Skip questions or choose what answers to provide.</li>
        <li>View, correct, or delete a declared dietary or household constraint.</li>
        <li>Pause, edit, or delete local context.</li>
        <li>Grant or turn off consent for sensitive topics under Permissions in What intori knows. Turning one off changes what intori may ask you next. It does not delete result context that already exists.</li>
        <li>Grant or withdraw permission for intori to send your context to an AI processor.</li>
        <li>Download a copy of your data, clear what intori has learned about you, or delete your account, from the You tab.</li>
        <li>Approve a connected app, or disconnect one, in Connected apps under Your data.</li>
        <li>Enable or disable notifications through the iOS Settings app or intori notification controls.</li>
        <li>Choose whether to create or distribute Helper share links and preview images.</li>
        <li>Contact us to request access, correction, export, deletion, or other privacy rights.</li>
      </ul>

      <h3>Deleting your account</h3>
      <p>
        You can delete your intori account yourself. Open the You tab, then Settings and data, and choose Delete your account. What intori knows also links to Settings and data. For help with deletion, email <a href="mailto:contact@intori.com">contact@intori.com</a>.
      </p>
      <p>
        Deleting your account removes your answers, declared preferences, declared dietary constraints, local context, results, and connected app grants, except for records we must keep for legal, accounting, security, or fraud-prevention reasons. If you signed in with Apple, we ask Apple to revoke your Sign in with Apple token. If Apple is temporarily unavailable, your intori account deletion still proceeds and intori removes its stored Apple credentials.
      </p>
      <p>
        Deletion is permanent. We cannot restore a deleted account. Deleting your intori account does not cancel an App Store subscription. Cancel that separately in your Apple account subscription settings.
      </p>

      <h3>Getting a copy of your data</h3>
      <p>
        You can download a copy of your data yourself, in the app and on the web. Open You, then Settings and data, and choose Download your data. intori builds the file straight away and your device downloads it as a JSON file. There is no queue and no waiting for an email.
      </p>
      <p>
        The export includes your account and sign-in details, your answers, your declared preferences, your declared dietary constraints including whether each one applies to you or to a household member, your local context, your consent records, your results and runs, your connected app grants and receipts, and your vibe. If you would rather ask us for it, email <a href="mailto:contact@intori.com">contact@intori.com</a>.
      </p>

      <h2>Retention</h2>
      <p>
        We keep information for as long as needed to provide intori, maintain user controls and receipts, prevent abuse, comply with legal obligations, resolve disputes, and enforce agreements.
      </p>
      <p>
        Session cookies are intended to expire after a limited period. Ad attribution, campaign tags, and Meta click and browser ids kept on an account are deleted 13 months after we record them, and only totals that are not tied to anyone remain. Partner grants may expire or be revoked. Payment, subscription, and transaction records may be retained for accounting, fraud prevention, charge dispute, tax, and legal reasons. Profile, answer, declared constraint, consent, AI result, receipt, and derived records are kept until you delete them, delete your account, or request deletion. Turning off a topic consent changes what intori may ask you next. It does not by itself delete result context that already exists.
      </p>
      <p>
        First-party transport observations from our current measurement system are normally removed after 90 days. Daily maintenance is bounded, so a backlog may take additional time to clear. Account-owned activity, action and replay records are removed when you delete your account. Anonymous aggregate statistics may remain after deletion. Financial transaction references may remain for accounting, disputes and replay prevention; we do not use them to recognize a deleted account or decide whether a new account can start a trial. Older operational and security records follow the purpose-based retention described above, not an automatic 90-day rule.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable administrative, technical, and organizational safeguards designed to protect information. No online service can guarantee absolute security. You are responsible for keeping your device, platform account, and any authentication credentials secure.
      </p>

      <h2>International processing</h2>
      <p>
        We are based in the United States, and we and our service providers may process information in the United States and other countries. The laws of those countries may differ from the laws where you live.
      </p>

      <h2>Privacy rights</h2>
      <p>
        Depending on where you live, you may have rights to request access, correction, deletion, portability, restriction, objection, or information about how your personal information is used and disclosed. You may also have rights to limit the use of sensitive personal information, or to opt out of certain sales, sharing, or targeted advertising. Declared dietary and health-adjacent information is treated as sensitive. We use it only to provide intori, and we do not sell it or share it for advertising.
      </p>
      <p>
        To make a privacy request, contact <a href="mailto:contact@intori.com">contact@intori.com</a>. We may need to verify your identity before fulfilling a request. We will not discriminate against you for exercising privacy rights.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. If we make material changes, we will provide reasonable notice, such as by updating the date above, posting notice in intori, or using another appropriate method.
      </p>

      <h2>Contact us</h2>
      <p>
        For questions or privacy requests, contact us at <a href="mailto:contact@intori.com">contact@intori.com</a>.
      </p>
      </LegalLayout>
    </>
  )
}

export default Privacy
