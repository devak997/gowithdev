import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "./lib/session";

const protectedRoutesRegex = /^\/admin\/*/;

const middleware = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    if (!protectedRoutesRegex.test(url.pathname)) {
      return NextResponse.next();
    }

    await verifyToken();
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
};

export default middleware;
