# Nickherrig.com

Nick Herrig’s personal website: projects, writing, and an invitation to connect with founders and builders in St. Louis.

## Local development

The site uses **Hugo Extended 0.124.1**, matching the GitHub Actions build. Install that release from the [official Hugo releases](https://github.com/gohugoio/hugo/releases/tag/v0.124.1). Git LFS is required for the existing article images.

```sh
git clone https://github.com/NickHerrig/nickherrig.com.git
cd nickherrig.com
git lfs install
git lfs pull
hugo server --bind 127.0.0.1 --port 1313 --baseURL http://localhost:1313/
```

Open http://localhost:1313/. Add `-D -F` to include draft and future posts.

## Editing

- `content/posts/`: existing Markdown articles; their URLs are preserved.
- `data/projects.yaml`: the curated project collection, used on Home and Work.
- `content/about/index.md`: the personal introduction.
- `layouts/index.html`: the homepage and selected writing.
- `layouts/partials/connect.html`: the St. Louis collaboration invitation.
- `assets/css/site.css`: the custom editorial design and responsive layouts.
- `assets/js/site.js`: local article search and code-copy controls.
- `static/images/cities.svg`: Chicago, Des Moines, and St. Louis illustration.
- `static/images/split-the-g.svg`: featured project illustration.
- `static/images/split-the-g/`: article images and source attribution.
- `layouts/partials/speaking.html`: the homepage VIS panel feature.
- `content/posts/vis-2026.md`: panel notes and timestamped video links.
- `static/images/vis-2026/`: conference photo, original animated portrait, and reduced-motion still.

Templates are owned by this repository; no theme or JavaScript framework is required. The design uses system fonts and existing article assets. Search runs in the browser against Hugo’s generated JSON index. RSS subscriptions are available at `/posts/index.xml`. Contact links use LinkedIn and GitHub. No email list provider is connected.

## Build and deployment

```sh
hugo --gc --minify
```

Pull requests build the site without deploying. Pushes to `master` or `main` build and deploy to GitHub Pages. Keep `HUGO_VERSION` in `.github/workflows/hugo.yaml` aligned with the local version when upgrading.

Split the G leads the homepage and Work page, followed by Scribe, the cocktail classifier, and Mega Desk. The project illustrations are original vector or HTML artwork; the Split the G article includes images from the original Roboflow write-up.

## Social preview

`assets/images/social-preview.svg` is the editable 1200 × 630 sharing card. Its PNG is used for Open Graph and Twitter cards, with a content hash in the public URL so image changes get a new URL. `static/og-default.png` is kept in sync for older links.

To regenerate with ImageMagick (Georgia and Helvetica fonts required):

```sh
magick -background none assets/images/social-preview.svg -depth 8 -strip assets/images/social-preview.png
cp assets/images/social-preview.png static/og-default.png
```
