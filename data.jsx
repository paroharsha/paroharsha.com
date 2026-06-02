// data.jsx — pieces shown across the site
// Real titles from Paro's site + a few invented neighbors for constellation density.
// Each piece has a "story" (full text) for ones with writing; others are art-only.

const PIECES = [
  {
    id: "the-gates",
    title: "The gates",
    date: "Jun 2, 2026",
    read: "5 min",
    palette: ["#1f7a5b", "#e3b047"],
    glyph: "fern",
    pos: { x: 0.84, y: 0.80 },
    image: "assets/the-gates.jpg",
    excerpt: "There is a gate at the edge of every world.",
    story: [
      "There is a gate at the edge of every world. The Sumerians knew this with the kind of certainty that doesn't require argument - it was simply woven into the fabric of how they understood existence to be organised. The great below had seven gates, each with a keeper, each demanding something of the one who wished to pass. Neti stood watch. Ereshkigal, dark and sovereign, waited at the centre. And the gates themselves were not passive things, not mere stone and bar and bolt. They were instruments of transformation. To pass through was to be altered. To arrive on the other side was to have already lost something - a crown, a robe, a name - and to have become, by that loss, more essentially yourself.",
      "I think about this when I look at old arches. The kind that have shed most of what they were built to hold up, that have lost their walls to time and their purpose to entropy, and yet remain - curved and patient and draped in whatever the vines have chosen to offer them. There is a stone arch I keep returning to, in imagination if not always in body, that stands alone in a field of long grass. It holds nothing up. It keeps nothing out. It is, by any practical measure, a failure of architecture. And yet it is perhaps the most powerful structure I know, because it has crossed over from the category of wall into the category of threshold - and thresholds, once they exist, are very difficult to unmake. The Sumerians would have recognised it. They would have known that such a place requires tending.",
      "The creature that tends it is small and green and very old.",
      "Not old as in ancient, though perhaps that too. Old as in prior - as if it existed before the concept of urgency was introduced into the world and simply never adopted it. It sits in the grass before the arch with the particular stillness of something that understands waiting as a practice rather than an inconvenience. Its back is to you. It faces the light. And what a light it is - not sunlight, not quite, but the specific luminosity that seems to exist only at the edge of comprehension, that quality of elsewhere that you find at the border of forests, at the surface of very deep water, in the moment just before sleep delivers you somewhere you did not expect to go. The light does not explain itself. It doesn't need to.",
      "The creature - the frog, let us call it what it is - is a threshold being by nature. It was made for in-between places. It breathes through its skin, which means it is always, at the level of biology, in conversation with the world around it. It belongs to water and land both and therefore fully to neither. It knows the mud at the bottom of things and the open air at the top of things and it moves between them without drama, without ceremony, without any apparent sense that this is remarkable. When it sits before the gate, then, it is not waiting the way that you or I might wait - with impatience coiled underneath the stillness, with one eye on the clock, with the future tugging at the sleeve of the present. It waits the way stone waits. The way moss waits. The way the arch itself waits, year after year, for whatever the light is going to do next.",
      "Inanna descended to the Kur with ears open to the great below. That phrase - ears open - has stayed with me for years. It suggests not just willingness but a quality of active, directed receptivity. She was not resigned to the crossing. She was listening to it. Attending to it with every faculty available to her before the gates began their work of undoing. There must have been a moment, standing before the first gate, before Neti's hand moved to the bolt, when she simply stood and breathed and looked at the light. Not the light of the world she was leaving. The other light. The strange one.",
      "The frog already knows what she learned.",
      "It has been sitting at this gate long before you arrived, and it will be sitting here long after. It is not guarding anything, not exactly - or if it is, it guards it the way certain presences guard sacred sites, not by keeping things out but by maintaining the quality of attention that a place requires in order to remain what it is. A gate unattended becomes simply a gap in a wall. A gate with a keeper is a gate with a purpose, even if that purpose is only this: to mark the place where one kind of world ends and another begins. To hold space for the crossing. To bear witness, with its ancient and unhurried patience, to the moment when something - or someone - gathers itself at last and steps through.",
      "The light waits on the other side.",
      "It always has."
    ],
  },
  {
    id: "sixth-hour",
    title: "The Sixth Hour",
    date: "Aug 17, 2025",
    read: "1 min",
    palette: ["#1f7a5b", "#c14a36"],
    glyph: "sprig",
    pos: { x: 0.52, y: 0.34 },      // 0..1 in constellation
    featured: true,
    image: "assets/sixth-hour.avif",
    excerpt: "Some days the Vessel shatters beneath the weight of its own cosmos.",
    story: [
      "Some days the Vessel shatters beneath the weight of its own cosmos. Hollowed. Emptied. The Great Fatigue manifests at the sixth hour, an ancient specter that knows the rhythms of your existence better than you comprehend them yourself.",
      "Agony coils around your essence like the World Serpent, constricting until each fragment of your being wails in silent rebellion. Your form — this decaying temple — becomes distorted, stretched beyond the boundaries written in the primordial codex.",
      "This Fatigue is no mere affliction but a self-forged chain, etched deeper into your spirit with each revolution of the celestial wheel.",
      "From the time of small shadows, we are taught to turn the sacred blade inward. \u201CThe sacrifice of Self is the purest offering to the gods,\u201D they intone. \u201CBeware the nectar of pleasure — it is the corruption from the Western Realms, selfish and chaotic.\u201D They command us to cast aside our divine spark, to lay ourselves endlessly upon the Stone of Surrender. \u201CYour purpose,\u201D they decree, \u201Ccan only manifest through eternal abnegation.\u201D",
      "And so the Self — your true Self — genuflects before these ancient diktats. It relinquishes its throne. It forsakes resistance. No oracle foretold this daily visitation, this exhaustion that arrives with cosmic precision at the sixth hour, the inevitable harvest of a life consecrated to everything but your own sacred flame.",
      "You can try to reclaim yourself like an angry insect tries to escape from a pool of water. Your guilt pulls you deeper and deeper until your own sacrifice is meaningless in the face of the hedonist who laughs joyfully, gleefully just beyond your reach."
    ]
  },
  {
    id: "silly-girl",
    title: "That silly girl",
    date: "Jul 29, 2025",
    read: "2 min",
    palette: ["#c14a36", "#1f7a5b"],
    glyph: "bluebell",
    pos: { x: 0.18, y: 0.58 },
    image: "assets/that-silly-girl.avif",
    excerpt: "Shouldn't I be perfect, little bird?",
    story: [
      "Shouldn't I be perfect, little bird?",
      "Shouldn't my life reflect the fortune of my circumstances? Shouldn't the privilege and opportunity bestowed upon me manifest as flawlessness in my being?",
      "Why do I find myself congealed around myself, folding inward like origami with too many creases? Why am I gathering in knots and twisting sinew, my body a map of tensions that shouldn't exist in such comfort? Why does my mind curl into itself despite everything?",
      "How have I become this labyrinth of anxieties when the path before me was cleared of obstacles?",
      "What explains this discord between my external blessings and internal turmoil?",
      "Shouldn't I be perfect, little bird?",
      "Shouldn't these advantages have shaped me into something flawless? Shouldn't I stand as testament to what prosperity can create when applied to human clay?",
      "Why has the sculptor's hand failed to form symmetry from such fine material?",
      "Why am I so disjointed, as though my parts don't quite fit together properly? Why am I distorted like a reflection in troubled water and stretched out of shape like clay pulled too thin? What force has warped me when everything around me seems designed for harmony? How have I become this mosaic of misaligned pieces despite the careful arrangement of my world?",
      "I don't want a resolution. Life in self pity is very comfortable. There's a certain sweetness in melancholy that becomes addictive, a familiar embrace I've grown accustomed to wearing.",
      "But i also want to be happy. Somewhere beneath these layers of contemplative sadness lies a yearning for lightness I cannot ignore."
    ],
  },
  {
    id: "hell-hath",
    title: "Hell hath no fury like a city scorned",
    date: "Jan 25, 2025",
    read: "3 min",
    palette: ["#c14a36", "#e3b047"],
    glyph: "poppy",
    pos: { x: 0.78, y: 0.62 },
    image: "assets/hell-hath.avif",
    excerpt: "The city seethes with an ancient and terrible fury.",
    story: [
      "The city seethes with an ancient and terrible fury. Her streets pulse with remembered betrayals, each abandoned building a wound that refuses to heal. The skyscrapers rise like rigid fingers pointing accusingly at the sky, while beneath them, the subway tunnels echo with the whispers of broken promises.",
      "In her concrete heart, she holds every slight: the neighborhoods left to decay, the communities scattered to the winds, the dreams demolished for profit. Her rage manifests in the howling wind between buildings, in the sudden darkness of power outages, in the burst pipes that flood basement apartments.",
      "She remembers everything. The politicians who courted her favor with honeyed words, only to abandon her districts once elected. The developers who promised gardens and delivered parking lots. The industries that wooed her with jobs, then left her children unemployed and her air thick with pollutants.",
      "At night, her streetlights flicker like warning signals, and her traffic lights turn red in synchronized defiance. She wraps her forgotten ones in blankets of shadow, sheltering them in her angry embrace. The city's vengeance is slow but inexorable — a gradual reclaiming, a persistent reminder that she was here first and will remain long after those who spurned her are gone.",
      "Her fury manifests not in grand gestures but in the daily accumulation of small rebellions: unexplained power surges, mysterious water main breaks, traffic snarls that appear without cause. She is patient in her retribution, for cities measure time in decades, not days. And like any scorned lover, she ensures that those who betrayed her trust will never forget the consequences of their disloyalty."
    ]
  },
  {
    id: "guardian",
    title: "A Guardian at the gates",
    date: "Aug 21, 2024",
    read: "2 min",
    palette: ["#c14a36", "#1f7a5b"],
    glyph: "fern",
    pos: { x: 0.36, y: 0.74 },
    image: "assets/guardian.avif",
    excerpt: "She walks towards the gates of Nippur. Within it live gods, not men.",
    story: [
      "She walks towards the gates of Nippur. Within it live gods, not men. \"Not men,\" she thinks to herself.",
      "\"Not the men.\"",
      "Before her stood Nuska twice over. It guarded the great city. It appeared to be all genders and none. It appeared once and then once again.",
      "\"Not the men,\" she repeated, her voice barely above a whisper as if she could disappear if she made herself small enough.",
      "Nuska asked in two voices, three voices, all the voices. \"Why should I let you enter the utopian city of the gods?\"",
      "\"They have torn me to pieces. I seek shelter in your gardens. I seek rest, and I seek relief.\"",
      "Nuska was laughing.",
      "\"There can be no relief where still there lies anger.\"",
      "She was infuriated by this mention of anger.",
      "\"Look at my body! What can I do but be angry? I do not deserve what has happened to me. I deserve to rest! I deserve relief!\"",
      "\"The sooner you accept that all things are arbitrary, the sooner you will find relief.\"",
      "She could not believe what she had been told. All her strength left her.",
      "She turned her back on Nippur to face the world with all its broken pieces more evident than ever before.",
      "NO. There would not be relief."
    ]
  },
  {
    id: "stands-behind",
    title: "She always stands behind",
    date: "Aug 2, 2024",
    read: "2 min",
    palette: ["#c14a36", "#2a6fdb"],
    glyph: "daisy",
    pos: { x: 0.66, y: 0.18 },
    image: "assets/she-always-stands-behind.avif",
    excerpt: "A successful woman is only a good woman if she doesn't enjoy her success.",
    story: [
      "I saw a video online in which a very famous actress married a very famous actor, and his mother had this to say about her: \"She always stands behind me and her husband. She doesn't push herself in front.\" I am paraphrasing here.",
      "A successful woman is only a good woman if she doesn't enjoy her success.",
      "The idea was not new.",
      "The idea, however, became inextricably linked to the idea of quiet frustration that I had seen elsewhere, on the other end of the spectrum. A woman who I knew in my hometown who delivered milk on a cycle every day, wasn't allowed to wear a salwar kameez. She had to cycle in her sari, which would get tangled in the wheels of the cycle if she was not careful. The household that depended on her income, depended on her for their honour too. Walk behind. Don't presume. What you do is the reflection of who WE are.",
      "What is the difference between the two people really?"
    ],
  },
  {
    id: "nirah",
    title: "Nirah",
    date: "Jun 25, 2024",
    read: "1 min",
    palette: ["#1f7a5b", "#c14a36"],
    glyph: "sprig",
    pos: { x: 0.86, y: 0.32 },
    image: "assets/nirah.avif",
    excerpt: "Nirah brings a message from the watchful sky.",
    story: [
      "Nirah brings a message from the watchful sky. He arrives at the gates of Nippur with torment in his heart. \"I can see the future,\" he tells the very first woman. \"Your kind will destroy everything.\"",
      "The men go to war as civilisation falls apart — the very first lesson in history. The first time there was ever a mistake.",
      "Is it just a coincidence that the messenger was a snake?"
    ],
  },
  {
    id: "heatwave",
    title: "The heatwave",
    date: "Jun 20, 2024",
    read: "1 min",
    palette: ["#c14a36", "#e3b047"],
    glyph: "poppy",
    pos: { x: 0.12, y: 0.28 },
    image: "assets/heatwave.avif",
    excerpt: "The Concrete jungle is a cliche, maybe, but we turned into animals nonetheless.",
    story: [
      "The city was the hottest it had ever been in its existence. The cruelty of the heat was not abated by the fact that it was self-inflicted. Concrete? So what?",
      "The Concrete jungle is a cliche, maybe, but we turned into animals nonetheless."
    ],
  },
  {
    id: "the-djinn-within",
    title: "The Djinn within",
    date: "Jun 2, 2024",
    read: "1 min",
    palette: ["#e3b047", "#2a6fdb"],
    glyph: "clover",
    pos: { x: 0.50, y: 0.86 },
    image: "assets/the-djinn-within.avif",
    excerpt: "Little girls — they do dream.",
    story: [
      "Explorations of childhood.",
      "\"Little girls — they do dream.\"",
      "The little girl had found the spirit within her innocence. She knew that if she let the world take her idealism she would lose her golden, shining, spirit.",
      "\"When I grow up I want to build worlds,\" said the little girl to the Djinn. The shining spirit said that she would indeed build worlds, if she showed that she had strength and courage.",
      "But she was not ready to grow up yet."
    ],
  },
  {
    id: "moving",
    title: "Moving",
    date: "Apr 17, 2024",
    read: "2 min",
    palette: ["#e3b047", "#c14a36"],
    glyph: "bluebell",
    pos: { x: 0.30, y: 0.46 },
    image: "assets/moving-1.avif",
    images: ["assets/moving-1.avif", "assets/moving-2.avif", "assets/moving-3.avif"],
    excerpt: "I took my very first steps. I will keep moving.",
    story: [
      "My strength found me when I was in an extreme crisis. I closed myself to all forms of communication, and I repeated that I was better off alone. We all do it now and then when it's easier to play victim than hold ourselves accountable.",
      "I hid from my strength and capacity until I could feel, hold, and hear myself better.",
      "Then I said, I can change.",
      "With the knowledge that I knew myself, I was free. I did not need to open myself up to anyone else. Now, I am open to receiving myself.",
      "The light that covers us is the light that sets us free. I drew myself from the darkness and held every part of myself open to every other part of myself.",
      "I took my very first steps. I will keep moving."
    ],
  },
  {
    id: "bagh",
    title: "Bagh",
    date: "Apr 17, 2024",
    read: "3 min",
    palette: ["#c14a36", "#1f7a5b"],
    glyph: "daisy",
    pos: { x: 0.58, y: 0.62 },
    image: "assets/bagh.avif",
    excerpt: "In the jungle, they know her by so many names — except the one by which she knows herself.",
    story: [
      "Last year, around the time of the Durga puja, I spent some time in south Bengal at my ancestral home. South Bengal is rife with stories of Dokhin Rai, the tiger demon king, and Bon Bibi, the goddess that delivers us from him. One of my favourite books, \"The Hungry Tide\" by Amitav Ghosh, mentions this story. In South Bengal, I saw Bon Bibi everywhere. She was all the young women who were ambitious, hard-working and putting their kids through school while being personally persecuted by men or seniors in their lives. She is undaunted.",
      "In the wild jungles, washed by the monsoon, stands a temple.",
      "A woman has bathed in the temple well for thousands of years.",
      "She is smooth like a stone on the bottom of a river bed.",
      "Her many lives have been washed away, and she has become anew what she used to be: once again an infant, once again a child, once again an adolescent, once again a youth, once again a woman, once again an aged senior, once again a corpse.",
      "In the jungle, they know her by the name of Bhagh.",
      "She walks amongst the trees, camouflaged and silent.",
      "In the jungle, they know her by the name of Huli.",
      "When she is angry, you can hear her everywhere.",
      "In the jungle, they know her as Bon Bibi.",
      "She is the defeater of Dokhin Rai.",
      "In the jungle, they know her by so many names",
      "Except for the name by which she knows herself…"
    ],
  },
];

