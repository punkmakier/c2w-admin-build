import{u as Z,a as m,x as ee,v as te,n as se,A as d,q as oe,c as C,o as l,d as c,i as v,e as a,M as V,N as z,O as M,P as N,g as w,h as ne,K as S,Q as D,j as ae,t as h,y as B}from"./index-9a1d19bf.js";import{s as T}from"./socket-f4cb788e.js";const re={class:"card"},ie={class:"grid"},le={key:0,class:"col-12 lg:col-6 xl:col-3",style:{height:"75vh","border-right":"1.5px solid #00000026","overflow-y":"auto"}},ce={style:{display:"flex","align-items":"center","margin-bottom":"30px","justify-content":"space-between"}},ue={class:"search",style:{padding:"15px 10px",border:"1px solid #00000026","border-radius":"5px",width:"80%"}},de=["onClick"],pe={style:{display:"flex","align-items":"center",gap:"10px"}},me=a("img",{src:"https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png",style:{width:"30px","border-radius":"50px",cursor:"pointer"}},null,-1),he={class:"",style:{display:"flex","flex-direction":"column",gap:"10px",width:"100%"}},ge={style:{display:"flex","justify-content":"space-between",cursor:"pointer"}},ye={style:{display:"flex","align-items":"center",width:"150px",gap:"10px"}},fe={style:{"font-weight":"500",cursor:"pointer"}},_e={style:{display:"flex","align-items":"center",width:"50px"}},ve={style:{display:"flex","justify-content":"space-between","align-items":"center"}},we={style:{"font-size":"0.9rem",cursor:"pointer"}},be={style:{display:"flex",gap:"10px","align-items":"center"}},xe=["onClick"],ke={key:1,class:"col-12 lg:col-6 xl:col-9",style:{height:"75vh","border-right":"1.5px solid #00000026","overflow-y":"auto"}},Ce={style:{display:"flex",gap:"20px","align-items":"center"}},Se={style:{"font-weight":"600"}},De={style:{"margin-top":"15px",display:"flex","flex-direction":"column"}},Te={key:0},Ge={key:1,class:""},Le=["src","onClick"],Ie=["src","onClick"],Ae={style:{"margin-top":"10px"}},Ue={style:{"font-size":"0.8rem"}},Ve=["onSubmit"],ze={style:{"background-color":"rgb(255, 255, 255)",padding:"10px",border:"1px solid #00000032",display:"flex","border-radius":"7px"}},je={__name:"ChatSupport",setup(Me){const G=Z(),r=m(),p={username:G.user[0].username,token:G.user[0].token},f=m([]),g=m(""),b=m(null),I=m(null),x=m(),j=ee(),k=m(""),_=m(""),O=te();se(async()=>{E();const t=await d.fetchChatList(p);t.resStatus===0?(r.value=t.data,x.value=r.value):alert("Something went wrong...")}),oe(f.value,()=>{S(()=>{var t;(t=b.value)==null||t.scrollIntoView({behavior:"smooth"})})},{deep:!0});const A=t=>{const s=new Date(t);if($(s,new Date)){const o={hour:"numeric",minute:"numeric",hour12:!0};return`Today, ${new Intl.DateTimeFormat("en-US",o).format(s)}`}else{const o={year:"2-digit",month:"short",day:"numeric",hour:"numeric",minute:"numeric",hour12:!0};return new Intl.DateTimeFormat("en-US",o).format(s)}};function $(t,s){return t.getFullYear()===s.getFullYear()&&t.getMonth()===s.getMonth()&&t.getDate()===s.getDate()}const F=async t=>{g.value=t;const s={token:g.value},i=await d.fetchChatByToken(s);if(i.resStatus===0){const o=r.value.map(e=>e.token===t?{...e,is_read:1}:e),n=i.data.sort((e,u)=>new Date(e.date)-new Date(u.date));f.value=n;const y=await d.fetchChatList(s);r.value=y,r.value=o,S(()=>{var e;(e=b.value)==null||e.scrollIntoView(),I.value.focus()})}else alert("Something went wrong...")},R=async t=>{const s=JSON.parse(t);try{if(s.type==="image"){const n=await fetch(`data:image/jpeg;base64,${s.message}`).then(u=>u.blob()),y=URL.createObjectURL(n),e={username:s.username,token:s.token,user_type:s.user_type,message:y,date:s.date,isGuest:s.isGuest,isDeleted:s.isDeleted,type:s.type,imageVal:s.imageVal};console.log(e),f.value.push(y)}const o=await d.fetchChatList(p);o.resStatus===0?r.value=o.data:alert("Something went wrong...")}catch(o){console.log(o)}f.value.push(s);const i=r.value.findIndex(o=>o.token===g.value);if(i!==-1){const o=[...r.value.slice(0,i),{...r.value[i],is_read:1},...r.value.slice(i+1)];r.value=o;const n={token:g.value};await d.fetchChatByToken(n)}else console.log("Chat ID not found.");S(()=>{var o;(o=b.value)==null||o.scrollIntoView({behavior:"smooth"})})},E=()=>{T?(T.on("chat-message",t=>{R(t)}),T.on("connect",()=>{console.log("Connected to WebSocket server.")})):console.error("Socket is not initialized properly.")},P=t=>{switch(t){case 1:return"Guest";case 2:return"CSR";case 0:return"User";case 3:return"Admin";case 4:return"Super Admin";default:return"N/A"}},q=t=>{switch(t){case 2:return"error";case 0:return"success";case 1:return"warning";case 3:return"info";case 4:return"danger";default:return"N/A"}},Y=(t,s)=>{if(s==1)return"Unknown";switch(t){case 0:return"Offline";case 1:return"Online";case 2:return"Idle";default:return"N/A"}},J=(t,s)=>{if(s===1)return"blue";switch(t){case 0:return"red";case 1:return"green";case 2:return"orange";default:return"N/A"}},W=(t,s=20)=>t.length<=s?t:t.slice(0,s-3)+"...",K=async()=>{if(_.value.trim()===""||_.value.trim()===null)return;const s=new Date().toLocaleString("en-US",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}),i={username:p.username,token:g.value,user_type:"csr",message:_.value,date:s,isGuest:G.user[0].role,type:"text"};T.emit("chat-message",JSON.stringify(i)),S(()=>{var n;(n=b.value)==null||n.scrollIntoView({behavior:"smooth"})}),await d.addMessageChat(i);const o=await d.fetchChatList({token:i.token});o.resStatus===0?r.value=o.data:alert("Something went wrong..."),_.value=""},Q=()=>{k.value!==""?setTimeout(()=>{r.value=x.value.filter(t=>t.username.toLowerCase().includes(k.value.toLowerCase()))},500):r.value=x.value},H=t=>{O.require({target:event.currentTarget,message:"Do you want to delete this record?",icon:"pi pi-info-circle",rejectClass:"p-button-secondary p-button-outlined p-button-sm",acceptClass:"p-button-danger p-button-sm",rejectLabel:"Cancel",acceptLabel:"Delete",accept:async()=>{const s=await d.deleteConvo({token:t});console.log(s),s.resStatus===0&&(r.value=r.value.filter(i=>i.token!==t),j.add({severity:"success",summary:"Sucess",detail:"You have successfully deleted the conversation.",life:5e3}))}})},X=async()=>{const t=await d.fetchChatList(p);t.resStatus===0?(r.value=t.data,x.value=r.value):alert("Something went wrong..."),console.log(t.data)},U=(t,s)=>{const i=f.value[t],o=document.createElement("img");o.style.width="auto",o.style.height="80vh",o.style.display="inline",s==="base64"?o.src=`${i.message}`:o.src=`https://macwin.live/images/${i.message}`;const n=document.createElement("div");document.body.style.overflow="hidden",n.style.height="100vh",n.style.width="100%",n.style.background="rgba(0,0,0,.82)",n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.opacity="0.0",n.style.cursor="pointer",n.style.zIndex="9999",n.style.textAlign="center",n.appendChild(o),n.addEventListener("click",()=>{document.body.style.overflow="",n.style.opacity="0",setTimeout(()=>{document.body.removeChild(n)},300)}),document.body.appendChild(n),setTimeout(()=>{n.style.opacity="1"},0)};return(t,s)=>{const i=C("Toast"),o=C("ConfirmPopup"),n=C("Button"),y=C("Tag");return l(),c("div",re,[v(i),v(o),a("div",ie,[r.value?(l(),c("div",le,[a("div",ce,[a("div",ue,[V(a("input",{type:"text",placeholder:"Search username",style:{outline:"none",border:"none","font-size":"1.1rem",width:"100%"},"onUpdate:modelValue":s[0]||(s[0]=e=>k.value=e),onInput:Q},null,544),[[z,k.value]])]),v(n,{icon:"pi pi-replay",onClick:X})]),(l(!0),c(M,null,N(r.value,(e,u)=>(l(),c("div",{class:D(["item-card",!e.is_read&&e.isGuest!=2&&e.isGuest!=3&&e.isGuest!=4?"unread":""]),style:{"margin-bottom":"10px","border-bottom":"1px solid #00000026",cursor:"pointer"},key:u,onClick:L=>F(e.token)},[a("div",pe,[me,a("div",he,[a("div",ge,[a("div",ye,[a("span",fe,[v(y,{severity:q(e.isGuest),value:P(e.isGuest)},null,8,["severity","value"]),ae(" "+h(e.username),1)]),a("div",_e,[a("div",{style:B([{width:"7px",height:"7px","border-radius":"50px","background-color":"red","margin-right":"5px"},{backgroundColor:J(e.is_online,e.isGuest)}])},null,4),a("small",null,h(Y(e.is_online,e.isGuest)),1)])]),a("small",null,h(A(e.date)),1)]),a("div",ve,[a("p",we,h(W(e.message)),1),a("div",be,[v(y,{severity:!e.is_read&&e.isGuest!=2&&e.isGuest!=3&&e.isGuest!=4?"danger":"success",value:!e.is_read&&e.isGuest!=2&&e.isGuest!=3&&e.isGuest!=4?"unread":""},null,8,["severity","value"]),e.isGuest?(l(),c("i",{key:0,class:"pi pi-trash",style:{"font-size":"1rem",cursor:"pointer",color:"var(--red-300)"},onClick:L=>H(e.token)},null,8,xe)):w("",!0)])])])])],10,de))),128))])):w("",!0),g.value?(l(),c("div",ke,[(l(!0),c(M,null,N(f.value,(e,u)=>(l(),c("div",{style:{width:"auto",height:"auto",display:"flex","flex-direction":"column"},key:u},[e.token===g.value?(l(),c("div",{key:0,style:{"margin-bottom":"40px",display:"flex","flex-direction":"column"},class:D({rightSide:e.username===p.username,leftSide:e.username!==p.username})},[a("div",Ce,[a("span",Se,h(e.username),1)]),a("div",De,[e.deleted?w("",!0):(l(),c("p",{key:0,class:D({replied:e.username===p.username}),style:B([{"background-color":"rgb(28, 105, 143)",padding:"10px","border-radius":"50px",color:"#ffffff"},{backgroundColor:e.isDeleted==1?"red":"rgb(28, 105, 143)"}])},[e.type==="text"?(l(),c("span",Te,h(e.message),1)):(l(),c("span",Ge,[e.imageVal?(l(),c("img",{key:0,src:e.message,style:{width:"100px",cursor:"zoom-in"},onClick:L=>U(u,"base64"),class:"zoomable"},null,8,Le)):(l(),c("img",{key:1,src:`https://macwin.live/images/${e.message}`,onClick:L=>U(u,""),class:"zoomable",style:{width:"100px",cursor:"zoom-in"}},null,8,Ie))]))],6)),e.deleted?(l(),c("span",{key:1,class:D({replied:e.username===p.username}),style:{"background-color":"rgba(255, 99, 99, 0.42)",padding:"10px","border-radius":"50px",color:"#6a6a6a"}},h(e.username)+" deleted this message",3)):w("",!0)]),a("div",Ae,[a("small",Ue,h(A(e.date)),1)])],2)):w("",!0)]))),128)),a("div",{ref_key:"bottomChat",ref:b},null,512),a("form",{onSubmit:ne(K,["prevent"])},[a("div",ze,[V(a("input",{ref_key:"makeAutoFocus",ref:I,"onUpdate:modelValue":s[1]||(s[1]=e=>_.value=e),type:"text",style:{width:"100%",border:"none",outline:"none",padding:"5px"},placeholder:"Type a message here..."},null,512),[[z,_.value]]),v(n,{type:"submit",icon:"pi pi-send"})])],40,Ve)])):w("",!0)])])}}};export{je as default};
