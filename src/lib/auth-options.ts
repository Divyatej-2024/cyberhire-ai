import { type NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // JWT sessions do not require a database adapter.
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      // Attach user role from token if needed
      const role = (token as typeof token & { role?: string })?.role;
      if (role) (session.user as typeof session.user & { role?: string }).role = role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) (token as typeof token & { role?: string }).role = (user as { role?: string }).role;
      return token;
    },
  },
};
