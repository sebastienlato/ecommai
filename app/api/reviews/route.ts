import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const { productId, rating, comment } = json;

    if (!productId || !rating || !comment) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const review = await prisma.review.create({
      data: {
        rating: Number(rating),
        comment: String(comment),
        product: {
          connect: {
            id: productId,
          },
        },
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    // Update product rating
    const reviews = await prisma.review.findMany({
      where: {
        productId,
      },
      select: {
        rating: true,
      },
    });

    const averageRating =
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        rating: Number(averageRating),
        numReviews: Number(reviews.length),
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("[REVIEWS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const reviews = await prisma.review.findMany({
      where: {
        productId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("[REVIEWS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
