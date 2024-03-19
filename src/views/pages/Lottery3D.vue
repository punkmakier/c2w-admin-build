<script setup>
import { ref } from 'vue';

const summary = ref([
    { id: 1, winComb: '1*3', gameSched: '2PM', betCount: 234, winnerCount: 2, totalBets: 32424, totalWins: 53424, profit: 12343, date: '2023-03-16 12:32:12' },
    { id: 2, winComb: '5*1', gameSched: '6PM', betCount: 24, winnerCount: 5, totalBets: 1234, totalWins: 5344, profit: 5445, date: '2023-03-16 12:32:12' }
]);
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
};
</script>
<template>
    <div style="width: 70%; margin: 0 auto">
        <div class="countdown">
            <span>Countdown</span>
            <span class="timer">03:20:03</span>
        </div>
        <div class="grid mt-2 dec">
            <div class="col-12 lg:col-6 xl:col-6">
                <div class="card games">
                    <div class="" style="margin-top: 10px">
                        <label class="font-semibold w-6rem">Game ID</label>
                        <InputNumber style="margin-top: 5px" class="w-full" inputId="withoutgrouping" :useGrouping="false" />
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 10px">
                        <div class="" style="margin-top: 10px">
                            <label class="font-semibold">First number</label>
                            <InputNumber style="margin-top: 5px" inputId="withoutgrouping" :useGrouping="false" />
                        </div>
                        <div class="" style="margin-top: 10px">
                            <label class="font-semibold">Second number</label>
                            <InputNumber style="margin-top: 5px" inputId="withoutgrouping" :useGrouping="false" />
                        </div>
                        <div class="" style="margin-top: 10px">
                            <label class="font-semibold">Third number</label>
                            <InputNumber style="margin-top: 5px" inputId="withoutgrouping" :useGrouping="false" />
                        </div>
                    </div>
                    <div class="mt-3">
                        <Button severity="success" label="DECLARE" class="w-full" />
                        <Button severity="warning" label="RE-DECLARE" class="w-full mt-2" />
                    </div>
                </div>
            </div>
            <div class="col-12 lg:col-6 xl:col-6">
                <div class="card">
                    <div style="display: flex; justify-content: space-between; gap: 10px">
                        <div class="" style="margin-top: 10px">
                            <label class="font-semibold">Multiplier</label>
                            <InputNumber style="margin-top: 5px" inputId="withoutgrouping" :useGrouping="false" />
                        </div>
                        <div class="" style="margin-top: 10px">
                            <label class="font-semibold">Twin Multiplier</label>
                            <InputNumber style="margin-top: 5px" inputId="withoutgrouping" :useGrouping="false" disabled />
                        </div>
                    </div>
                    <div style="display: flex; justify-content: space-between; gap: 10px">
                        <div class="" style="margin-top: 10px">
                            <label class="font-semibold">Min Bet</label>
                            <InputNumber style="margin-top: 5px" inputId="withoutgrouping" :useGrouping="false" />
                        </div>
                        <div class="" style="margin-top: 10px">
                            <label class="font-semibold">Max Bet</label>
                            <InputNumber style="margin-top: 5px" inputId="withoutgrouping" :useGrouping="false" />
                        </div>
                    </div>
                    <div class="mt-3">
                        <Button severity="info" label="Qouta" class="w-full" />
                        <Button severity="primary" label="Save" class="w-full mt-2" />
                    </div>
                </div>
            </div>
            <div class="col-12 lg:col-12 xl:col-12">
                <div class="card">
                    <!-- { id: 2, winComb: '5*1', gameSched: '6PM', betCount: 24, winnerCount: 5, totalBets: 1234, totalWins: 5344, profit: 5445, date: '2023-03-16 12:32:12' } -->
                    <DataTable :value="summary" tableStyle="min-width: 50rem" stripedRows paginator :rows="10">
                        <Column field="id" header="ID"></Column>
                        <Column field="winComb" header="Win Comb."></Column>
                        <Column field="gameSched" header="Game Sched"> </Column>
                        <Column header="Bet Count">
                            <template #body="slotProps">
                                {{ slotProps.data.betCount.toLocaleString() }}
                            </template>
                        </Column>
                        <Column header="Winner Count">
                            <template #body="slotProps">
                                {{ slotProps.data.winnerCount.toLocaleString() }}
                            </template>
                        </Column>
                        <Column header="Total Bets">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.totalBets) }}
                            </template>
                        </Column>
                        <Column header="Total Wins">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.totalWins) }}
                            </template>
                        </Column>
                        <Column header="Profit">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.profit) }}
                            </template>
                        </Column>
                        <Column field="date" header="Date"></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.dec .games .p-inputnumber-input {
    width: 125px;
}
.countdown {
    width: 100%;
    height: 250px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-image: radial-gradient(circle at left top, var(--primary-400), var(--primary-700));
    color: #fff;
}
.timer {
    font-size: 3rem;
    font-weight: 800;
    margin-top: 20px;
}
</style>
