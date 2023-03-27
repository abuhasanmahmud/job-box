import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import auth from "./firebase/firebase.confic";
import { useDispatch } from "react-redux";
import { setUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user.email));
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
