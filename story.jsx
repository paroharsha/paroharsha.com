// story.jsx — Story detail (art + writing side-by-side), and the tarot card overlay

const { useState: useStateS, useEffect: useEffectS } = React;

function StoryView({ pieceId, onBack, layout="side-by-side" }){
  const piece = PIECES.find(p => p.id === pieceId);
  if(!piece) return null;

  // related — other pieces, newest first, up to 3 (no duplicates, handles small archives)
  const related = PIECES.filter(p => p.id !== piece.id).slice(0, 3);

  // dropcap on first paragraph
  const story = piece.story || [
    `${piece.excerpt || ''} A piece in process — words to follow.`,
    "Pieces without prose live as images alone, sometimes. Some hum before they speak. Check back, or just sit with the picture for a while."
  ];

  return (
    <section style={{ padding:"40px 36px 100px", maxWidth:1400, margin:"0 auto" }}>
      <div className="glass" style={{ display:"inline-block", padding:"9px 12px", borderRadius:999, marginBottom:32 }}>
        <button onClick={onBack} className="btn btn-ghost">
          ← Back to the garden
        </button>
      </div>

      <header style={{ marginBottom:48 }}>
        <div className="eyebrow" style={{ marginBottom:14 }}>
          {piece.date} · {piece.read || "—"} read
        </div>
        <h1 style={{
          fontFamily:"var(--font-display)",
          fontSize:"clamp(48px, 8vw, 120px)",
          lineHeight:0.95,
          letterSpacing:"-0.02em",
          marginBottom:16
        }}>
          {piece.title}
        </h1>
        <p style={{
          fontFamily:"var(--font-display)",
          fontStyle:"italic",
          fontSize:"clamp(20px, 2vw, 26px)",
          color:"var(--ink-dim)",
          maxWidth:720
        }}>
          {piece.excerpt}
        </p>
      </header>

      {layout === "side-by-side" ? (
        <div className="story-cols" style={{
          display:"grid",
          gridTemplateColumns:"minmax(0, 1fr) minmax(0, 1fr)",
          gap:64,
          alignItems:"start"
        }}>
          <div style={{ position:"sticky", top:90 }}>
            <ArtPlate piece={piece} />
          </div>
          <article className="glass" style={{ padding:"40px 44px" }}>
            <StoryProse story={story} />
            <StoryFooter />
          </article>
        </div>
      ) : layout === "stacked" ? (
        <div>
          <div style={{ marginBottom:48 }}>
            <ArtPlate piece={piece} large />
          </div>
          <article className="glass" style={{ maxWidth:680, margin:"0 auto", padding:"40px 48px" }}>
            <StoryProse story={story}/>
            <StoryFooter />
          </article>
        </div>
      ) : (
        // "woven" — art floats inline between paragraphs
        <article className="glass" style={{ maxWidth:780, margin:"0 auto", padding:"44px 52px" }}>
          {story.map((para, i)=>(
            <React.Fragment key={i}>
              <p style={{
                fontFamily:"var(--font-body)",
                fontSize:19,
                lineHeight:1.65,
                color:"var(--ink)",
                marginBottom:24,
                textWrap:"pretty",
                ...(i === 0 ? { fontSize:22 } : {})
              }}>
                {i===0 ? <span style={{ float:"left", fontFamily:"var(--font-display)", fontSize:78, lineHeight:0.85, marginRight:12, marginTop:4, color:"var(--blush)" }}>{para[0]}</span> : null}
                {i===0 ? para.slice(1) : para}
              </p>
              {i === Math.floor(story.length/2) && (
                <div style={{ margin:"40px auto", maxWidth:520 }}>
                  <ArtPlate piece={piece}/>
                </div>
              )}
            </React.Fragment>
          ))}
          <StoryFooter />
        </article>
      )}

      {/* related */}
      <div style={{ marginTop:96, borderTop:"1px solid var(--line)", paddingTop:36 }}>
        <div className="eyebrow" style={{ marginBottom:24 }}>Growing nearby</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:24 }}>
          {related.map(r => (
            <button key={r.id} className="glass"
              onClick={()=>onBack(r.id)}
              style={{
                textAlign:"left",
                border:"1px solid var(--line)",
                borderRadius:14,
                padding:24,
                cursor:"pointer",
                transition:"all .25s ease",
                color:"inherit"
              }}
              onMouseEnter={e=> { e.currentTarget.style.borderColor = "var(--line-strong)"; e.currentTarget.style.background = "rgba(255,255,255,0.72)"; }}
              onMouseLeave={e=> { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.background = ""; }}
            >
              <div style={{
                width:64, height:64, borderRadius:"50%",
                background:"radial-gradient(circle at 50% 38%, #ffffff, #eef1e4 92%)",
                boxShadow:"inset 0 0 0 1px var(--line)",
                display:"flex", alignItems:"center", justifyContent:"center",
                marginBottom:14
              }}>
                <PieceGlyph kind={r.glyph} size={46}/>
              </div>
              <div style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:22, marginBottom:6 }}>{r.title}</div>
              <div style={{ color:"var(--ink-dim)", fontSize:14 }}>{r.excerpt}</div>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.2em", color:"var(--ink-faint)", textTransform:"uppercase", marginTop:14 }}>
                {r.date} · open ↗
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArtPlate({ piece, large=false }){
  const imgs = piece.images && piece.images.length > 1 ? piece.images : null;
  if(imgs){
    return (
      <figure style={{ margin:0 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
          {imgs.map((src, i) => (
            <div key={i} style={{
              position:"relative",
              width:"100%",
              borderRadius:8,
              overflow:"hidden",
              boxShadow:"0 30px 70px -28px rgba(54,65,44,0.5), 0 0 0 1px var(--line)",
            }}>
              <img src={src} alt={`${piece.title} — ${i+1}`} style={{ display:"block", width:"100%", height:"auto" }}/>
              {i === 0 && (
                <div style={{
                  position:"absolute", left:14, top:14,
                  fontFamily:"var(--font-mono)", fontSize:10,
                  letterSpacing:"0.24em", color:"rgba(239,226,194,0.85)",
                  textTransform:"uppercase",
                  background:"rgba(251,247,234,0.85)",
                  padding:"6px 10px", borderRadius:999,
                  backdropFilter:"blur(6px)"
                }}>
                  <PieceGlyph kind={piece.glyph} size={30}/>
                </div>
              )}
            </div>
          ))}
        </div>
        <figcaption style={{
          marginTop:14,
          fontFamily:"var(--font-mono)", fontSize:11,
          letterSpacing:"0.18em", color:"var(--ink-faint)",
          textTransform:"uppercase",
          display:"flex", justifyContent:"space-between"
        }}>
          <span>{piece.title}</span>
          <span>{piece.date}</span>
        </figcaption>
      </figure>
    );
  }
  return (
    <figure style={{ margin:0 }}>
      {piece.image ? (
        <div style={{
          position:"relative",
          width:"100%",
          borderRadius:8,
          overflow:"hidden",
          boxShadow:"0 30px 70px -28px rgba(54,65,44,0.5), 0 0 0 1px var(--line)",
        }}>
          <img src={piece.image} alt={piece.title} style={{
            display:"block", width:"100%", height:"auto"
          }}/>
          <div style={{
            position:"absolute", left:14, top:14,
            fontFamily:"var(--font-mono)", fontSize:10,
            letterSpacing:"0.24em", color:"var(--cream)",
            textTransform:"uppercase",
            background:"rgba(251,247,234,0.85)",
            padding:"6px 10px", borderRadius:999,
            backdropFilter:"blur(6px)"
          }}>
            <PieceGlyph kind={piece.glyph} size={30}/>
          </div>
        </div>
      ) : (
        <div style={{
          position:"relative",
          width:"100%",
          aspectRatio: large ? "16/10" : "3/4",
          borderRadius:8,
          overflow:"hidden",
          boxShadow:"0 30px 70px -28px rgba(54,65,44,0.5), 0 0 0 1px var(--line)",
        }}>
          <div
            className="ph-art"
            style={{
              "--c1": piece.palette[0],
              "--c2": piece.palette[1],
              position:"absolute", inset:0,
              flexDirection:"column",
              gap:18
            }}
          >
            <PieceGlyph kind={piece.glyph} size={140} color="rgba(239,226,194,0.55)"/>
            <div style={{ opacity:0.8, fontFamily:"var(--font-mono)", fontSize:10 }}>
              // drop your artwork here
            </div>
            <div style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:20, opacity:0.85 }}>
              {piece.title}
            </div>
          </div>
          <image-slot
            id={`art-${piece.id}`}
            shape="rect"
            placeholder=""
            style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}
          ></image-slot>
          <div style={{
            position:"absolute", left:14, top:14,
            fontFamily:"var(--font-mono)", fontSize:10,
            letterSpacing:"0.24em", color:"var(--cream)",
            textTransform:"uppercase",
            background:"rgba(251,247,234,0.85)",
            padding:"6px 10px", borderRadius:999,
            backdropFilter:"blur(6px)"
          }}>
            <PieceGlyph kind={piece.glyph} size={30}/>
          </div>
        </div>
      )}
      <figcaption style={{
        marginTop:14,
        fontFamily:"var(--font-mono)", fontSize:11,
        letterSpacing:"0.18em", color:"var(--ink-faint)",
        textTransform:"uppercase",
        display:"flex", justifyContent:"space-between"
      }}>
        <span>{piece.title}</span>
        <span>{piece.date}</span>
      </figcaption>
    </figure>
  );
}

