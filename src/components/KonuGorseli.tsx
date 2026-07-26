import React from "react";
import { Text, View } from "react-native";
import Svg, {
  Circle,
  Ellipse,
  Rect,
  Line,
  Polygon,
  G,
  Text as SvgText,
  Path,
} from "react-native-svg";
import { KonuAnimasyonu, konuAnimasyonluMu } from "@/animations/KonuAnimasyonu";
import { useTheme } from "@/theme";

function Frame({
  children,
  title,
  height = 160,
}: {
  children: React.ReactNode;
  title?: string;
  height?: number;
}) {
  const { colors, fontFamily, radius, spacing, fontSize } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.surfaceAlt,
        borderRadius: radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        overflow: "hidden",
        marginVertical: spacing.sm,
      }}
    >
      {title ? (
        <Text
          style={{
            color: colors.textMuted,
            fontSize: fontSize.xs,
            fontFamily: fontFamily.semibold,
            paddingHorizontal: spacing.md,
            paddingTop: spacing.sm,
          }}
        >
          {title}
        </Text>
      ) : null}
      <View style={{ alignItems: "center", padding: spacing.sm }}>
        <Svg width={300} height={height} viewBox={`0 0 300 ${height}`}>
          {children}
        </Svg>
      </View>
    </View>
  );
}

function HizTablosu() {
  return (
    <Frame title="Otomobil azami hız sınırları (genel)" height={150}>
      <Rect x={10} y={10} width={280} height={130} rx={10} fill="#1E293B" />
      {[
        ["Yerleşim yeri", "50 km/s", 40],
        ["Çift yönlü yol", "90 km/s", 70],
        ["Bölünmüş yol", "110 km/s", 100],
        ["Otoyol", "120 km/s", 130],
      ].map(([a, b, y]) => (
        <G key={a as string}>
          <SvgText x={24} y={y as number} fill="#E2E8F0" fontSize={13}>
            {a as string}
          </SvgText>
          <SvgText x={200} y={y as number} fill="#38BDF8" fontSize={13} fontWeight="bold">
            {b as string}
          </SvgText>
        </G>
      ))}
    </Frame>
  );
}

function TakipMesafesi() {
  return (
    <Frame title="Takip mesafesi (hızın ~yarısı metre)" height={120}>
      <Rect x={20} y={50} width={50} height={28} rx={5} fill="#6366F1" />
      <Rect x={200} y={50} width={50} height={28} rx={5} fill="#94A3B8" />
      <Line x1={75} y1={64} x2={195} y2={64} stroke="#FBBF24" strokeWidth={3} strokeDasharray="8 6" />
      <SvgText x={150} y={40} fill="#FBBF24" fontSize={12} textAnchor="middle" fontWeight="bold">
        takip mesafesi
      </SvgText>
      <SvgText x={150} y={105} fill="#CBD5E1" fontSize={11} textAnchor="middle">
        90 km/s → en az ~45 m / 2 sn kuralı
      </SvgText>
    </Frame>
  );
}

function GecisOnceligi() {
  return (
    <Frame title="Öncelik sırası" height={140}>
      {[
        ["1", "Trafik görevlisi", "#EF4444", 28],
        ["2", "Işıklı işaret", "#F59E0B", 58],
        ["3", "Trafik levhası", "#3B82F6", 88],
        ["4", "Yer işaretlemesi", "#10B981", 118],
      ].map(([n, t, c, y]) => (
        <G key={n as string}>
          <Circle cx={36} cy={y as number} r={12} fill={c as string} />
          <SvgText x={36} y={(y as number) + 4} fill="#fff" fontSize={12} textAnchor="middle" fontWeight="bold">
            {n as string}
          </SvgText>
          <SvgText x={60} y={(y as number) + 4} fill="#E2E8F0" fontSize={13}>
            {t as string}
          </SvgText>
        </G>
      ))}
    </Frame>
  );
}

