<template>
  <div id="chart3">
    <ClientOnly>
      <apexchart
      :key="series"
        height="300"
        width="100%"
        :options="options"
        :series="series"
      ></apexchart>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
//setup store
const planStore = useMyPlanStore();
//create computed data for chart
const plan = computed(() => {
    return planStore.plan.map(plan => ({
      x: plan.plan_name,
      y: plan.plan_amount
    }))
})

//setup chart options
const options = ref({
  chart: {
    id:'chart3',
    type: 'bar',
    foreColor: '#8f95a1',
  },
  legend:{

  },
  plotOptions: {
    bar: {
      horizontal: false,
      vertical:true
    }
  },
  tooltip: {
    enabled:true,
    style: {
      fontSize: "12px",
      color: '#000000'
    },
    theme:'dark'
  },
})

const series = ref([
  {
    name: 'Plan',
    data: plan.value
  }
])

</script>

<style>

</style>