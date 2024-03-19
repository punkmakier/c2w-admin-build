<script setup>
import { onMounted, ref, reactive } from 'vue';
import { AdminAPIRequest as axios } from '@/plugins/APIServices';
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
};
const chartOptionsDonut = ref({
    chart: {
        type: 'donut'
    },
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    ],
    labels: ['User Success Withdraw', 'User Success Deposit', 'Agent Withdraw'],
    dataLabels: {
        formatter: function (val, opts) {
            // Use opts.seriesIndex to get the index of the current series
            const seriesIndex = opts.seriesIndex;

            // Access the corresponding data value from seriesDonut
            const dataValue = seriesDonut.value[seriesIndex];

            // Format the data value with commas
            return '₱ ' + dataValue.toLocaleString();
        }
    }
});
const store = JSON.parse(localStorage.getItem('auth.admin'));
const storeMonitor = ref();
const seriesDonut = ref();
const dataPass = { username: store.username, token: store.token };
const balanceProvider = reactive({
    toppay: 0,
    hpay: 0,
    pagar: 0,
    copo: 0,
    total: 0
});
const adminMonitoring = async () => {
    console.log(dataPass);
    const res = await axios.postAdminMonitoring(dataPass);
    storeMonitor.value = res;
    seriesDonut.value = [res.successWithdraw, res.successDeposit, res.agentSuccessWithdraw];
    balanceProvider.toppay = res.toppay;
    balanceProvider.hpay = res.hpay;
    balanceProvider.pagar = res.pagar;
    balanceProvider.copo = res.copo;
    balanceProvider.total = res.total;
    console.log(storeMonitor.value);
    console.log(balanceProvider);
};

onMounted(() => {
    adminMonitoring();
});
</script>

<template>
    <div class="col-12 lg:col-6 xl:col-4" v-if="balanceProvider">
        <div class="card mb-2 bg-random" style="padding-bottom: 38px">
            <div style="display: flex; justify-content: space-between">
                <div class="card-custom" style="display: flex; flex-direction: column">
                    <b style="font-size: 0.8rem">TOPPAY BALANCE</b><b style="text-align: center; margin-top: 10px; font-size: 1.4rem">{{ formatCurrency(balanceProvider.toppay) }}</b>
                </div>
                <div class="card-custom" style="display: flex; flex-direction: column">
                    <b style="font-size: 0.8rem">HPAY BALANCE</b><b style="text-align: center; margin-top: 10px; font-size: 1.4rem">{{ formatCurrency(balanceProvider.hpay) }}</b>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 10px">
                <div class="card-custom" style="display: flex; flex-direction: column">
                    <b style="font-size: 0.8rem">PAGARSTAR BALANCE</b><b style="text-align: center; margin-top: 10px; font-size: 1.4rem">{{ formatCurrency(balanceProvider.pagar) }}</b>
                </div>
                <div class="card-custom" style="display: flex; flex-direction: column">
                    <b style="font-size: 0.8rem">COPO BALANCE</b><b style="text-align: center; margin-top: 10px; font-size: 1.4rem">{{ formatCurrency(balanceProvider.copo) }}</b>
                </div>
            </div>
            <div class="mt-5 text-white" style="text-align: center">
                <span style="font-size: 1.3rem; font-weight: 600">Total</span><br /><br />
                <span style="font-size: 2rem; font-weight: 600">{{ formatCurrency(balanceProvider.total) }}</span>
            </div>
        </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-4" v-if="storeMonitor">
        <div class="card mb-2 bg-skyblue" style="height: 159px">
            <div class="flex justify-content-between">
                <div>
                    <span class="block text-500 font-medium text-white"><b>Total Accounts</b></span>
                </div>
                <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                </div>
            </div>
            <div class="text-center mt-2 text-white">
                <span style="font-size: 2rem; font-weight: 600">{{ storeMonitor.playerCount.toLocaleString() }}</span>
            </div>
        </div>
        <div class="card mb-2 bg-yellow1" style="height: 159px">
            <div class="flex justify-content-between">
                <div>
                    <span class="block text-500 font-medium text-white"><b>Total Player Balance</b></span>
                </div>
                <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                </div>
            </div>
            <div class="text-center mt-2 text-white">
                <span style="font-size: 2rem; font-weight: 600">{{ formatCurrency(storeMonitor.playerBalance) }}</span>
            </div>
        </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-4" v-if="seriesDonut">
        <div class="card mb-0">
            <div class="flex justify-content-between mb-3">
                <div>
                    <span class="block text-500 font-medium mb-3"><b>Users & Agents (Success Deposit & Withdraw)</b></span>
                </div>
                <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                </div>
            </div>
            <apexchart type="donut" :options="chartOptionsDonut" :series="seriesDonut" height="360" />
        </div>
    </div>

    <div class="col-12 lg:col-6 xl:col-4" v-if="storeMonitor">
        <div class="card mb-2 bg-blue" style="height: 159px">
            <div class="flex justify-content-between">
                <div>
                    <span class="block text-500 font-medium text-white"><b>Total Agents</b></span>
                </div>
                <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                </div>
            </div>
            <div class="text-center mt-2 text-white">
                <span style="font-size: 2rem; font-weight: 600">{{ storeMonitor.agentCount.toLocaleString() }}</span>
            </div>
        </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
        <div class="card mb-2 bg-green" style="height: 159px">
            <div class="flex justify-content-between">
                <div>
                    <span class="block text-500 font-medium text-white"><b>CASINO PLAYER (ONLINE)</b></span>
                </div>
                <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                </div>
            </div>
            <div class="text-center mt-2 text-white"><span style="font-size: 2rem; font-weight: 600">123</span></div>
        </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
        <div class="card mb-2 bg-red" style="height: 159px">
            <div class="flex justify-content-between">
                <div>
                    <span class="block text-500 font-medium text-white"
                        ><b>SABONG BET (<span style="color: red">MERON</span>/<span style="color: blue">WALA</span>)</b></span
                    >
                </div>
                <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                    <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                </div>
            </div>
            <div class="text-center mt-2 text-white"><span style="font-size: 2rem; font-weight: 600">123 / 123</span></div>
        </div>
    </div>
</template>
