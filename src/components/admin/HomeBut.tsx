'use client'
import React from 'react';
import style from './HomeBut.module.css'

const HomeBut = (props:{onClick?: ()=>void}) => {
  return (
    <button className={style.button} onClick={() => {
      if (props.onClick)
        props.onClick
    }}>
      <img src='/logo.svg' />
      <div className='flex flex-col w-[20rem] gap-[0.8rem] text-left'>
        <img src='/kronbot.svg' />
        <h2 className='text-xl'>Admin</h2>
      </div>
    </button>
  );
};

export default HomeBut;
