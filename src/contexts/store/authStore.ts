import { create } from "zustand";
import { IAccountInfo } from "@/api/account/types";
import { User } from "@/api/common/types";
import { TokenLocalStorageKey, DefaultUserInfo } from "@/config/constant";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";
import { getPaymentBoundInfo, getNetworkList } from "@/api/payments/index";
import { NetworkInfo, TPaymentBoundInfo } from "@/api/payments/types";

type TUpdateUserPayload = ({ [key in (keyof User)]?: User[key] });
type TUpdateAccountPayload = ({ [key in (keyof IAccountInfo)]?: IAccountInfo[key] });

interface Action {
    resetUserInfo: (userInfo: User) => void;
    cleanUserInfo: () => void;
    updateUserInfo: (info: TUpdateUserPayload) => void;
    resellerResetAccountInfo: (accountInfo: IAccountInfo | null) => void;
    resellerUpdateAccountInfo: (info: TUpdateAccountPayload) => void;
    setToken: (token: User["token"]) => void;
    getPaymentBoundInfo: (reload?: boolean) => Promise<null | TPaymentBoundInfo>;
    getNetworkList: (reload?: boolean, method?: User['defaultPaymentMethod']) => Promise<NetworkInfo[]>;
}

const persistStoreLocalStorageKey = "binary-owl-auth-store-1";

const DefaultAccountInfo: IAccountInfo = {
    bindId: null,
    provider: null,
    providerName: "",
    name: "",
    accountId: "",
    createTime: "",
    accessKey: "",
    accessSecret: "",
    regionId: "",
    isReseller: undefined,
    email: "",
    verified: false,
    current: false,
};

export const useAuthStore = create<{
    userInfo: null | User,
    accountInfo: null | IAccountInfo,
    paymentBoundInfo: null | TPaymentBoundInfo,
} & Action>()(
    persist(
        (set, get) => {
            return {
                /** 用户信息 */
                userInfo: { ...DefaultUserInfo },
                /** 账户信息 */
                accountInfo: { ...DefaultAccountInfo },
                /** Exapay绑定信息 */
                paymentBoundInfo: null,
                /** 重置当前用户信息 */
                resetUserInfo: (payload: User) => {
                    const name = payload.name || `${payload.firstName || ''} ${payload.lastName || ''}`;
                    const newUserInfo = { ...payload, name, isLogin: true };
                    if (payload.typeOfUser) {
                        newUserInfo.isReseller = payload.typeOfUser === 'reseller';
                        // 若是子账户，那么子账户的账户信息取至user-info接口返回
                        if (['sub-account', 'agent'].includes(payload.typeOfUser)) {
                            const accountInfo = {
                                isLogin: true,
                                provider: payload.provider!,
                                name: payload.name,
                                accountId: payload.accountId!,
                                isReseller: false,
                                email: payload.email,
                                current: true,
                            };
                            set({ accountInfo });
                        }
                    }
                    set({ userInfo: newUserInfo });
                },
                /** 更新当前用户信息 */
                updateUserInfo: (payload: TUpdateUserPayload) => {
                    const newUserInfo = { ...(get().userInfo || {}), ...payload };
                    set({ userInfo: newUserInfo as User });
                },
                /** Reseller重置当前账户信息 */
                resellerResetAccountInfo: (payload: IAccountInfo | null) => {
                    window.globalAccountInfo = payload;
                    if (!payload) {
                        set({ accountInfo: { ...DefaultAccountInfo, isReseller: true } });
                    } else {
                        set({ accountInfo: { ...payload, isReseller: true } });
                    }
                },
                /** Reseller更新当前账户信息 */
                resellerUpdateAccountInfo: (payload: TUpdateAccountPayload) => {
                    const newAccountInfo = { ...(get().accountInfo || {}), ...payload };
                    set({ accountInfo: newAccountInfo as IAccountInfo });
                },
                /** 设置token */
                setToken: (token: string) => {
                    localStorage.setItem(TokenLocalStorageKey, token);
                },
                /** 重置当前用户信息和账户信息 */
                cleanUserInfo: () => {
                    set({
                        userInfo: { ...DefaultUserInfo },
                        accountInfo: { ...DefaultAccountInfo },
                        paymentBoundInfo: null,
                    });
                    localStorage.removeItem(persistStoreLocalStorageKey);
                    localStorage.removeItem(TokenLocalStorageKey);
                },
                /** 获取用户绑定的支付网关信息 */
                async getPaymentBoundInfo(reload?: boolean) {
                    let paymentBoundInfo = get().paymentBoundInfo;
                    const userInfo = get().userInfo;
                    if (!paymentBoundInfo || reload === true) {
                        const [error, result] = await getPaymentBoundInfo();
                        paymentBoundInfo = result;
                        const hasPaymentBound = !!result;
                        set({
                            paymentBoundInfo,
                            ...(userInfo ? ({ userInfo: { ...userInfo, hasPaymentBound } }) : ({})),
                        });
                    }
                    return paymentBoundInfo;
                },
                /** 获取支付网络列表 */
                async getNetworkList(reload?: boolean, method?: User['defaultPaymentMethod']) {
                    if (!get().userInfo?.networkList || reload === true) {
                        const [error, result] = await getNetworkList(method ? ({ method }) : ({}));
                        if (Array.isArray(result) && result.length) {
                            const newUserInfo = { ...(get().userInfo || {}), networkList: result };
                            set({ userInfo: newUserInfo as User });
                        }
                    }
                    const networkList = (get().userInfo?.networkList || []);
                    return networkList;
                },
            }
        },
        {
            name: persistStoreLocalStorageKey,
            partialize: (state) => {
                return {
                    ...state,
                    // userInfo: Object.fromEntries(Object.entries(state.userInfo).filter(([key]) => !['isLogin'].includes(key))),
                    // accountInfo: Object.fromEntries(Object.entries(state.accountInfo).filter(([key]) => !['isLogin'].includes(key))),
                    userInfo: null,
                    accountInfo: null,
                    paymentBoundInfo: null,
                };
            }
        }
    )
);

export const useAuthHydration = () => {
    const [hydrated, setHydrated] = useState(useAuthStore.persist.hasHydrated);

    useEffect(() => {
        const unsubFinishHydration = useAuthStore.persist.onFinishHydration(() => setHydrated(true));

        setHydrated(useAuthStore.persist.hasHydrated());

        return () => {
            unsubFinishHydration();
        };
    }, []);

    return hydrated;
};
