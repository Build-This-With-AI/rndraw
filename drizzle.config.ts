import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { env } from "@/env.mjs";

config({ path: ".env" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
});
