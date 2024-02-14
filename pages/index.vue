<template>
  <div class="container mx-auto pb-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[190px] md:auto-rows-[200px] gap-4">
      <LazyBalance :balance="useFormatCurrency(getUserData.balance)" />

      <LazyBudget :balance="useFormatCurrency(getUserData.balance)"/>

      <LazyReportsMedium />

      <LazyIncome :income="useFormatCurrency(getUserData.income)" />

      <LazyExpends :expends="useFormatCurrency(getUserData.expends)" />

      <LazyReportsSmall />

      <LazyFinancePlan/>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['not-authenticate']
})

const userStore = useUserStore()
const getUserData = userStore.filteredSingleUser



</script>

<style></style>
