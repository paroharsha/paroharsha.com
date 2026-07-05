// app.jsx — main shell that wires Nav + pages + Tweaks

const { useState: useStateA, useEffect: useEffectA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "typography": "hand",
  "archive_style": "gallery",
  "story_layout": "side-by-side",
  "motion": 1,
  "background": "paper",
  "showTarot": true,
  "cursorTrail": false
}/*EDITMODE-END*/;

// Hand-lettered display faces paired with a readable serif body.
// Flip through these live in the Tweaks panel to choose the handwriting.
const FONT_PAIRS = {
  hand:   { display: '"Caveat", "Bradley Hand", cursive',      body: '"Newsreader", Georgia, serif', label: "Hand" },
  marker: { display: '"Shantell Sans", "Comic Sans MS", cursive', body: '"Newsreader", Georgia, serif', label: "Marker" },
  pen:    { display: '"Kalam", "Bradley Hand", cursive',       body: '"Newsreader", Georgia, serif', label: "Pen" },
  casual: { display: '"Gochi Hand", "Bradley Hand", cursive',  body: '"Newsreader", Georgia, serif', label: "Casual" },
};

// Cool grey paper grounds — a quiet vertical shade, no motion.
const BG_VARIANTS = {
  paper:  { from:"#e8e7e0", to:"#e0dfd7" },
  ash:    { from:"#e6e5df", to:"#dcdbd2" },
  fog:    { from:"#eae9e3", to:"#e1e0d8" },
  slate:  { from:"#e4e3dd", to:"#d8d7ce" },
  chalk:  { from:"#eeede7", to:"#e5e4dc" },
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
    const bg = BG_VARIANTS[t.background] || BG_VARIANTS.paper;
    const cosmos = document.querySelector('.cosmos');
    if(cosmos){
      cosmos.style.background = `linear-gradient(180deg, ${bg.from} 0%, ${bg.to} 100%)`;
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
        background:var(--blush); pointer-events:none; z-index:9999;
        box-shadow:0 0 12px var(--blush);
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
          options={["hand","marker","pen","casual"]}
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
          options={["paper","ash","fog","slate","chalk"]}
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
        <Star size={16} color="var(--ink)" style={{ marginRight:0 }}/>
        <span>Marginalia</span>
      </button>
      <div className="nav-links">
        <button className={route.page==='home' ? 'active' : ''} onClick={()=>go('home')}>Home</button>
        <button className={route.page==='about' ? 'active' : ''} onClick={()=>go('about')}>About</button>
        <button className={(route.page==='art' || route.page==='story') ? 'active' : ''} onClick={()=>go('art')}>Art &amp; Stories</button>
      </div>
      <div className="nav-meta">
        <Star size={11}/>{new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' })}
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
      <button
        className="glass"
        onClick={()=> onOpen(q.id)}
        style={{
          maxWidth:920,
          textAlign:"center",
          cursor:"pointer",
          padding:"40px 48px",
          opacity: phase==="in" ? 1 : 0,
          transform: phase==="in" ? "translateY(0)" : "translateY(10px)",
          transition:"opacity .8s ease, transform 1s ease",
          position:"relative", zIndex:2
        }}
      >
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, marginBottom:26 }}>
          <span style={{ flex:"0 0 70px", height:1, background:"var(--line-strong)" }}/>
          <Star size={16} color="var(--accent)" style={{ marginRight:0 }}/>
          <span style={{ flex:"0 0 70px", height:1, background:"var(--line-strong)" }}/>
        </div>
        <p style={{
          fontFamily:"var(--font-display)",
          fontWeight:500,
          fontSize:"clamp(26px, 3.4vw, 46px)",
          lineHeight:1.2,
          margin:0,
          color:"var(--ink)",
          textWrap:"balance"
        }}>
          “{q.text}”
        </p>
        <div style={{
          marginTop:28,
          fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:"0.24em",
          textTransform:"uppercase", color:"var(--ink-dim)"
        }}>
          <Star size={12}/><span style={{ color:"var(--ink)" }}>{q.title}</span> · {q.date} · <span style={{ color:"var(--blush)" }}>read &rarr;</span>
        </div>

        {/* tiny progress dots */}
        <div style={{ marginTop:24, display:"flex", justifyContent:"center", gap:7 }}>
          {quotes.map((_,i)=>(
            <span key={i} style={{
              width: i===idx ? 18 : 4,
              height:4, borderRadius:2,
              background: i===idx ? "var(--blush)" : "var(--line-strong)",
              transition:"all .5s ease"
            }}/>
          ))}
        </div>
      </button>
    </section>
  );
}

// ---- Latest pieces strip on home ----
function LatestStrip({ onOpen, onAll }){
  const latest = PIECES.slice(0, 4);
  return (
    <section id="latest" style={{ padding:"40px 36px 60px", maxWidth:1400, margin:"0 auto" }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center", marginBottom:32, gap:20 }}>
        <div>
          <div className="eyebrow">Recent</div>
          <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(36px, 5vw, 60px)", marginTop:6 }}>
            Latest from the studio
          </h2>
        </div>
        <div style={{ display:"inline-block" }}>
          <button className="btn btn-ghost" onClick={onAll}>Browse the archive →</button>
        </div>
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
        borderRadius:3,
        overflow:"hidden",
        border:"1px solid var(--line)",
        transition:"all .3s ease",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hover ? "0 18px 34px -26px rgba(27,24,19,0.5)" : "none",
        borderColor: hover ? "var(--line-strong)" : "var(--line)",
        background:"var(--paper)",
        display:"flex",
        flexDirection:"column"
      }}
    >
      <div style={{ aspectRatio:"4/5", position:"relative", overflow:"hidden", background:"var(--bg-1)" }}>
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
              <Star size={56} color="var(--ink)" style={{ marginRight:0 }}/>
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
        <h3 style={{ fontFamily:"var(--font-display)", fontSize:22, lineHeight:1.1, marginBottom:8, color:"var(--ink)" }}>
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
        <div className="mono" style={{ marginBottom:14, color:"var(--sky)" }}><Star size={11}/>Stay in touch</div>
        <div style={{ fontFamily:"var(--font-display)", fontWeight:500, fontSize:23 }}>
          <a href="mailto:paromita.harsha@gmail.com">paromita.harsha@gmail.com</a>
        </div>
        <div style={{ marginTop:8, fontFamily:"var(--font-mono)", fontSize:12, color:"var(--ink-dim)" }}>
          +91 6362428416
        </div>
      </div>
      <div className="center">
        <div style={{
          fontFamily:"var(--font-display)",
          fontWeight:500,
          fontSize:22,
          lineHeight:1.25,
          color:"var(--ink-dim)",
          maxWidth:340,
          margin:"0 auto"
        }}>
          “Hidden, somewhere on the canvas, is a memory or a moment for everyone who sees it.”
        </div>
      </div>
      <div className="right">
        <div className="mono" style={{ marginBottom:14, color:"var(--sky)" }}>Elsewhere</div>
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
