<script setup>
import { ref, onMounted } from 'vue';
import { AdminAPIRequest as axios } from '@/plugins/APIServices';
const store = JSON.parse(localStorage.getItem('auth.admin'));
const dataHandler = ref();

onMounted(async () => {
    const passData = { username: store[0].username, token: store[0].token };
    const res = await axios.getAgentWithdrawalHistory(passData);
    console.log(res);
    dataHandler.value = res.data;
});
const statusFormat = (value) => {
    switch (value) {
        case 0:
            return 'Failed';
        case 1:
            return 'Approved';
        case 3:
            return 'Pending';
        default:
            return value;
    }
};
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
};

// const pmethod = (value) => {
//     switch (value) {
//         case '0':
//             return 'Paymaya';
//         case '7':
//             return 'GCash';
//         case '4':
//             return 'Bank';
//         default:
//             return 'N/A';
//     }
// };
</script>

<template>
    <div className="card">
        <h4>Agent Withdrawal History</h4>
        <DataTable :value="dataHandler" :rows="15" :paginator="true" responsiveLayout="scroll">
            <Column style="width: 13%" :sortable="true" field="username" header="Username">
                <template #body="slotProps">
                    {{ slotProps.data.username }}
                </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="method" header="Method">
                <template #body="slotProps">
                    {{ slotProps.data.method }}
                </template>
            </Column>
            <Column style="width: 15%" :sortable="true" field="accountName" header="Account Name">
                <template #body="slotProps">
                    {{ slotProps.data.accountName }}
                </template>
            </Column>
            <Column style="width: 15%" :sortable="true" field="accountNumber" header="Account Number">
                <template #body="slotProps">
                    {{ slotProps.data.accountNumber }}
                </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="amount" header="Amount">
                <template #body="slotProps">
                    {{ formatCurrency(slotProps.data.amount) }}
                </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="status" header="Status">
                <template #body="slotProps">
                    {{ statusFormat(slotProps.data.status) }}
                </template>
            </Column>
            <Column style="width: 25%" :sortable="true" field="date" header="Date">
                <template #body="slotProps">
                    {{ slotProps.data.date }}
                </template>
            </Column>
        </DataTable>
    </div>
</template>
