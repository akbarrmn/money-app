<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[180px] gap-4">
      <div class="border-2 border-[#B4B8B9]/30 rounded-2xl p-6 dark:bg-[#313234]">
        <div class="flex flex-col justify-between h-full">
          <div class="flex justify-between">
            <div class="flex flex-col gap-1">
              <h1 class="font-semibold text-2xl dark:text-white">Your Balance</h1>
              <p class="text-sm text-gray-400 ">Today, Nov 12</p>
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

          <h1 class="text-bold text-4xl mb-2 dark:text-white">
            {{ formatCurrency(100000) }}
          </h1>
        </div>
      </div>

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

          <h1 class="text-bold text-4xl mb-2 dark:text-white">
            {{ formatCurrency(1000000) }}
          </h1>
        </div>
      </div>

      <div class="row-span-2 hidden lg:block border-2 border-[#B4B8B9]/30 rounded-2xl p-6 dark:bg-[#313234]">
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
            <div class="grid grid-cols-4 text-sm lg:text-md">
                <p class="dark:text-white">Dribble</p>
                <p class="col-span-2 text-gray-400">12/11/2023, 03.00 PM</p>
                <p class="text-red-500">{{ formatCurrency(10000) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="row-span-2 border-2 border-[#B4B8B9]/30 rounded-2xl dark:bg-[#313234]">
        <div class="flex flex-col justify-between h-full">
          <div class="flex justify-between p-6">
            <div class="flex flex-col gap-1">
              <h1 class="font-semibold text-2xl dark:text-white">Income</h1>
              <p class="text-sm text-gray-400 ">Total income</p>
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

          <LazyIncomeChart/>
        </div>
      </div>
      <div class="row-span-2 border-2 border-[#B4B8B9]/30 rounded-2xl dark:bg-[#313234]">
        <div class="flex flex-col justify-between h-full">
          <div class="flex justify-between p-6">
            <div class="flex flex-col gap-1">
              <h1 class="font-semibold text-2xl dark:text-white">Expends</h1>
              <p class="text-sm text-gray-400">Total expends</p>
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

          <LazyExpendsChart/>
        </div>
      </div>

      <div class="row-span-2 block lg:hidden border-2 border-[#B4B8B9]/30 rounded-2xl p-6 dark:bg-[#313234]">
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
            <div class="grid grid-cols-4 text-sm lg:text-md">
                <p class="dark:text-white">Dribble</p>
                <p class="col-span-2 text-gray-400">12/11/2023, 03.00 PM</p>
                <p class="text-red-500">{{ formatCurrency(10000) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="border-2 border-[#B4B8B9]/30 rounded-2xl p-6 dark:bg-[#313234]">
        <div class="flex flex-col justify-between h-full">
          <div class="flex justify-between">
            <div class="flex flex-col gap-1">
              <h1 class="font-semibold text-2xl dark:text-white">Finance Planning</h1>
              <p class="text-sm text-gray-400">Planning for better finance management</p>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
