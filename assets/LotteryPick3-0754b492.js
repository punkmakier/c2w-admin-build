import{v as B,x as P,a as m,r as k,o as T,q as M,R as U,c as d,d as j,e as E,j as o,f as t,t as r,w as c,A as D,k as p}from"./index-fad927ec.js";const F={style:{width:"70%",margin:"0 auto"}},A={class:"countdown"},R=t("h3",{style:{position:"absolute",left:"3%",top:"10%",color:"#fff"}},"Lucky Pick 3",-1),W=t("span",null,"Countdown",-1),q={class:"timer"},$={class:"grid mt-2 dec"},O={class:"col-12 lg:col-6 xl:col-6"},H={class:"card games"},J={class:"",style:{"margin-top":"10px"}},Q=t("label",{class:"font-semibold w-6rem"},"Game ID ",-1),z={style:{display:"flex","justify-content":"space-between",gap:"10px"}},K={class:"",style:{"margin-top":"10px"}},X=t("label",{class:"font-semibold"},"First number",-1),Y={class:"",style:{"margin-top":"10px"}},Z=t("label",{class:"font-semibold"},"Second number",-1),tt={class:"",style:{"margin-top":"10px"}},et=t("label",{class:"font-semibold"},"Third number",-1),ot={style:{display:"flex","justify-content":"space-between",gap:"10px"}},st={class:"",style:{"margin-top":"10px"}},lt=t("label",{class:"font-semibold"},"Fourth number",-1),nt={class:"",style:{"margin-top":"10px"}},at=t("label",{class:"font-semibold"},"Fifth number",-1),it={class:"",style:{"margin-top":"10px"}},ut=t("label",{class:"font-semibold"},"Sixth number",-1),dt={class:"mt-3"},rt={class:"col-12 lg:col-6 xl:col-6"},ct={class:"card"},mt={style:{display:"flex","justify-content":"space-between",gap:"10px"}},pt={class:"",style:{"margin-top":"10px",width:"50%"}},ft=t("label",{class:"font-semibold"},"Multiplier",-1),gt={class:"",style:{"margin-top":"10px",width:"50%"}},_t=t("label",{class:"font-semibold"},"Qouta",-1),ht={style:{display:"flex","justify-content":"space-between",gap:"10px"}},yt={class:"",style:{"margin-top":"10px",width:"50%"}},bt=t("label",{class:"font-semibold"},"Min Bet",-1),vt={class:"",style:{"margin-top":"10px",width:"50%"}},wt=t("label",{class:"font-semibold"},"Max Bet",-1),xt={class:"mt-3"},Nt={class:"col-12 lg:col-12 xl:col-12"},Ct={class:"card"},Vt={__name:"LotteryPick3",setup(Dt){const I=B(),f=P(),g=m(),_=m(null),h=m(null),y=m(!1),N=JSON.parse(localStorage.getItem("auth.admin")),i={username:N[0].username,token:N[0].token,gameType:"P3"},V=m([{id:1,winComb:"1*3",gameSched:"2PM",betCount:234,winnerCount:2,totalBets:32424,totalWins:53424,profit:12343,date:"2023-03-16 12:32:12"},{id:2,winComb:"5*1",gameSched:"6PM",betCount:24,winnerCount:5,totalBets:1234,totalWins:5344,profit:5445,date:"2023-03-16 12:32:12"}]),e=k({firstNum:null,secondNum:null,thirdNum:null,fourthNum:null,fifthNum:null,sixtNum:null,gameID:null}),S=()=>{if(e.firstNum==null||e.secondNum==null||e.thirdNum==null||e.fourthNum==null||e.fifthNum==null||e.sixtNum==null){f.add({severity:"error",summary:"Failed",detail:"Please fill the required fields.",life:3e3});return}I.require({message:"Are you sure you want to proceed?",header:"Confirmation",icon:"pi pi-exclamation-triangle",rejectClass:"p-button-secondary p-button-outlined",rejectLabel:"Cancel",acceptLabel:"Save",accept:async()=>{y.value=!0,i.firstNumber=e.firstNum,i.secNumber=e.secondNum,i.thirdNumber=e.thirdNum,i.fourthNumber=e.fourthNum,i.fifthNumber=e.fifthNum,i.sixtNumber=e.sixtNum,i.gameID=e.gameID;const n=await D.postLotteryDeclare(i);console.log(i),console.log(n),n.error===0?(e.firstNum=null,e.secondNum=null,e.thirdNum=null,e.fourthNum=null,e.fifthNum=null,e.sixtNum=null,f.add({severity:"success",summary:"Success",detail:"Pick 3 has been declared successfully",life:3e3})):f.add({severity:"error",summary:"Failed",detail:n.description,life:3e3}),y.value=!1}})},b=n=>n.toLocaleString("en-US",{style:"currency",currency:"PHP"}),G=async()=>{const n=await D.postLotteryFetchGame(i);console.log(n),n.error===0?(e.gameID=n.gameDetails.id,_.value=n.gameDetails.ballClose):f.add({severity:"error",summary:"Failed",detail:n.description,life:3e3})},C=()=>{if(!h.value||!_.value)return;const n=new Date,l=h.value-n,v=Math.floor(l/(1e3*60*60)),w=Math.floor(l%(1e3*60*60)/(1e3*60)),a=Math.floor(l%(1e3*60)/1e3);if(a<0){g.value="00:00:00 - CLOSED";return}g.value=`${v.toString().padStart(2,"0")}:${w.toString().padStart(2,"0")}:${a.toString().padStart(2,"0")}`};return T(()=>{G(),M(_,l=>{l&&(h.value=new Date(l))}),C();const n=setInterval(C,1e3);U(()=>clearInterval(n))}),(n,l)=>{const v=d("Toast"),w=d("ConfirmDialog"),a=d("InputNumber"),x=d("Button"),u=d("Column"),L=d("DataTable");return j(),E("div",F,[o(v),o(w),t("div",A,[R,W,t("span",q,r(g.value),1)]),t("div",$,[t("div",O,[t("div",H,[t("div",J,[Q,o(a,{modelValue:e.gameID,"onUpdate:modelValue":l[0]||(l[0]=s=>e.gameID=s),style:{"margin-top":"5px"},class:"w-full",inputId:"withoutgrouping",useGrouping:!1,disabled:""},null,8,["modelValue"])]),t("div",z,[t("div",K,[X,o(a,{modelValue:e.firstNum,"onUpdate:modelValue":l[1]||(l[1]=s=>e.firstNum=s),style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1},null,8,["modelValue"])]),t("div",Y,[Z,o(a,{modelValue:e.secondNum,"onUpdate:modelValue":l[2]||(l[2]=s=>e.secondNum=s),style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1},null,8,["modelValue"])]),t("div",tt,[et,o(a,{modelValue:e.thirdNum,"onUpdate:modelValue":l[3]||(l[3]=s=>e.thirdNum=s),style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1},null,8,["modelValue"])])]),t("div",ot,[t("div",st,[lt,o(a,{modelValue:e.fourthNum,"onUpdate:modelValue":l[4]||(l[4]=s=>e.fourthNum=s),style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1},null,8,["modelValue"])]),t("div",nt,[at,o(a,{modelValue:e.fifthNum,"onUpdate:modelValue":l[5]||(l[5]=s=>e.fifthNum=s),style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1},null,8,["modelValue"])]),t("div",it,[ut,o(a,{modelValue:e.sixtNum,"onUpdate:modelValue":l[6]||(l[6]=s=>e.sixtNum=s),style:{"margin-top":"5px"},inputId:"withoutgrouping",useGrouping:!1},null,8,["modelValue"])])]),t("div",dt,[o(x,{severity:"success",label:"DECLARE",class:"w-full",loading:y.value,onClick:S},null,8,["loading"]),o(x,{severity:"warning",label:"RE-DECLARE",class:"w-full mt-2"})])])]),t("div",rt,[t("div",ct,[t("div",mt,[t("div",pt,[ft,o(a,{style:{"margin-top":"5px"},class:"w-full",inputId:"withoutgrouping",useGrouping:!1})]),t("div",gt,[_t,o(a,{style:{"margin-top":"5px"},class:"w-full",inputId:"withoutgrouping",useGrouping:!1})])]),t("div",ht,[t("div",yt,[bt,o(a,{style:{"margin-top":"5px"},class:"w-full",inputId:"withoutgrouping",useGrouping:!1})]),t("div",vt,[wt,o(a,{style:{"margin-top":"5px"},class:"w-full",inputId:"withoutgrouping",useGrouping:!1})])]),t("div",xt,[o(x,{severity:"primary",label:"Save",class:"w-full mt-2"})])])]),t("div",Nt,[t("div",Ct,[o(L,{value:V.value,tableStyle:"min-width: 50rem",stripedRows:"",paginator:"",rows:10},{default:c(()=>[o(u,{field:"id",header:"ID"}),o(u,{field:"winComb",header:"Win Comb."}),o(u,{field:"gameSched",header:"Game Sched"}),o(u,{header:"Bet Count"},{body:c(s=>[p(r(s.data.betCount.toLocaleString()),1)]),_:1}),o(u,{header:"Winner Count"},{body:c(s=>[p(r(s.data.winnerCount.toLocaleString()),1)]),_:1}),o(u,{header:"Total Bets"},{body:c(s=>[p(r(b(s.data.totalBets)),1)]),_:1}),o(u,{header:"Total Wins"},{body:c(s=>[p(r(b(s.data.totalWins)),1)]),_:1}),o(u,{header:"Profit"},{body:c(s=>[p(r(b(s.data.profit)),1)]),_:1}),o(u,{field:"date",header:"Date"})]),_:1},8,["value"])])])])])}}};export{Vt as default};
