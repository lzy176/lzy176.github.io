var posts=["2023/12/06/Error/","2024/01/30/Player/","2023/12/18/CocosCreator/spine动画/","2023/12/04/javascript/闭包篡改/","2023/12/11/git/github使用SSH/","2023/12/08/git/删除mac文件中的.git文件/","2024/01/08/小程序/自定义tabBar/","2023/12/07/随笔/博客搭建/","2023/12/08/随笔/博客部署_push部署/","2023/12/07/随笔/博客部署_一键部署/","2024/03/20/随笔/预览文档/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };