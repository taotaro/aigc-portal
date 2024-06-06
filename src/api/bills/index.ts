import { commonAxiosPostRequest, commonAxiosGetRequest } from "@/api/common";
import {
    IResellerMonthlyBill,
    IResellerDailyBill,
    IResellerBillInfo,
    IClientBillInfo,
    ISingleClientBillInfo,
    ISubAccountBillsRequestParams,
} from "@/api/bills/types";
import { DashboardApiTimeout } from "@/config/constant";

/**
 * 经销商获取过去30日的账单
 * @returns {Promise<IResellerDailyBill>} 账单列表
 */
export const queryResellerPast30DaysBill = async (data: { detail?: number }) => {
    const response = await commonAxiosGetRequest<IResellerDailyBill, {}>("/api/alicloud/reseller-past-30-days-bill", data, {
        timeout: DashboardApiTimeout,
    });
    return response;
}

/**
 * 子账户获取Total Daily Cost（某月每日账单）
 */
export const querySubAccountBills = async (data: ISubAccountBillsRequestParams) => {
    const response = await commonAxiosPostRequest<IResellerDailyBill, {}>('/api/sub-account/sub-account-bills', data);
    return response;
}

/**
 * 经销商获取过去12个月的账单
 * @returns {Promise<IResellerMonthlyBill[]>} 账单列表
 */
export const queryResellerPastMonthsBill = async (data: { months?: number, billing_cycle?: string, detail?: 0 | 1, page_no?: number, page_size?: number }) => {
    const response = await commonAxiosGetRequest<IResellerMonthlyBill, {}>("/api/alicloud/reseller-past-months-bill", data, {
        timeout: DashboardApiTimeout,
    });
    return response;
}

/**
 * 子账户获取Total Daily Cost（某年每月账单）
 */
export const querySubAccountMonthlyBill = async (data: { billing_year: string }) => {
    const response = await commonAxiosPostRequest<IResellerMonthlyBill, {}>('/api/sub-account/sub-account-monthly-bill', data);
    return response;
}

/**
 * 请求Client账单列表
 * @returns {Promise<IClientBillInfo>} 账单列表
 */
export const queryClientBill = async (data: { reseller_account_id?: string, account_id?: string, detail?: boolean, billing_cycle_list: string[], page_no?: number, page_size?: number }) => {
    const response = await commonAxiosPostRequest<({ item: IClientBillInfo[], totalCount: number }), {}>('/api/alicloud/client-bill', data, {
        ...(data?.detail ? {} : { timeout: DashboardApiTimeout })
    });
    return response;
}