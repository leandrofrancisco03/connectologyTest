import { readdir, readFile } from 'node:fs/promises';
import { basename, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

async function markdownFiles(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? markdownFiles(path) : path.endsWith('.md') ? [path] : [];
  }))).flat();
}

function splitMarkdown(source: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) throw new Error('El artículo no contiene frontmatter YAML.');
  const data = Object.fromEntries(match[1].split(/\r?\n/).filter(Boolean).map((line) => {
    const separator = line.indexOf(':');
    if (separator < 1) throw new Error(`Frontmatter no compatible: ${line}`);
    const key = line.slice(0, separator).trim();
    const raw = line.slice(separator + 1).trim();
    if (raw === 'true' || raw === 'false') return [key, raw === 'true'];
    if (raw.startsWith('"') || raw.startsWith('[')) return [key, JSON.parse(raw)];
    return [key, raw];
  }));
  return { data, body: source.slice(match[0].length) };
}

export function markdownDirectory(base: string) {
  return {
    name: 'connectology-markdown-directory',
    async load({ config, store, parseData, renderMarkdown, generateDigest, watcher }: any) {
      const projectRoot = fileURLToPath(config.root);
      const directory = resolve(projectRoot, base);

      const sync = async () => {
        store.clear();
        for (const file of await markdownFiles(directory)) {
          const source = await readFile(file, 'utf8');
          const { data: rawData, body } = splitMarkdown(source);
          const id = basename(file, extname(file));
          const data = await parseData({ id, data: rawData, filePath: file });
          store.set({
            id,
            data,
            body,
            filePath: relative(projectRoot, file).replaceAll('\\', '/'),
            digest: generateDigest(source),
            rendered: await renderMarkdown(body, { fileURL: pathToFileURL(file) }),
          });
        }
      };

      await sync();
      watcher?.add(directory);
      const reload = (file: string) => {
        if (file.endsWith('.md') && resolve(file).startsWith(directory)) void sync();
      };
      watcher?.on('add', reload);
      watcher?.on('change', reload);
      watcher?.on('unlink', reload);
    },
  };
}
