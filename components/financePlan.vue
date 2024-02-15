<template>
  <div v-if="route!=='/'" class="mt-4">
    <LazyFinanceChart/>
  </div>
  <div class="row-span-2 lg:row-span-1 border-2 border-[#B4B8B9]/30 rounded-2xl p-6 dark:bg-[#313234]">
    <div class="flex flex-col gap-3 h-full justify-between">
      <div class="flex flex-col gap-3 h-full">
        <div class="flex justify-between">
          <div class="flex flex-col gap-1">
              <h1 class="font-semibold text-2xl dark:text-white">
                Finance Planning
              </h1>
              <p class="text-sm text-gray-400">
                Planning for better finance management
              </p>
            </div>
            <Dialog :open="open">
              <DialogTrigger as-child>
                <button
                  @click="setOpen(true)"
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
              </DialogTrigger>
              <DialogContent
                class="sm:max-w-[425px] dark:bg-[#313234] border-2 border-[#B4B8B9]/30 rounded-2xl p-6"
              >
                <DialogHeader>
                  <DialogClose
                    class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                    @click="setOpen(false)"
                  >
                    <X class="w-4 h-4" />
                    <span class="sr-only">Close</span>
                  </DialogClose>
                  <DialogTitle>Add Finance Planning</DialogTitle>
                  <DialogDescription>
                    Click save to add your plan
                  </DialogDescription>
                  <div class="flex flex-col gap-4 mt-4">
                    <Label>Planning Name</Label>
                    <Input
                      id="string"
                      v-model="userPlanName"
                      placeholder="Purchasing lamborghini"
                      type="text"
                      class="col-span-3 bg-[#F0F3F4]/40 border-2 border-gray-500/50 text-black dark:text-white placeholder:text-gray-600/50 dark:placeholder:text-white/80"
                    />
                    
                    <Label>Add Expends</Label>
                    <div class="relative inline-block">
                      <h1
                        class="absolute top-[0.425rem] left-2.5 text-gray-400 dark:text-white"
                      >
                        Rp
                      </h1>
                      <Input
                        id="number"
                        v-model="userPlanPrice"
                        placeholder="0000000"
                        type="number"
                        class="col-span-3 pl-8 bg-[#F0F3F4]/40 border-2 border-gray-500/50 text-black dark:text-white placeholder:text-gray-600 dark:placeholder:text-white"
                      />
                    </div>
                    <Label>Target Date</Label>
                    <Popover>
                      <PopoverTrigger as-child>
                        <Button
                          :variant="'outline'"
                          :class="
                            cn(
                              'w-full justify-start text-left border-2 border-gray-500/50 font-normal bg-[#F0F3F4]/40 hover:bg-[#F0F3F4]/20',
                              !date && 'text-muted-foreground'
                            )
                          "
                        >
                          <CalendarIcon class="mr-2 h-4 w-4 dark:text-white" />
                          <span class="dark:text-white">{{
                            date ? format(date, "PPP - hh:mm") : "Pick a date"
                          }}</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent class="w-auto p-0">
                        <Calendar v-model="date" mode="datetime" class="dark:bg-[#29292A] dark:border-2 dark:border-[#B4B8B9]/30" />
                      </PopoverContent>
                    </Popover>
                  </div>
                </DialogHeader>
                <DialogFooter>
                  <button
                    @click="updateIncome"
                    type="submit"
                    :disabled="loading"
                    class="px-6 py-2 bg-[#585a5d] hover:bg-[#424446] border-2 border-white/30 text-white rounded-md mt-3"
                  >
                    <span v-if="loading"> Loading... </span>
                    <span v-else="loading"> Save </span>
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <div v-bind:class="{'flex flex-col gap-2': route === '/', 'flex flex-col gap-3 mt-5': route !== '/'}">
            <div v-bind:class="{'grid grid-cols-4 text-gray-400 text-sm dark:text-white': route === '/', 'grid grid-cols-3 text-gray-400 text-sm lg:text-xl dark:text-white': route !== '/'}">
              <p>PLAN NAME</p>
              <p v-bind:class="{ 'col-span-2': route === '/' }">TARGET PLAN</p>
              <p>PRICE</p>
            </div>
            <div v-bind:class="{'max-h-[200px] lg:max-h-[40px] h-full overflow-y-scroll': route === '/', ' h-full max-h-[200px] lg:max-h-[125px] overflow-y-scroll': route !== '/'}">
              <div v-for="i in userPlans" v-bind:class="{'grid grid-cols-4 gap-2 text-sm lg:text-md': route === '/', 'grid grid-cols-3 gap-2 text-sm lg:text-lg': route !== '/'}">
                <p class="dark:text-white truncate">{{ i.plan_name }}</p>
                <p v-bind:class="{'col-span-2 text-gray-400' : route === '/', 'col-span-1 text-gray-400' : route !== '/'}">{{ useDateParse(String(new Date(i.plan_target))) }}</p>
                <p class="text-green-500 truncate">
                  {{ useFormatCurrency(i.plan_amount) }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end w-full -mt-2">
            <NuxtLink v-if="route === '/'" to="/plan" class="text-sm text-gray-400 ">show all plans</NuxtLink>
          </div>
      </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { useToast } from "@/components/ui/toast";
import { X } from "lucide-vue-next";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { cn } from "@/utils/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./ui/button";
import type { FinancePlan } from "~/utils/types/finance.types";

const { toast } = useToast(); //integrate toast
const route = useRoute().path //route path for conditional rendering
// state open and setOpen for modal handling
const open = ref(false);
const setOpen = (state: boolean) => (open.value = state);
//create loading state and setup store and getters
const loading = ref<boolean>(false);
const userStore = useUserStore();
const getSingleUsers = JSON.parse(JSON.stringify(userStore.filteredSingleUser));
// get users and create reactive state for input
const userId = ref(getSingleUsers.id);
const userPlans = computed(() => planStore.plan.filter(plan => plan.userId === userId.value));
// get users, setup store and create reactive state
const planStore = useMyPlanStore()
const userPlanPrice = ref<number>(0);
const userPlanName = ref<string>("");
const date = ref<Date>();

//update income function
const updateIncome = async () => {
  //set loading to true
  loading.value = true;
  // create new user copy and update data needs
  const data: FinancePlan = {
    createdAt: new Date(),
    plan_name: userPlanName.value,
    plan_amount: userPlanPrice.value,
    plan_target: date.value || new Date(),
    id: useUniqueUuid(),
    userId: getSingleUsers.id,
  };
  // check if input is valid
  if (userPlanPrice.value > 0 && userPlanName.value.length > 0 && date.value) {
    // update user plan, changing state loading and making notification
    planStore.setPlan([data, ...JSON.parse(JSON.stringify(planStore.plan))]);
    loading.value = false;
    toast({
      title: "Success: Added expends",
      description: "Your expends has been added",
      variant: "success",
    });
    //reset data
    userPlanPrice.value = 0;
    userPlanName.value = "";
    //close modal
    setOpen(false);
  } else {
    loading.value = false; //set loading to false
    toast({ //create notification
      title: "Error: Failed to add expends",
      description: "Your expends input not valid",
      variant: "error",
    });
  }
};
</script>

<style></style>
