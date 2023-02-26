import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(): JSX.Element {
	return (
		<Html>
			<Head>
				<meta charSet='utf-8' />
				<meta name='referrer' content='no-referrer' />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
