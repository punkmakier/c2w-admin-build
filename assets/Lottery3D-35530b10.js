import{a as m,c,o as g,d as h,e as t,i as e,w as n,j as a,t as l}from"./index-9a1d19bf.js";const y={style:{width:"70%",margin:"0 auto"}},b=t("div",{class:"countdown"},[t("span",null,"Countdown"),t("span",{class:"timer"},"03:20:03")],-1),f={class:"grid mt-2 dec"},v={class:"col-12 lg:col-6 xl:col-6"},w={class:"card games"},x={class:"",style:{"margin-top":"10px"}},C=t("label",{class:"font-semibold w-6rem"},"Game ID",-1),B={style:{display:"flex","justify-content":"space-between",gap:"10px"}},I={class:"",style:{"margin-top":"10px"}},S=t("label",{class:"font-semibold"},"First number",-1),D={class:"",style:{"margin-top":"10px"}},G=t("label",{class:"font-semibold"},"Second number",-1),L={class:"",style:{"margin-top":"10px"}},T=t("label",{class:"font-semibold"},"Third number",-1),E={class:"mt-3"},M={class:"col-12 lg:col-6 xl:col-6"},W={class:"card"},N={style:{display:"flex","justify-content":"space-between",gap:"10px"}},P={class:"",style:{"margin-top":"10px"}},j=t("label",{class:"font-semibold"},"Multiplier",-1),R={class:"",style:{"margin-top":"10px"}},V=t("label",{class:"font-semibold"},"Twin Multiplier",-1),k={style:{display:"flex","justify-content":"space-between",gap:"10px"}},A={class:"",style:{"margin-top":"10px"}},F=t("label",{class:"font-semibold"},"Min Bet",-1),H={class:"",style:{"margin-top":"10px"}},Q=t("label",{class:"font-semibold"},"Max Bet",-1),U={class:"mt-3"},q={class:"col-12 lg:col-12 xl:col-12"},z={class:"card"},X={__name:"Lottery3D",setup(J){const u=m([{id:1,winComb:"1*3",gameSched:"2PM",betCount:234,winnerCount:2,totalBets:32424,totalWins:53424,profit:12343,date:"2023-03-16 12:32:12"},{id:2,winComb:"5*1",gameSched:"6PM",betCount:24,winnerCount:5,totalBets:1234,totalWins:5344,profit:5445,date:"2023-03-16 12:32:12"}]),r=p=>p.toLocaleString("en-US",{style:"currency",currency:"PHP"});return(p,K)=>{const i=c("InputNumber"),d=c("Button"),s=c("Column"),_=c("DataTable");return g(),h("div",y,[b,t("div",f,[t("div",v,[t("div",w,[t("div",x,[C,e(i,{style:{"margin-top":"5px"},class:"w-full",inputId:"withoutgrouping",useGrouping:!1})]),t("div",B,[t("div",I,[S,e(i,{style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1})]),t("div",D,[G,e(i,{style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1})]),t("div",L,[T,e(i,{style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1})])]),t("div",E,[e(d,{severity:"success",label:"DECLARE",class:"w-full"}),e(d,{severity:"warning",label:"RE-DECLARE",class:"w-full mt-2"})])])]),t("div",M,[t("div",W,[t("div",N,[t("div",P,[j,e(i,{style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1})]),t("div",R,[V,e(i,{style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1,disabled:""})])]),t("div",k,[t("div",A,[F,e(i,{style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1})]),t("div",H,[Q,e(i,{style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1})])]),t("div",U,[e(d,{severity:"info",label:"Qouta",class:"w-full"}),e(d,{severity:"primary",label:"Save",class:"w-full mt-2"})])])]),t("div",q,[t("div",z,[e(_,{value:u.value,tableStyle:"min-width: 50rem",stripedRows:"",paginator:"",rows:10},{default:n(()=>[e(s,{field:"id",header:"ID"}),e(s,{field:"winComb",header:"Win Comb."}),e(s,{field:"gameSched",header:"Game Sched"}),e(s,{header:"Bet Count"},{body:n(o=>[a(l(o.data.betCount.toLocaleString()),1)]),_:1}),e(s,{header:"Winner Count"},{body:n(o=>[a(l(o.data.winnerCount.toLocaleString()),1)]),_:1}),e(s,{header:"Total Bets"},{body:n(o=>[a(l(r(o.data.totalBets)),1)]),_:1}),e(s,{header:"Total Wins"},{body:n(o=>[a(l(r(o.data.totalWins)),1)]),_:1}),e(s,{header:"Profit"},{body:n(o=>[a(l(r(o.data.profit)),1)]),_:1}),e(s,{field:"date",header:"Date"})]),_:1},8,["value"])])])])])}}};export{X as default};