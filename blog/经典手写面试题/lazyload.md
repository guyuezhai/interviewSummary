 ## 实现 `lazyLoad` 懒加载图片
 **应用场景**

在一些图片量比较多的网站，如果一打开页面就去加载所有的图片，那么难免会造成卡顿和白屏的现象，如果根据屏幕滚动一点点去加载可视区中的图片，就会有很好的性能提升。
<details>
<summary>实现详情</summary>

我们可以给 `class="img-lazy"`的 `div` 一个固定的宽高，及背景颜色，当图片没有加载出来时显示出骨架；给 `img` 标签一个 `data-src` 属性配置真实的图片资源地址,当元素出现在可是区域时把真实的地址赋值给 `src` 属性，加载真正的图片。

```html
<div class="img-lazy">
    <img class="pic-lazy" alt="加载中" data-src="./images/demo1.png">
<div>
```

```javascript
//获取所有的图片标签
const imgs = document.getElementsByTagName('img')

//获取可视区高度

const viewHeight = window.innerHeight || document.documentElement.clientHeight;
//index 用于统计当前显示到了哪一张图片，避免重复检测图片
let index = 0

function lazyLoad(){
    for (let i = index; i < imgs.length; i++) {
        //可视区高度减去当前元素顶部距离可视区的高度
        
        let dis = viewHeight - imgs[i].getBoundingClientRect().top;

        //如果dis>=0 说明当前元素即将或者已经进入可视区域
        if(dis>=0){
            //给当前进入可视区域的图片 添加真实的src,显示图片
            imgs[i].src = imgs[i].getAttribute('data-src')

            //当前图片加载完毕，下次循环检测从 i+1 个元素开始
            index= i+1
        }
    }
}

window.addEventListener('scroll',lazyLoad,false)
             
```
</details>