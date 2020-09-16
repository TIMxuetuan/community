import { post, postJson } from "./util";

const Services = {
  loginApi: {
    userLogin(data, jiamiData) {
      console.log("/shequ");
      // return post("/User/login", data);
      return post("/shequ", data, 2, jiamiData);
    },

    //圈子列表
    circleList(data) {
      console.log(postJson);
      return post("/circleList", data, 2);
    },

    //帖子类型列表
    typeList(data) {
      console.log(postJson);
      return post("/typeList", data, 2);
    },

    //帖子列表
    documentList(data, jiamiData) {
      return post("/documentList", data, 2, jiamiData);
    },

    //帖子详情
    postDetails(data, jiamiData) {
      return post("/postDetails", data, 2, jiamiData);
    },

    //点赞
    giveLike(data, jiamiData) {
      return post("/giveLike", data, 2, jiamiData);
    },

    //所有评论
    commentlist(data, jiamiData) {
      return post("/commentlist", data, 2, jiamiData);
    },

    //发表评论
    comment(data, jiamiData) {
      return post("/comment", data, 2, jiamiData);
    },

    //展开更多评论
    moreComment(data, jiamiData) {
      return post("/moreComment", data, 2, jiamiData);
    },

    //我的--已发帖子
    userYftz(data, jiamiData) {
      return post("/userYftz", data, 2, jiamiData);
    },

    //我的--删除帖子
    deleteMy(data, jiamiData) {
      return post("/deleteMy", data, 2, jiamiData);
    },

    //内容发布--发布帖子
    postedInvitation(data, jiamiData) {
      return post("/postedInvitation", data, 2, jiamiData);
    }
  }
};

export default Services;
