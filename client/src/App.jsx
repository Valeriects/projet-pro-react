
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import UserRoutes from "./Router/User.routes";
import AdminRoutes from "./Router/Admin.routes";
import { fetchMovies } from "./store/slices/movie";
import { login } from "./store/slices/user";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [userType, setUserType] = useState("visitor");

  console.log("console.log !!!!!", userType);

  useEffect(() => {
    dispatch(fetchMovies());

    // dispatch(login());

    async function currentSession() {

        const tokenOk = await fetch("/api/v1/authentication/check-token", {
          //pour inclure les cookies dans la requête
          credentials: "include"
        });

        const authentication = await tokenOk.json();

        console.log("auth :", authentication);

        if (tokenOk.error) return;

        if (tokenOk.ok) {
        
          dispatch(login(authentication.user));
          setUserType(authentication.user.roleUser);

          if (authentication.user.roleUser === "admin") {
            navigate("/admin");
          }
        }
      }
      currentSession();
    }, [userType]);
  // }, []);

  // console.log(userType);

      // si l'état est sur visiteur OU un utilisateur (données récupéré de son token grace au useEffect au-dessus), on retourne le routeur de l'utilisateur
  if (userType === "visitor" || userType === "user") return <UserRoutes />;
   // si l'état est sur admin, on retourne le routeur de l'admin
    if (userType === "admin") return <AdminRoutes />;

  // return (
  //   <>
  //   <UserRoutes />
  //   <AdminRoutes />
  //   </>
  // )
  
}

export default App;
