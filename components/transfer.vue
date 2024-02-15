<template>
  <div class="border-2 border-[#B4B8B9]/30 rounded-2xl p-6 dark:bg-[#313234]">
    <div class="flex flex-col justify-between h-full">
      <div class="flex justify-between">
        <div class="flex flex-col gap-1">
          <h1 class="font-semibold text-2xl dark:text-white">Transfer</h1>
          <p class="text-sm text-gray-400">Transfer to another user</p>
        </div>
        <Dialog :open="open">
          <DialogTrigger as-child>
            <button
              @click="setOpen(true)"
              class="rounded-lg w-10 h-10 flex justify-center items-center bg-gray-400/60 hover:bg-gray-400/30"
            >
              <ArrowLeftRight />
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
              <DialogTitle>Transfter balance</DialogTitle>
              <DialogDescription>
                Click save to transfer your balance
              </DialogDescription>
              <div class="flex flex-col gap-4 mt-4">
                <Label>Account number</Label>
                <Input
                  id="number"
                  v-model="account"
                  placeholder="Enter account number"
                  type="number"
                  class="col-span-3 bg-[#F0F3F4]/40 border-2 border-gray-500/50 text-black dark:text-white placeholder:text-gray-600/50 dark:placeholder:text-white/80"
                />
                <Label>Balance</Label>
                <div class="relative inline-block">
                  <h1
                    class="absolute top-[0.425rem] left-2.5 text-gray-400 dark:text-white"
                  >
                    Rp
                  </h1>
                  <Input
                    id="number"
                    v-model="userBalance"
                    placeholder="0000000"
                    type="number"
                    class="col-span-3 pl-8 bg-[#F0F3F4]/40 border-2 border-gray-500/50 text-black dark:text-white placeholder:text-gray-600 dark:placeholder:text-white"
                  />
                </div>
              </div>
            </DialogHeader>
            <DialogFooter>
              <button
                @click="handlePin"
                type="submit"
                :disabled="loading"
                class="px-6 py-2 bg-[#585a5d] hover:bg-[#424446] border-2 border-white/30 text-white rounded-md mt-3"
              >
                <span v-if="loading"> Loading </span>
                <span v-else="loading"> Save </span>
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog :open="pinOpen">
          <DialogContent
            class="sm:max-w-[425px] dark:bg-[#313234] border-2 border-[#B4B8B9]/30 rounded-2xl p-6"
          >
            <DialogHeader>
              <DialogClose
                class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                @click="setPinOpen(false)"
              >
                <X class="w-4 h-4" />
                <span class="sr-only">Close</span>
              </DialogClose>
              <DialogTitle>Pin Input</DialogTitle>
              <DialogDescription>
                Enter pin to transfer
              </DialogDescription>
              <PinInput
                id="pin-input"
                v-model="valuePin"
                placeholder="○"
                class="flex gap-2 items-center mt-4 w-full justify-center"
                @complete="updateBalance"
              >
                <PinInputInput
                  v-for="(id, index) in 4"
                  :key="id"
                  :index="index"
                  class="bg-[#F0F3F4]/40 w-[4.2rem] h-[4.2rem] text-xl"
                />
              </PinInput>
            </DialogHeader>
            <DialogFooter>
              <h1 v-if="loading" class="text-4xl">
                Loading ...
              </h1>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div class="flex gap-4">
        <img
          src="~/assets/images/user.png"
          alt="image"
          width="60"
          class="rounded-full border-2 border-[#B4B8B9]/30"
        />
        <img
          src="~/assets/images/user.png"
          alt="image"
          width="60"
          class="rounded-full border-2 border-[#B4B8B9]/30"
        />
        <img
          src="~/assets/images/user.png"
          alt="image"
          width="60"
          class="rounded-full border-2 border-[#B4B8B9]/30"
        />
        <img
          src="~/assets/images/user.png"
          alt="image"
          width="60"
          class="rounded-full border-2 border-[#B4B8B9]/30"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowLeftRight, X } from "lucide-vue-next";

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
import { PinInput, PinInputInput } from "@/components/ui/pin-input";

// state pin
const valuePin = ref<string[]>([]);
const { toast } = useToast();// toast
// state open and setOpen for modal handling
const open = ref(false);
const pinOpen = ref(false);
const setOpen = (state: boolean) => (open.value = state);
const setPinOpen = (state: boolean) => (pinOpen.value = state);
//create store, getters and reactive state for input
const userStore = useUserStore();
const reportStore = useMyReportsStore();
const getSingleUsers = JSON.parse(JSON.stringify(userStore.filteredSingleUser));
const userBalance = ref<number>(0);
const account = ref<number>();
const loading = ref<boolean>(false);

//create handle pin and setup notif
const handlePin = () => {
  if (userBalance.value > 0 && account.value) {
    setOpen(false);
    setTimeout(() => {
      setPinOpen(true);
    }, 100);
  }else{
    toast({
      title: "Error: Failed to add balance",
      description: "Your input not valid",
      variant: "error",
    });
  }
}

//update balance function
const updateBalance = async () => {
  loading.value = true; //loading
  //create new state copy and update balance
  let updatedUser = { ...getSingleUsers };
  updatedUser.balance -= userBalance.value;
  //create mock data for transfer
  const data = {
    createdAt: new Date(),
    transaction_name: "Transfer to another user",
    transaction_amount: userBalance.value,
    transaction_type: false,
  };
  //checkif pin is valid
  let pinMatched = updatedUser.pin === valuePin.value.join("");
  if (
    JSON.stringify(updatedUser) !== JSON.stringify(getSingleUsers) &&
    userBalance.value > 0 && pinMatched
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
      title: "Success: Added balance",
      description: "Your balance has been added",
      variant: "success",
    });
    account.value = 0;
    userBalance.value = 0;
    account.value = 0;
    valuePin.value = [];
    setPinOpen(false);
  } else {
    // set loading to false then create notification
    loading.value = false;
    toast({
      title: "Error: Failed to add balance",
      description: "Your pin input not valid",
      variant: "error",
    });
  }
};
</script>

<style></style>
