// Rich marketing + technical content for the 8 service detail pages.
// Honest framing throughout: capabilities and workflows, no invented
// clients, no unverifiable superlatives.

export interface ServiceRich {
  name: string;
  tagline: string;
  description: string;
  intro: string[];
  outcome: string;
  subServices: [string, string][];
  process: [string, string][];
  engagements: string[];
  deliverables: string[];
  insights: string[];
}

export const SERVICES_RICH: Record<string, ServiceRich> = {
  "mechanical-engineering": {
    name: "Mechanical Engineering",
    tagline: "Design, sizing & documentation for reliable mechanical systems.",
    description:
      "Mechanical system design, equipment layouts, equipment sizing, mechanical calculations, piping and utility systems, CAD modelling and engineering documentation for industrial facilities across Kenya and East Africa.",
    intro: [
      "Every reliable plant starts as a correct calculation. Ventron's mechanical engineering practice designs the systems other contractors install: equipment layouts that fit, pumps sized to verified duties, piping routed for operation — all documented in drawing sets your team can build from and maintain for decades.",
      "We work for plant owners, EPC contractors and consultants who need design capacity without carrying a full in-house department — from single-equipment datasheets to complete mechanical packages for terminals, factories and commercial plants.",
    ],
    outcome: "Plants that start up on schedule, run at rated efficiency, and can be maintained by your own team.",
    subServices: [
      ["Mechanical system design", "Steam, water, air, fuel and process support systems sized to real operating duties — not catalogue guesses."],
      ["Equipment layouts", "Plot plans and equipment arrangements with access, lifting, drainage and future expansion resolved on paper."],
      ["Equipment sizing", "Pumps, vessels, exchangers and package units selected at verified duty points with documented margins."],
      ["Mechanical calculations", "Hydraulics, pressure loss, NPSH, thermal expansion and support loads — traceable calculation sets."],
      ["Piping & utility systems", "Distribution networks for steam, condensate, water, air and process fluids with metering philosophy."],
      ["CAD modelling", "2D general arrangements and 3D coordination models that eliminate site clashes before steel is ordered."],
      ["Engineering documentation", "P&IDs, datasheets, specifications and reports that survive handover and satisfy auditors."],
      ["Troubleshooting & debottlenecking", "Root-cause engineering for cavitation, vibration, fouling and capacity constraints in existing plants."],
    ],
    process: [
      ["Scope & data capture", "Drawings, operating data and site survey — we establish the real duty before designing anything."],
      ["Design & calculation", "Layouts, sizing and checks issued as a traceable package, reviewed independently before release."],
      ["Documentation", "P&IDs, GAs, isometrics and datasheets your contractors can price and build from."],
      ["Construction support", "Site queries answered fast, inspections witnessed, commissioning supported to handover."],
    ],
    engagements: [
      "Factory utility system design and upgrades",
      "Pump replacement and re-selection programmes",
      "Equipment layout for new plants and expansions",
      "Independent design reviews of third-party packages",
      "Troubleshooting chronic equipment failures",
    ],
    deliverables: ["P&IDs and GA drawings", "Sizing and stress calculation sets", "Equipment datasheets", "Piping isometrics and line lists", "Technical specifications", "Commissioning records"],
    insights: ["pids-isometrics-documentation-prevents-rework", "diesel-vs-electric-fire-pumps-duty-standby"],
  },
  "oil-gas-engineering": {
    name: "Oil & Gas Engineering",
    tagline: "Petroleum, LPG & storage terminal engineering.",
    description:
      "Engineering for petroleum facilities, LPG systems, storage terminals, tank farms, loading facilities, process piping and utilities — designed for safety, throughput and auditability.",
    intro: [
      "Depots and terminals live or die on operability: transfer rates, loss control, safety compliance and the ability to prove all three to auditors and insurers. Ventron engineers petroleum handling, LPG storage and loading, tank farms and utility networks as integrated systems — process, fire protection and documentation together.",
      "From Nairobi-area depots to coastal terminals and upcountry inland facilities, our work covers both greenfield developments and the brownfield upgrades where most East African capacity actually comes from.",
    ],
    outcome: "Terminals that load faster, lose less product, pass audits — and keep operating through upgrades.",
    subServices: [
      ["LPG facilities", "Bullet storage, mounded concepts, vaporisers, filling manifolds and safety systems."],
      ["Petroleum storage terminals", "Tank farm layouts, floating and fixed roof interfaces, bund drainage and gauging provisions."],
      ["Tank farms", "Transfer headers, manifold rationalisation, support redesign and as-built reconstitution."],
      ["Loading systems", "Road and rail loading racks with metering, earthing, E-stop and spill containment."],
      ["Process & transfer piping", "Sized, supported and specified piping with surge analysis on actuated valves."],
      ["Pump systems", "Transfer and loading pumps selected to verified duties with NPSH margins."],
      ["Utility systems", "Firewater, oily-water, instrument air and power interfaces for terminal operations."],
      ["Fire protection interface", "Cooling, foam and hydrant coverage verified against the process hazard profile."],
    ],
    process: [
      ["Survey & hazard review", "As-built verification and scenario definition — design starts from reality."],
      ["Engineering & modelling", "Layouts, hydraulics and equipment selection with independent checking."],
      ["Authority & approval support", "Submissions structured for fire-authority and insurer review."],
      ["Construction & commissioning", "Supervision, testing records and as-built handover dossiers."],
    ],
    engagements: [
      "New LPG storage and filling plants",
      "Depot transfer network revamps",
      "Loading rack safety close-outs",
      "Terminal fire protection upgrades",
      "Throughput and loss-reduction studies",
    ],
    deliverables: ["Terminal layouts and P&IDs", "Hydraulic and surge calculations", "Equipment datasheets", "Hazard-review close-out registers", "As-built dossiers and O&M inputs"],
    insights: ["tank-farm-piping-upgrades-seven-mistakes", "lpg-facility-design-essentials-east-africa"],
  },
  "fire-protection-engineering": {
    name: "Fire Protection Engineering",
    tagline: "Firewater networks, pumps & hydraulic analysis.",
    description:
      "Firewater storage, pump systems, ring mains, hydrants, monitors, foam and deluge systems — plus hydraulic calculations and maximum water demand analysis engineered to applicable standards.",
    intro: [
      "Fire protection is the one system that must work perfectly on its worst day. Ventron's fire practice sizes every element from verified demand: storage from duration, pumps from system curves, pipes from surveyed routing. The result is a network you can prove — to insurers, auditors and your own board.",
      "We serve depots, LPG plants, warehouses, manufacturing sites and commercial developments across Kenya and East Africa, for both new installations and remediation of systems that cannot currently be demonstrated.",
    ],
    outcome: "A fire system with documented demand, verified pressures at the remote hydrant — and an insurer-ready dossier.",
    subServices: [
      ["Firewater storage", "Tank sizing from duration and refill reality, with segregation from process consumption."],
      ["Pump systems & skids", "Diesel, electric and jockey sets in duty/standby arrangements with auto-sequencing."],
      ["Ring mains", "Looped distribution designed for isolation, testing and future extension."],
      ["Hydrants & monitors", "Coverage mapping and pressure verification at the hydraulically remote point."],
      ["Foam systems", "Proportioning, bladder tanks and discharge design for flammable-liquid hazards."],
      ["Deluge systems", "Detection-linked deluge for loading racks, transformers and process areas."],
      ["Hydraulic modelling", "Full network models, system curves and scenario testing."],
      ["Maximum demand assessment", "Governing-scenario analysis that fixes the single number everything follows."],
    ],
    process: [
      ["Demand first", "Scenarios, rates and durations agreed and documented before any sizing."],
      ["Model the network", "Surveyed routing in, system curves out — pressures proven everywhere."],
      ["Select & specify", "Pumps, pipes and equipment matched to verified duties with margins."],
      ["Prove it", "Witnessed flow tests, commissioning records and the handover dossier."],
    ],
    engagements: [
      "Terminal and depot firewater studies",
      "Pump replacement and re-rating",
      "Warehouse and commercial suppression upgrades",
      "Foam and deluge design for rack and process areas",
      "Insurance-audit remediation programmes",
    ],
    deliverables: ["Demand calculation set", "Hydraulic model and pressure reports", "Pump datasheets and duty sheets", "Layout and isometric drawings", "Test and commissioning records"],
    insights: ["firewater-pump-sizing-kenya-duty-point-system-curve-npsh", "maximum-water-demand-assessment-firewater-networks", "diesel-vs-electric-fire-pumps-duty-standby"],
  },
  "process-piping-engineering": {
    name: "Process & Piping Engineering",
    tagline: "P&IDs, layouts, hydraulics & pipe sizing.",
    description:
      "Piping layouts, P&IDs, pipe sizing, pressure loss calculations, pump selection, piping specifications, equipment connections and routing studies for process and utility systems.",
    intro: [
      "Piping is where process intent becomes physical reality — and where most rework originates. Ventron's piping practice ties P&IDs to layouts to isometrics in one unbroken chain, so what is designed is what gets fabricated, and what gets fabricated is what gets verified.",
      "We support plant owners executing brownfield tie-ins, contractors needing fabrication packages, and consultants requiring independent piping verification.",
    ],
    outcome: "Spool packages that fit first time, shutdowns that finish on schedule, and as-builts worth keeping.",
    subServices: [
      ["P&IDs", "Complete process and utility P&IDs with tagging, services, sizes and control logic."],
      ["Piping layouts", "Routing resolved in plan and elevation with access, drainage and maintenance in mind."],
      ["Pipe sizing", "Velocity, pressure-loss and two-phase checks across operating and upset cases."],
      ["Pump selection", "Duty-point matching with NPSH verification and end-of-curve driver checks."],
      ["Routing studies", "Optioneering for congested racks and live-plant tie-ins with quantified trade-offs."],
      ["Piping specifications", "Ratings, materials and jointing defined per service — no site improvisation."],
      ["Isometrics & supports", "Fabrication isometrics with weld mapping, supports and bills of materials."],
      ["Tie-in engineering", "Hot-tap and shutdown tie-in design with isolation and sequencing plans."],
    ],
    process: [
      ["Freeze the P&ID", "Process intent locked and tagged before a single spool is drawn."],
      ["Route and check", "Layouts, stress allowances and support concepts resolved in 3D where congested."],
      ["Issue for fabrication", "Isometrics, specs and datasheets released as a priced, buildable package."],
      ["Verify installation", "Line walks, punch lists and as-built capture to close the loop."],
    ],
    engagements: [
      "Depot and terminal piping revamps",
      "Process plant utility rerouting",
      "Fabrication packages for contractors",
      "Brownfield tie-in design and supervision",
      "As-built reconstitution of legacy plants",
    ],
    deliverables: ["P&IDs and line lists", "Layout and support drawings", "Fabrication isometrics", "Pipe stress allowances and surge checks", "Piping specifications", "As-built dossiers"],
    insights: ["tank-farm-piping-upgrades-seven-mistakes", "pids-isometrics-documentation-prevents-rework"],
  },
  "engineering-consultancy": {
    name: "Engineering Consultancy",
    tagline: "Feasibility, audits & technical advisory.",
    description:
      "Feasibility studies, site surveys, technical audits, engineering studies, technical reports, system optimisation and design reviews — independent advice before you commit capital.",
    intro: [
      "The cheapest engineering decision is the one made before money is committed. Ventron's consultancy gives owners, lenders and contractors an independent technical view: what a site really needs, what it will cost, what can go wrong — and whether a third-party design holds water.",
      "Typical clients are developers scoping industrial investments, plant managers facing chronic problems, and contractors needing a checking engineer on record.",
    ],
    outcome: "Decisions backed by numbers: feasibility proven, risks priced, designs verified — before construction starts.",
    subServices: [
      ["Feasibility studies", "Technical and budget feasibility with option ranking and risk registers."],
      ["Site surveys", "Measured surveys of plants, networks and equipment with photographic records."],
      ["Technical audits", "Fire systems, utilities and mechanical installations audited against good practice."],
      ["Engineering studies", "Debottlenecking, energy-loss and capacity studies with payback-ranked actions."],
      ["Design reviews", "Independent checking of third-party drawings and calculations."],
      ["System optimisation", "Operating envelopes, setpoints and control philosophy tuned to real duties."],
      ["Due diligence support", "Technical input for acquisitions, financing and insurance processes."],
      ["Expert reporting", "Clear, defensible reports written for non-engineer decision makers."],
    ],
    process: [
      ["Define the question", "We agree what decision the study must support — scope follows the decision."],
      ["Gather evidence", "Surveys, measurements, records and interviews — no desktop-only opinions."],
      ["Analyse & rank", "Options costed, risks registered, recommendations ranked by value."],
      ["Report & defend", "Findings presented plainly, with working papers available for scrutiny."],
    ],
    engagements: [
      "Pre-investment feasibility for industrial plants",
      "Fire and utility system audits",
      "Chronic-plant troubleshooting studies",
      "Third-party design verification",
      "Lender and insurer technical reviews",
    ],
    deliverables: ["Feasibility and audit reports", "Survey records and photo logs", "Option rankings with budget costs", "Risk registers", "Presentation-ready executive summaries"],
    insights: ["pids-isometrics-documentation-prevents-rework", "tank-farm-piping-upgrades-seven-mistakes"],
  },
  procurement: {
    name: "Procurement",
    tagline: "Verified pumps, valves & fire equipment sourcing.",
    description:
      "Industrial equipment sourcing — pumps, valves, fire protection equipment, mechanical components, piping materials and specialised systems — with technical comparison, verification and documentation control.",
    intro: [
      "Buying industrial equipment in East Africa is easy. Buying the right equipment, verified against your duty, with documentation your auditors accept — that is engineering procurement. Ventron specifies first, then sources: datasheets before quotations, technical comparison before price comparison.",
      "We procure for our own design clients and as a standalone service for owners and contractors who already know what they need built — but want the buying done right.",
    ],
    outcome: "Equipment that matches its datasheet, arrives with its documents, and performs at its duty.",
    subServices: [
      ["Firewater pumps", "Diesel, electric and jockey sets matched to verified hydraulic demand."],
      ["Process & transfer pumps", "End-suction, multistage and metering units for plant duties."],
      ["Valves", "Gate, globe, ball, butterfly, check and control valves to stated ratings and services."],
      ["Fire protection equipment", "Hydrants, monitors, foam hardware, hose systems and fittings."],
      ["Piping materials", "Pipes, flanges, gaskets, bolting and supports to project specifications."],
      ["LPG equipment", "Vessels, vaporisers, regulators, metering and safety devices."],
      ["Package systems", "Skid-mounted pump, dosing and treatment packages with controls."],
      ["Spares & documentation", "Commissioning spares, O&M manuals and test certificates collated per tag."],
    ],
    process: [
      ["Specify", "Datasheets and specifications fixed — suppliers quote the same thing."],
      ["Compare technically", "Offers tabulated against requirements before any commercial discussion."],
      ["Verify", "Factory data, test certificates and pre-shipment checks as scope demands."],
      ["Deliver & document", "Expediting, inspection on arrival and a collated handover file."],
    ],
    engagements: [
      "Fire pump package supply for terminals and towers",
      "Valve and piping material supply for revamps",
      "LPG facility equipment packages",
      "Owner's procurement verification on contractor supply",
      "Spares rationalisation for operating plants",
    ],
    deliverables: ["Equipment datasheets", "Technical bid tabulations", "Inspection and test records", "Collated O&M documentation", "Spares lists"],
    insights: ["diesel-vs-electric-fire-pumps-duty-standby", "firewater-pump-sizing-kenya-duty-point-system-curve-npsh"],
  },
  "project-management": {
    name: "Project Management",
    tagline: "Planning, supervision & commissioning support.",
    description:
      "Project planning, scheduling, coordination, site supervision, contractor management, progress reporting, installation oversight and commissioning — delivery with engineering accountability.",
    intro: [
      "Industrial projects fail in the gaps between contractors: unclear interfaces, unverified installations, commissioning that starts before construction finishes. Ventron manages those gaps with engineers on site — planning, coordinating, inspecting and proving — until handover.",
      "Owners appoint us as their engineering eyes on contractor-executed works; contractors appoint us for supervision capacity and commissioning discipline they cannot spare in-house.",
    ],
    outcome: "Works that finish on programme, install to drawing, and hand over with records — not excuses.",
    subServices: [
      ["Planning & scheduling", "Realistic programmes with shutdown windows, lead times and interface milestones."],
      ["Site supervision", "Resident or visiting supervision with daily records and defect tracking."],
      ["Contractor management", "Work-pack release, interface control and progress certification."],
      ["QA/QC oversight", "Inspection and test plans enforced with hold points that hold."],
      ["HSE coordination", "Permit interfaces, method-statement review and shutdown safety sequencing."],
      ["Progress reporting", "Earned-progress reporting written for owners, not just planners."],
      ["Installation oversight", "Line walks, alignment checks and pre-commissioning verification."],
      ["Commissioning support", "Start-up sequencing, performance proving and handover dossiers."],
    ],
    process: [
      ["Baseline the plan", "Scope, programme and acceptance criteria agreed before mobilisation."],
      ["Control the interfaces", "Work packs, permits and hold points managed week by week."],
      ["Verify continuously", "Inspection and testing witnessed as works proceed — never retrospectively."],
      ["Commission & close", "Punch lists driven to zero and the dossier handed over complete."],
    ],
    engagements: [
      "Owner's engineer on terminal and plant projects",
      "Brownfield revamp supervision in live facilities",
      "Shutdown-window works management",
      "Contractor commissioning support",
      "Multi-contractor interface management",
    ],
    deliverables: ["Baseline programme and progress reports", "Inspection and test records", "Punch lists and close-out registers", "Commissioning dossiers", "As-built handover files"],
    insights: ["tank-farm-piping-upgrades-seven-mistakes", "pids-isometrics-documentation-prevents-rework"],
  },
  "qa-qc": {
    name: "QA / QC",
    tagline: "Inspection, testing & technical compliance.",
    description:
      "Design review, documentation control, inspections, testing, material verification, installation checks and commissioning checks — independent quality assurance for industrial projects.",
    intro: [
      "Quality cannot be inspected into a finished plant — but it can be verified at every stage that matters. Ventron provides independent QA/QC: checking designs before release, materials before installation, and installations before concealment, with records that satisfy the toughest auditor.",
      "Lenders, insurers, owners and main contractors use our QA/QC to de-risk contractor-executed works across Kenya and the region.",
    ],
    outcome: "A project file that proves compliance — and a plant that performs as specified.",
    subServices: [
      ["Design review", "Independent checking of calculations, drawings and datasheets before issue."],
      ["Documentation control", "Revision discipline, approval workflows and master document registers."],
      ["Material verification", "Mill certificates, ratings and specification compliance on delivery."],
      ["Welding & NDT coordination", "WPS/PQR review, welder qualification checks and NDT scope verification."],
      ["Installation inspection", "Line walks, support, alignment and torque verification against isometrics."],
      ["Testing & witnessing", "Hydrotest, flushing, flow and loop checks with traceable records."],
      ["Compliance verification", "Specification and standards compliance matrices closed item by item."],
      ["Pre-handover audits", "Punch-list generation, close-out verification and dossier acceptance."],
    ],
    process: [
      ["Plan quality in", "ITPs, hold points and acceptance criteria set before mobilisation."],
      ["Verify inputs", "Designs checked, materials verified, welders qualified — before work starts."],
      ["Witness the work", "Hold points enforced with signed, traceable inspection records."],
      ["Prove completion", "Testing witnessed, punch lists closed, dossier accepted."],
    ],
    engagements: [
      "Third-party inspection on terminal projects",
      "Welding and piping QA on revamps",
      "Materials verification programmes",
      "Pre-handover compliance audits",
      "Lender's QA monitoring",
    ],
    deliverables: ["Inspection and test plans", "Witnessed test records", "NCR and punch-list registers", "Compliance matrices", "Handover QA dossiers"],
    insights: ["pids-isometrics-documentation-prevents-rework", "maximum-water-demand-assessment-firewater-networks"],
  },
};
