import React, { FC, ReactNode, useEffect } from "react";
import { useMounted } from "@/hooks";
import toast from "react-hot-toast";
import { I18_LOCAL_STORAGE_KEY } from "@/config/translation";
import { NextUIProvider } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { queryUserInfo } from "@/api/common/index";
import { TokenLocalStorageKey, NotAuthPages, DefaultUserInfo } from "@/config/constant";
import { useAuthStore } from "@/contexts/store";

const AppContenxt = React.createContext({});

const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { resetUserInfo, cleanUserInfo } = useAuthStore();
    const { i18n } = useTranslation();
    const router = useRouter();
    const isMounted = useMounted();

    const initI18Next = () => {
        if (!i18n.changeLanguage) return;
        const lang = localStorage.getItem(I18_LOCAL_STORAGE_KEY);
        if (!lang) return;
        i18n.changeLanguage(lang);
    }

    const handleQueryInfo = async () => {
        const token = localStorage.getItem(TokenLocalStorageKey);
        if (!token) {
            if (!NotAuthPages.includes(window.location.pathname)) {
                toast.error("Authentication has expired，please login again");
                const redirect = encodeURIComponent(`${window.location.pathname}${window.location.search}`)
                window.location.href = `${window.location.origin}/signin?redirect=${redirect}`;
            }
            cleanUserInfo();
            return;
        }
        const [error, userInfo] = await queryUserInfo();
        if (userInfo && typeof userInfo === 'object') {
            console.log("[用户信息]", userInfo);
            resetUserInfo(userInfo);
        }
    };

    useEffect(() => {
        if (!isMounted) return;
        initI18Next();
        handleQueryInfo();
    }, [isMounted]);

    if (!isMounted) {
        return <></>
    }

    return (
        <AppContenxt.Provider value={{}}>
            <NextUIProvider navigate={router.push}>
                {children}
            </NextUIProvider>
        </AppContenxt.Provider>
    )
}

export { AppContenxt, AppProvider }