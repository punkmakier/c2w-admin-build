import{a as _,o as b,A as f,c as l,d as w,e as p,j as t,w as a,f as N,k as o,t as d}from"./index-000147ee.js";const D={className:"card"},g=N("h4",null,"User Withdrawal History",-1),S={__name:"UserWithdrawals",setup(v){const n=JSON.parse(localStorage.getItem("auth.admin")),u=_();b(async()=>{const r={username:n[0].username,token:n[0].token},c=await f.getWithdrawalHistory(r);u.value=c.data});const i=r=>{switch(r){case 0:return"Pending";case 1:return"Success";default:return"Pending"}},m=r=>r.toLocaleString("en-US",{style:"currency",currency:"PHP"}),h=r=>{switch(r){case"0":return"Paymaya";case"7":return"GCash";case"4":return"Bank";default:return"N/A"}};return(r,c)=>{const s=l("Column"),y=l("DataTable");return w(),p("div",D,[g,t(y,{value:u.value,rows:15,paginator:!0,responsiveLayout:"scroll"},{default:a(()=>[t(s,{style:{width:"10%"},sortable:!0,field:"orderID",header:"Order ID"},{body:a(e=>[o(" #"+d(e.data.orderID),1)]),_:1}),t(s,{style:{width:"10%"},sortable:!0,field:"orderID",header:"Method"},{body:a(e=>[o(d(h(e.data.mop)),1)]),_:1}),t(s,{style:{width:"15%"},sortable:!0,field:"username",header:"Username"},{body:a(e=>[o(d(e.data.username),1)]),_:1}),t(s,{style:{width:"20%"},sortable:!0,field:"accountName",header:"Account Name"},{body:a(e=>[o(d(e.data.accountName),1)]),_:1}),t(s,{style:{width:"15%"},sortable:!0,field:"accountNumber",header:"Account Number"},{body:a(e=>[o(d(e.data.accountNumber),1)]),_:1}),t(s,{style:{width:"10%"},sortable:!0,field:"amount",header:"Amount"},{body:a(e=>[o(d(m(e.data.amount)),1)]),_:1}),t(s,{style:{width:"10%"},sortable:!0,field:"status",header:"Status"},{body:a(e=>[o(d(i(e.data.status)),1)]),_:1}),t(s,{style:{width:"25%"},sortable:!0,field:"date",header:"Date"},{body:a(e=>[o(d(e.data.date),1)]),_:1})]),_:1},8,["value"])])}}};export{S as default};
