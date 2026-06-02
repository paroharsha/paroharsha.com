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
      {/* drifting garden things — leaves, petals, blossoms, dandelion seeds */}
      <FloatingMark style={{ top:"14%", left:"10%", ...par(-32) }} kind="leaf"  size={56} color="#4f9a5f" delay={0}/>
      <FloatingMark style={{ top:"22%", right:"12%", ...par(40) }}  kind="bloom" size={36} color="var(--cobalt)" delay={1.2}/>
      <FloatingMark style={{ top:"74%", left:"16%", ...par(-22) }}  kind="petal" size={42} color="#e08aa3" delay={2.4}/>
      <FloatingMark style={{ top:"66%", right:"14%", ...par(28) }}  kind="leaf"  size={38} color="#5aa06a" delay={0.6}/>
      <FloatingMark style={{ top:"42%", left:"4%", ...par(-50) }}   kind="seed"  size={30} color="#f3ecd4" delay={1.8}/>
      <FloatingMark style={{ top:"38%", right:"5%", ...par(50) }}   kind="petal" size={26} color="#eaa6bd" delay={3.0}/>
      <FloatingMark style={{ top:"86%", left:"42%", ...par(-12) }}  kind="bloom" size={22} color="var(--blush)" delay={2.0}/>
      <FloatingMark style={{ top:"8%",  left:"46%", ...par(20) }}   kind="seed"  size={20} color="#f3ecd4" delay={1.0}/>
      <FloatingMark style={{ top:"54%", left:"36%", ...par(14) }}   kind="leaf"  size={18} color="#6fae74" delay={2.7}/>
      <FloatingMark style={{ top:"58%", right:"36%", ...par(-18) }} kind="petal" size={24} color="#e08aa3" delay={3.6}/>
      <FloatingMark style={{ top:"30%", left:"30%", ...par(-8) }}   kind="bloom" size={16} color="var(--cobalt)" delay={4.2}/>
      <FloatingMark style={{ top:"30%", right:"30%", ...par(8) }}   kind="seed"  size={16} color="#f3ecd4" delay={4.8}/>

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
  const soft = { filter:`drop-shadow(0 2px 5px rgba(54,65,44,0.25))` };
  // a single leaf with a midrib
  if(kind === "leaf"){
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" style={soft}>
        <path d="M50 6 C 22 26, 16 64, 50 94 C 84 64, 78 26, 50 6 Z" fill={color}/>
        <path d="M50 14 L50 88" stroke="rgba(54,65,44,0.35)" strokeWidth="2" fill="none"/>
        <path d="M50 40 L34 32 M50 54 L66 46 M50 68 L36 60" stroke="rgba(54,65,44,0.22)" strokeWidth="1.6" fill="none"/>
      </svg>
    );
  }
  // a soft single petal
  if(kind === "petal"){
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" style={soft}>
        <path d="M50 8 C 78 28, 78 70, 50 92 C 22 70, 22 28, 50 8 Z" fill={color}/>
        <path d="M50 20 C 60 40, 60 64, 50 84" stroke="rgba(255,255,255,0.45)" strokeWidth="2" fill="none"/>
      </svg>
    );
  }
  // a little five-petal blossom with a sunny center
  if(kind === "bloom"){
    const petals = [0,1,2,3,4].map(i=>{
      const a = (i/5)*Math.PI*2 - Math.PI/2;
      const cx = 50 + Math.cos(a)*26;
      const cy = 50 + Math.sin(a)*26;
      return <ellipse key={i} cx={cx} cy={cy} rx="16" ry="22"
                transform={`rotate(${a*180/Math.PI + 90} ${cx} ${cy})`} fill={color}/>;
    });
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" style={soft}>
        {petals}
        <circle cx="50" cy="50" r="13" fill="#f4d35e"/>
        <circle cx="50" cy="50" r="13" fill="none" stroke="rgba(54,65,44,0.18)" strokeWidth="1.4"/>
      </svg>
    );
  }
  // a downy dandelion seed — tuft on a thin stalk
  if(kind === "seed"){
    const spokes = [...Array(11)].map((_,i)=>{
      const a = (i/11)*Math.PI*2;
      return <line key={i} x1="50" y1="34" x2={50+Math.cos(a)*26} y2={34+Math.sin(a)*26}
                stroke={color} strokeWidth="1.6"/>;
    });
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" style={soft}>
        <line x1="50" y1="34" x2="50" y2="94" stroke={color} strokeWidth="1.6"/>
        {spokes}
        <circle cx="50" cy="34" r="3.5" fill="#fff"/>
      </svg>
    );
  }
  return null;
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
