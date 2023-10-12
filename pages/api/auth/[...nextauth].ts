import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "mysecret",
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { password } = credentials as {
          email: string;
          password: string;
        };
        // perform you login logic
        // find out user from db
        if (password !== "impulsedental2023") {
          throw new Error("invalid credentials");
        }

        // if everything is fine
        return {
          id: "1234",
          name: "John Doe",
          email: "john@gmail.com",
          role: "admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
};

export default NextAuth(authOptions);