'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'katex/dist/katex.min.css';
import styles from './BlogPost.module.css';
import Link from 'next/link';

type Post = {
  title: string;
  date: string;
  slug: string;
  summary?: string;
  tags?: string[];
  content: string;
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetch(`/api/posts/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) {
    return (
      <main className={styles.container}>
        <div style={{
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid #eee',
          textAlign: 'right',
          marginRight: '1rem'
        }}>
          <div style={{
            display: 'inline-block',
            width: '100px',
            height: '32px',
            background: '#f0f0f0',
            borderRadius: '6px',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}></div>
        </div>
        <div style={{
          height: '3rem',
          background: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '1rem',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}></div>
        <div style={{
          height: '1.5rem',
          background: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '2rem',
          width: '40%',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}></div>
        <div style={{
          height: '1rem',
          background: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '0.5rem',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}></div>
        <div style={{
          height: '1rem',
          background: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '0.5rem',
          width: '90%',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}></div>
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </main>
    );
  }

  if (!post) return <div>Post not found.</div>;

  const BackButton = () => (
    <Link 
      href="/blog" 
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        color: '#666',
        textDecoration: 'none',
        borderRadius: '6px',
        fontSize: '0.9rem',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        border: '1px solid #ddd'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f5f5f5';
        e.currentTarget.style.color = '#333';
        e.currentTarget.style.borderColor = '#ccc';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = '#666';
        e.currentTarget.style.borderColor = '#ddd';
      }}
    >
      ← Back to Blog
    </Link>
  );

  return (
    <main className={styles.container}>
      {/* Back to Blog Button - Top */}
      <div style={{
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #eee',
        textAlign: 'right',
        marginRight: '1rem'
      }}>
        <BackButton />
      </div>

      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.meta}>
        <span>{post.date}</span>
        {post.tags && (
          <span className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>#{tag}</span>
            ))}
          </span>
        )}
      </div>
      <div className={styles.markdown}>
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Back to Blog Button - Bottom */}
      <div style={{
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid #eee',
        textAlign: 'center'
      }}>
        <BackButton />
      </div>
    </main>
  );
}