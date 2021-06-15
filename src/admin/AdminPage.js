import React from "react";
import Episode from "./episode/Episode";
import ReviewPage from "./review/ReviewPage";
import "../stylesheets/Admin.css";
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Operation from "./operation/Operation";
import GroupManagement from "./group/GroupManagement";
import OperatorComp from "./operator/OperatorComp";
import AllRecordsPage from "./all-records/AllRecordsPage";
import ContactMessage from "./contact/ContactMessage";
import PendingUser from "./verify/PendingUser";
import SetNewsPage from "./set-news/SetNewsPage";
import ReviewFreePage from "./review-free/ReviewFreePage";
import CategoryManagement from "./category/CategoryManagement";

export default function AdminPage({
  user,
  setUser,
  menu,
  updateMenu,
  operators,
  categories,
}) {
  return (
    <Router basename="/admin">
      <div className="container align-items-start d-md-flex">
        <div className="nav flex-column nav-pills me-0 me-md-3 mb-3 mb-md-0">
          <NavLink
            to="/review"
            className="nav-link mb-1 text-center"
            activeClassName="active"
          >
            审核纪录
          </NavLink>
          <NavLink to="/contact" className="nav-link mb-1 text-center">
            用户反馈
          </NavLink>
          <NavLink to="/review-free" className="nav-link mb-1 text-center">
            免审核复核
          </NavLink>
          <NavLink to="/episode" className="nav-link mb-1 text-center">
            章节活动
          </NavLink>
          <NavLink to="/operation" className="nav-link mb-1 text-center">
            关卡管理
          </NavLink>
          <NavLink to="/set-content" className="nav-link mb-1 text-center">
            公告管理
          </NavLink>
          <NavLink to="/operator" className="nav-link mb-1 text-center">
            干员列表
          </NavLink>
          <NavLink to="/all-records" className="nav-link mb-1 text-center">
            所有纪录
          </NavLink>
          <NavLink to="/category" className="nav-link mb-1 text-center">
            流派管理
          </NavLink>
          <NavLink to="/group" className="nav-link mb-1 text-center">
            分组管理
          </NavLink>
          <NavLink to="/pending-user" className="nav-link mb-1 text-center">
            待验证用户
          </NavLink>
          <NavLink to="/menu" className="nav-link mb-1 text-center">
            显示目录
          </NavLink>
        </div>
        <hr className="d-block d-md-none mb-4" />
        <div className="tab-content border-start border-end">
          <Switch>
            <Route path="/review">
              <ReviewPage
                operators={operators}
                menu={menu}
                categories={categories}
              />
            </Route>
            <Route path="/contact">
              <ContactMessage user={user} />
            </Route>
            <Route path="/review-free">
              <ReviewFreePage
                user={user}
                setUser={setUser}
                menu={menu}
                operators={operators}
                categories={categories}
              />
            </Route>
            <Route path="/episode">
              <Episode user={user} menu={menu} updateMenu={updateMenu} />
            </Route>
            <Route path="/operation">
              <Operation user={user} menu={menu} updateMenu={updateMenu} />
            </Route>
            <Route path="/operator">
              <OperatorComp />
            </Route>
            <Route path="/all-records">
              <AllRecordsPage
                user={user}
                setUser={setUser}
                menu={menu}
                operators={operators}
                categories={categories}
              />
            </Route>
            <Route path="/category">
              <CategoryManagement user={user} />
            </Route>
            <Route path="/group">
              <GroupManagement user={user} />
            </Route>
            <Route path="/pending-user">
              <PendingUser user={user} />
            </Route>
            <Route path="/set-content">
              <SetNewsPage />
            </Route>
            <Route path="/menu">
              <PlainMenu menu={menu} />
            </Route>
            <Route path="/">
              <Redirect to="/review" />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function PlainMenu({ menu }) {
  function sortByIndex(a, b) {
    return parseInt(a.index) - parseInt(b.index);
  }

  const renderOp = (episode) =>
    episode.childNodes.map((operation, index) => (
      <div key={"Operation-" + index}>
        <span className="fs-5">├────── </span>
        <span>{operation.operation + " " + operation.cn_name}</span>
      </div>
    ));

  return (
    <div>
      {menu.childNodes.map((story, index) => {
        story.childNodes.sort(sortByIndex);
        return (
          <div className="mb-3" key={"Story- " + index}>
            <div className="fs-4 fw-bolder">{story.story}</div>
            {story.childNodes.map((episode, index) => {
              if (episode.childNodes) {
                episode.childNodes.sort(sortByIndex);
              }
              return (
                <div key={"Episode-" + index}>
                  <div className="fs-5">
                    {"├─── "}
                    <span className="">{episode.episode}</span>
                  </div>
                  {!episode.childNodes ? null : renderOp(episode)}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
