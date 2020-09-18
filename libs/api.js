import { post, postJson } from "./util";
var { _CONFIG } = require("../config.js");

console.log(postJson, _CONFIG, ceshi, fabu);

//测试ip 用于本地开发使用
let ceshi = {
  userLogin(data, jiamiData) {
    return post("/shequ", data, 2, jiamiData); //测试ip
  },

  //圈子列表
  circleList(data) {
    console.log(postJson);
    return post("/circleList", data, 2);
  },

  //帖子类型列表
  typeList(data) {
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

//正式发布实用
let fabu = {
  userLogin(data, jiamiData) {
    return post(`${_CONFIG.api}/User/login`, data, 2, jiamiData); //服务器需要的ip
  },

  //圈子列表
  circleList(data) {
    console.log(postJson);
    return post(`${_CONFIG.api}/Category/categoryList`, data, 2);
  },

  //帖子类型列表
  typeList(data) {
    console.log(postJson);
    return post(`${_CONFIG.api}/Category/typeList`, data, 2);
  },

  //帖子列表
  documentList(data, jiamiData) {
    return post(`${_CONFIG.api}/Document/documentList`, data, 2, jiamiData);
  },

  //帖子详情
  postDetails(data, jiamiData) {
    return post(`${_CONFIG.api}/Document/document`, data, 2, jiamiData);
  },

  //点赞
  giveLike(data, jiamiData) {
    return post(`${_CONFIG.api}/Document/like`, data, 2, jiamiData);
  },

  //所有评论
  commentlist(data, jiamiData) {
    return post(`${_CONFIG.api}/Document/commentlist`, data, 2, jiamiData);
  },

  //发表评论
  comment(data, jiamiData) {
    return post(`${_CONFIG.api}/Document/comment`, data, 2, jiamiData);
  },

  //展开更多评论
  moreComment(data, jiamiData) {
    return post(`${_CONFIG.api}/Document/more_comment`, data, 2, jiamiData);
  },

  //我的--已发帖子
  userYftz(data, jiamiData) {
    return post(`${_CONFIG.api}/User/yftz`, data, 2, jiamiData);
  },

  //我的--删除帖子
  deleteMy(data, jiamiData) {
    return post(`${_CONFIG.api}/User/delete`, data, 2, jiamiData);
  },

  //内容发布--发布帖子
  postedInvitation(data, jiamiData) {
    return post(`${_CONFIG.api}/User/posted`, data, 2, jiamiData);
  }
}
const Services = {
  loginApi: fabu
};

export default Services;
