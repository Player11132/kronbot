'use client';
import React, { useEffect, useState } from 'react';
import {
  Season,
  editSeason,
  getSeasonById,
  removeSeason,
  saveFileToPublic,
  setDefaultById,
  deleteFile
} from '@/lib/api/season';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PopUp from './PopUpConf';
import style from './FTCEdit.module.css';
import PDFViewer from '../functional/PDFViewer';
import ModelViewer from '../functional/ModelViewer';
import { createBlogLink, VerifyImageLink } from '@/lib/api/events';
import { getPostById, getPosts, Post } from '@/lib/api/posts';
import PopUpCust from './PopUpCust';

const FTCEdit = () => {
  const seasonId = useSearchParams().get('id');
  const [season, setSeason] = useState<Season | null>(null);
  const [meets, setMeets] = useState<string[]>([]);
  const [demos, setDemos] = useState<string[]>([]);

  const [deleteDialog, setDelDialog] = useState(false);
  const [blogLinkIndex, setBlogLinkindex] = useState(-1);
  const [blogLinkType, setBlogLinkType] = useState<string>();
  const [selBlog, setSelBlog] = useState<Post>();
  const [blogs, setBlogs] = useState<Post[]>();
  const router = useRouter();

  async function fetchSeason() {
    const temp = await getSeasonById(parseInt(seasonId!));
    setSeason(temp);
    setMeets(temp.meets || []);
    setDemos(temp.demos || []);

    document.body.style.setProperty('--bgColor', temp.bgColor);
    document.body.style.setProperty('--mainColor', temp.mainColor);
    document.body.style.setProperty('--accentColor', temp.accentColor);
  }

  async function save() {
    if (season) await editSeason({ ...season, meets, demos });
  }

  async function uploadBook(f: FormData) {
    if (season!.book) await deleteFile('./public' + season!.book);
    let path = await saveFileToPublic('/books', f);
    setSeason({
      ...season!,
      book: path
    });
    save();
  }

  async function upload3D(f: FormData) {
    if (season!.robot3D) await deleteFile('./public' + season!.robot3D);
    let path = await saveFileToPublic('/models', f);
    setSeason({
      ...season!,
      robot3D: path
    });
    save();
  }

  async function getBlogs(id?: number) {
    if (id) {
      setSelBlog(await getPostById(id));
      console.log(id);
    }
    setBlogs(await getPosts('All', false));
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Season
  ) => {
    if (season) {
      setSeason({ ...season, [field]: e.target.value });

      document.body.style.setProperty('--bgColor', season.bgColor);
      document.body.style.setProperty('--mainColor', season.mainColor);
      document.body.style.setProperty('--accentColor', season.accentColor);
    }
  };

  const handleMeetChange = (index: number, value: string) => {
    const updatedMeets = [...meets];
    updatedMeets[index] = value;
    setMeets(updatedMeets);
  };

  const handleDemoChange = (index: number, value: string) => {
    const updatedDemos = [...demos];
    updatedDemos[index] = value;
    setDemos(updatedDemos);
  };

  const addMeet = () => {
    setMeets([...meets, '']);
    setSeason({ ...season!, meetImage: [...season!.meetImage!, ''] });
  };

  const addDemo = () => {
    setDemos([...demos, '']);
    setSeason({ ...season!, demoImage: [...season!.demoImage!, ''] });
  };

  const unlinkBlog = () => {
    if (blogLinkType === 'Meet') {
      let newPosts = season!.meetPosts!;
      newPosts[blogLinkIndex] = '';
      setSeason({
        ...season!,
        meetPosts: newPosts
      });
    } else if (blogLinkType === 'Demo') {
      let newPosts = season!.demosPosts!;
      newPosts[blogLinkIndex] = '';
      setSeason({
        ...season!,
        demosPosts: newPosts
      });
    } else {
      switch (blogLinkType) {
        case 'Regional':
          setSeason({ ...season!, regionalPost: '' });
          break;
        case 'International':
          setSeason({
            ...season!,
            internationalPost: ''
          });
          break;
        case 'National':
          setSeason({ ...season!, nationalPost: '' });
          break;
      }
    }
    setSelBlog(undefined);
    setBlogLinkindex(-1);
  };

  const linkBlog = () => {
    if (selBlog === undefined) {
      unlinkBlog();
      return;
    }
    if (blogLinkType === 'Meet') {
      let newPosts = season!.meetPosts!;
      newPosts[blogLinkIndex] = createBlogLink(selBlog!.id);
      setSeason({
        ...season!,
        meetPosts: newPosts
      });
    } else if (blogLinkType === 'Demo') {
      let newPosts = season!.demosPosts!;
      newPosts[blogLinkIndex] = createBlogLink(selBlog!.id);
      setSeason({
        ...season!,
        demosPosts: newPosts
      });
    } else {
      switch (blogLinkType) {
        case 'Regional':
          setSeason({ ...season!, regionalPost: createBlogLink(selBlog!.id) });
          break;
        case 'International':
          setSeason({
            ...season!,
            internationalPost: createBlogLink(selBlog!.id)
          });
          break;
        case 'National':
          setSeason({ ...season!, nationalPost: createBlogLink(selBlog!.id) });
          break;
      }
    }
    setSelBlog(undefined);
    setBlogLinkindex(-1);
  };

  useEffect(() => {
    if (seasonId) fetchSeason();
  }, [seasonId]);

  if (!season) return <div>Loading...</div>;

  return (
    // SEASON DESC
    <div className={style.curS}>
      <div>
        <input
          value={season.logo}
          onChange={(e) => handleInputChange(e, 'logo')}
        />
      </div>
      <img className={style.centerImg} src={season.logo} alt='Season Logo' />
      <div>
        <input
          className='title'
          value={season.name}
          onChange={(e) => handleInputChange(e, 'name')}
        />
      </div>
      <div>
        <textarea
          value={season.description}
          onChange={(e) => handleInputChange(e, 'description')}
        />
      </div>

      {/* STATS */}
      <h1 className={style.subtitle}>This season stats</h1>
      <div className={style.stat}>
        <div className={style.statCard}>
          <span>
            <h2>Points scored</h2>
          </span>
          <span className='flex flex-col items-center'>
            <button
              onClick={() =>
                setSeason({ ...season!, points: (season!.points || 0) + 1 })
              }
            >
              <i className='fa-solid fa-plus' />
            </button>
            <input
              value={season.points}
              onChange={(e) => handleInputChange(e, 'points')}
            />
            <button
              onClick={() =>
                setSeason({
                  ...season!,
                  points: Math.max((season!.points || 0) - 1, 0)
                })
              }
            >
              <i className='fa-solid fa-minus' />
            </button>
          </span>
        </div>
        <div className={style.statCard}>
          <span>
            <h2>Matches played</h2>
          </span>
          <span className='flex flex-col items-center'>
            <button
              onClick={() =>
                setSeason({
                  ...season!,
                  mathcesplayed: (season!.mathcesplayed || 0) + 1
                })
              }
            >
              <i className='fa-solid fa-plus' />
            </button>
            <input
              value={season.mathcesplayed}
              onChange={(e) => handleInputChange(e, 'mathcesplayed')}
            />
            <button
              onClick={() =>
                setSeason({
                  ...season!,
                  mathcesplayed: Math.max((season!.mathcesplayed || 0) - 1, 0)
                })
              }
            >
              <i className='fa-solid fa-minus' />
            </button>
          </span>
        </div>
        <div className={style.statCard}>
          <span>
            <h2>Matches won</h2>
          </span>
          <span className='flex flex-col items-center'>
            <button
              onClick={() =>
                setSeason({ ...season!, wins: (season!.wins || 0) + 1 })
              }
            >
              <i className='fa-solid fa-plus' />
            </button>
            <input
              value={season.wins}
              onChange={(e) => handleInputChange(e, 'wins')}
            />
            <button
              onClick={() =>
                setSeason({
                  ...season!,
                  wins: Math.max((season!.wins || 0) - 1, 0)
                })
              }
            >
              <i className='fa -solid fa-minus' />
            </button>
          </span>
        </div>
      </div>

      {/* BOOK */}
      <div>
        <h1 className={style.subtitle}>Book</h1>
        {season.book ? (
          <PDFViewer src={season.book} />
        ) : (
          <h1>No book to display</h1>
        )}
        <form action={uploadBook}>
          <label>
            <span>Upload a file</span>
            <input type='file' name='file' />
          </label>
          <button type='submit'>Submit</button>
        </form>
        <h2>Web path: {season.book}</h2>
      </div>

      {/* ROBOT */}
      <h2 className={style.subtitle}>This year's robot:</h2>
      <div>
        <h1>Robot description:</h1>
        <textarea
          value={season.robotdesc}
          onChange={(e) => handleInputChange(e, 'robotdesc')}
        />
        <h2>3D Model:</h2>
        {season.robot3D ? (
          <ModelViewer src={season.robot3D ? season.robot3D : ''} />
        ) : (
          <h1>No model to display</h1>
        )}

        <form action={upload3D}>
          <label>
            <span>Upload a file</span>
            <input type='file' name='file' />
          </label>
          <button type='submit'>Submit</button>
        </form>
      </div>

      <h2 className={style.subtitle}>Our season:</h2>

      {/* DEMOS */}

      <h1 className='title'>DEMOS</h1>

      {demos.map((demo, index) => (
        <div
          key={index}
          className='flex flex-col gap-[2rem] border-[var(--accentColor)] border-[0.3rem] p-[2rem] justify-center items-center fade mb-[4rem]'
        >
          <input
            type='text'
            className='title'
            defaultValue={season.demostitle ? season.demostitle[index] : ''}
            onChange={(e) => {
              const updatedTitles = [...(season.demostitle || [])];
              updatedTitles[index] = e.target.value;
              setSeason({ ...season, demostitle: updatedTitles });
            }}
          />

          <textarea
            value={demo}
            onChange={(e) => handleDemoChange(index, e.target.value)}
          />

          <h1>Demo Photo:</h1>
          {season.demoImage![index] ? (
            <img
              src={season.demoImage![index]}
              alt='image couldnt load'
              referrerPolicy='no-referrer'
              className='max-w-[40rem]'
            />
          ) : (
            <h2>No image to display</h2>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              let newPhotos = season.demoImage!;
              newPhotos[index] = VerifyImageLink(newPhotos[index]);
              setSeason({ ...season, demoImage: newPhotos });
              console.log(newPhotos[index]);
            }}
          >
            <h2>*Press enter after pasting an image from Google Drive</h2>
            <input
              value={season.demoImage![index]}
              onChange={(e) => {
                let newPhotos = season.demoImage!;
                newPhotos[index] = e.target.value;
                setSeason({ ...season, demoImage: newPhotos });
              }}
            />
          </form>

          <button
            onClick={() => {
              if (season.demosPosts![index])
                getBlogs(parseInt(season.demosPosts![index].split('=')[1]));
              else getBlogs();
              setBlogLinkindex(index);
              setBlogLinkType('Demo');
            }}
          >
            Link post
          </button>

          <button
            onClick={() => {
              let updateddemos = [...(demos || [])];
              let updatedTitles = [...(season.demostitle || [])];
              updateddemos.splice(index, 1);
              updatedTitles.splice(index, 1);
              setSeason({ ...season, demostitle: updatedTitles });
              setDemos(updateddemos);
            }}
          >
            Delete
          </button>
        </div>
      ))}
      <button
        onClick={addDemo}
        className='border-[var(--accentColor)] border-[0.3rem] p-[2rem]'
      >
        <i className='fa-solid fa-plus' />
        <br />
        ADD DEMO
      </button>

      <h1 className='title'>MEETS</h1>

      {/* MEETS */}

      {meets.map((meet, index) => (
        <div
          key={index}
          className='flex flex-col gap-[2rem] border-[var(--accentColor)] border-[0.3rem] p-[2rem] justify-center items-center fade mb-[4rem]'
        >
          <input
            type='text'
            className='title'
            defaultValue={season.meetstitle ? season.meetstitle[index] : ''}
            onChange={(e) => {
              const updatedTitles = [...(season.meetstitle || [])];
              updatedTitles[index] = e.target.value;
              setSeason({ ...season, meetstitle: updatedTitles });
            }}
          />

          <textarea
            value={meet}
            onChange={(e) => handleMeetChange(index, e.target.value)}
          />

          <h1>Meet Photo:</h1>
          {season.meetImage![index] ? (
            <img
              src={season.meetImage![index]}
              alt='image couldnt load'
              referrerPolicy='no-referrer'
              className='max-w-[40rem]'
            />
          ) : (
            <h2>No image to display</h2>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              let newPhotos = season.meetImage!;
              newPhotos[index] = VerifyImageLink(newPhotos[index]);
              setSeason({ ...season, meetImage: newPhotos });
              console.log(newPhotos[index]);
            }}
          >
            <h2>*Press enter after pasting an image from Google Drive</h2>
            <input
              value={season.meetImage![index]}
              onChange={(e) => {
                let newPhotos = season.meetImage!;
                newPhotos[index] = e.target.value;
                setSeason({ ...season, meetImage: newPhotos });
              }}
            />
          </form>

          <button
            onClick={() => {
              if (season.meetPosts![index])
                getBlogs(parseInt(season.meetPosts![index].split('=')[1]));
              else getBlogs();
              setBlogLinkindex(index);
              setBlogLinkType('Meet');
            }}
          >
            Link post
          </button>

          <button
            onClick={() => {
              let updatedMeets = [...(meets || [])];
              let updatedTitles = [...(season.meetstitle || [])];
              updatedMeets.splice(index, 1);
              updatedTitles.splice(index, 1);
              setSeason({ ...season, meetstitle: updatedTitles });
              setMeets(updatedMeets);
            }}
          >
            Delete
          </button>
        </div>
      ))}
      <button
        onClick={addMeet}
        className='border-[var(--accentColor)] border-[0.3rem] p-[2rem]'
      >
        <i className='fa-solid fa-plus' />
        <br />
        ADD MEET
      </button>

      {/* REGIONALS */}

      <div className='flex flex-col gap-[2rem] border-[var(--accentColor)] border-[0.3rem] p-[2rem] justify-center items-center fade mb-[4rem]'>
        <h1 className='title'>Regionals:</h1>
        <div>
          <textarea
            value={season.regionals || ''}
            onChange={(e) => handleInputChange(e, 'regionals')}
          />
        </div>
        <h1>Photo:</h1>
        {season.regionalImage ? (
          <img
            src={season.regionalImage}
            alt='image couldnt load'
            referrerPolicy='no-referrer'
            className='max-w-[40rem]'
          />
        ) : (
          <h2>No image to display</h2>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSeason({
              ...season,
              regionalImage: VerifyImageLink(season.regionalImage!)
            });
          }}
        >
          <h2>*Press enter after pasting an image from Google Drive</h2>
          <input
            value={season.regionalImage!}
            onChange={(e) => {
              setSeason({ ...season, regionalImage: e.target.value });
            }}
          />
        </form>

        <button
          onClick={() => {
            if (season.regionalPost)
              getBlogs(parseInt(season.regionalPost.split('=')[1]));
            else getBlogs();
            setBlogLinkindex(0);
            setBlogLinkType('Regional');
          }}
        >
          Link post
        </button>
      </div>

      {/* NATIONALS */}

      <div className='flex flex-col gap-[2rem] border-[var(--accentColor)] border-[0.3rem] p-[2rem] justify-center items-center fade mb-[4rem]'>
        <h1 className='title'>Nationals:</h1>
        <div>
          <textarea
            value={season.nationals || ''}
            onChange={(e) => handleInputChange(e, 'nationals')}
          />
        </div>
      </div>

      {/* INTERNATIONALS */}

      <div className='flex flex-col gap-[2rem] border-[var(--accentColor)] border-[0.3rem] p-[2rem] justify-center items-center fade mb-[4rem]'>
        <h1 className='title'>Internationals:</h1>
        <div>
          <textarea
            value={season.internationals || ''}
            onChange={(e) => handleInputChange(e, 'internationals')}
          />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className={style.sidebar}>
        <h1 className='text-xl mb-[1rem]'>Settings</h1>
        <div className='flex flex-column flex-wrap justify-center items-center gap-[1rem]'>
          <div>
            <h2>Main Color</h2>
            <input
              type='color'
              defaultValue={season.mainColor}
              onChange={(e) => handleInputChange(e, 'mainColor')}
            />
          </div>

          <div>
            <h2>Background color</h2>
            <input
              type='color'
              defaultValue={season.bgColor}
              onChange={(e) => handleInputChange(e, 'bgColor')}
            />
          </div>

          <div>
            <h2>Accent color</h2>
            <input
              type='color'
              defaultValue={season.accentColor}
              onChange={(e) => handleInputChange(e, 'accentColor')}
            />
          </div>
        </div>
        <div className='flex flex-row flex-nowrap gap-[1rem] justify-evenly align-middle items-center m-[1rem] border-t-[0.2rem] border-solid border-[var(--accentColor)] pt-[2rem]'>
          <h2 className='text-[2rem] font-bold'>Published</h2>
          <label className='switch'>
            <input
              defaultChecked={season.published}
              type='checkbox'
              onChange={(b) => {
                handleInputChange(b, 'published');
              }}
            />
            <span className='slider round'></span>
          </label>
        </div>
        <button
          onClick={async () => {
            await setDefaultById(season.id);
            setSeason({ ...season, default: true, published: true });
            save();
          }}
        >
          Set as active season
        </button>
        <div className='flex flex-col gap-[2rem] border-t-[0.2rem] border-solid border-[var(--accentColor)] pt-[2rem] items-center'>
          <button className='bg-blue-600 border-0' onClick={save}>
            Save
          </button>
          <Link className='text-red-600' href='/admin/dashboard'>
            Exit
          </Link>
          <button
            className='mt-2rem font-[4rem] bg-red-600'
            onClick={() => {
              setDelDialog(true);
            }}
          >
            DELETE
          </button>
        </div>
      </div>

      {/* POPUPS */}

      <PopUp
        visible={deleteDialog}
        text='Are you sure you want to delete this season?'
        labelYes='Delete season'
        yesColor='bg-red-600'
        noColor='bg-blue-600'
        actionYes={() => {
          removeSeason(season.id), router.push('/admin/dashboard');
        }}
        labelNo='Cancel'
        actionNo={() => {
          setDelDialog(!deleteDialog);
        }}
      />

      <PopUpCust visible={blogLinkIndex !== -1}>
        <div>
          <h1>Link Blog</h1>
          <div className='overflow-y-auto border-[0.2rem] border-[var(--accentColor)] h-[30rem] mt-[1rem] mb-[1rem]'>
            <button
              className='w-[100%]'
              onClick={() => {
                setSelBlog(undefined);
              }}
            >
              No Blog
            </button>
            {blogs?.map((b) => (
              <button
                className='w-[100%]'
                key={b.id}
                onClick={() => {
                  setSelBlog(b);
                }}
              >
                <h2>{b.title}</h2>
              </button>
            ))}
          </div>
          <h2>Selected blog:{selBlog?.title}</h2>
          <button
            className='bg-slate-500'
            onClick={() => {
              setBlogLinkindex(-1);
            }}
          >
            Cancel
          </button>
          <button className='bg-blue-600' onClick={linkBlog}>
            Confirm
          </button>
        </div>
      </PopUpCust>
    </div>
  );
};

export default FTCEdit;
