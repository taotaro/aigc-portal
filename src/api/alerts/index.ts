import { commonAxiosPostRequest, commonAxiosGetRequest } from "@/api/common";
import { ISetClientAlertsParams, IAlertInfo } from "@/api/alerts/types";
import { getSubAccountList } from "@/api/contracts/index";
import { getAgentClientList } from "@/api/agent/index";
import { IAgentClientInfo } from "@/api/agent/types";
import { IClientInfo } from "@/api/contracts/types";
import { getPureArray } from "@/util/index";
import { CommonApiError } from "@/api/types";

/**
 * Reseller获取Alerts列表
 */
export const getResellerAllAlerts = async (data: { email: string }): Promise<[CommonApiError, IClientInfo[]]> => {
    const [subAccountListError, subAccountListRes] = await getSubAccountList();
    const subAccountList = getPureArray<IClientInfo>(subAccountListRes);
    if (!subAccountList.length) {
        return [subAccountListError, []];
    }
    const [getAlertsError, getAlertsRes] = await commonAxiosPostRequest<IAlertInfo, {}>('/api/account/get-all-alerts', data);
    const alertList = getPureArray<IAlertInfo>(getAlertsRes);
    const result = subAccountList.map(item => {
        const alertInfo = alertList.find(n => n.accountId === item.accountId) || {};
        return {
            accountId: item.accountId,
            name: item.name,
            ...alertInfo,
        }
    });
    return [getAlertsError, getPureArray<any>(result)];
}

/**
 * Agent获取Alerts列表
 */
export const getAgentAllAlerts = async (data: { email: string }): Promise<[CommonApiError, IClientInfo[]]> => {
    const [subAccountListError, subAccountListRes] = await getAgentClientList();
    const subAccountList = getPureArray<IAgentClientInfo>(subAccountListRes);
    if (!subAccountList.length) {
        return [subAccountListError, []];
    }
    const [getAlertsError, getAlertsRes] = await commonAxiosPostRequest<IAlertInfo, {}>('/api/account/get-all-alerts', data);
    const alertList = getPureArray<IAlertInfo>(getAlertsRes);
    const result = subAccountList.map(item => {
        const alertInfo = alertList.find(n => n.accountId === item.accountId) || {};
        return {
            accountId: item.accountId,
            name: item.name,
            ...alertInfo,
        }
    });
    return [getAlertsError, getPureArray<any>(result)];
}

/**
 * 子账户获取Alerts列表
 */
export const getAlerts = async (data: { email: string }): Promise<[CommonApiError, IClientInfo[]]> => {
    const [getAlertsError, getAlertsRes] = await commonAxiosPostRequest<IAlertInfo, {}>('/api/account/get-all-alerts', data);
    const alertList = getPureArray<IAlertInfo>(getAlertsRes);
    return [getAlertsError, getPureArray<any>(alertList)];
}

/**
 * 设置Client Alerts
 */
export const setClientAlerts = async (data: ISetClientAlertsParams) => {
    const response = await commonAxiosPostRequest<string, ISetClientAlertsParams>('/api/alicloud/client-alerts', data, { showLoading: true });
    return response;
}