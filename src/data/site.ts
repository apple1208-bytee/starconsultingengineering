export const site = {
  name: "flexotechconsultingengineers",
  shortName: " flexotech Consulting",
  tagline: "Engineering Precision. Industrial Excellence.",
  description:
    "Specialist piping, stress and vibration engineering consultancy for oil & gas, LNG, petrochemical, and power industries.",
  email: "nirala.nirajkumar@gmail.com",
  phone: "+91 7977234709 / +91 7506049160",
  address: "Navi Mumbai, Thane - 400701, Maharashtra, India",
  principal: {
    name: "NIRAJ KUMAR NIRALA, B.E. (MECH)",
    title: "CHARTERED ENGINEER (INDIA), MECHANICAL ENGINEERING DIVISION",
    credentials: "MEMBER: THE INSTITUTION OF ENGINEERS INDIA, M-1789338",
  },
  social: {
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
  },
  stats: [
    { value: "25+", label: "Years Combined Experience" },
    { value: "500+", label: "Projects Delivered" },
    { value: "15+", label: "Industries Served" },
    { value: "ASME / API", label: "Codes & Standards" },
  ],
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Tools", href: "/tools" },
] as const;
