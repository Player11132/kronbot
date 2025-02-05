'use client';

import React, { useState, useEffect } from 'react';
import { MdEditor } from 'md-editor-rt';
import { getSession } from '@/lib/api/authentication';
import 'md-editor-rt/lib/style.css';
import { getPostById, editPost, deletePost, Post } from '@/lib/api/posts';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import './styles.css';
import PopUp from '@/components/admin/PopUpConf';
import HomeBut from '@/components/admin/HomeBut';

const edit = () => {
  const [text, setText] = useState('# Hello Editor');
  const [title, setTitle] = useState('');
  const [cathegory, setCathegory] = useState('');
  const [image, setImage] = useState('');
  const [published, setPublishing] = useState(false);
  const [deleteDialog, setDelDialog] = useState(false);
  const router = useRouter();

  var postId = useSearchParams().get('id');
  const [post, setPost] = useState<Post>();

  async function fetchPost(id: string) {
    var data = await getPostById(parseInt(id));
    setPost(data);
    setText(data.body);
    setTitle(data.title);
    setImage(data.thumbnailURL);
    setCathegory(data.cathegory);
    setPublishing(data.published!);
  }

  useEffect(() => {
    getSession();
  }, []);

  async function save() {
    if (post) {
      const editedPost = {
        id: post.id,
        title: title,
        cathegory: cathegory as
          | 'Other'
          | 'Announcments'
          | 'Events'
          | 'Technical',
        thumbnailURL: image,
        body: text,
        published: published,
        date: post.date
      };
      await editPost(editedPost);
    }
  }

  useEffect(() => {
    if (postId) fetchPost(postId);
  }, []);

  if (post! === undefined)
    return (
      <div className='cont'>
        <h1>Loading editor...</h1>
      </div>
    );

  return (
    <main className='cont'>
      <HomeBut />
      <div className='Area fade'>
        <h1>Title</h1>
        <input
          type='text'
          defaultValue={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <h1>Thumbnail</h1>
        <input
          type='text'
          defaultValue={image}
          onChange={(e) => {
            setImage(e.target.value);
          }}
        ></input>
        <img src={image} className='img preview'></img>
      </div>
      <MdEditor
        theme='dark'
        language='en-US'
        className='h-[100%]'
        value={text}
        onChange={setText}
        codeTheme='github'
        onSave={save}
        style={{ fontSize: '4rem' }}
      />
      <div className='Area flex-col flex'>
        <h1>Cathegory:</h1>
        <select
          name='catSelect'
          defaultValue={cathegory}
          onChange={(e) => {
            setCathegory(e.target.value);
          }}
        >
          <option value='Announcments'>Anouncments</option>
          <option value='Events'>Events</option>
          <option value='Technical'>Tehnical</option>
          <option value='Other'>Other</option>
        </select>
        <div className='flex flex-row flex-nowrap gap-[1rem] justify-evenly align-middle items-center m-[1rem]'>
          <h2 className='text-[2rem] font-bold'>Published</h2>
          <label className='switch'>
            <input
              defaultChecked={published}
              type='checkbox'
              onChange={(b) => {
                setPublishing(b.target.checked);
              }}
            />
            <span className='slider round'></span>
          </label>
        </div>
        <button
          className='bg-red-600 mt-[4rem]'
          onClick={() => {
            setDelDialog(!deleteDialog);
          }}
        >
          Delete
        </button>
        <button
          className='bg-blue-600'
          onClick={() => {
            save();
          }}
        >
          Save
        </button>
        <button
          className='bg-[#2b2728] mt-[2rem]'
          onClick={() => {
            router.push('/admin/dashboard');
          }}
        >
          Exit
        </button>
      </div>
      <PopUp
        visible={deleteDialog}
        text='Are you sure you want to delete this post?'
        labelYes='Delete post'
        actionYes={() => {
          deletePost(post.id), router.push('/admin/dashboard');
        }}
        labelNo='Cancel'
        actionNo={() => {
          setDelDialog(!deleteDialog);
        }}
      />
    </main>
  );
};

export default edit;
