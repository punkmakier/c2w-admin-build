<script setup>
import { ref, onMounted, watch, onUnmounted, reactive } from 'vue';
import { AdminAPIRequest as axios } from '@/plugins/APIServices';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
const confirm = useConfirm();
const toast = useToast();
const nextDrawTimeVal = ref();
const resCountdownVal = ref(null);
const startCountdown = ref(null);
const isLoading = ref(false);
const store = JSON.parse(localStorage.getItem('auth.admin'));
const storeData = { username: store[0].username, token: store[0].token, gameType: '3D' };
const summary = ref([
    { id: 1, winComb: '1*3', gameSched: '2PM', betCount: 234, winnerCount: 2, totalBets: 32424, totalWins: 53424, profit: 12343, date: '2023-03-16 12:32:12' },
    { id: 2, winComb: '5*1', gameSched: '6PM', betCount: 24, winnerCount: 5, totalBets: 1234, totalWins: 5344, profit: 5445, date: '2023-03-16 12:32:12' }
]);

const declareNum = reactive({
    firstNum: null,
    secondNum: null,
    thirdNum: null,
    gameID: null
});

const declare = () => {
    if (declareNum.firstNum == null || declareNum.secondNum == null || thirdNum.secondNum == null) {
        toast.add({ severity: 'error', summary: 'Failed', detail: 'Please fill the required fields.', life: 3000 });
        return;
    }

    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Save',
        accept: async () => {
            isLoading.value = true;
            storeData.firstNumber = declareNum.firstNum;
            storeData.secNumber = declareNum.secondNum;
            storeData.thirdNumber = declareNum.thirdNum;
            storeData.gameID = declareNum.gameID;
            const res = await axios.postLotteryDeclare(storeData);
            console.log(storeData);
            console.log(res);
            if (res.error === 0) {
                toast.add({ severity: 'success', summary: 'Success', detail: '2D Lotto has been declared successfully', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Failed', detail: res.description, life: 3000 });
            }
            isLoading.value = false;
        }
    });
};

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
};

const fetchGame = async () => {
    const res = await axios.postLotteryFetchGame(storeData);
    console.log(res);
    if (res.error === 0) {
        declareNum.gameID = res.gameDetails.id;
        resCountdownVal.value = res.gameDetails.ballClose;
    } else {
        toast.add({ severity: 'error', summary: 'Failed', detail: res.description, life: 3000 });
    }
};

