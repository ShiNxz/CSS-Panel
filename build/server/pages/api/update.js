"use strict";(()=>{var e={};e.id=6901,e.ids=[6901],e.modules={20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},38051:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,n){return n in t?t[n]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,n)):"function"==typeof t&&"default"===n?t:void 0}}})},92945:(e,t,n)=>{n.r(t),n.d(t,{config:()=>s,default:()=>p,routeModule:()=>P});var r={};n.r(r),n.d(r,{default:()=>l});var u=n(88667),i=n(25828),a=n(38051);let o=require("child_process"),d=e=>new Promise(function(t){(0,o.exec)(e,(e,n,r)=>{if(e){t({stdout:n,stderr:r});return}t({stdout:n,stderr:r})})}),l=async(e,t)=>{try{log("Updating the panel...");let e=await d("pnpm run pull");return log("Panel updated!"),t.status(200).json({pull:e})}catch(e){return error(e),t.status(500).json(e)}},p=(0,a.l)(r,"default"),s=(0,a.l)(r,"config"),P=new u.PagesAPIRouteModule({definition:{kind:i.x.PAGES_API,page:"/api/update",pathname:"/api/update",bundlePath:"",filename:""},userland:r})},25828:(e,t)=>{var n;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return n}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(n||(n={}))},88667:(e,t,n)=>{e.exports=n(20145)}};var t=require("../../webpack-api-runtime.js");t.C(e);var n=t(t.s=92945);module.exports=n})();