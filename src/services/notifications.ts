import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { sinavGunKalan } from "@/utils/gununSorusu";

const BILDIRIM_SAAT = 13;
const BILDIRIM_DAKIKA = 0;
const MAX_GUN = 120;

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function bildirimIzniIste(): Promise<boolean> {
  if (Platform.OS === "web") return false;

  const mevcut = await Notifications.getPermissionsAsync();
  let durum = mevcut.status;
  if (durum !== "granted") {
    const istenen = await Notifications.requestPermissionsAsync();
    durum = istenen.status;
  }
  if (durum !== "granted") return false;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("sinav-geri-sayim", {
      name: "Sınav geri sayımı",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 200],
    });
  }
  return true;
}

function kalanMesaj(kalan: number): string {
  if (kalan > 1) return `Sınava ${kalan} gününüz kaldı.`;
  if (kalan === 1) return "Sınava 1 gününüz kaldı.";
  if (kalan === 0) return "Sınavınız bugün! Bol şans.";
  return "Sınav tarihiniz geçti. Yeni tarih ekleyebilirsiniz.";
}

/** Sınav tarihine kadar her gün 09:00'da bildirim zamanlar */
export async function sinavBildirimleriniKur(sinavTarihi: string | null): Promise<void> {
  if (Platform.OS === "web") return;

  await Notifications.cancelAllScheduledNotificationsAsync();

  if (!sinavTarihi) return;

  const izin = await bildirimIzniIste();
  if (!izin) return;

  const toplamKalan = sinavGunKalan(sinavTarihi);
  if (toplamKalan == null || toplamKalan < 0) return;

  const simdi = new Date();
  const gunSayisi = Math.min(toplamKalan, MAX_GUN);

  for (let i = 0; i <= gunSayisi; i++) {
    const kalan = toplamKalan - i;
    const tetik = new Date(simdi);
    tetik.setDate(simdi.getDate() + i);
    tetik.setHours(BILDIRIM_SAAT, BILDIRIM_DAKIKA, 0, 0);

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
