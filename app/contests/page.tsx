'use client'

import React from "react";
import Navbar from "../components/NavBar";
import Card from "../components/Card";
import "./styles.css";
import MainButton from "../components/MainButton";

enum butType {
  Link,
  OnClick,
}

const contests = () => {
  return (
    <main>
      <div className="container fade">
        <div className="Posts">
          <Card
            title="RENDER RUSH"
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
      <div className="fade">
        <h1 className="title" style={{ opacity: 0.2 }}>
          CONTESTS
        </h1>
        <h1 className="title" style={{ opacity: 0.4 }}>
          CONTESTS
        </h1>
        <h1 className="title" style={{ opacity: 1 }}>
          CONTESTS
        </h1>
        <h1 className="title" style={{ opacity: 0.4 }}>
          CONTESTS
        </h1>
        <h1 className="title" style={{ opacity: 0.2 }}>
          CONTESTS
        </h1>
      </div>
    </main>
  );
};

export default contests;
