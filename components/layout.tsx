import { createContext, ReactNode, useContext, useState, useEffect, useCallback } from "react";
import GlobalHeader from './global-header/index';
import Header from "./header/index";
import Footer from "./footer/index";
import { PageContextType } from "../types/contexts";
import { PageInfo } from "../types";

const Context = createContext<PageContextType>({ priceInfo: null } as PageContextType);

export default function Layout({ children, pageInfo }: { children: ReactNode, pageInfo: PageInfo }) {
    const context = {} as PageContextType;

    return (
        <Context.Provider value={context}>
            <GlobalHeader key='appHeader' />
            <main key='appMain'>
                <Header current={pageInfo.pageName} hideDot={pageInfo.pageName === 'INDEX'} />
                {children}
                <Footer />
            </main>
        </Context.Provider>
    )
}

export function usePageContext() {
    return useContext<PageContextType>(Context)
}