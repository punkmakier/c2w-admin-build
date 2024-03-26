<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { required, helpers, maxLength, minLength } from '@vuelidate/validators';
import useValidate from '@vuelidate/core';
import { AdminAPIRequest as axios } from '@/plugins/APIServices';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode } from 'primevue/api';
const visible = ref(false);
const dataHandler = ref();
const store = JSON.parse(localStorage.getItem('auth.admin'));
const modalText = ref('Add');
const isLoading = ref(false);
const addState = reactive({
    selectedGGR: { name: '40%', code: '40' },
    selectedVTO: { name: '0.001', code: '0.001' },
    fname: '',
    lname: '',
    password: '123456',
    username: ''
});

const ggrOptions = [
    { name: '0%', code: '0' },
    { name: '5%', code: '5' },
    { name: '10%', code: '10' },
    { name: '15%', code: '15' },
    { name: '20%', code: '20' },
    { name: '25%', code: '25' },
    { name: '30%', code: '30' },
    { name: '35%', code: '35' },
    { name: '40%', code: '40' }
];
const vtoOptions = [
    { name: '0.001', code: '0.001' },
    { name: '0.002', code: '0.002' }
];
const toast = useToast();
const specialCharacterChecking = (value) => /^[a-zA-Z0-9]+$/.test(value);
const changeErrorMessage = (value, handleValue) => {
    if (value.includes('Value')) {
        return value.replace('Value', handleValue);
    } else {
        return value;
    }
};

const passData1 = { username: store[0].username, token: store[0].token };
onMounted(async () => {
    const res = await axios.showAllAgents(passData1);
    if (res.resStatus === 0) {
        dataHandler.value = res.data;
    } else {
        alert(res.resMsg);
    }
});

const rules = computed(() => {
    return {
        username: {
            required,
            specialCharacterChecking: helpers.withMessage('This field does not allow special characters', specialCharacterChecking),
            minLengthValue: minLength(3),
            maxLengthValue: maxLength(15)
        },
        lname: {
            required,
            minLengthValue: minLength(3),
            maxLengthValue: maxLength(30),
            specialCharacterChecking: helpers.withMessage('This field does not allow special characters', specialCharacterChecking)
        },
        fname: {
            required,
            minLengthValue: minLength(3),
            maxLengthValue: maxLength(30),
            specialCharacterChecking: helpers.withMessage('This field does not allow special characters', specialCharacterChecking)
        }
    };
});

const v$ = useValidate(rules, addState);

const addAgent = async () => {
    isLoading.value = true;

    v$.value.$validate();
    if (!v$.value.$error) {
        const passData = {
            selectedGGR: addState.selectedGGR.code,
            selectedVTO: addState.selectedVTO.code,
            fname: addState.fname.trim(),
            lname: addState.lname.trim(),
            password: '123456',
            agent_username: addState.username.trim(),
            ...passData1
        };

        const res = await axios.postAddAgent(passData);
        if (res.resStatus === 0) {
            toast.add({ severity: 'success', summary: 'Success', detail: 'New agent has been added successfully', life: 5000 });
            visible.value = false;
        } else {
            toast.add({ severity: 'error', summary: 'Failed', detail: res.resMsg, life: 5000 });
        }
        isLoading.value = false;
    }
    isLoading.value = false;
};

const formatStatus = (value) => {
    switch (value) {
        case 0:
            return 'Active';
        case 1:
            return 'Inactive';
        default:
            return 'Unknown';
    }
};

const editAction = (value) => {
    console.log(value);
    modalText.value = 'Edit';
    const res = dataHandler.value.filter((item) => item.id === value);
    console.log(res);
    addState.selectedGGR = { name: res[0].overallComGGR.toString() + '%', code: res[0].overallComGGR.toString() };
    addState.selectedVTO = { name: res[0].vtoComm.toString(), code: res[0].vtoComm.toString() };
    addState.fname = res[0].completeName.split(' ')[0];
    addState.lname = res[0].completeName.split(' ')[1];
    addState.username = res[0].username;
    addState.id = res[0].id;
    addState.isActive = res[0].status.toString();
    visible.value = true;
};

const updateAgent = async () => {
    isLoading.value = true;
    v$.value.$validate();
    if (!v$.value.$error) {
        const passData = {
            id: addState.id,
            selectedGGR: addState.selectedGGR.code,
            selectedVTO: addState.selectedVTO.code,
            isActive: addState.isActive,
            fname: addState.fname.trim(),
            lname: addState.lname.trim(),
            ...passData1
        };

        const res = await axios.postUpdateAgent(passData);
        if (res.resStatus === 0) {
            toast.add({ severity: 'success', summary: 'Success', detail: 'New agent has been updated successfully', life: 5000 });
            visible.value = false;
        } else {
            toast.add({ severity: 'error', summary: 'Failed', detail: res.resMsg, life: 5000 });
        }
        isLoading.value = false;
    }
    isLoading.value = false;
};

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const openModal = () => {
    visible.value = true;
    modalText.value = 'Add';

    addState.selectedGGR = null;
    addState.selectedVTO = null;
    addState.fname = '';
    addState.lname = '';
    addState.username = '';
};
</script>

