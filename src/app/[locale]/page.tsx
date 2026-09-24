"use client";

import { useState } from "react";
import { motion, type Variants } from "motion/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
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
  ChevronLeft,
  ChevronRight,
  House,
  Wrench,
  HardHat,
  PartyPopper,
  Camera,
  Shirt,
  Cpu,
  Truck,
  ShieldCheck,
  Headset,
} from "lucide-react";

type CategoryKey =
  | "equipment"
  | "construction"
  | "party"
  | "photo"
  | "personal"
  | "electronics"
  | "other";

type Product = {
  id: string;
  title: string;
  category: CategoryKey;
  sale?: number;
  day?: number;
};

const CATEGORIES: { key: CategoryKey; icon: typeof Wrench; count: number }[] = [
  { key: "equipment", icon: Wrench, count: 120 },
  { key: "construction", icon: HardHat, count: 85 },
  { key: "party", icon: PartyPopper, count: 200 },
  { key: "photo", icon: Camera, count: 95 },
  { key: "personal", icon: Shirt, count: 150 },
  { key: "electronics", icon: Cpu, count: 180 },
  { key: "other", icon: LayoutGrid, count: 60 },
];

const TOP_REQUESTED: Product[] = [
  { id: "PROD-TRENT-20260912-015", title: "كرسي ألعاب مريح", category: "electronics", sale: 749, day: 20 },
  { id: "PROD1787762163636881", title: "مكنسة هوفر أسطوانية HT85TOME", category: "electronics", sale: 229, day: 30 },
  { id: "PROD1782299047572086", title: "طقم كاسات كريستال RCR Timeless — إيطالي الصنع", category: "party", sale: 210 },
  { id: "PROD-TRENT-20260912-023", title: "طقم كراسي تشيافاري (50 قطعة)", category: "party", sale: 12999, day: 400 },
  { id: "PROD1786617406340006", title: "ستيل سيريس آركتيس نوفا 7 سماعة رأس للألعاب", category: "electronics", sale: 799, day: 40 },
  { id: "PROD1787130525335695", title: "بلايستيشن 5 سليم (إصدار رقمي)", category: "electronics", sale: 2459 },
  { id: "PROD1772308958857692", title: "مدخل استقبال للحفلات والمناسبات", category: "party", day: 450 },
  { id: "PROD-TRENT-20260912-021", title: "جدار خلفية LED", category: "party", sale: 5999, day: 300 },
  { id: "PROD-TRENT-20260912-044", title: "مولد كهربائي 5 كيلو فولت أمبير", category: "construction", sale: 4999, day: 150 },
  { id: "PROD-TRENT-20260912-037", title: "كاميرا بدون مرآة بدقة 4K", category: "photo", sale: 4599, day: 100 },
];

const NEW_ON_TRENT: Product[] = [
  { id: "PROD1789913520419721", title: "مثقاب", category: "equipment", day: 20 },
  { id: "PROD1789910073252304", title: "مولد كهربائي", category: "equipment", day: 50 },
  { id: "PROD-TRENT-20260912-050", title: "كرسي طعام للأطفال قابل للتعديل", category: "personal", sale: 399, day: 15 },
  { id: "PROD-TRENT-20260912-049", title: "مقعد سيارة للأطفال", category: "personal", sale: 799, day: 25 },
  { id: "PROD1789913414224089", title: "دريل كفرات", category: "equipment", day: 25 },
  { id: "PROD1789913321462765", title: "سقالة", category: "equipment", day: 10 },
  { id: "PROD1789913203395656", title: "رصاصة", category: "equipment", day: 50 },
  { id: "PROD1789913119209489", title: "سلم أحجام مختلفة", category: "equipment", day: 20 },
  { id: "PROD1789912996840317", title: "دقاق تكسير", category: "equipment", day: 30 },
  { id: "PROD1789912899883355", title: "دقاق صغير", category: "equipment", day: 15 },
];

const MOST_VIEWED: Product[] = [
  { id: "PROD1783956306291984", title: "طاولة طعام", category: "party", day: 300 },
  { id: "PROD-TRENT-20260912-040", title: "كاميرا طائرة بدون طيار بدقة 4K", category: "photo", sale: 3999, day: 120 },
  { id: "PROD1786459252648829", title: "كاميرا احترافية", category: "photo", sale: 3999, day: 200 },
  { id: "PROD-TRENT-20260912-034", title: "محطة تمارين رياضية متعددة", category: "equipment", sale: 3499, day: 80 },
  { id: "PROD-TRENT-20260912-042", title: "خلاطة خرسانة", category: "construction", sale: 3299, day: 90 },
  { id: "PROD-TRENT-20260912-036", title: "طقم كاميرا DSLR", category: "photo", sale: 3299, day: 80 },
  { id: "PROD1787056310802169", title: "أوكلي ميتا إتش إس تي إن", category: "electronics", sale: 3030 },
  { id: "PROD-TRENT-20260912-027", title: "طقم طاولة طعام (6 مقاعد)", category: "personal", sale: 2999, day: 70 },
  { id: "PROD1782143565711320", title: "جهاز Happy or Not", category: "electronics", sale: 1800, day: 200 },
  { id: "PROD1776686005181419", title: "إيجار طاولات طعام ريفي", category: "party", day: 200 },
];

