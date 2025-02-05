'use client';

import Link from 'next/link';
import React from 'react';
import style from './MainButton.module.css';

enum butType {
  Link,
  OnClick
}

interface props {
  label: string;
  type: butType;
  onClick?: () => void;
  link?: string;
  icon?: string;
}

const MainButton = (prop: props) => {
  if (prop.type === butType.Link && prop.link)
    return (
      <div className='inline-block'>

      <Link className={style.but} href={prop.link}>
        {prop.label}  
        {prop.icon ? <i className={`fa fa-${prop.icon}`} /> : ''}
      </Link>
      </div>
    );
  else if (prop.type === butType.OnClick)
    return (
      <div className='inline-block  w-[100%]'>
      <button className={style.but} onClick={prop.onClick}>
        {prop.label}
        {prop.icon ? <i className={`fa fa-${prop.icon}`} /> : ''}
        </button>
        </div>
    );
  else throw new Error(`Invalid button type: ${prop.type}`);
};

export default MainButton;
