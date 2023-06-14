import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const feedback = await prisma.feedback.findUnique({
    where: { id },
  });

  if (!feedback) {
    let error_response = {
      status: "fail",
      message: "No Feedback with the Provided ID Found",
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }
  let json_response = {
    status: "success",
    data: {
      feedback,
    },
  };
  return NextResponse.json(json_response);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    await prisma.feedback.delete({
      where: { id },
    });
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    let error_response = {
      status: "error",
      message: "failed to delete resource",
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const json = await request.json();

    const updated_feedback = await prisma.feedback.update({
      where: { id },
      data: json,
    });
    let json_response = {
      status: "success",
      data: {
        feedback: updated_feedback,
      },
    };
    return NextResponse.json(json_response);
  } catch (err) {
    let error_response = {
      status: "error",
      message: "failed to update resource",
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
