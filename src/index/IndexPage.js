import React from "react";
import Menu from "./Menu";
import ContactForm from "./ContactForm";
import DefaultIndexContent from "./content/DefaultIndexContent";
import RecordsByOperation from "./content/RecordsByOperation";
import "../stylesheets/Index.css";
import LoadingComp from "../shared/LoadingComp";
import { Switch, Route, useHistory } from "react-router-dom";
import RecordsByOperator from "./content/RecordsByOperator";
import LinksComp from "./content/LinksComp";

export default function IndexPage({
  user,
  setUser,
  menu,
  menuButtons,
  activeButton,
  collapseMenu,
  operators,
  categories,
}) {
  let history = useHistory();

  // for new-password
  if (history.location.hash.startsWith("#")) {
    history.push(history.location.hash.replace("#", ""));
  }

  function MobileButtons() {
    return (
      <div>
        <button
          className="btn position-fixed bottom-0 end-0 d-md-none me-4 mb-5"
          id="fold_menu_btn"
          onClick={collapseMenu}
          style={{ zIndex: "1000" }}
        >
          折叠目录
        </button>
        <button
          className="btn position-fixed bottom-0 end-0 d-md-none me-4 mb-2"
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
          style={{ zIndex: "1000" }}
        >
          回到顶部
        </button>
      </div>
    );
  }

  if (!menu || !operators || !categories) {
    return <LoadingComp />;
  }
  return (
    <div className="container-xxl pt-2 pt-md-3 d-md-flex">
      <Menu menu={menu} activeButton={activeButton} menuButtons={menuButtons} />
      <div className="ms-md-4 mt-5 mt-md-0" id="content">
        <Switch>
          <Route path="/links">
            <LinksComp />
          </Route>
          <Route path="/operation/">
            <RecordsByOperation
              user={user}
              setUser={setUser}
              menu={menu}
              menuButtons={menuButtons}
              operators={operators}
              categories={categories}
            />
          </Route>
          <Route path="/operator/:op">
            <RecordsByOperator
              user={user}
              setUser={setUser}
              menu={menu}
              operators={operators}
              categories={categories}
            />
          </Route>
          <Route path="/" children={<DefaultIndexContent />} />
        </Switch>
      </div>
      <ContactForm />
      <MobileButtons />
    </div>
  );
}
