let debug = "popup"; //production development
let host_ip = {
  // production: "http://test.zhongjianedu.com/sns.php", //接口ip 测试
  // popup: "https://bbs.zhongjianedu.com/sns.php" //接口ip 正式服务器 之前的
  popup: "http://i.taoke4.com/sns.php" //接口ip 正式服务器 之前的
};

let host = host_ip[debug];
console.log("host", host);
let api = host;

let _CONFIG = {
  api: api
};

module.exports = { _CONFIG };
