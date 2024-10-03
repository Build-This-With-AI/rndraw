import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, db, sessions, users, verificationTokens } from "@/db/schema";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [Google],
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      if (nextUrl.pathname === "/") {
        return true;
      }

      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});
