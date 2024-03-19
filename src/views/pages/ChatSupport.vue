<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { AdminAPIRequest as axios } from '@/plugins/APIServices';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import { socket } from '@/socket';
import { useAuthStore } from '@/stores/auth.js';
const store = useAuthStore();
// const store = JSON.parse(localStorage.getItem('auth.admin'));
const message_list = ref();
const passData = { username: store.user[0].username, token: store.user[0].token };
const messages = ref([]);
const selectedChat = ref('');
const bottomChat = ref(null);
const makeAutoFocus = ref(null);
const origMessageList = ref();
const toast = useToast();
const searchItem = ref('');
const msg = ref('');
const confirm = useConfirm();
onMounted(async () => {
    // Call the WebSocket setup when the component is created
    setupWebSocket();
    const fetchChatList = await axios.fetchChatList(passData);
    if (fetchChatList.resStatus === 0) {
        message_list.value = fetchChatList.data;
        origMessageList.value = message_list.value;
    } else {
        alert('Something went wrong...');
    }
});
watch(
    messages.value,
    () => {
        nextTick(() => {
            bottomChat.value?.scrollIntoView({ behavior: 'smooth' });
        });
    },
    { deep: true }
);

const formatDate = (date) => {
    const dateObj = new Date(date);
    const now = new Date();

    if (isSameDay(dateObj, now)) {
        // If the date is today, format it as "Today, H:mm AM/PM"
        const optionsToday = {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        return `Today, ${new Intl.DateTimeFormat('en-US', optionsToday).format(dateObj)}`;
    } else {
        // If the date is not today, format it as "MMM d, ''yy h:mm AM/PM"
        const options = {
            year: '2-digit',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        return new Intl.DateTimeFormat('en-US', options).format(dateObj);
    }
};

function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

const selectedTokenChat = async (token) => {
    selectedChat.value = token;
    const passData = { token: selectedChat.value };
    const res = await axios.fetchChatByToken(passData);
    if (res.resStatus === 0) {
        const sa = message_list.value.map((item) => {
            if (item.token === token) {
                return {
                    ...item,
                    is_read: 1
                };
            } else {
                return item;
            }
        });
        const sortedMessagesByDate = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));

        messages.value = sortedMessagesByDate;
        const fetchChatList = await axios.fetchChatList(passData);
        message_list.value = fetchChatList;
        message_list.value = sa;

        nextTick(() => {
            bottomChat.value?.scrollIntoView();
            makeAutoFocus.value.focus();
        });
    } else {
        alert('Something went wrong...');
    }
};

