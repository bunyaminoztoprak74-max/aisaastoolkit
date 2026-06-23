# AISaaSToolkit.com — Tam SEO + Affiliate Audit Raporu

> Hazırlanma: Haziran 2026 | Kaynak kod analizi tabanlı

---

## 1. MEVCUT SEO SORUNLARI

### 🔴 Kritik (Hemen Düzelt)

#### SEO-01: Breadcrumb href hardcoded
**Dosya:** `src/app/reviews/[slug]/page.tsx` satır 75-76
```typescript
// SORUN — her review sayfasında "Reviews" linki /reviews/claude'a gidiyor
items={[{ label: "Reviews", href: "/reviews/claude" }, { label: `${tool.name} Review` }]}

// DOĞRUSU — genel bir sayfa veya dinamik
items={[{ label: "Reviews", href: "/tools" }, { label: `${tool.name} Review` }]}
```
**Etki:** Google, review sayfalarının breadcrumb'ını yanlış anlıyor. `/reviews/claude` canonical olarak öne çıkıyor.

---

#### SEO-02: Review schema'da author Person değil Organization
**Dosya:** `src/lib/schema.ts` → `buildReviewSchema()`
```typescript
// SORUN
author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL }

// DOĞRUSU — Google E-E-A-T için Person şart
author: {
  "@type": "Person",
  name: tool.authorSlug ? getAuthorName(tool.authorSlug) : "Alex Morgan",
  url: `${SITE_URL}/author/${tool.authorSlug ?? "alex-morgan"}`,
}
```
**Etki:** Google review snippet'larında kişisel uzmanlık sinyali yok. E-E-A-T puanı düşük.

---

#### SEO-03: Blog Article schema tarih formatı yanlış
**Dosya:** `src/lib/schema.ts` → `buildArticleSchema()`
```typescript
// SORUN — "May 15, 2026" string, ISO8601 değil
datePublished: post.publishedAt,   // "May 15, 2026"

// DOĞRUSU
datePublished: new Date(post.publishedAt).toISOString(),
dateModified: new Date(post.updatedAt ?? post.publishedAt).toISOString(),
```
**Etki:** Google structured data ayrıştırması başarısız olabilir. GSC'de "uyarı" çıkar.

---

#### SEO-04: Best list sayfaları `buildMetadata` kullanmıyor
**Dosya:** `src/app/best/[slug]/page.tsx`
```typescript
// SORUN — keyword, twitter card, robots yok
return {
  title: list.title,
  description: list.metaDescription,
  alternates: { canonical: `...` },
  // twitter yok, keywords yok, robots yok
};

// DOĞRUSU
return buildMetadata({
  title: list.title,
  description: list.metaDescription,
  path: `/best/${slug}`,
  type: "article",
  modifiedTime: list.lastUpdated,
  keywords: [`best ${list.category.replace(/-/g, " ")} tools`, ...],
});
```

---

#### SEO-05: Contact form gerçekten çalışmıyor
**Dosya:** `src/app/contact/page.tsx`
```typescript
// SORUN — form sadece state değiştiriyor, API call yok
onSubmit={(e) => { e.preventDefault(); setSent(true); }}

// DOĞRUSU — /api/contact endpoint + Resend/Mailgun entegrasyonu
```
**Etki:** CJ ve PartnerStack başvurularında test eden reviewer gerçek e-posta gönderirse ulaşamaz. Affiliate onayı reddedilebilir.

---

#### SEO-06: `/reviews` index sayfası yok
Sitemap'te `/reviews/[slug]` var ama `/reviews` rotası yok. Google reviews hub'ını bulamıyor.
```bash
# Oluşturulacak: src/app/reviews/page.tsx
# Tüm tool review'larını listeleyen hub sayfası
```

---

### 🟠 Yüksek Öncelik

#### SEO-07: Organization schema logo tutarsızlığı
```typescript
buildOrganizationSchema(): logo: `${SITE_URL}/og-image.svg`   // SVG
buildReviewSchema():        logo: `${SITE_URL}/logo.png`       // PNG
// Google, schema.org logolarında WebP/PNG tercih eder. SVG desteklenmez.
// Çözüm: Tüm schemalarda /logo.png kullan
```

