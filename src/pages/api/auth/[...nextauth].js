import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { login } from '@services/login'

export const authOptions = {
	providers: [
		CredentialsProvider({
			type: 'credentials',
			async authorize(credentials) {
				const body = {
					email: credentials?.email,
					password: credentials?.password,
				}

				return (
					login(body)
						.then(res => {
							if (res.status === 200) {
								console.log('200')
								const user = {
									email: res.data.data.email,
									accessToken: res.data.data.token,
								}
								return user
							} else {
								return null
							}
						})
						.catch(error => {
							console.log('Error: ', error)
							throw new Error(error.response.data.message)
						}) || null
				)
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.email = user.email
				token.accessToken = user.accessToken
			}
			return token
		},
		session: ({ session, token }) => {
			if (token) {
				session.user.email = token.email
				session.user.accessToken = token.accessToken
			}
			return session
		},
	},
	pages: {
		signIn: '/',
	},
}

export default NextAuth(authOptions)
