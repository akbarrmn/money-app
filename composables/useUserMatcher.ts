//composables for user match and filter to get the user that difference from the other users
export const useUserMatcher = (username: string, password: string) => {
  const userStore = useUserStore();
  const singleUser = userStore.users.filter((user) => user.username === username && user.password === password);
  if (Object.keys(singleUser).length > 0) {
    // convert to single object and return into raw object
    const newObj = singleUser[0]
    return JSON.parse(JSON.stringify(newObj))
  }else{
    return null
  }
};