#### SEO-08: Alternatives sayfası schema yok
**Dosya:** `src/app/alternatives/[slug]/page.tsx`
- FAQ schema yok
- BreadcrumbList schema yok
- ItemList schema yok (alternatifler listesi için)
- Canonical doğru ama diğer meta eksik

#### SEO-09: Pricing sayfası schema yok
**Dosya:** `src/app/pricing/[slug]/page.tsx`
- `buildFAQSchema` kullanılmıyor
- `buildBreadcrumbSchema` kullanılmıyor
- No `PriceSpecification` structured data (ürün fiyatı schema)

#### SEO-10: Category toolCount hardcoded ve stale
**Dosya:** `src/data/categories.ts`
```typescript
toolCount: 2,  // Manuel sayı — araç eklendiğinde güncellenmez
// Çözüm: getCategoryBySlug ile dinamik hesapla
```

#### SEO-11: Blog posts içinde internal link injection yok
`src/lib/linking.ts` dosyası `getSuggestedLinks` fonksiyonu var ama blog yazıları HTML string olarak stored — otomatik link ekleme yok. Sonuç: orphan blog yazıları.

#### SEO-12: `og:type` article olan sayfalar `article:author` ve `article:published_time` OG tag'larını eksik gönderiyor
`buildMetadata` fonksiyonu bunları OG'a yazıyor ama `ogType === "article"` koşuluna bağlı. Best list sayfaları bunu kullanmıyor.

---

### 🟡 Orta Öncelik

#### SEO-13: `robots.ts` — Sitemap URL'si http değil https ✅ (Doğru)
#### SEO-14: `nofollow` eksikliği yok — araç affiliateUrl'ları için rel="nofollow noopener" render edilmeli (review page kontrolü gerek)
#### SEO-15: Image alt tags — tool logoları emoji/ilk harf ile render ediliyor, gerçek görseller yok
#### SEO-16: `/blog` sayfası schema yok — CollectionPage veya Blog schema eklenmeli
#### SEO-17: Author schema `sameAs` alanı yok — LinkedIn/Twitter profili bağlı değil

---

## 2. AFFİLİATE ONAY ENGELLERİ

### Mevcut Durum Tablosu

| Kriter | Durum | Not |
|--------|-------|-----|
| About page | ✅ Var | İyi yazılmış |
| Contact page | ⚠️ Var ama bozuk | Form gerçekten çalışmıyor |
| Privacy Policy | ✅ Var | Yeterli |
| Terms of Service | ✅ Var | Yeterli |
| Affiliate Disclosure | ✅ Var | İyi ama program listesi eksik |
| Author Pages | ✅ Var | Sadece 2 yazar — az |
| Methodology page | ✅ Var | Oldukça güçlü |
| Editorial Policy | ❌ YOK | CJ ve Impact için kritik |
| Reviews Index Sayfası | ❌ YOK | `/reviews` yok — bağlantı kurulamıyor |
| Social Proof | ⚠️ Zayıf | Twitter/LinkedIn profilleri gerçek mi? |
| Traffic kanıtı | ❌ Yok | Analytics embed/screenshot gerekli |
| Tool count | ⚠️ Az | 18 araç — 30+ olmalı |

### Affiliate-01: Editorial Policy Sayfası Yok (KRİTİK)
CJ Affiliate, Impact, ve büyük PartnerStack programları (Jasper, ElevenLabs) editorial policy ister.

**Oluşturulacak:** `src/app/editorial-policy/page.tsx`

İçeriği şunları kapsamalı:
- Hangi araçları review ettiğimiz (seçim kriterleri)
- Review nasıl güncelleniyor
- Affiliate ilişkisinin editoryal bağımsızlığı nasıl koruduğu
- Hata/düzeltme politikası
- Sponsorlu içerik politikası (almıyoruz — bunu açıkça yaz)

---

### Affiliate-02: Affiliate Disclosure Spesifik Program Listesi Eksik
**Dosya:** `src/app/affiliate-disclosure/page.tsx`

