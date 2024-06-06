import { commonAxiosPostRequest, commonAxiosGetRequest } from "@/api/common";
import {
    RegisterData,
    LoginData,
    User,
    IVerifyEmailCodeData,
    SetPasswordParams,
} from "./types";

/**
 * 登录接口
 * @param {LoginData} data - 登录参数
 * @returns {Promise<User>} 用户信息
 */
export const userSignIn = async (data: LoginData) => {
    const response = await commonAxiosPostRequest<User, LoginData>('/api/common/login', data, { showLoading: true });
    return response;
}

/**
 * 注册接口
 * @param {RegisterData} data - 注册参数
 * @returns {Promise<User>} 用户信息
 */
export const userSignUp = async (data: RegisterData) => {
    const response = await commonAxiosPostRequest<User, RegisterData>("/api/common/register", data, { showLoading: true });
    return response;
}

/**
 * 查询用户信息
 * @returns {Promise<User>} 用户信息
 */
export const queryUserInfo = async () => {
    const response = await commonAxiosGetRequest<User, {}>('/api/common/user-info');
    return response;
}

/**
 * Send password reset email
 * @param {email: string} data - 参数
 * @returns {Promise<CommonApiResponse>}
 */
export const sendEmailVerificationCode = async (data: { email: string }) => {
    const response = await commonAxiosPostRequest<string, {}>("/api/common/send-v-code", data);
    return response;
}

/**
 * 验证邮箱验证码
 * @param {email: string} data - 参数
 * @returns {Promise<CommonApiResponse>}
 */
export const verifyEmailCode = async (data: IVerifyEmailCodeData) => {
    const response = await commonAxiosPostRequest<string, {}>("/api/common/verify-email", data, { showLoading: true });
    return response;
}

/**
 * 子账户/Agent首次设置密码接口参数
 */
export const setPassword = async (data: SetPasswordParams) => {
    const response = await commonAxiosPostRequest<string, any>('/api/settings/set-password', data, { showLoading: true });
    return response;
}