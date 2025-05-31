export const formatDateTime = (date: string | Date, locale?: string) => {
  if (!date) return 'Fecha no disponible'

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // "Mon"
    month: 'short',   // "Apr"
    day: 'numeric',   // "23"
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',   // "8"
    minute: '2-digit', // "00"
    hour12: true,
  }

  try {
    const dateObj = new Date(date)

    // Format date and time separately
    const datePart = new Intl.DateTimeFormat(locale, dateOptions).format(dateObj)
    const timePart = new Intl.DateTimeFormat(locale, timeOptions).format(dateObj)

    // Capitalize first letter of day and month
    const capitalizedDate = datePart.replace(/^(\w)/, (match) => match.toUpperCase())
      .replace(/(\s)(\w)/g, (match, space, letter) => space + letter.toUpperCase())

    // Fix AM/PM format (remove dots and make uppercase)
    const fixedTimePart = timePart.replace(/([ap])\.\s*m\./gi, (match, letter) => letter.toUpperCase() + 'M')

    // Join with a different separator (using " • " as an example)
    return `${capitalizedDate} • ${fixedTimePart}`

  } catch {
    return 'Fecha no disponible'
  }
}