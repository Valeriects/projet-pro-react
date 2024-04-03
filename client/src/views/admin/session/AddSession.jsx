import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle";

function AddSession() {
    useMenuToggle();
    const navigate = useNavigate();
    const [session, setSession] = useState("");

    async function submitAdd(e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/v1/admin/session-movie", {
                method: "POST",            
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(session),
            });

            if (res.ok) {
                console.log(res);
                navigate("/admin/séance");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link to={"/admin/séance"}>Retour à la liste des séances</Link>
            <form onSubmit={submitAdd}>
                 <fieldset>
                        <legend>Création de la séance</legend>
                     

                        <label htmlFor="language">Langue du film :
                            <input onChange={(e) => setSession({...session, language: e.target.value})} type="text" id="language" name="language"/>
                        </label>
                        <label htmlFor="movie_theaters_id">Id de la salle :
                            <input onChange={(e) => setSession({...session, movie_theaters_id: e.target.value})} type="text" id="movie_theaters_id" name="movie_theaters_id"/>
                        </label>
                        <label htmlFor="movies_id">Id du film :
                            <input onChange={(e) => setSession({...session, movies_id: e.target.value})} type="text" id="movies_id" name="movies_id"/>
                        </label>
                        <label htmlFor="price">Prix de la séance :
                            <input onChange={(e) => setSession({...session, price: e.target.value})} type="text" id="price" name="price"/>
                        </label>
                        <label htmlFor="session_date">Date de la séance :
                            <input onChange={(e) => setSession({...session, session_date: e.target.value})} type="date" id="session_date" name="session_date"/>
                        </label>
                        <label htmlFor="timetables_id">Id de l&apos;horaire :
                            <input onChange={(e) => setSession({...session, timetables_id: e.target.value})} type="text" id="timetables_id" name="timetables_id"/>
                        </label>
                        <label htmlFor="version_2D_3D">Version 2D ou 3D :
                            <input onChange={(e) => setSession({...session, version_2D_3D: e.target.value})} type="text" id="version_2D_3D" name="version_2D_3D"/>
                        </label>
                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>
            <Link to={"/admin/séance"}>Retour à la liste des séances</Link>
        </>
    );
}

export default AddSession;