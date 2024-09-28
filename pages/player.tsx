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

const sponsorList = [
    { name: "SteelSeries", logo: "/images/steelseries.png" },
    { name: "Lawsgroup", logo: "/images/LAWSGROUP.png" },
    { name: "LawsKnitters", logo: "/images/Laws Knitters Logo.png" },
];

const LogoList = [
    { name: "Alibaba", logo: "/images/ali.jpeg" },
    { name: "Materia Logic", logo: "/images/MateriaLogic.png" },
    { name: "GamingNoodleSoup", logo: "/images/gns.png" },
    { name: "HKFEW", logo: "/images/teachers.jpeg" },
    { name: "HKACE", logo: "/images/hkace.png" },
    { name: "Aitle", logo: "/images/aitle.png" },
    { name: "HKISHA", logo: "/images/HKISHA.jpg" },
    { name: "KSHA", logo: "/images/KSHA.png" },
    { name: "NTSHA", logo: "/images/NTSHA.png" },
    { name: "hkhxei", logo: "/images/hkhxei.jpg" },
    { name: "pauls", logo: "/images/Pauls.png" },
    { name: "HKSSSC", logo: "/images/HKSSSC.jpg" },
    { name: "DSSSC", logo: "/images/DSSSC.png" },
    { name: "ahss", logo: "/images/ahss.jpg" },
    { name: "HKCMSA", logo: "/images/HKCMSA.png" },
    { name: "APSHA", logo: "/images/APSHA.png" },
];

export default function Player() {
    const [liveIsStart] = useState(Date.now() >= new Date('2024-09-28T09:55:00').getTime());
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
        if (liveIsStart) {
            initAliplayer();
        }
    }, [liveIsStart]);

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
            {/* <div ></div> */}
            {
                liveIsStart
                    ? <div id="aliyun-player" style={{ width: "100%", height: "calc(100vh - 80px)" }} > </div>
                    : <section
                        className="module-box"
                        id="gameInfoModule"
                        style={{ width: "100%", height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#242424', fontSize: '32px' }}
                    >
                        <p className="module-title">直播預告</p>
                        <div className="module-content" style={{ padding: "36px" }}>
                            <div className="module-content__left">
                                <div className="module-content__desc">
                                    <ul style={{ paddingLeft: "20px", textIndent: "-2px" }}>
                                        <p>直播將於2024年9月28日星期六上午9:55左右開始</p>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
            }
            <section className="module-box" style={{ marginTop: '64px' }}>
                <p className="module-title">活動主辦</p>
                <div className="module-logos">
                    {LogoList.filter((item) => item.name === "Alibaba").map(
                        (item) => {
                            return (
                                <div
                                    className={`module-logo module-logo-${item.name}`}
                                    key={item.name}
                                >
                                    <img
                                        className="module-logo__img"
                                        src={item.logo}
                                        alt={item.name}
                                    />
                                </div>
                            );
                        }
                    )}
                </div>
                <p className="module-title" style={{ paddingTop: "24px" }}>
                    支持單位
                </p>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "20px",
                        paddingTop: "24px",
                        justifyContent: "center", // Centers the items horizontally
                        alignItems: "center", // Centers the items vertically
                    }}
                >
                    {LogoList.filter((item) => item.name !== "Alibaba").map(
                        (item, index) => {
                            return (
                                <div
                                    style={{
                                        flex: "1 1 23.5%",
                                        maxWidth: "23.5%",
                                        boxSizing: "border-box",
                                        textAlign: "center",
                                        display: "flex", // Add display flex to the item container
                                        justifyContent: "center", // Center the image horizontally
                                        alignItems: "center", // Center the image vertically
                                    }}
                                    key={item.name}
                                >
                                    <img
                                        style={{
                                            maxWidth: "100%",
                                            width: "auto",
                                            maxHeight: "100px",
                                        }}
                                        src={item.logo}
                                        alt={item.name}
                                    />
                                </div>
                            );
                        }
                    )}
                </div>
                <p className="module-title" style={{ paddingTop: "24px" }}>
                    活動贊助
                </p>
                <div className="module-logos">
                    {sponsorList
                        .filter((item) => item.name !== "Alibaba")
                        .map((item) => {
                            return (
                                <div
                                    className={`module-logo module-logo-${item.name}`}
                                    key={item.name}
                                    style={{ minHeight: "150px" }}
                                >
                                    <img
                                        className="module-logo__img"
                                        src={item.logo}
                                        alt={item.name}
                                    />
                                </div>
                            );
                        })}
                </div>
            </section>
        </>
    );
}
