import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = process.env.JWT_SECRET as string;

const protectedRoutesRegex = /^\/admin\/*/;

const middleware = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    if (!protectedRoutesRegex.test(url.pathname)) {
      return NextResponse.next();
    }

    const token = req.cookies.get("token")?.value;
    console.log(token);
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const secretArray = new TextEncoder().encode(secret);
    const decoded = await jwtVerify(token, secretArray);
    if (!decoded) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export default middleware;
