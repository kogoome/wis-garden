import{s as i,n as m}from"../chunks/scheduler.f69bda83.js";import{S as u,i as c,r as p,u as f,v as _,d as $,t as d,w as g,g as h,m as x,h as v,y,n as w,a as r,f as l}from"../chunks/index.92139430.js";import{N as C}from"../chunks/NoteLayout.9fff711a.js";function b(s){let t,a="hello world",e;return{c(){t=h("h1"),t.textContent=a,e=x(`
  test github page
  이건 오류가 날 이유가 없는 컴포넌트임`)},l(n){t=v(n,"H1",{"data-svelte-h":!0}),y(t)!=="svelte-390uru"&&(t.textContent=a),e=w(n,`
  test github page
  이건 오류가 날 이유가 없는 컴포넌트임`)},m(n,o){r(n,t,o),r(n,e,o)},p:m,d(n){n&&(l(t),l(e))}}}function N(s){let t,a;return t=new C({props:{title:"hello",subtitle:"world",date:"2002",$$slots:{default:[b]},$$scope:{ctx:s}}}),{c(){p(t.$$.fragment)},l(e){f(t.$$.fragment,e)},m(e,n){_(t,e,n),a=!0},p(e,[n]){const o={};n&1&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){a||($(t.$$.fragment,e),a=!0)},o(e){d(t.$$.fragment,e),a=!1},d(e){g(t,e)}}}class L extends u{constructor(t){super(),c(this,t,null,N,i,{})}}export{L as component};