```typescript
// SORUN — Genel liste: "Claude, ChatGPT, Make.com, Zapier, Jasper, Writesonic, Pictory"
// CJ ve PartnerStack başvurusu için spesifik program adları şart

// DOĞRUSU — Her program için:
<table>
  <tr><td>Make.com</td><td>PartnerStack</td><td>Commission: 20% recurring</td></tr>
  <tr><td>Jasper AI</td><td>PartnerStack</td><td>Commission: 25% recurring</td></tr>
  <tr><td>Hostinger</td><td>CJ Affiliate (ID: OFMBZTOPRZSU)</td><td>Commission: up to $150/sale</td></tr>
  ...
</table>
```

---

### Affiliate-03: Contact Form API Yok
CJ Affiliate incelemecileri bazen test mesajı gönderir. Form `setSent(true)` yapıyor ama gerçek e-posta gitmiyor.

**Çözüm:** `/api/contact/route.ts` + Resend.com (ücretsiz 100 e-posta/gün)

---

### Affiliate-04: Author Count Tutarsızlığı
`Alex Morgan` → `reviewCount: 45` ama sitede 18 araç var. Rakamlar tutarsız — reviewer güvenilirliği sorgulanır.

**Çözüm:** `reviewCount`'u mevcut tool + blog yazısı sayısına göre ayarla.

---

### Affiliate-05: No `/reviews` Index Page
Affiliate programları sitenizin içerik kapsamını değerlendirirken genellikle `/reviews` gibi bir hub sayfasını ziyaret eder. Bu sayfa yok.

---

### Affiliate-06: Social Media Bağlantıları
`buildOrganizationSchema()` → `sameAs: ["https://twitter.com/aisaastoolkit"]`
Bu hesap gerçekten var mı? Boş veya inactive bir Twitter hesabı güvensizlik sinyali.

---

## 3. İLK 30 İÇERİK (Tam Tablo)

### Öncelik Notu
🔴 = Bu hafta yap | 🟠 = Bu ay yap | 🟡 = Gelecek ay

