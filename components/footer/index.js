import React, { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

export default function Footer() {
    const { t } = useTranslation();

    return (
        <>
            <section
                className="position-relative module-box"
                id="gameInfoModule"
                style={{ scrollMarginTop: "100px" }}
            >
                <p className="module-title">活動查詢及聯絡</p>
                <div className="module-content" style={{ padding: "36px" }}>
                    <div className="module-content__left">
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
                            、通義平台的
                            <a
                                href="https://terms.alicdn.com/legal-agreement/terms/c_end_product_protocol/20231011201348415/20231011201348415.html"
                                target="_blank"
                                style={{ color: "#ff6a00" }}
                            >
                                用戶協議
                            </a>
                            和
                            <a
                                href="https://terms.alicdn.com/legal-agreement/terms/privacy_policy_full/20231011201849846/20231011201849846.html"
                                target="_blank"
                                style={{ color: "#ff6a00" }}
                            >
                                私隱政策。
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
