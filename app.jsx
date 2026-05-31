// app.jsx — main shell that wires Nav + pages + Tweaks

const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "typography": "ethereal",
  "archive_style": "gallery",
  "story_layout": "side-by-side",
  "motion": 1,
  "background": "nocturne",
  "showTarot": true,
  "cursorTrail": true
}/*EDITMODE-END*/;

const FONT_PAIRS = {
  ethereal:  { display: '"Cormorant Garamond", serif',  body: '"Spectral", Georgia, serif',     label: "Ethereal" },
  editorial: { display: '"Playfair Display", serif',    body: '"EB Garamond", Georgia, serif',  label: "Editorial" },
  tension:   { display: '"DM Serif Display", serif',    body: '"JetBrains Mono", monospace',    label: "Tension" },
  modern:    { display: '"Bodoni Moda", serif',         body: '"Public Sans", sans-serif',      label: "Modern" },
};

const BG_VARIANTS = {
  nocturne:  { from:"#070817", mid:"#0c0815", to:"#1a0f2b", a:"rgba(110,31,58,0.18)",  b:"rgba(61,30,61,0.20)",   c:"rgba(0,0,0,0)" },
  bloodmoon: { from:"#1a0a0a", mid:"#2a0a14", to:"#0e0612", a:"rgba(193,74,54,0.30)",  b:"rgba(122,46,122,0.30)", c:"rgba(227,176,71,0.18)" },
  emerald:   { from:"#04130d", mid:"#0a2418", to:"#10142e", a:"rgba(31,122,91,0.40)",  b:"rgba(110,31,58,0.30)",  c:"rgba(227,176,71,0.16)" },
  parchment: { from:"#1a1408", mid:"#221c0c", to:"#0c0a06", a:"rgba(227,176,71,0.32)",  b:"rgba(193,74,54,0.20)",  c:"rgba(122,46,122,0.16)" },
  void:      { from:"#050510", mid:"#06060f", to:"#080816", a:"rgba(0,0,0,0)",          b:"rgba(0,0,0,0)",          c:"rgba(0,0,0,0)" },
};

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useStateA({ page: "home", piece: null });
  const [tarotOpen, setTarotOpen] = useStateA(false);

  // apply tweaks to CSS vars
  useEffectA(()=>{
    const f = FONT_PAIRS[t.typography] || FONT_PAIRS.ethereal;
    document.documentElement.style.setProperty('--font-display', f.display);
    document.documentElement.style.setProperty('--font-body', f.body);
    document.documentElement.style.setProperty('--motion', t.motion);
    const bg = BG_VARIANTS[t.background] || BG_VARIANTS.nocturne;
    const cosmos = document.querySelector('.cosmos');
    if(cosmos){
      cosmos.style.background = `
        radial-gradient(1200px 800px at 18% 12%, ${bg.a}, transparent 60%),
        radial-gradient(900px 700px at 86% 24%, ${bg.b}, transparent 60%),
        radial-gradient(900px 700px at 60% 96%, ${bg.c}, transparent 60%),
        linear-gradient(180deg, ${bg.from} 0%, ${bg.mid} 60%, ${bg.to} 100%)
      `;
    }
  }, [t.typography, t.motion, t.background]);

  // cursor trail
  useEffectA(()=>{
    if(!t.cursorTrail) return;
    const trail = [];
    function onMove(e){
      const dot = document.createElement('div');
      dot.style.cssText = `
        position:fixed; left:${e.clientX-3}px; top:${e.clientY-3}px;
        width:6px; height:6px; border-radius:50%;
        background:var(--gold); pointer-events:none; z-index:9999;
        box-shadow:0 0 12px var(--gold);
        transition:opacity .8s ease, transform .8s ease;
        opacity:.85;
      `;
      document.body.appendChild(dot);
      trail.push(dot);
      requestAnimationFrame(()=>{ dot.style.opacity = "0"; dot.style.transform = "scale(0.2)"; });
      setTimeout(()=>{ dot.remove(); }, 900);
      if(trail.length > 30){
        const o = trail.shift(); o?.remove();
      }
    }
    window.addEventListener('mousemove', onMove);
    return ()=>{
      window.removeEventListener('mousemove', onMove);
      trail.forEach(d=>d.remove());
    };
  }, [t.cursorTrail]);

  function go(page){
    setRoute({ page, piece: null });
    window.scrollTo({ top:0, behavior:'smooth' });
  }
  function openPiece(id){
    setRoute({ page: "story", piece: id });
    window.scrollTo({ top:0, behavior:'smooth' });
  }
  function backToArchive(maybeNewId){
    if(typeof maybeNewId === 'string'){
      setRoute({ page:"story", piece: maybeNewId });
      window.scrollTo({ top:0, behavior:'smooth' });
    } else {
      setRoute({ page:"art", piece: null });
      window.scrollTo({ top:0, behavior:'smooth' });
    }
  }

  return (
    <>
      <Nav route={route} go={go}/>
      <main>
        {route.page === "home" && (
          <div className="page">
            <Hero
              density="regular"
              onOpenFeatured={()=> setTarotOpen(true)}
            />
            <DriftingQuote onOpen={openPiece}/>
            <LatestStrip onOpen={openPiece} onAll={()=>go('art')}/>
          </div>
        )}
        {route.page === "about" && <div className="page"><About/></div>}
        {route.page === "art" && (
          <div className="page">
            <Gallery
              style={t.archive_style}
              onOpen={openPiece}
            />
          </div>
        )}
        {route.page === "story" && (
          <div className="page">
            <StoryView pieceId={route.piece} onBack={backToArchive} layout={t.story_layout}/>
          </div>
        )}
      </main>
      <Footer/>

      {tarotOpen && t.showTarot && (
        <TarotDraw onClose={()=>setTarotOpen(false)} onOpen={openPiece}/>
      )}

      <TweaksPanel>
        <TweakSection label="Typography"/>
        <TweakRadio
          label="Font pair"
          value={t.typography}
          options={["ethereal","editorial","tension","modern"]}
          onChange={(v)=>setTweak('typography', v)}
        />

        <TweakSection label="Layout"/>
        <TweakRadio
          label="Archive"
          value={t.archive_style}
          options={["gallery","mosaic","list"]}
          onChange={(v)=>setTweak('archive_style', v)}
        />
        <TweakRadio
          label="Story"
          value={t.story_layout}
          options={["side-by-side","stacked","woven"]}
          onChange={(v)=>setTweak('story_layout', v)}
        />

        <TweakSection label="Atmosphere"/>
        <TweakSelect
          label="Background"
          value={t.background}
          options={["nocturne","bloodmoon","emerald","parchment","void"]}
          onChange={(v)=>setTweak('background', v)}
        />
        <TweakSlider
          label="Motion"
          value={t.motion}
          min={0} max={2} step={0.1}
          onChange={(v)=>setTweak('motion', v)}
        />
        <TweakToggle
          label="Cursor trail"
          value={t.cursorTrail}
          onChange={(v)=>setTweak('cursorTrail', v)}
        />
        <TweakToggle
          label="Tarot draw"
          value={t.showTarot}
          onChange={(v)=>setTweak('showTarot', v)}
        />
      </TweaksPanel>
    </>
  );
}

