<script setup>
import { ref, onMounted, reactive, watch } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { AdminAPIRequest as axios } from '@/plugins/APIServices';
import { useToast } from 'primevue/usetoast';
import { socket } from '@/socket';
import { useRouter } from 'vue-router';
import CellSabongTable from '@/data/CellSabongTable.json';
const toast = useToast();
const router = useRouter();
const confirm = useConfirm();
const disabledOpenBtn = ref(false);
const disabledCloseBtn = ref(false);
const blockedBettingDec = ref(true);
const blockedBettingDec1 = ref(false);
const isLoadingBtn = ref(false);
const decBtnLoading = ref(false);
const redeclareModal = ref(false);
const regladaBullet = ref(false);
const regladaStraightBullet = ref(false);
const isRedeclare = ref(false);
const isRedeclareStraight = ref(false);
const store = JSON.parse(localStorage.getItem('auth.admin'));
const storeData = { username: store[0].username, token: store[0].token };
const regladaData = ref([]);
const regladaDataStraight = ref([]);
const arenaClose = ref(false);
const redecBtnLoading = ref(false);
const editReglada = ref([]);
const isChecked = ref(false);
const sabongData = reactive({
    arenaID: null,
    gameID: null,
    fightNumber: null,
    drawBet: null,
    meronBet: null,
    walaBet: null,
    meronOdds: null,
    walaOdds: null,
    status: null,
    meronBetCount: null,
    walaBetCount: null,
    drawBetCount: null,
    winner: null,
    previousGameID: null
});
const handleEditReglada = () => {
    if (editReglada.value && editReglada.value.length > 0 && editReglada.value[0]) {
        toast.add({ severity: 'info', summary: 'Success', detail: 'You can now able to edit the reglahan', life: 3000 });
        console.log(editReglada.value[0]);
    }
};
watch(editReglada, (newValue) => {
    isChecked.value = newValue;
    console.log(isChecked.value);
});
const handleIncomingMessage = async (event) => {
    const data = JSON.parse(event);
    if (data.type === 'sabong') {
        console.log(data);
        const resGame = await axios.postFetchGame({ username: store[0].username, token: store[0].token, arenaID: sabongData.arenaID });
        console.log(resGame);

        if (resGame.error === 0) {
            sabongData.drawBet = resGame.drawBet;
            sabongData.meronBet = resGame.meronBet;
            sabongData.walaBet = resGame.walaBet;
            sabongData.meronOdds = resGame.meronOdds;
            sabongData.walaOdds = resGame.walaOdds;
            sabongData.meronBetCount = resGame.betCountMeron;
            sabongData.walaBetCount = resGame.betCountWala;
            sabongData.drawBetCount = resGame.betCountDraw;
        }
    }
};

const setupWebSocket = () => {
    if (socket) {
        socket.on('chat-message', (data) => {
            handleIncomingMessage(data);
        });

        socket.on('connect', () => {
            console.log('Connected to WebSocket server.');
            // Your open event handling logic
        });
    } else {
        console.error('Socket is not initialized properly.');
    }
};
onMounted(async () => {
    setupWebSocket();
    try {
        const res = await axios.postFetchArena({ username: store[0].username, token: store[0].token });
        const resGame = await axios.postFetchGame({ username: store[0].username, token: store[0].token, arenaID: res.arenaID });
        console.log(resGame);
        if (resGame.error === 0) {
            sabongData.arenaID = resGame.arenaID;
            sabongData.gameID = resGame.gameID;
            sabongData.fightNumber = resGame.fightNumber;
            sabongData.drawBet = resGame.drawBet;
            sabongData.meronBet = resGame.meronBet;
            sabongData.walaBet = resGame.walaBet;
            sabongData.meronOdds = resGame.meronOdds;
            sabongData.walaOdds = resGame.walaOdds;
            sabongData.status = resGame.status;
            sabongData.meronBetCount = resGame.betCountMeron;
            sabongData.walaBetCount = resGame.betCountWala;
            sabongData.drawBetCount = resGame.betCountDraw;
            disabledCloseBtn.value = resGame.status == 0 ? true : false;
            blockedBettingDec.value = resGame.status == 0 ? false : true;

            const resFetch = await axios.postFetchReglada({ username: store[0].username, token: store[0].token, arenaID: resGame.arenaID });
            console.log(resFetch);
            if (resFetch.resStatus === 0) {
                const resReglaData = resFetch.data.filter((item) => item.type === 'reglada');
                regladaData.value = resReglaData;
                const resReglaDataStraight = resFetch.data.filter((item) => item.type === 'regladaStraight');
                regladaDataStraight.value = resReglaDataStraight;
            }
        } else {
            toast.add({ severity: 'error', summary: 'Error', detail: resGame.description, life: 3000 });
        }
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: e, life: 3000 });
        setTimeout(() => {
            router.push('/admins');
        }, 2000);
    }
});
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
};

