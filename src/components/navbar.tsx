import { Link } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { async } from "@firebase/util";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import React from "react";
import { signInWithPopup } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const userOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar">
      <div className="links">
        <Link to="/"> Main </Link>
        {!user ? (
          <Link to="/login"> Login </Link>
        ) : (
          <Link to="/createpost"> Create Post </Link>
        )}
      </div>

      <div className="user">
        {user && (
          <>
            <p> {user?.displayName} </p>
            <img src={user?.photoURL || ""} width="20" height="20" />
            <button onClick={userOut}> Log-out </button>
          </>
        )}
      </div>
    </div>
  );
};
