
/** 设置Client Alerts接口参数 */
export interface ISetClientAlertsParams {
    billing_cycle?: string;
    billing_date?: string;
    account_id?: string;
    alert_name?: string;
    absolute_value: string | number;
    multiples_value: string | (string | number)[];
    email?: string;
    reseller_account_id?: string;
    discount?: string | number;
    profit_split?: string | number;
    discount_from_provider?: string | number;
    conditions_met: boolean | string;
    update_alert?: boolean;
};

/** Client Alert信息 */
export interface IAlertInfo {
    name: string;
    email: string;
    accountId: string;
    profitSplit: number;
    discount: number;
    value: number;
    multiples: string[];
    trigger: boolean;
    allConditionsMet: boolean;
};