function I(){}function En(n){return n()}function bn(){return Object.create(null)}function R(n){n.forEach(En)}function Sn(n){return typeof n=="function"}function Yn(n,e){return n!=n?e==e:n!==e||n&&typeof n=="object"||typeof n=="function"}function qn(n){return Object.keys(n).length===0}function Xn(n,...e){if(n==null)return I;const t=n.subscribe(...e);return t.unsubscribe?()=>t.unsubscribe():t}function $e(n,e,t){n.$$.on_destroy.push(Xn(e,t))}function xe(n,e,t){return n.set(t),e}function Pe(n){return n&&Sn(n.destroy)?n.destroy:I}function Ae(n,e){n.appendChild(e)}function Te(n,e,t){n.insertBefore(e,t||null)}function Gn(n){n.parentNode.removeChild(n)}function Le(n){return document.createElement(n)}function $n(n){return document.createTextNode(n)}function Ie(){return $n(" ")}function ke(){return $n("")}function Fe(n,e,t,r){return n.addEventListener(e,t,r),()=>n.removeEventListener(e,t,r)}function je(n){return function(e){return e.preventDefault(),n.call(this,e)}}function We(n){return function(e){return e.stopPropagation(),n.call(this,e)}}function Me(n,e,t){t==null?n.removeAttribute(e):n.getAttribute(e)!==t&&n.setAttribute(e,t)}function Kn(n){return Array.from(n.childNodes)}function Oe(n,e){e=""+e,n.wholeText!==e&&(n.data=e)}function De(n,e,t,r){t===null?n.style.removeProperty(e):n.style.setProperty(e,t,r?"important":"")}function Ue(n,e){for(let t=0;t<n.options.length;t+=1){const r=n.options[t];if(r.__value===e){r.selected=!0;return}}n.selectedIndex=-1}function Ce(n){const e=n.querySelector(":checked")||n.options[0];return e&&e.__value}let z;function H(n){z=n}function xn(){if(!z)throw new Error("Function called outside component initialization");return z}function Re(n){xn().$$.before_update.push(n)}function ze(n){xn().$$.after_update.push(n)}const N=[],Pn=[],K=[],rn=[],Jn=Promise.resolve();let on=!1;function Qn(){on||(on=!0,Jn.then(An))}function an(n){K.push(n)}function He(n){rn.push(n)}const sn=new Set;let J=0;function An(){const n=z;do{for(;J<N.length;){const e=N[J];J++,H(e),Vn(e.$$)}for(H(null),N.length=0,J=0;Pn.length;)Pn.pop()();for(let e=0;e<K.length;e+=1){const t=K[e];sn.has(t)||(sn.add(t),t())}K.length=0}while(N.length);for(;rn.length;)rn.pop()();on=!1,sn.clear(),H(n)}function Vn(n){if(n.fragment!==null){n.update(),R(n.before_update);const e=n.dirty;n.dirty=[-1],n.fragment&&n.fragment.p(n.ctx,e),n.after_update.forEach(an)}}const Q=new Set;let k;function Ne(){k={r:0,c:[],p:k}}function Be(){k.r||R(k.c),k=k.p}function Tn(n,e){n&&n.i&&(Q.delete(n),n.i(e))}function Ye(n,e,t,r){if(n&&n.o){if(Q.has(n))return;Q.add(n),k.c.push(()=>{Q.delete(n),r&&(t&&n.d(1),r())}),n.o(e)}}const qe=typeof window!="undefined"?window:typeof globalThis!="undefined"?globalThis:global;function Xe(n,e){n.d(1),e.delete(n.key)}function Ge(n,e,t,r,o,h,f,l,a,i,s,c){let u=n.length,v=h.length,d=u;const E={};for(;d--;)E[n[d].key]=d;const y=[],g=new Map,x=new Map;for(d=v;d--;){const m=c(o,h,d),b=t(m);let w=f.get(b);w?r&&w.p(m,e):(w=i(b,m),w.c()),g.set(b,y[d]=w),b in E&&x.set(b,Math.abs(d-E[b]))}const j=new Set,U=new Set;function W(m){Tn(m,1),m.m(l,s),f.set(m.key,m),s=m.first,v--}for(;u&&v;){const m=y[v-1],b=n[u-1],w=m.key,L=b.key;m===b?(s=m.first,u--,v--):g.has(L)?!f.has(w)||j.has(w)?W(m):U.has(L)?u--:x.get(w)>x.get(L)?(U.add(w),W(m)):(j.add(L),u--):(a(b,f),u--)}for(;u--;){const m=n[u];g.has(m.key)||a(m,f)}for(;v;)W(y[v-1]);return y}function Ke(n,e,t){const r=n.$$.props[e];r!==void 0&&(n.$$.bound[r]=t,t(n.$$.ctx[r]))}function Je(n){n&&n.c()}function Zn(n,e,t,r){const{fragment:o,on_mount:h,on_destroy:f,after_update:l}=n.$$;o&&o.m(e,t),r||an(()=>{const a=h.map(En).filter(Sn);f?f.push(...a):R(a),n.$$.on_mount=[]}),l.forEach(an)}function ne(n,e){const t=n.$$;t.fragment!==null&&(R(t.on_destroy),t.fragment&&t.fragment.d(e),t.on_destroy=t.fragment=null,t.ctx=[])}function ee(n,e){n.$$.dirty[0]===-1&&(N.push(n),Qn(),n.$$.dirty.fill(0)),n.$$.dirty[e/31|0]|=1<<e%31}function Qe(n,e,t,r,o,h,f,l=[-1]){const a=z;H(n);const i=n.$$={fragment:null,ctx:null,props:h,update:I,not_equal:o,bound:bn(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(a?a.$$.context:[])),callbacks:bn(),dirty:l,skip_bound:!1,root:e.target||a.$$.root};f&&f(i.root);let s=!1;if(i.ctx=t?t(n,e.props||{},(c,u,...v)=>{const d=v.length?v[0]:u;return i.ctx&&o(i.ctx[c],i.ctx[c]=d)&&(!i.skip_bound&&i.bound[c]&&i.bound[c](d),s&&ee(n,c)),u}):[],i.update(),s=!0,R(i.before_update),i.fragment=r?r(i.ctx):!1,e.target){if(e.hydrate){const c=Kn(e.target);i.fragment&&i.fragment.l(c),c.forEach(Gn)}else i.fragment&&i.fragment.c();e.intro&&Tn(n.$$.fragment),Zn(n,e.target,e.anchor,e.customElement),An()}H(a)}class Ve{$destroy(){ne(this,1),this.$destroy=I}$on(e,t){const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(t),()=>{const o=r.indexOf(t);o!==-1&&r.splice(o,1)}}$set(e){this.$$set&&!qn(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const te=300,re=60,Ln="none";function B(n,e,t){return n.addEventListener(e,t),()=>n.removeEventListener(e,t)}function ie(n,e){return e.filter(t=>n.pointerId!==t.pointerId)}function V(n,e,t,r,o){n.dispatchEvent(new CustomEvent(`${e}${o}`,{detail:{event:t,pointersCount:r.length}}))}function oe(n,e,t,r,o,h=Ln){e.style.touchAction=h;let f=[];function l(i){f.push(i),V(e,n,i,f,"down"),r==null||r(f,i);const s=i.pointerId;function c(g){s===g.pointerId&&(f=ie(g,f),f.length||u(),V(e,n,g,f,"up"),o==null||o(f,g))}function u(){v(),d(),E(),y()}const v=B(e,"pointermove",g=>{f=f.map(x=>g.pointerId===x.pointerId?g:x),V(e,n,g,f,"move"),t==null||t(f,g)}),d=B(e,"lostpointercapture",g=>{c(g)}),E=B(e,"pointerup",g=>{c(g)}),y=B(e,"pointerleave",g=>{f=[],u(),V(e,n,g,f,"up"),o==null||o(f,g)})}const a=B(e,"pointerdown",l);return{destroy:()=>{a()}}}function Ze(n,e={timeframe:te,minSwipeDistance:re,touchAction:Ln}){const t="swipe";let r,o,h,f;function l(i,s){o=s.clientX,h=s.clientY,r=Date.now(),i.length===1&&(f=s.target)}function a(i,s){if(s.type==="pointerup"&&i.length===0&&Date.now()-r<e.timeframe){const c=s.clientX-o,u=s.clientY-h,v=Math.abs(c),d=Math.abs(u);let E=null;v>=2*d&&v>e.minSwipeDistance?E=c>0?"right":"left":d>=2*v&&d>e.minSwipeDistance&&(E=u>0?"bottom":"top"),E&&n.dispatchEvent(new CustomEvent(t,{detail:{direction:E,target:f}}))}}return oe(t,n,null,l,a,e.touchAction)}var S=Uint8Array,F=Uint16Array,In=Uint32Array,kn=new S([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Fn=new S([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),ae=new S([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),jn=function(n,e){for(var t=new F(31),r=0;r<31;++r)t[r]=e+=1<<n[r-1];for(var o=new In(t[30]),r=1;r<30;++r)for(var h=t[r];h<t[r+1];++h)o[h]=h-t[r]<<5|r;return[t,o]},Wn=jn(kn,2),Mn=Wn[0],se=Wn[1];Mn[28]=258,se[258]=28;var fe=jn(Fn,0),ue=fe[0],fn=new F(32768);for(var p=0;p<32768;++p){var T=(p&43690)>>>1|(p&21845)<<1;T=(T&52428)>>>2|(T&13107)<<2,T=(T&61680)>>>4|(T&3855)<<4,fn[p]=((T&65280)>>>8|(T&255)<<8)>>>1}var Y=function(n,e,t){for(var r=n.length,o=0,h=new F(e);o<r;++o)n[o]&&++h[n[o]-1];var f=new F(e);for(o=0;o<e;++o)f[o]=f[o-1]+h[o-1]<<1;var l;if(t){l=new F(1<<e);var a=15-e;for(o=0;o<r;++o)if(n[o])for(var i=o<<4|n[o],s=e-n[o],c=f[n[o]-1]++<<s,u=c|(1<<s)-1;c<=u;++c)l[fn[c]>>>a]=i}else for(l=new F(r),o=0;o<r;++o)n[o]&&(l[o]=fn[f[n[o]-1]++]>>>15-n[o]);return l},q=new S(288);for(var p=0;p<144;++p)q[p]=8;for(var p=144;p<256;++p)q[p]=9;for(var p=256;p<280;++p)q[p]=7;for(var p=280;p<288;++p)q[p]=8;var On=new S(32);for(var p=0;p<32;++p)On[p]=5;var ce=Y(q,9,1),le=Y(On,5,1),un=function(n){for(var e=n[0],t=1;t<n.length;++t)n[t]>e&&(e=n[t]);return e},$=function(n,e,t){var r=e/8|0;return(n[r]|n[r+1]<<8)>>(e&7)&t},cn=function(n,e){var t=e/8|0;return(n[t]|n[t+1]<<8|n[t+2]<<16)>>(e&7)},ve=function(n){return(n+7)/8|0},Dn=function(n,e,t){(e==null||e<0)&&(e=0),(t==null||t>n.length)&&(t=n.length);var r=new(n.BYTES_PER_ELEMENT==2?F:n.BYTES_PER_ELEMENT==4?In:S)(t-e);return r.set(n.subarray(e,t)),r},he=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],P=function(n,e,t){var r=new Error(e||he[n]);if(r.code=n,Error.captureStackTrace&&Error.captureStackTrace(r,P),!t)throw r;return r},de=function(n,e,t){var r=n.length;if(!r||t&&t.f&&!t.l)return e||new S(0);var o=!e||t,h=!t||t.i;t||(t={}),e||(e=new S(r*3));var f=function(wn){var yn=e.length;if(wn>yn){var _n=new S(Math.max(yn*2,wn));_n.set(e),e=_n}},l=t.f||0,a=t.p||0,i=t.b||0,s=t.l,c=t.d,u=t.m,v=t.n,d=r*8;do{if(!s){l=$(n,a,1);var E=$(n,a+1,3);if(a+=3,E)if(E==1)s=ce,c=le,u=9,v=5;else if(E==2){var j=$(n,a,31)+257,U=$(n,a+10,15)+4,W=j+$(n,a+5,31)+1;a+=14;for(var m=new S(W),b=new S(19),w=0;w<U;++w)b[ae[w]]=$(n,a+w*3,7);a+=U*3;for(var L=un(b),zn=(1<<L)-1,Hn=Y(b,L,1),w=0;w<W;){var dn=Hn[$(n,a,zn)];a+=dn&15;var y=dn>>>4;if(y<16)m[w++]=y;else{var M=0,G=0;for(y==16?(G=3+$(n,a,3),a+=2,M=m[w-1]):y==17?(G=3+$(n,a,7),a+=3):y==18&&(G=11+$(n,a,127),a+=7);G--;)m[w++]=M}}var pn=m.subarray(0,j),A=m.subarray(j);u=un(pn),v=un(A),s=Y(pn,u,1),c=Y(A,v,1)}else P(1);else{var y=ve(a)+4,g=n[y-4]|n[y-3]<<8,x=y+g;if(x>r){h&&P(0);break}o&&f(i+g),e.set(n.subarray(y,x),i),t.b=i+=g,t.p=a=x*8,t.f=l;continue}if(a>d){h&&P(0);break}}o&&f(i+131072);for(var Nn=(1<<u)-1,Bn=(1<<v)-1,nn=a;;nn=a){var M=s[cn(n,a)&Nn],O=M>>>4;if(a+=M&15,a>d){h&&P(0);break}if(M||P(2),O<256)e[i++]=O;else if(O==256){nn=a,s=null;break}else{var gn=O-254;if(O>264){var w=O-257,C=kn[w];gn=$(n,a,(1<<C)-1)+Mn[w],a+=C}var en=c[cn(n,a)&Bn],tn=en>>>4;en||P(3),a+=en&15;var A=ue[tn];if(tn>3){var C=Fn[tn];A+=cn(n,a)&(1<<C)-1,a+=C}if(a>d){h&&P(0);break}o&&f(i+131072);for(var mn=i+gn;i<mn;i+=4)e[i]=e[i-A],e[i+1]=e[i+1-A],e[i+2]=e[i+2-A],e[i+3]=e[i+3-A];i=mn}}t.l=s,t.p=nn,t.b=i,t.f=l,s&&(l=1,t.m=u,t.d=c,t.n=v)}while(!l);return i==e.length?e:Dn(e,0,i)},pe=new S(0),ge=function(n){(n[0]!=31||n[1]!=139||n[2]!=8)&&P(6,"invalid gzip data");var e=n[3],t=10;e&4&&(t+=n[10]|(n[11]<<8)+2);for(var r=(e>>3&1)+(e>>4&1);r>0;r-=!n[t++]);return t+(e&2)},me=function(n){var e=n.length;return(n[e-4]|n[e-3]<<8|n[e-2]<<16|n[e-1]<<24)>>>0};function nt(n,e){return de(n.subarray(ge(n),-8),e||new S(me(n)))}var ln=typeof TextDecoder!="undefined"&&new TextDecoder,we=0;try{ln.decode(pe,{stream:!0}),we=1}catch{}var ye=function(n){for(var e="",t=0;;){var r=n[t++],o=(r>127)+(r>223)+(r>239);if(t+o>n.length)return[e,Dn(n,t-1)];o?o==3?(r=((r&15)<<18|(n[t++]&63)<<12|(n[t++]&63)<<6|n[t++]&63)-65536,e+=String.fromCharCode(55296|r>>10,56320|r&1023)):o&1?e+=String.fromCharCode((r&31)<<6|n[t++]&63):e+=String.fromCharCode((r&15)<<12|(n[t++]&63)<<6|n[t++]&63):e+=String.fromCharCode(r)}};function et(n,e){if(e){for(var t="",r=0;r<n.length;r+=16384)t+=String.fromCharCode.apply(null,n.subarray(r,r+16384));return t}else{if(ln)return ln.decode(n);var o=ye(n),h=o[0],f=o[1];return f.length&&P(8),h}}const D=[];function tt(n,e=I){let t;const r=new Set;function o(l){if(Yn(n,l)&&(n=l,t)){const a=!D.length;for(const i of r)i[1](),D.push(i,n);if(a){for(let i=0;i<D.length;i+=2)D[i][0](D[i+1]);D.length=0}}}function h(l){o(l(n))}function f(l,a=I){const i=[l,a];return r.add(i),r.size===1&&(t=e(o)||I),l(n),()=>{r.delete(i),r.size===0&&(t(),t=null)}}return{set:o,update:h,subscribe:f}}try{self["workbox:window:6.4.1"]&&_()}catch{}function Un(n,e){return new Promise(function(t){var r=new MessageChannel;r.port1.onmessage=function(o){t(o.data)},n.postMessage(e,[r.port2])})}function _e(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function Cn(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}function Ee(n,e){var t;if(typeof Symbol=="undefined"||n[Symbol.iterator]==null){if(Array.isArray(n)||(t=function(o,h){if(o){if(typeof o=="string")return Cn(o,h);var f=Object.prototype.toString.call(o).slice(8,-1);return f==="Object"&&o.constructor&&(f=o.constructor.name),f==="Map"||f==="Set"?Array.from(o):f==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(f)?Cn(o,h):void 0}}(n))||e&&n&&typeof n.length=="number"){t&&(n=t);var r=0;return function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}return(t=n[Symbol.iterator]()).next.bind(t)}try{self["workbox:core:6.4.1"]&&_()}catch{}var vn=function(){var n=this;this.promise=new Promise(function(e,t){n.resolve=e,n.reject=t})};function hn(n,e){var t=location.href;return new URL(n,t).href===new URL(e,t).href}var X=function(n,e){this.type=n,Object.assign(this,e)};function Z(n,e,t){return t?e?e(n):n:(n&&n.then||(n=Promise.resolve(n)),e?n.then(e):n)}function be(){}var Se={type:"SKIP_WAITING"};function Rn(n,e){if(!e)return n&&n.then?n.then(be):Promise.resolve()}var rt=function(n){var e,t;function r(l,a){var i,s;return a===void 0&&(a={}),(i=n.call(this)||this).nn={},i.tn=0,i.rn=new vn,i.en=new vn,i.on=new vn,i.un=0,i.an=new Set,i.cn=function(){var c=i.fn,u=c.installing;i.tn>0||!hn(u.scriptURL,i.sn.toString())||performance.now()>i.un+6e4?(i.vn=u,c.removeEventListener("updatefound",i.cn)):(i.hn=u,i.an.add(u),i.rn.resolve(u)),++i.tn,u.addEventListener("statechange",i.ln)},i.ln=function(c){var u=i.fn,v=c.target,d=v.state,E=v===i.vn,y={sw:v,isExternal:E,originalEvent:c};!E&&i.mn&&(y.isUpdate=!0),i.dispatchEvent(new X(d,y)),d==="installed"?i.wn=self.setTimeout(function(){d==="installed"&&u.waiting===v&&i.dispatchEvent(new X("waiting",y))},200):d==="activating"&&(clearTimeout(i.wn),E||i.en.resolve(v))},i.dn=function(c){var u=i.hn,v=u!==navigator.serviceWorker.controller;i.dispatchEvent(new X("controlling",{isExternal:v,originalEvent:c,sw:u,isUpdate:i.mn})),v||i.on.resolve(u)},i.gn=(s=function(c){var u=c.data,v=c.ports,d=c.source;return Z(i.getSW(),function(){i.an.has(d)&&i.dispatchEvent(new X("message",{data:u,originalEvent:c,ports:v,sw:d}))})},function(){for(var c=[],u=0;u<arguments.length;u++)c[u]=arguments[u];try{return Promise.resolve(s.apply(this,c))}catch(v){return Promise.reject(v)}}),i.sn=l,i.nn=a,navigator.serviceWorker.addEventListener("message",i.gn),i}t=n,(e=r).prototype=Object.create(t.prototype),e.prototype.constructor=e,e.__proto__=t;var o,h,f=r.prototype;return f.register=function(l){var a=(l===void 0?{}:l).immediate,i=a!==void 0&&a;try{var s=this;return function(c,u){var v=c();return v&&v.then?v.then(u):u(v)}(function(){if(!i&&document.readyState!=="complete")return Rn(new Promise(function(c){return window.addEventListener("load",c)}))},function(){return s.mn=Boolean(navigator.serviceWorker.controller),s.yn=s.pn(),Z(s.bn(),function(c){s.fn=c,s.yn&&(s.hn=s.yn,s.en.resolve(s.yn),s.on.resolve(s.yn),s.yn.addEventListener("statechange",s.ln,{once:!0}));var u=s.fn.waiting;return u&&hn(u.scriptURL,s.sn.toString())&&(s.hn=u,Promise.resolve().then(function(){s.dispatchEvent(new X("waiting",{sw:u,wasWaitingBeforeRegister:!0}))}).then(function(){})),s.hn&&(s.rn.resolve(s.hn),s.an.add(s.hn)),s.fn.addEventListener("updatefound",s.cn),navigator.serviceWorker.addEventListener("controllerchange",s.dn),s.fn})})}catch(c){return Promise.reject(c)}},f.update=function(){try{return this.fn?Rn(this.fn.update()):void 0}catch(l){return Promise.reject(l)}},f.getSW=function(){return this.hn!==void 0?Promise.resolve(this.hn):this.rn.promise},f.messageSW=function(l){try{return Z(this.getSW(),function(a){return Un(a,l)})}catch(a){return Promise.reject(a)}},f.messageSkipWaiting=function(){this.fn&&this.fn.waiting&&Un(this.fn.waiting,Se)},f.pn=function(){var l=navigator.serviceWorker.controller;return l&&hn(l.scriptURL,this.sn.toString())?l:void 0},f.bn=function(){try{var l=this;return function(a,i){try{var s=a()}catch(c){return i(c)}return s&&s.then?s.then(void 0,i):s}(function(){return Z(navigator.serviceWorker.register(l.sn,l.nn),function(a){return l.un=performance.now(),a})},function(a){throw a})}catch(a){return Promise.reject(a)}},o=r,(h=[{key:"active",get:function(){return this.en.promise}},{key:"controlling",get:function(){return this.on.promise}}])&&_e(o.prototype,h),r}(function(){function n(){this.Pn=new Map}var e=n.prototype;return e.addEventListener=function(t,r){this.Sn(t).add(r)},e.removeEventListener=function(t,r){this.Sn(t).delete(r)},e.dispatchEvent=function(t){t.target=this;for(var r,o=Ee(this.Sn(t.type));!(r=o()).done;)(0,r.value)(t)},e.Sn=function(t){return this.Pn.has(t)||this.Pn.set(t,new Set),this.Pn.get(t)},n}());export{De as A,Re as B,ze as C,Pn as D,ke as E,rt as F,Un as G,Je as H,Zn as I,Pe as J,Ze as K,Ye as L,Be as M,Tn as N,ne as O,qe as P,Ne as Q,Ke as R,Ve as S,He as T,Yn as a,Ie as b,Me as c,Te as d,Le as e,Ae as f,nt as g,Oe as h,Qe as i,Gn as j,an as k,Ue as l,Fe as m,We as n,Sn as o,je as p,I as q,R as r,et as s,$n as t,Ge as u,$e as v,tt as w,Xe as x,xe as y,Ce as z};