// ---- Nav ----
function Nav({ route, go }){
  return (
    <nav className="top">
      <button className="mark" onClick={()=>go('home')}>
        <span className="dot"/>
        <span>Margin<span className="italic" style={{ color:"var(--gold)" }}>alia</span></span>
      </button>
      <div className="nav-links">
        <button className={route.page==='home' ? 'active' : ''} onClick={()=>go('home')}>Home</button>
        <button className={route.page==='about' ? 'active' : ''} onClick={()=>go('about')}>About</button>
        <button className={(route.page==='art' || route.page==='story') ? 'active' : ''} onClick={()=>go('art')}>Art &amp; Stories</button>
      </div>
      <div className="nav-meta">
        ✦ {new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })}
      </div>
    </nav>
  );
}

// ---- DriftingQuote: rotating marginalia between hero & latest ----
function DriftingQuote({ onOpen }){
  const quotes = React.useMemo(()=> PIECES
    .filter(p => p.excerpt)
    .map(p => ({ id:p.id, title:p.title, date:p.date, text:p.excerpt, glyph:p.glyph })),
  []);
  const [idx, setIdx] = useStateA(0);
  const [phase, setPhase] = useStateA("in"); // in | out
  const [paused, setPaused] = useStateA(false);

  useEffectA(()=>{
    if(paused) return;
    let alive = true;
    const out = setTimeout(()=>{ if(!alive) return; setPhase("out"); }, 7400);
    const swap = setTimeout(()=>{
      if(!alive) return;
      setIdx(i => (i + 1) % quotes.length);
      setPhase("in");
    }, 8200);
    return ()=>{ alive=false; clearTimeout(out); clearTimeout(swap); };
  }, [idx, paused, quotes.length]);

  const q = quotes[idx];
  if(!q) return null;

  return (
    <section
      onMouseEnter={()=>setPaused(true)}
      onMouseLeave={()=>setPaused(false)}
      style={{
        position:"relative",
        padding:"40px 36px 30px",
        display:"flex", alignItems:"center", justifyContent:"center",
        minHeight:"38vh"
      }}
    >
      {/* shooting stars streaming left → right across the band */}
      <SweepStars/>

      <button
        onClick={()=> onOpen(q.id)}
        style={{
          maxWidth:920,
          textAlign:"center",
          cursor:"pointer",
          padding:"32px 24px",
          opacity: phase==="in" ? 1 : 0,
          transform: phase==="in" ? "translateY(0)" : "translateY(10px)",
          transition:"opacity .8s ease, transform 1s ease",
          position:"relative", zIndex:2
        }}
      >
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:26 }}>
          <span style={{ flex:"0 0 90px", height:1, background:"var(--line-strong)" }}/>
          <span style={{
            width:8, height:8, background:"var(--gold)", borderRadius:"50%",
            boxShadow:"0 0 18px var(--gold)",
            animation:"pulse 4s ease-in-out infinite"
          }}/>
          <span style={{ flex:"0 0 90px", height:1, background:"var(--line-strong)" }}/>
        </div>
        <p style={{
          fontFamily:"var(--font-display)",
          fontStyle:"italic",
          fontSize:"clamp(26px, 3.6vw, 48px)",
          lineHeight:1.3,
          margin:0,
          color:"var(--ink)",
          textWrap:"balance",
          fontWeight:400
        }}>
          “{q.text}”
        </p>
        <div style={{
          marginTop:28,
          fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:"0.24em",
          textTransform:"uppercase", color:"var(--ink-dim)"
        }}>
          ✶ <span style={{ color:"var(--ink)" }}>{q.title}</span> · {q.date} · <span style={{ color:"var(--gold)" }}>read &rarr;</span>
        </div>

        {/* tiny progress dots */}
        <div style={{ marginTop:24, display:"flex", justifyContent:"center", gap:7 }}>
          {quotes.map((_,i)=>(
            <span key={i} style={{
              width: i===idx ? 18 : 4,
              height:4, borderRadius:2,
              background: i===idx ? "var(--gold)" : "var(--line-strong)",
              transition:"all .5s ease"
            }}/>
          ))}
        </div>
      </button>
    </section>
  );
}

