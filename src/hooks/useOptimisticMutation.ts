import { useMutation, useQueryClient } from "@tanstack/react-query"

type UseOptimisticMutationProps<TData, TVariables> = {
  queryKey: unknown[]
  mutationFn: (variables: TVariables) => Promise<TData>
  getOptimisticData: (variables: TVariables, currentData?: TData[] | undefined) => TData[]
  onSuccess?: () => void
}

export function useOptimisticMutation<TData = unknown, TVariables = unknown>({
  queryKey,
  mutationFn,
  getOptimisticData,
  onSuccess,
}: UseOptimisticMutationProps<TData, TVariables>) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn,
    onMutate: async (variables: TVariables) => {
      await queryClient.cancelQueries({ queryKey })

      const previousData = queryClient.getQueryData<TData[]>(queryKey)

      const optimisticData = getOptimisticData(variables, previousData)

      queryClient.setQueryData(queryKey, optimisticData)

      return { previousData }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey })
      onSuccess?.()
    },
  })
}
