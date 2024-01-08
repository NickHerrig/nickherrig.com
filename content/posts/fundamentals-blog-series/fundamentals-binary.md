---
author: ["Me"]
title: "The Fundamentals - It's all Ones and Zeroes"
date: "2020-09-06"
description: "This post introduces the concepts of number systems, and character encodings"
tags: ["fundamentals"]
ShowToc: true
TocOpen: false
---

## Welcome Back Folks
Welcome back to The Fundamentals blog series.
Where we have conversations about fundamental technology concepts in a laid back and  non-intimidating fashion. 
The ultimate goal you might ask?
To refresh, learn, grow, and be better engineers.
If you haven't read the the fundamentals introduction post, feel free to [give it a skim](https://nickherrig.com/posts/the-fundamentals-intro/).
Let's get started!

### Before Reading
Today we will be using [Python3](https://en.wikipedia.org/wiki/Python_%28programming_language%29) as our programming language of choice to work through examples and help us learn.
If you do not have Python3 installed, follow the [official Python docs](https://www.python.org/downloads/) to install it on your particular computer.
To check if you have Python3 run the command from the shell...

```shell
python3 --version
```

## Today's Topic!

**It's all Ones and Zeroes**

Have you ever heard the phrase, "it's all ones and zeroes"?
When I first heard this phrase I was struggling with writing a program to message me about haircuts.
No seriously, our barber in Des Moines has a 2 month wait, so I wanted to get a text when someone
cancelled their appointment last minute. At that time I was fairly early in learning about how 
computers worked under the hood. The friend joking said "it can't be that hard, it's all ones and zeroes".
At the time, I didn't pay much attention to the comment. But as I continued my career I couldn't shake 
the comment. Could this really be the case? Could all programs, Instagram feeds, TikTok videos, and cat memes 
boil down to ones and zeroes? And if so, how could all these complex systems we rely on every day boil
down to just two digits? 

## Let's count to Ten
If I asked you to count to ten, you'd probably rattle off.

> 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10

But what if I instaed started counting like this...

> 0, 1, 10, 11, 100, 101, 110, 111, 1000, 1001, 1010

Or even more strange...

> 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, a

Wait a minute, did you just use the letter 'a' instead of '10'?

**YOUBETCHA!**

And the best part, all three of these are correct depending on the _context_.
The _context_ we are missing when I asked you to "count to ten" is the numeral system.

## Numeral Systems
Numeral systems are used as a way to express numbers utilizing digits, letters, and other symbols. 
When learning to count to 10 in school, the numeral system we were using was the decimal numerial system,
also known as base-10 positional numeral system. Woah, when I first learned this was the case, I felt
as though I had been living a lie! There are a *ton* of other extremely important and useful numeral systems
being used today. 

To list a few...

- Unary (Base-1)
- Octal  (Base-8)
- Hindu-Arabic (Most Common in the world!)
- Hexadecimal  (Base-16)
- Decimal  (Base-10)
- Binary (Base-2)

Due to a number of factors, the binary or base-2 numerical system is used by 
[almost](https://en.wikipedia.org/wiki/Quantum_computing) all computers. 

### A Python Example
Python, being a higher level language,  has a ton of slick [built in functions](https://docs.python.org/3/library/functions.html)
that help increase the productivity of developers. One of which we will utilize to learn about 
numberal systems is the built in called `bin()`. This function takes an integer number 
and converts it into a binary string prefixed with `0b`. Let's try it out!

```python
number_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

for number in number_list:
    print(bin(number))
```

We first create a list of numbers from 1 to 10. 
We then loop through that list, printing the binary conversion of the number. 
And as we expect! The output matches our counting to 10 in binary from above!

```shell
0b1
0b10
0b11
0b100
0b101
0b110
0b111
0b1000
0b1001
0b1010
```

### Test your understanding!
1. Count to 100 in Octal!
2. Count to 100 in Hexadecimal!

So how exactly is it that grandma's accidental Facebook statuses condense down to 1s and 0s?

## Character Encodings
Character encoding are used to take our number systems and provide additional _context_! 
The context is in the form of symbols and characters us humans utilize to communicate. 
There is a lot of interesting history around character encodings, but for now a few
common ones out in the wild are

- ASCII
- UTF-8
- ISO 8859-1

So if this truly is the case, let's see an recent example that I came across.

### A Python Example
Let's revisit the list of built in functions, this time to utilize `ord()`. This function takes an
string representing one Unicode character and returns an integer representing the unicode code point
of that character. UTF-8 is defined by the Unicode standard. Let's give it a go.

```python
sentance = 'héllo wõrld'

for character in sentance: 
    print(ord(character))
```

Our output should look something like this, an output of base-10 integers. 

```shell
104
233
108
108
111
32
119
245
114
108
100
```

We can double check our output against the [UTF-8 character table](https://www.utf8-chartable.de/unicode-utf8-table.pl?utf8=dec).

### Test your understanding!
1. Print the alphabet in unicode 

## Talk nerdy to me
Last Valentine's Day, my lovely fiance Megan wrote me an AWESOME card. 
The front had a digital heart on it and displayed Megan's art skillz.

![letter](/images/love-letter.jpg)

I was impressed when I saw it, but soon realized that there was a hidden message lurking on the inside.

![contents](/images/love-letter-content.jpg)

It appeared to be _all ones and zeroes_! I assumed that this letter was written in the binary number system! 
Let's take a look at the message, and attempt to decode it using python!

### A Binary Love Letter
The first step, and most tedious was copying the message from written text to text on my computer.
I used my favorite text editor VIM to create the file "love-note.txt". 

```text
01001101
01111001
00100000
01000100
01100101
01100001
01110010
01100101
01110011
01110100
00100000
01010110
01100001
01101100
01100101
01101110
01110100
01101001
01101110
0110101
00100000
01001001
00100000
01001100
01101111
01110110
01100101
00100000
01011001
01101111
01110101
```

Now that we have our base-2 numbers in a file, we can read them into our python program.

```python
with open("love-note.txt") as f:
    byte_list = f.read().splitlines()
```

We read our file line by line into a list of strings. Next we can use the `int()` built in function
to construct a new list of base-10 numbers.

```python
num_list = [int(byte, 2) for byte in byte_list]
```
This format is called a list comprehension. List comprehensions provide a concise way of creating a list.
You can read more about this syntax [here](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions)
Anyway, now that we have a list of base-10 integers, let's use the built in `chr()` function to build a list
of unicode characters. Lastly, let's build a sentance from the list with the join method. 

```python
char_list = [chr(num) for num in num_list]
sentance = "".join(char_list)
```

Our output should now read `My Dearest Valentin5 I Love You`. 
Ohhh no... Megan had a typo... I guess it can be forgiven due to the fact that she wrote 247 1s and 0s! 

### Test your understanding
1. The missing character is an "e". What is its base 10 number representation? What about binary?