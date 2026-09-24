"use client";

import { motion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
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
import { SiteHeader, BottomNav } from "@/components/site-chrome";
import { ProductCard } from "@/components/product-card";
import {
  type CategoryKey,
  type HomeSections,
  type Product,
} from "@/data/products";

const CATEGORIES: { key: CategoryKey; icon: typeof Wrench; count: number }[] = [
  { key: "equipment", icon: Wrench, count: 120 },
  { key: "construction", icon: HardHat, count: 85 },
  { key: "party", icon: PartyPopper, count: 200 },
  { key: "photo", icon: Camera, count: 95 },
  { key: "personal", icon: Shirt, count: 150 },
  { key: "electronics", icon: Cpu, count: 180 },
  { key: "other", icon: LayoutGrid, count: 60 },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

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
      <div className="grid grid-cols-2 items-start gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {items.map((p, idx) => (
          <ProductCard key={p.id} p={p} i={idx} />
        ))}
      </div>
    </motion.section>
  );
}

export type SectionTitles = {
  top: string;
  new: string;
  viewed: string;
  recent: string;
  forYou: string;
};

export default function HomeClient({
  sections,
  titles,
}: {
  sections: HomeSections;
  titles: SectionTitles;
}) {
  const t = useTranslations("header");
  const tn = useTranslations("nav");
  const tc = useTranslations("categories");
  const th = useTranslations("hero");
  const tt = useTranslations("trust");
  const tf = useTranslations("footer");

  const trustItems = [
    { icon: Truck, t: tt("delivery"), d: tt("deliveryDesc") },
    { icon: ShieldCheck, t: tt("secure"), d: tt("secureDesc") },
    { icon: Headset, t: tt("support"), d: tt("supportDesc") },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

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

        <Section title={titles.top} items={sections.top} />
        <Section title={titles.new} items={sections.new} />
        <Section title={titles.viewed} items={sections.viewed} />
        <Section title={titles.recent} items={sections.recent} />
        <Section title={titles.forYou} items={sections.forYou} />

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

      <BottomNav />
    </div>
  );
}
