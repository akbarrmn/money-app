export const useDateParse = (date: string) => {
  const parse = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })
  return parse
}