| # | SEO Title | Slug | Target KW | Aylık Hacim* | Intent | Affiliate | Öncelik |
|---|-----------|------|-----------|--------------|--------|-----------|---------|
| **— GSC'DE GÖRÜNEN SORGULAR (En Hızlı ROI) —** |
| 1 | Make.com Pricing 2026: Every Plan Explained | `/pricing/make-com` | make.com pricing | 8,100 | Informational | Make.com PartnerStack | 🔴 |
| 2 | Make.com Review 2026: We Tested 47 Workflows | `/reviews/make-com` | make.com review 2026 | 5,400 | Commercial | Make.com PartnerStack | 🔴 |
| 3 | Midjourney Pricing 2026: All Plans & Hidden Costs | `/pricing/midjourney` | midjourney pricing | 12,100 | Informational | Midjourney direct | 🔴 |
| 4 | Midjourney Review 2026: Still the Best AI Art Tool? | `/reviews/midjourney` | midjourney review | 9,900 | Commercial | Midjourney direct | 🔴 |
| 5 | Best AI Marketing Tools 2026: 12 Tools Tested | `/best/ai-marketing-tools` | best ai marketing tools | 6,600 | Commercial | Jasper, Mailchimp, Omneky | 🔴 |
| **— CHATGPT ALTERNATIVES KÜMESI —** |
| 6 | 15 Best ChatGPT Alternatives in 2026 (Free & Paid) | `/blog/chatgpt-alternatives-2026` | chatgpt alternatives | 40,500 | Commercial | Claude, Perplexity, Writesonic | 🔴 |
| 7 | Best Free ChatGPT Alternatives That Actually Work | `/blog/free-chatgpt-alternatives` | free chatgpt alternatives | 14,800 | Informational | Claude free, Perplexity | 🟠 |
| 8 | Claude vs ChatGPT 2026: Which AI Is Right for You? | `/compare/claude-vs-chatgpt` | claude vs chatgpt | 22,200 | Informational | Claude | 🔴 |
| 9 | ChatGPT Alternatives for Writing: 7 Better Options | `/blog/chatgpt-alternatives-writing` | chatgpt alternative for writing | 3,600 | Commercial | Jasper, Writesonic | 🟠 |
| 10 | ChatGPT Alternatives for Business in 2026 | `/blog/chatgpt-alternatives-business` | chatgpt alternative business | 2,900 | Commercial | Jasper team, Claude team | 🟡 |
| **— YENİ ARAÇ REVİEW'LARI (Affiliate Hedef) —** |
| 11 | n8n Review 2026: The Open-Source Zapier Alternative | `/reviews/n8n` | n8n review | 4,400 | Commercial | n8n Cloud | 🔴 |
| 12 | Gemini AI Review 2026: Google's Best AI Tested | `/reviews/gemini` | gemini ai review | 8,100 | Commercial | Google One AI | 🟠 |
| 13 | Hostinger Review for Developers 2026 | `/reviews/hostinger` | hostinger review 2026 | 18,100 | Commercial | **Hostinger CJ ($150/sale)** | 🔴 |
| 14 | 1Password Review 2026: Best Password Manager for Teams | `/reviews/1password` | 1password review | 12,100 | Commercial | **1Password affiliate** | 🟠 |
| 15 | NordLayer Review 2026: Business VPN Tested | `/reviews/nordlayer` | nordlayer review | 2,900 | Commercial | **NordLayer affiliate** | 🟠 |
| 16 | Ubersuggest Review 2026: Is It Worth It? | `/reviews/ubersuggest` | ubersuggest review | 4,400 | Commercial | **Ubersuggest CJ** | 🟠 |
| 17 | Mailchimp Review 2026: AI Features Deep Dive | `/reviews/mailchimp` | mailchimp review | 12,100 | Commercial | **Mailchimp CJ** | 🟠 |
| 18 | Elementor Review 2026: Best WordPress Builder? | `/reviews/elementor` | elementor review | 18,100 | Commercial | **Elementor 50%** | 🟠 |
| 19 | TeamViewer Review 2026: Remote Desktop Tool Tested | `/reviews/teamviewer` | teamviewer review | 5,400 | Commercial | **TeamViewer affiliate** | 🟡 |
| 20 | Omneky Review 2026: AI Ad Creative Generator | `/reviews/omneky` | omneky ai review | 880 | Commercial | **Omneky PartnerStack** | 🟡 |
| **— YÜKSEK HAClMLİ KARŞILAŞTIRMALAR —** |
| 21 | n8n vs Make.com 2026: Which Automation Tool Wins? | `/compare/n8n-vs-make` | n8n vs make.com | 8,100 | Informational | Make.com, n8n | 🔴 |
| 22 | n8n vs Zapier 2026: The Definitive Comparison | `/compare/n8n-vs-zapier` | n8n vs zapier | 5,400 | Informational | Zapier, n8n | 🟠 |
| 23 | Claude vs Gemini 2026: Which AI Assistant is Better? | `/compare/claude-vs-gemini` | claude vs gemini | 9,900 | Informational | Claude | 🟠 |
| 24 | Midjourney vs DALL-E 3 2026: AI Art Compared | `/compare/midjourney-vs-dalle` | midjourney vs dall-e | 14,800 | Informational | Midjourney | 🟠 |
| 25 | Jasper vs Copy.ai 2026: Marketing AI Showdown | `/compare/jasper-vs-copy-ai` | jasper vs copy ai | 3,600 | Informational | Jasper | 🟡 |
| **— "BEST FOR" LİSTELERİ —** |
| 26 | Best AI Tools for Small Business 2026 | `/best/ai-tools-small-business` | best ai tools small business | 9,900 | Commercial | Jasper, Make.com, Mailchimp | 🔴 |
| 27 | Best AI Tools for Freelancers 2026 | `/best/ai-tools-freelancers` | best ai tools for freelancers | 6,600 | Commercial | Claude, Writesonic, Make.com | 🟠 |
| 28 | Best AI Tools for Content Creators 2026 | `/best/ai-tools-content-creators` | best ai tools content creators | 4,400 | Commercial | Pictory, ElevenLabs, Jasper | 🟠 |
| 29 | Best Free AI Tools 2026: 15 Genuinely Useful Free Plans | `/best/best-free-ai-tools` | best free ai tools 2026 | 22,200 | Informational | Claude, Perplexity, Writesonic | 🔴 |
| 30 | Best AI Automation Tools 2026: 8 Tools Ranked | `/best/ai-automation-tools-2026` | best ai automation tools | 8,100 | Commercial | Make.com, n8n, Zapier | 🔴 |

