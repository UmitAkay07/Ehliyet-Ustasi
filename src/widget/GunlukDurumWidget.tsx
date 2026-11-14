import React from "react";
import { FlexWidget, ImageWidget, OverlapWidget, SvgWidget, TextWidget } from "react-native-android-widget";
import { ilerlemeOrani, sinavDurumu, widgetDuzeniSec, widgetOlcegi } from "@/utils/widgetDuzeni";
import type { SinavDurumu, WidgetDuzeni } from "@/utils/widgetDuzeni";
import { yolSvg, zeminSvg } from "./cizimler";
import type { WidgetVerisi } from "./ortak";

const LOGO = require("../../assets/widget/logo.png");

/** Widget uygulama temasının dışında çizilir; koyu temanın renkleri sabit kullanılır */
const RENK = {
  yazi: "#F2F2F0",
  soluk: "#98A0A6",
  vurgu: "#7DD0F0",
  vurguZemin: "rgba(125, 208, 240, 0.16)",
  basari: "#5CC27F",
  basariZemin: "rgba(92, 194, 127, 0.16)",
} as const;
type Renk = (typeof RENK)[keyof typeof RENK];

/** app.json'da widget eklentisine verilen font dosyalarının adları */
const FONT = { siyah: "Nunito_800ExtraBold", kalin: "Nunito_700Bold" } as const;

const ANA_URI = "ehliyetustasi://";
const TEKRAR_URI = "ehliyetustasi://tekrar";

interface YaziProps {
  metin: string;
  boyut: number;
  renk: Renk;
  font?: string;
  aralik?: number;
  solBosluk?: number;
  ustBosluk?: number;
  hizala?: "left" | "right";
}

/** Yazılar widget boyutuyla ölçeklenir; sistem yazı boyutu ayarı düzeni taşırmasın diye uygulanmaz */
function Yazi({ metin, boyut, renk, font = FONT.kalin, aralik, solBosluk, ustBosluk, hizala }: YaziProps) {
  return (
    <TextWidget
      text={metin}
      maxLines={1}
      truncate="END"
      allowFontScaling={false}
      style={{
        fontSize: boyut,
        fontFamily: font,
        color: renk,
        ...(aralik !== undefined ? { letterSpacing: aralik } : {}),
        ...(solBosluk ? { marginLeft: solBosluk } : {}),
        ...(ustBosluk ? { marginTop: ustBosluk } : {}),
        ...(hizala ? { textAlign: hizala } : {}),
      }}
    />
  );
}

function Logo({ boyut }: { boyut: number }) {
  return <ImageWidget image={LOGO} imageWidth={boyut} imageHeight={boyut} radius={Math.round(boyut * 0.24)} />;
}

function Bosluk() {
  return <FlexWidget style={{ flex: 1 }} />;
}

function TekrarRozeti({ sayi, k }: { sayi: number; k: number }) {
  const bekliyor = sayi > 0;
  const renk = bekliyor ? RENK.vurgu : RENK.basari;
  const nokta = Math.round(6 * k);
  return (
    <FlexWidget
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: bekliyor ? RENK.vurguZemin : RENK.basariZemin,
        borderRadius: Math.round(11 * k),
        paddingHorizontal: Math.round(9 * k),
        paddingVertical: Math.round(4 * k),
      }}
    >
      <FlexWidget style={{ width: nokta, height: nokta, borderRadius: nokta / 2, backgroundColor: renk }} />
      <Yazi
        metin={bekliyor ? `${sayi} tekrar` : "Tekrar tamam"}
        boyut={Math.round(11 * k)}
        renk={renk}
        font={FONT.siyah}
        solBosluk={Math.round(5 * k)}
      />
    </FlexWidget>
  );
}

interface Gosterge {
  etiket: string;
  etiketRenk: Renk;
  deger: string;
  degerRenk: Renk;
  /** Sayı değilse (ör. "Bugün", "Seçilmedi") daha küçük yazılır */
  kisaDeger: boolean;
  birim: string;
}

