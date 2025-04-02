import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Plus } from "lucide-react"

interface PageHeaderProps {
  title: string
  buttonText?: string
  buttonHref?: string
  backHref?: string
}

export function PageHeader({ title, buttonText, buttonHref, backHref }: PageHeaderProps) {
  return (
    <div className="py-6 flex items-center justify-between">
      <div className="flex items-center">
        {backHref && (
          <Link href={backHref} className="mr-2">
            <ChevronLeft className="h-5 w-5 text-gray-500" />
          </Link>
        )}
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </div>
      {buttonText && buttonHref && (
        <Link href={buttonHref}>
          <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-1" />
            {buttonText}
          </Button>
        </Link>
      )}
    </div>
  )
}

