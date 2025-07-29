'use client';

import React, { useEffect, useState } from 'react';
import styles from './BlogList.module.css';
import Link from 'next/link';

type Post = {
  title: string;
  date: string;
  slug: string;
  summary?: string;
  tags?: string[];
};

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div></div>;

  return (
    <main className={styles.container}>
      {/* Home Button */}
      <div style={{
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #eee',
        textAlign: 'right',
        marginRight: '1rem'
      }}>
        <Link 
          href="/" 
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
          ← Home
        </Link>
      </div>

      <h1 className={styles.title}>All posts</h1>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post.slug} className={styles.postItem}>
            <Link href={`/blog/${post.slug}`} className={styles.postLink}>
              <div className={styles.postTitle}>{post.title}</div>
            </Link>
            <div className={styles.postSummary}>{post.summary}</div>
            <div className={styles.postMeta}>
              <span>{post.date}</span>
              {post.tags && (
                <span className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>#{tag}</span>
                  ))}
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}