const summary = ref([
    { fightNumber: 1, gameID: 2, totalBetMeron: 32143, totalBetWala: 12345, betCount: 353, winnerCount: 12, winner: 'Wala' },
    { fightNumber: 2, gameID: 3, totalBetMeron: 5345, totalBetWala: 15433, betCount: 123, winnerCount: 2, winner: 'Meron' }
]);

const openCloseBetting = async (type) => {
    decBtnLoading.value = true;
    try {
        const res = await axios.postBetStatus({ action: type, gameID: sabongData.gameID, ...storeData });
        console.log(res);
        if (res.error === 0) {
            const resGame = await axios.postFetchGame({ username: store[0].username, token: store[0].token, arenaID: sabongData.arenaID });
            console.log(resGame);

            const pData = JSON.stringify({ type: 'sabong', openCloseBetting: type, meronBet: resGame.meronBet, walaBet: resGame.walaBet, meronOdds: resGame.meronOdds, walaOdds: resGame.walaOdds });
            socket.emit('chat-message', pData);
            if (type === 'Open') {
                sabongData.status = 1;
                disabledCloseBtn.value = false;
                disabledOpenBtn.value = false;
                blockedBettingDec.value = true;
            } else {
                sabongData.status = 0;
                disabledCloseBtn.value = true;
                disabledOpenBtn.value = false;
                blockedBettingDec.value = false;
            }
        } else {
            toast.add({ severity: 'error', summary: 'Error', detail: res.description, life: 3000 });
            decBtnLoading.value = false;
        }
    } catch (e) {
        toast.add({ severity: 'error', summary: 'Error', detail: e, life: 3000 });
    }

    decBtnLoading.value = false;
};

const declare = async (val) => {
    console.log(val);
    isLoadingBtn.value = true;
    const passData = { username: store[0].username, token: store[0].token, gameID: sabongData.gameID, winner: val };
    console.log(passData);
    const res = await axios.postSabongDeclare(passData);
    console.log(res);
    if (res.errorCode === 0) {
        sabongData.previousGameID = res.previousID;
        regladaBullet.value = true;
        regladaStraightBullet.value = true;

        sabongData.winner = val;
        const resGame = await axios.postFetchGame({ username: store[0].username, token: store[0].token, arenaID: sabongData.arenaID });
        console.log(resGame);
        const pData = JSON.stringify({ type: 'sabong', declared: true });
        socket.emit('chat-message', pData);
        sabongData.gameID = resGame.gameID;
        sabongData.fightNumber = resGame.fightNumber;
        blockedBettingDec.value = true;
        sabongData.status = resGame.status;
        disabledCloseBtn.value = false;
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: res.description, life: 3000 });
    }
    isLoadingBtn.value = false;
};

