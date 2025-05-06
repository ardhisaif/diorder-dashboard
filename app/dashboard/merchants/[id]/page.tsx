import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getMerchantById } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

// Helper function to check if a merchant is currently open
function isCurrentlyOpen(openTime: string, closeTime: string): boolean {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const [openHour, openMinute] = openTime.split(":").map(Number);
  const [closeHour, closeMinute] = closeTime.split(":").map(Number);

  // Convert to minutes since midnight for easier comparison
  const currentTimeInMinutes = currentHour * 60 + currentMinute;
  const openTimeInMinutes = openHour * 60 + openMinute;
  const closeTimeInMinutes = closeHour * 60 + closeMinute;

  // Handle normal case (open and close times on the same day)
  if (openTimeInMinutes < closeTimeInMinutes) {
    return (
      currentTimeInMinutes >= openTimeInMinutes &&
      currentTimeInMinutes < closeTimeInMinutes
    );
  }
  // Handle overnight case (e.g., open 22:00, close 02:00)
  else {
    return (
      currentTimeInMinutes >= openTimeInMinutes ||
      currentTimeInMinutes < closeTimeInMinutes
    );
  }
}

export default async function MerchantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const merchant = await getMerchantById(Number.parseInt(params.id));

  if (!merchant) {
    return <div>Merchant not found</div>;
  }

  const isOpen = isCurrentlyOpen(
    merchant.openingHours.open,
    merchant.openingHours.close
  );

  return (
    <div className="container max-w-md mx-auto px-4 pb-20">
      <PageHeader title="Merchant Detail" backHref="/dashboard/merchants" />

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col items-center mb-4">
            <div className="relative h-32 w-32 rounded-md overflow-hidden mb-4">
              <Image
                src={
                  merchant.logo.startsWith("http")
                    ? merchant.logo
                    : "/placeholder.svg?height=128&width=128"
                }
                alt={merchant.name}
                fill
                className="object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold">{merchant.name}</h2>
            <div
              className={`mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                isOpen
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isOpen ? "Open Now" : "Closed"}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              <p>{merchant.address}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Operating Hours
              </h3>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>
                  {merchant.openingHours.open} - {merchant.openingHours.close}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link href={`/dashboard/merchants/${merchant.id}/edit`}>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Edit Merchant
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
