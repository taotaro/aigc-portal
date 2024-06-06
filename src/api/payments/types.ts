import { TProvider } from "@/api/account/types";
/** Payment信息 */
export interface IPaymentInfo {
    orderId: string;
    accountId: string;
    name?: string;
    billingCycle: string;
    billAmount: number;
    amountDue: number;
    paidAmount: number;
    paymentTime: string;
    status: 'pending' | 'unpaid' | 'closed' | 'paid';
    paymentMethod?: "Manual" | "ExaPay"
};

export interface ITopupBalanceOrDepositData {
    balance_amount?: number;
    deposit_amount?: number;
    provider: TProvider;
    network: string;
}

export const enum OrderType {
    TopupBalance = 'topupBalance',
    TopupDeposit = 'topupDeposit',
    CreateSinglePayment = 'createSinglePayment',
    None = 'none',
}

export type NetworkInfo = {
    chainId: number | string;
    name: string;
    icon?: string;
    tokenInfo?: {
        Address: string;
        Decimals: number;
    }
}

// PENDING = 0
//  PAID = 1
//     UNPAID = 2
//     CLOSED = 3
export type TOrderInfo = {
    /* 订单金额 */
    amount?: number;
    /* 支付金额 */
    paidAmount?: number;
    /* 支付方式 */
    paymentType?: 'deposit' | 'balance' | 'single';
    /* 支付网络 */
    paymentNetwork?: string;
    paymentNetworkName?: string;
    /* 手续费 */
    feesAmount?: number;
    /* 优惠金额 */
    discountAmount?: number;
    /* 账户id */
    accountId?: string;
    provider?: TProvider;
    paymentDate?: number;
    paymentStatus?: 0 | 1 | 2 | 3;
    paymentMethod?: 'Manual' | 'ExaPay';
    orderId?: string;

}

export interface IBindExaPayData {
    apiKey?: string;
    chain_id?: string[] | string;
    token?: string;
}

/* ManualPay绑定钱包地址接口参数 */
export interface IManualPayBindWalletParams {
    /* 支付网络id列表 */
    paymentNetwork: string[];
    /* evm钱包地址 */
    evmAddress: string;
    /* tron钱包地址 */
    tronAddress: string;
    /* 验证码 */
    vCode: string;
    /* Token */
    token?: 'USDT' | 'USDC';
}

/* 绑定的支付网关信息 */
export type TPaymentBoundInfo = {
    [keyof in 'Manual' | 'ExaPay']: {
        paymentNetwork: NetworkInfo[],
        evmAddress?: string,
        tronAddress?: string,
        token?: string,
        primary?: boolean;
        name?: string;
        email?: string;
        active?: boolean;
    }
}

/* ManualPay支付网络信息 */
export interface IManualPaymentNetwork {
    /* 支付网络id */
    chainID: string;
    /* 网络名称 */
    name: string;
    /* 网络icon */
    icon: string;
    /* 扫码链接 */
    scanLink: string;
    /* tokens */
    tokens: {
        [keyof in 'USDT' | 'USDC']: {
            Decimals: number;
            Address: string;
        }
    }
}

/* ManualPay创建支付记录接口参数 */
export interface IManualPayCreateBillingRequestParams {
    /* 支付网络id */
    chainId: string;
    /* 订单金额 */
    billAmount: number;
    /* provider */
    provider: string;
    /* 支付网络地址 */
    paidAddress: string;
    /* 支付结果hash地址 */
    paidHash: string;
}

/* ManualPay请求信息 */
export interface IManualPaymentsRequestInfo {
    accountId?: string;
    paidAmount?: number;
    billAmount?: number;
    billingId?: string;
    createAt?: string;
    email?: string;
    paidAddress?: string;
    paidHash?: string;
    paidTransactionUrl?: string;
    payee?: string;
    paymentNetwork?: {
        chainID: string;
        name: string;
    };
    provider?: string;
    paymentType?: string;
    token?: 'USDT' | 'USDC';
}