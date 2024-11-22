# ht02-nodejs-streams

Homework

> Student testing application<br>
> Purpose: to create a function for show work with streams inNodeJS.<br>
> Result: a simple application transform file data to chunk array and count this chunk appears.<br>

Task Description:

data example:
a c b b -> result transfer to { a: 1, b: 2, c: 1 } -> [1, 2, 1]
ab cb bss b -> [1, 1, 1, 1]
ab, cb, bss, cb, b, cb -> [1, 1, 1, 3]
alex, alex, juan, dima -> [2, 1, 1]

The task is implemented using transformer pipe.

All possible data examples are collected in the data folder in 4 files.
To complete the task, you need to open the terminal and run
# node index.js /data/data.txt

and simply replace data.txt with data1.txt and so on.

as a result, we got a map with strings as keys and the number of occurrences as a value.
I have decide that output of just number of occurrences is non informative.

task output :

result: [ [ 'alex', 2 ], [ 'juan', 1 ], [ 'dima', 1 ] ]

