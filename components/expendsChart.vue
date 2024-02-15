<template>
  <div id="chart2">
    <ClientOnly>
      <apexchart
        :key="series"
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


// setup stores
const reportStore = useMyReportsStore();

//create computed data for chart to get the amount of expends
const expendsReports = computed(() => {
  return reportStore.reports.filter((report: Reports) => report.transaction_type === false).map(report => report.transaction_amount);
});

//create computed data for chart to get the date and sort it
const dateReports = computed(() => {
  return reportStore.reports.filter((report: Reports) => report.transaction_type === false).map(report => report.createdAt)
});
const sortedDateReports = computed(() => {
  return dateReports.value.sort((a: Date, b: Date) => new Date(a).getTime() - new Date(b).getTime());
});

// create chart options
const options = ref({
  chart: {
    id: "chart1",
    type: "area",
    height: 230,
    foreColor: "#8f95a1",
    toolbar: {
      autoSelected: "pan",
      show: false,
    },
  },
  colors: ["#FB4444"],
  stroke: {
    width: 3,
  },
  dataLabels: {
    enabled: false,
  },
  fill: {
    gradient: {
      enabled: true,
      opacityFrom: 0.85,
      opacityTo: 0.5,
    },
  },
  markers: {
    size: 5,
    colors: ["#000524"],
    strokeColor: "#FF0000",
    strokeWidth: 3,
  },
  xaxis: {
    type: "datetime",
    categories: sortedDateReports,
  },
  yaxis: {
    opposite: false,
  },
  grid: {
    show: false,
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
    name: "expends",
    data: expendsReports,
  },
]);

</script>
