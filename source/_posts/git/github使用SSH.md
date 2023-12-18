---
title: github使用SSH
cover: https://picsum.photos/1920/1080?id=6
categories: git
tags: github
---

# 1、使用SSH链接git的好处

- 使用ssh链接的好处在于不用每次传输代码，或者克隆代码需要验证github的账号和密码，减少了一些繁琐的操作
- 还可以提高push或者pull的效率，特别是在网络不好的情况下，无法通过http有效链接github的时候

# 2、生成SSH

`ssh-keygen -t rsa -C "你的邮箱"`不过不重要，只是用作生成ssh的名称，没有约束性质

> 这个指令输入之后会有几次询问，直接默认三连回车即可，就是问你是否确认存放位置，输入密码和确认密码

# 3、获取SSH

`cat ~/.ssh/id_rsa.pub` Mac使用这个指令，直接获取一个非常长的字符串，全部复制即可，Windows好像是在C盘自己的文件夹里面

# 4、github配置SSH

![image](https://lzy-0726-1258536249.cos.ap-beijing.myqcloud.com/thumbnail/%E5%8D%9A%E5%AE%A2%E9%83%A8%E7%BD%B2/image2.png?q-sign-algorithm=sha1&q-ak=AKIDLVRIBuUuOtMcgeRVYUIyfDh5h4DA2kGg&q-sign-time=1702282931;8641702196531&q-key-time=1702282931;8641702196531&q-header-list=&q-url-param-list=&q-signature=a199da1273285b52fdcde4bc4cd9125aa7b6cab2)

把上面获取的SSH超长字符串粘贴上去确定即可

# 5、测试SSH下载代码

因为我已经绑定好了，所以克隆会直接下载，没有确认那一步，我就说一下，第一次git clone <github你复制的ssh链接>，然后终端会出现一个提示

```javascript 
Are you sure you want to continue connecting (yes/no/[fingerprint])? 
看到这句提示的时候直接回车是没有用的哈，这里很坑，需要手打一个yes才可以
```
