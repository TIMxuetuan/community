import axios from "axios";
// import { signClick } from './crypto';
import { Message } from "element-ui";
import MD5 from "md5";
import { Storage } from "../libs/public.js";
let storage = new Storage();

const ajax = axios.create({
  // baseURL: "http://test.zhongjianedu.com/sns.php", // url前缀 测试
  // baseURL: "https://dx.zhongjianedu.com/sns.php", // url前缀 正式服务器
  baseURL: "", // url前缀
  timeout: 10000, // 超时毫秒数
  withCredentials: true // 携带认证信息cookie
});

// axios.defaults.headers.common["token"] = localStorage.getItem("communityToken") || "";
axios.defaults.headers.common["token"] = storage.getItem("communityToken") || "";

/**
 get方式请求，url传参
 @param url 请求url
 @param params 参数
 @param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
*/
const get = (url, params, level) =>
  ajax(getConfig(url, "get", true, params, level))
    .then(res => successback(res))
    .catch(error => errback(error));
/**
 post方式请求 json方式传参
 @param url 请求url
 @param params 参数
 @param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
*/
const postJson = (url, params, level) =>
  ajax(getConfig(url, "post", true, params, level))
    .then(res => successback(res))
    .catch(error => errback(error));
/**
 post方式请求 表单传参
 @param url 请求url
 @param params 参数
 @param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
 @jiamiData 需要加密的参数
*/
const post = (url, params, level, jiamiData) =>
  ajax(getConfig(url, "post", false, params, level, jiamiData))
    .then(res => successback(res))
    .catch(error => errback(error));
// 参数转换
const param2String = data => {
  // console.log("data", data);
  if (typeof data === "string") {
    return data;
  }
  let ret = "";
  for (let it in data) {
    let val = data[it];
    if (
      typeof val === "object" && //
      (!(val instanceof Array) ||
        (val.length > 0 && typeof val[0] === "object"))
    ) {
      val = JSON.stringify(val);
    }
    ret += it + "=" + encodeURIComponent(val) + "&";
  }
  if (ret.length > 0) {
    ret = ret.substring(0, ret.length - 1);
  }
  // console.log(ret);
  return ret;
};

// 错误回调函数
const errback = error => {
  if ("code" in error) {
    // 未登录
    if (error.code === 30001) {
      sessionStorage.clear();
      // window.location.href = "/login";
      // window.location.href = "www.baidu.com";
      return;
    }
    return Promise.reject(error);
  }
  // 网络异常,或链接超时
  // Message({
  //   message: error.message,
  //   type: "error"
  // });
  return Promise.reject({ data: error.message });
};

// 成功回调函数
const successback = res => {
  console.log("aares", res)
  if (res.status === 200 && res.data.code !== 20000) {
    let userInfo = storage.getItem("userInfo")
    let communityToken = storage.getItem("communityToken")
    storage.setItem({
      name: "userInfo",
      value: userInfo
    });
    storage.setItem({
      name: "communityToken",
      value: communityToken
    });
    let errMsg = { "30002": "对不起无权限", "30003": "验签失败" };
    let msg = errMsg[res.data.code];
    if (res.data.event == 401) {
      Message({
        message: "账号已在其他地方登录",
        type: "error"
      });
      //如果以后再出现 用户已在其他地方登陆，而直接跳转到其他登录页，就是这“/circleLogin”的路径问题：  这是替换的url：https://bbs.zhongjianedu.com/bbs/circleLogin
      // location.href = "/circleLogin";
      console.log("跳转到其他登录页已解决");
      window.location.href = "https://bbs.zhongjianedu.com/bbs/circleLogin";
      return;
    }
    if (msg) {
      Message({
        message: errMsg[res.data.code],
        type: "error"
      });
    }
    // return Promise.reject(res.data);
    return res.data;
  }
  return res.data;
};

/**
 @param url 请求url
 @param method get,post,put,delete
 @param isjson 是否json提交参数
 @param params 参数
 @param level 0:无加密，1：参数加密，2: 签名+时间戳； 默认0
*/
const getConfig = (url, method, isjson, params, level = 0, jiamiData = {}) => {
  const suffix = "zhongjianedu";
  let config_ = {
    url,
    method,
    // params,
    headers: {
      // level
    }
  };
  // 时间戳
  if (level === 1) {
    params = { encrypt: MD5(JSON.stringify(params)) }; // 加密
  } else if (level === 2) {
    //注意：登陆时用户信息需要加密，所以拼接在签名中；后续接口参数不需要加密，就不需要拼接如签名
    // 签名
    let timestamp = new Date().getTime();
    // 获取token
    let token = storage.getItem("communityToken") || "";
    // 签名串
    var obj = {};
    // var paramsData = {};

    obj["timestamp"] = timestamp;
    if (token != "") {
      obj["token"] = token || "";
    }

    for (var key in jiamiData) {
      var reg = /\[(.+?)\]/;
      if (key.match(reg)) {
        obj[RegExp.$1] = jiamiData[key];
      } else {
        obj[key] = jiamiData[key];
      }
    }

    //sort key
    const reverse_key = Object.keys(obj).sort();
    let resource_code =
      reverse_key
        .reduce((rst, v) => (rst += `${v}=${obj[v]}&`), "")
        .slice(0, -1) + suffix;
    let sign = MD5(resource_code);
    console.log("resource_code", resource_code);

    // let sign = signClick(token, timestamp, params);
    console.log("communityToken", token);
    config_.headers = {
      token,
      timestamp,
      sign
    };
    params["timestamp"] = timestamp;
    params["sign"] = sign;
    params["token"] = token;
    // console.log("params", params);
  }

  // 表单提交参数
  if (!isjson) {
    // console.log("isjson", isjson);
    config_.headers["Content-Type"] = "application/x-www-form-urlencoded";
    config_.responseType = "text";
    config_.transformRequest = [
      function (data) {
        return param2String(data);
      }
    ];
  }
  // 设置参数
  if (method in { get: true, delete: true }) {
    config_.params = params;
  } else if (method in { post: true, put: true }) {
    config_.data = params;
  }
  return config_;
};

// 统一方法输出口
export { ajax, get, postJson, post };
