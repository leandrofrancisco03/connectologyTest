const fs = require('fs');
const file = 'src/pages/blog/[slug].astro';
let content = fs.readFileSync(file, 'utf8');
content = content.replace('const { Content } = await entry.render();', `import { render } from 'astro:content';\nconst { Content } = await render(entry);`);
fs.writeFileSync(file, content);
