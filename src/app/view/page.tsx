import { getPostById, Post } from '@/lib/api/posts';
import { getSession } from '@/lib/api/authentication';
import React from 'react';
import 'md-editor-rt/lib/style.css';
import './styles.css';
import MdViewer from '@/components/functional/MdViewer';
import ScrollPercentViewer from '@/components/visual/ScrollPercentViewer';

export default async function page({
  searchParams
}: {
  searchParams: {
    id: string;
  };
}) {
  const post = await getPostById(parseInt(await searchParams.id));
  if (post.published == false)
    if ((await getSession()) != '200') {
      return (
        <div className='container mt-[10rem]'>
          <h1>You're not authorized to view this post</h1>
        </div>
      );
    }

  return (
    <div className='container'>
      <ScrollPercentViewer />
      <div className='top'>
        <div
          className='image'
          style={{
            backgroundImage: `url(${post.thumbnailURL})`
          }}
        >
          <div className='filter'>
            <h1 className='title pageTitle'>{post.title}</h1>
            <h2 className='stitle'>{post.date}</h2>
            <h2 className='stitle'>{post.cathegory}</h2>
          </div>
        </div>
      </div>
      <div className='content'>
        <MdViewer body={post.body} />
      </div>
    </div>
  );
}
