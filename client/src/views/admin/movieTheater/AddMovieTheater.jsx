import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";

function AddMovieTheater() {
    const navigate = useNavigate();
    const [movietheater, setMovieTheater] = useState("");
    


    async function submitAdd(e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/v1/admin/movie-theater", {
                method: "POST",            
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(movietheater),
            });

            if (res.ok) {
                console.log(res);
                navigate("/admin/salle");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link to={"/admin/salle"}>Retour à la liste des salles</Link>
            <form onSubmit={submitAdd}>
                 <fieldset>
                        <legend>Création d&apos;une salle</legend>

                        <label htmlFor="cinemas_id">Nom du cinéma:
                            <input onChange={(e) => setMovieTheater({...movietheater, cinemas_id: e.target.value})} type="text" id="cinemas_id" name="cinemas_id"/>
                        </label>
                        <label htmlFor="disabled_access">accès handicapé :
                            <input onChange={(e) => setMovieTheater({...movietheater, disabled_access: e.target.value})} type="text" id="disabled_access" name="disabled_access"/>
                        </label>
                        <label htmlFor="name_theater">nom de la salle :
                            <input onChange={(e) => setMovieTheater({...movietheater, name_theater: e.target.value})} type="text" id="name_theater" name="name_theater"/>
                        </label>
                        <label htmlFor="nbr_seats">nombre de places :
                            <input onChange={(e) => setMovieTheater({...movietheater, nbr_seats: e.target.value})} type="text" id="nbr_seats" name="nbr_seats"/>
                        </label>
                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>
            <Link to={"/admin/salle"}>Retour à la liste des salles</Link>
        </>
    );
}

export default AddMovieTheater;