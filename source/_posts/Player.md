---
title: 学而思-Player
cover: https://picsum.photos/1920/1080?id=10
categories: Player
tags: Player
---

# 前言
当前player的版本为[pixi.js@6.5.1](https://pixijs.download/v6.5.10/docs/index.html)、[pixi-spine@3.12](https://github.com/pixijs/spine/blob/master/examples/index.md)、[@pixi/sound@4.4.1](https://pixijs.io/sound/examples/) 如果遇到Api不支持的可以去查看对应版本的官网，我这边就不一一列举了，因为我也不知道暗改了多少，只能把明面用的上的写一下

# 编辑器问题
编辑器还没有升级，所以不支持上传3.7以上版本的动画，并且，编辑器默认上传的动画是勾选了自动播放和循环播放的，老版的可能不用管，进页面也不播放，必须手动调用，但是新版的会自动播放，这点注意下放在舞台上的动画配置项

# 自己尝试调整课件发现的问题
```javascript
旧版本中，你可以这样的形式创建一个透明图形
const mask = new PIXI.Graphics();
      mask.beginFill(0x000000, 0);
新版本中，beginFill的第二个参数必须是大于0的，
你想玩透明交互的话，必须在这个图形下面去设置alpha
      mask.alpha = 0；
```



# @pixi/sound
## 版本命名
在github的发布版本中可以看到，从4.0.0版本开始`pixi-sound`改名为`@pixi/sound`所以如果有两个依赖包的不要惊讶，这俩是一个东西
## 引入用法
具体用法差别不大，主要因为`pixi.js`从5.0.0开始就使用了分包，所以，全局的`PIXI.sound`没有了，想要自己使用的，就在对应的js文件引入，自己挂全局`import { sound } from '@pixi/sound'`
## 旧版本问题
我看之前创建的元素身上有一个`sound`属性，可以直接对当前元素使用，版本升级以后也没有了，有这样使用的也注意一下
## 新版本问题
如果你要在代码中自己引入使用的话，需要注意的是，有一些属性是直接获取不到了，例如`duration`，之前的可以play播放，有个返回值，然后这个返回值对象直接获取`duration`或者你从`sound`全局这个对象身上的`_sounds`上面通过id获取到对应播放对象去获取`duration`都是有可能报错的，具体原因我也不知道，有人提这个问题，说是音频没有预加载就会这样，但是我在add中添加了预加载，把`preload`属性设置成true也是不好使，可能我太菜了
# pixi-spine
## 引入用法
同样的，旧版本`PIXI.spine.Spine`，这种形式弃用了，新版本想使用的话，就自己在想用的那个文件引入`import { Spine } from 'pixi-spine'`其他的应该差别不大，动画就是创建需要用一下，我在player包直接封装好了，下面有Api，想省事的，直接创建就可以

# 总结
自己引入的时候注意点，有报错改报错，方便的就使用封装好的，其实就是我在player中把方法都包了一层方法，挨个简单使用了一下，没有问题了，如果在使用期间`有别的方法需要使用的，我可以添加上去，最好咱以后课件全用封装好的方法拼一个出来，完美`还有问题的，错误问题的，可以跟我联系，手机号:176 **** ****
# player封装的声音Api

### 基础前缀 tp.TPixiSound.xxxx

### 播放音频 play({id:xx,bv:废弃,loop:xx,onComplete:xx})
注意： 参数bv废弃了，之前用是因为元素身上会有sound属性，现在没有了，再这样传递会有问题，我直接废弃掉了，传入元素id即可
| 参数 | 是否必填 | 作用 |  
| ---  | ---      | ---  |
|  id  | 是       | 查找对应元素 |
| loop | 否       | 是否循环播放，默认false|
|  onComplete  | 否       | 播放完成后的回调函数|
### 停止音频 stop({id:xx})
注意：这个是单独停止一个音频，不能继续恢复
| 参数 | 是否必填 | 作用 |  
| ---  | ---      | ---  |
|  id  | 是       | 查找对应元素 |
### 停止所有音频 stopAll()
注意：这个停止所有的音频，不能继续恢复
### 暂停音频 pause({id:xx})
注意：这个是单独暂停一个音频，可以恢复
| 参数 | 是否必填 | 作用 |  
| ---  | ---      | ---  |
|  id  | 是       | 查找对应元素 |
### 恢复音频 resume({id:xx})
注意：这个是单独恢复一个音频继续播放，从哪停止从哪开始
| 参数 | 是否必填 | 作用 |  
| ---  | ---      | ---  |
|  id  | 是       | 查找对应元素 |
### 设置音频音量 setVolume({id:xx,volume:xx})
| 参数 | 是否必填 | 作用 |  
| ---  | ---      | ---  |
|  id  | 是       | 查找对应元素 |
|volume  | 是       | 音量大小 |
### 获取音频时长 getDuration({id:xx})
注意：这个方法返回一个Promise，成功返回时长
| 参数 | 是否必填 | 作用 |  
| ---  | ---      | ---  |
|  id  | 是       | 查找对应元素 |
### 获取音频是否播放的状态 isPlaying({id:xx})
| 参数 | 是否必填 | 作用 |  
| ---  | ---      | ---  |
|  id  | 是       | 查找对应元素 |
### 获取音频对象 getSoundById({id:xx})
注意：觉得我封装的方法没自己写的好的，这个方法获取的事音频对象，自己看看有啥方法，自己调用即可
| 参数 | 是否必填 | 作用 |  
| ---  | ---      | ---  |
|  id  | 是       | 查找对应元素 |

# player封装的动画Api

### 基础前缀 tp.TPixiSpine.xxxx

### 创建动画 createAnimation({id:xx})

### 播放动画 playAnimation({ spineTarget, spineName, loop, onComplete })
| 参数 | 是否必填 | 作用 |  
| ---  | ---      | ---  |
|  spineTarget  | 是       | 需要播放的动画目标 |
|  spineName  | 是       | 需要播放的动画状态 |
|  loop  | 否       | 是否循环动画，默认false |
|  onComplete  | 否       | 动画不循环，在播放结束时的回调函数 |

### 控制动画播放帧 ControlAnimationTrack({ AnimationTrack, TrackMin, TrackMax })
注意：这是一个class对象，使用的时候需要关键字new
| 参数 | 是否必填 | 作用 |  
| ---  | ---      | ---  |
|  AnimationTrack  | 是       | 动画轨迹，就是播放动画返回的值 |
|  TrackMin  | 是       | 轨迹最小值 |
|  TrackMax  | 是       | 轨迹最大值 |

用法：
```javascript
    // 灯泡动画返回状态
    this.lampBulbAnimationStatus = playAnimation({
        spineTarget: this.lampBulbAnimation,
        spineName: 'idle1',
    });
    // 最大值和最小值就是你在游戏中交互的那个距离，例如我有一个滑块，
    // 这个滑块的x最大值和最小值对应的这个动画的开始帧和结束帧，可以
    // 滑动看到动画的变化，只要传递中间的x值即可
    this.MoveAnimationTrack = new ControlAnimationTrack({
        AnimationTrack: this.lampBulbAnimationStatus,
        TrackMin: 0.1,
        TrackMax: 1
    });
    this.MoveAnimationTrack.moveTrack(0.1);
```
### 引导手势点击动画 clickHandAnimation({ handAni, posX, posY, handAniName })
| 参数 | 是否必填 | 作用 |  
| ---  | ---      | ---  |
|  handAni  | 是       | 手势动画 |
|  posX  | 是       | 手势动画点击的X位置 |
|  posY  | 是       | 手势动画点击的Y位置 |
|  handAniName  | 否       | 手势动画状态，默认:zhiyin |
### 引导手势拖拽动画 dragHandAnimation({ handAni, startX, startY, endX, endY, startAniName ,endAniName })
| 参数 | 是否必填 | 作用 |  
| ---  | ---      | ---  |
|  handAni  | 是       | 手势动画 |
|  startX  | 是       | 手势动画拖拽开始位置X |
|  startY  | 是       | 手势动画拖拽开始位置Y |
|  endX  | 是       | 手势动画拖拽结束位置X |
|  endY  | 是       | 手势动画拖拽结束位置Y |
|  startAniName  | 否       | 手势动画开始状态，默认:start |
|  endAniName  | 否       | 手势动画开始状态，默认:end |
### 停止手势动画 stopHandAnimation()
就是停止了手势动画的TweenMax，单独的