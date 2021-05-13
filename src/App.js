import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Nav from "./shared/Nav";
import IndexPage from "./index/IndexPage";
import Auth from "./auth/Auth";
import Footer from "./shared/Footer";
import HomePage from "./home/HomePage";
import AdminPage from "./admin/AdminPage";
import { ToastContainer } from "react-toastify";

import "./stylesheets/Main.css";
import "react-toastify/dist/ReactToastify.css";
import Changelog from "./others/Changelog";
import AboutModal from "./index/AboutModal";
import SubmitPage from "./submit/SubmitPage";

export default function App() {
  const [user, setUser] = useState();
  const [menu, setMenu] = useState();
  const [isMenuModified, updateMenu] = useState(false);
  const menuButtons = useRef({});
  const [menuArray, setMenuArray] = useState([]);
  const activeButton = useRef([undefined, undefined]);
  const [operators, setOperators] = useState();
  const [operator, setOperator] = useState();
  const [operatorArray, setOperatorArray] = useState();
  const [operation, setOperation] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("关卡");
  const content = useRef();

  function fetchMenu() {
    fetch("/menu/root")
      .then((resRaw) => {
        if (resRaw.ok) {
          resRaw.json().then((res) => {
            setMenu(res);
          });
        }
      })
      .then(() => {
        const interval_id = setInterval(() => {
          if (Object.keys(menuButtons.current).length > 0) {
            setMenuArray(Object.keys(menuButtons.current));
            clearInterval(interval_id);
          }
        }, 500);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function fetchOperator() {
    fetch("/operator/operators").then((resRaw) => {
      if (resRaw.ok) {
        resRaw.json().then((res) => {
          setOperators(res);
          setOperatorArray(res.map((operator) => operator.name1));
        });
      }
    });
  }

  useEffect(() => {
    fetch("/authentication/get-user")
      .then((resRaw) => {
        if (resRaw.status !== 204) {
          resRaw.json().then((res) => {
            setUser(res);
          });
        }
      })
      // simultaneous req would destroy the req.session
      .then(() => {
        fetchMenu();
      })
      .then(() => {
        fetchOperator();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (isMenuModified) {
      fetchMenu();
      updateMenu(false);
    }
  }, [isMenuModified]);

  function searchOperation() {
    collapseMenu();

    let button0, button1, targetButton;
    for (let name of menuArray) {
      const button = menuButtons.current[name];
      if (button.index % 10000 === 0) {
        button0 = button;
        button1 = undefined;
      } else if (button.index % 100 === 0) {
        button1 = button;
      }
      if (name.includes(searchValue)) {
        targetButton = button;
        break;
      }
    }

    // no match
    if (!targetButton) return;

    setTimeout(() => {
      if (button0) {
        button0 = document.querySelector("#btn" + button0.index);
        button0.click();
      }
      if (button1) {
        setTimeout(() => {
          button1 = document.querySelector("#btn" + button1.index);
          button1.click();
          setTimeout(() => {
            targetButton = document.querySelector("#btn" + targetButton.index);
            targetButton.focus();
            if (!window.matchMedia("(min-width: 768px)").matches) {
              const scrollTo = targetButton.getBoundingClientRect().top;
              window.scrollTo({ top: scrollTo - 58, behavior: "smooth" });
            }
          }, 500);
        }, 500);
      }
    }, 500);
  }

  function searchOperator() {
    for (let operator of operators) {
      if (operator.name1 === searchValue) {
        setOperator(operator);
        break;
      }
    }
  }

  function handleSearch(evt) {
    evt.preventDefault();
    setSearchValue("");

    const collapseBtn = document.querySelector("button.navbar-toggler");
    if (!collapseBtn.classList.contains("collapsed")) collapseBtn.click();

    if (searchType === "关卡") {
      setOperator(undefined);
      searchOperation();
    } else if (searchType === "干员") {
      setOperation(undefined);
      searchOperator();
    }
  }

  function resetPage() {
    setOperation(undefined);
    setOperator(undefined);
  }

  function collapseMenu() {
    if (activeButton.current[0]) {
      activeButton.current[0].click();
    }
    if (activeButton.current[1]) {
      activeButton.current[1].click();
    }
  }

  return (
    <Router>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <Nav
          user={user}
          menuArray={menuArray}
          handleSearch={handleSearch}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchType={searchType}
          setSearchType={setSearchType}
          operatorArray={operatorArray}
          resetPage={resetPage}
        />
        <div
          className="flex-grow-1"
          ref={content}
          style={{ minHeight: "65vh" }}
        >
          <Switch>
            <Route path="/auth">
              <Auth />
            </Route>
            <Route path="/admin">
              {user && (user.role === "admin" || user.role === "su") ? (
                <AdminPage
                  user={user}
                  setUser={setUser}
                  menu={menu}
                  updateMenu={updateMenu}
                  operators={operators}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/submit">
              {user ? (
                <SubmitPage user={user} menu={menu} operators={operators} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/home">
              {user ? (
                <HomePage user={user} setUser={setUser} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/changelog">
              <Changelog />
            </Route>
            <Route path="/">
              <IndexPage
                user={user}
                setUser={setUser}
                menu={menu}
                menuButtons={menuButtons}
                activeButton={activeButton}
                collapseMenu={collapseMenu}
                operator={operator}
                operators={operators}
                operation={operation}
                setOperation={setOperation}
              />
            </Route>
          </Switch>
        </div>
        <Footer />
        <AboutModal />
        <ToastContainer autoClose={3000} />
      </div>
    </Router>
  );
}
