(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61816992"],{"2d7b":function(t,e,i){"use strict";var n=i("c1b5"),o=i.n(n);o.a},"91aa":function(t,e,i){},"969a":function(t,e,i){t.exports=i.p+"assets/img/no_comment.1d8cbeab.png"},c1b5:function(t,e,i){},d81d:function(t,e,i){"use strict";var n=i("23e7"),o=i("b727").map,s=i("1dde"),c=i("ae40"),a=s("map"),r=c("map");n({target:"Array",proto:!0,forced:!a||!r},{map:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}})},e76e:function(t,e,i){"use strict";var n=i("91aa"),o=i.n(n);o.a},f820:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about"},[n("div",{staticClass:"aboutHead"},[n("forumHead",{attrs:{isPublish:t.isPublish}})],1),t.isContentShow?n("div",{staticClass:"commentAll"},[n("img",{attrs:{src:i("969a"),alt:""}}),n("div",[t._v("还没有文章呢，试试发表你的文章")])]):n("div",{staticClass:"container"},[n("listDetail",{attrs:{miDataList:t.miDataList},on:{goToDetail:t.goToDetail,giveLikeClick:t.giveLikeClick}}),n("backTop")],1)])},o=[],s=(i("d81d"),i("d3b7"),i("4537")),c={name:"About",components:{forumHead:function(){return i.e("chunk-f1cce51a").then(i.bind(null,"cd18"))},listDetail:function(){return i.e("chunk-05844702").then(i.bind(null,"d472"))},backTop:function(){return i.e("chunk-7f9228ae").then(i.bind(null,"d658"))}},data:function(){return{userInfo:{},isContentShow:!1,circleId:"",uid:"",isPublish:!0,circleListItem:{},page:1,size:10,miDataList:{}}},state:{list:[]},created:function(){this.circleId=JSON.parse(this.$route.query.circleId),this.uid=JSON.parse(this.$route.query.uid),this.userInfo=JSON.parse(localStorage.getItem("userInfo")),console.log("this.circleId",this.circleId)},mounted:function(){this.getDocumentList()},methods:{getDocumentList:function(){var t=this,e={category_id:this.circleId,yg_id:this.uid,page:this.page,size:this.size},i={category_id:this.circleId,page:this.page,size:this.size};s["a"].loginApi.documentList(e,i).then((function(e){100==e.event?(console.log("res",e),t.miDataList=e):(console.log(e.msg),t.isContentShow=!0)}))},disposeRichText:function(t){console.log("富文本",t),t.list.map((function(t){console.log(t.wordse)}))},giveLikeClick:function(t){var e=this;console.log("item",t);var i={id:t.id,type:1,roles:this.userInfo.roles,top:t.top,yg_id:t.yg_id,yg_name:t.yg_name},n={id:t.id,type:1};s["a"].loginApi.giveLike(i,n).then((function(t){console.log("res",t),100==t.event?(console.log("res",t),e.getDocumentList()):console.log(t.msg)}))},getDataList:function(){this.$nextTick((function(){var t=document.querySelectorAll("video");console.log(t)}))},goToDetail:function(t){console.log("跳转",t);var e=this.$router.resolve({name:"circleDetails",query:{circleDates:t.id,circleId:this.circleId,limits:t.category_id,category_id:t.category_id,uid:this.uid}});window.open(e.href,"_blank")}}},a=c,r=(i("e76e"),i("2d7b"),i("2877")),l=Object(r["a"])(a,n,o,!1,null,"0fff4cb8",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-61816992.68072172.js.map