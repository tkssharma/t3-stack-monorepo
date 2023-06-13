import { getEnvVariables, getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { signJWT } from "@/lib/token";
import { LoginUserInput, LoginUserSchema } from "@/lib/validation/user.schema";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LoginUserInput;
    const data = LoginUserSchema.parse(body);
    console.log(data);
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await compare(data.password, user.password))) {
      return getErrorResponse(401, "invalid data");
    }

    const JWT_EXPIRE_IN = getEnvVariables("JWT_EXPIRE_IN");

    const token = await signJWT({ sub: user.id }, { exp: `${JWT_EXPIRE_IN}m` });
    console.log(token);
    const tokenMaxAge = parseInt(JWT_EXPIRE_IN) * 60;
    const cookiesOptions = {
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      maxAge: tokenMaxAge,
    };
    const response = new NextResponse(
      JSON.stringify({ status: "success", token })
    );

    await Promise.all([
      response.cookies.set(cookiesOptions),
      response.cookies.set({
        name: "logged-in",
        value: "true",
        maxAge: tokenMaxAge,
      }),
    ]);
    return response;
  } catch (err: any) {
    if (err instanceof ZodError) {
      return getErrorResponse(400, "failed validations", err);
    }
    console.log(err);
    return getErrorResponse(500, "internal server error", err.message);
  }
}
