# 正则字符匹配
## 惰性匹配 就是尽可能少的匹配
```js
let regex = /\d{2,5}?/g;
let string = "123 1234 12345 123456";
console.log( string.match(regex) ); 
// => ["12", "12", "34", "12", "34", "12", "34", "56"]
```

## 贪婪的，它会尽可能多的匹配
```js
let regex = /\d{2,5}/g;
let string = "123 1234 12345 123456";
console.log( string.match(regex) ); 
// => ["123", "1234", "12345", "12345"]
```

## 多选分支 

```js
// 例如要匹配"good"和"nice"可以使用/good|nice/。
// 测试如下：
let regex = /good|nice/g;
let string = "good idea, nice try.";
console.log( string.match(regex) ); 
// => ["good", "nice"]
//但有个事实我们应该注意，比如我用/good|goodbye/，去匹配"goodbye"字符串时，
//结果是"good"：
let regex = /good|goodbye/g;
let string = "goodbye";
console.log( string.match(regex) ); 
// => ["good"]
//把正则改成/goodbye|good/，结果是：
let regex = /goodbye|good/g;
let string = "goodbye";
console.log( string.match(regex) ); 
// => ["goodbye"]
//也就是说，分支结构也是惰性的，即当前面的匹配上了，后面的就不再尝试了。
```
## 匹配id
### 贪婪匹配的问题
```js
//要求从 <div id="container" class="main"></div> 提取出id="container"
// 最开始想到的正则可能是
let regex=/id=".*"/
let str='<div id="container" class="main"></div>'
console.log(str.match(regex))
//=> id="container" class="main"
// 因为.是通配符，本身就匹配双引号的，而量词*又是贪婪的，当遇到container后面的双引号时，又不会停下来，就会继续匹配，直到遇到最后一个双引号为止

//
```
### 惰性匹配解决问题
```js
let regex=/id=".*?"/
let str='<div id="container" class="main"></div>'
console.log(str.match(regex))
//=> id="container"
```