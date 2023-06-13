import { getEnvVariables, getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { signJWT } from "@/lib/token";
import {
  RegisterUserInput,
  RegisterUserSchema,
} from "@/lib/validation/user.schema";
import { compare, hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterUserInput;
    const data = RegisterUserSchema.parse(body);
    console.log(data);
    const hashPassword = await hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashPassword,
      },
    });
    const response = new NextResponse(
      JSON.stringify({
        status: "success",
        data: {
          ...user,
          password: undefined,
        },
      }),
      {
        status: 201,
      }
    );

    return response;
  } catch (err: any) {
    if (err instanceof ZodError) {
      return getErrorResponse(400, "failed validations", err);
    }
    if (err.code === "P2002") {
      return getErrorResponse(409, "user with that email already exists");
    }
    return getErrorResponse(500, err.message);
  }
}
