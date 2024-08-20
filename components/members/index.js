import React, { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import InputField from "../input-field";

export default function Members({
  memberNumber,
  memberData,
  onMemberDataChange,
  isSubmitted,
}) {
  const { t } = useTranslation("common");

  const MemberList = [
    {
      label: "1. 學生姓名（中文）",
      value: memberData.studentNameCN,
      type: "text",
      name: "studentNameCN",
      required: true,
      options: [],
      error: "請輸入學生姓名（中文）",
    },
    {
      label: "2. 學生姓名（英文）",
      value: memberData.studentNameEN,
      type: "text",
      name: "studentNameEN",
      required: true,
      options: [],
      error: "請輸入學生姓名（英文）",
    },
    {
      label: "3. 出生年份 ",
      value: memberData.studentYearOfBirth,
      type: "text",
      name: "studentYearOfBirth",
      required: true,
      options: [],
      error: "請輸入出生年份",
    },
    {
      label: "4. 性別 ",
      value: memberData.studentGender,
      type: "select",
      name: "studentGender",
      required: true,
      options: [
        {
          label: "請選擇",
          value: "",
        },
        {
          label: "男性",
          value: "Male",
        },
        {
          label: "女性",
          value: "Female",
        },
      ],
      error: "請選擇性別",
    },
    {
      label: "5. 就讀年級 ",
      value: memberData.studentGrade,
      type: "number",
      name: "studentGrade",
      required: true,
      options: [],
      error: "請輸入就讀年級",
    },
    {
      label: "6. 手提電話 (選填)",
      value: memberData.studentPhone,
      type: "number",
      name: "studentPhone",
      required: false,
      options: [],
      error: "",
    },
    {
      label: "7. 電子郵箱 (選填)",
      value: memberData.studentEmail,
      type: "email",
      name: "studentEmail",
      required: false,
      options: [],
      error: "",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onMemberDataChange(memberNumber, { ...memberData, [name]: value });
  };

  return (
    <>
      <div>
        <div>
          <fieldset style={{ paddingBottom: "24px" }}>
            <div
              style={{
                fontSize: "24px",
                paddingBottom: "24px",
                paddingTop: "24px",
              }}
            >
              {memberNumber === 1 ? (
                <>隊員 {memberNumber} （隊長）</>
              ) : (
                <>隊員 {memberNumber}</>
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

                {MemberList.map((item) => (
                  <div className="input-container">
                    <InputField
                      inputLabel={item.label}
                      inputName={item.name}
                      inputValue={item.value}
                      onInputChange={handleInputChange}
                      isSubmitted={isSubmitted}
                      isRequired={item.required}
                      inputOptions={item.options}
                      inputType={item.type}
                      errorMessage={item.error}
                    />
                  </div>
                ))}
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </>
  );
}
