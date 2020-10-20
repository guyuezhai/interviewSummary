## new 的实现原理
<details>
<summary>实现详情</summary>

1. 创建一个空的对象；
2. 将新建对象作为构造函数的实例，构造函数中的this指向这个空对象
3. 执行构造函数方法，将构造函数中的属性和方法添加到引用的对象上
4. 如果构造函数执行的结果不是一个对象，则返回新建的对象，否则返回执行结果

```javascript
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
```
- 验证 `New` 实现结果

```javascript
function test(name){
    this.name=name
}
let date = myNew(test,2134474774)
let date2 = new test(2134474774)
console.log(date,date2)
```
</details>
