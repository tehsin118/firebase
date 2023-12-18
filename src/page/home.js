import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
const Home = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useFirebase();
  // console.log("cc", currentUser.currentUser.email);
  console.log("cc", currentUser);
  // const handleLogout = async () => {
  //   // await logout();
  // };
  return (
    <div>
      {currentUser ? (
        <div>
          <h2>Welcome, {currentUser.currentUser.email}!</h2>
          {/* <button onClick={handleLogout}>Logout</button> */}
        </div>
      ) : (
        <div>
          <h2>Welcome to the Home Page!</h2>
          {/* Add content for users who are not logged in */}
        </div>
      )}
    </div>
  );
};

export default Home;
