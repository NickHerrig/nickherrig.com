---
author: ["Me"]
title: "Arc Search on Mac with Raycast Quicklinks"
date: "2024-05-05"
description: "Using arch search on mac with raycast quicklinks"
tags: [tools, ai]
ShowToc: true
TocOpen: false
draft: false
---

This blog is a short one but has improved my search experience immensely. last week I heard a lot of interesting content around a feature from Arc called Arc Search.

## Arc Search

Apparently it's a wrapper around [Perplexity AI](https://www.perplexity.ai/) that enables a more interactive and creative search experience.
If you haven't seen it in action, here's a review of the app on youtube.

{{< youtube 0tlkVZcGUSA >}}

After doing some googling though, I was disappointed to find that there wasn't a desktop mac version of Arc Search.
Rather, the idea is that you have to download a mobile app. 😭

## Redit to the Rescue

I did a bit of googling and stumbled upon a user that had [a workaround](https://www.reddit.com/r/ArcBrowser/comments/1aiqe1p/can_i_use_arc_search_on_mac/).
A comment from `JoJoC0der` revealed that the same search experience was available in browser with a simple `GET` request seen below. 😍

`https://search.arc.net/?type=ask-arc&q={put the query here}&device_handshake=1`

When searching for say 'Des Moines' in the url query parameter you can see the search experience in browser.
Take a look.

{{<figure src="/images/arc-search-raycast-quicklinks/des-moines-search.gif" title="arc search gif" alt="arc search gif">}}


## Raycast Quicklinks

With this information in hand, I still wasn't satisfied with the experience of needing to copy and paste my search query into a browser.
Enter [Raycast quicklinks](https://manual.raycast.com/quicklinks). First off, if you haven't year of [Raycast](https://www.raycast.com/) let me change your life. 
Raycast is my favorite new tools I've started using in 2024, and is a powerful drop in replacement for the default Mac Spotlight app.
Raycast quicklinks are a powerful feature of Raycast that allows you to open frequently visited links int he browser. The unlock here though, is that 
Raycast quicklinks support "Query parameters are marked between braces like {Query}".

After a little bit of configuration let's take a look at the new experience by searching about python named tuples.

{{<figure src="/images/arc-search-raycast-quicklinks/quicklink-search.gif" title="arc search gif" alt="arc search gif">}}

I'm pretty happy with the search upgrade! Thanks for reading, and enjoy sharpening your own tools! 🪓