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
    // teacherTitle: "Mr.",
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
      // title: formValues.teacherTitle,
    };

    console.log("calling backend");

    try {
      const response = await axios.post(
        // "http://aigc-backend-dev.materia-logic.com/common/register",
        "http://127.0.0.1:8000/common/register",
        payload
      );
      console.log(response.data);
      if (response.data.code !== "0000") {
        toast.error(response.data.data);
        return;
      }
      toast.success("Registration successful!");
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
                {" "}
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
                  <div>對象：小學生、中學生及特殊學校學生</div>
                  <div>
                    名額： 以隊際形式報名，每隊 2 – 4
                    人，每間學校不限報名隊伍數量
                  </div>
                  <div>語言：中文</div>
                  <div>費用：全免</div>
                  <div>截止報名：2024年9月20日</div>
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

                        {/* teacher name */}
                        <div style={{ width: "48%" }}>
                          {" "}
                          <label style={{ fontSize: "18px", width: "100%" }}>
                            5. 主要聯絡老師姓名 （中文）
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
                            6. 主要聯絡老師姓名 （英文）
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
                            7. 電話（學校）
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
                            8. 手提電話
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
                            9. 電子郵箱
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
                  gap: "24px",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <button
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
                </button>
                <button
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
                </button>
              </div>
              {/* <button type="button" onClick={addTeam}>
                Add Team
              </button>
              <button
                type="button"
                onClick={deleteLastTeam}
                disabled={teams.length <= 1}
              >
                Delete Team
              </button> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                  alignSelf: "center",
                  paddingTop: "80px",
                }}
              >
                <button
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
                </button>
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
