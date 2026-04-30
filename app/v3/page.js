"use client";
import { useState, useEffect, useRef } from "react";

const BLOB = "https://zicvctuf51wytcty.public.blob.vercel-storage.com/renderings";
const VIDEO_BLOB = "https://zicvctuf51wytcty.public.blob.vercel-storage.com/renderings/videos";
const IMG_BLOB = "https://zicvctuf51wytcty.public.blob.vercel-storage.com/images";

// ═══════════════════════════════════════════════════════════════
// MEDIA
// ═══════════════════════════════════════════════════════════════

const encode = (name) => `${BLOB}/${encodeURIComponent(name)}`;
const encodeVideo = (name) => `${VIDEO_BLOB}/${encodeURIComponent(name)}`;

const STAMP_LOGO = `${IMG_BLOB}/chozen-stamp.png`;
const CLICK_CLACK_LOGO = "https://zicvctuf51wytcty.public.blob.vercel-storage.com/logo-click-clack-negro.png";
const PERGAMINO_LOGO = "/pergamino-logo-white.png";

const VIDEO = {
  heroPullback: encodeVideo("Firefly Epic slow cinematic drone pullback rising gradually from the luxury mountain village, reveal.mp4"),
  nightDrift: encodeVideo("Firefly Slow cinematic drone drift forward over a luxury Colombian mountain village at night under a.mp4"),
  corridorDolly: encodeVideo("Firefly Slow dolly forward through the open-air corridor, camera gliding past whitewashed walls and-.mp4"),
  lateralTrack: encodeVideo("Firefly Slow lateral drone tracking shot moving right to left past luxury whitewashed and brick Colo.mp4"),
  bambooPushIn: encodeVideo("Firefly Slow push-in toward the bamboo wellness pavilion, steam rises gently from the stone pool sur.mp4"),
};

// Real Finca San Pascual photos in /public/finca/
const FINCA = (n) => `/finca/finca-${String(n).padStart(2, "0")}.jpeg`;

const PHOTO = {
  // honoring family
  oldFarmhouse: FINCA(10),                  // brick farmhouse w/ Pedro + dog
  coffeePickers: FINCA(40),                 // smallholder pickers
  coffeeRows: FINCA(25),                    // coffee groves on slopes
  coffeeProcessing: FINCA(1),               // bamboo coffee drying infrastructure
  // landscape / Cerro Bravo
  cerroBravoView: FINCA(20),                // mountain through trees
  sunsetMountain: FINCA(35),                // mountain at sunset
  treeLandscape: FINCA(15),                 // big tree
  // equestrian
  equestrian: FINCA(30),                    // riding through coffee groves
  // additional candids for galleries
  pic02: FINCA(2),
  pic03: FINCA(3),
  pic04: FINCA(4),
  pic05: FINCA(5),
  pic06: FINCA(6),
  pic07: FINCA(7),
  pic08: FINCA(8),
  pic09: FINCA(9),
  pic11: FINCA(11),
  pic12: FINCA(12),
  pic13: FINCA(13),
  pic14: FINCA(14),
  pic16: FINCA(16),
  pic18: FINCA(18),
  pic22: FINCA(22),
  pic24: FINCA(24),
  pic28: FINCA(28),
  pic32: FINCA(32),
  pic38: FINCA(38),
  pic42: FINCA(42),
};

const IMG = {
  villageAerial: encode("Aerial photograph of a luxury sustainable village nestled into a lush green Colombian 869429.png"),
  finca: encode("Colombian finca-style residential home with open-air corridors, whitewashed wa 869429.png"),
  boutiqueHotel: encode("Boutique hotel exterior in the Colombian coffee region mountains, modern minimalist a 869429.png"),
  wellnessRetreat: encode("Luxury wellness retreat center built into a Colombian mountainside, infinity-edge nat 869429.png"),
  schoolhouse: `${BLOB}/medellin-school.png`,
  villageNight: encode("Photorealistic aerial drone photograph of a luxury Colombian mountain village at nigh 748238.png"),
};

const MEDELLIN_BLOB = "https://zicvctuf51wytcty.public.blob.vercel-storage.com/medellin";
const MEDELLIN_HERO = {
  img: `${MEDELLIN_BLOB}/ricardo-gomez-angel-GcHar4P8V_Q-unsplash.jpg`,
  credit: "Ricardo Gomez Angel",
};

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

// Honoring Pergamino & the Echavarría family — what their legacy is
const FAMILY_LEGACY = [
  {
    year: "1970s",
    title: "La Máquina, Fredonia",
    body: "Don Pedro Echavarría receives the historic La Máquina farm in Fredonia as a legacy from a great-aunt and renovates its abandoned coffee plantation — the beginning of the family's roots in the Suroeste corridor.",
  },
  {
    year: "Santa Bárbara Platform",
    title: "Lomaverde + Veracruz",
    body: "The family expands into the neighboring municipality of Santa Bárbara, where Lomaverde becomes the flagship of Santa Barbara Estate alongside sister parcels — building a multi-farm specialty platform across Antioquia.",
  },
  {
    year: "2010 →",
    title: "Pedro Jr. & Pergamino",
    body: "Pedro Echavarría Jr. builds Pergamino Coffee from 2010 onward — a high-end specialty coffee brand and the retail-and-export extension of the family's farming operation. Today: a national café footprint, exports to specialty roasters on four continents, and ongoing offtake support for a network of smallholder producers.",
  },
  {
    year: "Today",
    title: "Smallholder Network",
    body: "Pergamino works with a broad network of small farmers across Antioquia, Cauca, and Nariño — supporting their craft, their families, and their land through premium offtake. Supporting these growers is the cultural foundation of the project.",
  },
];

