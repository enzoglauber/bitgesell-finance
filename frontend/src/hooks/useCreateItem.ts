import { ItemFormValues } from "@/schemas/item.schema"
import { useMutation } from "@tanstack/react-query"

export function useCreateItem(onSuccess?: () => void) {
  return useMutation({
    mutationFn: async (data: ItemFormValues) => {
      const res = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error("Failed to create item")
      return res.json()
    },
    onSuccess,
  })
}