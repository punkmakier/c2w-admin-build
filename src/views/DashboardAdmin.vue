<script setup>
import { onMounted, ref, reactive } from 'vue';
import { AdminAPIRequest as axios } from '@/plugins/APIServices';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
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
const optionsTypeRequest = ref([]);

const store = JSON.parse(localStorage.getItem('auth.admin'));
const storeMonitor = ref();
const seriesDonut = ref();
const confirm = useConfirm();
const toast = useToast();
const dataPass = { username: store[0].username, token: store[0].token };
const balanceProvider = reactive({
    toppay: 0,
    hpay: 0,
    pagarstar: 0,
    copo: 0,
    total: 0
});

const availablePaymentsProvider = ref();
const totalAvailablePaymentsProvider = ref();

const adminMonitoring = async () => {
    const res = await axios.postAdminMonitoring(dataPass);
    storeMonitor.value = res;
    seriesDonut.value = [res.successWithdraw, res.successDeposit, res.agentSuccessWithdraw];
    balanceProvider.toppay = res.toppay;
    balanceProvider.hpay = res.hpay;
    balanceProvider.pagarstar = res.pagar;
    balanceProvider.copo = res.copo;
    balanceProvider.total = res.total;
};

const userWithdrawalRequest = ref();
const agentWithdrawalRequest = ref();
const withdrawalRequest = async () => {
    const res = await axios.postUserReqWithdrawal(dataPass);
    userWithdrawalRequest.value = res.user_withdraw;
    agentWithdrawalRequest.value = res.agent_withdraw;
};

const selectAction = (id, amnt, type) => {
    console.log(id + ' ' + amnt);
    const avail = availablePaymentsProvider.value.filter((item) => item.runningBalance >= amnt || (item.maxWithdrawal <= amnt && item.isWithdrawable == 1));
    const updatedPayment = avail.map((item) => ({ ...item, id: id, type: type }));
    optionsTypeRequest.value = updatedPayment;
};
const selectedActionValue = (event) => {
    console.log();
    confirm.require({
        group: 'headless',
        header: 'Are you sure?',
        message: 'Please confirm to process the payment',
        accept: async () => {
            const passData = { ...dataPass, providerID: event.value.providerID, id: event.value.id };
            try {
                const res = event.value.type === 'user' ? await axios.approveUserWithdrawal(passData) : await axios.approveAgentWithdrawal(passData);
                if (res.error === 1) {
                    toast.add({ severity: 'error', summary: 'Transaction Failed', detail: res.description, life: 5000 });
                } else if (res.resStatus === 0) {
                    toast.add({ severity: 'success', summary: 'Success', detail: 'Transaction request has been completed.', life: 5000 });
                }
            } catch (e) {
                toast.add({ severity: 'error', summary: 'Transaction Failed', detail: e, life: 5000 });
            }
        }
    });
};

const getPaymentGateway = async () => {
    const res = await axios.getPaymentGateway(dataPass);
    if (res.resStatus === 0) {
        const totalInitialBalance = res.data.reduce((accumulator, currentValue) => accumulator + currentValue.runningBalance, 0);
        totalAvailablePaymentsProvider.value = totalInitialBalance;
        availablePaymentsProvider.value = res.data;
    }
};

onMounted(() => {
    adminMonitoring();
    withdrawalRequest();
    getPaymentGateway();
    setInterval(() => {
        adminMonitoring();
    }, 30000);
});
</script>

