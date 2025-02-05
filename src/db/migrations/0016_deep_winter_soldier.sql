ALTER TABLE "seasons" RENAME COLUMN "rimgs" TO "rimg";--> statement-breakpoint
ALTER TABLE "seasons" RENAME COLUMN "nimgs" TO "nimg";--> statement-breakpoint
ALTER TABLE "seasons" RENAME COLUMN "iimgs" TO "iimg";--> statement-breakpoint
ALTER TABLE "seasons" ALTER COLUMN "mimgs" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "seasons" ALTER COLUMN "dimg" SET DATA TYPE text[];--> statement-breakpoint
ALTER TABLE "seasons" ALTER COLUMN "rimg" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "seasons" ALTER COLUMN "nimg" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "seasons" ALTER COLUMN "iimg" SET DATA TYPE text;