function StoryProse({ story }){
  return (
    <div>
      {story.map((para, i)=>(
        <p key={i} style={{
          fontFamily:"var(--font-body)",
          fontSize: i===0 ? 22 : 19,
          lineHeight:1.65,
          color: i===0 ? "var(--ink)" : "var(--ink)",
          marginTop: i===0 ? 0 : 0,
          marginBottom:26,
          textWrap:"pretty"
        }}>
          {i===0 && (
            <span style={{
              float:"left",
              fontFamily:"var(--font-display)",
              fontSize: 90, lineHeight:0.78,
              marginRight:14, marginTop:6, marginBottom:-6,
              color:"var(--blush)",
              fontStyle:"italic"
            }}>{para[0]}</span>
          )}
          {i===0 ? para.slice(1) : para}
        </p>
      ))}
    </div>
  );
}

function StoryFooter(){
  return (
    <div style={{
      borderTop:"1px solid var(--line)",
      paddingTop:24, marginTop:40,
      display:"flex", justifyContent:"space-between", alignItems:"center",
      fontFamily:"var(--font-mono)", fontSize:11,
      letterSpacing:"0.2em", color:"var(--ink-faint)",
      textTransform:"uppercase"
    }}>
      <span>— Paro</span>
      <span style={{ display:"flex", gap:16 }}>
        <span style={{ cursor:"pointer" }}>♡ Like</span>
        <span style={{ cursor:"pointer" }}>↗ Share</span>
      </span>
    </div>
  );
}

