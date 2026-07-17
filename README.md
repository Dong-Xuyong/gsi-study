# GSI Study — Mind Maps

Mobile-first study site for **Gestão de Sistemas de Informação**. Browse the 12 course topic mind maps, tap nodes for exam-oriented concept notes, and search across frameworks (McFarlan, COBIT, ITIL, IT-CMF, PRAXIS, and more).

**Live:** https://dong-xuyong.github.io/gsi-study/

## Develop

```bash
npm install
npm run dev
npm run build
```

Re-parse Obsidian mind maps (optional):

```bash
# OBSIDIAN_GSI_MINDMAP_DIR defaults to Desktop/Obsidian/mindmap/GSI
node scripts/parse-mindmaps.mjs
```

## Stack

- Vite + React + TypeScript
- React Flow + Dagre for interactive hierarchical mind maps
- GitHub Pages via Actions
