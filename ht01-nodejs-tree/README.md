#ht01-nodejs-tree

Homework

> Student testing application<br>
> Purpose: to create a function for show tree-view structure.<br>
> Result: a simple application fulfill creation tree-view folders.<br>

Task Description:

data example:
{
"name": 1,
"items": [{
"name": 2,
"items": [{ "name": 3 }, { "name": 4 }]
}, {
"name": 5,
"items": [{ "name": 6 }]
}]
}

Propesed 2 approaches - 1.index.js with synchronous fetching with recursion. 2 index-with-promises.js with Promises

as result we have next view:

> 1
> |
> __________
> 
>           2
>           |
>           __________
>                     3
>                     |
>                     4
>                     |
>           5
>           |
>           __________
>                     6
>                     |


it little differ from requested but I guess it generally reflect tree configuration.
