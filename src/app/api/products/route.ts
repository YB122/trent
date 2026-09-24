import { NextResponse } from "next/server";
import { getHomeSections } from "@/data/products";

// Later: replace the static source inside getHomeSections with a real
// backend call (Prisma, Firebase Admin, or an external REST API).
// Clients keep fetching this route with axios, so they won't change.
export async function GET() {
  return NextResponse.json(await getHomeSections());
}