function LevhaSekilleri() {
  return (
    <Frame title="Levha şekli = anlam" height={150}>
      <Polygon points="55,20 85,75 25,75" fill="#FFF" stroke="#EF4444" strokeWidth={3} />
      <SvgText x={55} y={100} fill="#CBD5E1" fontSize={10} textAnchor="middle">
        Tehlike
      </SvgText>
      <Circle cx={150} cy={50} r={28} fill="#FFF" stroke="#EF4444" strokeWidth={4} />
      <Line x1={132} y1={32} x2={168} y2={68} stroke="#EF4444" strokeWidth={4} />
      <SvgText x={150} y={100} fill="#CBD5E1" fontSize={10} textAnchor="middle">
        Yasak
      </SvgText>
      <Circle cx={245} cy={50} r={28} fill="#2563EB" />
      <Polygon points="245,30 255,50 249,50 249,70 241,70 241,50 235,50" fill="#FFF" />
      <SvgText x={245} y={100} fill="#CBD5E1" fontSize={10} textAnchor="middle">
        Mecburiyet
      </SvgText>
      <SvgText x={150} y={130} fill="#94A3B8" fontSize={11} textAnchor="middle">
        Dur = sekizgen · Yol ver = ters üçgen
      </SvgText>
    </Frame>
  );
}

function AbcDiyagram() {
  return (
    <Frame title="ABC değerlendirme sırası" height={120}>
      {[
        ["A", "Airway", "Hava yolu", "#EF4444", 55],
        ["B", "Breathing", "Solunum", "#F59E0B", 150],
        ["C", "Circulation", "Dolaşım", "#22C55E", 245],
      ].map(([l, en, tr, c, x]) => (
        <G key={l as string}>
          <Circle cx={x as number} cy={45} r={22} fill={c as string} />
          <SvgText x={x as number} y={50} fill="#fff" fontSize={16} textAnchor="middle" fontWeight="bold">
            {l as string}
          </SvgText>
          <SvgText x={x as number} y={85} fill="#E2E8F0" fontSize={11} textAnchor="middle">
            {tr as string}
          </SvgText>
          <SvgText x={x as number} y={102} fill="#94A3B8" fontSize={9} textAnchor="middle">
            {en as string}
          </SvgText>
        </G>
      ))}
    </Frame>
  );
}

function Tyd302() {
  return (
    <Frame title="Yetişkin TYD döngüsü" height={120}>
      <Rect x={30} y={30} width={100} height={55} rx={10} fill="#EF4444" />
      <SvgText x={80} y={55} fill="#fff" fontSize={18} textAnchor="middle" fontWeight="bold">
        30
      </SvgText>
      <SvgText x={80} y={72} fill="#FEE2E2" fontSize={11} textAnchor="middle">
        göğüs basısı
      </SvgText>
      <SvgText x={150} y={60} fill="#FBBF24" fontSize={22} textAnchor="middle">
        +
      </SvgText>
      <Rect x={170} y={30} width={100} height={55} rx={10} fill="#3B82F6" />
      <SvgText x={220} y={55} fill="#fff" fontSize={18} textAnchor="middle" fontWeight="bold">
        2
      </SvgText>
      <SvgText x={220} y={72} fill="#DBEAFE" fontSize={11} textAnchor="middle">
        suni solunum
      </SvgText>
      <SvgText x={150} y={105} fill="#CBD5E1" fontSize={11} textAnchor="middle">
        Derinlik ~5 cm · hız 100–120/dk
      </SvgText>
    </Frame>
  );
}

function Heimlich() {
  return (
    <Frame title="Heimlich (karına bası) yönü" height={140}>
      <Circle cx={150} cy={45} r={16} fill="#FCD34D" />
      <Rect x={130} y={60} width={40} height={55} rx={8} fill="#60A5FA" />
      <Path d="M150 95 L150 115 L135 125 M150 115 L165 125" stroke="#22C55E" strokeWidth={4} fill="none" />
      <SvgText x={150} y={30} fill="#E2E8F0" fontSize={11} textAnchor="middle">
        içe ve yukarı
      </SvgText>
      <SvgText x={150} y={55} fill="#1E293B" fontSize={10} textAnchor="middle" fontWeight="bold">
        yumruk
      </SvgText>
    </Frame>
  );
}

