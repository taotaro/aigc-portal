import { TProvider } from "@/api/account/types";
import { TPaymentMethod } from "@/api/contracts/types";

export interface IAgentIncomeInfo {
    billingCycle: string;
    resellerCurrency: string;
    pretaxAmount: number;
};

export interface IAgentIncodeAndProfitability {
    income: IAgentIncomeInfo[];
    profitability: number;
};

export interface IAgentClientInfo {
    name: string;
    accountId: string;
    email: string;
    userStatus: string | number;
    deposit: number | null;
    amountUsedThisMonth: number;
    discountRate: number;
    amountAfterDiscount: number;
    estimatedCommission: number;
    totalCredits: number;
    remainingCredits: number;
    usedCredits: string;
};

/** 代理信息 */
export interface IAgentInfo {
    name: string;
    email: string;
    currentMonthBill: number;
    agentIncomeForMonth: number;
    discountRate: number;
    profitSharingRule: number;
    customers: ({
        id: string;
        email: string;
    })[];
};

/** Notification通知 */
export enum NotifyType {
    AgentUpdateSubAccountInfo = 0,
}

export enum NotifyStatus {
    Unread = 0,
    Read = 1
}

export interface Notification {
    _id: string;
    sender: {
        email: string;
        first_name: string;
        last_name: string;
        wallet: string;
    },
    type: NotifyType,
    data: any,
    status: NotifyStatus,
    createdAt: number
}


export enum ModifyRequestStatus {
    PENDING = 'Pending',
    APPROVED = 'Approved',
    REJECTED = 'Rejected',
    CANCELED = 'Canceled',
}

export interface IModifyRequestItem {
    name?: string;
    accountId?: string;
    discount?: string;
    email?: string;
    userStatus?: TPaymentMethod;
    resellerEmail?: string;
    resellerAccountId?: string;
    deposit?: number | null;
    newDeposit?: number | null;
    balance?: number | null;
    previousMonthBill?: number | null;
    currentMonthBill?: number | null;
    provider?: TProvider;
    requestId?: string;
    newName?: string;
    newPassword?: string | null;
    newUserStatus?: TPaymentMethod;
    requestStatus?: ModifyRequestStatus;
    createdAt?: string;
    agentName?: string;
    discountRate?: number;
    newDiscountRate?: number;
}

export interface ISettleAgentProfitParams {
    email?: string;
    profit: string;
    billingCycle: string;
}

export interface IAgentProfitInfo {
    createdAt?: string;
    updatedAt?: string;
    profitId?: string;
    email?: string;
    resellerEmail?: string;
    profitSharingRule?: string;
    amountOfProfit?: string;
    billingCycle?: string;
    provider?: string;
    settled?: boolean;
}