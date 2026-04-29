"use client";
import { useState, useEffect, useRef } from "react";

const BLOB = "https://zicvctuf51wytcty.public.blob.vercel-storage.com/renderings";
const VIDEO_BLOB = "https://zicvctuf51wytcty.public.blob.vercel-storage.com/renderings/videos";
const IMG_BLOB = "https://zicvctuf51wytcty.public.blob.vercel-storage.com/images";

// ═══════════════════════════════════════════════════════════════
// MEDIA — direct blob URLs (spaces encoded)
// ═══════════════════════════════════════════════════════════════

const encode = (name) => `${BLOB}/${encodeURIComponent(name)}`;
const encodeVideo = (name) => `${VIDEO_BLOB}/${encodeURIComponent(name)}`;

const STAMP_LOGO = `${IMG_BLOB}/chozen-stamp.png`;
const CLICK_CLACK_LOGO = "https://zicvctuf51wytcty.public.blob.vercel-storage.com/logo-click-clack-negro.png";

const VIDEO = {
  heroPullback: encodeVideo("Firefly Epic slow cinematic drone pullback rising gradually from the luxury mountain village, reveal.mp4"),
  nightDrift: encodeVideo("Firefly Slow cinematic drone drift forward over a luxury Colombian mountain village at night under a.mp4"),
  corridorDolly: encodeVideo("Firefly Slow dolly forward through the open-air corridor, camera gliding past whitewashed walls and-.mp4"),
  lateralTrack: encodeVideo("Firefly Slow lateral drone tracking shot moving right to left past luxury whitewashed and brick Colo.mp4"),
  bambooPushIn: encodeVideo("Firefly Slow push-in toward the bamboo wellness pavilion, steam rises gently from the stone pool sur.mp4"),
};

const IMG = {
  masterPlan: encode("ChoZen-Colombia.png"),
  villageAerial: encode("Aerial photograph of a luxury sustainable village nestled into a lush green Colombian 869429.png"),
  finca: encode("Colombian finca-style residential home with open-air corridors, whitewashed wa 869429.png"),
  boutiqueHotel: encode("Boutique hotel exterior in the Colombian coffee region mountains, modern minimalist a 869429.png"),
  wellnessRetreat: encode("Luxury wellness retreat center built into a Colombian mountainside, infinity-edge nat 869429.png"),
  farm: encode("Organic regenerative farm on a Colombian mountain terrace, neat rows of coffee plants 869429.png"),
  schoolhouse: `${BLOB}/medellin-school.png`,
  energy: encode("Sustainable energy infrastructure integrated into a lush Colombian mountain landscape 869429.png"),
  boutiqueAerial: encode("Photorealistic aerial drone photograph from 200 feet above, centered on a luxury bout 748238.png"),
  villageNight: encode("Photorealistic aerial drone photograph of a luxury Colombian mountain village at nigh 748238.png"),
  approaching: encode("Photorealistic drone photograph approaching a luxury Colombian mountain community fro 748238.png"),
  village250: encode("Photorealistic drone photograph taken from 250 feet above a Colombian mountain villag 748238.png"),
  highAltitude: encode("Photorealistic high-altitude drone photograph from 500 feet above a luxury regenerati 748238.png"),
  topDown: encode("Photorealistic top-down drone photograph from 400 feet directly above a luxury Colomb 748238.png"),
  horses: encode("Beautiful Paso Fino horses grazing in a lush green Colombian highland meadow, a woode 869429.png"),
  artisanVillage: encode("Small artisan retail village in the Colombian highlands, charming storefronts with ha 869429.png"),
  sunsetGathering: encode("An outdoor community gathering in a Colombian mountain village at sunset, a long wood 748238.png"),
};

