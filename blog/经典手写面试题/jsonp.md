
 ## JSONP 实现
 
> JSONP为前端实现跨域的一种方式，其原理是利用 `html` 的 `script` 标签的 `src` 属性不受浏览器同源策略束缚，可以任意获取服务器脚本并执行。

JSONP正是利用这一特性，动态创建script标签来实现跨域的。
 
- 缺点
 
是只支持get请求，并且也需要后端做相应的处理
 
- 实现步骤
 
> 1. 创建script标签
> 2. 创建挂载到window上的callback方法
> 3. 拼接URL并赋值给script的src属性
> 4. 服务端处理请求，并把数据放入前端传来的callback回调函数中返回给前端
> 5. 前端解析并执行服务端返回的方法调用
```javascript
function jsonp({url,params,callback}) {
    return new Promise((resolve,reject)=>{
        //创建script标签
        let script = document.createElement('script')
        //把回调函数挂载到window上
        window[callback] = function (data) {
            resolve(data)
            //执行结束，删除之前创建的script标签
            document.body.removeChild(script)
        }

        //拼接url
        params = {...params,callback}
        let fields=[]
        for(let key in params){
            fields.push(`${key}=${params[key]}`)
        }
        script.src = `${url}?${fields.join('&')}`

        document.body.appendChild(script)
    })
}
```
- 测试验证需要写后端服务

```javascript
function crosJsonp(data) {
    console.log(data)
}

jsonp({
    url:'http://localhost:8080/crosJsonpDemo',
    params:{
        dev:'test',
        fileName:'json'
    },
    callback:'crosJsonp'
}).then(res=>{
    console.log(res)
})
```