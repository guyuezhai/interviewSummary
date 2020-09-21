function debounce(fn,time,immediate=true){
    let timeout,result;
    const leater=(context,args)=>setTimeout(() => {
        timeout=null;
        if(!immediate){
            result = fn.apply(context,args)
            context=args=null
        }
    }, time);
    let debounced=function(...params){
        if(!timeout){
            timeout=leater(this,params)
            if(immediate){
                result=fn.apply(this,params)
            }
        }else{
            clearTimeout(timeout)
            timeout=leater(this,params)
        }
        return result
    }
    debounced.cancel=function(){
        clearTimeout(timeout)
        timeout=null
    }
    return debounced
}
let i=0
function add(x){
    console.log(x)
}
let exc=debounce(add,3000)
let interval=setInterval(() => {
    exc(i) 
    i++
}, 1000);

setTimeout(() => {
    clearInterval(interval)
    exc.cancel()

}, 8000);