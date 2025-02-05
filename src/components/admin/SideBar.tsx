'use client';
import { logout } from '@/lib/api/authentication';
import React, { useState } from 'react';
import style from './SideBar.module.css';

export default function SideBar(prop:{  onClick: (n: number) => void;}) {
  const [selected, setSelected] = useState(1);
  return (
    <div className={style.cont}>
      <button className={style.title}>
        <img src='/logo.svg' />
        <div className='flex flex-col w-[20rem] gap-[0.8rem] text-left'>
          <img src='/kronbot.svg' />
          <h2 className='text-xl'>Admin</h2>
        </div>
      </button>
      <div className={style.tabs}>
        <button className={selected==1 ? style.selected:''} onClick={() => {
          setSelected(1);
          prop.onClick(1);
        }}>
          Blogs <i className='fa fa-newspaper' />
        </button>
        <button className={selected==2 ? style.selected:''} onClick={() => {
          setSelected(2);
          prop.onClick(2);
        }}>
          Team <i className='fa-solid fa-users'></i>
        </button>
        <button className={selected == 3 ? style.selected : ''} onClick={() => {
          setSelected(3);
          prop.onClick(3);
        }}> 
          FTC <i className='fa-solid fa-rocket-launch'></i>
        </button>
        <button className={style.logout} onClick={() => {
          logout();

        }}>
          Logout <i className='fa-solid fa-right-from-bracket'></i>
        </button>
      </div>
    </div>
  );
}
