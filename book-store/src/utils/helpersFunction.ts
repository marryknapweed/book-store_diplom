export const getImageBackgroundColor = (price: string) => {
  const numericPrice = parseFloat(String(price).replace('$', ''))

  if (numericPrice > 50) {
    return '#D7E4FD' // Голубой фон для дорогих книг
  } else if (numericPrice > 20) {
    return '#FEE9E2' // Оранжевый фон для средней цены книг
  } else if (numericPrice > 0) {
    return '#CAEFF0' // Зеленый фон для дешевых книг
  } else {
    return '#F4EEFD' // Розовый фон для бесплатных книг
  }
}
