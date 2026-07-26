import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { sinavGunKalan } from "@/utils/gununSorusu";

const SINAV_BILDIRIM_SAAT = 13;
const SINAV_BILDIRIM_DAKIKA = 0;
/** i=0…MAX_GUN → en fazla 40 sınav bildirimi. 40 + 14 motivasyon = 54 (< iOS ~64 limiti). */
const MAX_GUN = 39;

const MOTIVASYON_SAAT = 10;
const MOTIVASYON_DAKIKA = 0;
const MOTIVASYON_GUN_SAYISI = 14;

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
    name: "Günlük Motivasyon",
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#6366F1",
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

/**
 * Motivasyon (14 gün × 10:00) + varsa sınav geri sayımı (max 40 gün × 13:00).
 * Açılışta izinIste=false ile çağır; izin diyaloğunu yalnızca kullanıcı bağlamında aç.
 */
export async function tumBildirimleriKur(
  sinavTarihi: string | null,
  options?: BildirimKurSecenekleri
): Promise<void> {
  if (Platform.OS === "web") return;

  const izinIste = options?.izinIste ?? false;
  let izin = await bildirimIzniVarMi();
  if (!izin && izinIste) {
    izin = await bildirimIzniIste();
  }
  if (!izin) return;

  await androidKanallariKur();
  await Notifications.cancelAllScheduledNotificationsAsync();

  const simdi = new Date();

  for (let i = 1; i <= MOTIVASYON_GUN_SAYISI; i++) {
    const tetik = new Date(simdi);
    tetik.setDate(simdi.getDate() + i);
    tetik.setHours(MOTIVASYON_SAAT, MOTIVASYON_DAKIKA, 0, 0);

    const rastgeleMesaj =
      MOTIVASYON_MESAJLARI[Math.floor(Math.random() * MOTIVASYON_MESAJLARI.length)];

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Ehliyet Ustası",
        body: rastgeleMesaj,
        sound: true,
        ...(Platform.OS === "android" ? { channelId: "gunluk-motivasyon" } : {}),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: tetik,
      },
    });
  }

  if (sinavTarihi) {
    const toplamKalan = sinavGunKalan(sinavTarihi);
    if (toplamKalan != null && toplamKalan >= 0) {
      const gunSayisi = Math.min(toplamKalan, MAX_GUN);

      for (let i = 0; i <= gunSayisi; i++) {
        const kalan = toplamKalan - i;
        const tetik = new Date(simdi);
        tetik.setDate(simdi.getDate() + i);
        tetik.setHours(SINAV_BILDIRIM_SAAT, SINAV_BILDIRIM_DAKIKA, 0, 0);

        if (tetik.getTime() <= Date.now() + 30_000) continue;

        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Ehliyet Ustası",
            body: kalanMesaj(kalan),
            sound: false,
            ...(Platform.OS === "android" ? { channelId: "sinav-geri-sayim" } : {}),
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: tetik,
          },
        });
      }
    }
  }
}
