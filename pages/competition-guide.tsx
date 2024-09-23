import React, { useEffect, useState, useCallback } from "react";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { throttle } from "../util/index";
import Footer from "../components/footer";
import Logo from "../components/logo";

export default function CompetitionGuide() {
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
                id="fixed-bg"
            />

            <div className="module-container">
                <section
                    className="position-relative module-box"
                    id="requirementsModule"
                    style={{ scrollMarginTop: "100px" }}
                >
                    <p
                        style={{
                            padding: "36px 36px 0px 36px",
                            fontWeight: "bold",
                            fontSize: "28px",
                            paddingTop: "80px",
                        }}
                    >
                        小學組要求
                    </p>
                    <div className="module-content" style={{ padding: "36px" }}>
                        <div
                            className="module-content__desc"
                            style={{ marginTop: "-10px" }}
                        >
                            創作AI故事圖書：
                            <ul
                                style={{
                                    paddingLeft: "20px",
                                    textIndent: "-2px",
                                }}
                            >
                                <li>2-4人一組參賽，組員須為同校同學。</li>
                                <li>參賽者需要學習使用：</li>
                                <ul>
                                    1.
                                    <a
                                        href="https://tongyi.aliyun.com/qianwen"
                                        target="_blank"
                                        style={{ color: "#ff6a00" }}
                                    >
                                        「通義千問」大語言模型
                                    </a>{" "}
                                </ul>
                                <ul>
                                    2.
                                    <a
                                        href="https://tongyi.aliyun.com/wanxiang"
                                        target="_blank"
                                        style={{ color: "#ff6a00" }}
                                    >
                                        「通義萬相」文生圖模型
                                    </a>{" "}
                                </ul>
                                <li>
                                    參賽者須根據大會指定主題創作一本故事圖書。
                                </li>
                                <li>
                                    故事圖書應包含明確的開首、過程和結尾，並配有插圖來輔助故事的呈現，讓讀者充份理解故事內容。
                                </li>
                                <li>
                                    參賽者必須使用「通義千問」啟發、生成或協助創作部份內容。
                                </li>
                                <li>所有參賽圖像必須以「通義萬相」 生成。</li>
                                <li>
                                    每隊參賽隊伍須繳交1個PDF檔案參賽，尺寸為A5大小，其中包含封面(1頁)、內容(上限30頁)、封底(1頁)。
                                </li>
                                <li>作品全文不可多於1,000字。</li>
                                <li>
                                    參賽隊伍必須同時提交以「通義」工具生成圖像及文字內容的相關模型提示
                                    (prompt)詳情。
                                </li>
                                <li>
                                    大會將根據參賽作品的AI模型的技術使用、創意和原創性、內容與主題的相關性、呈現方式和格式來進行評分。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p
                        style={{
                            padding: "36px 36px 0px 36px",
                            fontWeight: "bold",
                            fontSize: "28px",
                        }}
                    >
                        中學組要求
                    </p>
                    <div className="module-content" style={{ padding: "36px" }}>
                        <div
                            className="module-content__desc"
                            style={{ marginTop: "-10px" }}
                        >
                            創作AI互動式小說：
                            <ul
                                style={{
                                    paddingLeft: "20px",
                                    textIndent: "-2px",
                                }}
                            >
                                <li>2-4人一組參賽，組員須為同校同學。</li>
                                <li>參賽者需要學習使用：</li>
                                <ul>
                                    1.
                                    <a
                                        href="https://tongyi.aliyun.com/qianwen"
                                        target="_blank"
                                        style={{ color: "#ff6a00" }}
                                    >
                                        「通義千問」大語言模型
                                    </a>{" "}
                                </ul>
                                <ul>
                                    2.
                                    <a
                                        href="https://tongyi.aliyun.com/wanxiang"
                                        target="_blank"
                                        style={{ color: "#ff6a00" }}
                                    >
                                        「通義萬相」文生圖模型
                                    </a>{" "}
                                </ul>
                                <li>
                                    參賽者須根據大會指定主題創作一本互動式小說。
                                </li>
                                <li>
                                    互動式小說是一種讓讀者參與故事發展的小說形式。讀者可以在閱讀過程中做出選擇，而這些選擇會改變故事的進展和結局。因此參賽作品應設計多個選擇點和分支結局，讓讀者能根據自己的決策體驗不同的劇情走向。
                                </li>
                                <li>
                                    參賽者必須使用「通義千問」啟發、生成或協助創作部份內容。
                                </li>
                                <li>
                                    參賽隊伍需要為劇本中每位角色設計至少1張圖像；作品亦可附有內頁插畫。作品中所有圖像必須以「通義萬相」
                                    生成。
                                </li>
                                <li>
                                    每隊參賽隊伍須繳交1個PDF檔案參賽，尺寸為A5大小，其中包含封面(1頁)、內容(上限100頁)、封底(1頁)。
                                </li>
                                <li>作品全文不可多於5,000字。</li>
                                <li>
                                    參賽隊伍必須同時提交以「通義」工具生成圖像及文字內容的相關模型提示
                                    (prompt)詳情。
                                </li>
                                <li>
                                    大會將根據參賽作品的AI模型的技術使用、創意和原創性、內容與主題的相關性、呈現方式和格式來進行評分。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p
                        style={{
                            padding: "36px 36px 0px 36px",
                            fontWeight: "bold",
                            fontSize: "28px",
                        }}
                    >
                        展能組要求
                    </p>
                    <div className="module-content" style={{ padding: "36px" }}>
                        <div
                            className="module-content__desc"
                            style={{ marginTop: "-10px" }}
                        >
                            創作AI圖像作品：
                            <ul
                                style={{
                                    paddingLeft: "20px",
                                    textIndent: "-2px",
                                }}
                            >
                                <li>2-4人一組參賽，組員須為同校同學。</li>
                                <li>參賽者需要學習使用：</li>
                                <ul>
                                    1.
                                    <a
                                        href="https://tongyi.aliyun.com/qianwen"
                                        target="_blank"
                                        style={{ color: "#ff6a00" }}
                                    >
                                        「通義千問」大語言模型
                                    </a>{" "}
                                </ul>
                                <ul>
                                    2.
                                    <a
                                        href="https://tongyi.aliyun.com/wanxiang"
                                        target="_blank"
                                        style={{ color: "#ff6a00" }}
                                    >
                                        「通義萬相」文生圖模型
                                    </a>{" "}
                                </ul>
                                <li>
                                    參賽者可自由選擇主題創作一幅圖像作品，以鼓勵表達個人興趣、情感或需要。
                                </li>
                                <li>
                                    參賽者必須使用「通義萬相」啟發、生成或協助創作部份內容。
                                </li>
                                <li>
                                    每隊參賽隊伍須繳交1個PDF檔案參賽，尺寸為A5大小，上限為1頁。
                                </li>
                                <li>
                                    如有需要，作品可附有不多於200中文字簡介，並可選擇使用「通義千問」協助內容創作。
                                </li>
                                <li>
                                    參賽隊伍必須同時提交以「通義」工具生成圖像及文字內容的相關模型提示
                                    (prompt)詳情。
                                </li>
                                <li>
                                    大會將根據參賽作品的AI模型的技術使用、創意和原創性、內容與主題的相關性、呈現方式和格式來進行評分。
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section
                    className="position-relative module-box"
                    id="gameInfoModule"
                    style={{ scrollMarginTop: "100px" }}
                >
                    <p className="module-title">注意事項 </p>
                    <div className="module-content" style={{ padding: "36px" }}>
                        <div className="module-content__left">
                            <div className="module-content__desc">
                                <ul
                                    style={{
                                        paddingLeft: "20px",
                                        textIndent: "-2px",
                                    }}
                                >
                                    <li>
                                        參賽組別分為小學組、中學組及展能組（為特殊學校學生開設）。
                                    </li>
                                    <li>
                                        參賽者將以隊際形式報名，參賽隊伍將由學校老師代表報名。
                                    </li>
                                    <li>
                                        參賽者必須為2024至2025學年仍然就讀該校的全日制學生。
                                    </li>
                                    <li>
                                        每隊隊伍由 2 – 4
                                        人組成，每間學校不限報名隊伍數量。
                                    </li>
                                    <li>
                                        參賽者需要使用阿里雲旗下AI應用平台「通義千問」及「通義萬相」進行比賽。
                                    </li>
                                    <li>工作坊及賽事作品內容均以中文進行。</li>
                                    <li>參賽費用全免。</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="position-relative module-box">
                    <div className="module-button">
                        <a href="/registration" target="__blank">
                            立即報名
                        </a>
                    </div>
                </section>
                <Footer />
                <Logo />
            </div>
        </>
    );
}

CompetitionGuide.EXTEND_INFO = {
    pageName: "COMPETITION_GUIDE",
};
