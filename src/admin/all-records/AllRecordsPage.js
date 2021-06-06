import React, { useRef, useState } from "react";
import QueryRecords from "../../shared/QueryRecords";
import FloatingInputBox from "../../shared/FloatingInputBox";

export default function AllRecordsPage({ user, setUser, menu, categories }) {
  const [query, setQuery] = useState({});
  const [limit, setLimit] = useState(60);
  const [searchValue, setSearchValue] = useState("");

  const recentBtn = useRef();

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
            setQuery({ archive: true });
            setLimit(undefined);
            setSearchValue("");
          }}
        >
          归档记录
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
        menu={menu}
        categories={categories}
        cardStyle={"detailed" + (query.archive ? " archive" : "")}
      />
    </div>
  );
}
