CREATE TABLE IF NOT EXISTS "seazon" (
	"id" serial PRIMARY KEY NOT NULL,
	"default" boolean NOT NULL,
	"name" text NOT NULL,
	"logoURL" text NOT NULL,
	"wins" integer NOT NULL,
	"points" integer NOT NULL,
	"robotmodelurl" text,
	"robotdesc" text NOT NULL,
	"meetstitle" text[] NOT NULL,
	"meets" text[] NOT NULL,
	"regionals" text NOT NULL,
	"nationals" text NOT NULL,
	"internationals" text NOT NULL,
	"bgcolor" text NOT NULL,
	"maincolor" text NOT NULL,
	"acColor" text NOT NULL
);
