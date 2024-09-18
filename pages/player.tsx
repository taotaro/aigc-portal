import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";

export default function Judges() {
    const { t } = useTranslation("common");
    const [fixedBgHeight, setFixedBgHeight] = useState(200);

    const initAliplayer = () => {
        // @ts-ignore
        var player = new window.Aliplayer({
            id: 'aliyun-player',
            source: 'artc://live-pull.test.taotaro.app/aigc1/aigc1?auth_key=1726651392-0-0-4fdd06663f76816b79c72bd614a3e08f',
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