const MEDELLIN_BLOB = "https://zicvctuf51wytcty.public.blob.vercel-storage.com/medellin";
const MEDELLIN_HERO = {
  img: `${MEDELLIN_BLOB}/ricardo-gomez-angel-GcHar4P8V_Q-unsplash.jpg`,
  credit: "Ricardo Gomez Angel",
};
const MEDELLIN_GALLERY = [
  { img: `${MEDELLIN_BLOB}/andres-gomez-r5jb6b3XBGE-unsplash.jpg`, caption: "Medellín", sub: "Photo · Andres Gomez" },
  { img: `${MEDELLIN_BLOB}/carlos-martinez-KToQ45xT1JY-unsplash.jpg`, caption: "Antioquia", sub: "Photo · Carlos Martinez" },
  { img: `${MEDELLIN_BLOB}/lawrson-pinson-v78Q07VnJBA-unsplash.jpg`, caption: "Highlands", sub: "Photo · Lawrson Pinson" },
];

const GALLERY = [
  { img: IMG.horses, caption: "Paso Fino on the highland", sub: "Equestrian trails" },
  { img: IMG.artisanVillage, caption: "Artisan village", sub: "Storefronts, open doors" },
  { img: IMG.sunsetGathering, caption: "Sobremesa", sub: "Long tables at sunset" },
];

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

const COMMUNITY = [
  {
    num: "01",
    title: "The Residential & Artisan Village",
    tag: "Six Cohorts · Three Bands",
    desc: "~150 units across three bands. Workforce + affordable in Los Palomos and at the Finca entrance. Artisan live-work studios with ground-floor workshop and residence above. Family homes and entrepreneur/remote-worker residences on the higher levels. Two senior tiers — affordable in town, luxury concierge with Blue Zones longevity programming on the slopes. A small tier of coffee-grove villas at the top. Full and fractional ownership.",
    note: "Locals and internationals as neighbors, not amenities. Workforce housing is structural, not incidental.",
    img: IMG.finca,
  },
  {
    num: "02",
    title: "The ChoZen Village · The Level 1 Gateway",
    tag: "The First Arrival",
    desc: "The walkable plaza at the entrance of Finca Pascal — coffee farm, equestrian stables, activities center, weekly and monthly farmers market, Pergamino flagship coffee bar, Click Clack-operated farm-to-table restaurants and cafés, artisan retail under an Artesanías de Colombia-curated flagship, and co-working integrated with the plaza. Open to Fredonia, Los Palomos, and the surrounding veredas.",
    note: "The first arrival experience is the working agricultural life of the land — not a gatehouse.",
    img: IMG.artisanVillage,
  },
  {
    num: "03",
    title: "The Sanctuary · Retreat & Wellness Center",
    tag: "Blue Zones Programming",
    desc: "Bamboo pavilions, natural stone pools, open-air movement studios, hydrotherapy, medicinal-plant greenhouse, sauna and steam, nutrition kitchen. Anchor programs: Blue Zones Living signature programming, ChoZen retreats, private corporate retreats, physician-led clinical wellness integrated with the public clinic. Thermal springs woven in if the geological survey confirms feasibility.",
    note: "Sliding-scale access for Los Palomos and Fredonia residents.",
    img: IMG.wellnessRetreat,
  },
  {
    num: "04",
    title: "Click Clack · Hotel · Wellness · F&B as One Platform",
    tag: "~100 Keys · One Operator",
    desc: "Approximately 100 keys — ~60 in the main lodge, ~40 in dispersed cabin and casita clusters along the coffee-grove contours. Click Clack operates the hotel, the wellness sanctuary, and the farm-to-table F&B as a single integrated platform under one design language. Pergamino runs the flagship coffee bar. Culinary artisans graduating from the Makers Academy and regional chefs join over time under Click Clack's operating oversight.",
    note: "Architecture lineage: Simón Vélez (bamboo) and Kengo Kuma — already present in Click Clack's existing properties.",
    img: IMG.boutiqueHotel,
    cobrand: CLICK_CLACK_LOGO,
  },
  {
    num: "05",
    title: "The Regenerative Farm + Equestrian",
    tag: "Pergamino Stewardship",
    desc: "Agriculture is not an amenity — it is the foundation. Finca Pascal's specialty-coffee operation preserved under Pergamino stewardship; export channel maintained; regenerative-practice certification pursued. Diversification into vegetables, fruit, food forests, herbs, honey, dairy, pasture-raised proteins. Premium-priced offtake with the 600+ Allied Producers across Antioquia, Cauca, and Nariño. Equestrian stables and trails honoring the agricultural heritage of the region.",
    note: "The farm feeds the hotel, the restaurants, the senior-living kitchens, and the weekly market.",
    img: IMG.farm,
  },
  {
    num: "06",
    title: "Two Schools + Makers Academy + Public Clinic",
    tag: "Public Anchors · Co-Built with Government",
    desc: "ChoZen School (higher levels) — K–11 Green School × Ad Astra; bilingual; bamboo and rammed earth; 30%+ scholarship seats for local families; cross-enrollment with the public school. Public school in Los Palomos — K–11 classical Colombian curriculum modernized under Alianza ERA; SENA-aligned vocational tracks. Makers Academy — SENA + Artesanías de Colombia + Escuelas Taller; 80% local seats free or subsidized. Public-partnership clinic in Los Palomos under Alcaldía + DSSA convenio.",
    note: "The clinic is in the town, not behind a private gate. The community reaches it the same way residents do.",
    img: IMG.schoolhouse,
  },
];

