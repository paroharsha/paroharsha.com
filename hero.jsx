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
      {/* drifting watercolour botanicals — flower heads & leaves */}
      <FloatingMark style={{ top:"13%", left:"9%", ...par(-32) }}  kind="leaf-ginkgo"   size={62} delay={0}/>
      <FloatingMark style={{ top:"20%", right:"11%", ...par(40) }} kind="head-cosmos"   size={58} delay={1.2}/>
      <FloatingMark style={{ top:"73%", left:"15%", ...par(-22) }} kind="head-daisy"    size={54} delay={2.4}/>
      <FloatingMark style={{ top:"65%", right:"13%", ...par(28) }} kind="leaf-maple"    size={50} delay={0.6}/>
      <FloatingMark style={{ top:"41%", left:"3%", ...par(-50) }}  kind="head-lavender" size={46} delay={1.8}/>
      <FloatingMark style={{ top:"37%", right:"4%", ...par(50) }}  kind="head-cosmos"   size={34} delay={3.0}/>
      <FloatingMark style={{ top:"86%", left:"42%", ...par(-12) }} kind="head-daisy"    size={30} delay={2.0}/>
      <FloatingMark style={{ top:"7%",  left:"46%", ...par(20) }}  kind="leaf-oak"      size={30} delay={1.0}/>
      <FloatingMark style={{ top:"53%", left:"35%", ...par(14) }}  kind="leaf-ginkgo"   size={26} delay={2.7}/>
      <FloatingMark style={{ top:"57%", right:"35%", ...par(-18) }} kind="head-lavender" size={32} delay={3.6}/>
      <FloatingMark style={{ top:"29%", left:"29%", ...par(-8) }}  kind="head-cosmos"   size={24} delay={4.2}/>
      <FloatingMark style={{ top:"30%", right:"30%", ...par(8) }}  kind="leaf-maple"    size={24} delay={4.8}/>

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
          MARGIN<span className="italic" style={{ color:"var(--blush)" }}>alia</span>
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
          <button className="btn" onClick={onOpenFeatured}>Pick a bloom ⟶</button>
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
              background:`linear-gradient(90deg, rgba(255,253,245,0.9) 0%, rgba(207,224,160,0.45) 42%, transparent 100%)`,
              filter:`drop-shadow(0 0 8px rgba(255,250,225,0.55))`,
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
