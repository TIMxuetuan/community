/*内容展示情况：1、只有文字，2、文字加图片，3，文字加视频
        detailsListId: 中间展示内容id，同上
        detailsList：图片列表或者是视频，区别同上

        结构解析：
        {   
            userUrl:'https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/7f0ce8f8e1585bf721d2bc37b7140f27#vipAccount-img',  //用户头像
            userName:'未来0405',   //用户名称
            userDate:'一小时',   //发布时间
            userPhoneType:'小米5',   //设备型号
            titleText:'首发高通骁龙732g，小米poco x3海外发布 6+64售价199欧元，6+128售价249欧元 搭载骁龙732G处理器，LPDDR4X+UFS2.1 6.67英寸LCD居中',   //标题或内容
            detailsListId:2,   //类型id，上面有解释
            //图片列表
            detailsList:[
                {imgUrl:'https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/317edf4645edfe46ede47701aefcd877#vipAccount-img'},
                {imgUrl:'https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/317edf4645edfe46ede47701aefcd877#vipAccount-img'},
                {imgUrl:'https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/317edf4645edfe46ede47701aefcd877#vipAccount-img'},
                {imgUrl:'https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/317edf4645edfe46ede47701aefcd877#vipAccount-img'},
            ],
            labelLeft:'小米10来了',   //话题
            labelRight:'小米手机',  //圈子
            browseNum:2393, //浏览量  
            commentNum:51,  //留言数
            isCommentShow：true， //是否留言，true代表留言，false代表未留言
            giveNum:34, //点赞数
            isZanShow:true,  //是否点赞 true代表点赞，false代表未点赞
            videoLists:'http://vip.w.xk.miui.com/0237f208aeeb485925829af72ad551cb',  //视频 只有detailsListId为3时，使用

        }
    */

