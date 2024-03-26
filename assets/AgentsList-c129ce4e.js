import{z as f,B as Ge,a as V,C as Se,q as H,D as de,r as te,E as Le,F as _,G as Ne,H as ze,I as pe,J as ve,K as ge,x as De,n as Ie,A as re,c as A,o as M,d as U,i as O,w as E,e as b,j as P,t as k,g as q,L as Fe}from"./index-603ac4d1.js";function he(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),t.push.apply(t,a)}return t}function K(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?he(Object(t),!0).forEach(function(a){ke(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):he(Object(t)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}function ke(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function Y(e){return typeof e=="function"}function ce(e){return e!==null&&typeof e=="object"&&!Array.isArray(e)}function ae(e){return Y(e.$validator)?K({},e):{$validator:e}}function Re(e){return typeof e=="object"?e.$valid:e}function Ve(e){return e.$validator||e}function Me(e,n){if(!ce(e))throw new Error(`[@vuelidate/validators]: First parameter to "withParams" should be an object, provided ${typeof e}`);if(!ce(n)&&!Y(n))throw new Error("[@vuelidate/validators]: Validator must be a function or object with $validator parameter");const t=ae(n);return t.$params=K(K({},t.$params||{}),e),t}function Ue(e,n){if(!Y(e)&&typeof f(e)!="string")throw new Error(`[@vuelidate/validators]: First parameter to "withMessage" should be string or a function returning a string, provided ${typeof e}`);if(!ce(n)&&!Y(n))throw new Error("[@vuelidate/validators]: Validator must be a function or object with $validator parameter");const t=ae(n);return t.$message=e,t}function Be(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];const t=ae(e);return K(K({},t),{},{$async:!0,$watchTargets:n})}function qe(e){return{$validator(n){for(var t=arguments.length,a=new Array(t>1?t-1:0),s=1;s<t;s++)a[s-1]=arguments[s];return f(n).reduce((l,o,m)=>{const p=Object.entries(o).reduce((i,v)=>{let[$,y]=v;const h=e[$]||{},r=Object.entries(h).reduce((d,c)=>{let[w,T]=c;const C=Ve(T).call(this,y,o,m,...a),x=Re(C);if(d.$data[w]=C,d.$data.$invalid=!x||!!d.$data.$invalid,d.$data.$error=d.$data.$invalid,!x){let u=T.$message||"";const S=T.$params||{};typeof u=="function"&&(u=u({$pending:!1,$invalid:!x,$params:S,$model:y,$response:C})),d.$errors.push({$property:$,$message:u,$params:S,$response:C,$model:y,$pending:!1,$validator:w})}return{$valid:d.$valid&&x,$data:d.$data,$errors:d.$errors}},{$valid:!0,$data:{},$errors:[]});return i.$data[$]=r.$data,i.$errors[$]=r.$errors,{$valid:i.$valid&&r.$valid,$data:i.$data,$errors:i.$errors}},{$valid:!0,$data:{},$errors:{}});return{$valid:l.$valid&&p.$valid,$data:l.$data.concat(p.$data),$errors:l.$errors.concat(p.$errors)}},{$valid:!0,$data:[],$errors:[]})},$message:n=>{let{$response:t}=n;return t?t.$errors.map(a=>Object.values(a).map(s=>s.map(l=>l.$message)).reduce((s,l)=>s.concat(l),[])):[]}}}const Z=e=>{if(e=f(e),Array.isArray(e))return!!e.length;if(e==null)return!1;if(e===!1)return!0;if(e instanceof Date)return!isNaN(e.getTime());if(typeof e=="object"){for(let n in e)return!0;return!1}return!!String(e).length},fe=e=>(e=f(e),Array.isArray(e)?e.length:typeof e=="object"?Object.keys(e).length:String(e).length);function D(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return a=>(a=f(a),!Z(a)||n.every(s=>(s.lastIndex=0,s.test(a))))}var se=Object.freeze({__proto__:null,forEach:qe,len:fe,normalizeValidatorObject:ae,regex:D,req:Z,unwrap:f,unwrapNormalizedValidator:Ve,unwrapValidatorResponse:Re,withAsync:Be,withMessage:Ue,withParams:Me});D(/^[a-zA-Z]*$/);D(/^[a-zA-Z0-9]*$/);D(/^\d*(\.\d+)?$/);const He=/^(?:[A-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;D(He);function Ke(e){return n=>!Z(n)||fe(n)<=f(e)}function oe(e){return{$validator:Ke(e),$message:n=>{let{$params:t}=n;return`The maximum length allowed is ${t.max}`},$params:{max:e,type:"maxLength"}}}function Ze(e){return n=>!Z(n)||fe(n)>=f(e)}function le(e){return{$validator:Ze(e),$message:n=>{let{$params:t}=n;return`This field should be at least ${t.min} characters long`},$params:{min:e,type:"minLength"}}}function Je(e){return typeof e=="string"&&(e=e.trim()),Z(e)}var ie={$validator:Je,$message:"Value is required",$params:{type:"required"}};const We=/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;D(We);D(/(^[0-9]*$)|(^-[0-9]+$)/);D(/^[-]?\d*(\.\d+)?$/);function ye(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),t.push.apply(t,a)}return t}function z(e){for(var n=1;n<arguments.length;n++){var t=arguments[n]!=null?arguments[n]:{};n%2?ye(Object(t),!0).forEach(function(a){Qe(e,a,t[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ye(Object(t)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))})}return e}function Qe(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function be(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return Object.keys(e).reduce((t,a)=>(n.includes(a)||(t[a]=f(e[a])),t),{})}function ee(e){return typeof e=="function"}function Xe(e){return Ne(e)||ze(e)}function Ce(e,n,t){let a=e;const s=n.split(".");for(let l=0;l<s.length;l++){if(!a[s[l]])return t;a=a[s[l]]}return a}function ue(e,n,t){return _(()=>e.some(a=>Ce(n,a,{[t]:!1})[t]))}function we(e,n,t){return _(()=>e.reduce((a,s)=>{const l=Ce(n,s,{[t]:!1})[t]||[];return a.concat(l)},[]))}function je(e,n,t,a){return e.call(a,f(n),f(t),a)}function Ae(e){return e.$valid!==void 0?!e.$valid:!e}function Ye(e,n,t,a,s,l,o){let{$lazy:m,$rewardEarly:p}=s,i=arguments.length>7&&arguments[7]!==void 0?arguments[7]:[],v=arguments.length>8?arguments[8]:void 0,$=arguments.length>9?arguments[9]:void 0,y=arguments.length>10?arguments[10]:void 0;const h=V(!!a.value),r=V(0);t.value=!1;const d=H([n,a].concat(i,y),()=>{if(m&&!a.value||p&&!$.value&&!t.value)return;let c;try{c=je(e,n,v,o)}catch(w){c=Promise.reject(w)}r.value++,t.value=!!r.value,h.value=!1,Promise.resolve(c).then(w=>{r.value--,t.value=!!r.value,l.value=w,h.value=Ae(w)}).catch(w=>{r.value--,t.value=!!r.value,l.value=w,h.value=!0})},{immediate:!0,deep:typeof n=="object"});return{$invalid:h,$unwatch:d}}function et(e,n,t,a,s,l,o,m){let{$lazy:p,$rewardEarly:i}=a;const v=()=>({}),$=_(()=>{if(p&&!t.value||i&&!m.value)return!1;let y=!0;try{const h=je(e,n,o,l);s.value=h,y=Ae(h)}catch(h){s.value=h}return y});return{$unwatch:v,$invalid:$}}function tt(e,n,t,a,s,l,o,m,p,i,v){const $=V(!1),y=e.$params||{},h=V(null);let r,d;e.$async?{$invalid:r,$unwatch:d}=Ye(e.$validator,n,$,t,a,h,s,e.$watchTargets,p,i,v):{$invalid:r,$unwatch:d}=et(e.$validator,n,t,a,h,s,p,i);const c=e.$message;return{$message:ee(c)?_(()=>c(be({$pending:$,$invalid:r,$params:be(y),$model:n,$response:h,$validator:l,$propertyPath:m,$property:o}))):c||"",$params:y,$pending:$,$invalid:r,$response:h,$unwatch:d}}function at(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const n=f(e),t=Object.keys(n),a={},s={},l={};let o=null;return t.forEach(m=>{const p=n[m];switch(!0){case ee(p.$validator):a[m]=p;break;case ee(p):a[m]={$validator:p};break;case m==="$validationGroups":o=p;break;case m.startsWith("$"):l[m]=p;break;default:s[m]=p}}),{rules:a,nestedValidators:s,config:l,validationGroups:o}}const nt="__root";function rt(e,n,t,a,s,l,o,m,p){const i=Object.keys(e),v=a.get(s,e),$=V(!1),y=V(!1),h=V(0);if(v){if(!v.$partial)return v;v.$unwatch(),$.value=v.$dirty.value}const r={$dirty:$,$path:s,$touch:()=>{$.value||($.value=!0)},$reset:()=>{$.value&&($.value=!1)},$commit:()=>{}};return i.length?(i.forEach(d=>{r[d]=tt(e[d],n,r.$dirty,l,o,d,t,s,p,y,h)}),r.$externalResults=_(()=>m.value?[].concat(m.value).map((d,c)=>({$propertyPath:s,$property:t,$validator:"$externalResults",$uid:`${s}-externalResult-${c}`,$message:d,$params:{},$response:null,$pending:!1})):[]),r.$invalid=_(()=>{const d=i.some(c=>f(r[c].$invalid));return y.value=d,!!r.$externalResults.value.length||d}),r.$pending=_(()=>i.some(d=>f(r[d].$pending))),r.$error=_(()=>r.$dirty.value?r.$pending.value||r.$invalid.value:!1),r.$silentErrors=_(()=>i.filter(d=>f(r[d].$invalid)).map(d=>{const c=r[d];return te({$propertyPath:s,$property:t,$validator:d,$uid:`${s}-${d}`,$message:c.$message,$params:c.$params,$response:c.$response,$pending:c.$pending})}).concat(r.$externalResults.value)),r.$errors=_(()=>r.$dirty.value?r.$silentErrors.value:[]),r.$unwatch=()=>i.forEach(d=>{r[d].$unwatch()}),r.$commit=()=>{y.value=!0,h.value=Date.now()},a.set(s,e,r),r):(v&&a.set(s,e,r),r)}function st(e,n,t,a,s,l,o){const m=Object.keys(e);return m.length?m.reduce((p,i)=>(p[i]=me({validations:e[i],state:n,key:i,parentKey:t,resultsCache:a,globalConfig:s,instance:l,externalResults:o}),p),{}):{}}function ot(e,n,t){const a=_(()=>[n,t].filter(r=>r).reduce((r,d)=>r.concat(Object.values(f(d))),[])),s=_({get(){return e.$dirty.value||(a.value.length?a.value.every(r=>r.$dirty):!1)},set(r){e.$dirty.value=r}}),l=_(()=>{const r=f(e.$silentErrors)||[],d=a.value.filter(c=>(f(c).$silentErrors||[]).length).reduce((c,w)=>c.concat(...w.$silentErrors),[]);return r.concat(d)}),o=_(()=>{const r=f(e.$errors)||[],d=a.value.filter(c=>(f(c).$errors||[]).length).reduce((c,w)=>c.concat(...w.$errors),[]);return r.concat(d)}),m=_(()=>a.value.some(r=>r.$invalid)||f(e.$invalid)||!1),p=_(()=>a.value.some(r=>f(r.$pending))||f(e.$pending)||!1),i=_(()=>a.value.some(r=>r.$dirty)||a.value.some(r=>r.$anyDirty)||s.value),v=_(()=>s.value?p.value||m.value:!1),$=()=>{e.$touch(),a.value.forEach(r=>{r.$touch()})},y=()=>{e.$commit(),a.value.forEach(r=>{r.$commit()})},h=()=>{e.$reset(),a.value.forEach(r=>{r.$reset()})};return a.value.length&&a.value.every(r=>r.$dirty)&&$(),{$dirty:s,$errors:o,$invalid:m,$anyDirty:i,$error:v,$pending:p,$touch:$,$reset:h,$silentErrors:l,$commit:y}}function me(e){let{validations:n,state:t,key:a,parentKey:s,childResults:l,resultsCache:o,globalConfig:m={},instance:p,externalResults:i}=e;const v=s?`${s}.${a}`:a,{rules:$,nestedValidators:y,config:h,validationGroups:r}=at(n),d=z(z({},m),h),c=a?_(()=>{const R=f(t);return R?f(R[a]):void 0}):t,w=z({},f(i)||{}),T=_(()=>{const R=f(i);return a?R?f(R[a]):void 0:R}),G=rt($,c,a,o,v,d,p,T,t),C=st(y,c,v,o,d,p,T),x={};r&&Object.entries(r).forEach(R=>{let[F,N]=R;x[F]={$invalid:ue(N,C,"$invalid"),$error:ue(N,C,"$error"),$pending:ue(N,C,"$pending"),$errors:we(N,C,"$errors"),$silentErrors:we(N,C,"$silentErrors")}});const{$dirty:u,$errors:S,$invalid:L,$anyDirty:I,$error:ne,$pending:j,$touch:B,$reset:J,$silentErrors:W,$commit:Q}=ot(G,C,l),g=a?_({get:()=>f(c),set:R=>{u.value=!0;const F=f(t),N=f(i);N&&(N[a]=w[a]),de(F[a])?F[a].value=R:F[a]=R}}):null;a&&d.$autoDirty&&H(c,()=>{u.value||B();const R=f(i);R&&(R[a]=w[a])},{flush:"sync"});async function $e(){return B(),d.$rewardEarly&&(Q(),await ge()),await ge(),new Promise(R=>{if(!j.value)return R(!L.value);const F=H(j,()=>{R(!L.value),F()})})}function Pe(R){return(l.value||{})[R]}function Te(){de(i)?i.value=w:Object.keys(w).length===0?Object.keys(i).forEach(R=>{delete i[R]}):Object.assign(i,w)}return te(z(z(z({},G),{},{$model:g,$dirty:u,$error:ne,$errors:S,$invalid:L,$anyDirty:I,$pending:j,$touch:B,$reset:J,$path:v||nt,$silentErrors:W,$validate:$e,$commit:Q},l&&{$getResultsForChild:Pe,$clearExternalResults:Te,$validationGroups:x}),C))}class lt{constructor(){this.storage=new Map}set(n,t,a){this.storage.set(n,{rules:t,result:a})}checkRulesValidity(n,t,a){const s=Object.keys(a),l=Object.keys(t);return l.length!==s.length||!l.every(m=>s.includes(m))?!1:l.every(m=>t[m].$params?Object.keys(t[m].$params).every(p=>f(a[m].$params[p])===f(t[m].$params[p])):!0)}get(n,t){const a=this.storage.get(n);if(!a)return;const{rules:s,result:l}=a,o=this.checkRulesValidity(n,t,s),m=l.$unwatch?l.$unwatch:()=>({});return o?l:{$dirty:l.$dirty,$partial:!0,$unwatch:m}}}const X={COLLECT_ALL:!0,COLLECT_NONE:!1},xe=Symbol("vuelidate#injectChildResults"),_e=Symbol("vuelidate#removeChildResults");function it(e){let{$scope:n,instance:t}=e;const a={},s=V([]),l=_(()=>s.value.reduce((v,$)=>(v[$]=f(a[$]),v),{}));function o(v,$){let{$registerAs:y,$scope:h,$stopPropagation:r}=$;r||n===X.COLLECT_NONE||h===X.COLLECT_NONE||n!==X.COLLECT_ALL&&n!==h||(a[y]=v,s.value.push(y))}t.__vuelidateInjectInstances=[].concat(t.__vuelidateInjectInstances||[],o);function m(v){s.value=s.value.filter($=>$!==v),delete a[v]}t.__vuelidateRemoveInstances=[].concat(t.__vuelidateRemoveInstances||[],m);const p=pe(xe,[]);ve(xe,t.__vuelidateInjectInstances);const i=pe(_e,[]);return ve(_e,t.__vuelidateRemoveInstances),{childResults:l,sendValidationResultsToParent:p,removeValidationResultsFromParent:i}}function Ee(e){return new Proxy(e,{get(n,t){return typeof n[t]=="object"?Ee(n[t]):_(()=>n[t])}})}let Oe=0;function ut(e,n){var t;let a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};arguments.length===1&&(a=e,e=void 0,n=void 0);let{$registerAs:s,$scope:l=X.COLLECT_ALL,$stopPropagation:o,$externalResults:m,currentVueInstance:p}=a;const i=p||((t=Ge())===null||t===void 0?void 0:t.proxy),v=i?i.$options:{};s||(Oe+=1,s=`_vuelidate_${Oe}`);const $=V({}),y=new lt,{childResults:h,sendValidationResultsToParent:r,removeValidationResultsFromParent:d}=i?it({$scope:l,instance:i}):{childResults:V({})};if(!e&&v.validations){const c=v.validations;n=V({}),Se(()=>{n.value=i,H(()=>ee(c)?c.call(n.value,new Ee(n.value)):c,w=>{$.value=me({validations:w,state:n,childResults:h,resultsCache:y,globalConfig:a,instance:i,externalResults:m||i.vuelidateExternalResults})},{immediate:!0})}),a=v.validationsConfig||a}else{const c=de(e)||Xe(e)?e:te(e||{});H(c,w=>{$.value=me({validations:w,state:n,childResults:h,resultsCache:y,globalConfig:a,instance:i??{},externalResults:m})},{immediate:!0})}return i&&(r.forEach(c=>c($,{$registerAs:s,$scope:l,$stopPropagation:o})),Le(()=>d.forEach(c=>c(s)))),_(()=>z(z({},f($.value)),h.value))}const dt={className:"card"},ct=b("h4",null,"Agent List",-1),mt={class:"flex justify-content-end"},ft={style:{display:"flex",gap:"10px","margin-top":"20px"}},$t={style:{display:"flex","flex-direction":"column",gap:"5px","margin-bottom":"20px"}},pt=b("label",{for:"username",class:"font-semibold"},[P("First Name "),b("small",{style:{color:"var(--red-400)"}},"*")],-1),vt={key:0,style:{color:"var(--red-400)"}},gt={style:{display:"flex","flex-direction":"column",gap:"5px","margin-bottom":"20px"}},ht=b("label",{for:"username",class:"font-semibold"},[P("Last Name "),b("small",{style:{color:"var(--red-400)"}},"*")],-1),yt={key:0,style:{color:"var(--red-400)"}},bt={style:{display:"flex","flex-direction":"column",gap:"5px","margin-bottom":"20px"}},wt=b("label",{for:"username",class:"font-semibold"},[P("Username "),b("small",{style:{color:"var(--red-400)"}},"*")],-1),xt={key:0,style:{color:"var(--red-400)"}},_t={key:0,class:"flex align-items-center gap-3 mb-5"},Ot=b("label",{class:"font-semibold w-6rem"},"Status",-1),Rt={class:"flex flex-wrap gap-3"},Vt={class:"flex align-items-center"},Ct=b("label",{for:"ingredient1",class:"ml-2"},"Active",-1),jt={class:"flex align-items-center"},At=b("label",{for:"ingredient2",class:"ml-2"},"Inactive",-1),Et={key:1,style:{display:"flex","flex-direction":"column",gap:"5px","margin-bottom":"20px"}},Pt=b("label",{for:"username",class:"font-semibold"},"Default Password",-1),Tt={style:{display:"flex",gap:"10px","margin-top":"20px"}},Gt={style:{display:"flex","flex-direction":"column",gap:"5px","margin-bottom":"20px",width:"50%"}},St=b("label",{for:"username",class:"font-semibold"},[P("GGR % "),b("small",null,"(Gross Gaming Revenue)")],-1),Lt={style:{display:"flex","flex-direction":"column",gap:"5px","margin-bottom":"20px",width:"50%"}},Nt=b("label",{for:"username",class:"font-semibold"},[P("VTO % "),b("small",null,"(Valid Turn Over)")],-1),zt={class:"flex justify-content-end gap-2"},It={__name:"AgentsList",setup(e){const n=V(!1),t=V(),a=JSON.parse(localStorage.getItem("auth.admin")),s=V("Add"),l=V(!1),o=te({selectedGGR:{name:"40%",code:"40"},selectedVTO:{name:"0.001",code:"0.001"},fname:"",lname:"",password:"123456",username:""}),m=[{name:"0%",code:"0"},{name:"5%",code:"5"},{name:"10%",code:"10"},{name:"15%",code:"15"},{name:"20%",code:"20"},{name:"25%",code:"25"},{name:"30%",code:"30"},{name:"35%",code:"35"},{name:"40%",code:"40"}],p=[{name:"0.001",code:"0.001"},{name:"0.002",code:"0.002"}],i=De(),v=x=>/^[a-zA-Z0-9]+$/.test(x),$=(x,u)=>x.includes("Value")?x.replace("Value",u):x,y={username:a.username,token:a.token};Ie(async()=>{const x=await re.showAllAgents(y);x.resStatus===0?t.value=x.data:alert(x.resMsg)});const h=_(()=>({username:{required:ie,specialCharacterChecking:se.withMessage("This field does not allow special characters",v),minLengthValue:le(3),maxLengthValue:oe(15)},lname:{required:ie,minLengthValue:le(3),maxLengthValue:oe(30),specialCharacterChecking:se.withMessage("This field does not allow special characters",v)},fname:{required:ie,minLengthValue:le(3),maxLengthValue:oe(30),specialCharacterChecking:se.withMessage("This field does not allow special characters",v)}})),r=ut(h,o),d=async()=>{if(l.value=!0,r.value.$validate(),!r.value.$error){const x={selectedGGR:o.selectedGGR.code,selectedVTO:o.selectedVTO.code,fname:o.fname.trim(),lname:o.lname.trim(),password:"123456",agent_username:o.username.trim(),...y},u=await re.postAddAgent(x);u.resStatus===0?(i.add({severity:"success",summary:"Success",detail:"New agent has been added successfully",life:5e3}),n.value=!1):i.add({severity:"error",summary:"Failed",detail:u.resMsg,life:5e3}),l.value=!1}l.value=!1},c=x=>{switch(x){case 0:return"Active";case 1:return"Inactive";default:return"Unknown"}},w=x=>{s.value="Edit";const u=t.value.filter(S=>S.id===x);console.log(u),o.selectedGGR={name:u[0].overallComGGR.toString()+"%",code:u[0].overallComGGR.toString()},o.selectedVTO={name:u[0].vtoComm.toString(),code:u[0].vtoComm.toString()},o.fname=u[0].completeName.split(" ")[0],o.lname=u[0].completeName.split(" ")[1],o.username=u[0].username,o.id=u[0].id,o.isActive=u[0].status.toString(),n.value=!0},T=async()=>{if(l.value=!0,r.value.$validate(),!r.value.$error){const x={id:o.id,selectedGGR:o.selectedGGR.code,selectedVTO:o.selectedVTO.code,isActive:o.isActive,fname:o.fname.trim(),lname:o.lname.trim(),...y},u=await re.postUpdateAgent(x);u.resStatus===0?(i.add({severity:"success",summary:"Success",detail:"New agent has been updated successfully",life:5e3}),n.value=!1):i.add({severity:"error",summary:"Failed",detail:u.resMsg,life:5e3}),l.value=!1}l.value=!1},G=V({global:{value:null,matchMode:Fe.CONTAINS}}),C=()=>{n.value=!0,s.value="Add",o.selectedGGR=null,o.selectedVTO=null,o.fname="",o.lname="",o.username=""};return(x,u)=>{const S=A("Toast"),L=A("Button"),I=A("InputText"),ne=A("IconField"),j=A("Column"),B=A("DataTable"),J=A("RadioButton"),W=A("Dropdown"),Q=A("Dialog");return M(),U("div",dt,[O(S),ct,O(L,{label:"Add Agent",class:"mb-5",onClick:C}),O(B,{filters:G.value,"onUpdate:filters":u[1]||(u[1]=g=>G.value=g),globalFilterFields:["completeName","overallComGGR","vtoComm","status","date"],value:t.value,stripedRows:"",rowsPerPageOptions:[5,10,20,50],rows:10,paginator:!0,responsiveLayout:"scroll"},{header:E(()=>[b("div",mt,[O(ne,{iconPosition:"right"},{default:E(()=>[O(I,{modelValue:G.value.global.value,"onUpdate:modelValue":u[0]||(u[0]=g=>G.value.global.value=g),placeholder:"Keyword Search"},null,8,["modelValue"])]),_:1})])]),default:E(()=>[O(j,{style:{width:"20%"},sortable:!0,field:"completeName",header:"Complete Name"},{body:E(g=>[P(k(g.data.completeName),1)]),_:1}),O(j,{style:{width:"15%"},sortable:!0,field:"username",header:"Username"}),O(j,{style:{width:"15%"},sortable:!0,field:"overallComGGR",header:"GGR %"},{body:E(g=>[P(k(g.data.overallComGGR)+"% ",1)]),_:1}),O(j,{style:{width:"10%"},sortable:!0,field:"vtoComm",header:"VTO %"},{body:E(g=>[P(k(g.data.vtoComm)+"% ",1)]),_:1}),O(j,{style:{width:"10%"},sortable:!0,field:"status",header:"Status"},{body:E(g=>[P(k(c(g.data.status)),1)]),_:1}),O(j,{style:{width:"15%"},sortable:!0,field:"date",header:"Date Registered"}),O(j,{style:{width:"15%"},header:"Action"},{body:E(g=>[O(L,{label:"Edit",icon:"pi pi-pencil",onClick:$e=>w(g.data.id)},null,8,["onClick"])]),_:1})]),_:1},8,["filters","value"]),O(Q,{visible:n.value,"onUpdate:visible":u[12]||(u[12]=g=>n.value=g),modal:"",header:`${s.value} Agent`,style:{width:"35rem"},draggable:!1},{default:E(()=>[b("div",ft,[b("div",$t,[pt,O(I,{modelValue:o.fname,"onUpdate:modelValue":u[2]||(u[2]=g=>o.fname=g),id:"username",class:"w-full",autocomplete:"off"},null,8,["modelValue"]),f(r).fname.$error?(M(),U("small",vt,k($(f(r).fname.$errors[0].$message,"First Name")),1)):q("",!0)]),b("div",gt,[ht,O(I,{modelValue:o.lname,"onUpdate:modelValue":u[3]||(u[3]=g=>o.lname=g),id:"username",class:"w-full",autocomplete:"off"},null,8,["modelValue"]),f(r).lname.$error?(M(),U("small",yt,k($(f(r).lname.$errors[0].$message,"Last Name")),1)):q("",!0)])]),b("div",bt,[wt,O(I,{modelValue:o.username,"onUpdate:modelValue":u[4]||(u[4]=g=>o.username=g),id:"username",class:"w-full",autocomplete:"off",disabled:s.value!="Add"},null,8,["modelValue","disabled"]),f(r).username.$error?(M(),U("small",xt,k($(f(r).username.$errors[0].$message,"Username")),1)):q("",!0)]),s.value=="Edit"?(M(),U("div",_t,[Ot,b("div",Rt,[b("div",Vt,[O(J,{modelValue:o.isActive,"onUpdate:modelValue":u[5]||(u[5]=g=>o.isActive=g),inputId:"ingredient1",name:"pizza",value:"0"},null,8,["modelValue"]),Ct]),b("div",jt,[O(J,{modelValue:o.isActive,"onUpdate:modelValue":u[6]||(u[6]=g=>o.isActive=g),inputId:"ingredient2",name:"pizza",value:"1"},null,8,["modelValue"]),At])])])):q("",!0),s.value=="Add"?(M(),U("div",Et,[Pt,O(I,{modelValue:o.password,"onUpdate:modelValue":u[7]||(u[7]=g=>o.password=g),id:"username",class:"w-full",autocomplete:"off",readonly:""},null,8,["modelValue"])])):q("",!0),b("div",Tt,[b("div",Gt,[St,O(W,{modelValue:o.selectedGGR,"onUpdate:modelValue":u[8]||(u[8]=g=>o.selectedGGR=g),options:m,optionLabel:"name",placeholder:"Select",class:"w-full"},null,8,["modelValue"])]),b("div",Lt,[Nt,O(W,{modelValue:o.selectedVTO,"onUpdate:modelValue":u[9]||(u[9]=g=>o.selectedVTO=g),options:p,optionLabel:"name",placeholder:"Select",class:"w-full"},null,8,["modelValue"])])]),b("div",zt,[O(L,{type:"button",label:"Cancel",severity:"secondary",onClick:u[10]||(u[10]=g=>n.value=!1)}),O(L,{loading:l.value,type:"button",label:s.value=="Add"?"Submit":"Update",severity:s.value=="Add"?"primary":"warning",onClick:u[11]||(u[11]=g=>s.value=="Add"?d():T())},null,8,["loading","label","severity"])])]),_:1},8,["visible","header"])])}}};export{It as default};
