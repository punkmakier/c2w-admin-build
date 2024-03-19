<script setup>
import { onMounted, ref, watch } from 'vue';
import ProductService from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';

const { isDarkTheme } = useLayout();

const products = ref(null);

const lineOptions = ref(null);
const productService = new ProductService();

onMounted(() => {
    productService.getProductsSmall().then((data) => (products.value = data));
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
};
const applyLightTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
};

const applyDarkTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            }
        }
    };
};

watch(
    isDarkTheme,
    (val) => {
        if (val) {
            applyDarkTheme();
        } else {
            applyLightTheme();
        }
    },
    { immediate: true }
);
const chartSeries = [2454156, 1566423, 854654];
const chartOptions = {
    chart: {
        toolbar: {
            show: false,
            height: 350
        }
    },
    labels: ['Macmac', 'Marco', 'Mark'],
    fill: {
        opacity: 1
    },
    dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
            const seriesIndex = opts.seriesIndex;
            const dataValue = chartSeries[seriesIndex];
            const dataFinalValue = dataValue.toLocaleString();
            return opts.w.config.labels[opts.seriesIndex] + ' - ₱ ' + dataFinalValue;
        }
    }
    // dataLabels: {
    //     formatter: function (val, opts) {
    //         // Use opts.seriesIndex to get the index of the current series
    //         const seriesIndex = opts.seriesIndex;

    //         // Access the corresponding data value from seriesDonut
    //         const dataValue = seriesDonut.value[seriesIndex];

    //         // Format the data value with commas
    //         return '₱ ' + dataValue.toLocaleString();
    //     }
    // }
};

const seriesDonut = ref([2454156, 2454156, 2454156]);

const chartOptionsDonut = ref({
    chart: {
        type: 'donut'
    },
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    ],
    labels: ['User Success Withdraw', 'User Success Deposit', 'Agent Withdraw'],
    dataLabels: {
        formatter: function (val, opts) {
            // Use opts.seriesIndex to get the index of the current series
            const seriesIndex = opts.seriesIndex;

            // Access the corresponding data value from seriesDonut
            const dataValue = seriesDonut.value[seriesIndex];

            // Format the data value with commas
            return '₱ ' + dataValue.toLocaleString();
        }
    }
});

// RADIAL CHART
const seriesRAD = ref([4515, 564, 142]);

