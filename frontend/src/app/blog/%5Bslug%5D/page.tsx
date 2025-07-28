import React from 'react';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

type Post = {
  title: string;
  date: string;
  slug: string;
  summary?: string;
  tags?: string[];
  content: string;
};

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${backendUrl}/api/posts/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  return (
    <main>
      <h1>{post.title}</h1>
      <p>
        <small>{post.date}</small>
        {post.tags && (
          <span style={{ marginLeft: 8 }}>
            {post.tags.map((tag) => (
              <span key={tag} style={{ marginRight: 8 }}>#{tag}</span>
            ))}
          </span>
        )}
      </p>
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
      >
        {post.content}
      </ReactMarkdown>
    </main>
  );
} 