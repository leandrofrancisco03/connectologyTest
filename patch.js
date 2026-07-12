const fs = require('fs');
const file = 'src/pages/blog/[slug].astro';
let content = fs.readFileSync(file, 'utf8');
content = content.replace('const { entry } = Astro.props;', `import type { CollectionEntry } from 'astro:content';\n\ntype Props = { entry: CollectionEntry<'blog'> };\nconst { entry } = Astro.props as Props;`);
fs.writeFileSync(file, content);
