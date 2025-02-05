'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Card from '../structural/Card';
import { getPosts, Post, createEmptyPost } from '@/lib/api/posts';

import style from './Panel.module.css';

const BlogPanel = () => {
  const [posts, setPosts] = useState<Post[]>();
  const router = useRouter();

  async function refresh() {
    setPosts(await getPosts('All', true));
  }

  async function newPost() {
    const newPost = await createEmptyPost('New Post');
    router.push(`/admin/edit?id=${newPost}`);
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className={style.cont}>
      <h1 className={style.title}>Blogs</h1>
      <div className={style.area}>
        <div className={style.zone}>
          {posts?.map((post) => (
            <Link
              href={{
                pathname: '/admin/edit',
                query: { id: post.id }
              }}
              key={post.id}
            >
              <Card
                title={post.title}
                image={post.thumbnailURL}
                date={post.date}
                category={post.cathegory}
              />
            </Link>
          ))}
        </div>
        <div className={style.buttons}>
          <button className='bg-blue-600' onClick={newPost}>
            Add post
          </button>
          <button className='bg-[#2b2728]' onClick={refresh}>
            Refesh
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPanel;
