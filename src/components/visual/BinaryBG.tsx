'use client';
import React, { useEffect, useState } from 'react';
import style from './BinaryBG.module.css';

const BinaryBG = (props: { width: string; height: string; count: number }) => {
  const [str, setStr] = useState('');
  function generateBinary() {
    let aux = '';
    for (let i = 0; i < props.count; i++) {
      aux = aux + Math.round(Math.random());
    }
    setStr(aux);
  }
  useEffect(() => {
    generateBinary();
  }, []);

  return (
    <div
      className={style.bin}
      style={{ width: `${props.width}`, height: `${props.height}` }}
    >
      {str}
    </div>
  );
};

export default BinaryBG;
