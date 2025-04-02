"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const merchantSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  logo: z.string().url({ message: "Please enter a valid URL" }).or(z.string().startsWith("/")),
  openingHours: z.object({
    open: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Please enter a valid time (HH:MM)" }),
    close: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Please enter a valid time (HH:MM)" }),
  }),
})

type MerchantFormValues = z.infer<typeof merchantSchema>

interface MerchantFormProps {
  merchant: any | null
}

export function MerchantForm({ merchant }: MerchantFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<MerchantFormValues>({
    resolver: zodResolver(merchantSchema),
    defaultValues: merchant
      ? {
          name: merchant.name,
          address: merchant.address,
          logo: merchant.logo,
          openingHours: {
            open: merchant.openingHours.open,
            close: merchant.openingHours.close,
          },
        }
      : {
          name: "",
          address: "",
          logo: "/placeholder.svg?height=150&width=150",
          openingHours: {
            open: "08:00",
            close: "20:00",
          },
        },
  })

  async function onSubmit(data: MerchantFormValues) {
    setIsSubmitting(true)

    try {
      const url = merchant ? `/api/merchants/${merchant.id}` : "/api/merchants"

      const method = merchant ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to save merchant")
      }

      router.push("/dashboard/merchants")
      router.refresh()
    } catch (error) {
      console.error("Error saving merchant:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete() {
    if (!merchant || !confirm("Are you sure you want to delete this merchant?")) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`/api/merchants/${merchant.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete merchant")
      }

      router.push("/dashboard/merchants")
      router.refresh()
    } catch (error) {
      console.error("Error deleting merchant:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Merchant Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter merchant name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter merchant address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter logo URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="openingHours.open"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opening Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="openingHours.close"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Closing Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-between">
              <Button type="submit" className="bg-orange-500 hover:bg-orange-600" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {merchant ? "Update Merchant" : "Create Merchant"}
              </Button>

              {merchant && (
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

