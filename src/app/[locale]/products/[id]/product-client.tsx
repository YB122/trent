"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Heart,
  MapPin,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  ShieldCheck,
  Headset,
  ChevronLeft,
  ChevronRight,
  Share2,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SiteHeader, BottomNav } from "@/components/site-chrome";
import { ProductCard } from "@/components/product-card";
import { useShop } from "@/store/shop";
import { productTitle, ALL_PRODUCTS, type Product } from "@/data/products";

function PriceLine({ value, label }: { value: number; label: string }) {
  const t = useTranslations("product");
  return (
    <span className="flex items-baseline gap-1.5">
      <span className="text-2xl font-extrabold text-zinc-900">{value}</span>
      <span className="text-sm font-bold text-zinc-500">{t("currency")}</span>
      <span className="text-sm text-zinc-400">/ {label}</span>
    </span>
  );
}

export default function ProductDetailsClient({ product }: { product: Product }) {
  const t = useTranslations("product");
  const tc = useTranslations("categories");
  const td = useTranslations("details");
  const locale = useLocale();
  const name = productTitle(product, locale);
  const { isWished, toggleWish, cart, addToCart, setQty } = useShop();
  const wished = isWished(product.id);
  const qty = cart[product.id] ?? 0;
  const [imgLoaded, setImgLoaded] = useState(false);

  // 4 related from same category, fallback to random
  const related = ALL_PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  )
    .slice(0, 4);
  const relatedFill =
    related.length < 4
      ? ALL_PRODUCTS.filter((p) => p.id !== product.id && !related.some((r) => r.id === p.id)).slice(
          0,
          4 - related.length
        )
      : [];

  const allRelated = [...related, ...relatedFill];

  const BackIcon = locale === "ar" ? ChevronRight : ChevronLeft;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-3 py-4 pb-24 sm:px-5 md:pb-10">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3 flex items-center gap-2 text-[13px]"
        >
          <Link href="/" className="inline-flex items-center gap-1 font-bold text-zinc-500 hover:text-zinc-900">
            <BackIcon className="h-4 w-4" />
            {td("back")}
          </Link>
          <span className="text-zinc-300">/</span>
          <span className="font-bold text-brand">{tc(product.category)}</span>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3] bg-zinc-100">
                {!imgLoaded && <Skeleton className="absolute inset-0 h-full w-full rounded-none" />}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/products/${product.id}.jpeg`}
                  alt={name}
                  onLoad={() => setImgLoaded(true)}
                  className={`h-full w-full object-cover ${imgLoaded ? "opacity-100" : "opacity-0"}`}
                  onError={(e) => {
                    setImgLoaded(true);
                    (e.target as HTMLImageElement).src = "/trent/banner-desktop.jpeg";
                  }}
                />
                <Badge variant="dark" className="absolute right-3 top-3 ltr:left-3 ltr:right-auto">
                  {tc(product.category)}
                </Badge>
              </div>
            </Card>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="flex flex-col gap-4"
          >
            <div>
              <h1 className="text-xl font-extrabold leading-7 sm:text-2xl">{name}</h1>
              <div className="mt-2 flex items-center gap-2 text-[13px] text-zinc-500">
                <MapPin className="h-4 w-4 text-brand" />
                {t("city")}
                <span className="text-zinc-300">•</span>
                <span>{product.id}</span>
              </div>
            </div>

            <Card>
              <CardContent className="flex flex-col gap-3 p-4">
                {product.sale !== undefined && (
                  <PriceLine value={product.sale} label={t("sale")} />
                )}
                {product.day !== undefined && (
                  <PriceLine value={product.day} label={t("day")} />
                )}
                {product.sale === undefined && product.day === undefined && (
                  <span className="text-sm text-zinc-500">{td("contactForPrice")}</span>
                )}
                <div className="flex flex-wrap gap-2 pt-1">
                  {qty === 0 ? (
                    <Button size="lg" className="flex-1" onClick={() => addToCart(product.id)}>
                      <ShoppingCart className="h-5 w-5" />
                      {td("addToCart")}
                    </Button>
                  ) : (
                    <div className="flex flex-1 items-center justify-between gap-2 rounded-full bg-brand-light p-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setQty(product.id, qty - 1)}
                        className="h-10 w-10 rounded-full hover:bg-white"
                      >
                        <Minus className="h-5 w-5" />
                      </Button>
                      <span className="text-lg font-extrabold text-brand-dark">{qty}</span>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setQty(product.id, qty + 1)}
                        className="h-10 w-10 rounded-full hover:bg-white"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                  )}
                  <Button
                    variant={wished ? "default" : "outline"}
                    size="lg"
                    onClick={() => toggleWish(product.id)}
                    className="shrink-0"
                  >
                    <Heart className={`h-5 w-5 ${wished ? "fill-white" : ""}`} />
                    {wished ? td("saved") : td("save")}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="share"
                    onClick={() => {
                      if (navigator.share) navigator.share({ title: name, url: location.href }).catch(() => {});
                      else navigator.clipboard.writeText(location.href);
                    }}
                    className="h-11 w-11 shrink-0 rounded-full"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                {qty > 0 && (
                  <Link href="/cart" className="text-center text-sm font-bold text-brand hover:underline">
                    {td("goToCart")}
                  </Link>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h3 className="mb-2 text-sm font-extrabold">{td("about")}</h3>
                <p className="text-sm leading-6 text-zinc-600">{td("aboutBody")}</p>
                <ul className="mt-3 grid gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-brand" /> {td("delivery")}
                  </li>
                  <li className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-brand" /> {td("secure")}
                  </li>
                  <li className="flex items-center gap-2">
                    <Headset className="h-4 w-4 text-brand" /> {td("support")}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {allRelated.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-3 text-lg font-extrabold sm:text-xl">{td("related")}</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {allRelated.map((p, idx) => (
                <ProductCard key={p.id} p={p} i={idx} />
              ))}
            </div>
          </section>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
