This is directly based on Andrew Maurer's article below, but with a less nonsensical approach to utilizing nthe built-in
Node.js Buffer.  Nobody should or would concatenate individual characters using Strings or into a Buffer.  This is an
unlikely scenario compared to the far more likely scenario of many strings being concatenated onto each other.

https://github.com/amaurer/maurerdotme/blob/master/approot/articles/nodejs-buffers-string-performance.md

You'll find that the results are the opposite as Andrew originally presented them given the more common concatenation scenario.

Why you should care about how you build strings

In JavaScript, strings are immutable which means that you can't alter the original string. Instead, the old string is kept in memory (and likely abandoned) and a new string is created with your changes. Its important to know this because this method could eat precious memory and processing power.

The different ways to build strings

Results are as follows:

---------Testing Buffers--------
Name        Iterations       Duration                Memory
======================================================================
Buffer      1000             10ms                    1012964
Array       1000             1ms                     1956796
String      1000             0ms                     2172472
Buffer      10000            65ms                    9334784
Array       10000            17ms                    9368608
String      10000            2ms                     10176344
Buffer      100000           511ms                   90806704
Array       100000           171ms                   94460844
String      100000           57ms                    7799320

See the test script: nodejs-buffers-string-performance.js
