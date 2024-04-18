import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { login } from "../../store/slices/user";
import useMenuToggle from "../../hook/useMenuToggle";

function Login() {
    useMenuToggle();
    const userMailref = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //je récupère les données du formulaire:
    const [userInfo, setUserInfo] = useState({
        useremail: "",
        password: ""
    });

    const [msg, setMsg] = useState("");

    useEffect(() => {
        userMailref.current.focus();
    }, [msg]);

    const inputChangeHandler = (e) => setUserInfo({
        ...userInfo, //je spread un nouveau tableau, avec les infos de userInfo
        //je l'associe avec la valeur de chaque input
        [e.target.name]: e.target.value,
    });

    const submitHandler= async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/v1/authentication/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userInfo)
            });

            if (response.ok) {
                const resUser = await response.json();
                
                dispatch(login({id: resUser.id, firstname: resUser.firstname, roleUser: resUser.roleUser}));

                if (resUser.roleUser === "admin") window.location.href = "/admin";

                navigate("/");
            } else {
                setMsg("Erreur d'authentification");
            }

        } catch (err) {
            console.log(err);
        }
    }
    

    return (
        <main className="form">
            <form onSubmit={submitHandler}>
                <fieldset>
                    <legend>Connectez-vous</legend>

                    <label htmlFor="email">Votre adresse email:</label>
                    <input ref={userMailref} id="email" name="email" type="email" onChange={inputChangeHandler}/>

                    <label htmlFor="password">Votre mot de passe:</label>
                    <input  id="password" name="password" type="password" onChange={inputChangeHandler}/>
                    
                    <input type="submit"  value="Validez"/>
               
                </fieldset>
                    <Link to="/authentification/inscription">Inscription</Link>
            </form>
        </main>
    )
}

export default Login;