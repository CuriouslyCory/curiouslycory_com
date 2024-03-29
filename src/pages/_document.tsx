import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" key="icon" />
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com"
            key="google-preconnect1"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            key="google-preconnect2"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;700&family=Raleway:ital,wght@0,100;0,400;0,700;1,100;1,400;1,700&display=swap"
            rel="stylesheet"
            key="google-fonts"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
