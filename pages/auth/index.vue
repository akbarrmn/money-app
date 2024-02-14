<template>
  <div
    class="bg-gradient-to-t to-[#8792db] to-60% from-30% from-[#EBEBEB] min-h-screen h-full flex flex-col gap-8 items-center justify-center"
  >
    <div class="flex flex-col gap-4 justify-center items-center">
      <img src="~/assets/images/Logo.png" alt="logo" width="70" />
      <h1 class="text-white font-bold text-5xl">Money Apps</h1>
    </div>
    <ClientOnly >
      <div class="rounded-2xl p-6 bg-white w-full max-w-[460px] shadow-md">
        <div class="flex justify-between mb-4">
          <h1 class="text-lg text-black font-bold">Sign In</h1>
          <p class="text-sm text-black">
            or
            <span class="text-blue-500 underline cursor-pointer"
              >create an account</span
            >
          </p>
        </div>
  
          <form @submit.prevent="onSubmit" class="flex flex-col gap-5">
            <FormField name="username" v-slot="{ componentField }">
              <FormItem>
                <FormLabel class="text-black">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter username"
                    class="bg-[#F0F3F4] outline-[#8791DA] text-black placeholder:text-gray-600"
                    v-bind="componentField"
                  />
                </FormControl>
              </FormItem>
            </FormField>
            <FormField name="password" v-slot="{ componentField }">
              <FormItem>
                <FormLabel class="text-black">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    class="bg-[#F0F3F4] outline-[#8791DA] text-black placeholder:text-gray-600"
                    v-bind="componentField"
                  />
                </FormControl>
              </FormItem>
            </FormField>
            <p class="text-sm text-blue-500 cursor-pointer">
              Forgot your password ?
            </p>
  
            <button
              type="submit"
              class="p-3 bg bg-black/50 text-white rounded-lg hover:bg-black/30"
            >
              <span v-if="loading">
              Loading...
              </span>
              <span v-else="loading">
                Sign In
              </span>
            </button>
          </form>
  
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserMatcher } from "~/composables/useUserMatcher";

definePageMeta({
  layout: "login",
  middleware: ["already-authenticate"],
});

const userStore = useUserStore()
const reportStore = useMyReportsStore()
const usersData = computed(() => userStore.users)
const loading = computed(() => userStore.isLoading)

const formSchema = toTypedSchema(
  z.object({
    username: z
      .string()
      .min(4, { message: "Username must be at least 4 characters" })
      .max(50),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" })
      .max(50),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  userStore.setLoading(true)
  const data = useUserMatcher(values.username)
  userStore.setFiltered(data)
  userStore.setToken(userStore.filteredSingleUser.id)
  reportStore.getAllReports(Number(userStore.filteredSingleUser.id))
  reportStore.setOpen(false)
  setTimeout(() => {
    userStore.setLoading(false)
    navigateTo("/", { replace: true });    
  }, 2000);
});

</script>
