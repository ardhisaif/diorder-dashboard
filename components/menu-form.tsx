"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

const menuSchema = z.object({
  merchant_id: z.string().transform((val) => Number.parseInt(val)),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  price: z.string().transform((val) => Number.parseInt(val)),
  image: z.string().url({ message: "Please enter a valid URL" }).or(z.string().startsWith("/")),
  category: z.string().min(1, { message: "Please select a category" }),
})

type MenuFormValues = z.infer<typeof menuSchema>

interface MenuFormProps {
  menu: any | null
}

export function MenuForm({ menu }: MenuFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [merchants, setMerchants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMerchants() {
      try {
        const response = await fetch("/api/merchants")
        const data = await response.json()
        setMerchants(data)
      } catch (error) {
        console.error("Error fetching merchants:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMerchants()
  }, [])

  const form = useForm<MenuFormValues>({
    resolver: zodResolver(menuSchema),
    defaultValues: menu
      ? {
          merchant_id: menu.merchant_id.toString(),
          name: menu.name,
          price: menu.price.toString(),
          image: menu.image,
          category: menu.category,
        }
      : {
          merchant_id: "",
          name: "",
          price: "0",
          image: "/placeholder.svg?height=150&width=150",
          category: "",
        },
  })

  async function onSubmit(data: MenuFormValues) {
    setIsSubmitting(true)

    try {
      const url = menu ? `/api/menus/${menu.id}` : "/api/menus"

      const method = menu ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to save menu")
      }

      router.push("/dashboard/menus")
      router.refresh()
    } catch (error) {
      console.error("Error saving menu:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!menu || !confirm("Are you sure you want to delete this menu?")) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/menus/${menu.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete menu")
      }

      router.push("/dashboard/menus")
      router.refresh()
    } catch (error) {
      console.error("Error deleting menu:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2">Loading merchants...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="merchant_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Merchant</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a merchant" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {merchants.map((merchant) => (
                        <SelectItem key={merchant.id} value={merchant.id.toString()}>
                          {merchant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter menu name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (Rp)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter image URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Makanan">Makanan</SelectItem>
                      <SelectItem value="Minuman">Minuman</SelectItem>
                      <SelectItem value="Snack">Snack</SelectItem>
                      <SelectItem value="Dessert">Dessert</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between">
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {menu ? "Update Menu" : "Create Menu"}
              </Button>

              {menu && (
                <Button type="button" variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

