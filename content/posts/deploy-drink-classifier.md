---
author: ["Me"]
title: "Deploying to Hugging Face with Gradio"
date: "2024-05-12"
description: "Deploying our drink classification model to Hugging Face with gradio."
tags: [ml, deployment]
ShowToc: true
TocOpen: false
draft: false 
---

As I continue to work through chapters of the [Practical Deep Learning](https://course.fast.ai/) course, my game plan is to write blog posts to solidify my learning of the content. Next on the list is taking our [drink classifier](/posts/drink-classifier/) we built in the first chapter and deploy it to production. There are many ways to go about doing this, but in this blog we'll deploy to [Hugging Face](https://huggingface.co) with [Gradio](https://github.com/gradio-app/gradio). Let's do this 🥂.

## Create a Hugging Face Space

Let's first start by creating a new Hugging Face Space. A Hugging Face Space is a customizable environment provided by Hugging Face, where developers and data scientists can host, share, and deploy machine learning models, datasets, and interactive web apps. Spaces support various frameworks and technologies, allowing users to create demos, applications, or interfaces for their models, often using Streamlit, Gradio, or other web-based technologies. If you haven't played with spaces before, I highly recommend [browsing some of the popular demos](https://huggingface.co/spaces).

{{<figure src="/images/huggingface-gradio/hugging-face-space.png" title="hugging face space settings" alt="huggin face space settings">}}

## Deploying a Hello World Example

Now that you've created a space, you can follow the instructions to use git to clone your space locally.
I highly recommend [setting up an SSH key on Hugging Face](https://huggingface.co/docs/hub/en/security-git-ssh) to make this process easier, as they've deprecated basic authentication for publishing to git.  
Once cloned, we're ready to create an virtual environment to install our dependencies.

```shell
python3 -m venv venv && source venv/bin/activate
```

We will then install our dependencies using `pip`.

```shell
pip install gradio
```

From here, we can create our `app.py` file which will hold our gradio code.
The application below uses a gradio  `Interface` which takes a text input, passes this data to our `greet` function, and displays our output text, `Hello {name}, Welcome!`.

```python
import gradio as gr

def greet(name):
    return f"Hello {name}!! Welcome!"

demo = gr.Interface(fn=greet, inputs="text", outputs="text")
demo.launch()
```

Now, you can run this `app.py` file and should be able to visit your application at the local URL displayed in the console.

```shell
Running on local URL:  http://127.0.0.1:7860
```

Now, all we have to do is commit these changes to git, and push them to see our hello world application out on the web.

{{<figure src="/images/huggingface-gradio/hello-world-huggingface.gif" title="hello world"  alt="hello world">}}

Piece of 🍰!

## Deploying Our Model

Alright, this is great. We've got our scaffolding setup! Now let's think through the happy path.

1. A user submits an image.
2. They click a submit button.
3. We run our model on their image.
4. We figure out the most probable drink they've submitted.
5. We return a nice message telling them their drink.

### Loading the Model Weights

First, if we recal from the previous [drink classifier](/posts/drink-classifier/) blog, we already have our model weights saved locally. We also talked about how to load these weights to run inference. The TLDR on this can be summed up with the following piece of code.

```python
from fastai.vision.all import *

# Load the model weights
learn = load_learner("path_to_model_weights")

# Classify the image
drink, idx, probs = learn.predict(PILImage.create("path_to_image"))
```

### Gradio App Changes

Since we already know how to load our model weights and run inference, let's focus on changing our gradio inputs.
The documentation is pretty straight forward, and all we have to do is change our input type to "image" for this problem.

```python
demo = gr.Interface(fn=predict, inputs="image", outputs="text")
```

### Providing Examples

Lastly, it'd be nice if we can provide some example images for our users to try out.
We can do this by providing a few examples to the Interface like so.
Remember, that we need to have these images in the repo that we deploy.

```python
examples = ["cosmo.jpg", "old-fassion.jpg", "pina-colada.jpg"]
demo = gr.Interface(fn=predict, inputs="image", outputs="text", examples=examples)
```

## Putting it all Together

The final application code can be see below.

```python
import gradio as gr
from fastai.vision.all import *

learn = load_learner("model_weights.pth")
examples = ["cosmopolitan.jpeg", "old-fashioned.jpeg", "pina-colada.webp"]

def predict(image):
    drink, _, probs = learn.predict(image)
    probability = max(list(map(float, probs)))
    return f"this is most likely a {drink} with probability {probability}."

demo = gr.Interface(fn=predict, inputs="image", outputs="text", examples=examples)
demo.launch()
```

Now, all we have to do is  publish our repo. Hugging Face will build our drink-classifier and deploy it.
Let's check out a demo! Watch the gif until the end so you can see it guess what I'm drinking while writing this!

{{<figure src="/images/huggingface-gradio/drink-classifier-demo.gif" title="hosted demo"  alt="hosted demo">}}

I'm pretty impressed by how easy this was. I say this a lot but 2024 is a crazy fun time to be alive.
What will you build with these tools?

[Give it a go! ](https://huggingface.co/spaces/NickHerrig/drink-classifier)