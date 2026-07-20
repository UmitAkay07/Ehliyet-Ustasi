import type { DersId, Konu } from "@/types";
import { TRAFIK_KONULARI } from "./trafik";
import { ILKYARDIM_KONULARI } from "./ilkyardim";
import { MOTOR_KONULARI } from "./motor";
import { ADAB_KONULARI } from "./adab";

export const KONULAR: Konu[] = [
  ...TRAFIK_KONULARI,
  ...ILKYARDIM_KONULARI,
  ...MOTOR_KONULARI,
  ...ADAB_KONULARI,
];

export function konularByDers(dersId: DersId): Konu[] {
  return KONULAR.filter((k) => k.dersId === dersId);
}

export function konuBul(id: string): Konu | undefined {
  return KONULAR.find((k) => k.id === id);
}
