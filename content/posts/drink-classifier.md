---
author: ["Me"]
title: "Training a Drink Classifier with Fastai"
date: "2024-04-28"
description: "training classification models with fastai"
tags: [ml, classification]
ShowToc: true
TocOpen: false
draft: true 
---

I recently started a new course called [Practical Deep Learning](https://course.fast.ai/). The course is taught by [Jeremy Howard](https://en.wikipedia.org/wiki/Jeremy_Howard_(entrepreneur)),
a machine learning legend and founder of fast.ai. One of the first lessons in the course was training a classifier to detect birds in images. As part of learning the materials, I thought i'd be a fun experiment to extend this model to classify the top 10 most popular cocktails.
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

In order to accomplish this goal, we'll be fine tuning a [resnet18 model](https://en.wikipedia.org/wiki/Residual_neural_network) on images collected via the DuckDuckGo search engine. From there, we'll feed the model our images to see how it performs.

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

Running this script returns an [image of a margarita](https://downshiftology.com/wp-content/uploads/2019/05/Margarita-9.jpg)

Let's now collect 100 images of each drink type for training.
We'll also cleverly create drink directories so that we can use the parent directory name for training later.
The last thing we'll do is use the fastai `verify_images` function to remove any images that weren't
downloaded correctly.

```python
from fastcore.all import *
from time import sleep

drinks = "old fashioned", "margarita",
"mojito", "pina colada",
"manhattan", "whiskey sour",
"gin & tonic", "long island iced tea",
"cosmopolitan", "daiquiri"

path = Path('drinks')

# Loop over drinks and download 100 images.
for o in drinks:
    dest = (path/o)
    dest.mkdir(exist_ok=True, parents=True)
    download_images(dest, urls=search_images(f'{o} drink photo', max_images=100))
    sleep(5)
    resize_images(path/o, max_size=400, dest=path/o)

# Remove any failed downloads
failed = verify_images(get_image_files(path))
failed.map(Path.unlink)
len(failed)
```

## Training the Model

Now that we've got our images installed, let's get on with training our model.
We'll use the fastai `DataBlock` object to create a slice of training and validation images.

```python
dls = DataBlock(
    blocks=(ImageBlock, CategoryBlock),
    get_items=get_image_files,
    splitter=RandomSplitter(valid_pct=0.2, seed=42),
    get_y=parent_label,
    item_tfms=[Resize(192, method='squish')]
).dataloaders(path)

dls.show_batch(max_n=6)
```

Some important items to call out here are that we're using the `Image Block` and `CategoryBlock` to align
our images with the `parent_label` of the directory, in other words aligning the drink picture with
the correct drink type. Let's take a look at a few images in our training set.

{{<figure src="/images/drink_classifier/drink-batch.webp" title="drink batch" alt="drink batch">}}

Lastly, we'll use a `vision_learner` to fine tune a resnet18 model on 20 epochs of the data. 

```python
learn = vision_learner(dls, resnet18, metrics=error_rate)
learn.fine_tune(20)
```

```shell
# TODO Show training CLI
```


## Testing the Model

```python
drink,test,probs = learn.predict(PILImage.create('mojito.jpg'))
print("this is a", drink)
print(probs)
```