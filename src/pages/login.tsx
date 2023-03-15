import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };

  const myStyle = {
    backgroundColor: "#508bfc",
    borderRadius: "1rem",
  };
  const myStyle2 = {
    backgroundColor: "#dd4b39",
  };
  const myStyle3 = {
    backgroundColor: "#dd4b39",
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBInput
        wrapperClass="mb-4"
        placeholder="Email address"
        id="form1"
        type="email"
      />
      <MDBInput
        wrapperClass="mb-4"
        placeholder="Password"
        id="form2"
        type="password"
      />

      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox
          name="flexCheck"
          value=""
          id="flexCheckDefault"
          label="Remember me"
        />
        <a href="!#">Forgot password?</a>
      </div>

      <MDBBtn className="mb-4">Sign in</MDBBtn>

      <div className="text-center">
        <p>
          Not a member? <a href="#!">Register</a>
        </p>
        <p>or sign up with:</p>

        <div
          className="d-flex justify-content-between mx-auto"
          style={{ width: "40%" }}
        ></div>
      </div>
      <div>
        {/* <p>Sign in with Google to Continue</p> */}
        <button className="btn btn-primary" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </MDBContainer>
  );
};
