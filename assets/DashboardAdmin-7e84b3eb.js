import{a as h,v as V,x as M,r as F,o as G,c as b,d as u,e as m,j as a,w as n,f as e,F as Y,y as $,t as o,h as p,A as x,k as i}from"./index-fad927ec.js";const H={class:"grid"},J={class:"flex flex-column align-items-center p-5 surface-overlay border-round"},K=e("div",{class:"border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8"},[e("i",{class:"pi pi-question text-5xl"})],-1),Q={class:"font-bold text-2xl block mb-2 mt-4"},X={class:"mb-0"},Z={class:"flex align-items-center gap-2 mt-4"},ee={class:"col-12 lg:col-6 xl:col-8"},te={key:0,class:"card mb-2 bg-random",style:{"padding-bottom":"38px"}},se={style:{display:"flex","flex-wrap":"wrap",gap:"10px"}},ae={style:{"font-size":"0.8rem"}},oe={style:{"text-align":"center","margin-top":"10px","font-size":"1.4rem"}},ne={class:"mt-5 text-white",style:{"text-align":"center"}},le=e("span",{style:{"font-size":"1.3rem","font-weight":"600"}},"Total",-1),ie=e("br",null,null,-1),ce=e("br",null,null,-1),re={style:{"font-size":"2rem","font-weight":"600"}},de={key:0,class:"col-12 lg:col-6 xl:col-4"},ue={class:"card mb-0"},me=e("div",{class:"flex justify-content-between mb-3"},[e("div",null,[e("span",{class:"block text-500 font-medium mb-3"},[e("b",null,"Users & Agents (Success Deposit & Withdraw)")])]),e("div",{class:"flex align-items-center justify-content-center bg-blue-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[e("i",{class:"pi pi-money-bill text-blue-500 text-xl"})])],-1),he={key:1,class:"col-12 lg:col-6 xl:col-3"},_e={class:"card mb-2 bg-skyblue",style:{height:"159px"}},be=e("div",{class:"flex justify-content-between"},[e("div",null,[e("span",{class:"block text-500 font-medium text-white"},[e("b",null,"Total Accounts")])]),e("div",{class:"flex align-items-center justify-content-center bg-blue-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[e("i",{class:"pi pi-money-bill text-blue-500 text-xl"})])],-1),pe={class:"text-center mt-2 text-white"},ye={style:{"font-size":"2rem","font-weight":"600"}},ve={key:2,class:"col-12 lg:col-6 xl:col-3"},ge={class:"card mb-2 bg-yellow1",style:{height:"159px"}},fe=e("div",{class:"flex justify-content-between"},[e("div",null,[e("span",{class:"block text-500 font-medium text-white"},[e("b",null,"Total Player Balance")])]),e("div",{class:"flex align-items-center justify-content-center bg-blue-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[e("i",{class:"pi pi-money-bill text-blue-500 text-xl"})])],-1),xe={class:"text-center mt-2 text-white"},we={style:{"font-size":"2rem","font-weight":"600"}},ke={key:3,class:"col-12 lg:col-6 xl:col-2"},De={class:"card mb-2 bg-blue",style:{height:"159px"}},Ae=e("div",{class:"flex justify-content-between"},[e("div",null,[e("span",{class:"block text-500 font-medium text-white"},[e("b",null,"Total Agents")])]),e("div",{class:"flex align-items-center justify-content-center bg-blue-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[e("i",{class:"pi pi-money-bill text-blue-500 text-xl"})])],-1),Ce={class:"text-center mt-2 text-white"},Se={style:{"font-size":"2rem","font-weight":"600"}},Pe={key:4,class:"col-12 lg:col-6 xl:col-2"},Ne={class:"card mb-2 bg-green",style:{height:"159px"}},je=e("div",{class:"flex justify-content-between"},[e("div",null,[e("span",{class:"block text-500 font-medium text-white"},[e("b",null,"PLAYER (ONLINE)")])]),e("div",{class:"flex align-items-center justify-content-center bg-blue-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[e("i",{class:"pi pi-money-bill text-blue-500 text-xl"})])],-1),Ie={class:"text-center mt-2 text-white"},qe={style:{"font-size":"2rem","font-weight":"600"}},Le={key:5,class:"col-12 lg:col-6 xl:col-2"},Re={class:"card mb-2 bg-blue",style:{height:"159px"}},Te=e("div",{class:"flex justify-content-between"},[e("div",null,[e("span",{class:"block text-500 font-medium text-white"},[e("b",null,"PLAYER (IDLE)")])]),e("div",{class:"flex align-items-center justify-content-center bg-blue-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[e("i",{class:"pi pi-money-bill text-blue-500 text-xl"})])],-1),We={class:"text-center mt-2 text-white"},Be={style:{"font-size":"2rem","font-weight":"600"}},ze={class:"col-12"},Ue={class:"card mb-2",style:{"minx-height":"159px",height:"auto"}},Oe=e("div",{class:"flex justify-content-between"},[e("div",null,[e("span",{class:"block text-500 font-medium"},[e("b",null,"User Withdrawal Request")])]),e("div",{class:"flex align-items-center justify-content-center bg-blue-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[e("i",{class:"pi pi-money-bill text-blue-500 text-xl"})])],-1),Ee={class:"mt-3"},Ve={class:"col-12"},Me={class:"card mb-2",style:{"min-height":"159px",height:"auto"}},Fe=e("div",{class:"flex justify-content-between"},[e("div",null,[e("span",{class:"block text-500 font-medium"},[e("b",null,"Agent Withdrawal Request")])]),e("div",{class:"flex align-items-center justify-content-center bg-blue-100 border-round",style:{width:"2.5rem",height:"2.5rem"}},[e("i",{class:"pi pi-money-bill text-blue-500 text-xl"})])],-1),Ge={class:"mt-3"},He={__name:"DashboardAdmin",setup(Ye){const v=s=>s.toLocaleString("en-US",{style:"currency",currency:"PHP"}),B=h({chart:{type:"donut"},responsive:[{breakpoint:480,options:{chart:{width:200},legend:{position:"bottom"}}}],labels:["User Success Withdraw","User Success Deposit","Agent Withdraw"],dataLabels:{formatter:function(s,d){const c=d.seriesIndex;return"₱ "+w.value[c].toLocaleString()}}}),A=h([]),P=JSON.parse(localStorage.getItem("auth.admin")),r=h(),w=h(),z=V(),C=M(),k={username:P[0].username,token:P[0].token},g=F({toppay:0,hpay:0,pagarstar:0,copo:0,total:0}),D=h(),N=h(),j=async()=>{const s=await x.postAdminMonitoring(k);r.value=s,w.value=[s.successWithdraw,s.successDeposit,s.agentSuccessWithdraw],g.toppay=s.toppay,g.hpay=s.hpay,g.pagarstar=s.pagar,g.copo=s.copo,g.total=s.total},I=h(),q=h(),U=async()=>{const s=await x.postUserReqWithdrawal(k);I.value=s.user_withdraw,q.value=s.agent_withdraw},L=(s,d,c)=>{console.log(s+" "+d);const S=D.value.filter(_=>_.runningBalance>=d||_.maxWithdrawal<=d&&_.isWithdrawable==1).map(_=>({..._,id:s,type:c}));A.value=S},R=s=>{console.log(),z.require({group:"headless",header:"Are you sure?",message:"Please confirm to process the payment",accept:async()=>{const d={...k,providerID:s.value.providerID,id:s.value.id};try{const c=s.value.type==="user"?await x.approveUserWithdrawal(d):await x.approveAgentWithdrawal(d);c.error===1?C.add({severity:"error",summary:"Transaction Failed",detail:c.description,life:5e3}):c.resStatus===0&&C.add({severity:"success",summary:"Success",detail:"Transaction request has been completed.",life:5e3})}catch(c){C.add({severity:"error",summary:"Transaction Failed",detail:c,life:5e3})}}})},O=async()=>{const s=await x.getPaymentGateway(k);if(s.resStatus===0){const d=s.data.reduce((c,y)=>c+y.runningBalance,0);N.value=d,D.value=s.data}};return G(()=>{j(),U(),O(),setInterval(()=>{j()},3e4)}),(s,d)=>{const c=b("Toast"),y=b("Button"),S=b("ConfirmDialog"),_=b("apexchart"),l=b("Column"),T=b("Dropdown"),W=b("DataTable");return u(),m("div",H,[a(c),a(S,{group:"headless",class:"w-25rem"},{container:n(({message:t,acceptCallback:f,rejectCallback:E})=>[e("div",J,[K,e("span",Q,o(t.header),1),e("p",X,o(t.message),1),e("div",Z,[a(y,{label:"Confirm",onClick:f},null,8,["onClick"]),a(y,{label:"Cancel",outlined:"",onClick:E},null,8,["onClick"])])])]),_:1}),e("div",ee,[D.value?(u(),m("div",te,[e("div",se,[(u(!0),m(Y,null,$(D.value,(t,f)=>(u(),m("div",{class:"card-custom",style:{display:"flex","flex-direction":"column"},key:f},[e("b",ae,o(t.name),1),e("b",oe,o(v(t.runningBalance)),1)]))),128))]),e("div",ne,[le,ie,ce,e("span",re,o(v(N.value)),1)])])):p("",!0)]),w.value?(u(),m("div",de,[e("div",ue,[me,a(_,{type:"donut",options:B.value,series:w.value,height:"360"},null,8,["options","series"])])])):p("",!0),r.value?(u(),m("div",he,[e("div",_e,[be,e("div",pe,[e("span",ye,o(r.value.playerCount.toLocaleString()),1)])])])):p("",!0),r.value?(u(),m("div",ve,[e("div",ge,[fe,e("div",xe,[e("span",we,o(v(r.value.playerBalance)),1)])])])):p("",!0),r.value?(u(),m("div",ke,[e("div",De,[Ae,e("div",Ce,[e("span",Se,o(r.value.agentCount.toLocaleString()),1)])])])):p("",!0),r.value?(u(),m("div",Pe,[e("div",Ne,[je,e("div",Ie,[e("span",qe,o(r.value.isOnline.toLocaleString()),1)])])])):p("",!0),r.value?(u(),m("div",Le,[e("div",Re,[Te,e("div",We,[e("span",Be,o(r.value.isIdle.toLocaleString()),1)])])])):p("",!0),e("div",ze,[e("div",Ue,[Oe,e("div",Ee,[a(W,{value:I.value,tableStyle:"min-width: 50rem",paginator:"",rows:5,rowsPerPageOptions:[5,10,20,50]},{default:n(()=>[a(l,{field:"orderID",header:"ORDER ID"},{body:n(t=>[i(o(t.data.orderID),1)]),_:1}),a(l,{field:"category",header:"Username"},{body:n(t=>[i(o(t.data.username),1)]),_:1}),a(l,{field:"quantity",header:"Method"},{body:n(t=>[i(o(t.data.method),1)]),_:1}),a(l,{field:"accountNumber",header:"Account Number"},{body:n(t=>[i(o(t.data.accountNumber),1)]),_:1}),a(l,{field:"accountName",header:"Account Name"},{body:n(t=>[i(o(t.data.accountName),1)]),_:1}),a(l,{field:"quantity",header:"Amount"},{body:n(t=>[i(o(v(t.data.amount)),1)]),_:1}),a(l,{field:"quantity",header:"Date"},{body:n(t=>[i(o(t.data.date),1)]),_:1}),a(l,{field:"quantity",header:"Action"},{body:n(t=>[a(T,{options:A.value,onClick:f=>L(t.data.id,t.data.amount,"user"),onChange:R,optionLabel:"name",placeholder:"Select Payment",class:"w-full md:w-14rem"},null,8,["options","onClick"])]),_:1})]),_:1},8,["value"])])])]),e("div",Ve,[e("div",Me,[Fe,e("div",Ge,[a(W,{value:q.value,tableStyle:"min-width: 50rem",paginator:"",rows:5,rowsPerPageOptions:[5,10,20,50]},{default:n(()=>[a(l,{field:"orderID",header:"ORDER ID"},{body:n(t=>[i(o(t.data.orderID),1)]),_:1}),a(l,{field:"category",header:"Username"},{body:n(t=>[i(o(t.data.username),1)]),_:1}),a(l,{field:"method",header:"Method"},{body:n(t=>[i(o(t.data.method),1)]),_:1}),a(l,{field:"accountNumber",header:"Account Number"},{body:n(t=>[i(o(t.data.accountNumber),1)]),_:1}),a(l,{field:"accountName",header:"Account Name"},{body:n(t=>[i(o(t.data.accountName),1)]),_:1}),a(l,{field:"amount",header:"Amount"},{body:n(t=>[i(o(v(t.data.amount)),1)]),_:1}),a(l,{field:"date",header:"Date"},{body:n(t=>[i(o(t.data.date),1)]),_:1}),a(l,{field:"quantity",header:"Action"},{body:n(t=>[a(T,{options:A.value,onClick:f=>L(t.data.id,t.data.amount,"agent"),onChange:R,optionLabel:"name",placeholder:"Select Payment",class:"w-full md:w-14rem"},null,8,["options","onClick"])]),_:1})]),_:1},8,["value"])])])])])}}};export{He as default};