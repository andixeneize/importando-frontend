import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { login } from '@services/login'
import jwtDecode from 'jwt-decode'

export const authOptions = {
	providers: [
		CredentialsProvider({
			type: 'credentials',
			async authorize(credentials) {
				const body = {
					username: credentials?.username,
					password: credentials?.password,
					lang: credentials?.locale,
				}

				return (
					login(body)
						.then(res => {
							if (res.status === 200) {
								const user = {
									username: res.data.data.username,
									accessToken: res.data.data.token,
									lang: res.data.data.lang,
									roles: jwtDecode(res.data.data.token).permissions
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
				token.username = user.username
				token.accessToken = user.accessToken
				token.lang = user.lang
				token.roles = user.roles
			}
			return token
		},
		session: ({ session, token }) => {
			if (token) {
				session.user.username = token.username
				session.user.accessToken = token.accessToken
				session.user.lang = token.lang
				session.user.roles = token.roles
			}
			return session
		},
	},
	pages: {
		signIn: '/login',
	},
}

export default NextAuth(authOptions)
