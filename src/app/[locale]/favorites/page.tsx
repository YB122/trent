"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { SiteHeader, BottomNav } from "@/components/site-chrome";
import { useShop } from "@/store/shop";
import { productById } from "@/data/products";

export default function FavoritesPage() {
  const t = useTranslations("wishlist");
  const { wishlist } = useShop();
  const items = wishlist
    .map((id) => productById[id])
    .filter((p) => p !== undefined);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-3 py-6 pb-24 sm:px-5 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2"
        >
          <h1 className="text-xl font-extrabold">{t("title")}</h1>
          <Badge variant="secondary">{items.length}</Badge>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl bg-white px-6 py-16 text-center shadow-sm"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-light">
              <Heart className="h-8 w-8 text-brand" />
            </span>
            <h2 className="text-lg font-extrabold">{t("empty")}</h2>
            <p className="max-w-sm text-sm text-zinc-500">{t("emptyDesc")}</p>
            <Link href="/" className={buttonVariants({ variant: "default" })}>
              {t("browse")}
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {items.map((p, idx) => (
              <ProductCard key={p.id} p={p} i={idx} className="w-full" />
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
