import{j as x,h as T}from"./theme-provider-0e3a6531.js";import{r as h}from"./index-4ad15f16.js";import{g as j}from"./_commonjsHelpers-de833af9.js";var w={exports:{}},D={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p=h;function q(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var A=typeof Object.is=="function"?Object.is:q,V=p.useState,B=p.useEffect,F=p.useLayoutEffect,L=p.useDebugValue;function P(e,t){var r=t(),o=V({inst:{value:r,getSnapshot:t}}),n=o[0].inst,s=o[1];return F(function(){n.value=r,n.getSnapshot=t,v(n)&&s({inst:n})},[e,r,t]),B(function(){return v(n)&&s({inst:n}),e(function(){v(n)&&s({inst:n})})},[e]),L(r),r}function v(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!A(e,r)}catch{return!0}}function W(e,t){return t()}var $=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?W:P;D.useSyncExternalStore=p.useSyncExternalStore!==void 0?p.useSyncExternalStore:$;w.exports=D;var k=w.exports;const O=e=>{let t;const r=new Set,o=(u,S)=>{const i=typeof u=="function"?u(t):u;if(!Object.is(i,t)){const d=t;t=S??typeof i!="object"?i:Object.assign({},t,i),r.forEach(m=>m(t,d))}},n=()=>t,l={setState:o,getState:n,subscribe:u=>(r.add(u),()=>r.delete(u)),destroy:()=>{r.clear()}};return t=e(o,n,l),l},I=e=>e?O(e):O;var R={exports:{}},_={};/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var E=h,C=k;function M(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var U=typeof Object.is=="function"?Object.is:M,z=C.useSyncExternalStore,K=E.useRef,N=E.useEffect,Y=E.useMemo,G=E.useDebugValue;_.useSyncExternalStoreWithSelector=function(e,t,r,o,n){var s=K(null);if(s.current===null){var a={hasValue:!1,value:null};s.current=a}else a=s.current;s=Y(function(){function u(c){if(!S){if(S=!0,i=c,c=o(c),n!==void 0&&a.hasValue){var f=a.value;if(n(f,c))return d=f}return d=c}if(f=d,U(i,c))return f;var g=o(c);return n!==void 0&&n(f,g)?f:(i=c,d=g)}var S=!1,i,d,m=r===void 0?null:r;return[function(){return u(t())},m===null?void 0:function(){return u(m())}]},[t,r,o,n]);var l=z(e,s[0],s[1]);return N(function(){a.hasValue=!0,a.value=l},[l]),G(l),l};R.exports=_;var H=R.exports;const J=j(H),{useSyncExternalStoreWithSelector:Q}=J;function X(e,t=e.getState,r){const o=Q(e.subscribe,e.getState,e.getServerState||e.getState,t,r);return h.useDebugValue(o),o}const b=e=>{const t=typeof e=="function"?I(e):e,r=(o,n)=>X(t,o,n);return Object.assign(r,t),r},Z=e=>e?b(e):b,y=Z(e=>({theme:"light",setTheme:t=>e(r=>{var o,n,s;return t==="dark"?((o=document.querySelector("html"))==null||o.classList.add("dark"),(n=document.querySelector("html"))==null||n.classList.remove("light"),{...r,theme:t}):((s=document.querySelector("html"))==null||s.classList.remove("dark"),{...r,theme:t})})})),ne=(e,t)=>{const r=t.parameters.theme||t.globals.theme;t.parameters.layout;const{setTheme:o}=y();return h.useEffect(()=>{o(r)},[r]),x.jsx("div",{className:T("bg-background-default"),children:x.jsx(e,{})})};try{y.displayName="useTheme",y.__docgenInfo={description:"",displayName:"useTheme",props:{}}}catch{}export{Z as c,k as s,y as u,ne as w};
//# sourceMappingURL=decorators-df4d5d3a.js.map
