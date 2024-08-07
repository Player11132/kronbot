import React from 'react'
import styles from './NavBar.module.css'
import Link from 'next/link';
import Image from 'next/image'
import MainButton from './MainButton';

enum butType{
  Link,
  OnClick
}

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.buttonContainer}>
          <MainButton type={butType.Link} link="/blogs" label='Blogs'/>
          <MainButton type={butType.Link} link="/competitions" label='Contests'/>
      </div>
          <Link href="/"><img className={styles.homeBut} src="/logo.svg"/></Link>
      <div className={styles.buttonContainer}>  
          <MainButton type={butType.Link} link="/team" label='Team'/>
        <MainButton type={butType.Link} link="/contests" label='Events' />
      </div>
    </nav>
  )
}

export default Navbar;

// mongodb+srv://mihaitelea02:KUBhTD1EY8Gls5cP@kronbot.xfei1qs.mongodb.net/?retryWrites=true&w=majority&appName=kronbot