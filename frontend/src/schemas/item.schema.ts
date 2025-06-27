import { z } from "zod"

export const itemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number({
    required_error: "Price is required",
    invalid_type_error: "Price must be a number",
  }).positive("Price must be positive"),
})

export type ItemFormValues = z.infer<typeof itemSchema>



