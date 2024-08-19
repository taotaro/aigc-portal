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
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function Registration() {
  const { t } = useTranslation("common");
  const [fixedBgHeight, setFixedBgHeight] = useState(200);
  const [teams, setTeams] = useState([{ id: 1, members: [] }]);
  const [isAgreed, setIsAgreed] = useState(false);
  const [resetAllFields, setResetAllFields] = useState(false);
  const [formValues, setFormValues] = useState({
    schoolNameCN: "",
    schoolNameEN: "",
    schoolAddressCN: "",
    schoolAddressEN: "",
    teacherTitle: "",
    teacherNameCN: "",
    teacherNameEN: "",
    schoolPhone: "",
    teacherPhone: "",
    teacherEmail: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const LogoList = [
    { name: "Alibaba", logo: "/images/ali.jpeg" },
    { name: "GamingNoodleSoup", logo: "/images/gns.png" },
    { name: "Materia Logic", logo: "/images/ml.png" },
    { name: "HKACE", logo: "/images/hkace.png" },
    { name: "Aitle", logo: "/images/aitle.png" },
    { name: "SteelSeries", logo: "/images/steelseries.png" },
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
      setTeams([{ id: 1, members: [] }]);
    }
    window.scrollTo(0, 0);
    onWindowResize();
    window.addEventListener("resize", throttledResize);
    return () => {
      window.removeEventListener("resize", throttledResize);
    };
  }, []);

  const addTeam = () => {
    setTeams([...teams, { id: teams.length + 1, members: [] }]);
  };

  const deleteLastTeam = () => {
    if (teams.length > 1) {
      setTeams(teams.slice(0, -1));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleTeamDataChange = (teamId, members) => {
    const updatedTeams = teams.map((team) =>
      team.id === teamId ? { ...team, members } : team
    );
    setTeams(updatedTeams);
  };

  const handleDeleteTeam = (index) => {
    console.log("Deleting team at index: ", index);
    // const updatedTeams = teams.filter((_, i) => i !== index);

    // console.log("Updated teams: ", updatedTeams);
    // setTeams(updatedTeams);
    let clone = [...teams];
    console.log("clone: ", clone);
    clone.splice(index, 1);
    console.log("clone after splice: ", clone);
    setTeams(clone);
    console.log("teams after setting: ", teams);
  };

  // const handleTeamDataChange = (updatedTeam) => {
  //   setTeams((prevTeams) =>
  //     prevTeams.map((team) => (team.id === updatedTeam.id ? updatedTeam : team))
  //   );
  // };

  const handleSubmit = async (e) => {
    setIsSubmitted(true);
    console.log("submit button pressed test");
    e.preventDefault();

    const validateForm = () => {
      console.log("validate");
      const fieldsToCheck = [
        "schoolNameCN",
        "schoolNameEN",
        "schoolAddressCN",
        "schoolAddressEN",
        "teacherNameCN",
        "teacherNameEN",
        "schoolPhone",
        "teacherPhone",
        "teacherEmail",
      ];

      for (let field of fieldsToCheck) {
        if (!formValues[field]) {
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
            "studentNameEN",
            "studentYearOfBirth",
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
      team_members: team.members.map((member) => ({
        name_english: member.data.studentNameCN,
        name_chinese: member.data.studentNameEN,
        year_of_birth: member.data.studentYearOfBirth,
        gender: member.data.studentGender ? member.data.studentGender : "Male",
        grade: member.data.studentGrade,
        mobile_phone: member.data.studentPhone ? member.data.studentPhone : "",
        email: member.data.studentEmail ? member.data.studentEmail : "",
      })),
    }));

    const payload = {
      email: formValues.teacherEmail,
      name_english: formValues.teacherNameEN,
      name_chinese: formValues.teacherNameCN,
      school_name_english: formValues.schoolNameEN,
      school_name_chinese: formValues.schoolNameCN,
      school_address_english: formValues.schoolAddressEN,
      school_address_chinese: formValues.schoolAddressCN,
      mobile_phone: formValues.teacherPhone,
      telephone: formValues.schoolPhone,
      team_info: teamData,
      title: formValues.teacherTitle,
    };

    if (!isAgreed) {
      toast.error("請同意條款和條件。");
      return;
    }

    console.log("calling backend");

    try {
      const response = await axios.post(
        "https://aigc-backend-dev.materia-logic.com/common/register",
        // "http://127.0.0.1:8000/common/register",
        payload
      );
      console.log(response.data);
      if (response.data.code !== "0000") {
        toast.error(response.data.data);
        return;
      }
      toast.success("註冊成功！");
      setFormValues({
        schoolNameCN: "",
        schoolNameEN: "",
        schoolAddressCN: "",
        schoolAddressEN: "",
        teacherTitle: "Mr.",
        teacherNameCN: "",
        teacherNameEN: "",
        schoolPhone: "",
        teacherPhone: "",
        teacherEmail: "",
      });
      setTeams([{ id: 1, members: [] }]);
      console.log("team members: ", teams);
      setIsAgreed(false);
      setResetAllFields(true);

      return;
    } catch (error) {
      console.error(error);
      toast.error("註冊失敗！請重試");
    }
  };

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
        {/* Registration form */}
        <section className="position-relative module-box">
          <div className="module-content" style={{ margin: "24px" }}>
            <img
              className="intro-tag intro-tag-left"
              src="/images/tag1.png"
              alt="tag"
            />
            <div className="registration-form">
              <div
                className="information"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignSelf: "stretch",
                  paddingBottom: "80px",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "24px",
                    display: "flex",
                    // padding: "0px 48px",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "10px",
                    paddingBottom: "40px",
                  }}
                >
                  雲遊通義 – 阿里雲香港10週年校際生成式AI比賽
                </div>{" "}
                <div
                  style={{
                    textAlign: "center",
                    fontSize: "24px",
                    display: "flex",
                    // padding: "0px 48px",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "10px",
                    paddingBottom: "80px",
                  }}
                >
                  報名表
                </div>{" "}
                <div
                  style={{
                    textAlign: "left",
                    fontSize: "24px",
                    display: "flex",
                    // padding: "0px 48px",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "10px",
                    alignSelf: "stretch",
                  }}
                >
                  <div>
                    參賽組別分為小學組、中學組及展能組（為特殊學校學生開設）。
                  </div>
                  <div>參賽者由學校老師代表提名，並以隊際形式報名。</div>
                  <div>
                    參賽者必須為2024至2025學年仍然就讀該校的全日制學生。
                  </div>
                  <div>每隊隊伍由 2 – 4 人組成，每間學校不限報名隊伍數量。</div>
                  <div>
                    參賽者需要使用阿里雲巴巴旗下AI應用平台「通義千問」及「通義萬相」進行比賽。
                  </div>
                  <div>工作坊及賽事作品內容均以中文進行。</div>
                  <div>參賽費用全免。</div>
                  <div style={{ fontWeight: "bold" }}>
                    截止報名為2024年9月20日23:59。
                  </div>
                </div>
              </div>
              <div
                className="form"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignSelf: "stretch",
                  gap: "24px",
                  textAlign: "left",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <fieldset>
                    <div
                      style={{
                        fontSize: "24px",
                        paddingBottom: "24px",
                      }}
                    >
                      學校聯絡資料
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          paddingBottom: "80px",
                          // flexDirection: "column",
                          gap: "24px",
                          alignContent: "flex-start",
                          alignItems: "flex-start",
                          alignSelf: "stretch",
                          flexWrap: "wrap",
                        }}
                      >
                        {/* school name */}
                        <div className="input-container">
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            1. 學校名稱（中文）
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="schoolNameCN"
                            value={formValues.schoolNameCN}
                            onChange={handleInputChange}
                            required
                            placeholder="請輸入"
                            style={{
                              borderRadius: "10px",
                              height: "50px",
                              width: "100%",
                              gap: "16px",
                              padding: "7px 26px 7px 20px",
                              marginRight: "10px",
                              border: "2px solid #d9d9d9",
                            }}
                          />
                          {isSubmitted && !formValues.schoolNameCN && (
                            <div
                              style={{
                                color: "red",
                              }}
                            >
                              請輸入學校名稱（中文）
                            </div>
                          )}
                        </div>
                        <div className="input-container">
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            2. 學校名稱（英文）
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="schoolNameEN"
                            value={formValues.schoolNameEN}
                            onChange={handleInputChange}
                            required
                            placeholder="請輸入"
                            style={{
                              borderRadius: "10px",
                              height: "50px",
                              width: "100%",
                              gap: "16px",
                              padding: "7px 26px 7px 20px",
                              border: "2px solid #d9d9d9",
                            }}
                          />
                          {isSubmitted && !formValues.schoolNameEN && (
                            <div
                              style={{
                                color: "red",
                              }}
                            >
                              請輸入學校名稱（英文）
                            </div>
                          )}
                        </div>
                        {/* school address */}
                        <div className="input-container">
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            3. 學校地址（中文）
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="schoolAddressCN"
                            value={formValues.schoolAddressCN}
                            onChange={handleInputChange}
                            required
                            placeholder="請輸入"
                            style={{
                              borderRadius: "10px",
                              height: "50px",
                              width: "100%",
                              gap: "16px",
                              padding: "7px 26px 7px 20px",
                              marginRight: "10px",
                              border: "2px solid #d9d9d9",
                            }}
                          />
                          {isSubmitted && !formValues.schoolAddressCN && (
                            <div
                              style={{
                                color: "red",
                              }}
                            >
                              請輸入學校地址（中文）
                            </div>
                          )}
                        </div>
                        <div className="input-container">
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            4. 學校地址（英文）
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="schoolAddressEN"
                            value={formValues.schoolAddressEN}
                            onChange={handleInputChange}
                            required
                            placeholder="請輸入"
                            style={{
                              borderRadius: "10px",
                              height: "50px",
                              width: "100%",
                              gap: "16px",
                              padding: "7px 26px 7px 20px",
                              border: "2px solid #d9d9d9",
                            }}
                          />
                          {isSubmitted && !formValues.schoolAddressEN && (
                            <div
                              style={{
                                color: "red",
                              }}
                            >
                              請輸入學校地址（英文）
                            </div>
                          )}
                        </div>

                        {/* school phone */}
                        <div className="input-container">
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            5. 學校電話
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            name="teacherPhone"
                            value={formValues.teacherPhone}
                            onChange={handleInputChange}
                            required
                            placeholder="請輸入"
                            style={{
                              borderRadius: "10px",
                              height: "50px",
                              width: "100%",
                              gap: "16px",
                              padding: "7px 26px 7px 20px",
                              marginRight: "10px",
                              border: "2px solid #d9d9d9",
                            }}
                          />
                          {isSubmitted && !formValues.teacherPhone && (
                            <div
                              style={{
                                color: "red",
                              }}
                            >
                              請輸入學校電話
                            </div>
                          )}
                        </div>

                        {/* title */}
                        <div className="input-container">
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            6. 聯絡老師稱謂
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="teacherTitle"
                            value={formValues.teacherTitle}
                            onChange={handleInputChange}
                            required
                            placeholder=""
                            style={{
                              borderRadius: "10px",
                              height: "50px",
                              width: "100%",
                              gap: "16px",
                              padding: "7px 26px 7px 20px",
                              marginRight: "10px",
                              border: "2px solid #d9d9d9",
                            }}
                          >
                            <option value="">請選擇</option>
                            <option value="Mr.">先生</option>
                            <option value="Mrs.">太太</option>
                            <option value="Ms.">女士</option>
                            <option value="Miss">小姐</option>
                            <option value="Prof.">教授</option>
                            <option value="Dr.">博士</option>
                          </select>
                          {isSubmitted && !formValues.teacherTitle && (
                            <div
                              style={{
                                color: "red",
                              }}
                            >
                              請輸入聯絡老師稱謂
                            </div>
                          )}
                        </div>

                        {/* teacher name */}
                        <div className="input-container">
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            7. 聯絡老師姓名 (中文)
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="teacherNameCN"
                            value={formValues.teacherNameCN}
                            onChange={handleInputChange}
                            required
                            placeholder="請輸入"
                            style={{
                              borderRadius: "10px",
                              height: "50px",
                              width: "100%",
                              gap: "16px",
                              padding: "7px 26px 7px 20px",
                              marginRight: "10px",
                              border: "2px solid #d9d9d9",
                            }}
                          />
                          {isSubmitted && !formValues.teacherNameCN && (
                            <div
                              style={{
                                color: "red",
                              }}
                            >
                              請輸入聯絡老師姓名 (中文)
                            </div>
                          )}
                        </div>
                        <div className="input-container">
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            8. 聯絡老師姓名 (英文)
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="teacherNameEN"
                            value={formValues.teacherNameEN}
                            onChange={handleInputChange}
                            required
                            placeholder="請輸入"
                            style={{
                              borderRadius: "10px",
                              height: "50px",
                              width: "100%",
                              gap: "16px",
                              padding: "7px 26px 7px 20px",
                              border: "2px solid #d9d9d9",
                            }}
                          />
                          {isSubmitted && !formValues.teacherNameEN && (
                            <div
                              style={{
                                color: "red",
                              }}
                            >
                              請輸入聯絡老師姓名 (英文)
                            </div>
                          )}
                        </div>

                        {/* contact (telepone and mobile) */}

                        <div className="input-container">
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            9. 聯絡老師手提電話{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            name="schoolPhone"
                            value={formValues.schoolPhone}
                            onChange={handleInputChange}
                            required
                            placeholder="請輸入"
                            style={{
                              borderRadius: "10px",
                              height: "50px",
                              width: "100%",
                              gap: "16px",
                              padding: "7px 26px 7px 20px",
                              border: "2px solid #d9d9d9",
                            }}
                          />
                          {isSubmitted && !formValues.schoolPhone && (
                            <div
                              style={{
                                color: "red",
                              }}
                            >
                              請輸入聯絡老師手提電話
                            </div>
                          )}
                        </div>
                        {/* contact (email) */}
                        <div className="input-container">
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            10. 聯絡老師電子郵箱{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="email"
                            name="teacherEmail"
                            value={formValues.teacherEmail}
                            onChange={handleInputChange}
                            required
                            placeholder="請輸入"
                            style={{
                              borderRadius: "10px",
                              height: "50px",
                              width: "100%",
                              gap: "16px",
                              padding: "7px 26px 7px 20px",
                              marginRight: "10px",
                              border: "2px solid #d9d9d9",
                            }}
                          />
                          {isSubmitted && !formValues.teacherEmail && (
                            <div
                              style={{
                                color: "red",
                              }}
                            >
                              請輸入聯絡老師電子郵箱
                            </div>
                          )}
                        </div>
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
                              backgroundColor: "#F8F8F8",
                              padding: "24px",
                              borderRadius: "10px",
                              marginBottom: "24px",
                            }}
                          >
                            <div
                              style={{
                                flexDirection: "row",
                                gap: "24px",
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              {" "}
                              <div style={{ width: "70%" }}>
                                <div style={{ fontSize: "24px" }}>
                                  {" "}
                                  隊伍 {index + 1}
                                </div>
                              </div>{" "}
                              <div
                                style={{
                                  alignSelf: "right",
                                  color: "#FE6A00",
                                  cursor: "pointer",
                                }}
                                onClick={() => handleDeleteTeam(index)}
                              >
                                {index > 0 && <FaTrashAlt size={24} />}
                              </div>
                            </div>

                            <Teams
                              key={team.id}
                              teamNumber={team.id}
                              onTeamDataChange={handleTeamDataChange}
                              membersInfo={team.members}
                              reset={resetAllFields}
                              isSubmitted={isSubmitted}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </form>
              </div>

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
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
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
                    以上所收集的資料只用作活動登記、通訊及相關用途，並只限Alibaba
                    Cloud及其授權之服務承辦商存取。登記者有權要求查閱、更正或刪除其個人資料。如有查詢，與我們聯絡。有關詳情亦可瀏覽Alibaba
                    Cloud的{" "}
                    <a
                      href="https://www.alibabacloud.com/help/tc/legal/latest/alibaba-cloud-international-website-privacy-policy"
                      target="_blank"
                      style={{ color: "#ff6a00" }}
                    >
                      私隱政策
                    </a>
                    。
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
                      style={{ fontSize: "18px", cursor: "pointer" }}
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
                      background: isAgreed ? "#FE6A00" : "darkgrey",
                      cursor: isAgreed ? "pointer" : "not-allowed",
                    }}
                  >
                    提交報名表
                  </div>
                </section>
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
        </section>
      </div>
      <Toaster
        position="bottom-center" // Set the default position for all toasts
        reverseOrder={false} // Optional: display the newest toast at the bottom
      />
    </>
  );
}
