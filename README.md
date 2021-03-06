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

## 答：

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

# 2. 请说出下列最终的执行结果，并解释为什么？

```
var tmp = 123;

if (true) {
    console.log(tmp);
    let tmp;
}
```

## 答：

抛出异常 `ReferenceError: Cannot access 'tmp' before initialization`

解释：let 命令不存在变量提升，在 let 声明之前引用变量都会报 `ReferenceError`。在块级作用域内存在 `let` 命令，它所声明都变量就绑定在这个作用域。在 `if` 的块作用域内，tmp 在声明之前都不可用，在语法上叫做“暂时性死区”(temporal dead zone)

# 3. 结合ES6新语法，用最简单的方式找出数组中的最小值?

```
var arr = [12, 34, 32, 89, 4];
```

## 答:

```
console.log(Math.min(...arr))       //4
```

# 4. 详细说明var, let, const 三种声明变量的方式之间的具体差别？

## 答：

`var` 声明的变量在全局作用域下都可用；存在变量提升，变量在声明前也可以被引用，值是undefined；可以重复声明变量，在块级作用域声明都变量会覆盖外层作用域的同名变量，在同一个作用域下，后声明的变量会覆盖前面声明的同名变量。

`let` 和 `const` 是 es6 的新语法；这两个命令声明的变量都作用在块级作用域；不存在变量提升，变量在声明之前不可以被引用；在同一作用域下不可以重复声明；

`let` 声明的变量值允许被修改； `const` 声明的是常量，必须在声明时赋值，并且值不允许被修改，对于数组，对象这些引用类型而言，元素或属性可以修改，但是引用（地址）不可以被修改

# 5. 请说出下列代码最终输出的结果，并解释为什么？

```
var a = 10;

var obj = {
    a: 20,
    fn() {
        setTimeout(() => {
            console.log(this.a);
        })
    }
}

obj.fn();
```

## 答：

输出 20

解释：箭头函数的 `this` 是在函数定义时绑定的，不是在运行时绑定的，这里`this`指定的是 `obj`

# 6. 简述 `Symbol` 类型的用途？

## 答：

`Symbol` 类型表示独一无二的值，使用场景：

可以防止对象属性名的冲突，比如引用第三方依赖，并且需要对依赖对象做扩展，就可以添加`symnol`属性以免和其他属性产生冲突;

Singleton 模式 - 把类的实例放到全局对象`global`的属性里面，为了防止全局对象的属性被其他地方修改，可以用 `Symbol` 类型的属性解决;

ES6 提供了11个内置的`Symbol`值，指向语言内部使用的方法

# 7. 说说什么是浅拷贝，什么是深拷贝？

## 答：

浅拷贝和深拷贝针对引用类型，如 Object, Array.  浅拷贝只是对地址引用的拷贝，修改拷贝对象的属性或元素会影响到原始对象，因为操作的是同一个内存地址；深拷贝是开辟一块新的内存空间，然后把原始对象的值拷贝到这个新的地址，并指向新的地址；对拷贝对象做修改，不会影响到原始对象。

# 8. 谈谈你是如何理解JS异步编程的，Event Loop 是做什么的，什么是宏任务，什么是微任务？

## 答：

由于JS是单线程执行，在同步模式下，执行耗时较长任务比如io，会导致线程阻塞；异步编程使用 Event Loop 模型，通过回调函数的方式实现异步非阻塞。Event Loop 维护一个或者多个FIFO的任务队列，js主线程把异步任务送入队列，然后继续进行其他操作; Event Loop 线程消费队列并通知相应的 I/O 程序，等到 I/O 操作完成，就往任务队列送入一个事件，送给主线程，调用事先设定的回调函数。

JS 主线程在空闲时会从任务队列取出一个任务（宏任务），执行完后取出 microtask 队列中的任务（微任务）顺序执行，直到清空microtask队列，然后再取下一个宏任务执行。

宏任务包含 setTimeout, setInterval, I/O, setImmediate
微任务包含 Promise, MutaionObserver, Process.nextTick

# 9. 将下面异步代码使用 Promise 改进?

```
setTimeout(function () {
    var a = 'hello';

    setTimeout(function () {
        var b = 'lagou';

        setTimeout(function () {
            var c = 'I ❤️ U';

            console.log(a + b + c);
        }, 10)
    }, 10)
}, 10);
```

## 答:

```
let a, b, c;

const promisify = (callback, timeout) => new Promise(resolve => {
    setTimeout(() => {
        callback();

        resolve();
    }, timeout);
})

promisify(() => {
    a = 'hello'
}, 10).then(() => promisify(() => {
    b = 'lagou'
}, 10)).then(() => promisify(() => {
    c = 'I ❤️ U';

    console.log(a + b + c);
}, 10))
```

# 10. 请简述 TypeScript 与 JavaScript 之间的关系？

## 答:

TypeScript 是 JavaScript 的超集，它可以编译成纯 JavaScript 执行。

# 11. 请谈谈你所认为的 TypeScript 优缺点？

## 答：

TypeScript 基于 javascript 提供了一套类型系统，是一种静态类型，强类型的语言；

在编译时检查类型错误；避免弱类型语言的类型检查的麻烦，以及运行时各种隐式类型转换导致的隐式bug；从语法层面对开发人员进行约束

支持 class、泛型、接口、抽象类等特性，语法上更像 JAVA 和 C#, 在大型项目中可以结合面向对象的设计模式，对项目的扩展性和维护性很有好处

缺点是它更像是 C# 和 JAVA 这样的语言，对于 JavaScript 而言，新增了很多特性和关键字，js开发者的学习成本稍微有点高

