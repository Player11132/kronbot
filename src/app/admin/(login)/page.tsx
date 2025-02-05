'use client';
import React, { FormEvent, useEffect, useState } from 'react';

import './styles.css';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';
import { initFirebaseApp } from '@/lib/firebase/firebase.config';
import { authenticate, getSession } from '@/lib/api/authentication';
import HomeBut from '@/components/admin/HomeBut';

export default function () {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [badAuth, setBadAuth] = useState<boolean>(false);


  useEffect(() => {
    getSession('/admin/dashboard');
  }, []);

  async function exLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setDisabled(true);
    const formData = new FormData(e.currentTarget);
    let user;
    try {
      user = await signInWithEmailAndPassword(
        getAuth(initFirebaseApp()),
        formData.get('email')?.toString()!,
        formData.get('password')?.toString()!
      );
    } catch (error) {
      setBadAuth(true);
    } finally {
      if (user) {
        await authenticate(await user.user.getIdToken(), '/admin/dashboard');
        setBadAuth(false);
      }
      setDisabled(false);
    }
  }

  return (
    <main>
      <div className='flex flex-col align-middle justify-center gap-[3rem]'>
        <HomeBut />
        <div className='logArea'>
          <h2>Authenticate</h2>
          <form className='flex flex-col gap-4 items-center' onSubmit={exLogin}>
            <input
              name='email'
              type='email'
              placeholder='Email'
              defaultValue=''
              required={true}
            />
            <input
              name='password'
              defaultValue=''
              type='password'
              placeholder='Password'
              required={true}
            />
            <input
              disabled={disabled}
              type='submit'
              className='bg-blue-500'
              value={disabled ? 'Logging in...' : 'Log in'}
            />
          </form>
        </div>
        {badAuth ? (
          <div className='bg-red-600 m-[1rem] pt-[1rem] pb-[1rem] rounded-[4rem]'>
            <h2>Wrong email or password!</h2>
          </div>
        ) : (
          ''
        )}
      </div>
    </main>
  );
}
