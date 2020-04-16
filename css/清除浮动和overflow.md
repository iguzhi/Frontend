## 父元素如何围住浮动子元素
https://www.cnblogs.com/jeacy/p/9741509.html

问题背景: 当子元素使用float属性, 将脱离文档流, 因此父元素便不会包围它.

### 三种解决方法

1. 为父元素设置overflow：hidden [深入理解：overflow:hidden——溢出,坍塌,清除浮动](https://www.cnblogs.com/jeacy/p/9741509.html)

2. 浮动父元素, 并且设置宽度width: 100%; 其后的元素要设置clear: both. 浮动父元素后, 不管子元素是否浮动, 它都会紧紧包围住自己的子元素.

3. 父元素内容末尾添加非浮动子元素, 可以直接加一个空元素, 也可以使用clearfix伪类添加. 
   给父元素最后添加一个非浮动的子元素, 然后清除该子元素.由于父元素一定会包含非浮动的子元素, 通过把这个子元素放在浮动元素的下方, 就可以保证父元素一定会包住这个元素, 同时也会包住前面的浮动元素.


## 深入理解：overflow:hidden——溢出,坍塌,清除浮动
https://blog.csdn.net/Hukaihe/article/details/51298665

overflow: hidden是overflow属性的一个神奇用法, 它可以帮助我们隐藏溢出的元素, 清除浮动和解除坍塌.

1. 使用overflow：hidden隐藏溢出
   当父div拥有固定的高度时，比如height:500px,我们使用overflow:hidden来隐藏溢出。 

2. 使用overflow：hidden清除浮动
   当父元素的高height:auto时，我们使用overflow：hidden清除浮动

3. 解除坍塌
   可以使用overflow:hidden解除margin坍塌，当然了，坍塌是不分父div的高度是否固定的


## 清除浮动
https://www.cnblogs.com/shenting/p/10584583.html

如果父元素只包含浮动元素，且父元素没有设置高度和宽度的时候，那么他的高度就会缩减为零。这是因为浮动元素脱离了标准流，包含他们的父框中没有内容了，所以出现了“高度坍塌”的问题。

解决“塌陷”有以下几种方法：

1. 使用带clear属性的空元素
   在父块中、浮动元素后用一个空元素，如`<div class="clear"></div>`，并在css中赋予 `.clear{ clear : both }`属性即可清除浮动。也可以使用`<br class="clear" />`或`<hr class="clear" />`来进行清除。给空元素设置clear后，因为它的左右两边不能有任何浮动元素，所以空元素下移到浮动元素的下方。而空元素又包含在父块中，相当于把父块撑开了，视觉上起到了父块包含浮动元素的效果。

2. 使用CSS的overflow属性
   给浮动元素的容器加上`overflow: hidden`或者`overflow: auto`。在父元素上设置overflow这个属性，父元素就会扩展包含浮动，这个方法有比较好的语义。但是要记住一点，overflow属性不是为了清除浮动而定义的，要小心不要覆盖住内容或者触发了不需要的滚动条。

3. 给浮动元素的容器添加浮动
   给浮动元素的容器添加浮动属性即可清除浮动，但是这样会使下一个元素受到这个浮动元素的影响，不推荐使用。

4. 使用CSS的伪元素
   这种方式这样理解，就是利用伪类元素，也就是在有浮动的标签前面添加一个块级元素，来达到效果。

```
   .clearfix:after{
      content:"";
      display:table;
      height:0;
      visibility:both;
      clear:both;
   }

   .clearfix{
      *zoom:1;    /* IE/7/6*/
   }
```