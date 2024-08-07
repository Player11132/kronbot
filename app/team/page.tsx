'use client'
import React, { useEffect, useRef } from "react";
import Navbar from "../components/NavBar";
import "./styles.css";
import VCard from "../components/VCard";

const team = () => {
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

    return () => {
      if (carouselRef.current) {
        carouselRef.current.removeEventListener("wheel", () => {});
      }
    };
  }, []);

  return (
    <main>
      <div className="cont fade">
        <div className="pagetitle">
          <h1 className="title inline right-[1rem]" style={{ opacity: 0.4 }}>
            Team
          </h1>
          <h1 className="title inline right-[1rem]" style={{ opacity: 0.4 }}>
            Team
          </h1>
          <h1 className="title inline right-[1rem]">Team</h1>
          <h1 className="title inline right-[1rem]" style={{ opacity: 0.4 }}>
            Team
          </h1>
          <h1 className="title inline right-[1rem]" style={{ opacity: 0.4 }}>
            Team
          </h1>
        </div>
        <h2 className="subtitle">Members</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque commodi ducimus vitae, voluptatibus, qui autem debitis tempora nisi et, labore dignissimos libero illo sequi! Error quia sapiente tempore minima fugiat!</p>
        <div className="carousel" ref={carouselRef}>
          <VCard
            title="Member #1"
            description="Programming/Mechanics"
            date="Joined in: 2024"
            image="/logo.svg"
          />
          <VCard
            title="Member #2"
            description="Programming/Mechanics"
            date="Joined in: 2024"
            image="/logo.svg"
          />
          <VCard
            title="Member #3"
            description="Programming/Mechanics"
            date="Joined in: 2024"
            image="/logo.svg"
          />
          <VCard
            title="Member #4"
            description="Programming/Mechanics"
            date="Joined in: 2024"
            image="/logo.svg"
          />
          <VCard
            title="Member #5"
            description="Programming/Mechanics"
            date="Joined in: 2024"
            image="/logo.svg"
          />
          <VCard
            title="Member #6"
            description="Programming/Mechanics"
            date="Joined in: 2024"
            image="/logo.svg"
          />
          <VCard
            title="Member #7"
            description="Programming/Mechanics"
            date="Joined in: 2024"
            image="/logo.svg"
          />
        </div>
        <div className="SponsorCont">
          <h2>Thanks to all of our sponsors!</h2>
          
        </div>
        
      </div>
    </main>
  );
};

export default team;
