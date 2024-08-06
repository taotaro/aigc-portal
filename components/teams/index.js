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
      <fieldset style={{ textAlign: "left" }}>
        <h4 style={{ marginBottom: "10px" }}>Team {teamNumber}</h4>
        <div style={{ marginBottom: "20px" }}>
          {members.map((member, index) => (
            <Members
              key={member.id}
              memberNumber={member.id}
              memberData={member.data}
              onMemberDataChange={handleMemberDataChange}
            />
          ))}
        </div>
        <button
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
        </button>
      </fieldset>
    </>
  );
}
