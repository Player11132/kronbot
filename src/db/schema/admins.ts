import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const admins = pgTable('admins', {
    id: serial('id').primaryKey(),
    username: text('username').notNull().unique(),
    password: text('password').notNull()
})