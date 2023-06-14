import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const page_str = request.nextUrl.searchParams.get("page");
    const limit_str = request.nextUrl.searchParams.get("limit");

    const page = page_str ? parseInt(page_str, 10) : 1;
    const limit = limit_str ? parseInt(limit_str, 10) : 10;
    const skip = (page - 1) * limit;

    const feedbacks = await prisma.feedback.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    let json_response = {
      status: "success",
      result: feedbacks.length,
      feedbacks,
    };
    return NextResponse.json(json_response);
  } catch (err: any) {
    let error_response = {
      status: "error",
      message: err.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const feedback = await prisma.feedback.create({
      data: json,
    });
    let json_response = {
      status: "success",
      data: { feedback },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    if (err.code === "P2002") {
      let error_response = {
        status: "fail",
        message: "Feedback with title already exists",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 409,
        headers: { "Content-Type": "application/json" },
      });
    }
    let error_response = {
      status: "error",
      message: err.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
