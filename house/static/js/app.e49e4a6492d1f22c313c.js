webpackJsonp([0],[,function(t,e){!function(t,e){var i=t.documentElement,c="orientationchange"in window?"orientationchange":"resize",n=function(){var t=i.clientWidth;t&&(i.style.fontSize=t/720*100+"px")};t.addEventListener&&(e.addEventListener(c,n,!1),n())}(document,window)},function(t,e,i){function c(t){i(11)}var n=i(0)(i(4),i(18),c,null,null);t.exports=n.exports},,function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var c=i(15),n=i.n(c);e.default={name:"app",components:{Home:n.a}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"box",props:["tip","x","y","w","h"],data:function(){return{}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var c=i(14),n=i.n(c),s=i(16),o=i.n(s),a=i(8),r=i.n(a);e.default={name:"home",data:function(){return{}},components:{Box:n.a,Light:o.a},methods:{show:function(t){var e=r.a[t];this.$refs.light.alert(e)}}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"lighe",props:["info"],data:function(){return{show:!1,item:{}}},methods:{hide:function(){this.show=!1},alert:function(t){this.show=!0,this.item=t}},filters:{link:function(t){return"static/img/"+t}}}},function(t,e){t.exports={0:{info:"雷士照明LED吸顶灯",price:"54.71",place:"玄关",src:"xg.JPG",power:"6"},1:{info:"雷士照明LED吸顶灯",price:"82.53",place:"阳台",src:"yt.JPG",power:"10"},2:{info:"遥控无极调光",price:"1199.00",place:"客厅",src:"kt.JPG",power:"72"},3:{info:"52寸简约现代风扇灯",price:"679.00",place:"餐厅",src:"ds.JPG",power:"21"},4:{info:"遥控无极调光",price:"499.00",place:"主卧",src:"cw.JPG",power:"24"},5:{info:"300*300扣板厨卫面板灯",price:"128.90",place:"厕所",src:"cs.JPG",power:"10"},6:{info:"正白光",price:"399.00",place:"次卧",src:"ws.JPG",power:"24"},7:{info:"300*600扣板厨卫面板灯",price:"212.36",place:"厨房",src:"cf.JPG",power:"20"},8:{info:"正白光",price:"399.00",place:"次卧",src:"ws.JPG",power:"24"},9:{info:"300*300扣板厨卫面板灯",price:"128.90",place:"厕所",src:"cs.JPG",power:"10"},10:{info:"遥控无极调光",price:"277.28",place:"书房",src:"kf.JPG",power:"18"}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var c=i(3),n=i(2),s=i.n(n),o=i(1);i.n(o);c.a.config.productionTip=!1,new c.a({el:"#app",template:"<App/>",components:{App:s.a}})},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e,i){function c(t){i(10)}var n=i(0)(i(5),i(17),c,"data-v-0c18d48c",null);t.exports=n.exports},function(t,e,i){function c(t){i(12)}var n=i(0)(i(6),i(19),c,"data-v-b8319000",null);t.exports=n.exports},function(t,e,i){function c(t){i(13)}var n=i(0)(i(7),i(20),c,"data-v-f3855476",null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"box",style:{left:t.x+"rem",top:t.y+"rem",width:t.w+"rem",height:t.h+"rem"}},[i("div",[t._v(t._s(t.tip))])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("div",{staticClass:"title"},[t._v("户型灯饰布局")]),t._v(" "),i("home")],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home"},[i("div",{staticClass:"row",staticStyle:{height:"5.4rem"}},[i("div",{staticClass:"column",staticStyle:{"flex-direction":"column",background:"#fff",width:"1rem"}},[i("div",{staticClass:"son space",staticStyle:{height:"0.84rem"}}),t._v(" "),i("div",{staticClass:"son flex space"}),t._v(" "),i("div",{staticClass:"son",staticStyle:{height:"1.2rem",background:"#fff1f1"},on:{click:function(e){t.show(0)}}},[t._v("玄关")])]),t._v(" "),i("div",{staticClass:"column",staticStyle:{"flex-direction":"column",background:"#fff",width:"4rem"}},[i("div",{staticClass:"son",staticStyle:{height:"0.84rem",background:"#fff1f1"},on:{click:function(e){t.show(1)}}},[t._v("阳台")]),t._v(" "),i("div",{staticClass:"son flex",staticStyle:{background:"#bfefca"},on:{click:function(e){t.show(2)}}},[t._v("客厅")]),t._v(" "),i("div",{staticClass:"son",staticStyle:{height:"1.2rem",background:"#bfefca"},on:{click:function(e){t.show(3)}}},[t._v("餐厅")])]),t._v(" "),i("div",{staticClass:"column flex",staticStyle:{"flex-direction":"column",background:"#fff"}},[i("div",{staticClass:"son flex",staticStyle:{background:"#efc4f7"},on:{click:function(e){t.show(4)}}},[t._v("主卧")]),t._v(" "),i("div",{staticClass:"son",staticStyle:{height:"1.2rem",background:"#bfefca"},on:{click:function(e){t.show(5)}}},[t._v("厕所")]),t._v(" "),i("div",{staticClass:"son flex",staticStyle:{background:"#efc4f7"},on:{click:function(e){t.show(6)}}},[t._v("次卧")])])]),t._v(" "),i("div",{staticClass:"row",staticStyle:{height:"2rem"}},[i("div",{staticClass:"column",staticStyle:{width:"1.38rem",background:"#bfefca"},on:{click:function(e){t.show(7)}}},[t._v("厨房")]),t._v(" "),i("div",{staticClass:"column flex",staticStyle:{background:"#efc4f7"},on:{click:function(e){t.show(8)}}},[t._v("客房")]),t._v(" "),i("div",{staticClass:"column",staticStyle:{width:"1.38rem",background:"#bfefca"},on:{click:function(e){t.show(9)}}},[t._v("厕所")]),t._v(" "),i("div",{staticClass:"column flex",staticStyle:{background:"#efc4f7"},on:{click:function(e){t.show(10)}}},[t._v("书房")])]),t._v(" "),i("light",{ref:"light"})],1)},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"light"},[i("div",{staticClass:"content"},[i("div",{staticClass:"close",on:{click:t.hide}},[t._v("X")]),t._v(" "),i("img",{staticClass:"img",attrs:{src:t._f("link")(t.item.src)}}),t._v(" "),i("div",{staticClass:"tip"},[t._v("参数："+t._s(t.item.info))]),t._v(" "),i("div",{staticClass:"tip"},[t._v("用途："+t._s(t.item.place))]),t._v(" "),i("div",{staticClass:"tip"},[t._v("功率："+t._s(t.item.power)+"瓦")]),t._v(" "),i("div",{staticClass:"price"},[t._v("￥"+t._s(t.item.price))])])])},staticRenderFns:[]}}],[9]);
//# sourceMappingURL=app.e49e4a6492d1f22c313c.js.map