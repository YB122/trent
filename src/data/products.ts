export type CategoryKey =
  | "equipment"
  | "construction"
  | "party"
  | "photo"
  | "personal"
  | "electronics"
  | "other";

export type Product = {
  id: string;
  title: string;
  category: CategoryKey;
  sale?: number;
  day?: number;
};

export const TOP_REQUESTED: Product[] = [
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

export const NEW_ON_TRENT: Product[] = [
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

export const MOST_VIEWED: Product[] = [
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

export const RECENTLY_ADDED: Product[] = [
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

export const FOR_YOU: Product[] = [
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

export const ALL_PRODUCTS: Product[] = [
  ...TOP_REQUESTED,
  ...NEW_ON_TRENT,
  ...MOST_VIEWED,
  ...RECENTLY_ADDED,
  ...FOR_YOU,
];

export const productById: Record<string, Product> = Object.fromEntries(
  ALL_PRODUCTS.map((p) => [p.id, p])
);

export type HomeSections = {
  top: Product[];
  new: Product[];
  viewed: Product[];
  recent: Product[];
  forYou: Product[];
};

// SSR entry point: the homepage and /api/products both read from here.
// Swap the static arrays for a DB / external API call when ready —
export async function getHomeSections(): Promise<HomeSections> {
  return {
    top: TOP_REQUESTED,
    new: NEW_ON_TRENT,
    viewed: MOST_VIEWED,
    recent: RECENTLY_ADDED,
    forYou: FOR_YOU,
  };
}
