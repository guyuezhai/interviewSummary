## this指向

> this始终指向调用它的对象
```js

var o = {
    a:10,
    b:{
        fn:function () {
            console.log(this.a) // undefined
            console.log(this) // { fn: [Function: fn] }
        }
    }
}

o.b.fn()

var o ={
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); // 12 
            console.log(this) // { a: 12, fn: [Function: fn] }
        }
    }
}

o.b.fn()
```
> 以上代码示例中，对象 `o` 的 `b.fn` 方法中的this指向调用它的对象，即b，如果 `b` 对象中没有 `a` 则 this.a为 undefined

- 不直接调用，改用赋值后调用

```js
var o ={
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); // undefined, 若此时在对象o外部定义a,则输出的为在其外部定义的全局变量
            console.log(this) // window
        }
    }
}
// 将b对象下的方法赋值给temp，暂时并未调用
var temp = o.b.fn;
//此时调用绑定的对象是window，并非b对象直接调用
temp(); 
```

- 在对象方法中调用

```js
var point = { 
    x : 0, 
    y : 0, 
    moveTo : function(x, y) { 
        this.x = this.x + x; 
        this.y = this.y + y;
        console.log(this.x); // 1
        console.log(this.y); // 1
    } 
}; 
point.moveTo(1, 1)//this 绑定到当前对象，即 point 对象
```