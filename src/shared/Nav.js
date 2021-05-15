import React, { useRef, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import SearchForm from "../index/SearchForm";
import { toast } from "react-toastify";

export default function Nav({
  user,
  menuArray,
  handleSearch,
  searchValue,
  setSearchValue,
  searchType,
  setSearchType,
  operatorArray,
  resetPage,
}) {
  const su = user && user.role === "su";
  const admin = user && (su || user.role === "admin");
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const navbar = useRef();
  const userIcon = useRef();
  const collapseButton = useRef();

  function collapseNav() {
    if (!collapseButton.current.classList.contains("collapsed"))
      setTimeout(() => {
        collapseButton.current.click();
      }, 200);
  }

  function renderDropdown() {
    async function logout() {
      document.cookie = "_id= ; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      const resRaw = await fetch("/user/logout");
      if (!resRaw.ok) {
        const res = await resRaw.text();
        toast.warning(res);
      }
      toast.info("即将登出...");
      setTimeout(() => (window.location = "/"), 1000);
    }
    if (window.matchMedia("(min-width: 992px)").matches) {
      if (toggleDropdown) {
        return (
          <div
            onMouseLeave={() => {
              if (toggleDropdown) setToggleDropdown(false);
            }}
            id="user_dropdown"
            className="position-absolute"
            style={{
              top: userIcon.current.getBoundingClientRect().bottom,
              width: userIcon.current.getBoundingClientRect().width,
            }}
          >
            <Link className="align-self-center" to="/home/message">
              系统消息
            </Link>
            <Link
              className="align-self-center"
              id="logout_btn"
              onClick={logout}
              to="#"
            >
              登出
            </Link>
          </div>
        );
      }
    } else {
      return (
        <div className="navbar-nav mb-2 mb-md-0">
          <Link
            className="nav-item nav-link mb-2 mb-md-0"
            to="/home/message"
            onClick={collapseNav}
          >
            系统消息
          </Link>
          <div className="nav-item nav-link" onClick={logout}>
            登出
          </div>
        </div>
      );
    }
  }

  return (
    <nav
      ref={navbar}
      className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top"
      onMouseLeave={() => {
        if (toggleDropdown) {
          setToggleDropdown(false);
        }
      }}
    >
      <div className="container-fluid d-flex">
        <Link className="navbar-brand" to="/" onClick={() => resetPage()}>
          <img
            src="../favicon/favicon-32x32.png"
            alt="favicon"
            width="32"
            height="32"
            className="d-inline-block align-self-center"
          />
          <div className="d-inline-block align-middle">明日方舟少人WIKI</div>
        </Link>
        <button
          ref={collapseButton}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse mt-1 mt-md-0"
          id="navbarSupportedContent"
        >
          <div className="ms-md-auto" />
          {admin ? (
            <div className="navbar-nav mb-2 mb-md-0">
              <Link
                className="nav-item nav-link"
                to="/admin"
                id="admin_page"
                onClick={collapseNav}
              >
                纪录管理
              </Link>
            </div>
          ) : null}
          {user ? (
            <div className="navbar-nav mb-2 mb-md-0">
              <Link
                className="nav-item nav-link"
                to="/submit"
                id="submit_page"
                onClick={collapseNav}
              >
                纪录提交
              </Link>
            </div>
          ) : null}
          <Switch>
            <Route path="/">
              {/* profile icon */}
              <div
                className="navbar-nav mb-2 mb-md-0 position-relative"
                ref={userIcon}
                onMouseEnter={() => {
                  setToggleDropdown(true);
                }}
              >
                {user ? renderDropdown() : null}
                <Link
                  className="nav-item nav-link change-links"
                  to={user ? "/home/profile" : "/auth"}
                  id="profile_photo"
                  onClick={collapseNav}
                >
                  <img
                    className="rounded-circle profile-photo"
                    src={
                      user
                        ? user.profile_photo
                        : "../images/default-profile-photo.jpg"
                    }
                    alt="profile"
                    width="32px"
                    height="32px"
                  />
                  <div
                    className="d-inline-block align-middle ms-2 username"
                    id="username"
                  >
                    {user ? user.username : "游客"}
                  </div>
                </Link>
              </div>
              <Route exact path="/">
                <SearchForm
                  menuArray={menuArray}
                  handleSearch={handleSearch}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  searchType={searchType}
                  setSearchType={setSearchType}
                  operatorArray={operatorArray}
                />
              </Route>
            </Route>
          </Switch>
        </div>
      </div>
    </nav>
  );
}
