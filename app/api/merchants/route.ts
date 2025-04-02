import { NextResponse } from "next/server";
import { getMerchants, createMerchant } from "@/lib/data";

// This is a mock implementation. In a real app, you would use a database.
export async function GET() {
  try {
    const merchants = await getMerchants();
    return NextResponse.json(merchants);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch merchants" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newMerchant = await request.json();
    const createdMerchant = await createMerchant(newMerchant);
    return NextResponse.json(createdMerchant, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create merchant" },
      { status: 500 }
    );
  }
}
