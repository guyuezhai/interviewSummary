// const babel  = require("babel-core");
// const result = babel.transform('const result= 1+2+3+4',{
//     plugins:[
//         require('./index')
//     ]
// })

const parse = require('./parse')
const token=require('./tokenizer')

let result = token.tokenizer('const add=(a,b)=>a+b')
console.log(result)
// console.log(result.code) // const result = 3;
console.log(parse.parse(result))