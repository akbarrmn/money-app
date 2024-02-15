<template>
  <div class="container mx-auto pb-5">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[190px] md:auto-rows-[200px] gap-4">
      <LazyBalance />

      <LazyTransfer/>

      <LazyReportsMedium />

      <LazyIncome />

      <LazyExpends />

      <LazyReportsSmall />

      <LazyFinancePlan/>
    </div>
  </div>
</template>

<script lang="ts" setup>
//defining page meta and set middlewares
definePageMeta({
  middleware: ['not-authenticate']
})
</script>

<style></style>
