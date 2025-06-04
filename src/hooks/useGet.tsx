import { useEffect, useState, useCallback } from "react"
import api from "@/lib/api"

export function useGet<T = any>(endpoint: string) {
  const [data, setData] = useState<T | null>(null)
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<any>(null)

  const fetchData = useCallback(async () => {
    setIsDataLoading(true)
    setIsError(false)
    setError(null)

    try {
      const response = await api.get(endpoint)
      setData(response.data)
    } catch (err: any) {
      setIsError(true)
      setError(err)
    } finally {
      setIsDataLoading(false)
    }
  }, [endpoint])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    data,
    isDataLoading,
    isError,
    error,
    refetch: fetchData,
  }
}
