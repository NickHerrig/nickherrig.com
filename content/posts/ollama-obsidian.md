---
author: ["Me"]
title: "Hack Your Notes: Building a LLM-Powered Obsidian Plugin with Ollama"
date: "2024-06-30"
description: "Let's build Scribe, an Obsidian plugin that rewrites your notes into a template using local LLMs"
tags: [tools, programming, obsidian]
ShowToc: true
TocOpen: false
draft: false 
---


I've been using [Obsidian](https://obsidian.md/) to take notes now for a little over a year. I've fallen in love with the tool and it
has really helped me organize my thoughts, work meetings, blogs, and general todo lists. I've noticed one problem that has become
somewhat annoying recently though. I've found that I have a lot of meeting notes that I've started, but I haven't formatted and organized them well.

This is no fault of the tool by the way. In a perfect world I would follow my meeting note workflow. This involves starting from an Client Notes
[obsidian template](https://help.obsidian.md/Plugins/Templates). This template includes important topics such as a agenda, who was present, what we
talked about, next steps, and who is responsible for the next steps. Fool proof, right? My notes should already be formatted and good to go since I started
with a template.

Well, I've noticed that in practice, I sometimes create meeting notes without the template. Along with this i've noticed that even when I use the
template, I sometimes put information in the incorrect sections, and I'm also terrible at spelling.

My frustration finally made me wonder if I could solve some of my laziness and mistakes with a [Obsidian Plugin](https://obsidian.md/plugins).
There have been some really impressive advancements in local LLMs, so I thought it would be interesting if an llm could help.

## The Solution: Scribe

Scribe is my first venture into Obsidian plugins. The idea is simple; save me time by solving my meeting notes problem.
My ideal solution was simple. I would create Scribe, an Obsidian plugin that would do one thing well.
It would rewrite my meeting notes based on a template.

Let's take a look at Scribe:

{{< youtube 9Or4w0UdFyg >}}

## Obsidian Plugin Development

I've never built an Obsidian plugin before, let alone one that would rewrite my notes for me, so I wanted to start simple.
Obsidian has a [great document](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin) on how to build a plugin.  
There are a few tricks I'd highly recommend from the documentation

### Create a Development Vault

While writing this plugin, I accidentally deleted notes more than once. Ensuring I had a development vault to experiment with was a very good idea and
I would recommend it to anyone building obsidian plugins. I created a new vault called "Dev" in which I built Scribe with.

### Obsidian Github Template

Obsidian provides a starter template to work off of called [obsidian sample plugin](https://github.com/obsidianmd/obsidian-sample-plugin).
This repository sets you up with a few really solid examples including:

- Adds a ribbon icon, which shows a Notice when clicked.
- Adds a command "Open Sample Modal" which opens a Modal.
- Adds a plugin setting tab to the settings page.
- Registers a global click event and output 'click' to the console.
- Registers a global interval which logs 'setInterval' to the console.

All of these helped me get up to speed quickly on what was possible.

### Hot Reloading

When starting to build scribe it was kinda a pain to iterate on plugin building. I'd have to drop my plugin code into `.obsidian/plugins/obsidian-scribe`
then restart obsidian to pickup any changes. The plugin [Hot Reload](https://github.com/pjeby/hot-reload) was a great addition and I'll continue to use it.
All you need to do is install the plugin, and drop a `.hotreload` file in the directory of you plugin and viola, no need to restart Obsidian.

## Building Scribe

I wont be going through every line of code in this blog, but I do want to talk about a couple key Obsidian concepts.
All of the code for Scribe is available open source [in this repo](https://github.com/NickHerrig/obsidian-scribe) if you want to dive in deeper though.
Let's talk about commands.

### Adding a Command

The Obsidian [command palette](https://help.obsidian.md/Plugins/Command+palette) allows users to access builtin and plugin functionality.
To build Scribe, I started with a simple "Rewrite Note" command by adding the following code to the `onload()` method of the `Plugin` object.

```javascript
export default class ScribePlugin extends Plugin {
    ...

	async onload() {
		this.addCommand({
			id: 'rewrite-note',
			name: 'Rewrite Note',
			editorCallback: async (editor: Editor, view: MarkdownView) => {
                // The code executed when command runs
			}
		});
	}

    ...
}
```

### Streaming Responses from Ollama

Next it is time to feed the our note content to our local LLM. 
This plugin currently requires a locally running [Ollama](https://github.com/ollama/ollama) server but I think it would be cool to support other LLMs.
We'll use the `generate` endpoint and pass the content of the existing note along a hard coded template as the prompt.
We will then stream the response back from the API and set the value of the note with `editor.setValue(result)` line.
This gives a pretty satisfying user experience of a per word streaming update to the note.



```javascript
const noteContent = editor.getValue()
console.log(noteContent)

const template = `
**Client Name:** <!-- Enter client name here -->

---

## Agenda
<!-- General agenda for the meeting -->
---
## Meeting Notes
<!-- General notes about the meeting -->

**Participants:**
-  My Team: 

-  Client Team: 

---
## Next Steps 
<!-- A bullet list of next steps and whose responsible for them -->


---
# References
`

const prompt = `
Rewrite the note given the format of the template
ensure that the note is formatted correctly and only contain template information:

template:
${template}

note:
${noteContent}
`	

console.log("reaching out to ollama")
// Reach out the the LLM
const response = await fetch('http://localhost:11434/api/generate', {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		model: 'llama3',
		prompt: prompt, 
		stream: true
	})
});


if (!response.body) {
	console.error('Response body is null');
	return;
}

const reader = response.body.getReader();
const decoder = new TextDecoder('utf-8');
let result = ''; 

while (true) {
	const { done, value } = await reader.read();
	if (done) break;
	const chunk = decoder.decode(value, { stream: true });
	try {
		const json = JSON.parse(chunk);
		if (json.response) {
			result += json.response;
			editor.setValue(result);
		}
	} catch (e) {
		console.error('Failed to parse JSON chunk', e);
	}
}
```

## What's Next for Scribe?

There are a few additional features I'd like to build on top of Scribe.

1. Customizable prompt templates.
2. Customizable Ollama Models.
3. Allow for Closed source LLMs like GPT4v and Claude Sonnet 3.5
4. Improved error handling
5. Improved UI feedback with notification ribbons

Looking forward to making this plugin more useful over time!