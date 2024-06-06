import React, { FC, ReactNode, useEffect } from "react";
import toast from "react-hot-toast";
import { I18_LOCAL_STORAGE_KEY } from "@/config/translation";
import { NextUIProvider } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useAuthStore } from "@/contexts/store";

const AppContenxt = React.createContext({});

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { resetUserInfo, cleanUserInfo } = useAuthStore();
    const { i18n } = useTranslation();
    const router = useRouter();

    const initI18Next = () => {
        if (!i18n.changeLanguage) return;
        const lang = localStorage.getItem(I18_LOCAL_STORAGE_KEY);
        if (!lang) return;
        i18n.changeLanguage(lang);
    }

    useEffect(() => {
        initI18Next();
    }, []);

    return (
        <AppContenxt.Provider value={{}}>
            <NextUIProvider navigate={router.push}>
                {children}
            </NextUIProvider>
        </AppContenxt.Provider>
    )
}

export { AppContenxt, AppProvider }