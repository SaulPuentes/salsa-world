import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_links_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_links_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_links_locales" CASCADE;
  DROP TABLE "_pages_v_version_hero_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links_locales" CASCADE;
  ALTER TABLE "pages" DROP CONSTRAINT "pages_hero_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_hero_hero_media_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_version_hero_media_idx";
  ALTER TABLE "pages_hero_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference';
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_url" varchar;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'default';
  ALTER TABLE "pages_locales" ADD COLUMN "hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "pages_locales" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "pages_locales" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "_locale" "_locales" NOT NULL;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference';
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_url" varchar;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'default';
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_hero_media_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_links_locale_idx" ON "pages_hero_links" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_blocks_cta_links_locale_idx" ON "pages_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_media_idx" ON "pages_locales" USING btree ("hero_media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_links_locale_idx" ON "_pages_v_version_hero_links" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_locale_idx" ON "_pages_v_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v_locales" USING btree ("version_hero_media_id");
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_type";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_rich_text";
  ALTER TABLE "pages" DROP COLUMN IF EXISTS "hero_media_id";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_type";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_rich_text";
  ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_hero_media_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "pages_hero_links_locales" (
  	"link_type" "enum_pages_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_hero_links_link_appearance" DEFAULT 'default',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "pages_blocks_cta_links_locales" (
  	"link_type" "enum_pages_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_version_hero_links_locales" (
  	"link_type" "enum__pages_v_version_hero_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_version_hero_links_link_appearance" DEFAULT 'default',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "_pages_v_blocks_cta_links_locales" (
  	"link_type" "enum__pages_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_locales" DROP CONSTRAINT "pages_locales_hero_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_locales" DROP CONSTRAINT "_pages_v_locales_version_hero_media_id_media_id_fk";
  
  DROP INDEX IF EXISTS "pages_hero_links_locale_idx";
  DROP INDEX IF EXISTS "pages_blocks_cta_links_locale_idx";
  DROP INDEX IF EXISTS "pages_hero_hero_media_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_links_locale_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_cta_links_locale_idx";
  DROP INDEX IF EXISTS "_pages_v_version_hero_version_hero_media_idx";
  ALTER TABLE "pages" ADD COLUMN "hero_type" "enum_pages_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "pages" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "pages" ADD COLUMN "hero_media_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_type" "enum__pages_v_version_hero_type" DEFAULT 'lowImpact';
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_media_id" integer;
  DO $$ BEGIN
   ALTER TABLE "pages_hero_links_locales" ADD CONSTRAINT "pages_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "pages_blocks_cta_links_locales" ADD CONSTRAINT "pages_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_version_hero_links_locales" ADD CONSTRAINT "_pages_v_version_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v_blocks_cta_links_locales" ADD CONSTRAINT "_pages_v_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_hero_links_locales_locale_parent_id_unique" ON "pages_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "pages_blocks_cta_links_locales_locale_parent_id_unique" ON "pages_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_version_hero_links_locales_locale_parent_id_unique" ON "_pages_v_version_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "_pages_v_blocks_cta_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  DO $$ BEGIN
   ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_hero_media_id_media_id_fk" FOREIGN KEY ("version_hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "pages_hero_hero_media_idx" ON "pages" USING btree ("hero_media_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_version_hero_version_hero_media_idx" ON "_pages_v" USING btree ("version_hero_media_id");
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_hero_links" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "hero_type";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "hero_rich_text";
  ALTER TABLE "pages_locales" DROP COLUMN IF EXISTS "hero_media_id";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "_locale";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_type";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_url";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_label";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN IF EXISTS "link_appearance";
  ALTER TABLE "_pages_v_locales" DROP COLUMN IF EXISTS "version_hero_type";
  ALTER TABLE "_pages_v_locales" DROP COLUMN IF EXISTS "version_hero_rich_text";
  ALTER TABLE "_pages_v_locales" DROP COLUMN IF EXISTS "version_hero_media_id";`)
}
