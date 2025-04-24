import { NextResponse } from "next/server";
import { getMerchantById, updateMerchant, deleteMerchant } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number.parseInt(params.id);
    const merchant = await getMerchantById(id);

    if (!merchant) {
      return NextResponse.json(
        { error: "Merchant not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(merchant);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch merchant" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number.parseInt(params?.id);
    const updatedData = await request.json();
    const updatedMerchant = await updateMerchant(id, updatedData);
    return NextResponse.json(updatedMerchant);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update merchant" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number.parseInt(params.id);
    await deleteMerchant(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete merchant" },
      { status: 500 }
    );
  }
}
