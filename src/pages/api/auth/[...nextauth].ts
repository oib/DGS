import NextAuth from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/server/db'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Add your authentication providers here
    // Example: GoogleProvider, EmailProvider, etc.
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
}

export default NextAuth(authOptions)
