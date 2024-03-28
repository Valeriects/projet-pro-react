// import { useState } from 'react';
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

  // console.log("console.log !!!!!",navigate, setUserType);

  useEffect(() => {
    dispatch(fetchMovies());

    dispatch(login());

    // async function currentSession() {

    //     const tokenOk = await fetch("/api/v1/authentication/check-token", {
    //       //pour inclure les cookies dans la requête
    //       credentials: "include"
    //     });

    //     const authentication = await tokenOk.json();

    //     console.log("auth :", authentication);

    //     if (tokenOk.error) return;

    //     if (tokenOk) {
        
    //       dispatch(login(authentication.resUser));
    //       setUserType(authentication.resUser.roleUser);

    //       if (authentication.resUser.roleUser === "admin") {
    //         navigate("/admin");
    //       }
    //     }
    //   }
    //   currentSession();
    // }, [userType]);
  }, []);

  // console.log(userType);

  // if (userType === "visitor" || userType === "user") return <UserRoutes />;

  return (
    <>
    <UserRoutes />
    <AdminRoutes />
    </>
  )
  
}

export default App;
