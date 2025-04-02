---
title: Fast I/O
description: How to handle fast input and output in BOJ using go
pubDate: 2025/3/31
---

# Fast Input and Output

[Baekjoon Online Judge](https://www.acmicpc.net), or BOJ for short, is different from [Leetcode](https://leetcode.com) in that the entire code to run is submitted, opposed to just a single function.
This includes imports, the main function, and the topic of this post, methods for standard input and output.
Most languages should already include shorthand solutions for this task, as seen in the [examples for solving `#1000 A+B`](https://help.acmicpc.net/language/info).
And for a handful of beginning problems, it is enough... Until it is not.

Let's take a look at [`#15552`](https://www.acmicpc.net/problem/15552).
The task itself remains simple enough:
Read two integers and print their sum, FOR A MILLION TIMES.
This is where BOJ's format becomes interesting.
All test data is given through standard input, and every result should be printed through standard output.
Thus, implementing an efficient I/O method becomes a challenge in its own right.
And using methods introduced in tutorials is simply too slow for a pass.

## Gotta read fast: `bufio.Reader`

## Gotta scan faster: `bufio.Scanner`

## When `bufio.Scanner` screws up

But unfortunately scanning is not a silver bullet.
The `bufio.Scanner` has a default [`MaxScanTokenSize`](https://pkg.go.dev/bufio#pkg-constants) property, which sets... the maximum token size.
This should rarely be a problem, if ever.
After all, how long can a single token be?

Obvious foreshadowings aside, [`#1406`](https://www.acmicpc.net/problem/1406) is an interesting problem.
The task is to emulate a single-line text editor, moving the cursor left or right, inserting and deleting.
Again, not too dificult of a problem, except that the editor should contain up to 600,000 characters, and that the initial input can be as long as 100,000 characters.
This obviously exceeds the default `64*1024` token size.
Then all inputs after this limit will not be taken in, leading to a wrong answer.
I found two ways to bypass this problem.

The easier option is actually to use `bufio.Reader` again.
`Reader.ReadBytes` will simply digest all inputs until a delimiter, in this case `\n`, and return it.
This of course, comes at a slower execution time, but a slow, working solution is always better than one that fails quickly.

The other option is to still use `bufio.Scanner`, but explicitly specify the size of `Scanner.Buffer`.
Increasing it to `{expected max input length} + 1` should be enough.

## And then we write the results...
