import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectDB();
    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });
    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "product not found" }),
        {
          status: 404,
        }
      );
    }
    return new NextResponse(JSON.stringify(product), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    console.log("productID Get route page problem::", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