const RECENTLY_ADDED: Product[] = [
  { id: "PROD1789912775076524", title: "ونش رافعة يدوي", category: "equipment", day: 40 },
  { id: "PROD1789912681369446", title: "صاروخ قص حديد بلاط صغير", category: "equipment", day: 15 },
  { id: "PROD1789912587774930", title: "مثقاب", category: "equipment", day: 15 },
  { id: "PROD1789912449700737", title: "صاروخ قص حديد بلاط جدار", category: "equipment", day: 15 },
  { id: "PROD1789912346872807", title: "مقص حديد", category: "equipment", day: 25 },
  { id: "PROD-TRENT-20260912-048", title: "سيارة كهربائية للأطفال", category: "personal", sale: 999, day: 45 },
  { id: "PROD-TRENT-20260912-047", title: "سرير أطفال قابل للتحويل", category: "personal", sale: 1499, day: 40 },
  { id: "PROD-TRENT-20260912-046", title: "نظام سفر عربة الأطفال", category: "personal", sale: 1299, day: 35 },
  { id: "PROD-TRENT-20260912-045", title: "منشار دائري", category: "construction", sale: 699, day: 30 },
  { id: "PROD-TRENT-20260912-043", title: "طقم جلاخة زاوية", category: "construction", sale: 399, day: 20 },
];

