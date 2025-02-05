'use client';

import Waves from '@/components/visual/Waves';
import { useState, useEffect } from 'react';
import * as motion from 'motion/react-client';

const _es = [0.39, 0.24, 0.1, 1];

export default function Home() {
  const [smallScreen, setSmallScreen] = useState(false);

  const updateWidth = () => {
    const newWidth = window.innerWidth.valueOf();

    setSmallScreen(newWidth > 786 ? true : false);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    updateWidth();
  }, []);
  return (
    <main className='overflow-y-hidden'>
      <div className='w-full  h-[100vh] mx-auto bg-[#290510] overflow-hidden'>
        <Waves>
          <div
            className='splashCont fade'
            style={{
              display: `${smallScreen ? 'grid' : 'none'}`
            }}
          >
            <motion.div
              className='Kname'
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.2,
                duration: 1,
                ease: _es
              }}
            >
              <img src='/kronbot.svg' />
            </motion.div>
            <motion.div
              className='Klogo'
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3,
                duration: 1.1,
                ease: _es
              }}
            >
              <img src='/logo.svg' />
            </motion.div>
            <div className='Kmoto'>
              <div className='lineCont'>
                <motion.div
                  className='line'
                  initial={{ scale: 0, x: '-20vw' }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{
                    duration: 2.3,
                    delay: 0.1,
                    x: { type: 'spring', visualDuration: 2, bounce: 0.1 },
                    ease: _es
                  }}
                />
                <motion.div
                  className='dot'
                  initial={{ scale: 0, x: '-75vw' }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{
                    duration: 4,
                    scale: { type: 'spring', visualDuration: 2, bounce: 0.5 },
                    x: { type: 'spring', visualDuration: 2, bounce: 0.1 }
                  }}
                />
              </div>
              <motion.div
                className='moto'
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 1,
                  ease: _es
                }}
              >
                <h1>We don't predict the future,</h1>
                <h1> We invent it!</h1>
              </motion.div>
            </div>
          </div>
          <div
            className='splashContSmall'
            style={{
              display: `${smallScreen ? 'none' : 'flex'}`
            }}
          >
            <motion.div
              className='Klogo'
              initial={{ opacity: 0, x: 150 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.3,
                duration: 1.1,
                ease: _es
              }}
            >
              <img src='/logo.svg' />
            </motion.div>
            <div className='lineCont'>
              <motion.div
                className='line'
                initial={{ scale: 0, x: '-20vw' }}
                animate={{ scale: 1, x: 0 }}
                transition={{
                  duration: 2.3,
                  delay: 0.1,
                  x: { type: 'spring', visualDuration: 2, bounce: 0.1 },
                  ease: _es
                }}
              />
              <motion.div
                className='dot'
                initial={{ scale: 0, x: '-75vw' }}
                animate={{ scale: 1, x: 0 }}
                transition={{
                  duration: 4,
                  scale: { type: 'spring', visualDuration: 2, bounce: 0.5 },
                  x: { type: 'spring', visualDuration: 2, bounce: 0.1 }
                }}
              />
            </div>
            <motion.div
              className='Kname'
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.2,
                duration: 1,
                ease: _es
              }}
            >
              <img src='/kronbot.svg' />
            </motion.div>
            <motion.div
              className='Kmoto'
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2,
                duration: 1,
                ease: _es
              }}
            >
              <span>
                <h1>We don't predict the future,</h1>
              </span>
              <span>
                <h1> We invent it!</h1>
              </span>
            </motion.div>
          </div>
        </Waves>
      </div>
    </main>
  );
}
