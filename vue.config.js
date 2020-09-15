var { _CONFIG } = require("./config.js");

module.exports = {
  publicPath: "/",
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
      }
    },
  },
};
