import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle";
import { fetchMedia } from "../../../store/slices/media.js";
import { fetchMovies } from "../../../store/slices/movie.js";

function AddMediaMovie() {
    useMenuToggle();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [mediaMovie, setMediaMovie] = useState("");
    const { listMedia } = useSelector((state) => state.media);
    const { list } = useSelector((state) => state.movie);


    useEffect(() => {
        dispatch(fetchMedia());
        dispatch(fetchMovies());

    }, []);

    const handleChange = (e) => {
        setMediaMovie({
            ...mediaMovie,
            [e.target.name]: e.target.value
        });
    }
    
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
                navigate("/admin/média-film");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link className="aBack" to={"/admin/média-film"}>Retour à la liste des Médias en lien avec les films</Link>
            <form onSubmit={submitAdd}>
                 <fieldset>
                        <legend>Création du lien entre le média et le film</legend>
                        
                        <label htmlFor="movies_id">Modifier l&apos;ID du film :                        
                            <select onChange={handleChange} name="movies_id" id="movies_id">
                                <option value="">Choisir le film</option>
                            
                                {list.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id} - {item.title}</option>
                                    
                                ))}
                            </select>
                        
                        </label>

                        <label htmlFor="media_id">Modifier l&apos;ID du média:
                            <select onChange={handleChange} name="media_id" id="media_id">
                                <option value="">Choisir l&apos;affiche</option>
                            
                                {listMedia.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id} - {item.alt_img}</option>
                                    
                                ))}
                            </select>
                        </label>
                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>
            <Link className="aBack" to={"/admin/média-film"}>Retour à la liste des Médias en lien avec les films</Link>
        </>
    );
}

export default AddMediaMovie;