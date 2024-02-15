// @ts-ignore
import VueApexCharts from "vue3-apexcharts"

//create apexchart plugin
export default defineNuxtPlugin(nuxtApp => {
const apexchart = VueApexCharts;
nuxtApp.vueApp.component("apexchart", apexchart);
})