<template>
    <div class="grid">
        <Toast />
        <ConfirmDialog group="headless" class="w-25rem">
            <template #container="{ message, acceptCallback, rejectCallback }">
                <div class="flex flex-column align-items-center p-5 surface-overlay border-round">
                    <div class="border-circle bg-primary inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8">
                        <i class="pi pi-question text-5xl"></i>
                    </div>
                    <span class="font-bold text-2xl block mb-2 mt-4">{{ message.header }}</span>
                    <p class="mb-0">{{ message.message }}</p>
                    <div class="flex align-items-center gap-2 mt-4">
                        <Button label="Confirm" @click="acceptCallback"></Button>
                        <Button label="Cancel" outlined @click="rejectCallback"></Button>
                    </div>
                </div>
            </template>
        </ConfirmDialog>
        <div class="col-12 lg:col-6 xl:col-8">
            <div class="card mb-2 bg-random" style="padding-bottom: 38px" v-if="availablePaymentsProvider">
                <div style="display: flex; flex-wrap: wrap; gap: 10px">
                    <div class="card-custom" style="display: flex; flex-direction: column" v-for="(data, index) in availablePaymentsProvider" :key="index">
                        <b style="font-size: 0.8rem">{{ data.name }}</b
                        ><b style="text-align: center; margin-top: 10px; font-size: 1.4rem">{{ formatCurrency(data.runningBalance) }}</b>
                    </div>
                </div>

                <div class="mt-5 text-white" style="text-align: center">
                    <span style="font-size: 1.3rem; font-weight: 600">Total</span><br /><br />
                    <span style="font-size: 2rem; font-weight: 600">{{ formatCurrency(totalAvailablePaymentsProvider) }}</span>
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
        <div class="col-12 lg:col-6 xl:col-3" v-if="storeMonitor">
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
        </div>
        <div class="col-12 lg:col-6 xl:col-3" v-if="storeMonitor">
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
        <div class="col-12 lg:col-6 xl:col-2" v-if="storeMonitor">
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
        <div class="col-12 lg:col-6 xl:col-2" v-if="storeMonitor">
            <div class="card mb-2 bg-green" style="height: 159px">
                <div class="flex justify-content-between">
                    <div>
                        <span class="block text-500 font-medium text-white"><b>PLAYER (ONLINE)</b></span>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                    </div>
                </div>
                <div class="text-center mt-2 text-white">
                    <span style="font-size: 2rem; font-weight: 600">{{ storeMonitor.isOnline.toLocaleString() }}</span>
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-2" v-if="storeMonitor">
            <div class="card mb-2 bg-blue" style="height: 159px">
                <div class="flex justify-content-between">
                    <div>
                        <span class="block text-500 font-medium text-white"><b>PLAYER (IDLE)</b></span>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                    </div>
                </div>
                <div class="text-center mt-2 text-white">
                    <span style="font-size: 2rem; font-weight: 600">{{ storeMonitor.isIdle.toLocaleString() }}</span>
                </div>
            </div>
        </div>
        <!-- <div class="col-12 lg:col-6 xl:col-3">
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
        </div> -->

        <div class="col-12">
            <div class="card mb-2" style="minx-height: 159px; height: auto">
                <div class="flex justify-content-between">
                    <div>
                        <span class="block text-500 font-medium"><b>User Withdrawal Request</b></span>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                    </div>
                </div>
                <div class="mt-3">
                    <DataTable :value="userWithdrawalRequest" tableStyle="min-width: 50rem" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
                        <Column field="orderID" header="ORDER ID">
                            <template #body="slotProps">
                                {{ slotProps.data.orderID }}
                            </template>
                        </Column>
                        <Column field="category" header="Username">
                            <template #body="slotProps">
                                {{ slotProps.data.username }}
                            </template></Column
                        >
                        <Column field="quantity" header="Method">
                            <template #body="slotProps">
                                {{ slotProps.data.method }}
                            </template></Column
                        >
                        <Column field="accountNumber" header="Account Number">
                            <template #body="slotProps">
                                {{ slotProps.data.accountNumber }}
                            </template></Column
                        >
                        <Column field="accountName" header="Account Name">
                            <template #body="slotProps">
                                {{ slotProps.data.accountName }}
                            </template></Column
                        >
                        <Column field="quantity" header="Amount"
                            ><template #body="slotProps">
                                {{ formatCurrency(slotProps.data.amount) }}
                            </template></Column
                        >
                        <Column field="quantity" header="Date">
                            <template #body="slotProps">
                                {{ slotProps.data.date }}
                            </template></Column
                        >
                        <Column field="quantity" header="Action">
                            <template #body="slotProps">
                                <Dropdown :options="optionsTypeRequest" @click="selectAction(slotProps.data.id, slotProps.data.amount, 'user')" @change="selectedActionValue" optionLabel="name" placeholder="Select Payment" class="w-full md:w-14rem" />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="card mb-2" style="min-height: 159px; height: auto">
                <div class="flex justify-content-between">
                    <div>
                        <span class="block text-500 font-medium"><b>Agent Withdrawal Request</b></span>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                    </div>
                </div>
                <div class="mt-3">
                    <DataTable :value="agentWithdrawalRequest" tableStyle="min-width: 50rem" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]">
                        <Column field="orderID" header="ORDER ID">
                            <template #body="slotProps">
                                {{ slotProps.data.orderID }}
                            </template>
                        </Column>
                        <Column field="category" header="Username">
                            <template #body="slotProps">
                                {{ slotProps.data.username }}
                            </template></Column
                        >
                        <Column field="method" header="Method">
                            <template #body="slotProps">
                                {{ slotProps.data.method }}
                            </template></Column
                        >
                        <Column field="accountNumber" header="Account Number">
                            <template #body="slotProps">
                                {{ slotProps.data.accountNumber }}
                            </template></Column
                        >
                        <Column field="accountName" header="Account Name">
                            <template #body="slotProps">
                                {{ slotProps.data.accountName }}
                            </template></Column
                        >
                        <Column field="amount" header="Amount"
                            ><template #body="slotProps">
                                {{ formatCurrency(slotProps.data.amount) }}
                            </template></Column
                        >
                        <Column field="date" header="Date">
                            <template #body="slotProps">
                                {{ slotProps.data.date }}
                            </template></Column
                        >
                        <Column field="quantity" header="Action">
                            <template #body="slotProps">
                                <Dropdown
                                    :options="optionsTypeRequest"
                                    @click="selectAction(slotProps.data.id, slotProps.data.amount, 'agent')"
                                    @change="selectedActionValue"
                                    optionLabel="name"
                                    placeholder="Select Payment"
                                    class="w-full md:w-14rem"
                                />
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.card-custom {
    background-color: rgb(255, 255, 255);
    padding: 10px;
    border-radius: 5px;
    width: 48%;
    border: 1px solid rgb(235, 235, 235);
}

