# Nickherrig.com

This is the source code for my personal blog and website [nickherrig.com](https://nickherrig.com).

## Installation

### Install Hugo

This project relies on [Hugo](https://gohugo.io/) to build and serve the website.
Follow the instructions on [how to install](https://gohugo.io/installation/) for your machine.

I'll be using homebrew to install.

```shell
brew install hugo
```

### Install the Hugo theme

This site utilizes the [PaperMod](https://github.com/adityatelange/hugo-PaperMod) theme. Installation instructions can be found in the github repo wiki. To install the hugo theme run the following command.

```bash
git submodule update --init --recursive
```

### Run the application

Now that you have Hugo and the PaperMod theme installed, run Hugo.
Notice how below I'm using the -D for draft posts and -F for future posts. This build both draft and posts with a future date into the locally served Hugo website.

```shell
Hugo serve -DF
```