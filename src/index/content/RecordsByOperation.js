import React, { useState, useEffect } from "react";
import RecordsByGroup from "./RecordsByGroup";
import OperationComp from "../../shared/OperationComp";
import { toast } from "react-toastify";
import cc_color_theme from "../../theme/cc_color_theme";
import LoadingComp from "../../shared/LoadingComp";
import QuickEditModal from "../../shared/QuickEditModal";
import ReportRecordModal from "../../shared/ReportRecordModal";
import { useLocation } from "react-router-dom";
import QuickSubmitModal from "../../shared/QuickSubmitModal";

export default function RecordsByOperation({
  user,
  setUser,
  menu,
  menuButtons,
  operators,
  categories,
}) {
  const [operation, setOperation] = useState();
  const [cnName, setCnName] = useState();
  const [operationObject, setOperationObject] = useState();

  const [records, setRecords] = useState();

  const [logo, setLogo] = useState();

  const [category, setCategory] = useState();
  const [filteredRecordsObject, setFilteredRecordsObject] = useState();
  const [groupArray, setGroupArray] = useState();

  const [refresh, setRefresh] = useState(true);
  const [record, setRecord] = useState();
  const [reportRecord, setReportRecord] = useState();

  const location = useLocation();

  useEffect(() => {
    // cc daily rotation includes "/" that lead to problems
    const full_operation = location.pathname.slice(11);
    setOperation(
      full_operation.split("+")[0].replace("_", "/").replace("_", "/")
    );
    setCnName(full_operation.split("+")[1]);
  }, [location]);

  useEffect(() => {
    if (operation && cnName) {
      fetch("/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation: operation,
          cn_name: cnName,
        }),
      }).then((resRaw) => {
        if (!resRaw.ok) {
          resRaw.text().then((res) => toast.warning(res));
        } else {
          resRaw.json().then((records) => {
            setRecords(records);
          });
        }
      });
      // set story, episode and operationObject
      if (menu) {
        for (let storyObject of menu.childNodes) {
          for (let episodeObject of storyObject.childNodes) {
            if (episodeObject.childNodes) {
              for (let operationObject of episodeObject.childNodes) {
                if (
                  operationObject.operation === operation &&
                  operationObject.cn_name === cnName
                ) {
                  operationObject.story = storyObject.story;
                  operationObject.episode = episodeObject.episode;
                  setOperationObject(operationObject);
                  break;
                }
              }
            }
          }
        }
      }
    }
  }, [menu, cnName, operation, refresh]);

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
    if (operationObject && operationObject.story === "危机合约") {
      let flag = true;
      for (let theme of cc_color_theme) {
        if (operationObject.episode === theme.name) {
          if (theme.logo) {
            setLogo(window.location.origin + theme.logo);
            flag = false;
            break;
          }
        }
      }
      if (flag) setLogo(undefined);
    } else {
      setLogo(undefined);
    }
  }, [operationObject]);

  useEffect(() => {
    if (records) {
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
    }
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
          operationObject={operationObject}
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
            category={category}
            user={user}
            setUser={setUser}
            operators={operators}
            groupArray={groupArray}
            operation={operation}
            menu={menu}
            categories={categories}
            setRecord={setRecord}
            setReportRecord={setReportRecord}
            setRefresh={setRefresh}
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
        setRefresh={setRefresh}
      />
      <QuickSubmitModal
        user={user}
        operationObject={operationObject}
        menu={menu}
        operators={operators}
        categories={categories}
        setRefresh={setRefresh}
      />
      <ReportRecordModal user={user} reportRecord={reportRecord} />
    </div>
  );
}

function RecordsByCategory({
  records,
  category,
  user,
  setUser,
  operators,
  groupArray,
  setRecord,
  setReportRecord,
  operation,
  menu,
  categories,
  setRefresh,
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
        category={category}
        header={challenge.length === 0 ? undefined : "普通"}
        user={user}
        setUser={setUser}
        operators={operators}
        groupArray={groupArray}
        setRecord={setRecord}
        setReportRecord={setReportRecord}
        menu={menu}
        categories={categories}
        setRefresh={setRefresh}
      />
      <RecordsByType
        records={challenge}
        category={category}
        header="突袭"
        operation={operation}
        user={user}
        setUser={setUser}
        operators={operators}
        groupArray={groupArray}
        setRecord={setRecord}
        setReportRecord={setReportRecord}
        menu={menu}
        categories={categories}
        setRefresh={setRefresh}
      />
    </div>
  );
}

function RecordsByType({
  records,
  category,
  header,
  operation,
  user,
  setUser,
  operators,
  groupArray,
  setRecord,
  setReportRecord,
  menu,
  categories,
  setRefresh,
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
            category={category}
            header={groupArray[index]}
            user={user}
            setUser={setUser}
            menu={menu}
            operators={operators}
            setRecord={setRecord}
            setReportRecord={setReportRecord}
            categories={categories}
            setRefresh={setRefresh}
          />
        ))}
      </div>
    </div>
  );
}
