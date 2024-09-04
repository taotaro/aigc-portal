import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { throttle } from "../util/index";

export default function Terms() {
    const { t } = useTranslation("common");
    const [fixedBgHeight, setFixedBgHeight] = useState(200);

    const LogoList = [
        { name: "Alibaba", logo: "/images/ali.jpeg" },
        { name: "GamingNoodleSoup", logo: "/images/gns.png" },
        { name: "Materia Logic", logo: "/images/ml.png" },
        { name: "HKFEW", logo: "/images/teachers.jpeg" },
        { name: "Aitle", logo: "/images/aitle.png" },
    ];

    const sponsorList = [
        { name: "SteelSeries", logo: "/images/steelseries.png" },
    ]

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
                title={"阿里雲AI未來教室"}
                description={"雲遊通義 – 阿里雲香港10週年校際生成式AI比賽發佈會"}
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
                    style={{ paddingTop: "80px" }}
                >
                    <p className="module-title">活動條款及細則</p>
                    <div className="module-content" style={{ padding: "36px" }}>
                        <div className="module-content__left">
                            {/* <div className="module-content__title">活動資訊</div> */}
                            <p
                                style={{
                                    padding: "36px 36px 0px 36px",
                                    fontWeight: "bold",
                                    fontSize: "28px",
                                }}
                            >
                                一、一般
                            </p>
                            <div className="module-content" style={{ padding: "36px" }}>
                                {/* <div className= */}
                                <div
                                    className="module-content__desc"
                                    style={{ marginTop: "-10px" }}
                                >
                                    <div>
                                        1.1.
                                        凡報名一經採納，即表示參賽隊伍已細閱讀相關比賽條款和細則，並同意受其約束。
                                    </div>
                                    <div>
                                        1.2.
                                        凡經由大會發出之電子郵件、機構網站及/或社交媒體平台上發布的相關通知和程序，均視為比賽規則和條例的一部分。
                                    </div>
                                    <div>
                                        1.3.
                                        大會保留不時修改比賽規則及條例的權利。所有此類變更以及比賽相關的通知將在大會網站及/或社交媒體平台上發布。
                                    </div>
                                    <div>
                                        1.4. 任何違反比賽規則和條例的參賽隊伍可會被取消比賽資格。
                                    </div>
                                    <div>
                                        1.5.
                                        任何參賽隊伍老師或學生若違反比賽規則和條例，均可導致其隊伍被取消比賽資格。
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
                                二、參賽者資料
                            </p>
                            <div className="module-content" style={{ padding: "36px" }}>
                                {/* <div className= */}
                                <div
                                    className="module-content__desc"
                                    style={{ marginTop: "-10px" }}
                                >
                                    <div>
                                        2.1.
                                        一經報名，參賽隊伍須確保報名表上所提供的所有資料均屬準確。
                                    </div>
                                    <div>
                                        2.2.
                                        大會可能在需要時要求參賽隊伍提供更多資訊。參賽隊伍應當適時及準確提供相關內容。
                                    </div>
                                    <div>
                                        2.3.
                                        若因缺乏所需資料或所提供資料有誤，因而導致與參賽隊伍溝通出現延誤或錯漏，大會概不負責。
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
                                三、工作坊及活動
                            </p>
                            <div className="module-content" style={{ padding: "36px" }}>
                                {/* <div className= */}
                                <div
                                    className="module-content__desc"
                                    style={{ marginTop: "-10px" }}
                                >
                                    <div>
                                        3.1.
                                        大會保留確定所有工作坊、活動最終的日期、時間和地點之權利，而無需諮詢參賽隊伍。
                                    </div>
                                    <div>3.2. 大會保留調動、修改或取消相關活動安排之權利。</div>
                                    <div>
                                        3.3.
                                        若參賽隊伍無法參加指定工作坊或活動時段，大會可自行決定是否為該隊伍另作安排。
                                    </div>
                                    <div>
                                        3.4. 若比賽因任何原因取消，大會可自行決定是否另作安排。
                                    </div>
                                    <div>3.5. 所有參與者和觀眾必須遵守活動場所之規則。</div>
                                    <div>
                                        3.6. 所有出席者應自行看管個人財物。任何損失大會概不負責。
                                    </div>
                                    <div>3.7. 活動場地均不提供車位。</div>
                                </div>
                            </div>
                            <p
                                style={{
                                    padding: "36px 36px 0px 36px",
                                    fontWeight: "bold",
                                    fontSize: "28px",
                                }}
                            >
                                四、參賽作品
                            </p>
                            <div className="module-content" style={{ padding: "36px" }}>
                                {/* <div className= */}
                                <div
                                    className="module-content__desc"
                                    style={{ marginTop: "-10px" }}
                                >
                                    <div>
                                        4.1.
                                        評委將根據以下分項對作品進行評分：AI模型的技術使用(35%)、創意和原創性(25%)、內容與主題的相關性(20%)、呈現方式和格式(20%)。
                                    </div>
                                    <div>
                                        4.2. 作品必須依照大會指定方法及格式遞交，否則可被取消資格。
                                    </div>
                                    <div>4.3. 參賽作品如包括文字，須使用中文。</div>
                                    <div>4.4. 每隊參賽隊伍只可提交一份參賽作品。</div>
                                    <div>
                                        4.5.
                                        學校及參賽者須確保其提交的參賽作品不含有淫褻、暴力、色情、誹謗、不良意識、侮辱、歧視成分或任何具爭議性及不適當的內容，亦不會違反香港特區的法律，以及導致或構成危害國家安全，否則將被取消參賽資格。
                                    </div>
                                    <div>
                                        4.6.
                                        參賽作品如有抄襲、摘錄或侵犯著作權之行為，有關法律責任由參加者自行承擔。
                                    </div>
                                    <div>
                                        4.7.
                                        參賽作品的意念和內容須符合是次比賽的主題，參賽者須確保其參賽作品屬原創，並且未曾參與過其他同類型活動或比賽。
                                    </div>
                                    <div>
                                        4.8.
                                        大會可將參賽作品作任何宣傳、展覽及印刷用途而毋須事前取得參加者的同意，或支付參賽者任何費用，所有交來之作品一概不獲發還。
                                    </div>
                                    <div>
                                        4.9.
                                        大會保留於任何時間取消任何參賽隊伍資格的權利。如有任何爭議，大會保留最終決定權。
                                    </div>
                                    <div>
                                        4.10.
                                        比賽結果由大會評審作最終決定，參賽者對比賽結果和獎項不能異議。
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
                                五、雜項
                            </p>
                            <div className="module-content" style={{ padding: "36px" }}>
                                {/* <div className= */}
                                <div
                                    className="module-content__desc"
                                    style={{ marginTop: "-10px" }}
                                >
                                    <div>5.1. 大會擁有對比賽規則未盡事宜的最終詮釋權。</div>
                                    <div>
                                        5.2.
                                        若教育局因傳染病或天氣惡劣或其他原因宣布停課，活動則會隨之取消。大會有可能不會就取消的活動事宜作進一步公告。
                                    </div>
                                    <div>
                                        5.3.
                                        基於公共衛生考量，大會將保留酌情權，可禁止任何個人或團體參加比賽及相關活動。
                                    </div>
                                    <div>
                                        5.4.
                                        大會可使用及上傳參賽者照片、影片、比賽信息或獲獎等資料至相關網站或其他項目進行宣傳。大會無需事先通知參加者及其家人或支付任何相關費用。
                                    </div>
                                    <div>
                                        5.5.
                                        若獲大會邀請，得獎隊伍須配合進行拍攝及訪問，而採訪內容將可能製作成宣傳影片，上傳至比賽網站及其他網上短片平台，於平面媒體、數碼媒體、社交媒體刊登，及供大會或活動協辦機構使用，而無須事先徵得學校及參賽者的同意。
                                    </div>
                                    <div>
                                        5.6. 所有與比賽相關攝影、錄像和錄音的權利均歸大會所有。
                                    </div>
                                    <div>
                                        5.7. 參賽學校老師將作為比賽報名者，報名即視為承諾已經取得該校參賽學生的法定監護人對該學生在報名老師註冊的通義帳號下使用通義平為參賽的同意。老師將對其帳號的註冊和使用負全責，包括但不限於參賽相關操作、資料輸入、賬戶登入和安全。
                                    </div>
                                    <div>
                                        5.8. 參賽者及報名者須仔細閱讀比賽條款及細則。參賽隊伍的報名者遞交報名後即表示同意遵守及接受
                                        <a href="https://www.alibabacloud.com/help/tc/legal/latest/alibaba-cloud-international-website-privacy-policy" target="_blank" rel="noopener noreferrer">Alibaba Cloud私隱政策</a>、
                                        <a href="https://terms.alicdn.com/legal-agreement/terms/c_end_product_protocol/20231011201348415/20231011201348415.html" target="_blank" rel="noopener noreferrer">通義平台用戶協議</a>和
                                        <a href="https://terms.alicdn.com/legal-agreement/terms/privacy_policy_full/20231011201849846/20231011201849846.html" target="_blank" rel="noopener noreferrer">私隱政策</a>
                                        及有關參賽條款及安排。
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* {footer} */}
                <section className="position-relative module-box">
                    <p className="module-title">活動主辦</p>
                    <div className="module-logos">
                        {LogoList.filter((item) => item.name === "Alibaba").map((item) => {
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
                        })}
                    </div>
                    <p className="module-title" style={{ paddingTop: "24px" }}>
                        支持單位
                    </p>
                    <div className="module-logos">
                        {LogoList.filter((item) => item.name !== "Alibaba").map((item) => {
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
                        })}
                    </div>
                    <p className="module-title" style={{ paddingTop: "24px" }}>
                        活動贊助
                    </p>
                    <div className="module-logos">
                        {sponsorList.filter((item) => item.name !== "Alibaba").map((item) => {
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
                        })}
                    </div>
                </section>
            </div>
        </>
    );
}
