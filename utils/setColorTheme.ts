type Theme = 'light' | 'dark'
export default function setColorTheme (theme: string) {
  window.localStorage.setItem('theme',theme)
  const getTheme:string | null = window.localStorage.getItem('theme')
  useColorMode().preference = getTheme ?? 'dark'
}
