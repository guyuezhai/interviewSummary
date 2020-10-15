 
  ## 柯里化

> 柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，且返回接受余下的参数且返回结果的新函数的技术。

```javascript
function curry(fn,...args) {
    //如果传入参数长度小于函数总参数长度时返回一个函数继续递归柯里化，否则执行函数
    return fn.length>args.length?(...params)=>curry(fn,...args,...params):fn(...args)
}

//与上面方法同理
function addcurry(x) {
    return function (y) {
        return function (z) {
            return x+y+z
        }
    }
}

```
- 验证柯里化实现

```javascript
function add(x,y,z) {
    return x+y+z
}

let result = curry(add,3)
let result2 = addcurry(3)
console.log('result',result(1)(2),result(4)(5)) // 6 12
console.log('result2',result2(1)(2),result2(4)(5)) // 6 12
```