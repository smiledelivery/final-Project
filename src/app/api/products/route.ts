import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }
    await connectDB();
    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();
    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }
    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });
    await newProduct.save();
    if (collections) {
      for (const collectionId of collections) {
        const collection = await Collection.findById(collectionId);
        if (collection) {
          collection.products.push(newProduct._id);
          await collection.save();
        }
      }
    }
    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log("product Post route page problem :: ", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectDB();
    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log("products Get route page problem", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
