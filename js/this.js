
var o = {
    a:10,
    b:{
        fn:function () {
            console.log(this.a) // undefined
            console.log(this) // { fn: [Function: fn] }
        }
    },
    c:{
        fn: ()=>{
                console.log(this) 
            }
        
    }
}

o.b.fn()

o.c.fn()

var obj={
    age:20,
    info:()=>{
            console.log(this.age)
        }
    
}
 var info = obj.info()
 info()
// -----------分割线-------------

// var o ={
//     a:10,
//     b:{
//         a:12,
//         fn:function(){
//             console.log(this.a); // 12 
//             console.log(this) // { a: 12, fn: [Function: fn] }
//         }
//     }
// }

// o.b.fn()

// -----------分割线-------------

// var o ={
//     a:10,
//     b:{
//         a:12,
//         fn:function(){
//             console.log(this.a); // undefined, 若此时在对象o外部定义a,则输出的为在其外部定义的全局变量
//             console.log(this) // window
//         }
//     }
// }
// // 将b对象下的方法赋值给temp，暂时并未调用
// var temp = o.b.fn;
// //此时调用绑定的对象是window，并非b对象直接调用
// temp(); 

// -----------分割线-------------
//在对象方法中调用
// var point = { 
//     x : 0, 
//     y : 0, 
//     moveTo : function(x, y) { 
//         this.x = this.x + x; 
//         this.y = this.y + y;
//         console.log(this.x); // 1
//         console.log(this.y); // 1
//     } 
// }; 
// point.moveTo(1, 1)//this 绑定到当前对象，即 point 对象
// console.log(point.x,point.y) // 1 1 

//--------------------

//作为函数调用时

// function someFun(x) {
//     this.x=x
// }

// // 函数调用时，this绑定的是全局对象 window，相当于直接声明了一个全局变量x,并赋值为6
// someFun(6)

// console.log(x) //6

// var point = { 
//     x : 0, 
//     y : 0, 
//     moveTo : function(x, y) { 
//        // 内部函数
//        var moveX = function(x) { 
//            this.x = x;
//        }; 
//        // 内部函数
//        var moveY = function(y) { 
//            this.y = y;
//        };
//        console.log(this)

//        moveX(x); // 这里是全局调用
//        moveY(y); 
//     }
// }; 
// point.moveTo(1, 1); 
// console.log(point.x); // 0
// console.log(point.y); // 0


// // 可以通过下面情况输出结果说明:

// var point = { 
//          x : 0, 
//          y : 0, 
//          moveTo : function(x, y) { 
//              this.x = x;
//              console.log(this.x); // 1
//              console.log(this);   // point对象

//              // 内部函数
//              var moveX = function(x) { 
//                 this.x = x;
//              }; 
//              // 内部函数
//              var moveY = function(y) { 
//                 this.y = y;
//              } 
//              moveX(x); // 这里是全局调用
//              moveY(y); 
//          } 
//     }; 
//     point.moveTo(1, 1); 
//     console.log(point.x); // 1
//     console.log(point.y); // 0
//     console.log(x); // 1
//     console.log(y);// 1

//     // 像如上对象中函数方法所示，本意是改变point对象中的x、y的值，而非新建全局变量。所以可以通过以下方法避免上述情况：

//     var point = { 
//         x : 0, 
//         y : 0, 
//         moveTo : function(x, y) { 

//             var that = this; //内部变量替换

//             // 内部函数
//             var moveX = function(x) { 
//                 that.x = x; 
//                // this.x = x;
//             }; 
//             // 内部函数
//             var moveY = function(y) { 
//                 that.y = y;
//                // this.y = y;
//             } 
//             moveX(x); //这里依然是全局调用，但是在给变量赋值时，不再是this指向，而是that指向，而that指向的对象是 point。
//             moveY(y); 
//         } 
//    }; 
//    point.moveTo(1, 1); 
//    console.log(point.x); // 1
//    console.log(point.y); // 1
//    console.log(x) // 报错 x is not defined
//    console.log(y) // 报错 y is not defined

// //    另附将moveX、moveY由内部函数改为非内部函数后的一种情况示例：这种情况下moveX、moveY方法的调用时绑定在moveTo对象上的，因为moveTo对象一开始是没有x、y变量的，所以执行 this.x = x、this.y = y之后，相当于在moveTo对象中新建了两个变量。

// var point = { 
//          x : 0, 
//          y : 0, 
//          moveTo : { 
//              // 内部函数
//              moveX: function(x) {
//                 console.log(this) // {moveX: ƒ, moveY: ƒ}
//                 this.x = x;
//              },
//              // 内部函数
//              moveY: function(y) { 
//                 this.y = y;
//              }
//          } 
//     }; 
//     point.moveTo.moveX(1); 
//     point.moveTo.moveY(1);
//     console.log(point.moveTo);  // {moveX: ƒ, moveY: ƒ, x: 1, y: 1}
//     console.log(point.x); // 0
//     console.log(point.y); // 0
//     console.log(x) // x is not defined
//     console.log(y) // y is not defined


//作为构造函数调用

// function Point(x, y){ 
//     console.log(this); // point对象
//     this.x = x; 
//     this.y = y; 
//     this.moveTo = function(x,y){
//        this.x = x;
//        this.y = y;
//        console.log(this.x);//1 10
//        console.log(this.y);//1 10
//     }
//  }
//  var p1 =  new Point(0,0); //注意这种形式方法的调用及apply、call的使用

//  var p2 = {
//     x:0,
//     y:0
// }
// p1.moveTo(1,1); 
// p1.moveTo.apply(p2,[10,10]);

// console.log(x);// x is not defined
// console.log(y);// y is not defined

// this在不同场景中的指向
//       ①匿名函数中的this指向全局对象

// var a = 10;
// var foo = {
//     a: 20,
//     fn: (function(){
//         console.log(this); // window
//         console.log(this.a); // 10
//     })()
// }

// ②setInterval和setTimeout定时器中的this指向全局对象

// var a = 10;
// var oTimer1 = setInterval(function(){
//     var a = 20;
//     console.log(this.a); // 10
//     clearInterval(oTimer1);
// },100);

// ③eval中的this指向调用上下文中的this

// (function(){
//     eval("console.log(this)"); // Window
// })();
// function Foo(){
//     this.bar = function(){
//         eval("console.log(this)"); // Foo
//     }
// }
// var foo = new Foo();
// foo.bar();

// ④apply和call中的this指向参数中的对象

// var a = 10;
// var foo = {
//     a: 20,
//     fn: function(){
//         console.log(this.a);
//     }
// };
// var bar ={
//     a: 30
// }
// foo.fn.apply();//10(若参数为空，默认指向全局对象)
// foo.fn.apply(foo);//20
// foo.fn.apply(bar);//30