## bind 实现

bind 返回的是一个函数

```javascript
Function.prototype.myBind = function(){
    let [context,args] = [...arguments]
    let _this = this;
    return function Fun(){
        //考虑使用new的情况
        if(this instanceof Fun){
            return new _this(...args,...arguments)
        }
        return _this.apply(context,args.concat(arguments))
    }
}
```