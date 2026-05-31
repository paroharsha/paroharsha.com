// hero.jsx — Home hero with floating cursor-reactive elements (no eye, per Paro)
const { useState, useEffect, useRef } = React;

function Hero({ density="regular", onOpenFeatured }){
  const ref = useRef(null);
  const [m, setM] = useState({x:0, y:0});

  useEffect(()=>{
    function onMove(e){
      const r = ref.current?.getBoundingClientRect();
      if(!r) return;
      const x = (e.clientX - r.left)/r.width - 0.5;
      const y = (e.clientY - r.top)/r.height - 0.5;
      setM({x, y});
    }
    window.addEventListener('mousemove', onMove);
    return ()=> window.removeEventListener('mousemove', onMove);
  }, []);

  const par = (depth) => ({
    transform: `translate(${m.x * depth}px, ${m.y * depth}px)`
  });

  const pad = density==="compact" ? "60px 36px 40px" : density==="comfy" ? "140px 36px 110px" : "110px 36px 90px";

  return (
    <section ref={ref} style={{ position:"relative", padding:pad, minHeight:"86vh", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
      {/* floating sparkles only — no other symbols around the name */}
      <FloatingMark style={{ top:"14%", left:"10%", ...par(-32) }} kind="star" size={56} color="var(--gold)" delay={0}/>
      <FloatingMark style={{ top:"22%", right:"12%", ...par(40) }}  kind="star" size={32} color="var(--gold)" delay={1.2}/>
      <FloatingMark style={{ top:"74%", left:"16%", ...par(-22) }}  kind="star" size={42} color="var(--gold)" delay={2.4}/>
      <FloatingMark style={{ top:"66%", right:"14%", ...par(28) }}  kind="star" size={36} color="var(--gold)" delay={0.6}/>
      <FloatingMark style={{ top:"42%", left:"4%", ...par(-50) }}   kind="star" size={28} color="var(--gold)" delay={1.8}/>
      <FloatingMark style={{ top:"38%", right:"5%", ...par(50) }}   kind="star" size={24} color="var(--gold)" delay={3.0}/>
      <FloatingMark style={{ top:"86%", left:"42%", ...par(-12) }}  kind="star" size={20} color="var(--gold)" delay={2.0}/>
      <FloatingMark style={{ top:"8%",  left:"46%", ...par(20) }}   kind="star" size={18} color="var(--gold)" delay={1.0}/>
      <FloatingMark style={{ top:"54%", left:"36%", ...par(14) }}   kind="star" size={14} color="var(--gold)" delay={2.7}/>
      <FloatingMark style={{ top:"58%", right:"36%", ...par(-18) }} kind="star" size={22} color="var(--gold)" delay={3.6}/>
      <FloatingMark style={{ top:"30%", left:"30%", ...par(-8) }}   kind="star" size={12} color="var(--gold)" delay={4.2}/>
      <FloatingMark style={{ top:"30%", right:"30%", ...par(8) }}   kind="star" size={12} color="var(--gold)" delay={4.8}/>

      {/* central composition */}
      <div style={{ position:"relative", textAlign:"center", zIndex:2, maxWidth:1100 }}>
        <div className="eyebrow" style={{ marginBottom:32 }}>
          <span style={{ borderTop:"1px solid var(--line-strong)", display:"inline-block", width:60, verticalAlign:"middle", marginRight:14 }}></span>
          Paro Harsha's studio
          <span style={{ borderTop:"1px solid var(--line-strong)", display:"inline-block", width:60, verticalAlign:"middle", marginLeft:14 }}></span>
        </div>

        <h1 className="glow-gold" style={{
          fontFamily:"var(--font-display)",
          fontSize:"clamp(64px, 13vw, 200px)",
          lineHeight:0.92,
          letterSpacing:"-0.03em",
          fontWeight:500,
          marginBottom:18,
          ...par(-8)
        }}>
          MARGIN<span className="italic" style={{ color:"var(--gold)" }}>alia</span>
        </h1>

        {/* ornamental divider */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, marginTop:18, marginBottom:8 }}>
          <span style={{ flex:"0 0 90px", height:1, background:"var(--line-strong)" }}/>
          <Glyph/>
          <span style={{ flex:"0 0 90px", height:1, background:"var(--line-strong)" }}/>
        </div>

        <p style={{
          fontFamily:"var(--font-display)",
          fontStyle:"italic",
          fontSize:"clamp(20px, 2.2vw, 28px)",
          color:"var(--ink-dim)",
          marginTop:24,
          maxWidth:720,
          marginLeft:"auto", marginRight:"auto",
          lineHeight:1.45,
          ...par(6)
        }}>
          Notes from memory — drawings, paintings, and the thoughts that accompanied them.
        </p>

        <div style={{ display:"flex", gap:14, justifyContent:"center", marginTop:40, flexWrap:"wrap" }}>
          <button className="btn" onClick={onOpenFeatured}>Draw a card ⟶</button>
          <button className="btn btn-ghost" onClick={()=>document.getElementById('latest')?.scrollIntoView({behavior:'smooth', block:'start'})}>Read latest</button>
        </div>
      </div>

      <style>{`
        @keyframes drift {
          0%,100%{ transform: translate(0,0) rotate(0deg); }
          50%{ transform: translate(6px,-10px) rotate(2deg); }
        }
        @keyframes fadeIn { from{opacity:0; transform:translateY(6px);} to{opacity:1; transform:translateY(0);} }

        /* easter egg — shooting stars */
        @keyframes shoot-fly {
          0%   { transform: translate(0,0); opacity:1; }
          10%  { transform: translate(calc(var(--dx) * -0.025), calc(var(--dy) * -0.025)); opacity:1; }
          22%  { transform: translate(calc(var(--dx) * 0.06), calc(var(--dy) * 0.06)); opacity:1; }
          80%  { opacity:1; }
          100% { transform: translate(var(--dx), var(--dy)); opacity:0; }
        }
        @keyframes shoot-spin {
          0%   { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 0 transparent); }
          12%  { transform: scale(1.55) rotate(-10deg); filter: drop-shadow(0 0 18px rgba(227,176,71,0.9)); }
          100% { transform: scale(0.5) rotate(220deg); filter: drop-shadow(0 0 4px rgba(227,176,71,0.4)); }
        }
        @keyframes trail-grow {
          0%   { transform: scaleX(0); opacity:0; }
          18%  { transform: scaleX(0.7); opacity:1; }
          55%  { transform: scaleX(1); opacity:1; }
          100% { transform: scaleX(1.1); opacity:0; }
        }
      `}</style>
    </section>
  );
}

function FloatingMark({ style, kind, size=40, color="var(--ink)", delay=0, flip=false }){
  const clickable = size >= 18; // the visible sparkles (all but the tiniest accent dots)
  const ref = useRef(null);
  const [shot, setShot] = useState(false);
  const [vec, setVec] = useState({ dx:0, dy:0, ang:0 });

  function fire(e){
    if(!clickable || shot) return;
    e.stopPropagation();
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width/2;
    const cy = r.top + r.height/2;
    const ox = window.innerWidth/2;
    const oy = window.innerHeight*0.45;
    let dx = cx - ox, dy = cy - oy;
    const len = Math.hypot(dx, dy) || 1;
    const jitter = (Math.random() - 0.5) * 0.35;
    const baseAng = Math.atan2(dy, dx) + jitter;
    const reach = Math.max(window.innerWidth, window.innerHeight) * 1.6;
    dx = Math.cos(baseAng) * reach;
    dy = Math.sin(baseAng) * reach;
    setVec({ dx, dy, ang: baseAng * 180/Math.PI });
    setShot(true);
  }

  const trailLen = Math.round(160 + size * 6);
  const trailThick = Math.max(2, size/12);

  return (
    <div
      ref={ref}
      onClick={fire}
      style={{
        position:"absolute",
        animation: shot ? "none" : `drift ${6 + delay*0.3}s ease-in-out infinite`,
        animationDelay:`${delay}s`,
        pointerEvents: clickable && !shot ? "auto" : "none",
        cursor: clickable && !shot ? "pointer" : "default",
        zIndex: shot ? 4 : 3,
        ...style
      }}
    >
      {/* this wrapper does the translate-off-screen + opacity */}
      <div style={{
        position:"relative",
        animation: shot ? "shoot-fly 1.2s cubic-bezier(0.22, 0.55, 0.3, 1) forwards" : "none",
        "--dx": `${vec.dx}px`,
        "--dy": `${vec.dy}px`,
        willChange: shot ? "transform, opacity" : "auto",
      }}>
        {shot && (
          // trail-rotator: positioned at star center, rotated to point opposite of travel
          <div aria-hidden="true" style={{
            position:"absolute",
            top: size/2,
            left: size/2,
            width: 0,
            height: 0,
            transform: `rotate(${vec.ang + 180}deg)`,
            pointerEvents:"none",
          }}>
            <div style={{
              position:"absolute",
              top: -trailThick/2,
              left: 0,
              width: trailLen,
              height: trailThick,
              background:`linear-gradient(90deg, rgba(227,176,71,0.95) 0%, rgba(227,176,71,0.5) 30%, rgba(224,123,158,0.18) 70%, transparent 100%)`,
              filter:`drop-shadow(0 0 10px rgba(227,176,71,0.7))`,
              transformOrigin:"0% 50%",
              animation:"trail-grow 1.2s ease-out forwards",
              borderRadius:999,
            }}/>
          </div>
        )}
        {/* star itself — spins & scales independently of translate */}
        <div style={{
          animation: shot ? "shoot-spin 1.2s cubic-bezier(0.3, 0.4, 0.5, 1) forwards" : "none",
          willChange: shot ? "transform, filter" : "auto"
        }}>
          <Mark kind={kind} size={size} color={color} flip={flip}/>
        </div>
      </div>
    </div>
  );
}

function Mark({ kind, size, color, flip }){
  // four-point sparkle — elongated points with concave sides, matches Paro's reference
  if(kind === "star"){
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
        <path d="M50 2 C 50 50 50 50 98 50 C 50 50 50 50 50 98 C 50 50 50 50 2 50 C 50 50 50 50 50 2 Z"
              style={{ filter:`drop-shadow(0 0 ${size/6}px ${color})` }} />
      </svg>
    );
  }
  return null;
}

// small ornamental divider glyph (no eye)
function Glyph(){
  return (
    <svg width="44" height="22" viewBox="0 0 80 40" fill="none" stroke="var(--gold)" strokeWidth="1">
      <path d="M2 20 L26 20"/>
      <path d="M40 6 L43 18 L54 20 L43 22 L40 34 L37 22 L26 20 L37 18 Z" fill="var(--gold)" stroke="none"/>
      <path d="M54 20 L78 20"/>
    </svg>
  );
}

window.Hero = Hero;
