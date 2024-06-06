export enum Currency {
    USD
}

export interface MonthBill {
    gross_amount: number
    paid_amount: number
    outstanding_amount: number
    refund_amount: number
    tax: number
    reseller_currency: Currency
}

export interface SubAccountMonthBill extends MonthBill {
    id: string;
}

/** Reseller某月账单接口请求参数 */
export interface IResellerDailyBillRequestParams {
    /** 账单周期（yyyy-MM） */
    billing_month: string;
};

/** 请求Reseller某年的每月账单列表接口请求参数 */
export interface IFullYearMonthlyResellerBillRequestParams {
    /** 账单周期(YYYY) */
    billingYear: string;
};

/** BarChart数据 */
export interface IBarChartData {
    date: string;
    amount?: number;
    [key: string]: any;
};

export interface IResellerBillInfoSubItem {
    productName: string;
    subscriptionType: string;
    paymentTime: string;
    orderId: string;
    paymentStatus: string;
    amount: number;
    [key: string]: any;
}

/** Reseller账单详情列表数据 */
export interface IResellerBillInfo {
    billId?: string;
    /** 账单周期 */
    billingCycle?: string;
    /** 账户id */
    accountId?: string;
    originalCost?: number;
    discount?: number;
    couponDeduct?: number;
    pretaxAmount?: number;
    /** 账单列表 */
    item: IResellerBillInfoSubItem[];
    dataTotal?: number;
};

/** Reseller Monthly Bills数据 */
export interface IResellerMonthlyBill {
    id?: string;
    accountId?: string;
    billId?: string;
    billingCycle: string;
    couponDeduct: number;
    originalCost: number;
    discount: number;
    pretaxCost: number;
    pretaxAmount: number;
    /** 经销商货币 */
    resellerCurrency?: string;
    /** 总金额 */
    grossAmount: number;
    /** 账单列表 */
    item?: IResellerBillInfoSubItem[];
    dataTotal?: number;
    totalCount?: number;
};

/** Reseller某月每日账单信息 */
export interface IResellerDailyBill {
    /** 总金额 */
    grossAmount: number;
    /** 退款金额 */
    refundAmount: number;
    /** 经销商货币 */
    resellerCurrency?: string;
    /** 帐单日期 */
    billingDate: string;
    /** 帐户ID */
    accountId: string;
    billId: string;
    pretaxAmount?: number;
    originalCost: number;
    /** 账单列表 */
    item?: ISingleClientBillSubItem[];
    dataTotal?: number;
    totalCount?: number;
};

/** Client账单信息 */
export interface IClientBillInfo {
    AccountID: string;
    OriginalCost: number;
    Discount: number;
    CouponDeduct: number;
    PretaxAmount: number;
    PaymentMethod: number; // -1未绑定， 0预付费， 1后付费
    Deposit: number;
    PaymentCycle: string;
    LastPaymentDate: string;
    Email?: string;
    Name?: string;
    visible?: boolean;
    DiscountRate?: string;
    Fees?: string;
}

export interface ISingleClientBillInfo {
    billId: string;
    /** 账单周期 */
    billingCycle: string;
    /** 账户id */
    accountId: string;
    originalCost: number;
    discount: number;
    couponDeduct: number;
    pretaxAmount: number;
    /** 账单列表 */
    item: ISingleClientBillSubItem[];
    dataTotal?: number;
}

export interface ISingleClientBillSubItem {
    productName: string;
    subscriptionType: string;
    paymentTime: string;
    orderId: string;
    paymentStatus: string;
    amount: number;
    [key: string]: any;
}

export interface ISubAccountBillsRequestParams {
    billing_year?: number;
    billing_month?: number;
    monthly?: boolean;
    billing_day?: number;
    daily?: boolean;
    detail?: boolean;
    page_no?: number;
    page_size?: number;
}