module.exports = {
  miDataList: [
    {
      userUrl:
        "https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/7f0ce8f8e1585bf721d2bc37b7140f27#vipAccount-img",
      userName: "未来0405",
      userDate: "一小时",
      userPhoneType: "小米5",
      titleText:
        "大时代奥术奥术大师大所大所多大师首发高通骁龙732g，小米poco x3海外发布 6+64售价199欧元，6+128售价249欧元 搭载骁龙732G处理器，LPDDR4X+UFS2.1 6.67英寸LCD居中",
      detailsListId: 2,
      detailsList: [
        {
          imgUrl:
            "https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/317edf4645edfe46ede47701aefcd877#vipAccount-img"
        },
        {
          imgUrl:
            "https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/317edf4645edfe46ede47701aefcd877#vipAccount-img"
        },
        {
          imgUrl:
            "https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/317edf4645edfe46ede47701aefcd877#vipAccount-img"
        },
        {
          imgUrl:
            "https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/317edf4645edfe46ede47701aefcd877#vipAccount-img"
        }
      ],
      labelLeft: "小米10来了",
      labelRight: "小米手机",
      browseNum: 2393,
      commentNum: 51,
      isCommentShow: true,
      giveNum: 34,
      isZanShow: true,
      commentList: [
        {
          author: {
            authorId: 1,
            name: "催眠veggieg",
            imgUrl:
              "https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/vip1566832760626#vipAccount-img"
          },
          text: "好漂亮啊，希望官方能采用你这个ui",
          time: 1599580954587,
          ownComment: false, //是否打开评论
          support: false, //是否进行点赞
          supportNum: 5, //点赞数量
          textarea: "",
          //他人回复数组
          reply: [
            {
              text: "很漂亮",
              ownComment: false, //是否打开评论
              support: false, //是否进行点赞
              supportNum: 5, //点赞数量
              author: {
                authorId: 1,
                name: "mi_3184",
                imgUrl:
              "https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/vip1566832760626#vipAccount-img"
              }
            },
            {
              text: "回复你",
              ownComment: false, //是否打开评论
              support: false, //是否进行点赞
              supportNum: 5, //点赞数量
              author: {
                authorId: 1,
                name: "mi_3184",
                imgUrl:
              "https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/vip1566832760626#vipAccount-img"
              },
              replier: {
                name: "爱多功能手机"
              }
            }
          ]
        },
        {
          author: {
            authorId: 2,
            name: "阿朵",
            imgUrl:
              "https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/vip1566832760626#vipAccount-img"
          },
          text: "阿朵阿朵阿朵i",
          time: 1599580954587,
          ownComment: false, //是否打开评论
          support: false, //是否进行点赞
          supportNum: 5, //点赞数量
          textarea: "",
          //他人回复数组
          reply: [
            {
              text: "很漂亮",
              ownComment: false, //是否打开评论
              support: false, //是否进行点赞
              supportNum: 5, //点赞数量
              author: {
                authorId: 1,
                name: "小王"
              }
            },
            {
              text: "回复你",
              ownComment: false, //是否打开评论
              support: false, //是否进行点赞
              supportNum: 5, //点赞数量
              author: {
                authorId: 1,
                name: "小李"
              },
              replier: {
                name: "爱多功能手机"
              }
            }
          ]
        }
      ]
    },
    {
      userUrl:
        "https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/7f0ce8f8e1585bf721d2bc37b7140f27#vipAccount-img",
      userName: "未来0405",
      userDate: "一小时",
      userPhoneType: "小米5",
      titleText:
        "大时代奥术奥术大师大所大所多大师首发高通骁龙732g，小米poco x3海外发布 6+64售价199欧元，6+128售价249欧元 搭载骁龙732G处理器，LPDDR4X+UFS2.1 6.67英寸LCD居中",
      detailsListId: 1,
      detailsList: [],
      labelLeft: "小米10来了",
      labelRight: "小米手机",
      browseNum: 2393,
      commentNum: 51,
      isCommentShow: false,
      giveNum: 34,
      isZanShow: false
    },
    {
      userUrl:
        "https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/7f0ce8f8e1585bf721d2bc37b7140f27#vipAccount-img",
      userName: "未来0405",
      userDate: "一小时",
      userPhoneType: "小米5",
      titleText:
        "大时代奥术奥术大师大所大所多大师首发高通骁龙732g，小米poco x3海外发布 6+64售价199欧元，6+128售价249欧元 搭载骁龙732G处理器，LPDDR4X+UFS2.1 6.67英寸LCD居中",
      detailsListId: 2,
      detailsList: [
        {
          imgUrl:
            "https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/317edf4645edfe46ede47701aefcd877#vipAccount-img"
        }
      ],
      labelLeft: "小米10来了",
      labelRight: "小米手机",
      browseNum: 2393,
      commentNum: 51,
      isCommentShow: true,
      giveNum: 34,
      isZanShow: false
    },
    {
      id: 301,
      isImageShow: true,
      userUrl:
        "https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/7f0ce8f8e1585bf721d2bc37b7140f27#vipAccount-img",
      userName: "未来0405",
      userDate: "一小时",
      userPhoneType: "小米5",
      titleText:
        "大时代奥术奥术大师大所大所多大师首发高通骁龙732g，小米poco x3海外发布 6+64售价199欧元，6+128售价249欧元 搭载骁龙732G处理器，LPDDR4X+UFS2.1 6.67英寸LCD居中",
      detailsListId: 3,
      detailsList: [],
      videoLists: "http://vip.w.xk.miui.com/0237f208aeeb485925829af72ad551cb",
      labelLeft: "小米10来了",
      labelRight: "小米手机",
      browseNum: 2393,
      commentNum: 51,
      isCommentShow: true,
      giveNum: 34,
      isZanShow: true
    },
    {
      id: 302,
      isImageShow: true,
      userUrl:
        "https://cdn.cnbj1.fds.api.mi-img.com/middle.community.vip.bkt/7f0ce8f8e1585bf721d2bc37b7140f27#vipAccount-img",
      userName: "未来0405",
      userDate: "一小时",
      userPhoneType: "小米5",
      titleText:
        "大时代奥术奥术大师大所大所多大师首发高通骁龙732g，小米poco x3海外发布 6+64售价199欧元，6+128售价249欧元 搭载骁龙732G处理器，LPDDR4X+UFS2.1 6.67英寸LCD居中",
      detailsListId: 3,
      detailsList: [],
      videoLists: "http://vip.w.xk.miui.com/0237f208aeeb485925829af72ad551cb",
      labelLeft: "小米10来了",
      labelRight: "小米手机",
      browseNum: 2393,
      commentNum: 51,
      isCommentShow: true,
      giveNum: 34,
      isZanShow: true
    }
  ]
};
