# Rob Loftin — Professional Portfolio

A focused, evidence-based portfolio for infrastructure, automation, and governed AI work. Built with HTML, CSS, and small data-driven JavaScript modules for GitHub Pages.

## Features

- Responsive design that works on all devices
- Distinctive responsive design with accessible navigation
- Print-friendly styling
- SEO-friendly HTML structure
- Data-driven skills and projects via JSON
- Project notes that distinguish delivered work, verified prototypes, and planned scope
- Easy to customize and maintain

## Setup

1. Fork this repository
2. Clone your forked repository to your local machine
3. Serve the repository root through a local HTTP server
4. Update profile content in `index.html`
5. Update projects and skills in the JSON files under `data/`
6. Commit and publish through GitHub Pages

## Customization

### Content
Update the core profile content in `index.html`:
- Name and title
- Contact information
- Professional summary
- Work experience
- Education

Update dynamic sections through JSON data files:
- `data/skills.json` → Skills categories and items
- `data/projects.json` → Featured projects (challenge/solution/outcome/stack/caseStudyUrl)

Additional pages:
- `projects.html` → Filterable project index
- `skills.html` → Searchable skills matrix
- `case-study/*.html` → Evidence-based project notes

Content operations docs:
- `project-template.md` → Standard structure for project case studies
- `project-intake.md` → Pre-publish intake requirements
- `publish-checklist.md` → Final QA + publish workflow

## License

This project is open source and available under the MIT License.
