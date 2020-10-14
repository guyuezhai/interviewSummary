/** 
 * 深拷贝/浅拷贝区别，实现深拷贝
 * 
 * 深拷贝和浅拷贝是针对复杂数据类型来说的，浅拷贝只拷贝一层，而深拷贝是层层拷贝
 * 
 * 深拷贝
 * 深拷贝对于基本变量是直接复制其值，对于非基本变量则层层递归至基本变量后再复制。深拷贝后的结果与原始对象完全隔离互不影响，修改任意一个对象都不会影响另一个对象。
 * 
 * 浅拷贝
 * 
 * 浅拷贝是将对象的第一层属性进行复制，如果属性值是引用类型时，复制其地址；当引用地址指向的值发生改变时，浅拷贝的结果也跟着变化。
 * 
 * 可以通过扩展运算符 ... 或者 Object.assign 等实现浅拷贝
*/

let foo = {
    a: 1,
    b: 2,
    c: 3,
    d: ['e','f','g']
};

let foo1 = Object.assign({},foo) 
let foo2 = {...foo} 

foo.a = 5
foo.d.push('h')

console.log(foo)   // { a: 5, b: 2, c: 3, d: [ 'e', 'f', 'g', 'h' ] }
console.log(foo1)  // { a: 1, b: 2, c: 3, d: [ 'e', 'f', 'g', 'h' ] }
console.log(foo2)  // { a: 1, b: 2, c: 3, d: [ 'e', 'f', 'g', 'h' ] }

//> 可以看出当第一层的属性值是基本类型时，修改原始对象不会影响新的对象，如果第一层的属性值是复杂数据类型时，新对象和原始对象的该属性值指向同一个内存地址，其中一个发生变化就会影响另一个；

// # 深拷贝实现

// 对于复杂类型的数据实现深拷贝，需要层层深拷贝；而浅拷贝只拷贝一层

// - 基本类型变量直接复制
// - 非基本类型变量则递归至基本类型变量后再复制
// - 深拷贝后对象与原对象完全隔离，互不影响

// > 最简单深拷贝实现:  JSON.parse(JSON.stringify(target))

// `JSON.parse(JSON.stringify(target))` 虽然简单，但部分情况下无法拷贝：

// 1. 会忽略 `undefined`
// 2. 会忽略 `Symbol`
// 3. 不能处理正则 RegExp
// 4. 不能正确处理 Date类型数据
// 5. 对象属性是function时无法拷贝
// 6. 原型链上的属性无法拷贝

// 自己动手实现一个简单的 `deepClone` 函数，需要注意以下几点：

// - 如果是基本类型数据直接返回
// - 如果是复杂数据类型则递归
// - 如果是 `RegExp` 或者 `Date` 类型，返回对应的类型
// - 考虑循环引用问题
// - 考虑Symbol

// ```js

// function deepClone(target,wmap = new WeakMap()){
//     if(target ===null || typeof target !== 'object'){
//         //如果是基本类型直接返回
//         return target;
//     }
//     if(target instanceof RegExp) return new RegExp(target)
//     if(target instanceof Date) return new Date(target)
//     if(wmap.has(target)){ //考虑引用
//         return wmap.get(target)
//     }
//     let res = new target.constructor(); //如果target是Array 则 target.constructor为 [Function: Array] 
//     //如果target是Object 则 target.constructor为 [Function: Object]
//     wmap.set(target,res);
//     let keys=[...Object.getOwnPropertyNames(target),...Object.getOwnPropertySymbols(target)]
//     for(let key in keys){
//         //递归
//          res[key] = deepClone(target[key],wmap)
//     }
//     return res
// }
// ```