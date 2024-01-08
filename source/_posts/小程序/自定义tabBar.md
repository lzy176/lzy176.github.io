---
title: 自定义tabBar
cover: https://picsum.photos/1920/1080?id=9
categories: 小程序
tags: 小程序自定义tabBar
---

# 第一步：在`app.json`文件中修改配置
    ![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E8%87%AA%E5%AE%9A%E4%B9%89tabBar/image.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1704450963;865704364563&q-key-time=1704450963;865704364563&q-header-list=&q-url-param-list=&q-signature=e4d068676dd72813db5dd7a351061672746499a6)
    1、将需要切换的页面配置到`pages`里面,因为只有在这个里面的页面路径才能渲染到页面上
    2、配置属性`tabBar`,是设置`custom`为true，`list`列表不能为空，这里把你需要切换的页面路径配置一下即可
# 第二步：在项目根目录下创建一个名称为`custom-tab-bar`的文件夹，然后往这个文件夹里面创建名称为`index`的四个通用文件
![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E8%87%AA%E5%AE%9A%E4%B9%89tabBar/image%281%29.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1704679522;865704593122&q-key-time=1704679522;865704593122&q-header-list=&q-url-param-list=&q-signature=8eaed1a4d6114616b0fa825a18f01dee7eff98da)
# 第三步：就是在这个文件里面创建你的自定义`tabBar`就可以了，我这里直接使用的`tdesign`第三方UI库的组件生成的
![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E8%87%AA%E5%AE%9A%E4%B9%89tabBar/image%284%29.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1704680197;865704593797&q-key-time=1704680197;865704593797&q-header-list=&q-url-param-list=&q-signature=5c1992d57a5e88da8caf299636d4164bceecd8d3)

**注意：自定义的这里我添加了两个属性，一个path一个value，这两个属性在跳转tab页是有用的，一个是定位跳到那个页面的path，一个是tab栏激活那个状态value**

# 第四步：添加跳转逻辑与各个分页显示的时候的回显value

文件custom-tab-bar/index.js
![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E8%87%AA%E5%AE%9A%E4%B9%89tabBar/image%282%29.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1704680471;865704594071&q-key-time=1704680471;865704594071&q-header-list=&q-url-param-list=&q-signature=f37b886633063011047cc6cd04b72e4e149b473b)
文件pages/home/home.js (这里就是举例一个页面，实际上是你有多少个tab页面就要写多少次)
![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/%E5%B0%8F%E7%A8%8B%E5%BA%8F/%E8%87%AA%E5%AE%9A%E4%B9%89tabBar/image%285%29.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1704680551;865704594151&q-key-time=1704680551;865704594151&q-header-list=&q-url-param-list=&q-signature=acf8449c2572857dac200eb8dde637071d4c67d5)

# 总结：这种方式有点卡，个人感觉，切换tab的时候，需要刷新整个页面，能清晰的看到刷新的效果，我只是简单的一个例子，并没有写页面和添加数据，就已经感觉不怎么样了
