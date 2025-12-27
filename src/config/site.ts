export type Country = {
  id: "uganda" | "south-sudan" | "rwanda" | "gambia" | "guinea";
  name: string;
  short: string;
  blurb: string;
};

export type Initiative = {
  id:
    | "education"
    | "women-agriculture"
    | "sports-arts"
    | "leadership"
    | "maternal-health"
    | "disaster-relief"
    | "church-building";
  name: string;
  tagline: string;
  sdg?: string[];
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  group: "Leadership" | "Board" | "Regional Advisors" | "Operations";
  image: string;
  bio: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  initiative: Initiative["id"];
  country: Country["id"];
  featured?: boolean;
  heroImage: string;
  gallery: string[];
  goals: string[];
  whereWeWork: string;
  howToHelp: string[];
};

export const site = {
  name: "Omega Global Development",
  acronym: "OGD",
  tagline: "Empowering Communities, Guided by Faith.",
  description:
    "Omega Global Development (OGD) is a faith-rooted nonprofit empowering communities across Africa through education, health, leadership, and sustainable livelihoods.",
  donateExternalUrl: "https://www.omegaglobaldevelopment.org/donate",
  socials: {
    facebook: "#",
    instagram: "#",
    x: "#",
    youtube: "#",
  },
  contact: {
    email: "info@omegaglobaldevelopment.org",
    phone: "+1 (000) 000-0000",
    poBox: "PO Box (placeholder)\nCity, State ZIP",
  },
} as const;

export const countries: Country[] = [
  {
    id: "uganda",
    name: "Uganda",
    short: "UG",
    blurb: "Education + community development partnerships.",
  },
  {
    id: "south-sudan",
    name: "South Sudan",
    short: "SS",
    blurb: "Leadership, relief, and resilient community hubs.",
  },
  {
    id: "rwanda",
    name: "Rwanda",
    short: "RW",
    blurb: "Church building + leadership support.",
  },
  {
    id: "gambia",
    name: "The Gambia",
    short: "GM",
    blurb: "Maternal health clinics + community care.",
  },
  {
    id: "guinea",
    name: "Guinea",
    short: "GN",
    blurb: "Health access and community resilience programs.",
  },
];

export const initiatives: Initiative[] = [
  {
    id: "education",
    name: "Global Empowerment Through Education",
    tagline:
      "Build schools, equip teachers, and spark cultural exchange through Omega Pals.",
    sdg: ["Quality Education"],
  },
  {
    id: "women-agriculture",
    name: "Women’s Agricultural Initiatives",
    tagline:
      "Skills-based livelihoods—from goat farming to market access—so families can thrive.",
    sdg: ["No Poverty", "Zero Hunger", "Quality Education"],
  },
  {
    id: "sports-arts",
    name: "Sports & Arts Initiative",
    tagline:
      "Sports camps, equipment, and mentorship for kids in low-income communities.",
  },
  {
    id: "leadership",
    name: "Leadership Development",
    tagline:
      "Seminars that build character and servant leadership in communities and churches.",
  },
  {
    id: "maternal-health",
    name: "Maternal Health",
    tagline:
      "Clinics, post-natal kits, medications, and sliding-scale care in remote villages.",
  },
  {
    id: "disaster-relief",
    name: "Disaster Relief",
    tagline:
      "Flooding and drought response with resilience strategies—seeds, dams, and greenhouses.",
  },
  {
    id: "church-building",
    name: "Church Building & Leadership Support",
    tagline:
      "Community hubs for healing, education, and hope—construction plus leadership training.",
  },
];

