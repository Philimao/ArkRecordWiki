import React from "react";
import CreateOperation from "./CreateOperation";
import UpdateOperation from "./UpdateOperation";
import DeleteOperation from "./DeleteOperation";
import CloneOperation from "./CloneOperation";

export default function Operation({ user, menu, updateMenu }) {
  const su = user.role === "su";

  return (
    <div id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
      <CreateOperation menu={menu} updateMenu={updateMenu} />
      {!su ? null : (
        <div>
          <hr />
          <UpdateOperation menu={menu} updateMenu={updateMenu} />
          <hr />
          <DeleteOperation menu={menu} updateMenu={updateMenu} />
        </div>
      )}
      <hr />
      <CloneOperation menu={menu} updateMenu={updateMenu} />
    </div>
  );
}
