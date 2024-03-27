import{a as c,x as k,r as U,o as A,A as _,c as u,d as I,e as V,j as o,w as s,f as l,k as n,t as i,z as W,h as L}from"./index-9a5dcac8.js";const B={className:"card"},$=l("h4",null,"Payment Method",-1),z={style:{display:"flex","flex-direction":"column",gap:"5px","margin-bottom":"20px"}},j=l("label",{for:"username",class:"font-semibold"},"Provider Name",-1),q={style:{display:"flex",gap:"10px"}},G={style:{display:"flex","flex-direction":"column",gap:"5px","margin-bottom":"20px"}},J=l("label",{for:"username",class:"font-semibold"},"Method Name",-1),O={style:{display:"flex","flex-direction":"column",gap:"5px","margin-bottom":"20px"}},R=l("label",{for:"username",class:"font-semibold"},"Method ID",-1),H={style:{display:"flex","flex-direction":"column",gap:"5px","margin-bottom":"20px"}},K=l("label",{for:"username",class:"font-semibold"},"Channel",-1),Q={style:{display:"flex",gap:"10px"}},X=l("label",{for:"username",class:"font-semibold"},"Payment Type",-1),Y={key:0,style:{display:"flex","flex-direction":"column",gap:"5px","margin-bottom":"20px",width:"50%"}},Z=l("label",{for:"username",class:"font-semibold"},"IsEnabled",-1),ee={style:{display:"flex",gap:"10px"}},te={style:{display:"flex","flex-direction":"column",gap:"5px","margin-bottom":"20px",width:"50%"}},ae=l("label",{for:"username",class:"font-semibold"},"Merchant Fee",-1),oe={style:{display:"flex","flex-direction":"column",gap:"5px","margin-bottom":"20px",width:"50%"}},le=l("label",{for:"username",class:"font-semibold"},"Service Fee",-1),ie={__name:"PaymentMethod",setup(se){const p=c(!1),x=c(),g=c(),h=c(!1),y=k(),v=c("Add"),T=c([{name:"Withdraw",code:"Withdraw"},{name:"Deposit",code:"Deposit"}]),N=JSON.parse(localStorage.getItem("auth.admin")),f={username:N[0].username,token:N[0].token},e=U({id:null,isEnabled:null,providerName:"",methodName:"",methodID:"",Channel:"",paymentType:"",merchantFee:"",serviceFee:""}),C=async()=>{h.value=!0;const r={providerName:e.providerName.name,providerID:e.providerName.id,methodName:e.methodName,methodID:e.methodID,channel:e.Channel,paymentType:e.paymentType.name,merchantFee:e.merchantFee,serviceFee:e.serviceFee,...f},t=await _.postAddPaymentMethod(r);t.resStatus===0?(y.add({severity:"success",summary:"Success",detail:"New payment method has been successfully added.",life:5e3}),e.providerName="",e.methodName="",e.methodID="",e.Channel="",e.paymentType="",e.merchantFee="",e.serviceFee="",p.value=!1):y.add({severity:"error",summary:"Error",detail:t.resMessage,life:5e3}),h.value=!1},M=async()=>{h.value=!0;const r={id:e.id,isEnable:e.isEnabled,providerName:e.providerName.name,providerID:e.providerName.id,methodName:e.methodName,methodID:e.methodID,channel:e.Channel,paymentType:e.paymentType.name,merchantFee:e.merchantFee,serviceFee:e.serviceFee,...f},t=await _.postUpdatePaymentMethod(r);t&&t.resStatus===0?(y.add({severity:"success",summary:"Success",detail:"Payment Method has been successfully updated.",life:5e3}),e.providerName="",e.methodName="",e.methodID="",e.Channel="",e.paymentType="",e.merchantFee="",e.serviceFee="",p.value=!1):t&&t.resStatus===1?y.add({severity:"error",summary:"Error",detail:t.resMessage,life:5e3}):y.add({severity:"error",summary:"Error",detail:"Something went wrong...",life:5e3}),h.value=!1};A(async()=>{const r=await _.postGetPaymentMethods(f);x.value=r.data;const t=await _.showAllPaymentMethod(f);console.log(t),g.value=t});const E=r=>{v.value="Edit";const t=g.value.filter(m=>m.id==r);console.log(t);const w=x.value.filter(m=>m.id==t[0].providerID);e.providerName=w[0],e.methodName=t[0].method,e.methodID=t[0].methodID,e.Channel=t[0].channel,e.paymentType=t[0].isWithdraw===1?{name:"Withdraw",code:"Withdraw"}:{name:"Deposit",code:"Deposit"},e.merchantFee=t[0].merchantFee.split("%")[0],e.serviceFee=t[0].serviceFee,e.isEnabled=t[0].isEnable,e.id=t[0].id,p.value=!0};return(r,t)=>{const w=u("Toast"),m=u("Button"),d=u("Column"),P=u("DataTable"),D=u("Dropdown"),b=u("InputText"),F=u("InputNumber"),S=u("Dialog");return I(),V("div",B,[o(w),$,o(m,{label:"Add Payment Method",class:"mb-5",onClick:t[0]||(t[0]=a=>p.value=!0)}),o(P,{value:g.value,rows:10,paginator:!0,responsiveLayout:"scroll"},{default:s(()=>[o(d,{style:{width:"7%"},sortable:!0,field:"username",header:"Prov. ID"},{body:s(a=>[n(i(a.data.providerID),1)]),_:1}),o(d,{style:{width:"10%"},sortable:!0,field:"username",header:"Provider Name"},{body:s(a=>[n(i(a.data.providerName),1)]),_:1}),o(d,{style:{width:"10%"},sortable:!0,field:"mobile",header:"Method Name"},{body:s(a=>[n(i(a.data.method),1)]),_:1}),o(d,{style:{width:"10%"},sortable:!0,field:"mobile",header:"Method ID"},{body:s(a=>[n(i(a.data.methodID),1)]),_:1}),o(d,{style:{width:"10%"},sortable:!0,field:"mobile",header:"Channel"},{body:s(a=>[n(i(a.data.channel),1)]),_:1}),o(d,{style:{width:"10%"},sortable:!0,field:"country",header:"isEnable"},{body:s(a=>[n(i(a.data.isEnable),1)]),_:1}),o(d,{style:{width:"10%"},sortable:!0,field:"country",header:"Payment Type"},{body:s(a=>[n(i(a.data.isWithdraw===1?"Withdraw":"Deposit"),1)]),_:1}),o(d,{style:{width:"10%"},sortable:!0,field:"country",header:"Merchant Fee"},{body:s(a=>[n(i(a.data.merchantFee),1)]),_:1}),o(d,{style:{width:"10%"},sortable:!0,field:"gameCredit",header:"Service Fee"},{body:s(a=>[n(i(a.data.serviceFee),1)]),_:1}),o(d,{style:{width:"10%"},sortable:!0,field:"completeName",header:"Action"},{body:s(a=>[o(m,{label:"Edit",icon:"pi pi-pencil",style:{"margin-right":"15px"},onClick:de=>E(a.data.id)},null,8,["onClick"])]),_:1})]),_:1},8,["value"]),o(S,{visible:p.value,"onUpdate:visible":t[11]||(t[11]=a=>p.value=a),modal:"",header:`${v.value} Payment Method`,style:{width:"40rem"},draggable:!1},{footer:s(()=>[o(m,{label:"Cancel",text:"",onClick:t[9]||(t[9]=a=>p.value=!1),autofocus:""}),o(m,{label:"Submit",class:"bg-primary",onClick:t[10]||(t[10]=a=>v.value==="Add"?C():M()),outlined:"",loading:h.value},null,8,["loading"])]),default:s(()=>[l("div",z,[j,o(D,{modelValue:e.providerName,"onUpdate:modelValue":t[1]||(t[1]=a=>e.providerName=a),options:x.value,optionLabel:"name",placeholder:"Select",class:"w-full"},null,8,["modelValue","options"])]),l("div",q,[l("div",G,[J,o(b,{modelValue:e.methodName,"onUpdate:modelValue":t[2]||(t[2]=a=>e.methodName=a),id:"username",class:"w-full",autocomplete:"off"},null,8,["modelValue"])]),l("div",O,[R,o(b,{modelValue:e.methodID,"onUpdate:modelValue":t[3]||(t[3]=a=>e.methodID=a),id:"username",class:"w-full",autocomplete:"off"},null,8,["modelValue"])]),l("div",H,[K,o(b,{modelValue:e.Channel,"onUpdate:modelValue":t[4]||(t[4]=a=>e.Channel=a),id:"username",class:"w-full",autocomplete:"off"},null,8,["modelValue"])])]),l("div",Q,[l("div",{style:W([{display:"flex","flex-direction":"column",gap:"5px","margin-bottom":"20px"},{width:v.value==="Edit"?"50%":"100%"}])},[X,o(D,{modelValue:e.paymentType,"onUpdate:modelValue":t[5]||(t[5]=a=>e.paymentType=a),options:T.value,optionLabel:"name",placeholder:"Select",class:"w-full"},null,8,["modelValue","options"])],4),v.value==="Edit"?(I(),V("div",Y,[Z,o(b,{modelValue:e.isEnabled,"onUpdate:modelValue":t[6]||(t[6]=a=>e.isEnabled=a),id:"username",class:"w-full",autocomplete:"off"},null,8,["modelValue"])])):L("",!0)]),l("div",ee,[l("div",te,[ae,o(F,{modelValue:e.merchantFee,"onUpdate:modelValue":t[7]||(t[7]=a=>e.merchantFee=a),inputId:"percent",minFractionDigits:2,min:0,suffix:"%"},null,8,["modelValue"])]),l("div",oe,[le,o(F,{modelValue:e.serviceFee,"onUpdate:modelValue":t[8]||(t[8]=a=>e.serviceFee=a),inputId:"percent",minFractionDigits:2,min:0},null,8,["modelValue"])])])]),_:1},8,["visible","header"])])}}};export{ie as default};