export const team: TeamMember[] = [
  {
    id: "lashelle-johnson",
    name: "Lashelle Johnson",
    role: "CEO / Co-Founder",
    group: "Leadership",
    image: "/assets/team/lashelle-johnson.webp",
    bio: "Bio placeholder: Share Lashelle’s story, background in ministry, and vision for faith-rooted community restoration.",
  },
  {
    id: "donald-johnson",
    name: "Donald Johnson",
    role: "Co-Founder",
    group: "Leadership",
    image: "/assets/team/donald-johnson.webp",
    bio: "Bio placeholder: Highlight Donald’s leadership, partnership building, and on-the-ground program support.",
  },
  {
    id: "kevin-james",
    name: "Kevin James",
    role: "Board President",
    group: "Board",
    image: "/assets/team/kevin-james.webp",
    bio: "Bio placeholder: Kevin’s governance experience and commitment to measurable impact.",
  },
  {
    id: "will-pickens",
    name: "Dr. Will Pickens",
    role: "Board Member",
    group: "Board",
    image: "/assets/team/placeholder-1.svg",
    bio: "Bio placeholder: Dr. Pickens supports strategy, accountability, and long-term sustainability.",
  },
  {
    id: "ilona-jurewicz",
    name: "Ilona Jurewicz",
    role: "Board Member",
    group: "Board",
    image: "/assets/team/placeholder-2.svg",
    bio: "Bio placeholder: Ilona brings cross-cultural insight and program stewardship.",
  },
  {
    id: "brenda-elliot",
    name: "Brenda Elliot",
    role: "Board Member",
    group: "Board",
    image: "/assets/team/placeholder-3.svg",
    bio: "Bio placeholder: Brenda supports community partnerships and organizational growth.",
  },
  {
    id: "alexis-bouza",
    name: "Alexis Bouza",
    role: "Partnership & Community Liaison",
    group: "Operations",
    image: "/assets/team/placeholder-4.svg",
    bio: "Bio placeholder: Alexis strengthens relationships with partners and local leaders.",
  },
  {
    id: "kayitesi-norah",
    name: "Kayitesi Norah",
    role: "Project Management Intern – East Africa",
    group: "Operations",
    image: "/assets/team/placeholder-5.svg",
    bio: "Bio placeholder: Kayitesi supports planning and delivery for East Africa initiatives.",
  },
  {
    id: "jeremy-bouza",
    name: "Jeremy Bouza",
    role: "Impact Data & Analytics Officer",
    group: "Operations",
    image: "/assets/team/placeholder-6.svg",
    bio: "Bio placeholder: Jeremy helps track outcomes, learn, and improve programs.",
  },
  {
    id: "joshua-hill",
    name: "Joshua Hill",
    role: "IT Technical Director",
    group: "Operations",
    image: "/assets/team/placeholder-7.svg",
    bio: "Bio placeholder: Joshua supports systems, tools, and secure operations.",
  },
  {
    id: "bishop-musoni",
    name: "Bishop Musoni Wilberforce",
    role: "Regional Advisor – East Africa",
    group: "Regional Advisors",
    image: "/assets/team/placeholder-8.svg",
    bio: "Bio placeholder: Bishop Musoni advises community engagement and faith-rooted collaboration.",
  },
  {
    id: "rashida-bah",
    name: "Rashida Bah",
    role: "Regional Advisor – West Africa",
    group: "Regional Advisors",
    image: "/assets/team/placeholder-9.svg",
    bio: "Bio placeholder: Rashida advises partnerships and culturally grounded program design.",
  },
];

