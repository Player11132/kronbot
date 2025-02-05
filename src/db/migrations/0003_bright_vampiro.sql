DO $$ BEGIN
 CREATE TYPE "public"."cathegory_enum" AS ENUM('Mentor', 'Member', 'Volunteer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "cathegory" "cathegory_enum" NOT NULL;