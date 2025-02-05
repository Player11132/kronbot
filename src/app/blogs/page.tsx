'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/structural/Card';
import './styles.css';
import { getPosts, Post } from '@/lib/api/posts';
import Link from 'next/link';
import * as motion from 'motion/react-client';
import { delay } from 'motion';
import DiagonalBG from '@/components/visual/DiagonalBG';
import { AnimatePresence } from 'motion/react';

const _es = [0.39, 0.24, 0.1, 1];

const Blogs = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [butFilter, setFilter] = useState<string>('All');
  const [smallScreen, setSmallScreen] = useState(false);
  const [open, setOpen] = useState(false);
  var filter: string = 'All';

  const fetchPosts = async () => {
    const Posts = await getPosts(filter, false);
    setPosts(Posts);
  };

  const changeFilter = (newFilter: string) => {
    filter = newFilter;
    setFilter(newFilter);
    fetchPosts();
  };

  const updateWidth = () => {
    const newWidth = window.innerWidth.valueOf();

    setSmallScreen(newWidth > 786 ? true : false);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    updateWidth();
    fetchPosts();
  }, []);

  return (
    <main className='fade'>
      <motion.div
        className='dividerLine mt-[9rem]'
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.2,
          duration: 1,
          ease: _es
        }}
      />
      <motion.div
        className='pagetitle'
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.7,
          duration: 1,
          ease: _es
        }}
      >
        <h1 className='inline ' style={{ opacity: 0.4 }}>
          BLOGS
        </h1>
        <h1 className='inline '>BLOGS</h1>
        <h1 className='inline ' style={{ opacity: 0.4 }}>
          BLOGS
        </h1>
      </motion.div>
      <motion.div
        className='dividerLine mb-[2rem]'
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.2,
          duration: 1,
          ease: _es
        }}
      />
      {smallScreen ? (
        <motion.div
          className='filterBar'
          initial={{ scaleY: 0 }}
          animate={{ scaleX: 1, scaleY: 1 }}
          transition={{
            delay: 0,
            duration: 1.3,
            ease: _es
          }}
        >
          {['All', 'Announcments', 'Events', 'Technical', 'Other'].map(
            (filterOpt, index) => (
              <motion.button
                key={filterOpt}
                className={`filterBut`}
                onClick={() => changeFilter(filterOpt)}
                initial={{ opacity: 0, y: -200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + index * 0.1,
                  duration: 1,
                  y: {
                    type: 'spring',
                    duration: 0.2,
                    bounce: 0.6,
                    delay: index * 0.1
                  },
                  ease: _es
                }}
              >
                <motion.div
                  className='-z-6'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 1 + index * 0.1,
                    duration: 1,
                    ease: _es
                  }}
                >
                  {filterOpt === butFilter ? (
                    <motion.div
                      style={butBg}
                      layoutId='butBg'
                      id='butBg'
                    ></motion.div>
                  ) : null}
                </motion.div>
                <div className='z-10 w-[100%] text-center'>{filterOpt}</div>
              </motion.button>
            )
          )}
        </motion.div>
      ) : (
        <motion.div
          className={`filterBar ${open ? 'open' : ''}`}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{
            delay: 0,
            duration: 1.3,
            ease: _es
          }}
        >
          <motion.button
            className={`filterBut pb-[1rem]`}
            onClick={() => {
              setOpen(!open);
            }}
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 1,
              y: {
                type: 'spring',
                duration: 0.2,
                bounce: 0.6,
                delay: 0.1
              },
              ease: _es
            }}
          >
            Filter:{butFilter}{' '}
            <AnimatePresence>
              {open ? (
                <motion.i
                  initial={{ rotate: 180 }}
                  animate={{ rotate: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: _es
                  }}
                  className='fa-solid fa-triangle'
                ></motion.i>
              ) : (
                <motion.i
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 180 }}
                  transition={{
                    duration: 0.2,
                    ease: _es
                  }}
                  className='fa-solid fa-triangle'
                ></motion.i>
              )}
            </AnimatePresence>
          </motion.button>
          {['All', 'Announcments', 'Events', 'Technical', 'Other'].map(
            (filterOpt, index) => (
              <motion.button
                key={filterOpt}
                className={`filterBut`}
                onClick={() => {
                  changeFilter(filterOpt);
                }}
                initial={{ opacity: 0, y: -200 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + index * 0.1,
                  duration: 1,
                  y: {
                    type: 'spring',
                    duration: 0.2,
                    bounce: 0.6,
                    delay: index * 0.1
                  },
                  ease: _es
                }}
              >
                <motion.div
                  className='-z-6'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 1 + index * 0.1,
                    duration: 1,
                    ease: _es
                  }}
                >
                  {filterOpt === butFilter ? (
                    <motion.div
                      style={butBgs}
                      layoutId='butBgs'
                      id='butBgs'
                    ></motion.div>
                  ) : null}
                </motion.div>
                <div className='z-10 w-[100%] text-center'>{filterOpt}</div>
              </motion.button>
            )
          )}
        </motion.div>
      )}

      <div className='posts'>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              href={{
                pathname: '/view',
                query: { id: post.id }
              }}
              key={post.id}
              className='flex card'
            >
              <Card
                title={post.title}
                image={post.thumbnailURL}
                date={post.date}
                category={post.cathegory}
              />
            </Link>
          ))
        ) : (
          <div>
            <h1>Nothing but lost bits and bolts.</h1>
          </div>
        )}
      </div>
    </main>
  );
};

const butBg: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  top: -16,
  height: '120%',
  width: '100%',
  background: '#9b3943'
};

const butBgs: React.CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100%',
  width: '100%',
  background: '#9b3943'
};

export default Blogs;
