/**
 * Açılış ekranı logo boyutu (saf, testli: scripts/test-acilis-logosu.mjs).
 *
 * Android 12+ açılış ekranı simgeyi 288 dp'lik bir karede gösterir ve 192 dp çaplı bir daireyle keser.
 * Logomuz köşeleri yuvarlatılmış bir kare; en uzak dolu noktası kenar uzunluğunun 0,612'si kadar
 * merkezden uzakta (assets/icon-brand.png ölçüldü). Daireye kesilmeden sığan en büyük kenar
 * 96 / 0,612 ≈ 157 dp; biraz pay bırakılarak 150 dp. Bu, Android'in açılış ekranında izin verdiği
 * en büyük boyut; uygulamanın kendi açılış ekranı da aynı boyutta kalır ki geçişte logo zıplamasın.
 * app.json → expo-splash-screen → imageWidth ile aynı olmalı.
 */
export const YEREL_ACILIS_LOGO_DP = 150;
