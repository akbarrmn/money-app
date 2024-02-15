type Theme = 'light' | 'dark'
// composables for changing theme
export const useColorTheme = (theme: string) => {
  useColorMode().preference = theme
}
