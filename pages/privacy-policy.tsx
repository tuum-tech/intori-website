import type { NextPage } from "next";
import Head from 'next/head'
import { LegalLayout } from '../layouts/Legal'

const Privacy: NextPage = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy — intori</title>
        <meta
          name="description"
          content="How intori collects, uses, and protects information."
        />
      </Head>

      <LegalLayout>
        <h1>intori Privacy Policy</h1>
        <p><strong>Last Updated: May 22, 2026</strong></p>

      <h2>Who we are</h2>
      <p>
        The intori service is owned by Tuum Technologies, Inc. (&quot;Tuum&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
      </p>
      <p>You can contact us by email at <a href="mailto:contact@tuum.tech">contact@tuum.tech</a>.</p>
      <p>In writing to:</p>
      <address>
        Tuum Technologies, Inc.<br />
        4030 Wake Forest Road, STE 349<br />
        Raleigh, NC 27609
      </address>

      <h2>What intori is</h2>
      <p>
        intori helps you build and use a personal preference and context profile. Depending on the features you use, intori may help you answer questions, unlock topics, manage local context, earn or use credits, receive AI-assisted helper results, discover recommended matches, and share scoped context with connected apps you approve.
      </p>
      <p>
        intori is being built around user-owned data and user-controlled consent. Your answers, preferences, local context, and personal signals are yours. We use them to provide the services you ask for, personalize your experience, and help you control where your context is used.
      </p>

      <h2>Eligibility</h2>
      <p>
        intori is not directed to children under 13. You must be at least 13 years old to use intori. If the law where you live requires a higher age to consent to the processing of your personal data, you must be old enough to provide that consent or use intori only with valid permission from a parent or legal guardian. If we learn that we collected personal information from a child under 13, we will take steps to delete it.
      </p>

      <h2>Information we collect</h2>
      <p>
        We collect information from you, from the platforms you use to sign in, from your use of intori, and from service providers that help us operate intori.
      </p>

      <h3>Account and sign-in information</h3>
      <p>
        intori does not use a traditional email-and-password account system. Depending on how you access intori, we may collect or process:
      </p>
      <ul>
        <li>Farcaster account identifiers, such as FID, username, display name, profile image, bio, and related public profile data.</li>
        <li>World App, World Mini App, or wallet-based identifiers, such as wallet address, username, profile image, authentication messages, signatures, nonce records, and verification results.</li>
        <li>Session tokens and cookies used to keep you signed in.</li>
        <li>Information about the client app or platform through which you accessed intori.</li>
      </ul>

      <h3>Answers, preferences, and context</h3>
      <p>
        When you answer questions, complete onboarding, use credits, rate insights, or interact with helper surfaces, we collect the information you choose to provide. This may include:
      </p>
      <ul>
        <li>Answers to questions about preferences, tastes, interests, values, activities, identity, and context.</li>
        <li>Topics, groups, credit history, streaks, and other progress within intori.</li>
        <li>Feedback, ratings, likes, skips, and other interaction signals.</li>
        <li>Public share data when you choose to create or distribute share links or share images.</li>
      </ul>

      <h3>Local context</h3>
      <p>
        If you choose to add local context, we may store information such as city, region, country, place label, place source, and radius. Local context is user-declared and can be paused, updated, or deleted. The current product is designed around coarse local context, not precise GPS coordinates, raw coordinates, or inferred home or work location.
      </p>

      <h3>Derived and inferred data</h3>
      <p>
        intori may create derived data from your activity, such as topic signals, sensitivity tiers, visibility states, match context, vibe summaries, chemistry summaries, helper context summaries, and personalization profiles. These derived records help intori decide what questions to ask, what context to include, what to exclude, and what experiences may be relevant to you.
      </p>

      <h3>Consent and connected app records</h3>
      <p>
        When you grant, deny, or revoke consent, we may store consent records, scope, sensitivity level, metadata, timestamps, connected app identifiers, authorization codes, grant status, expiration, revocation status, and receipts showing when a connected app accessed a context bundle.
      </p>

      <h3>AI helper and result data</h3>
      <p>
        When you use AI-assisted features, we may process selected intori context, local context when active, source-search results, your displayed request, generated output, result receipts, feedback, model name, prompt version or hash, token estimates, cost estimates, duration, errors, and related metadata.
      </p>
      <p>
        We use AI service providers, including OpenAI, to generate or support some results. AI outputs may be incomplete, outdated, or inaccurate, and should be checked before you rely on them.
      </p>

      <h3>Payments and credits</h3>
      <p>
        If you buy or activate paid credits, helper access, or similar features, we may store purchase reference, provider, token symbol, token amount, transaction ID, transaction hash, status, failure codes, failure reasons, confirmation time, activation time, and verification metadata. Payments may be processed through third-party wallets, World Pay, blockchain networks, or other supported payment rails. We do not collect your private keys.
      </p>

      <h3>Notifications</h3>
      <p>
        If you enable notifications, we may store notification tokens, notification URLs, opt-in status, notification campaign information, send logs, and delivery or failure metadata. You can opt out through the applicable platform or intori notification controls where available.
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
        <li>Your email address.</li>
        <li>Your mobile or other phone number.</li>
        <li>Government ID numbers, KYC documents, or biometric identifiers.</li>
        <li>Private keys, recovery phrases, or wallet seed phrases.</li>
        <li>Payment card numbers or bank account numbers.</li>
        <li>Precise GPS coordinates, raw coordinates, or inferred home or work location.</li>
        <li>Your device address book or phone contacts.</li>
      </ul>
      <p>
        Third-party platforms you use with intori, such as Farcaster, World App, wallets, payment providers, or blockchain networks, may collect information under their own policies.
      </p>

      <h2>How we use information</h2>
      <p>We use information to:</p>
      <ul>
        <li>Provide, maintain, personalize, and improve intori.</li>
        <li>Authenticate users and maintain sessions.</li>
        <li>Build and update your preferences, groups, credits, answers, local context, and personalization state.</li>
        <li>Generate recommendations, helper results, match suggestions, and context summaries.</li>
        <li>Let you control topic, group, local context, notification, and connected app consent.</li>
        <li>Verify paid credit or helper access transactions.</li>
        <li>Show limited recommended match and approved friend information.</li>
        <li>Send notifications you request or allow.</li>
        <li>Detect, prevent, and respond to spam, abuse, fraud, security incidents, and violations of our terms.</li>
        <li>Provide customer support and communicate with you.</li>
        <li>Measure performance, reliability, and product usage.</li>
        <li>Comply with law and enforce our rights.</li>
      </ul>
      <p>
        We do not use your information for purposes that are materially different from those described in this policy without providing appropriate notice or obtaining consent where required.
      </p>

      <h2>How information is shared</h2>
      <p>We share information only as described below.</p>

      <h3>With other intori users</h3>
      <p>
        intori is not designed to broadly expose your answers or personal context to other users. Recommended matches who are not approved friends may see only limited profile information, such as avatar, username, vibe, and mutual friends. If both people approve the connection, approved friends may also see a chemistry summary and groups in common.
      </p>
      <p>
        Users who can see information may save or reshare it outside intori, so you should not share information that you do not want others to see.
      </p>

      <h3>With connected apps you approve</h3>
      <p>
        If you approve a connected app, intori may share a scoped context bundle with that app. For example, a music scene scope may include music preference summaries, independent-artist openness or support style, coarse active local context, and missing areas that help the app ask useful follow-up questions.
      </p>
      <p>
        The current connected app design excludes raw answers, raw questions, exact location, GPS coordinates, inferred home or work location, payment data, wallet claims, KYC claims, biometric claims, and identity claims unless a future feature clearly asks for additional consent. You can revoke connected app access where the product provides revocation controls.
      </p>
      <p>
        Once a connected app receives information, that app&apos;s own terms and privacy policy may apply to its handling of the information.
      </p>

      <h3>With service providers</h3>
      <p>
        We use service providers to host and operate intori, store data, process payments or payment verification, deliver notifications, provide AI functionality, support analytics and aggregate reporting, secure intori, and provide customer support. These providers may process information only as needed to perform services for us, subject to appropriate contractual and security obligations.
      </p>
      <p>
        Service providers may include cloud hosting and database providers, Farcaster and Farcaster data providers, World App and Worldcoin services, wallet or blockchain infrastructure providers, payment verification providers, AI providers such as OpenAI, notification providers, analytics providers, and support tools.
      </p>

      <h3>With third-party platforms</h3>
      <p>
        When you use intori through Farcaster, World App, wallets, blockchain networks, or other third-party platforms, those platforms may process information under their own terms and privacy policies. Blockchain transactions may be public and difficult or impossible to delete.
      </p>

      <h3>For legal, safety, and business reasons</h3>
      <p>
        We may disclose information if we believe disclosure is reasonably necessary to comply with law, respond to legal process, protect rights or safety, investigate abuse or fraud, enforce our terms, or complete a merger, acquisition, financing, reorganization, or similar transaction.
      </p>

      <h2>Selling or sharing for advertising</h2>
      <p>
        We do not sell or rent your personal information. We do not currently share personal information for cross-context behavioral advertising. If this changes, we will update this policy and provide any required choices.
      </p>

      <h2>Your controls and choices</h2>
      <p>
        intori is designed to give you increasing control over your data and consent. Depending on the feature, you may be able to:
      </p>
      <ul>
        <li>Skip questions or choose what answers to provide.</li>
        <li>Pause, edit, or delete local context.</li>
        <li>Grant or revoke topic or group consent.</li>
        <li>Approve or revoke connected app grants.</li>
        <li>Enable or disable notifications through platform or intori controls.</li>
        <li>Choose whether to create or distribute share links and share images.</li>
        <li>Contact us to request access, correction, export, deletion, or other privacy rights.</li>
      </ul>
      <p>
        Self-service export and deletion tools are still being developed. Until those tools are available, contact <a href="mailto:contact@tuum.tech">contact@tuum.tech</a>.
      </p>

      <h2>Retention</h2>
      <p>
        We keep information for as long as needed to provide intori, maintain user controls and receipts, prevent abuse, comply with legal obligations, resolve disputes, and enforce agreements.
      </p>
      <p>
        Session cookies are intended to expire after a limited period. Partner grants may expire or be revoked. Payment and transaction records may be retained for accounting, fraud prevention, charge dispute, tax, and legal reasons. Some profile, answer, consent, AI result, receipt, and derived records may remain until you delete them, revoke the relevant consent where supported, or request deletion.
      </p>
      <p>
        We are continuing to define more specific retention periods for each data category.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable administrative, technical, and organizational safeguards designed to protect information. No online service can guarantee absolute security. You are responsible for keeping your wallet, platform account, device, and any authentication credentials secure.
      </p>

      <h2>International processing</h2>
      <p>
        We are based in the United States, and we and our service providers may process information in the United States and other countries. The laws of those countries may differ from the laws where you live.
      </p>

      <h2>Privacy rights</h2>
      <p>
        Depending on where you live, you may have rights to request access, correction, deletion, portability, restriction, objection, or information about how your personal information is used and disclosed. You may also have rights to opt out of certain sales, sharing, targeted advertising, or sensitive-data uses. We do not currently sell personal information or share it for cross-context behavioral advertising.
      </p>
      <p>
        To make a privacy request, contact <a href="mailto:contact@tuum.tech">contact@tuum.tech</a>. We may need to verify your identity before fulfilling a request. We will not discriminate against you for exercising privacy rights.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. If we make material changes, we will provide reasonable notice, such as by updating the date above, posting notice in intori, or using another appropriate method.
      </p>

      <h2>Contact us</h2>
      <p>
        For questions or privacy requests, contact us at <a href="mailto:contact@tuum.tech">contact@tuum.tech</a>.
      </p>
      </LegalLayout>
    </>
  )
}

export default Privacy
