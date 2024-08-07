'use client'

import React from 'react';
import styles from "./SideBar.module.css";
interface props{
    title?: string;
    width: string;
    height: string;
    verticalOffset: string;
    offset: string;
    offsetHover: string;
    children: React.ReactNode;
}

const SideBar = (prop: props) => {
    return (
      <div
        className={styles.SideBar}
        style={{
            width: prop.width,
            height: prop.height,
            top: prop.verticalOffset,
            left: prop.offset,
            
        }}
      >
        {prop.children}
      </div>
    )
  }

export default SideBar