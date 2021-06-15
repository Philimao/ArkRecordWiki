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
import Footer from "./others/Footer";
import HomePage from "./home/HomePage";
import AdminPage from "./admin/AdminPage";
import { ToastContainer } from "react-toastify";
import { getCookie } from "./utils";

import "./stylesheets/Main.css";
import "react-toastify/dist/ReactToastify.css";
import Changelog from "./others/Changelog";
import SubmitPage from "./submit/SubmitPage";

import "intro.js/introjs.css";
import "./stylesheets/Intro.css";
import VisitorIntro from "./intro/VisitorIntro";
import UserIntro from "./intro/UserIntro";
import SubmitGuideSimple from "./index/SubmitGuideSimple";
import SubmitGuideDetailed from "./index/SubmitGuideDetailed";
import AboutModal from "./others/AboutModal";
import FAQComp from "./others/FAQComp";
import Announcement from "./intro/Announcement";
import CardPreview from "./others/CardPreview";

export default function App() {
  const [user, setUser] = useState();
  const [menu, setMenu] = useState();
  const [isMenuModified, updateMenu] = useState(false);
  const menuButtons = useRef({});
  const [menuArray, setMenuArray] = useState([]);
  const activeButton = useRef([undefined, undefined]);
  const [operators, setOperators] = useState();
  const [operatorArray, setOperatorArray] = useState();
  const [categories, setCategories] = useState();
  const content = useRef();

  const [visitorIntroEnabled, setVisitorIntroEnabled] = useState(false);
  const [userIntroEnabled, setUserIntroEnabled] = useState(false);
  const [announcementEnabled, setAnnouncementEnabled] = useState(false);

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
            setMenuArray(Object.values(menuButtons.current));
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

  function fetchCategories() {
    fetch("/api/categories").then((resRaw) => {
      if (resRaw.ok) {
        resRaw.json().then((res) => {
          setCategories(res);
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
      .then(() => {
        fetchCategories();
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

  useEffect(() => {
    if (!menu) return;
    if (!getCookie("visitorIntro")) {
      setVisitorIntroEnabled(true);
    } else if (user && !getCookie("userIntro")) {
      setUserIntroEnabled(true);
    } else if (!user && !getCookie("emailA")) {
      // setAnnouncementEnabled(true);
    }
  }, [menu, user]);

  function collapseMenu() {
    // console.log(activeButton.current);
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
        <Nav user={user} menuArray={menuArray} operatorArray={operatorArray} />
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
                  categories={categories}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/submit">
              {user ? (
                <SubmitPage
                  user={user}
                  menu={menu}
                  operators={operators}
                  categories={categories}
                />
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
            <Route path="/card-preview">
              <CardPreview operators={operators} />
            </Route>
            <Route path="/FAQ">
              <FAQComp />
            </Route>
            <Route path="/">
              <IndexPage
                user={user}
                setUser={setUser}
                menu={menu}
                menuButtons={menuButtons}
                activeButton={activeButton}
                collapseMenu={collapseMenu}
                operators={operators}
                categories={categories}
              />
            </Route>
          </Switch>
        </div>
        <Footer
          user={user}
          setVisitor={setVisitorIntroEnabled}
          setUser={setUserIntroEnabled}
        />
        <SubmitGuideSimple />
        <SubmitGuideDetailed />
        <VisitorIntro
          enabled={visitorIntroEnabled}
          setEnable={setVisitorIntroEnabled}
          setNext={setUserIntroEnabled}
          collapseMenu={collapseMenu}
        />
        <UserIntro
          user={user}
          enabled={userIntroEnabled}
          setEnable={setUserIntroEnabled}
        />
        <Announcement
          user={user}
          enabled={announcementEnabled}
          setEnable={setAnnouncementEnabled}
        />
        <AboutModal />
        <ToastContainer autoClose={5000} />
      </div>
    </Router>
  );
}
