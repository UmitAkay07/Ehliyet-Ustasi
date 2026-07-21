import type { DersId, Soru } from "@/types";
import { TRAFIK_SORULARI } from "./trafik";
import { ILKYARDIM_SORULARI } from "./ilkyardim";
import { MOTOR_SORULARI } from "./motor";
import { ADAB_SORULARI } from "./adab";
import { GENIS_HAVUZ } from "./genis-havuz";
import { KONU_HAVUZ } from "./konu-havuz";
import { SENARYO_SORULARI } from "./senaryo";
import { ISARET_SORULARI } from "./isaret-sorulari";
import { EKSTRA_SORULAR } from "./ekstra";

export const SORULAR: Soru[] = [
  ...TRAFIK_SORULARI,
  ...ILKYARDIM_SORULARI,
  ...MOTOR_SORULARI,
  ...ADAB_SORULARI,
  ...GENIS_HAVUZ,
  ...KONU_HAVUZ,
  ...SENARYO_SORULARI,
  ...ISARET_SORULARI,
  ...EKSTRA_SORULAR,
];

export function sorularByDers(dersId: DersId): Soru[] {
  return SORULAR.filter((s) => s.dersId === dersId);
}

export function sorularByKonu(konuId: string): Soru[] {
  return SORULAR.filter((s) => s.konuId === konuId);
}

export function soruBul(id: string): Soru | undefined {
  return SORULAR.find((s) => s.id === id);
}

function karistir<T>(arr: T[]): T[] {
  const kopya = [...arr];
  for (let i = kopya.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopya[i], kopya[j]] = [kopya[j], kopya[i]];
  }
  return kopya;
}

export function rastgeleSorular(dersId: DersId, adet: number): Soru[] {
  return karistir(sorularByDers(dersId)).slice(0, adet);
}

/** MEB sınav dağılımı: 23/12/9/6 — en az 12 görselli soru içerir */
export function provaSorulariUret(): Soru[] {
  const dagilim: Record<DersId, number> = {
    trafik: 23,
    ilkyardim: 12,
    motor: 9,
    adab: 6,
  };

  const gorselli = (s: Soru) => Boolean(s.gorselIsaretId || s.senaryoAnimId);
  const trafikGorsel = karistir(SORULAR.filter((s) => s.dersId === "trafik" && gorselli(s)));
  const trafikMetin = karistir(SORULAR.filter((s) => s.dersId === "trafik" && !gorselli(s)));

  const secilen: Soru[] = [];
  const gorselHedef = Math.min(12, trafikGorsel.length);
  const trafikGorselSec = trafikGorsel.slice(0, gorselHedef);
  const trafikMetinSec = trafikMetin.slice(0, dagilim.trafik - trafikGorselSec.length);
  secilen.push(...karistir([...trafikGorselSec, ...trafikMetinSec]).slice(0, dagilim.trafik));

  (Object.keys(dagilim) as DersId[]).forEach((dersId) => {
    if (dersId === "trafik") return;
    const havuz = sorularByDers(dersId);
    const istenen = dagilim[dersId];
    let secim = karistir(havuz).slice(0, istenen);
    if (secim.length < istenen && havuz.length > 0) {
      let i = 0;
      while (secim.length < istenen) {
        secim.push(havuz[i % havuz.length]);
        i++;
      }
    }
    secilen.push(...secim);
  });
  return karistir(secilen);
}

export { karistir };
