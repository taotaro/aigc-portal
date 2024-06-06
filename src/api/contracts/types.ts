import { TProvider } from "@/api/account/types";

/** 子账户信息 */

export interface IClientInfo {
    name: string;
    accountId: string;
    deposit: number | null;
    balance: number | null;
    previousMonthBill: number | null;
    currentBill: number | null;
    userStatus: TPaymentMethod;
    email: string;
    provider?: TProvider;
}

/** 子账户类型：0预付费、1后付费 */
export type TPaymentMethod = '' | 0 | 1;
export type TDepositType = '' | 'custom' | 'automatic';

/** 邀请子账户接口参数 */
export interface IInvitationSubAccountParams {
    /** 子账户名称 */
    name: string;
    /** 子账户id */
    account_id: string;
    /** 子账户邮箱 */
    email: string;
    /** 子账户支付方式：0预付费|1后付费 */
    payment_method: TPaymentMethod;
    /** 子账户押金使用方式 */
    deposit_type: TDepositType;
    /** 子账户押金 */
    deposit: string;
    /** reseller账户id */
    reseller_account_id?: string;
    /** 优惠率 */
    discountRate: string;
    /** 手续费 */
    fees: string;
    /** 是否是编辑 */
    isEdit?: boolean;
}

/** 子账户当前账户余额和押金信息 */
export interface ISubAccountBalanceAndDeposit {
    /** 余额 */
    balance: number | null;
    /** 押金 */
    deposit: number | null;
};

/** 子账户当前账户信用数据 */
export interface ISubAccountCreditData {
    /** 总信用 */
    TotalCredits: number;
    /** 剩余信用 */
    RemainingCredits?: number;
    AvailableCredits: number;
    /** 账户ID */
    AccountID?: string;
};