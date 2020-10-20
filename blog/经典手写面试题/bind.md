## bind 实现
<details>
<summary>实现详情</summary>

与 `call/apply` 不同 bind 返回的是一个函数

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
</details>
