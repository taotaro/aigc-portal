import React, { useEffect, useState, useCallback } from "react";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { throttle } from "../util/index";
import Logo from "../components/logo";
import Footer from "../components/footer";

export default function Index() {
    const { t } = useTranslation("common");
    const [fixedBgHeight, setFixedBgHeight] = useState(200);
    const PhotoList = [
        { name: "Photo 2", url: "/images/photo2.jpeg" },
        { name: "Photo 3", url: "/images/photo3.jpeg" },
        { name: "Photo 5", url: "/images/photo5.jpeg" },
        { name: "Photo 6", url: "/images/photo6.jpeg" },
        { name: "Photo 11", url: "/images/photo11.jpeg" },
        { name: "Photo 13", url: "/images/photo13.jpeg" },
        { name: "Photo 14", url: "/images/photo14.jpeg" },
        { name: "Photo 16", url: "/images/photo16.jpeg" },
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
            <img
                id="fixed-bg"
                className="position-fixed"
                onLoad={onWindowResize}
                src="https://cri-jh0uqm2iyt2q8ku4-registry.oss-cn-hongkong.aliyuncs.com/IMG_8739_animation.gif"
                alt=""
                style={{
                    width: "100%",
                    height: "auto",
                }}
            />

            {/* slogan */}
            <div className="module-container-title">
                <section
                    className="title-section position-relative"
                    style={{
                        height: `${fixedBgHeight}px`,
                        minWidth: "100%",
                    }}
                    id="indexModule"
                >
                    <h1 className="title">雲遊通義 - </h1>
                    <h1 className="title">阿里雲香港10週年</h1>
                    <h1 className="title" style={{ paddingBottom: "100px" }}>
                        {" "}
                        校際生成式AI比賽
                    </h1>
                    <div className="module-button">
                        <a href="/registration" target="__blank">
                            立即報名
                        </a>
                    </div>
                </section>
            </div>
            <div className="module-container">
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
                            gap: "12px",
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
                            gap: "40px",
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
                                        textAlign: "center",
                                        borderColor: "black",
                                        borderRadius: "8px",
                                        borderWidth: "1px",
                                        maxWidth: "20%",
                                        minWidth: "250px",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <img
                                        src={item.url}
                                        alt=""
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                        }}
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
                        textAlign: "center",
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
                                過去10年，阿里雲在港整體投入超過 100
                                億港元，用於建立數據中心，拓展產品和服務，以及助力發展本地科技人才。人工智能作為新世代的科技熱點及未來趨勢之一，與雲端科技息息相關，為慶祝在港營運10周年，我們特別舉辦「雲遊通義
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
                                    冠軍 (1隊)
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
                                            <li>
                                                阿里巴巴杭州總部參觀團
                                                (3日2夜機票連住宿3日2夜 -
                                                學生連同一位帶隊老師)
                                            </li>
                                        </p>
                                        <p>
                                            <li>
                                                SteelSeries Arctis Nova 5
                                                無線電競耳機 3份
                                            </li>
                                        </p>
                                        <p>
                                            <li>比賽獎盃及證書</li>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    亞軍 (1隊)
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
                                            <li>
                                                SteelSeries Apex 3 電競鍵盤 3份
                                            </li>
                                        </p>
                                        <p>
                                            <li>比賽獎盃及證書</li>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    季軍 (1隊)
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
                                            <li>
                                                SteelSeries Rival 3 無線電競滑鼠
                                                3份
                                            </li>
                                        </p>
                                        <p>
                                            <li>比賽獎盃及證書</li>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    最踴躍參與學校獎 (共3名)
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
                                            <li>
                                                每組別最多參與隊伍的三間學校將獲得阿里雲
                                                USD1000 代金券
                                            </li>
                                        </p>
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
                                    冠軍 (1隊)
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
                                            <li>
                                                阿里巴巴杭州總部參觀團
                                                (3日2夜機票連住宿3日2夜 -
                                                學生連同一位帶隊老師)
                                            </li>
                                        </p>
                                        <p>
                                            <li>
                                                SteelSeries Arctis Nova 5
                                                無線電競耳機 3份
                                            </li>
                                        </p>
                                        <p>
                                            <li>比賽獎盃及證書</li>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    亞軍 (1隊)
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
                                            <li>
                                                SteelSeries Apex 3 電競鍵盤 3份
                                            </li>
                                        </p>
                                        <p>
                                            <li>比賽獎盃及證書</li>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    季軍 (1隊)
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
                                            <li>
                                                SteelSeries Rival 3 無線電競滑鼠
                                                3份
                                            </li>
                                        </p>
                                        <p>
                                            <li>比賽獎盃及證書</li>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    最踴躍參與學校獎 (共3名)
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
                                            <li>
                                                每組別最多參與隊伍的三間學校將獲得阿里雲
                                                USD1000 代金券
                                            </li>
                                        </p>
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
                                    冠軍 (1隊)
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
                                            <li>
                                                阿里巴巴杭州總部參觀團
                                                (3日2夜機票連住宿3日2夜 -
                                                學生連同一位帶隊老師)
                                            </li>
                                        </p>
                                        <p>
                                            <li>
                                                SteelSeries Arctis Nova 5
                                                無線電競耳機 3份
                                            </li>
                                        </p>
                                        <p>
                                            <li>比賽獎盃及證書</li>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    亞軍 (1隊)
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
                                            <li>
                                                SteelSeries Apex 3 電競鍵盤 3份
                                            </li>
                                        </p>
                                        <p>
                                            <li>比賽獎盃及證書</li>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    季軍 (1隊)
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
                                            <li>
                                                SteelSeries Rival 3 無線電競滑鼠
                                                3份
                                            </li>
                                        </p>
                                        <p>
                                            <li>比賽獎盃及證書</li>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="module-table__row ">
                                <div className="module-table__col">
                                    最踴躍參與學校獎 (共3名)
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
                                            <li>
                                                每組別最多參與隊伍的三間學校將獲得阿里雲
                                                USD1000 代金券
                                            </li>
                                        </p>
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
                                    {/* 注：參賽作品須為原創，禁止抄襲。違者有可能被取消資格。 */}
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
                        比賽開幕禮及工作坊
                    </p>
                    <div
                        className="module-content"
                        style={{ padding: "36px", paddingTop: "0px" }}
                    >
                        <div className="module-content__left">
                            <div className="module-content__desc">
                                <div>日期：2024年9月28日（星期六） </div>
                                <div>時間：上午9時半至中午12時半</div>
                                <div>地點：香港銅鑼灣禮頓道140號聖保祿學校</div>
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
                            <div className="module-content__desc">
                                <div>日期：2024年11月27日（星期三）</div>
                                <div>時間：待定</div>
                                <div>地點：待定</div>
                                <div>*部分安排可能會更改，以不作另行通知</div>
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

Index.EXTEND_INFO = {
    pageName: "INDEX",
};
