<script setup>
import { ref, onMounted, reactive } from 'vue';
import { AdminAPIRequest as axios } from '@/plugins/APIServices';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const dataHandler = ref();
const showDialog = ref(false);
const showLoading = ref(false);
const store = JSON.parse(localStorage.getItem('auth.admin'));

const stateUser = reactive({
    userID: '',
    agentID: '',
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    user_username: '',
    isBan: false
});
onMounted(async () => {
    const passData = { username: store[0].username, token: store[0].token };
    const res = await axios.postGetAllUsers(passData);
    dataHandler.value = res.data;
});
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
};
const formatStatus = (value) => {
    if (value === 0) {
        return 'Active';
    } else {
        return 'Inactive';
    }
};

const editUser = (value) => {
    showDialog.value = true;
    const res = dataHandler.value.filter((item) => item.userid === value);
    console.log(res);

    stateUser.userID = res[0].userid;
    stateUser.agentID = res[0].agentID;
    stateUser.firstName = res[0].fname;
    stateUser.lastName = res[0].lname;
    stateUser.mobile = res[0].mobile;
    stateUser.email = res[0].email;
    stateUser.user_username = res[0].username;
    stateUser.isBan = res[0].accountStatus == 0 ? false : true;
};
const saveChanges = async () => {
    showLoading.value = true;
    const dataPass = { username: store.username, token: store.token, ...stateUser };
    const res = await axios.postUpdateUsers(dataPass);
    if (res.resStatus === 0) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Updated Successfully', life: 3000 });
        showLoading.value = false;
    } else {
        showLoading.value = false;
        toast.add({ severity: 'error', summary: 'Error', detail: res.resMsg, life: 3000 });
    }
    showDialog.value = false;
};
</script>

<template>
    <div className="card">
        <Toast />
        <h4>User Accounts</h4>
        <DataTable :value="dataHandler" :rows="10" :paginator="true" responsiveLayout="scroll">
            <Column style="width: 10%" :sortable="true" field="username" header="Username">
                <template #body="slotProps">
                    {{ slotProps.data.username }}
                </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="mobile" header="Mobile">
                <template #body="slotProps">
                    {{ slotProps.data.mobile }}
                </template>
            </Column>
            <Column style="width: 15%" :sortable="true" field="email" header="Email">
                <template #body="slotProps">
                    {{ slotProps.data.email }}
                </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="country" header="Country">
                <template #body="slotProps">
                    {{ slotProps.data.country }}
                </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="gameCredit" header="Game Credit">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.gameCredit) }}
                </template>
            </Column>
            <Column style="width: 12%" :sortable="true" field="accountStatus" header="Account Status">
                <template #body="slotProps">
                    {{ formatStatus(slotProps.data.accountStatus) }}
                </template>
            </Column>
            <Column style="width: 15%" :sortable="true" field="dateRegistered" header="Date Registered">
                <template #body="slotProps">
                    {{ slotProps.data.dateRegistered }}
                </template>
            </Column>
            <Column style="width: 20%" :sortable="true" field="completeName" header="Action">
                <template #body="slotProps">
                    <Button label="Edit" style="margin-right: 10px" @click="editUser(slotProps.data.userid)" />
                    <!-- <Button label="Show History" /> -->
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="showDialog" header="Edit Profile" :style="{ width: '40rem' }" :position="position" :modal="true" :draggable="false">
            <div class="flex align-items-center gap-3 mb-5">
                <label class="font-semibold w-6rem">Username</label>
                <InputText v-model="stateUser.user_username" class="flex-auto" autocomplete="off" disabled />
            </div>
            <div class="flex align-items-center gap-3 mb-5 mt-3">
                <label for="username" class="font-semibold w-6rem">Agent ID</label>
                <InputText v-model="stateUser.agentID" id="username" class="flex-auto" autocomplete="off" disabled />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <label class="font-semibold w-6rem">First Name</label>
                <InputText v-model="stateUser.firstName" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <label class="font-semibold w-6rem">Last Name</label>
                <InputText v-model="stateUser.lastName" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <label class="font-semibold w-6rem">Mobile</label>
                <InputText v-model="stateUser.mobile" class="flex-auto" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <label class="font-semibold w-6rem">Email</label>
                <InputText v-model="stateUser.email" class="flex-auto" autocomplete="off" />
            </div>

            <div class="flex align-items-center gap-3 mb-5">
                <label class="font-semibold w-6rem">Is Ban?</label>
                <div class="flex flex-wrap gap-3">
                    <div class="flex align-items-center">
                        <RadioButton v-model="stateUser.isBan" inputId="ingredient1" name="pizza" :value="true" />
                        <label for="ingredient1" class="ml-2">Yes</label>
                    </div>
                    <div class="flex align-items-center">
                        <RadioButton v-model="stateUser.isBan" inputId="ingredient2" name="pizza" :value="false" />
                        <label for="ingredient2" class="ml-2">No</label>
                    </div>
                </div>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="showDialog = false"></Button>
                <Button type="button" label="Save Changes" @click="saveChanges" :loading="showLoading"></Button>
            </div>
        </Dialog>
    </div>
</template>
