# 🎁 SmartVoucher

Moderný webový systém pre predaj a správu darčekových poukazov do reštaurácií. Projekt je vyvinutý pre reštauráciu **Červený Jelen** a poskytuje kompletné riešenie od výberu voucheru až po jeho verifikáciu.

## 🌐 Live Preview

**👉 [Pozrite si živú ukážku aplikácie](https://smartvoucher.vercel.app/)**

---

## 📋 Obsah

- [O projekte](#-o-projekte)
- [Funkcie](#-funkcie)
- [Technológie](#-technológie)
- [Štruktúra projektu](#-štruktúra-projektu)
- [Inštalácia](#-inštalácia)
- [Spustenie](#-spustenie)
- [Build](#-build)
- [Stránky aplikácie](#-stránky-aplikácie)
- [Komponenty a štýly](#-komponenty-a-štýly)
- [JavaScript funkcionality](#-javascript-funkcionality)
- [Assety](#-assety)

---

## 🎯 O projekte

SmartVoucher je elegantná webová aplikácia navrhnutá pre nákup, správu a verifikáciu darčekových poukazov. Systém je optimalizovaný pre mobilné aj desktopové zariadenia a poskytuje intuitívne používateľské rozhranie s možnosťou výberu rôznych typov poukazov, balení a dodacích možností.

**Hlavné výhody:**
- 📱 Plne responzívny dizajn
- 🎨 Moderné UI/UX s plynulými animáciami
- 🌍 Podpora viacerých jazykov (CZ/EN)
- 💳 Integrácia platobných metód
- 📦 Flexibilné možnosti balenia a doručenia
- ✅ Overovací systém s reCAPTCHA

---

## ✨ Funkcie

### Pre zákazníkov
- **Prehliadanie vouchers** - prehľadná galéria darčekových a zážitkových poukazov
- **Nákupný proces** - jednoduchý a intuitívny checkout proces
- **Výber dizajnu** - možnosť výberu vizuálneho dizajnu poukazu
- **Voľba balenia** - e-voucher, plastová karta alebo luxusné balenie
- **Dodacie možnosti** - Česká pošta alebo PPL (s PPL widget mapou)
- **Personalizácia** - vlastné správy a voľba príjemcu
- **Verifikácia vouchers** - overenie platnosti a zostávajúcej hodnoty

### Pre podnik
- **Branding** - plne prispôsobiteľný dizajn podľa značky reštaurácie
- **Multi-venue support** - podpora viacerých prevádzok
- **Flexibilná správa** - jednoduché rozšírenie a správa vouchers

---

## 🛠 Technológie

### Frontend
- **HTML5** - sémantický markup
- **CSS3** - moderné štýly s CSS custom properties
- **JavaScript (ES6+)** - vanilla JS bez frameworkov
- **Tailwind CSS 3.4** - utility-first CSS framework

### Build Tools
- **Vite 7.1** - rýchly build tool a dev server
- **PostCSS 8.5** - spracovanie CSS
- **Autoprefixer 10.4** - automatické CSS vendor prefixy

### Integrácie
- **PPL Widget** - mapa výdajných miest
- **reCAPTCHA** - ochrana formulárov
- **Google Fonts (CDN)** - font Satoshi

### Package Manager
- **pnpm 9.12** - rýchly a efektívny package manager

---

## 📁 Štruktúra projektu

```
smartvoucher/
│
├── 📄 index.html              # Domovská stránka (katalóg vouchers)
├── 📄 buy.html                # Nákupná stránka (checkout)
├── 📄 detail-voucher.html     # Detail voucheru
├── 📄 extend-voucher.html     # Predĺženie platnosti voucheru
├── 📄 verification.html       # Overenie voucheru
│
├── 📂 src/                    # Zdrojové súbory
│   ├── 📂 css/
│   │   └── app.css            # Hlavný CSS súbor (Tailwind + custom štýly)
│   └── 📂 js/
│       └── ui.js              # Všetky JavaScript funkcionality
│
├── 📂 public/                 # Verejné statické súbory
│   └── 📂 assets/             # Obrázky a grafika
│       ├── hero.jpg           # Hero obrázok na domovskej stránke
│       ├── card.png           # Náhľady voucher kariet
│       ├── card2.jpg
│       ├── logo.svg           # Logo reštaurácie
│       ├── sv-header.svg      # SmartVoucher logo do hlavičky
│       ├── sv-footer.svg      # SmartVoucher logo do pätičky
│       ├── qr.svg             # QR kód ikona
│       ├── qr-white.svg
│       ├── cp.svg             # Česká pošta logo
│       ├── ppl.svg            # PPL logo
│       ├── 📂 design/         # Dizajny poukazov (1-6.jpg)
│       ├── 📂 pack/           # Obrázky balení
│       │   ├── box.png
│       │   ├── e-voucher.png
│       │   └── plastic-card.png
│       └── 📂 pay/            # Platobné ikony
│           ├── apple.svg
│           ├── google.svg
│           └── visa.svg
│
├── 📂 dist/                   # Build výstup (generovaný)
│   ├── index.html
│   └── 📂 assets/             # Optimalizované assety
│
├── 📄 package.json            # NPM závislosti a scripty
├── 📄 pnpm-lock.yaml          # Lockfile pre pnpm
├── 📄 vite.config.js          # Konfigurácia Vite
├── 📄 tailwind.config.js      # Konfigurácia Tailwind CSS
├── 📄 postcss.config.js       # PostCSS konfigurácia
└── 📄 README.md               # Tento súbor
```

---

## 🚀 Inštalácia

### Požiadavky
- **Node.js** 18+ 
- **pnpm** 9+ (alebo npm/yarn)

### Kroky

1. **Naklonujte repozitár**
```bash
git clone <repository-url>
cd smartvoucher
```

2. **Nainštalujte závislosti**
```bash
pnpm install
```

Alternatívne s npm:
```bash
npm install
```

---

## 💻 Spustenie

### Development server

Spustí lokálny vývojový server s hot reload:

```bash
pnpm dev
```

Aplikácia bude dostupná na: **http://localhost:5173**

Vite automaticky:
- ⚡️ Spustí rýchly dev server
- 🔥 Hot Module Replacement (HMR)
- 📦 On-demand kompiluje súbory
- 🎨 Spracováva Tailwind CSS

---

## 🏗 Build

### Produkčný build

Vytvorí optimalizovanú produkčnú verziu:

```bash
pnpm build
```

Build proces:
- ✅ Minifikuje HTML, CSS a JavaScript
- ✅ Optimalizuje obrázky
- ✅ Generuje CSS s Tailwind (odstraňuje nepoužité triedy)
- ✅ Pridáva vendor prefixy
- ✅ Vytvorí `dist/` priečinok

### Preview buildu

Náhľad produkčného buildu lokálne:

```bash
pnpm preview
```

---

## 📄 Stránky aplikácie

### 1. `index.html` - Domovská stránka
**Účel:** Hlavná vstupná stránka s katalógom vouchers

**Sekcie:**
- 🖼 **Hero sekcia** - úvodný obrázok a popis reštaurácie
- 🎁 **Darčekové vouchery** - grid kariet s vouchermi
- 🌟 **Zážitkové vouchery** - špeciálne zážitkové balíčky
- 📍 **O podniku** - informácie o reštaurácii a prevádzky
- 📱 **Footer** - kontakty a navigácia

**Funkcionality:**
- Klikateľné voucher karty vedúce na `buy.html`
- Hover efekty a animácie
- Responzívny grid layout
- Jazykový prepínač

---

### 2. `buy.html` - Nákupná stránka
**Účel:** Kompletný checkout proces pre nákup voucheru

**Hlavné sekcie:**

#### 📦 Krok 1 - Základné informácie
- Detail voucheru (obrázok, názov, cena)
- Výber množstva (quantity selector)
- Výber dizajnu (grid 6 designov)

#### 🎨 Krok 2 - Balenie
Tri možnosti:
- **E-voucher** (0 Kč) - digitálny
- **Plastová karta** (+79 Kč) - fyzická karta
- **Luxusné balenie** (+149 Kč) - darčekové balenie

#### 🚚 Krok 3 - Doručenie
Pre plastové karty a luxusné balenie:
- **Česká pošta** - štandardné doručenie
- **PPL ParcelShop** - výber miesta na mape (widget)
- **PPL Box** - doručenie do boxu

#### 💌 Krok 4 - Personalizácia
- Správa pre príjemcu (voliteľné, max. 150 znakov)
- Voľba príjemcu (sebe / inému)
- Formulár príjemcu (email)

#### 🏢 Krok 5 - Fakturačné údaje
- Osobné údaje (meno, email, telefón)
- Firemné údaje (voliteľné)

#### 💳 Krok 6 - Platba
Výber platobnej metódy:
- Karta online
- Apple Pay
- Google Pay
- Bankový prevod

#### 📊 Sidebar - Sumár objednávky
Live aktualizovaný sumár:
- Množstvo × jednotková cena
- Balenie (ak je)
- Doručenie (ak je)
- **Celková suma**

**Interaktívne funkcie:**
- Live kalkulácia ceny
- PPL mapa modal
- Custom select komponenty
- Form validácie
- Accordion FAQ sekcie

---

### 3. `detail-voucher.html` - Detail voucheru
**Účel:** Zobrazenie zakúpeného voucheru

**Obsah:**
- Voucher karta (vizuál + údaje)
- QR kód pre verifikáciu
- PIN kód
- Zostávajúca hodnota
- Platnosť
- CTA tlačidlá (predĺžiť, zdieľať)

---

### 4. `extend-voucher.html` - Predĺženie platnosti
**Účel:** Umožňuje predĺžiť platnosť voucheru

**Proces:**
- Overenie voucheru (kód)
- Výber obdobia predĺženia
- Platba
- Potvrdenie

---

### 5. `verification.html` - Overenie voucheru
**Účel:** Overenie platnosti a hodnoty voucheru (pre reštauráciu)

**Proces:**
1. **Zadanie kódu voucheru**
   - Input pole pre voucher kód
   - reCAPTCHA ochrana
   - Tlačidlo overiť

2. **Zobrazenie výsledku**
   - Úspešné overenie (zelená alert)
   - Neplatný voucher (žltá alert)
   
3. **Zadanie PINu**
   - 5-miestny PIN kód
   - Presmerovanie na detail

**Bezpečnosť:**
- Google reCAPTCHA v3
- Validácia na klientskej strane
- PIN verifikácia

---

## 🎨 Komponenty a štýly

### Design System (CSS Variables)

Všetky farby a hodnoty sú definované cez CSS custom properties v `src/css/app.css`:

```css
:root {
  --brand: #C00000;          /* Červená značky */
  --text: #171717;           /* Hlavný text */
  --muted: #525252;          /* Sekundárny text */
  --bg: #ffffff;             /* Pozadie */
  --card-bg: #F5F5F5;        /* Pozadie kariet */
  --footer-bg: #FAFAFA;      /* Footer pozadie */
  /* ... a ďalšie */
}
```

### Komponenty

#### 📦 Layout komponenty
- `.sv-container` - hlavný kontajner so správnymi margínmi
- `.sv-header` - hlavička s logom a navigáciou
- `.sv-footer` - päta s informáciami

#### 🎴 Voucher karty
- `.voucher-card` - karta voucheru s hover efektom
- `.voucher-badge` - badge na karte (napr. "+10% navíc")
- `.voucher-grid` - responzívny grid pre karty

#### 🔘 Tlačidlá
- `.sv-btn-primary` - hlavné tlačidlo (čierne)
- `.sv-btn-ghost` - sekundárne tlačidlo (outline)
- `.sv-btn-brand` - brand tlačidlo (červené)

#### 📝 Formuláre
- `.sv-float-input` / `.sv-float-label` - floating label input
- `.sv-select-root` - custom select dropdown
- `.option-card` - selectable card (radio button styled)
- `.payment-option` - platobná možnosť

#### 🎭 Modály
- `.sv-modal-root` - základ modálneho okna
- `.sv-modal-overlay` - tmavý overlay
- `.sv-modal-card` - obsah modálu

#### 🚨 Alerty
- `.sv-alert-success` - úspešný alert (tyrkysový)
- `.sv-alert-warning` - varovný alert (žltý)

### Animácie

Všetky komponenty používajú plynulé CSS transitions:
- Voucher karty: scale + shadow na hover
- Tlačidlá: brightness zmena
- Modály: fade in/out
- Dropdowny: opacity transitions

---

## ⚙️ JavaScript funkcionality

Všetky funkcionality sú v `src/js/ui.js`, organizované do IIFE (Immediately Invoked Function Expressions) blokov:

### 1. **Verification Form** (`verification.html`)
```javascript
// Správa overovacieho formulára
- reCAPTCHA handling
- Validator stavu (voucher + captcha)
- Submit handling
- PIN form
- Result display
```

### 2. **Buy Page Logic** (`buy.html`)
```javascript
// Kompletná nákupná logika
- Quantity counter (+/-)
- Design picker (radio cards)
- Pack selection (e-voucher, plastic, luxury)
- Delivery form toggling
- Custom selects
- Payment options
- PPL map modal integration
- Live price calculation
- Summary sidebar update
```

**Kľúčové funkcie:**
- `updateSummary()` - prepočíta cenu na základe všetkých volieb
- `renderDeliveryForms()` - zobrazí správne delivery formy podľa balenia
- `renderRecipient()` - zobrazí/skryje formulár príjemcu

### 3. **Modal System**
```javascript
// Univerzálny modal handler
- Open/close modály
- Overlay click handling
- ESC key support
- Focus management
```

### 4. **PPL ParcelShop Widget**
```javascript
// Integrácia s PPL mapou
- Otvorenie PPL modal
- Event listener pre výber miesta
- Nastavenie vybraného miesta do formulára
- Update textu s adresou
```

### 5. **Language Selector**
```javascript
// Prepínač jazykov
- Toggle dropdown
- Zmena jazyka
- Update UI
- Persistence (možno implementovať)
```

### Utility funkcie

```javascript
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const num = (v, d=0) => Number.isFinite(+v) ? +v : d;
const fmt = (n) => `${n.toLocaleString('cs-CZ')} Kč`;
```

---

## 🖼 Assety

### Štruktúra `public/assets/`

#### Hlavné obrázky
- `hero.jpg` - úvodný obrázok na domovskej stránke
- `card.png`, `card2.jpg` - náhľady voucher kariet
- `voucher.png` - generický voucher obrázok

#### Logá
- `logo.svg` - logo reštaurácie Červený Jelen
- `sv-header.svg` - SmartVoucher logo do hlavičky
- `sv-footer.svg` - SmartVoucher logo do footeru

#### Ikony
- `qr.svg`, `qr-white.svg` - QR kód ikony
- `cp.svg` - Česká pošta logo
- `ppl.svg` - PPL logo

#### Podpriečinky

**`design/` (1.jpg - 6.jpg)**
- 6 rôznych dizajnov poukazov
- Používané na buy.html pri výbere dizajnu

**`pack/`**
- `box.png` - luxusné balenie
- `e-voucher.png` - digitálny voucher
- `plastic-card.png` - plastová karta

**`pay/`**
- `apple.svg` - Apple Pay logo
- `google.svg` - Google Pay logo
- `visa.svg` - Visa/karta logo

### Optimalizácia

Pri builde Vite automaticky:
- Optimalizuje veľkosť obrázkov
- Hasuje názvy súborov pre cache busting
- Kopíruje do `dist/assets/`

---

## 🔧 Konfiguračné súbory

### `vite.config.js`
```javascript
export default defineConfig({
  root: '.',          // Root priečinok
  build: {
    outDir: 'dist',   // Výstupný priečinok
    assetsDir: 'assets'
  }
})
```

### `tailwind.config.js`
```javascript
export default {
  content: [
    "./**/*.html",           // Všetky HTML súbory
    "./src/**/*.{js,ts}"     // JS/TS v src/
  ],
  theme: {
    extend: {}
  },
  plugins: []
}
```

### `postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},      // Tailwind processing
    autoprefixer: {}      // Vendor prefixy
  }
}
```

### `package.json` - NPM Scripts
```json
{
  "scripts": {
    "dev": "vite",              // Development server
    "build": "vite build",      // Production build
    "preview": "vite preview"   // Preview buildu
  }
}
```

---

## 📱 Responzívny dizajn

Aplikácia používa mobile-first prístup s Tailwind breakpoints:

| Breakpoint | Min width | Použitie |
|------------|-----------|----------|
| `sm:`      | 640px     | Väčšie mobily |
| `md:`      | 768px     | Tablety |
| `lg:`      | 1024px    | Menšie laptopy |
| `xl:`      | 1280px    | Veľké obrazovky |
| `2xl:`     | 1536px    | Extra veľké |

**Príklad responzivity:**
```html
<!-- Grid: 1 stĺpec → 2 stĺpce → 3 stĺpce → 4 stĺpce -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
```

---

## 🌍 Lokalizácia

Aplikácia podporuje prepínanie medzi jazykmi:
- 🇨🇿 **Čeština (CZ)** - predvolený jazyk
- 🇬🇧 **Angličtina (EN)**

**Implementácia:**
- Language selector v hlavičke
- JavaScript handler v `ui.js`
- Data atribúty na preklady (možno rozšíriť)

**Budúce rozšírenie:**
- JSON súbory s prekladmi
- Dynamic content replacement
- localStorage pre perzistenciu

---

## 🔐 Bezpečnosť

### reCAPTCHA
- Implementované na `verification.html`
- Ochrana pred botmi
- Callback funkcia: `window.onRecaptchaSuccess`

### Form validácie
- Client-side validácia
- Required fields
- Email format check
- Phone number format
- Max length na textarea

### Input sanitizácia
- Odporúča sa implementovať na backend
- XSS ochrana
- SQL injection prevencia (ak DB)

---

## 🚀 Deployment

### Statický hosting

Aplikácia je čisto statická, možno hostiť na:

1. **Netlify**
```bash
# Build command
pnpm build

# Publish directory
dist
```

2. **Vercel**
```bash
# Framework preset: Vite
# Build command: pnpm build
# Output directory: dist
```

3. **GitHub Pages**
```bash
pnpm build
# Upload obsah dist/ na gh-pages branch
```

4. **Klasický web hosting**
```bash
pnpm build
# Upload obsah dist/ cez FTP/SFTP
```

### Environment variables

Ak potrebujete API keys (napr. pre reCAPTCHA, platobné brány):

```bash
# .env
VITE_RECAPTCHA_SITE_KEY=your_key_here
VITE_API_URL=https://api.example.com
```

Použitie v kóde:
```javascript
const apiKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
```

---

## 🧪 Testovanie

### Manuálne testovanie

**Checklist:**
- ✅ Responzivita na rôznych zariadeniach
- ✅ Cross-browser kompatibilita (Chrome, Firefox, Safari, Edge)
- ✅ Funkčnosť všetkých formulárov
- ✅ PPL widget mapa
- ✅ Kalkulácia cien
- ✅ Modály otvorenie/zatvorenie
- ✅ Validácie

### Nástroje pre testovanie

```bash
# Check accessibility
npx lighthouse <url>

# Analyze bundle size
pnpm build
npx vite-bundle-visualizer
```

---

## 📈 Výkon

### Optimalizácie

- ✅ **Lazy loading** obrázkov
- ✅ **Minifikácia** HTML/CSS/JS
- ✅ **Tree shaking** (Tailwind purge)
- ✅ **Asset optimization** cez Vite
- ✅ **CSS custom properties** namiesto duplikácie
- ✅ **Vanilla JS** - žiadne ťažké frameworky

### Lighthouse Score (cieľ)
- 🟢 Performance: 90+
- 🟢 Accessibility: 95+
- 🟢 Best Practices: 95+
- 🟢 SEO: 90+

---

## 🐛 Troubleshooting

### Časté problémy

**1. Vite nefunguje**
```bash
# Clear cache
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

**2. Tailwind štýly sa nenačítajú**
```bash
# Check tailwind.config.js content paths
# Restart dev serveru
```

**3. PPL mapa sa nezobrazuje**
```bash
# Check network tab pre script loading
# Verify PPL widget CDN je dostupný
```

**4. Build zlyhá**
```bash
# Check console pre chyby
# Skontroluj cesty k súborom (case-sensitive)
# Verify všetky assety existujú
```

---

## 📚 Ďalšie zdroje

### Dokumentácia použitých technológií

- [Vite dokumentácia](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PPL Widget API](https://www.ppl.cz/)
- [Google reCAPTCHA](https://www.google.com/recaptcha/)

### Užitočné nástroje

- [Can I Use](https://caniuse.com/) - browser podpora
- [CSS Tricks](https://css-tricks.com/) - CSS tutoriály
- [MDN Web Docs](https://developer.mozilla.org/) - web štandardy

---

## 🤝 Príspevky

Projekt je momentálne súkromný. Pre akékoľvek zmeny alebo vylepšenia:

1. Vytvorte branch
2. Implementujte zmeny
3. Otestujte
4. Vytvorte pull request

---

## 📝 Licencia

Projekt je chránený autorskými právami.

---

## 👨‍💻 Autor

Vytvorené s ❤️ pre SmartVoucher systém.

**Kontakt:** podpora@smartvoucher.cz

---

## 🎉 Changelog

### v1.0.0 (2025-10-17)
- ✨ Prvá verzia aplikácie
- 🎨 Kompletný responzívny dizajn
- 🛒 Nákupný proces s live kalkuláciou
- 📦 Podpora viacerých balení a dodacích možností
- ✅ Overovací systém vouchers
- 🌍 Multi-language support (CZ/EN)
- 🗺 PPL widget integrácia

---

**Happy coding! 🚀**