function SokPozisyonu() {
  return (
    <Frame title="Şok pozisyonu" height={110}>
      <Line x1={40} y1={70} x2={220} y2={70} stroke="#64748B" strokeWidth={3} />
      <Rect x={70} y={45} width={90} height={22} rx={6} fill="#60A5FA" />
      <Rect x={160} y={25} width={60} height={18} rx={5} fill="#93C5FD" transform="rotate(-18 160 25)" />
      <SvgText x={150} y={100} fill="#CBD5E1" fontSize={11} textAnchor="middle">
        Ayaklar ~30 cm yukarı · üzeri örtülür
      </SvgText>
    </Frame>
  );
}

function KomaPozisyonu() {
  return (
    <Frame title="Koma (yan / yarı yüzükoyun) pozisyon" height={110}>
      <Ellipse cx={150} cy={55} rx={70} ry={22} fill="#334155" />
      <Circle cx={210} cy={48} r={12} fill="#FCD34D" />
      <SvgText x={150} y={95} fill="#CBD5E1" fontSize={11} textAnchor="middle">
        Bilinç kapalı + solunum var → yan yatış
      </SvgText>
    </Frame>
  );
}

function DortZaman() {
  return (
    <Frame title="4 zamanlı motor sırası" height={130}>
      {["1 Emme", "2 Sıkıştırma", "3 Ateşleme", "4 Egzoz"].map((t, i) => (
        <G key={t}>
          <Rect x={18 + i * 70} y={35} width={62} height={50} rx={8} fill={["#3B82F6", "#8B5CF6", "#F59E0B", "#64748B"][i]} />
          <SvgText x={49 + i * 70} y={65} fill="#fff" fontSize={10} textAnchor="middle" fontWeight="bold">
            {t}
          </SvgText>
        </G>
      ))}
      <SvgText x={150} y={110} fill="#94A3B8" fontSize={11} textAnchor="middle">
        Emme → Sıkıştırma → Ateşleme → Egzoz
      </SvgText>
    </Frame>
  );
}

function GostergeRenkler() {
  return (
    <Frame title="İkaz lambası renkleri" height={120}>
      {[
        ["Kırmızı", "Acil · durdur", "#EF4444", 55],
        ["Sarı", "Uyarı · kontrol", "#F59E0B", 150],
        ["Yeşil/Mavi", "Sistem açık", "#22C55E", 245],
      ].map(([a, b, c, x]) => (
        <G key={a as string}>
          <Circle cx={x as number} cy={45} r={18} fill={c as string} />
          <SvgText x={x as number} y={80} fill="#E2E8F0" fontSize={11} textAnchor="middle" fontWeight="bold">
            {a as string}
          </SvgText>
          <SvgText x={x as number} y={96} fill="#94A3B8" fontSize={9} textAnchor="middle">
            {b as string}
          </SvgText>
        </G>
      ))}
    </Frame>
  );
}

function AbsSema() {
  return (
    <Frame title="ABS: tekerlek kilitlenmesini önler" height={120}>
      <Circle cx={80} cy={55} r={28} fill="none" stroke="#94A3B8" strokeWidth={6} />
      <Circle cx={220} cy={55} r={28} fill="none" stroke="#22C55E" strokeWidth={6} strokeDasharray="8 6" />
      <SvgText x={80} y={100} fill="#F87171" fontSize={11} textAnchor="middle">
        kilitli kayma
      </SvgText>
      <SvgText x={220} y={100} fill="#4ADE80" fontSize={11} textAnchor="middle">
        ABS kontrollü
      </SvgText>
      <SvgText x={150} y={30} fill="#CBD5E1" fontSize={11} textAnchor="middle">
        Pedalı basılı tut
      </SvgText>
    </Frame>
  );
}

function IkiSaniye() {
  return (
    <Frame title="2 saniye kuralı" height={110}>
      <Rect x={40} y={35} width={40} height={24} rx={4} fill="#64748B" />
      <Rect x={200} y={35} width={40} height={24} rx={4} fill="#6366F1" />
      <SvgText x={150} y={50} fill="#FBBF24" fontSize={14} textAnchor="middle" fontWeight="bold">
        1... 2...
      </SvgText>
      <SvgText x={150} y={90} fill="#CBD5E1" fontSize={11} textAnchor="middle">
        Öndeki sabit noktayı geçince say · erken varırsan yakınsın
      </SvgText>
    </Frame>
  );
}