const SUSTAIN = [
  { key: "Architecture", desc: "Antioqueño modern × Japanese-Colombian. Whitewashed walls, natural wood beams, terracotta tile, open-air corridors, handcrafted ceramic details. Bamboo (guadua angustifolia) under the structural lineage of Simón Vélez. Design DNA threaded with Kengo Kuma." },
  { key: "Watershed", desc: "Fed by the Cerro Bravo watershed (2,645m) — designated by the regional environmental authority as the guarantor of water quality and quantity for human consumption in the area." },
  { key: "Climate", desc: "Tropical-Andean: 16–24°C by day, cool nights, two wet seasons. The pronounced diurnal variation is exactly what defines specialty Antioquian coffee." },
  { key: "Coffee", desc: "Specialty-coffee operation preserved under Pergamino stewardship. Export channel maintained. Premium offtake with 600+ Allied Producers across Antioquia, Cauca, and Nariño." },
  { key: "Mobility", desc: "One hour to Medellín on the Pacífico 1 highway. 1.5 hours to José María Córdova International. Long-horizon: reactivation of the Antioquia railway segment that once stopped at Los Palomos." },
];

const PARTNERS = [
  {
    name: "Echavarría Family",
    role: "Land + Brand",
    desc: "Finca Pascal contributed as equity — not as a sale — preserving multi-generational ownership of the upside. Pergamino specialty-coffee continuity. 600+ Allied Producer network. Multi-generational legacy in Fredonia.",
  },
  {
    name: "Future of Cities",
    role: "Master Developer",
    desc: "ChoZen brand and framework. 20-year placemaking track record — Wynwood, Magic City, PHX-JAX. Sponsor capital and the regenerative master-plan + execution. Tony Cho contributing the ChoZen IP and FOC's Regenerative Placemaking Standards.",
  },
  {
    name: "Click Clack",
    role: "Hospitality",
    desc: "Hotel (~100 keys), wellness sanctuary, and farm-to-table F&B as one integrated platform under one design language. Brand, operating agreement, and Colombian family-office capital sourcing.",
    logo: CLICK_CLACK_LOGO,
  },
  {
    name: "Greg Carson",
    role: "Capital Partner",
    desc: "Anchor capital partner shaping deal structure, LP syndication, and long-term governance — joining FOC and Click Clack at the table for the next 90 days.",
  },
  {
    name: "Government",
    role: "Public Anchors",
    desc: "Alcaldía de Fredonia + Gobernación + Alianza ERA: clinic and public school in Los Palomos, co-built and co-funded — with Obras por Impuestos.",
  },
];

