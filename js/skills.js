async function loadSkills() {
  const res = await fetch('data/skills.json');
  if (!res.ok) throw new Error('Failed to load skills data');
  return res.json();
}

function renderSkills(skills, query = '') {
  const grid = document.getElementById('skills-grid-page');
  if (!grid) return;

  const q = query.trim().toLowerCase();
  const filtered = skills
    .map(cat => ({
      ...cat,
      items: cat.items.filter(item =>
        !q || cat.category.toLowerCase().includes(q) || item.toLowerCase().includes(q)
      )
    }))
    .filter(cat => cat.items.length > 0 || !q);

  grid.innerHTML = filtered.map(cat => `
    <section class="skill-category">
      <h3>${cat.category}</h3>
      <ul class="skill-list">
        ${cat.items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </section>
  `).join('');
}

async function initSkillsPage() {
  try {
    const skills = await loadSkills();
    renderSkills(skills);

    const input = document.getElementById('skills-search');
    if (input) {
      input.addEventListener('input', () => renderSkills(skills, input.value));
    }
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', initSkillsPage);
