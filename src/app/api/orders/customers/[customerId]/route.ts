import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { connectDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { customerId: string } }
) => {
  try {
    await connectDB();
    const orders = await Order.findOne({
      customerClerkId: params.customerId,
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.log("order customer GET route page problem::", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
export const dynamic = "force-dynamic";
