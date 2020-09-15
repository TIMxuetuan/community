let debug = "production"; //production development
let host_ip = {
  production: "http://test.zhongjianedu.com/sns.php" //接口ip
};

let host = host_ip[debug];
let api = host;

let _CONFIG = {
  api: api
};

module.exports = { _CONFIG };