const redeclareBtn = async (type) => {
    redecBtnLoading.value = true;
    const passData = { username: store[0].username, token: store[0].token, gameID: sabongData.previousGameID, winner: type };
    console.log(passData);
    const res = await axios.postRedeclare(passData);
    console.log(res);
    if (res.errorCode === 0) {
        const pData = JSON.stringify({ type: 'sabong', declared: true });
        sabongData.winner = type;
        socket.emit('chat-message', pData);
        toast.add({ severity: 'success', summary: 'Success', detail: res.description, life: 3000 });
        redeclareModal.value = false;
        disabledCloseBtn.value = false;
        blockedBettingDec.value = true;
        regladaBullet.value = true;
        regladaStraightBullet.value = true;

        isRedeclare.value = true;
        isRedeclareStraight.value = true;
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: res.description, life: 3000 });
    }
    redecBtnLoading.value = false;
};

const closeArena = () => {
    confirm.require({
        message: 'Are you sure you want to close the arena?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Confirm',
        accept: async () => {
            const res = await axios.postCloseArena({ username: store[0].username, token: store[0].token, arenaID: sabongData.arenaID });
            if (res.error === 0) {
                localStorage.removeItem('hasArena');
                blockedBettingDec1.value = true;
                blockedBettingDec.value = true;
                arenaClose.value = true;
                const passSocket = JSON.stringify({ type: 'sabong', arenaClosed: true });
                socket.emit('chat-message', passSocket);
                toast.add({ severity: 'success', summary: 'Success', detail: 'The arena is successfully closed.', life: 3000 });
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                toast.add({ severity: 'error', summary: 'Error', detail: res.description, life: 3000 });
            }
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

// Sample data from regladaData ref

// Number of rows and columns in the table
const numRows = 10;
const numCols = 30;

// Create a 2D array to store cell IDs
const rows = ref(Array.from({ length: numRows }, () => Array.from({ length: numCols }, () => ({ cellID: '', class: '' }))));

// Assign cell IDs from CellSabongTable to each cell in the rows
for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
        rows.value[i][j].cellID = CellSabongTable[i * numCols + j];
    }
}

// Function to handle cell click event
const handleCellClick = async (win, id) => {
    console.log(isRedeclare.value);

    let className = '';
    switch (win) {
        case 'Meron':
            className = 'game-trend-meron';
            break;
        case 'Wala':
            className = 'game-trend-wala';
            break;
        case 'Draw':
            className = 'game-trend-draw';
            break;
        case 'Cancel':
            className = 'game-trend-cancel';
            break;
        default:
            break;
    }

    const handleAddOrRemoveReglada = async () => {
        console.log('PASOK');
        const res = regladaData.value.filter((item) => item.cellID === id);
        console.log(res);

        if (res.length > 0) {
            // Remove
            console.log('REMOVE ITEM');
            const updatedRegladaData = regladaData.value.filter((item) => item.cellID !== id);
            console.log(updatedRegladaData);

            const resDel = await axios.postDeleteReglada({ username: store[0].username, token: store[0].token, arenaID: sabongData.arenaID, cellID: id, type: 'reglada' });
            console.log(resDel);

            regladaData.value = updatedRegladaData;
        } else {
            // Add
            console.log(res);
            const pData = { username: store[0].username, token: store[0].token, arenaID: sabongData.arenaID, type: 'reglada', cellID: id, class: className };
            const dataRes = await axios.postInserReglada(pData);
            console.log(dataRes);

            const passData = { arenaID: sabongData.arenaID, cellID: id, class: className };
            regladaData.value.push(passData);
        }

        const passSocket = JSON.stringify({ regladaType: 'reglada', type: 'sabong', scoreboard: id, class: className, method: res.length > 0 ? 'remove' : 'addStraight' });
        socket.emit('chat-message', passSocket);

        regladaBullet.value = false;
    };

    if (isChecked.value.length > 0 || (regladaBullet.value && isRedeclare.value)) {
        await handleAddOrRemoveReglada();
    }

    if (regladaBullet.value && !isRedeclare.value) {
        await handleAddOrRemoveReglada();
    }
};

const getClassName = (cellID) => {
    const cell = regladaData.value.find((item) => item.cellID === cellID);
    return cell ? cell.class : '';
};

// STRIAGHT
// Number of rows and columns in the table
const numRowsStraight = 10;
const numColsStraight = 30;

// Create a 2D array to store cell IDs
const rowsStraight = ref(Array.from({ length: numRowsStraight }, () => Array.from({ length: numColsStraight }, () => ({ cellID: '', class: '' }))));

// Assign cell IDs from CellSabongTable to each cell in the rows
for (let i = 0; i < numRowsStraight; i++) {
    for (let j = 0; j < numColsStraight; j++) {
        rowsStraight.value[i][j].cellID = CellSabongTable[i * numColsStraight + j];
    }
}

// Function to handle cell click event

const handleCellClickStraight = async (win, id) => {
    console.log(isRedeclareStraight.value);

    let className = '';
    switch (win) {
        case 'Meron':
            className = 'game-trend-meron';
            break;
        case 'Wala':
            className = 'game-trend-wala';
            break;
        case 'Draw':
            className = 'game-trend-draw';
            break;
        case 'Cancel':
            className = 'game-trend-cancel';
            break;
        default:
            break;
    }

    const handleAddOrRemoveReglada = async () => {
        console.log('PASOK');
        const res = regladaDataStraight.value.filter((item) => item.cellID === id);
        console.log(res);

        if (res.length > 0) {
            // Remove
            console.log('REMOVE ITEM');
            const updatedRegladaData = regladaDataStraight.value.filter((item) => item.cellID !== id);
            console.log(updatedRegladaData);

            const resDel = await axios.postDeleteReglada({ username: store[0].username, token: store[0].token, arenaID: sabongData.arenaID, cellID: id, type: 'regladaStraight' });
            console.log(resDel);

            regladaDataStraight.value = updatedRegladaData;
            isRedeclareStraight.value = false;
        } else {
            // Add
            console.log(res);
            const pData = { username: store[0].username, token: store[0].token, arenaID: sabongData.arenaID, type: 'regladaStraight', cellID: id, class: className };
            const dataRes = await axios.postInserReglada(pData);
            console.log(dataRes);

            const passData = { arenaID: sabongData.arenaID, cellID: id, class: className };
            regladaDataStraight.value.push(passData);
        }

        const passSocket = JSON.stringify({ regladaType: 'regladaStraight', type: 'sabong', scoreboard: id, class: className, method: res.length > 0 ? 'removeStraight' : 'addStraight' });
        socket.emit('chat-message', passSocket);

        regladaStraightBullet.value = false;
    };

    if (isChecked.value.length > 0) {
        await handleAddOrRemoveReglada();
        return;
    }

    if (regladaStraightBullet.value || isChecked.value.length > 0) {
        if (isRedeclareStraight.value || isChecked.value.length > 0) {
            await handleAddOrRemoveReglada();
            return;
        }
        const pData = { username: store[0].username, token: store[0].token, arenaID: sabongData.arenaID, type: 'regladaStraight', cellID: id, class: className };
        const dataRes = await axios.postInserReglada(pData);
        console.log(dataRes);

        const passData = { arenaID: sabongData.arenaID, cellID: id, class: className };
        regladaDataStraight.value.push(passData);

        const passSocket = JSON.stringify({ regladaType: 'regladaStraight', type: 'sabong', scoreboard: id, class: className });
        socket.emit('chat-message', passSocket);

        regladaStraightBullet.value = false;
    }
};

const getClassNameStraight = (cellID) => {
    const cell = regladaDataStraight.value.find((item) => item.cellID === cellID);
    return cell ? cell.class : '';
};
</script>

<template>
    <Message severity="warn" :closable="false" v-if="arenaClose">The arena is closed.</Message>
    <div class="grid">
        <ConfirmDialog :draggable="false"></ConfirmDialog>
        <Dialog v-model:visible="redeclareModal" modal header="REDECLARE" :style="{ width: '25rem' }">
            <div class="flex align-items-center gap-3 mb-3">
                <label for="username" class="font-semibold w-6rem">Previous Game ID:</label>
                <InputText id="username" class="flex-auto" autocomplete="off" v-model="sabongData.previousGameID" />
            </div>
            <div class="" style="display: flex; justify-content: space-around; margin-top: 30px">
                <Button severity="danger" type="button" label="MERON" icon="pi pi-check" :loading="redecBtnLoading" @click="redeclareBtn('Meron')" />
                <Button type="button" label="WALA" icon="pi pi-times" :loading="redecBtnLoading" @click="redeclareBtn('Wala')" />
            </div>
            <div class="" style="display: flex; justify-content: space-around; margin-top: 30px">
                <Button severity="info" type="button" label="CANCEL" icon="pi pi-check" :loading="redecBtnLoading" @click="redeclareBtn('Cancel')" />
                <Button severity="success" type="button" label="DRAW" icon="pi pi-times" :loading="redecBtnLoading" @click="redeclareBtn('Draw')" />
            </div>
        </Dialog>
        <Toast />
        <div class="col-12 lg:col-12 xl:col-6 forMobile" style="display: none">
            <iframe
                class="iframeSabong item-sabong"
                src="https://www.youtube.com/embed/yUQIXf7WV78?si=CHy6hXld3MDtLoBm"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            ></iframe>
        </div>
        <div class="col-12 lg:col-12 xl:col-6">
            <div class="card" style="display: flex; padding: 1.3rem; margin-bottom: 10px">
                <div class="" style="border-right: 2px solid gray; width: 50%; text-align: center; display: flex; flex-direction: column">
                    <span style="font-size: 1.2rem; font-weight: 600">MERON</span>
                    <div class="mt-5">
                        <span>Total Bets: </span> <span style="font-weight: 700; color: red; text-shadow: 0 0 1px #000">{{ sabongData.meronBet }}</span>
                    </div>
                    <div class="mt-2">
                        <span>ODDS: </span> <span style="font-weight: 700">{{ sabongData.meronOdds }}</span>
                    </div>
                    <div class="mt-2">
                        <span>BET COUNT: </span> <span style="font-weight: 700">{{ sabongData.meronBetCount }}</span>
                    </div>
                </div>
                <div class="" style="border-right: 2px solid gray; width: 50%; text-align: center; display: flex; flex-direction: column">
                    <span style="font-size: 1.2rem; font-weight: 600">WALA</span>
                    <div class="mt-5">
                        <span>Total Bets: </span> <span style="font-weight: 700; color: blue; text-shadow: 0 0 1px #000">{{ sabongData.walaBet }}</span>
                    </div>
                    <div class="mt-2">
                        <span>ODDS: </span> <span style="font-weight: 700">{{ sabongData.walaOdds }}</span>
                    </div>
                    <div class="mt-2">
                        <span>BET COUNT: </span> <span style="font-weight: 700">{{ sabongData.walaBetCount }}</span>
                    </div>
                </div>
                <div class="" style="width: 50%; text-align: center; display: flex; flex-direction: column">
                    <span style="font-size: 1.2rem; font-weight: 600">DRAW</span>
                    <div class="mt-5">
                        <span>Total Bets: </span> <span style="font-weight: 700; color: green; text-shadow: 0 0 1px #000">{{ sabongData.drawBet }}</span>
                    </div>

                    <div class="mt-2">
                        <span>BET COUNT: </span> <span style="font-weight: 700">{{ sabongData.drawBetCount }}</span>
                    </div>
                </div>
            </div>
            <BlockUI :blocked="blockedBettingDec1">
                <div class="card">
                    <div class="card-header" style="font-size: 1.1rem; font-weight: 600">Betting Declaration</div>
                    <Divider />
                    <div class="card" style="padding: 1rem">
                        <div class="" style="display: flex; justify-content: space-around">
                            <span style="font-weight: 700">Fight #</span>
                            <span style="font-weight: 700">Status</span>
                            <span style="font-weight: 700">Winner</span>
                        </div>
                        <div class="" style="display: flex; justify-content: space-around; align-items: center; margin-top: 15px">
                            <span style="font-weight: 500">{{ sabongData.fightNumber }}</span>
                            <span style="font-weight: 500; margin-left: 25px; color: red">{{ sabongData.status ? 'OPEN' : 'CLOSED' }}</span>
                            <span style="font-weight: 500">NONE</span>
                        </div>
                    </div>

                    <div class="" style="display: flex; justify-content: space-between; margin-top: 30px">
                        <Button :disabled="disabledOpenBtn" severity="success" type="button" label="OPEN" icon="pi pi-check" :loading="decBtnLoading" @click="openCloseBetting('Open')" />
                        <Button :disabled="disabledCloseBtn" severity="danger" type="button" label="CLOSE" icon="pi pi-times" :loading="decBtnLoading" @click="openCloseBetting('Close')" />
                    </div>
                </div>
            </BlockUI>
        </div>
        <div class="col-12 lg:col-12 xl:col-6">
            <iframe
                class="iframeSabong item-sabong forDesktop"
                src="https://www.youtube.com/embed/yUQIXf7WV78?si=CHy6hXld3MDtLoBm"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            ></iframe>
        </div>
        <div class="col-12 lg:col-6 xl:col-4">
            <BlockUI :blocked="blockedBettingDec">
                <div class="card">
                    <div class="card-header" style="font-size: 1.1rem; font-weight: 600">Betting Declaration</div>
                    <Divider />
                    <div class="" style="display: flex; justify-content: space-around; margin-top: 30px">
                        <Button severity="danger" type="button" label="MERON" icon="pi pi-check" :loading="isLoadingBtn" @click="declare('Meron')" />
                        <Button type="button" label="WALA" icon="pi pi-times" :loading="isLoadingBtn" @click="declare('Wala')" />
                    </div>
                    <div class="" style="display: flex; justify-content: space-around; margin-top: 30px">
                        <Button severity="info" type="button" label="CANCEL" icon="pi pi-check" :loading="isLoadingBtn" @click="declare('Cancel')" />
                        <Button severity="success" type="button" label="DRAW" icon="pi pi-times" :loading="isLoadingBtn" @click="declare('Draw')" />
                    </div>

                    <Button severity="warning" type="button" label="REDECLARE" class="w-full mt-4" icon="pi pi-check" :loading="isLoadingBtn" @click="redeclareModal = true" v-if="sabongData.previousGameID" />
                    <Button severity="danger" type="button" label="CLOSE ARENA" class="w-full mt-2" icon="pi pi-check" :loading="isLoadingBtn" @click="closeArena" />
                </div>
            </BlockUI>
        </div>
        <div class="col-12 lg:col-6 xl:col-8">
            <div class="card" style="padding: 1rem">
                <div class="flex align-items-center mb-2">
                    <Checkbox v-model="editReglada" inputId="ingredient1" value="Edit" @change="handleEditReglada" />
                    <label for="ingredient1" class="ml-2"> Edit </label>
                </div>
                <div class="reglada" style="height: 213px; overflow: auto">
                    <table style="min-width: max-content">
                        <tbody>
                            <tr v-for="(row, indexRow) in rows" :key="indexRow">
                                <td v-for="(cell, indexCol) in row" :key="indexCol" :class="getClassName(cell.cellID)" @click="handleCellClick(sabongData.winner, cell.cellID)" style="position: relative"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card" style="padding: 1rem">
                <div class="reglada" style="height: 213px; overflow: auto">
                    <table style="min-width: max-content">
                        <tbody>
                            <tr v-for="(row, indexRow) in rowsStraight" :key="indexRow">
                                <td v-for="(cell, indexCol) in row" :key="indexCol" :class="getClassNameStraight(cell.cellID)" @click="handleCellClickStraight(sabongData.winner, cell.cellID)" style="position: relative"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card">
                <DataTable :value="summary" tableStyle="min-width: 50rem" stripedRows paginator :rows="10">
                    <Column field="fightNumber" header="FIGHT #"></Column>
                    <Column field="gameID" header="GAME ID"></Column>
                    <Column field="totalBetMeron" header="TOTAL BET MERON">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.totalBetMeron) }}
                        </template>
                    </Column>
                    <Column field="totalBetWala" header="TOTAL BET WALA">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.totalBetWala) }}
                        </template>
                    </Column>
                    <Column field="betCount" header="BET COUNT"></Column>
                    <Column field="winnerCount" header="WINNER COUNT"></Column>
                    <Column field="winner" header="WINNER">
                        <template #body="slotProps">
                            <Tag :severity="slotProps.data.winner === 'Wala' ? 'danger' : 'success'" :value="slotProps.data.winner"></Tag>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style>
