if (matchMedia('(max-width: 760px)').matches) {
  const toc = document.querySelector('.article-sidebar details');
  if (toc) toc.open = false;
}
// Search is local: no query or visitor data is sent to another service.
const searchInput = document.querySelector('#search-input');
if (searchInput) {
  const status = document.querySelector('#search-status');
  const results = document.querySelector('#search-results');
  let index;
  let request;
  async function search() {
    const query = searchInput.value.trim().toLowerCase();
    results.replaceChildren();
    if (!query) { status.textContent = 'Start typing to explore the archive.'; return; }
    status.textContent = 'Searching…';
    try {
      if (!index) {
        if (!request) request = fetch(searchInput.dataset.index).then(response => {
          if (!response.ok) throw new Error('Search unavailable');
          return response.json();
        }).catch(error => { request = undefined; throw error; });
        index = await request;
      }
      if (query !== searchInput.value.trim().toLowerCase()) return;
      const words = query.split(/\s+/);
      const matches = index.map(page => {
        const title = page.title.toLowerCase();
        const tags = (page.tags || []).join(' ').toLowerCase();
        const text = `${title} ${tags} ${page.content}`.toLowerCase();
        return { page, score: words.every(word => text.includes(word)) ? 1 + (title.includes(query) ? 10 : 0) + (tags.includes(query) ? 4 : 0) : 0 };
      }).filter(item => item.score).sort((a, b) => b.score - a.score);
      results.replaceChildren();
      status.textContent = matches.length ? `${matches.length} ${matches.length === 1 ? 'article' : 'articles'} found.` : 'No articles found. Try a different word or topic.';
      for (const {page} of matches) {
        const article = document.createElement('article'); article.className = 'search-result';
        const heading = document.createElement('h2');
        const link = document.createElement('a'); link.href = page.url; link.textContent = page.title;
        const summary = document.createElement('p'); summary.textContent = page.summary;
        heading.append(link); article.append(heading, summary); results.append(article);
      }
    } catch {
      if (query !== searchInput.value.trim().toLowerCase()) return;
      status.textContent = 'Search couldn’t load. Please try again or browse the Writing page.';
    }
  }
  searchInput.addEventListener('input', search);
}
for (const pre of document.querySelectorAll('.prose pre')) {
  const button = document.createElement('button'); button.type = 'button'; button.className = 'copy-button'; button.textContent = 'Copy code';
  button.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(pre.textContent); button.textContent = 'Copied'; }
    catch { button.textContent = 'Select code to copy'; }
    setTimeout(() => { button.textContent = 'Copy code'; }, 2200);
  });
  pre.before(button);
}

// Show the original conference GIF, with a still image for reduced motion.
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
for (const button of document.querySelectorAll('[data-portrait]')) {
  const portrait = button.querySelector('img');
  const still = portrait.getAttribute('src');
  function setPlaying(playing) {
    portrait.src = playing ? portrait.dataset.animated : still;
    button.setAttribute('aria-pressed', String(playing));
    button.setAttribute('aria-label', playing ? 'Pause portrait animation' : 'Play portrait animation');
  }
  setPlaying(!reducedMotion.matches);
  button.addEventListener('click', () => setPlaying(button.getAttribute('aria-pressed') !== 'true'));
  reducedMotion.addEventListener('change', event => { if (event.matches) setPlaying(false); });
}

// Keep the video poster local; load the YouTube player when someone chooses to watch.
for (const link of document.querySelectorAll('[data-load-video]')) {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const player = link.closest('[data-video-id]');
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${player.dataset.videoId}?autoplay=1`;
    frame.title = player.dataset.videoTitle;
    frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    player.replaceChildren(frame);
    frame.focus();
  });
}