const chartOptionsRAD = ref({
    chart: {
        type: 'donut'
    },
    responsive: [
        {
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    ],
    labels: ['CASINO', 'SABONG', 'LIVE'],
    dataLabels: {
        formatter: function (val, opts) {
            // Use opts.seriesIndex to get the index of the current series
            const seriesIndex = opts.seriesIndex;

            // Access the corresponding data value from seriesDonut
            const dataValue = seriesDonut.value[seriesIndex];

            // Format the data value with commas
            return '₱ ' + dataValue.toLocaleString();
        }
    }
});

const seriesCOL = [
    {
        name: 'BET',
        data: [151, 55, 57, 56, 61, 58, 63, 60]
    },
    {
        name: 'WIN',
        data: [76, 85, 101, 98, 87, 105, 91, 114]
    },
    {
        name: 'PROFITS',
        data: [-35, 0, 36, 26, 45, 48, 52, 53]
    }
];

const chartOptionsCOL = {
    chart: {
        type: 'bar',
        height: 350
    },
    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    xaxis: {
        categories: ['JILI', 'Fachai ', 'PGSoft', 'Funta Gaming', 'Evolution', 'Playstar', 'CGaming', 'BP Games']
    },

    fill: {
        opacity: 1
    },
    tooltip: {
        y: {
            formatter: (val) => `₱ ${val.toLocaleString()}`
        }
    }
};
</script>

<template>
    <Accordion :activeIndex="0">
        <AccordionTab header="Income Monitoring">
            <div class="grid">
                <div class="col-12 lg:col-6 xl:col-4">
                    <div class="card mb-0 bg-color-1">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3 text-white">Macmac <b>(50%)</b></span>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                            </div>
                        </div>
                        <div style="text-align: center; display: flex; flex-direction: column" class="text-white">
                            <small style="margin-bottom: 10px">As of Jan 18, '24</small><span style="font-size: 1.5rem; font-weight: 600"> ₱ 234, 435, 654.99</span>
                        </div>

                        <div style="display: flex; justify-content: space-between; margin-top: 30px" class="text-white">
                            <span class="font-medium">Total Withdrawn </span> <span class=""><b>₱ 324, 546, 657.87</b></span>
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-4">
                    <div class="card mb-0 bg-color-2">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3 text-white">Marco <b>(40%)</b></span>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                            </div>
                        </div>
                        <div class="text-white" style="text-align: center; display: flex; flex-direction: column">
                            <small style="margin-bottom: 10px">As of Jan 18, '24</small><span style="font-size: 1.5rem; font-weight: 600; text-shadow: 0 0 3px rgba(0, 0, 0, 1)"> ₱ 234, 435, 654.99</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-top: 30px" class="text-white">
                            <span class="font-medium">Total Withdrawn </span> <span class=""><b>₱ 324, 546, 657.87</b></span>
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-4">
                    <div class="card mb-0 bg-color-3">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3 text-white">Mark <b>(10%)</b></span>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                            </div>
                        </div>
                        <div class="text-white" style="text-align: center; display: flex; flex-direction: column">
                            <small style="margin-bottom: 10px">As of Jan 18, '24</small><span style="font-size: 1.5rem; font-weight: 600"> ₱ 234, 435, 654.99</span>
                        </div>

                        <div style="display: flex; justify-content: space-between; margin-top: 30px" class="text-white">
                            <span class="font-medium">Total Withdrawn </span> <span class=""><b>₱ 324, 546, 657.87</b></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="grid">
                <div class="col-12 lg:col-6 xl:col-6">
                    <div class="card mb-0">
                        <div class="">
                            <div class="flex justify-content-between">
                                <div>
                                    <span class="block text-500 font-medium">Estimated Profit</span>
                                </div>
                                <div>
                                    <span>As of Jan 18, '24</span>
                                </div>
                            </div>
                            <div style="text-align: center"><span style="font-size: 2rem; font-weight: 600"> ₱ 234, 435, 654.99</span></div>
                        </div>
                        <Divider />
                        <div class="">
                            <div class="flex justify-content-between mb-3">
                                <div>
                                    <span class="block text-500 font-medium mb-3">Total Profit <b>(Before Split)</b></span>
                                </div>
                                <div>
                                    <span>As of Jan 18, '24</span>
                                </div>
                            </div>
                            <div style="text-align: center"><span style="font-size: 2rem; font-weight: 600"> ₱ 234, 435, 654.99</span></div>
                        </div>

                        <Divider />
                        <div class="">
                            <div class="flex justify-content-between mb-3">
                                <div>
                                    <span class="block text-500 font-medium mb-3">Total Profit After SPLIT <b>(Weekly)</b></span>
                                </div>
                                <div>
                                    <span>As of Jan 18, '24</span>
                                </div>
                            </div>
                            <div style="text-align: center"><span style="font-size: 2rem; font-weight: 600"> ₱ 234, 435, 654.99</span></div>
                        </div>
                        <Divider />
                        <div class="">
                            <div class="flex justify-content-between mb-3">
                                <div>
                                    <span class="block text-500 font-medium mb-3"><b>Total Gross</b></span>
                                </div>
                                <div>
                                    <span>As of Jan 18, '24</span>
                                </div>
                            </div>
                            <div style="text-align: center"><span style="font-size: 2rem; font-weight: 600"> ₱ 234, 435, 654.99</span></div>
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-6">
                    <div class="card mb-0">
                        <div style="text-align: center; margin-bottom: 30px"><span style="font-weight: 600; font-size: 1.4rem">PROFITS SHARE RECEIVED</span></div>
                        <apexchart type="polarArea" :options="chartOptions" :series="chartSeries" width="475" />
                    </div>
                </div>
            </div>
        </AccordionTab>
        <AccordionTab header="User Monitoring">
            <div class="grid">
                <div class="col-12 lg:col-6 xl:col-4">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3"><b>Current Total Player Balance</b></span>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                            </div>
                        </div>
                        <div class="mb-4" style="text-align: center; display: flex; flex-direction: column">
                            <small style="margin-bottom: 10px">As of Jan 18, '24</small><span style="font-size: 1.5rem; font-weight: 600; text-shadow: 0 0 3px rgba(0, 0, 0, 0.2)"> ₱ 234, 435, 654.99</span>
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-4">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3"><b>Total Accounts</b></span>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                            </div>
                        </div>
                        <div class="mb-4" style="text-align: center; display: flex; flex-direction: column">
                            <small style="margin-bottom: 10px">As of Jan 18, '24</small><span style="font-size: 1.5rem; font-weight: 600; text-shadow: 0 0 3px rgba(0, 0, 0, 0.2)"> 546,767</span>
                        </div>
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-4">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3"><b>Total Agents</b></span>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                            </div>
                        </div>
                        <div class="mb-4" style="text-align: center; display: flex; flex-direction: column">
                            <small style="margin-bottom: 10px">As of Jan 18, '24</small><span style="font-size: 1.5rem; font-weight: 600; text-shadow: 0 0 3px rgba(0, 0, 0, 0.2)"> 546,767</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid">
                <div class="col-12 lg:col-6 xl:col-12">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3"><b>Users & Agents (Success Deposit & Withdraw)</b></span>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                            </div>
                        </div>
                        <apexchart type="donut" :options="chartOptionsDonut" :series="seriesDonut" height="400" />
                    </div>
                </div>
            </div>
        </AccordionTab>
        <AccordionTab header="Games Monitoring">
            <div class="grid">
                <div class="col-12 lg:col-6 xl:col-6">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3"><b>Agents Comission</b></span>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                            </div>
                        </div>
                        <apexchart type="donut" :options="chartOptionsRAD" :series="seriesRAD" height="350" />
                    </div>
                </div>
                <div class="col-12 lg:col-6 xl:col-6">
                    <div class="card mb-0">
                        <div class="flex justify-content-between mb-3">
                            <div>
                                <span class="block text-500 font-medium mb-3"><b>Game Providers (BET/WIN/PROFITS)</b></span>
                            </div>
                            <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                                <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                            </div>
                        </div>
                        <apexchart type="bar" :options="chartOptionsCOL" :series="seriesCOL" height="350" />
                    </div>
                </div>
            </div>
        </AccordionTab>
    </Accordion>
</template>

<style>
.bg-color-1 {
    background: rgb(255, 134, 20);
    background: -moz-linear-gradient(52deg, rgba(255, 134, 20, 1) 0%, rgba(246, 255, 20, 1) 48%, rgba(253, 45, 70, 1) 79%, rgba(253, 45, 45, 1) 100%);
    background: -webkit-linear-gradient(52deg, rgba(255, 134, 20, 1) 0%, rgba(246, 255, 20, 1) 48%, rgba(253, 45, 70, 1) 79%, rgba(253, 45, 45, 1) 100%);
    background: linear-gradient(52deg, rgba(255, 134, 20, 1) 0%, rgba(246, 255, 20, 1) 48%, rgba(253, 45, 70, 1) 79%, rgba(253, 45, 45, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff8614",endColorstr="#fd2d2d",GradientType=1);
}

.bg-color-2 {
    background: rgb(255, 63, 20);
    background: -moz-linear-gradient(52deg, rgba(255, 63, 20, 1) 0%, rgba(179, 255, 20, 1) 48%, rgba(45, 119, 253, 1) 79%, rgba(55, 45, 253, 1) 100%);
    background: -webkit-linear-gradient(52deg, rgba(255, 63, 20, 1) 0%, rgba(179, 255, 20, 1) 48%, rgba(45, 119, 253, 1) 79%, rgba(55, 45, 253, 1) 100%);
    background: linear-gradient(52deg, rgba(255, 63, 20, 1) 0%, rgba(179, 255, 20, 1) 48%, rgba(45, 119, 253, 1) 79%, rgba(55, 45, 253, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff3f14",endColorstr="#372dfd",GradientType=1);
}

.bg-color-3 {
    background: rgb(75, 20, 255);
    background: -moz-linear-gradient(52deg, rgba(75, 20, 255, 1) 0%, rgba(20, 246, 255, 1) 47%, rgba(253, 107, 45, 1) 79%, rgba(253, 72, 45, 1) 100%);
    background: -webkit-linear-gradient(52deg, rgba(75, 20, 255, 1) 0%, rgba(20, 246, 255, 1) 47%, rgba(253, 107, 45, 1) 79%, rgba(253, 72, 45, 1) 100%);
    background: linear-gradient(52deg, rgba(75, 20, 255, 1) 0%, rgba(20, 246, 255, 1) 47%, rgba(253, 107, 45, 1) 79%, rgba(253, 72, 45, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#4b14ff",endColorstr="#fd482d",GradientType=1);
}
.text-white {
    color: #fff !important;
    text-shadow: 0 0 3px #000;
}
</style>