const FOR_YOU: Product[] = [
  { id: "PROD-TRENT-20260912-022", title: "مجموعة تنسيق الزهور المركزية", category: "party", sale: 2499, day: 150 },
  { id: "PROD-TRENT-20260912-026", title: "أريكة ثلاثية المقاعد", category: "personal", sale: 2299, day: 60 },
  { id: "PROD-TRENT-20260912-011", title: "حزمة جهاز ألعاب", category: "electronics", sale: 2199, day: 60 },
  { id: "PROD-TRENT-20260912-028", title: "خزانة ملابس غرفة النوم", category: "personal", sale: 1899, day: 55 },
  { id: "PROD-TRENT-20260912-038", title: "مجموعة إضاءة الاستوديو", category: "photo", sale: 1699, day: 60 },
  { id: "PROD-TRENT-20260912-008", title: "غسالة ملابس سعة 8 كجم", category: "electronics", sale: 1699, day: 45 },
  { id: "PROD-TRENT-20260912-030", title: "هيكل سرير بطابقين", category: "personal", sale: 1599, day: 45 },
  { id: "PROD-TRENT-20260912-033", title: "دراجة تمارين ثابتة", category: "equipment", sale: 1499, day: 40 },
  { id: "PROD-TRENT-20260912-018", title: "غسالة ضغط 120 بار", category: "equipment", sale: 1499, day: 50 },
  { id: "PROD-TRENT-20260912-001", title: "تلفزيون ذكي بتقنية LED مقاس 55 بوصة", category: "electronics", sale: 1450, day: 40 },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

function Price({ value, label }: { value: number; label: string }) {
  const t = useTranslations("product");
  return (
    <span className="flex items-baseline gap-1">
      <span className="text-[15px] font-extrabold text-zinc-900">{value}</span>
      <span className="text-[11px] font-bold text-zinc-500">{t("currency")}</span>
      <span className="text-[11px] text-zinc-400">/{label}</span>
    </span>
  );
}

function ProductCard({ p, i }: { p: Product; i: number }) {
  const t = useTranslations("product");
  const tc = useTranslations("categories");
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
      whileHover={{ y: -4 }}
      className="w-[170px] shrink-0 snap-start sm:w-[200px]"
    >
    <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        {!loaded && <Skeleton className="absolute inset-0 h-full w-full rounded-none" />}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/products/${p.id}.jpeg`}
          alt={p.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
          onError={(e) => {
            setLoaded(true);
            (e.target as HTMLImageElement).src = "/trent/banner-desktop.jpeg";
          }}
        />
        <Button
          aria-label={t("favorite")}
          variant="secondary"
          size="icon"
          className="absolute left-2 top-2 h-8 w-8 rounded-full bg-white/90 shadow hover:bg-white rtl:left-2 rtl:right-auto ltr:left-auto ltr:right-2"
        >
          <Heart className="h-4 w-4 text-zinc-600" />
        </Button>
        <Badge variant="dark" className="absolute right-2 top-2 ltr:left-2 ltr:right-auto rtl:left-auto rtl:right-2">
          {tc(p.category)}
        </Badge>
      </div>
      <CardContent className="flex flex-col gap-1">
        <h3 className="clamp-2 min-h-[38px] text-[13px] font-bold leading-5 text-zinc-900">
          {p.title}
        </h3>
        <div className="flex items-center gap-1 text-[11px] text-zinc-500">
          <MapPin className="h-3.5 w-3.5 text-brand" />
          {t("city")}
        </div>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 border-t border-dashed border-zinc-100 pt-2">
          {p.sale !== undefined && <Price value={p.sale} label={t("sale")} />}
          {p.day !== undefined && <Price value={p.day} label={t("day")} />}
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}

function Section({ title, items }: { title: string; items: Product[] }) {
  const t = useTranslations("sections");
  const locale = useLocale();
  const Forward = locale === "ar" ? ChevronLeft : ChevronRight;
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      className="mx-auto w-full max-w-6xl px-3 sm:px-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-extrabold text-zinc-900 sm:text-xl">{title}</h2>
        <Button variant="ghost" size="sm" className="text-brand hover:text-brand-dark">
          {t("viewAll")}
          <Forward className="h-4 w-4" />
        </Button>
      </div>
      <div className="no-scrollbar -mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 sm:mx-0 sm:px-0">
        {items.map((p, idx) => (
          <ProductCard key={p.id} p={p} i={idx} />
        ))}
      </div>
    </motion.section>
  );
}

function LangSwitch() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const other = locale === "ar" ? "en" : "ar";
  return (
    <Link
      href={pathname}
      locale={other}
      className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "hidden md:inline-flex")}
    >
      <Globe className="h-4 w-4" />
      {t("langName")}
    </Link>
  );
}

export default function Home() {
  const t = useTranslations("header");
  const tn = useTranslations("nav");
  const tc = useTranslations("categories");
  const ts = useTranslations("sections");
  const th = useTranslations("hero");
  const tt = useTranslations("trust");
  const tf = useTranslations("footer");
  const tm = useTranslations("mobileNav");

  const trustItems = [
    { icon: Truck, t: tt("delivery"), d: tt("deliveryDesc") },
    { icon: ShieldCheck, t: tt("secure"), d: tt("secureDesc") },
    { icon: Headset, t: tt("support"), d: tt("supportDesc") },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* ===== Top header ===== */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="sticky top-0 z-40 bg-white shadow-[0_1px_10px_rgba(0,0,0,0.06)]"
      >
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-3 py-3 sm:px-5">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/trent-wordmark-ar-v2.jpeg" alt="Trent" className="h-9 w-auto object-contain" />
          </Link>

          <div className="hidden flex-1 items-center gap-2 rounded-full bg-zinc-100 px-4 py-1.5 md:flex">
            <Search className="h-5 w-5 shrink-0 text-zinc-400" />
            <Input placeholder={t("search")} />
          </div>

          <Button variant="outline" size="sm" className="hidden rounded-full lg:flex">
            <MapPin className="h-4 w-4 text-brand" />
            {t("deliverTo")}
            <span className="font-normal text-zinc-400">{t("locating")}</span>
          </Button>

          <div className="ms-auto flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Heart className="h-5 w-5" />
              <span className="hidden xl:inline">{t("favorites")}</span>
            </Button>
            <Button variant="ghost" size="sm">
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden xl:inline">{t("cart")}</span>
            </Button>
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
            <Link href="/" className="flex items-center gap-1.5 text-brand"><House className="h-4 w-4" />{tn("home")}</Link>
            <a href="#" className="flex items-center gap-1.5 hover:text-brand"><Store className="h-4 w-4" />{tn("stores")}</a>
            <a href="#" className="flex items-center gap-1.5 hover:text-brand"><LayoutGrid className="h-4 w-4" />{tn("categories")}</a>
            <a href="#" className="flex items-center gap-1.5 hover:text-brand"><Bell className="h-4 w-4" />{tn("notifications")}</a>
            <a href="#" className="flex items-center gap-1.5 hover:text-brand"><MessageCircle className="h-4 w-4" />{tn("messages")}</a>
            <a href="#" className="flex items-center gap-1.5 hover:text-brand"><ClipboardList className="h-4 w-4" />{tn("orders")}</a>
            <a href="#" className="flex items-center gap-1.5 hover:text-brand"><MapIcon className="h-4 w-4" />{tn("map")}</a>
          </div>
        </nav>
      </motion.header>

      <main className="flex flex-1 flex-col gap-6 pb-24 pt-4 md:pb-10">
        {/* ===== Hero banner ===== */}
        <div className="mx-auto w-full max-w-6xl px-3 sm:px-5">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="overflow-hidden rounded-2xl shadow"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/trent/banner-desktop.jpeg"
              alt={th("alt")}
              className="hidden h-auto w-full object-cover sm:block"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/trent/banner-mobile.jpeg"
              alt={th("alt")}
              className="h-auto w-full object-cover sm:hidden"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/trent/banner-desktop.jpeg";
              }}
            />
          </motion.div>
        </div>

        {/* ===== Categories ===== */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mx-auto w-full max-w-6xl px-3 sm:px-5"
        >
          <h2 className="mb-3 text-lg font-extrabold sm:text-xl">{tc("title")}</h2>
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="no-scrollbar -mx-3 flex gap-3 overflow-x-auto px-3 pb-1 sm:mx-0 sm:grid sm:grid-cols-7 sm:px-0"
          >
            {CATEGORIES.map((c) => (
              <motion.a
                key={c.key}
                href="#"
                variants={fadeUp}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.96 }}
                className="flex w-[104px] shrink-0 flex-col items-center gap-2 rounded-2xl bg-white p-3 shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-shadow hover:shadow-md sm:w-auto"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light">
                  <c.icon className="h-7 w-7 text-brand" />
                </span>
                <span className="text-center text-[12px] font-extrabold leading-4">{tc(c.key)}</span>
                <span className="text-[10px] text-zinc-400">{c.count}+ {tc("products")}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.section>

        <Section title={ts("top")} items={TOP_REQUESTED} />
        <Section title={ts("new")} items={NEW_ON_TRENT} />
        <Section title={ts("viewed")} items={MOST_VIEWED} />
        <Section title={ts("recent")} items={RECENTLY_ADDED} />
        <Section title={ts("foryou")} items={FOR_YOU} />

        {/* ===== Trust strip ===== */}
        <div className="mx-auto w-full max-w-6xl px-3 sm:px-5">
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {trustItems.map((f) => (
              <motion.div
                key={f.t}
                variants={fadeUp}
                className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light">
                  <f.icon className="h-6 w-6 text-brand" />
                </span>
                <div>
                  <div className="text-sm font-extrabold">{f.t}</div>
                  <div className="text-xs text-zinc-500">{f.d}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* ===== Footer ===== */}
      <footer className="hidden bg-zinc-900 text-zinc-300 md:block">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-4 gap-8 px-5 py-10 text-sm">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/trent-wordmark-ar-v2.jpeg" alt="Trent" className="mb-3 h-10 w-auto rounded bg-white px-2 object-contain" />
            <p className="leading-6 text-zinc-400">{tf("about")}</p>
          </div>
          <div>
            <h4 className="mb-3 font-extrabold text-white">{tf("quick")}</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white">{tn("home")}</Link></li>
              <li><a href="#" className="hover:text-white">{tn("stores")}</a></li>
              <li><a href="#" className="hover:text-white">{tn("categories")}</a></li>
              <li><a href="#" className="hover:text-white">{tn("map")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-extrabold text-white">{tf("accountT")}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">{tf("login")}</a></li>
              <li><a href="#" className="hover:text-white">{tn("orders")}</a></li>
              <li><a href="#" className="hover:text-white">{t("favorites")}</a></li>
              <li><a href="#" className="hover:text-white">{t("cart")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-extrabold text-white">{tf("contact")}</h4>
            <ul className="space-y-2">
              <li>{tf("address")}</li>
              <li>support@trent.sa</li>
              <li>{tf("otherLang")}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-zinc-500">
          {tf("rights")}
        </div>
      </footer>

      {/* ===== Mobile bottom nav ===== */}
      <nav className="fixed bottom-0 z-40 w-full border-t border-zinc-200 bg-white px-2 pb-[env(safe-area-inset-bottom)] pt-1 md:hidden">
        <div className="grid grid-cols-5 text-[10px] font-bold text-zinc-500">
          <Link href="/" className="flex flex-col items-center gap-0.5 py-1.5 text-brand"><House className="h-5 w-5" />{tm("home")}</Link>
          <a href="#" className="flex flex-col items-center gap-0.5 py-1.5"><Store className="h-5 w-5" />{tm("stores")}</a>
          <a href="#" className="flex flex-col items-center gap-0.5 py-1.5">
            <span className="flex h-9 w-9 -translate-y-3 items-center justify-center rounded-full bg-brand text-white shadow-lg"><Plus className="h-5 w-5" /></span>
            {tm("add")}
          </a>
          <a href="#" className="flex flex-col items-center gap-0.5 py-1.5"><ClipboardList className="h-5 w-5" />{tm("orders")}</a>
          <a href="#" className="flex flex-col items-center gap-0.5 py-1.5"><User className="h-5 w-5" />{tm("account")}</a>
        </div>
      </nav>
    </div>
  );
}
