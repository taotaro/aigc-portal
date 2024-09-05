import React from "react";
import useTranslation from "next-translate/useTranslation";

export default function Members({ judgeName, judgeDescription }) {
  const { t } = useTranslation("common");
  //   const { name, value } = e.target;
  //   onJudgeDataChange({ ...judgeData, [name]: value });

  const handleInputChange = (e) => {};
  return (
    <>
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          borderColor: "black",
          border: "1px solid black",
          borderRadius: "8px",
          borderWidth: "1px",
          maxWidth: "20%",
          minWidth: "250px",
          // background: "black",
        }}
      >
        <div style={{ paddingBottom: "24px" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            {judgeName}
          </div>
        </div>
        <div>{judgeDescription}</div>
      </div>
    </>
  );
}
