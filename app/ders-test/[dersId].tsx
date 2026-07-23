import React, { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { QuizRunner } from "@/components/QuizRunner";
import { karistir, sorularByDers } from "@/data/sorular";
import { dersBul } from "@/data/dersler";
import type { DersId } from "@/types";

export default function DersTestScreen() {
  const { dersId } = useLocalSearchParams<{ dersId: string }>();
  const ders = dersBul(dersId);
  const sorular = useMemo(() => karistir(sorularByDers(dersId as DersId)), [dersId]);

  return (
    <QuizRunner
      sorular={sorular}
      baslik={ders ? `${ders.kisaAd} Karışık Test` : "Karışık Test"}
      altBaslik="Dersten rastgele sorular"
    />
  );
}
