/* ============================================================
   DAR NAJI — Carte & plats signatures
   Chaque plat signature : description, palette de saveurs,
   et une illustration or dessinée en SVG (remplaçable par une
   photo : renseigner `photo: "assets/plats/xxx.jpg"`).
   ============================================================ */

let __dnSeq = 0;

/**
 * Illustration de plat en trait d'or.
 * shape: 'tagine' | 'tanjia' | 'bowl' | 'pastilla' | 'fish' | 'skewer'
 */
function dishSVG(cfg) {
  const id = ++__dnSeq;
  const { shape = "tagine", accent = "#c99a4e" } = cfg;
  const gold = `url(#dngold${id})`;

  const defs = `
    <defs>
      <linearGradient id="dngold${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#e6c885"/>
        <stop offset=".55" stop-color="${accent}"/>
        <stop offset="1" stop-color="#8a6420"/>
      </linearGradient>
      <radialGradient id="dnhalo${id}" cx=".5" cy=".55" r=".5">
        <stop offset="0" stop-color="rgba(201,154,78,.28)"/>
        <stop offset="1" stop-color="rgba(201,154,78,0)"/>
      </radialGradient>
    </defs>`;

  const steam = `
    <g class="steam" fill="none" stroke="${gold}" stroke-width="2.2" stroke-linecap="round" opacity=".55">
      <path d="M96 74 C90 62 102 56 96 44"/>
      <path d="M124 70 C118 58 130 52 124 40"/>
    </g>`;

  let art = "";
  if (shape === "tagine") {
    art = `
      ${steam}
      <path d="M110 84 L110 96" stroke="${gold}" stroke-width="3"/>
      <circle cx="110" cy="80" r="7" fill="none" stroke="${gold}" stroke-width="3"/>
      <path d="M52 172 C52 128 78 96 110 96 C142 96 168 128 168 172 Z" fill="none" stroke="${gold}" stroke-width="4"/>
      <path d="M38 172 L182 172 C182 186 168 194 110 194 C52 194 38 186 38 172 Z" fill="none" stroke="${gold}" stroke-width="4"/>
      <path d="M75 150 C80 128 94 112 110 110" stroke="${gold}" stroke-width="2" fill="none" opacity=".5"/>`;
  } else if (shape === "tanjia") {
    art = `
      ${steam}
      <path d="M88 62 C88 54 132 54 132 62 L128 74 C120 80 100 80 92 74 Z" fill="none" stroke="${gold}" stroke-width="3.6"/>
      <path d="M92 76 C66 92 60 120 64 146 C68 176 88 192 110 192 C132 192 152 176 156 146 C160 120 154 92 128 76"
            fill="none" stroke="${gold}" stroke-width="4"/>
      <path d="M74 108 C70 128 72 152 80 168" stroke="${gold}" stroke-width="2" fill="none" opacity=".5"/>
      <path d="M64 132 L48 140 M156 132 L172 140" stroke="${gold}" stroke-width="3" stroke-linecap="round"/>`;
  } else if (shape === "bowl") {
    art = `
      ${steam}
      <path d="M110 96 C96 84 92 72 104 62 C96 74 118 78 110 96 Z" fill="${gold}" opacity=".85"/>
      <path d="M70 128 C78 106 96 94 110 94 C124 94 142 106 150 128 Z" fill="none" stroke="${gold}" stroke-width="3.4"/>
      <path d="M46 128 L174 128 C172 162 148 186 110 186 C72 186 48 162 46 128 Z" fill="none" stroke="${gold}" stroke-width="4"/>
      <path d="M84 108 L88 122 M110 100 L110 122 M136 108 L132 122" stroke="${gold}" stroke-width="2" opacity=".6"/>
      <path d="M90 194 L130 194" stroke="${gold}" stroke-width="3.4" stroke-linecap="round"/>`;
  } else if (shape === "pastilla") {
    art = `
      <ellipse cx="110" cy="140" rx="66" ry="30" fill="none" stroke="${gold}" stroke-width="4"/>
      <ellipse cx="110" cy="128" rx="66" ry="30" fill="none" stroke="${gold}" stroke-width="3"/>
      <path d="M44 128 L44 140 M176 128 L176 140" stroke="${gold}" stroke-width="3"/>
      <g stroke="${gold}" stroke-width="2" opacity=".7">
        <path d="M78 112 L96 126 M110 108 L110 126 M142 112 L124 126"/>
        <path d="M92 96 l4 6 M118 92 l0 7 M132 98 l-4 6"/>
      </g>
      <path d="M70 166 C86 174 134 174 150 166" stroke="${gold}" stroke-width="2" fill="none" opacity=".5"/>
      <circle cx="110" cy="70" r="3" fill="${gold}"/>
      <circle cx="94" cy="78" r="2.2" fill="${gold}"/>
      <circle cx="126" cy="78" r="2.2" fill="${gold}"/>`;
  } else if (shape === "fish") {
    art = `
      <path d="M42 138 C64 108 96 96 126 102 C150 107 166 122 174 138 C166 154 150 169 126 174 C96 180 64 168 42 138 Z"
            fill="none" stroke="${gold}" stroke-width="4"/>
      <path d="M174 138 L196 118 L188 138 L196 158 Z" fill="none" stroke="${gold}" stroke-width="3.4" stroke-linejoin="round"/>
      <circle cx="66" cy="132" r="4" fill="${gold}"/>
      <path d="M96 108 C104 124 104 152 96 170 M126 104 C136 124 136 154 126 174" stroke="${gold}" stroke-width="2" fill="none" opacity=".55"/>
      <path d="M60 190 L160 190" stroke="${gold}" stroke-width="3" stroke-linecap="round" opacity=".7"/>
      <path d="M70 196 L150 196" stroke="${gold}" stroke-width="2" stroke-linecap="round" opacity=".4"/>`;
  } else { // skewer
    art = `
      <path d="M40 176 L180 60" stroke="${gold}" stroke-width="3.4" stroke-linecap="round"/>
      <circle cx="184" cy="56" r="6" fill="none" stroke="${gold}" stroke-width="3"/>
      <g fill="none" stroke="${gold}" stroke-width="3.6">
        <path d="M64 156 q14 -20 34 -6 q-6 24 -30 20 q-10 -6 -4 -14 Z"/>
        <path d="M96 130 q14 -20 34 -6 q-6 24 -30 20 q-10 -6 -4 -14 Z"/>
        <path d="M128 104 q14 -20 34 -6 q-6 24 -30 20 q-10 -6 -4 -14 Z"/>
      </g>
      <path d="M52 196 L168 196" stroke="${gold}" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 230" role="img" aria-label="${cfg.label || ""}">
    ${defs}
    <ellipse cx="110" cy="128" rx="100" ry="86" fill="url(#dnhalo${id})"/>
    ${art}
  </svg>`;
}

/* ------------------------------------------------------------
   Plats signatures — carrousel
------------------------------------------------------------ */
const SIGNATURES = [
  {
    id: "tanjia", name: "Tanjia Marrakchia", price: 140, unit: "par personne",
    svg: { shape: "tanjia", label: "Tanjia" }, photo: null,
    tagline: "Cuite des heures dans les braises, comme à Marrakech.",
    description: "L'urne de terre cuite scellée confie la viande aux cendres du four du hammam. Elle en ressort confite, imprégnée de safran et de citron confit, si tendre qu'elle se détache à la cuillère.",
    saveurs: {
      "Épices & aromates": ["Safran", "Cumin", "Ail confit", "Smen"],
      "Le cœur": ["Viande confite", "Citron confit"],
      "La finale": ["Fondant", "Notes fumées des braises"]
    }
  },
  {
    id: "rfissa", name: "Rfissa Prestige", price: 95,
    svg: { shape: "bowl", label: "Rfissa" }, photo: null,
    tagline: "Poulet beldi, rziza, figues et dattes.",
    description: "Le plat des grandes occasions : des feuilles de rziza effilochées, baignées d'un bouillon au fenugrec et aux lentilles, couronnées d'un poulet beldi et de la douceur des figues et des dattes.",
    saveurs: {
      "Épices & aromates": ["Fenugrec", "Ras el-hanout", "Gingembre"],
      "Le cœur": ["Poulet beldi", "Rziza", "Lentilles"],
      "La finale": ["Figues", "Dattes", "Douceur enveloppante"]
    }
  },
  {
    id: "mrozia", name: "Mrozia", price: 130,
    svg: { shape: "tagine", label: "Mrozia" }, photo: null,
    tagline: "Le sucré-salé dans sa plus noble tradition.",
    description: "Héritage des tables fassies : la viande mijote sous un voile de miel, de raisins secs et d'amandes grillées, relevée de cannelle et de ras el-hanout. Un équilibre d'orfèvre.",
    saveurs: {
      "Épices & aromates": ["Cannelle", "Ras el-hanout", "Gingembre"],
      "Le cœur": ["Viande mijotée", "Miel", "Raisins secs"],
      "La finale": ["Amandes grillées", "Caramel d'épices"]
    }
  },
  {
    id: "chevre", name: "Tajine de Chèvre", price: 130,
    svg: { shape: "tagine", label: "Tajine de chèvre" }, photo: null,
    tagline: "Une viande rare, une cuisson patiente.",
    description: "La chèvre, longuement attendrie sous le cône de terre, révèle une chair délicate que les épices douces escortent sans jamais la couvrir. Pour les connaisseurs.",
    saveurs: {
      "Épices & aromates": ["Curcuma", "Poivre", "Coriandre fraîche"],
      "Le cœur": ["Chèvre fondante", "Oignons confits"],
      "La finale": ["Jus corsé", "Herbes fraîches"]
    }
  },
  {
    id: "pastilla", name: "Pastilla Poulet aux Amandes", price: 48,
    svg: { shape: "pastilla", label: "Pastilla" }, photo: null,
    tagline: "Croustillante, dorée, poudrée de cannelle.",
    description: "Des feuilles de warqa fines comme du papier de soie, un poulet aux amandes parfumé à la fleur d'oranger, un voile de sucre glace et de cannelle. Le sucré-salé fait chef-d'œuvre.",
    saveurs: {
      "Épices & aromates": ["Cannelle", "Fleur d'oranger", "Gingembre"],
      "Le cœur": ["Poulet effiloché", "Amandes torréfiées"],
      "La finale": ["Warqa croustillante", "Sucre glace"]
    }
  },
  {
    id: "couscous", name: "Couscous du Vendredi", price: 65,
    svg: { shape: "bowl", label: "Couscous" }, photo: null,
    tagline: "Le rituel sacré, tous les vendredis.",
    description: "La semoule roulée à la main, montée à la vapeur trois fois, porte ses légumes du marché et son bouillon safrané. Servi comme le veut la tradition, le vendredi seulement.",
    saveurs: {
      "Épices & aromates": ["Safran", "Cumin", "Coriandre"],
      "Le cœur": ["Semoule vapeur", "Légumes du marché", "Pois chiches"],
      "La finale": ["Bouillon parfumé", "Douceur d'oignons"]
    }
  },
  {
    id: "seffa", name: "Seffa Medfouna au Poulet", price: 70,
    svg: { shape: "bowl", label: "Seffa" }, photo: null,
    tagline: "Le poulet caché sous un dôme de douceur.",
    description: "« Medfouna » : enfouie. Sous le dôme de vermicelles sucrés à la cannelle et aux amandes se cache un poulet aux épices — la surprise la plus élégante de la cuisine marocaine.",
    saveurs: {
      "Épices & aromates": ["Cannelle", "Sucre glace", "Eau de fleur d'oranger"],
      "Le cœur": ["Vermicelles vapeur", "Poulet épicé"],
      "La finale": ["Amandes", "Raisins secs"]
    }
  },
  {
    id: "espadon", name: "Espadon sur Charbon", price: 90,
    svg: { shape: "fish", label: "Espadon" }, photo: null,
    tagline: "La mer saisie par la braise.",
    description: "L'espadon mariné à la chermoula — coriandre, ail, citron, paprika — puis saisi sur le charbon de bois. Chair nacrée, parfum de feu, fraîcheur d'agrumes.",
    saveurs: {
      "Épices & aromates": ["Chermoula", "Paprika", "Citron"],
      "Le cœur": ["Espadon nacré", "Marinade aux herbes"],
      "La finale": ["Notes grillées", "Pointe d'agrumes"]
    }
  }
];

/* ------------------------------------------------------------
   La carte complète — telle que le menu de la maison
------------------------------------------------------------ */
const MENU = [
  {
    categorie: "Entrées Froides",
    plats: [
      { nom: "Salade Dada", prix: 45, detail: "zaalouk, taktouka, bakoula ou carottes" },
      { nom: "Salade Chef", prix: 45, detail: "pomme de terre, haricots verts, oignon, tomates fraîches, œuf, thon, laitue, poivrons" },
      { nom: "Salade Marocaine", prix: 40, detail: "laitue, tomate, concombre, oignon, thon" },
      { nom: "Ration", prix: 20, detail: "zaalouk, taktouka ou carottes marinées" }
    ]
  },
  {
    categorie: "Entrées Chaudes",
    plats: [
      { nom: "Soupe Marocaine", prix: 35, detail: "assortiment : dattes, œuf et chebakia" },
      { nom: "Pastilla poulet aux amandes", prix: 48 }
    ]
  },
  {
    categorie: "Tajines",
    plats: [
      { nom: "Mrozia", prix: 130 },
      { nom: "Tajine de chèvre", prix: 130 },
      { nom: "Tride au poulet beldi", prix: 80 },
      { nom: "Tride au poulet", prix: 70 },
      { nom: "Rfissa prestige", prix: 95, detail: "poulet beldi, rziza, figues et dattes" },
      { nom: "Tanjia", prix: 140, detail: "par personne" },
      { nom: "Koraine sur charbon", prix: 75 },
      { nom: "Seffa medfouna au poulet", prix: 70 },
      { nom: "Viande aux coings", prix: 80, detail: "selon la saison" },
      { nom: "Viande aux pruneaux", prix: 75 },
      { nom: "Viande frites", prix: 75 },
      { nom: "Viande hachée", prix: 70 },
      { nom: "Viande aux légumes sur charbon", prix: 75 },
      { nom: "Viande aux petits pois et artichauts", prix: 85 },
      { nom: "Poulet au citron", prix: 70 },
      { nom: "Tajine végétarien", prix: 60 },
      { nom: "Couscous", prix: 65, detail: "tous les vendredis" },
      { nom: "Couscous au blé", prix: 65 }
    ]
  },
  {
    categorie: "Tajines de Poissons sur Charbon",
    plats: [
      { nom: "Boulettes de merlan", prix: 85 },
      { nom: "Espadon", prix: 90 }
    ]
  },
  {
    categorie: "Grillades sur Charbon",
    plats: [
      { nom: "Brochettes de viande", prix: 85 },
      { nom: "Brochettes mixtes", prix: 75 },
      { nom: "Brochettes de viande hachée", prix: 75 },
      { nom: "Poulet grillé", prix: 70 },
      { nom: "Brochettes de dinde", prix: 70 }
    ]
  },
  {
    categorie: "Pizzas",
    plats: [
      { nom: "Margherita", prix: 45 },
      { nom: "Thon", prix: 65 },
      { nom: "Fruits de mer", prix: 70 },
      { nom: "Végétarienne", prix: 60 },
      { nom: "Quatre saisons", prix: 70 },
      { nom: "Viande hachée", prix: 70 }
    ]
  }
];

function dishArtwork(d) {
  if (d.photo) {
    return `<img src="${d.photo}" alt="${d.name}" loading="lazy" draggable="false">`;
  }
  return dishSVG({ ...d.svg });
}
