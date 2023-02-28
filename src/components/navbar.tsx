import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { async } from "@firebase/util";

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
