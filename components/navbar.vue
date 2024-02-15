<template>
  <nav class="container flex justify-between py-4 w-full items-center mx-auto">
    <div class="flex gap-8 items-center">
      <div class="flex gap-4 items-center">
        <img src="~/assets/images/Logo.png" alt="logo" width="50" />
        <h1 class="text-black dark:text-white">Money App</h1>
      </div>
      <div class="hidden lg:flex gap-5">
        <NuxtLink to="/" v-bind:class="{'text-[#4D72F6]': route.path === '/', 'text-black dark:text-white': route.path !== '/'}"
          >Overview</NuxtLink
        >
        <NuxtLink to="/report" v-bind:class="{'text-[#4D72F6]': route.path === '/report', 'text-black dark:text-white': route.path !== '/report'}">Reports</NuxtLink>
        <NuxtLink to="/plan" v-bind:class="{'text-[#4D72F6]': route.path === '/plan', 'text-black dark:text-white': route.path !== '/plan'}">Planning </NuxtLink>
      </div>
    </div>
    <button class="lg:hidden h-10 w-10 flex p-1 justify-center items-center rounded-full outline-[#B4B8B9]/30 hover:bg-gray-400/50 ">
      <Menu class="w-full h-full" />
    </button>
    <div class="hidden lg:flex gap-4 items-center">
      <button
        @click="
          useColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')
        "
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

      <Popover>
        <PopoverTrigger as-child>
          <button
            @click="setOpenNotification()"
            class="relative rounded-full hidden md:block outline outline-[#B4B8B9]/30 hover:bg-gray-400/50 p-2"
          >
            <svg
              class="w-6 h-6 text-gray-600 dark:text-white"
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
            <div
              v-bind:class="{
                'absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900 bg-red-500':
                  !isOpen,
                'absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold bg-gray-400/50 text-white border-2 border-[#B4B8B9]/30 rounded-full -top-2 -end-2 dark:border-gray-900':
                  isOpen,
              }"
            >
              {{ reportStore.reports.length }}
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent
          class="w-96 dark:bg-[#313234] border-2 border-[#B4B8B9]/30 rounded-2xl p-6"
        >
          <div
            v-for="i in reportStore.reports"
            :key="i.id"
            class="grid grid-cols-4 gap-2 text-sm lg:text-md"
          >
            <p class="dark:text-white truncate">{{ i.transaction_name }}</p>
            <p class="col-span-2 text-gray-400">
              {{ useDateParse(JSON.parse(JSON.stringify(i.createdAt))) }}
            </p>
            <p
              v-bind:class="{
                'text-green-500 truncate': i.transaction_type,
                'text-red-500 truncate': !i.transaction_type,
              }"
            >
              {{ useFormatCurrency(i.transaction_amount) }}
            </p>
          </div>
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger >
          <button
          class="flex gap-3 items-center hover:bg-gray-300/50 p-2 rounded-lg"
          >
            <img
              v-bind:src="getSingleUser.image"
              alt="logo"
              width="50"
              class="filter drop-shadow-md rounded-full"
            />
            <div
              class="flex flex-col items-start text-xs md:text-base dark:text-white"
            >
              <p>{{ getSingleUser.name }}</p>
              <p>{{ getSingleUser.username }}</p>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-36 dark:bg-[#313234] border-2 border-[#B4B8B9]/30 rounded-xl p-2">
          <DropdownMenuItem class="cursor-pointer">
            <button @click="logout" class="flex items-center w-full h-full">
              <LogOut class="ml-4 h-4 w-4" />
              <span class="ml-2">Log out</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { LogOut, Menu } from "lucide-vue-next";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

//create route for conditional render, setup store and create getter and computed data
const route = useRoute();
const userStore = useUserStore();
const reportStore = useMyReportsStore();
const getSingleUser = userStore.filteredSingleUser;
const isOpen = computed(() => reportStore.isOpen);

//open notif
const setOpenNotification = () => {
  reportStore.setOpen(true);
};

//logout account
const logout = async () => {
  await userStore.logoutUser();
  navigateTo("/auth");
};
</script>
