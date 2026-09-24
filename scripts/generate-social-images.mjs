import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
const covers = [
['connectologyia', 'AUTOMATIZACIÓN E IA · PERÚ', 'Conecta herramientas.', 'Recupera tiempo.', '#67e8f9'],
['n8n', 'GUÍAS DE AUTOMATIZACIÓN', 'Flujos que conectan', 'tu operación.', '#67e8f9'],
['whatsapp', 'WHATSAPP API OFICIAL', 'Conversaciones', 'bien conectadas.', '#86efac'],
['agentes', 'AGENTES DE INTELIGENCIA ARTIFICIAL', 'Respuestas útiles.', 'Límites claros.', '#a5b4fc'],
['costos', 'PLANIFICACIÓN Y COSTOS', 'Mide el tiempo.', 'Evalúa el impacto.', '#fcd34d'],
['procesos', 'AUTOMATIZACIÓN PARA PYMES', 'Primero el proceso.', 'Después la IA.', '#7dd3fc'],
['web', 'WEB E INTEGRACIONES', 'De la consulta', 'a la oportunidad.', '#c4b5fd'],
];
await mkdir('public/og', { recursive: true });
for (const [id, category, line1, line2, color] of covers) {
 const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#111f32"/><stop offset="1" stop-color="#030712"/></linearGradient></defs><rect width="1200" height="630" fill="url(#bg)"/><g fill="none" stroke="${color}" opacity=".2"><path d="M820 0V180H1000V440H1200" stroke-width="2"/><path d="M950 0V110H1110V320H1200" stroke-width="2"/><circle cx="1000" cy="180" r="44"/><circle cx="1000" cy="440" r="44"/><circle cx="1110" cy="320" r="22"/></g><rect x="65" y="68" width="38" height="5" rx="2" fill="${color}"/><text x="65" y="125" font-family="Segoe UI,Arial,sans-serif" font-size="20" letter-spacing="3" fill="${color}">${category}</text><text x="65" y="285" font-family="Segoe UI,Arial,sans-serif" font-size="68" font-weight="700" letter-spacing="-2" fill="#f8fafc">${line1}</text><text x="65" y="374" font-family="Segoe UI,Arial,sans-serif" font-size="68" font-weight="700" letter-spacing="-2" fill="${color}">${line2}</text><line x1="65" x2="1135" y1="480" y2="480" stroke="#2b3c50"/><text x="65" y="551" font-family="Segoe UI,Arial,sans-serif" font-size="29" font-weight="600" fill="#e2e8f0">Connectology<tspan fill="${color}">IA</tspan></text><text x="910" y="548" font-family="Segoe UI,Arial,sans-serif" font-size="20" fill="#a4b1c6">Ideas que conectan ↗</text></svg>`;
 await writeFile(`public/og/${id}.png`, await sharp(Buffer.from(svg)).png().toBuffer());
}
console.log('Generated', covers.length, '1200×630 social cards.');
