'use client'

import Link from 'next/link';
import React from 'react'
import style from "./MainButton.module.css"


enum butType{
    Link,
    OnClick
}

interface props{
    label: string;
    type: butType;
    onClick?: () => void;
    link?: string;
}

const MainButton = (prop:props) => {
    if (prop.type === butType.Link && prop.link)
        return (
            <Link className={style.but} href={prop.link}>{prop.label}</Link>
        )
    else if (prop.type === butType.OnClick)
        return (
            <button className={style.but} onClick={prop.onClick}>{prop.label}</button>
        )
    else
        throw new Error(`Invalid button type: ${prop.type}`);
}

export default MainButton