// SEO-rich fallback insight articles. Shown when the database has no
// published articles yet, and upserted by prisma/seed.ts on first seed.
// Content format: blank-line separated blocks; "## " = H2, "- " = bullets,
// [label](/path) = internal link.

export interface FallbackArticle {
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  excerpt: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  tags: string;
  publishedAt: string;
  content: string;
}

export function readMinutes(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(3, Math.round(words / 200));
}

export const FALLBACK_ARTICLES: FallbackArticle[] = [
  {
    slug: "firewater-pump-sizing-kenya-duty-point-system-curve-npsh",
    title: "Firewater Pump Sizing in Kenya: Duty Point, System Curves & NPSH Explained",
    category: "Fire Protection",
    categorySlug: "fire-protection",
    excerpt:
      "How firewater pumps for Kenyan depots, terminals and industrial plants are actually sized — demand cases, system curves, duty-point matching and NPSH verification.",
    image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=1200&q=80",
    metaTitle: "Firewater Pump Sizing in Kenya: Duty Point, Curves & NPSH",
    metaDescription:
      "Firewater pump sizing for Kenyan industrial plants: demand cases, system curves, duty-point matching and NPSH checks by Ventron engineers.",
    tags: "firewater pumps Kenya, fire pump sizing, hydraulic modelling, NPSH, system curve",
    publishedAt: "2026-09-10",
    content: `Undersized firewater pumps are one of the most common — and most dangerous — defects we encounter in Kenyan industrial facilities. The pump runs, the gauges look alive, but at the hydraulically remote hydrant the pressure collapses. Sizing a firewater pump is not about picking a catalogue motor rating. It is about proving, with numbers, that the pump delivers the required flow at the required pressure through the actual pipe network. That proof is what [fire protection engineering](/services/fire-protection-engineering) delivers.

## Start from demand, not from the pump

Every sizing exercise begins with demand cases: which hydrants, monitors, foam or deluge systems operate simultaneously, at what flow and residual pressure. For petroleum storage terminals around Nairobi and Mombasa this typically means the maximum water demand scenario — the single most onerous credible fire event plus a hose-stream allowance. Guessing this number, or copying it from another site, invalidates everything downstream.

## Build the system curve from the real network

The system curve plots the head the network demands across a range of flows. It comes from surveyed pipe routing: lengths, diameters, elevations, valves and fittings. Two mistakes dominate East African projects: using "as-designed" drawings that were never updated to as-built conditions, and ignoring equivalent lengths of fittings, which in congested tank-farm manifolds can add 20–30% to friction loss. Our [hydraulic modelling capability](/capabilities) exists precisely for this step.

## Match the pump at its duty point

Overlay candidate pump curves on the system curve. The intersection is the duty point — where the pump will actually operate. A good selection sits near best efficiency, with margin for impeller wear and future network extensions. A pump selected far to the right of its curve will cavitate, vibrate and fail early; one far to the left wastes energy and capital.

- Verify duty point against every demand case, not just the headline one.
- Check run-out and shut-off conditions so the network survives valve closures.
- Confirm driver rating covers end-of-curve power, not just duty power.

## Verify NPSH — the check most often skipped

Net Positive Suction Head available (NPSHa) must exceed the pump's required NPSH with margin, at the lowest credible suction-tank level and highest water temperature. Break-tank installations and long suction runs in Kenyan depots frequently fail this check on paper even when the pump "works" — until a hot afternoon and a low tank combine. We calculate NPSH explicitly in every firewater study.

## What a proper pump datasheet contains

A complete deliverable states design flow, differential head, duty-point efficiency, NPSH margin, driver rating, materials for the pumped water quality, and the demand cases it was verified against. If your supplier's quotation contains only a motor kilowatt rating, you do not have an engineered selection — you have a guess. [Request a hydraulic review](/quote) before committing to pump procurement.`,
  },
  {
    slug: "maximum-water-demand-assessment-firewater-networks",
    title: "Maximum Water Demand Assessment: How Firewater Networks Are Really Sized",
    category: "Fire Protection",
    categorySlug: "fire-protection",
    excerpt:
      "The demand number drives tank size, pump rating and pipe diameters. Here is how a defensible maximum water demand assessment is built for industrial sites.",
    image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?w=1200&q=80",
    metaTitle: "Maximum Water Demand Assessment for Firewater Networks Kenya",
    metaDescription:
      "How maximum water demand is calculated for firewater networks in Kenya: fire scenarios, flow aggregation, duration and storage sizing.",
    tags: "maximum water demand, firewater network design Kenya, firewater storage sizing",
    publishedAt: "2026-08-26",
    content: `Ask three contractors for the firewater demand of the same depot and you may get three different answers. That spread is the reason insurers, auditors and fire engineers insist on a documented maximum water demand assessment. It is the single number from which storage volume, pump rating and ring-main diameters all follow — so it must be traceable, not asserted.

## Define the fire scenarios first

A demand assessment starts by listing credible fire scenarios for the occupancy: bund fires, tank rim exposure, loading-rack spill fires, warehouse compartments, dust or process areas. For each scenario, the applicable standard practice assigns application rates and areas of operation for sprinklers, deluge or foam, plus hydrant and monitor flows for manual firefighting. The governing scenario — the one demanding the most water — sets the design case.

## Aggregate flows honestly

Total demand is the sum of simultaneously operating systems: automatic suppression for the governing scenario, plus hydrants and monitors for exposure cooling and manual attack, plus any process safety flows that cannot be isolated. Common errors include double-counting systems that cannot physically operate together (conservative but wasteful) and omitting hose-stream allowances (dangerous). Each assumption should be written down so a reviewer can follow it.

## Duration sets the storage volume

Flow rate is only half the answer. Storage volume equals flow multiplied by required duration — commonly 2 to 4 hours for high-hazard industrial occupancies — plus allowances for refill limitations and testing. In parts of Kenya where municipal refill is unreliable, we routinely recommend the upper end and segregated firewater storage that process consumption cannot draw down.

- Document every scenario, rate, area and allowance in one calculation set.
- Size tanks from duration, not from rule-of-thumb volumes.
- Revisit the assessment whenever occupancy, storage or layout changes.

## From demand to network design

Once demand is fixed, the workflow continues into [hydraulic modelling](/capabilities): ring-main sizing, pump duty verification and pressure contour checks at the remote hydrant. Demand is the input; the network proof is the output. One without the other is half an engineering job.

## When to commission an assessment

New terminals, LPG facilities, warehouse developments, plant expansions, insurance audit findings and any site where "the pump seems small" are all triggers. A demand assessment typically pays for itself by preventing one oversized tank or one undersized pump. [Talk to our fire team](/contact) with your site layout and occupancy details.`,
  },
  {
    slug: "lpg-facility-design-essentials-east-africa",
    title: "LPG Facility Design Essentials for East Africa: Storage, Piping & Safety",
    category: "LPG",
    categorySlug: "lpg",
    excerpt:
      "Mounded bullets or above-ground vessels, vaporisers, filling manifolds and fire interfaces — the engineering decisions behind safe LPG plants in Kenya and the region.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80",
    metaTitle: "LPG Facility Design in Kenya: Storage, Piping & Safety Guide",
    metaDescription:
      "LPG plant engineering essentials for East Africa: vessel selection, piping, filling systems, safety distances and fire protection interfaces.",
    tags: "LPG facility design Kenya, LPG storage, LPG piping, LPG plant safety East Africa",
    publishedAt: "2026-08-12",
    content: `Kenya's LPG market keeps growing, and with it the number of storage and filling facilities across Nairobi, Mombasa, Nakuru and the wider region. LPG is an unforgiving product: heavier-than-air vapour, low ignition energy, and pressure storage. Safe plants come from disciplined engineering decisions, not from copying the neighbour's layout. These are the essentials we design around in every [LPG engineering engagement](/services/oil-gas-engineering).

## Storage: vessel type and siting

Above-ground horizontal bullets dominate Kenyan installations for good reason — inspectable, maintainable and straightforward to protect. Mounded or buried vessels reduce thermal exposure but complicate inspection and drainage. Whichever is chosen, capacity must cover working stock plus outage contingency, and siting must respect safety distances to boundaries, ignition sources and public areas, with prevailing-wind dispersion in mind.

## Piping and the filling manifold

LPG piping design balances pressure drop, thermal relief and leak minimisation. Liquid lines are kept as short and as welded as practical; flanged joints are minimised and located where they can be inspected. Every liquid section that can be blocked in requires thermal relief. The filling manifold — scales or mass metering, excess-flow protection, earthing and emergency shutdown — deserves the same design attention as the vessels, because it is where people and product meet daily.

- Prefer welded construction; minimise threaded joints in LPG service.
- Provide thermal relief on all blockable liquid sections.
- Design earthing, bonding and emergency shutdown into the manifold from day one.

## Vaporisers, pumps and utilities

Where vapour demand exceeds natural boil-off, vaporisers must be sized to peak filling rates with proper controls and relief. LPG pumps need NPSH care — LPG flashes easily, so suction conditions and recirculation lines matter more than in water service. Instrument air, drainage with water-draw management, and reliable power for shutdown systems complete the utility picture.

## Fire protection interface

LPG facilities need cooling water for exposure protection plus detection, shutdown and emergency response provisions integrated with the site [firewater network](/services/fire-protection-engineering). Hydrant and monitor coverage must reach vessels, manifolds and loading areas at adequate pressure — verified by calculation, not assumed.

## Documentation that outlives the contractor

P&IDs, vessel datasheets, relief calculations, cause-and-effect charts and operating envelopes are what let your team run the plant safely for twenty years. If a proposal offers steel without documents, it is offering half a plant. [Request an LPG scope review](/quote) and we will tell you plainly what your site needs.`,
  },
  {
    slug: "tank-farm-piping-upgrades-seven-mistakes",
    title: "Tank Farm Piping Upgrades: 7 Mistakes That Cost Depot Operators",
    category: "Oil & Gas",
    categorySlug: "oil-gas",
    excerpt:
      "From unreviewed tie-ins to forgotten surge analysis — the recurring piping errors we see in East African petroleum depots, and how engineered upgrades avoid them.",
    image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=1200&q=80",
    metaTitle: "Tank Farm Piping Upgrades: 7 Costly Mistakes | Kenya Depots",
    metaDescription:
      "Seven recurring piping mistakes in Kenyan petroleum depots — tie-ins, surge, supports, drainage — and how engineered upgrades prevent them.",
    tags: "tank farm piping Kenya, depot upgrade, petroleum terminal piping, process piping",
    publishedAt: "2026-07-29",
    content: `Most depot piping failures we investigate share a root cause: the upgrade was built without current engineering. A tie-in here, a rerouted line there, and after a decade the terminal operates on drawings nobody trusts. These seven mistakes recur across East African petroleum storage — each avoidable with proper [process and piping engineering](/services/process-piping-engineering).

## 1. Tie-ins without a line list review

New connections get welded into whatever line is closest, without checking service compatibility, pressure rating or flow direction. Every tie-in should be logged against the P&ID and line list, with isolation verified before cutting.

## 2. Ignoring surge on valve upgrades

Replacing a slow manual valve with a fast-acting actuated one can generate surge pressures that split gaskets or lift reliefs. Any change in closure time on product lines above modest velocities deserves a surge check.

## 3. Supports added as an afterthought

Pipe racks corrode, clamps disappear, and new lines rest on old steel. Inadequate support causes sagging, water pockets, vibration and eventual flange leaks. Support design is part of piping design, not scaffolding's problem.

- Survey existing supports before routing new lines.
- Allow for thermal movement at tank connections.
- Replace corroded supports in the same shutdown window.

## 4. No low-point drains or high-point vents

Product and water get trapped, testing becomes guesswork, and maintenance crews dread every isolation. Drains and vents cost little during construction and save fortunes in operations.

## 5. Mixing specifications at flanges

A Class 150 flange mated to PN16, or stainless bolts on carbon flanges without isolation, creates the leak of next year. Upgrade packages must state the piping specification explicitly at every interface.

## 6. Forgetting the firewater interface

Transfer upgrades change the hazard profile — new products, larger bunds, relocated loading. The [fire protection demand](/insights/maximum-water-demand-assessment-firewater-networks) should be rechecked whenever the process side changes.

## 7. As-builts that never happen

The upgrade is commissioned, the contractor leaves, and the drawings stay red-marked in a site office drawer. Insist on as-built P&IDs, isometrics and line lists as a hold point for final payment — it is the cheapest insurance a depot can buy.

Engineered upgrades cost slightly more upfront and dramatically less over the asset life. Send us your depot layout for a [piping review](/contact).`,
  },
  {
    slug: "diesel-vs-electric-fire-pumps-duty-standby",
    title: "Diesel vs Electric Fire Pumps: Selecting Duty/Standby Configurations",
    category: "Energy",
    categorySlug: "energy",
    excerpt:
      "Reliability, power security, testing regimes and Kenyan site realities — how to choose between diesel and electric fire pump drivers and arrange duty/standby sets.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&q=80",
    metaTitle: "Diesel vs Electric Fire Pumps: Duty/Standby Selection Guide",
    metaDescription:
      "Choosing diesel vs electric fire pump drivers for Kenyan plants: reliability, power security, testing and duty/standby arrangements explained.",
    tags: "diesel fire pump, electric fire pump Kenya, duty standby pumps, jockey pump",
    publishedAt: "2026-07-15",
    content: `When the fire alarm sounds, the fire pump must start — regardless of grid status, maintenance windows or fuel logistics. Driver selection and duty/standby arrangement are therefore reliability decisions first and cost decisions second. Here is how we work through them with Kenyan facility owners.

## The reliability question comes first

Electric pumps depend on the grid or site generation; diesel pumps depend on fuel quality, battery charge and maintenance discipline. Kenyan sites with unstable mains or no standby generation lean diesel for the primary set. Sites with robust captive power and strong electrical maintenance often prefer electric duty pumps with diesel standby. There is no universal answer — only the answer that matches your site's failure modes.

## Standard arrangements that work

A proven high-hazard configuration is electric-duty plus diesel-standby, each independently capable of the full demand, with a jockey pump maintaining network pressure against minor leakage. The jockey prevents nuisance starts of the main sets; auto-start sequencing and weekly churn testing prove readiness. Whatever the arrangement, a single pump with no standby is difficult to defend for depots, terminals and high-rack warehousing.

- Size each main set for 100% of demand — standby means standby.
- Jockey capacity covers leakage only, never fire flow.
- Controllers, sensing lines and start logic need the same attention as the pumps.

## Fuel, batteries and testing discipline

Diesel reliability lives or dies on fuel housekeeping — turnover, water draining, polishing where needed — plus battery charging and load testing. Electric sets need their own discipline: supply monitoring, phase-failure protection and periodic flow testing through test loops or back to tank. We specify test return lines in every [fire pump package](/services/fire-protection-engineering) so proving performance never requires flooding the yard.

## Power and water security in Kenya

Consider the whole chain: does the electric option survive a Kenya Power outage during a fire? Does the diesel option survive six months of skipped maintenance? Answering honestly usually points to a mixed arrangement with automatic changeover — the configuration we most often recommend for Nairobi industrial parks and upcountry depots alike.

## Specify, then verify

Driver ratings must cover end-of-curve power, controllers must be listed for fire service, and commissioning must include witnessed flow tests at duty and run-out. Paper compliance without water on the ground is worth little. [Ask us to review your pump specification](/quote) before you buy.`,
  },
  {
    slug: "pids-isometrics-documentation-prevents-rework",
    title: "P&IDs and Isometrics: The Documentation That Prevents Site Rework",
    category: "Engineering",
    categorySlug: "engineering",
    excerpt:
      "Rework is a documentation failure with a construction invoice attached. What good P&IDs, GA drawings and isometrics contain — and how they pay for themselves.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80",
    metaTitle: "P&IDs & Isometrics: Documentation That Prevents Rework Kenya",
    metaDescription:
      "Why P&IDs, GA drawings and piping isometrics prevent costly site rework on Kenyan industrial projects — and what good documentation contains.",
    tags: "P&ID development Kenya, piping isometrics, engineering documentation, GA drawings",
    publishedAt: "2026-06-30",
    content: `Ask any site supervisor in Nairobi's industrial zone what causes rework, and the answer is rarely workmanship. It is clashes, missing dimensions, undefined interfaces and "we thought the other contractor was doing that." All of these are documentation failures — and all are cheaper to fix on paper than in steel. This is why our [engineering consultancy](/services/engineering-consultancy) treats documents as deliverables, not paperwork.

## P&IDs: the project's single source of truth

A proper piping and instrumentation diagram shows every vessel, pump, valve, instrument and line with unique tags, services, sizes, ratings and control logic. It is the reference that procurement buys against, construction builds from and operations inherits. Projects that start construction on "90% P&IDs" reliably spend the missing 10% ten times over in field changes.

## General arrangements prevent clashes

Equipment layouts and GA drawings resolve, in plan and elevation, what installers otherwise resolve with cutting torches: maintenance access, lifting paths, valve reachability, drainage falls and separation distances. A two-hour clash review of the GA set routinely eliminates a week of site standing time.

- Freeze P&IDs before bulk procurement — changes after steel is ordered are expensive.
- Model congested areas in 3D where GA views cannot resolve routing.
- Tag everything; untagged items cannot be inspected, tested or maintained.

## Isometrics: where fabrication meets installation

Piping isometrics give each spool its dimensions, weld mapping, supports and bill of materials. For [tank farm and process upgrades](/insights/tank-farm-piping-upgrades-seven-mistakes), isometrics are what allow off-site fabrication, controlled shutdown windows and verifiable weld quality — instead of pipefitters measuring up in a live plant.

## Datasheets and specifications close the loop

Equipment datasheets state duty, materials, testing and documentation requirements so suppliers quote comparable offers. Piping specifications define ratings, materials and jointing per service so the site team never improvises. Together with the drawings, they form a package a second engineer could build from — the true test of completeness.

## The commercial case

A full documentation package typically costs a fraction of one serious rework event: a rerouted manifold, a pump that does not fit its plinth, a shutdown that overruns by days. Clients who have paid for rework once never build without documents again. Start your next project with the paper right — [talk to engineering](/contact).`,
  },
];
