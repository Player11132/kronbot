'use client';

import React from 'react';
import { motion, useScroll } from 'motion/react';
import { useRef } from 'react';
import Style from './ScrollPercent.module.css';

const ScrollPercentViewer = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className={Style.cont}>
      <div className={Style.cover} />
      <motion.div
        style={{
          scaleY: scrollYProgress,
          position: 'fixed',
          top: 0,
          left: 0,
          originY: 0
        }}
        className={Style.bar}
      />
    </div>
  );
};

export default ScrollPercentViewer;