const SITES = [
  {
    name: "Level 1 · The Gateway",
    region: "Finca Entrance",
    desc: "Coffee farm, equestrian stables, activities center, ChoZen Village with farmers market, Pergamino flagship coffee bar, and Click Clack farm-to-table F&B. Open to Fredonia, Los Palomos, and the surrounding veredas.",
    tag: "The Arrival",
  },
  {
    name: "Higher Levels · The Village",
    region: "Residential Bands",
    desc: "Artisan live-work studios, family and entrepreneur residences, villas, and a luxury senior tier with Blue Zones programming. ChoZen School, the wellness sanctuary, and the Makers Academy woven throughout.",
    tag: "Residential",
  },
  {
    name: "Off-Site · Los Palomos",
    region: "The Town",
    desc: "Public primary-care clinic under Alcaldía + DSSA convenio. Traditional + SENA-vocational public school under Alianza ERA. Workforce + affordable housing — and the affordable senior tier.",
    tag: "Public Anchors",
  },
];

const STEPS = [
  { n: "01", label: "Next 30 Days · Land Structure", desc: "Land-structure alignment with the Echavarría family on Finca Pascal — contributed as equity, not as a sale." },
  { n: "02", label: "Next 30 Days · Hospitality", desc: "Click Clack engagement pathway and capital-sourcing role confirmed." },
  { n: "03", label: "Next 30 Days · Security Posture", desc: "Memorandum co-signed with Gobernación, Alcaldía, and Policía Nacional before any public signal." },
  { n: "04", label: "Next 90 Days · Feasibility & Term Sheets", desc: "Site, hydrology, geotechnical, and thermal surveys; master-plan concept (Vélez/Kuma lineage); financial model v1. Family term sheet, Click Clack LOI, clinic and school operator shortlists, SENA + Artesanías + Escuela Taller MOU pathway." },
  { n: "05", label: "Day 120 · Go / No-Go to Structuring", desc: "If feasibility confirms water, land, security posture, family alignment, Click Clack commitment, and public-partnership openness — we proceed. Phase 1 is scoped tightly to limit sunk cost." },
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
    { href: "#vision", label: "Vision" },
    { href: "#community", label: "Community" },
    { href: "#regenerative", label: "Regenerative" },
    { href: "#partnership", label: "Partnership" },
    { href: "#sites", label: "Sites" },
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

function FadeIn({ children, delay = 0, className = "", direction = "up" }) {
  const [ref, vis] = useInView(0.08);
  const transforms = { up: "translateY(48px)", down: "translateY(-48px)", left: "translateX(48px)", right: "translateX(-48px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translate(0)" : transforms[direction],
      transition: `opacity 1s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 1s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
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

function CommunityCard({ item, index }) {
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
      <p>We&apos;ll be in touch to schedule a site visit and next steps.</p>
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
        <span>I&apos;m interested as a</span>
        <select value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
          <option value="">Select one…</option>
          <option>Landowner / Family Office</option>
          <option>Investor / Capital Partner</option>
          <option>Future Resident</option>
          <option>Hospitality / Operational Partner</option>
          <option>Advisor / Community</option>
          <option>Media</option>
        </select>
      </label>
      <label className="colFormFull">
        <span>A note (optional)</span>
        <textarea rows={4} placeholder="Anything you'd like us to know before we connect." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
      </label>
      <button className="colFormBtn" onClick={() => setDone(true)}>Request a Conversation →</button>
      <p className="colFormSmall">Partnership inquiries only. We&apos;ll respond within 3 business days.</p>
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
            <span>Chozen</span>
            <span className="colHeroTitleItalic">Colombia</span>
          </h1>
          <div className="colHeroLine" />
          <p className="colHeroSub">A Regenerative Mountain Village in the Colombian Highlands</p>
          <p className="colHeroLocation">Finca Pascal · Fredonia, Antioquia</p>
          <div className="colHeroCoBrand">
            <span className="colHeroCoBrandLabel">In partnership with</span>
            <img src={CLICK_CLACK_LOGO} alt="Click Clack" className="colHeroCoBrandLogo" />
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
            <p className="colEyebrow">The Vision</p>
          </FadeIn>
          <TextReveal className="colManifestoText">
            Set within the mountains of Antioquia, this is not a real estate development but a <em>living community</em> — built around wellbeing, regenerative agriculture, deep connection to the land and culture of Colombia, and the people who make it what it is.
          </TextReveal>
          <FadeIn delay={0.2}>
            <div className="colManifestoBody">
              <p><strong>Not a resort. Not a gated retirement enclave. Not a branded-residence project.</strong></p>
              <p>The site sits in the coffee-growing band of southwestern Antioquia at 1,400–1,800 meters, just below the Cerro Bravo watershed (2,645m) — a forested reserve that, by the regional environmental authority's own designation, guarantees the quality and quantity of water for human consumption in the area. One hour to Medellín on the Pacífico 1 highway. An hour and a half to José María Córdova International.</p>
              <p>Six resident cohorts woven together — coffee entrepreneurs and agri-innovators, remote-work families commuting to Medellín's Ruta N ecosystem, Colombian and international families, artisans and makers, retirees in two distinct tiers (capped at ~20%), and a small tier of luxury villa buyers at the top. Workforce housing is structural, not incidental — 60% local hiring, with a community advisory board holding real authority over public-realm design and scholarship allocation.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ MEDELLÍN IMAGE BREAK ═══ */}
      <ImageBreak
        img={MEDELLIN_HERO.img}
        credit={MEDELLIN_HERO.credit}
        height="75vh"
        subtitle="Medellín · Antioquia"
        title={<>The city of<br/><em>eternal spring.</em></>}
        caption="65–75°F year-round. Surrounded by green mountains. The gateway to ChoZen Colombia."
        overlay={0.45}
        speed={0.25}
      />

      {/* ═══ WHY MEDELLÍN ═══ */}
      <section className="colHowItWorks" id="medellin">
        <div className="colWrap">
          <div className="colHowGrid">
            <div>
              <FadeIn><p className="colEyebrow">Why Finca Pascal · Why Now</p></FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="colHowTitle">A four-way<br/><em>convergence.</em></h2>
              </FadeIn>
            </div>
            <div className="colHowBody">
              <FadeIn delay={0.15}>
                <p>A rare site — 111 hectares of world-class coffee terroir, ~1 hour from Medellín, fed by the Cerro Bravo watershed, in one of the safer, quieter municipalities of the coffee belt.</p>
                <p>Echavarría family land + Pergamino brand gravity + Click Clack hospitality + FOC placemaking — a combination that does not exist anywhere else in Antioquia. The oriente has saturated; the suroeste corridor is the next edge. Coffee&apos;s generational moment: young producers in the Pergamino network need anchor institutions to make staying a rational life decision.</p>
                <p><em>Ráquira, Mompox, Salento — Antioquia has no equivalent craft destination. ChoZen Colombia is positioned to become the first.</em></p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MEDELLÍN GALLERY ═══ */}
      <section className="colGallerySec">
        <div className="colWrap">
          <div className="colGallery">
            {MEDELLIN_GALLERY.map((g, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <figure className="colGalleryItem">
                  <div className="colGalleryImg">
                    <img src={g.img} alt={g.caption} loading="lazy" />
                  </div>
                  <figcaption>
                    <span className="colGalleryCap">{g.caption}</span>
                    <span className="colGallerySub">{g.sub}</span>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ARCHITECTURE VIDEO ═══ */}
      <VideoBreak
        src={VIDEO.corridorDolly}
        height="90vh"
        subtitle="Modern Colombian Architecture"
        title={<>Whitewashed walls.<br/>Open-air corridors.<br/>Terracotta in the afternoon sun.</>}
        caption="Inspired by the traditional fincas of Antioquia — set against one of the most extraordinary landscapes on earth."
        poster={IMG.finca}
      />

      {/* ═══ THE COMMUNITY ═══ */}
      <section className="colSec" id="community">
        <div className="colWrap">
          <div className="colSecHead">
            <FadeIn><p className="colEyebrow">The Programming · Six Interconnected Components</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">Six components,<br/><em>structured so each reinforces the others.</em></h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="colSecDesc">The Village across three bands — Level 1 Gateway, Higher Levels Village, and the off-site Town of Los Palomos. Together they form a living community, not a demographic monoculture.</p>
            </FadeIn>
          </div>
          <div className="colCommList">
            {COMMUNITY.map((c, i) => <CommunityCard key={i} item={c} index={i} />)}
          </div>
        </div>
      </section>

      {/* ═══ WOVEN THROUGHOUT ═══ */}
      <section className="colWoven">
        <div className="colWrap">
          <FadeIn>
            <p className="colEyebrowLight">By the Numbers</p>
            <h2 className="colWovenTitle">111 hectares. ~150 residences. ~100 keys.<br/>600+ Pergamino producers. <em>1 hour to Medellín.</em></h2>
            <p className="colWovenText">Locals and internationals as neighbors — not amenities. Six resident cohorts woven together. 60% local hiring. A community advisory board with real authority over public-realm design and scholarship allocation.</p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ LATERAL VIDEO BREAK ═══ */}
      <VideoBreak
        src={VIDEO.lateralTrack}
        height="75vh"
        subtitle=""
        overlay={0.25}
        poster={IMG.villageAerial}
      />

      {/* ═══ SELF-SUFFICIENT BY DESIGN ═══ */}
      <section className="colSec colSecDark" id="regenerative">
        <div className="colWrap">
          <div className="colSecHead">
            <FadeIn><p className="colEyebrowGold">Architecture · Watershed · Coffee · Climate · Mobility</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitleLight">Architecture as lineage —<br/><em>infrastructure as place.</em></h2>
            </FadeIn>
          </div>
          <div className="colSustainImgWrap">
            <img src={IMG.energy} alt="Sustainable energy infrastructure" className="colSustainImg" />
            <div className="colSustainImgOverlay" />
          </div>
          <div className="colSustainGrid">
            {SUSTAIN.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="colSustainCard">
                  <span className="colSustainNum">0{i + 1}</span>
                  <h3>{s.key}</h3>
                  <p>{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WELLNESS VIDEO ═══ */}
      <VideoBreak
        src={VIDEO.bambooPushIn}
        height="85vh"
        subtitle="Retreat & Wellness"
        title={<>The spiritual heart.</>}
        caption="Bamboo pavilions. Natural stone pools. Steam rising in the highland air."
        poster={IMG.wellnessRetreat}
      />

      {/* ═══ THE PARTNERSHIP ═══ */}
      <section className="colSec" id="partnership">
        <div className="colWrap">
          <div className="colSecHead">
            <FadeIn><p className="colEyebrow">The Partnership We&rsquo;re Proposing</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">Five partners.<br/><em>A joint venture, not a sale.</em></h2>
            </FadeIn>
          </div>
          <div className="colPartnerGrid">
            {PARTNERS.map((p, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className={`colPartnerCard ${p.logo ? "colPartnerCardLogo" : ""}`}>
                  <span className="colPartnerNum">0{i + 1}</span>
                  <p className="colPartnerRole">{p.role}</p>
                  {p.logo ? (
                    <div className="colPartnerLogoWrap">
                      <img src={p.logo} alt={p.name} className="colPartnerLogo" />
                    </div>
                  ) : (
                    <h3 className="colPartnerName">{p.name}</h3>
                  )}
                  <p className="colPartnerDesc">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="colHowItWorks">
        <div className="colWrap">
          <div className="colHowGrid">
            <div>
              <FadeIn><p className="colEyebrow">Recommended Structure</p></FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="colHowTitle">A Colombian S.A.S.<br/><em>joint venture.</em></h2>
              </FadeIn>
            </div>
            <div className="colHowBody">
              <FadeIn delay={0.15}>
                <p>The Echavarría family contributes Finca Pascal at appraised value as equity — not as a sale — preserving multi-generational ownership of the upside. FOC contributes placemaking IP, sponsor capital, and the ChoZen brand. Click Clack contributes brand, operating agreement, and capital sourcing. Anchor capital fills the balance. Pergamino retains the coffee operation and export channel.</p>
                <p>Each partner contributes what only they can — and the family stays a co-owner of the community&rsquo;s upside. The real question is not whether this can be built — it is whether the partnership can be built.</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE SITES ═══ */}
      <section className="colSec colSecCream" id="sites">
        <div className="colWrap">
          <div className="colSecHead">
            <FadeIn><p className="colEyebrow">The Village · Across Three Bands</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">The Gateway. The Village.<br/><em>The Town.</em></h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="colSecDesc">The Finca entrance, the residential bands above, and the off-site town of Los Palomos — woven together as one community.</p>
            </FadeIn>
          </div>
          <div className="colSiteGrid">
            {SITES.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="colSiteCard">
                  <p className="colSiteTag">{s.tag}</p>
                  <h3 className="colSiteName">{s.name}</h3>
                  <p className="colSiteRegion">{s.region}</p>
                  <div className="colSiteDivider" />
                  <p className="colSiteDesc">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ NEXT STEPS ═══ */}
      <section className="colSec">
        <div className="colWrap">
          <div className="colSecHead">
            <FadeIn><p className="colEyebrow">The Path Forward</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">30 days. 90 days.<br/><em>A go/no-go on day 120.</em></h2>
            </FadeIn>
          </div>
          <div className="colStepList">
            {STEPS.map((s, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="colStep">
                  <span className="colStepNum">{s.n}</span>
                  <div className="colStepBody">
                    <h3>{s.label}</h3>
                    <p>{s.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TONY CHO QUOTE (over night video) ═══ */}
      <section className="colQuoteSection">
        <video className="colQuoteVideo" autoPlay muted loop playsInline poster={IMG.villageNight}>
          <source src={VIDEO.nightDrift} type="video/mp4" />
        </video>
        <div className="colQuoteOverlay" />
        <div className="colQuoteContent">
          <FadeIn>
            <p className="colQuoteMark">❝</p>
            <blockquote className="colQuoteText">
              Finca Pascal has everything a ChoZen community needs — the land, the watershed, the coffee, the people, and a family willing to stay co-owners of the upside. What has been missing is the framework, the capital, and the operating partner that can hold it all together.
            </blockquote>
            <blockquote className="colQuoteText colQuoteText2">
              The real question is not whether this can be built — it is whether the <em>partnership</em> can be built.
            </blockquote>
            <div className="colQuoteAttribution">
              <p className="colQuoteName">Tony Cho</p>
              <p className="colQuoteTitle">Founder · Future of Cities · ChoZen · Cho Ventures</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section className="colContact" id="contact">
        <div className="colWrap">
          <div style={{textAlign:"center",maxWidth:"720px",margin:"0 auto"}}>
            <FadeIn><p className="colEyebrow">What We&rsquo;re Asking from This Room</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colContactTitle">Begin the<br/><em>conversation.</em></h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="colContactBody">
                From the Echavarría family: alignment in principle on Finca Pascal as the advancing site, on land contributed as equity, and on Pergamino as the coffee anchor — opening the door to a 90-day feasibility and a definitive term sheet. From Greg: agreement to anchor the capital partnership and shape the structure with us — joining FOC and Click Clack at the table for the next 90 days.
              </p>
              <div className="colContactLinks" style={{justifyContent:"center"}}>
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
              <span className="colFooterPartnerLabel">Hospitality partner</span>
              <img src={CLICK_CLACK_LOGO} alt="Click Clack" className="colFooterPartnerLogo" />
            </div>
          </div>
          <div className="colFooterLine" />
          <p className="colFooterMeta colFooterMetaCenter">Confidential · Partnership Discussion · April 2026 · Future of Cities · ChoZen · Click Clack · Pergamino</p>
          <p className="colFooterSmall">© 2026 Cho Ventures. All rights reserved. ChoZen® is a registered mark. This material is for informational purposes only.</p>
        </div>
      </footer>
    </div>
  );
}
