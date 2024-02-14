<template>
  <div
    class="row-span-2 hidden lg:block border-2 border-[#B4B8B9]/30 rounded-2xl p-6 dark:bg-[#313234]"
  >
    <div class="flex flex-col gap-3 h-full">
      <div class="flex justify-between">
        <div class="flex flex-col gap-1">
          <h1 class="font-semibold text-2xl dark:text-white">Reports</h1>
          <p class="text-sm text-gray-400">Reports from this day</p>
        </div>
        <button
          class="rounded-full w-10 h-10 flex justify-center items-center hover:bg-gray-400/50"
        >
          <svg
            class="w-8 h-8 text-black dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="4"
              d="M12 6h0m0 6h0m0 6h0"
            />
          </svg>
        </button>
      </div>

      <div class="flex flex-col gap-2">
        <div class="grid grid-cols-4 text-gray-400 text-sm dark:text-white">
          <p>PAYMENT</p>
          <p class="col-span-2">DATE</p>
          <p>AMOUNT</p>
        </div>
        <div
          v-for="i in getReports"
          :key="i.id"
          class="grid grid-cols-4 gap-2 text-sm lg:text-md"
        >
          <p class="dark:text-white truncate">{{ i.transaction_name }}</p>
          <p class="col-span-2 text-gray-400">
            {{ useDateParse(JSON.parse(JSON.stringify(i.createdAt))) }}
          </p>
          <p
            v-bind:class="{
              'text-green-500': i.transaction_type,
              'text-red-500': !i.transaction_type,
            }"
          >
            {{ useFormatCurrency(i.transaction_amount) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const reportStore = useMyReportsStore();
const getReports = reportStore.reports;
</script>

<style></style>
