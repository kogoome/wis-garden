import{s as B,n as S,c as O,u as U,g as W,d as Z}from"../chunks/scheduler.e108d1fd.js";import{S as C,i as H,g as h,s as L,m as j,h as v,j as m,y as F,c as E,n as k,f,k as o,a as q,x as d,z as G,r as J,u as K,v as P,d as M,t as N,w as Q}from"../chunks/index.bd28377b.js";import{b as A}from"../chunks/paths.7bcb953f.js";function R(c){let e,s,i='<div class="w-full flex justify-center"><svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.1336L4.583 9.7166L12 2.2834L9.7166 0L0 9.7166L9.7166 19.4332L12 17.1336Z" fill="gray"></path></svg></div>',n,l,a,t,r,b,g,_,y,$,x,T;return{c(){e=h("div"),s=h("button"),s.innerHTML=i,n=L(),l=h("div"),a=h("div"),t=h("a"),r=j("test"),b=L(),g=h("div"),_=h("a"),y=j("test2"),this.h()},l(p){e=v(p,"DIV",{class:!0,style:!0});var u=m(e);s=v(u,"BUTTON",{class:!0,"data-svelte-h":!0}),F(s)!=="svelte-v09kpb"&&(s.innerHTML=i),n=E(u),l=v(u,"DIV",{class:!0});var w=m(l);a=v(w,"DIV",{class:!0});var D=m(a);t=v(D,"A",{href:!0,class:!0});var I=m(t);r=k(I,"test"),I.forEach(f),D.forEach(f),b=E(w),g=v(w,"DIV",{class:!0});var V=m(g);_=v(V,"A",{href:!0,class:!0});var z=m(_);y=k(z,"test2"),z.forEach(f),V.forEach(f),w.forEach(f),u.forEach(f),this.h()},h(){o(s,"class","absolute top-0 -right-5 w-5 h-full bg-[#111] hover:bg-zinc-800 flex flex-col justify-center"),o(t,"href",A+"/note/test"),o(t,"class","svelte-1duwm2"),o(a,"class","whitespace-nowrap overflow-hidden"),o(_,"href",A+"/note/test2"),o(_,"class","svelte-1duwm2"),o(g,"class","whitespace-nowrap overflow-hidden"),o(l,"class","w-full h-full p-5"),o(e,"class","h-full bg-zinc-900 text-zinc-300 relative transition-all"),o(e,"style",$=`width: ${c[0]}px`)},m(p,u){q(p,e,u),d(e,s),d(e,n),d(e,l),d(l,a),d(a,t),d(t,r),d(l,b),d(l,g),d(g,_),d(_,y),x||(T=G(s,"click",c[1]),x=!0)},p(p,[u]){u&1&&$!==($=`width: ${p[0]}px`)&&o(e,"style",$)},i:S,o:S,d(p){p&&f(e),x=!1,T()}}}function X(c,e,s){let i=200;return[i,()=>{s(0,i=i===200?0:200)}]}class Y extends C{constructor(e){super(),H(this,e,X,R,B,{})}}function ee(c){let e,s,i,n;s=new Y({});const l=c[1].default,a=O(l,c,c[0],null);return{c(){e=h("div"),J(s.$$.fragment),i=L(),a&&a.c(),this.h()},l(t){e=v(t,"DIV",{class:!0});var r=m(e);K(s.$$.fragment,r),i=E(r),a&&a.l(r),r.forEach(f),this.h()},h(){o(e,"class","flex w-screen h-screen ")},m(t,r){q(t,e,r),P(s,e,null),d(e,i),a&&a.m(e,null),n=!0},p(t,[r]){a&&a.p&&(!n||r&1)&&U(a,l,t,t[0],n?Z(l,t[0],r,null):W(t[0]),null)},i(t){n||(M(s.$$.fragment,t),M(a,t),n=!0)},o(t){N(s.$$.fragment,t),N(a,t),n=!1},d(t){t&&f(e),Q(s),a&&a.d(t)}}}function te(c,e,s){let{$$slots:i={},$$scope:n}=e;return c.$$set=l=>{"$$scope"in l&&s(0,n=l.$$scope)},[n,i]}class ne extends C{constructor(e){super(),H(this,e,te,ee,B,{})}}export{ne as component};