export const projects: Project[] = [
  {
    slug: "uganda-school-build-omega-pals",
    title: "Uganda School Build + Omega Pals",
    summary:
      "A school building opened in May 2022—now expanding supplies, teacher support, and cultural exchange.",
    initiative: "education",
    country: "uganda",
    featured: true,
    heroImage: "/assets/projects/1.jpg",
    gallery: ["/assets/projects/1.jpg", "/assets/projects/2.jpg"],
    goals: [
      "Increase classroom capacity and safe learning spaces",
      "Provide supplies and teacher support",
      "Grow Omega Pals cultural exchange and mentorship",
    ],
    whereWeWork: "Uganda (with a broader vision across East Africa)",
    howToHelp: [
      "Sponsor classroom supplies",
      "Support teacher development",
      "Fund vocational pathways (construction, agriculture, tailoring, tech)",
    ],
  },
  {
    slug: "vocational-skills-pathways",
    title: "Vocational & Skills-Based Education Pathways",
    summary:
      "A future-forward program vision for youth training in construction, agriculture, tailoring, and technology.",
    initiative: "education",
    country: "uganda",
    heroImage: "/assets/projects/3.jpg",
    gallery: ["/assets/projects/3.jpg", "/assets/projects/4.jpg"],
    goals: [
      "Offer practical skills training linked to local jobs",
      "Equip learners with tools and mentorship",
      "Increase community productivity beyond charity",
    ],
    whereWeWork: "Uganda and partner communities across Africa",
    howToHelp: ["Donate tools and training resources", "Sponsor a cohort", "Partner as a mentor"],
  },
  {
    slug: "women-goat-farming-livelihoods",
    title: "Women’s Goat Farming & Livelihoods",
    summary:
      "Women-led agricultural training and goat farming to strengthen food security and income.",
    initiative: "women-agriculture",
    country: "rwanda",
    featured: true,
    heroImage: "/assets/projects/4.jpg",
    gallery: ["/assets/projects/4.jpg", "/assets/projects/5.jpg"],
    goals: [
      "Increase household income and nutrition",
      "Train women in sustainable agriculture and animal care",
      "Connect producers to markets",
    ],
    whereWeWork: "Rwanda (with scalable models for West and East Africa)",
    howToHelp: ["Fund starter goats", "Support training workshops", "Sponsor feed and vet care"],
  },
  {
    slug: "summer-sports-camps",
    title: "Summer Sports Camps + Athlete Mentorship",
    summary:
      "Equipment, coaching, and free summer camps with visiting U.S. athletes.",
    initiative: "sports-arts",
    country: "uganda",
    heroImage: "/assets/projects/6.jpg",
    gallery: ["/assets/projects/6.jpg", "/assets/projects/2.jpg"],
    goals: [
      "Provide sports equipment and training",
      "Create safe spaces for play and growth",
      "Build confidence and teamwork through mentorship",
    ],
    whereWeWork: "Low-income communities in Uganda and across Africa",
    howToHelp: ["Donate sports gear", "Sponsor a camp week", "Volunteer as a coach"],
  },
  {
    slug: "servant-leadership-seminars",
    title: "Servant Leadership Seminars",
    summary:
      "Leadership development programs focused on character, service, and community transformation.",
    initiative: "leadership",
    country: "south-sudan",
    heroImage: "/assets/projects/7.jpg",
    gallery: ["/assets/projects/7.jpg", "/assets/projects/8.jpg"],
    goals: [
      "Strengthen local leadership capacity",
      "Develop servant-leaders who build resilient communities",
      "Encourage collaboration across churches and civic groups",
    ],
    whereWeWork: "South Sudan and partner communities",
    howToHelp: ["Fund training materials", "Support travel for facilitators", "Sponsor participant scholarships"],
  },
  {
    slug: "gambia-maternal-health-clinic",
    title: "Gambia Maternal Health Clinic Support",
    summary:
      "Maternal and infant care with post-natal kits, medications, and sliding-scale services.",
    initiative: "maternal-health",
    country: "gambia",
    featured: true,
    heroImage: "/assets/projects/5.jpg",
    gallery: ["/assets/projects/5.jpg", "/assets/projects/8.jpg"],
    goals: [
      "Improve maternal and infant outcomes",
      "Provide essential medications and hospital beds",
      "Expand access in remote villages",
    ],
    whereWeWork: "The Gambia",
    howToHelp: ["Sponsor post-natal kits", "Donate for medications", "Support clinic equipment"],
  },
  {
    slug: "guinea-village-health-access",
    title: "Guinea Village Health Access",
    summary:
      "Strengthening community clinics and care systems for families in underserved areas.",
    initiative: "maternal-health",
    country: "guinea",
    heroImage: "/assets/projects/8.jpg",
    gallery: ["/assets/projects/8.jpg", "/assets/projects/5.jpg"],
    goals: [
      "Expand sliding-scale care",
      "Improve supply continuity",
      "Build trust through consistent local presence",
    ],
    whereWeWork: "Guinea",
    howToHelp: ["Fund essentials", "Sponsor a family care package", "Support clinic staffing"],
  },
  {
    slug: "flood-drought-resilience",
    title: "Flood & Drought Resilience Response",
    summary:
      "Disaster relief plus long-term resilience through seeds, small dams, and greenhouse strategies.",
    initiative: "disaster-relief",
    country: "south-sudan",
    heroImage: "/assets/projects/2.jpg",
    gallery: ["/assets/projects/2.jpg", "/assets/projects/6.jpg"],
    goals: [
      "Respond rapidly to urgent needs",
      "Support recovery with agriculture inputs",
      "Reduce future risk through resilience infrastructure",
    ],
    whereWeWork: "South Sudan and vulnerable regions",
    howToHelp: ["Give toward emergency response", "Fund seeds and tools", "Support water infrastructure"],
  },
  {
    slug: "church-hubs-community-hope",
    title: "Church Hubs for Community Hope",
    summary:
      "Partnering with pastors to build churches as community hubs for healing, education, and hope.",
    initiative: "church-building",
    country: "rwanda",
    heroImage: "/assets/projects/7.jpg",
    gallery: ["/assets/projects/7.jpg", "/assets/projects/1.jpg"],
    goals: [
      "Support construction and safe gathering spaces",
      "Provide leadership training to local pastors",
      "Connect church hubs to education and outreach",
    ],
    whereWeWork: "Rwanda, The Gambia, South Sudan",
    howToHelp: ["Sponsor building materials", "Fund leadership training", "Support local outreach"],
  },
];

export function getCountry(id: Country["id"]) {
  return countries.find((c) => c.id === id)!;
}

export function getInitiative(id: Initiative["id"]) {
  return initiatives.find((i) => i.id === id)!;
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
