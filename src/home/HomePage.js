import React from "react";
import "../stylesheets/Home.css";
import LinkBilibili from "./LinkBilibili";
import NewPassword from "../auth/NewPassword";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import SystemMessage from "./SystemMessage";
import FavoritePage from "./FavoritePage";
import QueryRecords from "../shared/QueryRecords";

export default function HomePage({ user, setUser, menu }) {
  return (
    <div className="container align-items-start d-md-flex">
      <div className="nav flex-column nav-pills me-0 me-md-3 mb-3 mb-md-0">
        <NavLink to="/home/favorite" className="nav-link mb-1 text-center">
          我的收藏
        </NavLink>
        <NavLink to="/home/submitted" className="nav-link mb-1 text-center">
          制表历史
        </NavLink>
        <NavLink to="/home/message" className="nav-link mb-1 text-center">
          系统消息
        </NavLink>
        <NavLink to="/home/link-bilibili" className="nav-link mb-1 text-center">
          账户链接
        </NavLink>
        <NavLink to="/home/new-password" className="nav-link mb-1 text-center">
          更新密码
        </NavLink>
      </div>
      <hr className="d-block d-md-none mb-4" />
      <div className="tab-content border-start border-end">
        <Switch>
          <Route path="/home/favorite">
            <FavoritePage user={user} setUser={setUser} />
          </Route>
          <Route path="/home/submitted">
            <QueryRecords
              user={user}
              setUser={setUser}
              menu={menu}
              query={{ submitter: user.username }}
              cardStyle="showOperation"
            />
          </Route>
          <Route path="/home/message">
            <SystemMessage />
          </Route>
          <Route path="/home/link-bilibili">
            <LinkBilibili />
          </Route>
          <Route path="/home/new-password">
            <div className="position-relative" style={{ height: "70vh" }}>
              <NewPassword />
            </div>
          </Route>
          <Route path="/home/">
            <Redirect to="/home/favorite" />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