const calculateCountdown = () => {
    if (!startCountdown.value || !resCountdownVal.value) return;

    const currentDatetime = new Date();
    const diff = startCountdown.value - currentDatetime;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    if (seconds < 0) {
        nextDrawTimeVal.value = '00:00:00 - CLOSED';
        return;
    }
    nextDrawTimeVal.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

onMounted(() => {
    fetchGame();

    watch(resCountdownVal, (newVal) => {
        if (newVal) {
            startCountdown.value = new Date(newVal);
        }
    });

    calculateCountdown();
    // Update the countdown every second
    const interval = setInterval(calculateCountdown, 1000);

    // Clean up
    onUnmounted(() => clearInterval(interval));
});
</script>
<template>
    <div style="width: 70%; margin: 0 auto">
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <div class="countdown">
            <h3 style="position: absolute; left: 3%; top: 10%; color: #fff">3D Lotto</h3>
            <span>Countdown</span>
            <span class="timer">{{ nextDrawTimeVal }}</span>
        </div>
        <div class="grid mt-2 dec">
            <div class="col-12 lg:col-6 xl:col-6">
                <div class="card games">
                    <div class="" style="margin-top: 10px">
                        <label class="font-semibold w-6rem">Game ID</label>
                        <InputNumber v-model="declareNum.gameID" style="margin-top: 5px" class="w-full" inputId="withoutgrouping" :useGrouping="false" disabled />
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 10px">
                        <div class="" style="margin-top: 10px">
                            <label class="font-semibold">First number</label>
                            <InputNumber v-model="declareNum.firstNum" style="margin-top: 5px" class="w-full" inputId="withoutgrouping" :useGrouping="false" />
                        </div>
                        <div class="" style="margin-top: 10px">
                            <label class="font-semibold">Second number</label>
                            <InputNumber v-model="declareNum.secondNum" style="margin-top: 5px" class="w-full" inputId="withoutgrouping" :useGrouping="false" />
                        </div>
                        <div class="" style="margin-top: 10px">
                            <label class="font-semibold">Third number</label>
                            <InputNumber v-model="declareNum.thirdNum" style="margin-top: 5px" class="w-full" inputId="withoutgrouping" :useGrouping="false" />
                        </div>
                    </div>
                    <div class="mt-3">
                        <Button severity="success" label="DECLARE" class="w-full" :loading="isLoading" @click="declare" />
                        <Button severity="warning" label="RE-DECLARE" class="w-full mt-2" />
                    </div>
                </div>
            </div>
            <div class="col-12 lg:col-6 xl:col-6">
                <div class="card">
                    <div style="display: flex; justify-content: space-between; gap: 10px">
                        <div class="" style="margin-top: 10px; width: 50%">
                            <label class="font-semibold">Multiplier</label>
                            <InputNumber style="margin-top: 5px" class="w-full" inputId="withoutgrouping" :useGrouping="false" />
                        </div>
                        <div class="" style="margin-top: 10px; width: 50%">
                            <label class="font-semibold">Qouta</label>
                            <InputNumber style="margin-top: 5px" class="w-full" inputId="withoutgrouping" :useGrouping="false" />
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 10px">
                        <div class="" style="margin-top: 10px; width: 50%">
                            <label class="font-semibold">Min Bet</label>
                            <InputNumber style="margin-top: 5px" class="w-full" inputId="withoutgrouping" :useGrouping="false" />
                        </div>
                        <div class="" style="margin-top: 10px; width: 50%">
                            <label class="font-semibold">Max Bet</label>
                            <InputNumber style="margin-top: 5px" class="w-full" inputId="withoutgrouping" :useGrouping="false" />
                        </div>
                    </div>
                    <div class="mt-3">
                        <Button severity="primary" label="Save" class="w-full mt-2" />
                    </div>
                </div>
            </div>
            <div class="col-12 lg:col-12 xl:col-12">
                <div class="card">
                    <!-- { id: 2, winComb: '5*1', gameSched: '6PM', betCount: 24, winnerCount: 5, totalBets: 1234, totalWins: 5344, profit: 5445, date: '2023-03-16 12:32:12' } -->
                    <DataTable :value="summary" tableStyle="min-width: 50rem" stripedRows paginator :rows="10">
                        <Column field="id" header="ID"></Column>
                        <Column field="winComb" header="Win Comb."></Column>
                        <Column field="gameSched" header="Game Sched"> </Column>
                        <Column header="Bet Count">
                            <template #body="slotProps">
                                {{ slotProps.data.betCount.toLocaleString() }}
                            </template>
                        </Column>
                        <Column header="Winner Count">
                            <template #body="slotProps">
                                {{ slotProps.data.winnerCount.toLocaleString() }}
                            </template>
                        </Column>
                        <Column header="Total Bets">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.totalBets) }}
                            </template>
                        </Column>
                        <Column header="Total Wins">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.totalWins) }}
                            </template>
                        </Column>
                        <Column header="Profit">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.profit) }}
                            </template>
                        </Column>
                        <Column field="date" header="Date"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.dec .games .p-inputnumber-input {
    width: 125px;
}
.countdown {
    width: 100%;
    height: 250px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: radial-gradient(circle at left top, var(--primary-400), var(--primary-700));
    color: #fff;
    position: relative;
}
.timer {
    font-size: 3rem;
    font-weight: 800;
    margin-top: 20px;
}
</style>
