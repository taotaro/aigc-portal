import { commonAxiosPostRequest, commonAxiosGetRequest } from "@/api/common";
import {
    IBindCloudAccountApiParams,
    IUnbindCloudAccountData,
    TProvider,
    IResellerClientListRes,
    IAccountInitialProgress,
} from "@/api/account/types";
import { User } from "@/api/common/types";

/**
 * 查询账户信息
 * @returns {Promise<User>} 账户信息
 */
export const queryAccountInfo = async () => {
    const response = await commonAxiosGetRequest<User, {}>('/api/account/account-info');
    return response;
}

/**
 * 查询账户信息
 * @returns {Promise<User>} 设置某个账户为当前账户
 */
export const setCurrentAccount = async (data: { provider: TProvider, account_id: string }) => {
    const response = await commonAxiosPostRequest<string, {}>('/api/account/set-current-account', data, { showLoading: true });
    return response;
}

/**
 * 查询reseller下的所有账户列表
 * @returns {Promise<User>} 设置某个账户为当前账户
 */
export const queryResellerClientList = async () => {
    const response = await commonAxiosGetRequest<IResellerClientListRes, {}>("/api/alicloud/reseller-client-list", {});
    return response;
}

/**
 * 绑定云平台账户
 */
export const bindCloudAccount = async (data: IBindCloudAccountApiParams) => {
    const response = await commonAxiosPostRequest<string, IBindCloudAccountApiParams>('/api/account/bind-account', data, { showLoading: true });
    return response;
}

/**
 * 编辑绑定的云平台账户
 */
export const editBindCloudAccount = async (data: IBindCloudAccountApiParams) => {
    const response = await commonAxiosPostRequest<string, IBindCloudAccountApiParams>('/api/account/edit-account-bind', data, { showLoading: true });
    return response;
}


/**
 * 解绑云平台账户
 */
export const unbindCloudAccount = async (data: IUnbindCloudAccountData) => {
    const response = await commonAxiosPostRequest<string, IUnbindCloudAccountData>('/api/account/unbind-account', data, { showLoading: true });
    return response;
}

/**
 * Reseller给子账户发送余额不足提醒邮件
 */
export const notifyLowBalance = async (data: { client_id: string }) => {
    const response = await commonAxiosPostRequest<string, {}>('/api/account/notify-low-balance', data, { showLoading: true });
    return response;
}

/**
 * Check Account Initial Progress
 */
export const checkAccountInitialProgress = async () => {
    const response = await commonAxiosGetRequest<IAccountInitialProgress, {}>('/api/account/check-account-initial-progress', {}, { showLoading: false });
    return response;
}