// Botanical motifs — delicate Beatrix-Potter-style leaves & flowers, one per piece.
function PieceGlyph({ kind, size=120, color="#36412c" }){
  const s = size;
  const common = { width:s, height:s, viewBox:"0 0 100 100", fill:"none", stroke:color,
    strokeWidth:1.6, strokeLinecap:"round", strokeLinejoin:"round" };
  switch(kind){
    case "daisy": {
      const petals = [...Array(9)].map((_,i)=>{
        const a=(i/9)*Math.PI*2; const cx=50+Math.cos(a)*20; const cy=50+Math.sin(a)*20;
        return <ellipse key={i} cx={cx} cy={cy} rx="6.5" ry="16"
                 transform={`rotate(${a*180/Math.PI+90} ${cx} ${cy})`}/>;
      });
      return <svg {...common}>{petals}<circle cx="50" cy="50" r="8.5" fill={color} stroke="none"/></svg>;
    }
    case "poppy": {
      const petals=[0,1,2,3].map(i=>{
        const a=(i/4)*Math.PI*2 - Math.PI/2; const cx=50+Math.cos(a)*15; const cy=48+Math.sin(a)*15;
        return <ellipse key={i} cx={cx} cy={cy} rx="18" ry="21"
                 transform={`rotate(${a*180/Math.PI+90} ${cx} ${cy})`}/>;
      });
      const stamen=[...Array(7)].map((_,i)=>{ const a=(i/7)*Math.PI*2;
        return <line key={i} x1="50" y1="48" x2={50+Math.cos(a)*7} y2={48+Math.sin(a)*7}/>; });
      return <svg {...common}>{petals}<circle cx="50" cy="48" r="5.5" fill={color} stroke="none"/>{stamen}</svg>;
    }
    case "fern": {
      const leaflets=[];
      for(let i=0;i<6;i++){ const y=24+i*10.5; const len=22-i*2.6;
        leaflets.push(<path key={'l'+i} d={`M50 ${y} q -${len} -4 -${len} 7`}/>);
        leaflets.push(<path key={'r'+i} d={`M50 ${y} q ${len} -4 ${len} 7`}/>); }
      return <svg {...common}><path d="M50 16 C 50 46, 50 70, 50 90"/>{leaflets}</svg>;
    }
    case "sprig": return (
      <svg {...common}>
        <path d="M50 90 C 50 62, 50 40, 50 14"/>
        <path d="M50 30 q -15 -7 -19 4 q 13 6 19 -4 Z"/>
        <path d="M50 46 q -17 -7 -22 5 q 15 6 22 -5 Z"/>
        <path d="M50 58 q 17 -7 22 5 q -15 6 -22 -5 Z"/>
      </svg>
    );
    case "bluebell": {
      const stem = "M42 14 C 58 30, 62 60, 54 90";
      const bells = [[45,42],[51,58],[56,74]].map(([x,y],i)=>(
        <path key={i} d={`M${x-7} ${y} q 0 11 7 14 q 7 -3 7 -14 q -3 -4 -7 -4 q -4 0 -7 4 Z`}/>
      ));
      return <svg {...common}><path d={stem}/>{bells}</svg>;
    }
    case "clover": {
      const lobes=[-90,30,150].map((deg,i)=>{ const a=deg*Math.PI/180;
        const cx=48+Math.cos(a)*13; const cy=40+Math.sin(a)*13;
        return <ellipse key={i} cx={cx} cy={cy} rx="11" ry="13"
                 transform={`rotate(${deg+90} ${cx} ${cy})`}/>; });
      return <svg {...common}>{lobes}<path d="M48 52 C 50 68, 50 80, 53 92"/></svg>;
    }
    case "bud": return (
      <svg {...common}>
        <path d="M50 92 C 50 70, 50 56, 50 44"/>
        <path d="M50 14 C 39 21, 39 40, 50 46 C 61 40, 61 21, 50 14 Z"/>
        <path d="M44 28 C 46 37, 48 42, 50 45 M56 28 C 54 37, 52 42, 50 45"/>
        <path d="M50 64 q -16 -7 -21 5 q 14 5 21 -5 Z"/>
      </svg>
    );
    case "leaf": return (
      <svg {...common}>
        <path d="M50 10 C 24 30, 20 66, 50 92 C 80 66, 76 30, 50 10 Z"/>
        <path d="M50 18 L50 86"/>
        <path d="M50 38 L34 30 M50 52 L66 44 M50 66 L36 58"/>
      </svg>
    );
    default: return (
      <svg {...common}>
        <path d="M50 90 C 50 62, 50 40, 50 14"/>
        <path d="M50 44 q -16 -8 -22 4 q 14 6 22 -4 Z"/>
        <path d="M50 58 q 16 -8 22 4 q -14 6 -22 -4 Z"/>
      </svg>
    );
  }
}

// Tiny inline two-leaf sprig — replaces the little ✦/❀ marks in labels.
function Leaf({ size=13, color="currentColor", style }){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      style={{ display:"inline-block", verticalAlign:"-0.12em", marginRight:"0.55em", ...style }}>
      <path d="M12 21 C 12 14, 12 10, 12 4"/>
      <path d="M12 11.5 C 7 9.5, 4 11.5, 4 15.5 C 9 15.5, 12 13.5, 12 11.5 Z"/>
      <path d="M12 8 C 17 6, 20 8, 20 12 C 15 12, 12 10, 12 8 Z"/>
    </svg>
  );
}

window.PIECES = PIECES;
window.PieceGlyph = PieceGlyph;
window.Leaf = Leaf;
