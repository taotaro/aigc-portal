import React from "react";
import useTranslation from "next-translate/useTranslation";

export default function Members({
  memberNumber,
  memberData,
  onMemberDataChange,
}) {
  const { t } = useTranslation("common");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onMemberDataChange(memberNumber, { ...memberData, [name]: value });
  };

  const validateForm = () => {
    const requiredFields = [
      "studentNameCN",
      "studentNameEN",
      "studentYearOfBirth",
      "studentGender",
      "studentEmail",
    ];
    for (const field of requiredFields) {
      if (!memberData[field]) {
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <form>
        <fieldset style={{ paddingBottom: "80px" }}>
          <div
            style={{
              fontSize: "24px",
              paddingBottom: "24px",
              paddingTop: "24px",
            }}
          >
            {memberNumber === 1 ? (
              <>成员 {memberNumber} （领导者）</>
            ) : (
              <>成员 {memberNumber}</>
            )}
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
                // flexDirection: "column",
                gap: "24px",
                alignContent: "flex-start",
                alignItems: "flex-start",
                alignSelf: "stretch",
                flexWrap: "wrap",
              }}
            >
              {/* student name */}
              <div style={{ width: "48%" }}>
                {" "}
                <label style={{ fontSize: "18px", width: "100%" }}>
                  1. 學生姓名（中文）<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="studentNameCN"
                  value={memberData.studentNameCN || ""}
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
              </div>
              <div style={{ width: "48%" }}>
                {" "}
                <label style={{ fontSize: "18px", width: "100%" }}>
                  2. 學生姓名（英文）<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="studentNameEN"
                  value={memberData.studentNameEN || ""}
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
              </div>
              {/* year of birth and gender */}
              <div style={{ width: "48%" }}>
                {" "}
                <label style={{ fontSize: "18px", width: "100%" }}>
                  3. 出生年份 <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="studentYearOfBirth"
                  value={memberData.studentYearOfBirth || ""}
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
              </div>
              <div style={{ width: "48%" }}>
                {" "}
                <label style={{ fontSize: "18px", width: "100%" }}>
                  4. 性別 <span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="studentGender"
                  value={memberData.studentGender || ""}
                  onChange={handleInputChange}
                  placeholder="請輸入"
                  style={{
                    borderRadius: "10px",
                    borderWidth: "2px",
                    borderColor: "black",
                    height: "50px",
                    width: "100%",
                    gap: "16px",
                    padding: "7px 26px 7px 20px",
                    border: "2px solid #d9d9d9",
                  }}
                >
                  {" "}
                  <option value="Male">男性</option>
                  <option value="Female">女性</option>
                </select>
              </div>

              {/* grade and mobile */}
              <div style={{ width: "48%" }}>
                {" "}
                <label style={{ fontSize: "18px", width: "100%" }}>
                  5. 就讀年級 <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="studentGrade"
                  value={memberData.studentGrade || ""}
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
              </div>
              <div style={{ width: "48%" }}>
                {" "}
                <label style={{ fontSize: "18px", width: "100%" }}>
                  6. 手提電話 （选修的）
                </label>
                <input
                  type="text"
                  name="studentPhone"
                  value={memberData.studentPhone || ""}
                  onChange={handleInputChange}
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
              </div>

              {/* email */}
              <div style={{ width: "48%" }}>
                {" "}
                <label style={{ fontSize: "18px", width: "100%" }}>
                  7. 電子郵箱（选修的）
                </label>
                <input
                  type="text"
                  name="studentEmail"
                  value={memberData.studentEmail || ""}
                  onChange={handleInputChange}
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
              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
}
