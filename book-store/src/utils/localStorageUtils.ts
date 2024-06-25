export function getFromLocalStorage <T> (key: string): T | null {
  const jsonData = localStorage.getItem(key)

  if (!jsonData) return null

  return JSON.parse(jsonData) as T
}

export function setToLocalStorage <T> (key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data))
}
