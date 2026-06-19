// data.jsx — pieces shown across the site
// Real titles from Paro's site + a few invented neighbors for constellation density.
// Each piece has a "story" (full text) for ones with writing; others are art-only.

const PIECES = [
  {
    id: "lingnan-tiandi",
    title: "Lingnan Tiandi",
    date: "Jun 19, 2026",
    read: "7 min",
    palette: ["#c14a2b", "#6d9450"],
    glyph: "leaf-maple",
    pos: { x: 0.68, y: 0.42 },
    image: "assets/lingnan-tiandi.jpg",
    excerpt: "A name that translates, beautifully, to land south of the mountains.",
    story: [
      "The day began with excitement. We completed the last of our shopping and we were ready to go home. Home! After a week in Foshan. Yes we were happy, but not without a hint of sadness. Can a city in a country famous for its xenophobia really make you sad to leave?",
      "We went to a restaurant on our first night there because lil sis was so excited that we were out and about together. After a little rest, I was too. There was a lovely Michelin Bib awarded restaurant in the historic area of Lingnan Tiandi — a name that translates, beautifully, to land south of the mountains. Foshan sits at the heart of Lingnan culture, that distinct civilisation of the Pearl River Delta that has always been a little apart from the China of the north. The area we were staying in had been carefully preserved — Qing and Republican-era shophouses and ancestral halls restored and breathing again, arranged around slow canals. Foshan itself is one of China's four great ancient towns, famous for centuries for its ceramics, its silk, its iron casting, and for something more visceral: its martial arts. This is the city that gave the world Ip Man. That gave the world Wing Chun. That gave the world, by blood if not by birth, Bruce Lee. There is something in the air here — a kind of quiet, grounded pride. You feel it in the architecture. You feel it in the people.",
      "We ate with all the gusto of people discovering a new culture and a new cuisine — because let's face it, what we eat back home isn't Chinese food really. The waitress, who did not know a lick of English, managed to make friends with us and loved that we ate with chopsticks and drank Chinese tea before our meal. On our way out, for lack of words, she blew us a flying kiss. We got a finger heart from the ice cream vendor girl. The salesgirl at Anta took a picture with us.",
      "The people of Foshan are kind and wonderful. They are accommodating and welcoming. I have certainly felt much more racism in the west than I have in the east. More unwelcome in certain parts of my own country — even my own city. Indian men love to make you feel uncomfortable.",
      "So how much of this xenophobia is real and how much is propaganda?",
      "I think both things are true, and I think we need to hold them separately. There is state-level xenophobia in China that is very real — the treatment of Uyghurs and Tibetans, the historical hostility toward African students in Guangzhou, the machinery of a surveillance state that has crushed dissent with quiet efficiency. These are not fabrications. But there is also the interpersonal warmth of ordinary people — people who are not their government, who have not personally endorsed any of it, who are mostly just living their lives and, as it turns out, deeply charmed by two Indian women who eat with chopsticks. American and Indian media both have strong incentives to flatten China into a monolith of hostility. That flattening erases the actual humanity of 1.4 billion people. It also conveniently forgets that India and China have a long and layered history that is not simply one of antagonism.",
      "We have traded with each other along the Silk Road. Chinese Buddhist pilgrims — Faxian, Xuanzang — made the arduous journey to India to study at Nalanda, to walk in the footsteps of the Buddha. These were not the journeys of enemies. They were the journeys of seekers. And yet — 1962 happened. The war that India does not talk about enough, the war that shattered Nehru and reoriented our foreign policy for decades. Doklam happened. Galwan happened, and twenty of our soldiers came home in casings. The border remains unresolved, the relationship remains complicated, and it is right that we hold our governments to account for that. But a government's choices and a people's warmth are not the same thing. I will not make the people of Foshan answer for Beijing, any more than I would ask the people of Kerala to answer for New Delhi.",
      "Let me take my hat off to the Chinese men of Foshan too. We found only respect and chivalry from every man we came across. Lil sis and I felt perfectly safe walking around alone at night, wearing our shorts and strappy tops. Now I'm not under the impression that all of China is this safe, or that it is perfect. But can this really be said for any Indian city? Can I tell any woman to walk alone at night in Bengaluru — my own city — with impunity, wearing whatever she wants? I cannot.",
      "I have my problems with mainland China — chiefly the cruelty and testing on animals, and a government whose relationship with freedom and truth I find deeply troubling. But I can't throw stones.",
      "Which brings me to the question I keep turning over.",
      "Rousseau wrote that man is born free and everywhere he is in chains. But the chains, he argued, can be legitimate — when we enter into a social contract, we surrender certain freedoms to the collective, and in exchange, the collective owes us something back. Safety. Infrastructure. The conditions for a decent life. The question isn't whether we give things up. It's whether the exchange is honest.",
      "Do I have to compromise my personal freedoms to live in my country? Yes. Do I pay my taxes like a good girl? Yes. Like an upstanding, thoroughly middle-class citizen.",
      "What do I get in return?",
      "Not much. Not compared to what the average resident of Foshan seems to get for their considerably larger compromises. The Chinese state demands more — political conformity, surveillance, the absence of certain freedoms that are invisible to me as a visitor but very visible to a dissident, a journalist, a minority. And yet for the ordinary urban citizen, it delivers more too. Safety. Order. Functional cities that work.",
      "India extracts its costs quietly. The taxes. The ambient toll of being a woman in public space. The exhausting unreliability of institutions that were supposed to serve you. And then it returns to you — what, exactly?",
      "Stiglitz wrote about this — the social contract as economic arrangement, what markets owe to people, what inequality costs a society. But I keep coming back to Rousseau's simpler, older question. What do we surrender to the collective? And what does the collective owe us back?",
      "I'm still searching for an answer.",
    ],
  },
  {
    id: "hima",
    title: "Hima",
    date: "Jun 4, 2026",
    read: "2 min",
    palette: ["#6fb0cb", "#5a9152"],
    glyph: "head-cosmos",
    pos: { x: 0.2, y: 0.58 },
    image: "assets/hima.jpg",
    excerpt: "Do not fear. Nothing can happen to them here.",
    story: [
      "Night descends slowly on the valley. The rays of the setting sun cast long streaking shadows and light for hours — finding gaps in the surrounding mountains. “Golden gates” the pups call them.",
      "Hima has five puppies. Her pack lives on the other side of the mountains. But when they want to play, Hima brings her puppies to the golden valley.",
      "It is a safe place. All the creatures here are suffused with a slowness that speaks of no predators. It is an ancient and sacred place. The wolves themselves never come here to hunt.",
      "There is a clearing right in the middle where the puppies play while Hima sleeps or rolls in the grass, her white fur tinted green.",
      "The night eventually comes, bringing coolness. The puppies gather around her for warmth and cuddle up, lying on their backs beneath billions of stars. Hima teaches them the lupine constellations, just the way her mother taught her. Tomorrow they will return to the pack, through one of the golden gates, but for now they have not a care in the world.",
      "Did you feel a sense of fear or dread as I described their peace? Do not fear. Nothing can happen to them here.",
      "## The Wild Woman & the Wolf",
      "The most resonant relationship between woman and wolf, and the one Clarissa Pinkola Estés famously explored in Women Who Run With the Wolves (1992) — which draws on Jungian analysis of folklore to argue that the wolf represents the instinctual, creative, deep-knowing self in women, systematically domesticated out of them.",
      "Her key folklore texts include La Llorona (Latin America), a grieving mother whose wailing in the wilderness marks her as both dangerous and tragic; Bluebeard, the predator wolf in human clothing, teaching women discernment; and The Skeleton Woman (Inuit), about retrieving the wild self from the depths.",
      "Whether or not you buy the Jungian framework, she's documenting something real: across many traditions, the wolf-woman is the one who refuses containment. She will take her peace from you and find her peace in spite of you.",
    ],
  },
  {
    id: "enki-alam-zu",
    title: "Enki & Alam Zu",
    date: "Jun 2, 2026",
    read: "1 min",
    palette: ["#3f8a5b", "#5b97ab"],
    glyph: "head-daisy",
    pos: { x: 0.5, y: 0.2 },
    image: "assets/enki-alam-zu.jpg",
    excerpt: "Enki is rare. Somehow, in all this miasma, I have found him.",
    story: [
      "In Sumerian mythology, there is an entity Alam-zu. You see him in everyone around you. You feel like it is a burden to even be witness to their unhappy fumbling in the dark depths of their ignorance. Hilarious and tragic.",
      "Enki is rare. Somehow, in all this miasma, I have found him."
    ],
  },
  {
    id: "the-gates",
    title: "The gates",
    date: "Jun 2, 2026",
    read: "5 min",
    palette: ["#1f7a5b", "#e3b047"],
    glyph: "leaf-ginkgo",
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
];

// Botanical motifs — hand-painted watercolour cutouts (transparent PNGs).
const BOTANICAL = {
  "head-daisy":    "assets/botanical/head-daisy.png",
  "head-cosmos":   "assets/botanical/head-cosmos.png",
  "head-lavender": "assets/botanical/head-lavender.png",
  "leaf-ginkgo":   "assets/botanical/leaf-ginkgo.png",
  "leaf-oak":      "assets/botanical/leaf-oak.png",
  "leaf-maple":    "assets/botanical/leaf-maple.png",
  "stem-daisy":    "assets/botanical/stem-daisy.png",
  "stem-cosmos":   "assets/botanical/stem-cosmos.png",
  "stem-lavender": "assets/botanical/stem-lavender.png",
};

// color is accepted (callers still pass it) but ignored — the artwork carries its own colour.
function PieceGlyph({ kind, size=120, color }){
  const src = BOTANICAL[kind] || BOTANICAL["head-daisy"];
  return (
    <img src={src} alt="" aria-hidden="true" draggable="false" loading="lazy"
      style={{ width:size, height:size, objectFit:"contain", display:"block",
               filter:"drop-shadow(0 2px 5px rgba(54,65,44,0.20))" }}/>
  );
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
window.BOTANICAL = BOTANICAL;
window.Leaf = Leaf;
