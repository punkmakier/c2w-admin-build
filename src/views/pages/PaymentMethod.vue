<script setup>
import { ref, onMounted, reactive } from 'vue';
import { AdminAPIRequest as axios } from '@/plugins/APIServices';
import { useToast } from 'primevue/usetoast';
const visible = ref(false);
const providerNameList = ref();
const paymentList = ref();
const isLoading = ref(false);
const toast = useToast();
const modalTypeText = ref('Add');

const paymentType = ref([
    { name: 'Withdraw', code: 'Withdraw' },
    { name: 'Deposit', code: 'Deposit' }
]);
const store = JSON.parse(localStorage.getItem('auth.admin'));
const passData = { username: store[0].username, token: store[0].token };
const addState = reactive({
    id: null,
    isEnabled: null,
    providerName: '',
    methodName: '',
    methodID: '',
    Channel: '',
    paymentType: '',
    merchantFee: '',
    serviceFee: ''
});

const addPaymenMethod = async () => {
    isLoading.value = true;
    const evaluateData = {
        providerName: addState.providerName.name,
        providerID: addState.providerName.id,
        methodName: addState.methodName,
        methodID: addState.methodID,
        channel: addState.Channel,
        paymentType: addState.paymentType.name,
        merchantFee: addState.merchantFee,
        serviceFee: addState.serviceFee,
        ...passData
    };
    const res = await axios.postAddPaymentMethod(evaluateData);
    if (res.resStatus === 0) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'New payment method has been successfully added.', life: 5000 });
        addState.providerName = '';
        addState.methodName = '';
        addState.methodID = '';
        addState.Channel = '';
        addState.paymentType = '';
        addState.merchantFee = '';
        addState.serviceFee = '';
        visible.value = false;
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: res.resMessage, life: 5000 });
    }
    isLoading.value = false;
};

const updatePaymentMethod = async () => {
    isLoading.value = true;
    const evaluateData = {
        id: addState.id,
        isEnable: addState.isEnabled,
        providerName: addState.providerName.name,
        providerID: addState.providerName.id,
        methodName: addState.methodName,
        methodID: addState.methodID,
        channel: addState.Channel,
        paymentType: addState.paymentType.name,
        merchantFee: addState.merchantFee,
        serviceFee: addState.serviceFee,
        ...passData
    };
    const res = await axios.postUpdatePaymentMethod(evaluateData);
    if (res && res.resStatus === 0) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Payment Method has been successfully updated.', life: 5000 });
        addState.providerName = '';
        addState.methodName = '';
        addState.methodID = '';
        addState.Channel = '';
        addState.paymentType = '';
        addState.merchantFee = '';
        addState.serviceFee = '';
        visible.value = false;
    } else if (res && res.resStatus === 1) {
        toast.add({ severity: 'error', summary: 'Error', detail: res.resMessage, life: 5000 });
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong...', life: 5000 });
    }

    isLoading.value = false;
};

onMounted(async () => {
    const res = await axios.postGetPaymentMethods(passData);
    providerNameList.value = res.data;
    const list = await axios.showAllPaymentMethod(passData);
    console.log(list);
    paymentList.value = list;
});

const editPayment = (id) => {
    modalTypeText.value = 'Edit';
    const res = paymentList.value.filter((item) => item.id == id);
    console.log(res);
    const res1 = providerNameList.value.filter((item) => item.id == res[0].providerID);
    addState.providerName = res1[0];
    addState.methodName = res[0].method;
    addState.methodID = res[0].methodID;
    addState.Channel = res[0].channel;
    addState.paymentType = res[0].isWithdraw === 1 ? { name: 'Withdraw', code: 'Withdraw' } : { name: 'Deposit', code: 'Deposit' };
    addState.merchantFee = res[0].merchantFee.split('%')[0];
    addState.serviceFee = res[0].serviceFee;
    addState.isEnabled = res[0].isEnable;
    addState.id = res[0].id;
    visible.value = true;
};
</script>

