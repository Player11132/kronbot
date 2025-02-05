'use server';

import { db } from '@/db/db';
import { posts } from '@/db/schema/posts';
import { eq } from 'drizzle-orm';

const filters = ['Announcments', 'Events', 'Technical', 'Other'];

export type Post = typeof posts.$inferSelect;

export async function getPosts(filter: string, all: boolean): Promise<Post[]> {
  let data;
  if (!all) data = db.select().from(posts).where(eq(posts.published, true));
  else {
    data = db.select().from(posts);
  }
  var Posts: Array<Post> = new Array<Post>();

  (await data).map((post) => {
    if (filters.includes(filter)) {
      if (post.cathegory == filter) {
        Posts.push(post);
      }
    } else Posts.push(post);
  });

  return Posts;
}

export async function getPostById(id: number): Promise<Post> {
  var post = await db.select().from(posts).where(eq(posts.id, id));
  return post[0];
}

export async function createEmptyPost(title: string): Promise<number> {
  let post = await db
    .insert(posts)
    .values({
      title: title,
      cathegory: 'Announcments',
      thumbnailURL: '/logo.svg',
      body: '# New Post'
    })
    .returning();
  return post[0].id;
}

export async function editPost(post: Post) {
  await db
    .update(posts)
    .set({
      title: post.title,
      cathegory: post.cathegory as
        | 'Announcments'
        | 'Events'
        | 'Technical'
        | 'Other',
      thumbnailURL: post.thumbnailURL,
      body: post.body,
      published: post.published
    })
    .where(eq(posts.id, post.id));
}

export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));
}
