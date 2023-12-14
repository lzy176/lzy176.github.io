var posts=["2023/12/06/Error/","2023/12/11/git/github使用SSH/","2023/12/08/git/删除mac文件中的.git文件/","2023/12/04/javascript/闭包篡改/","2023/12/07/随笔/博客搭建/","2023/12/08/随笔/博客部署_push部署/","2023/12/07/随笔/博客部署_一键部署/","2023/12/14/随笔/游戏攻略_限时/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };