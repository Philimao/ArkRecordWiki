import React, { useState, useEffect } from "react";
import RecordGroup from "../../shared/RecordGroup";
import OperationComp from "../../shared/OperationComp";
import { toast } from "react-toastify";
import cc_color_theme from "../../theme/cc_color_theme";

export default function DisplayRecords({
  user,
  setUser,
  records,
  story,
  episode,
  operation,
  menu,
  menuButtons,
  operators,
}) {
  const [normal, setNormal] = useState([]);
  const [challenge, setChallenge] = useState([]);
  const [logo, setLogo] = useState();

  const [groupArray, setGroupArray] = useState();

  useEffect(() => {
    fetch("/menu/group-array").then((resRaw) => {
      if (!resRaw.ok) {
        resRaw.text().then((res) => {
          toast.warning(res);
        });
      } else {
        resRaw.json().then((res) => {
          setGroupArray(res);
        });
      }
    });
  }, []);

  useEffect(() => {
    setNormal(records.filter((record) => record.operationType === "normal"));
    setChallenge(
      records.filter((record) => record.operationType === "challenge")
    );
  }, [records]);

  useEffect(() => {
    if (story === "危机合约") {
      let flag = true;
      for (let theme of cc_color_theme) {
        if (episode === theme.name) {
          if (theme.logo) {
            setLogo(theme.logo);
            flag = false;
            break;
          }
        }
      }
      if (flag) setLogo(undefined);
    } else {
      setLogo(undefined);
    }
  }, [story, episode]);

  return (
    <div>
      <div className="row">
        <OperationComp
          user={user}
          story={story}
          episode={episode}
          operation={operation}
          menu={menu}
          menuButtons={menuButtons}
          operators={operators}
        />
        <RecordType
          records={normal}
          header={challenge.length === 0 ? undefined : "普通"}
          user={user}
          setUser={setUser}
          operators={operators}
          groupArray={groupArray}
        />
        <RecordType
          records={challenge}
          header="突袭"
          operation={operation}
          user={user}
          setUser={setUser}
          operators={operators}
          groupArray={groupArray}
        />
      </div>
      {logo ? (
        <div
          style={{
            width: "30vw",
            height: "30vw",
            position: "fixed",
            right: "5vw",
            bottom: "5vw",
            backgroundImage: `url(${logo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            opacity: "0.1",
            zIndex: "-1",
          }}
        />
      ) : null}
    </div>
  );
}

function RecordType({
  records,
  header,
  operation,
  user,
  setUser,
  operators,
  groupArray,
}) {
  if (records.length === 0 || !groupArray) return null;

  const groups = groupArray.map((item, index) => {
    return records.filter((record) => record.group === groupArray[index]);
  });

  return (
    <div className="mt-3 mb-5">
      <h3 className="">{header ? header : "关卡纪录"}</h3>
      <hr className="mt-0" />
      {operation ? (
        <div className="fw-light text-danger">{operation.challenge}</div>
      ) : null}
      <div className="row mt-3">
        {groups.map((group, index) => (
          <RecordGroup
            group={group}
            header={groupArray[index]}
            user={user}
            setUser={setUser}
            key={index}
            operators={operators}
          />
        ))}
      </div>
    </div>
  );
}
