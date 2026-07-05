// gallery.jsx — Editorial art archive (replaces constellation)
// Three flavors: gallery (varied editorial grid), mosaic (uniform), list (editorial list)
const { useState: useStateG, useRef: useRefG } = React;

// ---- petal-burst on hover ----
const STAR_COLORS = ['#e08aa3','#7fb3cf','#fbf6e6','#8fbf6f','#c06aa0'];
const _burstCooldown = new WeakMap();
function burstStars(el, opts={}){
  // Disabled for the editorial redesign — hover effects are kept quiet.
  return;
  if(!el) return;
  const now = performance.now();
  const last = _burstCooldown.get(el) || 0;
  if(now - last < 500) return;
  _burstCooldown.set(el, now);

  const motion = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--motion')) || 1;
  if(motion === 0) return;

  const r = el.getBoundingClientRect();
  const count = Math.round((opts.count ?? 10) * Math.min(1.2, motion));
  for(let i=0;i<count;i++){
    const s = document.createElement('div');
    const size = 5 + Math.random()*7;
    const angle = Math.random()*Math.PI*2;
    const dist = 50 + Math.random()*120;
    const edge = Math.random();
    let x, y;
    if(edge < 0.5){
      x = r.left + Math.random()*r.width;
      y = r.top  + (Math.random()<0.7 ? -8 + Math.random()*r.height*0.4 : r.height + 8 - Math.random()*r.height*0.4);
    } else {
      x = r.left + (Math.random()<0.5 ? -8 + Math.random()*r.width*0.4 : r.width + 8 - Math.random()*r.width*0.4);
      y = r.top + Math.random()*r.height;
    }
    const tx = Math.cos(angle)*dist;
    const ty = Math.sin(angle)*dist - 40;
    const color = STAR_COLORS[Math.floor(Math.random()*STAR_COLORS.length)];
    const rot = Math.random()*540;
    const leaf = Math.random() < 0.4;
    // leaves get a pointed petal silhouette, blossoms a soft rounded one
    const radius = leaf ? "0 100% 0 100%" : "50% 50% 50% 50% / 68% 68% 32% 32%";
    s.style.cssText = `
      position:fixed;
      left:${x}px; top:${y}px;
      width:${size}px; height:${leaf ? size*0.7 : size}px;
      pointer-events:none;
      z-index:9998;
      background:${color};
      border-radius:${radius};
      transition: transform ${1.0 + Math.random()*0.6}s cubic-bezier(.2,.6,.3,1), opacity 1.2s ease;
      opacity: ${0.75 + Math.random()*0.25};
      box-shadow:0 1px 4px rgba(54,65,44,0.22);
      will-change: transform, opacity;
    `;
    document.body.appendChild(s);
    requestAnimationFrame(()=>{
      s.style.transform = `translate(${tx}px, ${ty}px) scale(0.2) rotate(${rot}deg)`;
      s.style.opacity = '0';
    });
    setTimeout(()=> s.remove(), 1500);
  }
}
window.burstStars = burstStars;


function Gallery({ style="gallery", onOpen }){
  const items = PIECES;

  return (
    <section style={{ padding:"40px 36px 80px", maxWidth:1400, margin:"0 auto" }}>
      <header style={{ marginBottom:36 }}>
        <div className="eyebrow">Archive · {PIECES.length} pieces</div>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(46px, 7vw, 96px)", letterSpacing:0, marginTop:8, lineHeight:0.95 }}>
          Art &amp; Stories
        </h2>
        <p style={{ color:"var(--ink-dim)", maxWidth:520, marginTop:10, textWrap:"pretty" }}>
          Work from the studio, newest first — click any piece to read the writing that came with it.
        </p>
      </header>

      {style === "gallery" && <EditorialGrid items={items} onOpen={onOpen}/>}
      {style === "mosaic"  && <Mosaic items={items} onOpen={onOpen}/>}
      {style === "list"    && <EditorialList items={items} onOpen={onOpen}/>}
    </section>
  );
}

