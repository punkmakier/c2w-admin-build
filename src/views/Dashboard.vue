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

const splittedShareSeries = [2454156, 1566423, 854654];
const profitSplittedOptions = {
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
            const dataValue = splittedShareSeries[seriesIndex];
            const dataFinalValue = dataValue.toLocaleString();
            return opts.w.config.labels[opts.seriesIndex] + ' - ₱ ' + dataFinalValue;
        }
    }
};

const series = ref([{ data: [21, 22, 10, 28, 16, 21, 13, 30] }]);
const colorsDistributedGameProviders = ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26a69a', '#D10CE8'];
const chartOptions = ref({
    chart: {
        height: 350,
        type: 'bar'
        // events: {
        //     click: handleChartClick
        // }
    },
    colors: colorsDistributedGameProviders,
    plotOptions: {
        bar: {
            columnWidth: '45%',
            distributed: true
        }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
    xaxis: {
        categories: ['JILI', ['Fa', 'Chai'], 'PGSoft', ['Funta', 'Gaming'], 'Evolution ', 'Playstar', 'CGaming ', ['BP', 'Games']],
        labels: {
            style: {
                colors: colorsDistributedGameProviders,
                fontSize: '12px'
            }
        }
    }
});
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

const seriesGameProBetWinProfits = [
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

const chartOptionsGameProBetWinProfits = {
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
    <div class="grid">
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-0" style="padding-bottom: 42px">
                <div class="header-card-1">
                    <span style="font-size: 1.5rem; font-weight: 600; margin-bottom: 7px">Halving</span>
                    <span>Next Split (Feb. 15, '24)</span>
                </div>
                <div class="top-body">
                    <div><i class="pi pi-money-bill" style="font-size: 2.4rem; margin-right: 10px"></i> <span>₱ 500,955</span></div>
                    <div class=""><span style="font-size: 1rem; font-weight: 400">Last Gross Profit: ₱ 500,955 </span></div>
                </div>
                <Divider />
                <div class="team-share">
                    <div style="display: flex; justify-content: space-between"><b>TEAM</b><b>EXPECT TO RECEIVED</b></div>
                    <div style="display: flex; justify-content: space-between"><span>Macmac (50%)</span><span>₱ 250,477.5</span></div>
                    <div style="display: flex; justify-content: space-between"><span>Marco (40%)</span><span>₱ 200,382</span></div>
                    <div style="display: flex; justify-content: space-between"><span>Mark (10%)</span><span>₱ 50,095.5</span></div>
                </div>
                <Divider />
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-0">
                <div style="text-align: center; margin-bottom: 30px"><span style="font-weight: 600; font-size: 1.4rem">PROFITS SHARE RECEIVED</span></div>
                <apexchart type="polarArea" :options="profitSplittedOptions" :series="splittedShareSeries" width="430" />
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-2 bg-color-1">
                <div class="flex justify-content-between">
                    <div>
                        <span class="block text-500 font-medium text-white">Macmac <b>(50%)</b></span>
                    </div>
                    <div style="text-align: center; display: flex; flex-direction: column" class="text-white"><span style="font-size: 1.5rem; font-weight: 600"> ₱ 234, 435, 654.99</span></div>
                </div>

                <div style="display: flex; gap: 10px; margin-top: 30px" class="text-white">
                    <span class="font-medium">Total Withdrawn </span> <span class=""><b>₱ 324, 546, 657.87</b></span>
                </div>
            </div>
            <div class="card mb-2 bg-color-2">
                <div class="flex justify-content-between">
                    <div>
                        <span class="block text-500 font-medium text-white">Marco <b>(40%)</b></span>
                    </div>
                    <div style="text-align: center; display: flex; flex-direction: column" class="text-white"><span style="font-size: 1.5rem; font-weight: 600"> ₱ 234, 435, 654.99</span></div>
                </div>

                <div style="display: flex; gap: 10px; margin-top: 30px" class="text-white">
                    <span class="font-medium">Total Withdrawn </span> <span class=""><b>₱ 324, 546, 657.87</b></span>
                </div>
            </div>
            <div class="card mb-0 bg-color-3">
                <div class="flex justify-content-between">
                    <div>
                        <span class="block text-500 font-medium text-white">Mark <b>(10%)</b></span>
                    </div>
                    <div style="text-align: center; display: flex; flex-direction: column" class="text-white"><span style="font-size: 1.5rem; font-weight: 600"> ₱ 234, 435, 654.99</span></div>
                </div>

                <div style="display: flex; gap: 10px; margin-top: 30px" class="text-white">
                    <span class="font-medium">Total Withdrawn </span> <span class=""><b>₱ 324, 546, 657.87</b></span>
                </div>
            </div>
        </div>

        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-2 bg-success-1" style="height: 227px">
                <div class="flex justify-content-between">
                    <div>
                        <span class="block text-500 font-medium text-white"><b>GROSS PROFIT</b></span>
                    </div>
                    <div style="text-align: center; display: flex; flex-direction: column" class="text-white"><span style="font-size: 1rem"> As of Feb 24, '24</span></div>
                </div>
                <div style="text-align: center; display: flex; flex-direction: column; justify-content: center; align-self: center; height: 100%" class="text-white">
                    <span style="font-size: 3rem; font-weight: 600"> ₱ 500,955</span>
                </div>
            </div>
            <div class="card mb-2 bg-warning-1" style="height: 227px">
                <div class="flex justify-content-between">
                    <div>
                        <span class="block text-500 font-medium text-white"><b>GROSS REVENUE</b></span>
                    </div>
                    <div style="text-align: center; display: flex; flex-direction: column" class="text-white"><span style="font-size: 1rem"> As of Feb 24, '24</span></div>
                </div>
                <div style="text-align: center; display: flex; flex-direction: column; justify-content: center; align-self: center; height: 100%" class="text-white"><span style="font-size: 3rem; font-weight: 600"> ₱ 633,787</span></div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-8">
            <div class="card mb-2" style="padding-bottom: 35px">
                <div class="flex justify-content-between">
                    <div>
                        <span class="block text-500 font-medium"><b>Taxes (Game Providers COMMISSIONS)</b></span>
                    </div>
                    <div style="text-align: center; display: flex; flex-direction: column" class=""><span style="font-size: 1rem"> As of Feb 24, '24</span></div>
                </div>
                <apexchart type="bar" height="350" :options="chartOptions" :series="series" />
                <div class=""><b>Total: ₱ 633,787 </b></div>
            </div>
        </div>

        <!-- COMMISSIONS  -->
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card mb-2" style="height: 460px">
                <div class="flex justify-content-between">
                    <div>
                        <span class="block text-500 font-medium"><b>AGENTS TOTAL COMMISSIONS</b></span>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-money-bill text-blue-500 text-xl"></i>
                    </div>
                </div>
                <div class="" style="position: relative">
                    <apexchart type="donut" :options="chartOptionsDonut" :series="seriesDonut" style="margin-top: 50px; height: auto !important" />
                </div>
            </div>
        </div>
        <div class="col-12 lg:col-6 xl:col-8">
            <div class="card mb-2" style="padding-bottom: 50px">
                <div class="flex justify-content-between">
                    <div>
                        <span class="block text-500 font-medium"><b>Game Providers (BET/WIN/PROFITS)</b></span>
                    </div>
                    <div style="text-align: center; display: flex; flex-direction: column" class=""><span style="font-size: 1rem"> As of Feb 24, '24</span></div>
                </div>

                <apexchart type="bar" :options="chartOptionsGameProBetWinProfits" :series="seriesGameProBetWinProfits" height="350" />
            </div>
        </div>
    </div>
</template>

<style>
.bg-color-1 {
    background: rgb(34, 193, 195);
    background: -moz-linear-gradient(209deg, rgba(34, 193, 195, 1) 0%, rgba(55, 45, 253, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(34, 193, 195, 1) 0%, rgba(55, 45, 253, 1) 100%);
    background: linear-gradient(209deg, rgba(34, 193, 195, 1) 0%, rgba(55, 45, 253, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#22c1c3",endColorstr="#372dfd",GradientType=1);
}

.bg-color-2 {
    background: rgb(253, 233, 45);
    background: -moz-linear-gradient(209deg, rgba(253, 233, 45, 1) 0%, rgba(195, 34, 34, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(253, 233, 45, 1) 0%, rgba(195, 34, 34, 1) 100%);
    background: linear-gradient(209deg, rgba(253, 233, 45, 1) 0%, rgba(195, 34, 34, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fde92d",endColorstr="#c32222",GradientType=1);
}

.bg-color-3 {
    background: rgb(234, 253, 45);
    background: -moz-linear-gradient(209deg, rgba(234, 253, 45, 1) 0%, rgba(195, 134, 34, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(234, 253, 45, 1) 0%, rgba(195, 134, 34, 1) 100%);
    background: linear-gradient(209deg, rgba(234, 253, 45, 1) 0%, rgba(195, 134, 34, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#eafd2d",endColorstr="#c38622",GradientType=1);
}

.bg-success-1 {
    background: rgb(45, 253, 153);
    background: -moz-linear-gradient(209deg, rgba(45, 253, 153, 1) 0%, rgba(34, 195, 90, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(45, 253, 153, 1) 0%, rgba(34, 195, 90, 1) 100%);
    background: linear-gradient(209deg, rgba(45, 253, 153, 1) 0%, rgba(34, 195, 90, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#2dfd99",endColorstr="#22c35a",GradientType=1);
}
.bg-warning-1 {
    background: rgb(253, 184, 45);
    background: -moz-linear-gradient(209deg, rgba(253, 184, 45, 1) 0%, rgba(195, 142, 34, 1) 100%);
    background: -webkit-linear-gradient(209deg, rgba(253, 184, 45, 1) 0%, rgba(195, 142, 34, 1) 100%);
    background: linear-gradient(209deg, rgba(253, 184, 45, 1) 0%, rgba(195, 142, 34, 1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fdb82d",endColorstr="#c38e22",GradientType=1);
}

.text-white {
    color: #fff !important;
    text-shadow: 0 0 3px #000;
}

.header-card-1 {
    text-align: center;
    display: flex;
    flex-direction: column;
}
.top-body {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    margin-top: 20px;
    gap: 15px;
}
.top-body span {
    font-size: 2rem;
    font-weight: 700;
}
.team-share {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>
