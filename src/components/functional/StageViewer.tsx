import { Season } from '@/lib/api/season';
import { useRouter } from 'next/navigation';
import Styles from './StageViewer.module.css';
import React from 'react';
import DiagonalBG from '@/components/visual/DiagonalBG';

const StageViewer = ({
  type,
  season,
  ind
}: {
  type: string;
  season: Season;
  ind?: number;
}) => {
  const router = useRouter();
  if (type == 'DEMOS') {
    if (season.demos.length > 0)
      return (
        <div>
          {season!.demos.map((d, index) => (
            <div
              key={index}
              className={
                (index % 2) - (ind! % 2) == 0
                  ? Styles.container
                  : Styles.flipped
              }
            >
              <div className={Styles.content}>
                <div style={{ width: '60%' }}>
                  <h1 className='title'>{season?.demostitle![index]}</h1>
                  <p>{d}</p>
                  {season?.demosPosts![index] === '' ? (
                    ''
                  ) : (
                    <button
                      onClick={() => {
                        router.push(season?.demosPosts![index]);
                      }}
                    >
                      Check out blog post{' '}
                      <i className='fa-solid fa-up-right-from-square' />
                    </button>
                  )}
                </div>

                <DiagonalBG
                  style={
                    (index % 2) - (ind! % 2) == 0
                      ? {
                          transform: 'skew(10deg, 0)',
                          width: '46rem',
                          height: '100%',
                          position: 'relative',
                          right: '-4.5rem'
                        }
                      : {
                          position: 'relative',
                          transform: 'skew(-10deg, 0)',
                          width: '46rem',
                          height: '100%',
                          left: '-4.5rem'
                        }
                  }
                >
                  {season?.demoImage![index] === '' ? (
                    ''
                  ) : (
                    <img
                      style={
                        (index % 2) - (ind! % 2) == 0
                          ? { transform: 'skew(-10deg, 0)' }
                          : { transform: 'skew(10deg, 0)' }
                      }
                      src={season!.demoImage![index]}
                      referrerPolicy='no-referrer'
                      alt='Photo of the demo'
                    />
                  )}
                </DiagonalBG>
              </div>
            </div>
          ))}
        </div>
      );
    else return '';
  } else if (type == 'MEETS') {
    if (season.meets.length > 0)
      return (
        <div>
          {season!.meets.map((m, index) => (
            <div
              key={index}
              className={
                (index % 2) - (ind! % 2) == 0
                  ? Styles.container
                  : Styles.flipped
              }
            >
              <div className={Styles.content}>
                <div style={{ width: '60%' }}>
                  <h1 className='title'>{season?.meetstitle![index]}</h1>
                  <p>{m}</p>
                  {season?.demosPosts![index] === '' ? (
                    ''
                  ) : (
                    <button
                      onClick={() => {
                        router.push(season?.meetPosts![index]);
                      }}
                    >
                      Check out blog post{' '}
                      <i className='fa-solid fa-up-right-from-square' />
                    </button>
                  )}
                </div>

                <DiagonalBG
                  style={
                    (index % 2) - (ind! % 2) == 0
                      ? {
                          transform: 'skew(10deg, 0)',
                          width: '46rem',
                          height: '100%',
                          position: 'relative',
                          right: '-4.5rem'
                        }
                      : {
                          position: 'relative',
                          transform: 'skew(-10deg, 0)',
                          width: '46rem',
                          height: '100%',
                          left: '-4.5rem'
                        }
                  }
                >
                  {season?.meetImage![index] === '' ? (
                    ' '
                  ) : (
                    <img
                      style={
                        (index % 2) - (ind! % 2) == 0
                          ? { transform: 'skew(-10deg, 0)' }
                          : { transform: 'skew(10deg, 0)' }
                      }
                      src={season!.meetImage![index]}
                      referrerPolicy='no-referrer'
                      alt='Photo of the meet'
                    />
                  )}
                </DiagonalBG>
              </div>
            </div>
          ))}
        </div>
      );
    else return '';
  } else if (type == 'REGIONALS') {
    if (season.regionals)
      return (
        <div className={Styles.container}>
          <div className={Styles.content}>
            <div style={{ width: '60%' }}>
              <h1 className='title'>REGIONALS</h1>
              <p>{season.regionals}</p>
              {season?.regionalPost === '' ? (
                ''
              ) : (
                <button
                  onClick={() => {
                    router.push(season.regionalPost!);
                  }}
                >
                  Check out blog post{' '}
                  <i className='fa-solid fa-up-right-from-square' />
                </button>
              )}
            </div>
            <DiagonalBG
              style={{
                width: '46rem',
                height: '100%',
                position: 'relative',
                right: '-4.5rem',
                transform: 'skew(10deg, 0)'
              }}
            >
              {season?.regionalImage === '' ? (
                ''
              ) : (
                <img
                  style={{ transform: 'skew(-10deg, 0)' }}
                  src={season?.regionalImage!}
                  referrerPolicy='no-referrer'
                  alt='Photo of the regional'
                />
              )}
            </DiagonalBG>
          </div>
        </div>
      );
    else return '';
  } else if (type == 'NATIONALS') {
    if (season.nationals)
      return (
        <div className={Styles.container}>
          <div className={Styles.content}>
            <div style={{ width: '60%' }}>
              <h1 className='title'>NATIONALS</h1>
              <p>{season.nationals}</p>
              {season?.nationalPost === '' ? (
                ''
              ) : (
                <button
                  onClick={() => {
                    router.push(season.nationalPost!);
                  }}
                >
                  Check out blog post{' '}
                  <i className='fa-solid fa-up-right-from-square' />
                </button>
              )}
            </div>
            <DiagonalBG
              style={{
                width: '46rem',
                height: '100%',
                position: 'relative',
                right: '-4.5rem',
                transform: 'skew(10deg, 0)'
              }}
            >
              {season?.nationalImage === '' ? (
                ''
              ) : (
                <img
                  style={{ transform: 'skew(-10deg, 0)' }}
                  src={season?.nationalImage!}
                  referrerPolicy='no-referrer'
                  alt='Photo of the national'
                />
              )}
            </DiagonalBG>
          </div>
        </div>
      );
    else return '';
  } else if (type == 'INTERNATIONALS') {
    if (season.internationals)
      return (
        <div className={Styles.container}>
          <div className={Styles.content}>
            <div style={{ width: '60%' }}>
              <h1 className='title'>INTERNATIONALS</h1>
              <p>{season.internationals}</p>
              {season?.internationalPost === '' ? (
                ''
              ) : (
                <button
                  onClick={() => {
                    router.push(season.internationalPost!);
                  }}
                >
                  Check out blog post{' '}
                  <i className='fa-solid fa-up-right-from-square' />
                </button>
              )}
            </div>
            <DiagonalBG
              style={{
                width: '46rem',
                height: '100%',
                position: 'relative',
                right: '-4.5rem',
                transform: 'skew(10deg, 0)'
              }}
            >
              {season?.internationalImage === '' ? (
                ''
              ) : (
                <img
                  style={{ transform: 'skew(-10deg, 0)' }}
                  src={season?.internationalImage!}
                  referrerPolicy='no-referrer'
                  alt='Photo of the international'
                />
              )}
            </DiagonalBG>
          </div>
        </div>
      );
    else return '';
  } else return <h1>INVALID TYPE</h1>;
};

export default StageViewer;
