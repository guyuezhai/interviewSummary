/**
 * ES5 实现队列
 */
function Queue() {
    let items=[]
    this.enqueue=function (item) {
        items.push(item)
    }
    this.dequeue=function () {
        return items.shift()
    }
    this.front=function(){
        return items[0]
    }
    this.isEmpty=function(){
        return items.length==0
    }
    this.size=function(){
        return items.length
    }
    this.print=function(){
        console.log(items.toString())
    }
}
/**
 * ES6 实现队列
 */
let ES6Queue=(function () {
    let items=new WeakMap()
    class ES6Queue{
        constructor(){
            items.set(this,[])
        }
        enqueue(item){
            let arr=items.get(this)
            arr.push(item)
        }
        dequeue(){
            let arr=items.get(this)
            return arr.shift()
        }
        front(){
            let arr=items.get(this)
            return arr[0]
        }
        isEmpty(){
            let arr=items.get(this)
            return arr.length==0
        }
        size(){
            let arr=items.get(this)
            return arr.length
        }
        print(){
            let arr=items.get(this)
            console.log(arr.toString())
        }
    }
    return ES6Queue
})()

let queue= new ES6Queue()

queue.enqueue(1)
queue.enqueue(2)
queue.print()
queue.dequeue()
queue.print()
console.log(queue.size())

/**
 * 优先级队列
 */

 function PriorityQueue() {
     let items=[]
     function QueueElement(item,priority) {
         this.item=item;
         this.priority=priority
     }
     this.enqueue=function(item,priority){
        let element=new QueueElement(item,priority)
        let add=false,length=items.length;
        for(let i=0;i<length;i++){
            if(element.priority<items[i].priority){
                items.splice(i,0,element)
                add=true
                break
            }
        }
        if(!add){
            items.push(element)
        }
     }
     this.dequeue=function () {
        return items.shift()
    }
    this.front=function(){
        return items[0]
    }
    this.isEmpty=function(){
        return items.length==0
    }
    this.size=function(){
        return items.length
    }
    this.print=function(){
        let length=items.length
        for(let i=0;i<length;i++){
            console.log("item: %s-priority: %s",items[i].item,items[i].priority)
        }
        
    }
 }

 let prQueue=new PriorityQueue()
 prQueue.enqueue('li',1)
 prQueue.enqueue('zi',2)
 prQueue.enqueue('cd',1)
 prQueue.print()

 /**
  * 击鼓传花
  */
 function hotPotato(nameList,num) {
     let queue=new Queue()
     let length=nameList.length
     for(let i=0;i<length;i++){
        queue.enqueue(nameList[i])
     }

     while(queue.size()>1){
         for(let i=0;i<num;i++){
             queue.enqueue(queue.dequeue())
         }
         let name=queue.dequeue()
         console.log(" %s 已经被淘汰",name)
     }
     return queue.dequeue()
 }

 let winner=hotPotato(['张三','李四','王五','王麻子','隔壁老王'],4)
 console.log('最终胜出者是---> %s',winner)