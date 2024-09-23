import React, { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

export default function Logo() {
    const { t } = useTranslation("common");
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
    return (
        <>
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
        </>
    );
}
