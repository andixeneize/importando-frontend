import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { login } from '@services/login'

const authOptions = req => ({
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
							console.log('RESPONSE: ', res.data)
							console.log('STATUS: ', res.status)
							if (res.status === 200) {
								const user = {
									accessToken: res.data,
								}
								return user
							} else {
								return null
							}
						})
						.catch(error => {
							console.log('Error: ', error)
							throw new Error(error)
						}) || null
				)
			},
		}),
	],
	callbacks: {
		jwt({ token, user }) {
			if (req.query.updateToken !== undefined) {
				token.accessToken = req.query.updateToken
			}
			if (user) {
				token.accessToken = user.accessToken
			}
			return token
		},
		session: ({ session, token }) => {
			if (token) {
				session.user.accessToken = token.accessToken
			}
			return session
		},
	},
	pages: {
		signIn: '/login',
	},
})

export default async (req, res) => {
	return NextAuth(req, res, authOptions(req))
}