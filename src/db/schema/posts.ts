
import { date, pgTable, serial, text, pgEnum, boolean } from 'drizzle-orm/pg-core';

export const postCategories = pgEnum('post_cathegories', [
  'Announcments',
  'Events',
  'Technical',
  'Other'
]);

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  cathegory: postCategories('category').notNull(),
  body: text('body').notNull(),
  thumbnailURL: text('thumbnail_url').notNull(),
  date: date('date').defaultNow(),
  published: boolean('published').default(false),
});
