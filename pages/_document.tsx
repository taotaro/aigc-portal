import { Html, Head, Main, NextScript } from 'next/document';

const MyDocument = () => {
    return (
        <Html>
            <Head>
                <script charset="utf-8" type="text/javascript"
                    src="https://g.alicdn.com/apsara-media-box/imp-web-player/2.25.1/aliplayer-min.js"></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

export default MyDocument;