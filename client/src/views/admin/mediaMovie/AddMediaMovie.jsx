import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";

function AddMediaMovie() {
    const navigate = useNavigate();
    const [mediaMovie, setMediaMovie] = useState("");


    async function submitAdd(e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/v1/admin/movie-media", {
                method: "POST",            
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(mediaMovie),
            });

            if (res.ok) {
                console.log(res);
                navigate("/admin/média-film");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link to={"/admin/média-film"}>Retour à la liste des Médias en lien avec les films</Link>
            <form onSubmit={submitAdd}>
                 <fieldset>
                        <legend>Création du lien entre le média et le film</legend>
                        
                        <label htmlFor="movies_id">Modifier l&apos;ID du film :
                            <input onChange={(e) => setMediaMovie({...mediaMovie, movies_id: e.target.value})} type="text" id="movies_id" name="movies_id" value={mediaMovie?.movies_id}/>
                        </label>

                        <label htmlFor="media_id">Modifier l&apos;ID du média:
                            <input onChange={(e) => setMediaMovie({...mediaMovie, media_id: e.target.value})} type="text" id="media_id" name="media_id" value={mediaMovie?.media_id}/>
                        </label>
                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>
            <Link to={"/admin/média-film"}>Retour à la liste des Médias en lien avec les films</Link>
        </>
    );
}

export default AddMediaMovie;