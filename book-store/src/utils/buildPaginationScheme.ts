export function buildPaginationScheme (currentPage: number, pagesCount: number): (number | string)[] {
  const prevPageNumber = currentPage - 1
  const nextPageNumber = currentPage + 1
  let scheme: (number | string)[] = []

  // Добавляем первые три страницы и многоточие для текущей страницы 1
  if (currentPage === 1) {
    scheme.push(1, 2, 3)
    if (pagesCount > 3) {
      scheme.push('...', pagesCount)
    }
  } else {
    scheme = [1, prevPageNumber, currentPage, nextPageNumber, pagesCount]
    const filteredScheme = scheme.filter((item) => { // Фильтруем недопустимые значения
      if (typeof item === 'number') { // Проверяем, является ли элемент числом
        return item > 0 && item <= pagesCount
      }
      return true
    })
    const set = new Set(filteredScheme)
    scheme = Array.from(set)

    if (scheme[1] !== 2) scheme.splice(1, 0, '...')
    if (scheme[scheme.length - 2] !== pagesCount - 1) scheme.splice(scheme.length - 1, 0, '...')
  }

  return scheme
}
