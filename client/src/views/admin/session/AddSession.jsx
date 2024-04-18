import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen } from "@fortawesome/free-solid-svg-icons";
import useMenuToggle from "../../../hook/useMenuToggle";
import { fetchMovies } from "../../../store/slices/movie.js";
import { fetchMovieTheaters } from "../../../store/slices/movieTheater.js";
import { fetchTimes } from "../../../store/slices/timetable.js";
import { formattedTime } from "../../../utils/formatDate.js";

function AddSession() {
    useMenuToggle();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [session, setSession] = useState("");
    const { list } = useSelector((state) => state.movie);
    const listTheater = useSelector((state) => state.movieTheater.list);
    const listTimetable = useSelector((state) => state.timeTable.list);

    const handleChange = (e) => {
        setSession({
            ...session,
            [e.target.name]: e.target.value
        });
    }


    useEffect(() => {
        dispatch(fetchMovies());
        dispatch(fetchMovieTheaters());
        dispatch(fetchTimes());

    }, []);
    
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
                navigate("/admin/séance");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Link  className="aBack" to={"/admin/séance"}>Retour à la liste des séances</Link>
            <form onSubmit={submitAdd}>
                 <fieldset>
                        <legend>Création de la séance</legend>
                     

                        <label htmlFor="language">Langue du film :
                            <input onChange={handleChange} type="text" id="language" name="language"/>
                        </label>
                        <label htmlFor="movie_theaters_id">Id de la salle :
                            <select onChange={handleChange} name="movie_theaters_id" id="movie_theaters_id">
                                <option value="">Choisir la salle</option>
                            
                                {listTheater.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id} - {item.name_theater}</option>
                                    
                                ))}
                            </select>
                        </label>
                        <label htmlFor="movies_id">Id du film :
                            <select onChange={handleChange} name="movies_id" id="movies_id">
                                <option value="">Choisir le film</option>
                            
                                {list.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id} - {item.title}</option>
                                    
                                ))}
                            </select>
                        </label>
                        <label htmlFor="price">Prix de la séance : 12,50€
                            <input onChange={handleChange} type="text" id="price" name="price"/>
                        </label>
                        <label htmlFor="session_date">Date de la séance :
                            <input onChange={handleChange} type="date" id="session_date" name="session_date"/>
                        </label>
                        <label htmlFor="timetables_id">Id de l&apos;horaire :
                            <select onChange={handleChange} name="timetables_id" id="timetables_id">
                                <option value="">Choisir l&apos;horaire</option>
                            
                                {listTimetable.map((item) => (
                                    <option key={item.id} value={item.id}>{item.id} - {formattedTime(item.hours_timetable)}</option>
                                    
                                ))}
                            </select>
                        </label>
                        <label htmlFor="version_2D_3D">Version 2D ou 3D :
                            <input onChange={handleChange} type="text" id="version_2D_3D" name="version_2D_3D"/>
                        </label>
                        
                        <button type="submit" >
                            <FontAwesomeIcon icon={faSquarePen} className="iconeTable" />
                        </button>
                    
                    </fieldset>
            </form>
            <Link  className="aBack" to={"/admin/séance"}>Retour à la liste des séances</Link>
        </>
    );
}

export default AddSession;