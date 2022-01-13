CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar UNIQUE,
  "password" varchar,
  "first_name" varchar,
  "last_name" varchar,
  "languages_to_learn" varchar,
  "languages_know" varchar,
  "created_at" timestamp
);

CREATE TABLE "messages" (
  "id" SERIAL PRIMARY KEY,
  "author_id" int,
  "receiver_id" int,
  "text" varchar,
  "created_at" timestamp
);

CREATE TABLE "followers" (
  "user_id" int,
  "follower_id" int,
  PRIMARY KEY ("user_id", "follower_id")
);

ALTER TABLE "messages" ADD FOREIGN KEY ("author_id") REFERENCES "users" ("id");

ALTER TABLE "messages" ADD FOREIGN KEY ("receiver_id") REFERENCES "users" ("id");

ALTER TABLE "followers" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "followers" ADD FOREIGN KEY ("follower_id") REFERENCES "users" ("id");