function FarTurleri() {
  return (
    <Frame title="Far kullanımı" height={120}>
      {[
        ["Kısa far", "gece / yerleşim", "#FBBF24", 55],
        ["Uzun far", "boş yol", "#FDE68A", 150],
        ["Sis farı", "sis / kar", "#94A3B8", 245],
      ].map(([a, b, c, x]) => (
        <G key={a as string}>
          <Circle cx={x as number} cy={40} r={16} fill={c as string} opacity={0.9} />
          <SvgText x={x as number} y={75} fill="#E2E8F0" fontSize={11} textAnchor="middle" fontWeight="bold">
            {a as string}
          </SvgText>
          <SvgText x={x as number} y={92} fill="#94A3B8" fontSize={9} textAnchor="middle">
            {b as string}
          </SvgText>
        </G>
      ))}
    </Frame>
  );
}

function YolCizgileri() {
  return (
    <Frame title="Yol çizgileri" height={110}>
      <Line x1={30} y1={40} x2={270} y2={40} stroke="#F8FAFC" strokeWidth={4} />
      <SvgText x={150} y={30} fill="#CBD5E1" fontSize={10} textAnchor="middle">
        devamlı = geçme / sollama yok
      </SvgText>
      <Line x1={30} y1={75} x2={270} y2={75} stroke="#F8FAFC" strokeWidth={4} strokeDasharray="14 10" />
      <SvgText x={150} y={95} fill="#CBD5E1" fontSize={10} textAnchor="middle">
        kesik = uygunsa şerit / sollama serbest
      </SvgText>
    </Frame>
  );
}

function ParkYasak() {
  return (
    <Frame title="Duraklama / park yasağı örnekleri" height={120}>
      {["Kavşak", "Yaya geçidi", "Köprü/tünel", "Okul geçidi"].map((t, i) => (
        <G key={t}>
          <Rect x={18 + i * 70} y={35} width={62} height={40} rx={8} fill="#7F1D1D" />
          <SvgText x={49 + i * 70} y={55} fill="#FECACA" fontSize={9} textAnchor="middle">
            YASAK
          </SvgText>
          <SvgText x={49 + i * 70} y={68} fill="#FFF" fontSize={9} textAnchor="middle">
            {t}
          </SvgText>
        </G>
      ))}
    </Frame>
  );
}

function EmniyetKemeri() {
  return (
    <Frame title="Emniyet kemeri + hava yastığı" height={110}>
      <Rect x={110} y={25} width={80} height={50} rx={8} fill="#475569" />
      <Path d="M120 35 L180 60 M180 35 L120 60" stroke="#22C55E" strokeWidth={4} />
      <SvgText x={150} y={95} fill="#CBD5E1" fontSize={11} textAnchor="middle">
        Airbag kemer takılıyken tam korur · tüm yolcular
      </SvgText>
    </Frame>
  );
}

function IlkYardimOncelik() {
  return (
    <Frame title="İlk yardımcının öncelik zinciri" height={130}>
      {["1. Kendi güvenliğin", "2. Olay yeri güvenliği", "3. Hasta değerlendirme", "4. 112 çağır / müdahale"].map(
        (t, i) => (
          <G key={t}>
            <Rect x={40} y={18 + i * 26} width={220} height={22} rx={6} fill={i === 0 ? "#EF4444" : "#334155"} />
            <SvgText x={150} y={33 + i * 26} fill="#FFF" fontSize={11} textAnchor="middle">
              {t}
            </SvgText>
          </G>
        )
      )}
    </Frame>
  );
}

function YolKesit() {
  return (
    <Frame title="Yol yapısı (platform)" height={130}>
      <Rect x={20} y={40} width={260} height={60} rx={6} fill="#475569" />
      <Rect x={40} y={48} width={80} height={44} fill="#334155" />
      <Rect x={130} y={48} width={80} height={44} fill="#1E293B" stroke="#FBBF24" strokeWidth={2} strokeDasharray="6 4" />
      <Rect x={220} y={48} width={40} height={44} fill="#64748B" />
      <SvgText x={80} y={72} fill="#94A3B8" fontSize={9} textAnchor="middle">Banket</SvgText>
      <SvgText x={170} y={72} fill="#FBBF24" fontSize={9} textAnchor="middle">Taşıt yolu / şerit</SvgText>
      <SvgText x={240} y={72} fill="#CBD5E1" fontSize={9} textAnchor="middle">Banket</SvgText>
    </Frame>
  );
}

