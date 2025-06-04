import { useEffect, useState } from "react"

type UseLocalStorage<T> = {
  key: string
  defaultValue: T
}

export default function useLocalStorage<T>({
  key,
  defaultValue,
}: UseLocalStorage<T>): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = sessionStorage.getItem(key)
    if (storedValue === null && defaultValue !== undefined) return defaultValue
    return JSON.parse(storedValue as string) as T
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}