function SweepStars(){
  // a stream of horizontal shooting stars — start off-screen left, exit off-screen right
  const stars = React.useMemo(()=> Array.from({length: 18}, (_,i)=>{
    const length = 90 + Math.random()*140;
    const topPct = -6 + Math.random()*112;        // distribute across the band
    const delay = Math.random() * 18;
    const duration = 5 + Math.random()*4;         // 5–9s traversal — slower, streamier
    const thickness = 1 + Math.random()*1.6;
    const hue = Math.random() < 0.18 ? "rose" : "gold";
    return { id:i, length, topPct, delay, duration, thickness, hue };
  }), []);

  const tailColor = (h) => h === "rose"
    ? "linear-gradient(90deg, transparent 0%, rgba(224,123,158,0.5) 60%, rgba(255,239,235,1) 100%)"
    : "linear-gradient(90deg, transparent 0%, rgba(227,176,71,0.55) 60%, rgba(255,247,223,1) 100%)";
  const headShadow = (h) => h === "rose"
    ? "0 0 12px rgba(224,123,158,0.95), 0 0 22px rgba(224,123,158,0.55)"
    : "0 0 12px rgba(227,176,71,0.95), 0 0 22px rgba(227,176,71,0.55)";

  return (
    <div aria-hidden="true" style={{
      position:"absolute",
      top:0, left:0, right:0, bottom:0,
      pointerEvents:"none",
      overflow:"visible",
      zIndex: 1
    }}>
      {stars.map(s => {
        const animName = `sweep-${s.id}`;
        return (
          <div key={s.id} style={{
            position:"absolute",
            top: s.topPct + "%",
            left: -(s.length + 40) + "px",   // anchor entirely off-screen left
            width: s.length, height: s.thickness,
            animation: `${animName} ${s.duration}s linear ${s.delay}s infinite`,
            willChange: "transform, opacity",
            mixBlendMode: "screen"
          }}>
            <div style={{
              position:"absolute", inset:0,
              background: tailColor(s.hue),
              borderRadius:999,
              filter:"drop-shadow(0 0 6px rgba(227,176,71,0.55))"
            }}/>
            <div style={{
              position:"absolute", top:"50%", right:-2,
              width: 5+s.thickness, height: 5+s.thickness,
              marginTop:-(5+s.thickness)/2, borderRadius:"50%",
              background: s.hue === "rose" ? "#ffeae8" : "#fff7df",
              boxShadow: headShadow(s.hue)
            }}/>
          </div>
        );
      })}
      <style>{`
        ${stars.map(s => `
          @keyframes sweep-${s.id} {
            0%   { transform: translateX(0); opacity:0; }
            6%   { opacity:1; }
            90%  { opacity:1; }
            100% { transform: translateX(calc(100vw + ${(s.length + 120)}px)); opacity:0; }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
}

// ---- Latest pieces strip on home ----
function LatestStrip({ onOpen, onAll }){
  const latest = PIECES.slice(0, 4);
  return (
    <section id="latest" style={{ padding:"40px 36px 60px", maxWidth:1400, margin:"0 auto" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:24, flexWrap:"wrap", gap:12 }}>
        <div>
          <div className="eyebrow">Recent</div>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(36px, 5vw, 60px)", marginTop:6 }}>
            Latest from the studio
          </h2>
        </div>
        <button className="btn btn-ghost" onClick={onAll}>See the full archive →</button>
      </div>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))",
        gap:20
      }}>
        {latest.map((p, i)=>(
          <PieceCard key={p.id} piece={p} onClick={()=>onOpen(p.id)} large={i===0}/>
        ))}
      </div>
    </section>
  );
}

