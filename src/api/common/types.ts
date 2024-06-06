import { TPaymentMethod } from "@/api/contracts/types";
import { NetworkInfo } from "@/api/payments/types";

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    address: string;
    company_name: string;
    terms: boolean;
    promot: boolean;
    vCode: string;
}

export interface ChangePasswordData {
    old_password: string;
    new_password: string;
}

/** 云平台 */
export type TProvider = 'alicloud' | 'aws' | 'tencent' | null;

/** 用户信息 */
export interface User {
    /** 账户类型 */
    typeOfUser?: 'sub-account' | 'reseller' | 'agent';
    /** 是否已登录 */
    isLogin: boolean;
    /** token */
    token: string;
    /** 头像 */
    avatar?: string;
    /** reseller公司名称 */
    companyName: string;
    /** reseller公司地址 */
    address: string;
    /** 登录邮箱 */
    email: string;
    /** 账户名称 */
    name: string;
    /** reseller名称 */
    firstName?: string;
    /** reseller名称 */
    lastName?: string;
    /** 是否是reseller */
    isReseller: boolean;
    emailVerified?: boolean;
    verificationToken?: string;
    passwordResetToken?: string;
    /** 子账户Provider */
    provider?: TProvider;
    /** 子账户类型 */
    userStatus?: TPaymentMethod;
    /** 子账户id */
    accountId?: string;
    /** 子账户归属reseller账户id */
    resellerAccountId?: string;
    /** 子账户优惠费率 */
    discountRate?: number;
    /** 子账户手续费率 */
    fees?: number;
    /** 是否有绑定支付方式 */
    hasPaymentBound?: boolean;
    /** 默认支付方式 */
    defaultPaymentMethod?: 'Manual' | 'ExaPay';
    /** Agent的利润分享规则：0/1 */
    profitSharingRule?: number;
    /** 支付网络列表 */
    networkList?: NetworkInfo[] | null;
}


/** 验证邮箱验证码接口参数 */
export interface IVerifyEmailCodeData {
    email: string;
    vCode: string;
}

/** 获取Reseller的provider下面全部子账户信息 */
export interface IResellerClientListRes {
    accountId: string;
    clientList: string[];
}

/** 子账户/Agent首次设置密码接口参数 */

export interface SetPasswordParams {
    email: string;
    password: string;
    password_repeat?: string;
    vCode?: string;
}