function SollamaKural() {
  return (
    <Frame title="Sollama yasağı olan yerler" height={120}>
      {["Viraj", "Köprü/tünel", "Yaya geçidi", "Kavşak"].map((t, i) => (
        <G key={t}>
          <Rect x={18 + i * 70} y={35} width={62} height={36} rx={8} fill="#7F1D1D" />
          <SvgText x={49 + i * 70} y={58} fill="#FECACA" fontSize={9} textAnchor="middle">{t}</SvgText>
        </G>
      ))}
      <SvgText x={150} y={95} fill="#94A3B8" fontSize={10} textAnchor="middle">Devamlı çizgi + görüş kısıtlı bölgeler</SvgText>
    </Frame>
  );
}

function YayaGecitDiyagram() {
  return (
    <Frame title="Yaya geçidi önceliği" height={110}>
      <Rect x={30} y={50} width={240} height={8} fill="#FFF" stroke="#FFF" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <Rect key={i} x={35 + i * 28} y={50} width={12} height={8} fill="#1E293B" />
      ))}
      <Rect x={60} y={30} width={24} height={14} rx={3} fill="#22C55E" />
      <SvgText x={150} y={85} fill="#CBD5E1" fontSize={11} textAnchor="middle">Geçitteki yayaya mutlaka yol verilir</SvgText>
    </Frame>
  );
}

function BelgeKontrol() {
  return (
    <Frame title="Araçta bulundurulması gerekenler" height={130}>
      {["Ehliyet", "Ruhsat", "Trafik sigortası", "Muayene"].map((t, i) => (
        <G key={t}>
          <Rect x={30} y={20 + i * 26} width={240} height={22} rx={6} fill="#1E3A5F" />
          <SvgText x={150} y={35 + i * 26} fill="#E2E8F0" fontSize={11} textAnchor="middle">{t}</SvgText>
        </G>
      ))}
    </Frame>
  );
}

function AlkolEtki() {
  return (
    <Frame title="Alkolün sürüşe etkileri" height={120}>
      {["Refleks ↓", "Dikkat ↓", "Mesafe algısı bozulur", "Yanlış özgüven"].map((t, i) => (
        <G key={t}>
          <Rect x={40} y={18 + i * 22} width={220} height={18} rx={4} fill="#991B1B" />
          <SvgText x={150} y={30 + i * 22} fill="#FEE2E2" fontSize={10} textAnchor="middle">{t}</SvgText>
        </G>
      ))}
    </Frame>
  );
}

function VitesAkisi() {
  return (
    <Frame title="Motordan tekerleğe güç aktarımı" height={100}>
      {["Motor", "Debriyaj", "Vites", "Diferansiyel", "Tekerlek"].map((t, i) => (
        <G key={t}>
          <Rect x={20 + i * 52} y={40} width={44} height={28} rx={4} fill="#334155" />
          <SvgText x={42 + i * 52} y={58} fill="#E2E8F0" fontSize={7} textAnchor="middle">{t}</SvgText>
          {i < 4 && <Line x1={64 + i * 52} y1={54} x2={72 + i * 52} y2={54} stroke="#64748B" strokeWidth={2} />}
        </G>
      ))}
    </Frame>
  );
}

function KirikTurleri() {
  return (
    <Frame title="Kırık türleri" height={110}>
      {[
        ["Kapalı", "#3B82F6"],
        ["Açık", "#EF4444"],
        ["Çıkık", "#F59E0B"],
      ].map(([t, c], i) => (
        <G key={t as string}>
          <Rect x={30 + i * 85} y={35} width={70} height={40} rx={8} fill={c as string} />
          <SvgText x={65 + i * 85} y={60} fill="#FFF" fontSize={11} textAnchor="middle">{t as string}</SvgText>
        </G>
      ))}
    </Frame>
  );
}

