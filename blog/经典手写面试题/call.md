## call 方法实现

<details>
<summary>实现详情</summary>

> 所有的方法都可以调用 `call/apply/bind` 方法， 它们是函数原型上的方法，因此需要挂载到`Function.prototype`

下面我们来动手实现一下我们自己的 call/apply/bind方法

- 需要注意一下事项 

> 1. 如果第一个参数没有，那么在非严格模式下默认指向 `window` 或者 `global` 
> 2. 传入的第一个参数是 `this` 指向的对象，根据 `this` 绑定规则，我们知道 `context.fun`，`fun` 中的 `this` 被隐式绑定到 `context` 上，因此可以使用
 context.fun(...args) 来执行函数
> 3. 原本 `context` 并不存在 `fun` 属性，函数执行结束后删除 `fun`
> 4. 返回函数执行结果

```javascript
Function.prototype.myCall = function( ){

    const [ context, ...args ] = [ ...arguments ]
    // 判断传入的第一个参数是否存在，如不存在，在非严格模式下根据运行环境 取window 或者 global
    if( !context){
        context = typeof window !== 'undefined' ? window : global;
    }
    // this的指向是当前函数fun
    context.fun=this

    let result = context.fun(...args)
    //原本context并不存在fun属性，函数执行结束后删除fun
    delete context.fun

    return result
}
```
</details>