// Six components — restructured per Tony's feedback
const COMPONENTS = [
  {
    num: "01",
    title: "Residential & Artisan Village",
    tag: "The Neighborhood",
    desc: "A village across two on-site bands plus a town anchor. Workforce housing at the Finca entrance for farm and village teams. The residential village on the higher levels — artist and maker live-work, family homes, entrepreneur and remote-worker residences, and a luxury senior tier with longevity programming. Off-site, in the town of Los Palomos, additional workforce and affordable housing alongside an affordable senior tier — co-located with the public clinic and school.",
    note: "Locals and internationals as neighbors. Workforce housing is structural, not incidental.",
    img: PHOTO.oldFarmhouse,
  },
  {
    num: "02",
    title: "Sanctuary · Retreat & Wellness Center",
    tag: "The Spiritual Heart",
    desc: "An intimate sanctuary for transformational programming, healing, and immersive nature-based experiences — bamboo pavilions, natural stone pools, open-air movement studios, hydrotherapy, medicinal-plant greenhouse. Anchor programs include Blue Zones longevity, ChoZen retreats, and physician-led clinical wellness integrated with the public clinic. Sliding-scale access for Los Palomos and Fredonia residents.",
    note: "If the geological survey confirms feasibility, natural thermal springs woven into the experience.",
    img: IMG.wellnessRetreat,
  },
  {
    num: "03",
    title: "Click Clack Boutique Hotel",
    tag: "Design-Forward Hospitality",
    desc: "A Click Clack within ChoZen Colombia — culturally rooted, design-forward Colombian hospitality. Modern finca tradition rooted in Antioqueño design, in the architectural lineage of Simón Vélez — Colombia's master of bamboo.",
    note: "Click Clack operates the boutique hotel and the farm-to-table F&B as one platform.",
    img: IMG.boutiqueHotel,
    cobrand: CLICK_CLACK_LOGO,
  },
  {
    num: "04",
    title: "Pergamino Farm Hotel",
    tag: "Coffee Heritage Stay",
    desc: "A second, smaller hotel — born of the farm itself. A coffee-heritage guesthouse rooted in the working agricultural life of Finca San Pascual: the open-air corridors, terracotta tile roofs, hanging gardens, and the morning harvest. Two complementary hotels on the property — one design-forward, one coffee-rooted — each offering a different way to experience the land.",
    note: "Operated under Pergamino's stewardship in coordination with the broader hospitality platform.",
    img: FINCA(2),
  },
  {
    num: "05",
    title: "Pergamino × ChoZen Regenerative Farm + Equestrian Center",
    tag: "The Foundation",
    desc: "Agriculture is not an amenity — it is the foundation. Finca San Pascual's specialty-coffee operation preserved and elevated under Pergamino stewardship; export channel maintained; regenerative-practice certification pursued. Diversification into vegetables, fruit, food forests, herbs, dairy, pasture-raised proteins. An equestrian center near the horse pastures honors the agricultural heritage of the region — trails through the coffee groves and out to the higher meadows.",
    note: "The farm feeds the hotels, the village kitchens, and the weekly market — and supports the broader Pergamino network.",
    img: PHOTO.equestrian,
  },
  {
    num: "06",
    title: "Schools — In the Town & On the Higher Levels",
    tag: "Public Anchors · Lifting the Region",
    desc: "Two complementary schools, neither exclusive. A public, traditional + vocational school in the town of Los Palomos — modernized with project capital under the Alianza ERA framework with the Gobernación and Secretaría de Educación, with SENA-aligned vocational tracks. And a ChoZen School (Green School × Ad Astra) — bilingual, regenerative-STEM, with reserved scholarship seats for local families and structural cross-enrollment with the public school.",
    note: "Built with government, in the town. The community reaches them the same way residents do.",
    img: IMG.schoolhouse,
  },
];

// Tier / level structure
const LEVELS = [
  {
    name: "Level 1 · The Gateway",
    where: "Finca Entrance",
    desc: "Coffee farm, equestrian stables, activities center, and the ChoZen Village — a walkable plaza with weekly farmers market, a Pergamino flagship coffee bar, farm-to-table cafés, and an artisan retail flagship. Open to Fredonia, Los Palomos, and the surrounding veredas.",
    items: ["Coffee Farm", "Equestrian Stables", "Activities Center", "ChoZen Village Plaza", "Farmers Market"],
  },
  {
    name: "Higher Levels · The Village",
    where: "Residential Bands",
    desc: "The residential village on the upper coffee-grove contours. Artist and maker live-work studios, family homes, entrepreneur and remote-worker residences, the luxury senior tier with longevity programming, and a small tier of coffee-grove villas at the top.",
    items: ["Live-Work Studios", "Family Homes", "Remote-Work Residences", "Luxury Senior Tier", "Coffee-Grove Villas"],
  },
  {
    name: "Off-Site · Los Palomos",
    where: "The Town",
    desc: "The community anchor — outside the Finca, in the town. The public primary-care clinic and the modernized public school sit here, alongside additional workforce and affordable housing and an affordable senior tier — so the community reaches every public anchor the same way residents do.",
    items: ["Public Clinic", "Public School", "Workforce Housing", "Affordable Housing", "Affordable Senior Tier"],
  },
];

