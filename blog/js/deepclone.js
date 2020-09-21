var testobj={
    num: 0,
    str: '',
    boolean: true,
    unf: undefined,
    nul: null,
    obj: {
        name: '我是一个对象',
        id: 1,
        qwe: {
            a: 1
        }
    },
    arr: [0, 1, 2, {b: 2}],
    date: new Date(0),
    reg: /我是一个正则/ig,
    [Symbol('1')]: 1,
    func() {
        console.log(123)
    }
}

function deepclone(obj,map=new WeakMap()){
    if(obj instanceof Date) return new Date(obj);
    if(obj instanceof RegExp) return new RegExp(obj)
    if(obj==null || typeof obj !='object'){
        return obj
    }
    if(map.has(obj)){
        return map.get(obj)
    }
    let t = new obj.constructor()
    map.set(obj,t)
    let keys=[...Object.getOwnPropertyNames(obj),...Object.getOwnPropertySymbols(obj)]
    console.log('keys=--',keys)
    for(let key of keys){
        t[key]=deepclone(obj[key],map)
    }

    return t
}

let result=deepclone(testobj)
result.data=new Date()
let symbol= Symbol(213)
let result1=deepclone(symbol)
console.log(result,testobj,result1,typeof result1)