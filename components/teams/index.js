import React, { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import Members from "../members";
import { toast, Toaster } from "react-hot-toast";

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
    if (membersInfo) {
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
    } else if (reset) {
      setMembers([
        { id: 1, data: {} },
        { id: 2, data: {} },
      ]);
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
      toast.error("Can only have a maximum of 4 members per team!");
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
      toast.error("Need a minimum of 2 members per team!");
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
        <div>
          {members.map((member, index) => (
            <>
              <Members
                key={member.id}
                memberNumber={member.id}
                memberData={member.data}
                onMemberDataChange={handleMemberDataChange}
              />
              <div
                onClick={() => deleteMember(member.id)}
                style={{
                  // background: members.length >= 4 ? "darkgrey" : "ff6a00",
                  backgroundColor: "transparent",
                  width: "100%",
                  color: "#FE6A00",
                  fontWeight: "normal",
                  paddingBottom: "24px",
                  cursor: "pointer",

                  // color: members.length >= 4 ? "white" : "black",
                  // borderColor: members.length >= 4 ? "darkgrey" : "#FE6A00",
                }}
              >
                删除会员 -
              </div>
            </>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            // justifyContent: "center",
            // flexDirection: "column",
            // alignItems: "center",
            // alignSelf: "center",
            justifyContent: "space-between",
          }}
        >
          {/* <section
              className="position-relative module-box"
              // style={{ width: "20%" }}
            > */}
          <div
            className="module-button"
            onClick={addMember}
            style={{
              // background: members.length >= 4 ? "darkgrey" : "ff6a00",
              backgroundColor: "transparent",
              width: "100%",
              color: "#FE6A00",
              fontWeight: "normal",
              // color: members.length >= 4 ? "white" : "black",
              // borderColor: members.length >= 4 ? "darkgrey" : "#FE6A00",
            }}
          >
            新增學生 +
          </div>
          {/* </section> */}
          {/* <button
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
          </button> */}
          {/* <button
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
          </button> */}
          {/* <section className="position-relative module-box">
              <div
                className="module-button"
                onClick={deleteLastMember}
                style={{
                  background: members.length <= 2 ? "darkgrey" : "ff6a00",
                }}
              >
                删除会员
              </div>
            </section> */}
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
      <Toaster />
    </>
  );
}
