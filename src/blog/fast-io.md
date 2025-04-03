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

The `bufio` package is a wrapper around an `io.Reader` or `io.Writer` object, adding buffering and other useful methods.
To read typed data with a `bufio.Reader`, handing it to `fmt.Fscan` is usually the way to go.
As many of BOJ's problems require handling of integer type data, this is more than enough to pass most input issues.

But to hit the leaderboards, we can do better.

## Gotta scan faster: `bufio.Scanner`

`bufio.Scanner` performs better in terms of speed, but handles the data only as text.
Still, the text data can be converted to integers via `strconv.Atoi` or by implementing such a function manually.

```
func BytesToInt(barr []byte) (int) {
  n := 0
  for _, b := range barr {
    n *= 10
    n += int(b-'0')
  }
  return n
}
```

Personally, I could not recognize any performance differences between using `strconv.Atoi` or my own.
Unless the data must be parsed a specific way, the standard library seems sufficient.

Another hack around `bufio.Scanner` is to change its `SplitFunc`.
The `bufio` package already provides functions for scanning a file into lines, bytes, UTF-8-encoded runes, and space-delimited words, with `bufio.ScanLines` being the default.
Despite that, `Reader.ReadByte` seemed to perform better when reading consecutive bytes.

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
`Reader.ReadBytes` will simply digest all inputs up to a delimiter, in this case `\n`, and return it.
This of course, comes at a slower execution speed, but a slow, working solution is always better than one that fails quickly.

The other option is to still use `bufio.Scanner`, but explicitly specifying the size of `Scanner.Buffer`.
Increasing it to `{expected max input length} + 1` should be enough.

It is also worth mentioning that `Scanner.Bytes` does no allocation, as per the docs.
This has sometimes led to peculiar behavior, such as requiring much more buffer than it should need.
Although explicit allocation easily overgoes this issue.

## Finally, the results are written down...

Fortunately, writing is not as combersome.
A standard `bufio.Writer` and associated methods should be enough.
Just remember to `defer Writer.Flush` so that the buffered data is actually flushed to standard output.
