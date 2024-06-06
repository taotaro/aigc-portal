import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { AgentTotalMonthlyIncomeChart, AgentIncomeChartCard } from "@/components/core/chart";
import { AgentClientsTable } from "@/components/core/table";
import { getDashboardLayout } from "@/layouts";
import { useAuthStore } from "@/contexts/store";
import { getAgentYearlyIncome } from "@/api/agent/index";
import { IAgentIncodeAndProfitability } from "@/api/agent/types";

const AgentDashboard = () => {
    const { t } = useTranslation();
    const { userInfo } = useAuthStore();
    const [isLoading, setIsLoading] = useState<null | boolean>(false);
    const [dataSource, setDataSource] = useState<IAgentIncodeAndProfitability | null>(null);

    // 获取当年每月账单
    const handleQueryFullYearMonthlyResellerBill = async () => {
        setIsLoading(true);
        const [error, result] = await getAgentYearlyIncome({ billing_year: `${new Date().getFullYear()}` });
        setIsLoading(false);
        if (error) {
            toast.error(error?.message || t("common.message.system_error"));
        }
        setDataSource(result);
    }

    useEffect(() => {
        if (userInfo?.isLogin) {
            handleQueryFullYearMonthlyResellerBill();
        }
    }, [userInfo?.isLogin]);

    return (
        <div className="flex flex-col w-full min-h-screen py-[98px] items-center">
            <div className="flex flex-col w-full px-[48px]">
                <div className="flex gap-6 items-center w-full mt-[32px]">
                    <AgentIncomeChartCard isLoading={isLoading} dataSource={dataSource} />
                    <AgentTotalMonthlyIncomeChart isLoading={isLoading} dataSource={dataSource} />
                </div>
                <div className="mt-[32px]">
                    <AgentClientsTable />
                </div>
            </div>
        </div>
    )
}

AgentDashboard.getLayout = getDashboardLayout;

export default AgentDashboard;