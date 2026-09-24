import axios from "axios";
import type { HomeSections } from "@/data/products";

export type { HomeSections };

export const api = axios.create({
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export async function fetchHomeSections(): Promise<HomeSections> {
  const { data } = await api.get<HomeSections>("/api/products");
  return data;
}
