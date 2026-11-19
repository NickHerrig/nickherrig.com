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