// ------- Editorial uniform grid (regular & editorial — magazine TOC feel) -------
function EditorialGrid({ items, onOpen }){
  if(items.length === 0) return <Empty/>;
  const [feat, ...rest] = items;
  return (
    <>
      {/* featured */}
      <FeaturedTile piece={feat} onClick={()=>onOpen(feat.id)} />

      {/* uniform 3-up editorial grid, meta lives below each image */}
      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))",
        gap:"48px 36px",
        marginTop:64,
        borderTop:"1px solid var(--line)",
        paddingTop:48
      }}>
        {rest.map((p, i)=>(
          <EditorialTile key={p.id} piece={p} index={i+1} onClick={()=>onOpen(p.id)}/>
        ))}
      </div>
    </>
  );
}

function EditorialTile({ piece, index, onClick }){
  const [hover, setHover] = useStateG(false);
  return (
    <article
      className="glass"
      onClick={onClick}
      onMouseEnter={(e)=>{ setHover(true); burstStars(e.currentTarget); }}
      onMouseLeave={()=>setHover(false)}
      style={{
        cursor:"pointer",
        borderRadius:3,
        overflow:"hidden",
        display:"flex",
        flexDirection:"column",
        transition:"transform .3s ease, box-shadow .3s ease, border-color .3s ease",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
        borderColor: hover ? "var(--line-strong)" : "var(--line)",
        boxShadow: hover ? "0 20px 38px -28px rgba(27,24,19,0.55)" : "none"
      }}
    >
      <div style={{
        position:"relative",
        aspectRatio:"4/5",
        overflow:"hidden",
        background:"var(--bg-1)"
      }}>
        {piece.image ? (
          <img src={piece.image} alt={piece.title} style={{
            position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain",
            transition:"transform .9s ease",
            transform: hover ? "scale(1.04)" : "scale(1)"
          }}/>
        ) : (
          <div className="ph-art" style={{
            "--c1":piece.palette[0],
            "--c2":piece.palette[1],
            position:"absolute", inset:0,
            transition:"transform .9s ease",
            transform: hover ? "scale(1.04)" : "scale(1)",
            flexDirection:"column", gap:8
          }}>
            <Star size={60} color="var(--ink)" style={{ marginRight:0 }}/>
          </div>
        )}
        {!piece.image && <image-slot id={`tile-${piece.id}`} shape="rect" placeholder="" style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}></image-slot>}
      </div>

      <div style={{ padding:"20px 24px 24px" }}>
        {/* meta under image, magazine-style */}
        <div style={{
          display:"flex",
          justifyContent:"space-between",
          fontFamily:"var(--font-mono)",
          fontSize:10,
          letterSpacing:"0.22em",
          textTransform:"uppercase",
          color:"var(--ink-faint)",
          marginBottom:10
        }}>
          <span style={{ color:"var(--sky)" }}>№ {String(index).padStart(2,'0')}</span>
          <span>{piece.date}{piece.read ? ` · ${piece.read}` : ""}</span>
        </div>

        <h3 style={{
          fontFamily:"var(--font-display)",
          fontSize:28,
          lineHeight:1.05,
          letterSpacing:"-0.01em",
          marginBottom:8,
          color: hover ? "var(--blush)" : "var(--ink)",
          transition:"color .2s ease",
          textWrap:"balance"
        }}>
          {piece.title}
        </h3>

        <p style={{
          color:"var(--ink-dim)",
          fontSize:15,
          lineHeight:1.55,
          margin:0,
          textWrap:"pretty"
        }}>
          {piece.excerpt}
        </p>
      </div>
    </article>
  );
}

// ------- Uniform mosaic -------
function Mosaic({ items, onOpen }){
  if(items.length === 0) return <Empty/>;
  return (
    <div style={{
      display:"grid",
      gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))",
      gap:18
    }}>
      {items.map(p => (
        <GalleryTile key={p.id} piece={p} aspect="4/5" onClick={()=>onOpen(p.id)}/>
      ))}
    </div>
  );
}

