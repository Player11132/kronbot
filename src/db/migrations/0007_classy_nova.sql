ALTER TABLE "seasons" ALTER COLUMN "meetstitle" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "seasons" ALTER COLUMN "internationals" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "seasons" ADD COLUMN "awards" text[];--> statement-breakpoint
ALTER TABLE "seasons" ADD COLUMN "awardsdesc" text[];--> statement-breakpoint
ALTER TABLE "seasons" ADD COLUMN "gallery" text[];