import { NextResponse } from "next/server";
import { getMenus, createMenu } from "@/lib/data";

export async function GET() {
  try {
    const menus = await getMenus();
    return NextResponse.json(menus);
  } catch (error) {
    console.error("GET menus error:", error);
    return NextResponse.json(
      { error: "Failed to fetch menus" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newMenu = await request.json();
    // Validate required fields
    if (!newMenu.merchant_id || !newMenu.name || !newMenu.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    const createdMenu = await createMenu(newMenu);
    return NextResponse.json(createdMenu, { status: 201 });
  } catch (error) {
    console.error("POST menu error:", error);
    return NextResponse.json(
      { error: "Failed to create menu", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
