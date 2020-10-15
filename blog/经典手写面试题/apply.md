 ## apply 的实现

 **`call` 与 `apply` 的区别**

`call` 可以有2个以上参数，
`apply` 最多有两个参数，且第二个参数只能是数组或类数组

 - fun.call(context,arg1,arg2,arg3,...) : 第一个参数是 this 指向的对象，其他参数依次传入
 - fun.apply(context,[args]) : 第一个参数是 this 指向的对象，第二个参数是数组或者类数组

```javascript
Function.prototype.myApply = function (context,args){

    // 判断传入的第一个参数是否存在，如不存在，在非严格模式下根据运行环境 取window 或者 global
    if(!context){
        context = typeof window !== 'undefined' ? window : global;
    }
    // this的指向是当前函数fun
    context.fun = this;

    let result
    //根据第二个参数返回不同的执行结果
    if(!args){
        result = context.fun()
    }else{
        result = context.fun(...args)
    }
    //原本context并不存在fun属性，函数执行结束后删除fun
    delete context.fun
    return result
}
```
