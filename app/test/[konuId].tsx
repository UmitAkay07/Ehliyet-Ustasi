import React, { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { QuizRunner } from "@/components/QuizRunner";
import { sorularByKonu, karistir } from "@/data/sorular";
import { konuBul } from "@/data/konular";

export default function KonuTestScreen() {
  const { konuId } = useLocalSearchParams<{ konuId: string }>();
  const konu = konuBul(konuId);
  const sorular = useMemo(() => karistir(sorularByKonu(konuId)), [konuId]);

  return <QuizRunner sorular={sorular} baslik={konu?.baslik ?? "Konu Testi"} altBaslik="Konu Testi" />;
}
