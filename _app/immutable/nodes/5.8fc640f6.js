import{s as M,n as g,r as P,o as V,b as j}from"../chunks/scheduler.f69bda83.js";import{S as A,i as L,g as k,h as y,j as _,f as h,k as v,a as O,x,z as I}from"../chunks/index.92139430.js";function R(c){let a,r,s,n,p;return{c(){a=k("div"),r=k("div"),s=k("div"),this.h()},l(l){a=y(l,"DIV",{class:!0});var u=_(a);r=y(u,"DIV",{class:!0});var e=_(r);s=y(e,"DIV",{contenteditable:!0,class:!0}),_(s).forEach(h),e.forEach(h),u.forEach(h),this.h()},h(){v(s,"contenteditable","true"),v(s,"class","outline-none p-1"),v(r,"class","bg-slate-200 rounded-lg"),v(a,"class","w-full h-full p-10")},m(l,u){O(l,a,u),x(a,r),x(r,s),c[3](s),n||(p=[I(s,"keydown",c[2]),I(s,"keyup",c[1])],n=!0)},p:g,i:g,o:g,d(l){l&&h(a),c[3](null),n=!1,P(p)}}}function $(c,a,r){let s;const n={};V(()=>{});const p=e=>{n[e.key.toLowerCase()]=!1},l=e=>{n[e.key.toLowerCase()]=!0,e.key,n.shift&&n.j&&(e.preventDefault(),b("left")),n.shift&&n.l&&(e.preventDefault(),b("right")),n.shift&&n.i&&(e.preventDefault(),S("up")),n.shift&&n.k&&(e.preventDefault(),S("down"));function b(m){const d=m==="right"?1:-1;e.preventDefault();const i=getSelection(),t=i==null?void 0:i.getRangeAt(0),o=t==null?void 0:t.endContainer;o==null||o.nextSibling;const f=t==null?void 0:t.endOffset;!o||!f||(t.setEnd(o,f+d),t.setStart(o,f+d))}function S(m){var D,C,E,w;const d=getSelection(),i=d==null?void 0:d.getRangeAt(0),t=i==null?void 0:i.endContainer,o=m==="up"?(C=(D=t==null?void 0:t.parentElement)==null?void 0:D.previousSibling)==null?void 0:C.firstChild:(w=(E=t==null?void 0:t.parentElement)==null?void 0:E.nextSibling)==null?void 0:w.firstChild;console.log(o);const f=i==null?void 0:i.endOffset;!t||!f||!o||(i.setEnd(o,f),i.setStart(o,f))}};function u(e){j[e?"unshift":"push"](()=>{s=e,r(0,s)})}return[s,p,l,u]}class X extends A{constructor(a){super(),L(this,a,$,R,M,{})}}export{X as component};