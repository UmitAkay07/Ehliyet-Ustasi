import React, { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { QuizRunner } from "@/components/QuizRunner";
import { karistir, sorularByDers } from "@/data/sorular";
import { dersBul } from "@/data/dersler";
import type { DersId } from "@/types";

/** Kullanıcı dostu üst sınır — tüm havuzu tek seferde sorma */
const DERS_TEST_SORU_ADEDI = 25;

export default function DersTestScreen() {
  const { dersId } = useLocalSearchParams<{ dersId: string }>();
  const ders = dersBul(dersId);
  const sorular = useMemo(
    () => karistir(sorularByDers(dersId as DersId)).slice(0, DERS_TEST_SORU_ADEDI),
    [dersId]
  );

  return (
    <QuizRunner
      sorular={sorular}
      baslik={ders ? `${ders.kisaAd} Karışık Test` : "Karışık Test"}
      altBaslik={`${sorular.length} rastgele soru`}
    />
  );
}
