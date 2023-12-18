---
title: Cocos Creator 的Spine动画学习笔记
cover: https://picsum.photos/1920/1080?id=8
categories: Cocos_Creator
tags: ['spine','学习笔记']
---




![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/CocosCreator/image.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1702892075;8641702805675&q-key-time=1702892075;8641702805675&q-header-list=&q-url-param-list=&q-signature=214530089c0d2c50ca966281bb6adbfcaec3f214)

# 放入动画资源
> 在资源管理器里面创建一个文件夹放入动画文件，都放一起，应该是3个文件（图片，json，atlas），上面图片里面蓝色箭头所指的第四个文件是创建的预制体，作用下面有解释，这里不用在意

# 场景中创建动画
> 层级管理器添加一个空节点，然后给这个节点的属性检查器添加一个``Skeleton``组件，然后把资源管理器中的动画资源中的json文件，就是绿色框框的拖拽到``SkeletonData``中即可，把下面的``Premultiplied Alpha``勾选掉，要不然你的动画会有描边，看的很难受


# 场景中创建，代码中获取
> 在需要用到动画的代码中添加装饰器属性
```typescript
export class GameManager extends Component{
    @property({ type: sp.Skeleton })
    public 动画名称: sp.Skeleton | null = null;
}
```
![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/CocosCreator/image%281%29.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1702892736;8641702806336&q-key-time=1702892736;8641702806336&q-header-list=&q-url-param-list=&q-signature=22c3bc139d696572d318eb94fcfeda732d56c60f)
**动画名称就是你在代码中操作的动画对象，自定义即可，添加完成后，``GameManager``对应的节点的``属性检查器``就会出现一个自定义动画名的属性，然后将层级管理器中也就是场景中的那个动画文件，拖拽到那个属性后面，这样，代码中的就激活了，就可以获取到动画了**

# 场景中不需要展示，代码中创建
> 这里就需要我上面的预制体了，预制体的制作就是从层级管理器中把对应组件拖拽到下面的资源管理器中就可以了，然后在``GameManager``中，添加代码
```typescript
assetManager.loadBundle('spine', (err, bundle) => {
    bundle.load('kaishiye/kaishiye2', Prefab, (err2, prefab) => {
        const node = instantiate(prefab);//复制预制体
        const canvas = find('UICanvas');//找到需要放置的场景容器
        canvas.addChild(node);
        this.skeleton = node.getComponent(sp.Skeleton);//指定加载成动画类型
        this.skeleton.setAnimation(0, 'idle', true);
        node.setSiblingIndex(1);//调节层级关系
    })
 })
```
**注意，上述方法使用了``loadBundle``加载本地资源，所以你需要把资源管理器中对应的放置动画文件的文件夹改成``Bundle``形式的才可以**
![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/CocosCreator/image%282%29.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1702893331;8641702806931&q-key-time=1702893331;8641702806931&q-header-list=&q-url-param-list=&q-signature=cd06db743b586fbce5d15caba0896e24f6ca0661)