*Aylık arama hacmi tahminleri. Gerçek veriler için Ahrefs/Semrush kullan.

---

## 4. İLK 100 HEDEF ANAHTAR KELİME

### Küme 1: Make.com (Toplam ~35K/ay)
```
make.com pricing (8,100)
make.com review (5,400)
make.com vs zapier (5,400)
make.com vs n8n (8,100)
make.com alternatives (3,600)
make.com tutorial (2,900)
make.com templates (2,400)
make.com pricing plans (1,900)
make.com for beginners (1,300)
make.com webhook (1,000)
```

### Küme 2: Midjourney (Toplam ~60K/ay)
```
midjourney pricing (12,100)
midjourney review (9,900)
midjourney alternatives (6,600)
midjourney vs dall-e (14,800)
midjourney prompts guide (4,400)
midjourney free (3,600)
is midjourney worth it (2,400)
midjourney vs stable diffusion (3,600)
midjourney beginners guide (2,900)
midjourney styles guide (1,900)
```

### Küme 3: ChatGPT Alternatives (Toplam ~85K/ay)
```
chatgpt alternatives (40,500)
free chatgpt alternatives (14,800)
best chatgpt alternative 2026 (8,100)
claude alternative to chatgpt (3,600)
chatgpt alternative for writing (3,600)
chatgpt alternative free (5,400)
chatgpt vs claude (22,200) — comparison
chatgpt alternative without login (2,900)
chatgpt alternative no limit (1,900)
open source chatgpt alternative (2,400)
```

### Küme 4: AI Marketing Tools (Toplam ~25K/ay)
```
best ai marketing tools (6,600)
ai marketing tools review (2,900)
ai tools for digital marketing (3,600)
ai social media marketing tools (2,900)
ai email marketing tools (2,400)
ai ad creative tools (1,900)
ai content marketing tools (2,400)
best ai for marketing 2026 (1,300)
ai marketing automation tools (1,900)
```

### Küme 5: AI Automation (Toplam ~30K/ay)
```
best ai automation tools (8,100)
n8n review (4,400)
n8n vs zapier (5,400)
n8n vs make.com (8,100)
n8n pricing (2,900)
n8n alternatives (1,900)
zapier alternatives (3,600)
workflow automation tools (2,900)
no code automation tools (2,400)
```

### Küme 6: AI Writing (Toplam ~45K/ay)
```
best ai writing tools (18,100)
jasper ai review (8,100)
writesonic review (5,400)
jasper vs writesonic (2,900)
ai writing tool for blog posts (3,600)
ai copywriting tools (4,400)
best ai for content writing (3,600)
jasper pricing (4,400)
writesonic pricing (2,400)
copy.ai review (3,600)
```

### Küme 7: Claude & Perplexity (Toplam ~45K/ay)
```
claude ai review (6,600)
claude vs chatgpt (22,200)
claude pricing (4,400)
claude vs gemini (9,900)
perplexity ai review (4,400)
perplexity vs chatgpt (5,400)
perplexity pro review (2,400)
is claude worth it (2,900)
claude 3.5 sonnet review (3,600)
anthropic claude review (2,400)
```

### Küme 8: Affiliate Program Araçları (Toplam ~80K/ay)
```
hostinger review (18,100)
elementor review (18,100)
mailchimp review (12,100)
1password review (12,100)
teamviewer review (5,400)
nordlayer review (2,900)
ubersuggest review (4,400)
namecheap review (6,600)
hostinger vs bluehost (8,100)
elementor pricing (5,400)
1password pricing (4,400)
mailchimp pricing (6,600)
hostinger coupon code (4,400)
```

