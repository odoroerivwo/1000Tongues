import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const cookies = req.headers.get("cookie") || ""
  const token = cookies.match(/token=([^;]+)/)?.[1]

  if (!token) {
    // No token? Redirect to login page
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Token found
  return NextResponse.json({ message: "Access granted" })
}
