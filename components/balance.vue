<template>
  <div class="border-2 border-[#B4B8B9]/30 rounded-2xl p-6 dark:bg-[#313234]">
    <div class="flex flex-col justify-between h-full">
      <div class="flex justify-between">
        <div class="flex flex-col gap-1">
          <h1 class="font-semibold text-2xl dark:text-white">Your Balance</h1>
          <p class="text-sm text-gray-400">Today, Nov 12</p>
        </div>
        <Dialog>
          <DialogTrigger as-child>
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
          </DialogTrigger>
          <DialogContent
            class="sm:max-w-[425px] dark:bg-[#313234] border-2 border-[#B4B8B9]/30 rounded-2xl p-6"
          >
            <DialogHeader>
              <DialogTitle>Add balance</DialogTitle>
              <DialogDescription>
                Click save to add your balance
              </DialogDescription>
              <div class="flex flex-col gap-4 mt-4">
                <Label>Balance</Label>
                <Input
                  id="number"
                  v-model="userBalance"
                  placeholder="0000000"
                  type="number"
                  class="col-span-3 bg-[#F0F3F4]/40 border-2 border-gray-500/50 text-white placeholder:text-gray-600"
                />
              </div>
            </DialogHeader>
            <DialogFooter>
              <button @click="updateBalance" type="submit" class="px-6 py-2 bg-[#585a5d] hover:bg-[#424446] border-2 border-white/30 text-white rounded-md mt-3">
                Save
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <h1 class="text-bold text-3xl md:text-4xl mb-2 dark:text-white">
        {{ balance }}
      </h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";

const props = defineProps({
  balance: String, // replace 'propName' with the actual prop name
});
const userStore = useUserStore();
const reportStore = useMyReportsStore();
const getSingleUsers = JSON.parse(JSON.stringify(userStore.filteredSingleUser));
const userBalance = ref<number>(0)
const updateBalance = async () => {
  let updatedUser = { ...getSingleUsers };
  updatedUser.balance += userBalance.value
  const date = new Date(Date.now()).toISOString()
  const data = {
    transaction_name: "Added Balance",
    transaction_amount: userBalance.value,
    transaction_type: true,
  }

  await userStore.updateUserById(getSingleUsers.id, updatedUser)
  await reportStore.postReports(getSingleUsers.id, data)

}

</script>

<style></style>
