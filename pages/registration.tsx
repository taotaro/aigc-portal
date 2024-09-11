import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { throttle } from "../util/index";
import Teams from "../components/teams";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { wrap } from "module";
import { FaTrashAlt } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import InputField from "../components/input-field";

export default function Registration() {
    const { t } = useTranslation("common");
    const [fixedBgHeight, setFixedBgHeight] = useState(200);
    const [teams, setTeams] = useState([
        {
            id: 1,
            members: [
                { id: 1, data: {} },
                { id: 2, data: {} },
            ],
            schoolGroup: "",
        },
    ]);
    const [isAgreed, setIsAgreed] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [resetAllFields, setResetAllFields] = useState(false);
    const [formData, setFormData] = useState({
        schoolNameCN: "",
        schoolNameEN: "",
        // schoolAddressCN: "",
        // schoolAddressEN: "",
        teacherTitle: "",
        teacherNameCN: "",
        teacherNameEN: "",
        schoolPhone: "",
        teacherPhone: "",
        teacherEmail: "",
    });
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
    ];

    const FormList = [
        {
            key: 1,
            label: "1. 學校名稱（中文）",
            value: formData.schoolNameCN,
            type: "text",
            name: "schoolNameCN",
            required: true,
            options: [],
            error: "請輸入學校名稱（中文）",
        },
        {
            key: 2,
            label: "2. 學校名稱（英文）",
            value: formData.schoolNameEN,
            type: "text",
            name: "schoolNameEN",
            required: true,
            options: [],
            error: "請輸入學校名稱（英文）",
        },
        // {
        //     key: 3,
        //     label: "3. 學校地址（中文）",
        //     value: formData.schoolAddressCN,
        //     type: "text",
        //     name: "schoolAddressCN",
        //     required: true,
        //     options: [],
        //     error: "請輸入學校地址（中文）",
        // },
        // {
        //     key: 4,
        //     label: "4. 學校地址（英文）",
        //     value: formData.schoolAddressEN,
        //     type: "text",
        //     name: "schoolAddressEN",
        //     required: true,
        //     options: [],
        //     error: "請輸入學校地址（英文）",
        // },
        {
            key: 3,
            label: "3. 學校電話 ",
            value: formData.teacherPhone,
            type: "number",
            name: "teacherPhone",
            required: true,
            options: [],
            error: "請輸入學校電話",
        },
        {
            key: 4,
            label: "4. 教師職稱 ",
            value: formData.teacherTitle,
            type: "select",
            name: "teacherTitle",
            required: true,
            options: [
                {
                    label: "請選擇",
                    value: "",
                },
                {
                    label: "先生",
                    value: "Mr.",
                },
                {
                    label: "太太",
                    value: "Mrs.",
                },
                {
                    label: "女士",
                    value: "Ms.",
                },
                {
                    label: "小姐",
                    value: "Miss.",
                },
                {
                    label: "教授",
                    value: "Prof.",
                },
                {
                    label: "博士",
                    value: "Dr.",
                },
            ],
            error: "請輸入聯絡老師稱謂",
        },
        {
            key: 5,
            label: "5. 聯絡老師姓名 (中文) ",
            value: formData.teacherNameCN,
            type: "text",
            name: "teacherNameCN",
            required: true,
            options: [],
            error: "請輸入聯絡老師姓名 (中文)",
        },
        {
            key: 6,
            label: "6. 聯絡老師姓名 (英文) ",
            value: formData.teacherNameEN,
            type: "text",
            name: "teacherNameEN",
            required: true,
            options: [],
            error: "請輸入聯絡老師姓名 (英文)",
        },
        {
            key: 7,
            label: "7. 聯絡老師手提電話 ",
            value: formData.schoolPhone,
            type: "number",
            name: "schoolPhone",
            required: true,
            options: [],
            error: "請輸入聯絡老師手提電話",
        },
        {
            key: 8,
            label: "8. 聯絡老師電子郵箱 ",
            value: formData.teacherEmail,
            type: "email",
            name: "teacherEmail",
            required: true,
            options: [],
            error: "請輸入聯絡老師電子郵箱",
        },
    ];

    function onWindowResize() {
        const $fixedBg = document.getElementById("fixed-bg");
        const height = $fixedBg?.getBoundingClientRect()?.height || 200;
        setFixedBgHeight(height);
    }

    const handleCheckboxChange = (event) => {
        setIsAgreed(event.target.checked);
    };

    const throttledResize = throttle(onWindowResize, 200);

    useEffect(() => {
        if (resetAllFields) {
            setTeams([{ id: 1, members: [], schoolGroup: "" }]);
        }
        window.scrollTo(0, 0);
        onWindowResize();
        window.addEventListener("resize", throttledResize);
        return () => {
            window.removeEventListener("resize", throttledResize);
        };
    }, []);

    const addTeam = () => {
        setTeams([
            ...teams,
            { id: teams.length + 1, members: [], schoolGroup: "" },
        ]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTeamInputChange = (e, teamId) => {
        const { name, value } = e.target;
        setTeams((prevTeams) =>
            prevTeams.map((team) =>
                team.id === teamId ? { ...team, [name]: value } : team
            )
        );
    };

    const handleTeamDataChange = (teamId, members) => {
        const updatedTeams = teams.map((team) =>
            team.id === teamId ? { ...team, members } : team
        );
        setTeams(updatedTeams);
    };

    const handleDeleteTeam = (index) => {
        let clone = [...teams];
        clone.splice(index, 1);
        setTeams(clone);
    };

    const handleSubmit = async (e) => {
        setIsSubmitted(true);
        console.log("submit button pressed test");
        e.preventDefault();

        const validateForm = () => {
            console.log("validate");
            const fieldsToCheck = [
                "schoolNameCN",
                "schoolNameEN",
                // "schoolAddressCN",
                // "schoolAddressEN",
                "teacherNameCN",
                "teacherNameEN",
                "schoolPhone",
                "teacherPhone",
                "teacherEmail",
            ];

            for (let field of fieldsToCheck) {
                if (!formData[field]) {
                    toast.error(`請填寫所有必填欄位。`);

                    return false;
                }
            }

            for (let team of teams) {
                console.log(team);
                if (team.members.length === 0) {
                    toast.error("請填寫至少一個團隊資訊才能繼續。 ");
                    console.log("not members");
                    return false;
                }
                for (let member of team.members) {
                    console.log(member);
                    const memberFieldsToCheck = [
                        "studentNameCN",
                        // "studentNameEN",
                        // "studentYearOfBirth",
                        "studentGrade",
                    ];

                    for (let field of memberFieldsToCheck) {
                        if (!member.data[field]) {
                            toast.error("請填寫所有團隊成員的所有必填欄位。");
                            console.log("not filled");
                            return false;
                        }
                    }
                }
            }

            return true;
        };

        if (!validateForm()) {
            return;
        }

        const teamData = teams.map((team, index) => ({
            team_name: `Team ${index + 1}`,
            school_group: team.schoolGroup,
            team_members: team.members.map((member) => ({
                // name_english: member.data.studentNameEN,
                name_chinese: member.data.studentNameCN,
                // year_of_birth: member.data.studentYearOfBirth,
                // gender: member.data.studentGender
                //     ? member.data.studentGender
                //     : "男性",
                // school_group: member.data.schoolGroup,
                grade: member.data.studentGrade,
                // mobile_phone: member.data.studentPhone
                //     ? member.data.studentPhone
                //     : "",
                // email: member.data.studentEmail ? member.data.studentEmail : "",
            })),
        }));

        const payload = {
            email: formData.teacherEmail,
            name_english: formData.teacherNameEN,
            name_chinese: formData.teacherNameCN,
            school_name_english: formData.schoolNameEN,
            school_name_chinese: formData.schoolNameCN,
            // school_address_english: formData.schoolAddressEN,
            // school_address_chinese: formData.schoolAddressCN,
            mobile_phone: formData.teacherPhone,
            telephone: formData.schoolPhone,
            team_info: teamData,
            title: formData.teacherTitle,
        };

        if (!isAgreed) {
            toast.error("請同意條款和條件。");
            return;
        }

        console.log("calling backend");

        try {
            console.log("payload: ", payload);
            const response = await axios.post(
                // "https://aigc-backend-dev.materia-logic.com/common/register",
                "http://127.0.0.1:8000/common/register",
                payload
            );
            console.log(response.data);
            if (response.data.code !== "0000") {
                toast.error(response.data.data);
                return;
            }
            toast.success("註冊成功！");
            setFormData({
                schoolNameCN: "",
                schoolNameEN: "",
                // schoolAddressCN: "",
                // schoolAddressEN: "",
                teacherTitle: "",
                teacherNameCN: "",
                teacherNameEN: "",
                schoolPhone: "",
                teacherPhone: "",
                teacherEmail: "",
            });
            setIsSubmitted(false);
            setTeams([
                {
                    id: 1,
                    members: [
                        { id: 1, data: {} },
                        { id: 2, data: {} },
                    ] as any,
                    schoolGroup: "",
                },
            ]);
            console.log("team members: ", teams);
            setIsAgreed(false);
            setResetAllFields(true);
            //   setTimeout(() => {
            //     window.location.reload();
            //   }, 3000);

            return;
        } catch (error) {
            console.error(error);
            toast.error("註冊失敗！請重試");
        }
    };
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
                                        雲遊通義 –
                                        阿里雲香港10週年校際生成式AI比賽
                                    </div>{" "}
                                    <div className="registration-title">
                                        報名表
                                    </div>{" "}
                                </div>

                                <div className="registration-subtitle">
                                    <div>
                                        參賽組別分為小學組、中學組及展能組（為特殊學校學生開設）。
                                    </div>
                                    <div style={{ color: "#ff6a00" }}>
                                        參賽者將以隊際形式參加，參賽隊伍將由學校老師代表報名。
                                    </div>
                                    <div>
                                        參賽者必須為2024至2025學年仍然就讀該校的全日制學生。
                                    </div>
                                    <div>
                                        每隊隊伍由 2 - 4
                                        人組成，每間學校不限報名隊伍數量。
                                    </div>
                                    <div>
                                        參賽者需要使用阿里雲旗下AI應用平台「通義千問」及「通義萬相」進行比賽。
                                    </div>
                                    <div>
                                        工作坊及賽事作品內容均以中文進行。
                                    </div>
                                    <div>參賽費用全免。</div>
                                    {/* <div
                                    // style={{ fontWeight: "bold" }}
                                    >
                                        截止報名為2024年9月20日23:59。
                                    </div> */}
                                    <div>
                                        如學校需要為5隊或以上報名，請聯絡
                                        Gamenoodlesoup (
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
                                        / 30011280)。
                                    </div>
                                </div>
                            </div>
                            <div className="registration-form">
                                <form onSubmit={handleSubmit}>
                                    <fieldset>
                                        <div className="registration-form__label">
                                            學校聯絡資料
                                        </div>
                                        <div>
                                            <div className="registration-form__items">
                                                {/* school name */}

                                                {FormList.map((item) => (
                                                    <div
                                                        className="input-container"
                                                        key={item.key}
                                                    >
                                                        <InputField
                                                            inputLabel={
                                                                item.label
                                                            }
                                                            inputName={
                                                                item.name
                                                            }
                                                            inputValue={
                                                                item.value
                                                            }
                                                            onInputChange={
                                                                handleInputChange
                                                            }
                                                            isSubmitted={
                                                                isSubmitted
                                                            }
                                                            isRequired={
                                                                item.required
                                                            }
                                                            inputOptions={
                                                                item.options
                                                            }
                                                            inputType={
                                                                item.type
                                                            }
                                                            errorMessage={
                                                                item.error
                                                            }
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                paddingBottom: "24px",
                                            }}
                                        >
                                            {teams.map((team, index) => (
                                                <div key={team.id}>
                                                    <div
                                                        key={team.id}
                                                        style={{
                                                            backgroundColor:
                                                                "#F8F8F8",
                                                            padding: "24px",
                                                            borderRadius:
                                                                "10px",
                                                            marginBottom:
                                                                "24px",
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                flexDirection:
                                                                    "row",
                                                                gap: "24px",
                                                                display: "flex",
                                                                justifyContent:
                                                                    "space-between",
                                                            }}
                                                        >
                                                            {" "}
                                                            <div
                                                                style={{
                                                                    width: "70%",
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        fontSize:
                                                                            "24px",
                                                                    }}
                                                                >
                                                                    {" "}
                                                                    隊伍{" "}
                                                                    {index + 1}
                                                                </div>
                                                            </div>{" "}
                                                            <div
                                                                style={{
                                                                    alignSelf:
                                                                        "right",
                                                                    color: "#FE6A00",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() =>
                                                                    handleDeleteTeam(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                {index > 0 && (
                                                                    <FaTrashAlt
                                                                        size={
                                                                            24
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className="input-container"
                                                            key={team.id}
                                                        >
                                                            <InputField
                                                                inputLabel="團體 "
                                                                inputValue={
                                                                    team.schoolGroup
                                                                }
                                                                inputType="select"
                                                                inputName="schoolGroup"
                                                                isRequired={
                                                                    true
                                                                }
                                                                inputOptions={[
                                                                    {
                                                                        label: "請選擇",
                                                                        value: "",
                                                                    },
                                                                    {
                                                                        value: "小學組",
                                                                        label: "小學組",
                                                                    },
                                                                    {
                                                                        value: "中學組",
                                                                        label: "中學組",
                                                                    },
                                                                    {
                                                                        value: "展能組",
                                                                        label: "展能組",
                                                                    },
                                                                ]}
                                                                errorMessage="請選擇組"
                                                                isSubmitted={
                                                                    isSubmitted
                                                                }
                                                                onInputChange={(
                                                                    e
                                                                ) =>
                                                                    handleTeamInputChange(
                                                                        e,
                                                                        team.id
                                                                    )
                                                                }
                                                            />
                                                        </div>

                                                        <Teams
                                                            membersData={
                                                                team.members
                                                            }
                                                            key={team.id}
                                                            teamNumber={team.id}
                                                            onTeamDataChange={
                                                                handleTeamDataChange
                                                            }
                                                            membersInfo={
                                                                team.members
                                                            }
                                                            reset={
                                                                resetAllFields
                                                            }
                                                            isSubmitted={
                                                                isSubmitted
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </fieldset>
                                </form>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        alignSelf: "center",
                                    }}
                                >
                                    <section
                                        className="position-relative module-box"
                                        style={{
                                            minWidth: "70%",
                                            paddingLeft: "0px",
                                            paddingRight: "0px",
                                        }}
                                    >
                                        <div
                                            className="module-button"
                                            onClick={addTeam}
                                            style={{
                                                backgroundColor: "transparent",
                                                color: "#FE6A00",
                                                border: "2px solid #FE6A00",
                                                borderRadius: "10px",
                                                minWidth: "60%",
                                            }}
                                        >
                                            新增隊伍
                                        </div>
                                    </section>
                                </div>
                                <section
                                    style={{
                                        boxShadow:
                                            "0px 0px 10px rgba(0, 0, 0, 0.1)",
                                        padding: "24px",
                                        borderRadius: "10px",
                                    }}
                                >
                                    <div
                                        style={{
                                            textAlign: "left",
                                            fontSize: "24px",
                                            display: "flex",
                                            fontWeight: "bold", // Changed from fontStyle to fontWeight
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            gap: "10px",
                                            paddingBottom: "24px",
                                            paddingTop: "24px",
                                        }}
                                    >
                                        條款及細則
                                    </div>
                                    <div
                                        style={{
                                            textAlign: "left",
                                            fontSize: "24px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            gap: "10px",
                                            alignSelf: "stretch",
                                        }}
                                    >
                                        <div>
                                            {" "}
                                            在以下方格內加上「√」號並完成登記手續後，本人將確認以上填寫的個人資料均是真實和正確的，並同意上述資料如有錯漏，Alibaba
                                            Cloud毋須負責。本人亦同意在參與活動時遵守{" "}
                                            <a
                                                href="https://aigc-portal-dev.materia-logic.com/terms"
                                                target="_blank"
                                                style={{ color: "#ff6a00" }}
                                            >
                                                活動條款及細則
                                            </a>
                                            。
                                        </div>
                                        <br />
                                        <div>
                                            報名將以大會的最終確認為準。閣下遞交申請後，須以書面通知方可更改你的個人資料。參加者須自行安排賽事期間的交通安排，並承擔所有相關費用。在任何情況下若賽事或相關活動被逼取消，大會毋須負上任何責任。
                                        </div>
                                        <br />
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
                                        <div style={{ paddingTop: "24px" }}>
                                            <input
                                                type="checkbox"
                                                id="agree"
                                                style={{
                                                    width: "20px",
                                                    height: "20px",
                                                    marginRight: "10px",
                                                    cursor: "pointer",
                                                }}
                                                checked={isAgreed}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label
                                                htmlFor="agree"
                                                style={{
                                                    fontSize: "18px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                我已經閱讀並同意以上的活動條款及細則。
                                            </label>
                                        </div>
                                    </div>
                                </section>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        alignSelf: "center",
                                    }}
                                >
                                    <section
                                        className="position-relative module-box"
                                        style={{ padding: "24px" }}
                                    >
                                        <div
                                            className="module-button"
                                            onClick={handleSubmit}
                                            style={{
                                                background: isAgreed
                                                    ? "#FE6A00"
                                                    : "darkgrey",
                                                cursor: isAgreed
                                                    ? "pointer"
                                                    : "not-allowed",
                                            }}
                                        >
                                            提交報名表
                                        </div>
                                    </section>
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
