import React from "react";
import useTranslation from "next-translate/useTranslation";

export default function Members({
    judgeName,
    judgeDescription,
    judgeInfo,
    judgePhoto,
}) {
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
                    // border: "1px solid black",
                    borderRadius: "8px",
                    borderWidth: "1px",
                    maxWidth: "20%",
                    minWidth: "250px",
                    background: "#D3D3D3",
                }}
            >
                <div key={judgeName} style={{ paddingBottom: "24px" }}>
                    <img
                        className="module-logo__img"
                        src={judgePhoto}
                        alt={judgeName}
                    />
                </div>
                <div>{judgeName}</div>
                <div>{judgeDescription}</div>
                <div>{judgeInfo}</div>
            </div>
        </>
    );
}
