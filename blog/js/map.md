## 字典（Map）
集合与字典的区别
- 共同点：集合、字典可以存储不重复的值
- 不同点：集合是以[value,value]形式存储元素的，字典是[key,value]的形式存储
```js
const mp=new Map()
const o={m:'hello'}
mp.set(o,'content')
mp.get(o) // content

mp.has(o)  //true
mp.delete(o)  //true
mp.has(o) //false
```
任何具有Iterator接口、且每个成员都是一个双元素的数组的数据结构都可以当做Map构造函数的参数
```js
const set=new Set([['foo',1],['bar',2]])
const mp=new Map(set)
mp.get('foo') //1

const mp2=new Map(['baz',3]);
const mp3=new Map(mp2)
mp3.get('baz') // 3
```
如果读取一个未知的键，则返回undefined
```js
new Map().get('abss') // undefined
```
**只有对同一个对象的引用，Map结构才将其视为同一个键**

```js
const map=new Map()
map.set(['a'],'a')
map.get(['a']) //undefined
```
> 上面的代码的`set`和`get`方法，表面是针对同一个键，但实际上这是两个不同的值，内存地址是不一样的，因此`get`方法无法读取改键，返回`undefined` 

由上可知，Map的键实际是内存地址的绑定，只要内存地址不一样，就视为两个不同的键。这就解决了同名属性碰撞的（clash）的问题。
如果Map的键是一个简单类型的值（Boolen，number，string），则只要两个值严格想等，Map将视其为同一个键，比如`0`和`-0`就是一个键，布尔值`true`和字符串`true`则是两个不相同的键，另外`undefined`和`null`也是两个不同的键，虽然`NaN`不严格等于自身，但是Map将其视为同一个键
```js
let mp = new Map()
mp.set(-0,123)
mp.get(+0) // 123

mp.set(true,1)
mp.get('true') //undefined
mp.get(true) //1

mp.set(undefined,3)
mp.get(null) //undefined
mp.get(undefined) //3 

mp.set(NaN,123)
mp.get(NaN) //123

```
Map 的属性和方法
- constructor：构造函数
- size：返回字典中所包含的元素个数
```js
const map=new Map([['name','TOM'],['age',20]])
map.size //2
```
操作方法
- set(key,value): 向字典中添加元素
- get(key): 通过键查找特定的的数值并返回
- has(key): 判断字典中是否存在的键key
- delete(key): 通过key删除字典中存在对应的元素
- clear(): 清空字典中所有的元素

遍历方法
- keys(): 将字典中包含的所有的键名以迭代器形式返回
- values(): 将字典中包含的所有数值以迭代器的形式返回
- entries(): 返回所有成员的迭代器
- forEach(): 遍历字典的所有成员
```js
const map=new Map([['name','TOM'],['age',20]])
console.log(map.entries()) // MapIterator {"name" => "TOM", "age" => 20}
console.log(map.keys()) // MapIterator {"name", "age"}
console.log(map.values()) // MapIterator {"TOM", 20}

```
Map 结构的默认遍历器接口（Symbol.iterator属性），就是`entries`方法
```js
map[Symbol.iterator]===map.entries //true
```

Map 结构转换成数组结构，比较快速的方法是使用扩展运算符(`...`)
对于forEach

```js
const loger={
    log:function(key,value){
        console.log("Key：%s, Value: %s",key,value)
    }
}
let map=new Map([['name','TOM'],['age',20]])
map.forEach(function(value,key){
    this.log(key,value)
},loger)

//Key：name, Value: TOM
//Key：age, Value: 20
```
> 这个例子中，forEach 方法的回调函数的this指向的是loger

**与其它数据结构的相互转换**
1. Map转换成Array
```js
let map=new Map([['name','TOM'],['age',20]])
console.log([...map]) // [Array(2), Array(2)]
```
2. Array 转换成Map
```js
let map=new Map([['name','TOM'],['age',20]])
console.log(map) // Map(2) {"name" => "TOM", "age" => 20}
```
3. Map 转换成Object

    因为Object的键名都是字符串，而Map的键名为对象，所以转换的时候会把非字符串键名转换成字符串键名
```js
function mapToObj(map){
    let obj=Object.create(null)
    for(let [key,value] of map){
        obj[key]=value
    }
    return obj
}
let map=new Map().set('name','Tom').set('age',20)
mapToObj(map) // {name: "Tom", age: 20}
```
4. Object 转 Map
```js
function objToMap(obj){
    let map=new Map()
    for(let key of Object.keys(obj)){
        map.set(key,obj[key])
    }
    return map
}
objToMap({name: "Tom", age: 20}) // Map(2) {"name" => "Tom", "age" => 20}
```
5. Map 转 Json
```js
function mapToJson(map){
    return JSON.stringify([...map])
}
let map=new Map().set('name','Tom').set('age',20)
mapToJson(map) // "[["name","Tom"],["age",20]]"
```
6. Json 转 Map
```js
function jsonToMap(json){
    return objToMap(JSON.parse(json))
}
jsonToMap('{"name": "Tom", "age": 20}') //Map(2) {"name" => "Tom", "age" => 20}
```