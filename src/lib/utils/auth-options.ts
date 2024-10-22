import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prismadb from '@/lib/prismaDb';
import { compare } from 'bcrypt';
import { User } from '@prisma/client';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'example@gmail.com',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password',
				},
			},
			async authorize(credentials) {
				if (!credentials) return null;

				const { email, password } = credentials;
				if (!email || !password) return null;

				const user = await prismadb.user.findFirst({
					where: {
						email,
					},
				});
				if (!user) return null;

				const passwordCorrect = await compare(password, user.password);
				if (!passwordCorrect) return null;

				return user;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			const typedUser = user as User;
			if (user) {
				return {
					...token,
					userId: typedUser.id,
					isAdmin: typedUser.is_admin,
				};
			}

			return token;
		},
		async session({ session, token }) {
			return {
				...session,
				user: {
					...session.user,
					userId: token.userId,
					isAdmin: token.isAdmin, 
				},
			};
		},
	},
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/auth/login',
	},
	secret: process.env.NEXTAUTH_SECRET,
	debug: process.env.NODE_ENV === 'development',
};
