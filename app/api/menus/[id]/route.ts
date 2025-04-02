import { NextResponse } from "next/server";
import { getMenuById, updateMenu, deleteMenu } from "@/lib/data";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number.parseInt(params.id);
    const menu = await getMenuById(id);

    if (!menu) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    return NextResponse.json(menu);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch menu" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number.parseInt(params.id);
    const updatedData = await request.json();
    const updatedMenu = await updateMenu(id, updatedData);
    return NextResponse.json(updatedMenu);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update menu" },
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
    await deleteMenu(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete menu" },
      { status: 500 }
    );
  }
}
