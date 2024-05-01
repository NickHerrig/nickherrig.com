---
author: ["Me"]
title: "Training a Drink Classifier with Fastai"
date: "2024-04-28"
description: "training classification models with fastai"
tags: [ml, classification]
ShowToc: true
TocOpen: false
draft: false 
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
print(len(failed))
```

Awesome, at this point we've got a organized file structure of our drink data. Let's take a peak. 

```shell
drinks
  daiquiri
    4790c0ff-e523-4e20-8168-6daff1dba026.jpg
    8fd1dd30-aca2-452b-a8c1-5c7fe48ee46a.jpg
  old fashioned
    303b9759-e221-4880-974e-bf80f8930514.jpg
    b00c262d-d6da-452e-9e9a-0ed6bd616ee4.jpg
  cosmopolitan
    35171536-c66d-4d51-8a0c-91f553517095.jpg
    29cdb5d0-3305-4798-b2b0-3523989defe2.jpg
  whiskey sour
    2459b494-f28a-4cae-9d91-d47e654f2d43.jpg
    eae1d636-7f22-4a7b-8d0b-b3e8a5543b19.jpg
  long island iced tea
    a4c36272-f6da-4156-8243-e45fefb3a93e.jpg
    58816b29-fa35-4c05-ba04-19ab8c218710.jpg
  manhattan
    4a455be1-df81-40b1-becb-aa0819531316.jpg
    05a71cdc-126c-4587-982a-98dc23117f7a.jpg
  mojito
    dbd52674-f6c1-4efc-8d17-afc42fd4b799.jpg
    34420fb7-2e4f-42d6-9c0b-51c6299b6561.jpg
  gin & tonic
    0e62862b-de77-4ba6-b425-0491cafc342a.jpg
    88859bb4-f704-425c-bc00-5b3d82d8e5d5.jpg
  margarita
    8595af09-f927-4381-813a-4b1c6b204c70.png
    85997818-a971-43a5-a240-f38ae73ae9e7.jpg
  pina colada
    e85622b3-7ea8-44ce-8d4e-17571e2e85e7.jpg
    9fcfc108-40d2-4247-a48e-f00c43614a91.jpg
```

## Training the Model

Now that we've got our images installed, let's get on with training our model.
We'll use the fastai `DataBlock` object to create a slice of training and validation images.

```python
from fastai.vision.all import *
from matplotlib import pyplot

path="drinks"

dls = DataBlock(
    blocks=(ImageBlock, CategoryBlock),
    get_items=get_image_files,
    splitter=RandomSplitter(valid_pct=0.2, seed=42),
    get_y=parent_label,
    item_tfms=[Resize(192, method='squish')]
).dataloaders(path)

dls.show_batch(max_n=12)
pyplot.show() # Note, this is only needed if running outside of a notebook
```

Some important items to call out here are that we're using the `Image Block` and `CategoryBlock` to align
our images with the `parent_label` of the directory, in other words aligning the drink picture with
the correct drink type. Let's take a look at a few images in our training set.

{{<figure src="/images/drink_classifier/drink-batch.png" title="drink batch" alt="drink batch">}}

Pretty cool! Now, let's get to training! We'll use a `vision_learner` to fine tune a resnet18 model on 20 epochs of the data.
It's interesting to see the train_loss decrease showing that our model is learning from the data. We'll save our model weights after training.

```python
learn = vision_learner(dls, resnet18, metrics=error_rate)
learn.fine_tune(20)
learn.save("model-weights.pth")
```

```shell
Downloading: "https://download.pytorch.org/models/resnet18-f37072fd.pth" to /Users/nickherrig/.cache/torch/hub/checkpoints/resnet18-f37072fd.pth
100%|█████████████████████████████████████████████████████████████████████| 44.7M/44.7M [00:03<00:00, 12.9MB/s]
epoch     train_loss  valid_loss  error_rate  time
0         3.096997    1.252397    0.422460    00:08
epoch     train_loss  valid_loss  error_rate  time
0         1.606826    0.992143    0.320856    00:04
1         1.433372    0.864932    0.283422    00:02
2         1.200389    0.742975    0.235294    00:02
3         0.977225    0.647414    0.197861    00:02
4         0.781976    0.621067    0.203209    00:02
5         0.609433    0.641216    0.181818    00:02
6         0.482900    0.673247    0.197861    00:02
7         0.388355    0.690616    0.197861    00:02
8         0.310900    0.725696    0.181818    00:02
9         0.249916    0.718665    0.171123    00:02
10        0.201577    0.729631    0.160428    00:02
11        0.166233    0.751359    0.187166    00:02
12        0.134805    0.753634    0.181818    00:02
13        0.110021    0.742285    0.176471    00:02
14        0.090679    0.746338    0.181818    00:02
15        0.075912    0.746500    0.176471    00:02
16        0.063471    0.742904    0.171123    00:02
17        0.054150    0.740524    0.165775    00:02
18        0.045349    0.742151    0.165775    00:02
19        0.038965    0.745595    0.176471    00:02

```

## Run the Model

Let's test our model out! Remember that Margarita we grabbed before?
Well it wasn't in our training set so let's see how our model does!

```python
from fastai.vision.all import *

# Load the model weights
learn = load_learner("model_weights.pth")

# Classify the image
drink, test, probs = learn.predict(PILImage.create('test-drink.webp'))

# Print the results
print("the image is a", drink)
print("All Drink Probabilities", probs)
```

```shell
the image is a margarita
All Drink Probabilities tensor([2.1035e-08, 1.2926e-07, 8.4791e-08, 8.0075e-12, 3.1995e-11, 1.0000e+00,
        1.3793e-06, 1.8493e-08, 3.7605e-07, 1.3780e-06])
```

I'd be lying if I told you I'm a fastai expert. What I will tell you though is that being able to train this model in
a couple of seconds, and having a usable drink classifier for an application is pretty incredible.

Software is eating the world ladies and gents, and models are eating software.

Looking forward to blogging more about these concepts and my learning while continuing this class.

Cheers 🥂