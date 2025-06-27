import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateItem } from "@/hooks/useCreateItem";
import { ItemFormValues, itemSchema } from "@/schemas/item.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ItemForm() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      category: "",
      price: 0,
    },
  })

  const mutation = useCreateItem(async () => {
    toast.success("Item has been created.")
    await queryClient.invalidateQueries({ queryKey: ["items"] })
    await queryClient.invalidateQueries({ queryKey: ["stats"] })
    navigate("/")
  })

  const onSubmit = (data: ItemFormValues) => mutation.mutate(data)

  return (
    <div className="container mx-auto max-w-screen-xl py-4 px-4 md:px-4 lg:px-6 ">
      <div className="flex flex-col justify-center self-start mb-4 w-full lg:w-full max-w-screen-xl">
        <Card >
          <CardHeader>
            <CardTitle className="text-lg font-medium">Add New Item</CardTitle>
          </CardHeader>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <Input id="name" {...field} />
                  )}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <Input id="category" {...field} />
                  )}
                />
                {form.formState.errors.category && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.category.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Controller
                  name="price"
                  control={form.control}
                  render={({ field }) => (
                    <Input
                      type="number"
                      step="0.01"
                      id="price"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
                {form.formState.errors.price && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.price.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="mt-4">
              <Button type="submit" disabled={mutation.isPending} onClick={() => {
                console.log('Form values:', form.getValues())
                console.log('Form state:', form.formState)
              }}>
                {mutation.isPending ? "Saving..." : "Create"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}