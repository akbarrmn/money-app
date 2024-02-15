<template>
    <div class="rounded-2xl p-6 bg-white w-full max-w-[460px] shadow-md">
        <div class="flex justify-between mb-4">
          <h1 class="text-lg text-black font-bold">Sign In</h1>
          <p class="text-sm text-black">
            or
            <span @click="userStore.setIsLogin(false)" class="text-blue-500 underline cursor-pointer"
              >create an account</span
            >
          </p>
        </div>
  
          <form @submit="onLogin" class="flex flex-col gap-5">
            <FormField name="usernameLogin" v-slot="{ componentField }">
              <FormItem>
                <FormLabel class='text-black'>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter username"
                    class='bg-[#F0F3F4] outline-[#8791DA] text-black placeholder:text-gray-600'
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage  />
              </FormItem>
            </FormField>
            <FormField name="passwordLogin" v-slot="{ componentField }">
              <FormItem>
                <FormLabel class='text-black'>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    class="bg-[#F0F3F4] outline-[#8791DA] text-black placeholder:text-gray-600"
                    v-bind="componentField"
                  />
                </FormControl>
                <FormMessage />
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
</template>

<script lang="ts" setup>
import { useForm, useField } from "vee-validate";
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
import { useToast, Toaster } from "~/components/ui/toast";

const { toast } = useToast(); //integrate toast
// state open and setOpen for modal handling
const userStore = useUserStore()
const reportStore = useMyReportsStore()
//set loading state
const loading = computed(() => userStore.isLoading) 

//login validation using vee validate and zod
const loginFormSchema = toTypedSchema(z.object({
  usernameLogin: z.string().min(4, { message: "username must be at least 4 characters"}).max(50),
  passwordLogin: z.string().min(4, { message: "password must be at least 4 characters"}).max(50),
}));

//use form hook vee validate
const {handleSubmit: handleSubmitLogin} = useForm({
  validationSchema: loginFormSchema,
  validateOnMount: true
});

//function login
const onLogin = handleSubmitLogin(async (values) => {
  //set loading
  userStore.setLoading(true)
  //check if user matches
  const data = useUserMatcher(values.usernameLogin, values.passwordLogin)
  //if theres data
  if (data !== null) {
    //set user data to filtered, set token and get reports
    userStore.setFiltered(data)
    userStore.setToken(data.id)
    await reportStore.getAllReports(data.id)
    //set loading to false then create notification and reload page
    reportStore.setOpen(false)
    setTimeout(() => {
      toast({
      title: "Success: Login",
      description: "User has been logged in",
      variant: "success",
    });
      userStore.setLoading(false)
      reloadNuxtApp()
    }, 2000);
  }else{
    //set loading to false then create notification
    userStore.setLoading(false)
    console.log('err')
    toast({
      title: "Error: Failed to login",
      description: "Your data is not valid",
      variant: "error",
    });
  }
});
</script>

<style>

</style>