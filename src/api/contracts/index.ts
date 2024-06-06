import { commonAxiosPostRequest, commonAxiosGetRequest } from "@/api/common";
import {
    IClientInfo,
    IInvitationSubAccountParams,
    ISubAccountBalanceAndDeposit,
    ISubAccountCreditData,
} from "@/api/contracts/types";
import { CommonApiError } from "@/api/types";
import { getPureArray } from "@/util/index";
import { queryResellerClientList } from "@/api/account/index";

/**
 * 获取子账户列表
 */
export const getSubAccountList = async (data?: { keywords?: string }) => {
    const response = await commonAxiosGetRequest<IClientInfo[], {}>('/api/sub-account/list-sub-account', data);
    return response;
}

/**
 * 获取子账户列表
 * @returns {Promise<IResellerDailyBill>} 账单列表
 */
export const querySubAccountContractsList = async (data: { keywords?: string }): Promise<[CommonApiError, IClientInfo[]]> => {
    const [resellerClientListError, resellerClientListRes] = await queryResellerClientList();
    const clientList = getPureArray<string>(resellerClientListRes?.clientList);
    if (!clientList.length) {
        return [resellerClientListError, []];
    }
    const [subAccountInfoError, subAccountInfoRes] = await getSubAccountList(data);
    const subAccountInfoList = getPureArray<IClientInfo>(subAccountInfoRes);
    let subAccountList: IClientInfo[] = clientList.map(accountId => {
        const bindedAccount = subAccountInfoList.find(item => item.accountId === accountId);
        return {
            accountId,
            deposit: null,
            balance: null,
            previousMonthBill: null,
            currentBill: null,
            userStatus: "",
            email: "",
            name: "",
            ...(bindedAccount || {}),
        };
    });
    subAccountList = [
        ...subAccountList.filter(item => [0, 1].includes(item.userStatus as number)),
        ...subAccountList.filter(item => ![0, 1].includes(item.userStatus as number)),
    ];
    return [subAccountInfoError, subAccountList];
}

/**
 * 邀请（创建）子账户接口
 */
export const invitationSubAccount = async (data: IInvitationSubAccountParams) => {
    const response = await commonAxiosPostRequest<string, IInvitationSubAccountParams>('/api/sub-account/create-sub-account', data);
    return response;
}

/**
 * 更新子账户接口
 */
export const updateSubAccount = async (data: { name?: string, account_id?: string, discountRate?: string, fees?: string, request_id?: string }) => {
    const response = await commonAxiosPostRequest<string, {}>('/api/sub-account/update-sub-account', data);
    return response;
}

/**
 * 删除子账户接口
 */
export const deleteSubAccount = async (data: { email: string }) => {
    const response = await commonAxiosPostRequest<string, {}>('/api/sub-account/delete-sub-account', data);
    return response;
}

/**
 * 自动计算子账户的Deposit
 */
export const getCurrentAccountDeposit = async (data: { account_id: string }) => {
    const response = await commonAxiosPostRequest<{ deposit: number }, {}>('/api/account/get-current-account-deposit', data, { showLoading: true });
    return response;
}

/**
 * 子账户获取设置密码邮件验证码
 */
export const subAccountCheckEmailAndSendVerification = async (data: { email: string }) => {
    const response = await commonAxiosPostRequest<string, {}>('/api/sub-account/check-email-and-send-verification', data, { showLoading: true });
    return response;
}

/**
 * 子账户查询balance
 * @returns {Promise<ISubAccountBalanceAndDeposit>} 余额和押金信息
 */
export const querySubAccountBalanceAndDeposit = async () => {
    const response = await commonAxiosGetRequest<ISubAccountBalanceAndDeposit, {}>("/api/sub-account/sub-account-balance-and-deposit");
    return response;
}

/**
 * 请求子账户信用数据
 * @returns {Promise<IResellerCreditData>} 信用数据
 */
export const querySubAccountCredits = async () => {
    const response = await commonAxiosGetRequest<ISubAccountCreditData, {}>('/api/sub-account/sub-account-credits', {});
    return response;
}