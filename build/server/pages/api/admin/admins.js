"use strict";(()=>{var e={};e.id=7693,e.ids=[7693],e.modules={43582:e=>{e.exports=require("@fabricio-191/valve-server-query")},429:e=>{e.exports=require("cookie-session")},62418:e=>{e.exports=require("mysql2/promise")},20145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},99648:e=>{e.exports=import("axios")},97564:e=>{e.exports=import("chalk")},45616:e=>{e.exports=import("next-connect")},2782:e=>{e.exports=import("steam-api-sdk")},9926:e=>{e.exports=import("zod")},88179:(e,s,t)=>{t.a(e,async(e,r)=>{try{t.r(s),t.d(s,{config:()=>l,default:()=>d,routeModule:()=>u});var a=t(88667),i=t(25828),n=t(38051),o=t(38592),c=e([o]);o=(c.then?(await c)():c)[0];let d=(0,n.l)(o,"default"),l=(0,n.l)(o,"config"),u=new a.PagesAPIRouteModule({definition:{kind:i.x.PAGES_API,page:"/api/admin/admins",pathname:"/api/admin/admins",bundlePath:"",filename:""},userland:o});r()}catch(e){r(e)}})},38592:(e,s,t)=>{t.a(e,async(e,r)=>{try{t.r(s),t.d(s,{default:()=>u});var a=t(15892),i=t(6995),n=t(74186),o=t(42088),c=t(73153),d=t(46634),l=e([a,i,n,o,c,d]);[a,i,n,o,c,d]=l.then?(await l)():l;let u=async(e,s)=>{await n.Z.run(e,s);let{method:t}=e,r=await (0,c.Z)(e,s,["@web/root","@web/admins","@css/root"],"OR");if(r){if(!i.Z)return s.status(500).json({message:"Database not connected"});switch(t){case"GET":{let e=await i.Z.admins.getAll(),t=await i.Z.servers.getAll(),r=await i.Z.adminGroups.getAll();return s.status(200).json({admins:e,servers:t,groups:r})}case"POST":{let{flags:t,immunity:n,player_name:c,player_steamid:l,server_id:u}=o.ZP.parse(e.body),p=r.immunity;if(Number(n)>=Number(p))return s.status(403).json({message:"You cannot create an admin with higher immunity than yours"});let m=await i.Z.admins.create({flags:t,immunity:n.toString()??0,player_name:c,player_steamid:l,server_id:u??null});return await (0,a.x)("css_reladmin"),(0,d.Z)("Admin Create",`Admin ${e.user?.displayName} (${e.user?.id}) created admin: ${c}`,e.user?.id),s.status(201).json(m)}default:return s.status(405).json({message:"Method not allowed"})}}};r()}catch(e){r(e)}})},15892:(e,s,t)=>{t.a(e,async(e,r)=>{try{t.d(s,{Z:()=>d,x:()=>c});var a=t(43582),i=t(6995),n=e([i]);i=(n.then?(await n)():n)[0];let o=async(e,s)=>{if(!i.Z)throw Error("Database not connected");try{let t=await i.Z.servers.getById(Number(e));if(!t)throw Error("Server not found");let{address:r,rcon:n}=t,[o,c]=r.split(":");if(!n)throw Error("Server has no rcon password");let d=await (0,a.RCON)({ip:o,port:Number(c),password:n,enableWarns:!0,retries:2,timeout:2e3});d.authenticate();let l=await d.exec(s);if(!l)return"No response from server";return l}catch(e){throw warn(`Error while sending rcon command: ${e}`),e}},c=async e=>{if(!i.Z)throw Error("Database not connected");let s=await i.Z.servers.getAll();return await Promise.all(s.map(async s=>{try{let t=await o(s.id,e);return{server:s.hostname,response:t}}catch(e){return{server:s.hostname,response:e}}}))},d=o;r()}catch(e){r(e)}})},46634:(e,s,t)=>{t.a(e,async(e,r)=>{try{t.d(s,{Z:()=>o});var a=t(6995),i=t(899),n=e([a,i]);[a,i]=n.then?(await n)():n;let o=async(e,s,t)=>{if(a.Z)try{a.Z.logs.create(e,s,t);let r=await a.Z.settings.getByKey("discordWebhook",!1);r&&(0,i.Z)({url:r,embeds:[{title:`**▬▬▬▬▬ [LOG :: ${e}] ▬▬▬▬▬**`,color:5352959,description:s,timestamp:new Date().toISOString()}]})}catch(e){error(`Failed to log: ${e}`)}};r()}catch(e){r(e)}})},74186:(e,s,t)=>{t.a(e,async(e,r)=>{try{t.d(s,{Z:()=>l});var a=t(15313),i=t(45616),n=t(429),o=t.n(n),c=e([i]);i=(c.then?(await c)():c)[0];let d=(0,i.default)();d.use(o()({secret:process.env.SESSION_SECRET||"secret",maxAge:10368e6})),d.use(a.Z.initialize()),d.use(a.Z.session());let l=d;r()}catch(e){r(e)}})},15313:(e,s,t)=>{t.d(s,{Z:()=>o});let r=require("passport");var a=t.n(r);let i=require("passport-steam");a().serializeUser(async(e,s)=>{s(null,e)}),a().deserializeUser(async(e,s)=>{s(null,e)});let n=process.env.DOMAIN||"";n.startsWith("http")||(n=`https://${n}`),a().use(new i.Strategy({returnURL:`${n}/api/auth/return`,realm:`${n}/`,apiKey:process.env.STEAM_API_KEY||"",stateless:!0},(e,s,t)=>(s.identifier=e,t(null,s))));let o=a()},73153:(e,s,t)=>{t.a(e,async(e,r)=>{try{t.d(s,{Z:()=>n});var a=t(6995),i=e([a]);a=(i.then?(await i)():i)[0];let n=(e,s,t,r="AND")=>new Promise(async(i,n)=>{if(!a.Z)return s.status(500).json({message:"Database not connected"});if(!e.user)return n(s.status(400).json({success:!1,error:"Protected Route"}));let o=e.user.id,c=await a.Z.admins.getBySteam64(o);if(!c)return n(s.status(401).json({success:!1,error:"Protected Route"}));if(!t)return i(c);let d=null;if("object"==typeof c.flags)d=c.flags;else{let e=await a.Z.adminGroups.getById(c.flags);e&&(d=e.flags)}if(null===d||!("AND"===r?t.every(e=>d.includes(e)):t.some(e=>d.includes(e))))return n(s.status(403).json({success:!1,error:"Protected Route"}));i(c)});r()}catch(e){r(e)}})},42088:(e,s,t)=>{t.a(e,async(e,r)=>{try{t.d(s,{ZP:()=>c,bH:()=>o});var a=t(9926),i=e([a]);a=(i.then?(await i)():i)[0];let n=[{id:"@css/reservation",description:"Reserved slot access."},{id:"@css/generic",description:"Generic admin."},{id:"@css/kick",description:"Kick other players."},{id:"@css/ban",description:"Ban other players."},{id:"@css/unban",description:"Remove bans."},{id:"@css/vip",description:"General vip status."},{id:"@css/slay",description:"Slay/harm other players."},{id:"@css/changemap",description:"Change the map or major gameplay features."},{id:"@css/cvar",description:"Change most cvars."},{id:"@css/config",description:"Execute config files."},{id:"@css/chat",description:"Special chat privileges."},{id:"@css/vote",description:"Start or create votes."},{id:"@css/password",description:"Set a password on the server."},{id:"@css/rcon",description:"Use RCON commands."},{id:"@css/cheats",description:"Change sv_cheats or use cheating commands."},{id:"@css/root",description:"Magically enables all flags and ignores immunity values."},{id:"@web/root",description:"Web panel root access."},{id:"@web/admins",description:"Manage web admins."},{id:"@web/admingroups",description:"Manage web admin groups."},{id:"@web/bans",description:"Manage bans."},{id:"@web/mutes",description:"Manage mutes."},{id:"@web/logs",description:"View panel logs."},{id:"@web/stats",description:"View server statistics."},{id:"@web/servers",description:"Manage servers."}].map(e=>e.id),o=a.z.string().refine(e=>n.includes(e)||e.startsWith("#"),{message:"The flag is not valid"}),c=a.z.object({player_name:a.z.string().min(3).regex(/^[\w\s]+$/),player_steamid:a.z.string().regex(/^7656119\d{10}$/),server_id:a.z.array(a.z.string()).nullable(),flags:a.z.union([a.z.array(o),o]),immunity:a.z.string().min(0).max(100)});r()}catch(e){r(e)}})}};var s=require("../../../webpack-api-runtime.js");s.C(e);var t=e=>s(s.s=e),r=s.X(0,[4065],()=>t(88179));module.exports=r})();