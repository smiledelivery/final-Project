import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Product from "@/lib/models/Product";
import { connectDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { orderId: String } }
) => {
  try {
    await connectDB();
    const orderDetails = await Order.findById(params.orderId).populate({
      path: "products.product",
      model: Product,
    });
    if (!orderDetails) {
      return new NextResponse(JSON.stringify({ message: "Order Not Found" }), {
        status: 404,
      });
    }
    const customer = await Customer.findOne({
      clerkId: orderDetails.customerClerkId,
    });
    return NextResponse.json({ orderDetails, customer }, { status: 200 });
  } catch (error) {
    console.log("order Id  Get route page problem::", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
export const dynamic = "force-dynamic";
