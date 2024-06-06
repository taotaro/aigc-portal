import { commonAxiosPostRequest, commonAxiosGetRequest } from "@/api/common";
import { IAgentIncodeAndProfitability, IAgentClientInfo, IAgentInfo, IModifyRequestItem, ISettleAgentProfitParams, IAgentProfitInfo } from "./types";
import { TProvider } from "@/api/account/types";

/**
 * 获取代理账户的Income余额和Profitability
 */
export const getAgentIncomeForMonthAndProfitability = async () => {
    const response = await commonAxiosGetRequest<IAgentIncodeAndProfitability, {}>('/api/agent/get-income-for-month-and-profitability', {});
    return response;
}

/**
 * 获取代理账户年度Income数据
 */
export const getAgentYearlyIncome = async (data: { billing_year: string }) => {
    const response = await commonAxiosPostRequest<IAgentIncodeAndProfitability, {}>('/api/agent/get-yearly-income', data);
    return response;
}

/**
 * 获取代理账户的客户列表
 */
export const getAgentClientList = async (data: { keywords?: string } = {}) => {
    const response = await commonAxiosGetRequest<IAgentClientInfo[], {}>('/api/agent/get-client-list', data);
    return response;
}

/**
 * 代理删除客户
 */
export const agentDeleteClient = async (data: { email: string }) => {
    const response = await commonAxiosPostRequest<string, {}>('/api/agent/get-client-list', data);
    return response;
}

/**
 * 获取代理列表
 */
export const getAgentList = async (data: { keywords?: string }) => {
    const response = await commonAxiosGetRequest<IAgentInfo[], {}>('/api/agent/get-agent-list', data);
    return response;
}

/**
 * reseller获取代理修改sub-account新的通知列表
 */
export const resellerGetAgentModifyRequestList = async (data: {}) => {
    const response = await commonAxiosGetRequest<IModifyRequestItem[], {}>('/api/agent/modify-request-list', data);
    return response;
}

/**
 * reseller移除代理修改sub-account新的通知列表
 */
export const resellerRemoveAgentModifyRequest = async (data: { requestId: string }) => {
    const response = await commonAxiosGetRequest<IAgentInfo[], {}>(`/api/agent/remove-modify-request?request_id=${data.requestId}`, data);
    return response;
}

export type TCreateAgentAccountData = {
    name: string;
    email: string;
    discountRate: string;
    profitSharingRule: string | number;
    customers: ({
        id: string;
        email: string;
        provider?: TProvider;
    })[];
};
/**
 * 创建代理
 */
export const createAgentAccount = async (data: TCreateAgentAccountData) => {
    const response = await commonAxiosPostRequest<string, {}>('/api/agent/create-agent-account', data);
    return response;
}

/**
 * 更新代理
 */
export const updateAgentAccount = async (data: any) => {
    const response = await commonAxiosPostRequest<string, {}>('/api/agent/update-agent-account', data);
    return response;
}

/**
 * 删除代理
 */
export const removeAgentAccount = async (data: { email: string }) => {
    const response = await commonAxiosPostRequest<string, {}>('/api/agent/remove-agent-account', data);
    return response;
}

/**
 * settleAgentProfit
 */
export const settleAgentProfit = async (data: ISettleAgentProfitParams) => {
    const response = await commonAxiosPostRequest<string, {}>('/api/agent/create-agent-profit-settlement', data);
    return response;
}

/**
 * getAgentProfit
 */
export const getAgentProfit = async (data: { settled?: boolean, keywords?: string } = {}) => {
    const response = await commonAxiosGetRequest<IAgentProfitInfo[], {}>('/api/agent/get-agent-profit', data);
    return response;
}

/**
 * confirmAgentProfitSettlement
 */
export const confirmAgentProfitSettlement = async (data: { profitId: string }) => {
    const response = await commonAxiosPostRequest<IAgentProfitInfo[], {}>('/api/agent/confirm-agent-profit-settlement', data);
    return response;
}