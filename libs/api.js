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
    }
  }
};

export default Services;