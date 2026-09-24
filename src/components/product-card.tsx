"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Heart, MapPin, Minus, Plus, ShoppingCart } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useShop } from "@/store/shop";
import { productTitle, type Product } from "@/data/products";

export function Price({ value, label }: { value: number; label: string }) {
  const t = useTranslations("product");
  return (
    <span className="flex items-baseline gap-1">
      <span className="text-[15px] font-extrabold text-zinc-900">{value}</span>
      <span className="text-[11px] font-bold text-zinc-500">{t("currency")}</span>
      <span className="text-[11px] text-zinc-400">/{label}</span>
    </span>
  );
}

export function ProductCard({
  p,
  i = 0,
  className,
}: {
  p: Product;
  i?: number;
  className?: string;
}) {
  const t = useTranslations("product");
  const tc = useTranslations("categories");
  const locale = useLocale();
  const name = productTitle(p, locale);
  const { isWished, toggleWish, cart, addToCart, setQty } = useShop();
  const [loaded, setLoaded] = useState(false);
  const wished = isWished(p.id);
  const qty = cart[p.id] ?? 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
      whileHover={{ y: -4 }}
      className={cn("w-full", className)}
    >
      <Card className="group flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
        <Link href={`/products/${p.id}`} className="relative block aspect-[4/3] overflow-hidden bg-zinc-100">
          {!loaded && (
            <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
          src={`/products/${p.id}.jpeg`}
          alt={name}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onError={(e) => {
              setLoaded(true);
              (e.target as HTMLImageElement).src =
                "/trent/banner-desktop.jpeg";
            }}
          />
          <Button
            aria-label={t("favorite")}
            variant="secondary"
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              toggleWish(p.id);
            }}
            className="absolute left-2 top-2 h-8 w-8 rounded-full bg-white/90 shadow hover:bg-white rtl:left-2 rtl:right-auto ltr:left-auto ltr:right-2"
          >
            <Heart
              className={`h-4 w-4 ${
                wished ? "fill-red-500 text-red-500" : "text-zinc-600"
              }`}
            />
          </Button>
          <Badge
            variant="dark"
            className="absolute right-2 top-2 ltr:left-2 ltr:right-auto rtl:left-auto rtl:right-2"
          >
            {tc(p.category)}
          </Badge>
        </Link>
      <CardContent className="flex flex-col gap-1">
        <Link href={`/products/${p.id}`} className="block">
          <h3 className="clamp-2 text-[13px] font-bold leading-5 text-zinc-900 hover:text-brand">
            {name}
          </h3>
        </Link>
          <div className="flex items-center gap-1 text-[11px] text-zinc-500">
            <MapPin className="h-3.5 w-3.5 text-brand" />
            {t("city")}
          </div>
          <div className="mt-2 flex items-end justify-between gap-2 border-t border-dashed border-zinc-100 pt-2">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {p.sale !== undefined && (
                <Price value={p.sale} label={t("sale")} />
              )}
              {p.day !== undefined && <Price value={p.day} label={t("day")} />}
            </div>
            {qty === 0 ? (
              <Button
                size="icon"
                aria-label={t("addToCart")}
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(p.id);
                }}
                className="h-8 w-8 shrink-0 rounded-full"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex shrink-0 items-center gap-1 rounded-full bg-brand-light p-1">
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="-"
                  onClick={(e) => {
                    e.preventDefault();
                    setQty(p.id, qty - 1);
                  }}
                  className="h-6 w-6 rounded-full hover:bg-white"
                >
                  <Minus className="h-3.5 w-3.5" />
                </Button>
                <span className="min-w-4 text-center text-[13px] font-extrabold text-brand-dark">
                  {qty}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="+"
                  onClick={(e) => {
                    e.preventDefault();
                    setQty(p.id, qty + 1);
                  }}
                  className="h-6 w-6 rounded-full hover:bg-white"
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
