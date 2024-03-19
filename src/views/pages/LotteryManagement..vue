<script setup>
import { onMounted, ref, reactive } from 'vue';
import { AdminAPIRequest as axios } from '@/plugins/APIServices';
import PRS from '@/components/PRS.vue';
import CAS from '@/components/CAS.vue';
import S3 from '@/components/S3.vue';
import S3R from '@/components/S3R.vue';
import S2 from '@/components/S2.vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
const confirm = useConfirm();
const toast = useToast();
const gamesHandler = ref();
const redeclareModal = ref(false);
const redeclareClickVal = ref('');
const draw11am = reactive({
    PRS: {
        gameSched: '11AM',
        gameType: 'PRS',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    CAS: {
        gameSched: '11AM',
        gameType: 'CAS',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        thirdNumber: null,
        token: '123',
        curDate: getCurrentDate()
    }
});

const draw2pm = reactive({
    S3: {
        gameSched: '2PM',
        gameType: 'S3',
        gameID: null,
        firstNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    S3R: {
        gameSched: '2PM',
        gameType: 'S3R',
        gameID: null,
        firstNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    S2: {
        gameSched: '2PM',
        gameType: 'S2',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        token: '123',
        curDate: getCurrentDate()
    }
});

const draw4pm = reactive({
    PRS: {
        gameSched: '4PM',
        gameType: 'PRS',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    CAS: {
        gameSched: '4PM',
        gameType: 'CAS',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        thirdNumber: null,
        token: '123',
        curDate: getCurrentDate()
    }
});

const draw5pm = reactive({
    S3: {
        gameSched: '5PM',
        gameType: 'S3',
        gameID: null,
        firstNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    S3R: {
        gameSched: '5PM',
        gameType: 'S3R',
        gameID: null,
        firstNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    S2: {
        gameSched: '5PM',
        gameType: 'S2',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        token: '123',
        curDate: getCurrentDate()
    }
});

const draw8pm = reactive({
    PRS: {
        gameSched: '8PM',
        gameType: 'PRS',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    CAS: {
        gameSched: '8PM',
        gameType: 'CAS',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        thirdNumber: null,
        token: '123',
        curDate: getCurrentDate()
    }
});

const draw9pm = reactive({
    S3: {
        gameSched: '9PM',
        gameType: 'S3',
        gameID: null,
        firstNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    S3R: {
        gameSched: '9PM',
        gameType: 'S3R',
        gameID: null,
        firstNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    S2: {
        gameSched: '9PM',
        gameType: 'S2',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        token: '123',
        curDate: getCurrentDate()
    }
});

function getCurrentDate() {
    const currentDateObject = new Date();
    const year = currentDateObject.getFullYear();
    const month = (currentDateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDateObject.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

function formatDate() {
    const inputDate = getCurrentDate();
    const dateObject = new Date(inputDate);
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    return formattedDate;
}

onMounted(async () => {
    const games = await axios.postGetGame({ date: getCurrentDate() });
    gamesHandler.value = games;

    draw11am.PRS.gameID = gamesHandler.value[0].id;
    draw11am.CAS.gameID = gamesHandler.value[0].id;

    draw2pm.S3.gameID = gamesHandler.value[1].id;
    draw2pm.S3R.gameID = gamesHandler.value[1].id;
    draw2pm.S2.gameID = gamesHandler.value[1].id;

    draw4pm.PRS.gameID = gamesHandler.value[2].id;
    draw4pm.CAS.gameID = gamesHandler.value[2].id;

    draw5pm.S3.gameID = gamesHandler.value[3].id;
    draw5pm.S3R.gameID = gamesHandler.value[3].id;
    draw5pm.S2.gameID = gamesHandler.value[3].id;

    draw8pm.PRS.gameID = gamesHandler.value[4].id;
    draw8pm.CAS.gameID = gamesHandler.value[4].id;

    draw9pm.S3.gameID = gamesHandler.value[5].id;
    draw9pm.S3R.gameID = gamesHandler.value[5].id;
    draw9pm.S2.gameID = gamesHandler.value[5].id;
});

const gameStatus = (data) => {
    if (data == 0) {
        return 'OPEN';
    }
    if (data == 1) {
        return 'CLOSED';
    }
    if (data == 2) {
        return 'DRAW';
    }
};

const gameStatusColor = (num) => {
    if (gamesHandler.value && gamesHandler.value.length > 0) {
        const status = gamesHandler.value[num].status;

        if (gameStatus(status) === 'CLOSED') {
            return 'b-success';
        }
        if (gameStatus(status) === 'OPEN') {
            return 'b-gray';
        }
        if (gameStatus(status) === 'DRAW') {
            return 'bg-4';
        }
    }
    return 'b-gray'; // Default color when gamesHandler is empty
};

const gameDisabledButton = (num) => {
    if (gamesHandler.value && gamesHandler.value.length > 0) {
        // const status = gamesHandler.value[num].status;

        if (gameStatus(num) === 'OPEN') {
            return true;
        }

        if (gameStatus(num) === 'CLOSED') {
            return false;
        }

        if (gameStatus(num) === 'DRAW') {
            return true;
        }
    }
    return 'b-gray'; // Default color when gamesHandler is empty
};

const gameRedaclareDisabledButton = (num) => {
    if (gamesHandler.value && gamesHandler.value.length > 0) {
        if (gameStatus(num) === 'OPEN') {
            return true;
        }
        if (gameStatus(num) === 'CLOSED') {
            return true;
        }

        if (gameStatus(num) === 'DRAW') {
            return false;
        }
    }
    return 'b-gray'; // Default color when gamesHandler is empty
};

const red_draw11am = reactive({
    PRS: {
        gameSched: '11AM',
        gameType: 'PRS',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    CAS: {
        gameSched: '11AM',
        gameType: 'CAS',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        thirdNumber: null,
        token: '123',
        curDate: getCurrentDate()
    }
});

const red_draw2pm = reactive({
    S3: {
        gameSched: '2PM',
        gameType: 'S3',
        gameID: null,
        firstNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    S3R: {
        gameSched: '2PM',
        gameType: 'S3R',
        gameID: null,
        firstNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    S2: {
        gameSched: '2PM',
        gameType: 'S2',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        token: '123',
        curDate: getCurrentDate()
    }
});

const red_draw4pm = reactive({
    PRS: {
        gameSched: '4PM',
        gameType: 'PRS',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    CAS: {
        gameSched: '4PM',
        gameType: 'CAS',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        thirdNumber: null,
        token: '123',
        curDate: getCurrentDate()
    }
});

const red_draw5pm = reactive({
    S3: {
        gameSched: '5PM',
        gameType: 'S3',
        gameID: null,
        firstNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    S3R: {
        gameSched: '5PM',
        gameType: 'S3R',
        gameID: null,
        firstNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    S2: {
        gameSched: '5PM',
        gameType: 'S2',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        token: '123',
        curDate: getCurrentDate()
    }
});

const red_draw8pm = reactive({
    PRS: {
        gameSched: '8PM',
        gameType: 'PRS',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    CAS: {
        gameSched: '8PM',
        gameType: 'CAS',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        thirdNumber: null,
        token: '123',
        curDate: getCurrentDate()
    }
});

const red_draw9pm = reactive({
    S3: {
        gameSched: '9PM',
        gameType: 'S3',
        gameID: null,
        firstNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    S3R: {
        gameSched: '9PM',
        gameType: 'S3R',
        gameID: null,
        firstNumber: null,
        token: '123',
        curDate: getCurrentDate()
    },
    S2: {
        gameSched: '9PM',
        gameType: 'S2',
        gameID: null,
        firstNumber: null,
        secondNumber: null,
        token: '123',
        curDate: getCurrentDate()
    }
});

const redec_handler = ref();

const enableRedeclareModal = async (type) => {
    redeclareModal.value = true;
    redeclareClickVal.value = type;
    if (redeclareClickVal.value.type === 'PRS' && redeclareClickVal.value.sched === '11AM') {
        red_draw11am.PRS.gameID = type.id;
    }
    if (redeclareClickVal.value.type === 'CAS' && redeclareClickVal.value.sched === '11AM') {
        red_draw11am.CAS.gameID = type.id;
    }

    if (redeclareClickVal.value.type === 'S3' && redeclareClickVal.value.sched === '2PM') {
        red_draw2pm.S3.gameID = type.id;
    }
    if (redeclareClickVal.value.type === 'S3R' && redeclareClickVal.value.sched === '2PM') {
        red_draw2pm.S3R.gameID = type.id;
    }
    if (redeclareClickVal.value.type === 'S2' && redeclareClickVal.value.sched === '2PM') {
        red_draw2pm.S2.gameID = type.id;
    }

    if (redeclareClickVal.value.type === 'PRS' && redeclareClickVal.value.sched === '4PM') {
        red_draw4pm.PRS.gameID = type.id;
    }
    if (redeclareClickVal.value.type === 'CAS' && redeclareClickVal.value.sched === '4PM') {
        red_draw4pm.CAS.gameID = type.id;
    }

    if (redeclareClickVal.value.type === 'S3' && redeclareClickVal.value.sched === '5PM') {
        red_draw5pm.S3.gameID = type.id;
    }
    if (redeclareClickVal.value.type === 'S3R' && redeclareClickVal.value.sched === '5PM') {
        red_draw5pm.S3R.gameID = type.id;
    }
    if (redeclareClickVal.value.type === 'S2' && redeclareClickVal.value.sched === '5PM') {
        red_draw5pm.S2.gameID = type.id;
    }

    if (redeclareClickVal.value.type === 'PRS' && redeclareClickVal.value.sched === '8PM') {
        red_draw8pm.PRS.gameID = type.id;
    }
    if (redeclareClickVal.value.type === 'CAS' && redeclareClickVal.value.sched === '8PM') {
        red_draw8pm.CAS.gameID = type.id;
    }

    if (redeclareClickVal.value.type === 'S3' && redeclareClickVal.value.sched === '9PM') {
        red_draw9pm.S3.gameID = type.id;
    }
    if (redeclareClickVal.value.type === 'S3R' && redeclareClickVal.value.sched === '9PM') {
        red_draw9pm.S3R.gameID = type.id;
    }
    if (redeclareClickVal.value.type === 'S2' && redeclareClickVal.value.sched === '9PM') {
        red_draw9pm.S2.gameID = type.id;
    }

    const games = await axios.getGameByID({ gameID: type.id });

    // Show Datatable
    redec_handler.value = [games];
    console.log(redec_handler.value);
};

const declareDraw = async (inputValue) => {
    if (inputValue.firstNumber == null) {
        toast.add({ severity: 'error', summary: 'Required', detail: 'First number is required', life: 3000 });
        return;
    }

    if ('secondNumber' in inputValue && inputValue.secondNumber == null) {
        toast.add({ severity: 'error', summary: 'Required', detail: 'Second number is required', life: 3000 });
        return;
    }

    // Check if thirdNumber exists (not null or undefined)
    if ('thirdNumber' in inputValue && inputValue.thirdNumber == null) {
        toast.add({ severity: 'error', summary: 'Required', detail: 'Third number is required', life: 3000 });
        return;
    }

    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Save',
        accept: async () => {
            console.log(inputValue);
            const games = await axios.postDeclareDraw(inputValue);
            console.log(games);
            if (games.message === 'success') {
                toast.add({ severity: 'success', summary: 'Success', detail: 'You have successfully declared lotto numbers.', life: 3000 });
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                return;
            } else {
                toast.add({ severity: 'error', summary: 'Ops', detail: 'Something went wrong.', life: 3000 });
            }
        }
    });
};
const redeclareDraw = (inputValue) => {
    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        rejectClass: 'p-button-secondary p-button-outlined',
        rejectLabel: 'Cancel',
        acceptLabel: 'Save',
        accept: async () => {
            if ('gameID' in inputValue && inputValue.gameID == null) {
                toast.add({ severity: 'error', summary: 'Required', detail: 'Game ID is required', life: 3000 });
                return;
            }

            if (inputValue.firstNumber == null) {
                toast.add({ severity: 'error', summary: 'Required', detail: 'First number is required', life: 3000 });
                return;
            }

            if ('secondNumber' in inputValue && inputValue.secondNumber == null) {
                toast.add({ severity: 'error', summary: 'Required', detail: 'Second number is required', life: 3000 });
                return;
            }

            // Check if thirdNumber exists (not null or undefined)
            if ('thirdNumber' in inputValue && inputValue.thirdNumber == null) {
                toast.add({ severity: 'error', summary: 'Required', detail: 'Third number is required', life: 3000 });
                return;
            }

            console.log(inputValue);
            const games = await axios.postDeclareDraw(inputValue);
            // console.log(games);
            if (games.message === 'success') {
                toast.add({ severity: 'success', summary: 'Success', detail: 'You have successfully declared lotto numbers.', life: 3000 });
                redeclareModal.value = false;
                return;
            } else {
                toast.add({ severity: 'error', summary: 'Ops', detail: 'Something went wrong.', life: 3000 });
            }
        }
    });
};

const inputHandlerChecking = (num) => {
    console.log(num.gameType);
};
</script>

<template>
    <div class="grid">
        <Toast position="bottom-center" />
        <ConfirmDialog></ConfirmDialog>
        <!-- 11 AM -->
        <div class="col-12 lg:col-6 xl:col-6" v-if="gamesHandler && gamesHandler.length > 0">
            <div class="card mb-0" :class="gameStatusColor(0)" style="padding-bottom: 42px">
                <div class="header-card-1">
                    <div style="display: flex; justify-content: space-between">
                        <h5 class="text-white">Draw Schedule</h5>
                        <span class="text-white">{{ formatDate() }}</span>
                    </div>
                    <div style="display: flex; justify-content: center; margin-top: 10px">
                        <h1 class="text-white">11:00 AM</h1>
                        <span class="text-white" style="font-size: 1.5rem; font-weight: 500; padding: 10px; margin-left: 10px"> - {{ gameStatus(gamesHandler[0].status) }}</span>
                    </div>
                </div>
                <Divider />
                <div class="team-share">
                    <div style="display: flex; justify-content: space-between; gap: 30px">
                        <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; width: 50%">
                            <span style="font-size: 1.3rem; font-weight: 600; margin-bottom: 10px" class="text-white">PRS</span>
                            <span class="text-white"
                                >Game ID: <b>{{ gamesHandler[0].id }}</b></span
                            >
                            <input type="hidden" v-model="draw11am.PRS.gameID" />
                            <div class="group-forms PRS" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                                <div style="display: flex; gap: 5px">
                                    <InputMask id="basic" v-model="draw11am.PRS.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw11am.PRS)" />
                                    <InputMask id="basic" v-model="draw11am.PRS.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw11am.PRS)" />
                                    <!-- <InputNumber v-model="draw11am.PRS.firstNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                                    <!-- <InputNumber v-model="draw11am.PRS.secondNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                                </div>

                                <!-- <InputText type="text" style="width: 50%; text-align: center" v-model="draw11am.PRS.secondNumber" /> -->
                            </div>
                            <div class="group-forms" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; justify-content: center">
                                <Button label="Declare" style="width: 100%" @click="declareDraw(draw11am.PRS)" :disabled="gameDisabledButton(gamesHandler[0].statusPRS)" />
                                <Button
                                    label="Redeclare"
                                    style="width: 100%; color: #fff"
                                    @click="enableRedeclareModal({ type: 'PRS', sched: '11AM', id: gamesHandler[0].id })"
                                    outlined
                                    :disabled="gameRedaclareDisabledButton(gamesHandler[0].statusPRS)"
                                />
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; width: 50%">
                            <span style="font-size: 1.3rem; font-weight: 600; margin-bottom: 10px" class="text-white">CAS</span>
                            <span class="text-white"
                                >Game ID: <b>{{ gamesHandler[0].id }}</b></span
                            >
                            <input type="hidden" v-model="draw11am.CAS.gameID" />
                            <div class="group-forms CAS" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                                <InputMask id="basic" v-model="draw11am.CAS.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw11am.CAS)" />
                                <InputMask id="basic" v-model="draw11am.CAS.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw11am.CAS)" />
                                <InputMask id="basic" v-model="draw11am.CAS.thirdNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw11am.CAS)" />
                                <!-- <InputNumber v-model="draw11am.CAS.firstNumber" inputId="withoutgrouping" :useGrouping="false" />
                                <InputNumber v-model="draw11am.CAS.secondNumber" inputId="withoutgrouping" :useGrouping="false" />
                                <InputNumber v-model="draw11am.CAS.thirdNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                            </div>
                            <div class="group-forms" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; justify-content: center">
                                <Button label="Declare" style="width: 100%" @click="declareDraw(draw11am.CAS)" :disabled="gameDisabledButton(gamesHandler[0].statusCAS)" />
                                <Button
                                    label="Redeclare"
                                    style="width: 100%; color: #fff"
                                    @click="enableRedeclareModal({ type: 'CAS', sched: '11AM', id: gamesHandler[0].id })"
                                    outlined
                                    :disabled="gameRedaclareDisabledButton(gamesHandler[0].statusCAS)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 2 PM -->
        <div class="col-12 lg:col-6 xl:col-6" v-if="gamesHandler && gamesHandler.length > 0">
            <div class="card mb-0" :class="gameStatusColor(1)" style="padding-bottom: 42px">
                <div class="header-card-1">
                    <div style="display: flex; justify-content: space-between">
                        <h5 class="text-white">Draw Schedule</h5>
                        <span class="text-white">{{ formatDate() }}</span>
                    </div>
                    <div style="display: flex; justify-content: center; margin-top: 10px">
                        <h1 class="text-white">2:00 PM</h1>
                        <span class="text-white" style="font-size: 1.5rem; font-weight: 500; padding: 10px; margin-left: 10px"> - {{ gameStatus(gamesHandler[1].status) }}</span>
                    </div>
                </div>
                <Divider />
                <div class="team-share">
                    <div style="display: flex; justify-content: space-between; gap: 30px">
                        <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; width: 50%">
                            <span style="font-size: 1.3rem; font-weight: 600; margin-bottom: 10px" class="text-white">S3</span>
                            <span class="text-white"
                                >Game ID: <b>{{ gamesHandler[1].id }}</b></span
                            >
                            <input type="hidden" v-model="draw2pm.S3.gameID" />
                            <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                                <InputMask id="basic" v-model="draw2pm.S3.firstNumber" mask="9?99" @update:modelValue="inputHandlerChecking(draw2pm.S3)" />
                                <!-- <InputNumber v-model="draw2pm.S3.firstNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                            </div>
                            <div class="group-forms" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; justify-content: center">
                                <Button label="Declare" style="width: 100%" @click="declareDraw(draw2pm.S3)" :disabled="gameDisabledButton(gamesHandler[1].statusS3)" />
                                <Button
                                    label="Redeclare"
                                    style="width: 100%; color: #fff"
                                    @click="enableRedeclareModal({ type: 'S3', sched: '2PM', id: gamesHandler[1].id })"
                                    outlined
                                    :disabled="gameRedaclareDisabledButton(gamesHandler[1].statusS3)"
                                />
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; width: 50%">
                            <span style="font-size: 1.3rem; font-weight: 600; margin-bottom: 10px" class="text-white">S3R</span>
                            <span class="text-white"
                                >Game ID: <b>{{ gamesHandler[1].id }}</b></span
                            >
                            <input type="hidden" v-model="draw2pm.S3R.gameID" />
                            <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                                <InputMask id="basic" v-model="draw2pm.S3R.firstNumber" mask="9?99" @update:modelValue="inputHandlerChecking(draw2pm.S3R)" />
                                <!-- <InputNumber v-model="draw2pm.S3R.firstNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                            </div>
                            <div class="group-forms" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; justify-content: center">
                                <Button label="Declare" style="width: 100%" @click="declareDraw(draw2pm.S3R)" :disabled="gameDisabledButton(gamesHandler[1].statusS3R)" />
                                <Button
                                    label="Redeclare"
                                    style="width: 100%; color: #fff"
                                    @click="enableRedeclareModal({ type: 'S3R', sched: '2PM', id: gamesHandler[1].id })"
                                    outlined
                                    :disabled="gameRedaclareDisabledButton(gamesHandler[1].statusS3R)"
                                />
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; width: 50%">
                            <span style="font-size: 1.3rem; font-weight: 600; margin-bottom: 10px" class="text-white">S2</span>
                            <span class="text-white"
                                >Game ID: <b>{{ gamesHandler[1].id }}</b></span
                            >
                            <input type="hidden" v-model="draw2pm.S2.gameID" />
                            <div class="group-forms S2" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                                <InputMask id="basic" v-model="draw2pm.S2.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw2pm.S2)" />
                                <InputMask id="basic" v-model="draw2pm.S2.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw2pm.S2)" />
                                <!-- <InputNumber v-model="draw2pm.S2.firstNumber" inputId="withoutgrouping" :useGrouping="false" />
                                <InputNumber v-model="draw2pm.S2.secondNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                            </div>
                            <div class="group-forms" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; justify-content: center">
                                <Button label="Declare" style="width: 100%" @click="declareDraw(draw2pm.S2)" :disabled="gameDisabledButton(gamesHandler[1].statusS2)" />
                                <Button
                                    label="Redeclare"
                                    style="width: 100%; color: #fff"
                                    @click="enableRedeclareModal({ type: 'S2', sched: '2PM', id: gamesHandler[1].id })"
                                    outlined
                                    :disabled="gameRedaclareDisabledButton(gamesHandler[1].statusS2)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 4PM -->
        <div class="col-12 lg:col-6 xl:col-6" v-if="gamesHandler && gamesHandler.length > 0">
            <div class="card mb-0" :class="gameStatusColor(2)" style="padding-bottom: 42px">
                <div class="header-card-1">
                    <div style="display: flex; justify-content: space-between">
                        <h5 class="text-white">Draw Schedule</h5>
                        <span class="text-white">{{ formatDate() }}</span>
                    </div>
                    <div style="display: flex; justify-content: center; margin-top: 10px">
                        <h1 class="text-white">4:00 PM</h1>
                        <span class="text-white" style="font-size: 1.5rem; font-weight: 500; padding: 10px; margin-left: 10px"> - {{ gameStatus(gamesHandler[2].status) }}</span>
                    </div>
                </div>
                <Divider />
                <div class="team-share">
                    <div style="display: flex; justify-content: space-between; gap: 30px">
                        <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; width: 50%">
                            <span style="font-size: 1.3rem; font-weight: 600; margin-bottom: 10px" class="text-white">PRS</span>
                            <span class="text-white"
                                >Game ID: <b>{{ gamesHandler[2].id }}</b></span
                            >
                            <input type="hidden" v-model="draw4pm.PRS.gameID" />
                            <div class="group-forms PRS" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                                <InputMask id="basic" v-model="draw4pm.PRS.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw4pm.PRS)" />
                                <InputMask id="basic" v-model="draw4pm.PRS.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw4pm.PRS)" />
                                <!-- <InputNumber v-model="draw4pm.PRS.firstNumber" inputId="withoutgrouping" :useGrouping="false" />
                                <InputNumber v-model="draw4pm.PRS.secondNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                            </div>
                            <div class="group-forms" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; justify-content: center">
                                <Button label="Declare" style="width: 100%" @click="declareDraw(draw4pm.PRS)" :disabled="gameDisabledButton(gamesHandler[2].statusPRS)" />
                                <Button
                                    label="Redeclare"
                                    style="width: 100%; color: #fff"
                                    @click="enableRedeclareModal({ type: 'PRS', sched: '4PM', id: gamesHandler[2].id })"
                                    outlined
                                    :disabled="gameRedaclareDisabledButton(gamesHandler[2].statusPRS)"
                                />
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; width: 50%">
                            <span style="font-size: 1.3rem; font-weight: 600; margin-bottom: 10px" class="text-white">CAS</span>
                            <span class="text-white"
                                >Game ID: <b>{{ gamesHandler[2].id }}</b></span
                            >
                            <input type="hidden" v-model="draw4pm.CAS.gameID" />
                            <div class="group-forms CAS" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                                <InputMask id="basic" v-model="draw4pm.CAS.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw4pm.CAS)" />
                                <InputMask id="basic" v-model="draw4pm.CAS.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw4pm.CAS)" />
                                <InputMask id="basic" v-model="draw4pm.CAS.thirdNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw4pm.CAS)" />
                                <!-- <InputNumber v-model="draw4pm.CAS.firstNumber" inputId="withoutgrouping" :useGrouping="false" />
                                <InputNumber v-model="draw4pm.CAS.secondNumber" inputId="withoutgrouping" :useGrouping="false" />
                                <InputNumber v-model="draw4pm.CAS.thirdNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                            </div>
                            <div class="group-forms" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; justify-content: center">
                                <Button label="Declare" style="width: 100%" @click="declareDraw(draw4pm.CAS)" :disabled="gameDisabledButton(gamesHandler[2].statusCAS)" />
                                <Button
                                    label="Redeclare"
                                    style="width: 100%; color: #fff"
                                    @click="enableRedeclareModal({ type: 'CAS', sched: '4PM', id: gamesHandler[2].id })"
                                    outlined
                                    :disabled="gameRedaclareDisabledButton(gamesHandler[2].statusCAS)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 5 PM -->
        <div class="col-12 lg:col-6 xl:col-6" v-if="gamesHandler && gamesHandler.length > 0">
            <div class="card mb-0" :class="gameStatusColor(3)" style="padding-bottom: 42px">
                <div class="header-card-1">
                    <div style="display: flex; justify-content: space-between">
                        <h5 class="text-white">Draw Schedule</h5>
                        <span class="text-white">{{ formatDate() }}</span>
                    </div>
                    <div style="display: flex; justify-content: center; margin-top: 10px">
                        <h1 class="text-white">5:00 PM</h1>
                        <span class="text-white" style="font-size: 1.5rem; font-weight: 500; padding: 10px; margin-left: 10px"> - {{ gameStatus(gamesHandler[3].status) }}</span>
                    </div>
                </div>
                <Divider />
                <div class="team-share">
                    <div style="display: flex; justify-content: space-between; gap: 30px">
                        <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; width: 50%">
                            <span style="font-size: 1.3rem; font-weight: 600; margin-bottom: 10px" class="text-white">S3</span>
                            <span class="text-white"
                                >Game ID: <b>{{ gamesHandler[3].id }}</b></span
                            >
                            <input type="hidden" v-model="draw5pm.S3.gameID" />
                            <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                                <InputMask id="basic" v-model="draw5pm.S3.firstNumber" mask="9?99" @update:modelValue="inputHandlerChecking(draw5pm.S3)" />
                                <!-- <InputNumber v-model="draw5pm.S3.firstNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                            </div>
                            <div class="group-forms" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; justify-content: center">
                                <Button label="Declare" style="width: 100%" @click="declareDraw(draw5pm.S3)" :disabled="gameDisabledButton(gamesHandler[3].statusS3)" />
                                <Button
                                    label="Redeclare"
                                    style="width: 100%; color: #fff"
                                    @click="enableRedeclareModal({ type: 'S3', sched: '5PM', id: gamesHandler[3].id })"
                                    outlined
                                    :disabled="gameRedaclareDisabledButton(gamesHandler[3].statusS3)"
                                />
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; width: 50%">
                            <span style="font-size: 1.3rem; font-weight: 600; margin-bottom: 10px" class="text-white">S3R</span>
                            <span class="text-white"
                                >Game ID: <b>{{ gamesHandler[3].id }}</b></span
                            >
                            <input type="hidden" v-model="draw5pm.S3R.gameID" />
                            <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                                <InputMask id="basic" v-model="draw5pm.S3R.firstNumber" mask="9?99" @update:modelValue="inputHandlerChecking(draw5pm.S3R)" />
                                <!-- <InputNumber v-model="draw5pm.S3R.firstNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                            </div>
                            <div class="group-forms" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; justify-content: center">
                                <Button label="Declare" style="width: 100%" @click="declareDraw(draw5pm.S3R)" :disabled="gameDisabledButton(gamesHandler[3].statusS3R)" />
                                <Button
                                    label="Redeclare"
                                    style="width: 100%; color: #fff"
                                    @click="enableRedeclareModal({ type: 'S3R', sched: '5PM', id: gamesHandler[3].id })"
                                    outlined
                                    :disabled="gameRedaclareDisabledButton(gamesHandler[3].statusS3R)"
                                />
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; width: 50%">
                            <span style="font-size: 1.3rem; font-weight: 600; margin-bottom: 10px" class="text-white">S2</span>
                            <span class="text-white"
                                >Game ID: <b>{{ gamesHandler[3].id }}</b></span
                            >
                            <input type="hidden" v-model="draw5pm.S2.gameID" />
                            <div class="group-forms S2" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                                <InputMask id="basic" v-model="draw5pm.S2.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw5pm.S2)" />
                                <InputMask id="basic" v-model="draw5pm.S2.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw5pm.S2)" />
                                <!-- <InputNumber v-model="draw5pm.S2.firstNumber" inputId="withoutgrouping" :useGrouping="false" />
                                <InputNumber v-model="draw5pm.S2.secondNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                            </div>
                            <div class="group-forms" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; justify-content: center">
                                <Button label="Declare" style="width: 100%" @click="declareDraw(draw5pm.S2)" :disabled="gameDisabledButton(gamesHandler[3].statusS2)" />
                                <Button
                                    label="Redeclare"
                                    style="width: 100%; color: #fff"
                                    @click="enableRedeclareModal({ type: 'S2', sched: '5PM', id: gamesHandler[3].id })"
                                    outlined
                                    :disabled="gameRedaclareDisabledButton(gamesHandler[3].statusS2)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 8PM -->
        <div class="col-12 lg:col-6 xl:col-6" v-if="gamesHandler && gamesHandler.length > 0">
            <div class="card mb-0" :class="gameStatusColor(4)" style="padding-bottom: 42px">
                <div class="header-card-1">
                    <div style="display: flex; justify-content: space-between">
                        <h5 class="text-white">Draw Schedule</h5>
                        <span class="text-white">{{ formatDate() }}</span>
                    </div>
                    <div style="display: flex; justify-content: center; margin-top: 10px">
                        <h1 class="text-white">8:00 PM</h1>
                        <span v-if="gamesHandler && gamesHandler.length > 0" class="text-white" style="font-size: 1.5rem; font-weight: 500; padding: 10px; margin-left: 10px"> - {{ gameStatus(gamesHandler[4].status) }}</span>
                    </div>
                </div>
                <Divider />
                <div class="team-share">
                    <div style="display: flex; justify-content: space-between; gap: 30px">
                        <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; width: 50%">
                            <span style="font-size: 1.3rem; font-weight: 600; margin-bottom: 10px" class="text-white">PRS</span>
                            <span class="text-white" v-if="gamesHandler && gamesHandler.length > 0"
                                >Game ID: <b>{{ gamesHandler[4].id }}</b></span
                            >
                            <input type="hidden" v-model="draw8pm.PRS.gameID" v-if="gamesHandler && gamesHandler.length > 0" />
                            <div class="group-forms PRS" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                                <InputMask id="basic" v-model="draw8pm.PRS.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw8pm.PRS)" />
                                <InputMask id="basic" v-model="draw8pm.PRS.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw8pm.PRS)" />
                                <!-- <InputNumber v-model="draw8pm.PRS.firstNumber" inputId="withoutgrouping" :useGrouping="false" />
                                <InputNumber v-model="draw8pm.PRS.secondNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                            </div>
                            <div class="group-forms" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; justify-content: center">
                                <Button label="Declare" style="width: 100%" @click="declareDraw(draw8pm.PRS)" :disabled="gameDisabledButton(gamesHandler[4].statusPRS)" />
                                <Button
                                    label="Redeclare"
                                    style="width: 100%; color: #fff"
                                    @click="enableRedeclareModal({ type: 'PRS', sched: '8PM', id: gamesHandler[4].id })"
                                    outlined
                                    :disabled="gameRedaclareDisabledButton(gamesHandler[4].statusPRS)"
                                />
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; width: 50%">
                            <span style="font-size: 1.3rem; font-weight: 600; margin-bottom: 10px" class="text-white">CAS</span>
                            <span class="text-white" v-if="gamesHandler && gamesHandler.length > 0"
                                >Game ID: <b>{{ gamesHandler[4].id }}</b></span
                            >
                            <input type="hidden" v-model="draw8pm.CAS.gameID" v-if="gamesHandler && gamesHandler.length > 0" />
                            <div class="group-forms CAS" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                                <InputMask id="basic" v-model="draw8pm.CAS.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw8pm.CAS)" />
                                <InputMask id="basic" v-model="draw8pm.CAS.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw8pm.CAS)" />
                                <InputMask id="basic" v-model="draw8pm.CAS.thirdNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw8pm.CAS)" />

                                <!-- <InputNumber v-model="draw8pm.CAS.firstNumber" inputId="withoutgrouping" :useGrouping="false" />
                                <InputNumber v-model="draw8pm.CAS.secondNumber" inputId="withoutgrouping" :useGrouping="false" />
                                <InputNumber v-model="draw8pm.CAS.thirdNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                            </div>
                            <div class="group-forms" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; justify-content: center">
                                <Button label="Declare" style="width: 100%" @click="declareDraw(draw8pm.CAS)" :disabled="gameDisabledButton(gamesHandler[4].statusCAS)" />
                                <Button
                                    label="Redeclare"
                                    style="width: 100%; color: #fff"
                                    @click="enableRedeclareModal({ type: 'CAS', sched: '8PM', id: gamesHandler[4].id })"
                                    outlined
                                    :disabled="gameRedaclareDisabledButton(gamesHandler[4].statusCAS)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 9PM -->
        <div class="col-12 lg:col-6 xl:col-6" v-if="gamesHandler && gamesHandler.length > 0">
            <div class="card mb-0" :class="gameStatusColor(5)" style="padding-bottom: 42px">
                <div class="header-card-1">
                    <div style="display: flex; justify-content: space-between">
                        <h5 class="text-white">Draw Schedule</h5>
                        <span class="text-white">{{ formatDate() }}</span>
                    </div>
                    <div style="display: flex; justify-content: center; margin-top: 10px">
                        <h1 class="text-white">9:00 PM</h1>
                        <span v-if="gamesHandler && gamesHandler.length > 0" class="text-white" style="font-size: 1.5rem; font-weight: 500; padding: 10px; margin-left: 10px"> - {{ gameStatus(gamesHandler[5].status) }}</span>
                    </div>
                </div>
                <Divider />
                <div class="team-share">
                    <div style="display: flex; justify-content: space-between; gap: 30px">
                        <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; width: 50%">
                            <span style="font-size: 1.3rem; font-weight: 600; margin-bottom: 10px" class="text-white">S3</span>
                            <span class="text-white" v-if="gamesHandler && gamesHandler.length > 0"
                                >Game ID: <b>{{ gamesHandler[5].id }}</b></span
                            >
                            <input type="hidden" v-model="draw9pm.S3.gameID" v-if="gamesHandler && gamesHandler.length > 0" />
                            <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                                <InputMask id="basic" v-model="draw9pm.S3.firstNumber" mask="9?99" @update:modelValue="inputHandlerChecking(draw9pm.S3)" />
                                <!-- <InputNumber v-model="draw9pm.S3.firstNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                            </div>
                            <div class="group-forms" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; justify-content: center">
                                <Button label="Declare" style="width: 100%" @click="declareDraw(draw9pm.S3)" :disabled="gameDisabledButton(gamesHandler[5].statusS3)" />
                                <Button
                                    label="Redeclare"
                                    style="width: 100%; color: #fff"
                                    @click="enableRedeclareModal({ type: 'S3', sched: '9PM', id: gamesHandler[5].id })"
                                    outlined
                                    :disabled="gameRedaclareDisabledButton(gamesHandler[5].statusS3)"
                                />
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; width: 50%">
                            <span style="font-size: 1.3rem; font-weight: 600; margin-bottom: 10px" class="text-white">S3R</span>
                            <span class="text-white" v-if="gamesHandler && gamesHandler.length > 0"
                                >Game ID: <b>{{ gamesHandler[5].id }}</b></span
                            >
                            <input type="hidden" v-model="draw9pm.S3R.gameID" v-if="gamesHandler && gamesHandler.length > 0" />
                            <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                                <InputMask id="basic" v-model="draw9pm.S3R.firstNumber" mask="9?99" @update:modelValue="inputHandlerChecking(draw9pm.S3R)" />
                                <!-- <InputNumber v-model="draw9pm.S3R.firstNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                            </div>
                            <div class="group-forms" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; justify-content: center">
                                <Button label="Declare" style="width: 100%" @click="declareDraw(draw9pm.S3R)" :disabled="gameDisabledButton(gamesHandler[5].statusS3R)" />
                                <Button
                                    label="Redeclare"
                                    style="width: 100%; color: #fff"
                                    @click="enableRedeclareModal({ type: 'S3R', sched: '9PM', id: gamesHandler[5].id })"
                                    outlined
                                    :disabled="gameRedaclareDisabledButton(gamesHandler[5].statusS3R)"
                                />
                            </div>
                        </div>
                        <div style="display: flex; flex-direction: column; justify-content: center; text-align: center; width: 50%">
                            <span style="font-size: 1.3rem; font-weight: 600; margin-bottom: 10px" class="text-white">S2</span>
                            <span class="text-white" v-if="gamesHandler && gamesHandler.length > 0"
                                >Game ID: <b>{{ gamesHandler[5].id }}</b></span
                            >
                            <input type="hidden" v-model="draw9pm.S2.gameID" v-if="gamesHandler && gamesHandler.length > 0" />
                            <div class="group-forms S2" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                                <InputMask id="basic" v-model="draw9pm.S2.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw9pm.S2)" />
                                <InputMask id="basic" v-model="draw9pm.S2.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(draw9pm.S2)" />
                                <!-- <InputNumber v-model="draw9pm.S2.firstNumber" inputId="withoutgrouping" :useGrouping="false" />
                                <InputNumber v-model="draw9pm.S2.secondNumber" inputId="withoutgrouping" :useGrouping="false" /> -->
                            </div>
                            <div class="group-forms" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px; justify-content: center">
                                <Button label="Declare" style="width: 100%" @click="declareDraw(draw9pm.S2)" :disabled="gameDisabledButton(gamesHandler[5].statusS2)" />
                                <Button
                                    label="Redeclare"
                                    style="width: 100%; color: #fff"
                                    @click="enableRedeclareModal({ type: 'S2', sched: '9PM', id: gamesHandler[5].id })"
                                    outlined
                                    :disabled="gameRedaclareDisabledButton(gamesHandler[5].statusS2)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Dialog v-model:visible="redeclareModal" maximizable modal header="Redeclare Winning Numbers" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <!-- 11AM PRS -->
            <div class="" v-if="redeclareClickVal.type == 'PRS' && redeclareClickVal.sched == '11AM'">
                <div class="mb-5">
                    <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Game ID</b></label>
                            <InputText type="text" v-model="red_draw11am.PRS.gameID" readonly />
                        </div>
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>First Number</b></label>
                            <InputMask id="basic" v-model="red_draw11am.PRS.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw11am.PRS)" />
                            <!-- <InputText type="text" v-model="red_draw11am.PRS.firstNumber" /> -->
                        </div>
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Second Number</b></label>
                            <InputMask id="basic" v-model="red_draw11am.PRS.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw11am.PRS)" />
                            <!-- <InputText type="text" v-model="red_draw11am.PRS.secondNumber" /> -->
                        </div>
                    </div>
                    <Button label="REDECLARE WINNING NUMBERS" class="mt-3 mb-5" @click="redeclareDraw(red_draw11am.PRS)" />
                    <PRS :redec_handler="redec_handler" />
                </div>
            </div>

            <!-- 11AM CAS -->
            <div class="" v-if="redeclareClickVal.type == 'CAS' && redeclareClickVal.sched == '11AM'">
                <div class="mb-5">
                    <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                        <div class="" style="width: 23.8%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Game ID</b></label>
                            <InputText type="text" v-model="red_draw11am.CAS.gameID" readonly />
                        </div>
                        <div class="" style="width: 23.8%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>First Number</b></label>
                            <InputMask id="basic" v-model="red_draw11am.CAS.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw11am.CAS)" />
                            <!-- <InputText type="text" v-model="red_draw11am.CAS.firstNumber" /> -->
                        </div>
                        <div class="" style="width: 23.8%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Second Number</b></label>
                            <InputMask id="basic" v-model="red_draw11am.CAS.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw11am.CAS)" />
                            <!-- <InputText type="text" v-model="red_draw11am.CAS.secondNumber" /> -->
                        </div>
                        <div class="" style="width: 23.8%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Third Number</b></label>
                            <InputMask id="basic" v-model="red_draw11am.CAS.thirdNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw11am.CAS)" />
                            <!-- <InputText type="text" v-model="red_draw11am.CAS.thirdNumber" /> -->
                        </div>
                    </div>
                    <Button label="REDECLARE WINNING NUMBERS" class="mt-3 mb-5" @click="redeclareDraw(red_draw11am.CAS)" />
                    <CAS :redec_handler="redec_handler" />
                </div>
            </div>

            <!-- 2PM S3 -->
            <div class="" v-if="redeclareClickVal.type == 'S3' && redeclareClickVal.sched == '2PM'">
                <div class="mb-5">
                    <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                        <div class="" style="width: 50%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Game ID</b></label>
                            <InputText type="text" v-model="red_draw2pm.S3.gameID" readonly />
                        </div>
                        <div class="" style="width: 50%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>First Number</b></label>
                            <InputMask id="basic" v-model="red_draw2pm.S3.firstNumber" mask="9?99" @update:modelValue="inputHandlerChecking(red_draw2pm.S3)" />
                            <!-- <InputText type="text" v-model="red_draw2pm.S3.firstNumber" /> -->
                        </div>
                    </div>
                    <Button label="REDECLARE WINNING NUMBERS" class="mt-3 mb-5" @click="redeclareDraw(red_draw2pm.S3)" />
                    <S3 :redec_handler="redec_handler" />
                </div>
            </div>

            <!-- 2PM S3R -->
            <div class="" v-if="redeclareClickVal.type == 'S3R' && redeclareClickVal.sched == '2PM'">
                <div class="mb-5">
                    <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                        <div class="" style="width: 50%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Game ID</b></label>
                            <InputText type="text" v-model="red_draw2pm.S3R.gameID" readonly />
                        </div>
                        <div class="" style="width: 50%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>First Number</b></label>
                            <InputMask id="basic" v-model="red_draw2pm.S3R.firstNumber" mask="9?99" @update:modelValue="inputHandlerChecking(red_draw2pm.S3R)" />
                            <!-- <InputText type="text" v-model="red_draw2pm.S3R.firstNumber" /> -->
                        </div>
                    </div>
                    <Button label="REDECLARE WINNING NUMBERS" class="mt-3 mb-5" v-if="red_draw2pm.S3R.gameID" @click="redeclareDraw(red_draw2pm.S3R)" />
                    <S3R :redec_handler="redec_handler" />
                </div>
            </div>
            <!-- 2PM S2 -->
            <div class="" v-if="redeclareClickVal.type == 'S2' && redeclareClickVal.sched == '2PM'">
                <div class="mb-5">
                    <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Game ID</b></label>
                            <InputText type="text" v-model="red_draw2pm.S2.gameID" readonly />
                        </div>
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>First Number</b></label>
                            <InputMask id="basic" v-model="red_draw2pm.S2.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw2pm.S2)" />
                            <!-- <InputText type="text" v-model="red_draw2pm.S2.firstNumber" /> -->
                        </div>
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Second Number</b></label>
                            <InputMask id="basic" v-model="red_draw2pm.S2.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw2pm.S2)" />
                            <!-- <InputText type="text" v-model="red_draw2pm.S2.secondNumber" /> -->
                        </div>
                    </div>
                    <Button label="REDECLARE WINNING NUMBERS" class="mt-3 mb-5" @click="redeclareDraw(red_draw2pm.S2)" />
                    <S2 :redec_handler="redec_handler" />
                </div>
            </div>

            <!-- 4PM PRS -->
            <div class="" v-if="redeclareClickVal.type == 'PRS' && redeclareClickVal.sched == '4PM'">
                <div class="mb-5">
                    <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Game ID</b></label>
                            <InputText type="text" v-model="red_draw4pm.PRS.gameID" readonly />
                        </div>
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>First Number</b></label>
                            <InputMask id="basic" v-model="red_draw4pm.PRS.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw4pm.PRS)" />
                            <!-- <InputText type="text" v-model="red_draw4pm.PRS.firstNumber" /> -->
                        </div>
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Second Number</b></label>
                            <InputMask id="basic" v-model="red_draw4pm.PRS.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw4pm.PRS)" />
                            <!-- <InputText type="text" v-model="red_draw4pm.PRS.secondNumber" /> -->
                        </div>
                    </div>
                    <Button label="REDECLARE WINNING NUMBERS" class="mt-3 mb-5" @click="redeclareDraw(red_draw4pm.PRS)" />
                    <PRS :redec_handler="redec_handler" />
                </div>
            </div>

            <!-- 4PM CAS -->
            <div class="" v-if="redeclareClickVal.type == 'CAS' && redeclareClickVal.sched == '4PM'">
                <div class="mb-5">
                    <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                        <div class="" style="width: 23.8%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Game ID</b></label>
                            <InputText type="text" v-model="red_draw4pm.CAS.gameID" readonly />
                        </div>
                        <div class="" style="width: 23.8%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>First Number</b></label>
                            <InputMask id="basic" v-model="red_draw4pm.CAS.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw4pm.CAS)" />
                            <!-- <InputText type="text" v-model="red_draw4pm.CAS.firstNumber" /> -->
                        </div>
                        <div class="" style="width: 23.8%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Second Number</b></label>
                            <InputMask id="basic" v-model="red_draw4pm.CAS.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw4pm.CAS)" />
                            <!-- <InputText type="text" v-model="red_draw4pm.CAS.secondNumber" /> -->
                        </div>
                        <div class="" style="width: 23.8%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Third Number</b></label>
                            <InputMask id="basic" v-model="red_draw4pm.CAS.thirdNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw4pm.CAS)" />
                            <!-- <InputText type="text" v-model="red_draw4pm.CAS.thirdNumber" /> -->
                        </div>
                    </div>
                    <Button label="REDECLARE WINNING NUMBERS" class="mt-3 mb-5" @click="redeclareDraw(red_draw4pm.CAS)" />
                    <CAS :redec_handler="redec_handler" />
                </div>
            </div>

            <!-- 5PM S3 -->
            <div class="" v-if="redeclareClickVal.type == 'S3' && redeclareClickVal.sched == '5PM'">
                <div class="mb-5">
                    <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                        <div class="" style="width: 50%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Game ID</b></label>
                            <InputText type="text" v-model="red_draw5pm.S3.gameID" readonly />
                        </div>
                        <div class="" style="width: 50%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>First Number</b></label>
                            <InputMask id="basic" v-model="red_draw5pm.S3.firstNumber" mask="9?99" @update:modelValue="inputHandlerChecking(red_draw5pm.S3)" />
                            <!-- <InputText type="text" v-model="red_draw5pm.S3.firstNumber" /> -->
                        </div>
                    </div>
                    <Button label="REDECLARE WINNING NUMBERS" class="mt-3 mb-5" @click="redeclareDraw(red_draw5pm.S3)" />
                    <S3 :redec_handler="redec_handler" />
                </div>
            </div>

            <!-- 5PM S3r -->
            <div class="" v-if="redeclareClickVal.type == 'S3R' && redeclareClickVal.sched == '5PM'">
                <div class="mb-5">
                    <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                        <div class="" style="width: 50%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Game ID</b></label>
                            <InputText type="text" v-model="red_draw5pm.S3R.gameID" readonly />
                        </div>
                        <div class="" style="width: 50%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>First Number</b></label>
                            <InputMask id="basic" v-model="red_draw5pm.S3R.firstNumber" mask="9?99" @update:modelValue="inputHandlerChecking(red_draw5pm.S3R)" />
                            <!-- <InputText type="text" v-model="red_draw5pm.S3R.firstNumber" /> -->
                        </div>
                    </div>
                    <Button label="REDECLARE WINNING NUMBERS" class="mt-3 mb-5" @click="redeclareDraw(red_draw5pm.S3R)" />
                    <S3R :redec_handler="redec_handler" />
                </div>
            </div>
            <!-- 5PM S2 -->
            <div class="" v-if="redeclareClickVal.type == 'S2' && redeclareClickVal.sched == '5PM'">
                <div class="mb-5">
                    <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Game ID</b></label>
                            <InputText type="text" v-model="red_draw5pm.S2.gameID" readonly />
                        </div>
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>First Number</b></label>
                            <InputMask id="basic" v-model="red_draw5pm.S2.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw5pm.S2)" />
                            <!-- <InputText type="text" v-model="red_draw5pm.S2.firstNumber" /> -->
                        </div>
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Second Number</b></label>
                            <InputMask id="basic" v-model="red_draw5pm.S2.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw5pm.S2)" />
                            <!-- <InputText type="text" v-model="red_draw5pm.S2.secondNumber" /> -->
                        </div>
                    </div>
                    <Button label="REDECLARE WINNING NUMBERS" class="mt-3 mb-5" @click="redeclareDraw(red_draw5pm.S2)" />
                    <S2 :redec_handler="redec_handler" />
                </div>
            </div>

            <!-- 8PM PRS -->
            <div class="" v-if="redeclareClickVal.type == 'PRS' && redeclareClickVal.sched == '8PM'">
                <div class="mb-5">
                    <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Game ID</b></label>
                            <InputText type="text" v-model="red_draw8pm.PRS.gameID" readonly />
                        </div>
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>First Number</b></label>
                            <InputMask id="basic" v-model="red_draw8pm.PRS.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw8pm.PRS)" />
                            <!-- <InputText type="text" v-model="red_draw8pm.PRS.firstNumber" /> -->
                        </div>
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Second Number</b></label>
                            <InputMask id="basic" v-model="red_draw8pm.PRS.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw8pm.PRS)" />
                            <!-- <InputText type="text" v-model="red_draw8pm.PRS.secondNumber" /> -->
                        </div>
                    </div>
                    <Button label="REDECLARE WINNING NUMBERS" class="mt-3 mb-5" @click="redeclareDraw(red_draw8pm.PRS)" />
                    <PRS :redec_handler="redec_handler" />
                </div>
            </div>

            <!-- 8PM CAS -->
            <div class="" v-if="redeclareClickVal.type == 'CAS' && redeclareClickVal.sched == '8PM'">
                <div class="mb-5">
                    <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                        <div class="" style="width: 23.8%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Game ID</b></label>
                            <InputText type="text" v-model="red_draw8pm.CAS.gameID" readonly />
                        </div>
                        <div class="" style="width: 23.8%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>First Number</b></label>
                            <InputMask id="basic" v-model="red_draw8pm.CAS.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw8pm.CAS)" />
                            <!-- <InputText type="text" v-model="red_draw8pm.CAS.firstNumber" /> -->
                        </div>
                        <div class="" style="width: 23.8%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Second Number</b></label>
                            <InputMask id="basic" v-model="red_draw8pm.CAS.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw8pm.CAS)" />
                            <!-- <InputText type="text" v-model="red_draw8pm.CAS.secondNumber" /> -->
                        </div>
                        <div class="" style="width: 23.8%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Third Number</b></label>
                            <!-- <InputText type="text" v-model="red_draw8pm.CAS.thirdNumber" /> -->
                            <InputMask id="basic" v-model="red_draw8pm.CAS.thirdNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw8pm.CAS)" />
                        </div>
                    </div>
                    <Button label="REDECLARE WINNING NUMBERS" class="mt-3 mb-5" @click="redeclareDraw(red_draw8pm.CAS)" />
                    <CAS :redec_handler="redec_handler" />
                </div>
            </div>

            <!-- 9PM S3 -->
            <div class="" v-if="redeclareClickVal.type == 'S3' && redeclareClickVal.sched == '9PM'">
                <div class="mb-5">
                    <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                        <div class="" style="width: 50%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Game ID</b></label>
                            <InputText type="text" v-model="red_draw9pm.S3.gameID" readonly />
                        </div>
                        <div class="" style="width: 50%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>First Number</b></label>
                            <InputMask id="basic" v-model="red_draw9pm.S3.firstNumber" mask="9?99" @update:modelValue="inputHandlerChecking(red_draw9pm.S3)" />
                            <!-- <InputText type="text" v-model="red_draw9pm.S3.firstNumber" /> -->
                        </div>
                    </div>
                    <Button label="REDECLARE WINNING NUMBERS" class="mt-3 mb-5" @click="redeclareDraw(red_draw9pm.S3)" />
                    <S3 :redec_handler="redec_handler" />
                </div>
            </div>

            <!-- 9PM S3r -->
            <div class="" v-if="redeclareClickVal.type == 'S3R' && redeclareClickVal.sched == '9PM'">
                <div class="mb-5">
                    <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                        <div class="" style="width: 50%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Game ID</b></label>
                            <InputText type="text" v-model="red_draw9pm.S3R.gameID" readonly />
                        </div>
                        <div class="" style="width: 50%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>First Number</b></label>
                            <InputMask id="basic" v-model="red_draw9pm.S3R.firstNumber" mask="9?99" @update:modelValue="inputHandlerChecking(red_draw9pm.S3R)" />
                            <!-- <InputText type="text" v-model="red_draw9pm.S3R.firstNumber" /> -->
                        </div>
                    </div>
                    <Button label="REDECLARE WINNING NUMBERS" class="mt-3 mb-5" @click="redeclareDraw(red_draw9pm.S3R)" />
                    <S3R :redec_handler="redec_handler" />
                </div>
            </div>
            <!-- 9PM S2 -->
            <div class="" v-if="redeclareClickVal.type == 'S2' && redeclareClickVal.sched == '9PM'">
                <div class="mb-5">
                    <div class="group-forms" style="display: flex; gap: 10px; margin-top: 10px; justify-content: center">
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Game ID</b></label>
                            <InputText type="text" v-model="red_draw9pm.S2.gameID" readonly />
                        </div>
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>First Number</b></label>
                            <InputMask id="basic" v-model="red_draw9pm.S2.firstNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw9pm.S2)" />
                            <!-- <InputText type="text" v-model="red_draw9pm.S2.firstNumber" /> -->
                        </div>
                        <div class="" style="width: 32.5%; display: flex; flex-direction: column; gap: 7px">
                            <label><b>Second Number</b></label>
                            <InputMask id="basic" v-model="red_draw9pm.S2.secondNumber" mask="9?9" @update:modelValue="inputHandlerChecking(red_draw9pm.S2)" />
                            <!-- <InputText type="text" v-model="red_draw9pm.S2.secondNumber" /> -->
                        </div>
                    </div>
                    <Button label="REDECLARE WINNING NUMBERS" class="mt-3 mb-5" @click="redeclareDraw(red_draw9pm.S2)" />
                    <S2 :redec_handler="redec_handler" />
                </div>
            </div>
        </Dialog>
    </div>
</template>

<style>
.bg-1 {
    background: rgb(205, 217, 12);
    background: -moz-linear-gradient(209deg, rgba(205, 217, 12, 1) 0%, rgba(139, 0, 47, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(205, 217, 12, 1) 0%, rgba(139, 0, 47, 1) 100%);
    background: linear-gradient(209deg, rgba(205, 217, 12, 1) 0%, rgba(139, 0, 47, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#cdd90c",endColorstr="#8b002f",GradientType=1);
}
.bg-2 {
    background: rgb(217, 12, 143);
    background: -moz-linear-gradient(209deg, rgba(217, 12, 143, 1) 0%, rgba(139, 79, 0, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(217, 12, 143, 1) 0%, rgba(139, 79, 0, 1) 100%);
    background: linear-gradient(209deg, rgba(217, 12, 143, 1) 0%, rgba(139, 79, 0, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#d90c8f",endColorstr="#8b4f00",GradientType=1);
}

.bg-3 {
    background: rgb(42, 12, 217);
    background: -moz-linear-gradient(209deg, rgba(42, 12, 217, 1) 0%, rgba(139, 0, 0, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(42, 12, 217, 1) 0%, rgba(139, 0, 0, 1) 100%);
    background: linear-gradient(209deg, rgba(42, 12, 217, 1) 0%, rgba(139, 0, 0, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2a0cd9",endColorstr="#8b0000",GradientType=1);
}
.bg-4 {
    background: rgb(255, 0, 0);
    background: -moz-linear-gradient(209deg, rgba(255, 0, 0, 1) 0%, rgba(255, 145, 0, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(255, 0, 0, 1) 0%, rgba(255, 145, 0, 1) 100%);
    background: linear-gradient(209deg, rgba(255, 0, 0, 1) 0%, rgba(255, 145, 0, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff0000",endColorstr="#ff9100",GradientType=1);
}

.b-success {
    background: rgb(12, 217, 118);
    background: -moz-linear-gradient(209deg, rgba(12, 217, 118, 1) 0%, rgba(0, 171, 19, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(12, 217, 118, 1) 0%, rgba(0, 171, 19, 1) 100%);
    background: linear-gradient(209deg, rgba(12, 217, 118, 1) 0%, rgba(0, 171, 19, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0cd976",endColorstr="#00ab13",GradientType=1);
}

.b-gray {
    background: rgb(212, 212, 212);
    background: -moz-linear-gradient(209deg, rgba(212, 212, 212, 1) 0%, rgba(112, 112, 112, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(212, 212, 212, 1) 0%, rgba(112, 112, 112, 1) 100%);
    background: linear-gradient(209deg, rgba(212, 212, 212, 1) 0%, rgba(112, 112, 112, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#d4d4d4",endColorstr="#707070",GradientType=1);
}

.text-white {
    color: #fff;
    text-shadow: 0 0 3px #000;
}
</style>
<style>
.PRS .p-inputnumber-input,
.S2 .p-inputnumber-input,
.S2 .p-inputmask {
    width: 50% !important;
}

.PRS .p-inputmask {
    width: 50% !important;
}

.CAS .p-inputnumber-input,
.CAS .p-inputmask {
    width: 30% !important;
}
</style>