function hedefTamam(veri: WidgetVerisi): boolean {
  return veri.bugunCozulen >= veri.gunlukHedef;
}

function hedefGostergesi(veri: WidgetVerisi): Gosterge {
  const tamam = hedefTamam(veri);
  return {
    etiket: tamam ? "HEDEF TAMAM" : "BUGÜNKÜ HEDEF",
    etiketRenk: tamam ? RENK.basari : RENK.soluk,
    deger: String(Math.min(veri.bugunCozulen, 999)),
    degerRenk: RENK.yazi,
    kisaDeger: true,
    birim: `/${veri.gunlukHedef}`,
  };
}

function sinavGostergesi(veri: WidgetVerisi, durum: SinavDurumu): Gosterge {
  if (durum === "geri-sayim") {
    return {
      etiket: "SINAVA KALAN",
      etiketRenk: RENK.soluk,
      deger: String(veri.kalanGun),
      degerRenk: RENK.yazi,
      kisaDeger: true,
      birim: "gün",
    };
  }
  if (durum === "bugun") {
    return { etiket: "SINAV GÜNÜ", etiketRenk: RENK.vurgu, deger: "Bugün", degerRenk: RENK.yazi, kisaDeger: false, birim: "" };
  }
  return {
    etiket: "SINAV TARİHİ",
    etiketRenk: RENK.soluk,
    deger: durum === "gecti" ? "Geçti" : "Seçilmedi",
    degerRenk: RENK.soluk,
    kisaDeger: false,
    birim: "",
  };
}

/** kisa: en dar şerit (2x1) için sığan metinler */
function altSatir(veri: WidgetVerisi, durum: SinavDurumu, kisa = false): { metin: string; renk: Renk } {
  if (durum === "bugun") return { metin: "Bol şans!", renk: RENK.vurgu };
  if (durum === "yok") return { metin: kisa ? "Tarihini seç" : "Sınav tarihini seç", renk: RENK.vurgu };
  if (durum === "gecti") return { metin: kisa ? "Tarihi güncelle" : "Sınav tarihini güncelle", renk: RENK.vurgu };
  if (hedefTamam(veri)) return { metin: kisa ? "Hedef tamam" : "Bugünkü hedef tamam", renk: RENK.basari };
  return { metin: `Bugün ${veri.bugunCozulen}/${veri.gunlukHedef} soru`, renk: RENK.soluk };
}

function yolOrani(veri: WidgetVerisi, durum: SinavDurumu): number {
  return durum === "bugun" ? 1 : ilerlemeOrani(veri.bugunCozulen, veri.gunlukHedef);
}

interface DuzenProps {
  veri: WidgetVerisi;
  W: number;
  H: number;
  k: number;
}

function GostergeBlogu({ g, k, buyuk, sagaYasli }: { g: Gosterge; k: number; buyuk: number; sagaYasli?: boolean }) {
  const n = (x: number) => Math.round(x * k);
  const degerBoyut = g.kisaDeger ? n(buyuk) : n(buyuk * 0.62);
  return (
    <FlexWidget style={{ flexDirection: "column", alignItems: sagaYasli ? "flex-end" : "flex-start" }}>
      <Yazi metin={g.etiket} boyut={n(10)} renk={g.etiketRenk} font={FONT.siyah} aralik={0.8} />
      <FlexWidget style={{ flexDirection: "row", marginTop: -n(2) }}>
        <Yazi metin={g.deger} boyut={degerBoyut} renk={g.degerRenk} font={FONT.siyah} aralik={-1} />
        {g.birim ? <Yazi metin={g.birim} boyut={n(buyuk * 0.36)} renk={RENK.soluk} solBosluk={n(4)} /> : null}
      </FlexWidget>
    </FlexWidget>
  );
}

