import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory =
  process.env.OBSIDIAN_GSI_MINDMAP_DIR ??
  "C:\\Users\\Dong\\Desktop\\Obsidian\\mindmap\\GSI";
const outputDirectory = path.join(projectRoot, "src", "data", "trees");

const topics = [
  { id: "introduction", source: "1.Introduction mindmap.md", output: "introduction.json" },
  { id: "strategy", source: "2.Strategy mindmap.md", output: "strategy.json" },
  { id: "process", source: "3.Process mindmap.md", output: "process.json" },
  { id: "alignment", source: "4.Alignment mindmap.md", output: "alignment.json" },
  { id: "innovation", source: "5.Innovation mindmap.md", output: "innovation.json" },
  { id: "impact", source: "6.Impact mindmap.md", output: "impact.json" },
  { id: "portfolio", source: "7.Portfolio mindmap.md", output: "portfolio.json" },
  { id: "investments", source: "8.Investement mindmap.md", output: "investments.json" },
  { id: "praxis", source: "9.PRAXIS mindmap.md", output: "praxis.json" },
  { id: "services", source: "10.Services mindmap.md", output: "services.json" },
  { id: "governance", source: "11.Governance mindmap.md", output: "governance.json" },
  { id: "natives", source: "12. Natives mindmap.md", output: "natives.json" },
];

function removeFrontmatter(markdown) {
  return markdown.replace(/^\uFEFF?---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/, "");
}

function cleanLabel(value) {
  return value
    .replace(/^\s*\d+\|\s*/, "")
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/[\u200D\uFE0F\uFFFD]/g, "")
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, "$1")
    .replace(/(?<!_)_([^_]+)_(?!_)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(label) {
  return label
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "node";
}

function parseMindmap(markdown, topicId) {
  const lines = removeFrontmatter(markdown).split(/\r?\n/);
  const ids = new Map();
  const createNode = (label) => {
    const slug = slugify(label);
    const occurrence = (ids.get(slug) ?? 0) + 1;
    ids.set(slug, occurrence);
    return { id: `${topicId}-${slug}${occurrence === 1 ? "" : `-${occurrence}`}`, label };
  };

  let root;
  let activeHeadingLevel = 0;
  const stack = [];
  let inTable = false;

  const addNode = (label, level) => {
    const node = createNode(label);
    while (stack.length && stack.at(-1).level >= level) stack.pop();
    const parent = stack.at(-1)?.node ?? root;
    if (!parent) {
      root = node;
      stack.push({ level: 0, node });
      return node;
    }
    parent.children ??= [];
    parent.children.push(node);
    stack.push({ level, node });
    return node;
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/^\s*\d+\|\s*/, "");
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (/^\|/.test(trimmed) || /^\|?[-:\s|]+\|[-:\s|]*$/.test(trimmed)) {
      inTable = true;
      continue;
    }
    if (inTable) {
      inTable = false;
    }
    if (/^---+$/.test(trimmed)) continue;

    const heading = /^(#{1,6})\s+(.+?)\s*#*$/.exec(trimmed);
    if (heading) {
      const label = cleanLabel(heading[2]);
      if (!label) continue;
      if (!root) {
        root = createNode(label);
        stack.length = 0;
        stack.push({ level: 0, node: root });
        activeHeadingLevel = 0;
      } else {
        const level = heading[1].length;
        addNode(label, level);
        activeHeadingLevel = level;
      }
      continue;
    }

    const listItem = /^(\s*)(?:[-+*]|\d+[.)])\s+(.+)$/.exec(line);
    if (!listItem) continue;
    const label = cleanLabel(listItem[2]);
    if (!label) continue;
    const indentation = listItem[1].replace(/\t/g, "  ").length;
    const level = activeHeadingLevel + Math.floor(indentation / 2) + 1;
    addNode(label, level);
  }

  if (!root) {
    throw new Error(`No heading or list root found for topic "${topicId}".`);
  }
  return root;
}

await mkdir(outputDirectory, { recursive: true });

for (const topic of topics) {
  const markdown = await readFile(path.join(sourceDirectory, topic.source), "utf8");
  const tree = parseMindmap(markdown, topic.id);
  await writeFile(
    path.join(outputDirectory, topic.output),
    `${JSON.stringify(tree, null, 2)}\n`,
    "utf8",
  );
  const countNodes = (node) =>
    1 + (node.children?.reduce((total, child) => total + countNodes(child), 0) ?? 0);
  console.log(`${topic.output}: ${countNodes(tree)} nodes`);
}