.bg-blue {
    background: rgb(45, 220, 253);
    background: -moz-linear-gradient(209deg, rgba(45, 220, 253, 1) 0%, rgba(34, 70, 195, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(45, 220, 253, 1) 0%, rgba(34, 70, 195, 1) 100%);
    background: linear-gradient(209deg, rgba(45, 220, 253, 1) 0%, rgba(34, 70, 195, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2ddcfd",endColorstr="#2246c3",GradientType=1);
}
.bg-green {
    background: rgb(45, 253, 142);
    background: -moz-linear-gradient(209deg, rgba(45, 253, 142, 1) 0%, rgba(70, 195, 34, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(45, 253, 142, 1) 0%, rgba(70, 195, 34, 1) 100%);
    background: linear-gradient(209deg, rgba(45, 253, 142, 1) 0%, rgba(70, 195, 34, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2dfd8e",endColorstr="#46c322",GradientType=1);
}
.bg-red {
    background: rgb(253, 121, 45);
    background: -moz-linear-gradient(209deg, rgba(253, 121, 45, 1) 0%, rgba(195, 34, 34, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(253, 121, 45, 1) 0%, rgba(195, 34, 34, 1) 100%);
    background: linear-gradient(209deg, rgba(253, 121, 45, 1) 0%, rgba(195, 34, 34, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fd792d",endColorstr="#c32222",GradientType=1);
}
.bg-random {
    background: rgb(255, 134, 20);
    background: -moz-linear-gradient(52deg, rgba(255, 134, 20, 1) 0%, rgba(246, 255, 20, 1) 48%, rgba(253, 45, 70, 1) 79%, rgba(253, 45, 45, 1) 100%);
    background: -webkit-linear-gradient(52deg, rgba(255, 134, 20, 1) 0%, rgba(246, 255, 20, 1) 48%, rgba(253, 45, 70, 1) 79%, rgba(253, 45, 45, 1) 100%);
    background: linear-gradient(52deg, rgba(255, 134, 20, 1) 0%, rgba(246, 255, 20, 1) 48%, rgba(253, 45, 70, 1) 79%, rgba(253, 45, 45, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff8614",endColorstr="#fd2d2d",GradientType=1);
}
.bg-skyblue {
    background: rgb(45, 245, 253);
    background: -moz-linear-gradient(209deg, rgba(45, 245, 253, 1) 0%, rgba(34, 195, 191, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(45, 245, 253, 1) 0%, rgba(34, 195, 191, 1) 100%);
    background: linear-gradient(209deg, rgba(45, 245, 253, 1) 0%, rgba(34, 195, 191, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2df5fd",endColorstr="#22c3bf",GradientType=1);
}
.bg-yellow1 {
    background: rgb(252, 253, 45);
    background: -moz-linear-gradient(209deg, rgba(252, 253, 45, 1) 0%, rgba(194, 195, 34, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(252, 253, 45, 1) 0%, rgba(194, 195, 34, 1) 100%);
    background: linear-gradient(209deg, rgba(252, 253, 45, 1) 0%, rgba(194, 195, 34, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fcfd2d",endColorstr="#c2c322",GradientType=1);
}
.text-white {
    color: #fff !important;
    text-shadow: 0 0 3px #000;
}
</style>
