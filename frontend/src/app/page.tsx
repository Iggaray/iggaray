'use client';

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';

type Profile = {
  name?: string;
  title?: string;
  summary?: string;
  content: string;
};

type Post = {
  title: string;
  date: string;
  slug: string;
  summary?: string;
  tags?: string[];
};

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch profile
    fetch('/api/profile')
      .then((res) => res.json())
      .then((profileData) => {
        setProfile(profileData);
      })
      .catch(() => {
        // Handle error silently
      });

    // Fetch blog posts
    fetch('/api/posts')
      .then((res) => res.json())
      .then((postsData) => {
        setPosts(postsData);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div></div>;

  if (!profile) return <div>Profile not found.</div>;

  return (
    <main style={{ 
      maxWidth: 700, 
      margin: '2rem auto', 
      padding: '2rem', 
      background: '#fff', 
      borderRadius: 12, 
      boxShadow: '0 2px 16px rgba(0,0,0,0.07)' 
    }}>
      {/* Profile Section */}
      <h1 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '0.5rem', 
        fontWeight: 'bold', 
        color: '#181818' 
      }}>
        {profile.name}
      </h1>
      <div style={{ 
        color: '#444', 
        marginBottom: '1.5rem', 
        fontSize: '1.2rem' 
      }}>
        {profile.title}
      </div>
      <div style={{ 
        color: '#222', 
        marginBottom: '2rem', 
        fontSize: '1.1rem',
        lineHeight: '1.6'
      }}>
        {profile.summary}
      </div>
      <div style={{ 
        color: '#222',
        marginBottom: '2rem',
        lineHeight: '1.7'
      }}>
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
        >
          {profile.content}
        </ReactMarkdown>
      </div>
      
      {/* Delimiter */}
      <div style={{
        borderTop: '2px solid #eee',
        margin: '3rem 0',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#fff',
          padding: '0 1rem',
          color: '#666',
          fontSize: '0.9rem',
          fontWeight: '500'
        }}>
          Recent Posts
        </div>
      </div>

      {/* Blog Posts Section */}
      <div>
        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '2rem',
          fontWeight: 'bold',
          color: '#181818'
        }}>
          Recent Posts
        </h2>
        <div style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {posts.map((post) => (
            <div key={post.slug} style={{
              marginBottom: '2.5rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid #eee'
            }}>
              <Link 
                href={`/blog/${post.slug}`} 
                style={{
                  textDecoration: 'none',
                  color: '#181818',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#0070f3';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#181818';
                }}
              >
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  margin: '0 0 0.3em 0'
                }}>
                  {post.title}
                </div>
              </Link>
              <div style={{
                color: '#222',
                marginBottom: '0.5em',
                lineHeight: '1.5'
              }}>
                {post.summary}
              </div>
              <div style={{
                color: '#444',
                fontSize: '0.95em'
              }}>
                <span>{post.date}</span>
                {post.tags && (
                  <span style={{ marginLeft: '1rem' }}>
                    {post.tags.map((tag) => (
                      <span key={tag} style={{
                        background: '#f0f0f0',
                        color: '#222',
                        borderRadius: '6px',
                        padding: '0.2em 0.7em',
                        marginRight: '0.5em',
                        fontSize: '0.9em'
                      }}>
                        #{tag}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