const handleIncomingMessage = async (event) => {
    const data = JSON.parse(event);
    try {
        if (data.type === 'image') {
            // Decode base64 content to blob
            const blob = await fetch(`data:image/jpeg;base64,${data.message}`).then((res) => res.blob());

            // Create a URL for the blob
            const imageUrl = URL.createObjectURL(blob);
            const dataRes = {
                username: data.username,
                token: data.token,
                user_type: data.user_type,
                message: imageUrl,
                date: data.date,
                isGuest: data.isGuest,
                isDeleted: data.isDeleted,
                type: data.type,
                imageVal: data.imageVal
            };

            // Now `imageUrl` can be used to display the image in your application
            console.log(dataRes);
            messages.value.push(imageUrl);
        }

        const fetchChatList = await axios.fetchChatList(passData);

        if (fetchChatList.resStatus === 0) {
            message_list.value = fetchChatList.data;
        } else {
            alert('Something went wrong...');
        }
    } catch (e) {
        console.log(e);
    }

    messages.value.push(data);
    const indexToUpdate = message_list.value.findIndex((item) => item.token === selectedChat.value);
    if (indexToUpdate !== -1) {
        const newData = [...message_list.value.slice(0, indexToUpdate), { ...message_list.value[indexToUpdate], is_read: 1 }, ...message_list.value.slice(indexToUpdate + 1)];
        message_list.value = newData;
        const passFetch = { token: selectedChat.value };
        await axios.fetchChatByToken(passFetch);
    } else {
        console.log('Chat ID not found.');
    }
    nextTick(() => {
        bottomChat.value?.scrollIntoView({ behavior: 'smooth' });
    });
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

const checkUser = (user) => {
    switch (user) {
        case 1:
            return 'Guest';
        case 2:
            return 'CSR';
        case 0:
            return 'User';
        case 3:
            return 'Admin';
        case 4:
            return 'Super Admin';
        default:
            return 'N/A';
    }
};
const checkStatuUser = (user) => {
    switch (user) {
        case 2:
            return 'error';
        case 0:
            return 'success';
        case 1:
            return 'warning';
        case 3:
            return 'info';
        case 4:
            return 'danger';
        default:
            return 'N/A';
    }
};
const checkOnlineStatus = (status, user) => {
    if (user == 1) {
        return 'Unknown';
    } else {
        switch (status) {
            case 0:
                return 'Offline';
            case 1:
                return 'Online';
            case 2:
                return 'Idle';
            default:
                return 'N/A';
        }
    }
};

const checkOnlineStatusBG = (status, user) => {
    if (user === 1) {
        return 'blue';
    } else {
        switch (status) {
            case 0:
                return 'red';
            case 1:
                return 'green';
            case 2:
                return 'orange';
            default:
                return 'N/A';
        }
    }
};

const truncateText = (text, maxLength = 20) => {
    return text.length <= maxLength ? text : text.slice(0, maxLength - 3) + '...';
};

const sendMessage = async () => {
    if (msg.value.trim() === '' || msg.value.trim() === null) {
        return;
    }
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const data = {
        username: passData.username,
        token: selectedChat.value,
        user_type: 'csr',
        message: msg.value,
        date: formattedDate,
        isGuest: store.user[0].role,
        type: 'text'
    };

    socket.emit('chat-message', JSON.stringify(data));
    nextTick(() => {
        bottomChat.value?.scrollIntoView({ behavior: 'smooth' });
    });
    await axios.addMessageChat(data);
    const fetchChatList = await axios.fetchChatList({ token: data.token });
    if (fetchChatList.resStatus === 0) {
        message_list.value = fetchChatList.data;
    } else {
        alert('Something went wrong...');
    }

    msg.value = '';
};

const handleSearch = () => {
    if (searchItem.value !== '') {
        setTimeout(() => {
            origMessageList;
            message_list.value = origMessageList.value.filter((item) => item.username.toLowerCase().includes(searchItem.value.toLowerCase()));
        }, 500);
    } else {
        message_list.value = origMessageList.value;
    }
};

const deleteConvo = (token) => {
    confirm.require({
        target: event.currentTarget,
        message: 'Do you want to delete this record?',
        icon: 'pi pi-info-circle',
        rejectClass: 'p-button-secondary p-button-outlined p-button-sm',
        acceptClass: 'p-button-danger p-button-sm',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        accept: async () => {
            const res = await axios.deleteConvo({ token: token });
            console.log(res);
            if (res.resStatus === 0) {
                message_list.value = message_list.value.filter((item) => item.token !== token);
                toast.add({ severity: 'success', summary: 'Sucess', detail: 'You have successfully deleted the conversation.', life: 5000 });
            }
        }
    });
};
const refreshData = async () => {
    const fetchChatList = await axios.fetchChatList(passData);
    if (fetchChatList.resStatus === 0) {
        message_list.value = fetchChatList.data;
        origMessageList.value = message_list.value;
    } else {
        alert('Something went wrong...');
    }
    console.log(fetchChatList.data);
};
const showBigImage = (index, type) => {
    const img = messages.value[index];
    const bigImg = document.createElement('img');
    bigImg.style.width = 'auto';
    bigImg.style.height = '80vh';
    bigImg.style.display = 'inline';
    if (type === 'base64') {
        bigImg.src = `${img.message}`;
    } else {
        bigImg.src = `https://macwin.live/images/${img.message}`;
    }
    const over = document.createElement('div');
    document.body.style.overflow = 'hidden';
    over.style.height = '100vh';
    over.style.width = '100%';
    over.style.background = 'rgba(0,0,0,.82)';
    over.style.position = 'fixed';
    over.style.top = '0';
    over.style.left = '0';
    over.style.opacity = '0.0';
    over.style.cursor = 'pointer';
    over.style.zIndex = '9999';
    over.style.textAlign = 'center';

    over.appendChild(bigImg);

    over.addEventListener('click', () => {
        document.body.style.overflow = '';
        over.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(over);
        }, 300);
    });

    document.body.appendChild(over);

    setTimeout(() => {
        over.style.opacity = '1';
    }, 0);
};
</script>
<template>
    <div class="card">
        <Toast />
        <ConfirmPopup></ConfirmPopup>
        <div class="grid">
            <div class="col-12 lg:col-6 xl:col-3" style="height: 75vh; border-right: 1.5px solid #00000026; overflow-y: auto" v-if="message_list">
                <div style="display: flex; align-items: center; margin-bottom: 30px; justify-content: space-between">
                    <div class="search" style="padding: 15px 10px; border: 1px solid #00000026; border-radius: 5px; width: 80%">
                        <input type="text" placeholder="Search username" style="outline: none; border: none; font-size: 1.1rem; width: 100%" v-model="searchItem" @input="handleSearch" />
                    </div>
                    <Button icon="pi pi-replay" @click="refreshData" />
                </div>
                <div
                    class="item-card"
                    style="margin-bottom: 10px; border-bottom: 1px solid #00000026; cursor: pointer"
                    v-for="(value, index) in message_list"
                    :key="index"
                    :class="!value.is_read && value.isGuest != 2 && value.isGuest != 3 && value.isGuest != 4 ? 'unread' : ''"
                    @click="selectedTokenChat(value.token)"
                >
                    <div style="display: flex; align-items: center; gap: 10px">
                        <img src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png" style="width: 30px; border-radius: 50px; cursor: pointer" />

                        <div class="" style="display: flex; flex-direction: column; gap: 10px; width: 100%">
                            <div style="display: flex; justify-content: space-between; cursor: pointer">
                                <div style="display: flex; align-items: center; width: 150px; gap: 10px">
                                    <span style="font-weight: 500; cursor: pointer"><Tag :severity="checkStatuUser(value.isGuest)" :value="checkUser(value.isGuest)"></Tag> {{ value.username }} </span>
                                    <div style="display: flex; align-items: center; width: 50px">
                                        <div style="width: 7px; height: 7px; border-radius: 50px; background-color: red; margin-right: 5px" :style="{ backgroundColor: checkOnlineStatusBG(value.is_online, value.isGuest) }"></div>
                                        <small>{{ checkOnlineStatus(value.is_online, value.isGuest) }}</small>
                                    </div>
                                </div>

                                <small>{{ formatDate(value.date) }}</small>
                            </div>
                            <div style="display: flex; justify-content: space-between; align-items: center">
                                <p style="font-size: 0.9rem; cursor: pointer">{{ truncateText(value.message) }}</p>
                                <!-- <a href="javascript:void(0)" @click="deleteConvo(value.token)">Delete Convo</a> -->
                                <div style="display: flex; gap: 10px; align-items: center">
                                    <Tag
                                        :severity="!value.is_read && value.isGuest != 2 && value.isGuest != 3 && value.isGuest != 4 ? 'danger' : 'success'"
                                        :value="!value.is_read && value.isGuest != 2 && value.isGuest != 3 && value.isGuest != 4 ? 'unread' : ''"
                                    ></Tag>
                                    <i class="pi pi-trash" style="font-size: 1rem; cursor: pointer; color: var(--red-300)" @click="deleteConvo(value.token)" v-if="value.isGuest"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12 lg:col-6 xl:col-9" style="height: 75vh; border-right: 1.5px solid #00000026; overflow-y: auto" v-if="selectedChat">
                <div style="width: auto; height: auto; display: flex; flex-direction: column" v-for="(value, index) in messages" :key="index">
                    <div style="margin-bottom: 40px; display: flex; flex-direction: column" v-if="value.token === selectedChat" :class="{ rightSide: value.username === passData.username, leftSide: value.username !== passData.username }">
                        <div style="display: flex; gap: 20px; align-items: center">
                            <span style="font-weight: 600">{{ value.username }} </span>
                        </div>

                        <div style="margin-top: 15px; display: flex; flex-direction: column">
                            <p
                                :class="{ replied: value.username === passData.username }"
                                style="background-color: rgb(28, 105, 143); padding: 10px; border-radius: 50px; color: #ffffff"
                                v-if="!value.deleted"
                                :style="{ backgroundColor: value.isDeleted == 1 ? 'red' : 'rgb(28, 105, 143)' }"
                            >
                                <span v-if="value.type === 'text'"> {{ value.message }}</span>
                                <span class="" v-else>
                                    <img :src="value.message" style="width: 100px; cursor: zoom-in" @click="showBigImage(index, 'base64')" class="zoomable" v-if="value.imageVal" />
                                    <img :src="`https://macwin.live/images/${value.message}`" @click="showBigImage(index, '')" class="zoomable" style="width: 100px; cursor: zoom-in" v-else />
                                </span>
                            </p>
                            <span :class="{ replied: value.username === passData.username }" style="background-color: rgba(255, 99, 99, 0.42); padding: 10px; border-radius: 50px; color: #6a6a6a" v-if="value.deleted"
                                >{{ value.username }} deleted this message</span
                            >
                        </div>
                        <div style="margin-top: 10px">
                            <small style="font-size: 0.8rem">{{ formatDate(value.date) }}</small>
                        </div>
                    </div>
                </div>
                <div ref="bottomChat"></div>
                <form @submit.prevent="sendMessage">
                    <div style="background-color: rgb(255, 255, 255); padding: 10px; border: 1px solid #00000032; display: flex; border-radius: 7px">
                        <input ref="makeAutoFocus" v-model="msg" type="text" style="width: 100%; border: none; outline: none; padding: 5px" placeholder="Type a message here..." />

                        <Button type="submit" icon="pi pi-send" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
.replied {
    background-color: rgb(179, 33, 67) !important;
}
.unread {
    background-color: rgba(115, 115, 115, 0.212);
    padding: 10px;
    border-radius: 7px;
}
.rightSide {
    align-items: end;
}
.leftSide {
    align-items: start;
}
</style>
