async function loadProjects() {
  const response = await fetch('data/projects.json');
  if (!response.ok) throw new Error('Failed to load projects data');
  return response.json();
}

function projectCard(project) {
  return `
    <article class="project-item">
      <div class="project-kicker"><span>${project.category}</span><span>${project.year}</span></div>
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <div class="project-detail"><h4>Verified scope</h4><p>${project.evidence}</p></div>
      <div class="project-stack">${project.stack.map(item => `<span class="stack-badge">${item}</span>`).join('')}</div>
      <a class="case-link" href="${project.caseStudyUrl}">Read the project note <span aria-hidden="true">&nbsp;→</span></a>
    </article>`;
}

function renderProjects(projects, filter = 'All') {
  const visible = filter === 'All' ? projects : projects.filter(project => project.category === filter || project.stack.includes(filter));
  document.getElementById('project-grid').innerHTML = visible.map(projectCard).join('');
}

async function initProjects() {
  const grid = document.getElementById('project-grid');
  const bar = document.getElementById('project-filters');
  try {
    const projects = await loadProjects();
    const filters = ['All', ...new Set(projects.map(project => project.category))];
    bar.innerHTML = filters.map((filter, index) => `<button class="filter-btn${index === 0 ? ' active' : ''}" type="button" data-filter="${filter}" aria-pressed="${index === 0}">${filter}</button>`).join('');
    renderProjects(projects);
    bar.addEventListener('click', event => {
      const button = event.target.closest('button[data-filter]');
      if (!button) return;
      bar.querySelectorAll('button').forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      renderProjects(projects, button.dataset.filter);
    });
  } catch (error) {
    console.error(error);
    grid.innerHTML = '<p class="error-message">Project details are temporarily unavailable.</p>';
  }
}

document.addEventListener('DOMContentLoaded', initProjects);
