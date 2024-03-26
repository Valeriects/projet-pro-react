import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

function Register() {
    const userMailRef = useRef();
    const pwdRef = useRef();
    const navigate = useNavigate();

    //je récupère les données du formulaire:
    const [msg, setMsg] = useState("");

    useEffect(() => {
        userMailRef.current.focus();
    }, [msg])

    const submitHandler = async (e) => {
        e.preventDefault();

        try {

            const email = userMailRef.current.value;
            const password = pwdRef.current.value;

            const datas = { email, password };

            const response = await fetch("/api/v1/authentication/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(datas),
            });

            if (response.ok) {
                navigate("/authentification/connexion");
            } else setMsg("L'inscription a échouée.");


        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main className="form">
            <form onSubmit={submitHandler}>
                <fieldset>
                    <legend>Creation de compte</legend>

                    <label htmlFor="email">Votre adresse email:</label>
                    <input ref={userMailRef} name="email" id="email" type="email" />

                    <label htmlFor="password">Votre mot de passe:</label>
                    <input ref={pwdRef} name="password" id="password" type="password" />

                    
                    <input type="submit" />
                    
               
                </fieldset>
                    <Link to="/authentification/connexion">Connexion</Link>
            </form>
        </main>
    )
}

export default Register;