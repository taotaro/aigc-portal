import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { throttle } from "../util/index";

export default function AlibabaCompetitionSubmission() {
    const { t } = useTranslation("common");
    const [fixedBgHeight, setFixedBgHeight] = useState(200);

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
            <div style={{ height: "900px", overflow: "hidden" }}>
                <iframe
                    src="https://materia-logic.sg.larksuite.com/share/base/form/shrlg5YSiLwlfeKieg83UqwkKQK"
                    width="100%"
                    height="1000px"
                    style={{ border: "none" }}
                    title="Alibaba Competition Submission Form"
                    allowFullScreen
                ></iframe>
            </div>
        </>
    );
}
