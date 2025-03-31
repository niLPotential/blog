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

## And then we output the results...
