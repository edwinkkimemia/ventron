// Shared seeding logic — used by `prisma/seed.ts` (CLI) and by the admin
// dashboard "Load starter content" action (Vercel, where no shell exists).
// All writes are upserts: safe to run repeatedly, never duplicates.
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";
import { FALLBACK_ARTICLES } from "./insights-fallback";
import { FALLBACK_PROJECTS } from "./projects-fallback";

export async function seedDatabase() {
  // --- Admin user (password synced on every run) ---
  const adminEmail = (process.env.ADMIN_EMAIL ?? "admin@ventronltd.com").toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, role: "SUPER_ADMIN" },
    create: { name: "Ventron Admin", email: adminEmail, passwordHash, role: "SUPER_ADMIN" },
  });

  // --- Services ---
  const services = [
    { name: "Mechanical Engineering", slug: "mechanical-engineering", tagline: "Design, sizing & documentation for reliable mechanical systems.", description: "Mechanical design, equipment layouts, piping systems, equipment sizing, CAD drawings and technical calculations for industrial facilities.", content: "Ventron delivers mechanical engineering from concept to commissioning: equipment layouts, piping design, equipment sizing, mechanical calculations, CAD modelling and full engineering documentation.", icon: "Cog", featured: true, order: 1 },
    { name: "Oil & Gas Engineering", slug: "oil-gas-engineering", tagline: "Petroleum, LPG & storage terminal engineering.", description: "Engineering for petroleum facilities, LPG systems, storage terminals, tank farms, loading facilities, process piping and utilities.", content: "We engineer petroleum handling, LPG storage and loading, tank farms, process piping, pump systems and utility networks with a focus on safety and lifecycle performance.", icon: "Flame", featured: true, order: 2 },
    { name: "Fire Protection Engineering", slug: "fire-protection-engineering", tagline: "Firewater networks, pumps & hydraulic analysis.", description: "Firewater systems, fire pumps, hydrants, monitors, foam and deluge systems, hydraulic calculations and maximum water demand analysis.", content: "Our fire protection practice covers firewater storage, pump skids, ring mains, hydrants, monitors, foam and deluge systems plus full hydraulic modelling, system curves, NPSH verification and demand assessment.", icon: "Droplets", featured: true, order: 3 },
    { name: "Process & Piping Engineering", slug: "process-piping-engineering", tagline: "P&IDs, layouts, hydraulics & pipe sizing.", description: "Piping layouts, P&IDs, pipe sizing, pressure loss calculations, pump selection and routing studies.", content: "Process and piping engineering including P&IDs, general arrangements, pipe sizing, pressure loss and velocity checks, pump selection, piping specifications and equipment connections.", icon: "GitBranch", featured: true, order: 4 },
    { name: "Engineering Consultancy", slug: "engineering-consultancy", tagline: "Feasibility, audits & technical advisory.", description: "Feasibility studies, site surveys, technical audits, engineering studies, design reviews and system optimisation.", content: "Independent engineering consultancy: feasibility studies, site surveys, technical audits, engineering reports, design reviews and optimisation of existing systems.", icon: "ClipboardCheck", featured: false, order: 5 },
    { name: "Procurement", slug: "procurement", tagline: "Verified pumps, valves & fire equipment sourcing.", description: "Sourcing of pumps, valves, fire protection equipment, mechanical components and specialised industrial systems.", content: "We source and verify industrial equipment — firewater pumps, process pumps, valves, piping materials, fire equipment and package systems — with documentation control and QA.", icon: "Package", featured: false, order: 6 },
    { name: "Project Management", slug: "project-management", tagline: "Planning, supervision & commissioning support.", description: "Project planning, scheduling, coordination, site supervision, contractor management, progress reporting, installation oversight and commissioning support.", content: "Construction management and project delivery: planning, scheduling, coordination, site supervision, contractor management, installation oversight and commissioning support.", icon: "HardHat", featured: false, order: 7 },
    { name: "QA / QC", slug: "qa-qc", tagline: "Inspection, testing & technical compliance.", description: "Inspections, testing, material verification, documentation review, installation checks and commissioning checks.", content: "QA/QC services covering design review, material verification, installation inspection, testing, documentation control and technical compliance verification.", icon: "ShieldCheck", featured: false, order: 8 },
  ];
  for (const s of services) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: s, create: { ...s, published: true } });
  }

  // --- Industries ---
  const industries = [
    { name: "Oil & Gas", slug: "oil-gas", description: "Engineering for petroleum storage, handling and distribution facilities including terminals, piping and utilities.", order: 1 },
    { name: "LPG", slug: "lpg", description: "LPG storage, filling, piping and safety systems engineered for reliability and safe operation.", order: 2 },
    { name: "Energy", slug: "energy", description: "Mechanical and utility systems supporting power generation, renewables integration and energy infrastructure.", order: 3 },
    { name: "Manufacturing", slug: "manufacturing", description: "Process utilities, compressed air, steam, piping and equipment support for manufacturing plants.", order: 4 },
    { name: "Petroleum Storage", slug: "petroleum-storage", description: "Tank farms, loading racks, fire protection and transfer systems for depots and terminals.", order: 5 },
    { name: "Commercial Infrastructure", slug: "commercial-infrastructure", description: "Fire protection, plumbing-adjacent mechanical and pumping systems for commercial developments.", order: 6 },
    { name: "Utilities", slug: "utilities", description: "Water, booster, transfer and firewater pumping systems for utilities and campuses.", order: 7 },
    { name: "Industrial Processing", slug: "industrial-processing", description: "Process piping, equipment integration and plant utilities for processing facilities.", order: 8 },
  ];
  for (const i of industries) {
    await prisma.industry.upsert({ where: { slug: i.slug }, update: i, create: i });
  }

  // --- Portfolio projects (full case entries, confidential clients) ---
  for (const p of FALLBACK_PROJECTS) {
    const ind = await prisma.industry.findUnique({ where: { slug: p.industrySlug } });
    const svc = await prisma.service.findUnique({ where: { slug: p.serviceSlug } });
    const data = {
      title: p.title,
      excerpt: p.excerpt,
      description: p.description,
      challenge: p.challenge,
      solution: p.solution,
      scope: p.scope,
      deliverables: p.deliverables,
      location: p.location,
      client: p.client,
      year: p.year,
      status: p.status as any,
      featured: p.featured,
      published: true,
      featuredImage: p.featuredImage,
      industryId: ind?.id,
      serviceId: svc?.id,
    };
    await prisma.project.upsert({ where: { slug: p.slug }, update: { ...data }, create: { ...data, slug: p.slug } });
  }

  // --- Article categories ---
  const cats = ["Oil & Gas", "Fire Protection", "Engineering", "LPG", "Energy", "Safety"];
  for (const c of cats) {
    const slug = c.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await prisma.articleCategory.upsert({ where: { slug }, update: {}, create: { name: c, slug } });
  }

  // --- Insight articles (SEO-rich, published) ---
  for (const a of FALLBACK_ARTICLES) {
    const cat = await prisma.articleCategory.findUnique({ where: { slug: a.categorySlug } });
    const data = {
      title: a.title,
      excerpt: a.excerpt,
      content: a.content,
      categoryId: cat?.id,
      featuredImage: a.image,
      authorName: "Ventron Engineering",
      metaTitle: a.metaTitle,
      metaDescription: a.metaDescription,
      tags: a.tags,
    };
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: { ...data },
      create: { ...data, slug: a.slug, published: true, publishedAt: new Date(a.publishedAt) },
    });
  }

  // --- Equipment categories + items ---
  const eqCats = [
    { name: "Pumps", slug: "pumps", description: "Firewater, process, transfer and booster pumps with sizing support." },
    { name: "Fire Protection Equipment", slug: "fire-protection-equipment", description: "Hydrants, monitors, foam equipment, valves and hose systems." },
    { name: "Mechanical Equipment", slug: "mechanical-equipment", description: "Valves, piping components, tanks and mechanical accessories." },
    { name: "LPG Equipment", slug: "lpg-equipment", description: "LPG facility components including vessels, vaporisers, piping and safety devices." },
  ];
  for (const c of eqCats) {
    await prisma.equipmentCategory.upsert({ where: { slug: c.slug }, update: c, create: c });
  }
  const pumpsCat = await prisma.equipmentCategory.findUnique({ where: { slug: "pumps" } });
  const eqItems = [
    { name: "Diesel Fire Pump Set", slug: "diesel-fire-pump-set", description: "Diesel-driven fire pump packages with controller, sized to hydraulic demand.", categoryId: pumpsCat?.id },
    { name: "Electric Fire Pump Set", slug: "electric-fire-pump-set", description: "Electric fire pump packages for duty/standby configurations.", categoryId: pumpsCat?.id },
    { name: "Jockey Pump Package", slug: "jockey-pump-package", description: "Pressure maintenance pump packages for firewater networks.", categoryId: pumpsCat?.id },
  ];
  for (const e of eqItems) {
    await prisma.equipment.upsert({ where: { slug: e.slug }, update: { ...e }, create: { ...e, published: true } });
  }

  // --- Statistics ---
  const stats = [
    { label: "Engineering Disciplines", value: "8", suffix: "", order: 1 },
    { label: "Industries Served", value: "8", suffix: "", order: 2 },
    { label: "Core Services", value: "8", suffix: "", order: 3 },
    { label: "Regional Coverage", value: "EA", suffix: "", order: 4 },
  ];
  for (const s of stats) {
    const existing = await prisma.statistic.findFirst({ where: { label: s.label } });
    if (!existing) await prisma.statistic.create({ data: s });
  }

  // --- Site settings (hero, contact, CTA copy) ---
  const settings: Record<string, string> = {
    hero_title: "Engineering Solutions Built for Performance, Safety & Reliability",
    hero_subtitle: "Ventron Mechanical Systems Ltd delivers engineering, procurement, project management, fire protection, oil & gas, and industrial solutions across Kenya and East Africa.",
    contact_email: "info@ventronltd.com",
    contact_phone: "+254 797 467 020",
    contact_address: "Nairobi, Kenya",
    cta_title: "Have an Engineering Challenge?",
    cta_text: "Talk to our engineering team about your project requirements.",
  };
  for (const [key, value] of Object.entries(settings)) {
    await prisma.siteSetting.upsert({ where: { key }, update: { value }, create: { key, value } });
  }
}
