import{a as m,c,o as g,d as h,e as t,i as e,w as a,j as i,t as l}from"./index-9a1d19bf.js";const y={style:{width:"70%",margin:"0 auto"}},b=t("div",{class:"countdown"},[t("span",null,"Countdown"),t("span",{class:"timer"},"03:20:03")],-1),f={class:"grid mt-2 dec"},v={class:"col-12 lg:col-6 xl:col-6"},w={class:"card"},x={class:"",style:{"margin-top":"10px"}},C=t("label",{class:"font-semibold w-6rem"},"Game ID",-1),B={style:{display:"flex","justify-content":"space-between",gap:"10px"}},S={class:"",style:{"margin-top":"10px"}},I=t("label",{class:"font-semibold"},"First number",-1),D={class:"",style:{"margin-top":"10px"}},G=t("label",{class:"font-semibold"},"Second number",-1),L={class:"mt-3"},E={class:"col-12 lg:col-6 xl:col-6"},M={class:"card"},T={style:{display:"flex","justify-content":"space-between",gap:"10px"}},W={class:"",style:{"margin-top":"10px"}},N=t("label",{class:"font-semibold"},"Multiplier",-1),P={class:"",style:{"margin-top":"10px"}},j=t("label",{class:"font-semibold"},"Twin Multiplier",-1),R={style:{display:"flex","justify-content":"space-between",gap:"10px"}},V={class:"",style:{"margin-top":"10px"}},k=t("label",{class:"font-semibold"},"Min Bet",-1),A={class:"",style:{"margin-top":"10px"}},F=t("label",{class:"font-semibold"},"Max Bet",-1),H={class:"mt-3"},Q={class:"col-12 lg:col-12 xl:col-12"},U={class:"card"},K={__name:"Lottery2D",setup(q){const _=m([{id:1,winComb:"1*3",gameSched:"2PM",betCount:234,winnerCount:2,totalBets:32424,totalWins:53424,profit:12343,date:"2023-03-16 12:32:12"},{id:2,winComb:"5*1",gameSched:"6PM",betCount:24,winnerCount:5,totalBets:1234,totalWins:5344,profit:5445,date:"2023-03-16 12:32:12"}]),r=p=>p.toLocaleString("en-US",{style:"currency",currency:"PHP"});return(p,z)=>{const n=c("InputNumber"),d=c("Button"),s=c("Column"),u=c("DataTable");return g(),h("div",y,[b,t("div",f,[t("div",v,[t("div",w,[t("div",x,[C,e(n,{style:{"margin-top":"5px"},class:"w-full",inputId:"withoutgrouping",useGrouping:!1})]),t("div",B,[t("div",S,[I,e(n,{style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1})]),t("div",D,[G,e(n,{style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1})])]),t("div",L,[e(d,{severity:"success",label:"DECLARE",class:"w-full"}),e(d,{severity:"warning",label:"RE-DECLARE",class:"w-full mt-2"})])])]),t("div",E,[t("div",M,[t("div",T,[t("div",W,[N,e(n,{style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1})]),t("div",P,[j,e(n,{style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1})])]),t("div",R,[t("div",V,[k,e(n,{style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1})]),t("div",A,[F,e(n,{style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1})])]),t("div",H,[e(d,{severity:"info",label:"Qouta",class:"w-full"}),e(d,{severity:"primary",label:"Save",class:"w-full mt-2"})])])]),t("div",Q,[t("div",U,[e(u,{value:_.value,tableStyle:"min-width: 50rem",stripedRows:"",paginator:"",rows:10},{default:a(()=>[e(s,{field:"id",header:"ID"}),e(s,{field:"winComb",header:"Win Comb."}),e(s,{field:"gameSched",header:"Game Sched"}),e(s,{header:"Bet Count"},{body:a(o=>[i(l(o.data.betCount.toLocaleString()),1)]),_:1}),e(s,{header:"Winner Count"},{body:a(o=>[i(l(o.data.winnerCount.toLocaleString()),1)]),_:1}),e(s,{header:"Total Bets"},{body:a(o=>[i(l(r(o.data.totalBets)),1)]),_:1}),e(s,{header:"Total Wins"},{body:a(o=>[i(l(r(o.data.totalWins)),1)]),_:1}),e(s,{header:"Profit"},{body:a(o=>[i(l(r(o.data.profit)),1)]),_:1}),e(s,{field:"date",header:"Date"})]),_:1},8,["value"])])])])])}}};export{K as default};
