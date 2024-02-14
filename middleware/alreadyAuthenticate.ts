export default defineNuxtRouteMiddleware(async () => {
    const userStore = useUserStore();
    
    // If theres data user navigate to home
    if (Object.keys(userStore.filteredSingleUser).length > 0) {
        return await navigateTo("/");
    }
})
