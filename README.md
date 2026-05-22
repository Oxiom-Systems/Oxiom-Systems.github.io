# Oxiom Systems Website

Static website for positioning Oxiom Systems as the main professional front
door for systems-engineering, TraceWeaver, workshops, agentic harnesses, and
solution-architecture work.

## Local Preview

Open `index.html` directly in a browser, or serve the folder with any static
server:

```sh
python3 -m http.server 4173
```

## Hosting Notes

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

## Domain Setup

The repository includes a `CNAME` file for `oxiomsystems.com`.

For GitHub Pages, configure the public Pages repository with `oxiomsystems.com`
as the custom domain, then point DNS at GitHub Pages:

- Apex/root `oxiomsystems.com`: four `A` records for GitHub Pages.
- `www.oxiomsystems.com`: one `CNAME` record pointing to
  `oxiom-systems.github.io`.

Required apex `A` values:

```text
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

After DNS resolves, enable **Enforce HTTPS** in the GitHub Pages settings.

## Current Content

- Oxiom Systems positioning as the main professional contact point.
- TraceWeaver as the flagship open-source framework and future enterprise/API
  product.
- Workshop positioning for collaborative coding-agent workflows.
- Agentic harnesses for practical AI orchestration.
- Solution architecture for real-world AI implementation.
