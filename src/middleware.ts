import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
    const pathname = req.nextUrl.pathname;
    // if (getUnauthPaths().includes(pathname)) {
    //     return unauthMiddleware(req);
    // }
    // return authMiddleware(req);
    return NextResponse.next();
};

export const config = {
    matcher: [
        "/",
        "/signin",
        "/signup",
        "/dashboard",
        "/settings/:path*",
    ],
};
