"use strict";(()=>{var e={};e.id=3144,e.ids=[3144],e.modules={43582:e=>{e.exports=require("@fabricio-191/valve-server-query")},429:e=>{e.exports=require("cookie-session")},62418:e=>{e.exports=require("mysql2/promise")},20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},99648:e=>{e.exports=import("axios")},97564:e=>{e.exports=import("chalk")},45616:e=>{e.exports=import("next-connect")},2782:e=>{e.exports=import("steam-api-sdk")},9926:e=>{e.exports=import("zod")},42156:(e,t,s)=>{s.a(e,async(e,r)=>{try{s.r(t),s.d(t,{config:()=>c,default:()=>l,routeModule:()=>d});var a=s(88667),n=s(25828),i=s(38051),o=s(48643),u=e([o]);o=(u.then?(await u)():u)[0];let l=(0,i.l)(o,"default"),c=(0,i.l)(o,"config"),d=new a.PagesAPIRouteModule({definition:{kind:n.x.PAGES_API,page:"/api/servers/[serverId]/chat",pathname:"/api/servers/[serverId]/chat",bundlePath:"",filename:""},userland:o});r()}catch(e){r(e)}})},48643:(e,t,s)=>{s.a(e,async(e,r)=>{try{s.r(t),s.d(t,{default:()=>d});var a=s(43582),n=s(2782),i=s(73153),o=s(6995),u=s(74186),l=s(46634),c=e([n,i,o,u,l]);[n,i,o,u,l]=c.then?(await c)():c;let d=async(e,t)=>{if(!o.Z)return t.status(500).json({message:"Database not connected"});await u.Z.run(e,t);let{method:s}=e;if(await (0,i.Z)(e,t))switch(s){case"GET":try{let{serverId:s}=e.query;if(!await o.Z.servers.getById(Number(s)))return t.status(404).json({error:"Server not found"});let r=await o.Z.chatLogs.getAllByServerAndMinutes(Number(s),5);return t.status(200).json(r)}catch(e){return t.status(500).json({error:e})}case"POST":try{let{serverId:s}=e.query,r=await o.Z.servers.getById(Number(s));if(!r)return t.status(404).json("Server not found");let{address:i,rcon:u}=r;if(!i||!u)return t.status(400).send("Server address or RCON password is missing");let[c,d]=i.split(":"),{message:p,hideName:m}=e.body;if(!p)return t.status(400).send("Message is required");"boolean"!=typeof m&&(m=!1);let y=await (0,n.From64ToUser)(e.user?.id);if(!y||!y.length)return t.status(500).send("Error getting admin user");let f=await (0,a.RCON)({ip:c,port:Number(d),password:u});if(!f)return t.status(500).send("Error creating RCON connection");f.authenticate(),await f.exec(`css_panel_say ${m?"{lime}[ADMIN]":`{lime} ${y[0].personaname}`}: {default}${p}`),(0,l.Z)("Server Chat",`Admin ${e.user?.displayName} (${e.user?.id}) Sent message to server ${r.hostname}: ${p} as ${m?"Anonymouse":""}`,e.user?.id);let g=new Date;return await o.Z.chatLogs.create({created:g,message:p,playerName:y[0].personaname+" (Panel)",playerSteam64:y[0].steamid,serverId:s,team:0}),t.status(200).send("Message sent")}catch(e){return t.status(500).json({error:e})}}};r()}catch(e){r(e)}})},46634:(e,t,s)=>{s.a(e,async(e,r)=>{try{s.d(t,{Z:()=>o});var a=s(6995),n=s(899),i=e([a,n]);[a,n]=i.then?(await i)():i;let o=async(e,t,s)=>{if(a.Z)try{a.Z.logs.create(e,t,s);let r=await a.Z.settings.getByKey("discordWebhook",!1);r&&(0,n.Z)({url:r,embeds:[{title:`**▬▬▬▬▬ [LOG :: ${e}] ▬▬▬▬▬**`,color:5352959,description:t,timestamp:new Date().toISOString()}]})}catch(e){console.error(`Failed to log: ${e}`)}};r()}catch(e){r(e)}})},74186:(e,t,s)=>{s.a(e,async(e,r)=>{try{s.d(t,{Z:()=>c});var a=s(15313),n=s(45616),i=s(429),o=s.n(i),u=e([n]);n=(u.then?(await u)():u)[0];let l=(0,n.default)();l.use(o()({secret:process.env.SESSION_SECRET||"secret",maxAge:10368e6})),l.use(a.Z.initialize()),l.use(a.Z.session());let c=l;r()}catch(e){r(e)}})},15313:(e,t,s)=>{s.d(t,{Z:()=>o});let r=require("passport");var a=s.n(r);let n=require("passport-steam");a().serializeUser(async(e,t)=>{t(null,e)}),a().deserializeUser(async(e,t)=>{t(null,e)});let i=process.env.DOMAIN||"";i.startsWith("http")||(i=`https://${i}`),a().use(new n.Strategy({returnURL:`${i}/api/auth/return`,realm:`${i}/`,apiKey:process.env.STEAM_API_KEY||"",stateless:!0},(e,t,s)=>(t.identifier=e,s(null,t))));let o=a()},73153:(e,t,s)=>{s.a(e,async(e,r)=>{try{s.d(t,{Z:()=>i});var a=s(6995),n=e([a]);a=(n.then?(await n)():n)[0];let i=(e,t,s,r="AND")=>new Promise(async(n,i)=>{if(!a.Z)return t.status(500).json({message:"Database not connected"});if(!e.user)return i(t.status(400).json({success:!1,error:"Protected Route"}));let o=e.user.id,u=await a.Z.admins.getBySteam64(o);if(!u)return i(t.status(401).json({success:!1,error:"Protected Route"}));if(!s)return n(u);let l=null;if("object"==typeof u.flags)l=u.flags;else{let e=await a.Z.adminGroups.getById(u.flags);e&&(l=e.flags)}if(null===l||!("AND"===r?s.every(e=>l.includes(e)):s.some(e=>l.includes(e))))return i(t.status(403).json({success:!1,error:"Protected Route"}));n(u)});r()}catch(e){r(e)}})}};var t=require("../../../../webpack-api-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[330],()=>s(42156));module.exports=r})();