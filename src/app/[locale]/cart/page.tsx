"use client";

import { motion } from "motion/react";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteHeader, BottomNav } from "@/components/site-chrome";
import { useShop } from "@/store/shop";
import { productById, productTitle } from "@/data/products";

export default function CartPage() {
  const t = useTranslations("cart");
  const tp = useTranslations("product");
  const tc = useTranslations("categories");
  const locale = useLocale();
  const { cart, setQty, removeFromCart, clearCart, cartCount } = useShop();

  const lines = Object.entries(cart)
    .map(([id, qty]) => ({ p: productById[id], qty }))
    .filter((l) => l.p !== undefined);

  const dayTotal = lines.reduce((s, l) => s + (l.p.day ?? 0) * l.qty, 0);
  const saleTotal = lines.reduce((s, l) => s + (l.p.sale ?? 0) * l.qty, 0);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-3 py-6 pb-24 sm:px-5 md:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold">{t("title")}</h1>
            <Badge variant="secondary">{cartCount}</Badge>
          </div>
          {lines.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearCart}>
              <Trash2 className="h-4 w-4" />
              {t("clear")}
            </Button>
          )}
        </motion.div>

        {lines.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-1 flex-col items-center justify-center gap-3 rounded-2xl bg-white px-6 py-16 text-center shadow-sm"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-light">
              <ShoppingCart className="h-8 w-8 text-brand" />
            </span>
            <h2 className="text-lg font-extrabold">{t("empty")}</h2>
            <p className="max-w-sm text-sm text-zinc-500">{t("emptyDesc")}</p>
            <Link href="/" className={buttonVariants({ variant: "default" })}>
              {t("browse")}
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-3">
              {lines.map(({ p, qty }, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.3) }}
                >
                  <Card>
                    <CardContent className="flex gap-3 p-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/products/${p.id}.jpeg`}
                        alt={productTitle(p, locale)}
                        className="h-24 w-24 shrink-0 rounded-xl bg-zinc-100 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/trent/banner-desktop.jpeg";
                        }}
                      />
                      <div className="flex min-w-0 flex-1 flex-col gap-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="clamp-2 text-[13px] font-bold leading-5">
                            {productTitle(p, locale)}
                          </h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={t("remove")}
                            onClick={() => removeFromCart(p.id)}
                            className="h-8 w-8 shrink-0 text-zinc-400 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Badge
                          variant="secondary"
                          className="w-fit text-[10px]"
                        >
                          {tc(p.category)}
                        </Badge>
                        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
                          <div className="flex items-center gap-1 rounded-full bg-zinc-100 p-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              aria-label="-"
                              onClick={() => setQty(p.id, qty - 1)}
                              className="h-7 w-7 rounded-full hover:bg-white"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="min-w-5 text-center text-sm font-extrabold">
                              {qty}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              aria-label="+"
                              onClick={() => setQty(p.id, qty + 1)}
                              className="h-7 w-7 rounded-full hover:bg-white"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex flex-col items-end text-[12px] font-bold">
                            {p.day !== undefined && (
                              <span>
                                {p.day * qty} {tp("currency")}
                                <span className="font-normal text-zinc-400">
                                  {" "}
                                  / {tp("day")}
                                </span>
                              </span>
                            )}
                            {p.sale !== undefined && (
                              <span className="text-zinc-500">
                                {p.sale * qty} {tp("currency")}
                                <span className="font-normal text-zinc-400">
                                  {" "}
                                  / {tp("sale")}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="h-fit lg:sticky lg:top-32"
            >
              <Card>
                <CardContent className="flex flex-col gap-3 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">{t("perDay")}</span>
                    <span className="font-extrabold">
                      {dayTotal} {tp("currency")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">{t("purchase")}</span>
                    <span className="font-extrabold">
                      {saleTotal} {tp("currency")}
                    </span>
                  </div>
                  <Button size="lg" className="w-full">
                    {t("checkout")}
                  </Button>
                  <Link
                    href="/"
                    className={buttonVariants({
                      variant: "outline",
                      size: "lg",
                      className: "w-full",
                    })}
                  >
                    {t("continue")}
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
