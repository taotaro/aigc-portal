import Head from "next/head";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { EnvNotice } from "@/components/layout";
import { LayoutProps } from "../types";
import { SiteName, WebsiteLogo } from "@/config/constant";

const BasicLayout: LayoutProps = ({ children }) => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t(`title.${router.pathname}`)}</title>
                <meta name="description" content="crypto payment" />
                <link rel="icon" href={WebsiteLogo} />
            </Head>

            <main>
                {children}
                <EnvNotice />
            </main>
            <Toaster
                position="bottom-center"
                reverseOrder={true}
                containerStyle={{ zIndex: 10001 }}
            />
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