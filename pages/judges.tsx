import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { throttle } from "../util/index";
import Judge from "../components/judge";

export default function Judges() {
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

    const judgeData = [
        {
            name: "阿里雲",
            description: "亞太北大區市場總監",
            info: "鄧惠良先生",
            photo: "/images/judge1.JPG",
        },
        {
            name: "羅氏針織有限公司",
            description: "工作室策展人",
            info: "黃靖貽小姐",
            photo: "/images/judge2.JPG",
        },
        {
            name: "遊戲湯麵",
            description: "創辦人",
            info: "余安濤先生",
            photo: "/images/judge3.jpg",
        },
        {
            name: "Materia Logic",
            description: "創辦人",
            info: "黃暐喬先生",
            photo: "/images/judge4.PNG",
        },
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
            />
            <div className="module-container">
                <section
                    className="position-relative module-box"
                    style={{ paddingTop: "80px", marginBottom: "-80px" }}
                >
                    <p className="module-title">賽事評審 </p>
                </section>
                <section className="position-relative intro-box">
                    <div
                        style={{
                            display: "flex",
                            // flexDirection: "column",
                            gap: "40px",
                            // alignContent: "flex-start",
                            // alignItems: "flex-start",
                            // alignSelf: "stretch",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            flexWrap: "wrap",
                        }}
                    >
                        {judgeData.map((item, index) => {
                            return (
                                <Judge
                                    key={index}
                                    judgeName={item.name}
                                    judgeDescription={item.description}
                                    judgeInfo={item.info}
                                    judgePhoto={item.photo}
                                />
                            );
                        })}
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
            </div>
        </>
    );
}
