'use client';
import React, { useState, useEffect } from 'react';
import styles from './NavBar.module.css';
import Link from 'next/link';
import MainButton from '../structural/MainButton';
import { useRouter, usePathname } from 'next/navigation';
import BinaryBG from '../visual/BinaryBG';
import * as motion from 'motion/react-client';

enum butType {
  Link,
  OnClick
}

const Navbar = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [sideBar, setSidebar] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const updateWidth = () => {
    const newWidth = window.innerWidth.valueOf();
    setShowButtons(newWidth > 786 ? true : false);
  };

  const updateColors = () => {
    if (!pathname.includes('competitions')) {
      document.body.style.setProperty('--bgColor', '#9b3943');
      document.body.style.setProperty('--mainColor', '#471217');
      document.body.style.setProperty('--accentColor', '#1d1a1b');
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    updateWidth();
  }, []);

  if (!pathname.includes('admin'))
    if (showButtons)
      return (
        <motion.nav
          className={styles.container}
          initial={{ y: -150 }}
          animate={{ y: 0 }}
          transition={{
            delay: 0.5,
            duration: 1,
            y: { type: 'spring', visualDuration: 1, bounce: 0.6, mass: 2 }
          }}
        >
          <BinaryBG width='100%' height='4.7rem' count={2000} />
          <div
            className={styles.buttonContainer}
            style={{ display: `${showButtons ? 'block' : 'none'}` }}
          >
            <MainButton type={butType.Link} link='/blogs' label='Blogs' />
            <MainButton type={butType.Link} link='/competitions' label='FTC' />
          </div>
          <Link href='/'>
            <img className={styles.homeBut} src='/logo.svg' />
          </Link>
          <div
            className={styles.buttonContainer}
            style={{ display: `${showButtons ? 'block' : 'none'}` }}
          >
            <MainButton type={butType.Link} link='/team' label='Team' />
            <MainButton type={butType.Link} link='/social' label='Social' />
          </div>
        </motion.nav>
      );
    else {
      return (
        <nav className={styles.phoneCont}>
          <div className='radius-[4rem] overflow-hidden'>
            <BinaryBG width='50rem' height='6rem' count={1000} />
          </div>
          <button
            className={styles.homeBut}
            onClick={() => {
              setSidebar(!sideBar);
            }}
          >
            <img src='/logo.svg' />
            <img src='/kronbot.svg' />
          </button>
          <div className='flex flex-row'>
            <div
              className={styles.sideBar}
              style={{
                left: `${sideBar ? '0' : '-100rem'}`
              }}
            >
              <div className='overflow-hidden'>
                <BinaryBG width='100%' height='100%' count={3000} />
              </div>
              <div className='mt-[1rem] w-[100%]'>
                <div
                  className={
                    pathname == '/' ? styles.selected : styles.buttonContainer
                  }
                >
                  <MainButton
                    type={butType.OnClick}
                    onClick={() => {
                      setSidebar(!sideBar);
                      router.push('/');
                    }}
                    label='Home'
                    icon='house'
                  />
                </div>
                <div
                  className={
                    pathname == '/blogs'
                      ? styles.selected
                      : styles.buttonContainer
                  }
                >
                  <MainButton
                    type={butType.OnClick}
                    onClick={() => {
                      setSidebar(!sideBar);
                      router.push('/blogs');
                    }}
                    label='Blogs'
                    icon='newspaper'
                  />
                </div>
                <div
                  className={
                    pathname == '/competitions'
                      ? styles.selected
                      : styles.buttonContainer
                  }
                >
                  <MainButton
                    type={butType.OnClick}
                    onClick={() => {
                      setSidebar(!sideBar);
                      router.push('/competitions');
                    }}
                    label='FTC'
                    icon='gear'
                  />
                </div>
                <div
                  className={
                    pathname == '/team'
                      ? styles.selected
                      : styles.buttonContainer
                  }
                >
                  <MainButton
                    type={butType.OnClick}
                    onClick={() => {
                      setSidebar(!sideBar);
                      router.push('/team');
                    }}
                    label='Team'
                    icon='users'
                  />
                </div>
                <div
                  className={
                    pathname == '/social'
                      ? styles.selected
                      : styles.buttonContainer
                  }
                >
                  <MainButton
                    type={butType.OnClick}
                    onClick={() => {
                      setSidebar(!sideBar);
                      router.push('/social');
                    }}
                    label='Social'
                    icon='at'
                  />
                </div>
              </div>
              {sideBar ? (
                <div
                  className='backdrop-blur-sm w-[120vw] h-[100vh] fade '
                  onClick={() => {
                    if (sideBar) setSidebar(!sideBar);
                  }}
                />
              ) : (
                ''
              )}
            </div>
          </div>
        </nav>
      );
    }
  return '';
};

export default Navbar;
