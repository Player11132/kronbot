import React from 'react';
import './styles.css';
import FTCEdit from '@/components/admin/FTCEdit';
import { getSession } from '@/lib/api/authentication';

export default async function () {
  await getSession();
  return (
    <main className='fade'>
      <div className='customCont'>
        <div className='dividerLine' />
        <h2 className='title fade'>SEASON EDIT</h2>
        <div className='dividerLine mb-[4rem]' />
        <FTCEdit />
      </div>
    </main>
  );
}
