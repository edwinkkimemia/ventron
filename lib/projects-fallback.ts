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

// Real project experience — company profile Parts I–V.

// Real project experience — company profile Parts I–V.
// Challenge/solution intentionally blank (never invent client narratives).

export const FALLBACK_PROJECTS: FallbackProject[] = [
  {
    slug: "seco-supply-installation-two-oil-loading-arms",
    title: "Supply and Installation of Two Oil Loading Arms",
    excerpt: "Engineering, procurement, installation and commissioning of two loading arms for petroleum-product transfer, including interface coordination and…",
    description: `Delivered for SECO in Kenya in 2023, this petroleum-transfer scope combined engineering, procurement, installation and commissioning of two oil loading arms within Ventron’s oil and gas engineering practice.`,
    challenge: ``,
    solution: ``,
    scope: `- Engineering of two oil loading arms for petroleum-product transfer
- Procurement of arms and associated materials
- Installation at the transfer facility
- Interface coordination with existing systems
- Commissioning and functional testing`,
    deliverables: `- Two installed oil loading arms
- Interface coordination record
- Commissioning and functional test records`,
    location: "Kenya",
    client: "SECO",
    year: 2023,
    status: "COMPLETED",
    featured: true,
    featuredImage: "/petrol-storage.jpg",
    industryName: "Petroleum Storage",
    industrySlug: "petroleum-storage",
    serviceName: "Oil & Gas Engineering",
    serviceSlug: "oil-gas-engineering",
  },
  {
    slug: "ldc-vegetable-oil-import-pipeline-design",
    title: "Vegetable-Oil Import Pipeline — Detailed Engineering Design",
    excerpt: "Multidisciplinary detailed engineering covering process, mechanical, piping, civil, structural, electrical and instrumentation requirements for the…",
    description: `Delivered for LDC in Kenya in 2024, this vegetable-oil import and transfer system was engineered across seven disciplines covering the full import chain.`,
    challenge: ``,
    solution: ``,
    scope: `- Process engineering
- Mechanical engineering
- Piping engineering
- Civil works
- Structural works
- Electrical works
- Instrumentation`,
    deliverables: `- Detailed engineering package covering process, mechanical, piping, civil, structural, electrical and instrumentation requirements`,
    location: "Kenya",
    client: "LDC",
    year: 2024,
    status: "COMPLETED",
    featured: true,
    featuredImage: "/industrial.jpg",
    industryName: "Industrial Processing",
    industrySlug: "industrial-processing",
    serviceName: "Process & Piping Engineering",
    serviceSlug: "process-piping-engineering",
  },
  {
    slug: "totalenergies-firewater-hydrant-pipeline-repairs",
    title: "Firewater Hydrant Pipeline Repairs",
    excerpt: "Assessment and rehabilitation of the firewater hydrant pipeline, mechanical repairs, reinstatement, pressure testing and confirmation of system…",
    description: `Delivered for TotalEnergies at its Lube Warehouse in Kenya in 2024, this fire-protection scope restored the firewater hydrant pipeline to verified integrity.`,
    challenge: ``,
    solution: ``,
    scope: `- Assessment of the firewater hydrant pipeline
- Rehabilitation works
- Mechanical repairs
- Reinstatement
- Pressure testing
- Confirmation of system integrity`,
    deliverables: `- Rehabilitated hydrant pipeline
- Pressure test records
- System integrity confirmation`,
    location: "Lube Warehouse, Kenya",
    client: "TotalEnergies",
    year: 2024,
    status: "COMPLETED",
    featured: false,
    featuredImage: "/fire.jpg",
    industryName: "Petroleum Storage",
    industrySlug: "petroleum-storage",
    serviceName: "Fire Protection Engineering",
    serviceSlug: "fire-protection-engineering",
  },
  {
    slug: "vivo-energy-100mt-lpg-plant-epcm",
    title: "Engineering and Construction Management — 100 MT LPG Plant",
    excerpt: "Multidisciplinary engineering, construction coordination, contractor supervision, QA/QC and technical support through project delivery.",
    description: `Delivered for Vivo Energy in Kenya in 2025, this 100 MT LPG plant scope combined multidisciplinary engineering with construction management through delivery.`,
    challenge: ``,
    solution: ``,
    scope: `- Multidisciplinary engineering
- Construction coordination
- Contractor supervision
- QA/QC
- Technical support through project delivery`,
    deliverables: `- Coordinated construction delivery
- Contractor supervision records
- QA/QC documentation`,
    location: "Kenya",
    client: "Vivo Energy",
    year: 2025,
    status: "COMPLETED",
    featured: true,
    featuredImage: "/lpg.jpg",
    industryName: "LPG",
    industrySlug: "lpg",
    serviceName: "Project Management",
    serviceSlug: "project-management",
  },
  {
    slug: "shell-rail-offloading-system-design-nanyuki",
    title: "Rail-Offloading System Design",
    excerpt: "Mechanical and hydraulic design of the petroleum rail-offloading system, including transfer philosophy, equipment interfaces and operational…",
    description: `Delivered for Shell Vivo Energy in Nanyuki, Kenya in 2025, this petroleum rail-offloading scope covered mechanical and hydraulic design.`,
    challenge: ``,
    solution: ``,
    scope: `- Mechanical design of the rail-offloading system
- Hydraulic design
- Transfer philosophy
- Equipment interfaces
- Operational considerations`,
    deliverables: `- Mechanical design package
- Hydraulic design calculations
- Transfer philosophy document`,
    location: "Nanyuki, Kenya",
    client: "Shell Vivo Energy",
    year: 2025,
    status: "COMPLETED",
    featured: false,
    featuredImage: "/oil.jpg",
    industryName: "Petroleum Storage",
    industrySlug: "petroleum-storage",
    serviceName: "Process & Piping Engineering",
    serviceSlug: "process-piping-engineering",
  },
  {
    slug: "seco-eni-loading-gantry-top-loading-arm-wote",
    title: "Loading Gantry Design and Supply of One Top-Loading Arm",
    excerpt: "Engineering of the loading-gantry arrangement, specification and supply of one top-loading arm, interface definition and technical delivery support.",
    description: `Delivered for SECO / Eni in Wote, Kenya in 2025: engineering and supply of a top-loading arm on a loading-gantry arrangement.`,
    challenge: ``,
    solution: ``,
    scope: `- Engineering of the loading-gantry arrangement
- Specification of one top-loading arm
- Supply of the arm
- Interface definition
- Technical delivery support`,
    deliverables: `- Gantry arrangement engineering
- Loading-arm specification
- Supplied top-loading arm
- Interface definition record`,
    location: "Wote, Kenya",
    client: "SECO / Eni",
    year: 2025,
    status: "COMPLETED",
    featured: false,
    featuredImage: "/petrol-storage.jpg",
    industryName: "Petroleum Storage",
    industrySlug: "petroleum-storage",
    serviceName: "Oil & Gas Engineering",
    serviceSlug: "oil-gas-engineering",
  },
  {
    slug: "murimi-25mt-lpg-storage-tank-kitale",
    title: "Sourcing and Delivery of 25 MT LPG Storage Tank",
    excerpt: "Technical specification review, international sourcing, vendor coordination, importation, logistics and delivery of the LPG storage vessel.",
    description: `Delivered for Murimi Investment in Kitale, Kenya in 2025: international sourcing and delivery of a 25 MT LPG storage vessel.`,
    challenge: ``,
    solution: ``,
    scope: `- Technical specification review
- International sourcing
- Vendor coordination
- Importation
- Logistics
- Delivery of the vessel`,
    deliverables: `- Reviewed technical specification
- Coordinated vendor supply
- Delivered 25 MT LPG storage vessel`,
    location: "Kitale, Kenya",
    client: "Murimi Investment",
    year: 2025,
    status: "COMPLETED",
    featured: false,
    featuredImage: "/lpg.jpg",
    industryName: "LPG",
    industrySlug: "lpg",
    serviceName: "Procurement",
    serviceSlug: "procurement",
  },
  {
    slug: "murimi-50m3hr-firewater-pump-kitale",
    title: "Supply of 50 m³/hr Firewater Pump",
    excerpt: "Duty-point definition, pump sizing and selection, technical evaluation, procurement and supply for the facility firewater system.",
    description: `Delivered for Murimi Investment in Kitale, Kenya in 2025: a 50 m³/hr firewater pump sized, evaluated and supplied for the facility firewater system.`,
    challenge: ``,
    solution: ``,
    scope: `- Duty-point definition
- Pump sizing and selection
- Technical evaluation
- Procurement
- Supply`,
    deliverables: `- Duty-point definition record
- Pump sizing and selection report
- Technical evaluation
- Supplied firewater pump`,
    location: "Kitale, Kenya",
    client: "Murimi Investment",
    year: 2025,
    status: "COMPLETED",
    featured: false,
    featuredImage: "/fire.jpg",
    industryName: "LPG",
    industrySlug: "lpg",
    serviceName: "Fire Protection Engineering",
    serviceSlug: "fire-protection-engineering",
  },
  {
    slug: "ldc-industrial-centralisation-project",
    title: "Industrial Centralisation Project",
    excerpt: "Engineering design and construction management for boiler, hot-water, electrical and civil works supporting centralised plant utilities.",
    description: `Delivered for LDC in Kenya in 2025: engineering design and construction management for centralised plant utilities.`,
    challenge: ``,
    solution: ``,
    scope: `- Boiler works design
- Hot-water works design
- Electrical works design
- Civil works design
- Construction management`,
    deliverables: `- Design package across boiler, hot-water, electrical and civil works
- Construction management records`,
    location: "Kenya",
    client: "LDC",
    year: 2025,
    status: "COMPLETED",
    featured: false,
    featuredImage: "/industrial.jpg",
    industryName: "Industrial Processing",
    industrySlug: "industrial-processing",
    serviceName: "Mechanical Engineering",
    serviceSlug: "mechanical-engineering",
  },
  {
    slug: "eni-seco-coriolis-mass-flowmeter",
    title: "Supply of Endress+Hauser Coriolis Mass Flowmeter",
    excerpt: "Instrument selection, technical compliance review, procurement and supply of a Coriolis mass flowmeter with project technical support.",
    description: `Delivered for Eni / SECO in Kenya in 2025: selection, compliance review, procurement and supply of an Endress+Hauser Coriolis mass flowmeter.`,
    challenge: ``,
    solution: ``,
    scope: `- Instrument selection
- Technical compliance review
- Procurement
- Supply
- Project technical support`,
    deliverables: `- Compliant instrument selection
- Supplied Coriolis mass flowmeter
- Technical support record`,
    location: "Kenya",
    client: "Eni / SECO",
    year: 2025,
    status: "COMPLETED",
    featured: false,
    featuredImage: "/utilities.jpg",
    industryName: "Petroleum Storage",
    industrySlug: "petroleum-storage",
    serviceName: "Procurement",
    serviceSlug: "procurement",
  },
  {
    slug: "kst-white-oil-project-uganda",
    title: "KST White-Oil Project",
    excerpt: "Mechanical engineering design support for a white-oil storage and handling development, coordinated with the wider multidisciplinary project.",
    description: `Delivered in Uganda in 2025 as part of a consortium white-oil storage and handling development: mechanical engineering design support coordinated with the wider team.`,
    challenge: ``,
    solution: ``,
    scope: `- Mechanical engineering design support
- Coordination with the multidisciplinary project team`,
    deliverables: `- Mechanical design support package`,
    location: "Uganda",
    client: "Consortium Project",
    year: 2025,
    status: "COMPLETED",
    featured: false,
    featuredImage: "/petrol-storage.jpg",
    industryName: "Petroleum Storage",
    industrySlug: "petroleum-storage",
    serviceName: "Mechanical Engineering",
    serviceSlug: "mechanical-engineering",
  },
  {
    slug: "totalenergies-6000l-diesel-tank-jkia",
    title: "Fabrication and Installation of 6,000 L Diesel Tank",
    excerpt: "Fabrication, installation and associated mechanical works for the diesel storage system, including connections and site integration.",
    description: `Delivered for TotalEnergies at JKIA, Nairobi in 2025: fabrication and installation of a 6,000 L diesel storage tank with site integration.`,
    challenge: ``,
    solution: ``,
    scope: `- Fabrication of the 6,000 L diesel tank
- Installation
- Connections
- Site integration and associated mechanical works`,
    deliverables: `- Fabricated 6,000 L diesel tank
- Installed system with connections`,
    location: "JKIA, Nairobi",
    client: "TotalEnergies",
    year: 2025,
    status: "COMPLETED",
    featured: false,
    featuredImage: "/mechanical.jpg",
    industryName: "Petroleum Storage",
    industrySlug: "petroleum-storage",
    serviceName: "Mechanical Engineering",
    serviceSlug: "mechanical-engineering",
  },
  {
    slug: "totalenergies-changamwe-firefighting-hydraulic-study",
    title: "Firefighting Hydraulic Study — Changamwe LPG Depot",
    excerpt: "Field assessment, flow review, hydraulic modelling and evaluation of firewater demand, storage, pumps, hydrants and monitors, followed by engineering…",
    description: `Delivered for TotalEnergies at the Changamwe LPG Depot in Mombasa: a field-based firefighting hydraulic study of the depot firewater system.`,
    challenge: ``,
    solution: ``,
    scope: `- Field assessment
- Flow review
- Hydraulic modelling
- Evaluation of firewater demand
- Evaluation of storage, pumps, hydrants and monitors
- Engineering recommendations`,
    deliverables: `- Field assessment report
- Hydraulic model
- Demand and system evaluation
- Engineering recommendations`,
    location: "Mombasa, Kenya",
    client: "TotalEnergies",
    year: 2026,
    status: "ONGOING",
    featured: true,
    featuredImage: "/fire.jpg",
    industryName: "LPG",
    industrySlug: "lpg",
    serviceName: "Fire Protection Engineering",
    serviceSlug: "fire-protection-engineering",
  },
  {
    slug: "shell-foam-firewater-validation-redesign-nanyuki",
    title: "Foam and Firewater System Validation and Redesign",
    excerpt: "Hydraulic validation of the existing protection system, identification of performance gaps and redesign recommendations aligned with credible fire…",
    description: `Delivered for Shell Vivo Energy in Nanyuki: hydraulic validation and redesign of the foam and firewater protection system against credible fire scenarios.`,
    challenge: ``,
    solution: ``,
    scope: `- Hydraulic validation of the existing system
- Identification of performance gaps
- Redesign recommendations aligned with credible fire scenarios`,
    deliverables: `- Validation report
- Performance-gap register
- Redesign recommendations`,
    location: "Nanyuki, Kenya",
    client: "Shell Vivo Energy",
    year: 2026,
    status: "ONGOING",
    featured: true,
    featuredImage: "/fire.jpg",
    industryName: "Petroleum Storage",
    industrySlug: "petroleum-storage",
    serviceName: "Fire Protection Engineering",
    serviceSlug: "fire-protection-engineering",
  },
  {
    slug: "shell-lpg-offloading-system-design-nairobi",
    title: "LPG Offloading-System Design",
    excerpt: "Mechanical engineering and facility design for safe LPG receipt and offloading, including transfer arrangement, equipment selection and safeguarding…",
    description: `Delivered for Shell Vivo Energy in Nairobi: mechanical engineering and facility design for safe LPG receipt and offloading.`,
    challenge: ``,
    solution: ``,
    scope: `- Mechanical engineering
- Facility design
- Transfer arrangement
- Equipment selection
- Safeguarding considerations`,
    deliverables: `- Facility design package
- Transfer arrangement
- Equipment selection schedule
- Safeguarding provisions`,
    location: "Nairobi, Kenya",
    client: "Shell Vivo Energy",
    year: 2026,
    status: "ONGOING",
    featured: false,
    featuredImage: "/lpg.jpg",
    industryName: "LPG",
    industrySlug: "lpg",
    serviceName: "Oil & Gas Engineering",
    serviceSlug: "oil-gas-engineering",
  },
  {
    slug: "eni-seco-rubber-conveyor-oilseed-handling",
    title: "High-Grade Rubber Conveyor for Oilseed Handling",
    excerpt: "Technical evaluation, specification, procurement and supply of a conveyor component suitable for demanding oilseed-handling service.",
    description: `Delivered for Eni / SECO in Kenya: evaluation, specification, procurement and supply of a high-grade rubber conveyor for oilseed handling.`,
    challenge: ``,
    solution: ``,
    scope: `- Technical evaluation
- Specification
- Procurement
- Supply`,
    deliverables: `- Technical evaluation
- Specification
- Supplied conveyor component`,
    location: "Kenya",
    client: "Eni / SECO",
    year: 2026,
    status: "ONGOING",
    featured: false,
    featuredImage: "/industrial.jpg",
    industryName: "Industrial Processing",
    industrySlug: "industrial-processing",
    serviceName: "Procurement",
    serviceSlug: "procurement",
  },
  {
    slug: "hot-water-piping-redesign-heating-optimisation",
    title: "Hot-Water Piping Redesign and Heating-System Optimisation",
    excerpt: "Hydraulic assessment of the hot-water network, piping redesign, identification of system constraints and optimisation measures to improve heat…",
    description: `Delivered for a confidential client in Kenya: hydraulic assessment, redesign and optimisation of the hot-water piping and heating system.`,
    challenge: ``,
    solution: ``,
    scope: `- Hydraulic assessment of the hot-water network
- Piping redesign
- Identification of system constraints
- Optimisation measures for heat delivery and efficiency`,
    deliverables: `- Hydraulic assessment
- Redesigned piping arrangement
- Optimisation measures`,
    location: "Kenya",
    client: "Confidential Client",
    year: 2026,
    status: "ONGOING",
    featured: false,
    featuredImage: "/utilities.jpg",
    industryName: "Utilities",
    industrySlug: "utilities",
    serviceName: "Mechanical Engineering",
    serviceSlug: "mechanical-engineering",
  },
  {
    slug: "bsl-single-point-mooring-kigamboni",
    title: "Conceptual Design of Single Point Mooring Facility",
    excerpt: "Concept engineering for a marine petroleum-import facility, including SPM configuration, transfer philosophy, subsea/onshore interfaces and terminal…",
    description: `Developed for BSL at Kigamboni, Tanzania: concept engineering for a marine petroleum-import facility around a single point mooring.`,
    challenge: ``,
    solution: ``,
    scope: `- SPM configuration
- Transfer philosophy
- Subsea interfaces
- Onshore interfaces
- Terminal integration`,
    deliverables: `- Concept engineering package covering configuration, transfer philosophy and interfaces`,
    location: "Kigamboni, Tanzania",
    client: "BSL",
    year: 2026,
    status: "DESIGN",
    featured: false,
    featuredImage: "/oil.jpg",
    industryName: "Oil & Gas",
    industrySlug: "oil-gas",
    serviceName: "Oil & Gas Engineering",
    serviceSlug: "oil-gas-engineering",
  },
  {
    slug: "bsl-kasumbalesa-lubumbashi-terminals-pipeline-drc",
    title: "Kasumbalesa and Lubumbashi Bulk Fuel Terminals and 65 km Multiproduct Pipeline",
    excerpt: "Conceptual design of two bulk fuel terminals with a combined capacity of 90,000 m³, connected by a 65 km multiproduct pipeline. Scope includes…",
    description: `Developed for BSL in the DRC: conceptual design of two bulk fuel terminals (90,000 m³ combined) linked by a 65 km multiproduct pipeline.`,
    challenge: ``,
    solution: ``,
    scope: `- Terminal configuration
- Tank sizing
- Product segregation
- Receipt and dispatch systems
- Pipeline concept
- Utilities
- Preliminary cost development`,
    deliverables: `- Conceptual design package
- Sizing and segregation basis
- Preliminary cost development`,
    location: "DRC",
    client: "BSL",
    year: 2026,
    status: "DESIGN",
    featured: true,
    featuredImage: "/petrol-storage.jpg",
    industryName: "Petroleum Storage",
    industrySlug: "petroleum-storage",
    serviceName: "Engineering Consultancy",
    serviceSlug: "engineering-consultancy",
  },
  {
    slug: "white-oil-facility-150000m3-kampala",
    title: "Conceptual Design of 150,000 m³ White-Oil Facility",
    excerpt: "Concept development for a large bulk-fuel facility covering storage configuration, process systems, truck receipt and loading, utilities, fire…",
    description: `Developed for a confidential client in Kampala, Uganda: concept development for a 150,000 m³ white-oil storage facility.`,
    challenge: ``,
    solution: ``,
    scope: `- Storage configuration
- Process systems
- Truck receipt and loading
- Utilities
- Fire protection
- Multidisciplinary layouts
- Preliminary project definition`,
    deliverables: `- Concept development package
- Multidisciplinary layouts
- Preliminary project definition`,
    location: "Kampala, Uganda",
    client: "Confidential Client",
    year: 2026,
    status: "DESIGN",
    featured: false,
    featuredImage: "/oil.jpg",
    industryName: "Petroleum Storage",
    industrySlug: "petroleum-storage",
    serviceName: "Engineering Consultancy",
    serviceSlug: "engineering-consultancy",
  },
  {
    slug: "murimi-lpg-gas-detection-system-kitale",
    title: "LPG Gas-Detection System",
    excerpt: "Supply, installation, testing and commissioning of an LPG gas-detection system, including detector positioning, alarm interfaces and functional…",
    description: `Delivered for Murimi Investment in Kitale, Kenya: supply, installation, testing and commissioning of an LPG gas-detection system.`,
    challenge: ``,
    solution: ``,
    scope: `- Supply
- Installation
- Testing
- Commissioning
- Detector positioning
- Alarm interfaces
- Functional verification`,
    deliverables: `- Installed gas-detection system
- Testing records
- Commissioning and verification records`,
    location: "Kitale, Kenya",
    client: "Murimi Investment",
    year: 2026,
    status: "ONGOING",
    featured: false,
    featuredImage: "/lpg.jpg",
    industryName: "LPG",
    industrySlug: "lpg",
    serviceName: "Procurement",
    serviceSlug: "procurement",
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
