<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AppMenuItem from './AppMenuItem.vue';
import { AdminAPIRequest as axios } from '@/plugins/APIServices';
import { useToast } from 'primevue/usetoast';
import { socket } from '@/socket';
const router = useRouter();
const toast = useToast();
const hasArena = ref(false);
const countPendingWithdraw = ref(0);
const countChatUnread = ref();
import { useAuthStore } from '@/stores/auth.js';
const store = useAuthStore();
const passData = { username: store.user[0].username, token: store.user[0].token };
const logout = () => {
    localStorage.removeItem('auth.admin');
    router.push('/');
};
const handleIncomingMessage = async (event) => {
    const data = JSON.parse(event);
    if (data.type === 'withdraw') {
        fetchCount();
        return;
    }
    if (data.type === 'image' || data.type === 'text') {
        fetchCountChat();
        return;
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
const fetchCount = async () => {
    const res = await axios.requestCountWithdraw(passData);
    if (res.resStatus === 0) {
        countPendingWithdraw.value = res.count;
    }
};
const fetchCountChat = async () => {
    const res = await axios.fetchCountChat(passData);
    if (res.resStatus === 0) {
        countChatUnread.value = res.count;
    }
};

onMounted(() => {
    setupWebSocket();
    fetchCount();
    fetchCountChat();

    if (localStorage.getItem('hasArena')) {
        hasArena.value = true;
    }
});

const model = ref([
    {
        label: 'Home',
        items: [
            { label: 'Super Admin Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' },
            { label: 'Admin Dashboard', icon: 'pi pi-fw pi-home', to: '/admins', tag: countPendingWithdraw }
        ]
    },
    {
        label: 'Manage',
        items: [
            { label: 'Payment Method', icon: 'pi pi-fw pi-share-alt', to: '/paymentmethod' },
            { label: 'User Accounts', icon: 'pi pi-users', to: '/useraccounts' },
            { label: 'User Deposits History', icon: 'pi pi-fw pi-users', to: '/userdeposits' },
            { label: 'User Withdrawals History', icon: 'pi pi-fw pi-credit-card', to: '/userwithdrawals' },
            { label: 'Agent Withdrawals History', icon: 'pi pi-fw pi-money-bill', to: '/agentwithdrawals' },
            { label: 'Agents', icon: 'pi pi-users', to: '/agents', class: 'rotated-icon' },
            // { label: 'Games', icon: 'pi pi-box', to: '/games', class: 'rotated-icon' },
            { label: 'Chat Support', icon: 'pi pi-phone', to: '/chat', class: 'rotated-icon', tag: countChatUnread }
        ]
    },
    {
        label: 'Sabong'
    }
]);

const btnLoading = ref(false);

const sabongTypeOptions = [
    { name: 'Short Knife', code: 'Short Knife' },
    { name: 'Long Knife', code: 'Long Knife' }
];

const showCreateArena = ref(false);
const createArena = () => {
    showCreateArena.value = true;
};

const createArenaState = reactive({
    sabongType: { name: 'Short Knife', code: 'Short Knife' },
    fightNumber: null
});

const submitCreateArena = async () => {
    btnLoading.value = true;
    const dataCreate = { arenaName: createArenaState.sabongType.name, fightNumber: createArenaState.fightNumber, ...passData };
    console.log(dataCreate);
    const res = await axios.postCreateArena(dataCreate);
    btnLoading.value = false;
    if (res.error === 0) {
        localStorage.setItem('hasArena', 'true');
        hasArena.value = true;
        showCreateArena.value = false;
        createArenaState.sabongType = { name: 'Short Knife', code: 'Short Knife' };
        createArenaState.fightNumber = null;
        router.push('/arena');
    } else if (res.error === 1 && res.description === 'Short Knife is active.') {
        hasArena.value = true;
        showCreateArena.value = false;
        router.push('/arena');
    } else if (res.error === 1 && res.description === 'Long Knife is active.') {
        hasArena.value = true;
        showCreateArena.value = false;
        router.push('/arena');
    } else {
        toast.add({ severity: 'error', summary: 'Error', detail: res.description });
    }
};

const toArenaManagement = () => {
    router.push('/arena');
};

const to2DLotto = () => {
    console.log('XASs');
    router.push('/2dlotto');
};
const to3DLotto = () => {
    console.log('XASs');
    router.push('/3dlotto');
};
const toPick3 = () => {
    router.push('/pick3');
};
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
        <div class="newMenu" @click="createArena" v-if="!hasArena"><i class="pi pi-plus-circle" style="font-size: 1rem"></i> <span>Create Arena</span></div>

        <div class="newMenu" @click="toArenaManagement" v-if="hasArena"><i class="pi pi-flag-fill" style="font-size: 1rem"></i> <span style="color: #4b5563">Arena Management</span></div>
        <div class="newMenu"><i class="pi pi-chart-line" style="font-size: 1rem"></i> <span>Profit & Lose</span></div>
        <div style="margin-top: 15px"><span style="font-weight: 600; font-size: 0.9rem; color: #000">LOTTERY</span></div>
        <div class="">
            <div class="newMenu" @click="to2DLotto"><i class="pi pi-flag-fill" style="font-size: 1rem"></i> <span style="color: #4b5563">2D Lotto</span></div>
            <div class="newMenu" @click="to3DLotto"><i class="pi pi-flag-fill" style="font-size: 1rem"></i> <span style="color: #4b5563">3D Lotto</span></div>
            <div class="newMenu" @click="toPick3"><i class="pi pi-flag-fill" style="font-size: 1rem"></i> <span style="color: #4b5563">Lucky Pick 3</span></div>
        </div>
        <Button label="Logout" class="w-full mt-5" icon="pi pi-sign-out" outlined @click="logout" />
    </ul>
    <Dialog :draggable="false" v-model:visible="showCreateArena" modal header="Create Arena" :style="{ width: '25rem' }">
        <div class="">
            <label for="username" class="font-semibold w-6rem">Sabong Type</label>
            <Dropdown style="margin-top: 5px" v-model="createArenaState.sabongType" :options="sabongTypeOptions" optionLabel="name" placeholder="Select" class="w-full" />
        </div>
        <div class="" style="margin-top: 10px">
            <label for="email" class="font-semibold w-6rem">Fight #</label>
            <InputNumber v-model="createArenaState.fightNumber" style="margin-top: 5px" class="w-full" inputId="withoutgrouping" :useGrouping="false" />
        </div>
        <div class="flex justify-content-end gap-2" style="margin-top: 10px">
            <Button type="button" label="Cancel" severity="secondary" @click="showCreateArena = false"></Button>
            <Button type="button" label="Submit" @click="submitCreateArena" :loading="btnLoading"></Button>
        </div>
    </Dialog>
</template>

<style scoped>
.newMenu {
    padding: 10px;
    cursor: pointer;
}
.newMenu:hover {
    background-color: #f6f9fc;
}
</style>
