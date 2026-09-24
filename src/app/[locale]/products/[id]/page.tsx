import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { productById, productTitle, ALL_PRODUCTS } from "@/data/products";
import ProductDetailsClient from "./product-client";

export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const p = productById[id];
  if (!p) return { title: "Product not found" };
  const title = productTitle(p, locale);
  return {
    title: `${title} | Trent`,
    description: title,
    openGraph: { images: [`/products/${p.id}.jpeg`] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const product = productById[id];
  if (!product) notFound();
  return <ProductDetailsClient product={product} />;
}
