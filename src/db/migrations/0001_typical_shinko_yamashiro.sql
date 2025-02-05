ALTER TABLE "admins" RENAME COLUMN "email" TO "username";--> statement-breakpoint
ALTER TABLE "admins" DROP CONSTRAINT "admins_email_unique";--> statement-breakpoint
ALTER TABLE "admins" ADD CONSTRAINT "admins_username_unique" UNIQUE("username");