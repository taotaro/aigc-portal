import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useEffect, useState } from "react";

interface Action {
    setConnectPaymentGatewayModalState: (show: boolean) => void;
}

const persistStoreLocalStorageKey = "binary-owl-global-state-store";

export const useGlobalStateStore = create<{
    canShowConnectPaymentGatewayModal: boolean,
} & Action>()(
    persist(
        (set, get) => {
            return {
                /** 是否展示Connect payment gateway Modal */
                canShowConnectPaymentGatewayModal: false,
                setConnectPaymentGatewayModalState: (val) => {
                    set({ canShowConnectPaymentGatewayModal: val });
                }
            }
        },
        {
            name: persistStoreLocalStorageKey,
            partialize: (state) => {
                return {
                    ...state,
                    canShowConnectPaymentGatewayModal: false,
                };
            }
        }
    )
);

export const useGlobalStateHydration = () => {
    const [hydrated, setHydrated] = useState(useGlobalStateStore.persist.hasHydrated);

    useEffect(() => {
        const unsubFinishHydration = useGlobalStateStore.persist.onFinishHydration(() => setHydrated(true));

        setHydrated(useGlobalStateStore.persist.hasHydrated());

        return () => {
            unsubFinishHydration();
        };
    }, []);

    return hydrated;
};
