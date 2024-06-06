import { PasswordVerifyRegExp, EmailVerifyRegExp } from "@/config/constant";
import { NetworkInfo } from "@/api/payments/types";
import { User } from "@/api/common/types";

/**
 * 强制获取数组类型的数据,当输入参数为非数组时，返回空数组
 * @param {AnyObject} params - 跳转链接
 * @returns {Promise<any[]>} 数组
 */
export function getPureArray<T>(params: any): T[] {
    return Array.isArray(params) ? params : [];
}

/**
 * 校验是否为合法的邮箱
 * @param {string} email - 邮箱
 * @returns {boolean} 结果
 */
export const validateContactEmail = (email: string) => {
    return EmailVerifyRegExp.test(email);
};


/**
 * 校验是否为合法的密码
 * @param {string} password - 密码
 * @returns {boolean} 结果
 */
export const validatePassword = (password: string) => {
    return PasswordVerifyRegExp.test(password);
};

export const splitNumberFormatter = (value: number | string, precision?: number): string => {
    return Number((Number(value).toFixed(precision || 0))).toLocaleString();
};

export const numberFormatter = (value: number | string) => typeof value === 'number' ? Number(value.toFixed(2)) : value;

// 获取支付网络图标
export const getPaymentNetworkIcon = (chainId: NetworkInfo['chainId']): string => {
    if (!chainId) {
        return '';
    }
    return `/network/${chainId}.svg`;
}

enum TimeElapsed {
    Second = "second ago",
    Minute = "minute ago",
    Hour = "hour ago",
    Day = "day ago",
}
export const getTimeElapsed = (timestamp: number) => {
    const currentTime = Date.now();
    const timeDifference = Math.floor((currentTime - timestamp) / 1000);

    if (timeDifference < 60) {
        return {
            value: timeDifference,
            elapsed: TimeElapsed.Second
        };
    } else if (timeDifference < 3600) {
        const minutes = Math.floor(timeDifference / 60);
        return {
            value: minutes,
            elapsed: TimeElapsed.Minute
        }
    } else if (timeDifference < 86400) {
        const hours = Math.floor(timeDifference / 3600);
        return {
            value: hours,
            elapsed: TimeElapsed.Hour
        }
    } else {
        const days = Math.floor(timeDifference / 86400);
        return {
            value: days,
            elapsed: TimeElapsed.Day
        }
    }
}

export const truncateText = (address: string, start = 6, end = 4) => {
    return `${address.slice(0, start)}...${address.slice(-end)}`
}

export const getUserTypeName = (typeOfUser: User['typeOfUser']) => {
    if (typeOfUser === 'reseller') {
        return 'Reseller';
    } else if (typeOfUser === 'agent') {
        return 'Agent';
    } else if (typeOfUser === 'sub-account') {
        return 'Client';
    }
}

export const delay = (time: number) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
}