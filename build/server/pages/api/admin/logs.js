"use strict";(()=>{var e={};e.id=9825,e.ids=[9825],e.modules={429:e=>{e.exports=require("cookie-session")},62418:e=>{e.exports=require("mysql2/promise")},20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},99648:e=>{e.exports=import("axios")},97564:e=>{e.exports=import("chalk")},45616:e=>{e.exports=import("next-connect")},2782:e=>{e.exports=import("steam-api-sdk")},9926:e=>{e.exports=import("zod")},74147:(e,t,s)=>{s.a(e,async(e,a)=>{try{s.r(t),s.d(t,{config:()=>c,default:()=>l,routeModule:()=>d});var r=s(88667),n=s(25828),i=s(38051),o=s(72473),u=e([o]);o=(u.then?(await u)():u)[0];let l=(0,i.l)(o,"default"),c=(0,i.l)(o,"config"),d=new r.PagesAPIRouteModule({definition:{kind:n.x.PAGES_API,page:"/api/admin/logs",pathname:"/api/admin/logs",bundlePath:"",filename:""},userland:o});a()}catch(e){a(e)}})},72473:(e,t,s)=>{s.a(e,async(e,a)=>{try{s.r(t),s.d(t,{default:()=>l});var r=s(6995),n=s(74186),i=s(73153),o=s(8909),u=e([r,n,i,o]);[r,n,i,o]=u.then?(await u)():u;let l=async(e,t)=>{if(await n.Z.run(e,t),!await (0,i.Z)(e,t,["@web/root","@web/logs","@css/root"],"OR"))return;let{method:s}=e;if(!r.Z)return t.status(500).json({message:"Database not connected"});if("GET"===s){let{page:s,rows:a,query:n}=o.Z.parse(e.query),i=await r.Z.logs.getAllMapped(s,a,n),u=await r.Z.logs.count(n);return t.status(200).json({results:i,count:u})}};a()}catch(e){a(e)}})},74186:(e,t,s)=>{s.a(e,async(e,a)=>{try{s.d(t,{Z:()=>c});var r=s(15313),n=s(45616),i=s(429),o=s.n(i),u=e([n]);n=(u.then?(await u)():u)[0];let l=(0,n.default)();l.use(o()({secret:process.env.SESSION_SECRET||"secret",maxAge:10368e6})),l.use(r.Z.initialize()),l.use(r.Z.session());let c=l;a()}catch(e){a(e)}})},15313:(e,t,s)=>{s.d(t,{Z:()=>o});let a=require("passport");var r=s.n(a);let n=require("passport-steam");r().serializeUser(async(e,t)=>{t(null,e)}),r().deserializeUser(async(e,t)=>{t(null,e)});let i=process.env.DOMAIN||"";i.startsWith("http")||(i=`https://${i}`),r().use(new n.Strategy({returnURL:`${i}/api/auth/return`,realm:`${i}/`,apiKey:process.env.STEAM_API_KEY||"",stateless:!0},(e,t,s)=>(t.identifier=e,s(null,t))));let o=r()},73153:(e,t,s)=>{s.a(e,async(e,a)=>{try{s.d(t,{Z:()=>i});var r=s(6995),n=e([r]);r=(n.then?(await n)():n)[0];let i=(e,t,s,a="AND")=>new Promise(async(n,i)=>{if(!r.Z)return t.status(500).json({message:"Database not connected"});if(!e.user)return i(t.status(400).json({success:!1,error:"Protected Route"}));let o=e.user.id,u=await r.Z.admins.getBySteam64(o);if(!u)return i(t.status(401).json({success:!1,error:"Protected Route"}));if(!s)return n(u);let l=null;if("object"==typeof u.flags)l=u.flags;else{let e=await r.Z.adminGroups.getById(u.flags);e&&(l=e.flags)}if(null===l||!("AND"===a?s.every(e=>l.includes(e)):s.some(e=>l.includes(e))))return i(t.status(403).json({success:!1,error:"Protected Route"}));n(u)});a()}catch(e){a(e)}})},8909:(e,t,s)=>{s.a(e,async(e,a)=>{try{s.d(t,{Z:()=>i});var r=s(9926),n=e([r]);let i=(r=(n.then?(await n)():n)[0]).default.object({page:r.default.string().default("1").refine(e=>!isNaN(Number(e)),{message:"Invalid page query"}).transform(e=>Number(e)),rows:r.default.string().default("10").refine(e=>!isNaN(Number(e)),{message:"Invalid page query"}).refine(e=>50>Number(e),{message:"Rows must be less than 50"}).transform(e=>Number(e)),query:r.default.string().optional()});a()}catch(e){a(e)}})}};var t=require("../../../webpack-api-runtime.js");t.C(e);var s=e=>t(t.s=e),a=t.X(0,[4065],()=>s(74147));module.exports=a})();