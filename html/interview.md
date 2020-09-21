## docContentLoad 和 onload 区别

```
onLoad是的在页面所有文件加载完成后执行

DomContentLoad是Dom加载完成后执行，不必等待样式脚本和图片加载
```
## 0.5px边框怎么做
### 方式1：border+border-image+线性渐变linear-gradient
```html
<div clss="border">0.5px边框</div>
<style>
.border{
    width:200px;
    height:200px;
    margin:0 auto;
    border-bottom:1px solid transparent;
    border-image:linear-gradient(to bottom,transparent 50%,red 50%) 0 0 100%/1px 0;
}
</style>
```
### 方式2：定位+伪元素+background+线性渐变linear-gradient
```html
<div clss="border">0.5px边框</div>
<style>
.border{
    width:200px;
    height:200px;
    margin:0 auto;
    position:relative;
}
.border::before{
    content:" ";
    position:absolute;
    left:0;
    bottom:0;
    width:100%;
    height:1px;
    background-image:linear-gradient(to bottom,transparent 50%,red 50%)
}
</style>
```
### 方式3：定位+伪元素+transform缩放(scale)
```html
<div clss="border">0.5px边框</div>
<style>
.border{
    width:200px;
    height:200px;
    margin:0 auto;
    position:relative;
}
.border::before{
    content:" ";
    position:absolute;
    left:0;
    bottom:0;
    width:200%;
    height:200%;
    border:1px solid red;
    transform-origin:0 0;
    transform:scale(0.5)
}
</style>
```


