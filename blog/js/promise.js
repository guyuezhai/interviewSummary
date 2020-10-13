function MyPromise(excuator){   
    //参数合法校验
    if (typeof excuator !== 'function') {
        throw new TypeError('MyPromise resolver' + excuator + 'is not a function')
    }

    //设置实例私有属性
    this.state='pending';
    this.promiseValue=null;
    this.resolveFun = Function.prototype;
    this.rejectFun = Function.prototype;
    var _this = this

    function changeState(state,value){

        if(_this.state!=='pending') return
        _this.state=state
        _this.promiseValue=value
 
        //通知通过.then注入的某个方法执行 （异步）
        var delayTimer = setTimeout(() => {
            clearInterval(delayTimer);
            delayTimer = null;

            var state=_this.state,value=_this.promiseValue;

            state === 'fulfilled' ? _this.resolveFun.call(_this,value) : _this.rejectFun.call(_this,value);
        }, 0);    
    
    }
    function resolve(value){
        changeState('fulfilled',value)
    }

    function reject(reason){
        changeState('reject',reason)
    }

    // new MyPromise 时立即执行excuator方法
    try {
        excuator( resolve, reject )
    } catch (error) {
        changeState('reject',error)
    }
}

MyPromise.prototype.then = function(resolveFun,rejectFun){
    //参数不全默认处理
    if(typeof resolveFun !== 'function'){
        resolveFun = function (value) {
            // 状态顺延
            return MyPromise.resolve(value)
        }
    }

    if(typeof rejectFun !== 'function'){
        rejectFun = function (reason) {
            // 状态顺延
            return MyPromise.reject(reason)
        }
    }
    var _this = this;

    //返回新的promise
    return new MyPromise(function (resolve,reject) {
        
        //新promise实例的成功或失败取决于resolveFun、rejectFun 执行结果

        _this.resolveFun = function (value) {

            try {
                var res = resolveFun.call(_this,value)
                res instanceof MyPromise ? res.then(resolve,reject) : resolve(res)
            } catch (error) {
                reject(error)
            }
        }

        _this.rejectFun = function (reason) {
            try {
                var res = rejectFun.call(_this,reason);
                res instanceof MyPromise ? res.then(resolve,reject) : resolve(res)
            } catch (error) {
                reject(error)
            }
            
        }
    })
}

MyPromise.prototype.catch = function(rejectFun){
    return this.then(null,rejectFun)
}

//MyPromise 对象方法
MyPromise.resolve = function (value) {
    return new MyPromise(function (resolve) {
        resolve(value)
    })
}

//MyPromise 对象方法
MyPromise.reject = function (value) {
    return new MyPromise(function (_,reject) {
        reject(value)
    })
}

MyPromise.all = function (promiseArr) {
    var iterable = isIterable(promiseArr)
    if(!iterable){
        throw new TypeError(typeof promiseArr +" "+ promiseArr +" "+'is not iterable (cannot read property Symbol(Symbol.iterator))')
    }

    return new MyPromise(function (resolve,reject) {
        var index = 0,values=[],len=promiseArr.length;
        for(var i=0;i<len;i++){
            (function (i) {
                let item = promiseArr[i]
                //如果当前项不是promise 则把当前项转换成promise
                !(item instanceof MyPromise)?(item = MyPromise.resolve(item)): null;
    
                item.then(function (value) {
                    index++;
                    values[i]=value
                    if(index >= len){
                        resolve(values)
                    }
                }).catch(function (reason) {
                    reject(reason)
                })

            })(i)
        }

    })
}

function fun1() {
    return MyPromise.resolve('fun1')
}
function fun2() {
    return new MyPromise((resolve,reject)=>{
        setTimeout(() => {
            return reject('fun2')
        }, 200);
    })
}
function fun3() {
    return new MyPromise((resolve,reject)=>{
        setTimeout(() => {
            return resolve('fun3')
        }, 1000);
    })
}

//判断对象是否可迭代
function isIterable(target) {
    return target!==null && typeof target[Symbol.iterator] === 'function'
}

MyPromise.all([fun1(),fun2(),fun3(),23]).then(function (values) {
    console.log('all---',JSON.stringify(values))
}).catch(function (err) {
    console.log('all---err',err)
})


var promise = new MyPromise((resolve,reject)=>{
    resolve(10)
    // reject('error')
}).then((value)=>{
    console.log('then--',value)
    return MyPromise.reject('wew')
},(reason)=>{
    console.log('then--reject',reason)
    
}).then((value)=>{
    console.log('then--',value)
},(reason)=>{
    console.log('then--reject-2',reason)
})