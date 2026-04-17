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
  schoolhouse: encode("A modern sustainable schoolhouse in the Colombian highlands, single-story building wi 869429.png"),
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
    title: "Residential & Artisan Village",
    tag: "The Neighborhood",
    desc: "A curated mix of villas, casitas, live-work studios, artisan shops, and artisan homes woven together as a single neighborhood. Fractional ownership alongside full residences. Local Colombian artisans, farmers, and makers living alongside international residents — creating a productive community rooted in shared values and regenerative practices.",
    note: "Locals and internationals as neighbors, not amenities.",
    img: IMG.finca,
  },
  {
    num: "02",
    title: "The ChoZen Village",
    tag: "The Heart of Daily Life",
    desc: "The heart of everyday life — a walkable downtown with restaurants, a farm store, small businesses, and gathering spaces that serve both the community and the surrounding region. Not a gated enclave, but an open village that creates a positive impact on the local area.",
    note: "Farmers markets, artisan markets, and authentic ground-level commerce that makes a place feel alive.",
    img: IMG.artisanVillage,
  },
  {
    num: "03",
    title: "Retreat & Wellness Center",
    tag: "The Sanctuary",
    desc: "An intimate sanctuary for transformational programming, healing, and immersive nature-based experiences — the spiritual heart of the community and a gateway for outside guests. Bamboo pavilions, natural stone pools, and open-air spaces designed to honor the landscape.",
    note: "If the land allows, natural thermal springs — Colombia's thermales — woven into the wellness experience.",
    img: IMG.wellnessRetreat,
  },
  {
    num: "04",
    title: "Click Clack Hotel & Wellness Center",
    tag: "The Front Door",
    desc: "A Click Clack within the ChoZen community. Design-forward, culturally rooted, world-class Colombian hospitality — approximately 100 rooms bringing Click Clack's operational credibility and design sensibility to the highlands. The architecture draws on modern finca tradition with Japanese-Colombian design influences, inspired by the work of Simón Vélez, Colombia's master bamboo architect, and Kengo Kuma, the Japanese architect behind Click Clack's design language.",
    note: "Click Clack manages the hotel, wellness center, and retreat operations. The brand is ChoZen Colombia.",
    img: IMG.boutiqueHotel,
    cobrand: CLICK_CLACK_LOGO,
  },
  {
    num: "05",
    title: "The Farm",
    tag: "The Foundation",
    desc: "Agriculture is not an amenity here — it is the foundation. Working coffee plantations, organic vegetable gardens, avocado groves, fruit orchards, and food forests integrated throughout the community. Horses, equestrian trails, and a deep connection to the agricultural heritage of the region.",
    note: "Sustained through the HOA — making regenerative agriculture a permanent part of the community's economy, not a phase.",
    img: IMG.farm,
  },
  {
    num: "06",
    title: "School",
    tag: "Future Phase",
    desc: "Green School meets STEM academy. A purpose-built learning environment where children learn pottery alongside programming, regenerative farming alongside robotics, indigenous knowledge alongside artificial intelligence. Medellín is the startup capital of Latin America — and this school will reflect that innovation culture while staying rooted in the land.",
    note: "A school good enough that anyone in the world would want their children there.",
    img: IMG.schoolhouse,
  },
];

const SUSTAIN = [
  { key: "Energy", desc: "Hydroelectric, solar, and geothermal where appropriate. Battery storage throughout. Targeting net-zero or net-positive for the entire community." },
  { key: "Water", desc: "Rainwater harvesting, greywater recycling, and closed-loop irrigation feeding the agricultural components." },
  { key: "Building", desc: "Rammed earth, bamboo, locally-sourced timber, living roofs. Modern finca architecture — contemporary yet rooted in Antioqueño tradition." },
  { key: "Conservation", desc: "Protected cloud forest, native planting corridors, watershed restoration, and regenerative land management as core elements — not afterthoughts." },
  { key: "Food", desc: "Integrated working farms, farm-to-table restaurant, farm store, and food forests as productive infrastructure serving the entire community." },
];

