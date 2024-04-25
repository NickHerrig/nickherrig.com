---
author: ["Me"]
title: "Terminal Gifs"
date: "2024-04-07"
description: "Creating gifs of terminal commands with Terminalizer"
tags: [tools]
ShowToc: true
TocOpen: false
draft: false
---

Today's post is about creating terminal [Gifs](https://en.wikipedia.org/wiki/GIF). Gifs or Graphics Interchange Format is were invented
in 1987 by an American computer scientist named Steve Wilhite. Although the pronunciation has been the ripe with memes and hot debate
I thought it'd be a fun to specifically find out an easy way to create Gifs of my terminal for blog posts.
I was writing a post about [streaming LLM request in python](/posts/streaming-requests) and a gif would provide such a clean
display of the idea I was trying to get across. 

The specific gif in question was showcasing the results of a streaming api as seen below.

{{<figure src="/images/streaming_llm_python/streamed_response.gif" title="example terminal gif" alt="example terminal gif">}}

Pretty neat right? Let's talk about how to create this with a tool.

## Terminalizer
Terminalizer is a command line utility that allows you to record your terminal and generate animated gif images. It also states the ability
to share a web player of the gif, although I'm currently getting `This command is not implemented yet. It will be available in the next versions` 
when trying to use that feature.

### Installation

I [installed](https://www.terminalizer.com/install) this using [npm](https://www.npmjs.com/) which was a piece of cake. 

### Recording

To start recording a session type out the command `terminalizer record demo`. Note that originally when I typed out this command on mac,
I wasn't seeing any of my terminal styling. To fix this I followed advice from this [gh issue](https://github.com/faressoft/terminalizer/issues/113).
The final recording command I settled on was `terminalizer record demo --skip-sharing -d 'zsh'` and I ended up creating an alias to `trec`
in my `.zshrc` file. After you record a file, you should see the location in which the data is saved. 

```shell
The recording data is saved into the file:
/Users/nickherrig/git/nickherrig.com/demo.yml
```

### Playback

Once you record a terminal session you have the ability to play it back with `terminalizer play demo`. 
It's pretty cool to see what you created, and there are a number of [config settings](https://www.terminalizer.com/docs#configurations) 
to mess around with around removing delays, format, etc.

### Rendering

Finally, once we're satisfied with your gif, we can render it with `terminalizer render demo`. 
Let's take a peak at the final product!

{{<figure src="/images/terminal.gif" title="example terminal gif" alt="example terminal gif">}}

That's a wrap, hope you have fun building some dope Gifs.