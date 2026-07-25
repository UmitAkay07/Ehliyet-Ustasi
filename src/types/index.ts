import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";

export type IconName = ComponentProps<typeof Ionicons>["name"];

export type DersId = "trafik" | "ilkyardim" | "motor" | "adab";

export interface Ders {
  id: DersId;
  ad: string;
  kisaAd: string;
  aciklama: string;
  renk: string;
  ikon: IconName;
  sinavSoruSayisi: number;
}

export interface KonuBolumu {
  baslik?: string;
  metin: string;
  /** KonuGorseli şablon kimliği (diyagram / tablo / animasyonlu görsel) */
  gorsel?: string;
}

export interface Konu {
  id: string;
  dersId: DersId;
  baslik: string;
  ozet: string;
  ikon: IconName;
  okumaSuresiDk: number;
  bolumler: KonuBolumu[];
  anahtarNoktalar: string[];
  /** Konu başındaki kapak görseli (KonuGorseli id) */
  kapakGorsel?: string;
}

export type Zorluk = "kolay" | "orta" | "zor";

export interface Soru {
  id: string;
  dersId: DersId;
  konuId: string;
  metin: string;
  secenekler: string[];
  dogruIndex: number;
  aciklama: string;
  zorluk: Zorluk;
  /** Trafik işaretleri kütüphanesindeki işaret id'si (görselli sorular) */
  gorselIsaretId?: string;


}




export type ManevraTipi =
  | "paralelPark"
  | "lPark"
  | "rampaKalkis"
  | "aniFren"
  | "sinyal"
  | "uDonusu"
  | "seritDegistirme"
  | "temelKumanda"
  | "geriManevra";

export interface DireksiyonAdimi {
  baslik: string;
  aciklama: string;
}

export interface HataKriteri {
  seviye: "kirmizi" | "sari" | "mavi";
  metin: string;
}

export interface DireksiyonDersi {
  id: string;
  baslik: string;
  ozet: string;
  ikon: IconName;
  animasyon: ManevraTipi;
  zorluk: Zorluk;
  adimlar: DireksiyonAdimi[];
  ipuclari: string[];
  hatalar: HataKriteri[];
}

export type IsaretKategori =
  | "tehlike"
  | "yasak"
  | "mecburiyet"
  | "bilgi"
  | "durakPark"
  | "isikDurum";

export interface TrafikIsareti {
  id: string;
  ad: string;
  kategori: IsaretKategori;
  anlam: string;
}
