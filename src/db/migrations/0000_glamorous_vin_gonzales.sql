DO $$ BEGIN
 CREATE TYPE "public"."role_enum" AS ENUM('Mechanic', '3D Modeler', 'Programmer', 'Public Relations');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."post_cathegories" AS ENUM('Announcments', 'Events', 'Technical', 'Other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "members" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" "role_enum" NOT NULL,
	"photo_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category" "post_cathegories" NOT NULL,
	"body" text NOT NULL,
	"thumbnail_url" text NOT NULL,
	"date" date DEFAULT now()
);