// ------- Editorial list -------
function EditorialList({ items, onOpen }){
  if(items.length === 0) return <Empty/>;
  return (
    <ol style={{ listStyle:"none", padding:0, margin:0 }}>
      {items.map((p, i)=>(
        <li
          key={p.id}
          onClick={()=>onOpen(p.id)}
          style={{
            display:"grid",
            gridTemplateColumns:"180px 1fr auto",
            gap:36,
            padding:"28px 0",
            borderTop:"1px solid var(--line)",
            alignItems:"center",
            cursor:"pointer",
            transition:"all .25s ease",
          }}
          onMouseEnter={(e)=> { e.currentTarget.style.background = "rgba(27,24,19,0.045)"; e.currentTarget.style.paddingLeft = "16px"; e.currentTarget.style.paddingRight = "16px"; burstStars(e.currentTarget, { count: 8 }); }}
          onMouseLeave={e=> { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "0"; e.currentTarget.style.paddingRight = "0"; }}
        >
          <div style={{
            position:"relative",
            aspectRatio:"4/3",
            borderRadius:6,
            overflow:"hidden",
            background:"rgba(255,255,255,0.42)",
            backdropFilter:"blur(20px)",
            WebkitBackdropFilter:"blur(20px)",
            border:"1px solid rgba(54,65,44,0.1)"
          }}>
            {p.image ? (
              <img src={p.image} alt={p.title} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain" }}/>
            ) : (
              <>
                <div className="ph-art" style={{ "--c1":p.palette[0], "--c2":p.palette[1], position:"absolute", inset:0 }}>
                  <Star size={40} color="var(--ink)" style={{ marginRight:0 }}/>
                </div>
                <image-slot id={`list-${p.id}`} shape="rect" placeholder="" style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}></image-slot>
              </>
            )}
          </div>
          <div style={{ minWidth:0 }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.22em", color:"var(--sky)", textTransform:"uppercase", marginBottom:8 }}>
              {p.date} {p.read ? `· ${p.read}` : ""}
            </div>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:32, marginBottom:8, lineHeight:1.05 }}>
              {p.title}
            </h3>
            <p style={{ color:"var(--ink-dim)", margin:0, maxWidth:640, textWrap:"pretty" }}>{p.excerpt}</p>
          </div>
          <div style={{ fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:"0.2em", color:"var(--ink-faint)", textTransform:"uppercase" }}>
            Read ↗
          </div>
        </li>
      ))}
    </ol>
  );
}

// ------- Featured tile (largest) -------
function FeaturedTile({ piece, onClick }){
  const [hover, setHover] = useStateG(false);
  return (
    <article
      className="featured-cols"
      onClick={onClick}
      onMouseEnter={(e)=>{ setHover(true); burstStars(e.currentTarget, { count: 18 }); }}
      onMouseLeave={()=>setHover(false)}
      style={{
        display:"grid",
        gridTemplateColumns:"minmax(0, 1.4fr) minmax(0, 1fr)",
        gap:36,
        alignItems:"stretch",
        cursor:"pointer",
        border:"1px solid var(--line)",
        borderColor: hover ? "var(--line-strong)" : "var(--line)",
        borderRadius:3,
        overflow:"hidden",
        background:"var(--paper)",
        boxShadow:"none",
        transition:"all .3s ease",
      }}
    >
      <div style={{
        position:"relative",
        minHeight:380,
        background:"var(--bg-1)"
      }}>
        {piece.image ? (
          <img src={piece.image} alt={piece.title} style={{
            position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain",
            transition:"transform .8s ease",
            transform: hover ? "scale(1.04)" : "scale(1)"
          }}/>
        ) : (
          <>
            <div className="ph-art" style={{
              "--c1":piece.palette[0],
              "--c2":piece.palette[1],
              position:"absolute", inset:0,
              transition:"transform .8s ease",
              transform: hover ? "scale(1.04)" : "scale(1)",
              flexDirection:"column", gap:14
            }}>
              <Star size={96} color="var(--ink)" style={{ marginRight:0 }}/>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:10, opacity:.7 }}>// drop artwork</div>
            </div>
            <image-slot id={`feat-${piece.id}`} shape="rect" placeholder="" style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}></image-slot>
          </>
        )}
        <div style={{
          position:"absolute", left:20, top:20,
          fontFamily:"var(--font-mono)", fontSize:10,
          letterSpacing:"0.24em", color:"var(--paper)",
          textTransform:"uppercase",
          background:"var(--ink)",
          padding:"6px 12px", borderRadius:0
        }}>
          Featured
        </div>
      </div>
      <div style={{ padding:"40px 44px", display:"flex", flexDirection:"column", justifyContent:"center" }}>
        <div className="eyebrow" style={{ marginBottom:14 }}>
          {piece.date} {piece.read ? `· ${piece.read}` : ""}
        </div>
        <h3 style={{
          fontFamily:"var(--font-display)",
          fontSize:"clamp(36px, 4.4vw, 64px)",
          lineHeight:1.0,
          letterSpacing:"-0.015em",
          marginBottom:16
        }}>
          {piece.title}
        </h3>
        <p style={{
          fontFamily:"var(--font-display)",
          fontWeight:500,
          fontSize:25,
          color:"var(--ink-dim)",
          lineHeight:1.3,
          textWrap:"pretty",
          marginBottom:24
        }}>
          {piece.excerpt}
        </p>
        <div style={{
          fontFamily:"var(--font-mono)", fontSize:11,
          letterSpacing:"0.2em", textTransform:"uppercase",
          color: hover ? "var(--blush)" : "var(--ink-dim)",
          transition:"color .2s ease"
        }}>
          Read the piece ⟶
        </div>
      </div>
    </article>
  );
}

