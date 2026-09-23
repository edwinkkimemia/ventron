// Full portfolio entries. Shown when the database has no published
// projects, and upserted by prisma/seed.ts on first seed. Client names are
// deliberately generic ("Confidential client — …") — never fabricated.

export interface FallbackProject {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  challenge: string;
  solution: string;
  scope: string;
  deliverables: string;
  location: string;
  client: string;
  year: number;
  status: "COMPLETED" | "ONGOING" | "DESIGN";
  featured: boolean;
  featuredImage: string;
  industryName: string;
  industrySlug: string;
  serviceName: string;
  serviceSlug: string;
}

export const FALLBACK_PROJECTS: FallbackProject[] = [
  {
    slug: "petroleum-terminal-firewater-study-mombasa",
    title: "Firewater Demand Assessment & Hydraulic Modelling — Petroleum Terminal",
    excerpt:
      "Maximum water demand study, ring-main hydraulic model, pump duty verification and storage sizing for a coastal petroleum storage terminal.",
    description: `A regional petroleum terminal operator engaged Ventron to establish a defensible firewater design basis for its Mombasa storage facility. The terminal had grown over two decades — new tanks, a relocated loading rack and extended manifolds — but the firewater system still operated on its original design assumptions.\n\nOur work re-baselined the entire network: surveyed pipe routing and elevations, modelled the ring main under governing fire scenarios, and verified pump performance against the worst credible demand case.`,
    challenge: `Successive expansions had outgrown the original firewater design. The operator could not demonstrate to its insurer that remote hydrants and foam systems would receive adequate pressure during a full bund-fire scenario, and the duty fire pump ran far from its rated point with no documented NPSH margin.`,
    solution: `We built the demand case from first principles — bund fire plus exposure cooling plus hose streams — then constructed a hydraulic model of the full ring main from surveyed as-built data. The model exposed two undersized legs and a suction arrangement with inadequate NPSH margin at low tank level. Our recommendations sequenced pipe upgrades, a re-rated pump selection and a raised suction-tank operating level, each costed and phased around terminal operations.`,
    scope: `- Site survey of firewater network, tanks, pumps and hydrant coverage\n- Maximum water demand assessment for governing fire scenarios\n- Ring-main hydraulic model and system-curve development\n- Pump duty-point matching, run-out checks and NPSH verification\n- Phased upgrade recommendations with budget costs`,
    deliverables: `- Maximum demand calculation set\n- Hydraulic model report with pressure contours\n- Pump datasheet and duty verification sheets\n- Upgrade phasing plan and BOQ input`,
    location: "Mombasa, Kenya",
    client: "Confidential client — petroleum terminal operator",
    year: 2024,
    status: "COMPLETED",
    featured: true,
    featuredImage: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&q=80",
    industryName: "Petroleum Storage",
    industrySlug: "petroleum-storage",
    serviceName: "Fire Protection Engineering",
    serviceSlug: "fire-protection-engineering",
  },
  {
    slug: "lpg-storage-filling-facility-athi-river",
    title: "LPG Storage & Cylinder Filling Facility — Design & Documentation",
    excerpt:
      "Complete engineering package for an LPG storage and filling plant: vessel layout, piping, filling manifold, safety systems and fire interface.",
    description: `Ventron delivered the full mechanical engineering package for a new LPG storage and cylinder filling facility at Athi River — from concept layout through detailed piping design and equipment specification.\n\nThe plant combines horizontal storage bullets, a vaporiser skid, a multi-bay cylinder filling manifold and full fire protection coverage, arranged for safe tanker circulation and future capacity doubling.`,
    challenge: `The client held a constrained industrial plot with strict safety-distance requirements to the boundary and an aggressive programme tied to cylinder supply contracts. The design had to maximise storage within the distances, keep filling operations clear of tanker movements, and satisfy fire-authority review at first submission.`,
    solution: `We developed the plot plan around segregated traffic flows — tankers, cylinders and emergency access never share a route — and selected bullet storage with mounded-fire protection philosophy where distances were tightest. Welded piping with thermal relief on all blockable sections, a metered filling manifold with emergency shutdown, and a dedicated firewater interface with monitor coverage completed the package. Authority approval was secured without redesign.`,
    scope: `- Plot plan, equipment layout and safety-distance compliance\n- LPG piping design, pipe sizing and thermal relief calculations\n- Filling manifold design with metering, earthing and E-stop logic\n- Vessel, vaporiser and pump datasheets\n- Fire protection interface and monitor coverage verification`,
    deliverables: `- P&IDs and general arrangement drawings\n- Piping isometrics and line list\n- Equipment datasheets and specifications\n- Relief and sizing calculation set`,
    location: "Athi River, Kenya",
    client: "Confidential client — LPG marketing company",
    year: 2024,
    status: "COMPLETED",
    featured: true,
    featuredImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    industryName: "LPG",
    industrySlug: "lpg",
    serviceName: "Oil & Gas Engineering",
    serviceSlug: "oil-gas-engineering",
  },
  {
    slug: "tank-farm-transfer-piping-revamp-eldoret",
    title: "Tank Farm Transfer Piping Revamp — Inland Depot",
    excerpt:
      "Rerouted transfer headers, pump re-selection, surge checks and full as-built documentation for an inland petroleum depot.",
    description: `An inland depot's transfer network had accreted over fifteen years of piecemeal tie-ins: unknown dead legs, corroded supports and no trustworthy P&ID. Ventron re-engineered the transfer headers between road loading, rail siding and tankage.\n\nThe revamp was executed across three shutdown windows with the depot kept operational throughout — new headers were prefabricated from isometrics and lifted in during planned outages.`,
    challenge: `Product cross-contamination incidents and slow transfer rates pointed to the piping, but nobody could say with certainty what connected to what. Any revamp had to be designed from a fresh survey, verified against operations, and installed without stopping depot throughput.`,
    solution: `We surveyed every line, produced the depot's first accurate P&ID set, and designed rationalised headers with proper low-point drains, high-point vents and segregated product routing. Pump duties were rechecked with surge analysis on the new actuated valves, supports were redesigned for the full rack, and every spool was issued as a fabrication isometric. The depot now holds a complete as-built dossier.`,
    scope: `- Full network survey and P&ID reconstitution\n- Transfer header rerouting and pipe sizing\n- Pump re-selection with surge analysis\n- Support redesign and specification\n- Shutdown-window installation supervision`,
    deliverables: `- As-built P&IDs, line list and isometrics\n- Pump datasheets and surge report\n- Support drawings and piping specification\n- Hydrotest and flushing records`,
    location: "Eldoret, Kenya",
    client: "Confidential client — depot operator",
    year: 2023,
    status: "COMPLETED",
    featured: true,
    featuredImage: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&q=80",
    industryName: "Petroleum Storage",
    industrySlug: "petroleum-storage",
    serviceName: "Process & Piping Engineering",
    serviceSlug: "process-piping-engineering",
  },
  {
    slug: "process-pump-replacement-food-plant-thika",
    title: "Process Pump Replacement & Sizing — Food Processing Plant",
    excerpt:
      "Failed transfer pumps replaced with correctly sized units: duty analysis, NPSH checks, alignment supervision and commissioning.",
    description: `A food processing plant at Thika suffered repeated failures of its hot-water and CIP transfer pumps — seal failures, cavitation damage and chronic underperformance that throttled production.\n\nVentron's investigation showed the installed pumps had been selected for a duty the plant had long outgrown, with suction conditions guaranteeing cavitation. We re-specified the full pump train for actual operating duties.`,
    challenge: `Production losses were being treated as a maintenance problem — new seals every quarter — when the root cause was hydraulic: pumps operating far off-curve with NPSH available below required at operating temperature.`,
    solution: `We measured actual flows and temperatures, rebuilt the system curves including fouling allowances, and selected end-suction units running near best efficiency with verified NPSH margins. Suction pipework was enlarged at two stations, strainers and air-release provisions corrected, and installation supervised through alignment, grouting and loop testing. Seal life moved from months to years.`,
    scope: `- Duty measurement and system-curve reconstruction\n- Pump selection with NPSH verification\n- Suction pipework modifications\n- Installation supervision and commissioning`,
    deliverables: `- Pump datasheets and selection report\n- Modified piping isometrics\n- Alignment and test records\n- Operating envelope and spares list`,
    location: "Thika, Kenya",
    client: "Confidential client — food manufacturer",
    year: 2023,
    status: "COMPLETED",
    featured: false,
    featuredImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    industryName: "Manufacturing",
    industrySlug: "manufacturing",
    serviceName: "Mechanical Engineering",
    serviceSlug: "mechanical-engineering",
  },
  {
    slug: "commercial-complex-fire-suppression-upgrade-westlands",
    title: "Fire Suppression Upgrade — Mixed-Use Commercial Complex",
    excerpt:
      "Hydrant ring, hose-reel coverage, booster sets and commissioning evidence for a Westlands commercial development.",
    description: `The owners of a mixed-use complex in Westlands — retail podium, offices and residential towers — needed their fire systems brought to a demonstrably compliant, maintainable standard ahead of re-insurance.\n\nVentron audited the existing installations, designed the remediation, supervised the works and produced the commissioning dossier the insurers required.`,
    challenge: `Coverage gaps in the parking levels, an unreliable booster set, unlabelled zones and no test records meant the system could neither be proven nor maintained. Works had to proceed in an occupied building without disrupting tenants.`,
    solution: `A floor-by-floor audit mapped every deficiency to a drawing, and remediation was phased tower by tower with night works for noisy activities. The hydrant ring was extended to dead zones, booster duty/standby sets replaced with auto-changeover control, zones labelled and a full flow-test programme witnessed and recorded. The complex passed re-inspection on first presentation.`,
    scope: `- Floor-by-floor fire systems audit\n- Hydrant and hose-reel coverage remediation design\n- Booster pump replacement specification\n- Phased occupied-building supervision\n- Witnessed flow testing and handover dossier`,
    deliverables: `- Audit report with marked-up drawings\n- Remediation drawings and specifications\n- Pump datasheets and control philosophy\n- Commissioning and test records dossier`,
    location: "Westlands, Nairobi",
    client: "Confidential client — property manager",
    year: 2025,
    status: "COMPLETED",
    featured: true,
    featuredImage: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=800&q=80",
    industryName: "Commercial Infrastructure",
    industrySlug: "commercial-infrastructure",
    serviceName: "Fire Protection Engineering",
    serviceSlug: "fire-protection-engineering",
  },
  {
    slug: "loading-rack-safety-systems-depot-mombasa",
    title: "Loading Rack Safety & Operability Review — Coastal Depot",
    excerpt:
      "HAZOP-close-out engineering for a road loading facility: earthing, E-stop, spill containment and procedural documentation.",
    description: `Following a HAZOP study that raised actions against its road loading racks, a coastal depot operator retained Ventron to engineer the close-outs: bonding and earthing verification, emergency shutdown logic, spill containment upgrades and the operating procedures to match.\n\nThe assignment blended site supervision with documentation — every recommendation had to be both installed and written into the depot's management system.`,
    challenge: `The HAZOP actions spanned disciplines — electrical, mechanical, civil and procedural — with a regulator-agreed deadline. Partial fixes would not close the actions; the operator needed a single accountable engineering package.`,
    solution: `We converted each HAZOP action into a work pack with drawings, materials and acceptance criteria, sequenced across normal loading operations. Earthing networks were tested and remediated bay by bay, E-stop cause-and-effect implemented and function-tested, containment kerbs and drainage corrected, and the loading procedures rewritten and trained. All actions closed on schedule.`,
    scope: `- HAZOP action conversion to engineered work packs\n- Earthing, bonding and E-stop remediation design\n- Spill containment and drainage corrections\n- Procedure rewrite and operator training support`,
    deliverables: `- Work packs with drawings and acceptance criteria\n- Test and function-check records\n- Updated operating procedures\n- HAZOP action close-out register`,
    location: "Mombasa, Kenya",
    client: "Confidential client — depot operator",
    year: 2022,
    status: "COMPLETED",
    featured: false,
    featuredImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    industryName: "Oil & Gas",
    industrySlug: "oil-gas",
    serviceName: "Engineering Consultancy",
    serviceSlug: "engineering-consultancy",
  },
  {
    slug: "boiler-house-piping-utilities-manufacturer-ruiru",
    title: "Boiler House & Utility Piping — Manufacturing Plant",
    excerpt:
      "Steam, condensate, water and compressed-air distribution redesign with support engineering for a Ruiru manufacturer.",
    description: `A Ruiru manufacturer's utility costs and boiler-house incidents traced back to its distribution network: uninsulated steam runs, failed traps, water hammer and compressed-air leaks that kept two compressors running for one compressor's load.\n\nVentron redesigned the utility distribution as an integrated package — steam and condensate first, then water and air — with metering that let the plant finally allocate energy costs per line.`,
    challenge: `Fuel bills rising while production stayed flat, plus recurring water hammer events that threatened the boiler house. The plant needed lower losses and safer operation without a production shutdown longer than a weekend.`,
    solution: `Thermal imaging and flow logging quantified every loss before design began, so each recommendation carried a payback. Steam headers were resized and re-trapped, condensate recovery restored, air leaks surveyed and repaired under a managed programme, and supports and expansion provisions corrected throughout. Fuel consumption per tonne of output fell measurably within the first quarter.`,
    scope: `- Utility loss survey with thermal imaging and logging\n- Steam, condensate, water and air network redesign\n- Trap, insulation and support specification\n- Weekend-window installation supervision`,
    deliverables: `- Loss survey and payback-ranked recommendations\n- Utility P&IDs and isometrics\n- Equipment and trap schedules\n- Metering plan and commissioning records`,
    location: "Ruiru, Kenya",
    client: "Confidential client — industrial manufacturer",
    year: 2022,
    status: "COMPLETED",
    featured: false,
    featuredImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    industryName: "Industrial Processing",
    industrySlug: "industrial-processing",
    serviceName: "Mechanical Engineering",
    serviceSlug: "mechanical-engineering",
  },
];

export function toCardProject(p: FallbackProject) {
  return {
    ...p,
    industry: { name: p.industryName },
    service: { name: p.serviceName },
    images: [] as { id: string; imageUrl: string; altText: string }[],
    published: true,
  };
}
