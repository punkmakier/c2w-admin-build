<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { AdminAPIRequest as axios } from '@/plugins/APIServices';

const confirm = useConfirm();
const toast = useToast();
const showDialog = ref(false);
const showLoading = ref(false);
const storage = JSON.parse(localStorage.getItem('auth.admin'));
const state = reactive({
    gameID: '',
    name: '',
    selectedOrderList: { name: '1', code: '1' },
    selectedgameType: { name: 'Slot', code: '1' },
    selectedgameProvider: { name: 'JILI', code: '1' },
    selectedgameCategory: { name: 'Games', code: '1' },
    selectedStatus: null,
    thumbnail: ''
});

const gamesList = ref([]);

const inOrderlist = [
    { name: '1', code: '1' },
    { name: '2', code: '2' },
    { name: '3', code: '3' },
    { name: '4', code: '4' },
    { name: '5', code: '5' },
    { name: '6', code: '6' }
];

const typeModal = ref('Add');

const gameType = [
    { name: 'Slot', code: '1' },
    { name: 'Fishing', code: '2' }
];

const gameProvider = [
    { name: 'JILI', code: '1' },
    { name: 'Progmatic Gaming', code: '53' }
];

const gameCategory = [
    { name: 'Games', code: '1' },
    { name: 'Live', code: '2' }
];

const statusList = [
    { name: 'Active', code: 'active' },
    { name: 'Inactive', code: 'inactive' }
];

onMounted(async () => {
    try {
        const response = await axios.getshowGameList();
        console.log(response);
        const updatedResponse = response.map((item) => {
            const statusCheck = item.status == 1 ? 'Active' : 'Inactive';
            const statusObject = statusList.find((status) => status.name === statusCheck);
            const providerObject = gameProvider.find((provider) => provider.name === item.provider);
            const gameTypeObject = gameType.find((type) => type.name === item.type);
            const inOrderlistTypeObject = inOrderlist.find((type) => type.name == item.in_order);
            const gameCategoryTypeObject = gameCategory.find((type) => type.name == item.category);

            if (statusObject && providerObject && gameTypeObject) {
                return {
                    ...item,
                    gameID: item.game_id,
                    name: item.name,
                    type: gameTypeObject,
                    orderList: inOrderlistTypeObject,
                    category: gameCategoryTypeObject,
                    provider: providerObject,
                    thumbnail: item.thumbnail,
                    status: statusObject
                };
            } else {
                // Handle the case where either status or provider is not found
                return item;
            }
        });
        gamesList.value = updatedResponse;
        console.log(updatedResponse);
    } catch (error) {
        // Handle the error
        console.error('Error fetching game list:', error);
    }
});

const editGame = (id) => {
    typeModal.value = 'Edit';
    showDialog.value = true;
    const res = gamesList.value.find((game) => game.gameID == id);
    console.log(res);
    state.gameID = res.gameID;
    state.name = res.name;
    state.selectedgameType = res.type;
    state.selectedOrderList = res.orderList;
    state.selectedgameProvider = res.provider;
    state.selectedgameCategory = res.category;
    state.thumbnail = res.thumbnail;
    state.selectedStatus = res.status;
};
const deleteGame = (id) => {
    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Confirm',
        accept: async () => {
            const dataPass = {
                username: storage.username,
                token: storage.token,
                gameID: id
            };
            const res = await axios.postDeleteGame(dataPass);
            console.log(res);
            if (res.resStatus === 0) {
                gamesList.value = gamesList.value.filter((game) => game.gameID !== id);
                toast.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Failed', detail: 'Something went wrong...', life: 3000 });
            }
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Ops', detail: 'Something went wrong...', life: 3000 });
        }
    });
};

const handleUpdate = async () => {
    showLoading.value = true;
    const dataPass = {
        username: storage.username,
        token: storage.token,
        gameID: state.gameID,
        name: state.name,
        orderList: parseInt(state.selectedOrderList.name),
        gameType: state.selectedgameType.name,
        gameProvider: state.selectedgameProvider.name,
        gameCategory: state.selectedgameCategory.name,
        status: state.selectedStatus.name === 'Active' ? 1 : 0,
        thumbnail: state.thumbnail
    };
    const result = await axios.postUpdateGame(dataPass);
    console.log(result);
    if (result.resStatus === 0) {
        const indexToUpdate = gamesList.value.findIndex((item) => item.gameID === state.gameID);

        // If the game with the specified gameID is found, update its properties
        if (indexToUpdate !== -1) {
            gamesList.value[indexToUpdate] = {
                ...gamesList.value[indexToUpdate],
                name: state.name,
                orderList: state.selectedOrderList,
                type: state.selectedgameType,
                provider: state.selectedgameProvider,
                category: state.selectedgameCategory,
                status: state.selectedStatus,
                thumbnail: state.thumbnail
            };
        }

        toast.add({ severity: 'success', summary: 'Success', detail: 'Updated Successfully', life: 3000 });
        showDialog.value = false;
        showLoading.value = false;
    } else {
        showLoading.value = false;
        toast.add({ severity: 'error', summary: 'Failed', detail: result.resMsg, life: 3000 });
    }
};

const addButton = () => {
    typeModal.value = 'Add';
    showDialog.value = true;

    state.gameID = '';
    state.name = '';
    state.selectedOrderList = { name: '1', code: '1' };
    state.selectedgameType = { name: 'Slot', code: '1' };
    state.selectedgameProvider = { name: 'JILI', code: '1' };
    state.selectedgameCategory = { name: 'Games', code: '1' };
    state.selectedStatus = { name: 'Active', code: 'active' };
};

