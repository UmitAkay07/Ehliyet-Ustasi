import React, { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { QuizRunner } from "@/components/QuizRunner";
import { sorularByKonu, karistir } from "@/data/sorular";
import { konuBul } from "@/data/konular";

/** Konu testi üst sınırı — işaretler gibi büyük havuzlarda tek oturumda bitirilebilir kalsın */
const KONU_TEST_SORU_ADEDI = 20;

export default function KonuTestScreen() {
  const { konuId } = useLocalSearchParams<{ konuId: string }>();
  const konu = konuBul(konuId);
  const sorular = useMemo(
    () => karistir(sorularByKonu(konuId)).slice(0, KONU_TEST_SORU_ADEDI),
    [konuId]
  );

  return (
    <QuizRunner
      sorular={sorular}
      baslik={konu?.baslik ?? "Konu Testi"}
      altBaslik={`${sorular.length} soruluk konu testi`}
    />
  );
}
