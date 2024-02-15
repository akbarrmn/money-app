//composables for user exist and filter to get the exist user  or not
export const useUserExist = (data:any) => {
  const userStore = useUserStore();
  const allUsers = userStore.users
  
  const userExist = allUsers.filter((user) => user.username === data.username);

  return userExist
}
