<template>
  <div
    class="row-span-2 border-2 border-[#B4B8B9]/30 rounded-2xl dark:bg-[#313234]"
  >
    <div class="flex flex-col justify-between h-full">
      <div class="flex flex-col gap-4 px-6 pt-6">
        <div class="flex justify-between">
          <div class="flex flex-col gap-1">
            <h1 class="font-semibold text-2xl dark:text-white">Expends</h1>
            <p class="text-sm text-gray-400">Total expends</p>
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
                <DialogTitle>Add expends</DialogTitle>
                <DialogDescription>
                  Click save to add your expends
                </DialogDescription>
                <div class="flex flex-col gap-4 mt-4">
                  <Label>Expends Name</Label>
                  <Input
                    id="string"
                    v-model="userExpendsName"
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
                      v-model="userExpends"
                      placeholder="0000000"
                      type="number"
                      class="col-span-3 pl-8 bg-[#F0F3F4]/40 border-2 border-gray-500/50 text-black dark:text-white placeholder:text-gray-600 dark:placeholder:text-white"
                    />
                  </div>
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
        <h1 class="text-xl text-black dark:text-white">
          {{ useFormatCurrency(userStore.filteredSingleUser.expends) }}
        </h1>
      </div>

      <LazyExpendsChart />
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
const { toast } = useToast(); //integrate toast
// state open and setOpen for modal handling
const open = ref(false);
const setOpen = (state: boolean) => (open.value = state);
// get users, setup store and create reactive state
const loading = ref<boolean>(false);
const userStore = useUserStore();
const getSingleUsers = JSON.parse(JSON.stringify(userStore.filteredSingleUser));
const reportStore = useMyReportsStore();

// reactive state for input
const userExpends = ref<number>(0);
const userExpendsName = ref<string>("");

// update income function
const updateIncome = async () => {
  //set loading to true
  loading.value = true;
  // create new user copy and update balance and expends
  let updatedUser = { ...getSingleUsers };
  updatedUser.expends += userExpends.value;
  updatedUser.balance -= userExpends.value;

  // create new mock data for report
  const data = {
    createdAt: new Date(),
    transaction_name: userExpendsName.value,
    transaction_amount: userExpends.value,
    transaction_type: false,
  };
  // check if input is valid
  if (
    JSON.stringify(updatedUser) !== JSON.stringify(getSingleUsers) &&
    userExpends.value > 0 &&
    userExpendsName.value.length > 0
  ) {
    // update user balance, create report, getting user data and report update
    await userStore.updateUserById(getSingleUsers.id, updatedUser);
    await reportStore.postReports(getSingleUsers.id, data);
    await userStore.getUserById(getSingleUsers.id);
    await reportStore.getAllReports(getSingleUsers.id);
    // set loading to false then create notification and close modal
    loading.value = false;
    reportStore.setOpen(false);
    toast({
      title: "Success: Added expends",
      description: "Your expends has been added",
      variant: "success",
    });
    userExpends.value = 0;
    userExpendsName.value = "";
    setOpen(false);
  } else {
    // set loading to false then create notification if input is not valid
    loading.value = false;
    toast({
      title: "Error: Failed to add expends",
      description: "Your expends input not valid",
      variant: "error",
    });
  }
};
</script>

<style></style>
