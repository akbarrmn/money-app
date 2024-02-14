export default defineNuxtRouteMiddleware(async() => {
    const userStore = useUserStore();
    
    // If theres no data user navigate to login
    if (Object.keys(userStore.filteredSingleUser).length === 0) {
        return await navigateTo("/auth");
    }
})