<template>
    <div className="card">
        <Toast />
        <h4>Payment Method</h4>
        <Button label="Add Payment Method" class="mb-5" @click="visible = true" />
        <DataTable :value="paymentList" :rows="10" :paginator="true" responsiveLayout="scroll">
            <Column style="width: 7%" :sortable="true" field="username" header="Prov. ID">
                <template #body="slotProps">
                    {{ slotProps.data.providerID }}
                </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="username" header="Provider Name">
                <template #body="slotProps">
                    {{ slotProps.data.providerName }}
                </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="mobile" header="Method Name">
                <template #body="slotProps">
                    {{ slotProps.data.method }}
                </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="mobile" header="Method ID">
                <template #body="slotProps">
                    {{ slotProps.data.methodID }}
                </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="mobile" header="Channel">
                <template #body="slotProps">
                    {{ slotProps.data.channel }}
                </template>
            </Column>

            <Column style="width: 10%" :sortable="true" field="country" header="isEnable">
                <template #body="slotProps">
                    {{ slotProps.data.isEnable }}
                </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="country" header="Payment Type">
                <template #body="slotProps">
                    {{ slotProps.data.isWithdraw === 1 ? 'Withdraw' : 'Deposit' }}
                </template>
            </Column>

            <Column style="width: 10%" :sortable="true" field="country" header="Merchant Fee">
                <template #body="slotProps">
                    {{ slotProps.data.merchantFee }}
                </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="gameCredit" header="Service Fee">
                <template #body="slotProps">
                    {{ slotProps.data.serviceFee }}
                </template>
            </Column>

            <Column style="width: 10%" :sortable="true" field="completeName" header="Action">
                <template #body="slotProps">
                    <Button label="Edit" icon="pi pi-pencil" style="margin-right: 15px" @click="editPayment(slotProps.data.id)" />
                    <!-- <Button icon="pi pi-trash" style="background-color: var(--red-500); border: 1px solid var(--red-500)" @click="deletePayment(slotProps.data.id)" /> -->
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="visible" modal :header="`${modalTypeText} Payment Method`" :style="{ width: '40rem' }" :draggable="false">
            <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 20px">
                <label for="username" class="font-semibold">Provider Name</label>
                <Dropdown v-model="addState.providerName" :options="providerNameList" optionLabel="name" placeholder="Select" class="w-full" />
            </div>
            <div style="display: flex; gap: 10px">
                <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 20px">
                    <label for="username" class="font-semibold">Method Name</label>
                    <InputText v-model="addState.methodName" id="username" class="w-full" autocomplete="off" />
                </div>
                <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 20px">
                    <label for="username" class="font-semibold">Method ID</label>
                    <InputText v-model="addState.methodID" id="username" class="w-full" autocomplete="off" />
                </div>
                <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 20px">
                    <label for="username" class="font-semibold">Channel</label>
                    <InputText v-model="addState.Channel" id="username" class="w-full" autocomplete="off" />
                </div>
            </div>
            <div style="display: flex; gap: 10px">
                <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 20px" :style="{ width: modalTypeText === 'Edit' ? '50%' : '100%' }">
                    <label for="username" class="font-semibold">Payment Type</label>
                    <Dropdown v-model="addState.paymentType" :options="paymentType" optionLabel="name" placeholder="Select" class="w-full" />
                </div>
                <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 20px; width: 50%" v-if="modalTypeText === 'Edit'">
                    <label for="username" class="font-semibold">IsEnabled</label>
                    <InputText v-model="addState.isEnabled" id="username" class="w-full" autocomplete="off" />
                </div>
            </div>

            <div style="display: flex; gap: 10px">
                <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 20px; width: 50%">
                    <label for="username" class="font-semibold">Merchant Fee</label>
                    <InputNumber v-model="addState.merchantFee" inputId="percent" :minFractionDigits="2" :min="0" suffix="%" />
                </div>
                <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 20px; width: 50%">
                    <label for="username" class="font-semibold">Service Fee</label>
                    <InputNumber v-model="addState.serviceFee" inputId="percent" :minFractionDigits="2" :min="0" />
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" text @click="visible = false" autofocus />
                <Button label="Submit" class="bg-primary" @click="modalTypeText === 'Add' ? addPaymenMethod() : updatePaymentMethod()" outlined :loading="isLoading" />
            </template>
        </Dialog>
    </div>
</template>