<template>
    <div className="card">
        <Toast />
        <h4>Agent List</h4>

        <Button label="Add Agent" class="mb-5" @click="openModal" />
        <DataTable
            v-model:filters="filters"
            :globalFilterFields="['completeName', 'overallComGGR', 'vtoComm', 'status', 'date']"
            :value="dataHandler"
            stripedRows
            :rowsPerPageOptions="[5, 10, 20, 50]"
            :rows="10"
            :paginator="true"
            responsiveLayout="scroll"
        >
            <template #header>
                <div class="flex justify-content-end">
                    <IconField iconPosition="right">
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
            <Column style="width: 20%" :sortable="true" field="completeName" header="Complete Name">
                <template #body="slotProps">
                    {{ slotProps.data.completeName }}
                </template>
            </Column>
            <Column style="width: 15%" :sortable="true" field="username" header="Username"> </Column>
            <Column style="width: 15%" :sortable="true" field="email" header="Email">
                <!-- <template #body="slotProps"> {{ slotProps.data.overallComGGR }}% </template> -->
                <template #body="slotProps"> {{ slotProps.data.email }}% </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="is_online" header="Online Status">
                <!-- <template #body="slotProps"> {{ slotProps.data.vtoComm }}% </template> -->
                <template #body="slotProps"> {{ slotProps.data.is_online }} </template>
            </Column>

            <Column style="width: 10%" :sortable="true" field="status" header="Status">
                <template #body="slotProps">
                    {{ formatStatus(slotProps.data.status) }}
                </template>
            </Column>
            <Column style="width: 15%" :sortable="true" field="date" header="Date Registered"> </Column>
            <Column style="width: 15%" header="Action">
                <template #body="slotProps">
                    <Button label="Edit" icon="pi pi-pencil" @click="editAction(slotProps.data.id)" />
                    <!-- <Button label="Delete" /> -->
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="visible" modal :header="`${modalText} Agent`" :style="{ width: '35rem' }" :draggable="false">
            <div style="display: flex; gap: 10px; margin-top: 20px">
                <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 20px">
                    <label for="username" class="font-semibold">First Name <small style="color: var(--red-400)">*</small></label>
                    <InputText v-model="addState.fname" id="username" class="w-full" autocomplete="off" />
                    <small style="color: var(--red-400)" v-if="v$.fname.$error">{{ changeErrorMessage(v$.fname.$errors[0].$message, 'First Name') }}</small>
                </div>
                <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 20px">
                    <label for="username" class="font-semibold">Last Name <small style="color: var(--red-400)">*</small></label>
                    <InputText v-model="addState.lname" id="username" class="w-full" autocomplete="off" />
                    <small style="color: var(--red-400)" v-if="v$.lname.$error">{{ changeErrorMessage(v$.lname.$errors[0].$message, 'Last Name') }}</small>
                </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 20px">
                <label for="username" class="font-semibold">Username <small style="color: var(--red-400)">*</small></label>
                <InputText v-model="addState.username" id="username" class="w-full" autocomplete="off" :disabled="modalText == 'Add' ? false : true" />
                <small style="color: var(--red-400)" v-if="v$.username.$error">{{ changeErrorMessage(v$.username.$errors[0].$message, 'Username') }}</small>
            </div>
            <div class="flex align-items-center gap-3 mb-5" v-if="modalText == 'Edit'">
                <label class="font-semibold w-6rem">Status</label>
                <div class="flex flex-wrap gap-3">
                    <div class="flex align-items-center">
                        <RadioButton v-model="addState.isActive" inputId="ingredient1" name="pizza" value="0" />
                        <label for="ingredient1" class="ml-2">Active</label>
                    </div>
                    <div class="flex align-items-center">
                        <RadioButton v-model="addState.isActive" inputId="ingredient2" name="pizza" value="1" />
                        <label for="ingredient2" class="ml-2">Inactive</label>
                    </div>
                </div>
            </div>
            <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 20px" v-if="modalText == 'Add'">
                <label for="username" class="font-semibold">Default Password</label>
                <InputText v-model="addState.password" id="username" class="w-full" autocomplete="off" readonly />
            </div>
            <div style="display: flex; gap: 10px; margin-top: 20px">
                <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 20px; width: 50%">
                    <label for="username" class="font-semibold">GGR % <small>(Gross Gaming Revenue)</small></label>
                    <Dropdown v-model="addState.selectedGGR" :options="ggrOptions" optionLabel="name" placeholder="Select" class="w-full" />
                </div>
                <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 20px; width: 50%">
                    <label for="username" class="font-semibold">VTO % <small>(Valid Turn Over)</small></label>
                    <Dropdown v-model="addState.selectedVTO" :options="vtoOptions" optionLabel="name" placeholder="Select" class="w-full" />
                </div>
            </div>

            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                <Button :loading="isLoading" type="button" :label="modalText == 'Add' ? 'Submit' : 'Update'" :severity="modalText == 'Add' ? 'primary' : 'warning'" @click="modalText == 'Add' ? addAgent() : updateAgent()"></Button>
            </div>
        </Dialog>
    </div>
</template>
