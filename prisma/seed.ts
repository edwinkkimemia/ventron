import { seedDatabase } from "../lib/seed-content";

async function main() {
  await seedDatabase();
  console.log("Seed complete.");
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
