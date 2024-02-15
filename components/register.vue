<template>
  <div class="rounded-2xl p-6 bg-white w-full max-w-[460px] shadow-md">
    <div class="flex justify-between mb-4">
      <h1 class="text-lg text-black font-bold">Register</h1>
      <p class="text-sm text-black">
        or
        <span @click="userStore.setIsLogin(true)" class="text-blue-500 underline cursor-pointer"
          >already have account></span
        >
      </p>
    </div>

    <form @submit="onRegister" class="flex flex-col gap-2">
      <FormField
        name="fullnameRegister"
        v-slot="{ componentField, errorMessage }"
      >
        <FormItem>
          <FormLabel class="text-black">Fullname</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Enter fullname"
              :class="{
                'bg-[#F0F3F4] outline-[#8791DA] text-black placeholder:text-gray-600':
                  !errorMessage,
                'bg-[#F0F3F4] focus:border-red-500  focus:ring-0 focus:outline-none text-black placeholder:text-gray-600':
                  errorMessage,
              }"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        name="usernameRegister"
        v-slot="{ componentField, errorMessage }"
      >
        <FormItem>
          <FormLabel class="text-black">Username</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Enter username"
              :class="{
                'bg-[#F0F3F4] outline-[#8791DA] text-black placeholder:text-gray-600':
                  !errorMessage,
                'bg-[#F0F3F4] focus:border-red-500  focus:ring-0 focus:outline-none text-black placeholder:text-gray-600':
                  errorMessage,
              }"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        name="passwordRegister"
        v-slot="{ componentField, errorMessage }"
      >
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
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField name="pinRegister" v-slot="{ componentField, errorMessage }">
        <FormItem>
          <FormLabel class="text-black">Pin</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Enter pin"
              :class="{
                'bg-[#F0F3F4] outline-[#8791DA] text-black placeholder:text-gray-600':
                  !errorMessage,
                'bg-[#F0F3F4] focus:border-red-500  focus:ring-0 focus:outline-none text-black placeholder:text-gray-600':
                  errorMessage,
              }"
              v-bind="componentField"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <button
        type="submit"
        class="p-3 mt-3 bg bg-black/50 text-white rounded-lg hover:bg-black/30"
      >
        <span v-if="loading"> Loading... </span>
        <span v-else="loading"> Register </span>
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

const { toast } = useToast(); // toast
//setup store and computed state
const userStore = useUserStore();
const reportStore = useMyReportsStore();
const loading = computed(() => userStore.isLoading);

//create schema validation using zod and vee-validate
const registerFormSchema = toTypedSchema(
  z.object({
    fullnameRegister: z
      .string()
      .min(4, { message: "fullname must be at least 4 characters" })
      .max(50),
    usernameRegister: z
      .string()
      .min(4, { message: "username must be at least 4 characters" })
      .max(50),
    passwordRegister: z
      .string()
      .min(4, { message: "password must be at least 4 characters" })
      .max(50),
    pinRegister: z.coerce
      .string()
      .min(4, { message: "Pin must be at least 4" })
      .max(4, { message: "Pin must be at most 4" }),
  })
);

//setup form handle
const { handleSubmit: handleSubmitRegister } = useForm({
  validationSchema: registerFormSchema,
  validateOnMount: true,
});

//setup onRegister user
const onRegister = handleSubmitRegister((values) => {
  //create mock data
  const mockData = {
    name: values.fullnameRegister,
    username: values.usernameRegister,
    password: values.passwordRegister,
    pin: values.pinRegister,
    balance: 0,
    income: 0,
    expends: 0,
  };
  //set loading
  userStore.setLoading(true);
  //check user exist
  const isUserExist = useUserExist(mockData);

  //if user not exist
  if (Object.keys(isUserExist).length === 0) {
    //create user then set notifcation
    userStore.createUser(mockData);
    setTimeout(() => {
      toast({
        title: "Success: Register",
        description: "User has been registered",
        variant: "success",
      });
      userStore.setLoading(false);
      userStore.setIsLogin(true)
    }, 2000);
    //set loading to false then create notification
  } else {
    userStore.setLoading(false);
    console.log("err");
    toast({
      title: "Error: Failed to register",
      description: "User is exist",
      variant: "error",
    });
  }
});
</script>

