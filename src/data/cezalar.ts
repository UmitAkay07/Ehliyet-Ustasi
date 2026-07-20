export interface TrafikCezasi {
  id: string;
  ihlal: string;
  kategori: "hiz" | "isik" | "park" | "belge" | "guvenlik" | "diger";
  aciklama: string;
  tipikSonuc: string;
  cezaPuani?: string;
}

export const CEZA_KATEGORILERI = [
  { id: "hiz", ad: "Hız", renk: "#EF4444" },
  { id: "isik", ad: "Işık / Kavşak", renk: "#F59E0B" },
  { id: "park", ad: "Park / Duraklama", renk: "#8B5CF6" },
  { id: "belge", ad: "Belge / Alkol", renk: "#3B82F6" },
  { id: "guvenlik", ad: "Güvenlik", renk: "#10B981" },
  { id: "diger", ad: "Diğer", renk: "#64748B" },
] as const;

/** Bilgilendirme amaçlı özet rehber — tutarlar değişebilir, resmi kaynak kontrol edilmelidir. */
export const TRAFIK_CEZALARI: TrafikCezasi[] = [
  {
    id: "c1",
    ihlal: "Hız sınırını aşmak",
    kategori: "hiz",
    aciklama: "Azami hız sınırının üzerinde araç kullanmak. Aşım oranına göre ceza artar.",
    tipikSonuc: "Para cezası + ceza puanı (orana göre)",
    cezaPuani: "Orana göre değişir",
  },
  {
    id: "c2",
    ihlal: "Kırmızı ışık ihlali",
    kategori: "isik",
    aciklama: "Trafik ışığında kırmızı yanarken geçmek.",
    tipikSonuc: "Para cezası + ceza puanı",
    cezaPuani: "Yüksek puan",
  },
  {
    id: "c3",
    ihlal: "Emniyet kemeri takmamak",
    kategori: "guvenlik",
    aciklama: "Sürücü veya yolcuların kemer takmaması.",
    tipikSonuc: "Para cezası + ceza puanı",
  },
  {
    id: "c4",
    ihlal: "Telefonla konuşarak araç kullanmak",
    kategori: "guvenlik",
    aciklama: "El ile telefon kullanımı (kulaklık/hands-free kurallarına dikkat).",
    tipikSonuc: "Para cezası + ceza puanı",
  },
  {
    id: "c5",
    ihlal: "Alkollü araç kullanmak",
    kategori: "belge",
    aciklama: "Yasal sınırın üzerinde alkol ile araç kullanmak. Yeni sürücülerde sınır daha sıkıdır.",
    tipikSonuc: "Ağır para cezası + belgeye el koyma riski",
    cezaPuani: "Çok yüksek / belge işlemi",
  },
  {
    id: "c6",
    ihlal: "Yaya geçidinde yayaya yol vermemek",
    kategori: "isik",
    aciklama: "Yaya geçidinde geçmekte olan/geçmek üzere olan yayaya öncelik vermemek.",
    tipikSonuc: "Para cezası + ceza puanı",
  },
  {
    id: "c7",
    ihlal: "Yasak yerde park / duraklama",
    kategori: "park",
    aciklama: "Kavşak, yaya geçidi, durak, engelli yeri vb. yasak alanlarda park.",
    tipikSonuc: "Para cezası; çekici riski",
  },
  {
    id: "c8",
    ihlal: "Sollama yasağı ihlali",
    kategori: "hiz",
    aciklama: "Devamlı çizgi, köprü, kavşak, viraj gibi yasak yerlerde sollama.",
    tipikSonuc: "Para cezası + ceza puanı",
  },
  {
    id: "c9",
    ihlal: "Ehliyetsiz araç kullanmak",
    kategori: "belge",
    aciklama: "Geçerli sürücü belgesi olmadan araç kullanmak.",
    tipikSonuc: "Ağır para cezası + araç/trafik işlemleri",
  },
  {
    id: "c10",
    ihlal: "Sigortasız araç kullanmak",
    kategori: "belge",
    aciklama: "Zorunlu mali sorumluluk (trafik) sigortası olmadan trafiğe çıkmak.",
    tipikSonuc: "Para cezası + trafikten men riski",
  },
  {
    id: "c11",
    ihlal: "Motosiklette kask takmamak",
    kategori: "guvenlik",
    aciklama: "Motosiklet sürücü/yolcusunun koruma başlığı (kask) kullanmaması.",
    tipikSonuc: "Para cezası + ceza puanı",
  },
  {
    id: "c12",
    ihlal: "Gereksiz / uzun korna",
    kategori: "diger",
    aciklama: "Tehlike dışı amaçla veya uzun süreli korna kullanımı.",
    tipikSonuc: "Para cezası (gürültü / kural ihlali)",
  },
  {
    id: "c13",
    ihlal: "Emniyet şeridi ihlali",
    kategori: "hiz",
    aciklama: "Acil durumlar dışında emniyet şeridini kullanmak.",
    tipikSonuc: "Para cezası + ceza puanı",
  },
  {
    id: "c14",
    ihlal: "Çocuk bağlama sistemi kullanmamak",
    kategori: "guvenlik",
    aciklama: "Yaşa/kiloya uygun çocuk koltuğu veya bağlama sistemi kullanmamak.",
    tipikSonuc: "Para cezası",
  },
  {
    id: "c15",
    ihlal: "100 ceza puanı doldurmak",
    kategori: "belge",
    aciklama: "Bir yıl içinde 100 ceza puanına ulaşmak.",
    tipikSonuc: "Belgeye geçici el koyma + eğitim süreci",
    cezaPuani: "100 puan eşiği",
  },
];
