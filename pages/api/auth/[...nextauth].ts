import dbConnect from "@lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@models/User";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          await dbConnect();
          const candidate = await User.findOne({ email: credentials!.email });
          if (!candidate) {
            return null;
          }
          const areSame = await bcrypt.compare(
            credentials!.password,
            candidate.password
          );
          if (!areSame) {
            return null;
          }
          return candidate;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