// -------- Tarot Card Draw overlay --------
// tracks whether we're on a narrow (phone) viewport, so the bloom-draw cards
// can shrink to fit instead of overflowing a non-scrollable centred overlay.
function useIsNarrow(bp=720){
  const [narrow, setNarrow] = useStateS(()=> typeof window !== "undefined" && window.innerWidth <= bp);
  useEffectS(()=>{
    const onResize = ()=> setNarrow(window.innerWidth <= bp);
    window.addEventListener('resize', onResize);
    return ()=> window.removeEventListener('resize', onResize);
  }, [bp]);
  return narrow;
}

function TarotDraw({ onClose, onOpen }){
  const [shuffled, setShuffled] = useStateS(()=> [...PIECES].sort(()=> Math.random() - 0.5));
  const [drawn, setDrawn] = useStateS(false);
  const [pick, setPick] = useStateS(null);
  const narrow = useIsNarrow();

  function drawCard(){
    const choice = shuffled[Math.floor(Math.random()*shuffled.length)];
    setPick(choice);
    setDrawn(true);
  }
  function reshuffle(){
    setDrawn(false);
    setPick(null);
    setShuffled([...PIECES].sort(()=> Math.random() - 0.5));
  }

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:60,
      background:"rgba(235,240,212,0.92)",
      backdropFilter:"blur(20px)",
      // flex-start + margin:auto on the child centres when it fits but lets the
      // overlay scroll (without clipping the top) when content is taller than the
      // viewport — important on phones where the cards stack vertically.
      display:"flex", alignItems:"flex-start", justifyContent:"center",
      overflowY:"auto", WebkitOverflowScrolling:"touch",
      padding: narrow ? "76px 18px 32px" : 24,
      animation:"fadeIn .4s ease"
    }}>
      <button onClick={onClose} className="btn btn-ghost" style={{ position:"fixed", top:24, right:24, zIndex:61 }}>
        ✕ close
      </button>

      <div style={{ textAlign:"center", maxWidth:1100, width:"100%", margin:"auto" }}>
        <div className="eyebrow" style={{ marginBottom:18 }}>Pick a bloom</div>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(36px, 5vw, 60px)", marginBottom:12 }}>
          {drawn ? "Your bloom." : "Choose a bloom."}
        </h2>
        <p style={{ color:"var(--ink-dim)", maxWidth:520, margin:"0 auto 40px", fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:18 }}>
          {drawn
            ? "An honest gift from the garden. Open it, or pick again."
            : "Three buds, still closed. Click any to pick one — let the garden choose what to show you."}
        </p>

        {!drawn ? (
          <div style={{ display:"flex", justifyContent:"center", gap: narrow ? 14 : 24, perspective:"1200px", flexWrap:"wrap" }}>
            {[0,1,2].map(i=>(
              <CardBack key={i} idx={i} onClick={drawCard} delay={i*120} compact={narrow}/>
            ))}
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:24 }}>
            <RevealedCard piece={pick} compact={narrow} />
            <div style={{ display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center" }}>
              <button className="btn" onClick={()=>{ onOpen(pick.id); onClose(); }}>Open this piece →</button>
              <button className="btn btn-ghost" onClick={reshuffle}>↻ Pick again</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CardBack({ onClick, delay=0, idx=0, compact=false }){
  const [hover, setHover] = useStateS(false);
  const stem = ["stem-daisy","stem-cosmos","stem-lavender"][idx % 3];
  return (
    <div
      onClick={onClick}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        width: compact ? 150 : 220, height: compact ? 232 : 340,
        borderRadius:14,
        cursor:"pointer",
        transformStyle:"preserve-3d",
        transition:"transform .5s ease",
        transform: hover ? "translateY(-10px) rotateY(8deg)" : "translateY(0) rotateY(0)",
        animation:`cardEnter .9s ease ${delay}ms both`,
      }}
    >
      <div style={{
        position:"relative",
        width:"100%", height:"100%",
        borderRadius:14,
        background:"linear-gradient(160deg, #fbf7ea, #eef2da 58%, #e1ebc3)",
        border:"1px solid var(--line-strong)",
        boxShadow:"0 24px 50px -20px rgba(54,65,44,0.45), inset 0 0 60px rgba(63,138,91,0.06)",
        display:"flex", alignItems:"center", justifyContent:"center",
        overflow:"hidden"
      }}>
        {/* seed-packet frame + label */}
        <svg viewBox="0 0 200 320" width="100%" height="100%" style={{ position:"absolute", inset:0 }}>
          <rect x="10" y="10" width="180" height="300" rx="6" fill="none" stroke="var(--emerald)" strokeWidth="1" opacity=".55"/>
          <rect x="16" y="16" width="168" height="288" rx="4" fill="none" stroke="var(--emerald)" strokeWidth="0.5" opacity=".3"/>
          <text x="100" y="50" textAnchor="middle" fill="var(--emerald)" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="3">PARO HARSHA</text>
          <text x="100" y="280" textAnchor="middle" fill="var(--blush)" fontFamily="var(--font-display)" fontStyle="italic" fontSize="14">— a bloom —</text>
        </svg>
        {/* hand-painted pressed flower */}
        <img src={BOTANICAL[stem]} alt="" aria-hidden="true" draggable="false"
          style={{
            position:"absolute", top:"50%", left:"50%",
            transform:`translate(-50%,-50%) scale(${hover?1.04:1})`,
            transition:"transform .5s ease",
            height:"66%", width:"auto", objectFit:"contain",
            filter:"drop-shadow(0 6px 12px rgba(54,65,44,0.22))"
          }}/>
      </div>
      <style>{`
        @keyframes cardEnter {
          from { opacity:0; transform: translateY(40px) rotateX(-20deg); }
          to { opacity:1; transform: translateY(0) rotateX(0); }
        }
      `}</style>
    </div>
  );
}

