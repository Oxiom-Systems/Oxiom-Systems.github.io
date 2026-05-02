# Oxiom Systems TraceWeaver Site

Static website scaffold for hosting TraceWeaver as an Oxiom Systems product.

## Local preview

Open `index.html` directly in a browser, or serve the folder with any static
server:

```sh
python3 -m http.server 4173
```

## Hosting notes

The private source repo is intended to live at
`Oxiom-Systems/OxiomSystems-website`.

The public GitHub Pages release repo is
`Oxiom-Systems/Oxiom-Systems.github.io`.

The site has no build step. To publish the current static files to the public
Pages repo, run:

```sh
./scripts/publish-pages.sh
```

This copies only the static release files into the public Pages repo.

Current content includes:

- TraceWeaver product introduction.
- Arcweaver benchmark framing.
- Interactive Arcweaver-Vibe vs Arcweaver-TraceWeaver comparison lab with a
  woven power/current visual direction.
- Placeholder section for the future TraceWeaver paper.
