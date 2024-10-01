import React, { useEffect } from "react";
import { NextSeo } from "next-seo";

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
    const initAliplayer = () => {
        // @ts-ignore
        var player = new Aliplayer({
            id: "aliyun-player",
            source: JSON.stringify({
                "FD": "https://vod.alibabacloudtongyi.com.hk/c058fb5d7ed271ef801f5014c1da0102/42fdf45937d54b12a8abd978061beb03-9c95b279f3fbebcc4e9f9ebb125be92d-fd.mp4",
                "LD": "https://vod.alibabacloudtongyi.com.hk/c058fb5d7ed271ef801f5014c1da0102/42fdf45937d54b12a8abd978061beb03-fee35f58c20af701e7fa19b794dc7046-ld.mp4",
                "SD": "https://vod.alibabacloudtongyi.com.hk/c058fb5d7ed271ef801f5014c1da0102/42fdf45937d54b12a8abd978061beb03-eeca52cfbe329771ee4c3eff06c9f494-sd.mp4",
                "HD": "https://vod.alibabacloudtongyi.com.hk/c058fb5d7ed271ef801f5014c1da0102/42fdf45937d54b12a8abd978061beb03-dc987bd24e22d37cde39e38d5ee64371-hd.mp4",
            }),
            width: "100%",
            height: "500px",
            autoplay: false,
            isLive: false,
            components: [{
                name: 'QualityComponent',
                // @ts-ignore
                type: window.AliPlayerComponent.QualityComponent,
                args: [function (definition, desc) {
                    console.log(definition + '-----' + desc)
                }]
            }]
        }, function (player) {
            console.log("The player is created");
            /* Register the sourceloaded of the player, query the resolution of the video, invoke the resolution component, and call the setCurrentQuality method to set the resolution. */
            player.on('sourceloaded', function (params) {
                var paramData = params.paramData
                var desc = paramData.desc
                var definition = paramData.definition
                player.getComponent('QualityComponent').setCurrentQuality(desc, definition)
            })
        });
    };

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
            <div id="aliyun-player" style={{ width: "100%", height: "calc(100vh - 80px)" }} > </div>
            <section className="module-box" style={{ marginTop: '64px' }}>
                <p className="module-title">免費下載 《數字時代簡史 未來世代必修課》</p>
                <div className="module-logos" style={{ marginBottom: '32px' }}>
                    <a href="https://ml-aigc.oss-cn-hongkong.aliyuncs.com/1_%E6%95%B8%E5%AD%97%E6%99%82%E4%BB%A3%E7%B0%A1%E5%8F%B2-%E6%9C%AA%E4%BE%86%E4%B8%96%E4%BB%A3%E5%BF%85%E4%BF%AE%E8%AA%B2%202024%E5%B9%B4%E9%96%B1%E8%AE%80%E7%89%88.pdf" target="__blank">
                        <img src="https://ml-aigc.oss-cn-hongkong.aliyuncs.com/WX20240930-113809%402x.png" style={{ width: '200px', height: 'auto' }} alt="" />
                    </a>
                </div>
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
