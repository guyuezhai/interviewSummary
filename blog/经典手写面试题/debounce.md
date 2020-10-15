
  ## 防抖函数实现

  >防抖函数的作用是控制函数在一定的时间 `N秒` 内执行一次，如果 `N秒` 内再次触发，则重新计算时间间隔
  防抖函数在性能优化方面有很重要的作用，也是常考面试题之一，
  
  **应用场景**

  > 1. 输入框搜索，如果用户持续不停的输入，连续不停的调用搜索查询接口，会给服务端造成很大的压力。如果设置一定的时间间隔，等用户输入结束后再调用接口，会减少很多不必要的请求，从而减轻服务端压力
  > 2. 浏览器窗口缩放，`resize` 事件
  > 3. 表单校验
  
 
```javascript
function debounce(fn,time,immediate=true){
    let timeout,result;
    //延迟执行方法
    const leater=(context,args)=>setTimeout(() => {
            //间隔time计时结束，开始执行目标方法
            timeout=null;
            if(!immediate){
                result = fn.apply(context,args)
                context=args=null
            }
        }, time);
    
    let debounced=function(...params){
        //第一次触发 或者距离上次触发时间间隔大于 设定的time值
        if(!timeout){
            //开启定时器 
            timeout=leater(this,params)
            //immediate为真则 立即执行
            if(immediate){
                result=fn.apply(this,params)
            }
        }else{
            // 本次触发时间距离上次触发间隔小于设定的time值 则清理上次的定时器并重新开始计时
            clearTimeout(timeout)
            timeout=leater(this,params)
        }
        return result
    }

    //取消防抖执行
    debounced.cancel=function(){
        //清理定时器 并把timeout设为null
        clearTimeout(timeout)
        timeout=null
    }
    return debounced
}
```
- 验证防抖函数实现

```javascript
let i=0
function add(x){
    console.log('result---',x)
}
let exc=debounce(add,500)

let interval=setInterval(() => {
    (function(i){
        exc(i) 
    })(i)
    i++
}, 600);

setTimeout(() => {
    clearInterval(interval)
    exc.cancel()

}, 8000);
```