/** 2x2 civarı: logo ve tekrar rozeti, büyük gösterge, bugünkü yol */
function KareDuzen({ veri, W, k }: DuzenProps) {
  const n = (x: number) => Math.round(x * k);
  const pad = n(14);
  const ic = W - 2 * pad;
  const yolH = n(18);
  const durum = sinavDurumu(veri.kalanGun);
  const g = durum === "geri-sayim" || durum === "bugun" ? sinavGostergesi(veri, durum) : hedefGostergesi(veri);
  const alt = altSatir(veri, durum);
  return (
    <FlexWidget style={{ width: "match_parent", height: "match_parent", flexDirection: "column", padding: pad }}>
      <FlexWidget style={{ width: "match_parent", flexDirection: "row", alignItems: "center" }}>
        <Logo boyut={n(26)} />
        <Bosluk />
        {veri.tekrarSayisi > 0 ? <TekrarRozeti sayi={veri.tekrarSayisi} k={k} /> : null}
      </FlexWidget>
      <FlexWidget style={{ flex: 1, width: "match_parent", flexDirection: "column", justifyContent: "center" }}>
        <GostergeBlogu g={g} k={k} buyuk={46} />
      </FlexWidget>
      <SvgWidget svg={yolSvg({ genislik: ic, yukseklik: yolH, ilerleme: yolOrani(veri, durum) })} style={{ width: ic, height: yolH }} />
      <Yazi metin={alt.metin} boyut={n(11.5)} renk={alt.renk} ustBosluk={n(7)} />
    </FlexWidget>
  );
}

/** 3x2 / 4x2 civarı: solda sınav, sağda bugünkü hedef, altta tam genişlik yol */
function GenisDuzen({ veri, W, k }: DuzenProps) {
  const n = (x: number) => Math.round(x * k);
  const pad = n(16);
  const ic = W - 2 * pad;
  const yolH = n(18);
  const durum = sinavDurumu(veri.kalanGun);
  const sol = sinavGostergesi(veri, durum);
  const sag: Gosterge =
    durum === "bugun"
      ? { etiket: "BUGÜN", etiketRenk: RENK.soluk, deger: "Bol şans!", degerRenk: RENK.vurgu, kisaDeger: false, birim: "" }
      : hedefGostergesi(veri);
  return (
    <FlexWidget style={{ width: "match_parent", height: "match_parent", flexDirection: "column", padding: pad }}>
      <FlexWidget style={{ width: "match_parent", flexDirection: "row", alignItems: "center" }}>
        <Logo boyut={n(26)} />
        <Yazi metin="Ehliyet Ustası" boyut={n(14)} renk={RENK.yazi} font={FONT.siyah} solBosluk={n(8)} />
        <Bosluk />
        <TekrarRozeti sayi={veri.tekrarSayisi} k={k} />
      </FlexWidget>
      <FlexWidget style={{ flex: 1, width: "match_parent", flexDirection: "row", alignItems: "center" }}>
        <FlexWidget style={{ flex: 1 }}>
          <GostergeBlogu g={sol} k={k} buyuk={44} />
        </FlexWidget>
        <GostergeBlogu g={sag} k={k} buyuk={30} sagaYasli />
      </FlexWidget>
      <SvgWidget
        svg={yolSvg({ genislik: ic, yukseklik: yolH, ilerleme: yolOrani(veri, durum) })}
        style={{ width: ic, height: yolH, marginTop: n(12) }}
      />
    </FlexWidget>
  );
}

