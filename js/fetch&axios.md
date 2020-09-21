

# fetch 与 axios 的区别

### fetch是基于Promise采用原生js设计，并没有使用XMLHttpRequest对象，代码结构比ajax简单
### 优点
```
1.语法简洁，更加语义化
2.基于Promise实现，支持async/await
3.同构方便
4.更加底层，提供丰富的API
5.脱离了XHR，是ES规范里新的实现方式
```
### 不足
```
1.fetch只对网络请求报错，对与400，500服务器返回的错误码都当做请求成功并不会reject，只有网络错误导致请求不能完成时，fetch才会被reject
2.fetch请求默认不会携带cookie，需要添加配置项：fetch(url,{credentials:'include'})
3.fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不阻止请求过程继续在后台运行，造成流量浪费
4.fetch没有办法原生检测请求的进度，而XHR可以
```
### axios本质上对原生XHR的封装，只不过它是Promise的实现版本
```
1.从浏览器创建XMLHttpRequest
2.支持Promise API
3.客户端支持防止CSRF
4.提供了一些并发请求的接口
5.从nodejs创建http请求
6.拦截请求和响应
7.转换请求和响应数据
8.取消请求
9.自动转换JSON数据
```
PS：防止CSRF就是让你的每一个请求都带上一个从cookie中拿到的key，根据浏览器同源策略，假冒的网站是拿不到你cookie中的key的，这样，后台就可以轻松分辨出这个请求是否是用户在假冒网站上的误导输入，从而采取正确的策略。

