import{x as I,a as v,r as B,o as S,A as V,c as d,d as k,e as A,j as s,w as n,f as l,k as r,t as u}from"./index-59b6530c.js";const T={className:"card"},E=l("h4",null,"User Accounts",-1),R={class:"flex align-items-center gap-3 mb-5"},P=l("label",{class:"font-semibold w-6rem"},"Username",-1),z={class:"flex align-items-center gap-3 mb-5 mt-3"},L=l("label",{for:"username",class:"font-semibold w-6rem"},"Agent ID",-1),M={class:"flex align-items-center gap-3 mb-5"},j=l("label",{class:"font-semibold w-6rem"},"First Name",-1),G={class:"flex align-items-center gap-3 mb-5"},H=l("label",{class:"font-semibold w-6rem"},"Last Name",-1),$={class:"flex align-items-center gap-3 mb-5"},q=l("label",{class:"font-semibold w-6rem"},"Mobile",-1),F={class:"flex align-items-center gap-3 mb-5"},J=l("label",{class:"font-semibold w-6rem"},"Email",-1),O={class:"flex align-items-center gap-3 mb-5"},Y=l("label",{class:"font-semibold w-6rem"},"Is Ban?",-1),K={class:"flex flex-wrap gap-3"},Q={class:"flex align-items-center"},W=l("label",{for:"ingredient1",class:"ml-2"},"Yes",-1),X={class:"flex align-items-center"},Z=l("label",{for:"ingredient2",class:"ml-2"},"No",-1),ee={class:"flex justify-content-end gap-2"},le={__name:"UserAccounts",setup(te){const y=I(),p=v(),c=v(!1),f=v(!1),b=JSON.parse(localStorage.getItem("auth.admin")),a=B({userID:"",agentID:"",firstName:"",lastName:"",mobile:"",email:"",user_username:"",isBan:!1});S(async()=>{const o={username:b[0].username,token:b[0].token},e=await V.postGetAllUsers(o);p.value=e.data});const x=o=>o.toLocaleString("en-US",{style:"currency",currency:"PHP"}),w=o=>o===0?"Active":"Inactive",U=o=>{c.value=!0;const e=p.value.filter(_=>_.userid===o);console.log(e),a.userID=e[0].userid,a.agentID=e[0].agentID,a.firstName=e[0].fname,a.lastName=e[0].lname,a.mobile=e[0].mobile,a.email=e[0].email,a.user_username=e[0].username,a.isBan=e[0].accountStatus!=0},N=async()=>{f.value=!0;const o={username:b.username,token:b.token,...a},e=await V.postUpdateUsers(o);e.resStatus===0?(y.add({severity:"success",summary:"Success",detail:"Updated Successfully",life:3e3}),f.value=!1):(f.value=!1,y.add({severity:"error",summary:"Error",detail:e.resMsg,life:3e3})),c.value=!1};return(o,e)=>{const _=d("Toast"),i=d("Column"),g=d("Button"),C=d("DataTable"),m=d("InputText"),h=d("RadioButton"),D=d("Dialog");return k(),A("div",T,[s(_),E,s(C,{value:p.value,rows:10,paginator:!0,responsiveLayout:"scroll"},{default:n(()=>[s(i,{style:{width:"10%"},sortable:!0,field:"username",header:"Username"},{body:n(t=>[r(u(t.data.username),1)]),_:1}),s(i,{style:{width:"10%"},sortable:!0,field:"mobile",header:"Mobile"},{body:n(t=>[r(u(t.data.mobile),1)]),_:1}),s(i,{style:{width:"15%"},sortable:!0,field:"email",header:"Email"},{body:n(t=>[r(u(t.data.email),1)]),_:1}),s(i,{style:{width:"10%"},sortable:!0,field:"country",header:"Country"},{body:n(t=>[r(u(t.data.country),1)]),_:1}),s(i,{style:{width:"10%"},sortable:!0,field:"gameCredit",header:"Game Credit"},{body:n(t=>[r(u(x(t.data.gameCredit)),1)]),_:1}),s(i,{style:{width:"12%"},sortable:!0,field:"accountStatus",header:"Account Status"},{body:n(t=>[r(u(w(t.data.accountStatus)),1)]),_:1}),s(i,{style:{width:"15%"},sortable:!0,field:"dateRegistered",header:"Date Registered"},{body:n(t=>[r(u(t.data.dateRegistered),1)]),_:1}),s(i,{style:{width:"20%"},sortable:!0,field:"completeName",header:"Action"},{body:n(t=>[s(g,{label:"Edit",style:{"margin-right":"10px"},onClick:ae=>U(t.data.userid)},null,8,["onClick"])]),_:1})]),_:1},8,["value"]),s(D,{visible:c.value,"onUpdate:visible":e[9]||(e[9]=t=>c.value=t),header:"Edit Profile",style:{width:"40rem"},position:o.position,modal:!0,draggable:!1},{default:n(()=>[l("div",R,[P,s(m,{modelValue:a.user_username,"onUpdate:modelValue":e[0]||(e[0]=t=>a.user_username=t),class:"flex-auto",autocomplete:"off",disabled:""},null,8,["modelValue"])]),l("div",z,[L,s(m,{modelValue:a.agentID,"onUpdate:modelValue":e[1]||(e[1]=t=>a.agentID=t),id:"username",class:"flex-auto",autocomplete:"off",disabled:""},null,8,["modelValue"])]),l("div",M,[j,s(m,{modelValue:a.firstName,"onUpdate:modelValue":e[2]||(e[2]=t=>a.firstName=t),class:"flex-auto",autocomplete:"off"},null,8,["modelValue"])]),l("div",G,[H,s(m,{modelValue:a.lastName,"onUpdate:modelValue":e[3]||(e[3]=t=>a.lastName=t),class:"flex-auto",autocomplete:"off"},null,8,["modelValue"])]),l("div",$,[q,s(m,{modelValue:a.mobile,"onUpdate:modelValue":e[4]||(e[4]=t=>a.mobile=t),class:"flex-auto",autocomplete:"off"},null,8,["modelValue"])]),l("div",F,[J,s(m,{modelValue:a.email,"onUpdate:modelValue":e[5]||(e[5]=t=>a.email=t),class:"flex-auto",autocomplete:"off"},null,8,["modelValue"])]),l("div",O,[Y,l("div",K,[l("div",Q,[s(h,{modelValue:a.isBan,"onUpdate:modelValue":e[6]||(e[6]=t=>a.isBan=t),inputId:"ingredient1",name:"pizza",value:!0},null,8,["modelValue"]),W]),l("div",X,[s(h,{modelValue:a.isBan,"onUpdate:modelValue":e[7]||(e[7]=t=>a.isBan=t),inputId:"ingredient2",name:"pizza",value:!1},null,8,["modelValue"]),Z])])]),l("div",ee,[s(g,{type:"button",label:"Cancel",severity:"secondary",onClick:e[8]||(e[8]=t=>c.value=!1)}),s(g,{type:"button",label:"Save Changes",onClick:N,loading:f.value},null,8,["loading"])])]),_:1},8,["visible","position"])])}}};export{le as default};