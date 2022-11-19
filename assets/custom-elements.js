"use strict";(()=>{var ve=Object.create;var X=Object.defineProperty;var Ee=Object.getOwnPropertyDescriptor;var ye=Object.getOwnPropertyNames;var Pe=Object.getPrototypeOf,we=Object.prototype.hasOwnProperty;var h=(i,e)=>()=>(e||i((e={exports:{}}).exports,e),e.exports);var be=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ye(e))!we.call(i,s)&&s!==t&&X(i,s,{get:()=>e[s],enumerable:!(n=Ee(e,s))||n.enumerable});return i};var Ce=(i,e,t)=>(t=i!=null?ve(Pe(i)):{},be(e||!i||!i.__esModule?X(t,"default",{value:i,enumerable:!0}):t,i));var J=h(v=>{"use strict";Object.defineProperty(v,"__esModule",{value:!0});v.getPageDataFromHtml=v.PageData=void 0;var Y=new DOMParser,f=class{constructor(e,t,n,s,a){this.url=e,this.title=t,this.html=n,this.blocks=s,this.docRef=a}cloneWithUrl(e){return new f(e,this.title,this.html,this.blocks,this.docRef)}get document(){let e=this.docRef.deref();return e||(e=Y.parseFromString(this.html,"text/html"),this.docRef=new WeakRef(e)),e}};v.PageData=f;function Se(i,e,t){var n,s;let a=Y.parseFromString(e,"text/html"),r=Array.from(a.querySelectorAll(t));if(!r.length)throw new Error("Received page is invalid.");let o=r.map(l=>l.outerHTML);return new f(i,(s=(n=a.querySelector("title"))===null||n===void 0?void 0:n.textContent)!==null&&s!==void 0?s:"",e,o,new WeakRef(a))}v.getPageDataFromHtml=Se});var g=h(E=>{"use strict";Object.defineProperty(E,"__esModule",{value:!0});E.getCurrentUrl=E.unpackLink=void 0;var Q=i=>i.startsWith("/")?i:`/${i}`;function Le(i){let e;if(i instanceof HTMLAnchorElement)e=i;else{let t=typeof i=="string"?i:i.getAttribute("href");if(!t)return{path:"/",hash:"",url:"/"};e=new URL(t,"http://ignore.me")}return{path:Q(e.pathname),hash:e.hash,url:Q(`${e.pathname}${e.search}`)}}E.unpackLink=Le;var Te=()=>window.location.pathname+window.location.search;E.getCurrentUrl=Te});var B=h(y=>{"use strict";Object.defineProperty(y,"__esModule",{value:!0});y.eventManagerMapOff=y.createEventManager=void 0;function ke(i){let e=new Set;return{emit(t){for(let n of e)try{n(t)}catch(s){console.error(s)}document.dispatchEvent(new CustomEvent(`scatman:${i}`,{detail:t}))},on(t){e.add(t)},off(t){t?e.delete(t)||console.warn(`Handler for event '${i}' no found.`):e.clear()}}}y.createEventManager=ke;function Me(i){Object.keys(i).forEach(e=>i[e].off())}y.eventManagerMapOff=Me});var w=h(P=>{"use strict";Object.defineProperty(P,"__esModule",{value:!0});P.getDelegateTarget=void 0;function Ae(i,e){if(i.target instanceof Element){let t=i.target.closest(e);if(t instanceof HTMLAnchorElement||t instanceof SVGElement)return t}return null}P.getDelegateTarget=Ae});var Z=h(C=>{"use strict";Object.defineProperty(C,"__esModule",{value:!0});C.ScatClickPlugin=void 0;var He=w(),b=g(),O=class{constructor(e){this.linkClickHandler=t=>{if(t.button!==0)return;let n=(0,He.getDelegateTarget)(t,this.scatman.options.linkSelector);if(!n)return;if(t.metaKey||t.ctrlKey||t.shiftKey||t.altKey){this.scatman.events.openPageInNewTab.emit(t);return}this.scatman.events.clickLink.emit(t),t.preventDefault();let{url:s,hash:a}=(0,b.unpackLink)(n),r=(0,b.getCurrentUrl)();if(s!==r){let o=n.getAttribute("data-scatman-transition");this.scatman.loadPage({fromUrl:r,url:s,hash:a,customTransition:o});return}a?(this.scatman.pushHistory(s+a),this.scatman.events.samePageWithHash.emit(t)):this.scatman.events.samePage.emit(t)},this.popStateHandler=t=>{if(this.scatman.options.skipPopStateHandling(t))return;let{hash:n,url:s}=(0,b.unpackLink)(t.state?t.state.url:(0,b.getCurrentUrl)());this.scatman.loadPage({fromUrl:"",url:s,hash:n,popstate:t})},this.scatman=e}mount(){document.addEventListener("click",this.linkClickHandler),window.addEventListener("popstate",this.popStateHandler)}unmount(){document.removeEventListener("click",this.linkClickHandler),window.removeEventListener("popstate",this.popStateHandler)}};C.ScatClickPlugin=O});var te=h(L=>{"use strict";Object.defineProperty(L,"__esModule",{value:!0});L.Scatman=void 0;var ee=J(),S=g(),c=B(),Re=Z(),_e={linkSelector:`a[href^="${window.location.origin}"]:not([data-no-scatman]), a[href^="/"]:not([data-no-scatman]), a[href^="#"]:not([data-no-scatman])`,cache:!0,activateScripts:!0,containers:".scatman-container",requestHeaders:{"X-Requested-With":"scatman",Accept:"text/html, application/xhtml+xml"},skipPopStateHandling(i){var e;return((e=i.state)===null||e===void 0?void 0:e.source)!=="scatman"}},q=()=>{},xe={get:q,set:q,clear:q},D=class{constructor(e={}){this.preloading=new Map,this.plugins=[],this.events={animationInDone:(0,c.createEventManager)("animationInDone"),animationInStart:(0,c.createEventManager)("animationInStart"),animationOutDone:(0,c.createEventManager)("animationOutDone"),animationOutStart:(0,c.createEventManager)("animationOutStart"),animationSkipped:(0,c.createEventManager)("animationSkipped"),clickLink:(0,c.createEventManager)("clickLink"),contentReplaced:(0,c.createEventManager)("contentReplaced"),disabled:(0,c.createEventManager)("disabled"),enabled:(0,c.createEventManager)("enabled"),openPageInNewTab:(0,c.createEventManager)("openPageInNewTab"),pagePreloaded:(0,c.createEventManager)("pagePreloaded"),pageLoaded:(0,c.createEventManager)("pageLoaded"),pageRetrievedFromCache:(0,c.createEventManager)("pageRetrievedFromCache"),pageView:(0,c.createEventManager)("pageView"),samePage:(0,c.createEventManager)("samePage"),samePageWithHash:(0,c.createEventManager)("samePageWithHash"),serverError:(0,c.createEventManager)("serverError"),transitionStart:(0,c.createEventManager)("transitionStart"),transitionEnd:(0,c.createEventManager)("transitionEnd"),willReplaceContent:(0,c.createEventManager)("willReplaceContent")},this.options={..._e,...e},this.cache=this.options.cache?new Map:xe}init(){if(this.plugins.length)throw new Error("Scatman is already initialized");this.use(new Re.ScatClickPlugin(this));let e=(0,S.getCurrentUrl)(),t=(0,ee.getPageDataFromHtml)(e,document.documentElement.outerHTML,this.options.containers);if(!t)throw new Error("Failed getting page from document");this.cache.set(t.url,t),this.replaceHistory(window.location.href),this.events.enabled.emit(),this.events.pageView.emit(void 0)}destroy(){this.cache.clear(),this.plugins.forEach(e=>e.unmount()),this.plugins.length=0,this.events.disabled.emit(),(0,c.eventManagerMapOff)(this.events)}use(...e){this.plugins.concat(e);for(let t of e)"animateOut"in t&&"animateIn"in t&&(this.animationPlugin=t),t.mount()}async getPageData(e,t){let n=await t.text();return(0,ee.getPageDataFromHtml)(e,n,this.options.containers)}async renderPage(e,t){let{popstate:n}=t,{path:s}=(0,S.unpackLink)(e.url);window.location.pathname!==s?(n||this.pushHistory(s),this.cache.set(s,e.cloneWithUrl(s))):n||this.pushHistory(e.url+t.hash),this.events.willReplaceContent.emit(t),this.replaceContainers(e),this.options.activateScripts&&this.activateScripts(),document.title=e.title,this.events.contentReplaced.emit(t),this.events.pageView.emit(t),this.animationPlugin&&!n&&(this.events.animationInStart.emit(),await this.animationPlugin.animateIn(t),this.events.animationInDone.emit()),this.events.transitionEnd.emit(t)}replaceContainers(e){let t=Array.from(document.body.querySelectorAll(this.options.containers));if(t.length!==e.blocks.length)throw new Error("Received page is invalid.");for(let n=0;n<t.length;n++)t[n].outerHTML=e.blocks[n]}activateScripts(){Array.from(document.body.querySelectorAll(this.options.containers)).flatMap(e=>Array.from(e.querySelectorAll("script"))).forEach(e=>{let t=document.createElement("script");Array.from(e.attributes).forEach(n=>t.setAttribute(n.name,n.value)),t.appendChild(document.createTextNode(e.innerHTML)),e.replaceWith(t)})}async doPreloadPage(e){let t=await fetch(e,{headers:this.options.requestHeaders});if(t.status===500)throw this.events.serverError.emit(),new Error("Server Error");let n=await this.getPageData(e,t);return this.cache.set(e,n),this.events.pagePreloaded.emit(),n}preloadPage(e){let t=this.cache.get(e);if(t)return t;let n=this.preloading.get(e);if(n)return n.promise;let a={promise:this.doPreloadPage(e).finally(()=>{this.preloading.delete(e)}),url:e};return this.preloading.set(e,a),a.promise}pushHistory(e){window.history.pushState({url:e,source:"scatman"},"",e)}replaceHistory(e){window.history.replaceState({url:e,source:"scatman"},"",e)}goTo(e,t){let{hash:n,url:s}=(0,S.unpackLink)(e);this.loadPage({fromUrl:(0,S.getCurrentUrl)(),url:s,hash:n,customTransition:t})}async loadPage(e){this.events.transitionStart.emit(e);let t=Promise.resolve();this.animationPlugin&&(e.popstate?this.events.animationSkipped.emit():(this.events.animationOutStart.emit(),t=this.animationPlugin.animateOut(e),this.events.animationOutDone.emit()));try{let n=this.cache.get(e.url);if(n)this.events.pageRetrievedFromCache.emit();else{let a=this.preloading.get(e.url);a?n=await a.promise:(n=await this.preloadPage(e.url),this.events.pageLoaded.emit(e))}await t,await this.renderPage(n,e);let s=document.querySelector("[autofocus]");s instanceof HTMLElement&&requestAnimationFrame(()=>{s.focus()})}catch(n){console.error("Error loading page: ",n),window.location.href=e.url}}};L.Scatman=D});var ne=h(T=>{"use strict";Object.defineProperty(T,"__esModule",{value:!0});T.ScatA11yPlugin=void 0;var Be={headingSelector:"main h1, h2, [role=heading]",mode:"focusHeading",announcementTemplate:"Navigated to: {title}",urlTemplate:"New page at {url}"},I=class{constructor(e,t={}){this.announceVisit=()=>{requestAnimationFrame(()=>{this.announcePageName()})},this.scatman=e,this.options={...Be,...t}}mount(){this.scatman.events.transitionEnd.on(this.announceVisit)}unmount(){this.scatman.events.transitionEnd.off(this.announceVisit),this.removeLiveNode()}removeLiveNode(){this.liveNode&&(this.liveNode.remove(),delete this.liveNode)}announce(e){this.removeLiveNode();let t=document.createElement("span");t.setAttribute("aria-live","polite"),t.setAttribute("role","status"),t.setAttribute("style","position: fixed; width: 1px; height: 1px; top: -10px; left: -10px; z-index: -1; overflow: hidden;"),document.body.appendChild(t),window.setTimeout(()=>{t.textContent=e},100),this.liveNode=t}announcePageName(){let{headingSelector:e,mode:t,urlTemplate:n,announcementTemplate:s}=this.options,a=document.querySelector(e);if(t==="focusHeading"&&a instanceof HTMLElement){a.setAttribute("tabindex","-1"),a.focus();return}let r=document.title||n.replace("{url}",window.location.pathname);if(a){let l=a.getAttribute("aria-label");l?r=l:a.textContent&&(r=a.textContent)}this.loseFocus();let o=s.replace("{title}",r.trim());this.announce(o)}loseFocus(){(document.activeElement instanceof HTMLElement||document.activeElement instanceof SVGElement)&&document.activeElement.blur()}};T.ScatA11yPlugin=I});var ie=h(k=>{"use strict";Object.defineProperty(k,"__esModule",{value:!0});k.ScatBodyClassPlugin=void 0;var se=g(),Oe={validClass:/./},j=class{constructor(e,t={}){this.onContentReplaced=()=>{var n;let s=this.scatman.cache.get((0,se.getCurrentUrl)());if(!s){console.warn("Page did not exist in cache: ",(0,se.getCurrentUrl)());return}let{validClass:a}=this.options;document.body.classList.forEach(o=>{a.test(o)&&document.body.classList.remove(o)});let r=(n=s.document.querySelector("body"))===null||n===void 0?void 0:n.classList;r?.forEach(o=>{a.test(o)&&document.body.classList.add(o)})},this.scatman=e,this.options={...Oe,...t}}mount(){this.scatman.events.contentReplaced.on(this.onContentReplaced)}unmount(){this.scatman.events.contentReplaced.off(this.onContentReplaced)}};k.ScatBodyClassPlugin=j});var ae=h(M=>{"use strict";Object.defineProperty(M,"__esModule",{value:!0});M.ScatCssPlugin=void 0;function qe(i){return i.toLowerCase().replace(/[\s/_]+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/(^-+|-+$)/g,"")||"homepage"}var De={animationSelector:'[class*="transition-"]'},F=class{constructor(e,t={}){this.onWillReplaceContent=({popstate:n})=>{document.documentElement.classList.remove("is-leaving"),n||document.documentElement.classList.add("is-rendering")},this.onContentReplaced=()=>{document.documentElement.classList.remove("is-rendering")},this.scatman=e,this.options={...De,...t}}mount(){document.documentElement.classList.add("scatman-enabled"),this.scatman.events.willReplaceContent.on(this.onWillReplaceContent),this.scatman.events.contentReplaced.on(this.onContentReplaced)}unmount(){document.documentElement.classList.remove("scatman-enabled"),this.scatman.events.willReplaceContent.off(this.onWillReplaceContent),this.scatman.events.contentReplaced.off(this.onContentReplaced)}getAnimationPromises(){let e=document.querySelectorAll(this.options.animationSelector);return Array.from(e).map(n=>new Promise(s=>{let a=r=>{n===r.target&&(n.removeEventListener("transitionend",a),s())};n.addEventListener("transitionend",a)}))}async animateOut({popstate:e,url:t,customTransition:n}){document.documentElement.classList.add("is-changing"),document.documentElement.classList.add("is-leaving"),document.documentElement.classList.add("is-animating"),e&&document.documentElement.classList.add("is-popstate");let s=n||t;document.documentElement.classList.add(`to-${qe(s)}`),await Promise.all(this.getAnimationPromises())}async animateIn(){setTimeout(()=>document.documentElement.classList.remove("is-animating"),10),await Promise.all(this.getAnimationPromises()),document.documentElement.classList.forEach(e=>{/^(to-|is-changing$|is-rendering$|is-popstate$)/.test(e)&&document.documentElement.classList.remove(e)})}};M.ScatCssPlugin=F});var re=h(A=>{"use strict";Object.defineProperty(A,"__esModule",{value:!0});A.ScatHeadPlugin=void 0;var oe=g(),Ie={persistTags:!1},U=class{constructor(e,t={}){this.onContentReplaced=()=>{let n=this.scatman.cache.get((0,oe.getCurrentUrl)());if(!n){console.warn("Page did not exist in cache: ",(0,oe.getCurrentUrl)());return}let s=n.document;this.getHeadAndReplace(s),this.updateHtmlLangAttribute(s)},this.scatman=e,this.options={...Ie,...t}}mount(){this.scatman.events.contentReplaced.on(this.onContentReplaced)}unmount(){this.scatman.events.contentReplaced.off(this.onContentReplaced)}getHeadAndReplace(e){let t=Array.from(document.head.children),n=Array.from(e.head.children),{head:s}=document,a=n.filter(o=>!t.some(l=>l.outerHTML===o.outerHTML));t.filter(o=>!this.isPersistentTag(o)&&!n.some(l=>o.outerHTML===l.outerHTML)).forEach(o=>o.remove()),a.forEach(o=>s.appendChild(o.cloneNode(!0)))}updateHtmlLangAttribute(e){let t=document.documentElement,n=e.documentElement.lang;t.lang!==n&&(t.lang=n)}isPersistentTag(e){if(e.hasAttribute("data-scatman-persist"))return!0;let{persistTags:t}=this.options;return typeof t=="function"?t(e):typeof t=="string"?e.matches(t):t}};A.ScatHeadPlugin=U});var le=h(H=>{"use strict";Object.defineProperty(H,"__esModule",{value:!0});H.ScatPreloadPlugin=void 0;var je=g(),Fe=w(),ce=B(),N=class{constructor(e){this.events={hoverLink:(0,ce.createEventManager)("hoverLink")},this.onContentReplaced=()=>{this.preloadPages()},this.onMouseover=t=>{let{scatman:n}=this,s=(0,Fe.getDelegateTarget)(t,n.options.linkSelector);!s||(this.events.hoverLink.emit(t),this.preloadPage(s))},this.scatman=e}mount(){document.body.addEventListener("mouseover",this.onMouseover),this.preloadPages(),this.scatman.events.contentReplaced.on(this.onContentReplaced)}unmount(){(0,ce.eventManagerMapOff)(this.events),document.body.removeEventListener("mouseover",this.onMouseover),this.scatman.events.contentReplaced.off(this.onContentReplaced)}async preloadPage(e){await this.scatman.preloadPage((0,je.unpackLink)(e).url)}preloadPages(){document.querySelectorAll("[data-scatman-preload]").forEach(e=>{let t=e.getAttribute("href");t&&this.preloadPage(t)})}};H.ScatPreloadPlugin=N});var he=h(R=>{"use strict";Object.defineProperty(R,"__esModule",{value:!0});R.ProgressBar=void 0;var $=class{constructor(e){this.minValue=.1,this.hiding=!1,this.value=0,this.visible=!1,this.trickle=()=>{let t=Math.random()*3/100;this.setValue(this.value+t),this.value===1&&this.stopTrickling()},this.options=e,this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}getDefaultCSS(){let{className:e,transition:t,background:n}=this.options;return`
			.${e} {
				position: fixed;
				display: block;
				top: 0;
				left: 0;
				height: 3px;
				background: ${n};
				z-index: 9999;
				transition:
                    width ${t}ms ease-out,
                    opacity ${t/2}ms ${t/2}ms ease-in;
                    transform: translate3d(0, 0, 0);
			}
    `}show(){this.visible||(this.visible=!0,document.head.insertBefore(this.stylesheetElement,document.head.firstChild),this.insertProgressElement(),this.startTrickling())}hide(){this.visible&&!this.hiding&&(this.hiding=!0,this.fadeProgressElement(()=>{this.progressElement.remove(),this.stopTrickling(),this.visible=!1,this.hiding=!1}))}setValue(e){this.value=Math.min(1,Math.max(this.minValue,e)),this.refresh()}insertProgressElement(){this.progressElement.style.width="0",this.progressElement.style.opacity="1",document.body.insertBefore(this.progressElement,document.body.firstChild),this.refresh()}fadeProgressElement(e){this.progressElement.style.opacity="0",setTimeout(e,this.options.transition*1.5)}startTrickling(){this.trickleInterval||(this.trickleInterval=window.setInterval(this.trickle,this.options.transition))}stopTrickling(){window.clearInterval(this.trickleInterval),delete this.trickleInterval}refresh(){requestAnimationFrame(()=>{this.progressElement.style.width=`${10+this.value*90}%`})}createStylesheetElement(){let e=document.createElement("style");return e.setAttribute("data-progressbar-styles",""),e.setAttribute("data-scatman-persist","true"),e.innerHTML=this.getDefaultCSS(),e}createProgressElement(){let e=document.createElement("div");return e.className=this.options.className,e}};R.ProgressBar=$});var de=h(_=>{"use strict";Object.defineProperty(_,"__esModule",{value:!0});_.ScatProgressPlugin=void 0;var Ue=he(),Ne={container:"body",className:"scatman-progress-bar",background:"red",transition:300,delay:300,hideImmediately:!0},V=class{constructor(e,t={}){this.start=()=>{this.progressBar.setValue(0),this.showProgressBarAfterDelay()},this.stop=()=>{this.progressBar.setValue(1),this.options.hideImmediately?this.hideProgressBar():this.finishAnimationAndHideProgressBar(),window.clearTimeout(this.showProgressBarTimeout),delete this.showProgressBarTimeout},this.showProgressBar=()=>{window.clearTimeout(this.hideProgressBarTimeout),delete this.hideProgressBarTimeout,this.progressBar.show()},this.hideProgressBar=()=>{this.progressBar.hide()},this.scatman=e,this.options={...Ne,...t};let n=document.querySelector(this.options.container);n||(console.warn(`Could not find container for progress bar using "${this.options.container}". Using body instead`),n=document.body),this.progressBar=new Ue.ProgressBar({className:this.options.className,transition:this.options.transition,background:this.options.background,container:n})}mount(){this.scatman.events.transitionStart.on(this.start),this.scatman.events.contentReplaced.on(this.stop)}unmount(){this.scatman.events.transitionStart.off(this.start),this.scatman.events.contentReplaced.off(this.stop)}showProgressBarAfterDelay(){this.showProgressBarTimeout=window.setTimeout(this.showProgressBar,this.options.delay)}finishAnimationAndHideProgressBar(){this.hideProgressBarTimeout=window.setTimeout(this.hideProgressBar,this.options.transition)}};_.ScatProgressPlugin=V});var ue=h(x=>{"use strict";Object.defineProperty(x,"__esModule",{value:!0});x.ScatScrollPlugin=void 0;var $e=w(),Ve=g(),We={doScrollingRightAway:!1,behavior:void 0},W=class{constructor(e,t={}){this.onSamePage=()=>this.resetScroll(),this.onSamePageWithHash=n=>{if(!n)return;let s=(0,$e.getDelegateTarget)(n,this.scatman.options.linkSelector);!s||this.scrollToHash((0,Ve.unpackLink)(s).hash)},this.onTransitionStart=n=>{this.options.doScrollingRightAway&&!n.hash&&this.doScrolling(n)},this.onContentReplaced=n=>{(!this.options.doScrollingRightAway||n.hash)&&this.doScrolling(n)},this.scatman=e,this.options={...We,...t}}mount(){this.scatman.events.samePage.on(this.onSamePage),this.scatman.events.samePageWithHash.on(this.onSamePageWithHash),this.scatman.events.transitionStart.on(this.onTransitionStart),this.scatman.events.contentReplaced.on(this.onContentReplaced)}unmount(){this.scatman.events.samePage.off(this.onSamePage),this.scatman.events.samePageWithHash.off(this.onSamePageWithHash),this.scatman.events.transitionStart.off(this.onTransitionStart),this.scatman.events.contentReplaced.off(this.onContentReplaced),window.history.scrollRestoration="auto"}resetScroll(){this.scrollTo(0,window),document.querySelectorAll(".scatman-scroll-area").forEach(e=>this.scrollTo(0,e))}scrollTo(e,t){t.scrollTo({left:0,top:e,behavior:this.options.behavior})}scrollToHash(e){let t=e.slice(1),n=document.getElementById(t);if(n||(n=Array.from(document.querySelectorAll("a[name]")).find(s=>s.getAttribute("name")===t)),n){let s=n.closest(".scatman-scroll-area"),{top:a}=n.getBoundingClientRect();if(!s)return this.scrollTo(a+window.pageYOffset,window);let{top:r}=s.getBoundingClientRect(),o=a-r;return this.scrollTo(o+s.scrollTop,s)}console.warn(`Element ${e} not found`),this.scrollTo(0,window)}doScrolling({popstate:e,hash:t}){e||(t?this.scrollToHash(t):this.resetScroll())}};x.ScatScrollPlugin=W});var pe=h(me=>{"use strict";Object.defineProperty(me,"__esModule",{value:!0})});var ge=h(d=>{"use strict";var ze=d&&d.__createBinding||(Object.create?function(i,e,t,n){n===void 0&&(n=t);var s=Object.getOwnPropertyDescriptor(e,t);(!s||("get"in s?!e.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(i,n,s)}:function(i,e,t,n){n===void 0&&(n=t),i[n]=e[t]}),p=d&&d.__exportStar||function(i,e){for(var t in i)t!=="default"&&!Object.prototype.hasOwnProperty.call(e,t)&&ze(e,i,t)};Object.defineProperty(d,"__esModule",{value:!0});p(te(),d);p(ne(),d);p(ie(),d);p(ae(),d);p(re(),d);p(le(),d);p(de(),d);p(ue(),d);p(pe(),d)});var u=Ce(ge()),m=new u.Scatman;document.addEventListener("DOMContentLoaded",()=>{m.init(),m.use(new u.ScatHeadPlugin(m),new u.ScatBodyClassPlugin(m),new u.ScatScrollPlugin(m),new u.ScatProgressPlugin(m),new u.ScatPreloadPlugin(m),new u.ScatA11yPlugin(m))});var z=class extends HTMLElement{constructor(){super(...arguments);this.onClick=()=>{let t=this.getAttribute("code");t&&navigator.clipboard.writeText(t)}}connectedCallback(){var t;this.setAttribute("tabindex","0"),this.className=(t=this.getAttribute("enhancedClass"))!=null?t:"",this.addEventListener("click",this.onClick)}disconnectedCallback(){this.removeAttribute("tabindex"),this.removeEventListener("click",this.onClick)}};customElements.define("code-copy-button",z);function Ke(i,e=300){let t;return()=>{clearTimeout(t),t=setTimeout(i,e)}}function fe(i,e){let t=document.createElement("a");return t.href=i,t.textContent=e,t}var K=class extends HTMLElement{constructor(){super(...arguments);this.onInput=Ke(()=>this.updateSearchResult());this.onDocumentClick=({target:t})=>{let n=this.getAttributeChecked("overlayVisible");t instanceof Element&&(t.closest("a")||!t.closest("search-container"))&&this.getElementByAttribute("overlay").classList.toggle(n,!1)}}getAttributeChecked(t){let n=this.getAttribute(t);if(n===null)throw new Error(`Missing attribute ${t} on SearchContainer`);return n}getElementByAttribute(t){let n=this.getAttributeChecked(t),s=this.querySelector(`.${n}`);if(s===null)throw new Error(`Element .${n} not found within SearchContainer`);return s}connectedCallback(){let t=this.getElementByAttribute("searchField");t.addEventListener("input",this.onInput);let n=this.getElementByAttribute("searchButton"),s=this.getElementByAttribute("overlay"),a=this.getAttributeChecked("overlayVisible"),r=this.getElementByAttribute("searchItems");n.addEventListener("click",()=>{t.value="",r.innerHTML="",s.classList.toggle(a),s.classList.contains(a)&&t.focus(),this.data||this.fetchData()}),document.addEventListener("click",this.onDocumentClick)}disconnectedCallback(){this.getElementByAttribute("searchField").removeEventListener("input",this.onInput),document.removeEventListener("click",this.onDocumentClick)}async fetchData(){try{let t=this.getAttributeChecked("searchData"),n=await fetch(t);if(!n.ok)throw new Error("Failed getting search data");this.data=await n.json(),this.updateSearchResult()}catch(t){console.error(t)}}updateSearchResult(){if(this.data){let t=this.getElementByAttribute("searchField"),n=this.getElementByAttribute("searchItems"),s=t.value.toLocaleLowerCase().split(" ").filter(a=>a.trim());if(n.innerHTML="",!s.length)return;for(let a of this.data){let r=a.title.toLowerCase(),o=a.content.toLowerCase();if(o&&s.every(l=>o.includes(l))||r&&s.every(l=>r.includes(l))){let l=document.createElement("li");n.appendChild(l),a.projectIndex&&a.projectIndex.url!==a.url&&(l.appendChild(fe(a.projectIndex.url,a.projectIndex.title)),l.appendChild(document.createTextNode(" / "))),l.appendChild(fe(a.url,a.title))}}}}};customElements.define("search-container",K);var G=class extends HTMLSelectElement{constructor(){super(...arguments);this.onChangeHandler=()=>{this.value&&m.goTo(this.value)}}connectedCallback(){this.addEventListener("change",this.onChangeHandler)}disconnectedCallback(){this.removeEventListener("change",this.onChangeHandler)}};customElements.define("link-select",G,{extends:"select"});})();
