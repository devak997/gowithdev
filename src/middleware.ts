import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/session";

const protectedRoutesRegex = /^\/admin\/*/;

const middleware = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    if (!protectedRoutesRegex.test(url.pathname)) {
      return NextResponse.next();
    }

    await verifyToken();
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
};

export default middleware;
