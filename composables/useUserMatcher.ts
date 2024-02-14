export const useUserMatcher = (data: string) => {
  const userStore = useUserStore();
  const singleUser = userStore.users.filter((user) => user.username === data);
  // convert to single object and return into raw object
  const newObj = singleUser[0]
  return JSON.parse(JSON.stringify(newObj))
};