/** Tek sıra: logo, tek satır gösterge; genişse rozet ve ince yol, darsa kısa bir alt satır */
function SeritDuzen({ veri, W, H, k }: DuzenProps) {
  const n = (x: number) => Math.round(x * k);
  const padX = n(14);
  const logo = Math.min(44, Math.max(28, Math.round(H * 0.46)));
  const bosluk = n(10);
  const ic = W - 2 * padX - logo - bosluk;
  const genis = W >= 200;
  const yolH = n(12);
  const durum = sinavDurumu(veri.kalanGun);

  const ana =
    durum === "geri-sayim"
      ? { deger: String(veri.kalanGun), birim: "gün kaldı" }
      : durum === "bugun"
        ? { deger: "Bugün", birim: genis ? "sınav günü" : "" }
        : { deger: String(Math.min(veri.bugunCozulen, 999)), birim: `/${veri.gunlukHedef} soru` };
  const ikinci =
    durum === "bugun"
      ? { metin: "Sınav günü!", renk: RENK.vurgu }
      : veri.tekrarSayisi > 0
        ? { metin: `${veri.tekrarSayisi} tekrar var`, renk: RENK.vurgu }
        : altSatir(veri, durum, true);

  return (
    <FlexWidget
      style={{
        width: "match_parent",
        height: "match_parent",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: padX,
        paddingVertical: n(8),
      }}
    >
      <Logo boyut={logo} />
      <FlexWidget style={{ flex: 1, flexDirection: "column", marginLeft: bosluk }}>
        <FlexWidget style={{ width: "match_parent", flexDirection: "row", alignItems: "center" }}>
          <FlexWidget style={{ flexDirection: "row" }}>
            <Yazi metin={ana.deger} boyut={n(22)} renk={RENK.yazi} font={FONT.siyah} aralik={-0.5} />
            {ana.birim ? <Yazi metin={ana.birim} boyut={n(12.5)} renk={RENK.soluk} solBosluk={n(5)} /> : null}
          </FlexWidget>
          <Bosluk />
          {genis && veri.tekrarSayisi > 0 ? <TekrarRozeti sayi={veri.tekrarSayisi} k={k * 0.9} /> : null}
        </FlexWidget>
        {genis ? (
          <SvgWidget
            svg={yolSvg({ genislik: ic, yukseklik: yolH, ilerleme: yolOrani(veri, durum) })}
            style={{ width: ic, height: yolH, marginTop: n(6) }}
          />
        ) : (
          <Yazi metin={ikinci.metin} boyut={n(11)} renk={ikinci.renk} />
        )}
      </FlexWidget>
    </FlexWidget>
  );
}

const DUZENLER: Record<WidgetDuzeni, (p: DuzenProps) => React.JSX.Element> = {
  serit: SeritDuzen,
  kare: KareDuzen,
  genis: GenisDuzen,
};

interface GunlukDurumWidgetProps {
  veri: WidgetVerisi;
  /** Widget'ın ekrandaki genişliği ve yüksekliği (dp); telefona ve kullanıcının verdiği boyuta göre değişir */
  genislik: number;
  yukseklik: number;
}

/**
 * Ana ekran widget'ı: sınava kalan gün, bekleyen tekrar ve bugünkü soru hedefi ("bugünkü yol").
 * Boyuta göre üç düzenden biri seçilir: tek sıra şerit, 2x2 kare, 3x2 ve üstü geniş.
 * Dokunulunca tekrar varsa tekrar ekranı, yoksa uygulama açılır.
 */
export function GunlukDurumWidget({ veri, genislik, yukseklik }: GunlukDurumWidgetProps) {
  const duzen = widgetDuzeniSec(genislik, yukseklik);
  const k = widgetOlcegi(duzen, genislik, yukseklik);
  const Duzen = DUZENLER[duzen];
  return (
    <OverlapWidget
      clickAction="OPEN_URI"
      clickActionData={{ uri: veri.tekrarSayisi > 0 ? TEKRAR_URI : ANA_URI }}
      style={{ width: "match_parent", height: "match_parent" }}
    >
      <SvgWidget
        svg={zeminSvg({ genislik, yukseklik, duzen })}
        style={{ width: "match_parent", height: "match_parent" }}
      />
      <Duzen veri={veri} W={genislik} H={yukseklik} k={k} />
    </OverlapWidget>
  );
}
