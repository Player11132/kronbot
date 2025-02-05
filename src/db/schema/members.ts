import { pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role_enum', [
  'Mechanic',
  '3D Modeler',
  'Programmer',
  'Public Relations'
]);
export const cathegoryEnum = pgEnum('cathegory_enum', [
  'Mentor',
  'Member',
  'Volunteer'
]);

export const members = pgTable('members', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  role: roleEnum('role').notNull(),
  desc: text('desc').notNull().default(''),
  cathegory: cathegoryEnum('cathegory').notNull(),
  photoURL: text('photo_url').notNull()
});
