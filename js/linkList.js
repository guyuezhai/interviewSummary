/**
 * ES5 实现链表
 */
function LinkList() {

    let Node=function(item,index) {
        this.item=item;
        this.next=null
    }
    let head=null,length=0;
    this.append=function(item){
        let node=new Node(item)
        if(!head){
            head=node
        }else{
            let current=head
            while(current.next){
                current=current.next
            }
            current.next=node
           
        }
        length++
    }
    this.insert=function(position,item){
        if(position>=0 &&　position<=length){
            let node = new Node(item)
            let current=head,previous,index=0;

            if(position==0){
                node.next=current
                head=node
            }else {
                while(index++<position){
                    previous=current;
                    current=current.next
                }
                node.next=current,
                previous.next=node
            }
            length++
            return true
        }else{
            return false
        }

    }
    this.remove=function(item){
        let node=new Node(item)
        let current=head,previous,index=0;
        while(current && current.item!=item){
            previous=current,
            current=current.next
            index++
        }
        if(index==length){
            return
        }
        if(!previous){
            head=current.next

        }else{
            previous.next=current.next
        }
        length--
    }
    this.indexOf=function(item){
        let current=head,index=0;
        while(current){
            if(current.item==item){
                console.log(`index of ${item}-> %s`,index)
                return index
            }
            current=current.next
            index++
        }
        console.log(`index of ${item}-> %s`,-1)
        return -1
    }
    this.removeAt=function(position){
        let current=head,delItem,previous,index=0;
        if(position>=0 && position<length && current){
          
            if(position==0){
                delItem=head;
                head=current.next
            }else{
                while(index++<position){
                    previous=current
                    current=current.next
                }
                delItem=current;
                previous.next=current.next
            }
            length--
            console.log(`删除 ${position}位置元素 %s`,delItem.item)
        }else{
            console.log(`删除 ${position}位置元素 %s`,"不存在")
        }
        
    }
    this.isEmpty=function(){
        let isEmpty=head==null
        console.log('链表是否为空: %s',isEmpty)
        return isEmpty
    }
    this.size=function(item){
        console.log('链表长度: %s',length)
        return length
    }
    this.toString=function(){
        let current=head
        let items="",index=0;
        while(current){
            items+=`元素${current.item}-索引${index} | `
            current=current.next
            index++
        }
        console.log('current.item',items)
    }
}

let linkList=new LinkList()
linkList.append(1)
linkList.append(2)
linkList.isEmpty()
linkList.size()
linkList.toString()
linkList.append(3)
linkList.append(4)
linkList.size()
linkList.toString()
linkList.remove(3)
linkList.size()
linkList.toString()
linkList.indexOf(3)
linkList.removeAt(2)
linkList.size()
linkList.insert(0,8)
linkList.toString()


/**
 * ES6 实现链表
 */

 class Node{
     constructor(item){
        this.item=item;
        this.next=null
     }
 }
 class ES6LinkList{
     constructor(){
         this.length=0
         this.head=null
     }
     append(item){
        let node=new Node(item);
        let current=this.head;
        if(!current){
            this.head=node
        }else{
            while(current.next){
                current=current.next
            }
            current.next=node
        }
        this.length++
     }
     insert(pos,item){
         if(pos>=0 && pos<=this.length){
             let current=this.head,previous,index=0;
             let node=new Node(item)
            if(pos==0){
                this.head=node
                node.next=current
            }else{
                while(index++<pos){
                    previous=current
                    current=current.next
                }
                previous.next=node;
                node.next=current
            }
            this.length++
            return true
         }else{
             console.log('请在链表起始位置 %s --- 结束位置 %s 范围内插入元素',0,this.length)
             return false
         }
     }
     remove(item){
        let current=this.head,previous,index=0;
        while(current && current.item!==item){
            previous=current
            current=current.next
            index++
        }
        if(index>=0 &&　index<this.length){
            if(index==0){
                this.head=current.next
            }else {
                previous.next=current.next
                
            }
            this.length--
        }else{
            console.log('移除元素 %s 不在链表中',item)
        }
        
     }
     removeAt(pos){
         if(pos>=0 && pos<this.length){
             let current=this.head,previous,index=0;
             if(pos==0){
                 this.head=current.next
             }else{
                 while(index++<pos){
                     previous=current
                     current=current.next
                 }
                 previous.next=current.next
             }
             this.length--
         }else{
            console.log('移除元素需在链表范围 %s ~ %s 内！',0,this.length)
         }
     }
     indexOf(item){
         let current=this.head,index=0;
         while(current && current.item!==item){
             current=current.next
             index++
         }
         if(index<this.length){
             console.log("您查找的元素 %s 在链表中的位置位 %s",item,index)
             return index
         }else{
            console.log("您查找的元素 %s 在链表中的位置位 %s",item,"不存在")
            return -1
         }
     }
     size(){
         console.log("链表长度为 %s",this.length)
         return this.length
     }
     toString(){
         let current=this.head,item="",index=0;
         while(current){
            item+=`元素：${current.item}--索引：${index} | `
            index++
            current=current.next
         }
         console.log(item)
     }
     isEmpty(){
         console.log("链表是否为空 %s",this.length==0)
         return this.length==0
     }
 }

 let es6List=new ES6LinkList()
 es6List.isEmpty()
 es6List.append(1)
 es6List.append(2)
 es6List.insert(0,7)
 es6List.insert(3,9)
 es6List.indexOf(2)
 es6List.toString()
es6List.size()
es6List.remove(2)
es6List.toString()
es6List.removeAt(0)
 es6List.size()
 es6List.isEmpty()
 es6List.toString()
 es6List.indexOf(7)