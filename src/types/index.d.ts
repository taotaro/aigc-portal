import { IAccountInfo } from "@/api/account/types";

declare global {
    interface Window {
        /** 当前账户信息 */
        globalAccountInfo: IAccountInfo | null;
    }
}

export { };