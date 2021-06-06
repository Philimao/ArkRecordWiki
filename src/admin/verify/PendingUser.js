import React, { useEffect, useState } from "react";
import LoadingComp from "../../shared/LoadingComp";

export default function PendingUser() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    fetch("/admin/pending-user").then((resRaw) => {
      if (resRaw.ok) {
        resRaw.json().then((res) => {
          setList(res);
        });
      }
      setLoading(false);
    });
  }, [refresh]);

  const emptyList = () => {
    if (loading) {
      return <LoadingComp />;
    } else {
      return <h4 className="fw-bold text-center">暂无用户</h4>;
    }
  };

  function UserDetail({ user }) {
    const [validTime, setValidTime] = useState(
      10 * 60 * 1000 - Date.now() + new Date(user.time).getTime()
    );

    useEffect(() => {
      const timer = setTimeout(() => {
        setValidTime(validTime - 1000);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    });

    return (
      <tr>
        <th scope="row">{user.email}</th>
        <th>{user.code}</th>
        <th>{(validTime / 1000).toFixed(0)}</th>
      </tr>
    );
  }

  return (
    <div>
      <div className="d-flex mb-3">
        <h4 className="fw-bold mb-3 me-auto">待验证用户</h4>
        <button
          className="btn btn-primary"
          onClick={() => setRefresh((prev) => !prev)}
        >
          刷新页面
        </button>
      </div>
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">邮箱</th>
              <th scope="col">验证码</th>
              <th scope="col">有效时间</th>
            </tr>
          </thead>
          <tbody>
            {list.map((user) => (
              <UserDetail user={user} key={user.email} />
            ))}
          </tbody>
        </table>
        {list.length === 0 ? emptyList() : null}
      </div>
    </div>
  );
}
