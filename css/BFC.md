# BFC
https://www.cnblogs.com/shenting/p/10589930.html

## 什么是BFC

在一个web页面的CSS渲染中，块级格式化上下文（Block Formatting Context）是按照块级盒子布局的。W3C对BFC的定义如下：

> 浮动元素和绝对定位元素，非块级盒子的块级容器（例如inline-blocks,table-cells和table-captions），以及overflow值不为“visible”的块级盒子，都会为他们的内容创建新的BFC（块级格式化上下文）。

为了便于理解，我们换一种方式来重新定义BFC。一个HTTP元素要创建BFC，则要满足下列的任意一个或多个条件即可：

1. float值不是none

2. position的值不是static或者relative

3. display的值是inline-block、table-cell、flex、table-caption或者inline-flex

4. overflow的值不是visible

BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直地沿着其父元素的边框排列。

## 怎么创建BFC

要显示地创建一个BFC是非常简单的，只要满足上述4个CSS条件之一就行。例如：

```
    <div class='container'>
    你的内容。。。
    </div>
```
在类container中添加类似overflow:scroll, overflow:hidden, display:flex, float:left, 或者display:table的规则来显示创建BFC。虽然添加上述的任意一条都能创建BFC，但会有一些副作用：

1. display:table可能会引发响应性问题

2. overflow:scroll可能产生多余的滚动条

3. float:left将把元素移至左侧，并被其他元素环绕

4. overflow：hidden 将裁切溢出元素

因而无论什么时候需要创建BFC，都要基于自身的需要来考虑。对于本文，将采用overflow: hidden方式：
```
.container {
    overflow: hidden
}
```

## BFC中盒子怎么对齐

... TODO