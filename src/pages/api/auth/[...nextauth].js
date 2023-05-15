import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { login } from '@services/login'

export const authOptions = {
	providers: [
		CredentialsProvider({
			type: 'credentials',
			async authorize(credentials) {
				const body = {
					mail: credentials?.mail,
					password: credentials?.password,
				}

				return (
					login(body)
						.then(res => {
							if (res.status === 200) {
								const user = {
									mail: res.data.data.mail,
									accessToken: res.data.data.token,
								}
								return user
							} else {
								return null
							}
						})
						.catch(error => {
							throw new Error(error.response.data.message)
						}) || null
				)
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.mail = user.mail
				token.accessToken = user.accessToken
			}
			return token
		},
		session: ({ session, token }) => {
			if (token) {
				session.user.mail = token.mail
				session.user.accessToken = token.accessToken
			}
			return session
		},
	},
	pages: {
		signIn: '/login',
	},
}

export default NextAuth(authOptions)