const PARTNERS = [
  {
    name: "ChoZen",
    role: "The Brand",
    desc: "The primary brand of the community — the residential village, the artisan neighborhood, the farm, the trails, the school, and the overall identity. A proven framework for intentional community development.",
  },
  {
    name: "Future of Cities",
    role: "The Developer",
    desc: "Master developer bringing 20 years of regenerative placemaking. Tony Cho's track record — Wynwood, Magic City, Phoenix Arts & Innovation District, and ChoZen — represents one of the most accomplished portfolios in purpose-driven development. FOC also brings its own certification framework — the Future of Cities Regenerative Placemaking Standards — ensuring every aspect of the project meets the highest benchmarks.",
  },
  {
    name: "Landowner Partners",
    role: "The Local Knowledge",
    desc: "Colombian family offices contributing land and local knowledge. Land is contributed as equity — landowners become co-owners of the community's upside, not one-time sellers. They bring irreplaceable sites, ecological knowledge, established community relationships, and the trust that only local partners can provide.",
  },
  {
    name: "Click Clack",
    role: "Hospitality & Operations",
    desc: "Operates the boutique hotel, wellness center, and retreat within the ChoZen community — bringing design sensibility, brand, and operational infrastructure. Click Clack also participates in capital sourcing, leveraging its investor network, Colombian family office relationships, and international buyer network.",
    logo: CLICK_CLACK_LOGO,
  },
];

const SITES = [
  {
    name: "Retiro",
    region: "Antioquia",
    desc: "A premier municipality known for natural beauty, temperate climate, and proximity to Medellín's most sought-after countryside communities.",
    tag: "Highland Site",
  },
  {
    name: "Santa Bárbara",
    region: "Antioquia",
    desc: "Includes a world-class working coffee operation. The combination of coffee culture, agricultural heritage, and landscape quality is rare and deeply aligned with ChoZen's vision.",
    tag: "Coffee Heritage",
  },
  {
    name: "Click Clack Farm",
    region: "Colombia",
    desc: "Land integrated with Click Clack's existing farm and hospitality operations. Offers the fastest path to a functioning hotel and retreat from day one.",
    tag: "Fastest Launch",
  },
];

