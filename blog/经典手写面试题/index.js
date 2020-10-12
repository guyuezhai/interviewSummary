
// call 实现
// 所有的方法都可以调用call/apply/bind方法， 它们是函数原型上的方法，因此需要挂载到Function.prototype
// 下面我们来动手实现一下我们自己的 call/apply/bind方法

// 需要注意一下事项 

// 1. 如果第一个参数没有，那么在非严格模式下默认指向 window 或者 global 
// 2. 传入的第一个参数是this指向的对象，根据this绑定规则，我们知道 context.fun，fun中的this 被隐式绑定到context上，因此可以使用
// context.fun(...args) 来执行函数
// 3. 原本context并不存在fun属性，函数执行结束后删除fun
// 4. 返回函数执行结果

// Function.prototype.myCall = function( ){

//     const [ context, ...args ] = [ ...arguments ]
//     // 判断传入的第一个参数是否存在，如不存在，在非严格模式下根据运行环境 取window 或者 global
//     if( !context){
//         context = typeof window !== 'undefined' ? window : global;
//     }
//     // this的指向是当前函数fun
//     context.fun=this

//     let result = context.fun(...args)
//     //原本context并不存在fun属性，函数执行结束后删除fun
//     delete context.fun

//     return result
// }

// apply 的实现

// apply 的实现与call 的实现有许多相似之处，传参略有不同，call 可以有2个以上参数，apply最多有两个参数，且第二个参数只能是数组或类数组；
// fun.call(context,arg1,arg2,arg3,...) : 第一个参数是 this 指向的对象，其他参数依次传入
// fun.apply(context,[args]) : 第一个参数是 this 指向的对象，第二个参数是数组或者类数组
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

// new 的实现原理
// 1. 创建一个空的对象；
// 2. 将新建对象作为构造函数的实例，构造函数中的this指向这个空对象
// 3. 执行构造函数方法，将构造函数中的属性和方法添加到引用的对象上
// 4. 如果构造函数执行的结果不是一个对象，则返回新建的对象，否则返回执行结果

function myNew(){
    //创建一个新对象
    let target = {}
    //解构出 构造函数及参数
    const [ constructor, ...args ] = [ ...arguments ]
    //将创建的对象作为构造函数的实例
    target.__proto__ = constructor.prototype
    //执行构造函数，将构造函数的属性和方法添加到新建的对象上
    let result = constructor.myApply(target, args)
    //如果构造函数返回的不是一个对象 则返回新建的对象
    return  result instanceof Object ? result : target
}
// 测试
function test(name){
    this.name=name
}
let date = myNew(test,2134474774)
let date2 = new test(2134474774)
console.log(date,date2)



