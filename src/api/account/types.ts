export interface ChangePasswordData {
    old_password: string;
    new_password: string;
}

export type TProvider = 'alicloud' | 'aws' | 'tencent' | null;

/** 绑定云平台账户接口参数 */
export interface IBindCloudAccountApiParams {
    provider?: TProvider;
    name: string;
    account_id: string;
    access_key: string;
    access_secret: string;
    region_id?: string;
    is_reseller?: boolean;
    email: string;
    /** 优惠率 */
    discountRate: string;
}

/** 账户信息 */
export interface IAccountInfo {
    /** 云账户-绑定Id */
    bindId?: string | null;
    /** 云账户-云平台类型 */
    provider: TProvider;
    /** 云账户-名称 */
    providerName?: string;
    name: string;
    /** 云账户-accountId */
    accountId: string;
    /** 云账户-accessKey */
    accessKey?: string;
    /** 云账户-accessSecret */
    accessSecret?: string;
    /** 云账户-regionId */
    regionId?: string;
    isReseller?: boolean;
    /** 邮箱 */
    email: string;
    verified?: boolean;
    /** 是否是Reseller当前账户 */
    current: null | boolean;
    /** 是否已经初始化好 */
    initialized?: boolean;
    /** 优惠率 */
    discountRate?: number;
    /** 创建时间 */
    createTime?: string;
    type?: 'EDIT' | 'CREATE';
}

export interface ITopupBalanceData {
    balance_amount?: number;
    provider: TProvider;
}

export interface ITopupDepositData {
    deposit_amount?: number;
    provider: TProvider;
}

export interface IUnbindCloudAccountData {
    provider: TProvider;
    account_id: string;
}

/** 获取Reseller的provider下面全部子账户信息 */
export interface IResellerClientListRes {
    accountId: string;
    clientList: string[];
}

/** 查询数据请求进度 */
export interface IAccountInitialProgress {
    /** 是否正在处理中 */
    inProgress: boolean;
    /** 预计处理时间 */
    estimatedDuration: number;
    /** 当前已处理时间 */
    duration: number;
}