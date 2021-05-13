import React from "react";
import CreateEpisode from "./CreateEpisode";
import UpdateEpisode from "./UpdateEpisode";
import DeleteEpisode from "./DeleteEpisode";

export default function Episode({ user, menu, updateMenu }) {
  const su = user.role === "su";

  return (
    <div id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
      <CreateEpisode menu={menu} updateMenu={updateMenu} />
      {!su ? null : (
        <div>
          <hr />
          <UpdateEpisode menu={menu} updateMenu={updateMenu} />
          <hr />
          <DeleteEpisode menu={menu} updateMenu={updateMenu} />
        </div>
      )}
    </div>
  );
}
