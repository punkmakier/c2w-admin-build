import{a as _,n as h,A as p,c as u,o as y,d as b,i as t,w as a,e as f,j as o,t as r}from"./index-603ac4d1.js";const w={className:"card"},D=f("h4",null,"User Deposits History",-1),N={__name:"UserDeposits",setup(g){const d=JSON.parse(localStorage.getItem("auth.admin")),l=_();h(async()=>{const n={username:d.username,token:d.token},c=await p.getDepositHistory(n);l.value=c.data});const i=n=>{switch(n){case 0:return"Pending";case 1:return"Success";default:return"Pending"}};return(n,c)=>{const s=u("Column"),m=u("DataTable");return y(),b("div",w,[D,t(m,{value:l.value,rows:15,paginator:!0,responsiveLayout:"scroll"},{default:a(()=>[t(s,{style:{width:"10%"},sortable:!0,field:"mobile",header:"Order ID"},{body:a(e=>[o(r(e.data.orderID),1)]),_:1}),t(s,{style:{width:"15%"},sortable:!0,field:"email",header:"Username"},{body:a(e=>[o(r(e.data.username),1)]),_:1}),t(s,{style:{width:"10%"},sortable:!0,field:"country",header:"Amount"},{body:a(e=>[o(r(e.data.amount),1)]),_:1}),t(s,{style:{width:"10%"},sortable:!0,field:"gameCredit",header:"Status"},{body:a(e=>[o(r(i(e.data.status)),1)]),_:1}),t(s,{style:{width:"12%"},sortable:!0,field:"accountStatus",header:"Reference"},{body:a(e=>[o(r(e.data.reference),1)]),_:1}),t(s,{style:{width:"10%"},sortable:!0,field:"completeName",header:"Date"},{body:a(e=>[o(r(e.data.date),1)]),_:1})]),_:1},8,["value"])])}}};export{N as default};
