<template>
  <div class="border-2 border-[#B4B8B9]/30 rounded-2xl p-6 dark:bg-[#313234]">
        <div class="flex flex-col justify-between h-full">
          <div class="flex justify-between">
            <div class="flex flex-col gap-1">
              <h1 class="font-semibold text-2xl dark:text-white">Budget</h1>
              <p class="text-sm text-gray-400">Total budget this month</p>
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

          <h1 class="text-bold text-3xl md:text-4xl mb-2 dark:text-white">
            {{ balance }}
          </h1>
        </div>
      </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  balance: String // replace 'propName' with the actual prop name
})
</script>

<style>

</style>