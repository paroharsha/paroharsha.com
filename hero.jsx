// hero.jsx — Home hero (typography-led, no motion)

function Hero({ density="regular", onOpenFeatured }){
  const pad = density==="compact" ? "60px 36px 40px" : density==="comfy" ? "140px 36px 110px" : "110px 36px 90px";

  return (
    <section style={{ position:"relative", padding:pad, minHeight:"82vh", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
      {/* central composition — bare paper, typography-led */}
      <div className="glass-soft" style={{ position:"relative", textAlign:"center", zIndex:2, maxWidth:1100, padding:"0 24px" }}>
        <div className="eyebrow" style={{ marginBottom:36 }}>
          <span style={{ borderTop:"1px solid var(--line-strong)", display:"inline-block", width:48, verticalAlign:"middle", marginRight:16 }}></span>
          Paro Harsha's studio
          <span style={{ borderTop:"1px solid var(--line-strong)", display:"inline-block", width:48, verticalAlign:"middle", marginLeft:16 }}></span>
        </div>

        <h1 style={{
          fontFamily:"var(--font-display)",
          fontSize:"clamp(64px, 13vw, 180px)",
          lineHeight:0.9,
          letterSpacing:0,
          fontWeight:700,
          marginBottom:0
        }}>
          Marginalia
        </h1>

        {/* thin rule divider with a star — a nod to the printed mascot */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, marginTop:30, marginBottom:6 }}>
          <span style={{ flex:"0 0 60px", height:1, background:"var(--line-strong)" }}/>
          <Star size={18} color="var(--accent)" style={{ marginRight:0 }}/>
          <span style={{ flex:"0 0 60px", height:1, background:"var(--line-strong)" }}/>
        </div>

        <p style={{
          fontFamily:"var(--font-display)",
          fontWeight:500,
          fontSize:"clamp(24px, 2.8vw, 38px)",
          color:"var(--ink-dim)",
          marginTop:22,
          maxWidth:620,
          marginLeft:"auto", marginRight:"auto",
          lineHeight:1.25
        }}>
          Notes from memory — drawings, paintings, and the thoughts that accompanied them.
        </p>

        <div style={{ display:"flex", gap:14, justifyContent:"center", marginTop:44, flexWrap:"wrap" }}>
          <button className="btn" onClick={onOpenFeatured}>Draw a piece ⟶</button>
          <button className="btn btn-ghost" onClick={()=>document.getElementById('latest')?.scrollIntoView({behavior:'smooth', block:'start'})}>Read latest</button>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
