<template>
  <nav class="container flex justify-between py-4 w-full mx-auto">
    <div class="flex gap-8 items-center">
      <div class="flex gap-4 items-center">
        <img src="~/assets/images/Logo.png" alt="logo" width="40" />
        <h1 class="text-black dark:text-white">Money App</h1>
      </div>
      <div class="hidden lg:flex gap-5">
        <NuxtLink to="#" class="text-[#4D72F6] dark:text-white">Overview</NuxtLink>
        <NuxtLink to="#" class="text-black dark:text-white">Reports</NuxtLink>
        <NuxtLink to="#" class="text-black dark:text-white">Planning </NuxtLink>
      </div>
    </div>
    <div class="flex gap-4 items-center">
      <button
        @click="setColorTheme($colorMode.preference == 'dark' ? 'light': 'dark')"
        class="rounded-full hidden md:block outline outline-[#B4B8B9]/30 hover:bg-gray-400/50 p-2"
      >
        <svg
          class="w-6 h-6 text-gray-600 dark:text-white hidden dark:block"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 21a9 9 0 0 1-.5-18v0A9 9 0 0 0 20 15h.5a9 9 0 0 1-8.5 6Z"
          />
        </svg>
        <svg
          class="w-6 h-6 text-gray-600 dark:text-white block dark:hidden"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5V3m0 18v-2M7 7 5.7 5.7m12.8 12.8L17 17M5 12H3m18 0h-2M7 17l-1.4 1.4M18.4 5.6 17 7.1M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
          />
        </svg>
      </button>

      <button
        class="rounded-full hidden md:block outline outline-[#B4B8B9]/30 hover:bg-gray-400/50 p-2"
      >
        <svg
          class="w-6 h-6 text-gray-600 dark:text-white "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5.4V3m0 2.4a5.3 5.3 0 0 1 5.1 5.3v1.8c0 2.4 1.9 3 1.9 4.2 0 .6 0 1.3-.5 1.3h-13c-.5 0-.5-.7-.5-1.3 0-1.2 1.9-1.8 1.9-4.2v-1.8A5.3 5.3 0 0 1 12 5.4ZM8.7 18c.1.9.3 1.5 1 2.1a3.5 3.5 0 0 0 4.6 0c.7-.6 1.3-1.2 1.4-2.1h-7Z"
          />
        </svg>
      </button>
      <button
        class="flex gap-3 items-center hover:bg-gray-300/50 p-2 rounded-lg"
      >
        <img
          src="~/assets/images/user.png"
          alt="logo"
          width="40"
          class="filter drop-shadow-md"
        />
        <div class="flex flex-col items-start text-xs md:text-base dark:text-white">
          <p>Akbar Rahmana</p>
          <p>akbarrahmana123</p>
        </div>
      </button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
const route = useRoute()
console.log(route)
</script>