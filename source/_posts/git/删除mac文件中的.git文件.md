---
title: 删除mac文件中的.git文件
cover: https://picsum.photos/1920/1080?id=5
categories: git
tags: git
---

> 删除这个文件的原因，是因为当前这个hexo博客的主题anzhiyu文件，在我向github去push代码的时候，发现push上去的文件没有anzhiyu这个主题文件，我尝试下载下来，结果是空文件夹，所以，我查找原因，发现是这个主题文件也关联了作者的git，所以解决方法就简单了，删除作者信息的.git文件即可

# Mac与Windows文件系统的区别

没有多深层，就是查找隐藏文件的方式不同，Windows可以直接在当前文件右键获取到文件详细信息，包括隐藏的，而Mac的不可以，需要使用终端指令才可以

# Mac查找与删除文件

1. 先进入到当前需要删除文件的文件夹中，可以用终端cd一步一步进去，或者直接获取这个文件的相对位置也可以直接进去哈
2. 执行命令`ls -a`，必须-a才可以看到所有文件哈
3. 删除指令`rm -rf <需要删除文件的名字>`
4. 再执行命令`ls -a`，应该就可以看到删除后的文件集合了

