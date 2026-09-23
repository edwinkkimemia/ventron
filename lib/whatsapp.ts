// Page-specific prefilled WhatsApp messages. Pure helpers — safe for
// both server and client components.

const NUMBER = "254797467020";

function link(msg: string) {
  return `https://wa.me/${NUMBER}?text=${encodeURIComponent(msg)}`;
}

export const whatsappDefault = link(
  "Hello Ventron Mechanical Systems Ltd, I'd like to discuss a project."
);

const RULES: [string, string][] = [
  ["/services/fire-protection", "Hello Ventron, I'd like to discuss a fire protection / firewater project (demand assessment, pumps, hydrants)."],
  ["/services/oil-gas", "Hello Ventron, I'd like to discuss an oil & gas / LPG facility project."],
  ["/services/mechanical", "Hello Ventron, I'd like to discuss a mechanical engineering scope."],
  ["/services/process-piping", "Hello Ventron, I'd like to discuss a process / piping engineering scope."],
  ["/services/engineering-consultancy", "Hello Ventron, I'd like to discuss an engineering study / audit."],
  ["/services/procurement", "Hello Ventron, I'd like to enquire about equipment procurement (pumps, valves, fire equipment)."],
  ["/services/project-management", "Hello Ventron, I'd like to discuss project management / site supervision support."],
  ["/services/qa-qc", "Hello Ventron, I'd like to discuss QA/QC / inspection services."],
  ["/services", "Hello Ventron, I'd like to discuss an engineering service."],
  ["/equipment", "Hello Ventron, I'd like to enquire about equipment (please share your BOQ/datasheet guidance)."],
  ["/projects/", "Hello Ventron, I saw a project on your website and I'd like to discuss something similar."],
  ["/projects", "Hello Ventron, I'd like to discuss a project similar to your portfolio work."],
  ["/insights/", "Hello Ventron, I read your article and I'd like to discuss applying it to our site."],
  ["/quote", "Hello Ventron, I'm requesting a quote — here are my project details: "],
  ["/contact", "Hello Ventron, I'd like to get in touch about a project."],
  ["/careers", "Hello Ventron, I'd like to enquire about career opportunities."],
];

export function whatsappFor(pathname: string): string {
  for (const [prefix, msg] of RULES) {
    if (pathname === prefix || pathname.startsWith(prefix + "/") || (prefix.endsWith("/") && pathname.startsWith(prefix))) {
      return link(msg);
    }
  }
  // exact-prefix fallback (e.g. "/projects" already covered; keep default otherwise)
  for (const [prefix, msg] of RULES) {
    if (pathname.startsWith(prefix)) return link(msg);
  }
  return whatsappDefault;
}
