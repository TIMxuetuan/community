var { _CONFIG } = require("./config.js");
console.log("_CONFIG.api",_CONFIG.api)
module.exports = {
  publicPath: "/bbs", //正式打包时需要添加bbs
  outputDir: "dist", // 构建输出目录
  assetsDir: "assets", // 静态资源目录 (js, css, img, fonts)
  devServer: {
    proxy: {
      //社区的接口 用来测试
      "/shequ": {
        target: `${_CONFIG.api}/User/login`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/shequ": "" }
      },
      //圈子列表
      "/circleList": {
        target: `${_CONFIG.api}/Category/categoryList`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/circleList": "" }
      },
      //帖子类型列表
      "/typeList": {
        target: `${_CONFIG.api}/Category/typeList`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/typeList": "" }
      },
      //帖子列表
      "/documentList": {
        target: `${_CONFIG.api}/Document/documentList`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/documentList": "" }
      },
      //点赞
      "/giveLike": {
        target: `${_CONFIG.api}/Document/like`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/giveLike": "" }
      },
      //帖子详情
      "/postDetails": {
        target: `${_CONFIG.api}/Document/document`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/postDetails": "" }
      },
      //所有评论
      "/commentlist": {
        target: `${_CONFIG.api}/Document/commentlist`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/commentlist": "" }
      },
      //发表评论
      "/comment": {
        target: `${_CONFIG.api}/Document/comment`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/comment": "" }
      },
      //展开更多评论
      "/moreComment": {
        target: `${_CONFIG.api}/Document/more_comment`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/moreComment": "" }
      },
      //我的--已发帖子
      "/userYftz": {
        target: `${_CONFIG.api}/User/yftz`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/userYftz": "" }
      },
      //我的--删除帖子
      "/deleteMy": {
        target: `${_CONFIG.api}/User/delete`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/deleteMy": "" }
      },

      //我的--上传图片
      "/shangchuan": {
        target: "https://www.zjtaoke.cn/trains2/uploadFiles",
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/shangchuan": "" }
      },

      //内容发布--帖子
      "/postedInvitation": {
        target: `${_CONFIG.api}/User/posted`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/postedInvitation": "" }
      },

      //帖子类型管理--添加帖子类型
      "/addType": {
        target: `${_CONFIG.api}/Sns/add_type`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/addType": "" }
      },

      //帖子类型管理--删除帖子类型
      "/delType": {
        target: `${_CONFIG.api}/Sns/del_type`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/delType": "" }
      },

      //圈子管理--查询圈子
      "/category_list": {
        target: `${_CONFIG.api}/Sns/category_list`,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/category_list": "" }
      },
    }
  }
};
