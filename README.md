# Personal Web Page Project

This project is a personal website with a blog and self-presentation, built to learn the full web stack.

## Stack
- **Front-end:** Next.js (React, deployed to Vercel)
- **Back-end:** FastAPI (Python, deployed to Hetzner)
- **Blog Content:** Markdown files
- **Local Dev:** Docker Compose

## Structure
- `backend/` — FastAPI app (Python)
- `frontend/` — Next.js app (JavaScript/TypeScript)
- `blog/` — Markdown files for blog posts

## Development
- Run everything locally with Docker Compose
- Deploy front-end to Vercel, back-end to Hetzner

---

## **Recommended Blog Markdown Structure**

- Each blog post is a separate `.md` file in the `blog/` directory.
- Use [YAML front matter](https://jekyllrb.com/docs/front-matter/) at the top of each file for metadata (title, date, slug, etc.).
- The rest of the file is your Markdown content.

### **Example Directory Structure**
```
<code_block_to_apply_changes_from>
blog/
  my-first-post.md
  another-note.md
  2024-06-10-python-tips.md
```

### **Example Blog Post File: `my-first-post.md`**
```markdown
---
title: "My First Post"
date: "2024-06-10"
slug: "my-first-post"
summary: "A short summary of my first post."
tags: ["intro", "personal"]
---

# My First Post

Welcome to my blog! This is my first post.

Here’s some **Markdown** content.
```

---

## **Why This Structure?**
- **Easy to parse:** Both FastAPI and Next.js can read YAML front matter for metadata.
- **Flexible:** Add more fields (e.g., tags, summary) as needed.
- **Portable:** Works with many static site generators if you ever migrate.

---

## **1. LaTeX Math in Markdown**

- **Inline math:** Use single dollar signs:  
  Example:  
  ```markdown
  This is an inline formula: $E=mc^2$.
  ```
- **Block math:** Use double dollar signs:  
  Example:  
  ```markdown
  $$
  \\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
  $$
  ```

- **Rendering:**  
  - On the front-end, you’ll use a library like [KaTeX](https://katex.org/) or [MathJax](https://www.mathjax.org/) to render the LaTeX formulas in the browser.
  - Both Next.js and FastAPI can serve the raw Markdown; rendering happens in the front-end.

---

## **2. Images in Markdown**

- Use standard Markdown image syntax:  
  ```markdown
  ![Alt text](relative/path/to/image.png)
  ```
- Place images in a subfolder, e.g., `blog/images/` or `public/images/` (for Next.js).
- Reference images with a relative path from the Markdown file.

---

## **3. Example Post with Math and Images**

```markdown
<code_block_to_apply_changes_from>
---
title: "Math and Images Example"
date: "2024-06-11"
slug: "math-images"
summary: "A post demonstrating LaTeX and images in Markdown."
tags: ["math", "images", "demo"]
---

# Math and Images Example

This is an inline formula: $E=mc^2$.

Here’s a block formula:

$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$

And here’s an image:

![My Diagram](http://localhost:8000/static/diagram.png)
```

---

## **4. Next Steps**

- I’ll create a sample post in `blog/` with LaTeX and an image reference.
- I’ll also create an `images/` folder inside `blog/` and add a placeholder image.

**Would you like a specific image (e.g., a diagram or logo), or should I use a placeholder for now?**
