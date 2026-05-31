// story.jsx — Story detail (art + writing side-by-side), and the tarot card overlay

const { useState: useStateS, useEffect: useEffectS } = React;

function StoryView({ pieceId, onBack, layout="side-by-side" }){
  const piece = PIECES.find(p => p.id === pieceId);
  if(!piece) return null;

  // related (top 3 by adjacency in index)
  const idx = PIECES.indexOf(piece);
  const related = [PIECES[(idx-1+PIECES.length)%PIECES.length], PIECES[(idx+1)%PIECES.length], PIECES[(idx+2)%PIECES.length]];

  // dropcap on first paragraph
  const story = piece.story || [
    `${piece.excerpt || ''} A piece in process — words to follow.`,
    "Pieces without prose live as images alone, sometimes. Some hum before they speak. Check back, or just sit with the picture for a while."
  ];

  return (
    <section style={{ padding:"40px 36px 100px", maxWidth:1400, margin:"0 auto" }}>
      <button onClick={onBack} className="btn btn-ghost" style={{ marginBottom:36 }}>
        ← Back to the constellation
      </button>

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
        <div style={{
          display:"grid",
          gridTemplateColumns:"minmax(0, 1fr) minmax(0, 1fr)",
          gap:64,
          alignItems:"start"
        }}>
          <div style={{ position:"sticky", top:90 }}>
            <ArtPlate piece={piece} />
          </div>
          <article>
            <StoryProse story={story} />
            <StoryFooter />
          </article>
        </div>
      ) : layout === "stacked" ? (
        <div>
          <div style={{ marginBottom:48 }}>
            <ArtPlate piece={piece} large />
          </div>
          <article style={{ maxWidth:680, margin:"0 auto" }}>
            <StoryProse story={story}/>
            <StoryFooter />
          </article>
        </div>
      ) : (
        // "woven" — art floats inline between paragraphs
        <article style={{ maxWidth:780, margin:"0 auto" }}>
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
                {i===0 ? <span style={{ float:"left", fontFamily:"var(--font-display)", fontSize:78, lineHeight:0.85, marginRight:12, marginTop:4, color:"var(--gold)" }}>{para[0]}</span> : null}
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
        <div className="eyebrow" style={{ marginBottom:24 }}>Adjacent in the constellation</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:24 }}>
          {related.map(r => (
            <button key={r.id}
              onClick={()=>onBack(r.id)}
              style={{
                textAlign:"left",
                background:"transparent",
                border:"1px solid var(--line)",
                borderRadius:12,
                padding:24,
                cursor:"pointer",
                transition:"all .25s ease",
                color:"inherit"
              }}
              onMouseEnter={e=> { e.currentTarget.style.borderColor = "var(--line-strong)"; e.currentTarget.style.background = "rgba(239,226,194,0.03)"; }}
              onMouseLeave={e=> { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{
                width:60, height:60, borderRadius:"50%",
                background:`radial-gradient(circle at 35% 30%, ${r.palette[0]}, ${r.palette[1]} 70%, #0e1130)`,
                display:"flex", alignItems:"center", justifyContent:"center",
                marginBottom:14
              }}>
                <PieceGlyph kind={r.glyph} size={32} color="#efe2c2"/>
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
              boxShadow:"0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px var(--line)",
            }}>
              <img src={src} alt={`${piece.title} — ${i+1}`} style={{ display:"block", width:"100%", height:"auto" }}/>
              {i === 0 && (
                <div style={{
                  position:"absolute", left:14, top:14,
                  fontFamily:"var(--font-mono)", fontSize:10,
                  letterSpacing:"0.24em", color:"rgba(239,226,194,0.85)",
                  textTransform:"uppercase",
                  background:"rgba(7,8,23,0.5)",
                  padding:"6px 10px", borderRadius:999,
                  backdropFilter:"blur(6px)"
                }}>
                  ✦ {piece.glyph}
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
          boxShadow:"0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px var(--line)",
        }}>
          <img src={piece.image} alt={piece.title} style={{
            display:"block", width:"100%", height:"auto"
          }}/>
          <div style={{
            position:"absolute", left:14, top:14,
            fontFamily:"var(--font-mono)", fontSize:10,
            letterSpacing:"0.24em", color:"rgba(239,226,194,0.85)",
            textTransform:"uppercase",
            background:"rgba(7,8,23,0.5)",
            padding:"6px 10px", borderRadius:999,
            backdropFilter:"blur(6px)"
          }}>
            ✦ {piece.glyph}
          </div>
        </div>
      ) : (
        <div style={{
          position:"relative",
          width:"100%",
          aspectRatio: large ? "16/10" : "3/4",
          borderRadius:8,
          overflow:"hidden",
          boxShadow:"0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px var(--line)",
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
            letterSpacing:"0.24em", color:"rgba(239,226,194,0.7)",
            textTransform:"uppercase",
            background:"rgba(7,8,23,0.4)",
            padding:"6px 10px", borderRadius:999,
            backdropFilter:"blur(6px)"
          }}>
            ✦ {piece.glyph}
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
              color:"var(--gold)",
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
function TarotDraw({ onClose, onOpen }){
  const [shuffled, setShuffled] = useStateS(()=> [...PIECES].sort(()=> Math.random() - 0.5));
  const [drawn, setDrawn] = useStateS(false);
  const [pick, setPick] = useStateS(null);

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
      background:"rgba(7,8,23,0.92)",
      backdropFilter:"blur(20px)",
      display:"flex", alignItems:"center", justifyContent:"center",
      padding:24,
      animation:"fadeIn .4s ease"
    }}>
      <button onClick={onClose} className="btn btn-ghost" style={{ position:"absolute", top:24, right:24 }}>
        ✕ close
      </button>

      <div style={{ textAlign:"center", maxWidth:1100, width:"100%" }}>
        <div className="eyebrow" style={{ marginBottom:18 }}>Draw a card</div>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(36px, 5vw, 60px)", marginBottom:12 }}>
          {drawn ? "Your card." : "Choose one."}
        </h2>
        <p style={{ color:"var(--ink-dim)", maxWidth:520, margin:"0 auto 40px", fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:18 }}>
          {drawn
            ? "An honest gift from the deck. Open it, or shuffle again."
            : "Three cards face-down. Click any to draw — let the deck decide what to show you."}
        </p>

        {!drawn ? (
          <div style={{ display:"flex", justifyContent:"center", gap:24, perspective:"1200px", flexWrap:"wrap" }}>
            {[0,1,2].map(i=>(
              <CardBack key={i} onClick={drawCard} delay={i*120}/>
            ))}
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:24 }}>
            <RevealedCard piece={pick} />
            <div style={{ display:"flex", gap:14 }}>
              <button className="btn" onClick={()=>{ onOpen(pick.id); onClose(); }}>Open this piece →</button>
              <button className="btn btn-ghost" onClick={reshuffle}>↻ Shuffle &amp; redraw</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CardBack({ onClick, delay=0 }){
  const [hover, setHover] = useStateS(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
      style={{
        width:220, height:340,
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
        background:"linear-gradient(160deg, #1a0f2b, #0e1130 60%, #070817)",
        border:"1px solid var(--line-strong)",
        boxShadow:"0 30px 60px -20px rgba(0,0,0,0.8), inset 0 0 60px rgba(227,176,71,0.06)",
        display:"flex", alignItems:"center", justifyContent:"center",
        overflow:"hidden"
      }}>
        {/* ornamental back */}
        <svg viewBox="0 0 200 320" width="100%" height="100%" style={{ position:"absolute", inset:0 }}>
          <rect x="10" y="10" width="180" height="300" fill="none" stroke="var(--gold)" strokeWidth="1" opacity=".5"/>
          <rect x="16" y="16" width="168" height="288" fill="none" stroke="var(--gold)" strokeWidth="0.5" opacity=".3"/>
          {/* central star ornament */}
          <g transform="translate(100 160)" opacity=".9">
            <path d="M0 -42 L8 -8 L42 0 L8 8 L0 42 L-8 8 L-42 0 L-8 -8 Z" fill="none" stroke="var(--gold)" strokeWidth="1.2"/>
            <path d="M0 -22 L5 -5 L22 0 L5 5 L0 22 L-5 5 L-22 0 L-5 -5 Z" fill="var(--gold)" opacity=".5"/>
            <circle r="3" fill="var(--gold)"/>
            {[...Array(8)].map((_,i)=>{
              const a=(i/8)*Math.PI*2 + Math.PI/8;
              return <circle key={i} cx={Math.cos(a)*54} cy={Math.sin(a)*54} r="1.4" fill="var(--gold)"/>
            })}
          </g>
          <text x="100" y="50" textAnchor="middle" fill="var(--gold)" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="3">PARO HARSHA</text>
          <text x="100" y="280" textAnchor="middle" fill="var(--gold)" fontFamily="var(--font-display)" fontStyle="italic" fontSize="14">— a draw —</text>
        </svg>
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

function RevealedCard({ piece }){
  return (
    <div style={{
      width:300, height:460,
      borderRadius:16,
      background:`linear-gradient(165deg, ${piece.palette[0]}, ${piece.palette[1]} 80%)`,
      border:"1px solid var(--gold)",
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
        background:"radial-gradient(ellipse at center, rgba(7,8,23,0.05) 0%, rgba(7,8,23,0.55) 100%), linear-gradient(180deg, rgba(7,8,23,0.15), rgba(7,8,23,0.55))",
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
        <div style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.24em", color:"var(--ink)", textTransform:"uppercase", opacity:.9 }}>
          {piece.date}
        </div>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:24, color:"var(--ink)" }}>
            {piece.title}
          </div>
          <div style={{ fontFamily:"var(--font-body)", fontSize:13, color:"rgba(239,226,194,0.9)", marginTop:8, textWrap:"pretty" }}>
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
