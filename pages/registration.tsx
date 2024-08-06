import React, { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import { throttle } from "../util/index";
import Teams from "../components/teams";
import axios from "axios";

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
    e.preventDefault();
    console.log("teams: ", teams);

    const teamData = teams.map((team) => ({
      team_name: `Team ${team.id}`,
      team_members: team.members.map((member) => ({
        name_english: member.data.studentNameCN,
        name_chinese: member.data.studentNameEN,
        year_of_birth: member.data.studentYearOfBirth,
        gender: member.data.studentGender ? member.data.studentGender : "Male",
        grade: member.data.studentGrade,
      })),
    }));
    console.log("teamData: ", teamData);

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

    console.log("http://aigc-backend-dev.materia-logic.com/common/register");

    try {
      const response = await axios.post(
        "http://aigc-backend-dev.materia-logic.com/common/register",
        payload
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
              <h3>
                Cloud Tour – Alibaba Cloud Hong Kong 10th Anniversary
                Inter-school Generative AI Competition
              </h3>
              <h3 style={{ marginTop: "20px" }}>Registration Form</h3>
              <p style={{ marginTop: "20px", marginBottom: "20px" }}>
                The competition categories are divided into Primary School
                Group, Secondary School Group, and Special Education Group (for
                students from special schools). Participants are nominated by
                school teachers and register as a team. Participants must be
                full-time students enrolled at the school for the 2024-2025
                academic year. Each team consists of 2-4 members, with no limit
                on the number of teams per school. Participants need to use
                Alibaba's AI application platforms "Tongyi Qianwen" and "Tongyi
                Wanxiang" for the competition. Workshops and competition entries
                will be conducted in Chinese. Participation is free of charge.
                The registration deadline is 23:59 on September 20, 2024.
              </p>
              <form onSubmit={handleSubmit}>
                <fieldset style={{ textAlign: "left" }}>
                  <legend>Teacher Representative Contact Information</legend>
                  <div>
                    <label>
                      School Name (Chinese)
                      <input
                        type="text"
                        name="schoolNameCN"
                        value={formValues.schoolNameCN}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      (English)
                      <input
                        type="text"
                        name="schoolNameEN"
                        value={formValues.schoolNameEN}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div style={{ padding: "10px" }}>
                    <label>
                      School Address (Chinese)
                      <input
                        type="text"
                        name="schoolAddressCN"
                        value={formValues.schoolAddressCN}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      (English)
                      <input
                        type="text"
                        name="schoolAddressEN"
                        value={formValues.schoolAddressEN}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div style={{ padding: "10px" }}>
                    <label>
                      Title
                      <select
                        name="teacherTitle"
                        value={formValues.teacherTitle}
                        onChange={handleInputChange}
                      >
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Miss">Miss</option>
                        <option value="Professor">Professor</option>
                        <option value="Dr.">Dr.</option>
                      </select>
                    </label>
                  </div>
                  <div style={{ padding: "10px" }}>
                    <label>
                      Teacher Name (Chinese)
                      <input
                        type="text"
                        name="teacherNameCN"
                        value={formValues.teacherNameCN}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label>
                      (English)
                      <input
                        type="text"
                        name="teacherNameEN"
                        value={formValues.teacherNameEN}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div style={{ padding: "10px" }}>
                    <label>
                      School Contact Phone
                      <input
                        type="text"
                        name="schoolPhone"
                        value={formValues.schoolPhone}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div style={{ padding: "10px" }}>
                    <label>
                      Mobile Phone
                      <input
                        type="text"
                        name="teacherPhone"
                        value={formValues.teacherPhone}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div style={{ padding: "10px", marginBottom: "20px" }}>
                    <label>
                      Email
                      <input
                        type="email"
                        name="teacherEmail"
                        value={formValues.teacherEmail}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    {teams.map((team, index) => (
                      <Teams
                        key={team.id}
                        teamNumber={index + 1}
                        onTeamDataChange={handleTeamDataChange}
                      />
                    ))}
                  </div>
                  <button type="button" onClick={addTeam}>
                    Add Team
                  </button>
                  <button
                    type="button"
                    onClick={deleteLastTeam}
                    disabled={teams.length <= 1}
                  >
                    Delete Team
                  </button>
                  <button type="submit">Submit</button>
                </fieldset>
              </form>
            </div>
            <img
              className="intro-tag intro-tag-right"
              src="/images/tag1.png"
              alt="tag"
            />
          </div>
        </section>
      </div>
    </>
  );
}
