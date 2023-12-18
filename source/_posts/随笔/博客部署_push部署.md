---
title: 博客部署(push代码自动部署)
cover: https://picsum.photos/1920/1080?id=4
categories: 随笔
tags: 博客搭建
---




> 不需要记住hexo官网的一键部署的指令，只需要你博客书写完成向github去push代码，即可自动部署成功，这是又查找了资料，在失败了十几次的情况下，功夫不负有心人，我成功了

# 获取github的Token
- **点击github右上角自己的头像，打开设置Settings**
![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/%E5%8D%9A%E5%AE%A2%E9%83%A8%E7%BD%B2/1.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1702015601;8641701929201&q-key-time=1702015601;8641701929201&q-header-list=&q-url-param-list=&q-signature=cab0e6ec93f221ce0bc835e92120b4ea5e0936d5)
- **左侧选项往下滑，选择开发者设置Developer Settings**
![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/%E5%8D%9A%E5%AE%A2%E9%83%A8%E7%BD%B2/2.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1702015724;8641701929324&q-key-time=1702015724;8641701929324&q-header-list=&q-url-param-list=&q-signature=8f9940408302b30c06c51d45e33542da49196758)
- **左侧选择个人访问令牌，新创建一个经典令牌**
![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/%E5%8D%9A%E5%AE%A2%E9%83%A8%E7%BD%B2/3.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1702015871;8641701929471&q-key-time=1702015871;8641701929471&q-header-list=&q-url-param-list=&q-signature=8d7a30f1cb27deb352a80e6e0ee30d40b9173b30)
- **Note就是个名字，自定义即可，下面的Expiration根据个人需求啊，我懒得重新弄，所以直接永久的，再往下Select scopes所有选项全选，箭头向下也有很多，都选上**
![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/%E5%8D%9A%E5%AE%A2%E9%83%A8%E7%BD%B2/4.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1702015973;8641701929573&q-key-time=1702015973;8641701929573&q-header-list=&q-url-param-list=&q-signature=da5bcbad76091540fadb169bdec8ab8e750ee67c)

> 完成后保留这个token，因为不能明文使用，所以需要给自动工程添加一个任务用这个token，获取一个可以明文使用的代表字段

# 加密Token

- **打开项目的设置，这里不是头像的了哈，两个不一样，然后选择图中的加密选项里面的自动设置**
![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/%E5%8D%9A%E5%AE%A2%E9%83%A8%E7%BD%B2/5.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1702016287;8641701929887&q-key-time=1702016287;8641701929887&q-header-list=&q-url-param-list=&q-signature=a33bba21afc36af59ae21870bebb54af47c3f657)

- **这里因为我是设置过了哈，所以会有一项，没设置的直接新创建即可**
![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/%E5%8D%9A%E5%AE%A2%E9%83%A8%E7%BD%B2/6.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1702016373;8641701929973&q-key-time=1702016373;8641701929973&q-header-list=&q-url-param-list=&q-signature=4153f01fe52925ce28c673c1fc2af9f5a408c2ea)

- **这里的Name注意啊，是需要保留的，需要明文访问的，跟你后续上传代码，自动部署有关联，虽然自定义，但是定义一个你能懂的即可，下面Secret就是上面保留的Token，粘贴过来就可以了**
![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/%E5%8D%9A%E5%AE%A2%E9%83%A8%E7%BD%B2/7.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1702016445;8641701930045&q-key-time=1702016445;8641701930045&q-header-list=&q-url-param-list=&q-signature=7d5551bc83e22eb68ffccb550cf9677e00234834)

> 到这github上的设置就结束了，剩下就是代码添加一个自动执行打包的文件就可以了，hexo官网上面那个可能是因为我的带主题，所以不管用，这里我是找到的一个写好的并且能用的 `https://github.com/theme-keep/hexo-deploy-github-pages-action`

# 添加自动部署代码

- 按照官网的步骤，在整个项目的根目录，创建一个`.github文件夹`，然后再创建一个`workflows文件夹`，最后添加咱得自动代码文件`hexo-deploy.yml`
![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/%E5%8D%9A%E5%AE%A2%E9%83%A8%E7%BD%B2/8.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1702016944;8641701930544&q-key-time=1702016944;8641701930544&q-header-list=&q-url-param-list=&q-signature=2beb30b1c7f29c4c9bc427555096f49545790f67)

- **在这个文件中填写代码，它这个意思呢，就是检测你那个分支的代码有提交，我的是`master`，这个分支有提交，就会自动打包，把最后的包创建到下面配置的分支中，我的是`gh-pages`，这样，你提交的代码源码分支就可以隐藏起来，保护你个人的小秘密**
```
name: Pages

on:
  push:
    branches:
      - master # default branch
jobs:
   build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@master
      - name: Build and Deploy
        uses: theme-keep/hexo-deploy-github-pages-action@master # 使用专门部署 Hexo 到 GitHub pages 的 action
        env:
            #以下的配置按照自己的来啊
          PERSONAL_TOKEN: ${{ secrets.HEXO_DEPLOY }} # secret 名
          PUBLISH_REPOSITORY: 名字/仓库名 # 公共仓库，格式：GitHub 用户名/仓库名
          BRANCH: gh-pages # 分支，填 gh-pages 就行
          PUBLISH_DIR: ./public # 部署 public 目录下的文件
```

> 最后，你可以尝试添加一篇文章，然后直接push代码到github，它就自动部署完成了，非常Easy，这样的好处就是不用记hexo的指令了，并且，因为用hexo一键部署的指令，它会把github自定义的域名清除了，强制部署到github.io的链接上，还要手动再次添加域名，很麻烦




