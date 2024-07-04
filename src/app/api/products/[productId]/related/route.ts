import Product from "@/lib/models/Product";
import { connectDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectDB();
    const product = await Product.findById(params.productId);
    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }
    const relatedProducts = await Product.find({
      $or: [
        { category: product.category },
        { collections: { $in: product.collections } },
      ],
      _id: { $ne: product._id },
    });
    if (!relatedProducts) {
      return new NextResponse(
        JSON.stringify({ message: "No related Products found" }),
        { status: 404 }
      );
    }
    return NextResponse.json(relatedProducts, { status: 200 });
  } catch (error) {
    console.log("related route page problem", error);
    return new NextResponse("Internal server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
