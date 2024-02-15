//create plugin for auth
export default defineNuxtPlugin(async (nuxtApp) => {
    const userStore = useUserStore();
    const reportStore = useMyReportsStore()
    const getToken = useCookie('MY_COOKIE');
    if(!userStore.filteredSingleUser){
        await userStore.getUserById((getToken.value) as unknown as number)
        await reportStore.getAllReports(getToken.value as unknown as number)
    }
})
