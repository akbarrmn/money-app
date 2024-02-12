<template>
  <div id="chart">
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
const colorMode = useColorMode()
const options = ref({
  chart: {
    id: "chart1",
    type: "area",
    height: 230,
    foreColor: colorMode.preference == 'dark' ? "#ccc" : "#000",
    toolbar: {
      autoSelected: "pan",
      show: false
    }
  },
  colors: ["#FB4444"],
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
    strokeColor: "#FF0000",
    strokeWidth: 3
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
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
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
});
const series = ref([
  {
    name: "series",
    data: [31, 40, 28, 51, 42, 109, 100],
  },
]);
</script>
