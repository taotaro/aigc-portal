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
        <fieldset style={{ textAlign: "left" }}>
          <div>
            {memberNumber === 1 ? (
              <h5 style={{ marginBottom: "10px" }}>Member 1 (Leader)</h5>
            ) : (
              <h5 style={{ marginBottom: "10px" }}>Member {memberNumber}</h5>
            )}
          </div>
          <div style={{ padding: "10px" }}>
            <label>
              Student Name (Chinese)
              <input
                type="text"
                name="studentNameCN"
                value={memberData.studentNameCN || ""}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              (English)
              <input
                type="text"
                name="studentNameEN"
                value={memberData.studentNameEN || ""}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div style={{ padding: "10px" }}>
            <label>
              Year of Birth
              <input
                type="text"
                name="studentYearOfBirth"
                value={memberData.studentYearOfBirth || ""}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div style={{ padding: "10px" }}>
            <label>
              Gender
              <select
                name="studentGender"
                value={memberData.studentGender || ""}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
          </div>
          <div style={{ padding: "10px" }}>
            <label>
              Grade
              <input
                type="text"
                name="studentGrade"
                value={memberData.studentGrade || ""}
                onChange={handleInputChange}
                required
              />
            </label>
          </div>
          <div style={{ padding: "10px" }}>
            <label>
              Mobile Phone (optional)
              <input
                type="text"
                name="studentPhone"
                value={memberData.studentPhone || ""}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div style={{ padding: "10px" }}>
            <label>
              Email (optional)
              <input
                type="text"
                name="studentEmail"
                value={memberData.studentEmail || ""}
                onChange={handleInputChange}
              />
            </label>
          </div>
        </fieldset>
      </form>
    </>
  );
}
