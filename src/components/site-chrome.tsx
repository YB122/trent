"use client";

import { motion } from "motion/react";
import {
  Search,
  MapPin,
  Heart,
  ShoppingCart,
  Bell,
  MessageCircle,
  Store,
  LayoutGrid,
  ClipboardList,
  Map as MapIcon,
  Plus,
  User,
  Globe,
  House,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link, usePathname } from "@/i18n/navigation";
import { useShop } from "@/store/shop";
import { cn } from "@/lib/utils";

export function LangSwitch() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "ar" ? "en" : "ar";
  return (
    <Link
      href={pathname}
      locale={other}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "hidden md:inline-flex"
      )}
    >
      <Globe className="h-4 w-4" />
      {t("langName")}
    </Link>
  );
}

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <Badge className="absolute -top-1 end-0 flex h-5 min-w-5 items-center justify-center px-1 text-[10px]">
      {count > 99 ? "99+" : count}
    </Badge>
  );
}

export function SiteHeader() {
  const t = useTranslations("header");
  const tn = useTranslations("nav");
  const { wishCount, cartCount } = useShop();

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-40 bg-white shadow-[0_1px_10px_rgba(0,0,0,0.06)]"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-3 py-3 sm:px-5">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/trent-wordmark-ar-v2.jpeg"
            alt="Trent"
            className="h-9 w-auto object-contain"
          />
        </Link>

        <div className="hidden flex-1 items-center gap-2 rounded-full bg-zinc-100 px-4 py-1.5 md:flex">
          <Search className="h-5 w-5 shrink-0 text-zinc-400" />
          <Input placeholder={t("search")} />
        </div>

        <Button
          variant="outline"
          size="sm"
          className="hidden rounded-full lg:flex"
        >
          <MapPin className="h-4 w-4 text-brand" />
          {t("deliverTo")}
          <span className="font-normal text-zinc-400">{t("locating")}</span>
        </Button>

        <div className="ms-auto flex items-center gap-1 sm:gap-2">
          <Link
            href="/favorites"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "relative hidden sm:inline-flex"
            )}
          >
            <Heart className="h-5 w-5" />
            <span className="hidden xl:inline">{t("favorites")}</span>
            <CountBadge count={wishCount} />
          </Link>
          <Link
            href="/cart"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "relative"
            )}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden xl:inline">{t("cart")}</span>
            <CountBadge count={cartCount} />
          </Link>
          <LangSwitch />
          <Button size="sm">
            <User className="h-4 w-4" />
            {t("account")}
          </Button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="px-3 pb-3 md:hidden">
        <div className="flex items-center gap-2 rounded-full bg-zinc-100 px-4 py-1.5">
          <Search className="h-5 w-5 shrink-0 text-zinc-400" />
          <Input placeholder={t("searchMobile")} />
        </div>
      </div>

      {/* Nav */}
      <nav className="hidden border-t border-zinc-100 md:block">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-5 py-2.5 text-[13px] font-bold text-zinc-600">
          <Link href="/" className="flex items-center gap-1.5 text-brand">
            <House className="h-4 w-4" />
            {tn("home")}
          </Link>
          <a href="#" className="flex items-center gap-1.5 hover:text-brand">
            <Store className="h-4 w-4" />
            {tn("stores")}
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-brand">
            <LayoutGrid className="h-4 w-4" />
            {tn("categories")}
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-brand">
            <Bell className="h-4 w-4" />
            {tn("notifications")}
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-brand">
            <MessageCircle className="h-4 w-4" />
            {tn("messages")}
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-brand">
            <ClipboardList className="h-4 w-4" />
            {tn("orders")}
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-brand">
            <MapIcon className="h-4 w-4" />
            {tn("map")}
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

export function BottomNav() {
  const tm = useTranslations("mobileNav");
  const { cartCount } = useShop();
  return (
    <nav className="fixed bottom-0 z-40 w-full border-t border-zinc-200 bg-white px-2 pb-[env(safe-area-inset-bottom)] pt-1 md:hidden">
      <div className="grid grid-cols-5 text-[10px] font-bold text-zinc-500">
        <Link
          href="/"
          className="flex flex-col items-center gap-0.5 py-1.5 text-brand"
        >
          <House className="h-5 w-5" />
          {tm("home")}
        </Link>
        <a href="#" className="flex flex-col items-center gap-0.5 py-1.5">
          <Store className="h-5 w-5" />
          {tm("stores")}
        </a>
        <a href="#" className="flex flex-col items-center gap-0.5 py-1.5">
          <span className="flex h-9 w-9 -translate-y-3 items-center justify-center rounded-full bg-brand text-white shadow-lg">
            <Plus className="h-5 w-5" />
          </span>
          {tm("add")}
        </a>
        <Link
          href="/cart"
          className="relative flex flex-col items-center gap-0.5 py-1.5"
        >
          <span className="relative">
            <ClipboardList className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 end-0 flex h-4 min-w-4 -translate-x-1/2 items-center justify-center px-1 text-[9px] rtl:translate-x-1/2">
                {cartCount > 99 ? "99+" : cartCount}
              </Badge>
            )}
          </span>
          {tm("orders")}
        </Link>
        <a href="#" className="flex flex-col items-center gap-0.5 py-1.5">
          <User className="h-5 w-5" />
          {tm("account")}
        </a>
      </div>
    </nav>
  );
}
