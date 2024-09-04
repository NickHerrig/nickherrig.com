---
author: ["Me"]
title: "Local CLIP Embeddings"
date: "2024-09-01"
description: "Local CLIP Embeddings with Roboflow Inference"
tags: [ml, python, embeddings]
ShowToc: true
TocOpen: false
draft: false
---

Recently I've been interested in some of the ways that we can use embeddings to compare images, text, and other data.
Embeddings allow us to create features and applications like image search, [retrieval-augmented generation](https://en.wikipedia.org/wiki/Retrieval-augmented_generation), and many more.
You can think of an embedding as just a list of numbers (a vector) that represents the semantic meaning of a given piece of data.
this allows us to compare two embeddings and determine how similar they are.

But how do we get these magical embeddings?

## Enter CLIP

There are many ways to generate embeddings for a dataset. One method is using models pre-trained on image and text data.
Today, we'll use a model called [CLIP](https://openai.com/index/clip/) from OpenAI.
CLIP(Contrastive Language–Image Pre-training) is a model that was trained on 400 million image-text pairs to learn semantic relationships between images and text.
The other cool feature about CLIP is that we can generate embeddings for both images and text and do similarity comparisons between them.

Let's take a look at an example of generating embeddings locally with CLIP using [Roboflow Inference](https://github.com/roboflow/inference).

## Installing Roboflow Inference

First, let's install the Roboflow Inference library with our favorite python package manager.

```shell
pip install "inference[clip]"
```

If you have a nvidia GPU at your disposal you can install the below package to leverage GPU acceleration.

```shell
pip install onnxruntime-gpu
```

If you're GPU poor, like me 🤣, no worries! You can simply install the default package and run inference on the CPU!

Now that we have the library installed, let's take a look generating embeddings.

## Generating Embeddings

First, let's import the library and setup our model.
Just a heads up that the first time I ran this code it took me about 50 seconds to download the model weights.

```python
from inference.models import Clip

# Using the CPU
clip = Clip(model_id="clip/ViT-B-16")

# Using the GPU
clip = Clip(model_id="clip/ViT-B-16", onnxruntime_execution_providers=["CUDAExecutionProvider"])
```

Roboflow inference comes with a few different [versions of CLIP](https://inference.roboflow.com/foundation/clip/#supported-clip-versions). In this examples we're using the `ViT-B-16` model. We can also specify the execution provider to leverage GPU acceleration if you have a compatible NVIDIA GPU.

### Text Embeddings

That was pretty easy right? Let's generate some text embeddings.

```python
from pprint import pprint
image_embedding = clip.embed_text("Hello World")
pprint(image_embedding)

```

Running the above code you should see output like below. This returns a numpy array that contains our embeddings.

```shell
CLIP model loaded in 46.29 seconds
array([[ 2.66573608e-01, -2.61389434e-01,  8.80000144e-02,
         3.01004648e-02,  1.90702081e-01,  1.33055449e-02,
        -8.64646509e-02, -1.72902793e-02, -5.47655672e-02,
         1.83133632e-02, -2.49407291e-02, -1.66796431e-01,
         1.40391037e-01,  2.79541880e-01, -1.17498681e-01,
        -1.88155308e-01,  4.84370649e-01,  1.91399977e-02,
        ...
        ]], dtype=float32)
```

### Image Embeddings
Embeddings images is just as easy. We can use `image_embedding = clip.embed_image(image="bloody-mary.jpg")`
to generate embeddings for this delicious picture of a bloody mary below.

![bloody-mary](/images/local-clip-embeddings/bloody-mary.jpg)

Let's see what the embedding looks like.

```shell
CLIP model loaded in 0.60 seconds
array([[ 5.44872463e-01, -6.75497770e-01, -2.55707145e-01,
        -3.22702050e-01, -2.00565457e-01, -3.48142892e-01,
        -8.65351111e-02, -9.76210654e-01,  3.19816738e-01,
        -5.55521369e-01, -1.05776638e-03,  5.24616539e-01,
         1.70078501e-01,  6.26072586e-02,  1.59158818e-02,
         2.25232542e-01, -5.24201989e-01,  6.37022406e-02,
        ...
        ]], dtype=float32)
```

At this point you're probably thinking, "Okay, okay I get it; but what can I do with these weird list of numbers?"
Well, i'm glad you asked!

### Comparing Text and Image Embeddings

Roboflow inference makes it very easy to compare text and images with `clip.compare()`
for example, we can compare the embedding "Hello World" to "globe", "cat", and "dog". 

```python
comparison =  clip.compare(
        subject="hello world", 
        subject_type="text", 
        prompt=["globe", "cat", "dog"]
)
print(comparison)
```

```shell
CLIP model loaded in 0.48 seconds
[array([0.8489042], dtype=float32),  # similarity for "globe"
 array([0.7678248], dtype=float32),  # similarity for "cat"
 array([0.78415155], dtype=float32)] # similarity for "dog"
```

Notice how the word globe has the highest similarity? Likely because "globe" and "world" are similar in meaning.

We can do the same thing with our image of a bloody mary! 

```python
comparison = clip.compare(
        subject="bloody_mary.jpeg", 
        prompt=["drink", "bloody mary", "man"]
)
print(comparison)
```
```shell
CLIP model loaded in 0.43 seconds
[array([0.2429935], dtype=float32),   # similarity for "drink"
 array([0.30160928], dtype=float32),  # similarity for "bloody mary"
 array([0.19586928], dtype=float32)]  # similarity for "man"
```
Yes, this image is more similar to a "bloody mary" than a "man"
Pretty cool that we can use CLIP for zero shot classification tasks like this all locally on our own hardware!

## What's Next?

I'm exploring several ideas for utilizing embeddings by storing them in a vector database like [Weaviate](https://weaviate.io/) and then querying them with images. This approach could open up exciting possibilities for image-based search and retrieval. Until next time, happy building! 🥂
