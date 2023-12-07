---
title: 报错与更改
cover: https://api.likepoems.com/img/pc/
categories: 错误信息与解决
tags: 报错与更改
---
# PIXI.js
## pixi-spine 动画元素在自定义事件的回调用去删除另外一个不相关的界面动画元素报错
- **报错原因**

 pixi-spine的更新方法是同步调用pixi-js的更新方法的，并且把当前动画对象传给了pixi-js进行更新，双方都没有做任何限制处理，因为pixi-js这边删除了元素，但是pixi-spine没有，还把这个动画对象传给pixi-js，就直接报错

- **报错信息**
```javascript
Uncaught TypeError: Cannot read properties of undefined (reading 'visible')
```

- **心路历程**
报错的第一反应，我以为是调用destroy方法删除元素导致其他哪里没关停，还在一直调用导致的，但，很可惜我把所有监听都关了，直接删也是报错，只要是在pixi-spine的事件中删除的，都会这样，然后我就去github上找，结果官方的问题库里面19年就有人提过，因为用不到后续版本的，所以不知道后续有没有修复这个问题
[官方问题地址](https://github.com/pixijs/spine/issues/316)

- **源码信息**
```javascript
// pixi-spine
PIXI.spine.Spine.prototype.autoUpdateTransform = function () {
  if (PIXI.spine.Spine.globalAutoUpdate) {
    this.lastTime = this.lastTime || Date.now();
    var timeDelta = (Date.now() - this.lastTime) * 0.001;
    this.lastTime = Date.now();
    this.update(timeDelta);
  }
  else {
    this.lastTime = 0;
  }
  // 这句是重点，同步调用，并且把当前动画对象this绑定了过去
  PIXI.Container.prototype.updateTransform.call(this);
};
// pixi-js
PIXI.Container.prototype.updateTransform = function updateTransform() {
  this._boundsID++;
  this.transform.updateTransform(this.parent.transform);
  this.worldAlpha = this.alpha * this.parent.worldAlpha;
  for (var i = 0, j = this.children.length; i < j; ++i) {
    var child = this.children[i];
    //这里没有判断一下child是否还存在，就导致了报错
    if (child.visible) {
      child.updateTransform();
    }
    // 改，加个判断即可
     if (child&&child.visible) {
      child.updateTransform();
    }
  }
};
```

- **解决方法**
1. 可以在删除动画元素的外面套一层延时，setTimeout，但是github上有大佬说，这样的解决方法是丑陋的
2. 就像我上边这样，直接改覆盖源码，不过大佬是改的pixi-spine的源码，就是 `PIXI.Container.prototype.updateTransform.call(this)` 这句加判断，不过我没成功，我在这个里面打印 `this._destroyed`一直是false，只用到控制台，我手动把这个this对象展开，才可以看到 `_destroyed`属性变了，可能也是同步的原因，我没深挖，因为苦逼的我还要改bug
```javascript
if (!this._destroyed) {
    Container.prototype.updateTransform.call(this);
}
```

- **总结**
我这个是`pixi@4.8`的版本，`pixi-spine@1.6.2`的版本，因为公司需求不需要太高的版本，求稳，并且高版本的pixi-spine还要跟pixi-js的版本要匹配，很麻烦，不匹配的话动不动就报错的，因为pixi引擎和pixi-spine第三方库社区不是很活跃，所以百度什么的，具体问题很难搜索到答案，这里也是遇到了，记录一下

# Vue
## vueRouter 编程式导航push同一个路径报错
- **报错原因**
`vue-router3.1.0`之后, `push()`和`replace()`都引入了`Promise的语法判断`， 如果没有通过参数指定回调函数就返回一个promise来指定成功/失败的回调, 且内部会判断如果要跳转的路径和参数都没有变化, 会抛出一个失败的promise
- **报错信息**
```javascript
Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location: "/testPage1".
```
- **源码信息**
```javascript
 push (location: RawLocation, onComplete?: Function, onAbort?: Function) {
    if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) =- {
        this.history.push(location, resolve, reject)
      })
    } else {
      this.history.push(location, onComplete, onAbort)
    }
  }
```
- **解决方法**
1. 判断条件不进入Promise的里面即可，手动传入onComplete参数，例如：`this.$router.push(path,()=>{});`或者直接处理一下失败的信息 `this.$router.push(path).catch(()=>{});`
2. 重写push和replace方法
```javascript
const originPush = Router.prototype.push;
const originReplace = Router.prototype.replace;
Router.prototype.push = function (location, res, rej) {
  if (res || rej) return originPush.call(this, location, res, rej);
  originPush.call(this, location, () =- { }, () =- { });
}
Router.prototype.push = function (location, res, rej) {
  if (res || rej) return originReplace.call(this, location, res, rej);
  originReplace.call(this, location, () =- { }, () =- { });
}
```

# 编译错误
## vite项目引用postCss在config.js中写法有误

- **报错信息**
```javascript
This file is being treated as an ES module because it has a '.js' file extension
```

- **报错原因**
原因就是postCss的config.js提示的写法是 `module.exports` 但是vite的默认是Es的写法 `export default`

- **修改方法**
1. 修改方法就是改一下代码
2. 修改不了的就下载 `babel`的相关依赖
```javascript
npm install --save-dev babel-core babel-loader babel-preset-env babel-preset-stage-3
```
安装完成后在项目中添加文件.babelrc
```javascript
{
"presets": [
    ["env", {"modules": false}],
    "stage-3"
]}
```
# 未完待续。。。。。。





