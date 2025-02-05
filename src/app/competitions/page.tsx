'use client';

import React, { useEffect, useState, useRef, ReactNode } from 'react';
import { getDefaultSeason, getSeasons, Season } from '@/lib/api/season';
import { useMousePosition } from '@/lib/api/events';
import * as motion from 'motion/react-client';

import MainButton from '@/components/structural/MainButton';
import ModelViewer from '@/components/functional/ModelViewer';
import PDFViewer from '@/components/functional/PDFViewer';
import StatCard from '@/components/structural/StatCard';

import './styles.css';
import { AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import StageViewer from '@/components/functional/StageViewer';

enum butType {
  Link,
  OnClick
}

const stages = ['DEMOS', 'MEETS', 'REGIONALS', 'NATIONALS', 'INTERNATIONALS'];

const stageDetails = [
  "Demos are friendly, informal matches hosted by teams with the primary purpose of training and skill development. These events provide an excellent opportunity for teams to experiment with new strategies, test their robot's capabilities, and collaborate with other teams in a low-pressure environment. Demos foster a spirit of camaraderie and knowledge sharing, allowing teams to identify areas for improvement and refine their designs without any impact on official rankings. They serve as a valuable platform for networking, learning from others' experiences, and building a supportive robotics community.",
  "Meets are official, structured competitions hosted locally by other teams, serving as a crucial stepping stone in the competition journey. While the primary objective remains similar to demos—identifying weaknesses in both robot design and strategy—meets carry significant weight as their outcomes influence the team's overall ranking. Participation in at least three meets is mandatory to qualify for the regional stage, making them a critical component of the season. Teams use these meets to gather valuable performance data, fine-tune their robots, and adapt their strategies based on real competition scenarios.",
  'Due to the large number of teams participating in Romania, the country is divided into multiple regions, each hosting its own regional competition. Teams within each region compete for a coveted spot in the national championship. This stage marks the beginning of the highly competitive aspect of the FTC journey, where teams must perform at their highest level to advance further. Regional competitions are intense, requiring teams to demonstrate not only technical excellence but also strategic adaptability, teamwork, and innovation. Success at this stage is a testament to months of hard work and dedication.',
  'The national championship is the pinnacle of competition within Romania, where the most skilled and determined teams battle for a chance to represent their country on the international stage. This is where the true test of engineering, strategy, and teamwork takes place, as teams strive to showcase their best performance. Only the top-performing teams will earn the honor of advancing to the ultimate challenge in America. Nationals are characterized by a highly competitive atmosphere, where every detail matters, and only the best of the best will move forward.',
  "The international stage represents the highest level of competition in the FTC journey. It is the ultimate aspiration for teams around the world, where only the most outstanding and innovative teams qualify to compete for the title of FTC World Champions. At this level, teams face the most formidable opponents from across the globe, showcasing cutting-edge technology, advanced strategies, and exceptional teamwork. Competing at the international stage is a testament to a team's perseverance, creativity, and excellence in robotics, offering an unparalleled opportunity to leave a mark on the global stage."
];

const stageIcon = [
  'fa-solid fa-gears',
  'fa-solid fa-handshake',
  'fa-solid fa-location-pin',
  'fa-solid fa-flag',
  'fa-solid fa-earth-americas'
];

const competitions = () => {
  const [season, setSeason] = useState<Season>();
  // const [archive, setArchive] = useState<Season[]>();
  const [viewArchive, setViewArchive] = useState<boolean>(false);
  const [activeStage, setActiveStage] = useState<string>('DEMOS');

  const router = useRouter();

  async function loadSeazon() {
    var _season = await getDefaultSeason();
    setSeason(_season);
    // setArchive(await getSeasons(true, false));

    if (_season) {
      document.body.style.setProperty('--bgColor', _season.bgColor);
      document.body.style.setProperty('--mainColor', _season.mainColor);
      document.body.style.setProperty('--accentColor', _season.accentColor);
    }
  }

  async function setView() {
    setViewArchive(!viewArchive);
    document.body.style.setProperty('--bgColor', season!.bgColor);
    document.body.style.setProperty('--mainColor', season!.mainColor);
    document.body.style.setProperty('--accentColor', season!.accentColor);
    if (viewArchive === false) {
      loadSeazon();
    }
  }

  function setStageContent(sel: string) {
    setActiveStage(sel);
  }

  useEffect(() => {
    loadSeazon();
  }, []);

  ///CURSOR
  const [cursorIcon, setCursorIcon] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');

  const mouse = useMousePosition();

  const variants = {
    default: {
      opacity: 0,
      height: 10,
      width: 10,
      backgroundColor: '#000000',
      x: mouse.x!,
      y: mouse.y!,
      transition: {
        type: 'spring',
        mass: 0.6
      }
    },
    stage: {
      opacity: 1,
      // backgroundColor: "rgba(255, 255, 255, 0.6)",
      backgroundColor: 'var(--bgColor)',
      color: 'white',
      width: 60,
      height: 60,
      x: mouse.x!,
      y: mouse.y!
    }
  };

  const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 28
  };

  if (season)
    return (
      <main className='fade cont'>
        <motion.div
          variants={variants}
          className='circle'
          animate={cursorVariant}
          transition={spring}
        >
          <span className='cursorText'>
            <i className={cursorIcon} />
          </span>
        </motion.div>

        <div className='dividerLine' />
        {viewArchive ? (
          <MainButton
            label='Back to current season'
            type={butType.OnClick}
            onClick={() => {
              setView();
            }}
          />
        ) : (
          <h2 className='pagetitle fade'>CURRENT SEASON</h2>
        )}
        <div className='dividerLine' />
        <div className='fade curS'>
          <div className='lander'>
            <div className='divider'>
              <p>{season.description}</p>
              <a href='https://www.firstinspires.org/robotics/ftc'>
                Official FTC page{' '}
                <i className='fa-solid fa-up-right-from-square' />
              </a>
            </div>
            <img src={season.logo} />
          </div>
          <h1 className='subtitle'>STATS</h1>
          <div className='stat'>
            <StatCard
              number={season.mathcesplayed}
              icon='fa-solid fa-gamepad'
              label='Mathces played'
            />
            <StatCard
              number={season.points}
              icon='fa-solid fa-star'
              label='Points scored'
            />
            <StatCard
              number={season.wins}
              icon='fa-solid fa-trophy'
              label='Mathces won'
            />
            <StatCard
              number={
                season.mathcesplayed === 0
                  ? 0
                  : (season.wins / season.mathcesplayed) * 100
              }
              icon='fa-solid fa-percent'
              label='Win percentage'
            />
          </div>
          <div className='robot'>
            <div className='robotContent'>
              <h1 className='title'>OUR ROBOT</h1>
              <p>{season.robotdesc}</p>
            </div>
            {season.robot3D ? <ModelViewer src={season!.robot3D!} /> : ''}
          </div>
          {season.book ? (
            <div className='book'>
              <h1 className='title'>BOOK</h1>
              <PDFViewer src={season.book!} />
            </div>
          ) : (
            ''
          )}
          <div className='season'>
            <div className='stages'>
              {stages.map((stage, index) => (
                <motion.div
                  key={index}
                  className={`stage ${index % 2 ? 'arrow1' : 'arrow2'} ${stage === activeStage ? 'selected' : ''}`}
                  style={
                    index % 2
                      ? { background: 'var(--accentColor)' }
                      : { background: 'var(--mainColor)' }
                  }
                  onClick={() => {
                    setStageContent(stage);
                    setCursorVariant('default');
                    setCursorIcon('');
                  }}
                  onMouseEnter={() => {
                    if (!(stage === activeStage)) {
                      setCursorVariant('stage');
                      setCursorIcon(
                        'fa-solid fa-up-right-and-down-left-from-center'
                      );
                    }
                  }}
                  onMouseLeave={() => {
                    setCursorVariant('default');
                    setCursorIcon('');
                  }}
                >
                  <h1>{stage}</h1>
                  <div className='icon'>
                    <i className={stageIcon[index]} />
                  </div>
                  <div className='details'>
                    <p>{stageDetails[index]}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <AnimatePresence mode='wait'>
              <motion.div
                className='stageContent'
                key={activeStage ? activeStage : 'empty'}
                style={{}}
                initial={{
                  x: '-100%',
                  width: 0,
                  background: `${activeStage === 'MEETS' ? 'var(--mainColor)' : activeStage === 'NATIONALS' ? 'var(--mainColor)' : 'var(--accentColor)'}`
                }}
                animate={{
                  x: 0,
                  width: '100%',
                  background: `${activeStage === 'MEETS' ? 'var(--accentColor)' : activeStage === 'NATIONALS' ? 'var(--accentColor)' : 'var(--mainColor)'}`
                }}
                exit={{ x: '100%', scale: 0 }}
                transition={{
                  duration: 0.5,
                  x: { type: 'spring', visualDuration: 0.4, bounce: 0.2 },
                  ease: [0.39, 0.24, 0.1, 1]
                }}
              >
                <StageViewer
                  type={activeStage}
                  season={season}
                  ind={stages.findIndex((stage) => stage === activeStage)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          {/* <h2 className='subtitle'>Archive</h2>
          <div className='archive'>
          {archive?.map((Oldseason) => (
            <div className='archElem' key={Oldseason.id}>
            <img src={Oldseason.logo} />
            <h1>{Oldseason.name}</h1>
            <MainButton
            label='Check out'
            type={butType.OnClick}
            onClick={() => {
              setSeason(Oldseason);
              setView();
              }}
              />
              </div>
            ))}
          </div> */}
        </div>
      </main>
    );
  else
    return (
      <main className='fade cont'>
        <h1 className='title'>NO CURRENT SEASON</h1>
        {/* <div className='archive'>
          {archive?.map((Oldseason) => (
            <div className='archElem' key={Oldseason.id}>
              <img src={Oldseason.logo} />
              <h1>{Oldseason.name}</h1>
              <MainButton
                label='Check out'
                type={butType.OnClick}
                onClick={() => {
                  setSeason(Oldseason);
                  setView();
                }}
              />
            </div>
          ))}
        </div> */}
      </main>
    );
};

export default competitions;
