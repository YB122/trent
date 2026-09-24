import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { MotionConfig } from "motion/react";
import { ShopProvider } from "@/store/shop";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return {
    title: messages.meta.title,
    description: messages.meta.description,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "ar" | "en")) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cairo.variable}
    >
      <body className="flex min-h-screen flex-col bg-[#f3f4f6] font-sans text-zinc-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <MotionConfig reducedMotion="user">
            <ShopProvider>{children}</ShopProvider>
          </MotionConfig>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
