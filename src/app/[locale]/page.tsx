import { getTranslations, setRequestLocale } from "next-intl/server";
import { getHomeSections } from "@/data/products";
import { routing } from "@/i18n/routing";
import HomeClient from "./home-client";

// Revalidate the HTML at most once a minute.
// Swap getHomeSections internals to a live backend and
// this page + /api/products stay fresh with no other changes.
export const revalidate = 60;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const [sections, t] = await Promise.all([
    getHomeSections(),
    getTranslations("sections"),
  ]);

  return (
    <HomeClient
      sections={sections}
      titles={{
        top: t("top"),
        new: t("new"),
        viewed: t("viewed"),
        recent: t("recent"),
        forYou: t("foryou"),
      }}
    />
  );
}
