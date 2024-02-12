// @ts-ignore
import VueApexCharts from "vue3-apexcharts"

export default defineNuxtPlugin(nuxtApp => {
const apexchart = VueApexCharts;
nuxtApp.vueApp.component("apexchart", apexchart);
})