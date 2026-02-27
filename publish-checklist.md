# Publish Checklist (Projects & Case Studies)

## 1) Content Update
- [ ] `data/projects.json` updated and valid JSON
- [ ] `case-study/<slug>.html` created/updated
- [ ] Project includes challenge/solution/outcome with measurable impact

## 2) Link Integrity
- [ ] `caseStudyUrl` path is correct
- [ ] New case study linked from project card
- [ ] No placeholder links (`yourusername`, `#`)

## 3) SEO & Discoverability
- [ ] If major additions: update `sitemap.xml`
- [ ] Title and opening paragraph reflect business outcome
- [ ] Includes relevant stack keywords naturally

## 4) QA
- [ ] Mobile visual check
- [ ] Desktop visual check
- [ ] No obvious grammar or spelling issues
- [ ] External links use `rel="noopener noreferrer"` when `target="_blank"`

## 5) Git Flow
- [ ] `git add .`
- [ ] `git commit -m "feat: add/update project portfolio content"`
- [ ] `git push origin main`
- [ ] Verify GitHub Pages deployment

## Quick validation commands
```bash
node -e "JSON.parse(require('fs').readFileSync('data/projects.json')); console.log('projects json ok')"
grep -nE 'yourusername|href="#"' index.html projects.html skills.html || true
```
