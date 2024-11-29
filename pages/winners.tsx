import React, { useEffect, useState, useCallback } from "react";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { throttle } from "../util/index";

export default function Winners() {
    const { t } = useTranslation("common");
    const [fixedBgHeight, setFixedBgHeight] = useState(200);

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

    const sponsorList = [
        { name: "SteelSeries", logo: "/images/steelseries.png" },
        { name: "Lawsgroup", logo: "/images/LAWSGROUP.png" },
        { name: "LawsKnitters", logo: "/images/Laws Knitters Logo.png" },
    ];

    function onWindowResize() {
        const $fixedBg = document.getElementById("fixed-bg");
        const height = $fixedBg?.getBoundingClientRect()?.height || 200;
        setFixedBgHeight(height);
    }

    const throttledResize = throttle(onWindowResize, 200);

    useEffect(() => {
        window.scrollTo(0, 0);
        onWindowResize();
        window.addEventListener("resize", throttledResize);
        // console.log("env prod: ", process.env.NEXT_PUBLIC_API_URL);
        return () => {
            window.removeEventListener("resize", throttledResize);
        };
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
            <div>
                {/* Registration form */}
                <section className="position-relative module-box">
                    <div className="registration-form">
                        <img
                            className="intro-tag intro-tag-left"
                            src="/images/tag1.png"
                            alt="tag"
                        />
                        <div>
                            <div className="registration-info">
                                <div className="registration-title">
                                    <div className="registration-title">
                                        雲遊通義 - 阿里雲香港10週年
                                        校際生成式AI比賽 2024
                                    </div>{" "}
                                    <div className="registration-title">
                                        得獎名單
                                    </div>{" "}
                                </div>

                                <div className="registration-subtitle">
                                    <div>中學組冠軍</div>
                                    <div>參賽學校：新界喇沙中學</div>
                                    <div>
                                        參賽同學：何芷妍、何香怡、冼韵思、林熙桐
                                    </div>
                                    <div>作品名稱：時空之鑰</div>
                                    <div>指導老師：李戩庭老師</div>
                                </div>

                                <div
                                    className="registration-subtitle"
                                    style={{ marginTop: "40px" }}
                                >
                                    <div>中學組亞軍</div>
                                    <div>參賽學校：嘉諾撒聖心書院</div>
                                    <div>參賽同學：許泳茵、吳旻熺、楊梓瑤</div>
                                    <div>作品名稱：諾瓦歷險記</div>
                                    <div>指導老師：曾尉翔老師</div>
                                </div>

                                <div
                                    className="registration-subtitle"
                                    style={{ marginTop: "40px" }}
                                >
                                    <div>中學組季軍</div>
                                    <div>參賽學校：九龍真光中學</div>
                                    <div>參賽同學：林穎秋、吳陽榕</div>
                                    <div>
                                        作品名稱：跨越時空的救贖 六月飛霜的呼喚
                                    </div>
                                    <div>指導老師：梁靜雲老師</div>
                                </div>
                                <div
                                    className="registration-subtitle"
                                    style={{ marginTop: "40px" }}
                                >
                                    <div>中學組最積極參與學校獎：</div>
                                    <div>
                                        聖保祿學校（中學部）、九龍真光中學、港大同學會書院
                                    </div>
                                </div>
                                <div
                                    className="registration-subtitle"
                                    style={{ marginTop: "40px" }}
                                >
                                    <div>小學組冠軍</div>
                                    <div>參賽學校：聖公會聖紀文小學</div>
                                    <div>參賽同學：王梓潼、湯雅喬</div>
                                    <div>作品名稱：我的校園生活 潼夢喬伴</div>
                                    <div>指導老師：陳啟欣老師</div>
                                </div>
                                <div
                                    className="registration-subtitle"
                                    style={{ marginTop: "40px" }}
                                >
                                    <div>小學組亞軍</div>
                                    <div>參賽學校：五邑鄒振猷學校</div>
                                    <div>參賽同學：陳永衡、張宏駿、何詩珩</div>
                                    <div>
                                        作品名稱：時光的約定——錯失 修補 重聚
                                    </div>
                                    <div>指導老師：呂子雄老師</div>
                                </div>
                                <div
                                    className="registration-subtitle"
                                    style={{ marginTop: "40px" }}
                                >
                                    <div>小學組季軍</div>
                                    <div>參賽學校：天水圍循道衞理小學</div>
                                    <div>參賽同學：黎子霖、黃家甜</div>
                                    <div>
                                        作品名稱：「我的校園生活」之《神秘的信件》
                                    </div>
                                    <div>負責老師：莫麗霞老師</div>
                                </div>
                                <div
                                    className="registration-subtitle"
                                    style={{ marginTop: "40px" }}
                                >
                                    <div>小學組最積極參與學校獎</div>
                                    <div>
                                        聖公會聖米迦勒小學、仁愛堂田家炳小學、保良局蕭漢森小學、保良局世德小學、坪石天主教小學
                                    </div>
                                </div>
                                <div
                                    className="registration-subtitle"
                                    style={{ marginTop: "40px" }}
                                >
                                    <div>展能組冠軍</div>
                                    <div>參賽學校：匡智張玉瓊晨輝學校</div>
                                    <div>參賽同學：楊莉婷、張詩雨</div>
                                    <div>作品名稱：魔幻月球之旅</div>
                                    <div>負責老師：程棨彥老師</div>
                                </div>
                                <div
                                    className="registration-subtitle"
                                    style={{ marginTop: "40px" }}
                                >
                                    <div>展能組亞軍</div>
                                    <div>參賽學校：才俊學校</div>
                                    <div>參賽同學：陳婉慧、梁梓晴</div>
                                    <div>作品名稱：水豚的七彩畫室</div>
                                    <div>負責老師：方崇一老師</div>
                                </div>
                                <div
                                    className="registration-subtitle"
                                    style={{ marginTop: "40px" }}
                                >
                                    <div>展能組季軍</div>
                                    <div>參賽學校：匡智元朗晨曦學校</div>
                                    <div>
                                        參賽同學：曾晴、MUNSHA SHUJAT ALIKHAN
                                    </div>
                                    <div>作品名稱：平凡快樂</div>
                                    <div>負責老師：尹樂兒老師</div>
                                </div>
                                <div
                                    className="registration-subtitle"
                                    style={{ marginTop: "40px" }}
                                >
                                    <div>展能組最積極參與學校獎：</div>
                                    <div>
                                        明愛樂義學校、匡智元朗晨曦學校、匡智張玉瓊晨輝學校
                                    </div>
                                </div>
                            </div>
                        </div>

                        <img
                            className="intro-tag intro-tag-right"
                            src="/images/tag1.png"
                            alt="tag"
                        />
                    </div>
                </section>
                {/* {footer} */}
                <section className="position-relative module-box">
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
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "20px",
                            paddingTop: "24px",
                        }}
                    >
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
            </div>
        </>
    );
}

Winners.EXTEND_INFO = {
    pageName: "WINNERS",
};
