import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectDB();
    const collection = await Collection.findById(params.collectionId).populate({
      path: "products",
      model: Product,
    });
    if (!collection) {
      return new NextResponse(
        JSON.stringify({ massage: "Collection not found" }),
        { status: 404 }
      );
    }
    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("collection ID route GET page problem::", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectDB();
    let collection = await Collection.findById(params.collectionId);
    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }
    const { title, description, image } = await req.json();
    if (!title || !image) {
      return new NextResponse("Title and Image are required", { status: 400 });
    }
    collection = await Collection.findByIdAndUpdate(
      params.collectionId,
      { title, description, image },
      { new: true }
    );
    await collection.save();
    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    console.log("collection Id route Post page problem::", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    await connectDB();
    await Collection.findByIdAndDelete(params.collectionId);
    await Product.updateMany(
      { collections: params.collectionId },
      { $pull: { collections: params.collectionId } }
    );
    return new NextResponse("Collection is deleted", {
      status: 200,
    });
  } catch (error) {
    console.log("collection Id Delete page route problem::", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};
export const dynamic = "force-dynamic";