// Six resident cohorts (mixed-village thesis)
const COHORTS = [
  { name: "Coffee Entrepreneurs & Agri-Innovators", desc: "Young producers in the Pergamino smallholder network, next-generation farm management, food-system founders.", pct: "10–15%" },
  { name: "Remote-Work & Digital-Economy Families", desc: "Commuting or tele-commuting to Medellín's Ruta N and El Poblado ecosystems. Anchored by Colombia's digital-nomad visa.", pct: "20–25%" },
  { name: "Colombian & International Families", desc: "Drawn by the schools, the clinic, the outdoor lifestyle, and proximity to Medellín. The family-home heart of the village.", pct: "25–30%" },
  { name: "Artisans, Makers & Craft Entrepreneurs", desc: "Live-work studios for ceramicists, weavers, bamboo craftsmen, carpenters, culinary artisans — Colombian and international.", pct: "10–15%" },
  { name: "Retirees · Two Tiers", desc: "An affordable senior community in Los Palomos, and a luxury senior tier on the higher slopes with concierge clinical and longevity programming.", pct: "~15–20%" },
  { name: "Workforce Housing", desc: "Hotel, clinic, school, farm, and academy staff live in the village they work in. Rental and lease-to-own — structural to the project.", pct: "20–25%" },
];

// The four partners — Pergamino + ChoZen + Click Clack + the family/FOC. NO GREG.
const PARTNERS = [
  {
    name: "Pergamino",
    role: "Coffee Heritage · Farm Stewardship",
    desc: "Preserves and elevates the specialty-coffee operation on Finca San Pascual. Maintains the export channel. Anchors the farm hotel, the flagship café in the village, and the project's relationship with the broader smallholder network across Antioquia, Cauca, and Nariño.",
    logo: PERGAMINO_LOGO,
    logoDark: true,
  },
  {
    name: "ChoZen",
    role: "The Brand · The Framework",
    desc: "The primary brand of the community — the residential village, the artisan neighborhood, the schools, the trails, the wellness sanctuary, the regenerative framework. A proven approach to intentional, regenerative placemaking.",
    stamp: STAMP_LOGO,
  },
  {
    name: "Click Clack Hotel",
    role: "Design Hospitality",
    desc: "Operates the boutique hotel and the farm-to-table F&B platform — bringing brand, design sensibility, and operational infrastructure. One of two complementary hotel concepts on the property.",
    logo: CLICK_CLACK_LOGO,
  },
  {
    name: "Echavarría Family",
    role: "Land · Legacy · Local Knowledge",
    desc: "The landowner of Finca San Pascual. Multi-generational roots in Fredonia and Suroeste Antioquia. The trust, the land, the smallholder relationships, and the cultural anchor that makes the project credible — and lasting.",
  },
  {
    name: "Future of Cities",
    role: "Master Developer",
    desc: "Tony Cho's 20-year regenerative-placemaking platform — Wynwood, Magic City, PHX-JAX. Contributes the master plan, sponsor capital, and the FOC Regenerative Placemaking Standards.",
  },
  {
    name: "Government",
    role: "Public Anchors",
    desc: "Alcaldía de Fredonia + Gobernación de Antioquia + Alianza ERA: clinic and public school in Los Palomos, co-built and co-funded — including under Obras por Impuestos.",
  },
];

// Los Palomos community revitalization items
const REVITALIZATION = [
  { title: "A Public Primary-Care Clinic", desc: "Built with the Alcaldía de Fredonia and the Secretaría Seccional de Salud (DSSA), sited in the town — not behind a private gate. Serving the local community on the public regimens; project residents on private pay; same facility, blended populations." },
  { title: "A Modernized Public School", desc: "K–11 traditional curriculum + SENA-aligned vocational tracks — agriculture, coffee science, carpentry, hospitality, basic health. Capital contributed under Alianza ERA and Obras por Impuestos to upgrade the existing campus." },
  { title: "Workforce + Affordable Housing", desc: "A meaningful share of the project's workforce and affordable housing developed in the town itself — for clinic, school, hotel, and academy staff — alongside an affordable senior tier." },
  { title: "Local Hiring · Local Economy", desc: "60% local hiring target across hotel, farm, hospitality, and academy. A community advisory board with real authority over public-realm design and scholarship allocation." },
  { title: "Honoring the Demolished Church + Rail", desc: "Los Palomos was once a stop on the Antioquia railway. The historic church and the old rail station were demolished in recent years. The project's long-horizon vision proposes reactivating a segment of the historic alignment — paired with scheduled public transit Medellín ↔ Amagá ↔ Fredonia ↔ Los Palomos." },
];

// What Pergamino + the family bring (specifically) — the legacy fact-strip
const FAMILY_FACTS = [
  { num: "1970s", lbl: "Echavarría Roots in Fredonia" },
  { num: "111", lbl: "Hectares · Finca San Pascual" },
  { num: "12+", lbl: "Pergamino Café Locations" },
  { num: "4", lbl: "Continents · Specialty Exports" },
];

// ═══════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        setOffset((rect.top / window.innerHeight) * speed * 100);
      }
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, [speed]);
  return { ref, offset };
}

