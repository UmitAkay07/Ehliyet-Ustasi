import React from "react";
import { QuizRunner } from "@/components/QuizRunner";
import { SENARYO_SORULARI } from "@/data/sorular/senaryo";
import { karistir } from "@/data/sorular";

export default function SenaryoTestScreen() {
  const sorular = karistir(SENARYO_SORULARI);
  return (
    <QuizRunner
      sorular={sorular}
      baslik="Senaryo Testi"
      altBaslik="Animasyonlu trafik durumları"
    />
  );
}
