import React from "react";
import app from "../firebase";
import { getDatabase, ref, set } from "firebase/database";
const Home = () => {
  const db = getDatabase(app);
  const putData = () => {
    set(ref(db, "users/tehsin"), {
      id: 1,
      name: "Tehsin",
      age: 23,
    });
  };
  return <div></div>;
};

export default Home;
