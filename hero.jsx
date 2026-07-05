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
    <section ref={ref} style={{ position:"relative", padding:pad, minHeight:"82vh", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
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

      <style>{`
        @keyframes drift {
          0%,100%{ transform: translate(0,0) rotate(0deg); }
          50%{ transform: translate(6px,-10px) rotate(2deg); }
        }
        @keyframes fadeIn { from{opacity:0; transform:translateY(6px);} to{opacity:1; transform:translateY(0);} }

        /* clicked bloom/leaf — twirls slowly as it drifts up and away, then fades */
        @keyframes twirl-away {
          0%   { transform: translate(0,0) rotate(0deg) scale(1); opacity:1; }
          12%  { opacity:1; }
          100% { transform: translate(var(--dx), var(--dy)) rotate(var(--spin)) scale(0.28); opacity:0; }
        }
      `}</style>
    </section>
  );
}

function FloatingMark({ style, kind, size=40, color="var(--ink)", delay=0, flip=false }){
  const clickable = size >= 18; // the visible blooms/leaves (all but the tiniest accents)
  const ref = useRef(null);
  const [shot, setShot] = useState(false);
  const [vec, setVec] = useState({ dx:0, dy:0, spin:0 });

  function fire(e){
    if(!clickable || shot) return;
    e.stopPropagation();
    const r = ref.current.getBoundingClientRect();
    const side = (r.left + r.width/2) < window.innerWidth/2 ? -1 : 1;
    // a soft breeze — drift gently up and a little outward
    const dx = side * (40 + Math.random()*70);
    const dy = -(110 + Math.random()*130);
    // 1.2–2.4 lazy turns, either direction
    const spin = (Math.random() < 0.5 ? -1 : 1) * (430 + Math.random()*430);
    setVec({ dx, dy, spin });
    setShot(true);
  }

  return (
    <div
      ref={ref}
      onClick={fire}
      style={{
        position:"absolute",
        animation: shot ? "none" : `drift ${6 + delay*0.3}s ease-in-out ${delay}s infinite`,
        pointerEvents: clickable && !shot ? "auto" : "none",
        cursor: clickable && !shot ? "pointer" : "default",
        zIndex: shot ? 4 : 3,
        ...style
      }}
    >
      {/* twirls slowly as it drifts away, then fades */}
      <div style={{
        animation: shot ? "twirl-away 3.4s cubic-bezier(0.22, 0.6, 0.3, 1) forwards" : "none",
        "--dx": `${vec.dx}px`,
        "--dy": `${vec.dy}px`,
        "--spin": `${vec.spin}deg`,
        willChange: shot ? "transform, opacity" : "auto",
      }}>
        <Mark kind={kind} size={size} color={color} flip={flip}/>
      </div>
    </div>
  );
}

function Mark({ kind, size, color, flip }){
  // hand-painted watercolour cutout (transparent PNG)
  const src = (window.BOTANICAL && window.BOTANICAL[kind]);
  if(!src) return null;
  return (
    <img src={src} alt="" aria-hidden="true" draggable="false"
      style={{
        width:size, height:size, objectFit:"contain", display:"block",
        transform: flip ? "scaleX(-1)" : "none",
        filter:"drop-shadow(0 3px 7px rgba(54,65,44,0.28))"
      }}/>
  );
}

// small ornamental divider glyph — a sprig with a central bloom
function Glyph(){
  return (
    <svg width="56" height="22" viewBox="0 0 100 40" fill="none" stroke="var(--emerald)" strokeWidth="1.4">
      <path d="M4 20 Q 22 20 32 20"/>
      <path d="M16 20 q 4 -7 11 -8 M22 20 q 4 6 11 6" />
      <path d="M96 20 Q 78 20 68 20"/>
      <path d="M84 20 q -4 -7 -11 -8 M78 20 q -4 6 -11 6" />
      <g transform="translate(50 20)" stroke="none">
        {[0,1,2,3,4].map(i=>{
          const a=(i/5)*Math.PI*2 - Math.PI/2;
          return <ellipse key={i} cx={Math.cos(a)*8} cy={Math.sin(a)*8} rx="5" ry="7"
                   transform={`rotate(${a*180/Math.PI+90} ${Math.cos(a)*8} ${Math.sin(a)*8})`} fill="var(--blush)"/>;
        })}
        <circle r="4" fill="#f4d35e"/>
      </g>
    </svg>
  );
}

window.Hero = Hero;
