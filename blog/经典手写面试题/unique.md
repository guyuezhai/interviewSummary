
  ## 实现一个可以去除重复元素的方法
  示例如下：
 > unique( [1,2,2,3,2,4,5,3] )  // 返回结果为 [ 1, 2, 3, 4, 5 ]

- 利用ES6新增的数据类型 `Set` 实现

` Set `它类似于数组，但是成员的值都是唯一的，没有重复的值。
 
```javascript
 let testArr=[1,2,2,3,2,4,5,3]

 function unique(arr){
     return [...new Set(arr)]
 }

let result = unique(testArr)

console.log(result) //[ 1, 2, 3, 4, 5 ]
```
- 利用 `reduce` 实现

```javascript
 let testArr=[1,2,2,3,2,4,5,3]

 function unique(arr){
     return arr.reduce((result,cur)=>{
         if(result.includes(cur)) return result
         result.push(cur)
         return result
    },[])
}

let result = unique(testArr)

console.log(result) //[ 1, 2, 3, 4, 5 ]
```

- 利用 `includes` 实现

```javascript
 let testArr=[1,2,2,3,2,4,5,3]

 function unique(arr){
    let result = []
    for(let item of arr){
        if(result.includes(item)) continue
        result.push(item)
    }
    return result
}
let result = unique(testArr)

console.log(result) //[ 1, 2, 3, 4, 5 ]
```
- 利用 `indexOf` 实现

```javascript
 let testArr=[1,2,2,3,2,4,5,3]

 function unique(arr){
    let result = []
    for(let item of arr){
        if(result.indexOf(item)!==-1) continue
        result.push(item)
    }
    return result
}
let result = unique(testArr)

console.log(result) //[ 1, 2, 3, 4, 5 ]
```

- 利用 `Map` 实现

```javascript
 let testArr=[1,2,2,3,2,4,5,3]

 function unique(arr){
     let map = new Map()
    let result = []
    for(let item of arr){
        if(map.has(item)) continue
        result.push(item)
        map.set(item,true)
    }
    return result
}

let result = unique(testArr)

console.log(result) //[ 1, 2, 3, 4, 5 ]

```
