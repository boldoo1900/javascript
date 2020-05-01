import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

type Props = {}

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html {/* lang="ja" */} >
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>

        <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>

      </Html>
    )
  }
}

export default Document