function RevealedCard({ piece, compact=false }){
  return (
    <div style={{
      width: compact ? 250 : 300, height: compact ? 384 : 460,
      borderRadius:16,
      background:`linear-gradient(165deg, ${piece.palette[0]}, ${piece.palette[1]} 80%)`,
      border:"1px solid var(--blush)",
      boxShadow:"0 30px 80px -10px rgba(0,0,0,0.7), 0 0 0 6px rgba(227,176,71,0.08)",
      position:"relative",
      overflow:"hidden",
      animation:"flipIn .8s cubic-bezier(.2,.8,.2,1)"
    }}>
      {/* artwork background, reduced opacity */}
      {piece.image && (
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:`url(${piece.image})`,
          backgroundSize:"cover",
          backgroundPosition:"center",
          opacity:0.55,
          mixBlendMode:"luminosity",
          filter:"saturate(1.1)",
        }}/>
      )}
      {/* readability vignette over the artwork */}
      <div style={{
        position:"absolute", inset:0,
        background:"radial-gradient(ellipse at center, rgba(30,42,24,0.04) 0%, rgba(30,42,24,0.5) 100%), linear-gradient(180deg, rgba(30,42,24,0.12), rgba(30,42,24,0.5))",
        pointerEvents:"none",
      }}/>
      <div style={{
        position:"absolute", inset:14,
        border:"1px solid rgba(239,226,194,0.4)",
        borderRadius:8,
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between",
        padding:"20px 16px",
        textShadow:"0 1px 18px rgba(0,0,0,0.5)",
      }}>
        <div style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.24em", color:"var(--cream)", textTransform:"uppercase", opacity:.9 }}>
          {piece.date}
        </div>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:24, color:"var(--cream)" }}>
            {piece.title}
          </div>
          <div style={{ fontFamily:"var(--font-body)", fontSize:13, color:"rgba(251,247,234,0.92)", marginTop:8, textWrap:"pretty" }}>
            {piece.excerpt}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes flipIn {
          from { transform: rotateY(180deg); opacity:0; }
          to { transform: rotateY(0); opacity:1; }
        }
      `}</style>
    </div>
  );
}

window.StoryView = StoryView;
window.TarotDraw = TarotDraw;