// ═══════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { href: "#vision", label: "The Vision" },
    { href: "#family", label: "Pergamino Family" },
    { href: "#chozen", label: "ChoZen" },
    { href: "#land", label: "The Land" },
    { href: "#palomos", label: "Los Palomos" },
    { href: "#components", label: "Components" },
    { href: "#partners", label: "Partners" },
    { href: "#contact", label: "Connect" },
  ];
  return (
    <nav className={`colNav ${scrolled ? "scrolled" : ""}`}>
      <div className="colNavInner">
        <a href="#" className="colNavLogo">
          <img src={STAMP_LOGO} alt="" className="colNavStamp" />
          <span>CHOZEN</span>
          <span className="colNavDot">·</span>
          <span className="colNavLoc">COLOMBIA</span>
        </a>
        <div className={`colNavLinks ${open ? "open" : ""}`}>
          {links.map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
        </div>
        <button className="colNavToggle" onClick={() => setOpen(!open)} aria-label="Menu"><span /><span /><span /></button>
      </div>
    </nav>
  );
}

function FadeIn({ children, delay = 0, className = "", direction = "up", style = {} }) {
  const [ref, vis] = useInView(0.08);
  const transforms = { up: "translateY(48px)", down: "translateY(-48px)", left: "translateX(48px)", right: "translateX(-48px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translate(0)" : transforms[direction],
      transition: `opacity 1s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 1s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function TextReveal({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView(0.2);
  return (
    <div ref={ref} className="textRevealWrap">
      <div className={`textReveal ${inView ? "revealed" : ""} ${className}`} style={{ transitionDelay: `${delay}s` }}>
        {children}
      </div>
    </div>
  );
}

function ImageBreak({ img, height = "70vh", subtitle, title, caption, overlay = 0.5, speed = 0.2, credit }) {
  const { ref, offset } = useParallax(speed);
  return (
    <div className="colImageBreak" style={{ height }} ref={ref}>
      <img src={img} alt="" className="colImageBreakImg" style={{ transform: `translateY(${offset}px) scale(1.15)` }} />
      <div className="colImageBreakOverlay" style={{ background: `rgba(26,22,16,${overlay})` }} />
      {(title || subtitle || caption) && (
        <div className="colImageBreakContent">
          {subtitle && <p className="colImageBreakSub">{subtitle}</p>}
          {title && <h2 className="colImageBreakTitle">{title}</h2>}
          {caption && <p className="colImageBreakCaption">{caption}</p>}
        </div>
      )}
      {credit && (
        <span style={{
          position: "absolute", right: "1.25rem", bottom: "0.9rem",
          fontSize: "0.68rem", letterSpacing: "0.16em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)", fontWeight: 400,
          textShadow: "0 1px 6px rgba(0,0,0,0.5)", zIndex: 2,
        }}>Photo · {credit}</span>
      )}
    </div>
  );
}

function VideoBreak({ src, height = "85vh", subtitle, title, caption, overlay = 0.4, poster }) {
  return (
    <div className="colVideoBreak" style={{ height }}>
      <video className="colVideoBreakVideo" autoPlay muted loop playsInline poster={poster}>
        <source src={src} type="video/mp4" />
      </video>
      <div className="colVideoBreakOverlay" style={{ background: `linear-gradient(180deg, rgba(26,22,16,${overlay * 0.5}) 0%, rgba(26,22,16,${overlay}) 60%, rgba(26,22,16,${overlay + 0.15}) 100%)` }} />
      {(title || subtitle || caption) && (
        <div className="colVideoBreakContent">
          {subtitle && <p className="colVideoBreakSub">{subtitle}</p>}
          {title && <h2 className="colVideoBreakTitle">{title}</h2>}
          {caption && <p className="colVideoBreakCaption">{caption}</p>}
        </div>
      )}
    </div>
  );
}

function ComponentCard({ item, index }) {
  const reversed = index % 2 === 1;
  return (
    <FadeIn className={`colCommItem ${reversed ? "colCommReversed" : ""}`}>
      <div className="colCommMedia">
        <img src={item.img} alt={item.title} />
        <span className="colCommNum">{item.num}</span>
      </div>
      <div className="colCommBody">
        <p className="colCommTag">{item.tag}</p>
        <h3 className="colCommTitle">{item.title}</h3>
        {item.cobrand && (
          <div className="colCommCoBrand">
            <span className="colCommCoBrandLabel">Operated by</span>
            <img src={item.cobrand} alt="Click Clack" />
          </div>
        )}
        <p className="colCommDesc">{item.desc}</p>
        <p className="colCommNote">— {item.note}</p>
      </div>
    </FadeIn>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" });
  const [done, setDone] = useState(false);
  if (done) return (
    <div className="colFormDone">
      <span className="colFormDoneMark">◇</span>
      <h3>Gracias</h3>
      <p>We&apos;ll be in touch.</p>
    </div>
  );
  return (
    <div className="colForm">
      <div className="colFormRow">
        <label>
          <span>Name</span>
          <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        </label>
        <label>
          <span>Email</span>
          <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        </label>
      </div>
      <label className="colFormFull">
        <span>I&apos;m connecting as a</span>
        <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
          <option value="">Select one…</option>
          <option>Echavarría / Pergamino Family</option>
          <option>Click Clack</option>
          <option>Future Resident</option>
          <option>Public-Sector / Government</option>
          <option>Advisor / Community</option>
          <option>Other</option>
        </select>
      </label>
      <label className="colFormFull">
        <span>A note (optional)</span>
        <textarea rows={4} placeholder="Anything you'd like us to know." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
      </label>
      <button className="colFormBtn" onClick={() => setDone(true)}>Begin the Conversation →</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════

export default function Home() {
  return (
    <div className="colRoot">
      <Nav />

      {/* ═══ HERO ═══ */}
      <section className="colHero">
        <video className="colHeroVideo" autoPlay muted loop playsInline poster={IMG.villageAerial}>
          <source src={VIDEO.heroPullback} type="video/mp4" />
        </video>
        <div className="colHeroOverlay" />
        <div className="colHeroContent">
          <img src={STAMP_LOGO} alt="" className="colHeroStamp" />
          <p className="colHeroEyebrow">Confidential · Partnership Discussion · April 2026</p>
          <h1 className="colHeroTitle">
            <span>ChoZen</span>
            <span className="colHeroTitleItalic">Colombia</span>
          </h1>
          <div className="colHeroLine" />
          <p className="colHeroSub">A Regenerative Mountain Village in the Colombian Highlands</p>
          <p className="colHeroLocation">Finca San Pascual · Fredonia, Antioquia</p>
          <div className="colHeroCoBrand" style={{ flexDirection: "column", gap: "0.65rem" }}>
            <span className="colHeroCoBrandLabel">A Partnership Between</span>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2.5rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
              <img src={PERGAMINO_LOGO} alt="Pergamino" style={{ height: "96px", width: "auto", filter: "brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.4))" }} />
              <span style={{ color: "rgba(245,239,226,0.5)" }}>·</span>
              <img src={CLICK_CLACK_LOGO} alt="Click Clack" className="colHeroCoBrandLogo" />
            </div>
          </div>
        </div>
        <a href="#vision" className="colHeroScroll">
          <span className="colHeroScrollText">Descubrir</span>
          <span className="colHeroScrollChev" />
        </a>
      </section>

      {/* ═══ INVITATION / MANIFESTO ═══ */}
      <section className="colManifesto" id="vision">
        <div className="colWrap">
          <FadeIn>
            <p className="colEyebrow">The Invitation</p>
          </FadeIn>
          <TextReveal className="colManifestoText">
            Set within the mountains of Antioquia, this is not a real estate development but a <em>living community</em> — built around wellbeing, regenerative agriculture, deep connection to the land and culture of Colombia, and the people who make it what it is.
          </TextReveal>
          <FadeIn delay={0.2}>
            <div className="colManifestoBody">
              <p><strong>Not a resort. Not a gated retirement enclave. Not a branded-residence project.</strong></p>
              <p>This is a multigenerational partnership — celebrating the culture, the coffee, the craft, and the vibrancy of Colombia. It begins by honoring a family that has shaped specialty coffee in Antioquia for half a century — and the small farmers, the local town, and the land that have made that legacy possible.</p>
              <p>Each partner contributes what only they can. The family stays a co-owner of the upside. And what we build at Finca San Pascual is in service of the community that surrounds it.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ HONORING THE FAMILY · PERGAMINO ═══ */}
      <section className="colSec colSecCream" id="family">
        <div className="colWrap">
          <div className="colSecHead">
            <FadeIn><p className="colEyebrow">Honoring the Echavarría Family · Pergamino</p></FadeIn>
            <FadeIn delay={0.05}>
              <div style={{ display: "flex", justifyContent: "center", margin: "1.5rem 0 2rem" }}>
                <img src={PERGAMINO_LOGO} alt="Pergamino" style={{ height: "120px", width: "auto", filter: "brightness(0.25)" }} />
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">A family rooted in Fredonia.<br/><em>A coffee legacy in motion.</em></h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="colSecDesc">Finca San Pascual is the original family farm — and the foundation of everything that has grown from it. This project begins by honoring that land, that work, and the smallholder community Pergamino supports across Antioquia, Cauca, and Nariño.</p>
            </FadeIn>
          </div>

          {/* Old farmhouse hero photo */}
          <FadeIn delay={0.1}>
            <figure style={{ margin: "3rem 0 2rem", borderRadius: "4px", overflow: "hidden" }}>
              <img src={PHOTO.oldFarmhouse} alt="Original brick farmhouse at Finca San Pascual" style={{ width: "100%", height: "62vh", objectFit: "cover", display: "block" }} />
              <figcaption style={{ marginTop: "0.85rem", fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--moss, #4A5D23)", textAlign: "center" }}>The original farmhouse · Finca San Pascual</figcaption>
            </figure>
          </FadeIn>

          {/* Legacy timeline */}
          <div className="colCommList" style={{ marginTop: "3rem" }}>
            {FAMILY_LEGACY.map((stage, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(140px, 220px) 1fr", gap: "2rem", padding: "2rem 0", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  <div>
                    <p style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--moss, #4A5D23)", marginBottom: "0.5rem" }}>{stage.year}</p>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 500, lineHeight: 1.2, fontStyle: "italic" }}>{stage.title}</h4>
                  </div>
                  <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "rgba(26,22,16,0.78)" }}>{stage.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Family / Pergamino fact strip */}
          <FadeIn delay={0.2}>
            <div style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1.5rem", borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "2.5rem" }}>
              {FAMILY_FACTS.map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.6rem", fontWeight: 500, color: "var(--moss, #4A5D23)", lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(26,22,16,0.6)", marginTop: "0.65rem" }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Smallholder photo + caption */}
          <FadeIn delay={0.15}>
            <figure style={{ margin: "4rem 0 0", borderRadius: "4px", overflow: "hidden" }}>
              <img src={PHOTO.coffeePickers} alt="Smallholder coffee pickers in the Pergamino network" style={{ width: "100%", height: "70vh", objectFit: "cover", display: "block" }} />
              <figcaption style={{ marginTop: "0.85rem", fontSize: "0.85rem", lineHeight: 1.6, color: "rgba(26,22,16,0.78)", textAlign: "center", maxWidth: "640px", margin: "0.85rem auto 0" }}>The cultural offering of this project is built on supporting these growers — the small farmers of Antioquia, Cauca, and Nariño that the Pergamino network walks alongside.</figcaption>
            </figure>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CHOZEN BACKGROUND ═══ */}
      <section className="colSec colSecDark" id="chozen">
        <div className="colWrap">
          <div className="colSecHead">
            <FadeIn><p className="colEyebrowGold">A Brief Background</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitleLight">What is ChoZen.<br/><em>Why Colombia.</em></h2>
            </FadeIn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem", marginTop: "3rem" }}>
            <FadeIn delay={0.1}>
              <div>
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold, #C8A664)", marginBottom: "0.7rem" }}>The Brand</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.7rem", color: "var(--cream, #F5EFE2)", marginBottom: "1rem", fontStyle: "italic" }}>A regenerative living framework.</h3>
                <p style={{ color: "rgba(245,239,226,0.8)", lineHeight: 1.7 }}>ChoZen is a regenerative-living brand and framework — bringing together wellness, regenerative agriculture, intentional community, and biophilic design. Founded by Tony Cho and Ximena Cho, it has grown over more than a decade as a community of changemakers, indigenous leaders, world-class wellness practitioners, and visionaries.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.18}>
              <div>
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold, #C8A664)", marginBottom: "0.7rem" }}>The Founders</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.7rem", color: "var(--cream, #F5EFE2)", marginBottom: "1rem", fontStyle: "italic" }}>Tony &amp; Ximena Cho.</h3>
                <p style={{ color: "rgba(245,239,226,0.8)", lineHeight: 1.7 }}>Tony Cho is a regenerative placemaker with a 20-year track record — founder of Future of Cities, original placemaker of Wynwood, and founder of the Phoenix Arts &amp; Innovation District. Ximena Cho is a Colombian-born co-founder, philanthropist, and environmental advocate. Their partnership and her Colombian heritage are why this project belongs here.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.26}>
              <div>
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold, #C8A664)", marginBottom: "0.7rem" }}>Why Colombia</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.7rem", color: "var(--cream, #F5EFE2)", marginBottom: "1rem", fontStyle: "italic" }}>Where the framework belongs.</h3>
                <p style={{ color: "rgba(245,239,226,0.8)", lineHeight: 1.7 }}>Colombia has the land, the culture, the coffee, and the people. The mixed-village model — local farmers and international residents as neighbors, not amenities — is most natural here. ChoZen Colombia is the most purposeful realization of the framework to date.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ THE LAND · FINCA SAN PASCUAL ═══ */}
      <ImageBreak
        img={PHOTO.cerroBravoView}
        height="78vh"
        subtitle="The Land"
        title={<>Finca San Pascual.<br/><em>111 hectares of coffee terroir.</em></>}
        caption="At 1,400–1,800 meters, just below the Cerro Bravo watershed (2,645m) — one of the safer, quieter corners of the coffee belt."
        overlay={0.45}
      />

      {/* ═══ THE LAND · DETAIL ═══ */}
      <section className="colSec" id="land">
        <div className="colWrap">
          <div className="colSecHead">
            <FadeIn><p className="colEyebrow">Finca San Pascual</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">The setting.<br/><em>The watershed. The microclimate. The coffee.</em></h2>
            </FadeIn>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem", marginTop: "3rem" }}>
            <FadeIn delay={0.05}>
              <div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", marginBottom: "0.7rem", fontStyle: "italic" }}>The Watershed</h4>
                <p style={{ lineHeight: 1.7 }}>The site sits below the Cerro Bravo forested reserve — designated by the regional environmental authority as the guarantor of water quality and quantity for human consumption in the area.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", marginBottom: "0.7rem", fontStyle: "italic" }}>The Climate</h4>
                <p style={{ lineHeight: 1.7 }}>Tropical-Andean: 16–24°C by day, cool nights, two wet seasons. The pronounced diurnal variation is what defines specialty Antioquian coffee.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.19}>
              <div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", marginBottom: "0.7rem", fontStyle: "italic" }}>The Coffee</h4>
                <p style={{ lineHeight: 1.7 }}>The specialty-coffee operation preserved and elevated under Pergamino stewardship — the export channel maintained, the farm at the heart of the village.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.26}>
              <div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", marginBottom: "0.7rem", fontStyle: "italic" }}>A Safe Corner</h4>
                <p style={{ lineHeight: 1.7 }}>Fredonia is one of the quietest municipalities in Suroeste Antioquia — protected under the national Plan Cosecha Cafetera, with crime rates below the national average.</p>
              </div>
            </FadeIn>
          </div>

          {/* On-the-ground photo grid */}
          <FadeIn delay={0.15}>
            <div style={{ marginTop: "3.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {[PHOTO.coffeeRows, PHOTO.coffeeProcessing, PHOTO.treeLandscape, PHOTO.equestrian].map((src, i) => (
                <div key={i} style={{ aspectRatio: "3/4", overflow: "hidden", borderRadius: "3px" }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
            <p style={{ marginTop: "1rem", fontSize: "0.74rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(26,22,16,0.55)", textAlign: "center" }}>On the ground · Finca San Pascual</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ MEDELLÍN · ONE SLIM SECTION ═══ */}
      <ImageBreak
        img={MEDELLIN_HERO.img}
        credit={MEDELLIN_HERO.credit}
        height="60vh"
        subtitle="One Hour Away"
        title={<>Medellín. <em>The gateway.</em></>}
        caption="~1 hour from the city via the Pacífico 1 highway. ~1.5 hours to José María Córdova International."
        overlay={0.5}
        speed={0.25}
      />

      {/* ═══ LOS PALOMOS · COMMUNITY REVITALIZATION ═══ */}
      <section className="colSec colSecCream" id="palomos">
        <div className="colWrap">
          <div className="colSecHead">
            <FadeIn><p className="colEyebrow">Los Palomos · The Community Spine</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">Built with the town.<br/><em>Not behind a private gate.</em></h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="colSecDesc">Los Palomos is a small village with a century-long coal-mining history and a proud rail heritage. The historic church and the old rail station were demolished in recent years. The village deserves investment — and the project is built so the community reaches every public anchor the same way residents do: by walking into town.</p>
            </FadeIn>
          </div>

          <div className="colCommList" style={{ marginTop: "3rem" }}>
            {REVITALIZATION.map((r, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: "1.6rem", padding: "2rem 0", borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--moss, #4A5D23)", fontWeight: 500, lineHeight: 1 }}>0{i + 1}</div>
                  <div>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.55rem", marginBottom: "0.7rem", fontStyle: "italic" }}>{r.title}</h4>
                    <p style={{ lineHeight: 1.7, color: "rgba(26,22,16,0.78)" }}>{r.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ARCHITECTURE VIDEO ═══ */}
      <VideoBreak
        src={VIDEO.corridorDolly}
        height="80vh"
        subtitle="Architecture as Lineage"
        title={<>Antioqueño modern.<br/><em>Rooted in the land.</em></>}
        caption="Whitewashed walls. Bamboo in the Simón Vélez lineage. Rammed earth. Locally-sourced timber. Living roofs. Built by local craft."
        poster={IMG.finca}
      />

      {/* ═══ SIX COMPONENTS ═══ */}
      <section className="colSec" id="components">
        <div className="colWrap">
          <div className="colSecHead">
            <FadeIn><p className="colEyebrow">The Programming</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">Six interconnected components.<br/><em>Each reinforces the others.</em></h2>
            </FadeIn>
          </div>
          <div className="colCommList">
            {COMPONENTS.map((c, i) => <ComponentCard key={i} item={c} index={i} />)}
          </div>
        </div>
      </section>

      {/* ═══ THE TIERS / LEVELS ═══ */}
      <section className="colSec colSecCream">
        <div className="colWrap">
          <div className="colSecHead">
            <FadeIn><p className="colEyebrow">The Village · Across Three Bands</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">Level 1. The Village.<br/><em>The Town.</em></h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="colSecDesc">The Finca entrance, the residential bands above, and the off-site town of Los Palomos — woven together as one community.</p>
            </FadeIn>
          </div>
          <div className="colSiteGrid" style={{ marginTop: "3rem", alignItems: "stretch" }}>
            {LEVELS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1} style={{ height: "100%", display: "flex" }}>
                <div className="colSiteCard" style={{ display: "flex", flexDirection: "column", height: "100%", flex: 1 }}>
                  <p className="colSiteTag">{s.where}</p>
                  <h3 className="colSiteName">{s.name}</h3>
                  <div className="colSiteDivider" />
                  <p className="colSiteDesc">{s.desc}</p>
                  <div style={{ marginTop: "auto", paddingTop: "1.2rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {s.items.map(t => (
                      <span key={t} style={{ fontSize: "0.66rem", letterSpacing: "0.14em", textTransform: "uppercase", padding: "0.4rem 0.7rem", border: "1px solid rgba(0,0,0,0.12)", borderRadius: "999px", color: "rgba(26,22,16,0.7)" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Cohort grid — the mixed-village thesis */}
          <FadeIn delay={0.2}>
            <h3 className="subHead" style={{ marginTop: "5rem", textAlign: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontStyle: "italic" }}>Six Resident Cohorts · One Village</h3>
            <p style={{ textAlign: "center", maxWidth: "680px", margin: "0.8rem auto 2.5rem", lineHeight: 1.7, color: "rgba(26,22,16,0.7)" }}>The age, occupational, and cultural rhythm of a healthy Antioquian town — not a demographic monoculture.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              {COHORTS.map((c, i) => (
                <div key={i} style={{ padding: "1.6rem", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "3px", background: "rgba(255,255,255,0.5)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.7rem" }}>
                    <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 600, lineHeight: 1.25 }}>{c.name}</h4>
                    <span style={{ fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--moss, #4A5D23)", whiteSpace: "nowrap", marginLeft: "0.6rem" }}>{c.pct}</span>
                  </div>
                  <p style={{ fontSize: "0.92rem", lineHeight: 1.6, color: "rgba(26,22,16,0.72)" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ WELLNESS VIDEO ═══ */}
      <VideoBreak
        src={VIDEO.bambooPushIn}
        height="78vh"
        subtitle="The Sanctuary"
        title={<>Bamboo pavilions. <em>Stone pools. Steam rising in the highland air.</em></>}
        poster={IMG.wellnessRetreat}
      />

      {/* ═══ THE PARTNERSHIP ═══ */}
      <section className="colSec" id="partners">
        <div className="colWrap">
          <div className="colSecHead">
            <FadeIn><p className="colEyebrow">The Partnership</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">Pergamino. ChoZen. Click Clack.<br/><em>The family. The future of cities. The town.</em></h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="colSecDesc">Each partner contributes what only they can. The family stays a co-owner of the community&rsquo;s upside — a multigenerational partnership celebrating the culture and vibrancy of Colombia.</p>
            </FadeIn>
          </div>
          <div className="colPartnerGrid">
            {PARTNERS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className={`colPartnerCard ${p.logo ? "colPartnerCardLogo" : ""}`}>
                  <span className="colPartnerNum">0{i + 1}</span>
                  <p className="colPartnerRole">{p.role}</p>
                  {p.logo ? (
                    <div className="colPartnerLogoWrap" style={p.logoDark ? { background: "var(--ink, #1A1610)", borderRadius: "3px", padding: "1.6rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "130px" } : {}}>
                      <img src={p.logo} alt={p.name} className="colPartnerLogo" style={p.logoDark ? { maxHeight: "84px", width: "auto", filter: "brightness(0) invert(1)" } : {}} />
                    </div>
                  ) : (
                    <h3 className="colPartnerName">{p.name}</h3>
                  )}
                  <p className="colPartnerDesc">{p.desc}</p>
                  {p.stamp && <img src={p.stamp} alt="" style={{ width: "36px", height: "auto", marginTop: "1rem", opacity: 0.4 }} />}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DEAL STRUCTURE — LIGHT TOUCH ═══ */}
      <section className="colHowItWorks">
        <div className="colWrap">
          <div className="colHowGrid">
            <div>
              <FadeIn><p className="colEyebrow">Structure · Light Touch</p></FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="colHowTitle">A multigenerational<br/><em>partnership.</em></h2>
              </FadeIn>
            </div>
            <div className="colHowBody">
              <FadeIn delay={0.15}>
                <p>This is an <em>introduction</em>, not a negotiation. The structure, when we get there, is simple: the family contributes Finca San Pascual at an agreed value as equity — preserving multigenerational ownership and upside. ChoZen and Future of Cities contribute the brand, the framework, and the master-plan IP. Click Clack contributes the boutique-hotel brand and operations. Pergamino retains its IP and its brand on the farm.</p>
                <p>This is not just a business deal. It is a multigenerational partnership — celebrating the culture and vibrancy of Colombia, and built around honoring the family, the small farmers, and the town.</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NEXT 90 DAYS — SIMPLE ═══ */}
      <section className="colSec colSecCream">
        <div className="colWrap">
          <div className="colSecHead">
            <FadeIn><p className="colEyebrow">The Next 90 Days</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">A 90-day feasibility<br/><em>and term sheet.</em></h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="colSecDesc" style={{ maxWidth: "640px", margin: "1.5rem auto 0" }}>If the conversation continues — site walks, hydrology and geotechnical surveys, master-plan concept, and a definitive term sheet. No public signal until we&rsquo;re ready, together.</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ SUNSET QUOTE OVER MOUNTAIN ═══ */}
      <ImageBreak
        img={PHOTO.sunsetMountain}
        height="78vh"
        subtitle="The Real Question"
        title={<><em>It is whether the partnership<br/>can be built.</em></>}
        caption="The land is here. The family is here. The brand is here. The framework is here."
        overlay={0.55}
      />

      {/* ═══ CONTACT ═══ */}
      <section className="colContact" id="contact">
        <div className="colWrap">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto" }}>
            <FadeIn><p className="colEyebrow">Connect</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colContactTitle">Begin the<br/><em>conversation.</em></h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="colContactBody">
                If this resonates — we&rsquo;d like to walk Finca San Pascual together, share a meal in Fredonia, and listen.
              </p>
              <div className="colContactLinks" style={{ justifyContent: "center" }}>
                <a href="mailto:tcho@focities.com" className="colContactLink">tcho@focities.com</a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="colFooter">
        <div className="colWrap">
          <div className="colFooterRow">
            <div className="colFooterBrand">
              <img src={STAMP_LOGO} alt="" className="colFooterStamp" />
              <span>CHOZEN</span>
              <span className="colFooterDot">·</span>
              <span>COLOMBIA</span>
            </div>
            <div className="colFooterPartner">
              <span className="colFooterPartnerLabel">A partnership of</span>
              <img src={PERGAMINO_LOGO} alt="Pergamino" style={{ height: "80px", width: "auto", marginRight: "1.5rem", filter: "brightness(0) invert(1)" }} />
              <img src={CLICK_CLACK_LOGO} alt="Click Clack" className="colFooterPartnerLogo" />
            </div>
          </div>
          <div className="colFooterLine" />
          <p className="colFooterMeta colFooterMetaCenter">Confidential · Partnership Discussion · April 2026 · Pergamino · ChoZen · Click Clack · Future of Cities</p>
          <p className="colFooterSmall">© 2026 Cho Ventures. All rights reserved. ChoZen® is a registered mark.</p>
        </div>
      </footer>
    </div>
  );
}
