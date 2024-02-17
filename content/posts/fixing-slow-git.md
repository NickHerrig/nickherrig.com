---
author: ["Me"]
title: "Solving Slow Git Repos"
date: "2024-02-11"
description: "Experiments with fixing my slow github repo cloning/pulling with image resizing."
tags: [web]
ShowToc: true
TocOpen: false
draft: true 
---

I was in the process of cloning the code for this website from github on a new laptop when I noticed something.

```shell
git clone git@github.com:NickHerrig/nickherrig.com.git
```

The repo was taking a noticable amount of time to clone.
I timed how long it took and found that it was about 8.5 seconds!

```shell
Cloning into 'nickherrig.com'...
remote: Enumerating objects: 583, done.
remote: Counting objects: 100% (76/76), done.
remote: Compressing objects: 100% (50/50), done.
remote: Total 583 (delta 23), reused 72 (delta 22), pack-reused 507
Receiving objects: 100% (583/583), 78.74 MiB | 11.49 MiB/s, done.
Resolving deltas: 100% (226/226), done.
git clone git@github.com:NickHerrig/nickherrig.com.git  1.08s user 1.94s system 35% cpu 8.524 total
```

I had an gut feel it was related to the images that I'm storing in the repo, but I wanted to make sure.
To find out I ran a `du -sh *` to try and find the largest directory.

```shell
du -sh *

4.0K    README.md
4.0K    archetypes
 88K    content
4.0K    hugo.yaml
 74M    static
  0B    themes

```

From here I noticed that my static directory was 74M. Gut feel confirmed. This is where I store all my blog images.
A little more digging showed that I was storing 26M of images from my most recent blog post [Kauai Hawaii - Part One: Adventures](https://nickherrig.com/posts/kauai-hawaii-adventures/). As I look forward to writing more blog posts with image content, I realized this doesn't really scale well with the usibility of my git repo. I started doing a little research and decided to tackle this problem in two ways.

## Image Resizing and Formating

When I realized my images were pretty large, I wanted to confirm this with another form of analysis. I reached for a popular tool called [PageSpeed Insights](https://pagespeed.web.dev/). You can use this tool to run an alysis on specific pages of a website to get an repot on performance issues.

{{< figure src="/images/pagespeed_results.png" title="pagespeed results for kauai adventures blog" >}}

One call out was to utilize next-gen formats like webp. another call out was to properly size the images. I decided to write a quick shell script to change the form of my images fro jpg to webp and reduce the quality.

```shell
for img in *.jpg; do
  magick convert "$img" -quality 80 "${img%.jpg}.webp"
done
```

With that, we're down to 11M from 26M! Not bad! Next, I wanted to resize the images. In order to do this, I needed to first identify the current size of the images, then figure out what the Computed values were on the website. To run this example, let's look at the Caves image.

```shell
identify -format "%wx%h\n" caves.webp     
4032x3024
```

When looking at the deployed production site, the same image height was 540px and width was 720px. This means we can resize to the computed value, and maybe even get away with bumping the quality to 100%. Let's try it out.

```shell

du -sh caves.webp                         
1.8M    caves.webp

magick caves.webp -resize 720x540 -quality 100 _caves.webp

du -sh caves.webp _caves.webp 
1.8M    caves.webp
496K    _caves.webp

```

And just lke that we've saved a ton of space, and my human eyes cannot tell the difference! I'll spare you the repetitveness of doing this to every image in my repo for the purpose of this blog.

## The Numbers

Now when I take a peak at my static directory here's what I see. 

```shell
du -sh *

4.0K    README.md
4.0K    archetypes
 84K    content
4.0K    hugo.yaml
4.1M    static      # Used to be 74M
792K    themes

```

Going from 74M to 4.1M with literally zero implication to noticable image quality is pretty great!

Let's take a look now at how long it takes to do a git pull. 

#TODO