<template>
  <div
    class="bg-gradient-to-t to-[#8792db] to-60% from-30% from-[#EBEBEB] min-h-screen h-full flex flex-col gap-8 items-center justify-center"
  >
    <div class="flex flex-col gap-4 justify-center items-center">
      <img src="~/assets/images/Logo.png" alt="logo" width="70" />
      <h1 class="text-white font-bold text-5xl">Money Apps</h1>
    </div>
    <ClientOnly >
      
      <LazyLogin v-if="userStore.isLogin"/>
      <LazyRegister v-if="!userStore.isLogin"/>
    
    </ClientOnly>
  </div>
  <Toaster/>
</template>

<script lang="ts" setup>

definePageMeta({
  layout: "login",
  middleware: ["already-authenticate"],
});
const userStore = useUserStore();
</script>
