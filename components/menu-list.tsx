"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import useSWR from "swr";

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function MenuList() {
  const [merchantFilter, setMerchantFilter] = useState("all");

  // Use SWR for data fetching with proper loading and error states
  const {
    data: menus,
    error: menusError,
    isLoading: menusLoading,
  } = useSWR("/api/menus", fetcher);
  const {
    data: merchants,
    error: merchantsError,
    isLoading: merchantsLoading,
  } = useSWR("/api/merchants", fetcher);

  // Show loading state if either request is still loading
  const isLoading = menusLoading || merchantsLoading;

  // Handle error states
  const hasError = menusError || merchantsError;
  if (hasError) {
    return (
      <div className="text-center py-4 text-red-500">
        Error loading data. Please try again.
      </div>
    );
  }

  // Filter menus based on selected merchant
  const filteredMenus =
    !isLoading &&
    (merchantFilter === "all"
      ? menus
      : menus.filter(
          (menu: any) => menu.merchant_id === Number.parseInt(merchantFilter)
        ));

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="mb-4">
        <Select value={merchantFilter} onValueChange={setMerchantFilter}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filter by merchant" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Merchants</SelectItem>
            {merchants?.map((merchant: any) => (
              <SelectItem key={merchant.id} value={merchant.id.toString()}>
                {merchant.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredMenus.map((menu: any) => {
        const merchant = merchants?.find((m: any) => m.id === menu.merchant_id);

        return (
          <Link key={menu.id} href={`/dashboard/menus/${menu.id}`}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden">
                    <Image
                      src={
                        menu.image?.startsWith("http")
                          ? menu.image
                          : "/placeholder.svg?height=64&width=64"
                      }
                      alt={menu.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{menu.name}</h3>
                    <p className="text-sm text-gray-500">
                      {merchant?.name || "Unknown Merchant"}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                        {menu.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-orange-500 font-medium">
                    Rp {menu.price.toLocaleString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
