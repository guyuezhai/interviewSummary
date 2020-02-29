let str = 'My name is ${name}, I am from ${city}',
    info = {
       name: 'AaDerBrane',
       city: 'GungZhou'
    };
console.log(printf(str, info));
    // My name is AaDerBrane, I am from GuangZhou
function printf(str, info) {
    for(let k in info){
        let reg=new RegExp("\\$"+"{"+k+"}","g")
        str=str.replace(reg,info[k])
    }
    console.log(str)
}

/**
 * 节流函数
 * @param {function} fn 
 * @param {number} time 
 */
function throttle(fn,time=1000){
    let prv= Date.now()
    return function(...arg){
        let now=Date.now();
        if(now-prv>=time){
            fn.apply(this,arg)
            prv=Date.now()
        }
    }
}

 
/**
 * 防抖函数
 * @param {fnction} fn 
 * @param {number} time 
 */
function debounce(fn,time,){
    let timer;
    return function(){
        clearTimeout(timer);
        let context=this,arg=arguments;
        timer=setTimeout(()=>{
            fn.apply(context,arg)
        },time)
    }
}
let debfn=debounce((arg)=>{
    console.log('防抖...'+arg)
},1000)
let thrfn=throttle((arg)=>{
    console.log('节流...'+arg)
},1000)
let i=0,j=0;
setInterval(()=>{
    thrfn(++i)
    debfn(++j)
},500)
