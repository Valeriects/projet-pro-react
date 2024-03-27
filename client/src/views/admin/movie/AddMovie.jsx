import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle";

function AddMovie() {
    useMenuToggle();
    const navigate = useNavigate();
    const [movie, setMovie] = useState("");
    
    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }


    async function submitAdd(e) {
        e.preventDefault();
        try {
            const res = await fetch("/api/v1/admin/movie", {
                method: "POST",            
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(movie),
            });

            if (res.ok) {
                console.log("res :",res);
                navigate(`/admin/film`);
            }
            console.log(movie);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link to={"/admin/film"}>Retour à la liste des films</Link>

            <form onSubmit={submitAdd}>
                 <fieldset>
                        <legend>Création des données d&apos;un film</legend>
                        
                        <label htmlFor="title">Titre :
                            <input onChange={handleChange} type="text" id="title" name="title" value={movie.title}/>
                        </label>

                        {/* <label htmlFor="categories">Genre :
                            <input onChange={handleChange} type="text" id="categodies" name="categodies" value={movie.categodies}/>
                        </label> */}

                        <label htmlFor="director">Réalisateur :
                            <input onChange={handleChange} type="text" id="director" name="director" value={movie.director}/>
                        </label>
                    
                        <label htmlFor="actor">3 acteurs principaux :
                            <input onChange={handleChange} type="text" id="actor" name="actor" value={movie.actor}/>
                        </label>

                        <label htmlFor="release_date">Date de réalisation :
                            <input onChange={handleChange} type="date" id="release_date" name="release_date" value={movie.release_date}/>
                        </label>

                        <label htmlFor="time">Durée :
                            <input onChange={handleChange} type="time" id="time" name="time" value={movie.time}/>
                        </label>

                        <label htmlFor="synopsis">Synopsis :
                        {/* <input onChange={handleChange} type="text" id="synopsis" name="synopsis" value={movie.synopsis} /> */}
                            <textarea onChange={handleChange} name="synopsis" id="synopsis" cols="30" rows="10"></textarea>

                        </label>

                        {/* <label htmlFor="media">Média :
                            <input onChange={handleChange} type="text" id="media" name="media" value={movie.media}/>
                        </label> */}


                     
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>

            <form action=""></form>

            <Link to={"/admin/film"}>Retour à la liste des films</Link>

        </>
    );
}

export default AddMovie;