// ------- Standard tile -------
function GalleryTile({ piece, aspect="4/5", onClick }){
  const [hover, setHover] = useStateG(false);
  return (
    <article
      onClick={onClick}
      onMouseEnter={(e)=>{ setHover(true); burstStars(e.currentTarget); }}
      onMouseLeave={()=>setHover(false)}
      style={{
        cursor:"pointer",
        borderRadius:3,
        overflow:"hidden",
        transition:"all .3s ease",
        transform: hover ? "translateY(-3px)" : "translateY(0)"
      }}
    >
      <div style={{
        position:"relative",
        aspectRatio:aspect,
        overflow:"hidden",
        borderRadius:3,
        background:"var(--bg-1)",
        border:"1px solid var(--line)"
      }}>
        {piece.image ? (
          <img src={piece.image} alt={piece.title} style={{
            position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"contain",
            transition:"transform .8s ease",
            transform: hover ? "scale(1.06)" : "scale(1)"
          }}/>
        ) : (
          <>
            <div className="ph-art" style={{
              "--c1":piece.palette[0],
              "--c2":piece.palette[1],
              position:"absolute", inset:0,
              transition:"transform .8s ease",
              transform: hover ? "scale(1.06)" : "scale(1)",
              flexDirection:"column", gap:8
            }}>
              <Star size={60} color="var(--ink)" style={{ marginRight:0 }}/>
            </div>
            <image-slot id={`tile-${piece.id}`} shape="rect" placeholder="" style={{ position:"absolute", inset:0, width:"100%", height:"100%" }}></image-slot>
          </>
        )}

        {/* hover veil with title */}
        <div style={{
          position:"absolute", inset:0,
          background:"linear-gradient(0deg, rgba(27,24,19,0.86) 0%, rgba(27,24,19,0.0) 62%)",
          opacity: hover ? 1 : 0.5,
          transition:"opacity .3s ease",
          display:"flex",
          alignItems:"flex-end",
          padding:"16px 18px"
        }}>
          <div>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.22em", color:"rgba(250,247,239,0.72)", textTransform:"uppercase", marginBottom:6 }}>
              {piece.date}
            </div>
            <h4 style={{
              fontFamily:"var(--font-display)",
              fontSize:20,
              lineHeight:1.1,
              color:"var(--paper)",
              margin:0
            }}>
              {piece.title}
            </h4>
          </div>
        </div>
      </div>
    </article>
  );
}

function Empty(){
  return (
    <div style={{
      padding:"60px 0",
      textAlign:"center",
      fontFamily:"var(--font-display)",
      fontWeight:500,
      fontSize:26,
      color:"var(--ink-dim)"
    }}>
      Nothing here yet.
    </div>
  );
}

window.Gallery = Gallery;
