(()=>{var e={};e.id=7165,e.ids=[7165],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},39491:e=>{"use strict";e.exports=require("assert")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},41808:e=>{"use strict";e.exports=require("net")},70612:e=>{"use strict";e.exports=require("node:os")},97742:e=>{"use strict";e.exports=require("node:process")},25997:e=>{"use strict";e.exports=require("node:tty")},22037:e=>{"use strict";e.exports=require("os")},71017:e=>{"use strict";e.exports=require("path")},77282:e=>{"use strict";e.exports=require("process")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},39512:e=>{"use strict";e.exports=require("timers")},24404:e=>{"use strict";e.exports=require("tls")},76224:e=>{"use strict";e.exports=require("tty")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},26e3:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>c,pages:()=>u,routeModule:()=>m,tree:()=>d});var s=r(8605),i=r(1403),n=r(49663),o=r.n(n),l=r(66381),a={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(a[e]=()=>l[e]);r.d(t,a);let d=["",{children:["(main)",{children:["admin",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,2655)),"C:\\Projects\\CSS-Panel\\app\\(main)\\admin\\page.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,94906)),"C:\\Projects\\CSS-Panel\\app\\(main)\\admin\\layout.tsx"]}]},{"not-found":[()=>Promise.resolve().then(r.t.bind(r,89672,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,91090)),"C:\\Projects\\CSS-Panel\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,89672,23)),"next/dist/client/components/not-found-error"]}],u=["C:\\Projects\\CSS-Panel\\app\\(main)\\admin\\page.tsx"],c="/(main)/admin/page",p={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/(main)/admin/page",pathname:"/admin",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},17667:(e,t,r)=>{Promise.resolve().then(r.bind(r,68888)),Promise.resolve().then(r.bind(r,88547))},33175:(e,t,r)=>{Promise.resolve().then(r.bind(r,74704))},68888:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var s=r(98284),i=r(37297),n=r(36065),o=r(22173),l=r(46705);let a=({children:e,flags:t})=>{let{admin:r,isLoading:a}=(0,l.ZP)(),d=(0,n.useRouter)();return(0,o.useEffect)(()=>{if(!a){if(!r)return d.push("/");if(t.length>0&&!t.some(e=>r.flags?.includes(e)))return d.push("/admin")}},[r,a,d,t]),a?s.jsx(i.c,{}):r?s.jsx(s.Fragment,{children:e}):s.jsx(s.Fragment,{children:"No Access"})}},88547:(e,t,r)=>{"use strict";r.r(t),r.d(t,{ADMIN_TABS:()=>a,default:()=>l});var s=r(98284),i=r(36065),n=r(85265),o=r(77003);let l=()=>{let e=(0,i.usePathname)(),t=(0,i.useRouter)();return s.jsx(n.n,{"aria-label":"Admin-tabs",selectedKey:e,onSelectionChange:e=>t.push(e),items:a,children:e=>s.jsx(o.r,{title:e.title},e.path)})},a=[{path:"/admin",title:"Statistics",permissions:[]},{path:"/admin/admins",title:"Manage Admins",permissions:["@web/root","@css/root","@web/admins"]},{path:"/admin/servers",title:"Manage Servers",permissions:["@web/root","@css/root","@web/servers"]},{path:"/admin/bans",title:"Manage Bans",permissions:["@web/root","@css/root","@web/bans"]},{path:"/admin/mutes",title:"Manage Mutes",permissions:["@web/root","@css/root","@web/mutes"]},{path:"/admin/logs",title:"Logs",permissions:["@web/root","@css/root","@web/logs"]},{path:"/admin/settings",title:"Panel Settings",permissions:["@web/root","@css/root"]}]},74704:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var s=r(98284),i=r(68290),n=r(11076),o=r(53167);let l=()=>(0,s.jsxs)(i.w,{children:[s.jsx(n.u,{className:"text-2xl font-medium flex flex-row justify-between",children:"Statistics"}),s.jsx(o.G,{children:"To be added"})]})},94906:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>h,metadata:()=>m});var s=r(88640),i=r(11728);let n=(0,i.createProxy)(String.raw`C:\Projects\CSS-Panel\app\(main)\admin\UI\Tabs.tsx`),{__esModule:o,$$typeof:l}=n,a=n.default;(0,i.createProxy)(String.raw`C:\Projects\CSS-Panel\app\(main)\admin\UI\Tabs.tsx#ADMIN_TABS`);let d=(0,i.createProxy)(String.raw`C:\Projects\CSS-Panel\app\(main)\admin\UI\AdminCheck.tsx`),{__esModule:u,$$typeof:c}=d,p=d.default,m={title:"Admin Panel"},h=({children:e})=>(0,s.jsxs)(p,{flags:[],children:[s.jsx(a,{}),e]})},2655:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>n,__esModule:()=>i,default:()=>o});let s=(0,r(11728).createProxy)(String.raw`C:\Projects\CSS-Panel\app\(main)\admin\page.tsx`),{__esModule:i,$$typeof:n}=s,o=s.default},53167:(e,t,r)=>{"use strict";r.d(t,{G:()=>d});var s=r(80854),i=r(29853),n=r(71711),o=r(3411),l=r(98284),a=(0,i.Gp)((e,t)=>{var r;let{as:i,className:a,children:d,...u}=e,c=(0,n.gy)(t),{slots:p,classNames:m}=(0,s.R)(),h=(0,o.W)(null==m?void 0:m.body,a);return(0,l.jsx)(i||"div",{ref:c,className:null==(r=p.body)?void 0:r.call(p,{class:h}),...u,children:d})});a.displayName="NextUI.CardBody";var d=a},68290:(e,t,r)=>{"use strict";r.d(t,{w:()=>w});var s=r(80854),i=r(14090),n=r(33244),o=(0,i.tv)({slots:{base:["flex","flex-col","relative","overflow-hidden","height-auto","outline-none","text-foreground","box-border","bg-content1",...n.Dh],header:["flex","p-3","z-10","w-full","justify-start","items-center","shrink-0","overflow-inherit","color-inherit","subpixel-antialiased"],body:["relative","flex","flex-1","w-full","p-3","flex-auto","flex-col","place-content-inherit","align-items-inherit","h-auto","break-words","text-left","overflow-y-auto","subpixel-antialiased"],footer:["p-3","h-auto","flex","w-full","items-center","overflow-hidden","color-inherit","subpixel-antialiased"]},variants:{shadow:{none:{base:"shadow-none"},sm:{base:"shadow-small"},md:{base:"shadow-medium"},lg:{base:"shadow-large"}},radius:{none:{base:"rounded-none",header:"rounded-none",footer:"rounded-none"},sm:{base:"rounded-small",header:"rounded-t-small",footer:"rounded-b-small"},md:{base:"rounded-medium",header:"rounded-t-medium",footer:"rounded-b-medium"},lg:{base:"rounded-large",header:"rounded-t-large",footer:"rounded-b-large"}},fullWidth:{true:{base:"w-full"}},isHoverable:{true:{base:"data-[hover=true]:bg-content2 dark:data-[hover=true]:bg-content2"}},isPressable:{true:{base:"cursor-pointer"}},isBlurred:{true:{base:["bg-background/80","dark:bg-background/20","backdrop-blur-md","backdrop-saturate-150"]}},isFooterBlurred:{true:{footer:["bg-background/10","backdrop-blur","backdrop-saturate-150"]}},isDisabled:{true:{base:"opacity-disabled cursor-not-allowed"}},disableAnimation:{true:"",false:{base:"transition-transform-background motion-reduce:transition-none"}}},compoundVariants:[{isPressable:!0,disableAnimation:!1,class:"data-[pressed=true]:scale-[0.97] tap-highlight-transparent"}],defaultVariants:{radius:"lg",shadow:"md",fullWidth:!1,isHoverable:!1,isPressable:!1,isDisabled:!1,disableAnimation:!1,isFooterBlurred:!1}}),l=r(22173),a=r(76729),d=r(73530),u=r(28397),c=r(5058),p=r(29853),m=r(3411),h=r(31865),f=r(15546),b=r(71711),g=r(71921),x=r(88431),y=r(98284),v=(0,p.Gp)((e,t)=>{let{children:r,context:i,Component:n,isPressable:v,disableAnimation:w,disableRipple:P,getCardProps:k,getRippleProps:C}=function(e){let[t,r]=(0,p.oe)(e,o.variantKeys),{ref:s,as:i,children:n,disableRipple:x=!1,onClick:y,onPress:v,autoFocus:w,className:P,classNames:k,allowTextSelectionOnPress:C=!0,...M}=t,S=(0,b.gy)(s),K=i||(e.isPressable?"button":"div"),j="string"==typeof K,q=(0,m.W)(null==k?void 0:k.base,P),{onClick:W,onClear:A,ripples:I}=(0,g.i)(),_=t=>{e.disableAnimation||x||!S.current||W(t)},{buttonProps:N,isPressed:B}=(0,c.j)({onPress:v,elementType:i,isDisabled:!e.isPressable,onClick:(0,a.tS)(y,_),allowTextSelectionOnPress:C,...M},S),{hoverProps:H,isHovered:D}=(0,u.XI)({isDisabled:!e.isHoverable,...M}),{isFocusVisible:T,isFocused:E,focusProps:F}=(0,d.Fx)({autoFocus:w}),R=(0,l.useMemo)(()=>o({...r}),[...Object.values(r)]),G=(0,l.useMemo)(()=>({isDisabled:e.isDisabled,isFooterBlurred:e.isFooterBlurred,disableAnimation:e.disableAnimation,fullWidth:e.fullWidth,slots:R,classNames:k}),[R,k,e.isDisabled,e.isFooterBlurred,e.disableAnimation,e.fullWidth]),V=(0,l.useCallback)((t={})=>({ref:S,className:R.base({class:q}),tabIndex:e.isPressable?0:-1,"data-hover":(0,h.PB)(D),"data-pressed":(0,h.PB)(B),"data-focus":(0,h.PB)(E),"data-focus-visible":(0,h.PB)(T),"data-disabled":(0,h.PB)(e.isDisabled),...(0,a.dG)(e.isPressable?{...N,...F,role:"button"}:{},e.isHoverable?H:{},(0,f.z)(M,{enabled:j}),(0,f.z)(t))}),[S,R,q,j,e.isPressable,e.isHoverable,e.isDisabled,D,B,T,N,F,H,M]),z=(0,l.useCallback)(()=>({ripples:I,onClear:A}),[I,A]);return{context:G,domRef:S,Component:K,classNames:k,children:n,isHovered:D,isPressed:B,isPressable:e.isPressable,isHoverable:e.isHoverable,disableAnimation:e.disableAnimation,disableRipple:x,handleClick:_,isFocusVisible:T,getCardProps:V,getRippleProps:z}}({...e,ref:t});return(0,y.jsxs)(n,{...k(),children:[(0,y.jsx)(s.k,{value:i,children:r}),v&&!w&&!P&&(0,y.jsx)(x.L,{...C()})]})});v.displayName="NextUI.Card";var w=v},11076:(e,t,r)=>{"use strict";r.d(t,{u:()=>d});var s=r(80854),i=r(29853),n=r(71711),o=r(3411),l=r(98284),a=(0,i.Gp)((e,t)=>{var r;let{as:i,className:a,children:d,...u}=e,c=(0,n.gy)(t),{slots:p,classNames:m}=(0,s.R)(),h=(0,o.W)(null==m?void 0:m.header,a);return(0,l.jsx)(i||"div",{ref:c,className:null==(r=p.header)?void 0:r.call(p,{class:h}),...u,children:d})});a.displayName="NextUI.CardHeader";var d=a},80854:(e,t,r)=>{"use strict";r.d(t,{R:()=>i,k:()=>s});var[s,i]=(0,r(62432).k)({name:"CardContext",strict:!0,errorMessage:"useCardContext: `context` is undefined. Seems you forgot to wrap component within <Card />"})},82863:(e,t,r)=>{"use strict";r.d(t,{t:()=>i});var s=r(22173);function i(e={}){let{rerender:t=!1,delay:r=0}=e,i=(0,s.useRef)(!1),[n,o]=(0,s.useState)(!1);return(0,s.useEffect)(()=>{i.current=!0;let e=null;return t&&(r>0?e=setTimeout(()=>{o(!0)},r):o(!0)),()=>{i.current=!1,t&&o(!1),e&&clearTimeout(e)}},[t]),[(0,s.useCallback)(()=>i.current,[]),n]}},8694:(e,t,r)=>{"use strict";r.d(t,{BA:()=>d,n_:()=>a});var s=r(9784),i=r(22173),n=r(44984),o=r(80547);class l{*[Symbol.iterator](){yield*this.iterable}get size(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){let t=this.keyMap.get(e);return t?t.prevKey:null}getKeyAfter(e){let t=this.keyMap.get(e);return t?t.nextKey:null}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)}at(e){let t=[...this.getKeys()];return this.getItem(t[e])}getChildren(e){let t=this.keyMap.get(e);return(null==t?void 0:t.childNodes)||[]}constructor(e){let t;this.keyMap=new Map,this.iterable=e;let r=e=>{if(this.keyMap.set(e.key,e),e.childNodes&&"section"===e.type)for(let t of e.childNodes)r(t)};for(let t of e)r(t);let s=0;for(let[e,r]of this.keyMap)t?(t.nextKey=e,r.prevKey=t.key):(this.firstKey=e,r.prevKey=void 0),"item"===r.type&&(r.index=s++),(t=r).nextKey=void 0;this.lastKey=null==t?void 0:t.key}}function a(e){let{filter:t}=e,r=(0,s.q)(e),o=(0,i.useMemo)(()=>e.disabledKeys?new Set(e.disabledKeys):new Set,[e.disabledKeys]),a=(0,i.useCallback)(e=>new l(t?t(e):e),[t]),d=(0,i.useMemo)(()=>({suppressTextValueWarning:e.suppressTextValueWarning}),[e.suppressTextValueWarning]),u=(0,n.Kx)(e,a,d),c=(0,i.useMemo)(()=>new s.Z(u,r),[u,r]),p=(0,i.useRef)(null);return(0,i.useEffect)(()=>{if(null!=r.focusedKey&&!u.getItem(r.focusedKey)){let e;let t=p.current.getItem(r.focusedKey),s=[...p.current.getKeys()].map(e=>{let t=p.current.getItem(e);return"item"===t.type?t:null}).filter(e=>null!==e),i=[...u.getKeys()].map(e=>{let t=u.getItem(e);return"item"===t.type?t:null}).filter(e=>null!==e),n=s.length-i.length,o=Math.min(n>1?Math.max(t.index-n+1,0):t.index,i.length-1);for(;o>=0;){if(!c.isDisabled(i[o].key)){e=i[o];break}o<i.length-1?o++:(o>t.index&&(o=t.index),o--)}r.setFocusedKey(e?e.key:null)}p.current=u},[u,c,r,r.focusedKey]),{collection:u,disabledKeys:o,selectionManager:c}}function d(e){var t;let[r,s]=(0,o.zk)(e.selectedKey,null!==(t=e.defaultSelectedKey)&&void 0!==t?t:null,e.onSelectionChange),n=(0,i.useMemo)(()=>null!=r?[r]:[],[r]),{collection:l,disabledKeys:d,selectionManager:u}=a({...e,selectionMode:"single",disallowEmptySelection:!0,allowDuplicateSelectionEvents:!0,selectedKeys:n,onSelectionChange:t=>{var i;let n=null!==(i=t.values().next().value)&&void 0!==i?i:null;n===r&&e.onSelectionChange&&e.onSelectionChange(n),s(n)}}),c=null!=r?l.getItem(r):null;return{collection:l,disabledKeys:d,selectionManager:u,selectedKey:r,setSelectedKey:s,selectedItem:c}}},58258:(e,t,r)=>{"use strict";r.d(t,{Z:()=>u});let s=e=>"object"==typeof e&&null!=e&&1===e.nodeType,i=(e,t)=>(!t||"hidden"!==e)&&"visible"!==e&&"clip"!==e,n=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){let r=getComputedStyle(e,null);return i(r.overflowY,t)||i(r.overflowX,t)||(e=>{let t=(e=>{if(!e.ownerDocument||!e.ownerDocument.defaultView)return null;try{return e.ownerDocument.defaultView.frameElement}catch(e){return null}})(e);return!!t&&(t.clientHeight<e.scrollHeight||t.clientWidth<e.scrollWidth)})(e)}return!1},o=(e,t,r,s,i,n,o,l)=>n<e&&o>t||n>e&&o<t?0:n<=e&&l<=r||o>=t&&l>=r?n-e-s:o>t&&l<r||n<e&&l>r?o-t+i:0,l=e=>{let t=e.parentElement;return null==t?e.getRootNode().host||null:t},a=(e,t)=>{var r,i,a,d;if("undefined"==typeof document)return[];let{scrollMode:u,block:c,inline:p,boundary:m,skipOverflowHiddenElements:h}=t,f="function"==typeof m?m:e=>e!==m;if(!s(e))throw TypeError("Invalid target");let b=document.scrollingElement||document.documentElement,g=[],x=e;for(;s(x)&&f(x);){if((x=l(x))===b){g.push(x);break}null!=x&&x===document.body&&n(x)&&!n(document.documentElement)||null!=x&&n(x,h)&&g.push(x)}let y=null!=(i=null==(r=window.visualViewport)?void 0:r.width)?i:innerWidth,v=null!=(d=null==(a=window.visualViewport)?void 0:a.height)?d:innerHeight,{scrollX:w,scrollY:P}=window,{height:k,width:C,top:M,right:S,bottom:K,left:j}=e.getBoundingClientRect(),{top:q,right:W,bottom:A,left:I}=(e=>{let t=window.getComputedStyle(e);return{top:parseFloat(t.scrollMarginTop)||0,right:parseFloat(t.scrollMarginRight)||0,bottom:parseFloat(t.scrollMarginBottom)||0,left:parseFloat(t.scrollMarginLeft)||0}})(e),_="start"===c||"nearest"===c?M-q:"end"===c?K+A:M+k/2-q+A,N="center"===p?j+C/2-I+W:"end"===p?S+W:j-I,B=[];for(let e=0;e<g.length;e++){let t=g[e],{height:r,width:s,top:i,right:n,bottom:l,left:a}=t.getBoundingClientRect();if("if-needed"===u&&M>=0&&j>=0&&K<=v&&S<=y&&M>=i&&K<=l&&j>=a&&S<=n)break;let d=getComputedStyle(t),m=parseInt(d.borderLeftWidth,10),h=parseInt(d.borderTopWidth,10),f=parseInt(d.borderRightWidth,10),x=parseInt(d.borderBottomWidth,10),q=0,W=0,A="offsetWidth"in t?t.offsetWidth-t.clientWidth-m-f:0,I="offsetHeight"in t?t.offsetHeight-t.clientHeight-h-x:0,H="offsetWidth"in t?0===t.offsetWidth?0:s/t.offsetWidth:0,D="offsetHeight"in t?0===t.offsetHeight?0:r/t.offsetHeight:0;if(b===t)q="start"===c?_:"end"===c?_-v:"nearest"===c?o(P,P+v,v,h,x,P+_,P+_+k,k):_-v/2,W="start"===p?N:"center"===p?N-y/2:"end"===p?N-y:o(w,w+y,y,m,f,w+N,w+N+C,C),q=Math.max(0,q+P),W=Math.max(0,W+w);else{q="start"===c?_-i-h:"end"===c?_-l+x+I:"nearest"===c?o(i,l,r,h,x+I,_,_+k,k):_-(i+r/2)+I/2,W="start"===p?N-a-m:"center"===p?N-(a+s/2)+A/2:"end"===p?N-n+f+A:o(a,n,s,m,f+A,N,N+C,C);let{scrollLeft:e,scrollTop:d}=t;q=0===D?0:Math.max(0,Math.min(d+q/D,t.scrollHeight-r/D+I)),W=0===H?0:Math.max(0,Math.min(e+W/H,t.scrollWidth-s/H+A)),_+=d-q,N+=e-W}B.push({el:t,top:q,left:W})}return B},d=e=>!1===e?{block:"end",inline:"nearest"}:e===Object(e)&&0!==Object.keys(e).length?e:{block:"start",inline:"nearest"};function u(e,t){if(!e.isConnected||!(e=>{let t=e;for(;t&&t.parentNode;){if(t.parentNode===document)return!0;t=t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}return!1})(e))return;if("object"==typeof t&&"function"==typeof t.behavior)return t.behavior(a(e,t));let r="boolean"==typeof t||null==t?void 0:t.behavior;for(let{el:s,top:i,left:n}of a(e,d(t)))s.scroll({top:i,left:n,behavior:r})}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[4525,7530,5822],()=>r(26e3));module.exports=s})();