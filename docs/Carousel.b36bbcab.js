import{d as g,c as h,o as f,g as d,a as m,r as u,i as $,t as v}from"./chunks/web.54320a10.js";/* empty css                              */const w=v('<div class="carousel"><div class="inner"></div><img class="left" alt="left" src="/img/right-arrow.svg"><img class="right" alt="right" src="/img/right-arrow.svg"></div>');function x(o){const{entries:e}=o;if(!Array.isArray(e))throw new Error("Expected an entries array");const[i,n]=h(0);f(()=>{n(0)});const a=function(){const t=e.length;if(!isFinite(t))throw new Error("Missing length");n((i()-1+t)%t)},l=function(){const t=e.length;if(!isFinite(t))throw new Error("Missing length");n((i()+1)%t)};return(()=>{const t=d(w),r=t.firstChild,s=r.nextSibling,c=s.nextSibling;return s.$$click=a,c.$$click=l,m(()=>$(r,e[i()])),u(),t})()}g(["click"]);export{x as default};