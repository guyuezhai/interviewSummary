 
 ## 节流函数实现
 
 > 节流函数的作用是控制函数在一定的时间 `N秒` 内最多执行一次，如果 `N秒` 内多次触发，只有一次生效。
 
 **应用场景**

 > 1. ondrag拖拽事件
 > 2. onScoll滚动事件
 > 3. 鼠标点击事件
 > 4. 计算鼠标移动距离
 
 - 简单版的节流函数实现
 
 1. `throttle` 函数返回一个函数，每次执行更新 `current` 当前时间，
 2. 计算当前 `current` 与上一次 `pre` 的差值，如果大于等于设定的时间间隔 `time` 则执行 `fn` ,并更新 `pre` 为当前时间,否则不做处理.
 

```javascript
function throttle(fn,time){
    var pre = 0;
    return function(){
        var current = new Date().getTime()
        if(current-pre>=time){
            pre = new Date().getTime();
            fn.apply(this,arguments)
        }
    }
}
```
- 复杂版本的节流函数

考虑函数首尾执行

```javascript
function throttle(fn,wait,options){
    var timer,_this,args,res,pre=0;
    options=options || {}
    var later = function () {
        pre = options.leading === false ? 0 : (Date.now() || new Date().getTime());
        timer = null
        res = fn.apply(_this,args)

        if(!timer) _this = args =null
    }
    var throttled = function () {
        var current = Date.now() || new Date().getTime();
        //首次是否执行
        if(!pre && options.leading === false) pre = current;
        //计算当前距离上次执行的时间差
        var remaing = wait-(current - pre)
        _this=this
        args=arguments;
        //当前执行距离上次执行时间超过设定wait时间
        if(remaing<=0){
            if(timer){
                clearTimeout(timer)
                timer=null
            }
            //更新pre为当前时间
            pre = current
            //执行函数
            res = fn.apply(_this,args)
            if(!timer){
                _this=args=null
            }
        }else if(!timer && options.trailing!==false){
            timer = setTimeout(later,remaing)
        }
        return res
    }
    throttled.cancel = function () {
        clearTimeout(timer)
        pre=0;
        timer=_this=args=null
    }

    return throttled
}
```
- 验证函数执行结果

```javascript
var i=0
function add(x){
    console.log('result---',x)
}
var exc=throttle(add,1000)

var interval=setInterval(() => {
    (function(i){
        exc(i) 
    })(i)
    i++
}, 100);

setTimeout(() => {
    clearInterval(interval)
    // exc.cancel()
}, 8000);
```