(function(d,u){typeof exports=="object"&&typeof module<"u"?u(exports):typeof define=="function"&&define.amd?define(["exports"],u):(d=typeof globalThis<"u"?globalThis:d||self,u(d.DotsField={}))})(this,function(d){"use strict";var $=Object.defineProperty;var F=(d,u,p)=>u in d?$(d,u,{enumerable:!0,configurable:!0,writable:!0,value:p}):d[u]=p;var c=(d,u,p)=>(F(d,typeof u!="symbol"?u+"":u,p),p);function x(r,t=10){return r>0&&r<t?t:r<0&&r>-t?-t:r}class y{constructor(t,s,e,o){c(this,"x");c(this,"y");c(this,"ref");c(this,"render");c(this,"vecX",0);c(this,"vecY",0);c(this,"t",0);this.x=t,this.y=s,this.ref=e,this.render=o}update(t,s,e,o){const{x:i,y:n}=this,h=-50;let f=x(i-t,2),l=x(n-s,2);const a=Math.sqrt(f*f+l*l),m=h/a,[D,L]=e,v=Math.pow(10,1-Math.abs((o/.1-a/38)/2))/10,P=D*v,C=L*v,R=m*P,W=m*C;this.vecX+=R,this.vecY+=W}reset(){this.vecX=0,this.vecY=0}}function M(r,t,s){const e=[];for(const o of t){const i=new y(o.offsetLeft-r.x,o.offsetTop-r.y,o,s);e.push(i)}return e}function b(r="position"){function t(){const s=this;if(!(Math.abs(s.vecX)<.1&&Math.abs(s.vecY)<.1)){if(r==="position"||r==="color-position"){let e=s.vecX,o=s.vecY;const i=Math.sqrt(e*e+o*o),n=20;i>n&&(e*=n/i,o*=n/i),s.ref.style.transform=`translate(${e.toFixed(1)}px, ${o.toFixed(1)}px)`}if(r==="color"||r==="color-position"){const o=Math.min(Math.floor(Math.abs(s.vecX*.1)*255),255);s.ref.style.color=`rgb(${o}, ${o}, ${o})`}}}return t}function g(r){const t=[];return Array.from(r.childNodes).forEach(e=>{if(e.nodeType===Node.TEXT_NODE){const o=e.textContent;if(o){const i=o.split("");for(const n of i){if(n==="")continue;const h=document.createElement("span");h.innerHTML=n+" ",h.style.display="inline-block",r.insertBefore(h,e),t.push(h)}r.removeChild(e)}}else t.push(...g(e))}),t}const w=(r,t,s,e=20,o={x:0,y:0})=>{const i=[],n=(r-2*e)/s,h=(t-2*e)/s,f=s/2+e;for(let l=0;l<n;l++)for(let a=0;a<h;a++)i.push(new y(l*s+f+o.x,a*s+f+o.y,0));return i};class T{constructor(t={}){c(this,"opts");c(this,"dots",[]);c(this,"impacts",[]);c(this,"t",0);c(this,"x",100);c(this,"y",100);this.opts={memorySize:200,impactLifetime:10,...t}}appendDots(t){this.dots.push(...t)}addDot(t){this.dots.push(t)}impact(t,s,e,o){const i=Date.now()/1e3;for(this.impacts.push([t,s,i,e,o]);this.impacts.length>this.opts.memorySize;)this.impacts.shift()}update(){const t=Date.now()/1e3;this.t=t;for(const i of this.dots)i.reset();const s=this.opts.impactLifetime,e=this.impacts,o=this.dots;for(const[i,n,h,f,l]of e){const a=t-h;if(!(a>s))for(const m of o)m.update(i,n,[f,l],a)}}}class E{constructor(){c(this,"mouse",[0,0]);c(this,"field",new T);c(this,"run",!1);c(this,"renders",[]);c(this,"update",()=>{this.run&&(this.field.update(),this.render(),requestAnimationFrame(this.update))})}get dots(){return this.field.dots}registerDots(t){this.field.appendDots(t)}impact(t,s,e,o){this.field.impact(t,s,e,o)}followMouse(t){document.addEventListener("mousemove",s=>{var a;const e=t.x,o=t.y-(((a=document.body.parentElement)==null?void 0:a.scrollTop)??0),i=s.clientX-e,n=s.clientY-o,h=i-this.mouse[0],f=n-this.mouse[1];this.mouse=[i,n];const l=1;this.impact(i,n,h*l,f*l)}),this.startLoop()}followMouseWithElement(t){t.addEventListener("touchstart",s=>{s.preventDefault()}),t.addEventListener("pointermove",s=>{const e=t.getBoundingClientRect(),o=e.left,i=e.top,n=s.clientX-o,h=s.clientY-i,f=n-this.mouse[0],l=h-this.mouse[1];this.mouse=[n,h];const a=1;this.impact(n,h,f*a,l*a)}),this.startLoop()}addRenderer(t){this.renders.push(t)}explosion(t,s){const o=Math.random()*Math.PI*2;for(let i=0;i<100;i++){const n=Math.cos(o*i/5)*400,h=Math.sin(o*i/5)*400;setTimeout(()=>{this.impact(t,s,n/100,h/100)},i)}this.run||(this.run=!0,this.update(),setTimeout(()=>{this.run=!1},2e3))}autoPlayWhenVisible(t){function s(e,o){var i={},n=new IntersectionObserver(h=>{h.forEach(f=>{o(f.intersectionRatio>0)})},i);n.observe(e)}s(t,e=>{e?this.play():this.pause()})}pause(){this.run=!1}play(){this.startLoop()}startLoop(){this.run=!0,this.update()}render(){var t;for(const s of this.field.dots)(t=s.render)==null||t.call(s);for(const s of this.renders)s(this.field.dots)}}class S{constructor(t,s="#e2e2e2",e="#666666"){c(this,"root");c(this,"canvas");c(this,"ctx");c(this,"x",0);c(this,"y",0);this.bg=s,this.fg=e,this.root=t,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.root.appendChild(this.canvas),this.canvas.width=this.root.offsetWidth,this.canvas.height=this.root.offsetHeight,this.canvas.style.backgroundColor=s}get width(){return this.canvas.width}get height(){return this.canvas.height}get boundingRect(){return this.canvas.getBoundingClientRect()}drawBegin(){this.ctx.beginPath(),this.ctx.clearRect(0,0,this.width,this.height),this.ctx.fillStyle=this.bg,this.ctx.fillRect(0,0,this.width,this.height),this.ctx.fillStyle=this.fg,this.ctx.strokeStyle=this.fg}drawPoint(t,s,e,o){this.ctx.moveTo(t,s),this.ctx.moveTo(t,s);const i=Math.sqrt(e*e+o*o),n=20;i>n&&(e*=n/i,o*=n/i),this.ctx.moveTo(t+e,s+o),this.ctx.arc(t+e,s+o,1,0,2*Math.PI)}drawPoint2(t,s,e,o){this.ctx.beginPath();const i=Math.sqrt(e*e+o*o),n=20;i>n&&(e*=n/i,o*=n/i),this.ctx.moveTo(t+e,s+o),this.ctx.arc(t+e,s+o,1,0,2*Math.PI);const h=230,l=h-120,a=230-Math.min(Math.floor(Math.abs(i/20)*l),h);this.ctx.fillStyle=`rgb(${a}, ${a}, ${a})`,this.ctx.fill()}drawEnd(){this.ctx.stroke(),this.ctx.fill()}drawA(t,s){this.ctx.fillStyle=this.fg,this.ctx.moveTo(t,s),this.ctx.arc(t,s,5,0,2*Math.PI),this.ctx.fill()}}d.Canv=S,d.Engine=E,d.generateArea=w,d.generateDotsOutOfSpans=M,d.getRenderSpan=b,d.wrapEachWordInSpan=g,Object.defineProperty(d,Symbol.toStringTag,{value:"Module"})});