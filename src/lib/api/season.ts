'use server';

import { db } from '@/db/db';
import { seasons } from '@/db/schema/seasons';
import { and, eq } from 'drizzle-orm';
import fs from 'node:fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

export type Season = typeof seasons.$inferSelect;

export async function getSeasonById(id: number): Promise<Season> {
  let season = await db.select().from(seasons).where(eq(seasons.id, id));
  return season[0];
}

export async function saveFileToPublic(
  _path: string,
  formData: FormData
): Promise<string> {
  const file = formData.get('file') as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const ath = path.join(_path + '/' + file.name);
  ath.replaceAll(' ', '%');
  console.log(ath);
  await fs.writeFile(path.join('./public' + ath), buffer);

  return ath;
}

export async function deleteFile(_path: string) {
  fs.unlink(_path);
}

export async function getDefaultSeason(): Promise<Season> {
  const season = await db
    .select()
    .from(seasons)
    .where(eq(seasons.default, true));

  return season[0];
}

export async function setDefaultById(id: number) {
  await db
    .update(seasons)
    .set({ default: false })
    .where(eq(seasons.default, true));
  await db.update(seasons).set({ default: true }).where(eq(seasons.id, id));
}

export async function getSeasons(
  published: boolean,
  inclDefault?: boolean
): Promise<Array<Season>> {
  if (published) {
    const seasonsData = inclDefault
      ? await db.select().from(seasons).where(eq(seasons.published, true))
      : await db
          .select()
          .from(seasons)
          .where(and(eq(seasons.default, false), eq(seasons.published, true)));

    return seasonsData;
  } else {
    const seasonsData = inclDefault
      ? await db.select().from(seasons)
      : await db.select().from(seasons).where(eq(seasons.default, false));

    return seasonsData;
  }
}

export async function editSeason(season: Season) {
  await db.update(seasons).set(season).where(eq(seasons.id, season.id));
}

export async function addSeason(): Promise<number> {
  let season = await db
    .insert(seasons)
    .values({
      default: false,
      name: 'New season',
      logo: '/logo.svg',
      description: 'Description of the new season',
      wins: 0,
      points: 0,
      mathcesplayed: 0,
      robot3D: null,
      robotdesc: '',
      meetstitle: [],
      meets: [],
      meetImage: [],
      meetPosts: [],
      demos: [],
      demostitle: [],
      demoImage: [],
      demosPosts: [],
      regionals: '',
      regionalImage: '',
      regionalPost: '',
      nationals: '',
      nationalImage: '',
      nationalPost: '',
      internationals: '',
      internationalImage: '',
      internationalPost: '',
      awards: [],
      awardsdesc: [],
      bgColor: '#000000',
      mainColor: '#565656',
      accentColor: '#FF0000',
      published: false
    })
    .returning();
  return season[0].id;
}

export async function removeSeason(id: number) {
  await db.delete(seasons).where(eq(seasons.id, id));
}
