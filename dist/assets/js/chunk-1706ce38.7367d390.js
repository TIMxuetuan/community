(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1706ce38"],{6959:function(i,e,t){},"91aa":function(i,e,t){},"969a":function(i,e,t){i.exports=t.p+"assets/img/no_comment.1d8cbeab.png"},d81d:function(i,e,t){"use strict";var s=t("23e7"),o=t("b727").map,n=t("1dde"),a=t("ae40"),l=n("map"),c=a("map");s({target:"Array",proto:!0,forced:!l||!c},{map:function(i){return o(this,i,arguments.length>1?arguments[1]:void 0)}})},e76e:function(i,e,t){"use strict";var s=t("91aa"),o=t.n(s);o.a},f6d8:function(i,e,t){"use strict";var s=t("6959"),o=t.n(s);o.a},f820:function(i,e,t){"use strict";t.r(e);var s=function(){var i=this,e=i.$createElement,s=i._self._c||e;return s("div",{staticClass:"about"},[s("div",{staticClass:"aboutHead"},[s("forumHead",{attrs:{isPublish:i.isPublish}})],1),i.isContentShow?s("div",{staticClass:"commentAll"},[s("img",{attrs:{src:t("969a"),alt:""}}),s("div",[i._v("还没有文章呢，试试发表你的文章")])]):s("div",{staticClass:"container"},[s("listDetail",{attrs:{miDataList:i.miDataList,detailList:i.detailList},on:{goToDetail:i.goToDetail,giveLikeClick:i.giveLikeClick,infiniteHandler:i.infiniteHandler}}),s("backTop")],1)])},o=[],n=(t("99af"),t("d81d"),t("d3b7"),t("4537")),a=t("2751"),l={name:"About",components:{forumHead:function(){return t.e("chunk-b5b36d4e").then(t.bind(null,"cd18"))},listDetail:function(){return t.e("chunk-461e72e5").then(t.bind(null,"d472"))},backTop:function(){return t.e("chunk-7f9228ae").then(t.bind(null,"d658"))}},data:function(){return{userInfo:{},isContentShow:!1,circleId:"",uid:"",isPublish:!0,circleListItem:{},page:1,size:10,miDataList:{},detailList:[]}},state:{list:[]},created:function(){var i=new a["a"];this.circleId=JSON.parse(this.$route.query.circleId),this.uid=JSON.parse(this.$route.query.uid),this.userInfo=i.getItem("userInfo"),console.log("this.circleId",this.userInfo)},mounted:function(){},methods:{getDocumentList:function(){var i=this,e={category_id:this.circleId,yg_id:this.uid,page:this.page,size:this.size},t={category_id:this.circleId,page:this.page,size:this.size};n["a"].loginApi.documentList(e,t).then((function(e){100==e.event?(console.log("res",e),i.miDataList=e,i.detailList=e.list):(console.log(e.msg),i.isContentShow=!0)}))},infiniteHandler:function(i){var e=this,t=this.detailList||"",s=t.length/10+1;console.log(t,s);var o={category_id:this.circleId,page:s,size:this.size,roles:this.userInfo.roles,top:this.userInfo.top,yg_id:this.userInfo.yg_id,yg_name:this.userInfo.yg_name},a={category_id:this.circleId,page:s,size:this.size};n["a"].loginApi.documentList(o,a).then((function(t){100==t.event?(console.log("res",t),e.miDataList=t,e.detailList=e.detailList.concat(t.list),i.loaded()):(console.log(t.msg),i.complete())}))},disposeRichText:function(i){console.log("富文本",i),i.list.map((function(i){console.log(i.wordse)}))},giveLikeClick:function(i){var e=this;console.log("item",i);var t={id:i.id,type:1,roles:this.userInfo.roles,top:i.top,yg_id:i.yg_id,yg_name:i.yg_name},s={id:i.id,type:1};n["a"].loginApi.giveLike(t,s).then((function(t){console.log("res",t),100==t.event?(console.log("res",t),e.fakeLikeShow(i)):console.log(t.msg)}))},fakeLikeShow:function(i){console.log(this.detailList),this.detailList.map((function(e){i.id==e.id&&(console.log(111,e),0==e.like_status?(console.log("点赞"),e.like_status=1,e.likes="1"):1==e.like_status&&(e.like_status=0,e.likes="0",console.log("取消点赞")))}))},getDataList:function(){this.$nextTick((function(){var i=document.querySelectorAll("video");console.log(i)}))},goToDetail:function(i){console.log("跳转",i);var e=this.$router.resolve({name:"circleDetails",query:{circleDates:i.id,circleId:this.circleId,limits:i.category_id,category_id:i.category_id,uid:this.uid}});window.open(e.href,"_blank")}}},c=l,r=(t("e76e"),t("f6d8"),t("2877")),d=Object(r["a"])(c,s,o,!1,null,"09ba5a04",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-1706ce38.7367d390.js.map