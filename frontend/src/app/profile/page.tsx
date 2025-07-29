import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

type Profile = {
  name?: string;
  title?: string;
  summary?: string;
  content: string;
};

async function getProfile(): Promise<Profile | null> {
  try {
    const res = await fetch(`${backendUrl}/api/profile`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) return <div>Profile not found.</div>;

  return (
    <main style={{ maxWidth: 700, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 'bold', color: '#181818' }}>
        {profile.name}
      </h1>
      <div style={{ color: '#444', marginBottom: '1.5rem', fontSize: '1.2rem' }}>
        {profile.title}
      </div>
      <div style={{ color: '#222', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
        {profile.summary}
      </div>
      <div style={{ color: '#222' }}>
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
        >
          {profile.content}
        </ReactMarkdown>
      </div>
    </main>
  );
}
