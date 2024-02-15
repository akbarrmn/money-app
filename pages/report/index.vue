<template>
  <div class="container mx-auto pb-10">
    <div class="auto-rows-[190px] md:auto-rows-[200px] gap-4">
      <ReportsMedium/>
      <ReportsSmall/>
    </div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    middleware: ['not-authenticate'],
  })
</script>

<style>

</style>