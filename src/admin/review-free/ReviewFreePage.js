import React from "react";
import QueryRecords from "../../shared/QueryRecords";

export default function ReviewFreePage({
  user,
  setUser,
  menu,
  categories,
  operators,
}) {
  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold">免审核用户提交</h4>
        <QueryRecords
          user={user}
          setUser={setUser}
          query={{ reviewer: "review_free" }}
          menu={menu}
          operators={operators}
          categories={categories}
          cardStyle="detailed validate"
        />
      </div>
      <div className="mb-4">
        <h4 className="fw-bold">管理员提交</h4>
        <QueryRecords
          user={user}
          setUser={setUser}
          query={{ reviewer: "admin_submit" }}
          menu={menu}
          operators={operators}
          categories={categories}
          cardStyle="detailed validate"
        />
      </div>
    </div>
  );
}
