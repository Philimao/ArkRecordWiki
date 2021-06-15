import React from "react";
import { useParams } from "react-router-dom";
import QueryRecords from "../../shared/QueryRecords";

export default function RecordsByOperator({
  user,
  setUser,
  menu,
  operators,
  categories,
}) {
  const { op } = useParams();
  const query = {
    team: { $regex: op + ".*" },
  };

  return (
    <div className="mb-5">
      <h3 className="mb-3">
        以下为干员<strong>{op}</strong>的搜索结果:
      </h3>
      <QueryRecords
        user={user}
        setUser={setUser}
        query={query}
        cardStyle="showOperation showTeam showCategory"
        menu={menu}
        operators={operators}
        categories={categories}
      />
    </div>
  );
}
