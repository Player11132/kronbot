import React from 'react';
import { string } from 'three/tsl';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = React.useState({
    x: null,
    y: null
  });
  React.useEffect(() => {
    const updateMousePosition = (ev: { clientX: any; clientY: any }) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  return mousePosition;
}

export function VerifyImageLink(link: string) {
  let comp = link.split('/');

  for (let elem in comp) {
    if (comp[elem] === 'drive.google.com') {
      return 'https://lh3.googleusercontent.com/d/' + comp[comp.length - 2];
    }
  }

  return link;
}

export function createBlogLink(id: number) {
  return `/view?id=${id}`;
}