const handleSubmit = async () => {
    showLoading.value = true;
    const data = {
        gameID: state.gameID,
        name: state.name,
        type: state.selectedgameType,
        orderList: state.selectedOrderList,
        category: state.selectedgameCategory,
        provider: state.selectedgameProvider,
        thumbnail: state.thumbnail,
        status: state.selectedStatus
    };
    gamesList.value = [data, ...gamesList.value];

    const dataPass = {
        username: storage.username,
        token: storage.token,
        gameID: state.gameID,
        name: state.name,
        orderList: parseInt(state.selectedOrderList.name),
        gameType: state.selectedgameType.name,
        gameProvider: state.selectedgameProvider.name,
        gameCategory: state.selectedgameCategory.name,
        status: state.selectedStatus.name === 'Active' ? 1 : 0,
        thumbnail: state.thumbnail
    };
    const result = await axios.postAddGames(dataPass);
    if (result.resStatus === 0) {
        toast.add({ severity: 'success', summary: 'Success', detail: 'You have successfully added a game', life: 3000 });
        showLoading.value = false;
        showDialog.value = false;
    } else {
        toast.add({ severity: 'error', summary: 'Failed', detail: result.resMsg, life: 3000 });
        showLoading.value = false;
    }
    console.log(dataPass);
    console.log(result);
    showDialog.value = false;
};
</script>

<template>
    <div className="card">
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <h5>Game List</h5>
        <Button label="Add Game" class="mb-5" @click="addButton" />
        <DataTable :value="gamesList" :rows="5" :paginator="true" responsiveLayout="scroll">
            <Column style="width: 10%" :sortable="true" field="username" header="Code">
                <template #body="slotProps">
                    {{ slotProps.data.gameID }}
                </template>
            </Column>
            <Column style="width: 15%" :sortable="true" field="mobile" header="Name">
                <template #body="slotProps">
                    {{ slotProps.data.name }}
                </template>
            </Column>
            <Column style="width: 5%" :sortable="true" field="email" header="Type">
                <template #body="slotProps">
                    {{ slotProps.data.type.name }}
                </template>
            </Column>
            <Column style="width: 5%" :sortable="true" field="country" header="Category">
                <template #body="slotProps">
                    {{ slotProps.data.category.name }}
                </template>
            </Column>
            <Column style="width: 10%" :sortable="true" field="country" header="Provider">
                <template #body="slotProps">
                    {{ slotProps.data.provider.name }}
                </template>
            </Column>
            <Column style="width: 15%" :sortable="true" field="gameCredit" header="Thumbnail">
                <template #body="slotProps">
                    {{ slotProps.data.thumbnail }}
                </template>
            </Column>
            <Column style="width: 5%" :sortable="true" field="accountStatus" header="Status">
                <template #body="slotProps">
                    {{ slotProps.data.status.name }}
                </template>
            </Column>

            <Column style="width: 10%" :sortable="true" field="completeName" header="Action">
                <template #body="slotProps">
                    <Button label="Edit" style="margin-right: 10px" @click="editGame(slotProps.data.gameID)" />
                    <Button label="Delete" @click="deleteGame(slotProps.data.gameID)" />
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="showDialog" :header="`${typeModal} Games`" :style="{ width: '50rem' }" :position="position" :modal="true" :draggable="false">
            <div class="flex align-items-center gap-3 mb-5 mt-3">
                <label for="username" class="font-semibold w-6rem">Game ID</label>
                <InputText v-model="state.gameID" id="username" class="w-full" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <label for="email" class="font-semibold w-6rem">Name</label>
                <InputText v-model="state.name" id="Email" class="w-full" autocomplete="off" />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <label for="email" class="font-semibold w-6rem">In Order</label>
                <Dropdown v-model="state.selectedOrderList" :options="inOrderlist" optionLabel="name" placeholder="Select" class="w-full" />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <label for="email" class="font-semibold w-6rem">Type</label>
                <Dropdown v-model="state.selectedgameType" :options="gameType" optionLabel="name" placeholder="Select" class="w-full" />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <label for="email" class="font-semibold w-6rem">Provider</label>
                <Dropdown v-model="state.selectedgameProvider" :options="gameProvider" optionLabel="name" placeholder="Select" class="w-full" />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <label for="email" class="font-semibold w-6rem">Category</label>
                <Dropdown v-model="state.selectedgameCategory" :options="gameCategory" optionLabel="name" placeholder="Select" class="w-full" />
            </div>
            <div class="flex align-items-center gap-3 mb-5" v-if="typeModal == 'Edit'">
                <label for="email" class="font-semibold w-6rem">Status</label>
                <Dropdown v-model="state.selectedStatus" :options="statusList" optionLabel="name" placeholder="Select" class="w-full" />
            </div>
            <div class="flex align-items-center gap-3 mb-5">
                <label for="email" class="font-semibold w-6rem">Thumbnail</label>
                <InputText v-model="state.thumbnail" id="Email" class="w-full" autocomplete="off" />
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="showDialog = false"></Button>
                <Button type="button" label="Save" @click="handleSubmit" v-if="typeModal == 'Add'" :loading="showLoading"></Button>
                <Button type="button" label="Update" severity="warning" @click="handleUpdate" v-if="typeModal == 'Edit'" :loading="showLoading"></Button>
            </div>
        </Dialog>
    </div>
</template>
