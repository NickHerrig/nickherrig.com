# Nickherrig.com

This is the source code for my personal blog and website [nickherrig.com](https://nickherrig.com).

## Installation

### Clone The Repository

`git clone git@github.com:NickHerrig/nickherrig.com.git`

### Install Git LFS

This repository deppends on git lfs for storing image data. Install git lfs by [visiting the documentation](https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage) or running `brew install git-lfs` on a macbook.

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