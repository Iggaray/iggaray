from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
import frontmatter
import markdown
from fastapi.responses import JSONResponse
from fastapi import HTTPException
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BLOG_DIR = os.path.join(os.path.dirname(__file__), 'blog')

# Mount the images directory for static serving
app.mount("/static", StaticFiles(directory=os.path.join(BLOG_DIR, "images")), name="static")

# Helper to get all post files (excluding profile.md)
def get_post_files():
    return [f for f in os.listdir(BLOG_DIR) if f.endswith('.md') and f != 'profile.md']

# Helper to parse a post file and return metadata/content
def parse_post(filename, with_content=False):
    path = os.path.join(BLOG_DIR, filename)
    with open(path, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)
    data = dict(post.metadata)
    if with_content:
        data['content'] = post.content
    return data

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/posts")
def list_posts():
    posts = []
    for fname in get_post_files():
        post = parse_post(fname, with_content=False)
        posts.append(post)
    return posts

@app.get("/api/posts/{slug}")
def get_post(slug: str):
    for fname in get_post_files():
        post = parse_post(fname, with_content=True)
        if post.get('slug') == slug:
            return post
    raise HTTPException(status_code=404, detail="Post not found")

@app.get("/api/profile")
def get_profile():
    path = os.path.join(BLOG_DIR, 'profile.md')
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="Profile not found")
    with open(path, 'r', encoding='utf-8') as f:
        profile = frontmatter.load(f)
    data = dict(profile.metadata)
    data['content'] = profile.content
    return data 