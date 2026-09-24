import { redirect } from "next/navigation";

// `/` is handled by the next-intl middleware (redirects to `/ar`),
// this is a fallback for direct static access.
export default function RootPage() {
  redirect("/ar");
}
