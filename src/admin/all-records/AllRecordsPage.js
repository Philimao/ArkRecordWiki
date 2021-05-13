import React, { useRef, useState } from "react";
import QueryRecords from "../../shared/QueryRecords";
import FloatingInputBox from "../../shared/FloatingInputBox";
import Modal from "../../shared/Modal";
import Review from "../review/Review";

export default function AllRecordsPage({ user, setUser, operators, menu }) {
  const [query, setQuery] = useState({});
  const [limit, setLimit] = useState(60);
  const [searchValue, setSearchValue] = useState("");

  const recentBtn = useRef();
  const [refresh, setRefresh] = useState(false);

  function quickReview() {
    return <Review operators={operators} refresh={refresh} menu={menu} />;
  }

  function handleModalClose() {
    recentBtn.current.click();
  }

  if (!user || !setUser) return null;
  return (
    <div>
      <div className="mb-3">
        <button
          ref={recentBtn}
          className="btn btn-primary me-2 mb-2"
          onClick={() => {
            setQuery({});
            setLimit(60);
            setSearchValue("");
          }}
        >
          最近纪录
        </button>
        <button
          className="btn btn-primary me-2 mb-2"
          onClick={() => {
            setQuery({ submitter: user.username });
            setLimit(undefined);
            setSearchValue("");
          }}
        >
          个人提交纪录
        </button>
        <button
          className="btn btn-primary me-2 mb-2"
          onClick={() => {
            setQuery({ reviewer: user.username });
            setLimit(undefined);
            setSearchValue("");
          }}
        >
          个人过审记录
        </button>
        <button
          className="btn btn-primary me-2 mb-2"
          onClick={() => {
            if (window.confirm("加载所有纪录将会降低性能，是否确定？")) {
              setQuery({});
              setLimit(undefined);
              setSearchValue("");
            }
          }}
        >
          全部纪录
        </button>
        <button
          className="btn btn-primary me-2 mb-2"
          data-bs-toggle="modal"
          data-bs-target="#quick_review"
          onClick={() => setRefresh((prev) => !prev)}
        >
          快速编辑
        </button>
      </div>
      <FloatingInputBox
        id="quick_search_all_records"
        value={searchValue}
        onChange={(evt) => setSearchValue(evt.target.value)}
        label="快速搜索"
      />
      <QueryRecords
        user={user}
        setUser={setUser}
        query={query}
        limit={limit}
        filter={searchValue}
        cardStyle="detailed"
      />
      <Modal
        id="quick_review"
        header="快速编辑"
        Content={quickReview}
        handleClose={handleModalClose}
      />
    </div>
  );
}
