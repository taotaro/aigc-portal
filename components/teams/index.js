import React, { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import Members from "../members";
import { toast, Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

export default function Teams({
  teamNumber,
  onTeamDataChange,
  reset,
  membersInfo,
}) {
  const { t } = useTranslation("common");
  const [members, setMembers] = useState([
    { id: 1, data: {} },
    { id: 2, data: {} },
  ]);

  useEffect(() => {
    if (reset) {
      setMembers([
        { id: 1, data: {} },
        { id: 2, data: {} },
      ]);
    } else if (membersInfo) {
      console.log("Setting Members: ", membersInfo);
      const validMembers =
        membersInfo.length === 2
          ? membersInfo
          : [
              { id: 1, data: {} },
              { id: 2, data: {} },
            ];
      setMembers(
        validMembers.map((member, index) => ({
          ...member,
          id: index + 1, // Ensure ids are sequential
        }))
      );
    } else {
      setMembers([
        { id: 1, data: {} },
        { id: 2, data: {} },
      ]);
    }
  }, [reset, teamNumber]);

  const addMember = () => {
    if (members.length < 4) {
      setMembers([...members, { id: members.length + 1, data: {} }]);
    } else {
      toast.error("每個團隊最多只能有 4 名成員！");
    }
  };

  const deleteLastMember = () => {
    if (members.length > 2) {
      setMembers(members.slice(0, -1));
    }
  };

  const deleteMember = (memberId) => {
    if (members.length > 2) {
      const updatedMembers = members
        .filter((member) => member.id !== memberId)
        .map((member, index) => ({
          ...member,
          id: index + 1, // Reassign the ids based on the new order
        }));
      setMembers(updatedMembers);
      onTeamDataChange(teamNumber, updatedMembers);
    } else {
      toast.error("每個團隊至少需要 2 名成員！");
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
      <div>
        {members.map((member, index) => (
          <div key={member.id}>
            <Members
              key={member.id}
              memberNumber={member.id}
              memberData={member.data}
              onMemberDataChange={handleMemberDataChange}
            />
            {index === members.length - 1 && members.length > 2 && (
              <div
                onClick={() => deleteLastMember()}
                style={{
                  backgroundColor: "transparent",
                  width: "100%",
                  color: "#FE6A00",
                  fontWeight: "normal",
                  paddingBottom: "24px",
                  cursor: "pointer",
                }}
              >
                删除会员 -
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {members.length < 4 && (
          <div
            className="module-button"
            onClick={addMember}
            style={{
              backgroundColor: "transparent",
              width: "100%",
              color: "#FE6A00",
              fontWeight: "normal",
            }}
          >
            新增學生 +
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
}
