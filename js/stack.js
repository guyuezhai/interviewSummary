/**
 * 栈 ES5 实现
 */
function Stack(){
    let items=[]
    this.push=function(item){
        items.push(item)
    }
    this.pop=function () {
        return items.pop()
    }
    this.peek=function () {
        return items[items.length-1]
    }
    this.clear=function(){
        items=[]
    }
    this.print=function () {
        console.log(items.toString())
    }
    this.size=function(){
        return items.length()
    }
    this.isEmpty=function(){
        return items.length==0
    }

}
/**
 * 栈 ES6 实现
 */
class Es6Stack{
    constructor(){
        this.items=[]
    }
    push(item){
        this.items.push(item)
    }
    pop(){
        return this.items.pop()
    }
    peek(){
        let length=this.items.length
        return this.items[length-1]
    }
    isEmpty(){
        return this.items.length==0
    }
    clear(){
        this.items=[]
    }
    size(){
        return this.items.length
    }
    print(){
        console.log(this.items.toString())
    }
}
let stack=new Stack()
stack.push(1)
stack.push(4)
stack.push(56)
stack.push(67)

console.log(stack.peek(),stack.isEmpty(),stack.pop())
stack.print()
