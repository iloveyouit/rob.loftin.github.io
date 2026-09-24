async function loadSkills() {
  const response = await fetch('data/skills.json');
  if (!response.ok) throw new Error('Failed to load skills data');
  return response.json();
}

function renderSkills(skills, query = '') {
  const q = query.trim().toLowerCase();
  const filtered = skills.map(group => ({
    ...group,
    items: group.items.filter(item => !q || group.category.toLowerCase().includes(q) || item.toLowerCase().includes(q))
  })).filter(group => group.items.length);

  document.getElementById('skills-grid-page').innerHTML = filtered.length
    ? filtered.map(group => `<article class="skill-category"><h3>${group.category}</h3><ul class="skill-list">${group.items.map(item => `<li>${item}</li>`).join('')}</ul></article>`).join('')
    : '<p>No matching skills found.</p>';
}

async function initSkills() {
  const grid = document.getElementById('skills-grid-page');
  try {
    const skills = await loadSkills();
    renderSkills(skills);
    document.getElementById('skills-search').addEventListener('input', event => renderSkills(skills, event.target.value));
  } catch (error) {
    console.error(error);
    grid.innerHTML = '<p class="error-message">Skills are temporarily unavailable.</p>';
  }
}

document.addEventListener('DOMContentLoaded', initSkills);
