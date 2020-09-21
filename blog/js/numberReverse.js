function reverse(num){
    num=num.toString()
    let length=num.length
    if(length==1){
        return num
    }else{
        return reverse(num.slice(1))+num[0]
    }
}
let result=reverse(1230)
console.log(result)