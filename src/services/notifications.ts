import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { sinavGunKalan } from "@/utils/gununSorusu";
import { gunSaati, planBildirimleri } from "@/utils/bildirimPlani";
import { gunPlanlari } from "./planGunleri";

const SINAV_BILDIRIM_SAAT = 13;
const SINAV_BILDIRIM_DAKIKA = 0;
/** i=0…MAX_GUN → en fazla 40 sınav bildirimi. 40 + en fazla 16 plan bildirimi = 56 (< iOS ~64 limiti). */
const MAX_GUN = 39;

/** Bugün + 14 gün sabah planı, bugün için akşam hatırlatması */
const PLAN_GUN_SAYISI = 14;
const GUN_MS = 24 * 60 * 60 * 1000;

const MOTIVASYON_MESAJLARI = [
  "Günaydın! Sınavına hazırlık için bugün biraz soru çözmeye ne dersin?",
  "Ehliyet Ustası seni bekliyor! Hadi bugün motor konularını tekrar edelim.",
  "Direksiyon sınavı simülasyonunu denemek için harika bir gün!",
  "Zaman daralıyor! Günde 10 dakika çalışarak başarıyı garantile.",
  "Bugün trafik kurallarından bir deneme çözüp kendini test et!",
  "İlk yardım konularına göz atmaya ne dersin? Hayat kurtaran bilgiler içeride!",
  "Güne motive başla! Ehliyet hedefine bir adım daha yaklaşmak için uygulamaya gir.",
  "Trafik adabı konularını okudun mu? Sınavda sürpriz puanlar buradan geliyor!",
  "Hadi konu tekrarı yap! Dün öğrendiklerini pekiştirmek her zaman iyidir.",
  "Haydi biraz simülasyon çalışalım! Pratik yapmak direksiyon sınavının anahtarıdır.",
  "Trafik işaretlerini ne kadar iyi biliyorsun? Küçük bir teste var mısın?",
  "Uyanma vakti! Güne taze bilgilerle başlamak için Ehliyet Ustası seni bekliyor.",
];

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

async function androidKanallariKur(): Promise<void> {
  if (Platform.OS !== "android") return;
  await Notifications.setNotificationChannelAsync("sinav-geri-sayim", {
    name: "Sınav Geri Sayımı",
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 200],
  });
  await Notifications.setNotificationChannelAsync("gunluk-motivasyon", {
    name: "Günlük Plan",
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#7DD0F0",
  });
}

/** İzin durumunu sorgular; sistem diyaloğu açmaz. */
export async function bildirimIzniVarMi(): Promise<boolean> {
  if (Platform.OS === "web") return false;
  const mevcut = await Notifications.getPermissionsAsync();
  return mevcut.status === "granted";
}

/** Sistem bildirim izni diyaloğunu açar (yalnızca kullanıcı eylemi sonrası çağır). */
export async function bildirimIzniIste(): Promise<boolean> {
  if (Platform.OS === "web") return false;

  const mevcut = await Notifications.getPermissionsAsync();
  let durum = mevcut.status;
  if (durum !== "granted") {
    const istenen = await Notifications.requestPermissionsAsync();
    durum = istenen.status;
  }
  if (durum !== "granted") return false;

  await androidKanallariKur();
  return true;
}

function kalanMesaj(kalan: number): string {
  if (kalan > 1) return `Sınava ${kalan} gününüz kaldı.`;
  if (kalan === 1) return "Sınava 1 gününüz kaldı.";
  if (kalan === 0) return "Sınavınız bugün! Bol şans.";
  return "Sınav tarihiniz geçti. Yeni tarih ekleyebilirsiniz.";
}

export type BildirimKurSecenekleri = {
  /** true ise izin yoksa sistem diyaloğu açılır. Varsayılan: false (soğuk açılışta sorma). */
  izinIste?: boolean;
};

interface BildirimIstegi {
  zaman: number;
  baslik: string;
  govde: string;
  kanal: "gunluk-motivasyon" | "sinav-geri-sayim";
  ses: boolean;
}

/** Aynı gün hep aynı mesaj (içerik değişmedikçe yeniden kurulum atlanabilsin), günden güne farklı */
function gununMotivasyonu(simdi: number, gunOfseti: number): string {
  const gunNo = Math.floor(gunSaati(simdi, gunOfseti, 12) / GUN_MS);
  return MOTIVASYON_MESAJLARI[gunNo % MOTIVASYON_MESAJLARI.length];
}

