import React, { useState, useEffect } from 'react';
import style from './PDFViewer.module.css';

const PDFViewer = ({ src }: { src: string }) => {
  const [smallScreen, setSmallScreen] = useState(false);
  const updateWidth = () => {
    const newWidth = window.innerWidth.valueOf();

    setSmallScreen(newWidth > 786 ? true : false);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    updateWidth();
  }, []);
  if (smallScreen)
    return (
      <div className={style.container}>
        <object data={src} width='100%' height='100%' type='application/pdf'>
          <div className={style.download}>
            <a href={src}>Download Book</a>
          </div>
        </object>
      </div>
    );
  else {
    return (
      <div className={style.download}>
        <a href={src}>Download Book</a>
      </div>
    );
  }
};

export default PDFViewer;
