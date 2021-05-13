import React from "react";
import QueryRecords from "../shared/QueryRecords";

export default function FavoritePage({ user, setUser }) {
  const query = { favorite: user.favorite };

  return (
    <QueryRecords
      user={user}
      setUser={setUser}
      query={query}
      cardStyle="showOperation"
    />
  );
}