function istekleriHazirla(sinavTarihi: string | null, simdi: number): BildirimIstegi[] {
  const istekler: BildirimIstegi[] = planBildirimleri(
    gunPlanlari(simdi, sinavTarihi, PLAN_GUN_SAYISI),
    simdi,
    (gunOfseti) => gununMotivasyonu(simdi, gunOfseti)
  ).map((b) => ({ ...b, kanal: "gunluk-motivasyon" as const, ses: true }));

  if (sinavTarihi) {
    const toplamKalan = sinavGunKalan(sinavTarihi);
    if (toplamKalan != null && toplamKalan >= 0) {
      const gunSayisi = Math.min(toplamKalan, MAX_GUN);

      for (let i = 0; i <= gunSayisi; i++) {
        const tetik = new Date(simdi);
        tetik.setDate(tetik.getDate() + i);
        tetik.setHours(SINAV_BILDIRIM_SAAT, SINAV_BILDIRIM_DAKIKA, 0, 0);
        if (tetik.getTime() <= simdi + 30_000) continue;

        istekler.push({
          zaman: tetik.getTime(),
          baslik: "Ehliyet Ustası",
          govde: kalanMesaj(toplamKalan - i),
          kanal: "sinav-geri-sayim",
          ses: false,
        });
      }
    }
  }
  return istekler;
}

/**
 * Günlük plan (bugün + 14 gün × 10:00, bugün hedef bitmediyse 20:00) + varsa sınav geri sayımı (max 40 gün × 13:00).
 * Plan içeriği kayıtlı ilerlemeden hesaplanır; açılışta, sınav tarihi değişince ve uygulama arka plana geçince çağrılır.
 * Kurulacak bildirimler son kurulanlarla aynıysa hiçbir şey yapılmaz.
 * Açılışta izinIste=false ile çağır; izin diyaloğunu yalnızca kullanıcı bağlamında aç.
 */
let isScheduling = false;
let sonKurulanImza: string | null = null;
/** Kurulum sürerken gelen en son istek (ör. açılıştaki kurulum sırasında sınav tarihi değişti); atılmaz */
let bekleyenIstek: { sinavTarihi: string | null; izinIste: boolean } | null = null;

export async function tumBildirimleriKur(
  sinavTarihi: string | null,
  options?: BildirimKurSecenekleri
): Promise<void> {
  if (Platform.OS === "web") return;

  if (isScheduling) {
    bekleyenIstek = {
      sinavTarihi,
      izinIste: (bekleyenIstek?.izinIste ?? false) || (options?.izinIste ?? false),
    };
    return;
  }
  isScheduling = true;

  try {

  const izinIste = options?.izinIste ?? false;
  let izin = await bildirimIzniVarMi();
  if (!izin && izinIste) {
    izin = await bildirimIzniIste();
  }
  if (!izin) return;

  const istekler = istekleriHazirla(sinavTarihi, Date.now());
  const imza = JSON.stringify(istekler);
  // Sayı da kontrol edilir: "her şeyi sıfırla" bildirimleri dışarıdan iptal eder
  if (imza === sonKurulanImza) {
    const kurulu = await Notifications.getAllScheduledNotificationsAsync();
    if (kurulu.length === istekler.length) return;
  }

  await androidKanallariKur();
  // Önce yeniler kurulur, eskiler sonra silinir: arka plana geçerken yarıda kesilirse kullanıcı
  // bildirimsiz kalmaz (en kötü ihtimalle bir sonraki kuruluma kadar bazıları çift görünür)
  const eskiler = await Notifications.getAllScheduledNotificationsAsync();
  sonKurulanImza = null;

  for (const istek of istekler) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: istek.baslik,
        body: istek.govde,
        sound: istek.ses,
        ...(Platform.OS === "android" ? { channelId: istek.kanal } : {}),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: new Date(istek.zaman),
      },
    });
  }
  for (const eski of eskiler) {
    await Notifications.cancelScheduledNotificationAsync(eski.identifier);
  }
  sonKurulanImza = imza;
  } finally {
    isScheduling = false;
    const sonraki = bekleyenIstek;
    bekleyenIstek = null;
    if (sonraki) {
      tumBildirimleriKur(sonraki.sinavTarihi, { izinIste: sonraki.izinIste }).catch((e) =>
        console.warn("[bildirim] bekleyen kurulum yapılamadı:", String(e))
      );
    }
  }
}
