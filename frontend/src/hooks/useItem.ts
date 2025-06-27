import { useQuery } from "@tanstack/react-query";

export function useItem(id: string) {
  return useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const res = await fetch(`/api/items/${id}`);
      if (!res.ok) throw new Error("Item not found");
      return res.json();
    },
    retry: false,
  });
}