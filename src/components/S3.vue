<script>
export default {
    props: {
        redec_handler: {
            type: Array,
            required: true
        }
    }
};
</script>

<template>
    <div>
        <DataTable :value="redec_handler" tableStyle="min-width: 50rem">
            <Column field="id" header="GAME ID">
                <template #body="slotProps">
                    {{ slotProps.data.id }}
                </template>
            </Column>
            <Column field="winPRS" header="Winning Comb.">
                <template #body="slotProps">
                    {{ slotProps.data.winS3 }}
                </template></Column
            >
            <Column field="winnerCount" header="Winner Count">
                <template #body="slotProps">
                    {{ slotProps.data.id }}
                </template></Column
            >
            <Column field="betCount" header="Bet Count">
                <template #body="slotProps">
                    {{ slotProps.data.id }}
                </template></Column
            >
        </DataTable>
    </div>
</template>
