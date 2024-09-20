import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";

export default function Judges() {
    const { t } = useTranslation("common");

    const initAliplayer = () => {
        // @ts-ignore
        let player = new window.Aliplayer({
            id: 'aliyun-player',
            source: 'artc://stream-pull.alibabacloudtongyi.com.hk/aigc/aigc_ud?auth_key=1726822519-0-0-83575157d468cfe1396ba485a4552aa3',
            isLive: true,
        }, (player) => {
            console.log('The player is created.', player);
        });
    }


    useEffect(() => {
        initAliplayer();
    }, []);

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
            <div id="aliyun-player" style={{
                width: "100%",
                height: "calc(100vh - 80px)",
            }}>

            </div>
        </>
    );
}
