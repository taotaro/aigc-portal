import React, { useEffect, useState, useCallback } from "react";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { throttle } from "../util/index";

export default function Index() {
    const { t } = useTranslation("common");
    const [fixedBgHeight, setFixedBgHeight] = useState(200);

    const scheduleList1 = [
        { time: "2:00 – 2:30 pm", desc: "來賓登記" },
        { time: "2:30 – 2:35 pm", desc: "歡迎辭" },
        { time: "2:35 – 2:40 pm", desc: "全場合照" },
        { time: "2:40 – 2:50 pm", desc: "阿里雲教育方案概覽簡介" },
        {
            time: "2:50 – 3:00 pm",
            desc: (
                <div className="module-table__col-mul">
                    <p>利用「阿里雲學院認證」系統提升教與學成效</p>
                    <ul>
                        <li>何謂「阿里雲學院認證」</li>
                        <li>如何挑選適合自己的課程</li>
                        <li>如何運用認證內容快速提升掌握科技的能力</li>
                    </ul>
                </div>
            ),
        },
        {
            time: "3:00 – 4:00 pm",
            desc: "阿里雲學院活動證書工作坊 (即場取得 Alibaba Cloud Academy Event Certificate)",
        },
        {
            time: "4:00 – 4:15 pm",
            desc: "嘉賓對談及互節環節：認證課程對實際教學的幫助",
        },
        { time: "4:15 – 4:30 pm", desc: "中場休息及茶點招待" },
        { time: "4:30 – 4:45 pm", desc: "中學／小學賽制介紹及注意事項" },
        { time: "4:45 – 5:00 pm", desc: "問答時間" },
    ];

    const scheduleList2 = [
        { time: "2:00 – 2:30 pm", desc: "來賓登記" },
        { time: "2:30 – 2:35 pm", desc: "歡迎辭" },
        { time: "2:35 – 2:40 pm", desc: "全場合照" },
        { time: "2:40 – 2:50 pm", desc: "阿里雲教育方案概覽簡介" },
        {
            time: "2:50 – 3:00 pm",
            desc: (
                <div className="module-table__col-mul">
                    <p>通義AI平台的教育實踐應用</p>
                    <ul>
                        <li>介紹「通義」AI平台</li>
                        <li>如何引導同學利用AI科技創作，同時培養資訊素養</li>
                    </ul>
                </div>
            ),
        },
        {
            time: "3:00 – 3:45 pm",
            desc: "試驗工作坊 ：即場試用「通義萬相」圖像生成功能進行繪圖創作",
        },
        { time: "3:45 – 4:00 pm", desc: "嘉賓對談及互節環節：教育應用實例" },
        { time: "4:00 – 4:15 pm", desc: "中場休息及茶點招待" },
        { time: "4:15 – 4:30 pm", desc: "中學／小學賽制介紹及注意事項" },
        { time: "4:30 – 5:00 pm", desc: "問答時間" },
    ];

    const LogoList = [
        { name: "Alibaba", logo: "/images/ali.jpeg" },
        { name: "GamingNoodleSoup", logo: "/images/gns.png" },
        { name: "Materia Logic", logo: "/images/ml.png" },
        { name: "HKFEW", logo: "/images/teachers.jpeg" },
        { name: "Aitle", logo: "/images/aitle.png" },
        { name: "SteelSeries", logo: "/images/steelseries.png" },
    ];

    const PhotoList = [
        { name: "Photo 1", url: "/images/activity1.png" },
        { name: "Photo 1", url: "/images/activity1.png" },
        { name: "Photo 1", url: "/images/activity1.png" },
        { name: "Photo 1", url: "/images/activity1.png" },
        { name: "Photo 1", url: "/images/activity1.png" },
        { name: "Photo 1", url: "/images/activity1.png" },
        { name: "Photo 1", url: "/images/activity1.png" },
        { name: "Photo 1", url: "/images/activity1.png" },
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

    const tableColListRender1 = scheduleList1.map((item, index) => {
        return (
            <div className="module-table__row" key={index}>
                <div className="module-table__col">{item.time}</div>
                <div className="module-table__line"></div>
                <div className="module-table__col">{item.desc}</div>
            </div>
        );
    });

    const tableColListRender2 = scheduleList2.map((item, index) => {
        return (
            <div className="module-table__row" key={index}>
                <div className="module-table__col">{item.time}</div>
                <div className="module-table__line"></div>
                <div className="module-table__col">{item.desc}</div>
            </div>
        );
    });

    return (
        <>
            <NextSeo
                title={"阿里雲AI未來教室"}
                description={
                    "雲遊通義 – 阿里雲香港10週年校際生成式AI比賽發佈會"
                }
            />
            <img
                id="fixed-bg"
                className="position-fixed"
                onLoad={onWindowResize}
                src="https://cri-jh0uqm2iyt2q8ku4-registry.oss-cn-hongkong.aliyuncs.com/IMG_8739_animation.gif"
                alt=""
                style={{ width: "100%", height: "auto" }}
            />
            {/* slogan */}
            <section
                className="title-section position-relative"
                style={{ height: `${fixedBgHeight}px`, padding: "24px" }}
                id="indexModule"
            >
                <h1 className="title">雲遊通義 - </h1>
                <h1 className="title">阿里雲香港10週年</h1>
                <h1 className="title" style={{ paddingBottom: "200px" }}>
                    {" "}
                    校際生成式AI比賽
                </h1>
                <div className="module-button">
                    <a href="/registration">立即報名</a>
                </div>
                {/* <h3 className="subtitle">
          <p>雲遊通義 – 阿里雲香港10週年</p>
          <p>校際生成式AI比賽發佈會</p>
        </h3> */}
            </section>
            <div className="module-container">
                {/* 介绍 */}
                <section
                    className="position-relative module-box"
                    style={{
                        paddingTop: "80px",
                        marginBottom: "0px",
                        paddingBottom: "0px",
                    }}
                >
                    <p className="module-title-no-underline">
                        阿里雲香港10週年
                    </p>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "12px", // spacing between elements
                            marginTop: "12px",
                        }}
                    >
                        <div
                            style={{
                                width: "30%",
                                height: "4px",
                                background: "#ff6a00",
                            }}
                        ></div>

                        <img
                            onLoad={onWindowResize}
                            src="/images/ali-icon.png"
                            alt=""
                            style={{ width: "50px", height: "auto" }}
                        />

                        <div
                            style={{
                                width: "30%",
                                height: "4px",
                                background: "#ff6a00",
                            }}
                        ></div>
                    </div>
                </section>
                <section
                    className="position-relative module-box"
                    style={{
                        paddingTop: "24px",
                        marginBottom: "0px",
                        paddingBottom: "0px",
                    }}
                >
                    <p className="module-title-no-underline">
                        推動科技教育 激發創意潛能
                    </p>
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
                        {PhotoList.map((item, index) => {
                            return (
                                <div
                                    style={{
                                        padding: "40px",
                                        textAlign: "center",
                                        borderColor: "black",
                                        border: "1px solid black",
                                        borderRadius: "8px",
                                        borderWidth: "1px",
                                        maxWidth: "20%",
                                        minWidth: "250px",
                                        // background: "black",
                                    }}
                                >
                                    <img
                                        // id="fixed-bg"
                                        // className="position-fixed"
                                        // onLoad={onWindowResize}
                                        src={item.url}
                                        alt=""
                                        // style={{ width: "100%", height: "auto" }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section
                    className="position-relative module-box"
                    style={{
                        paddingTop: "80px",
                        marginBottom: "0px",
                        paddingBottom: "0px",
                    }}
                >
                    <p className="module-title">比賽簡介</p>
                </section>
                <section
                    className="position-relative module-box"
                    style={{
                        paddingTop: "80px",
                        paddingBottom: "80px",
                        marginTop: "0px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center", // Ensure the text inside the section is centered
                    }}
                >
                    <div className="module-content " style={{ padding: "0px" }}>
                        <img
                            className="intro-tag intro-tag-left"
                            src="/images/tag1.png"
                            alt="tag"
                        />
                        <div
                            style={{
                                fontSize: "24px",
                                paddingRight: "36px",
                                paddingLeft: "36px",
                            }}
                        >
                            <div className="text-left">
                                阿里雲有幸一直為香港各行各業的數碼轉型盡一分力，積累了豐富的行業經驗。人工智能作為新世代的科技熱點及未來趨勢之一，與雲端科技息息相關，為慶祝在港營運10周年，我們特別舉辦「雲遊通義
                                –
                                阿里雲香港10週年校際生成式AI比賽」，透個此次活動旨在通過與學界合作，提升教師與學生在雲端及AI領域的學習成果和效率，促進持續創新，共同培育未來科技人才。
                            </div>
                        </div>

                        <img
                            className="intro-tag intro-tag-right"
                            src="/images/tag1.png"
                            alt="tag"
                        />
                    </div>
                </section>
                <section
                    className="position-relative module-box"
                    id="gameInfoModule"
                    style={{ scrollMarginTop: "100px" }}
                >
                    <p className="module-title">比賽目標</p>
                    <div className="module-content" style={{ padding: "36px" }}>
                        <div className="module-content__left">
                            <div className="module-content__desc">
                                <ul
                                    style={{
                                        paddingLeft: "20px",
                                        textIndent: "-2px",
                                    }}
                                >
                                    <p>
                                        本次比賽旨在推動全港學校應用阿里雲AI技術，鼓勵師生在教與學環境中進行探索和實踐。同時期望促進學界技術創新與進步，並提升同學創意和解難能力。
                                    </p>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    className="position-relative module-box"
                    id="gameInfoModule"
                >
                    <p className="module-title">證書及獎品</p>
                    <p
                        style={{
                            padding: "36px 36px 0px 36px",
                            fontWeight: "bold",
                            fontSize: "28px",
                        }}
                    >
                        隊伍獎項
                    </p>
                    <div className="module-content" style={{ padding: "36px" }}>
                        <div className="module-table">
                            {" "}
                            <div
                                className="module-table__row module-table__header"
                                style={{ border: "1px solid black" }}
                            >
                                <div
                                    className="module-table__col"
                                    style={{
                                        alignSelf: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    小學組
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    冠軍（1名）
                                </div>
                                <div className="module-table__col">
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        <p>
                                            1） SteelSeries - Nova 5 Headset 3份
                                        </p>
                                        <p>2）獎盃 及 證書</p>
                                        <p>
                                            3） 阿里巴巴杭州總部參觀團
                                            (3日2夜機票連住宿 -
                                            學生連同一位帶隊老師 )
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    亞軍（1名）
                                </div>
                                <div className="module-table__col">
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        <p>
                                            1) SteelSeries – Apex 3 Keyboard 3份
                                        </p>
                                        <p>2) 獎盃＋證書</p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    季軍（1名）
                                </div>
                                <div className="module-table__col">
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        <p>
                                            1) SteelSeries – Rival 3 Mouse 3份
                                        </p>
                                        <p>2) 獎盃＋證書</p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    最踴躍參與獎 （共3名）
                                </div>
                                <div className="module-table__col">
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        <p>阿里雲 USD1000 代金券 (無影雲)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="module-content" style={{ padding: "36px" }}>
                        <div className="module-table">
                            {" "}
                            <div
                                className="module-table__row module-table__header"
                                style={{ border: "1px solid black" }}
                            >
                                <div
                                    className="module-table__col"
                                    style={{
                                        alignSelf: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    中學組
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    冠軍（1名）
                                </div>
                                <div className="module-table__col">
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        <p>
                                            1） SteelSeries - Nova 5 Headset 3份
                                        </p>
                                        <p>2）獎盃 及 證書</p>
                                        <p>
                                            3） 阿里巴巴杭州總部參觀團
                                            (3日2夜機票連住宿 -
                                            學生連同一位帶隊老師 )
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    亞軍（1名）
                                </div>
                                <div className="module-table__col">
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        <p>
                                            1) SteelSeries – Apex 3 Keyboard 3份
                                        </p>
                                        <p>2) 獎盃＋證書</p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    季軍（1名）
                                </div>
                                <div className="module-table__col">
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        <p>
                                            1) SteelSeries – Rival 3 Mouse 3份
                                        </p>
                                        <p>2) 獎盃＋證書</p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    最踴躍參與獎 （共3名）
                                </div>
                                <div className="module-table__col">
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        <p>阿里雲 USD1000 代金券 (無影雲)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="module-content" style={{ padding: "36px" }}>
                        <div className="module-table">
                            {" "}
                            <div
                                className="module-table__row module-table__header"
                                style={{ border: "1px solid black" }}
                            >
                                <div
                                    className="module-table__col"
                                    style={{
                                        alignSelf: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    展能組
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    冠軍（1名）
                                </div>
                                <div className="module-table__col">
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        <p>
                                            1） SteelSeries - Nova 5 Headset 3份
                                        </p>
                                        <p>2）獎盃 及 證書</p>
                                        <p>
                                            3） 阿里巴巴杭州總部參觀團
                                            (3日2夜機票連住宿 -
                                            學生連同一位帶隊老師 )
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    亞軍（1名）
                                </div>
                                <div className="module-table__col">
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        <p>
                                            1) SteelSeries – Apex 3 Keyboard 3份
                                        </p>
                                        <p>2) 獎盃＋證書</p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    季軍（1名）
                                </div>
                                <div className="module-table__col">
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        <p>
                                            1) SteelSeries – Rival 3 Mouse 3份
                                        </p>
                                        <p>2) 獎盃＋證書</p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    最踴躍參與獎 （共3名）
                                </div>
                                <div className="module-table__col">
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        <p>阿里雲 USD1000 代金券 (無影雲)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="module-content__left">
                            <div className="module-content__desc">
                                <p>
                                    所有合資格的參賽者均可獲得由阿里雲頒發的「阿里雲生成式AI校際比賽」
                                    參賽證書，優勝得獎作品將有機會在阿里雲香港峰會展示。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 精彩內容包括 */}
                <section
                    className="position-relative module-box"
                    id="requirementsModule"
                    style={{ scrollMarginTop: "100px" }}
                >
                    <p className="module-title">比賽要求</p>
                    <div className="module-content" style={{ padding: "36px" }}>
                        <div className="module-table">
                            <div
                                className="module-table__row "
                                style={{ borderTop: " 1px solid #242424" }}
                            >
                                <div className="module-table__col">小學組</div>
                                <div className="module-table__col">
                                    創作AI故事圖書
                                </div>
                                <div className="module-table__col">
                                    參賽者需要學習使用「通義千問」大語言模型和「通義萬相」文生圖模型，應用AI技術創作圍繞「我的校園生活」主題的故事圖書（可以自訂文題）。
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">中學組</div>
                                <div className="module-table__col">
                                    創作AI互動式小說
                                </div>
                                <div className="module-table__col">
                                    參賽者需要學習使用「通義千問」大語言模型和「通義萬相」文生圖模型，應用AI技術創作圍繞「未來科技世界」互動式小說（可以自訂文題）。
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">展能組</div>
                                <div className="module-table__col">
                                    創作AI圖像作品
                                </div>
                                <div className="module-table__col">
                                    歡迎具特殊需要的同學參與。
                                    參賽者需要學習使用「通義萬相」文生圖模型，應用AI技術創作圖像作品，題材不限。
                                </div>
                            </div>
                        </div>
                    </div>
                    <p
                        style={{
                            padding: "36px 36px 0px 36px",
                            fontWeight: "bold",
                            fontSize: "28px",
                        }}
                    >
                        評分標準
                    </p>
                    <div className="module-content" style={{ padding: "36px" }}>
                        <div className="module-table">
                            {" "}
                            <div
                                className="module-table__row module-table__header"
                                style={{ border: "1px solid black" }}
                            >
                                <div
                                    className="module-table__col"
                                    style={{ width: "70%" }}
                                >
                                    評分範疇
                                </div>
                                <div
                                    className="module-table__col"
                                    style={{ width: "70%" }}
                                >
                                    佔分比重
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div
                                    className="module-table__col"
                                    style={{ width: "70%" }}
                                >
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        1. AI模型的技術使用：
                                        <li>
                                            學生是否有效地運用「通義千問」大語言模型和「通義萬相」
                                            文生圖模型？
                                        </li>
                                        <li>
                                            AI生成的元素是否良好地融入了創作內容？
                                        </li>
                                    </div>
                                </div>
                                <div
                                    className="module-table__col"
                                    style={{ width: "70%" }}
                                >
                                    35%
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div
                                    className="module-table__col"
                                    style={{ width: "70%" }}
                                >
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        2. 創意和原創性：
                                        <li>作品是否獨特和具想像力？</li>
                                        <li>
                                            作品是否表現了新穎和具創意的想法？
                                        </li>
                                    </div>
                                </div>
                                <div
                                    className="module-table__col"
                                    style={{ width: "70%" }}
                                >
                                    25%
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div
                                    className="module-table__col"
                                    style={{ width: "70%" }}
                                >
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        3. 內容與主題的相關性：
                                        <li>創作內容是否緊扣題旨？</li>
                                        <li>內容是否良好地呈現主題？</li>
                                    </div>
                                </div>
                                <div
                                    className="module-table__col"
                                    style={{ width: "70%" }}
                                >
                                    20%
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div
                                    className="module-table__col"
                                    style={{ width: "70%" }}
                                >
                                    <div
                                        className="module-content__desc"
                                        style={{
                                            fontSize: "18px",
                                            marginTop: "0px",
                                        }}
                                    >
                                        4. 呈現方式和格式：
                                        <li>
                                            故事是否脈絡清晰？敘事是否流暢？
                                        </li>
                                        <li>
                                            視覺上是否吸引人？圖像是否配置得當？
                                        </li>
                                    </div>
                                </div>
                                <div
                                    className="module-table__col"
                                    style={{ width: "30%" }}
                                >
                                    20%
                                </div>
                            </div>
                        </div>
                        <div className="module-content__left">
                            <div className="module-content__desc">
                                <p>
                                    注：參賽作品須為原創，禁止抄襲。違者有可能被取消資格。
                                </p>
                            </div>
                        </div>
                    </div>
                    <p
                        style={{
                            padding: "36px 36px 0px 36px",
                            fontWeight: "bold",
                            fontSize: "28px",
                            scrollMarginTop: "100px",
                        }}
                        id="scheduleModule"
                    >
                        比賽日程
                    </p>
                    <div className="module-content" style={{ padding: "36px" }}>
                        <div className="module-table">
                            {" "}
                            <div
                                className="module-table__row module-table__header"
                                style={{ border: "1px solid black" }}
                            >
                                <div className="module-table__col">日期</div>
                                <div className="module-table__col">內容</div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    2024年9月28日
                                </div>
                                <div className="module-table__col">
                                    「通義」比賽開幕儀式及工作坊
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    2024年10月1日
                                </div>
                                <div className="module-table__col">
                                    開放提交作品
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    2024年10月31日
                                </div>
                                <div className="module-table__col">
                                    截止提交作品
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    2024年11月13日
                                </div>
                                <div className="module-table__col">
                                    通知得獎者
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    2024年11月27日
                                </div>
                                <div className="module-table__col">
                                    「阿里雲香港峰會」作品展示
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    2024年11月下旬至12月
                                </div>
                                <div className="module-table__col">
                                    （待定）於展覽場地舉行作品展覽
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* schedule workshop */}
                <section className="position-relative module-box">
                    <p
                        style={{
                            padding: "36px 36px 0px 36px",
                            fontWeight: "bold",
                            fontSize: "28px",
                            scrollMarginTop: "100px",
                        }}
                        id="scheduleModule"
                    >
                        比賽工作坊
                    </p>
                    <div
                        className="module-content"
                        style={{ padding: "36px", paddingTop: "0px" }}
                    >
                        <div className="module-content__left">
                            {/* <div className="module-content__title">活動資訊</div> */}
                            <div className="module-content__desc">
                                <div>日期：2024年9月28日（星期六） </div>
                                <div>時間：待定</div>
                                <div>地點：待定</div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* schedule workshop */}
                <section
                    className="position-relative module-box"
                    id="scheduleModule"
                    style={{ scrollMarginTop: "100px" }}
                >
                    <p
                        style={{
                            padding: "36px 36px 0px 36px",
                            fontWeight: "bold",
                            fontSize: "28px",
                            scrollMarginTop: "100px",
                        }}
                        id="scheduleModule"
                    >
                        頒獎禮@「阿里雲香港峰會」
                    </p>
                    <div
                        className="module-content"
                        style={{ padding: "36px", paddingTop: "0px" }}
                    >
                        <div className="module-content__left">
                            {/* <div className="module-content__title">活動資訊</div> */}
                            <div className="module-content__desc">
                                <div>日期：2024年11月27日（星期三）</div>
                                <div>時間：待定</div>
                                <div>地點：待定</div>
                                <div>*部分安排可能會更改，以不作另行通知</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section className="position-relative module-box">
                    <div className="module-button">
                        <a href="/registration" target="__blank">
                            立即報名
                        </a>
                    </div>
                </section> */}
                <section
                    className="position-relative module-box"
                    id="gameInfoModule"
                    style={{ scrollMarginTop: "100px" }}
                >
                    <p className="module-title">活動查詢及聯絡</p>
                    <div className="module-content" style={{ padding: "36px" }}>
                        <div className="module-content__left">
                            {/* <div className="module-content__title">活動資訊</div> */}
                            <div
                                className="module-content__desc"
                                style={{
                                    wordWrap: "break-word",
                                    overflowWrap: "break-word",
                                }}
                            >
                                如有任何活動問題，歡迎聯絡 Gamenoodlesoup(
                                <a
                                    href="mailto:edu@gamenoodlesoup.com"
                                    // target="_blank"
                                    style={{
                                        color: "#ff6a00",
                                        wordBreak: "break-all",
                                    }}
                                >
                                    edu@gamenoodlesoup.com
                                </a>{" "}
                                / 30011280)
                            </div>
                        </div>
                        <div className="module-content__desc">
                            <div style={{ marginBottom: "24px" }}>
                                參賽者必須同意在參與活動時遵守活動條款及細則，詳情請
                                <a
                                    href="https://aigc-portal-dev.materia-logic.com/terms"
                                    target="_blank"
                                    style={{ color: "#ff6a00" }}
                                >
                                    按此
                                </a>
                                查閱。
                            </div>
                            <div>
                                是次活動所收集的資料只用作活動登記、通訊及相關用途，並只限Alibaba
                                Cloud及其授權之服務承辦商存取。登記者有權要求查閱、更正或刪除其個人資料。如有查詢，與我們聯絡。有關詳情亦可瀏覽{" "}
                                <a
                                    href="https://www.alibabacloud.com/help/tc/legal/latest/alibaba-cloud-international-website-privacy-policy"
                                    target="_blank"
                                    style={{ color: "#ff6a00" }}
                                >
                                    Alibaba Cloud的私隱政策
                                </a>{" "}
                                。
                            </div>
                        </div>
                    </div>
                </section>
                {/* 活動支持 */}
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
                    <div className="module-logos">
                        {LogoList.filter((item) => item.name !== "Alibaba").map(
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
                </section>
                {/* footer */}
            </div>
        </>
    );
}

Index.EXTEND_INFO = {
    pageName: "INDEX",
};
