import { signOut } from "firebase/auth";
import React from "react";

import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import auth from "./../../firebase/firebase.confic";
import { logOutUser } from "../../features/auth/authSlice";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { pathname } = useLocation();
  console.log('ss')
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.auth);

  const handelSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(logOutUser());
        toast.success("user logout successfull");
      })
      .catch((error) => {
        // An error happened.
      });

    // console.log("auth", auth);
  };

  return (
    <nav className={`h-14 fixed w-full z-[999] ${pathname === "/" ? null : "bg-white"}`}>
      <ul className="max-w-7xl mx-auto flex gap-3 h-full items-center">
        <li className="flex-auto font-semibold text-2xl">
          <Link to="/">JobBox</Link>
        </li>
        <li>
          <Link className="hover:text-primary" to="/jobs">
            Jobs
          </Link>
        </li>

        <li>
          {!email ? (
            <>
              <Link
                className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
                to="/login"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handelSignOut}
                className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
              >
                Logout
              </button>
            </>
          )}
        </li>
        {email && (
          <>
            <li>
              <Link
                className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
                to="/dashboard"
              >
                Dashboard
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
