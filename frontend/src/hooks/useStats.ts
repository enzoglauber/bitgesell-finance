import { Stats } from "@/interfaces/stats"
import { useQuery } from "@tanstack/react-query"

export function useStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: async (): Promise<Stats> => {
      const res = await fetch("/api/stats")
      if (!res.ok) throw new Error("Failed to fetch stats")
      return res.json()
    },
    staleTime: 0,
    placeholderData: (previousData) => previousData
  })
}