.reglada tr {
    cursor: pointer;
    margin-bottom: 5px;
}
.reglada tr td:hover {
    background-color: rgba(49, 47, 47, 0.1);
}
.reglada tr td {
    height: 30px;
    width: 30px;
    cursor: pointer;
    margin-right: 2px;
}
.titleRes {
    font-weight: 700;
    font-size: 1.1rem;
    text-align: center;
}
.meron {
    color: red;
}
.wala {
    color: blue;
}
.item-sabong {
    width: 100%;
    height: 420px;
    position: relative;
    border-radius: 10px;
}
.game-trend-cancel {
    padding: 0px;
    height: 28px;
    width: 28px;
    background-color: #fff;
    border-radius: 50%;
    text-align: center;
    color: #ffffff;
    font-family: arial, sans-serif;
    font-size: 12px;
    font-weight: bold;
    border: 8px solid #bebebe;
}
.game-trend-meron {
    padding: 0px;
    height: 28px;
    width: 28px;
    background-color: #fff;
    border-radius: 50%;
    /* display: inline-block; */
    text-align: center;
    color: #ffffff;
    font-family: arial, sans-serif;
    font-size: 12px;
    font-weight: bold;
    border: 8px solid #ee2929;
}
.game-trend-wala {
    padding: 0px;
    height: 28px;
    width: 28px;
    background-color: #fff;
    border-radius: 50%;
    /* display: inline-block; */
    text-align: center;
    color: #ffffff;
    font-family: arial, sans-serif;
    font-size: 12px;
    font-weight: bold;
    border: 8px solid #4128e9;
}
.game-trend-draw {
    padding: 0px;
    height: 28px;
    width: 28px;
    background-color: #fff;
    border-radius: 50%;
    /* display: inline-block; */
    text-align: center;
    color: #ffffff;
    font-family: arial, sans-serif;
    font-size: 12px;
    font-weight: bold;
    border: 8px solid #2ce454;
}

.reglada {
    height: 213px; /* Adjust height as needed */
    overflow-x: scroll; /* Enable horizontal scrollbar */
    overflow-y: hidden; /* Hide vertical scrollbar */
    background-size: 32px 32px;
    background-image: linear-gradient(to right, lightgrey 1px, transparent 1px), linear-gradient(to bottom, lightgrey 1px, transparent 1px);
    background-repeat: repeat;
    background-attachment: local;
    background-color: white;
    line-height: normal;
    text-align: start;
}

@media (width <= 1000px) {
    .forMobile {
        display: block !important;
    }
    .forDesktop {
        display: none !important;
    }
}
</style>
