import { LibsqlDialect } from "@libsql/kysely-libsql";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: new LibsqlDialect({
    url: process.env.TURSO_DATABASE_URL || "",
    authToken: process.env.TURSO_AUTH_TOKEN || "",
  }),
});
