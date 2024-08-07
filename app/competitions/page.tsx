"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "../components/NavBar";
import "./styles.css";
import Card from "../components/Card";

const competitions = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (carousel) {
      carousel.addEventListener("wheel", (event) => {
        event.preventDefault();
        const currentScrollPosition = carousel.scrollLeft;
        const newScrollPosition = currentScrollPosition + event.deltaY;
        carousel.scrollLeft = newScrollPosition;
      });
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("wheel", () => {});
      }
    };
  }, []);

  return (
    <main className="cont fade">
      <div className="pagetitle">
        <h1 className="title inline right-[18rem]" style={{opacity:0.4}}>Competitions</h1>
        <h1 className="title inline right-[18rem]">Competitions</h1>
        <h1 className="title inline right-[18rem] " style={{opacity:0.4}}>Competitions</h1>
      </div>
      <h2 className="subtitle mb-[10rem]">FTC</h2>
      <div className="carousel" ref={carouselRef}>
        <div className="cardHolder">
          <Card title="FTC 2023-2024" image="/logo.svg" disableHover={true} />
        </div>
        <div className="cardHolder">
          <Card title="FTC 2022-2023" image="/logo.svg" disableHover={true}/>
        </div>
        <div className="cardHolder">
          <Card title="FTC 2021-2022" image="/logo.svg" disableHover={true}/>
        </div>
      </div>
      <h2>Other</h2>
      
    </main>
  );
};

export default competitions;
