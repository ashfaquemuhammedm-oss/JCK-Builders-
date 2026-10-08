import { projectData } from './data.js';
export function mountProjects(target) {
  if (!target) return;
  let category = 'all'; let active = 0;
  const render = () => {
    const items = projectData.filter(p => category === 'all' || p.category === category);
    target.innerHTML = `<div class="project-filter" role="toolbar" aria-label="Filter projects">${['all','residential','commercial','interiors','exteriors','infrastructure','real-estate'].map(k => `<button class="${k === category ? 'is-active' : ''}" data-filter="${k}">${k === 'all' ? 'All' : k.replace('-', ' ')}</button>`).join('')}</div><div class="project-grid">${items.map((p, i) => `<button class="project-item project-item--${i + 1}" data-project="${projectData.indexOf(p)}"><img src="${p.image}" alt="${p.alt}" loading="lazy"><span class="project-caption"><em>${p.type}</em><strong>${p.title}</strong></span></button>`).join('')}</div><dialog class="lightbox" aria-label="Project image viewer"><button class="lightbox-close" aria-label="Close image viewer">×</button><button class="lightbox-prev" aria-label="Previous image">←</button><figure><img src="" alt=""><figcaption></figcaption></figure><button class="lightbox-next" aria-label="Next image">→</button></dialog>`;
    bind();
  };
  function bind() {
    target.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => { category = b.dataset.filter; render(); });
    const dialog = target.querySelector('dialog'); const updateLightbox = () => { const p = projectData[active]; dialog.querySelector('img').src = p.image; dialog.querySelector('img').alt = p.alt; dialog.querySelector('figcaption').textContent = `${p.type} — ${p.title}`; };
    target.querySelectorAll('[data-project]').forEach(b => b.onclick = () => { active = Number(b.dataset.project); updateLightbox(); dialog.showModal(); });
    dialog.querySelector('.lightbox-close').onclick = () => dialog.close(); dialog.querySelector('.lightbox-prev').onclick = () => { active = (active - 1 + projectData.length) % projectData.length; updateLightbox(); }; dialog.querySelector('.lightbox-next').onclick = () => { active = (active + 1) % projectData.length; updateLightbox(); };
    dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  }
  render();
}