const STEPS = [
  { n: "01", label: "Joint Site Visits", desc: "All partners visit the three candidate sites together." },
  { n: "02", label: "Site Selection", desc: "Based on feasibility and mutual agreement." },
  { n: "03", label: "Master Plan Scoping", desc: "First Principles workshop with all partners." },
  { n: "04", label: "Partnership Agreement", desc: "Formal structure and roles finalized." },
  { n: "05", label: "Capital Assembly", desc: "Pre-sales and capital raised through FOC's international network." },
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
          <p className="colHeroEyebrow">Future of Cities · ChoZen · April 2026</p>
          <h1 className="colHeroTitle">
            <span>Chozen</span>
            <span className="colHeroTitleItalic">Colombia</span>
          </h1>
          <div className="colHeroLine" />
          <p className="colHeroSub">A Regenerative Community in the Colombian Highlands</p>
          <p className="colHeroLocation">Medellín · Antioquia</p>
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
            <p className="colEyebrow">The Invitation</p>
          </FadeIn>
          <TextReveal className="colManifestoText">
            ChoZen Colombia is an invitation — to live <em>differently</em>, to build <em>differently</em>, and to reconnect with what matters most.
          </TextReveal>
          <FadeIn delay={0.2}>
            <div className="colManifestoBody">
              <p>Set within the mountains of Antioquia — surrounded by cloud forest, river valleys, waterfalls, and working plantations — ChoZen Colombia will be the most purposeful realization of the ChoZen concept to date.</p>
              <p>This is <strong>not a real estate development</strong>. It is a living community built around wellbeing, regenerative agriculture, and a deep connection to the land and culture of Colombia. Local Colombian families and international residents coming together — aligned by shared values — into a single, beautifully diverse community where artisans, farmers, and makers are neighbors, not amenities.</p>
              <p>Antioqueño modern architecture with a touch of ChoZen zen — whitewashed walls, natural wood beams, terracotta tile, open-air corridors, handcrafted ceramic details, bamboo structures inspired by Colombia's master builders — set against one of the most extraordinary landscapes on earth.</p>
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
              <FadeIn><p className="colEyebrow">Why Medellín</p></FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="colHowTitle">One hour to<br/><em>the destination.</em></h2>
              </FadeIn>
            </div>
            <div className="colHowBody">
              <FadeIn delay={0.15}>
                <p>65 to 75°F year-round, surrounded by green mountains, and consistently ranked among the world&apos;s most innovative and livable cities.</p>
                <p>Direct flights from major cities across the United States and Latin America. A thriving startup and innovation culture that has made it the entrepreneurial capital of the region. A city that planted eight million trees and lowered its temperature through urban design. World-class dining, art, and culture — all within an hour of ChoZen Colombia and the new international airport.</p>
                <p><em>This is the gateway. ChoZen Colombia is the destination.</em></p>
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
            <FadeIn><p className="colEyebrow">The Community</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">Five interconnected components.<br/><em>A sixth to follow.</em></h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="colSecDesc">ChoZen Colombia brings together six interconnected components. Each reinforces the others. Together they form something none of them could alone.</p>
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
            <p className="colEyebrowLight">Woven Throughout</p>
            <h2 className="colWovenTitle">Trails. Waterfalls. Equestrian paths.<br/>Rivers. Cloud forest. <em>The land itself.</em></h2>
            <p className="colWovenText">The components above are connected by trails, small retail and gathering spaces, and the natural landscape itself. Every corner of the community reflects local culture, artisan craft, and indigenous inspiration.</p>
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
            <FadeIn><p className="colEyebrowGold">Self-Sufficient by Design</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitleLight">Regenerative development<br/><em>in practice.</em></h2>
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
            <FadeIn><p className="colEyebrow">The Partnership</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">Four partners.<br/><em>One community.</em></h2>
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
              <FadeIn><p className="colEyebrow">How It Works</p></FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="colHowTitle">The structure is simple.<br/><em>The intention is the point.</em></h2>
              </FadeIn>
            </div>
            <div className="colHowBody">
              <FadeIn delay={0.15}>
                <p>The landowner contributes the land. Future of Cities is the lead developer and general partner, contributing startup capital and the ChoZen brand and IP. The hospitality partner helps raise capital and contributes operational expertise. Equity is raised to fund infrastructure and development. Home sales generate returns for all partners.</p>
                <p>There are opportunities at every level for local partners to participate — in construction oversight, in operations, in the living economy of the community itself. The structure rewards contribution, and the specifics will be shaped by what each partner brings to the table.</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ THE SITES ═══ */}
      <section className="colSec colSecCream" id="sites">
        <div className="colWrap">
          <div className="colSecHead">
            <FadeIn><p className="colEyebrow">The Sites</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">Three extraordinary sites<br/><em>in Antioquia.</em></h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="colSecDesc">Final selection will follow joint site visits and feasibility analysis.</p>
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
            <FadeIn><p className="colEyebrow">Next Steps</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">The path<br/><em>forward.</em></h2>
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

      {/* ═══ GALLERY — life in the community ═══ */}
      <section className="colGallerySec">
        <div className="colWrap">
          <div className="colSecHead">
            <FadeIn><p className="colEyebrow">The Feeling</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="colSecTitle">Horses in the meadow.<br/><em>Long tables at dusk.</em></h2>
            </FadeIn>
          </div>
          <div className="colGallery">
            {GALLERY.map((g, i) => (
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
              Colombia has everything that a ChoZen community needs — the land, the culture, the people, the story. What has been missing is the framework that can hold it all together and bring it to the world with the depth and integrity it deserves.
            </blockquote>
            <blockquote className="colQuoteText colQuoteText2">
              I am not interested in building another development. I am interested in building something that <em>lasts</em>.
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
          <div className="colContactGrid">
            <div>
              <FadeIn><p className="colEyebrow">Connect</p></FadeIn>
              <FadeIn delay={0.1}>
                <h2 className="colContactTitle">Begin the<br/><em>conversation.</em></h2>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="colContactBody">
                  If you are a landowner, investor, hospitality partner, or future resident who feels aligned with this vision — we would like to meet you in Medellín.
                </p>
                <div className="colContactLinks">
                  <a href="mailto:hello@chozen.com" className="colContactLink">hello@chozen.com</a>
                  <span className="colContactDot">·</span>
                  <a href="https://futureofcities.co" target="_blank" rel="noreferrer" className="colContactLink">futureofcities.co</a>
                </div>
              </FadeIn>
            </div>
            <FadeIn delay={0.25}>
              <ContactForm />
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
            <p className="colFooterMeta">
              <a href="/v2">View 2025 Brand & IP Deck →</a>
            </p>
          </div>
          <div className="colFooterLine" />
          <p className="colFooterMeta colFooterMetaCenter">Future of Cities · ChoZen · Cho Ventures · April 2026</p>
          <p className="colFooterSmall">© 2026 Cho Ventures. All rights reserved. ChoZen® is a registered mark.</p>
        </div>
      </footer>
    </div>
  );
}
