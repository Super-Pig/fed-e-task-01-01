// setTimeout(function () {
//     var a = 'hello';

//     setTimeout(function () {
//         var b = 'lagou';

//         setTimeout(function () {
//             var c = 'I ❤️ U';

//             console.log(a + b + c);
//         }, 10)
//     }, 10)
// }, 10);

let a, b, c;

const promisify = (callback, timeout) => new Promise(resolve => {
    setTimeout(() => {
        callback();

        resolve();
    }, timeout);
})

b = promisify(() => {
    a = 'hello'
}, 10000).then(() => promisify(() => {
    b = 'lagou'
}, 10)).then(() => promisify(() => {
    c = 'I ❤️ U';

    console.log(a + b + c);
}, 10))


// promisify(() => {
//     a = 'hello'
// }, 1000).then(promisify(() => {
//     b = 'lagou'
// }, 10)).then(promisify(() => {
//     c = 'I ❤️ U';

//     console.log(a + b + c);
// }, 10))

// new Promise((resolve) => {
//     setTimeout(() => {
//         a = 'hello';

//         resolve();
//     }, 10);
// }).then(() => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             b = 'lagou';

//             resolve();
//         }, 10);
//     });
// }).then(() => {
//     setTimeout(() => {
//         c = 'I ❤️ U';

//         console.log(a + b + c);
//     }, 10);
// })

