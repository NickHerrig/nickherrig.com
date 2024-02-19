---
author: ["Me"]
title: "Improved Gaming with Powerline"
date: "2024-02-18"
description: "Improving my gaming speed/latency with powerline internet."
tags: [gaming, technology, networking]
ShowToc: true
TocOpen: false
draft: false 
---

Some of you that read my blogs know that I'm a pretty big fan of Rocket League. For those of you that aren't aware of this game, please allow me to change your life. The best way to describe Rocket League is that it's half soccer half demolition durby. You play as a flying car, and do your best to kick a soccer ball into your opponents net. For those who still aren't really getting what Rocket League is, look at this epic goal below.

{{< figure src="/images/powerline/rocket-league.gif" alt="gif of rocket league">}}

 The only way I play the game is competitevly via 1v1, 2v2, or 3v3 game play. Now just because I only play competitvely doesn't mean I play well, but I digress. The last few times I've played the game, there was some pretty narly lag. This lag made competitve game play pretty frusturating. It was happening across multiple weeks, so I was fairly certain it had to do with my own internet connection. Part of me wondered if it was due to the placement of my wifi access point, or the fact that I was gaming over a wifi connection to begin with. Some of you might ask

 > "Why not just run ethernet to the PS5 and call it good". - Some of you

This is a great idea and my initial thought! The problem though is that I live in a 3 story town home, of which my main networking gear comes in on the first floor, and my ps5 sits in the basement. I also rent, which means that I wasn't about to drill holes in the walls/floors to run ethernet to the basement.

## Enter Powerline

I was feeling a bit hopeless, when I happened to be listening to [this episode](https://2.5admins.com/2-5-admins-171/) from one of my favorite IT podcasts called 2.5 admins. At minute marker  20:38, a listener had the same problems that I had around not being able to run ethernet, and was wondering if powerline might be a good option. Instandly I questioned... "what the heck is powerline?!". Well after some digging, powerline seems like it should be illegal or magicall. The steps to setting this up are below.

1. Buy a set of powerline adapters.
2. Plug one into to an outlet near your router, and connect ethernet to it.
3. Plug the other into an outlet near a device needing internet, and connect ethernet to it.
4. Packets are sent over your electrical circuit.

{{< figure src="/images/powerline/powerline_internet.png" alt="diagram of powerline setup.">}}

After learning about this, I purchased a pair of [tplink powerline adapters](https://www.amazon.com/Powerline-Ethernet-Adapter-Extender-TP-Link/dp/B084CZMYNM?th=1) and got them all hooked up! Below are some speed test results.

## PS5 Internet Testing Results

For my first test, I  thought I'd go straight to the source and run a ps5 internet speed test.
The numbers are pretty simple, but still gave some valuable insight.

| Connection  | Upload Speed (Mbps) | Download Speed (Mbps) |
| ----------- | ------------------: | --------------------: |
| 5 GHz Wifi  |                81.6 |                   9.6 |
| Powerline   |               101.4 |                  14.1 |

So both my upload and download speeds were better on the ps5. Pretty cool.

I then thought it'd be cool to run a test through cloudflare's speed test web page.
It was a little challenging finding a way to access a browser on the ps5, but it's possible if you got to "Settings" > "Users and Accounts" > "Link Account" > "Youtube". From youtube, you can make your way to the google search bar to get to https://speed.cloudflare.com/.

## Cloud Flare Speed Test Results

Cloud flare has a cool [Network Quality Score](https://developers.cloudflare.com/speed/aim/) which takes into effect latency, packet loss, download, upload, loaded latency, and jitter. From there it calculates a network score of bad, poor, average, good, and great

Without diving into the numbers, I'll give you the results in term of the bad-great rates for each category.

| Connection  | Video Streaming  |  Online Gaming |  Video Chatting |
| ----------- | ---------------: | -------------: | ---------------:|
| 5 GHz Wifi  |   Good           |     Average    |    Average      |
| Powerline   |   Good           |   Great        |     Great       |

This is relatively new change, so I'll see how the actual feel of game play is improved over time, but I'm pretty optomistic that powerline will have solved my issue. More to come on if this is the case! Cheers!
