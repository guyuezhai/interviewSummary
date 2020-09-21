## WeakMap

WeakMap 对象是一组键值对的集合，其中的**键是弱引用对象，而值可以是任意**

**WeakMap弱引用的只是键名，而不是键值，键值依然正常引用**

WeakMap中，每个键对自己所引用对象的引用都是弱引用，在没有其他引用和该键引用同一个对象的情况下，这个对象将会被垃圾回收（相应的key则会变成无效的），所以，WeakMap的key是不可枚举的

属性：
- constructor: 构造函数

方法：
- has(key): 判断是否含有key关联的对象
- get(key): 返回key关联的对象（没有则返回undefined）
- set(key,value): 设置一组key关联的对象
- delete(key): 移除key的关联对象
```js
let ele=document.getElementById('temp')
let weakmap=new WeakMap();
weakmap.set(ele,{timesClicked:0})
ele.addEventListener('click',function(){
    let data=weakmap.get(ele);
    data.timesClicked++
},false)
```
## 总结
- Set 
    - 成员唯一，无序且不重复
    - [value,value]键名与键值一致（或者说只有键值没有键名）
    - 可以遍历，方法有 add、delete、has
- WeakSet
    - 成员都是对象
    - 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不易造成内存泄漏
    - 不能遍历，方法有 add、delete、has
- Map
    - 本质上是键值对的集合，类似集合
    - 可以遍历，方法很多可以跟各种数据格式转换
- WeakMap 
    - 只接受对象作为键名（null除外），不接受其他类型的值作为键名
    - 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
    - 不能遍历，方法有get、set、has、delete

