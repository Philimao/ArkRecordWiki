import React from "react";
import QueryRecords from "../../shared/QueryRecords";

export default function RecordsByOperator({ user, setUser, operator }) {
  const query = {
    team: { $regex: operator.name1 + ".*" },
  };

  return (
    <div>
      <h3 className="mb-2">
        以下为干员<strong>{operator.name1}</strong>的搜索结果:
      </h3>
      <QueryRecords user={user} setUser={setUser} query={query} />
    </div>
  );
}