function LastikBasinc() {
  return (
    <Frame title="Lastik basıncı ve diş derinliği" height={120}>
      <Ellipse cx={90} cy={65} rx={42} ry={42} fill="#1E293B" stroke="#64748B" strokeWidth={3} />
      <Ellipse cx={90} cy={65} rx={28} ry={28} fill="#334155" />
      <SvgText x={90} y={68} fill="#94A3B8" fontSize={9} textAnchor="middle">2.2 bar</SvgText>
      <Rect x={165} y={30} width={115} height={70} rx={8} fill="#1E3A5F" />
      {[
        ["Min. diş", "1,6 mm"],
        ["Düşük basınç", "↑ yakıt"],
        ["Yüksek basınç", "↓ tutuş"],
      ].map(([a, b], i) => (
        <G key={a as string}>
          <SvgText x={175} y={48 + i * 18} fill="#CBD5E1" fontSize={9}>{a as string}</SvgText>
          <SvgText x={265} y={48 + i * 18} fill="#38BDF8" fontSize={9} textAnchor="end">{b as string}</SvgText>
        </G>
      ))}
    </Frame>
  );
}

function TrafikDegerler() {
  return (
    <Frame title="Trafik adabının temel değerleri" height={120}>
      {[
        ["Saygı", "#2563EB"],
        ["Sabır", "#059669"],
        ["Sorumluluk", "#D97706"],
        ["Empati", "#7C3AED"],
      ].map(([t, c], i) => (
        <G key={t as string}>
          <Rect x={30 + (i % 2) * 130} y={22 + Math.floor(i / 2) * 44} width={110} height={34} rx={8} fill={c as string} />
          <SvgText x={85 + (i % 2) * 130} y={43 + Math.floor(i / 2) * 44} fill="#FFF" fontSize={11} textAnchor="middle">{t as string}</SvgText>
        </G>
      ))}
    </Frame>
  );
}

function OfkeKontrol() {
  return (
    <Frame title="Öfke anında yapılması gerekenler" height={120}>
      {[
        "Derin nefes al",
        "Tepki vermeden bekle",
        "Karşılık verme",
        "Gerekirse dur ve sakinleş",
      ].map((t, i) => (
        <G key={t}>
          <Circle cx={28} cy={24 + i * 24} r={8} fill="#DC2626" />
          <SvgText x={28} y={28 + i * 24} fill="#FFF" fontSize={10} textAnchor="middle">{i + 1}</SvgText>
          <SvgText x={48} y={28 + i * 24} fill="#E2E8F0" fontSize={11}>{t}</SvgText>
        </G>
      ))}
    </Frame>
  );
}

const REGISTRY: Record<string, () => React.ReactElement> = {
  "hiz-tablosu": HizTablosu,
  "takip-mesafesi": TakipMesafesi,
  "gecis-onceligi": GecisOnceligi,
  "levha-sekilleri": LevhaSekilleri,
  "abc-diyagram": AbcDiyagram,
  "tyd-30-2": Tyd302,
  heimlich: Heimlich,
  "sok-pozisyonu": SokPozisyonu,
  "koma-pozisyonu": KomaPozisyonu,
  "dort-zaman": DortZaman,
  "gosterge-renkler": GostergeRenkler,
  "abs-sema": AbsSema,
  "2-saniye": IkiSaniye,
  "far-turleri": FarTurleri,
  "park-yasak": ParkYasak,
  "yol-cizgileri": YolCizgileri,
  "emniyet-kemeri": EmniyetKemeri,
  "ilk-yardim-oncelik": IlkYardimOncelik,
  "yol-kesit": YolKesit,
  "sollama-kural": SollamaKural,
  "yaya-gecit-diyagram": YayaGecitDiyagram,
  "belge-kontrol": BelgeKontrol,
  "alkol-etki": AlkolEtki,
  "vites-akisi": VitesAkisi,
  "kirik-turleri": KirikTurleri,
  "lastik-basinc": LastikBasinc,
  "trafik-degerler": TrafikDegerler,
  "ofke-kontrol": OfkeKontrol,
};

export function KonuGorseli({ id }: { id: string }) {
  if (konuAnimasyonluMu(id)) return <KonuAnimasyonu id={id} />;
  const Comp = REGISTRY[id];
  if (!Comp) return null;
  return <Comp />;
}

export const KONU_GORSEL_IDS = Object.keys(REGISTRY);
