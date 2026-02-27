async function loadProjects() {
  const res = await fetch('data/projects.json');
  if (!res.ok) throw new Error('Failed to load projects data');
  return res.json();
}

function projectCard(project) {
  const stack = project.stack.map(s => `<span class="stack-badge">${s}</span>`).join('');
  return `
    <article class="project-item">
      <h3><i class="${project.icon}"></i> ${project.title}</h3>
      <div class="project-detail"><h4>Challenge</h4><p>${project.challenge}</p></div>
      <div class="project-detail"><h4>Solution</h4><p>${project.solution}</p></div>
      <div class="project-detail"><h4>Outcome</h4><p>${project.outcome}</p></div>
      <div class="project-stack">${stack}</div>
      ${project.caseStudyUrl ? `<a class="case-link" href="${project.caseStudyUrl}">View Case Study</a>` : ''}
    </article>
  `;
}

function renderFilterButtons(projects) {
  const bar = document.getElementById('project-filters');
  if (!bar) return;

  const tags = [...new Set(projects.flatMap(p => p.stack))].sort();
  const buttons = ['All', ...tags].map(tag =>
    `<button class="filter-btn${tag === 'All' ? ' active' : ''}" data-filter="${tag}">${tag}</button>`
  ).join('');

  bar.innerHTML = buttons;
}

function bindFilters(projects) {
  const bar = document.getElementById('project-filters');
  const grid = document.getElementById('project-grid');
  if (!bar || !grid) return;

  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;

    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const visible = filter === 'All' ? projects : projects.filter(p => p.stack.includes(filter));
    grid.innerHTML = visible.map(projectCard).join('');
  });
}

async function initProjectsPage() {
  try {
    const projects = await loadProjects();
    const grid = document.getElementById('project-grid');
    if (!grid) return;

    renderFilterButtons(projects);
    grid.innerHTML = projects.map(projectCard).join('');
    bindFilters(projects);
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', initProjectsPage);
