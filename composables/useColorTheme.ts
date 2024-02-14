type Theme = 'light' | 'dark'
export const useColorTheme = (theme: string) => {
  useColorMode().preference = theme
}
