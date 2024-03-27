import{v as M,x as $,a as D,r as q,o as R,A as S,c as p,d as L,e as A,j as s,w as i,f as o,k as b,t as h,h as T,g as G}from"./index-000147ee.js";const Y={className:"card"},z=o("h5",null,"Game List",-1),H={class:"flex align-items-center gap-3 mb-5 mt-3"},K=o("label",{for:"username",class:"font-semibold w-6rem"},"Game ID",-1),Q={class:"flex align-items-center gap-3 mb-5"},W=o("label",{for:"email",class:"font-semibold w-6rem"},"Name",-1),X={class:"flex align-items-center gap-3 mb-5"},Z=o("label",{for:"email",class:"font-semibold w-6rem"},"In Order",-1),ee={class:"flex align-items-center gap-3 mb-5"},ae=o("label",{for:"email",class:"font-semibold w-6rem"},"Type",-1),te={class:"flex align-items-center gap-3 mb-5"},le=o("label",{for:"email",class:"font-semibold w-6rem"},"Provider",-1),se={class:"flex align-items-center gap-3 mb-5"},oe=o("label",{for:"email",class:"font-semibold w-6rem"},"Category",-1),ne={key:0,class:"flex align-items-center gap-3 mb-5"},de=o("label",{for:"email",class:"font-semibold w-6rem"},"Status",-1),me={class:"flex align-items-center gap-3 mb-5"},re=o("label",{for:"email",class:"font-semibold w-6rem"},"Thumbnail",-1),ie={class:"flex justify-content-end gap-2"},ge={__name:"Games",setup(ce){const U=M(),y=$(),u=D(!1),g=D(!1),_=JSON.parse(localStorage.getItem("auth.admin")),e=q({gameID:"",name:"",selectedOrderList:{name:"1",code:"1"},selectedgameType:{name:"Slot",code:"1"},selectedgameProvider:{name:"JILI",code:"1"},selectedgameCategory:{name:"Games",code:"1"},selectedStatus:null,thumbnail:""}),r=D([]),V=[{name:"1",code:"1"},{name:"2",code:"2"},{name:"3",code:"3"},{name:"4",code:"4"},{name:"5",code:"5"},{name:"6",code:"6"}],w=D("Add"),k=[{name:"Slot",code:"1"},{name:"Fishing",code:"2"}],x=[{name:"JILI",code:"1"},{name:"Progmatic Gaming",code:"53"}],O=[{name:"Games",code:"1"},{name:"Live",code:"2"}],P=[{name:"Active",code:"active"},{name:"Inactive",code:"inactive"}];R(async()=>{try{const n=await S.getshowGameList();console.log(n);const a=n.map(l=>{const v=l.status==1?"Active":"Inactive",c=P.find(m=>m.name===v),d=x.find(m=>m.name===l.provider),I=k.find(m=>m.name===l.type),C=V.find(m=>m.name==l.in_order),f=O.find(m=>m.name==l.category);return c&&d&&I?{...l,gameID:l.game_id,name:l.name,type:I,orderList:C,category:f,provider:d,thumbnail:l.thumbnail,status:c}:l});r.value=a,console.log(a)}catch(n){console.error("Error fetching game list:",n)}});const j=n=>{w.value="Edit",u.value=!0;const a=r.value.find(l=>l.gameID==n);console.log(a),e.gameID=a.gameID,e.name=a.name,e.selectedgameType=a.type,e.selectedOrderList=a.orderList,e.selectedgameProvider=a.provider,e.selectedgameCategory=a.category,e.thumbnail=a.thumbnail,e.selectedStatus=a.status},N=n=>{U.require({message:"Are you sure you want to proceed?",header:"Confirmation",icon:"pi pi-exclamation-triangle",rejectClass:"p-button-secondary p-button-outlined",rejectLabel:"Cancel",acceptLabel:"Confirm",accept:async()=>{const a={username:_.username,token:_.token,gameID:n},l=await S.postDeleteGame(a);console.log(l),l.resStatus===0?(r.value=r.value.filter(v=>v.gameID!==n),y.add({severity:"success",summary:"Success",detail:"Deleted Successfully",life:3e3})):y.add({severity:"error",summary:"Failed",detail:"Something went wrong...",life:3e3})},reject:()=>{y.add({severity:"error",summary:"Ops",detail:"Something went wrong...",life:3e3})}})},E=async()=>{g.value=!0;const n={username:_.username,token:_.token,gameID:e.gameID,name:e.name,orderList:parseInt(e.selectedOrderList.name),gameType:e.selectedgameType.name,gameProvider:e.selectedgameProvider.name,gameCategory:e.selectedgameCategory.name,status:e.selectedStatus.name==="Active"?1:0,thumbnail:e.thumbnail},a=await S.postUpdateGame(n);if(console.log(a),a.resStatus===0){const l=r.value.findIndex(v=>v.gameID===e.gameID);l!==-1&&(r.value[l]={...r.value[l],name:e.name,orderList:e.selectedOrderList,type:e.selectedgameType,provider:e.selectedgameProvider,category:e.selectedgameCategory,status:e.selectedStatus,thumbnail:e.thumbnail}),y.add({severity:"success",summary:"Success",detail:"Updated Successfully",life:3e3}),u.value=!1,g.value=!1}else g.value=!1,y.add({severity:"error",summary:"Failed",detail:a.resMsg,life:3e3})},B=()=>{w.value="Add",u.value=!0,e.gameID="",e.name="",e.selectedOrderList={name:"1",code:"1"},e.selectedgameType={name:"Slot",code:"1"},e.selectedgameProvider={name:"JILI",code:"1"},e.selectedgameCategory={name:"Games",code:"1"},e.selectedStatus={name:"Active",code:"active"}},F=async()=>{g.value=!0;const n={gameID:e.gameID,name:e.name,type:e.selectedgameType,orderList:e.selectedOrderList,category:e.selectedgameCategory,provider:e.selectedgameProvider,thumbnail:e.thumbnail,status:e.selectedStatus};r.value=[n,...r.value];const a={username:_.username,token:_.token,gameID:e.gameID,name:e.name,orderList:parseInt(e.selectedOrderList.name),gameType:e.selectedgameType.name,gameProvider:e.selectedgameProvider.name,gameCategory:e.selectedgameCategory.name,status:e.selectedStatus.name==="Active"?1:0,thumbnail:e.thumbnail},l=await S.postAddGames(a);l.resStatus===0?(y.add({severity:"success",summary:"Success",detail:"You have successfully added a game",life:3e3}),g.value=!1,u.value=!1):(y.add({severity:"error",summary:"Failed",detail:l.resMsg,life:3e3}),g.value=!1),console.log(a),console.log(l),u.value=!1};return(n,a)=>{const l=p("Toast"),v=p("ConfirmDialog"),c=p("Button"),d=p("Column"),I=p("DataTable"),C=p("InputText"),f=p("Dropdown"),m=p("Dialog");return L(),A("div",Y,[s(l),s(v),z,s(c,{label:"Add Game",class:"mb-5",onClick:B}),s(I,{value:r.value,rows:5,paginator:!0,responsiveLayout:"scroll"},{default:i(()=>[s(d,{style:{width:"10%"},sortable:!0,field:"username",header:"Code"},{body:i(t=>[b(h(t.data.gameID),1)]),_:1}),s(d,{style:{width:"15%"},sortable:!0,field:"mobile",header:"Name"},{body:i(t=>[b(h(t.data.name),1)]),_:1}),s(d,{style:{width:"5%"},sortable:!0,field:"email",header:"Type"},{body:i(t=>[b(h(t.data.type.name),1)]),_:1}),s(d,{style:{width:"5%"},sortable:!0,field:"country",header:"Category"},{body:i(t=>[b(h(t.data.category.name),1)]),_:1}),s(d,{style:{width:"10%"},sortable:!0,field:"country",header:"Provider"},{body:i(t=>[b(h(t.data.provider.name),1)]),_:1}),s(d,{style:{width:"15%"},sortable:!0,field:"gameCredit",header:"Thumbnail"},{body:i(t=>[b(h(t.data.thumbnail),1)]),_:1}),s(d,{style:{width:"5%"},sortable:!0,field:"accountStatus",header:"Status"},{body:i(t=>[b(h(t.data.status.name),1)]),_:1}),s(d,{style:{width:"10%"},sortable:!0,field:"completeName",header:"Action"},{body:i(t=>[s(c,{label:"Edit",style:{"margin-right":"10px"},onClick:J=>j(t.data.gameID)},null,8,["onClick"]),s(c,{label:"Delete",onClick:J=>N(t.data.gameID)},null,8,["onClick"])]),_:1})]),_:1},8,["value"]),s(m,{visible:u.value,"onUpdate:visible":a[9]||(a[9]=t=>u.value=t),header:`${w.value} Games`,style:{width:"50rem"},position:n.position,modal:!0,draggable:!1},{default:i(()=>[o("div",H,[K,s(C,{modelValue:e.gameID,"onUpdate:modelValue":a[0]||(a[0]=t=>e.gameID=t),id:"username",class:"w-full",autocomplete:"off"},null,8,["modelValue"])]),o("div",Q,[W,s(C,{modelValue:e.name,"onUpdate:modelValue":a[1]||(a[1]=t=>e.name=t),id:"Email",class:"w-full",autocomplete:"off"},null,8,["modelValue"])]),o("div",X,[Z,s(f,{modelValue:e.selectedOrderList,"onUpdate:modelValue":a[2]||(a[2]=t=>e.selectedOrderList=t),options:V,optionLabel:"name",placeholder:"Select",class:"w-full"},null,8,["modelValue"])]),o("div",ee,[ae,s(f,{modelValue:e.selectedgameType,"onUpdate:modelValue":a[3]||(a[3]=t=>e.selectedgameType=t),options:k,optionLabel:"name",placeholder:"Select",class:"w-full"},null,8,["modelValue"])]),o("div",te,[le,s(f,{modelValue:e.selectedgameProvider,"onUpdate:modelValue":a[4]||(a[4]=t=>e.selectedgameProvider=t),options:x,optionLabel:"name",placeholder:"Select",class:"w-full"},null,8,["modelValue"])]),o("div",se,[oe,s(f,{modelValue:e.selectedgameCategory,"onUpdate:modelValue":a[5]||(a[5]=t=>e.selectedgameCategory=t),options:O,optionLabel:"name",placeholder:"Select",class:"w-full"},null,8,["modelValue"])]),w.value=="Edit"?(L(),A("div",ne,[de,s(f,{modelValue:e.selectedStatus,"onUpdate:modelValue":a[6]||(a[6]=t=>e.selectedStatus=t),options:P,optionLabel:"name",placeholder:"Select",class:"w-full"},null,8,["modelValue"])])):T("",!0),o("div",me,[re,s(C,{modelValue:e.thumbnail,"onUpdate:modelValue":a[7]||(a[7]=t=>e.thumbnail=t),id:"Email",class:"w-full",autocomplete:"off"},null,8,["modelValue"])]),o("div",ie,[s(c,{type:"button",label:"Cancel",severity:"secondary",onClick:a[8]||(a[8]=t=>u.value=!1)}),w.value=="Add"?(L(),G(c,{key:0,type:"button",label:"Save",onClick:F,loading:g.value},null,8,["loading"])):T("",!0),w.value=="Edit"?(L(),G(c,{key:1,type:"button",label:"Update",severity:"warning",onClick:E,loading:g.value},null,8,["loading"])):T("",!0)])]),_:1},8,["visible","header","position"])])}}};export{ge as default};
