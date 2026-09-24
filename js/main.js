async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return response.json();
}

function projectCard(project) {
  const stack = project.stack.map(item => `<span class="stack-badge">${item}</span>`).join('');
  return `
    <article class="project-item">
      <div class="project-kicker"><span>${project.category}</span><span>${project.year}</span></div>
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <div class="project-detail"><h4>Verified scope</h4><p>${project.evidence}</p></div>
      <div class="project-stack">${stack}</div>
      <a class="case-link" href="${project.caseStudyUrl}">Read the project note <span aria-hidden="true">&nbsp;→</span></a>
    </article>`;
}

function skillCard(group) {
  return `
    <article class="skill-category">
      <h3>${group.category}</h3>
      <ul class="skill-list">${group.items.map(item => `<li>${item}</li>`).join('')}</ul>
    </article>`;
}

async function init() {
  const projectGrid = document.getElementById('project-grid');
  const skillsGrid = document.getElementById('skills-grid');
  try {
    const [projects, skills] = await Promise.all([loadJson('data/projects.json'), loadJson('data/skills.json')]);
    projectGrid.innerHTML = projects.filter(project => project.featured).map(projectCard).join('');
    skillsGrid.innerHTML = skills.slice(0, 3).map(skillCard).join('');
  } catch (error) {
    console.error(error);
    if (projectGrid) projectGrid.innerHTML = '<p class="error-message">Project details are temporarily unavailable.</p>';
    if (skillsGrid) skillsGrid.innerHTML = '<p class="error-message">Skills are temporarily unavailable.</p>';
  }
}

document.addEventListener('DOMContentLoaded', init);
