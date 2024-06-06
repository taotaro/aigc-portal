import Head from "next/head";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { LayoutProps } from "../types";

const BasicLayout: LayoutProps = ({ children }) => {
    const router = useRouter();
    return (
        <>
            <Head>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta
                        name="description"
                        content="HKTEC 香港的士交易中心 阿里雲香港未來教室 暨「雲馳通義 ‧ 洞見萬相千問」生成式 AI 校際比賽發佈會"
                    ></meta>
                    <meta
                        name="keywords"
                        content="HKTEC 的士牌照 香港的士交易中心 阿里雲香港未來教室 暨「雲馳通義 ‧ 洞見萬相千問」生成式 AI 校際比賽發佈會"
                    ></meta>
                    <meta name="google-site-verification" content="J_plchCoG7sFr3wJjxqbLLcrLYkibJ4wUDCmDsiy_gg" />
                    <meta property="fb:pages" content="153063591397681"></meta>
                    <meta name="robots" content="index, follow"></meta>
                    <link rel="manifest" href="/manifest.json" />
                    {/* <title>雲馳通義 ‧ 洞見萬相千問</title> */}
                    <script type="text/javascript" src="/js/jquery-2.1.4.min.js"></script>
                    <script type="text/javascript" src="/js/responsiveslides.min.js"></script>
                    <script type="text/javascript" src="/js/bootstrap.js"></script>
                </Head>
            </Head>

            <main>
                {children}
            </main>
        </>
    )
}

export const getBasicLayout = (page: ReactElement) => {
    return (
        <BasicLayout>
            {page}
        </BasicLayout>
    );
}

export default BasicLayout;