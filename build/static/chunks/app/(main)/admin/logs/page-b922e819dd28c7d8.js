(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6567],{1534:function(e,t,n){Promise.resolve().then(n.bind(n,5891))},7512:function(e,t,n){"use strict";n.r(t);var r=n(1840),i=n(7917),l=n(1318),o=n(4740),s=n(646);t.default=e=>{let{children:t,flags:n}=e,{admin:a,isLoading:u}=(0,s.ZP)(),c=(0,l.useRouter)();return(0,o.useEffect)(()=>{if(!u){if(!a)return c.push("/");if(n.length>0&&!n.some(e=>{var t;return null===(t=a.flags)||void 0===t?void 0:t.includes(e)}))return c.push("/admin")}},[a,u,c,n]),u?(0,r.jsx)(i.c,{}):a?(0,r.jsx)(r.Fragment,{children:t}):(0,r.jsx)(r.Fragment,{children:"No Access"})}},8136:function(e,t,n){"use strict";n.r(t),n.d(t,{ADMIN_TABS:function(){return s}});var r=n(1840),i=n(1318),l=n(994),o=n(986);t.default=()=>{let e=(0,i.usePathname)(),t=(0,i.useRouter)();return(0,r.jsx)(l.n,{"aria-label":"Admin-tabs",selectedKey:e,onSelectionChange:e=>t.push(e),items:s,children:e=>(0,r.jsx)(o.r,{title:e.title},e.path)})};let s=[{path:"/admin",title:"Statistics",permissions:[]},{path:"/admin/admins",title:"Manage Admins",permissions:["@web/root","@css/root","@web/admins"]},{path:"/admin/servers",title:"Manage Servers",permissions:["@web/root","@css/root","@web/servers"]},{path:"/admin/bans",title:"Manage Bans",permissions:["@web/root","@css/root","@web/bans"]},{path:"/admin/mutes",title:"Manage Mutes",permissions:["@web/root","@css/root","@web/mutes"]},{path:"/admin/logs",title:"Logs",permissions:["@web/root","@css/root","@web/logs"]},{path:"/admin/settings",title:"Panel Settings",permissions:["@web/root","@css/root"]}]},5891:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return j}});var r=n(1840),i=n(4740),l=n(5458),o=n(673),s=n(1070),a=n(700),u=n(3691),c=n(7917),d=n(1318),f=n(8136),h=n(7463);function m(e,t){return e===t}function p(e,t){return t}var g=n(7512),y=n(175),v=n(917),b=n(7313),w=n(8568),x=n(9919),M=e=>{var t,n,i;let{admin:u,message:c,title:d,time:f}=e;return(0,r.jsxs)(l.w,{fullWidth:!0,children:[u&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(o.u,{className:"flex gap-3",children:[(0,r.jsx)(b.J,{alt:(null===(t=u.user)||void 0===t?void 0:t.personaname)||u.player_name,height:40,radius:"sm",src:null===(n=u.user)||void 0===n?void 0:n.avatarmedium,width:40}),(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsx)("p",{className:"text-md font-medium",children:(null===(i=u.user)||void 0===i?void 0:i.personaname)||u.player_name}),(0,r.jsx)("p",{className:"text-small text-default-500",children:"Flags"})]})]}),(0,r.jsx)(w.j,{})]}),(0,r.jsxs)(s.G,{children:[(0,r.jsx)("h4",{className:"text-lg font-medium",children:d}),(0,r.jsx)("p",{className:"text-sm",children:c})]}),(0,r.jsx)(w.j,{}),(0,r.jsx)(a.i,{className:"text-sm",children:(0,x.Q)(f)+" ago"})]})},j=()=>{var e,t,n,b,w,x,j,K;let[k,N]=(0,i.useState)(1),[S,W]=(0,i.useState)(""),[C]=(n=t&&t.equalityFn||m,w=(b=(0,i.useReducer)(p,S))[0],x=b[1],j=function(e,t,n){var r=this,l=(0,i.useRef)(null),o=(0,i.useRef)(0),s=(0,i.useRef)(null),a=(0,i.useRef)([]),u=(0,i.useRef)(),c=(0,i.useRef)(),d=(0,i.useRef)(e),f=(0,i.useRef)(!0);d.current=e;var h=!t&&0!==t;if("function"!=typeof e)throw TypeError("Expected a function");t=+t||0;var m=!!(n=n||{}).leading,p=!("trailing"in n)||!!n.trailing,g="maxWait"in n,y="debounceOnServer"in n&&!!n.debounceOnServer,v=g?Math.max(+n.maxWait||0,t):null;return(0,i.useEffect)(function(){return f.current=!0,function(){f.current=!1}},[]),(0,i.useMemo)(function(){var e=function(e){var t=a.current,n=u.current;return a.current=u.current=null,o.current=e,c.current=d.current.apply(n,t)},n=function(e,t){h&&cancelAnimationFrame(s.current),s.current=h?requestAnimationFrame(e):setTimeout(e,t)},i=function(e){if(!f.current)return!1;var n=e-l.current;return!l.current||n>=t||n<0||g&&e-o.current>=v},y=function(t){return s.current=null,p&&a.current?e(t):(a.current=u.current=null,c.current)},b=function e(){var r=Date.now();if(i(r))return y(r);if(f.current){var s=t-(r-l.current);n(e,g?Math.min(s,v-(r-o.current)):s)}},w=function(){var d=Date.now(),h=i(d);if(a.current=[].slice.call(arguments),u.current=r,l.current=d,h){if(!s.current&&f.current)return o.current=l.current,n(b,t),m?e(l.current):c.current;if(g)return n(b,t),e(l.current)}return s.current||n(b,t),c.current};return w.cancel=function(){s.current&&(h?cancelAnimationFrame(s.current):clearTimeout(s.current)),o.current=0,a.current=l.current=u.current=s.current=null},w.isPending=function(){return!!s.current},w.flush=function(){return s.current?y(Date.now()):c.current},w},[m,g,t,v,p,h,!0,y])}((0,i.useCallback)(function(e){return x(e)},[x]),1e3,t),n((K=(0,i.useRef)(S)).current,S)||(j(S),K.current=S),[w,j]),{data:R,isLoading:I}=(0,v.ZP)("/api/admin/logs?page=".concat(k,"&rows=").concat(20,"&query=").concat(C),y.Z,{keepPreviousData:!0}),E=(0,i.useMemo)(()=>(null==R?void 0:R.count)?Math.ceil(R.count/20):0,[null==R?void 0:R.count,20]),T=(0,d.usePathname)(),A=f.ADMIN_TABS.find(e=>e.path===T);return(0,r.jsx)(g.default,{flags:(null==A?void 0:A.permissions)||[],children:(0,r.jsxs)(l.w,{children:[(0,r.jsxs)(o.u,{className:"text-2xl font-medium flex flex-row justify-between items-center",children:[(0,r.jsx)("div",{children:"Logs"}),(0,r.jsx)(h.Y,{label:"Search...",placeholder:"You can search by title or message...",className:"w-1/5",value:S,onValueChange:W,isClearable:!0})]}),(0,r.jsx)(s.G,{className:"grid grid-cols-3 gap-4",children:I?(0,r.jsx)(c.c,{}):R&&(null===(e=R.results)||void 0===e?void 0:e.map(e=>(0,i.createElement)(M,{...e,key:e.id})))}),(0,r.jsx)(a.i,{children:(0,r.jsx)(u.g,{color:"primary",page:k,total:E,onChange:e=>N(e),className:"mx-auto mt-10",size:"sm",isCompact:!0,showControls:!0,showShadow:!0})})]})})}},175:function(e,t,n){"use strict";var r=n(1916);t.Z=e=>r.Z.get(e).then(e=>e.data)},646:function(e,t,n){"use strict";n.d(t,{hY:function(){return s},jc:function(){return a}});var r=n(2573),i=n(917),l=n(175),o=n(1916);let s=async()=>{await (0,o.Z)("/api/auth/logout"),await (0,i.JG)("/api/auth"),r.Am.success("Logged out successfully")},a=()=>{let e=window.innerWidth/2-300,t=window.innerHeight/2-400,n=window.open("/api/auth/login/","","toolbar=no, location=no, directories=no, status=no, menubar=no, \n		  scrollbars=no, resizable=yes, copyhistory=no, width=".concat(600,", \n		  height=").concat(800,", top=").concat(t,", left=").concat(e)),l=setInterval(async()=>{n&&n.closed&&(await (0,i.JG)("/api/auth"),r.Am.success("Logged in successfully!"),clearInterval(l))},1e3)};t.ZP=()=>{let{data:e,isLoading:t,error:n}=(0,i.ZP)("/api/auth",l.Z);return e&&e.admin&&e.admin.group&&(e.admin.flags=e.admin.group.flags,e.admin.immunity=e.admin.group.immunity),{user:n||!e?null:e.user,admin:n||!e?null:e.admin,isLoading:t}}},700:function(e,t,n){"use strict";n.d(t,{i:function(){return u}});var r=n(9226),i=n(6840),l=n(9763),o=n(7614),s=n(1840),a=(0,i.Gp)((e,t)=>{var n;let{as:i,className:a,children:u,...c}=e,d=(0,l.gy)(t),{slots:f,classNames:h}=(0,r.R)(),m=(0,o.W)(null==h?void 0:h.footer,a);return(0,s.jsx)(i||"div",{ref:d,className:null==(n=f.footer)?void 0:n.call(f,{class:m}),...c,children:u})});a.displayName="NextUI.CardFooter";var u=a},8568:function(e,t,n){"use strict";n.d(t,{j:function(){return u}});var r=n(6),i=(0,n(2419).tv)({base:"shrink-0 bg-divider border-none",variants:{orientation:{horizontal:"w-full h-divider",vertical:"h-full w-divider"}},defaultVariants:{orientation:"horizontal"}}),l=n(4740),o=n(6840),s=n(1840),a=(0,o.Gp)((e,t)=>{let{Component:n,getDividerProps:o}=function(e){var t;let n,o;let{as:s,className:a,orientation:u,...c}=e,d=s||"hr";"hr"===d&&"vertical"===u&&(d="div");let{separatorProps:f}=(t={elementType:"string"==typeof d?d:"hr",orientation:u},o=(0,r.z)(t,{enabled:"string"==typeof t.elementType}),("vertical"===t.orientation&&(n="vertical"),"hr"!==t.elementType)?{separatorProps:{...o,role:"separator","aria-orientation":n}}:{separatorProps:o}),h=(0,l.useMemo)(()=>i({orientation:u,className:a}),[u,a]);return{Component:d,getDividerProps:(0,l.useCallback)(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return{className:h,role:"separator","data-orientation":u,...f,...c,...e}},[h,u,f,c])}}({...e});return(0,s.jsx)(n,{ref:t,...o()})});a.displayName="NextUI.Divider";var u=a},8273:function(e,t,n){"use strict";n.d(t,{e:function(){return r},x:function(){return i}});var r=e=>(null==e?void 0:e.length)<=4?e:null==e?void 0:e.slice(0,3),i=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];let r=" ";for(let e of t)if("string"==typeof e&&e.length>0){r=e;break}return r}},9584:function(e,t,n){"use strict";n.d(t,{BA:function(){return u},n_:function(){return a}});var r=n(7493),i=n(4740),l=n(7018),o=n(3510);class s{*[Symbol.iterator](){yield*this.iterable}get size(){return this.keyMap.size}getKeys(){return this.keyMap.keys()}getKeyBefore(e){let t=this.keyMap.get(e);return t?t.prevKey:null}getKeyAfter(e){let t=this.keyMap.get(e);return t?t.nextKey:null}getFirstKey(){return this.firstKey}getLastKey(){return this.lastKey}getItem(e){return this.keyMap.get(e)}at(e){let t=[...this.getKeys()];return this.getItem(t[e])}getChildren(e){let t=this.keyMap.get(e);return(null==t?void 0:t.childNodes)||[]}constructor(e){let t;this.keyMap=new Map,this.iterable=e;let n=e=>{if(this.keyMap.set(e.key,e),e.childNodes&&"section"===e.type)for(let t of e.childNodes)n(t)};for(let t of e)n(t);let r=0;for(let[e,n]of this.keyMap)t?(t.nextKey=e,n.prevKey=t.key):(this.firstKey=e,n.prevKey=void 0),"item"===n.type&&(n.index=r++),(t=n).nextKey=void 0;this.lastKey=null==t?void 0:t.key}}function a(e){let{filter:t}=e,n=(0,r.q)(e),o=(0,i.useMemo)(()=>e.disabledKeys?new Set(e.disabledKeys):new Set,[e.disabledKeys]),a=(0,i.useCallback)(e=>new s(t?t(e):e),[t]),u=(0,i.useMemo)(()=>({suppressTextValueWarning:e.suppressTextValueWarning}),[e.suppressTextValueWarning]),c=(0,l.Kx)(e,a,u),d=(0,i.useMemo)(()=>new r.Z(c,n),[c,n]),f=(0,i.useRef)(null);return(0,i.useEffect)(()=>{if(null!=n.focusedKey&&!c.getItem(n.focusedKey)){let e;let t=f.current.getItem(n.focusedKey),r=[...f.current.getKeys()].map(e=>{let t=f.current.getItem(e);return"item"===t.type?t:null}).filter(e=>null!==e),i=[...c.getKeys()].map(e=>{let t=c.getItem(e);return"item"===t.type?t:null}).filter(e=>null!==e),l=r.length-i.length,o=Math.min(l>1?Math.max(t.index-l+1,0):t.index,i.length-1);for(;o>=0;){if(!d.isDisabled(i[o].key)){e=i[o];break}o<i.length-1?o++:(o>t.index&&(o=t.index),o--)}n.setFocusedKey(e?e.key:null)}f.current=c},[c,d,n,n.focusedKey]),{collection:c,disabledKeys:o,selectionManager:d}}function u(e){var t;let[n,r]=(0,o.zk)(e.selectedKey,null!==(t=e.defaultSelectedKey)&&void 0!==t?t:null,e.onSelectionChange),l=(0,i.useMemo)(()=>null!=n?[n]:[],[n]),{collection:s,disabledKeys:u,selectionManager:c}=a({...e,selectionMode:"single",disallowEmptySelection:!0,allowDuplicateSelectionEvents:!0,selectedKeys:l,onSelectionChange:t=>{var i;let l=null!==(i=t.values().next().value)&&void 0!==i?i:null;l===n&&e.onSelectionChange&&e.onSelectionChange(l),r(l)}}),d=null!=n?s.getItem(n):null;return{collection:s,disabledKeys:u,selectionManager:c,selectedKey:n,setSelectedKey:r,selectedItem:d}}},5346:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});let r=e=>"object"==typeof e&&null!=e&&1===e.nodeType,i=(e,t)=>(!t||"hidden"!==e)&&"visible"!==e&&"clip"!==e,l=(e,t)=>{if(e.clientHeight<e.scrollHeight||e.clientWidth<e.scrollWidth){let n=getComputedStyle(e,null);return i(n.overflowY,t)||i(n.overflowX,t)||(e=>{let t=(e=>{if(!e.ownerDocument||!e.ownerDocument.defaultView)return null;try{return e.ownerDocument.defaultView.frameElement}catch(e){return null}})(e);return!!t&&(t.clientHeight<e.scrollHeight||t.clientWidth<e.scrollWidth)})(e)}return!1},o=(e,t,n,r,i,l,o,s)=>l<e&&o>t||l>e&&o<t?0:l<=e&&s<=n||o>=t&&s>=n?l-e-r:o>t&&s<n||l<e&&s>n?o-t+i:0,s=e=>{let t=e.parentElement;return null==t?e.getRootNode().host||null:t},a=(e,t)=>{var n,i,a,u;if("undefined"==typeof document)return[];let{scrollMode:c,block:d,inline:f,boundary:h,skipOverflowHiddenElements:m}=t,p="function"==typeof h?h:e=>e!==h;if(!r(e))throw TypeError("Invalid target");let g=document.scrollingElement||document.documentElement,y=[],v=e;for(;r(v)&&p(v);){if((v=s(v))===g){y.push(v);break}null!=v&&v===document.body&&l(v)&&!l(document.documentElement)||null!=v&&l(v,m)&&y.push(v)}let b=null!=(i=null==(n=window.visualViewport)?void 0:n.width)?i:innerWidth,w=null!=(u=null==(a=window.visualViewport)?void 0:a.height)?u:innerHeight,{scrollX:x,scrollY:M}=window,{height:j,width:K,top:k,right:N,bottom:S,left:W}=e.getBoundingClientRect(),{top:C,right:R,bottom:I,left:E}=(e=>{let t=window.getComputedStyle(e);return{top:parseFloat(t.scrollMarginTop)||0,right:parseFloat(t.scrollMarginRight)||0,bottom:parseFloat(t.scrollMarginBottom)||0,left:parseFloat(t.scrollMarginLeft)||0}})(e),T="start"===d||"nearest"===d?k-C:"end"===d?S+I:k+j/2-C+I,A="center"===f?W+K/2-E+R:"end"===f?N+R:W-E,F=[];for(let e=0;e<y.length;e++){let t=y[e],{height:n,width:r,top:i,right:l,bottom:s,left:a}=t.getBoundingClientRect();if("if-needed"===c&&k>=0&&W>=0&&S<=w&&N<=b&&k>=i&&S<=s&&W>=a&&N<=l)break;let u=getComputedStyle(t),h=parseInt(u.borderLeftWidth,10),m=parseInt(u.borderTopWidth,10),p=parseInt(u.borderRightWidth,10),v=parseInt(u.borderBottomWidth,10),C=0,R=0,I="offsetWidth"in t?t.offsetWidth-t.clientWidth-h-p:0,E="offsetHeight"in t?t.offsetHeight-t.clientHeight-m-v:0,H="offsetWidth"in t?0===t.offsetWidth?0:r/t.offsetWidth:0,D="offsetHeight"in t?0===t.offsetHeight?0:n/t.offsetHeight:0;if(g===t)C="start"===d?T:"end"===d?T-w:"nearest"===d?o(M,M+w,w,m,v,M+T,M+T+j,j):T-w/2,R="start"===f?A:"center"===f?A-b/2:"end"===f?A-b:o(x,x+b,b,h,p,x+A,x+A+K,K),C=Math.max(0,C+M),R=Math.max(0,R+x);else{C="start"===d?T-i-m:"end"===d?T-s+v+E:"nearest"===d?o(i,s,n,m,v+E,T,T+j,j):T-(i+n/2)+E/2,R="start"===f?A-a-h:"center"===f?A-(a+r/2)+I/2:"end"===f?A-l+p+I:o(a,l,r,h,p+I,A,A+K,K);let{scrollLeft:e,scrollTop:u}=t;C=0===D?0:Math.max(0,Math.min(u+C/D,t.scrollHeight-n/D+E)),R=0===H?0:Math.max(0,Math.min(e+R/H,t.scrollWidth-r/H+I)),T+=u-C,A+=e-R}F.push({el:t,top:C,left:R})}return F},u=e=>!1===e?{block:"end",inline:"nearest"}:e===Object(e)&&0!==Object.keys(e).length?e:{block:"start",inline:"nearest"};function c(e,t){if(!e.isConnected||!(e=>{let t=e;for(;t&&t.parentNode;){if(t.parentNode===document)return!0;t=t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}return!1})(e))return;if("object"==typeof t&&"function"==typeof t.behavior)return t.behavior(a(e,t));let n="boolean"==typeof t||null==t?void 0:t.behavior;for(let{el:r,top:i,left:l}of a(e,u(t)))r.scroll({top:i,left:l,behavior:n})}}},function(e){e.O(0,[1356,298,3277,4594,5792,9355,9869,7241,3290,7942,1784,1744],function(){return e(e.s=1534)}),_N_E=e.O()}]);