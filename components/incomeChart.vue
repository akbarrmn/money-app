<template>
  <button @click="refresh">Refresh</button>
  <div id="chart1">
    <ClientOnly>
      <apexchart
        :key="isRefresh"
        height="250"
        width="100%"
        :options="options"
        :series="series"
      ></apexchart>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import type { Reports } from '~/utils/types/report.types';
//setup store and getters
const isRefresh = ref(0);
const reportStore = useMyReportsStore();
//create computed data for chart to get the amount of income
const incomeReports = computed(() => {
  return reportStore.reports.filter((report: Reports) => report.transaction_type === true).map(report => report.transaction_amount);
});
//create computed data for chart to get the date and sort it
const dateReports = computed(() => {
  return reportStore.reports.filter((report: Reports) => report.transaction_type === true).map(report => report.createdAt)
});
const sortedDateReports = computed(() => {
  return dateReports.value.sort((a: Date, b: Date) => new Date(a).getTime() - new Date(b).getTime());
});

const refresh = () => {
  isRefresh.value += 1
}

//setup chart options
const options = ref({
  chart: {
    id: "chart1",
    type: "area",
    height: 230,
    foreColor: '#8f95a1',
    toolbar: {
      autoSelected: "pan",
      show: false
    }
  },
  colors: ["#008FFB"],
  stroke: {
    width: 3
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    gradient: {
      enabled: true,
      opacityFrom: 0.85,
      opacityTo: 0.5
    }
  },
  markers: {
    size: 5,
    colors: ["#000524"],
    strokeColor: "#36a3f5",
    strokeWidth: 3
  },
  xaxis: {
    type: "datetime",
    categories: sortedDateReports,
  },
  yaxis: {
    opposite: false,
  },
  grid:{
    show:false
  },
  legend: {
    horizontalAlign: "left",
  },
  tooltip: {
    enabled:true,
    style: {
      fontSize: "12px",
      color: '#000000'
    },
    x: {
      format: "dd/MM/yy HH:mm",
    },
    theme:'dark'
  },
});


const series = ref([
  {
    name: "Income",
    data: incomeReports,
  },
]);
</script>
