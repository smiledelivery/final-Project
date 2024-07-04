import Product from "@/lib/models/Product";
import { connectDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { query: string } }
) => {
  try {
    await connectDB();
    const searchedProducts = await Product.find({
      $or: [
        { title: { $regex: params.query, $options: "i" } },
        { tags: { $in: [new RegExp(params.query, "i")] } },
      ],
    });
    return NextResponse.json(searchedProducts, { status: 200 });
  } catch (error) {
    console.log("search route page problem", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
export const dynamic = "force-dynamic";
