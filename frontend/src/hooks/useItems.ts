import { Item } from "@/interfaces/Item"
import { useQuery } from "@tanstack/react-query"

export interface PaginatedItems {
  items: Item[]
  total: number
}

export function useItems(page = 1, limit = 10, query = "") {
  return useQuery({
    queryKey: ["items", page, limit, query],
    queryFn: async (): Promise<PaginatedItems> => {
      const params = new URLSearchParams({ page: String(page), limit: String(limit) })
      if (query) params.append("q", query)

      const res = await fetch(`http://localhost:3001/api/items?${params.toString()}`)
      if (!res.ok) throw new Error("Failed to fetch items")

      return res.json()
    },
    placeholderData: (previousData) => previousData
  })
}