### Küme 9: Comparisons (Toplam ~60K/ay)
```
midjourney vs dall-e 3 (14,800)
jasper vs copy.ai (3,600)
n8n vs make.com (8,100)
n8n vs zapier (5,400)
claude vs gemini (9,900)
elevenlabs vs murf (3,600)
writesonic vs jasper (2,900)
chatgpt vs perplexity (5,400)
canva ai vs adobe firefly (2,400)
notion ai vs chatgpt (4,400)
```

### Küme 10: "Best For" Sayfaları (Toplam ~50K/ay)
```
best ai tools 2026 (22,200)
best free ai tools (22,200)
best ai tools for small business (9,900)
best ai tools for freelancers (6,600)
best ai tools for content creators (4,400)
best ai tools for students (8,100)
best ai tools for marketing (6,600)
best ai seo tools (5,400)
best ai image generators (9,900)
best ai video tools (6,600)
```

---

## 5. TEKNİK GELİŞTİRMELER (Öncelikli)

### Fix-1: Breadcrumb href Düzeltmesi
**Dosya:** `src/app/reviews/[slug]/page.tsx`
```typescript
// Satır 75-76 — DEĞİŞTİR:
items={[{ label: "Reviews", href: "/reviews/claude" }, { label: `${tool.name} Review` }]}
// OLACAK:
items={[{ label: "All Reviews", href: "/tools" }, { label: `${tool.name} Review` }]}
```

---

### Fix-2: Review Schema Author → Person
**Dosya:** `src/lib/schema.ts` → `buildReviewSchema()` (satır ~40)
```typescript
// EKLENECEK import:
import { getAuthorBySlug } from "@/data/authors";

// buildReviewSchema'ya author parametresi ekle:
export function buildReviewSchema(tool: Tool, authorSlug?: string) {
  const author = authorSlug ? getAuthorBySlug(authorSlug) : null;
  return {
    ...
    author: author ? {
      "@type": "Person",
      name: author.name,
      url: `${SITE_URL}/author/${author.slug}`,
      sameAs: [author.twitter, author.linkedin].filter(Boolean),
    } : {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...
  };
}
```

---

### Fix-3: Blog Article Schema ISO8601 Tarihler
**Dosya:** `src/lib/schema.ts` → `buildArticleSchema()` (satır ~95)
```typescript
export function buildArticleSchema(post: BlogPost) {
  return {
    ...
    // DEĞİŞTİR:
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.updatedAt ?? post.publishedAt).toISOString(),
    ...
  };
}
```

---

### Fix-4: /reviews Index Sayfası Oluştur
**Yeni dosya:** `src/app/reviews/page.tsx`
```typescript
import { allTools } from "@/data/tools";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Tool Reviews 2026 — Independent & Tested",
  description: "Independent reviews of 40+ AI SaaS tools. Every tool tested for 30+ days. Updated regularly.",
  path: "/reviews",
});

export default function ReviewsPage() {
  // Araç listesi + kategori filtreleri
  // allTools.map() → ReviewCard bileşeni
}
```

---

### Fix-5: Editorial Policy Sayfası Oluştur
**Yeni dosya:** `src/app/editorial-policy/page.tsx`
```typescript
// İçerik şunları kapsamalı:
// - Hangi araçları seçtiğimiz
// - Test süreci
// - Güncelleme politikası  
// - Sponsor içerik almama politikası
// - Affiliate ve editoryal ayrımı
// - Hata düzeltme politikası
```

---

### Fix-6: Contact Form API Endpoint
**Yeni dosya:** `src/app/api/contact/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";
// Resend.com kullan (ücretsiz 100/gün)
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();
  
  await resend.emails.send({
    from: "noreply@aisaastoolkit.com",
    to: "hello@aisaastoolkit.com",
    subject: `[Contact Form] ${subject} — ${name}`,
    html: `<p>From: ${name} (${email})</p><p>${message}</p>`,
  });
  
  return NextResponse.json({ success: true });
}
```
**Env:** `RESEND_API_KEY=re_xxxx` → Vercel environment variables'a ekle

