import { auth, provider } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const logoutNavigate = useNavigate();

  const [user] = useAuthState(auth);

  const userOut = async () => {
    await signOut(auth);
    logoutNavigate("/login");
  };
  const [showNavColor, setShowNavColor] = useState(false);

  return (
    <MDBNavbar expand="lg" dark bgColor="primary">
      <MDBContainer fluid>
        <MDBNavbarBrand href="/">Social Media Website</MDBNavbarBrand>
        <MDBNavbarToggler
          type="button"
          data-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowNavColor(!showNavColor)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={showNavColor} navbar>
          <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
            <MDBNavbarItem className="active">
              <MDBNavbarLink aria-current="page" href="#">
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            {!user ? (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">Login</MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/createpost">Create Post</MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
        <div className="user">
          {user && (
            <>
              <p> {user?.displayName} </p>
              <img src={user?.photoURL || ""} width="20" height="20" />
              <button onClick={userOut}> Log-out </button>
            </>
          )}
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
};
