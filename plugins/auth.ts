export default defineNuxtPlugin(async (nuxtApp) => {
    const userStore = useUserStore();
    const getToken = useCookie('MY_COOKIE');
    console.log(getToken.value)
    if(!userStore.filteredSingleUser){
        await userStore.getUserById((getToken.value) as unknown as number)
    }
})