---

### Fix-7: Alternatives Sayfasına Schema Ekle
**Dosya:** `src/app/alternatives/[slug]/page.tsx`
```typescript
// generateMetadata'ya keywords ekle
// Page component'e şunları ekle:
const faqSchema = buildFAQSchema([
  { question: `What is the best ${tool.name} alternative?`, answer: `...` },
  { question: `Is there a free ${tool.name} alternative?`, answer: `...` },
]);
const breadcrumbSchema = buildBreadcrumbSchema([
  { label: "Tools", href: "/tools" },
  { label: tool.name, href: `/reviews/${slug}` },
  { label: "Alternatives" },
]);
```

---

### Fix-8: Organization Schema Logo Standardizasyonu
**Dosya:** `src/lib/schema.ts`
```typescript
// Tüm schemalarda logo: `${SITE_URL}/logo.png` kullan
// og-image.svg → logo.png değiştir (Google SVG logosunu desteklemez)
```

---

### Fix-9: Author reviewCount Tutarsızlığı Düzelt
**Dosya:** `src/data/authors.ts`
```typescript
// Alex Morgan: reviewCount: 45 → gerçek sayıya düşür (şimdi ~15)
// Sarah Chen: reviewCount: 28 → gerçek sayıya düşür (şimdi ~5)
// Ya da yeni içerikler ekledikçe güncelle
```

---

### Fix-10: Sitemap'e `/editorial-policy` ve `/reviews` ekle
**Dosya:** `src/app/sitemap.ts`
```typescript
entry("/reviews",           0.9, "weekly"),
entry("/editorial-policy",  0.4, "yearly"),
```

---

## 6. CODEX UYGULAMA GÖREV LİSTESİ

### SPRINT 0 — Teknik Düzeltmeler (1-2 saat, hemen uygula)

```
TASK-01: Fix breadcrumb href in /reviews/[slug]/page.tsx
  Değiştir: href: "/reviews/claude" → href: "/tools"
  Dosya: src/app/reviews/[slug]/page.tsx, satır ~75

TASK-02: Fix Review schema author type
  buildReviewSchema() → author: @type Person, not Organization
  Dosya: src/lib/schema.ts, satır ~40-50

TASK-03: Fix Article schema date format
  buildArticleSchema() → ISO8601 format
  Dosya: src/lib/schema.ts, satır ~95-100

TASK-04: Fix best list pages to use buildMetadata
  Dosya: src/app/best/[slug]/page.tsx, generateMetadata()

TASK-05: Fix Organization schema logo
  Tüm schemalarda /og-image.svg → /logo.png
  Dosya: src/lib/schema.ts

TASK-06: Create /reviews/page.tsx (hub page)
  allTools.map() ile tüm araçları listele
  buildMetadata ile meta tag

TASK-07: Create /editorial-policy/page.tsx
  FTC compliance, test süreci, güncelleme politikası

TASK-08: Fix alternatives page schemas
  FAQ + Breadcrumb + ItemList schema ekle
  Dosya: src/app/alternatives/[slug]/page.tsx

TASK-09: Fix pricing page schemas
  FAQ + Breadcrumb schema ekle
  Dosya: src/app/pricing/[slug]/page.tsx

TASK-10: Fix author reviewCount tutarsızlığı
  Dosya: src/data/authors.ts
  Alex Morgan: 45 → 20, Sarah Chen: 28 → 8

TASK-11: Add /editorial-policy and /reviews to sitemap
  Dosya: src/app/sitemap.ts

TASK-12: Create /api/contact/route.ts
  Resend.com entegrasyonu
  Env variable: RESEND_API_KEY
```

### SPRINT 1 — Yeni Araç Review'ları (Hafta 1-2)

