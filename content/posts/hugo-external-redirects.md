---
author: ["Me"]
title: "External Redirects with Hugo"
date: "2024-03-24"
description: "Configuring external redirects with Hugo."
tags: [hugo]
ShowToc: true
TocOpen: false
draft: false
---

Today I thought it would be a cool idea to link some of the blog posts I've written at work to my personal blog. The idea here is that I would have a hugo post that shows up in my archive, but when clicked, will redirect to where the post is hosted. Essentially, a simple external redirect. This proved to be a little more challenging with Hugo than I originally thought, hence the blog 🔥.

## Hugo Aliases

Hugo does have a way to facilitate internal page redirects with [Aliases](https://gohugo.io/content-management/urls/#aliases), but I wasn't able to apply this configuration to take a page to a completely new webpage. Along with this, as I tested the feature, I wasn't able to get it to work. I [reported a bug](https://github.com/adityatelange/hugo-PaperMod/issues/1492) with my current theme I used called [paper mod](https://github.com/adityatelange/hugo-PaperMod). More to come on this, but I didn't do any more digging for now since I don't need internal redirects at the moment.

## External Redirects

External redirects require a little more advanced configuration. Huge shout out to a few resources including [Dan North's blog](https://dannorth.net/) for some hints on configuring this setup. Here's how it works.

We'll use an internal hugo template called alias to customize the configuration. Some other embedded templates can be found [here](https://gohugo.io/templates/embedded/), but we'll use the [alias template](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/alias.html). Some documentation around customizing URL management is tucked away [in the documentation](https://gohugo.io/content-management/urls/#customize) as well.

Let's take a look at the internal alias.html template below.

```html
<!DOCTYPE html>
<html lang="{{ site.Language.LanguageCode }}">
  <head>
    <title>{{ .Permalink }}</title>
    <link rel="canonical" href="{{ .Permalink }}">
    <meta name="robots" content="noindex">
    <meta charset="utf-8">
    <meta http-equiv="refresh" content="0; url={{ .Permalink }}">
  </head>
</html>
```

Looking at the file, we can see there is a `Permalink` variable. We can set this variable in our page entry the following meta line will handle our redirect `<meta http-equiv="refresh" content="0; url={{ .Permalink }}">`. Let's do this. First, let's create a template at `layouts/external-redirect/single.html`.

In this file we'll replace the Permalink context with our own link. We can do this with the following snippet

```
{{- template "_internal/alias.html" (dict "Permalink" .Params.url) -}}
```

This will pull in the hugo alias embedded template and replace the Permalink context with a variable called url which we can pass in. Now, let's string up our redirect. Let's create a new post for one more my work blogs called "Making Megadesk Smart".

```
---
type: "external-redirect"
url: "https://blog.roboflow.com/security-camera-monitoring/"
title: "Making Megadesk Smart"
date: "2024-03-17"
---
```

And just like that, I have a new post that redirects users to another site.

Happy Building!