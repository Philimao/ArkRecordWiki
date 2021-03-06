import React, { useEffect, useRef, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import RecordsByGroup from "../index/content/RecordsByGroup";
import { toast } from "react-toastify";
import LoadingComp from "./LoadingComp";
import QuickEditModal from "./QuickEditModal";
import ReportRecordModal from "./ReportRecordModal";

export default function QueryRecords({
  user,
  setUser,
  query,
  limit,
  filter,
  menu,
  operators,
  categories,
  cardStyle,
}) {
  const [records, setRecords] = useState();
  const [filteredRecords, setFilteredRecords] = useState();
  const [page, setPage] = useState(1);
  const [pageArray, setPageArray] = useState();
  const [maxPage, setMaxPage] = useState();
  const recordsPerPage = window.matchMedia("(min-width: 768px)").matches
    ? 20
    : 10;
  const loadingFlag = useRef(true);
  const container = useRef();

  const [refresh, setRefresh] = useState(true);
  const [record, setRecord] = useState();
  const [reportRecord, setReportRecord] = useState();

  useEffect(() => {
    (async function () {
      let resRaw;
      if (!user) {
        resRaw = await fetch("/record/query-records", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: query }),
        });
      } else if (user && user.role === "user") {
        if (query.favorite) {
          resRaw = await fetch("/record/favorite-records", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ favorite: query.favorite }),
          });
        } else {
          resRaw = await fetch("/record/user-query-records", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: query }),
          });
        }
      } else {
        if (query.favorite) {
          resRaw = await fetch("/record/favorite-records", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ favorite: query.favorite }),
          });
        } else {
          resRaw = await fetch("/record/admin-query-records", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: query, limit: limit }),
          });
        }
      }
      if (!resRaw.ok) {
        toast.warning("??????????????????");
      } else {
        resRaw.json().then((res) => {
          setRecords(res);
          loadingFlag.current = false;
        });
      }
    })();
  }, [limit, query, user, refresh]);

  useEffect(() => {
    if (filter && filter.length !== 0) {
      setFilteredRecords(
        records.filter((record) => {
          try {
            const team = Array.isArray(record.team)
              ? record.team.join("")
              : record.team;
            return (
              record.raider.indexOf(filter) >= 0 ||
              record.story.indexOf(filter) >= 0 ||
              record.episode.indexOf(filter) >= 0 ||
              record.operation.indexOf(filter.toUpperCase()) >= 0 ||
              record.cn_name.indexOf(filter) >= 0 ||
              record.remark0.indexOf(filter) >= 0 ||
              record.remark1.indexOf(filter) >= 0 ||
              record.submitter.indexOf(filter) >= 0 ||
              record.url.indexOf(filter) >= 0 ||
              team.indexOf(filter) >= 0
            );
          } catch (err) {
            // console.log(err);
            // console.log(
            //   record.raider,
            //   record.story,
            //   record.episode,
            //   record.operation,
            //   record.cn_name,
            //   record.remark0,
            //   record.remark1
            // );
            return false;
          }
        })
      );
    } else {
      setFilteredRecords(records);
    }
  }, [filter, records]);

  useEffect(() => {
    if (filteredRecords) {
      setMaxPage(Math.ceil(filteredRecords.length / recordsPerPage));
    }
  }, [filteredRecords, recordsPerPage]);

  useEffect(() => {
    if (maxPage > 4) {
      if (page < 3) {
        setPageArray([1, 2, 3, 4, 5]);
      } else if (page > maxPage - 2) {
        setPageArray([
          maxPage - 4,
          maxPage - 3,
          maxPage - 2,
          maxPage - 1,
          maxPage,
        ]);
      } else {
        setPageArray([page - 2, page - 1, page, page + 1, page + 2]);
      }
    } else {
      setPageArray(Array.from(Array(maxPage).keys()).map((i) => i + 1));
    }
  }, [maxPage, page]);

  function MyPage() {
    if (records.length <= recordsPerPage) return null;
    return (
      <div className="d-flex justify-content-center">
        <Pagination>
          <Pagination.First onClick={() => setPage(1)} />
          <Pagination.Prev
            onClick={() => {
              if (page > 1) setPage(page - 1);
            }}
          />
          {/*<Pagination.Ellipsis />*/}
          {pageArray.map((item, index) => (
            <Pagination.Item
              active={item === page}
              key={"Page-" + index}
              onClick={() => setPage(item)}
            >
              {item}
            </Pagination.Item>
          ))}
          {/*<Pagination.Ellipsis />*/}
          <Pagination.Next
            onClick={() => {
              if (page < maxPage) setPage(page + 1);
            }}
          />
          <Pagination.Last onClick={() => setPage(maxPage)} />
        </Pagination>
      </div>
    );
  }

  if (!filteredRecords) {
    if (loadingFlag.current) {
      return <LoadingComp />;
    } else {
      return <h4 className="text-center">????????????</h4>;
    }
  }

  return (
    <div ref={container}>
      <div className="fw-light mb-3">
        {"????????????????????????" + filteredRecords.length}
      </div>
      <div style={{ minHeight: "calc(100vh - 28rem)" }}>
        <RecordsByGroup
          group={filteredRecords.filter((record, index) => {
            return (
              (page - 1) * recordsPerPage - 1 < index &&
              index < page * recordsPerPage
            );
          })}
          user={user}
          setUser={setUser}
          menu={menu}
          operators={operators}
          categories={categories}
          cardStyle={cardStyle ? cardStyle : ""}
          setRecord={setRecord}
          setReportRecord={setReportRecord}
          showOperation={true}
          setRefresh={setRefresh}
        />
      </div>
      <MyPage />
      <QuickEditModal
        user={user}
        menu={menu}
        operators={operators}
        categories={categories}
        record={record}
        setRecord={setRecord}
      />
      <ReportRecordModal user={user} reportRecord={reportRecord} />
    </div>
  );
}
