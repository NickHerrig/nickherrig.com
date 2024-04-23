---
author: ["Me"]
title: "Training a Drink Classifier with Fastai"
date: "2024-04-14"
description: "Streaming ollama llm api request using Python."
tags: [llm, python, api]
ShowToc: true
TocOpen: false
draft: false
---

I recently started a new course called [Practical Deep Learning](https://course.fast.ai/). The course is taught by
[Jeremy Howard](https://en.wikipedia.org/wiki/Jeremy_Howard_(entrepreneur)),
a machine learning legend and founder of fast.ai. One of the first lessons in the course was training a classifier to detect birds in images.
As part of learning the materials, I thought i'd be a fun experiment to extend this model to classify the top 10 most popular cocktails.
Let's get started 🍸🍹.

## What we're building

The goal is to identify the most popular cocktails in images. We'll be focusing on the below 10 cocktails.

1. Old Fashioned
2. Margarita
3. Mojito
4. Pina Colada
5. Manhattan
6. Whiskey Sour
7. Gin & Tonic
8. Long Island Iced Tea
9. Cosmopolitan
10. Daiquiri

In order to accomplish this goal, we'll be fine tuning a [resnet18 model](https://en.wikipedia.org/wiki/Residual_neural_network)
on images collected via the DuckDuckGo search engine. From there, we'll feed the model our images to see how it performs.

## Installing our Dependencies

Before we get started let's pip install our python packages from fast.ai and DuckDuckGo.

```shell
pip install -U fastai duckduckgo_search
```

Now that we have our packages installed let's collect our data.

## Retrieving the Data

In order to train the model, we need some images of cocktails. Luckily, DuckDuckGo provides a nice way to do this.
We'll use a python package called [duckduckgo_search](https://github.com/deedy5/duckduckgo_search) to accomplish fetching some images for training.
Let's define a function that takes a search `term` and `max_images` and returns a list of image urls for download
```python
from duckduckgo_search import DDGS
from fastcore.all import L

def search_images(term, max_images=200):
  return L(DDGS().images(term, max_results=max_images)).itemgot('image')

print(search_images("margarita", max_images=1))
```
as you can see running this script returns an [image of a margarita](https://downshiftology.com/wp-content/uploads/2019/05/Margarita-9.jpg)

```shell
python3 download.py
['https://downshiftology.com/wp-content/uploads/2019/05/Margarita-9.jpg']
```

Let's collect 100 images of each drink type for training.
We'll also cleverly create drink directories so that we can use the parent directory name for training later.

```python

```


## Training the Model

## Testing the Model


{{<figure src="/images/streaming_llm_python/streamed_response.gif" title="Streaming API Endpoint" alt="streaming api endpoint">}}
