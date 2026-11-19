---
title: "Building Split the G"
date: "2026-11-19"
description: "How a disagreement over a Guinness turned into a computer vision app."
author: ["Nick Herrig"]
tags: [computer vision, programming, projects]
ShowToc: true
draft: false
---

[Split the G](https://splittheg.dev/) started when a friend's roommate and I couldn't agree on whose Guinness split was better. Hunter, Nathan, and I built the app together.

The goal is to get the beer line through the G on the glass. The app scores a photo from zero to five.

{{< figure src="/images/split-the-g/pint-example.webp" link="/images/split-the-g/pint-example.webp" alt="A Guinness glass with the beer line crossing the printed G." caption="The split we wanted to measure." width="416" height="522" loading="lazy" >}}

## Getting the measurement right

Our first approach was to detect the beer and the G, then compare their positions. The curved liquid surface made that less reliable than we'd expected. The top of a bounding box didn't always match the beer line inside the letter.

{{< figure src="/images/split-the-g/meniscus.webp" link="/images/split-the-g/meniscus.webp" alt="Annotated pint showing the curved beer surface above the level inside the G." caption="Where the first measurement went wrong." width="936" height="426" loading="lazy" >}}

We added a second model that looked at a crop of the G. The wider image gave us a fallback when the line missed the G.

{{< figure src="/images/split-the-g/g-detection.webp" link="/images/split-the-g/g-detection.webp" alt="The full pint beside a close crop of the G with detection boxes." caption="A closer look at the G." width="656" height="646" loading="lazy" >}}

## Making it usable

The original app used React Router, Tailwind, Supabase, and Roboflow. InferenceJS checked the camera feed before capturing an image. A Roboflow Workflow handled the detections, and Supabase stored results for the leaderboard.

{{< figure src="/images/split-the-g/workflow.webp" link="/images/split-the-g/workflow.webp" alt="Roboflow Workflow connecting object detection, cropping, face blurring, and annotated outputs." caption="Our original Roboflow Workflow." width="966" height="560" loading="lazy" >}}

{{< figure src="/images/split-the-g/leaderboard.webp" link="/images/split-the-g/leaderboard.webp" alt="The original Top Splits leaderboard with ranked scores and cropped photos." caption="The original leaderboard." width="936" height="592" loading="lazy" >}}

{{< figure src="/images/split-the-g/score-result.webp" link="/images/split-the-g/score-result.webp" alt="The original results screen showing a 4.92 score and annotated images of the G and pint." caption="The original score page." width="936" height="1042" loading="lazy" >}}

We shared the implementation, including the scoring code, in [our original Roboflow post, published February 5, 2025](https://roboflow.com/blog/split-the-g-app). The images here come from that post.

## The app today

The [website](https://splittheg.dev/) now includes pub discovery, groups, and community leaderboards alongside the scorer. You can submit an existing photo, take a photo, or use live capture. You don't need an account to get a score.

As of November 19, 2026, the homepage showed more than 271,000 recorded splits and 6,300 users. Those are counts reported by the app, and they'll keep changing.

You can [open Split the G](https://splittheg.dev/) to try the scorer or [browse the pub map](https://splittheg.dev/find-pub).
