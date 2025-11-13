import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import client from "@/lib/db"
import { Adapter } from "next-auth/adapters"
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60 // 7 days
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60 // 7 days
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        ;(token.accessToken = account.access_token), (token.id = user.id)
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.accessToken = token.accessToken
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(client) as Adapter
}
