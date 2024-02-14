<template>
  <div
    class="row-span-2 border-2 border-[#B4B8B9]/30 rounded-2xl dark:bg-[#313234]"
  >
    <div class="flex flex-col justify-between h-full">
      <div class="flex flex-col gap-4 px-6 pt-6">
        <div class="flex justify-between">
          <div class="flex flex-col gap-1">
            <h1 class="font-semibold text-2xl dark:text-white">Income</h1>
            <p class="text-sm text-gray-400">Total income</p>
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

        <h1 class="text-xl text-black dark:text-white">
          {{ income }}
        </h1>
      </div>

      <LazyIncomeChart />
    </div>
  </div>
</template>

<script lang="ts" setup> 
const props = defineProps ({
  income: String
})
</script>

<style></style>
