import{v as G,x as T,a as m,r as M,n as E,q as P,R as j,c as d,o as A,d as R,i as t,e,t as c,w as u,A as S,j as p}from"./index-603ac4d1.js";const W={style:{width:"70%",margin:"0 auto"}},k={class:"countdown"},F=e("h3",{style:{position:"absolute",left:"3%",top:"10%",color:"#fff"}},"EZ - 2",-1),U=e("span",null,"Countdown",-1),q={class:"timer"},$={class:"grid mt-2 dec"},O={class:"col-12 lg:col-6 xl:col-6"},H={class:"card"},J={class:"",style:{"margin-top":"10px"}},Q=e("label",{class:"font-semibold w-6rem"},"Game ID",-1),Z={style:{display:"flex","justify-content":"space-between",gap:"10px"}},z={class:"",style:{"margin-top":"10px"}},K=e("label",{class:"font-semibold"},"First number",-1),X={class:"",style:{"margin-top":"10px"}},Y=e("label",{class:"font-semibold"},"Second number",-1),ee={class:"mt-3"},te={class:"col-12 lg:col-6 xl:col-6"},se={class:"card"},oe={style:{display:"flex","justify-content":"space-between",gap:"10px"}},le={class:"",style:{"margin-top":"10px",width:"50%"}},ae=e("label",{class:"font-semibold"},"Multiplier",-1),ne={class:"",style:{"margin-top":"10px",width:"50%"}},ie=e("label",{class:"font-semibold"},"Twin Multiplier",-1),re={style:{display:"flex","justify-content":"space-between",gap:"10px"}},de={class:"",style:{"margin-top":"10px",width:"50%"}},ce=e("label",{class:"font-semibold"},"Min Bet",-1),ue={class:"",style:{"margin-top":"10px",width:"50%"}},me=e("label",{class:"font-semibold"},"Max Bet",-1),pe={class:"mt-3"},_e=e("label",{class:"font-semibold"},"Qouta",-1),fe={class:"col-12 lg:col-12 xl:col-12"},ge={class:"card"},ve={__name:"Lottery2D",setup(he){const I=G(),_=T(),f=m(),g=m(null),h=m(null),y=m(!1),C=JSON.parse(localStorage.getItem("auth.admin")),r={username:C[0].username,token:C[0].token,gameType:"2D"},N=m([{id:1,winComb:"1*3",gameSched:"2PM",betCount:234,winnerCount:2,totalBets:32424,totalWins:53424,profit:12343,date:"2023-03-16 12:32:12"},{id:2,winComb:"5*1",gameSched:"6PM",betCount:24,winnerCount:5,totalBets:1234,totalWins:5344,profit:5445,date:"2023-03-16 12:32:12"}]),l=M({firstNum:null,secondNum:null,gameID:null}),L=()=>{if(l.firstNum==null||l.secondNum==null){_.add({severity:"error",summary:"Failed",detail:"Please fill the required fields.",life:3e3});return}I.require({message:"Are you sure you want to proceed?",header:"Confirmation",icon:"pi pi-exclamation-triangle",rejectClass:"p-button-secondary p-button-outlined",rejectLabel:"Cancel",acceptLabel:"Save",accept:async()=>{y.value=!0,r.firstNumber=l.firstNum,r.secNumber=l.secondNum,r.gameID=l.gameID;const s=await S.postLotteryDeclare(r);console.log(r),console.log(s),s.error===0?(l.firstNum=null,l.secondNum=null,_.add({severity:"success",summary:"Success",detail:"2D Lotto has been declared successfully",life:3e3})):_.add({severity:"error",summary:"Failed",detail:s.description,life:3e3}),y.value=!1}})},v=s=>s.toLocaleString("en-US",{style:"currency",currency:"PHP"}),V=async()=>{const s=await S.postLotteryFetchGame(r);console.log(s),s.error===0?(l.gameID=s.gameDetails.id,g.value=s.gameDetails.ballClose):_.add({severity:"error",summary:"Failed",detail:s.description,life:3e3})},D=()=>{if(!h.value||!g.value)return;const s=new Date,a=h.value-s,b=Math.floor(a/(1e3*60*60)),w=Math.floor(a%(1e3*60*60)/(1e3*60)),n=Math.floor(a%(1e3*60)/1e3);if(n<0){f.value="00:00:00 - CLOSED";return}f.value=`${b.toString().padStart(2,"0")}:${w.toString().padStart(2,"0")}:${n.toString().padStart(2,"0")}`};return E(()=>{V(),P(g,a=>{a&&(h.value=new Date(a))}),D();const s=setInterval(D,1e3);j(()=>clearInterval(s))}),(s,a)=>{const b=d("Toast"),w=d("ConfirmDialog"),n=d("InputNumber"),x=d("Button"),i=d("Column"),B=d("DataTable");return A(),R("div",W,[t(b),t(w),e("div",k,[F,U,e("span",q,c(f.value),1)]),e("div",$,[e("div",O,[e("div",H,[e("div",J,[Q,t(n,{modelValue:l.gameID,"onUpdate:modelValue":a[0]||(a[0]=o=>l.gameID=o),style:{"margin-top":"5px"},class:"w-full",inputId:"withoutgrouping",useGrouping:!1,disabled:""},null,8,["modelValue"])]),e("div",Z,[e("div",z,[K,t(n,{modelValue:l.firstNum,"onUpdate:modelValue":a[1]||(a[1]=o=>l.firstNum=o),style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1},null,8,["modelValue"])]),e("div",X,[Y,t(n,{modelValue:l.secondNum,"onUpdate:modelValue":a[2]||(a[2]=o=>l.secondNum=o),style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1},null,8,["modelValue"])])]),e("div",ee,[t(x,{severity:"success",label:"DECLARE",class:"w-full",loading:y.value,onClick:L},null,8,["loading"]),t(x,{severity:"warning",label:"RE-DECLARE",class:"w-full mt-2"})])])]),e("div",te,[e("div",se,[e("div",oe,[e("div",le,[ae,t(n,{style:{"margin-top":"5px"},class:"w-full",inputId:"withoutgrouping",useGrouping:!1})]),e("div",ne,[ie,t(n,{style:{"margin-top":"5px"},class:"w-full",inputId:"withoutgrouping",useGrouping:!1})])]),e("div",re,[e("div",de,[ce,t(n,{style:{"margin-top":"5px"},class:"w-full",inputId:"withoutgrouping",useGrouping:!1})]),e("div",ue,[me,t(n,{style:{"margin-top":"5px"},class:"w-full",inputId:"withoutgrouping",useGrouping:!1})])]),e("div",pe,[e("div",null,[_e,t(n,{style:{"margin-top":"5px"},class:"w-full",inputId:"withoutgrouping",useGrouping:!1})]),t(x,{severity:"primary",label:"Save",class:"w-full mt-3"})])])]),e("div",fe,[e("div",ge,[t(B,{value:N.value,tableStyle:"min-width: 50rem",stripedRows:"",paginator:"",rows:10},{default:u(()=>[t(i,{field:"id",header:"ID"}),t(i,{field:"winComb",header:"Win Comb."}),t(i,{field:"gameSched",header:"Game Sched"}),t(i,{header:"Bet Count"},{body:u(o=>[p(c(o.data.betCount.toLocaleString()),1)]),_:1}),t(i,{header:"Winner Count"},{body:u(o=>[p(c(o.data.winnerCount.toLocaleString()),1)]),_:1}),t(i,{header:"Total Bets"},{body:u(o=>[p(c(v(o.data.totalBets)),1)]),_:1}),t(i,{header:"Total Wins"},{body:u(o=>[p(c(v(o.data.totalWins)),1)]),_:1}),t(i,{header:"Profit"},{body:u(o=>[p(c(v(o.data.profit)),1)]),_:1}),t(i,{field:"date",header:"Date"})]),_:1},8,["value"])])])])])}}};export{ve as default};
