"use client";

import React from "react";
import Navbar from "../components/NavBar";
import Card from "../components/Card";
import "./styles.css";
import MainButton from "../components/MainButton";

enum butType {
  Link,
  OnClick,
}

const blogs = () => {
  return (
    <main>
        <div className="fade">
        <h1 className="title" style={{opacity: 0.2}}>BLOGS</h1>
          <h1 className="title" style={{ opacity: 0.4 }}>
            BLOGS
          </h1>
          <h1 className="title" style={{ opacity: 1 }}>
            BLOGS
          </h1>
          <h1 className="title" style={{ opacity: 0.4 }}>BLOGS</h1>
          <h1 className="title" style={{opacity: 0.2}}>BLOGS</h1>
        </div>
      <div className="container fade">
        <div className="SideBar Left">
          <h1>Filters</h1>
          <MainButton
            type={butType.OnClick}
            label="Tehnical"
            onClick={() => void {}}
          />
          <MainButton
            type={butType.OnClick}
            label="Event"
            onClick={() => void {}}
          />
          <MainButton
            type={butType.OnClick}
            label="Team"
            onClick={() => void {}}
          />
        </div>
        <div className="SideBar Right">
          <h1>Sort by:</h1>
          <MainButton
            type={butType.OnClick}
            label="Date ↑"
            onClick={() => void {}}
          />
          <MainButton
            type={butType.OnClick}
            label="Date ↓"
            onClick={() => void {}}
          />
          <MainButton
            type={butType.OnClick}
            label="Number ↑"
            onClick={() => void {}}
          />
          <MainButton
            type={butType.OnClick}
            label="Number ↓"
            onClick={() => void {}}
          />
        </div>
        <div className="Posts">
          <Card
            title="Blog #4"
            description="First kronbot blog"
            date="31/07/2024"
            author="Telea Mihai"
            image="/logo.svg"
          />
          <Card
            title="Blog #3"
            description="First kronbot blog"
            date="31/07/2024"
            author="Telea Mihai"
            image="/logo.svg"
          />
          <Card
            title="Blog #2  "
            date="31/07/2024"
            author="Telea Mihai"
            image="/kronbot.svg"
          />
          <Card
            title="Blog #1"
            description="First kronbot blog"
            date="31/07/2024"
            author="Telea Mihai"
            image="https://media.kasperskydaily.com/wp-content/uploads/sites/92/2022/11/28103136/robots-and-cybersecurity-Featured.jpg"
          />
        </div>
      </div>
    </main>
  );
};

export default blogs;
