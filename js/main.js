async function loadJson(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    return response.json();
}

function renderSkills(skills) {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = skills.map(category => `
        <div class="skill-category">
            <h3>${category.category}</h3>
            <ul class="skill-list">
                ${category.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

function renderProjects(projects) {
    const projectGrid = document.getElementById('project-grid');
    if (!projectGrid) return;

    projectGrid.innerHTML = projects.map(project => `
        <div class="project-item">
            <h3><i class="${project.icon}"></i> ${project.title}</h3>
            <div class="project-detail">
                <h4>Challenge</h4>
                <p>${project.challenge}</p>
            </div>
            <div class="project-detail">
                <h4>Solution</h4>
                <p>${project.solution}</p>
            </div>
            <div class="project-detail">
                <h4>Outcome</h4>
                <p>${project.outcome}</p>
            </div>
            <div class="project-stack">
                ${project.stack.map(item => `<span class="stack-badge">${item}</span>`).join('')}
            </div>
            ${project.caseStudyUrl ? `<a class="case-link" href="${project.caseStudyUrl}">View Case Study</a>` : ''}
        </div>
    `).join('');
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetSelector = this.getAttribute('href');
            if (!targetSelector || targetSelector === '#') return;

            const target = document.querySelector(targetSelector);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function initSectionAnimations() {
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries, observerRef) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observerRef.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.5s ease-out';
        observer.observe(section);
    });
}

async function init() {
    try {
        const [skills, projects] = await Promise.all([
            loadJson('data/skills.json'),
            loadJson('data/projects.json')
        ]);

        renderSkills(skills);
        renderProjects(projects);
    } catch (error) {
        console.error('Failed to load dynamic content:', error);
    }

    initSmoothScrolling();
    initSectionAnimations();
}

document.addEventListener('DOMContentLoaded', init);