function PieceCard({ piece, onClick, large }){
  const [hover, setHover] = useStateA(false);
  return (
    <article
      onClick={onClick}
      onMouseEnter={(e)=>{ setHover(true); window.burstStars && window.burstStars(e.currentTarget, { count: 8 }); }}
      onMouseLeave={()=>setHover(false)}
      style={{
        cursor:"pointer",
        borderRadius:14,
        overflow:"hidden",
        border:"1px solid var(--line)",
        transition:"all .3s ease",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover ? "0 30px 60px -20px rgba(0,0,0,0.6)" : "none",
        background:"rgba(14,17,48,0.4)",
        backdropFilter:"blur(8px)",
        display:"flex",
        flexDirection:"column"
      }}
    >
      <div style={{ aspectRatio:"4/5", position:"relative", overflow:"hidden", background:"rgba(7,8,23,0.55)" }}>
        {piece.image ? (
          <img
            src={piece.image}
            alt={piece.title}
            loading="lazy"
            style={{
              position:"absolute", inset:0, width:"100%", height:"100%",
              objectFit:"contain",
              padding:"10px",
              transition:"transform .9s ease, filter .6s ease",
              transform: hover ? "scale(1.03)" : "scale(1)",
              filter: hover ? "brightness(1.05)" : "brightness(0.98)"
            }}
          />
        ) : (
          <>
            <div
              className="ph-art"
              style={{
                "--c1":piece.palette[0],
                "--c2":piece.palette[1],
                position:"absolute", inset:0,
                transition:"transform .8s ease",
                transform: hover ? "scale(1.06)" : "scale(1)",
                flexDirection:"column",
                gap:10
              }}
            >
              <PieceGlyph kind={piece.glyph} size={64} color="rgba(239,226,194,0.7)"/>
            </div>
            <image-slot
              id={`card-${piece.id}`}
              shape="rect"
              placeholder=""
              style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}
            ></image-slot>
          </>
        )}
      </div>
      <div style={{ padding:"20px 22px 22px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.2em", color:"var(--ink-faint)", textTransform:"uppercase", marginBottom:10 }}>
          <span>{piece.date}</span>
          <span>{piece.read || "—"}</span>
        </div>
        <h3 style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:24, marginBottom:6, color:"var(--ink)" }}>
          {piece.title}
        </h3>
        <p style={{ color:"var(--ink-dim)", fontSize:14, margin:0, textWrap:"pretty" }}>
          {piece.excerpt}
        </p>
      </div>
    </article>
  );
}

// ---- Footer ----
function Footer(){
  return (
    <footer className="site">
      <div>
        <div className="mono" style={{ marginBottom:14, color:"var(--gold)" }}>✦ Stay in touch</div>
        <div style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:20 }}>
          <a href="mailto:paromita.harsha@gmail.com">paromita.harsha@gmail.com</a>
        </div>
        <div style={{ marginTop:8, fontFamily:"var(--font-mono)", fontSize:12, color:"var(--ink-dim)" }}>
          +91 6362428416
        </div>
      </div>
      <div className="center">
        <div style={{
          fontFamily:"var(--font-display)",
          fontStyle:"italic",
          fontSize:18,
          color:"var(--ink-dim)",
          maxWidth:340,
          margin:"0 auto"
        }}>
          “Hidden, somewhere on the canvas, is a memory or a moment for everyone who sees it.”
        </div>
      </div>
      <div className="right">
        <div className="mono" style={{ marginBottom:14, color:"var(--gold)" }}>Elsewhere</div>
        <div style={{ display:"flex", gap:14, justifyContent:"flex-end", flexWrap:"wrap" }}>
          <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Threads</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Telegram</a>
        </div>
        <div style={{ marginTop:24, fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.2em", color:"var(--ink-faint)", textTransform:"uppercase" }}>
          © {new Date().getFullYear()} Paromita Harsha
        </div>
      </div>
    </footer>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
