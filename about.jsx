// about.jsx — About page
function About(){
  return (
    <section style={{ padding:"60px 36px 100px", maxWidth:1200, margin:"0 auto" }}>
      <div className="eyebrow" style={{ marginBottom:16 }}>About</div>
      <h1 style={{
        fontFamily:"var(--font-display)",
        fontSize:"clamp(60px, 10vw, 160px)",
        lineHeight:0.9,
        letterSpacing:"-0.02em",
        marginBottom:60
      }}>
        About <span className="italic" style={{ color:"var(--blush)" }}>me.</span>
      </h1>

      <div style={{
        display:"grid",
        gridTemplateColumns:"minmax(0, 1.2fr) minmax(0, 1fr)",
        gap:80,
        alignItems:"start"
      }}>
        <div className="glass" style={{ padding:"36px 40px" }}>
          <p style={{
            fontFamily:"var(--font-display)",
            fontStyle:"italic",
            fontSize:"clamp(24px, 2.6vw, 34px)",
            lineHeight:1.4,
            color:"var(--ink)",
            marginBottom:36,
            textWrap:"pretty"
          }}>
            <span style={{ color:"var(--blush)" }}>“</span>The effort of an artist is to demystify and comprehend.<span style={{ color:"var(--blush)" }}>”</span>
          </p>

          <p style={{ fontSize:18, lineHeight:1.7, color:"var(--ink)", marginBottom:22, textWrap:"pretty" }}>
            I am inspired by the people around me. Their interactions with each other, their interactions with themselves and their engagement with the world around them offer so much to me as an artist. Each interaction is unique. These permutations and combinations help me to inform my art.
          </p>

          <p style={{ fontSize:18, lineHeight:1.7, color:"var(--ink)", marginBottom:22, textWrap:"pretty" }}>
            My work is a mixture of representation and abstraction that offers space for the viewer to participate and engage with each work of art. I aim to create space for people to find themselves in my artwork. Hidden, somewhere on the canvas, is a memory or a moment for everyone who sees it.
          </p>

          <p style={{ fontSize:18, lineHeight:1.7, color:"var(--ink)", marginBottom:22, textWrap:"pretty" }}>
            I am primarily a digital artist. However, I have done several works in oil and acrylic, which I continue to explore as mediums of expression. I am always experimenting with other mediums and finding new ways to express myself.
          </p>

          <div style={{
            marginTop:48,
            display:"grid",
            gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",
            gap:24,
            borderTop:"1px solid var(--line)",
            paddingTop:32
          }}>
            <FactBox label="Medium" value="Digital & mixed media"/>
            <FactBox label="Based in" value={<>India&nbsp;<Leaf size={15} color="var(--emerald)" style={{ marginRight:0 }}/></>}/>
            <FactBox label="Themes" value="Self, myth, madness, pain, joy"/>
            <FactBox label="Years" value="∞ — ongoing"/>
          </div>

          <div style={{ marginTop:48, display:"flex", gap:14, flexWrap:"wrap" }}>
            <a className="btn" href="mailto:paromita.harsha@gmail.com">Write to me ✉</a>
            <a className="btn btn-ghost" href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
          </div>
        </div>

        <div style={{ display:"flex", flexDirection:"column" }}>
          {/* portrait — removed until a self-portrait is painted; image kept in assets/ */}

          {/* materials list */}
          <div className="glass" style={{ padding:"24px 28px" }}>
            <div className="eyebrow" style={{ marginBottom:14 }}>The toolkit</div>
            <ul style={{ listStyle:"none", padding:0, margin:0, display:"grid", gap:6 }}>
              {[
                ["pencil", "Graphite, mostly Staedtler 2B"],
                ["pigment", "Acrylic, gouache, coloured pencil, pastels"],
                ["digital", "iPad + Procreate, Concepts"],
                ["paper", "Recycled boxes, cards, canvas — any paper available"],
                ["other", "Notebooks. Many. Always."],
              ].map(([k,v])=>(
                <li key={k} style={{ display:"grid", gridTemplateColumns:"100px 1fr", gap:14, fontSize:14, padding:"8px 0", borderBottom:"1px dashed var(--line)" }}>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.2em", color:"var(--ink-faint)", textTransform:"uppercase" }}>{k}</span>
                  <span style={{ color:"var(--ink-dim)" }}>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FactBox({ label, value }){
  return (
    <div>
      <div style={{ fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.22em", color:"var(--sky)", textTransform:"uppercase", marginBottom:8 }}>
        {label}
      </div>
      <div style={{ fontFamily:"var(--font-display)", fontStyle:"italic", fontSize:18, color:"var(--ink)" }}>
        {value}
      </div>
    </div>
  );
}

window.About = About;
