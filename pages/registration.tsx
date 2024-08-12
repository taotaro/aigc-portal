import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { throttle } from "../util/index";
import Teams from "../components/teams";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { wrap } from "module";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function Registration() {
  const { t } = useTranslation("common");
  const [fixedBgHeight, setFixedBgHeight] = useState(200);
  const [teams, setTeams] = useState([{ id: 1, members: [] }]);
  const [formValues, setFormValues] = useState({
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

  const LogoList = [
    { name: "Alibaba", logo: "/images/ali.jpeg" },
    { name: "GamingNoodleSoup", logo: "/images/gns.png" },
    { name: "Materia Logic", logo: "/images/ml.png" },
    { name: "HKACE", logo: "/images/hkace.png" },
    { name: "Aitle", logo: "/images/aitle.png" },
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

  const handleTeamDataChange = (teamNumber, members) => {
    const updatedTeams = teams.map((team) =>
      team.id === teamNumber ? { ...team, members } : team
    );
    setTeams(updatedTeams);
  };

  const handleSubmit = async (e) => {
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
          toast.error("Please fill in all required fields.");
          return false;
        }
      }

      for (let team of teams) {
        console.log(team);
        if (team.members.length === 0) {
          toast.error(
            "Please fill in atleast one team information to proceed. "
          );
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
              toast.error(
                "Please fill in all required fields for all team members."
              );
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

    const teamData = teams.map((team) => ({
      team_name: `Team ${team.id}`,
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
      toast.success("Registration successful!");
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

      return;
    } catch (error) {
      console.error(error);
      toast.error("Registration failed! Please try again");
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
        <section className="position-relative intro-box">
          <div className="intro">
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
                    paddingBottom: "80px",
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
                <p
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
                  <div>截止報名為2024年9月20日23:59。</div>
                </p>
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
                    <div
                      style={
                        {
                          // display: "flex",
                          // alignSelf: "stretch",
                          // gap: "24px",
                          // alignContent: "flex-start",
                          // alignItems: "flex-start",
                          // flexWrap: "wrap",
                        }
                      }
                    >
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
                        <div style={{ width: "48%" }}>
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
                            }}
                          />
                        </div>
                        <div style={{ width: "48%" }}>
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
                            }}
                          />
                        </div>
                        {/* school address */}
                        <div style={{ width: "48%" }}>
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
                            }}
                          />
                        </div>
                        <div style={{ width: "48%" }}>
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
                            }}
                          />
                        </div>
                        {/* title */}
                        <div style={{ width: "48%" }}>
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            5. 學校地址（中文）
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="teacherTitle"
                            value={formValues.teacherTitle}
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
                            }}
                          >
                            <option value="Mr.">先生</option>
                            <option value="Mrs.">太太</option>
                            <option value="Ms.">女士</option>
                            <option value="Miss">小姐</option>
                            <option value="Prof.">教授</option>
                            <option value="Dr.">博士</option>
                          </select>
                        </div>

                        {/* teacher name */}
                        <div style={{ width: "48%" }}>
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            6. 主要聯絡老師姓名 （中文）
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
                            }}
                          />
                        </div>
                        <div style={{ width: "48%" }}>
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            7. 主要聯絡老師姓名 （英文）
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
                            }}
                          />
                        </div>

                        {/* contact (telepone and mobile) */}
                        <div style={{ width: "48%" }}>
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            8. 電話（學校）
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
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
                            }}
                          />
                        </div>
                        <div style={{ width: "48%" }}>
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            9. 手提電話 <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
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
                            }}
                          />
                        </div>
                        {/* contact (email) */}
                        <div style={{ width: "48%" }}>
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            10. 電子郵箱 <span style={{ color: "red" }}>*</span>
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
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        // fontSize: "24px",
                        paddingBottom: "24px",
                      }}
                    >
                      {teams.map((team, index) => (
                        <Teams
                          key={team.id}
                          teamNumber={index + 1}
                          onTeamDataChange={handleTeamDataChange}
                          reset={formValues.teacherEmail === ""}
                        />
                      ))}
                    </div>
                  </fieldset>
                </form>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  // flexDirection: "column",
                  // gap: "24px",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                {/* <button
                  type="button"
                  style={{
                    display: "flex",
                    borderRadius: "22px",
                    // background: "#FE6A00",
                    // color: "#fff",
                    color: "black",
                    borderColor: "#FE6A00",
                    background: "transparent",
                    padding: "12px 32px",
                    width: "40%",
                    // textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={addTeam}
                >
                  添加团队
                </button> */}
                <section className="position-relative module-box">
                  <div className="module-button" onClick={addTeam}>
                    添加团队
                  </div>
                </section>
                <section className="position-relative module-box">
                  <div
                    className="module-button"
                    onClick={deleteLastTeam}
                    style={{
                      borderColor: teams.length <= 1 ? "darkgrey" : "#FE6A00",
                      background: teams.length <= 1 ? "darkgrey" : "#ff6a00",
                      color: teams.length <= 1 ? "white" : "black",
                    }}
                  >
                    删除团队
                  </div>
                </section>
                {/* <button
                  type="button"
                  style={{
                    display: "flex",
                    borderRadius: "22px",
                    // background: "#FE6A00",
                    // color: "black",
                    borderColor: teams.length <= 1 ? "darkgrey" : "#FE6A00",
                    background: teams.length <= 1 ? "darkgrey" : "transparent",
                    color: teams.length <= 1 ? "white" : "black",
                    padding: "12px 32px",
                    width: "40%",
                    // textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={deleteLastTeam}
                  disabled={teams.length <= 1}
                >
                  删除团队
                </button> */}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                {/* <button
                  type="submit"
                  style={{
                    display: "flex",
                    borderRadius: "22px",
                    background: "#FE6A00",
                    color: "#fff",
                    borderColor: "#FE6A00",
                    padding: "12px 32px",
                    width: "50%",
                    // textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={handleSubmit}
                >
                  提交報名表
                </button> */}
                <section className="position-relative module-box">
                  <div className="module-button" onClick={handleSubmit}>
                    提交報名表
                  </div>
                </section>
              </div>
            </div>
            <div
              style={{
                textAlign: "left",
                fontSize: "24px",
                display: "flex",
                fontStyle: "bold",
                // padding: "0px 48px",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px",
                paddingBottom: "80px",
              }}
            >
              條款及細則
            </div>{" "}
            <p
              style={{
                textAlign: "left",
                fontSize: "24px",
                display: "flex",
                fontWeight: "bold",
                // padding: "0px 48px",
                flexDirection: "column",
                justifyContent: "center",
                gap: "10px",
                alignSelf: "stretch",
              }}
            >
              <div>
                在以下方格內加上「√」號並完成登記手續後，本人將確認以上填寫的個人資料均是真實和正確的，並同意上述資料如有錯漏，Alibaba
                Cloud (Singapore) Private
                Limited毋須負責。本人亦同意在參與活動時遵守活動條款及細則(連結跳轉：https://www.alibabacloud.com/help/tc/legal/latest/alibaba-cloud-international-website-privacy-policy)。
              </div>
              <div>
                報名將以大會的最終確認為準。閣下遞交申請後，需以書面通知方可更改你的個人資料。參加者須自行安排賽事期間的交通安排，並承擔所有相關費用。在任何情況下若賽事或相關活動被逼取消，大會毋須負上任何責任。
              </div>
              <div>
                以上所收集的資料只用作活動登記、通訊及相關用途，並只限阿里雲巴巴及其授權之服務承辦商存取。登記者有權要求查閱、更正或刪除其個人資料。如有查詢，與我們聯絡。有關詳情亦可瀏覽免責條款、私隱政策及收集個人資料聲明。
              </div>
              <div style={{ paddingTop: "24px" }}>我同意。</div>
            </p>
            <img
              className="intro-tag intro-tag-right"
              src="/images/tag1.png"
              alt="tag"
            />
          </div>
        </section>
        {/* {footer} */}
        <section className="position-relative module-box">
          <p className="module-title">活動支持</p>
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
      <Toaster />
      {/* <ToastContainer /> */}
    </>
  );
}
