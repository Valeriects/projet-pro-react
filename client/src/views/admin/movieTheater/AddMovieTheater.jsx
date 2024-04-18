import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle";
import { fetchCinema } from "../../../store/slices/cinema.js";

function AddMovieTheater() {
    useMenuToggle();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [movietheater, setMovieTheater] = useState("");
    const { listCine } = useSelector((state) => state.cinema);
    
    const handleChange = (e) => {
        setMovieTheater({
            ...movietheater,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        dispatch(fetchCinema());

    }, []);

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
                navigate("/admin/salle");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link className="aBack" to={"/admin/salle"}>Retour à la liste des salles</Link>
            <form onSubmit={submitAdd}>
                 <fieldset>
                        <legend>Création d&apos;une salle</legend>

                        <label htmlFor="cinemas_id">Nom du cinéma:
                            <select onChange={handleChange} name="cinemas_id" id="cinemas_id">
                                <option value="">Choisir le cinéma</option>
                            
                                {listCine.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id} - {item.name_cinema}</option>
                                    
                                ))}
                            </select>
                        </label>
                        <label htmlFor="disabled_access">accès handicapé :
                            <input onChange={handleChange} type="text" id="disabled_access" name="disabled_access"/>
                        </label>
                        <label htmlFor="name_theater">nom de la salle :
                            <input onChange={handleChange} type="text" id="name_theater" name="name_theater"/>
                        </label>
                        <label htmlFor="nbr_seats">nombre de places :
                            <input onChange={handleChange} type="text" id="nbr_seats" name="nbr_seats"/>
                        </label>
                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>
            <Link className="aBack" to={"/admin/salle"}>Retour à la liste des salles</Link>
        </>
    );
}

export default AddMovieTheater;