---
title: "Introducing HAPP"
dek: "HAPP is intori's private, permissioned personalization layer. It turns your answers into the right context for your Helpers and the AI tools you choose. Today it's live behind four daily Helpers, on the web and in World App."
date: "2026-07-XX"
author: "Donald Bullers"
slug: "introducing-happ"
heroImage: "/news/intori-happ-01.png"
tags:
  - "Product"
  - "Infrastructure"
  - "Personalization"
---

AI is getting more capable very quickly.

But even now, most AI tools still start from zero. They don't really know your preferences, your habits, what you've already corrected, what feels helpful, or what you actually care about. Most personalization today is either too shallow, too opaque, too stale, or too difficult to control.

That's the problem we've been working on underneath [intori](https://www.intori.co/).

In April, we [introduced SCIS](https://www.intori.co/news/introducing-scis), the **Structured Conversational Inventory System**, the layer that turns Packs and answers into structured, reusable signals. Today we're introducing the layer built on top of it, and it's now live in the product.

## HAPP

**Human-to-Agent Personalization Protocol (HAPP)** is intori's private, permissioned personalization layer.

It's the system that turns your answers, corrections, and context into structured understanding that helps your **Helpers**, and the AI tools you choose, understand you better over time.

Not through massive raw data dumps. Not through hidden tracking. And not through a single static profile-setup screen.

Instead, HAPP builds context gradually and keeps track of what is actually known, what is still uncertain, what has changed, and what should remain scoped or private.

## A Useful AI Does Not Need All Your Data

One of the biggest ideas behind HAPP is simple:

**A useful AI does not need all your data. It needs the right context.**

Some signals are strong. Some are weak. Some are hints. Some are corrections. Some become stale over time. Some should only apply to specific Helpers or situations.

HAPP is designed to preserve those differences instead of flattening everything into one giant memory blob. That means:

- answer-backed preferences should carry more weight than vague assumptions
- rejected suggestions should not become permanent truth
- stale context should eventually weaken
- Helpers should only receive the context they actually need

Not all context should travel everywhere. That distinction matters.

## Built To Be Correctable

People change. Preferences change. Context changes.

One of the risks with personalization systems is false specificity: a system makes one confident assumption, labels you incorrectly, and then keeps reinforcing it forever. We don't think that's good enough.

HAPP is designed to distinguish between what is known, what is inferred, what is missing, what has been corrected, and what still needs validation. If a Helper gets something wrong, that correction matters, but it should not instantly rewrite your identity forever either. Corrections become part of the system's understanding and help shape what should be reconsidered next.

## Helpers Are The Proof

The consumer-facing expression of all this is **Helpers**, and they're live today.

Four daily Helpers run on HAPP right now:

- **Today's Food:** what to cook or where to eat, shaped by your taste, constraints, and the moment
- **Game Day:** what's worth watching, tuned to the teams and sports you follow
- **Music Scene:** shows and music that fit your scene, timing, and venue comfort
- **Style Finds:** pieces that fit your taste and the way you actually shop

You don't need to understand HAPP, SCIS, graphs, or protocols to feel the value. You answer a few quick questions, and a Helper gives you a useful first pass. Not a blank prompt box, not a giant feed to sort through, but a short, considered shortlist built around what the system can confidently support.

And when a Helper needs more, it now does the most honest thing it can: **it asks.** You can go deeper in a quick conversation right inside intori. Ask a follow-up, try a different angle, ask "why this one," instead of the Helper pretending to know more than it does. A thin-context Helper saying it needs one more detail before guessing is not a weakness. That honesty is the whole point.

## Your Context, Across The Tools You Use

intori is now on the **web** at [app.intori.co](https://app.intori.co), alongside the World App, and your personalization follows you.

Sign in with email, with World ID, or with a supported platform, and intori links those into a single account. **World ID** adds a verified-human trust layer and lets your context carry across the web and the World App without rebuilding it each time. You teach intori once, and it stays yours wherever you use it.

And HAPP exports are still snapshots you control. You can bring structured context into the trusted AI tools and workflows you already use, on your terms. What HAPP is *not* doing is just as important:

- no autonomous posting
- no autonomous purchases
- no hidden live access
- no uncontrolled memory syncing

Portable and permissioned first. Any deeper integrations later should be scoped, revocable, and clearly useful.

## Keep intori One Tap Away

Because intori runs on the web now, you can add it to your phone's home screen and open it like any app. No app store, no download. Just intori, one tap away, whenever a question comes up.

![Add intori to your home screen](/news/intori-pwa-install.png)

To install it:

- **iPhone (Safari):** tap the Share button, then **Add to Home Screen**.
- **Android (Chrome):** tap the menu, then **Install app** (or **Add to Home Screen**).

Then open intori from your home screen the next time you're deciding what to cook, what to watch, where to go, or what to wear.

**[Get started at app.intori.co](https://app.intori.co)**

## Why This Matters

Most AI systems today still rely on shallow onboarding, passive inference, or long unstructured conversations that become hard to manage over time.

HAPP is a different direction: structured, reviewable, permissioned context that improves gradually through interaction. Packs teach intori what actually helps. Helpers get sharper as your Passport grows. Today that spans food, sports, music, and style, and the same foundation extends to travel, shopping, wellness, reading, family coordination, and more.

## What's Live Today

The foundation is no longer a promise. It's running in production:

- Packs and Passport progression, with structured signal generation through SCIS
- a private HAPP graph with scoped, permissioned context
- four daily Helpers on the web and in World App
- a "go deeper" conversation on Helper results when you want more
- correction-aware feedback so getting it wrong makes the next pass better
- one identity across surfaces via World-ID account linking
- Credits to run Helpers and go deeper, with a few free to start

## The Long-Term Goal

The long-term goal is not another feed, another setup wizard, or another system asking you to endlessly configure yourself.

It's a portable, permissioned context layer that helps the tools you already use understand you faster and more safely. Private by default. Useful when you choose to use it.

## Final Thought

SCIS structured the inputs. HAPP is what those inputs build into, and now it's doing real work, every day, across the things you care about.

Answer Packs. Build your Passport. Let your Helpers get sharper.

Your AI should understand you because you chose what to teach it.
