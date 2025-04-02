import { NextResponse } from "next/server";
import { getMenus, createMenu } from "@/lib/data";

export async function GET() {
  try {
    const menus = await getMenus();
    return NextResponse.json(menus);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch menus" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const newMenu = await request.json();
    const createdMenu = await createMenu(newMenu);
    return NextResponse.json(createdMenu, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create menu" },
      { status: 500 }
    );
  }
}
