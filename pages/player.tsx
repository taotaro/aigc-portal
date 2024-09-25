import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";

function getQueryString(key: string) {
    const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
    const query =
        window.location.search.substring(1) ||
        window.location.hash.split("?")[1];
    if (query) {
        const r = query.match(reg);
        if (r != null) {
            return decodeURI(r[2]);
        }
    }
    return "";
}

export default function Player() {
    const initAliplayer = () => {
        const authKey = getQueryString("authKey");
        const mediaName = getQueryString("mediaName") || "aigc_ud";
        // @ts-ignore
        let player = new window.Aliplayer(
            {
                id: "aliyun-player",
                source: `artc://stream-pull.alibabacloudtongyi.com.hk/aigc/${mediaName}?auth_key=${authKey}`,
                isLive: true,
            },
            (player) => {
                console.log("[播放器初始化成功]", player);
            }
        );
    };

    useEffect(() => {
        initAliplayer();
    }, []);

    const liveIsStart = Date.now() >= new Date('2024-09-28T09:55:00').getTime();
    console.log('[liveIsStart]', liveIsStart);

    return (
        <>
            <NextSeo
                title={"雲遊通義 阿里雲校際AI比賽"}
                description={
                    "雲遊通義 – 阿里雲香港10週年校際生成式AI比賽發佈會"
                }
            />
            <div
                style={{
                    width: "100%",
                    height: "80px",
                    backgroundImage: `url('/images/index-bg.jpeg')`,
                }}
                id="fixed-bg"
            />
            {
                liveIsStart ? null : <div style={{ 'textAlign': 'center', padding: '5px 0' }}>直播将于2024年9月28日星期六上午9:55左右开始</div>
            }
            <div
                id="aliyun-player"
                style={{ width: "100%", height: "calc(100vh - 80px)" }}
            >
            </div>
        </>
    );
}
