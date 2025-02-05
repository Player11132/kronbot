'use client';

import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  useInView
} from 'motion/react';
import { useEffect, useRef } from 'react';

export default function Counter({
  _number,
  duration
}: {
  _number: number;
  duration: number;
}) {
  const ref = useRef(null);
  const count = useMotionValue(0);
  const rounded = useTransform(() => Math.round(count.get()));
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, _number, { duration, ease: 'easeInOut' });
      return () => controls.stop();
    }
  }, [isInView]);

  return <motion.pre ref={ref}>{rounded}</motion.pre>;
}
