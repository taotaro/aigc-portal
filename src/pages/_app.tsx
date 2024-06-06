import { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';
import { useRouter } from "next/router";
import { AppProvider } from '@/contexts';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NProgress from "nprogress";
import '@/config/translation';
import "nprogress/nprogress.css";
import './globals.css';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page: any) => page);
    const router = useRouter();

    useEffect(() => {
        router.events.on("routeChangeStart", () => {
            NProgress.start();
        });
        router.events.on("routeChangeComplete", () => {
            NProgress.done();
        });
        router.events.on("routeChangeError", () => {
            NProgress.done();
        });
    }, []);

    return (
        <React.Fragment>
            <AppProvider>
                <QueryClientProvider client={queryClient}>
                    {getLayout(<Component {...pageProps} />)}
                </QueryClientProvider>
            </AppProvider>
        </React.Fragment>
    );
}
