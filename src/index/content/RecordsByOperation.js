import React, { useState, useEffect } from "react";
import RecordsByGroup from "./RecordsByGroup";
import OperationComp from "../../shared/OperationComp";
import { toast } from "react-toastify";
import cc_color_theme from "../../theme/cc_color_theme";
import LoadingComp from "../../shared/LoadingComp";
import QuickEditModal from "../../shared/QuickEditModal";

export default function RecordsByOperation({
  user,
  setUser,
  records,
  story,
  episode,
  operation,
  menu,
  menuButtons,
  operators,
  categories,
}) {
  const [logo, setLogo] = useState();

  const [category, setCategory] = useState();
  const [filteredRecordsObject, setFilteredRecordsObject] = useState();
  const [groupArray, setGroupArray] = useState();

  const [record, setRecord] = useState();

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

  useEffect(() => {
    const object = {};
    for (let category of categories) {
      const filtered = records.filter((record) => {
        if (record.category) {
          return record.category.includes(category);
        } else {
          return category === "常规队";
        }
      });
      if (filtered.length > 0) {
        object[category] = filtered;
      }
    }
    setFilteredRecordsObject(object);
  }, [categories, records]);

  useEffect(() => {
    if (filteredRecordsObject) {
      setCategory(Object.keys(filteredRecordsObject)[0]);
    }
  }, [filteredRecordsObject]);

  if (!filteredRecordsObject) return <LoadingComp />;

  const hideCategory =
    Object.keys(filteredRecordsObject).length === 0 ||
    (Object.keys(filteredRecordsObject).length === 1 && category === "常规队");

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
          categories={categories}
        />
        {hideCategory ? null : (
          <div className="d-flex justify-content-end">
            <select
              className="form-select"
              value={category}
              onChange={(evt) => setCategory(evt.target.value)}
              style={{ width: "150px" }}
            >
              {Object.keys(filteredRecordsObject).map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        )}
        {filteredRecordsObject[category] ? (
          <RecordsByCategory
            key={category}
            records={filteredRecordsObject[category]}
            user={user}
            setUser={setUser}
            operators={operators}
            groupArray={groupArray}
            operation={operation}
            menu={menu}
            categories={categories}
            setRecord={setRecord}
          />
        ) : null}
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
      <QuickEditModal
        user={user}
        menu={menu}
        operators={operators}
        categories={categories}
        record={record}
        setRecord={setRecord}
      />
    </div>
  );
}

function RecordsByCategory({
  records,
  user,
  setUser,
  operators,
  groupArray,
  setRecord,
  operation,
  menu,
  categories,
}) {
  const [normal, setNormal] = useState([]);
  const [challenge, setChallenge] = useState([]);

  useEffect(() => {
    setNormal(records.filter((record) => record.operationType === "normal"));
    setChallenge(
      records.filter((record) => record.operationType === "challenge")
    );
  }, [records]);

  return (
    <div>
      <RecordsByType
        records={normal}
        header={challenge.length === 0 ? undefined : "普通"}
        user={user}
        setUser={setUser}
        operators={operators}
        groupArray={groupArray}
        setRecord={setRecord}
        menu={menu}
        categories={categories}
      />
      <RecordsByType
        records={challenge}
        header="突袭"
        operation={operation}
        user={user}
        setUser={setUser}
        operators={operators}
        groupArray={groupArray}
        setRecord={setRecord}
        menu={menu}
        categories={categories}
      />
    </div>
  );
}

function RecordsByType({
  records,
  header,
  operation,
  user,
  setUser,
  operators,
  groupArray,
  setRecord,
  menu,
  categories,
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
          <RecordsByGroup
            key={index}
            group={group}
            header={groupArray[index]}
            user={user}
            setUser={setUser}
            menu={menu}
            operators={operators}
            setRecord={setRecord}
            categories={categories}
          />
        ))}
      </div>
    </div>
  );
}
