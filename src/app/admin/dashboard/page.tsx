'use client';
import React, { useState, useEffect } from 'react';
import './styles.css';
import { getSession } from '@/lib/api/authentication';

import SideBar from '@/components/admin/SideBar';
import BlogPanel from '@/components/admin/BlogPanel';
import TeamPanel from '@/components/admin/TeamPanel';
import FTCPanel from '@/components/admin/FTCPanel';

export default function dash() {
  const [activeView, setActiveView] = useState(1);

  useEffect(() => {
    getSession();
  }, []);

  return (
    <main className='z-100 dashCont'>
      <SideBar
        onClick={(n) => {
          setActiveView(n);
        }}
      />
      <div className='view'>
        {activeView == 1 ? (
          <div className='fade'>
            <BlogPanel />
          </div>
        ) : (
          ''
        )}
        {activeView == 2 ? (
          <div className='fade'>
            <TeamPanel />
          </div>
        ) : (
          ''
        )}
        {activeView == 3 ? (
          <div className='fade'>
            <FTCPanel />
          </div>
        ) : (
          ''
        )}
      </div>
    </main>
  );
}
