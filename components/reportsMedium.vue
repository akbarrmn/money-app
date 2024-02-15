<template>
  <div
    class="row-span-2 hidden lg:block border-2 h-full border-[#B4B8B9]/30 rounded-2xl p-6 dark:bg-[#313234]"
  >
    <div class="flex flex-col gap-3 h-full justify-between">
      <div class="flex flex-col gap-3 h-full">
        <div class="flex justify-between">
          <div class="flex flex-col gap-1">
            <h1 class="font-semibold text-2xl dark:text-white">Reports</h1>
            <p class="text-sm text-gray-400">All reports</p>
          </div>
          <div v-if="route !== '/'" class="flex gap-4">
            <Select v-model="filter" :key="filter">
              <SelectTrigger
                class="w-[180px] dark:bg-[#313234] border-2 border-gray-500/50 text-black dark:text-white placeholder:text-gray-600 dark:placeholder:text-white"
              >
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent
                class="dark:bg-[#313234] border-2 border-gray-500/50 text-black dark:text-white placeholder:text-gray-600 dark:placeholder:text-white"
              >
                <SelectGroup>
                  <SelectItem value="all"> All </SelectItem>
                  <SelectItem value="day"> This Day </SelectItem>
                  <SelectItem value="month"> Month </SelectItem>
                  <SelectItem value="year"> Year </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              v-if="filter === 'month'"
              id="number"
              v-model="filterMonth"
              placeholder="range 1 to 12"
              type="number"
              class="w-[180px] dark:bg-[#313234] border-2 border-gray-500/50 text-black dark:text-white placeholder:text-gray-600 dark:placeholder:text-white"
            />
            <Input
              v-if="filter === 'year'"
              id="number"
              v-model="filterYear"
              placeholder="2024"
              type="number"
              class="w-[180px] dark:bg-[#313234] border-2 border-gray-500/50 text-black dark:text-white placeholder:text-gray-600 dark:placeholder:text-white/30"
            />
          </div>
        </div>

        <div
          v-bind:class="{
            'flex flex-col gap-2': route === '/',
            'flex flex-col gap-3 mt-5': route !== '/',
          }"
        >
          <div
            v-bind:class="{
              'grid grid-cols-4 text-gray-400 text-sm dark:text-white':
                route === '/',
              'grid grid-cols-3 text-gray-400 text-sm lg:text-xl dark:text-white':
                route !== '/',
            }"
          >
            <p>PAYMENT</p>
            <p v-bind:class="{ 'col-span-2': route === '/' }">DATE</p>
            <p>AMOUNT</p>
          </div>
          <div
            v-bind:class="{
              'max-h-[250px] h-full overflow-y-scroll': route === '/',
              '  h-max-[380px] h-[380px] overflow-y-scroll': route !== '/',
            }"
          >
            <div
              v-for="i in reportStore.filteredReports"
              :key="i.id"
              v-bind:class="{
                'grid grid-cols-4 gap-2 text-sm lg:text-md': route === '/',
                'grid grid-cols-3 gap-2 text-sm lg:text-lg': route !== '/',
              }"
            >
              <p class="dark:text-white truncate">{{ i.transaction_name }}</p>
              <p
                v-bind:class="{
                  'col-span-2 text-gray-400': route === '/',
                  'col-span-1 text-gray-400': route !== '/',
                }"
              >
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
      <div class="flex justify-end w-full">
        <NuxtLink
          v-if="route === '/'"
          to="/report"
          class="text-sm text-gray-400"
          >show all reports</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
//create store and route 
const reportStore = useMyReportsStore();
const route = useRoute().path;

//create reactive component state
const filter = ref("");
const filterMonth = ref();
const filterYear = ref();

//watch for changes
watch([filter, filterMonth, filterYear], () => {
  reportStore.computeFilteredReports(filter, filterMonth, filterYear);
})

</script>

<style></style>
