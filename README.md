# fed-e-task-01-01 简答题答案

# 1. 请说出下列最终的执行结果，并解释为什么？

```
var a = [];

for(var i = 0; i < 10; i++) {
    a[i] = function() {
        console.log(i);
    }
}

a[6]();
```

## 答案：

`a[6]()` 打印结果为 `10`

解释：`var` 声明的变量 `i`，是一个全局作用域下的变量，for循环结束后，`i`的最终值为 10，for 循环生成了一个`function`数组，每个`function`都打印`i`的最终结果

如果需要生成打印 0 ~ 9 的方法数组，可以用以下方案：

### a. 使用 IIFE 立即执行函数

```
var a = [];

for (var i = 0; i < 10; i++) {
    ((index) => {
        a[index] = function () {
            console.log(index);
        }
    })(i)
}
```

### b. 使用 let 声明，把 i 放到块作用域

```
var a = [];

for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    }
}
```
