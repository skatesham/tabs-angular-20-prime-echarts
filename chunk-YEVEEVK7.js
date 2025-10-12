import{m as oe,o as ae,p as re,q as se,r as le,s as L,v as w,w as b,x as O,y as S,z as ce}from"./chunk-PC46MSPL.js";import{g as ee,i as te,j as ne,o as ie}from"./chunk-DDQ2LSDA.js";import{Cb as W,Da as $,Db as p,Eb as j,Fb as V,Ka as N,La as H,Ma as z,Na as M,Nb as x,Oa as m,R as h,S as B,W as l,Xa as J,a as d,bc as X,ca as P,cb as c,da as G,db as _,eb as T,ec as Z,ia as U,jb as F,kb as R,la as q,lb as I,ma as g,oa as K,pb as v,qb as A,rb as C,sa as Y,sb as f,ub as u,vb as y,ya as r}from"./chunk-D772VWWO.js";function E(...t){if(t){let o=[];for(let e=0;e<t.length;e++){let i=t[e];if(!i)continue;let n=typeof i;if(n==="string"||n==="number")o.push(i);else if(n==="object"){let s=Array.isArray(i)?[E(...i)]:Object.entries(i).map(([a,he])=>he?a:void 0);o=s.length?o.concat(s.filter(a=>!!a)):o}}return o.join(" ").trim()}}var D={};function de(t="pui_id_"){return Object.hasOwn(D,t)||(D[t]=0),D[t]++,`${t}${D[t]}`}var pe=(()=>{class t extends S{name="common";static \u0275fac=(()=>{let e;return function(n){return(e||(e=g(t)))(n||t)}})();static \u0275prov=h({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),k=(()=>{class t{document=l(G);platformId=l(Y);el=l(K);injector=l(P);cd=l(X);renderer=l($);config=l(ce);baseComponentStyle=l(pe);baseStyle=l(S);scopedStyleEl;rootEl;dt;get styleOptions(){return{nonce:this.config?.csp().nonce}}get _name(){return this.constructor.name.replace(/^_/,"").toLowerCase()}get componentStyle(){return this._componentStyle}attrSelector=de("pc");themeChangeListeners=[];_getHostInstance(e){if(e)return e?this.hostName?e.name===this.hostName?e:this._getHostInstance(e.parentInstance):e.parentInstance:void 0}_getOptionValue(e,i="",n={}){return ae(e,i,n)}ngOnInit(){this.document&&(this._loadCoreStyles(),this._loadStyles())}ngAfterViewInit(){this.rootEl=this.el?.nativeElement,this.rootEl&&this.rootEl?.setAttribute(this.attrSelector,"")}ngOnChanges(e){if(this.document&&!ie(this.platformId)){let{dt:i}=e;i&&i.currentValue&&(this._loadScopedThemeStyles(i.currentValue),this._themeChangeListener(()=>this._loadScopedThemeStyles(i.currentValue)))}}ngOnDestroy(){this._unloadScopedThemeStyles(),this.themeChangeListeners.forEach(e=>w.off("theme:change",e))}_loadStyles(){let e=()=>{O.isStyleNameLoaded("base")||(this.baseStyle.loadGlobalCSS(this.styleOptions),O.setLoadedStyleName("base")),this._loadThemeStyles()};e(),this._themeChangeListener(()=>e())}_loadCoreStyles(){!O.isStyleNameLoaded("base")&&this.componentStyle?.name&&(this.baseComponentStyle.loadCSS(this.styleOptions),this.componentStyle&&this.componentStyle?.loadCSS(this.styleOptions),O.setLoadedStyleName(this.componentStyle?.name))}_loadThemeStyles(){if(!b.isStyleNameLoaded("common")){let{primitive:e,semantic:i,global:n,style:s}=this.componentStyle?.getCommonTheme?.()||{};this.baseStyle.load(e?.css,d({name:"primitive-variables"},this.styleOptions)),this.baseStyle.load(i?.css,d({name:"semantic-variables"},this.styleOptions)),this.baseStyle.load(n?.css,d({name:"global-variables"},this.styleOptions)),this.baseStyle.loadGlobalTheme(d({name:"global-style"},this.styleOptions),s),b.setLoadedStyleName("common")}if(!b.isStyleNameLoaded(this.componentStyle?.name)&&this.componentStyle?.name){let{css:e,style:i}=this.componentStyle?.getComponentTheme?.()||{};this.componentStyle?.load(e,d({name:`${this.componentStyle?.name}-variables`},this.styleOptions)),this.componentStyle?.loadTheme(d({name:`${this.componentStyle?.name}-style`},this.styleOptions),i),b.setLoadedStyleName(this.componentStyle?.name)}if(!b.isStyleNameLoaded("layer-order")){let e=this.componentStyle?.getLayerOrderThemeCSS?.();this.baseStyle.load(e,d({name:"layer-order",first:!0},this.styleOptions)),b.setLoadedStyleName("layer-order")}this.dt&&(this._loadScopedThemeStyles(this.dt),this._themeChangeListener(()=>this._loadScopedThemeStyles(this.dt)))}_loadScopedThemeStyles(e){let{css:i}=this.componentStyle?.getPresetTheme?.(e,`[${this.attrSelector}]`)||{},n=this.componentStyle?.load(i,d({name:`${this.attrSelector}-${this.componentStyle?.name}`},this.styleOptions));this.scopedStyleEl=n?.el}_unloadScopedThemeStyles(){this.scopedStyleEl?.remove()}_themeChangeListener(e=()=>{}){O.clearLoadedStyleNames(),w.on("theme:change",e),this.themeChangeListeners.push(e)}cx(e,i={}){return E(this._getOptionValue(this.$style?.classes,e,d({instance:this},i)))}sx(e="",i=!0,n={}){if(i)return this._getOptionValue(this.$style?.inlineStyles,e,d({instance:this},n))}get parent(){return this.parentInstance}get $style(){return this.parent?this.parent.componentStyle:this.componentStyle}cn=E;static \u0275fac=function(i){return new(i||t)};static \u0275dir=z({type:t,inputs:{dt:"dt"},features:[x([pe,S]),q]})}return t})();var me=`
    .p-card {
        background: dt('card.background');
        color: dt('card.color');
        box-shadow: dt('card.shadow');
        border-radius: dt('card.border.radius');
        display: flex;
        flex-direction: column;
    }

    .p-card-caption {
        display: flex;
        flex-direction: column;
        gap: dt('card.caption.gap');
    }

    .p-card-body {
        padding: dt('card.body.padding');
        display: flex;
        flex-direction: column;
        gap: dt('card.body.gap');
    }

    .p-card-title {
        font-size: dt('card.title.font.size');
        font-weight: dt('card.title.font.weight');
    }

    .p-card-subtitle {
        color: dt('card.subtitle.color');
    }
`;var ge=["header"],Se=["title"],_e=["subtitle"],Te=["content"],ve=["footer"],be=["*",[["p-header"]],[["p-footer"]]],Ie=["*","p-header","p-footer"];function Ce(t,o){t&1&&I(0)}function xe(t,o){if(t&1&&(_(0,"div"),C(1,1),m(2,Ce,1,0,"ng-container",1),T()),t&2){let e=v();p(e.cx("header")),r(2),c("ngTemplateOutlet",e.headerTemplate||e._headerTemplate)}}function Oe(t,o){if(t&1&&(F(0),j(1),R()),t&2){let e=v(2);r(),V(e.header)}}function Ee(t,o){t&1&&I(0)}function Ne(t,o){if(t&1&&(_(0,"div"),m(1,Oe,2,1,"ng-container",2)(2,Ee,1,0,"ng-container",1),T()),t&2){let e=v();p(e.cx("title")),r(),c("ngIf",e.header&&!e._titleTemplate&&!e.titleTemplate),r(),c("ngTemplateOutlet",e.titleTemplate||e._titleTemplate)}}function Me(t,o){if(t&1&&(F(0),j(1),R()),t&2){let e=v(2);r(),V(e.subheader)}}function Ae(t,o){t&1&&I(0)}function Le(t,o){if(t&1&&(_(0,"div"),m(1,Me,2,1,"ng-container",2)(2,Ae,1,0,"ng-container",1),T()),t&2){let e=v();p(e.cx("subtitle")),r(),c("ngIf",e.subheader&&!e._subtitleTemplate&&!e.subtitleTemplate),r(),c("ngTemplateOutlet",e.subtitleTemplate||e._subtitleTemplate)}}function De(t,o){t&1&&I(0)}function ke(t,o){t&1&&I(0)}function Fe(t,o){if(t&1&&(_(0,"div"),C(1,2),m(2,ke,1,0,"ng-container",1),T()),t&2){let e=v();p(e.cx("footer")),r(2),c("ngTemplateOutlet",e.footerTemplate||e._footerTemplate)}}var Re=`
    ${me}

    .p-card {
        display: block;
    }
`,je={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},fe=(()=>{class t extends S{name="card";theme=Re;classes=je;static \u0275fac=(()=>{let e;return function(n){return(e||(e=g(t)))(n||t)}})();static \u0275prov=h({token:t,factory:t.\u0275fac})}return t})();var Ve=(()=>{class t extends k{header;subheader;set style(e){oe(this._style(),e)||this._style.set(e)}styleClass;headerFacet;footerFacet;headerTemplate;titleTemplate;subtitleTemplate;contentTemplate;footerTemplate;_headerTemplate;_titleTemplate;_subtitleTemplate;_contentTemplate;_footerTemplate;_style=U(null);_componentStyle=l(fe);getBlockableElement(){return this.el.nativeElement.children[0]}templates;ngAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"header":this._headerTemplate=e.template;break;case"title":this._titleTemplate=e.template;break;case"subtitle":this._subtitleTemplate=e.template;break;case"content":this._contentTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=g(t)))(n||t)}})();static \u0275cmp=N({type:t,selectors:[["p-card"]],contentQueries:function(i,n,s){if(i&1&&(f(s,re,5),f(s,se,5),f(s,ge,4),f(s,Se,4),f(s,_e,4),f(s,Te,4),f(s,ve,4),f(s,le,4)),i&2){let a;u(a=y())&&(n.headerFacet=a.first),u(a=y())&&(n.footerFacet=a.first),u(a=y())&&(n.headerTemplate=a.first),u(a=y())&&(n.titleTemplate=a.first),u(a=y())&&(n.subtitleTemplate=a.first),u(a=y())&&(n.contentTemplate=a.first),u(a=y())&&(n.footerTemplate=a.first),u(a=y())&&(n.templates=a)}},hostVars:5,hostBindings:function(i,n){i&2&&(J("data-pc-name","card"),W(n._style()),p(n.cn(n.cx("root"),n.styleClass)))},inputs:{header:"header",subheader:"subheader",style:"style",styleClass:"styleClass"},features:[x([fe]),M],ngContentSelectors:Ie,decls:8,vars:9,consts:[[3,"class",4,"ngIf"],[4,"ngTemplateOutlet"],[4,"ngIf"]],template:function(i,n){i&1&&(A(be),m(0,xe,3,3,"div",0),_(1,"div"),m(2,Ne,3,4,"div",0)(3,Le,3,4,"div",0),_(4,"div"),C(5),m(6,De,1,0,"ng-container",1),T(),m(7,Fe,3,3,"div",0),T()),i&2&&(c("ngIf",n.headerFacet||n.headerTemplate||n._headerTemplate),r(),p(n.cx("body")),r(),c("ngIf",n.header||n.titleTemplate||n._titleTemplate),r(),c("ngIf",n.subheader||n.subtitleTemplate||n._subtitleTemplate),r(),p(n.cx("content")),r(2),c("ngTemplateOutlet",n.contentTemplate||n._contentTemplate),r(),c("ngIf",n.footerFacet||n.footerTemplate||n._footerTemplate))},dependencies:[ne,ee,te,L],encapsulation:2,changeDetection:0})}return t})(),ht=(()=>{class t{static \u0275fac=function(i){return new(i||t)};static \u0275mod=H({type:t});static \u0275inj=B({imports:[Ve,L,L]})}return t})();var St="daily-tasks",_t="daily-progress-history",Tt="quantum-activities",vt="quantum-activities-pending",bt="mission-vision-values";var Ct=[{icon:"\u{1F3AF}",title:"Miss\xE3o",description:"Criar e entregar produtos art\xEDsticos inovadores que conectam arte, espiritualidade e funcionalidade, transformando energia criativa em objetos \xFAnicos que elevam a consci\xEAncia e inspiram transforma\xE7\xE3o pessoal.",color:"text-blue-600 dark:text-blue-400"},{icon:"\u2728",title:"Vis\xE3o",description:"Ser refer\xEAncia em cria\xE7\xE3o xam\xE2nica contempor\xE2nea, integrando t\xE9cnicas ancestrais com inova\xE7\xE3o art\xEDstica, expandindo fronteiras criativas e estabelecendo um ateli\xEA onde cada pe\xE7a carrega inten\xE7\xE3o, beleza e prop\xF3sito.",color:"text-purple-600 dark:text-purple-400"},{icon:"\u{1F48E}",title:"Valores",values:["Autenticidade criativa","Excel\xEAncia artesanal","Consci\xEAncia espiritual","Inova\xE7\xE3o constante","Ciclos naturais","Integridade","Sustentabilidade"],color:"text-green-600 dark:text-green-400"}],xt={MISSION:"\u{1F3AF}",VISION:"\u2728",VALUES:"\u{1F48E}"},Ot={MISSION:"text-blue-600 dark:text-blue-400",VISION:"text-purple-600 dark:text-purple-400",VALUES:"text-green-600 dark:text-green-400"};var ue=class t{getItem(o){try{let e=localStorage.getItem(o);return e?JSON.parse(e):null}catch{return null}}setItem(o,e){try{localStorage.setItem(o,JSON.stringify(e))}catch{}}removeItem(o){localStorage.removeItem(o)}clear(){localStorage.clear()}static \u0275fac=function(e){return new(e||t)};static \u0275prov=h({token:t,factory:t.\u0275fac,providedIn:"root"})};var we=["*"],Qe=`
.p-icon {
    display: inline-block;
    vertical-align: baseline;
}

.p-icon-spin {
    -webkit-animation: p-icon-spin 2s infinite linear;
    animation: p-icon-spin 2s infinite linear;
}

@-webkit-keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes p-icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`,ye=(()=>{class t extends S{name="baseicon";css=Qe;static \u0275fac=(()=>{let e;return function(n){return(e||(e=g(t)))(n||t)}})();static \u0275prov=h({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var wt=(()=>{class t extends k{spin=!1;_componentStyle=l(ye);getClassNames(){return E("p-icon",{"p-icon-spin":this.spin})}static \u0275fac=(()=>{let e;return function(n){return(e||(e=g(t)))(n||t)}})();static \u0275cmp=N({type:t,selectors:[["ng-component"]],hostAttrs:["width","14","height","14","viewBox","0 0 14 14","fill","none","xmlns","http://www.w3.org/2000/svg"],hostVars:2,hostBindings:function(i,n){i&2&&p(n.getClassNames())},inputs:{spin:[2,"spin","spin",Z]},features:[x([ye]),M],ngContentSelectors:we,decls:1,vars:0,template:function(i,n){i&1&&(A(),C(0))},encapsulation:2,changeDetection:0})}return t})();export{de as a,k as b,Ve as c,ht as d,wt as e,St as f,_t as g,Tt as h,vt as i,bt as j,Ct as k,xt as l,Ot as m,ue as n};
