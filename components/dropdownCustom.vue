<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        class="lg:hidden h-10 w-10 flex p-1 justify-center items-center bg-white dark:bg-[#313234] rounded-full outline-[#B4B8B9]/30 hover:bg-gray-400/50"
      >
        <Menu class="w-full h-full dark:text-white text-black" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56 dark:bg-[#313234] border-2 border-[#B4B8B9]/30 rounded-2xl">
      <DropdownMenuLabel>
        <div
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
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <NuxtLink to="/">
          <DropdownMenuItem class="cursor-pointer">
            <LayoutPanelLeft class="mr-2 h-4 w-4" />
            <span>Overview</span>
          </DropdownMenuItem>
        </NuxtLink>
        <NuxtLink to="/report">
          <DropdownMenuItem class="cursor-pointer">
            <BookOpenText class="mr-2 h-4 w-4" />
            <span>Report</span>
          </DropdownMenuItem>
        </NuxtLink>
        <NuxtLink to="/plan">
          <DropdownMenuItem class="cursor-pointer">
            <NotebookTabs class="mr-2 h-4 w-4" />
            <span>Finance Plan</span>
          </DropdownMenuItem>
        </NuxtLink>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <button
          @click="
            useColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')
          "
          class="w-full"
        >
          <DropdownMenuItem>
            <div>
              <svg
                class="mr-2 w-4 h-4 text-gray-600 dark:text-white hidden dark:block"
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
                class="mr-2 w-4 h-4 text-gray-600 dark:text-white block dark:hidden"
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
            </div>
            <span>Change Theme</span>
          </DropdownMenuItem>
        </button>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <button @click="logout()" class="w-full">
        <DropdownMenuItem>
          <LogOut class="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </button>
      </DropdownMenuContent>
  </DropdownMenu>
</template>

<script lang="ts" setup>
import {
  BookOpenText,
  LayoutPanelLeft,
  LogOut,
  Menu,
  NotebookTabs,
} from "lucide-vue-next";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

//create route for conditional render, setup store and create getter and computed data
const route = useRoute();
const userStore = useUserStore();
const reportStore = useMyReportsStore();
const getSingleUser = userStore.filteredSingleUser;

//logout account
const logout = async () => {
  await userStore.logoutUser();
  navigateTo("/auth");
};

</script>

