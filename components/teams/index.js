import React, { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import Members from "../members";

export default function Teams({ teamNumber, onTeamDataChange }) {
  const { t } = useTranslation("common");
  const [members, setMembers] = useState([
    { id: 1, data: {} },
    { id: 2, data: {} },
  ]);

  const addMember = () => {
    if (members.length < 4) {
      setMembers([...members, { id: members.length + 1, data: {} }]);
    }
  };

  const deleteLastMember = () => {
    if (members.length > 2) {
      setMembers(members.slice(0, -1));
    }
  };

  const handleMemberDataChange = (memberNumber, data) => {
    const updatedMembers = members.map((member) =>
      member.id === memberNumber ? { ...member, data } : member
    );
    setMembers(updatedMembers);
    onTeamDataChange(teamNumber, updatedMembers);
  };

  return (
    <>
      <fieldset>
        <div
          style={
            {
              // fontSize: "24px",
            }
          }
        >
          <div style={{ fontSize: "24px", paddingBottom: "24px" }}>
            {" "}
            隊伍 {teamNumber}
          </div>
        </div>
        <div>
          {members.map((member, index) => (
            <Members
              key={member.id}
              memberNumber={member.id}
              memberData={member.data}
              onMemberDataChange={handleMemberDataChange}
            />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            // justifyContent: "center",
            // flexDirection: "column",
            gap: "24px",
            alignItems: "center",
            alignSelf: "center",
            paddingBottom: "80px",
          }}
        >
          <button
            type="button"
            style={{
              display: "flex",
              borderRadius: "22px",
              // background: "#FE6A00",
              // color: "#fff",
              background: members.length >= 4 ? "darkgrey" : "transparent",
              color: members.length >= 4 ? "white" : "black",
              borderColor: members.length >= 4 ? "darkgrey" : "#FE6A00",
              padding: "12px 32px",
              width: "20%",
              // textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={addMember}
            disabled={members.length >= 4}
          >
            添加会员
          </button>
          <button
            type="button"
            style={{
              display: "flex",
              borderRadius: "22px",
              // background: "#FE6A00",
              // color: "black",
              background: members.length <= 2 ? "darkgrey" : "transparent",
              color: members.length <= 2 ? "white" : "black",
              borderColor: members.length <= 2 ? "darkgrey" : "#FE6A00",
              padding: "12px 32px",
              width: "20%",
              // textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={deleteLastMember}
            disabled={members.length <= 2}
          >
            删除会员
          </button>
        </div>
        {/* <button
          type="button"
          onClick={addMember}
          disabled={members.length >= 4}
        >
          Add Member
        </button>
        <button
          type="button"
          onClick={deleteLastMember}
          disabled={members.length <= 2}
        >
          Delete Member
        </button> */}
      </fieldset>
    </>
  );
}
