import { commonAxiosPostRequest, commonAxiosGetRequest } from "@/api/common";
import {
    IPaymentInfo,
    ITopupBalanceOrDepositData,
    NetworkInfo,
    TOrderInfo,
    IBindExaPayData,
    IManualPayBindWalletParams,
    TPaymentBoundInfo,
    IManualPaymentNetwork,
    IManualPayCreateBillingRequestParams,
    IManualPaymentsRequestInfo
} from "./types";

/**
 * 获取Waiting Payment Records
 */
export const queryPendingPayments = async () => {
    const response = await commonAxiosGetRequest<IPaymentInfo, {}>('/api/payment/get-pending-payments', {});
    return response;
}

/**
 * 获取订单列表
 */
export const queryPaymentOrderList = async (data: { pending?: boolean; paid_status?: string }) => {
    const response = await commonAxiosGetRequest<IPaymentInfo[], {}>('/api/payment/order/list', data);
    return response;
}

/**
 * 查询Expay订单状态
 */
export const queryExapayPaymentOrderStatus = async (data: { orderId: string }, showLoading = false) => {
    const response = await commonAxiosGetRequest<TOrderInfo, {}>('/api/payment/exapay/order/status', { order_id: data?.orderId }, { showLoading });
    return response;
}

/**
 * 查询手动支付订单状态
 */
export const queryManualPaymentOrderStatus = async (data: { orderId: string }, showLoading = false) => {
    const response = await commonAxiosGetRequest<TOrderInfo, {}>('/api/payment/manual-pay/order/status', { order_id: data?.orderId }, { showLoading });
    return response;
}

/**
 * 取消订单
 */
export const cancelExapayPaymentOrder = async (data: { orderId: string }) => {
    const response = await commonAxiosGetRequest<null, {}>(`/api/payment/exapay/order/cancel?order_id=${data.orderId}`, {});
    return response;
}

/**
 * 更新余额
 */
export const topupBalance = async (data: ITopupBalanceOrDepositData) => {
    const response = await commonAxiosPostRequest<{ orderId: string }, ITopupBalanceOrDepositData>('/api/payment/exapay/subscription/top-up/balance', data, { showLoading: true });
    return response;
}

/**
 * 更新押金
 */
export const topupDeposit = async (data: ITopupBalanceOrDepositData) => {
    const response = await commonAxiosPostRequest<{ orderId: string }, ITopupBalanceOrDepositData>('/api/payment/exapay/subscription/top-up/deposit', data, { showLoading: true });
    return response;
}

/**
 * 预付费账户更新余额/押金
 */
export const createSinglePayment = async (data: ITopupBalanceOrDepositData) => {
    const response = await commonAxiosPostRequest<{ orderId: string }, ITopupBalanceOrDepositData>('/api/payment/exapay/order/single-payment', data, { showLoading: true });
    return response;
}

/**
 * 获取支付网络列表
 */
export const getNetworkList = async (data: { method?: 'Manual' | 'ExaPay' | '' } = {}) => {
    const response = await commonAxiosGetRequest<NetworkInfo[], {}>('/api/payment/network/list', data, { showLoading: false });
    return response;
}

/**
 * 获取用户支付网络信息
 */
export const getPaymentBoundInfo = async () => {
    const response = await commonAxiosGetRequest<TPaymentBoundInfo, {}>('/api/payment/get-payment-bound', {}, { showLoading: false });
    return response;
}

/**
 * 绑定ExaPay
 */
export const bindExaPay = async (data: IBindExaPayData) => {
    const response = await commonAxiosPostRequest<string, IBindExaPayData>('/api/payment/exapay/bind-exapay', data, { showLoading: true });
    return response;
}

/**
 * 解绑ExaPay
 */
export const unbindExapay = async (data: { email_binary_owl?: string, vCode: string }) => {
    const response = await commonAxiosPostRequest<string, {}>('/api/payment/exapay/unbind-exapay', data, { showLoading: true });
    return response;
}

/**
 * 获取manual-pay的支付网络列表
 */
export const getManualPaymentNetworks = async () => {
    const response = await commonAxiosGetRequest<IManualPaymentNetwork[], {}>('/api/payment/manual-pay/get-manual-payment-networks', {}, { showLoading: false });
    return response;
}

/**
 * Reseller设置direct receipts
 */
export const manualPayBindWallet = async (data: IManualPayBindWalletParams) => {
    const response = await commonAxiosPostRequest<string, {}>('/api/payment/manual-pay/manage-wallet', data, { showLoading: true });
    return response;
}

/**
 *  manualPay解绑
 */
export const manualPayUnbindWallet = async () => {
    const response = await commonAxiosPostRequest<string, {}>('/api/payment/manual-pay/unbind-wallet', {}, { showLoading: true });
    return response;
}

/**
 * 设置优先支付方式接口
 */
export const setDefaultPaymentWay = async (data: { paymentMethod: 'ExaPay' | 'Manual' }) => {
    const response = await commonAxiosPostRequest<string, {}>('/api/payment/update-default', data, { showLoading: true });
    return response;
}

/**
 * manualPay创建支付订单
 */
export const manualPayCreateBillingRequest = async (data: IManualPayCreateBillingRequestParams) => {
    const response = await commonAxiosPostRequest<{ orderId: string }, {}>('/api/payment/manual-pay/create-billing-request', data, { showLoading: true });
    return response;
}

/**
 * 子账户获取Reseller的支付方式
 */
export const getResellerPaymentInfo = async () => {
    const response = await commonAxiosPostRequest<TPaymentBoundInfo['Manual'], {}>('/api/payment/manual-pay/get-reseller-payment', {}, { showLoading: true });
    return response;
}

/**
 * 获取手动支付请求列表
 */
export const getAllManualPaymentsRequest = async () => {
    const response = await commonAxiosGetRequest<IManualPaymentsRequestInfo, {}>('/api/payment/manual-pay/get-all-manual-payments-request', {}, { showLoading: false });
    return response;
}

/**
 * Reseller取消手动支付请求
 */
export const cancelBillingRequest = async (data: { billingId: string }) => {
    const response = await commonAxiosGetRequest<IManualPaymentsRequestInfo, {}>('/api/payment/manual-pay/cancel-billing-request', data, { showLoading: true });
    return response;
}

/**
 * Reseller确认手动支付请求成功
 */
export const confirmBillingRequest = async (data: { billingId: string }) => {
    const response = await commonAxiosPostRequest<IManualPaymentsRequestInfo, {}>('/api/payment/manual-pay/confirm-billing-request', data, { showLoading: true });
    return response;
}

/**
 * 子账户更新手动支付Hash
 */
export const updateBillingRequest = async (data: { billingId: string, paidHash: string }) => {
    const response = await commonAxiosPostRequest<IManualPaymentsRequestInfo, {}>('/api/payment/manual-pay/update-billing-request', data, { showLoading: true });
    return response;
}