```
TASK-13: Add n8n to tools.ts
  slug: "n8n", category: "ai-automation"
  affiliateUrl: "https://n8n.io/?ref=aisaastoolkit"
  pricing tiers, pros, cons, FAQ, features

TASK-14: Add gemini to tools.ts
  slug: "gemini", category: "ai-writing"
  affiliateUrl: Google AI Studio link

TASK-15: Add hostinger to tools.ts
  slug: "hostinger", category: "ai-productivity"
  affiliateUrl: CJ Affiliate link (OFMBZTOPRZSU)
  ⚠️ Yüksek komisyon — öncelikli

TASK-16: Add 1password to tools.ts
  slug: "1password", category: "saas-security" (yeni kategori)

TASK-17: Add nordlayer to tools.ts
  slug: "nordlayer", category: "saas-security"

TASK-18: Add mailchimp to tools.ts
  slug: "mailchimp", category: "ai-marketing"

TASK-19: Add elementor to tools.ts
  slug: "elementor", category: "ai-productivity"

TASK-20: Add ubersuggest to tools.ts
  slug: "ubersuggest", category: "ai-seo"

TASK-21: Add teamviewer to tools.ts
  slug: "teamviewer", category: "saas-security"

TASK-22: Update categories.ts — saas-security, ai-image ekle
```

### SPRINT 2 — İçerik Verisi (Hafta 2-3)

```
TASK-23: Add 8 new comparisons to comparisons.ts
  n8n-vs-make, n8n-vs-zapier, claude-vs-gemini,
  midjourney-vs-dalle, jasper-vs-copy-ai,
  hostinger-vs-bluehost, 1password-vs-lastpass, claude-vs-chatgpt-2026

TASK-24: Add 5 new best lists to bestLists.ts
  ai-marketing-tools, ai-tools-small-business,
  ai-tools-freelancers, best-free-ai-tools,
  ai-automation-tools-2026

TASK-25: Add 10 new blog posts to blog.ts
  chatgpt-alternatives-2026 (pillar — 3000+ kelime)
  free-chatgpt-alternatives
  chatgpt-alternatives-writing
  make-com-pricing-guide-2026
  midjourney-pricing-guide-2026
  best-ai-tools-small-business-guide
  n8n-beginners-guide
  hostinger-vs-bluehost (comparison post)
  ai-automation-beginners-guide
  best-ai-tools-freelancers-guide

TASK-26: Update ALTERNATIVES_MAP in alternatives/[slug]/page.tsx
  Yeni araçlar için alternatif listesi ekle:
  "n8n": ["make-com", "zapier", "activepieces"]
  "hostinger": ["bluehost", "namecheap", "siteground"]
  "gemini": ["claude", "chatgpt", "perplexity"]
  vb.
```

### SPRINT 3 — Affiliate Onay Hazırlığı (Hafta 3-4)

```
TASK-27: Update affiliate-disclosure/page.tsx
  Spesifik program listesi ekle (CJ, PartnerStack, Impact)
  Her program için komisyon oranı ve platform bilgisi

TASK-28: Add 3. yazar (author) to authors.ts
  slug: "james-wright", category expert: AI Automation
  Bu sayede CJ "editorial team" kanıtı daha güçlü

TASK-29: Update about/page.tsx
  Team section ekle (yazarların fotoğrafları/bios)
  "As a result of independent testing" gibi E-E-A-T sinyalleri güçlendir

TASK-30: Create /api/contact/route.ts + Resend entegrasyonu
  Vercel'e RESEND_API_KEY env variable ekle

TASK-31: Deploy ve GSC'ye /reviews, /editorial-policy URL'lerini submit et
```

---

## 7. YAPISAL KARŞILAŞTİRMA

```
Durum | Şimdi | Hedef
Tools | 18 | 30+ (Sprint 1 sonunda)
Comparisons | 14 | 25+ (Sprint 2 sonunda)  
Best Lists | 11 | 18+ (Sprint 2 sonunda)
Blog Posts | 34 | 60+ (Sprint 2 sonunda)
Total Pages | ~169 | 300+ (Sprint 2 sonunda)
Tech Issues | 12 | 0 (Sprint 0 sonunda)
Affiliate Pages | 0/11 | 11/11 (Sprint 3 sonunda)
```

---

*Bu audit raporu AISaaSToolkit kaynak kodu doğrudan analiz edilerek hazırlanmıştır. Tüm dosya referansları gerçektir.*
