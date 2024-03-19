<script setup>
import { ref, onMounted } from 'vue';
import { AdminAPIRequest as axios } from '@/plugins/APIServices';
const store = JSON.parse(localStorage.getItem('auth.admin'));
const dataHandler = ref();
onMounted(async () => {
    const passData = { username: store.username, token: store.token };
    const res = await axios.getDepositHistory(passData);
    dataHandler.value = res.data;
});
const statusFormat = (value) => {
    switch (value) {
        case 0:
            return 'Pending';
        case 1:
            return 'Success';
        default:
            return 'Pending';
    }
};
</script>

<template>
    <div className="card">
        <h4>User Deposits History</h4>
        <DataTable :value="dataHandler" :rows="15" :paginator="true" responsiveLayout="scroll">
            <Column style="width: 10%" :sortable="true" field="mobile" header="Order ID">
                <template #body="slotProps">
                    {{ slotProps.data.orderID }}
                </template>
            </Column>
            <Column style="width: 15%" :sortable="true" field="email" header="Username">
                <template #body="slotProps">
                    {{ slotProps.data.username }}
                </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="country" header="Amount">
                <template #body="slotProps">
                    {{ slotProps.data.amount }}
                </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="gameCredit" header="Status">
                <template #body="slotProps">
                    {{ statusFormat(slotProps.data.status) }}
                </template>
            </Column>
            <Column style="width: 12%" :sortable="true" field="accountStatus" header="Reference">
                <template #body="slotProps">
                    {{ slotProps.data.reference }}
                </template>
            </Column>

            <Column style="width: 10%" :sortable="true" field="completeName" header="Date">
                <template #body="slotProps">
                    {{ slotProps.data.date }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>
