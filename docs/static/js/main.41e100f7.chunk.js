(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{44:function(e,n,c){},45:function(e,n,c){},47:function(e,n,c){},48:function(e,n,c){},56:function(e,n,c){"use strict";c.r(n);var t=c(1),s=c.n(t),i=c(29),o=c.n(i),a=c(35),r=c(21),l=c(6),j=(c(44),c(2)),d=c(3),h=c(5),b=c(4),u=(c(45),c(0)),O=function(e){Object(h.a)(c,e);var n=Object(b.a)(c);function c(e){var t;return Object(j.a)(this,c),(t=n.call(this,e)).opts={signup:{name:"Signup",path:"/signup"},login:{name:"Login",path:"/login"},livedoc:{name:"LiveDoc",path:"/livedoc"},settings:{name:"Settings",path:"/settings"},logout:{name:"Logout",path:"/logout"}},t}return Object(d.a)(c,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e,n,c=this,t=null!==(e=this.props.opts)&&void 0!==e?e:["livedoc","login"];return Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("div",{className:"navbar",children:[Object(u.jsx)("div",{className:"navbar-brand",children:Object(u.jsx)("a",{href:"/",children:"Dreamchat"})}),Object(u.jsx)("div",{className:"title",children:null!==(n=this.props.title)&&void 0!==n?n:""}),Object(u.jsx)("div",{className:"opts",children:t.map((function(e){return Object(u.jsx)("div",{className:"opt",children:Object(u.jsx)("a",{href:c.opts[e].path,children:c.opts[e].name})})}))})]})})}}]),c}(t.Component),m=(c(47),function(e){Object(h.a)(c,e);var n=Object(b.a)(c);function c(e){return Object(j.a)(this,c),n.call(this,e)}return Object(d.a)(c,[{key:"render",value:function(){return Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("footer",{className:"footer",children:[Object(u.jsx)("div",{className:"logo",children:"Dreamchat"}),Object(u.jsxs)("div",{className:"menu",children:[Object(u.jsx)("div",{className:"option",children:"LiveDoc"}),Object(u.jsx)("div",{className:"option",children:"LiveDoc"}),Object(u.jsx)("div",{className:"option",children:"LiveDoc"}),Object(u.jsx)("div",{className:"option",children:"LiveDoc"}),Object(u.jsx)("div",{className:"option",children:"LiveDoc"})]})]})})}}]),c}(t.Component)),p=(c(48),function(e){Object(h.a)(c,e);var n=Object(b.a)(c);function c(e){var t;return Object(j.a)(this,c),(t=n.call(this,e)).ws=e.ws,t}return Object(d.a)(c,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)(O,{opts:["signup","login","livedoc"]}),Object(u.jsxs)("main",{children:[Object(u.jsxs)("section",{className:"s1",children:[Object(u.jsxs)("div",{className:"big1",children:[Object(u.jsx)("h1",{children:"Just Go "}),Object(u.jsx)("h1",{children:"Dreaming"})]}),Object(u.jsxs)("div",{className:"livedoc-ad",children:[Object(u.jsx)("h1",{children:"LiveDoc"}),Object(u.jsxs)("span",{children:["Edit document in real-time ",Object(u.jsx)("br",{}),"with your friend"]}),Object(u.jsx)("span",{children:"No Signup"})]})]}),Object(u.jsxs)("section",{className:"s2",children:[Object(u.jsx)("div",{className:"random-chat-ad",children:Object(u.jsxs)("h1",{children:["Have ",Object(u.jsx)("span",{className:"highlight-big",children:"Fun"}),Object(u.jsx)("br",{}),"With randoms"]})}),Object(u.jsx)("div",{className:"ad-screen",children:Object(u.jsx)("div",{className:"ad-img",children:Object(u.jsx)("img",{src:"",alt:"SS"})})})]})]}),Object(u.jsx)(m,{})]})}}]),c}(t.Component)),v=c(25),x=(s.a.Component,a.a.connect("http://localhost:5000",{query:{token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlU0NDgyNyIsImlhdCI6MTYzNzMyMzg5OH0.nmoA7Kuxkdou-CqCW-rPUQOX_n0DkwstAokko1GnUM4",token1:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlU4NDQ3NiIsImlhdCI6MTYzNzMzMjk5OX0.7xjyvabyCpNUZbVmkIm_nykfH8lj-F-FCXrz55NYmP0",token2:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlU0NTQ3NSIsImlhdCI6MTYzNzQxNTMwN30.jS9MTWv2VJMjxICEoLU2IMKtvNVD0o2TSVi8iHlRUFc"}}));x.on("message",(function(e){return console.log(e)})),x.on("connection",(function(e){return console.log("connected to server")})),x.on("core",(function(){return console.log("[core]")}));var N=function(){var e,n;return Object(t.useEffect)((function(){console.log("[App] use effect")}),[]),x.on("pong",(function(){n=Date.now(),!isNaN(e)&&console.log("[latency] ",n-e)})),Object(u.jsx)(u.Fragment,{children:Object(u.jsx)(r.a,{children:Object(u.jsx)(l.a,{path:"/",children:Object(u.jsx)(p,{ws:x})})})})};o.a.render(Object(u.jsx)(s.a.StrictMode,{children:Object(u.jsx)(N,{})}),document.getElementById("root"))}},[[56,1,2]]]);
//# sourceMappingURL=main.41e100f7.chunk.js.map