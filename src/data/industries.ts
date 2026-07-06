export type Industry = {
  slug: string;
  name: string;
  icon: string;
  overview: string;
  challenges: { title: string; description: string }[];
  services: string[];
  standards: string[];
};

export const industries: Industry[] = [
  {
    slug: "oil-and-gas",
    name: "Oil & Gas",
    icon: "Fuel",
    overview: "Upstream, midstream and downstream facilities demand piping that performs under high pressure, temperature and cyclic service. We support operators and EPCs across the full asset lifecycle.",
    challenges: [
      { title: "High-pressure service", description: "Designing and qualifying piping for demanding pressure-temperature envelopes." },
      { title: "Vibration & fatigue", description: "Managing flow-induced and machinery vibration on critical lines." },
      { title: "Ageing assets", description: "Extending the life of brownfield piping safely." },
    ],
    services: ["piping-engineering", "static-stress-analysis", "vibration-engineering", "safety-engineering"],
    standards: ["ASME B31.3", "API 5L", "API 618"],
  },
  {
    slug: "petrochemicals",
    name: "Petrochemicals",
    icon: "FlaskConical",
    overview: "Petrochemical complexes run varied and aggressive services at scale. We deliver stress, vibration and safety engineering that keeps complex units reliable and compliant.",
    challenges: [
      { title: "Thermal cycling", description: "Hot lines with frequent start-up and shutdown cycles." },
      { title: "Material selection", description: "Matching metallurgy to corrosive and high-temperature service." },
      { title: "Congested racks", description: "Routing and supporting dense interconnecting piping." },
    ],
    services: ["static-stress-analysis", "dynamic-stress-analysis", "support-design", "technical-audits"],
    standards: ["ASME B31.3", "API 560", "WRC 297"],
  },
  {
    slug: "lng",
    name: "LNG",
    icon: "Snowflake",
    overview: "Cryogenic LNG service introduces extreme thermal contraction and demanding material requirements. We engineer piping and supports for safe operation at very low temperatures.",
    challenges: [
      { title: "Cryogenic contraction", description: "Large thermal movement at -160 degrees C and below." },
      { title: "Cold spring & supports", description: "Specialised support and cold-spring strategies." },
      { title: "Material toughness", description: "Ensuring low-temperature material suitability." },
    ],
    services: ["piping-engineering", "static-stress-analysis", "support-design"],
    standards: ["ASME B31.3", "EN 1473", "NFPA 59A"],
  },
  {
    slug: "lpg",
    name: "LPG",
    icon: "Container",
    overview: "LPG storage and handling facilities require careful relief, vibration and stress engineering to manage volatile, pressurised product safely.",
    challenges: [
      { title: "Relief & blowdown", description: "Adequate relief and disposal under fire and overpressure cases." },
      { title: "Pump & compressor vibration", description: "Controlling vibration on rotating equipment piping." },
      { title: "Pressure cycling", description: "Fatigue from frequent loading and unloading." },
    ],
    services: ["safety-engineering", "vibration-engineering", "static-stress-analysis"],
    standards: ["ASME B31.3", "API 520", "API 521"],
  },
  {
    slug: "power-generation",
    name: "Power Generation",
    icon: "Zap",
    overview: "Thermal and combined-cycle power plants run high-energy steam systems where flexibility, support and dynamic behaviour are critical to availability.",
    challenges: [
      { title: "High-energy steam", description: "Main steam and hot reheat lines at extreme conditions." },
      { title: "Spring support design", description: "Managing large thermal growth with spring hangers." },
      { title: "Transient loads", description: "Turbine trip, water hammer and relief transients." },
    ],
    services: ["static-stress-analysis", "dynamic-stress-analysis", "support-design", "technical-audits"],
    standards: ["ASME B31.1", "ASME B31.3", "EN 13480"],
  },
  {
    slug: "renewable-energy",
    name: "Renewable Energy",
    icon: "Wind",
    overview: "Hydrogen, biofuel and concentrated solar facilities bring new piping challenges. We bring proven stress and safety methods to emerging energy systems.",
    challenges: [
      { title: "Hydrogen service", description: "Material and integrity considerations for hydrogen piping." },
      { title: "New configurations", description: "First-of-a-kind layouts without established precedent." },
      { title: "Thermal solar", description: "High-temperature heat-transfer fluid systems." },
    ],
    services: ["piping-engineering", "static-stress-analysis", "engineering-consultancy"],
    standards: ["ASME B31.3", "ASME B31.12"],
  },
  {
    slug: "nuclear",
    name: "Nuclear",
    icon: "Atom",
    overview: "Nuclear piping demands the highest standards of quality, seismic qualification and documentation. We provide independent analysis and audit support to nuclear codes.",
    challenges: [
      { title: "Seismic qualification", description: "Qualifying safety-class piping for seismic demand." },
      { title: "Code rigour", description: "Meeting stringent nuclear code and QA requirements." },
      { title: "Documentation", description: "Full traceability and independent verification." },
    ],
    services: ["dynamic-stress-analysis", "technical-audits", "engineering-consultancy"],
    standards: ["ASME III", "ASME B31.1"],
  },
  {
    slug: "fertilizers",
    name: "Fertilizers",
    icon: "Sprout",
    overview: "Ammonia and urea plants combine high pressure, high temperature and corrosive service. We keep these critical lines reliable through stress, vibration and safety engineering.",
    challenges: [
      { title: "High-pressure synthesis", description: "Ammonia loop piping at extreme pressure." },
      { title: "Corrosive service", description: "Carbamate and acidic service material selection." },
      { title: "Reciprocating machines", description: "Pulsation and vibration from large compressors." },
    ],
    services: ["static-stress-analysis", "vibration-engineering", "safety-engineering"],
    standards: ["ASME B31.3", "API 618"],
  },
  {
    slug: "specialty-chemicals",
    name: "Specialty Chemicals",
    icon: "TestTubes",
    overview: "Batch and specialty chemical plants run diverse, frequently changing services. We deliver flexible engineering that handles varied and demanding process conditions.",
    challenges: [
      { title: "Varied service", description: "Many different fluids and conditions in one plant." },
      { title: "Jacketed & lined piping", description: "Special construction for heating and corrosion." },
      { title: "Frequent modification", description: "Brownfield changes to existing systems." },
    ],
    services: ["piping-engineering", "static-stress-analysis", "engineering-troubleshooting"],
    standards: ["ASME B31.3", "ISO 15649"],
  },
  {
    slug: "industrial-manufacturing",
    name: "Industrial Manufacturing",
    icon: "Factory",
    overview: "Process utilities and plant piping underpin manufacturing reliability. We support facilities with practical stress, support and troubleshooting engineering.",
    challenges: [
      { title: "Utility systems", description: "Steam, condensate, compressed air and cooling water." },
      { title: "Reliability", description: "Minimising unplanned downtime from piping issues." },
      { title: "Plant expansions", description: "Integrating new lines with existing systems." },
    ],
    services: ["piping-engineering", "support-design", "engineering-troubleshooting"],
    standards: ["ASME B31.1", "ASME B31.3"],
  },
];

export const getIndustry = (slug: string) =>
  industries.find((i) => i.slug === slug);
